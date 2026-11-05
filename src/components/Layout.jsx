import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const footerLabel =
    pathname.startsWith("/blog/") || pathname.startsWith("/case-studies/")
      ? "Mobile Product Developer"
      : "Product Engineer";
  return (
    <>
      <Nav />
      <main id="top">{children}</main>
      <Footer label={footerLabel} />
    </>
  );
}
