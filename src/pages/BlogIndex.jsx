import { Link } from "react-router-dom";
import posts from "../data/posts.json";

export default function BlogIndex() {
  return (
    <section className="page" id="blog">
      <div className="wrap">
        <div className="page-head">
          <p className="eyebrow">Published writing</p>
          <h1>Notes from building products that have to work.</h1>
          <p className="lede">Essays on the engineering decisions behind payments, search, booking, and real-world reliability.</p>
        </div>
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`}>
                <time>{p.time}</time>
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
