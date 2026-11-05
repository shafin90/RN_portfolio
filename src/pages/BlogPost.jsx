import { Link, useParams } from "react-router-dom";
import posts from "../data/posts.json";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  return (
    <article className="page post">
      <div className="wrap">
        <p className="eyebrow">
          <Link to="/blog">Blog</Link> · {post.eyebrowMeta}
        </p>
        <h1 className="section-title">{post.detailTitle}</h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.prose }}
        />
        <p className="see-all">
          <Link to="/blog">← All notes</Link>
        </p>
      </div>
    </article>
  );
}
