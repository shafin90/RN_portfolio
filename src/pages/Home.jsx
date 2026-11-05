import { Link } from "react-router-dom";
import posts from "../data/posts.json";

const featured = [
  "the-feature-is-not-the-product",
  "a-retry-must-find-the-first-result",
];

export default function Home() {
  const featuredPosts = posts.filter((p) => featured.includes(p.slug));

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Product Engineer</p>
            <h1>Systems founders can count on.</h1>
            <p className="lede">
              When mobile products have to be right, the cost of failure is too
              high to leave to chance. I build the kind of systems that let founders
              sleep at night — reliable, auditable, and built to hold.
            </p>
          </div>
          <figure className="hero-photo">
            <img src="/portrait.jpg" alt="Mashrafi Ahnam Shafin" />
          </figure>
        </div>
      </section>

      <section className="case-study" id="case-study">
        <div className="wrap">
          <p className="eyebrow">Featured case study</p>
          <h2 className="section-title">
            Legato — where I learned to hold a product calm
          </h2>
          <div className="story-body">
            <p>
              <strong>Legato</strong> is where I learned to hold a product calm —
              musician profiles, discovery, follow, block, groups, chat, push. Small
              US team, both stores. My part was the phone as it is, and the server
              agreeing with it.
            </p>
            <p>
              I work failure first. A wrong order means a wrong partner. A follow
              with no notice kills the loop. A tap at root kills the reply. So
              search stays honest — one query ranked, faces first then distance, no
              second sort on the phone. Matching ships to Explore behind a flag —
              scored apart, precomputed, reads cheap. Follow notifies without
              risking the follow. Taps open that exact thread, back intact.
            </p>
            <p>
              State writes moved into actions. Lists unified with guards. Releases
              kept shippable through major upgrades with crash reporting from the
              start. Ordered, scored, notified, back intact — every failure owned
              before it reached a musician.
            </p>
          </div>
          <p className="see-all">
            <Link to="/case-studies">See all case studies →</Link>
          </p>
        </div>
      </section>

      <section className="writing" id="writing">
        <div className="wrap">
          <p className="eyebrow">Blog</p>
          <ul className="post-list">
            {featuredPosts.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`}>
                  <time>{p.time}</time>
                  <h2>{p.title}</h2>
                  <p>{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="see-all">
            <Link to="/blog">See all blogs →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
