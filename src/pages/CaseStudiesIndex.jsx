import { Link } from "react-router-dom";
import cases from "../data/caseStudies.json";

export default function CaseStudiesIndex() {
  return (
    <section className="page" id="case-studies">
      <div className="wrap">
        <p className="eyebrow">Case Studies</p>
        <ul className="post-list">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link to={`/case-studies/${c.slug}`}>
                <time>{c.company}</time>
                <h2>{c.title}</h2>
                <p>{c.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="see-all">
          <Link to="/case-studies">View all case studies →</Link>
        </p>
      </div>
    </section>
  );
}
