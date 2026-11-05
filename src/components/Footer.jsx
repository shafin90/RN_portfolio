export default function Footer({ label = "Product Engineer" }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© 2026 Mashrafi Ahnam Shafin</span>
        <span>{label}</span>
      </div>
    </footer>
  );
}
