import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, API_BASE_URL } from '../api/client';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.getBlogDetail(slug).then((res) => {
      if (!isMounted) return;
      if (res.ok && res.data) {
        setBlogData(res.data);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const getImageUrl = (img) => {
    if (!img) return '/images/portfolio/project-1.jpg';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (img.startsWith('/media/')) return `${API_BASE_URL}${img}`;
    if (img.startsWith('/')) return img;
    return `${API_BASE_URL}/media/${img}`;
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '120px 20px', textAlign: 'center', color: '#94a3b8' }}>
        <h2>Loading article...</h2>
      </div>
    );
  }

  if (!blogData || !blogData.blog) {
    return (
      <div className="container" style={{ padding: '120px 20px', textAlign: 'center', color: '#94a3b8' }}>
        <h2>Article Not Found</h2>
        <p>The requested blog article could not be located.</p>
        <Link to="/blogs/" className="home-btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          Back to Blogs
        </Link>
      </div>
    );
  }

  const { blog, latest_posts, previous_blog, next_blog, related } = blogData;

  return (
    <div>
      <SEO
        title={blog.title}
        description={blog.short_description || blog.title}
        canonical={`https://www.magencystudio.in/blog/${slug}`}
        ogType="article"
        ogImage={getImageUrl(blog.image)}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blogs', url: '/blogs' },
          { name: blog.title, url: `/blog/${slug}` },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.short_description || blog.title,
          image: getImageUrl(blog.image),
          datePublished: blog.created_at,
          author: {
            '@type': 'Organization',
            name: 'Magency Studio',
            url: 'https://www.magencystudio.in/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Magency Studio',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.magencystudio.in/images/favicon.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.magencystudio.in/blog/${slug}`,
          },
        }}
      />
      {/*=========================================
          BLOG DETAIL HERO
          ==========================================*/}
      <section className="blog-detail-page-hero">
        <div className="container">
          {/* Breadcrumb */}
          <div className="blog-detail-breadcrumb">
            <Link to="/">Home</Link>
            <i className="fa-solid fa-angle-right"></i>
            <Link to="/blogs/">Blog</Link>
            <i className="fa-solid fa-angle-right"></i>
            <span>{blog.title}</span>
          </div>

          {/* Category & Meta */}
          <div className="blog-detail-top-meta">
            {blog.category && (
              <span className="blog-detail-category">
                <i className="fa-solid fa-folder-open"></i> {blog.category.name}
              </span>
            )}
            <span>
              <i className="fa-regular fa-calendar"></i>{' '}
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>
              <i className="fa-regular fa-clock"></i> {blog.read_time} Min Read
            </span>
            <span>
              <i className="fa-regular fa-eye"></i> {blog.views} Views
            </span>
          </div>

          <h1 className="blog-detail-main-title">{blog.title}</h1>
          <p className="blog-detail-short-text">{blog.short_description}</p>

          {/* Author Card */}
          <div className="blog-detail-author-bar">
            <div className="blog-detail-author-left">
              <div>
                <h4>{blog.author_name || 'Magencystudio Team'}</h4>
                <span>Senior Content Writer • Magencystudio</span>
              </div>
            </div>

            <div className="blog-detail-author-right">
              <div className="blog-detail-reading-time">
                <i className="fa-solid fa-book-open-reader"></i>
                <span>{blog.read_time} Minutes</span>
              </div>
              <div className="blog-detail-share-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-x-twitter"></i></a>
                <a href={`https://wa.me/?text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="blog-detail-featured-image">
              <img src={getImageUrl(blog.image)} alt={blog.title} />
            </div>
          )}
        </div>
      </section>

      {/*=========================================
          BLOG CONTENT SECTION
          ==========================================*/}
      <section className="blog-detail-page-section">
        <div className="container">
          <div className="blog-detail-page-layout">
            <div className="blog-detail-left-column">
              <article className="blog-detail-article-card">
                <div className="blog-detail-article-content">
                  {blog.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} style={{ marginBottom: '1.4em', lineHeight: '1.8' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* HIGHLIGHT QUOTE */}
                <div className="blog-detail-highlight-quote">
                  <div className="blog-detail-quote-icon">
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <div>
                    <h3>Expert Insight</h3>
                    <p>
                      Great digital products are not built by writing more code. They are built by solving real business problems with the right technology.
                    </p>
                  </div>
                </div>

                {/* KEY TAKEAWAYS */}
                <div className="blog-detail-takeaways">
                  <h2>Key Takeaways</h2>
                  <div className="blog-detail-takeaway-grid">
                    <div className="blog-detail-takeaway-item">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>Build clean, scalable applications.</span>
                    </div>
                    <div className="blog-detail-takeaway-item">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>Focus on user experience first.</span>
                    </div>
                    <div className="blog-detail-takeaway-item">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>Improve website performance regularly.</span>
                    </div>
                    <div className="blog-detail-takeaway-item">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>Optimize for SEO and accessibility.</span>
                    </div>
                  </div>
                </div>

                {/* TAGS + SHARE */}
                <div className="blog-detail-footer-bar">
                  <div className="blog-detail-tags">
                    <span>Tags</span>
                    <a href="#">Django</a>
                    <a href="#">Python</a>
                    <a href="#">Web Development</a>
                    <a href="#">AI</a>
                  </div>

                  <div className="blog-detail-share">
                    <span>Share</span>
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-x-twitter"></i></a>
                    <a href="#"><i className="fab fa-whatsapp"></i></a>
                  </div>
                </div>
              </article>
            </div>

            {/* STICKY SIDEBAR */}
            <aside className="blog-detail-right-sidebar">
              <div className="blog-detail-sidebar-card">
                <h3>Latest Articles</h3>
                {latest_posts?.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.slug}/`}
                    className="blog-detail-latest-item"
                  >
                    {item.image && <img src={getImageUrl(item.image)} alt={item.title} />}
                    <div>
                      <h4>{item.title}</h4>
                      <span>
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="blog-detail-sidebar-newsletter">
                <span>JOIN OUR COMMUNITY</span>
                <h3>Get Weekly Tech Insights</h3>
                <p>Receive tutorials, AI tips and web development articles every week.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/*=========================================
          PREVIOUS / NEXT BLOG
          ==========================================*/}
      <section className="blog-detail-navigation-section">
        <div className="container">
          <div className="blog-detail-navigation-grid">
            {previous_blog && (
              <Link to={`/blog/${previous_blog.slug}/`} className="blog-detail-navigation-card">
                <small>
                  <i className="fa-solid fa-arrow-left"></i> Previous Article
                </small>
                <h3>{previous_blog.title}</h3>
              </Link>
            )}
            {next_blog && (
              <Link
                to={`/blog/${next_blog.slug}/`}
                className="blog-detail-navigation-card blog-detail-navigation-next"
              >
                <small>
                  Next Article <i className="fa-solid fa-arrow-right"></i>
                </small>
                <h3>{next_blog.title}</h3>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/*=========================================
          RELATED ARTICLES
          ==========================================*/}
      {related?.length > 0 && (
        <section className="blog-detail-related-section">
          <div className="container">
            <div className="blog-detail-section-heading">
              <span>MORE ARTICLES</span>
              <h2>Related Articles</h2>
            </div>
            <div className="blog-detail-related-grid">
              {related.map((item) => (
                <article key={item.id} className="blog-detail-related-card">
                  <div className="blog-detail-related-image">
                    <img src={getImageUrl(item.image)} alt={item.title} />
                    {item.category && <span>{item.category.name}</span>}
                  </div>
                  <div className="blog-detail-related-content">
                    <div className="blog-detail-related-meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>{' '}
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.short_description}</p>
                    <Link to={`/blog/${item.slug}/`}>
                      Read Article <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
