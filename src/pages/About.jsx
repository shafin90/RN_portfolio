import { Link } from "react-router-dom";

const career = [
  { date: "Nov 2023 – Jan 2024 · 3 months", role: "Web Developer Intern", company: "Hygwell · NGN Healthcare India", detail: "Started with responsive React and Tailwind interfaces, Redux state, and the habits of building maintainable features with a team." },
  { date: "Feb 2024 – Jul 2024 · 6 months", role: "Full Stack Developer · Contract", company: "Hygwell · India", detail: "Worked across React, Node.js, Express, and MongoDB on an AI product, with cloud deployment on AWS and GCP.", mentor: true, mentorBefore: "Under the mentorship of", mentorAfter: ". " },
  { date: "Jul 2024 – Oct 2025 · 1 year 4 months", role: "Full Stack Mobile Engineer · Contract", company: "Govihari", detail: "I built a river-boat ticketing experience from trip search and seat selection through payment, ticket generation, and operations. This was where I learned to treat inventory, money, and boarding as one connected product workflow.", mentor: true, mentorBefore: "Working with", mentorAfter: ", " },
  { date: "Jul 2025 – Mar 2026 · 9 months", role: "Full Stack Developer", company: "Legato Networks · Remote", detail: "Built musician discovery and collaboration: location-aware search, matching, social actions, chat, and the production delivery work needed to keep those flows dependable." },
  { date: "Dec 2025 – Present", role: "Product Engineer", company: "KavooGo · Remote", source: "Upwork", detail: "Own reward and payout correctness across campaign budgets, user balances, survey completion, and mobile money settlement." },
  { date: "Apr 2026 – Jul 2026 · 4 months", role: "Full Stack Mobile Engineer", company: "SRKAN · Canada · Remote", source: "Upwork", detail: "Built mobile and backend features for an offline-first devotional platform, including local reading and audio, reminders, donation integrations, and admin workflows." },
  { date: "Jun 2026 – Jul 2026 · 2 months", role: "Bug Fixer · Mid-Level Full Stack Developer", company: "PoolRev · United States · Remote", source: "Upwork", detail: "Joined a live multi-tenant pool-service platform to repair billing state, tenant access boundaries, refunds, and field operations. Validated fixes against sitemap specifications and multi-phase simulators." },
  { date: "Jun 2026 – Present", role: "Product Engineer · Contract", company: "JetExpress · United States · Remote", source: "Upwork", detail: "Building booking and operations workflows where trips, seats, payments, tickets, and passenger communication must remain consistent under concurrency." },
];

export default function About() {
  return (
    <>
      <section className="page about-page">
        <div className="wrap">
          <div className="about-intro">
            <div className="about-intro-copy">
              <p className="eyebrow">A little about how I got here</p>
              <h1>Building products beyond the interface.</h1>
              <p className="about-intro-lede">I’m Mashrafi Ahnam Shafin, a product engineer who likes understanding the whole promise a product makes—then making sure the system can keep it.</p>
              <p className="about-intro-story">Since my first internship in 2023, I’ve moved across mobile, backend, and operations. Each product has widened my view of the work: from a screen that feels right to the booking, payment, or workflow that must remain right after launch.</p>
              <div className="about-intro-footer">
                <Link to="/products">Explore the product work <span aria-hidden="true">↗</span></Link>
                <span>Product thinking · Engineering · Ownership</span>
              </div>
            </div>
            <div className="about-photo-story" aria-label="Moments from Mashrafi’s engineering journey">
              <figure className="about-photo about-photo-main">
                <img src="/about1.jpg" alt="Mashrafi at a Programming Hero community event" />
                <figcaption>Where the journey began</figcaption>
              </figure>
              <figure className="about-photo about-photo-stage">
                <img src="/about3.jpg" alt="Mashrafi speaking at a community event" />
                <figcaption>Sharing what I learn along the way</figcaption>
              </figure>
              <p className="about-photo-note"><span>2023 → now</span> A career built one product lesson at a time.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="career-section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Career journey</p>
            <h2>Learning to own more of the product at every step.</h2>
            <p className="lede">Recent product engagements through Upwork. <a href="https://www.upwork.com/freelancers/~0162ee796651f12a34" target="_blank" rel="noreferrer">View my Upwork profile ↗</a></p>
          </div>
          <div className="career-timeline">
            {career.map((item) => (
              <article className="career-entry" key={`${item.company}-${item.role}`}>
                <p className="career-date">{item.date}</p>
                <div>
                  <h3>{item.role}</h3>
                  <p className="career-company">{item.company}{item.source && <span className="career-source">{item.source} contract</span>}</p>
                  <p>{item.mentor && <>{item.mentorBefore} <a href="https://www.linkedin.com/in/chakri-cv/" target="_blank" rel="noreferrer" aria-label="Chakri Muthyala on LinkedIn">Chakri Muthyala ↗</a>{item.mentorAfter}</>}{item.detail}</p>
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
