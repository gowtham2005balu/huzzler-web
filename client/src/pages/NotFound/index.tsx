export default function NotFound() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontSize: 48, fontWeight: 500, margin: "0 0 16px", color: "#1a1a2e" }}>404</h1>
      <p style={{ fontSize: 18, color: "#666", margin: "0 0 24px" }}>Page not found</p>
      <a href="/" style={{ background: "#7c3aed", color: "#fff", padding: "10px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>Go Home</a>
    </div>
  );
}
