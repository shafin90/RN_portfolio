import { Link } from "react-router-dom";
import posts from "../data/posts.json";
import Hero from "../components/Hero";
import OwnerNarrative from "../components/OwnerNarrative";

const featured = [
  "the-feature-is-not-the-product",
  "a-retry-must-find-the-first-result",
];

const recommendations = [
  {
    name: "Zach Petty",
    initials: "ZP",
    image: "/zach-petty.jpg",
    role: "Senior colleague at Legato Networks",
    currentRoles: [
      { title: "CEO", company: "Legato Networks · USA", url: "https://www.linkedin.com/company/112346548/", logo: "/legato_logo.jpeg" },
    ],
    date: "Apr 2, 2026",
    url: "https://www.linkedin.com/in/zach-petty-786224187/",
    quote: "Mashrafi Ahnam Shafin has consistently shown up with professionalism, clarity, and a strong willingness to grow. He communicates thoughtfully, comes prepared, and contributes meaningful feedback, even in broader product and pitch discussions. What stands out most is his attitude: reliable, respectful, and genuinely invested in doing great work and improving every day. He’s been a pleasure to work with, and I’d highly recommend connecting with him.",
  },
  {
    name: "Dmitry Dergunov",
    initials: "DD",
    image: "/dmitry-dergunov.jpg",
    role: "Direct manager at Legato Networks",
    currentRoles: [
      { title: "CTO", company: "Legato Networks · USA", url: "https://www.linkedin.com/company/112346548/", logo: "/legato_logo.jpeg" },
      { title: "Mobile Developer", company: "Toptal", url: "https://www.toptal.com/developers/resume/dmitry-dergunov" },
    ],
    date: "Mar 28, 2026",
    url: "https://www.linkedin.com/in/dmitry-d-5a21161b6/",
    quote: "Shafin worked with our team on maintaining and improving parts of the application. He was particularly helpful in monitoring issues through Sentry and addressing smaller bugs, which contributed to keeping the product stable on a day-to-day basis. He is detail-oriented when working on clearly defined tasks and is able to follow through on fixes efficiently. He can continue to grow with the right structure and support.",
  },
  {
    name: "Chakri Muthyala",
    initials: "CM",
    role: "Direct manager and mentor",
    currentRoles: [
      { title: "AI/ML Engineer II", company: "Insight Global · IG Labs", url: "https://www.linkedin.com/company/11056/", logo: "/insight-global.jpg" },
    ],
    date: "Oct 1, 2025",
    url: "https://www.linkedin.com/in/chakri-cv/",
    quote: "I’ve worked with Shafin for almost two years, starting from his internship and later on a full-time contract roles. Over this time, I’ve seen him grow into a reliable and skilled developer who can take on challenges with confidence. He’s proactive, communicates clearly, and always delivers quality work. I’d definitely recommend him to anyone looking for a dedicated and talented developer.",
  },
  {
    name: "Amitoj Singh",
    initials: "AS",
    image: "/amitoj-singh.jpg",
    role: "SRKAN project collaborator",
    currentRoles: [
      { title: "Co-Founder & Full-Stack Developer", company: "Hazur.io · Canada", url: "https://www.linkedin.com/company/101705725/", logo: "/hazur-io.jpg" },
    ],
    date: "LinkedIn recommendation",
    url: "https://www.linkedin.com/in/singh-amitoj/",
    quote: "Mashrafi delivered excellent work and was great to collaborate with. He communicated clearly, took ownership of challenges, and consistently focused on quality. The project was completed successfully, and I would happily hire him again for future work.",
  },
];

export const products = [
  {
    slug: "jetexpress",
    company: "JetExpress",
    title: "Inter-city buses, many companies, one truth each",
    desc: "Five surfaces — backend, passenger app, staff app, dashboard, website — that agree on seat, money, time, and who may touch what. Each company counts its own money, seats, and trips.",
    tags: ["Booking", "Payments", "Multi-tenant", "Identity"],
    image: null,
    label: "JetExpress",
  },
  {
    slug: "legato",
    company: "Legato",
    title: "Musician collaboration platform, MVP to production",
    desc: "Musician profiles, discovery, follow, block, groups, chat, push. Small US team, both stores. The phone as it is, and the server agreeing with it.",
    tags: ["Search", "Matching", "Identity", "Realtime"],
    image: "/legato_logo.jpeg",
    label: "Legato",
  },
  {
    slug: "govihari",
    company: "Govihari",
    title: "River-boat ticketing, fixed seats, calm boarding",
    desc: "Booking that frees itself, money that never parts from its ticket, and an app that stays light enough for the field. Guests stay guests.",
    tags: ["Booking", "Payments", "Offline", "Ticketing"],
    image: null,
    label: "Govihari",
  },
  {
    slug: "srkan",
    company: "SRKAN",
    title: "Devotional platform, steady on weak networks",
    desc: "Reading that never needs signal, reminders that fire without a server, and donations a donor can trust on a bad radio.",
    tags: ["Offline", "Payments", "Notifications", "Search"],
    image: "/srkan-logo.png",
    label: "SRKAN",
  },
  {
    slug: "kavoogo",
    company: "KavooGo",
    title: "Mobility, delivery, and rewards in one product",
    desc: "Kash connects optional sponsored activities to everyday rides and parcel delivery, with a wallet that carries earned value forward. The case study separates the broader brief from the campaign and payout code I reviewed.",
    tags: ["Mobility", "Delivery", "Rewards", "Wallet"],
    image: null,
    label: "KavooGo",
  },
];

const judgment = [
  {
    num: "01",
    title: "Payment integrity",
    body: "How to handle a successful payment when booking confirmation fails — and why a retry must find the first result instead of charging twice.",
  },
  {
    num: "02",
    title: "Concurrency",
    body: "How to prevent multiple operators from selling the same seat, when two phones touch one inventory on a weak network.",
  },
  {
    num: "03",
    title: "System reliability",
    body: "How to handle failures across distributed workflows, where partial success is the normal case, not the exception.",
  },
  {
    num: "04",
    title: "Offline operations",
    body: "How to maintain reliable business operations when connectivity is unavailable — and which parts must live on the device.",
  },
  {
    num: "05",
    title: "Product architecture",
    body: "How architecture decisions affect business workflows, operational cost, and the cost of the next change.",
  },
];

const ownership = [
  {
    num: "01",
    title: "Understand the business.",
    body: "Understand the actual problem before choosing an engineering solution. The requirement is a system, not a screen.",
  },
  {
    num: "02",
    title: "Make engineering decisions.",
    body: "Choose architecture, workflows, and technologies based on product requirements and constraints — with the trade-offs named.",
  },
  {
    num: "03",
    title: "Own the execution.",
    body: "Take responsibility for implementation, delivery, production behavior, and reliability — after launch, not just before.",
  },
];

export default function Home() {
  const featuredPosts = posts.filter((p) => featured.includes(p.slug));

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Senior Product Engineer · Mobile &amp; Backend</p>
            <h1>I build products that stay reliable when reality gets messy.</h1>
            <p className="lede">
              I help ambitious teams turn complex requirements into dependable products—from the first system decision through launch and production.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="mailto:mashrafiahnam1@gmail.com">
                Discuss your product
              </a>
              <Link className="btn btn-ghost" to="/products">
                Explore selected work
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <strong>End-to-end ownership</strong>
                From product decisions to production reliability
              </div>
              <div>
                <strong>Domains shipped</strong>
                Booking, payments, discovery, content, rewards
              </div>
            </div>
          </div>
          <figure className="hero-photo reveal reveal-delay-1">
            <img src="/portrait.jpg" alt="Mashrafi Ahnam Shafin" />
          </figure>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="cred">
        <div className="wrap">
          <div className="recommendation-heading">
            <div>
              <p className="eyebrow">Recommendations</p>
              <h2>Kind words from people I’ve worked with.</h2>
            </div>
            <a className="upwork-badge" href="https://www.upwork.com/freelancers/~0162ee796651f12a34" target="_blank" rel="noreferrer">
              <span className="upwork-mark">U</span>
              <span><strong>Top Rated</strong><small>Upwork freelancer</small></span>
              <span className="upwork-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="recommendation-grid">
            {recommendations.map((item) => (
              <blockquote className="recommendation-card reveal" key={item.name}>
                <p>“{item.quote}”</p>
                <footer>
                  <span className="recommendation-person">
                    {item.image ? (
                      <img className="recommendation-avatar" src={item.image} alt={item.name} loading="lazy" />
                    ) : (
                      <span className="recommendation-avatar" aria-hidden="true">{item.initials}</span>
                    )}
                    <span className="recommendation-byline">
                      <a href={item.url} target="_blank" rel="noreferrer">{item.name} ↗</a>
                      <span>{item.role}</span>
                    </span>
                  </span>
                  <div className="recommendation-current-roles">
                    {item.currentRoles.map((position) => (
                      <a className="recommendation-current-role" href={position.url} target="_blank" rel="noreferrer" key={`${position.title}-${position.company}`}>
                        {position.logo && <img src={position.logo} alt="" loading="lazy" />}
                        <span><strong>{position.title}</strong><small>{position.company} ↗</small></span>
                      </a>
                    ))}
                  </div>
                  <time>{item.date}</time>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT ENGINEERING */}
      <section className="products" id="problems">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Product engineering</p>
            <h2>Engineering for the parts of a product that are hardest to get right.</h2>
            <p className="lede">
              Payments, inventory, identity, offline behavior, and third-party integrations all create sharp edges. I make those product constraints explicit and build systems that handle them predictably.
            </p>
          </div>
        </div>
        <div className="wrap">
          <div className="problem-cards reveal">
            <div className="problem-card">
              <h3>Payments that reconcile</h3>
              <p>Make retries safe, preserve a clear payment state, and keep every transaction tied to its booking.</p>
            </div>
            <div className="problem-card">
              <h3>Inventory without collisions</h3>
              <p>Protect shared seats and capacity when multiple people act at the same time.</p>
            </div>
            <div className="problem-card">
              <h3>Identity with clear boundaries</h3>
              <p>Keep guests, customers, staff, and tenant data in the right workflows.</p>
            </div>
            <div className="problem-card">
              <h3>Useful offline behavior</h3>
              <p>Keep essential reading, schedules, and field workflows available when signal drops.</p>
            </div>
            <div className="problem-card">
              <h3>Integrations that recover</h3>
              <p>Design clear ownership and recovery paths across providers, devices, and backend services.</p>
            </div>
            <div className="problem-card">
              <h3>Production-ready delivery</h3>
              <p>Ship with observable behavior, thoughtful failure states, and a path to maintain the product.</p>
            </div>
          </div>
        </div>
        {products.map((p, i) => (
          <div className="wrap" key={p.slug}>
            <div className={`product-row${i % 2 === 1 ? " reverse" : ""}`}>
              <div className="product-visual reveal">
                {p.image ? (
                  <img src={p.image} alt={p.company} />
                ) : (
                  <span className="placeholder">{p.label}</span>
                )}
              </div>
              <div className="product-meta reveal reveal-delay-1">
                <p className="eyebrow">{p.company}</p>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="product-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <p style={{ marginTop: 24 }}>
                  <Link className="text-link" to={`/products/${p.slug}`}>
                    Read case study →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="wrap">
          <p className="see-all reveal">
            <Link to="/products">See all case studies →</Link>
          </p>
        </div>
      </section>

      {/* ENGINEERING JUDGMENT */}
      <section className="judgment" id="engineering">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Engineering judgment</p>
            <h2>I think beyond the implementation.</h2>
            <p className="lede">
              The difficult part of product engineering is not writing the code.
              It is deciding what the code should do when reality disagrees with
              the plan.
            </p>
          </div>
          <div className="judgment-grid">
            {judgment.map((j) => (
              <div className="judgment-item reveal" key={j.num}>
                <p className="num">{j.num}</p>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNERSHIP */}
      <section className="ownership" id="ownership">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Ownership</p>
            <h2>I take responsibility beyond the code.</h2>
            <p className="lede">
              Three principles I hold on every product.
            </p>
          </div>
          <div className="ownership-grid">
            {ownership.map((o) => (
              <div className="ownership-card reveal" key={o.num}>
                <p className="num">{o.num}</p>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSPECTIVE / WRITING */}
      <section className="perspective" id="writing">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Engineering perspective</p>
            <h2>Writing on product engineering.</h2>
            <p className="lede">
              Selected notes on the decisions behind systems that have to work.
            </p>
          </div>
          <div className="perspective-grid">
            {featuredPosts.map((p) => (
              <div className="perspective-item reveal" key={p.slug}>
                <Link to={`/blog/${p.slug}`}>
                  <time>{p.time}</time>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </Link>
              </div>
            ))}
          </div>
          <p className="see-all reveal" style={{ marginTop: 32 }}>
            <Link to="/blog">See all notes →</Link>
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="reveal">
              <p className="eyebrow">About</p>
              <h2>I believe engineering means taking responsibility for how a product works.</h2>
            </div>
            <div className="reveal reveal-delay-1">
              <p>
                I am a Product Engineer. I work with early-stage teams to turn
                business requirements into reliable software — owning the
                engineering decisions, system design, and execution required to
                take products from idea to production.
              </p>
              <p>
                My background is in mobile and backend engineering across
                booking, payments, discovery, content, and rewards products. I
                care about what being wrong costs in a specific business, and I
                design systems around that number.
              </p>
              <p>
                I collaborate directly with founders: I ask the questions that
                force a requirements document to describe a system that can
                actually exist on a phone, then I build it, and I stay with it
                in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION */}
      <section className="convert">
        <div className="wrap">
          <h2 className="reveal">Your product deserves engineering ownership.</h2>
          <p className="reveal reveal-delay-1">
            Tell me what you are building and what needs to work.
          </p>
          <div className="convert-links reveal reveal-delay-2">
            <a className="btn btn-on-dark" href="mailto:mashrafiahnam1@gmail.com">
              Discuss your product →
            </a>
            <a href="https://www.linkedin.com/in/mashrafi-ahnam/" target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href="mailto:mashrafiahnam1@gmail.com">mashrafiahnam1@gmail.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
