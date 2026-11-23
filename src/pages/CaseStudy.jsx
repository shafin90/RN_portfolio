import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import cases from "../data/caseStudies.js";
import { Link } from "react-router-dom";
import SystemFlow3D from "../components/SystemFlow3D.jsx";
import systemMaps from "../data/systemMaps.js";

function RichText({ text }) {
  const value = String(text ?? "");
  const parts = value.split(/(\*\*[^*]+\*\*|==[^=]+==)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <mark className="case-mark" key={index}>
              {part.slice(2, -2)}
            </mark>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

function Paragraphs({ items }) {
  if (!items?.length) return null;
  return (
    <div className="case-section-copy">
      {items.map((paragraph, index) => (
        <p key={index}>
          <RichText text={paragraph} />
        </p>
      ))}
    </div>
  );
}

function Stats({ items }) {
  return (
    <div className="case-stats">
      {items.map((stat) => (
        <div className="case-stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function Cards({ items }) {
  return (
    <div className="case-card-grid" data-count={items.length}>
      {items.map((card) => (
        <article className="case-info-card" key={card.title}>
          {card.label && <p className="case-card-label">{card.label}</p>}
          <h3>{card.title}</h3>
          {card.body && (
            <p>
              <RichText text={card.body} />
            </p>
          )}
          {card.items && (
            <ul className="case-card-list">
              {card.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

function Tags({ title, items }) {
  return (
    <div className="case-tags-block">
      {title && <p className="case-block-label">{title}</p>}
      <ul className="case-tags">
        {items.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

function FlowStrip({ flow }) {
  return (
    <div className="case-flow-strip">
      {flow.title && <p className="case-block-label">{flow.title}</p>}
      <ol className="case-flow-steps" data-count={flow.steps.length}>
        {flow.steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Decisions({ items }) {
  return (
    <div className="case-decision-list">
      {items.map((decision) => (
        <article className="case-decision" key={decision.title}>
          <header>
            <span className="case-decision-number">{decision.number}</span>
            <h3>{decision.title}</h3>
          </header>
          <dl className="case-decision-grid">
            <div>
              <dt>Problem</dt>
              <dd>
                <RichText text={decision.problem} />
              </dd>
            </div>
            <div>
              <dt>Decision</dt>
              <dd>
                <RichText text={decision.decision} />
              </dd>
            </div>
            <div>
              <dt>Trade-off</dt>
              <dd>
                <RichText text={decision.tradeoff} />
              </dd>
            </div>
            <div>
              <dt>Impact</dt>
              <dd>
                <RichText text={decision.impact} />
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function Flows({ items }) {
  return (
    <div className="case-accordion">
      {items.map((flow, index) => (
        <details
          className="case-accordion-item case-flow-item"
          key={flow.id}
          open={index === 0}
        >
          <summary>
            <span className="case-flow-badge">{flow.id}</span>
            <span className="case-accordion-summary">
              <strong>{flow.title}</strong>
              <span>{flow.summary}</span>
            </span>
            <span className="case-accordion-toggle" aria-hidden="true" />
          </summary>
          <div className="case-accordion-body">
            <ol
              className="case-flow-steps case-flow-steps-compact"
              data-count={flow.steps.length}
            >
              {flow.steps.map((step, stepIndex) => (
                <li key={step}>
                  <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <p>
              <RichText text={flow.body} />
            </p>
            {flow.callout && (
              <aside className="case-inline-note">
                <span>Failure handling</span>
                <p>
                  <RichText text={flow.callout} />
                </p>
              </aside>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

function Challenges({ items }) {
  return (
    <div className="case-accordion">
      {items.map((challenge, index) => (
        <details
          className="case-accordion-item case-challenge-item"
          key={challenge.number}
          open={index === 0}
        >
          <summary>
            <span className="case-challenge-number">{challenge.number}</span>
            <span className="case-accordion-summary">
              <strong>{challenge.title}</strong>
              <span>{challenge.problem}</span>
            </span>
            <span className="case-accordion-toggle" aria-hidden="true" />
          </summary>
          <div className="case-accordion-body">
            {challenge.options && (
              <div className="case-options">
                <p className="case-block-label">Options considered</p>
                <ul>
                  {challenge.options.map((option) => (
                    <li key={option.label} data-verdict={option.verdict}>
                      <div>
                        <strong>{option.label}</strong>
                        <span className="case-option-verdict">
                          {option.verdict}
                        </span>
                      </div>
                      <p>{option.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <dl className="case-decision-grid">
              <div>
                <dt>Decision</dt>
                <dd>
                  <RichText text={challenge.decision} />
                </dd>
              </div>
              <div>
                <dt>Trade-off</dt>
                <dd>
                  <RichText text={challenge.tradeoff} />
                </dd>
              </div>
              <div>
                <dt>Impact</dt>
                <dd>
                  <RichText text={challenge.impact} />
                </dd>
              </div>
            </dl>
          </div>
        </details>
      ))}
    </div>
  );
}

function CaseList({ list }) {
  const ListTag = list.ordered ? "ol" : "ul";
  return (
    <div className="case-list-block">
      {list.title && <p className="case-block-label">{list.title}</p>}
      <ListTag
        className={`case-list${list.ordered ? " case-list-ordered" : ""}`}
      >
        {list.items.map((item, index) => (
          <li key={item}>
            {list.ordered ? (
              <span className="case-list-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : (
              <span className="case-list-dot" aria-hidden="true" />
            )}
            <span>
              <RichText text={item} />
            </span>
          </li>
        ))}
      </ListTag>
    </div>
  );
}

function Callout({ callout }) {
  return (
    <aside className="case-callout">
      <span>{callout.label}</span>
      <p>
        <RichText text={callout.text} />
      </p>
    </aside>
  );
}

function Section({ section, slug, index, total }) {
  const paragraphs =
    section.paragraphs || (section.body ? section.body.split("\n\n") : []);
  const layout = section.layout || ["paragraphs", "cards", "quote", "callout"];
  const number = section.number || String(index + 1).padStart(2, "0");

  const renderBlock = (type) => {
    switch (type) {
      case "paragraphs":
        return <Paragraphs key={type} items={paragraphs} />;
      case "cards":
        return section.cards ? <Cards key={type} items={section.cards} /> : null;
      case "quote":
        return section.quote ? (
          <blockquote className="case-pullquote" key={type}>
            <RichText text={section.quote} />
          </blockquote>
        ) : null;
      case "stats":
        return section.stats ? <Stats key={type} items={section.stats} /> : null;
      case "flow":
        return section.flow ? (
          <FlowStrip key={type} flow={section.flow} />
        ) : null;
      case "tags":
        return section.tags ? (
          <Tags key={type} title={section.tagsTitle} items={section.tags} />
        ) : null;
      case "decisions":
        return section.decisions ? (
          <Decisions key={type} items={section.decisions} />
        ) : null;
      case "flows":
        return section.flows ? (
          <Flows key={type} items={section.flows} />
        ) : null;
      case "challenges":
        return section.challenges ? (
          <Challenges key={type} items={section.challenges} />
        ) : null;
      case "list":
        return section.list ? <CaseList key={type} list={section.list} /> : null;
      case "callout":
        return section.callout ? (
          <Callout key={type} callout={section.callout} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <article
      className="case-section"
      id={`${slug}-section-${number}`}
      key={section.title}
    >
      <header className="case-section-head">
        <span className="case-section-number">{number}</span>
        <div className="case-section-heading">
          <p className="case-section-kicker">
            Chapter {number} / {String(total).padStart(2, "0")}
          </p>
          <h2>{section.title}</h2>
        </div>
      </header>
      {section.summary && (
        <p className="case-section-summary">
          <RichText text={section.summary} />
        </p>
      )}
      {layout.map(renderBlock)}
    </article>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const item = cases.find((c) => c.slug === slug);
  const systemMap = item ? systemMaps[item.slug] || item.systemMap : null;

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const timer = window.setTimeout(() => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth";
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior, block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [slug]);

  if (!item)
    return (
      <section className="page">
        <div className="wrap">
          <p className="eyebrow">Case study not found</p>
          <h1>This project isn’t here.</h1>
          <p className="see-all">
            <Link to="/products">← All products</Link>
          </p>
        </div>
      </section>
    );

  const sections = item.sections || [];

  return (
    <section className="case-study" id={item.slug}>
      <div className="wrap">
        <p className="eyebrow">
          {item.company} · {item.role}
          {item.period ? ` · ${item.period}` : ""}
        </p>
        <h1 className="section-title">{item.detailTitle}</h1>
        <p className="lede case-study-lede">{item.excerpt}</p>

        {item.meta && (
          <dl className="case-meta">
            {item.meta.map((meta) => (
              <div key={meta.label}>
                <dt>{meta.label}</dt>
                <dd>{meta.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {item.productLinks?.length > 0 && (
          <nav className="case-product-links" aria-label={`${item.company} product links`}>
            {item.productLinks.map((link) => (
              <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
                {link.label}<span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </nav>
        )}

        {item.availabilityNote && (
          <p className="case-availability-note">{item.availabilityNote}</p>
        )}

        {item.atAGlance && (
          <section className="case-glance" aria-label="Case study at a glance">
            <div className="case-glance-head">
              <p className="eyebrow">The product thesis</p>
              <p className="case-glance-note">
                What this case study argues, before the details.
              </p>
            </div>
            <ol className="case-glance-grid">
              {item.atAGlance.map((point) => (
                <li key={point.number}>
                  <span>{point.number}</span>
                  <p>{point.title}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {item.scopeNote && (
          <aside className="case-scope-note">
            <span>Scope boundary</span>
            <p>{item.scopeNote}</p>
          </aside>
        )}

        {systemMap ? (
          <SystemFlow3D key={item.slug} map={systemMap} title={item.company} />
        ) : (
          item.systemFlow && (
            <section
              className="case-system"
              aria-label={`${item.company} system flow`}
            >
              <p className="eyebrow">
                {item.systemLabel || "How the system works"}
              </p>
              <ol className="case-system-flow">
                {item.systemFlow.map((step, index) => (
                  <li key={step}>
                    <span className="case-flow-index">
                      0{index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )
        )}

        {item.narrative ? (
          <div className="case-study-narrative">
            {item.narrative.map((paragraph, index) =>
              typeof paragraph === "string" ? (
                <p
                  className={index === 0 ? "case-opening" : "case-outcome"}
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ) : (
                <article className="case-narrative-point" key={paragraph.lead}>
                  <h2>{paragraph.lead}</h2>
                  <p>{paragraph.body}</p>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="case-body">
            <aside className="case-rail" aria-label="Case study contents">
              <p className="case-rail-label">Contents</p>
              <nav>
                {sections.map((section, index) => {
                  const number =
                    section.number || String(index + 1).padStart(2, "0");
                  return (
                    <a
                      href={`#${item.slug}-section-${number}`}
                      key={section.title}
                    >
                      <span>{number}</span>
                      {section.navTitle || section.title}
                    </a>
                  );
                })}
              </nav>
            </aside>
            <div className="case-sections">
              {sections.map((section, index) => (
                <Section
                  key={section.title}
                  section={section}
                  slug={item.slug}
                  index={index}
                  total={sections.length}
                />
              ))}
              <div className="case-footer-nav">
                <Link to="/products">
                  Explore all case studies <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
