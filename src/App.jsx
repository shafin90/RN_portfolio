import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import CaseStudiesIndex from "./pages/CaseStudiesIndex";
import CaseStudy from "./pages/CaseStudy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<CaseStudiesIndex />} />
          <Route path="/products/:slug" element={<CaseStudy />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/case-studies" element={<CaseStudiesIndex />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<section className="page"><div className="wrap"><p className="eyebrow">404 · Page not found</p><h1>That page isn’t here.</h1><p className="lede">The link may be outdated. Head back to the portfolio and explore selected work.</p><p className="see-all"><Link to="/">Back to home →</Link></p></div></section>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
