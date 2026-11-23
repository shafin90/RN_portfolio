import { Link } from "react-router-dom";
import posts from "../data/posts.json";

const featuredProducts = [
  {
    slug: "poolrev",
    company: "PoolRev",
    stage: "Live",
    title: "Keep field service and billing in sync, property by property.",
    problem: "Pool-service teams need customer, property, technician work, invoices, and payments to agree across office and field workflows.",
    outcome: "Operators can follow work from estimates and routes through service records, property-level billing, payment, and recovery.",
    decision: "Treat each property as the billing unit, reconcile money against open invoices, and enforce tenant boundaries at data and server layers.",
    tags: ["Billing integrity", "Field operations", "Tenant safety"],
  },
  {
    slug: "jetexpress",
    company: "JetExpress",
    stage: "Live",
    title: "One transport network. Two businesses. Shared operational truth.",
    problem: "Passenger bookings and parcel delivery use the same routes, fleet, and teams. The system has to keep their workflows distinct while giving operators one control plane.",
    outcome: "Passengers can book trips and retrieve tickets while operators coordinate parcel handoffs and field staff handle trip work—all around shared trip and fleet data.",
    decision: "Separate booking and shipment domains, then connect them through shared trip and fleet resources.",
    tags: ["Multi-tenant", "Payments", "Operations"],
  },
  {
    slug: "govihari",
    company: "Govihari",
    stage: "Delivered",
    title: "Boat tickets that stay trustworthy at the dock.",
    problem: "Fixed seats, payment confirmation, and boarding all need to agree—even when guests have no account and the network is unreliable.",
    outcome: "Delivered a complete guest journey from boat and seat selection through server-verified payment, ticket generation, and operator-side booking management.",
    decision: "Make the server verify payment and booking state, give temporary holds an expiry, and generate a ticket the operator can validate.",
    tags: ["Booking", "Payment state", "Field workflows"],
  },
  {
    slug: "legato",
    company: "Legato Networks",
    stage: "Live",
    title: "Help musicians find the right people nearby.",
    problem: "A useful collaboration product needs more than profiles: relevant discovery, safe social boundaries, and conversation after a match.",
    outcome: "Musicians can discover collaborators by skill and location, form social connections and groups, then continue the conversation through integrated chat.",
    decision: "Connect skill and location search with profiles, social actions, groups, and real-time chat in one product journey.",
    tags: ["Discovery", "Geo search", "Realtime"],
  },
];

const founderSignals = [
  { scope: "Customer experience", title: "More journeys depend on the system.", body: "Customers expect bookings, payments, and account changes to complete reliably from end to end." },
  { scope: "Operations", title: "Exceptions create more manual work.", body: "When a workflow leaves gaps, a small team ends up reconciling states and answering avoidable support questions." },
  { scope: "Engineering", title: "Every change touches more paths.", body: "More users, integrations, and product surfaces make unclear ownership and hidden dependencies harder to manage." },
];

const approach = [
  { number: "01", title: "Find the costly failure", body: "Start with the business promise. Who is affected when it fails, and what does that failure cost?" },
  { number: "02", title: "Choose the smallest sound system", body: "Turn that promise into clear states, ownership boundaries, and recovery paths before adding infrastructure." },
  { number: "03", title: "Ship, observe, improve", body: "Deliver the workflow end to end, make production behavior visible, and use what happens to choose the next investment." },
];

const recommendations = [
  {
    name: "Zach Petty",
    initials: "ZP",
    image: "/zach-petty.jpg",
    role: "Senior colleague at Legato Networks",
    currentRoles: [{ title: "CEO", company: "Legato Networks · USA", url: "https://www.linkedin.com/company/112346548/", logo: "/legato_logo.jpeg" }],
    date: "Apr 2, 2026",
    url: "https://www.linkedin.com/in/zach-petty-786224187/",
    quote: "Mashrafi Ahnam Shafin has consistently shown up with professionalism, clarity, and a strong willingness to grow. He communicates thoughtfully, comes prepared, and contributes meaningful feedback, even in broader product and pitch discussions. What stands out most is his attitude: reliable, respectful, and genuinely invested in doing great work and improving every day. He’s been a pleasure to work with, and I’d highly recommend connecting with him. Happy to make an introduction if helpful.",
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
    image: null,
    role: "Direct manager and mentor",
    currentRoles: [{ title: "AI/ML Engineer II", company: "Insight Global · IG Labs", url: "https://www.linkedin.com/company/11056/", logo: "/insight-global.jpg" }],
    date: "Oct 1, 2025",
    url: "https://www.linkedin.com/in/chakri-cv/",
    quote: "I’ve worked with Shafin for almost two years, starting from his internship and later on a full-time contract roles. Over this time, I’ve seen him grow into a reliable and skilled developer who can take on challenges with confidence. He’s proactive, communicates clearly, and always delivers quality work. I’d definitely recommend him to anyone looking for a dedicated and talented developer.",
  },
  {
    name: "Amitoj Singh",
    image: "/amitoj-singh.jpg",
    initials: "AS",
    role: "SRKAN project collaborator",
    currentRoles: [{ title: "Co-Founder & Full-Stack Developer", company: "Hazur.io · Canada", url: "https://www.linkedin.com/company/101705725/", logo: "/hazur-io.jpg" }],
    date: "LinkedIn recommendation",
    url: "https://www.linkedin.com/in/singh-amitoj/",
    quote: "Mashrafi delivered excellent work and was great to collaborate with. He communicated clearly, took ownership of challenges, and consistently focused on quality. The project was completed successfully, and I would happily hire him again for future work.",
  },
];

const featuredPosts = ["the-workflow-is-the-product-boundary", "money-and-inventory-have-different-clocks"];

export const products = [
  ...featuredProducts.map((product) => ({ ...product, desc: product.problem, label: product.company, image: null })),
  { slug: "srkan", company: "SRKAN", title: "Devotional platform, steady on weak networks", desc: "Offline reading, local reminders, and donation workflows designed around the realities of the connection.", label: "SRKAN", image: "/srkan-logo.png", tags: ["Offline", "Donations", "Content"] },
  { slug: "kavoogo", company: "KavooGo", title: "Campaigns, rewards, and payout accounting", desc: "An ongoing mobility product whose current repository centers on campaign activity, reward accounting, and payment flows.", label: "KavooGo", image: null, tags: ["Campaigns", "Rewards", "Payouts"] },
];

export default function Home() {
  const featuredPostData = posts.filter((post) => featuredPosts.includes(post.slug));

  return (
    <>
      <section className="home-hero">
        <div className="wrap home-hero-grid">
          <div className="home-hero-copy reveal">
            <p className="eyebrow">Product engineer · Mobile + backend</p>
            <h1>Scale your product. Keep customer trust.</h1>
            <p className="home-hero-lede">I work with small product teams across mobile and backend—from clarifying requirements and shaping system decisions to shipping workflows and improving production reliability.</p>
            <div className="home-hero-proof" aria-label="Engineering focus areas">
              <span>Payment integrity</span><i aria-hidden="true" /><span>Failure recovery</span><i aria-hidden="true" /><span>Operational clarity</span>
            </div>
          </div>
          <figure className="home-hero-portrait reveal reveal-delay-1">
            <img src="/portrait.jpg" alt="Mashrafi Ahnam Shafin" />
            <figcaption><span className="home-status-dot" /> Product decisions to production behavior</figcaption>
          </figure>
        </div>
      </section>

      <section className="home-proof">
        <div className="wrap">
          <div className="home-section-top reveal">
            <div><p className="eyebrow">Recommendations</p></div>
            <a className="upwork-badge" href="https://www.upwork.com/freelancers/~0162ee796651f12a34" target="_blank" rel="noreferrer"><span className="upwork-mark">U</span><span><strong>Top Rated</strong><small>Upwork freelancer</small></span><span className="upwork-arrow" aria-hidden="true">↗</span></a>
          </div>
          <div className="home-recommendation-grid">
            {recommendations.map((item) => (
              <blockquote className="home-recommendation reveal" key={item.name}>
                <p>“{item.quote}”</p>
                <footer>
                  {item.image ? <img src={item.image} alt="" loading="lazy" /> : <span className="recommendation-avatar" aria-hidden="true">{item.initials}</span>}
                  <span className="home-recommendation-byline"><a href={item.url} target="_blank" rel="noreferrer">{item.name} ↗</a><small>{item.role}</small></span>
                </footer>
                <div className="home-recommendation-roles">
                  {item.currentRoles.map((position) => (
                    <a href={position.url} target="_blank" rel="noreferrer" key={`${position.title}-${position.company}`}>
                      {position.logo && <img src={position.logo} alt="" loading="lazy" />}
                      <span><strong>{position.title}</strong><small>{position.company} ↗</small></span>
                    </a>
                  ))}
                </div>
                <time className="home-recommendation-date">{item.date}</time>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-pressure" id="work">
        <div className="wrap">
          <div className="section-head founder-pressure-head reveal">
            <p className="eyebrow">When the product starts to scale</p>
            <h2>Growth adds pressure at three points.</h2>
            <p className="lede">For a small team, more customers and faster delivery can expose gaps between what the product promises and what the system can reliably do.</p>
          </div>
          <div className="founder-signals">
            {founderSignals.map((signal, index) => (
              <article className="founder-signal reveal" key={signal.title}>
                <span className="founder-signal-number">0{index + 1}</span>
                <p className="founder-signal-scope">{signal.scope}</p>
                <h3>{signal.title}</h3>
                <p>{signal.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-work" id="case-work">
        <div className="wrap">
          <div className="home-section-top reveal">
            <div><p className="eyebrow">Selected product work</p><h2>Different businesses. Real system decisions.</h2></div>
            <Link to="/products" className="home-text-link">All six case studies <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-case-grid">
            {featuredProducts.map((product, index) => (
              <article className="home-case-card reveal" key={product.slug}>
                <div className="home-case-top"><span>0{index + 1}</span><span className="home-case-status">{product.stage}</span></div>
                <p className="eyebrow">{product.company}</p>
                <h3>{product.title}</h3>
                <p className="home-case-problem">{product.problem}</p>
                <div className="home-case-outcome"><span>Product outcome</span><p>{product.outcome}</p></div>
                <div className="home-case-decision"><span>Engineering decision</span><p>{product.decision}</p></div>
                <div className="product-tags">{product.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <Link className="home-case-link" to={`/products/${product.slug}`}>Explore the case study <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
          <p className="home-work-note">Each case study covers the product problem, decisions, architecture, key flows, trade-offs, shipped scope, and what I would improve next.</p>
        </div>
      </section>

      <section className="home-approach">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">How I work with founders</p>
            <h2>Make the important product promise hold up in production.</h2>
            <p className="lede">The case studies show the decisions in practice. My approach is to start with the business risk, design a system the team can operate, then use production feedback to guide the next investment.</p>
          </div>
          <div className="approach-grid">
            {approach.map((item) => (
              <article className="approach-card reveal" key={item.number}>
                <span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="home-principle reveal"><span>My test for a system decision</span><p>Can the team explain what happens when the payment arrives twice, the network disappears, or two people claim the same resource?</p></div>
        </div>
      </section>

      <section className="home-thinking">
        <div className="wrap">
          <div className="home-notes-head reveal">
            <div><p className="eyebrow">Notes from the engineering side</p><h2>Decisions that shape the product after launch.</h2><p className="lede">Short essays on payment safety, booking behavior, and the product decisions behind them.</p></div>
            <Link className="home-text-link" to="/blog">Browse all writing <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-post-grid">
            {featuredPostData.map((post) => (
              <Link className="home-post" to={`/blog/${post.slug}`} key={post.slug}>
                <span className="home-post-meta">{post.time}</span>
                <div className="home-post-copy"><strong>{post.title}</strong><p>{post.excerpt}</p><span className="home-post-read">Read the note <span aria-hidden="true">→</span></span></div>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-about">
        <div className="wrap">
          <div className="home-story-panel reveal">
            <div className="home-story-marker"><span>2023</span><i aria-hidden="true" /><span>Today</span><small>My engineering journey</small></div>
            <div className="home-story-copy">
              <p className="eyebrow">A little about how I got here</p>
              <h2>Working across the stack taught me to see the whole product.</h2>
              <p>I started with an internship, then grew through contract and product team work across mobile, backend, and operations. Each product made the same lesson clearer: a feature only works when the surrounding system supports the promise it makes.</p>
              <Link className="home-text-link" to="/about">Read my career story <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-contact">
        <div className="wrap">
          <div className="home-contact-panel">
            <div className="home-contact-copy">
              <p className="eyebrow">For founders of small, growing teams</p>
              <h2>What needs to become more reliable as you scale?</h2>
              <p>Tell me what you’re building, where customers or your team are hitting friction, and what the product needs to handle next. A short note is enough to start.</p>
            </div>
            <div className="home-contact-actions">
              <a className="btn btn-primary" href="mailto:mashrafiahnam1@gmail.com?subject=Scaling%20product%20engineering">Email me about your product <span aria-hidden="true">→</span></a>
              <span>Prefer LinkedIn?</span>
              <a className="home-contact-email" href="https://www.linkedin.com/in/mashrafi-ahnam/" target="_blank" rel="noreferrer">Connect with me ↗</a>
              <small>mashrafiahnam1@gmail.com</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
