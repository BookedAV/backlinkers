const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

export async function getAllPosts() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?status=eq.published&order=published_at.desc&select=title,slug,excerpt,niche,word_count,published_at`,
    { headers, next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getPostBySlug(slug) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&select=*`,
    { headers, next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data[0] || null;
}

export async function getAllSlugs() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?status=eq.published&select=slug`,
    { headers }
  );
  if (!res.ok) return [];
  return res.json();
}
