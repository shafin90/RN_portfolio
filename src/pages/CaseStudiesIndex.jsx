import { Link } from "react-router-dom";
import { products } from "../pages/Home";

export default function CaseStudiesIndex() {
  return (
    <section className="page products-page" id="case-studies">
      <div className="wrap">
        <div className="page-head">
          <p className="eyebrow">Selected product work</p>
          <h1>Case studies from the product engineering side.</h1>
          <p className="lede">Each project starts with a product constraint: money must reconcile, a seat must belong to one passenger, or a user must still make progress without a reliable network. Here is how I approached the system behind the experience.</p>
        </div>
        <div className="case-grid">
          {products.map((p) => (
            <article className="case-card" key={p.slug}>
              <Link to={`/products/${p.slug}`}>
                <p className="eyebrow">{p.company}</p>
                <h2>{p.title}</h2>
                <p>{p.desc}</p>
                <span className="case-card-link">Read case study →</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
