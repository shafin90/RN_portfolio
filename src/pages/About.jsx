import { Link } from "react-router-dom";

const career = [
  { date: "Nov 2023 – Jan 2024 · 3 months", role: "Web Developer Intern", company: "Hygwell · NGN Healthcare India", detail: "Started with responsive React and Tailwind interfaces, Redux state, and the habits of building maintainable features with a team." },
  { date: "Feb 2024 – Jul 2024 · 6 months", role: "Full Stack Developer · Contract", company: "Hygwell · India", detail: "Worked across React, Node.js, Express, and MongoDB on an AI product, with cloud deployment on AWS and GCP. Worked under the mentorship of Chakri Muthyala.", mentor: true },
  { date: "Jul 2024 – Oct 2025 · 1 year 4 months", role: "Full Stack Mobile Engineer · Contract", company: "Govihari", detail: "Built a river-boat ticketing experience from trip search and seat selection through payment, ticket generation, and operations. This was where I learned to treat inventory, money, and boarding as one connected product workflow." },
  { date: "Jul 2025 – Mar 2026 · 9 months", role: "Full Stack Developer", company: "Legato Networks · Remote", detail: "Built musician discovery and collaboration: location-aware search, matching, social actions, chat, and the production delivery work needed to keep those flows dependable." },
  { date: "Dec 2025 – Present", role: "Product Engineer", company: "KavooGo · Remote", detail: "Own reward and payout correctness across campaign budgets, user balances, survey completion, and mobile money settlement." },
  { date: "Apr 2026 – Jul 2026 · 4 months", role: "Full Stack Mobile Engineer", company: "SRKAN · Canada · Remote", detail: "Built mobile and backend features for an offline-first devotional platform, including local reading and audio, reminders, donation integrations, and admin workflows." },
  { date: "Jun 2026 – Jul 2026 · 2 months", role: "Bug Fixer · Mid-Level Full Stack Developer", company: "PoolRev · United States · Remote", detail: "Joined a live multi-tenant pool-service platform to repair billing state, tenant access boundaries, refunds, and field operations. Validated fixes against sitemap specifications and multi-phase simulators." },
  { date: "Jun 2026 – Present", role: "Product Engineer · Contract", company: "JetExpress · United States · Remote", detail: "Building booking and operations workflows where trips, seats, payments, tickets, and passenger communication must remain consistent under concurrency." },
];

export default function About() {
  return (
    <>
      <section className="page about-page">
        <div className="wrap">
          <div className="about-grid">
            <div>
              <p className="eyebrow">About me</p>
              <h1>From my first web internship to owning products in production.</h1>
            </div>
            <div className="about-copy">
              <p>I am Mashrafi Ahnam Shafin. I began my career in November 2023 with a three-month web development internship. I was learning how to build interfaces; I did not yet know how much product quality depends on the behavior behind them.</p>
              <p>A six-month full-stack contract took me into React, Node.js, databases, cloud deployment, and AI workflows. Under Chakri Muthyala’s mentorship, I started seeing the whole product instead of a single screen. Then Govihari gave me a concrete product problem: a passenger, a boat seat, a payment, and a ticket all had to agree.</p>
              <p>That lesson stayed with me through musician discovery at Legato and offline reading, audio, and donations at SRKAN. A short engagement at PoolRev taught me to look for the quiet failures in a live product: a stale billing state, a tenant boundary, or an operational action that never persisted. At KavooGo and JetExpress, I now work on reward payouts and concurrent booking operations. Across each product, the thread is ownership: understand what must remain true for the user and business, then build the system that keeps it true in production.</p>
              <p className="see-all"><Link to="/products">Read the product case studies →</Link></p>
            </div>
          </div>
        </div>
      </section>
      <section className="career-section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Career journey</p>
            <h2>Learning to own more of the product at every step.</h2>
          </div>
          <div className="career-timeline">
            {career.map((item) => (
              <article className="career-entry" key={`${item.company}-${item.role}`}>
                <p className="career-date">{item.date}</p>
                <div>
                  <h3>{item.role}</h3>
                  <p className="career-company">{item.company}</p>
                  <p>{item.detail}{item.mentor && <> <a href="https://www.linkedin.com/in/chakri-cv/" target="_blank" rel="noreferrer">Chakri’s LinkedIn →</a></>}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cred about-cred">
        <div className="wrap">
          <p className="eyebrow">A little context</p>
          <h2>Work grounded in real product constraints.</h2>
          <div className="cred-grid">
            <div className="cred-item"><strong>Mobile and backend</strong><span>Systems designed across the app and the services it depends on.</span></div>
            <div className="cred-item"><strong>From idea to production</strong><span>Product decisions, implementation, launch, and follow-through.</span></div>
            <div className="cred-item"><strong>Multiple domains</strong><span>Booking, payments, discovery, content, and rewards.</span></div>
            <div className="cred-item"><strong>Founder collaboration</strong><span>Direct partnership to turn uncertainty into buildable decisions.</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
