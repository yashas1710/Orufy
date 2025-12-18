import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((p) => p.filter((x) => x._id !== id && x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Unable to delete product");
    }
  };

  const handleEdit = (id) => {
    // placeholder: integrate with router/modal in your app
    alert(`Edit action for product ${id} (implement routing/modal)`);
  };

  const styles = {
    container: { padding: 20, fontFamily: "Arial, sans-serif" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    title: { fontSize: 22, margin: 0 },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 12 },
    th: { textAlign: "left", padding: "8px 10px", borderBottom: "1px solid #e6e6e6", fontSize: 14, color: "#333" },
    td: { padding: "10px", borderBottom: "1px solid #f2f2f2" },
    statusBadge: (status) => ({
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: 12,
      fontSize: 12,
      color: status === "published" ? "#065f46" : "#374151",
      background: status === "published" ? "#bbf7d0" : "#f3f4f6",
    }),
    actions: { display: "flex", gap: 8 },
    btn: { padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd", background: "white", cursor: "pointer" },
    deleteBtn: { background: "#fee2e2", borderColor: "#fca5a5" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Products</h2>
      </div>

      {loading && <p>Loading products…</p>}
      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

      {!loading && !error && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td style={styles.td} colSpan={4}>
                  No products found.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p._id || p.id}>
                <td style={styles.td}>{p.name || "—"}</td>
                <td style={styles.td}>{typeof p.price === "number" ? `$${p.price.toFixed(2)}` : "—"}</td>
                <td style={styles.td}>
                  <span style={styles.statusBadge(p.status)}>{p.status || "unpublished"}</span>
                </td>
                <td style={{ ...styles.td, ...styles.actions }}>
                  <button style={styles.btn} onClick={() => handleEdit(p._id || p.id)}>Edit</button>
                  <button
                    style={{ ...styles.btn, ...styles.deleteBtn }}
                    onClick={() => handleDelete(p._id || p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
