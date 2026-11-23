import { Link } from "react-router-dom";
import posts from "../data/posts.json";

export default function BlogIndex() {
  return (
    <section className="page blog-index" id="blog">
      <div className="wrap">
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
