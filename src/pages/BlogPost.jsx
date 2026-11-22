import { Link, useParams } from "react-router-dom";
import posts from "../data/posts.json";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <article className="page"><div className="wrap"><p className="eyebrow">Note not found</p><h1>This article isn’t here.</h1><p className="see-all"><Link to="/blog">← All notes</Link></p></div></article>;
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
