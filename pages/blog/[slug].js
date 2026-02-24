import Head from 'next/head';
import Link from 'next/link';
import { getPostBySlug, getAllSlugs } from '../../lib/supabase';

export default function BlogPost({ post }) {
  if (!post) {
    return (
      <div className="site">
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <h1>Post Not Found</h1>
          <p><Link href="/">← Back to home</Link></p>
        </div>
      </div>
    );
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Industry Insights Blog';

  return (
    <>
      <Head>
        <title>{post.title} | {siteName}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="site">
        <header className="header">
          <div className="container">
            <Link href="/" className="back-link">← {siteName}</Link>
          </div>
        </header>

        <main className="container">
          <article className="article">
            <span className="niche-tag">{post.niche}</span>
            <h1 className="article-title">{post.title}</h1>
            <div className="post-meta" style={{ marginBottom: '2rem' }}>
              <time>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span>{post.word_count} words</span>
            </div>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          </article>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} {siteName}</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  return {
    paths: slugs.map((s) => ({ params: { slug: s.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
    revalidate: 60,
  };
}
