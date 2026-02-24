import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../lib/supabase';

export default function Home({ posts }) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Industry Insights Blog';
  const siteDesc = process.env.NEXT_PUBLIC_SITE_DESC || 'Expert articles on technology, AV solutions, and professional services.';

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <meta name="description" content={siteDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="site">
        <header className="header">
          <div className="container">
            <h1 className="site-title">{siteName}</h1>
            <p className="site-desc">{siteDesc}</p>
          </div>
        </header>

        <main className="container">
          <div className="posts-grid">
            {posts.length === 0 && (
              <p className="empty">No articles published yet. Check back soon!</p>
            )}
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                <span className="niche-tag">{post.niche}</span>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <time>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  <span>{post.word_count} words</span>
                </div>
              </article>
            ))}
          </div>
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

export async function getStaticProps() {
  let posts = [];
  try {
    posts = await getAllPosts();
  } catch (e) {
    console.error('Failed to fetch posts:', e);
  }
  return {
    props: { posts },
    revalidate: 60,
  };
}
