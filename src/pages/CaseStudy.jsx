import { useParams } from "react-router-dom";
import cases from "../data/caseStudies.json";

export default function CaseStudy() {
  const { slug } = useParams();
  const item = cases.find((c) => c.slug === slug);
  if (!item) return null;
  return (
    <section className="case-study" id={item.slug}>
      <div className="wrap">
        <p className="eyebrow">Case Study</p>
        <h2 className="section-title">{item.detailTitle}</h2>
        <div
          className="story-body"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      </div>
    </section>
  );
}
