import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, API_BASE_URL } from '../api/client';

export default function BlogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [blogsData, setBlogsData] = useState({
    results: [],
    count: 0,
    num_pages: 1,
    featured_blog: null,
    latest_posts: [],
    popular_posts: [],
    top_blogs: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      api.getBlogs({
        category: currentCategory,
        search: currentSearch,
        page: currentPage,
        page_size: 6,
      }),
      api.getCategories(),
    ]).then(([blogRes, catRes]) => {
      if (!isMounted) return;
      if (blogRes.ok && blogRes.data) {
        setBlogsData(blogRes.data);
      }
      if (catRes.ok && catRes.data) {
        setCategories(catRes.data);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [currentCategory, currentSearch, currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
      params.delete('q');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleCategorySelect = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const getImageUrl = (img) => {
    if (!img) return '/images/portfolio/project-1.jpg';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (img.startsWith('/media/')) return `${API_BASE_URL}${img}`;
    if (img.startsWith('/')) return img;
    return `${API_BASE_URL}/media/${img}`;
  };

  return (
    <div>
      {/*=========================================
          BLOG HERO
          ==========================================*/}
      <section className="blog-hero">
        <div className="blog-orb blog-orb-1"></div>
        <div className="blog-orb blog-orb-2"></div>
        <div className="container">
          <div className="blog-hero-wrapper">
            <div className="blog-hero-content">
              <span className="blog-hero-badge">
                <i className="fa-solid fa-book-open"></i>
                OUR BLOG
              </span>

              <h1>
                Insights, Ideas & <span>Inspiration</span>
              </h1>

              <p>
                Explore expert articles on AI, Web Development, UI/UX, Automation and Digital Marketing.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="blog-search-form">
                <input
                  type="text"
                  name="q"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles..."
                />
                <button type="submit" aria-label="Search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              {/* Stats */}
              <div className="blog-stats">
                <div className="blog-stat-card">
                  <h2>{blogsData.count || 0}</h2>
                  <span>Articles</span>
                </div>
                <div className="blog-stat-card">
                  <h2>400+</h2>
                  <span>Readers</span>
                </div>
                <div className="blog-stat-card">
                  <h2>{categories.length || 0}</h2>
                  <span>Categories</span>
                </div>
              </div>
            </div>

            <div className="blog-hero-visual">
              <img src="/images/services/blog/blog-dashboard.jpg" alt="Blog" />
              <div className="hero-floating-card card1">
                <i className="fa-solid fa-bolt"></i>
                <div>
                  <h4>New Tutorials</h4>
                  <span>Updated Weekly</span>
                </div>
              </div>
              <div className="hero-floating-card card2">
                <i className="fa-solid fa-fire"></i>
                <div>
                  <h4>AI Insights</h4>
                  <span>Trending Articles</span>
                </div>
              </div>
              <div className="hero-floating-card card3">
                <i className="fa-solid fa-layer-group"></i>
                <div>
                  <h4>Web Development</h4>
                  <span>Expert Guides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          CATEGORY FILTER
          ==========================================*/}
      <section className="blog-category-section">
        <div className="container">
          <div className="blog-category-filter">
            <button
              type="button"
              className={!currentCategory ? 'active' : ''}
              onClick={() => handleCategorySelect('')}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={currentCategory === cat.slug ? 'active' : ''}
                onClick={() => handleCategorySelect(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/*=========================================
          TOP 3 FEATURED BLOGS (Shown on default view)
          ==========================================*/}
      {!currentCategory && !currentSearch && currentPage === 1 && blogsData.top_blogs?.length > 0 && (
        <section className="featured-blog-section">
          <div className="container">
            {blogsData.top_blogs.map((b) => (
              <article key={b.id} className="featured-blog-card">
                <div className="featured-blog-image">
                  <img src={getImageUrl(b.image)} alt={b.title} />
                  {b.category && <span className="featured-category">{b.category.name}</span>}
                </div>
                <div className="featured-blog-content">
                  <div className="featured-meta">
                    <span>
                      <i className="fa-regular fa-calendar"></i>{' '}
                      {new Date(b.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>
                      <i className="fa-regular fa-clock"></i> {b.read_time} min read
                    </span>
                    <span>
                      <i className="fa-regular fa-eye"></i> {b.views}
                    </span>
                  </div>
                  <h2>{b.title}</h2>
                  <p>{b.short_description}</p>
                  <Link to={`/blog/${b.slug}/`} className="featured-read-btn">
                    Read Article <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/*=========================================
          MAIN ARTICLES & SIDEBAR
          ==========================================*/}
      <section className="blog-main-section">
        <div className="container">
          <div className="blog-main-layout">
            {/* LEFT: ARTICLES LIST */}
            <div className="blog-left">
              <div className="section-heading">
                <span>Latest Articles</span>
                <h2>Explore Our Latest Insights</h2>
              </div>

              {loading ? (
                <p style={{ color: '#94a3b8', padding: '40px 0' }}>Loading articles...</p>
              ) : blogsData.results?.length > 0 ? (
                <div className="latest-blog-grid">
                  {blogsData.results.map((blog) => (
                    <article key={blog.id} className="latest-blog-card">
                      <div className="latest-blog-image">
                        <img src={getImageUrl(blog.image)} alt={blog.title} />
                        {blog.category && <span>{blog.category.name}</span>}
                      </div>
                      <div className="latest-blog-content">
                        <div className="latest-blog-meta">
                          <span>
                            <i className="fa-regular fa-calendar"></i>{' '}
                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span>
                            <i className="fa-regular fa-clock"></i> {blog.read_time} min
                          </span>
                        </div>
                        <h3>{blog.title}</h3>
                        <p>{blog.short_description}</p>
                        <Link to={`/blog/${blog.slug}/`} className="latest-blog-btn">
                          Read More <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#94a3b8', padding: '40px 0' }}>
                  No articles found matching your criteria.
                </p>
              )}

              {/* PAGINATION */}
              {blogsData.num_pages > 1 && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '40px' }}>
                  <button
                    className="home-btn-outline"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{ padding: '8px 16px', opacity: currentPage <= 1 ? 0.5 : 1 }}
                  >
                    Previous
                  </button>
                  {Array.from({ length: blogsData.num_pages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(idx + 1)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: currentPage === idx + 1 ? '#2563EB' : 'rgba(255, 255, 255, 0.05)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                      }}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className="home-btn-outline"
                    disabled={currentPage >= blogsData.num_pages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ padding: '8px 16px', opacity: currentPage >= blogsData.num_pages ? 0.5 : 1 }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT: SIDEBAR */}
            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <div className="widget-icon">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h3>About Our Blog</h3>
                <p>
                  Stay updated with Web Development, AI, Business, UI/UX and Digital Marketing.
                </p>
                <Link to="/about/" className="widget-btn">
                  Learn More
                </Link>
              </div>

              {/* Search Widget */}
              <div className="sidebar-widget">
                <h3>Search</h3>
                <form onSubmit={handleSearchSubmit} className="sidebar-search">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search article"
                  />
                  <button type="submit" aria-label="Search">
                    <i className="fa-solid fa-search"></i>
                  </button>
                </form>
              </div>

              {/* Latest Posts */}
              {blogsData.latest_posts?.length > 0 && (
                <div className="sidebar-widget">
                  <h3>Latest Posts</h3>
                  {blogsData.latest_posts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}/`}
                      className="sidebar-post"
                    >
                      <img src={getImageUrl(post.image)} alt={post.title} />
                      <div>
                        <h4>{post.title}</h4>
                        <span>
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Popular Posts */}
              {blogsData.popular_posts?.length > 0 && (
                <div className="sidebar-widget">
                  <h3>Popular Posts</h3>
                  {blogsData.popular_posts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}/`}
                      className="sidebar-post"
                    >
                      <img src={getImageUrl(post.image)} alt={post.title} />
                      <div>
                        <h4>{post.title}</h4>
                        <span>{post.views} Views</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Categories */}
              {categories.length > 0 && (
                <div className="sidebar-widget">
                  <h3>Categories</h3>
                  <div className="sidebar-categories">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategorySelect(cat.slug)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'inherit',
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                          textAlign: 'left',
                          cursor: 'pointer',
                          padding: '8px 0',
                        }}
                      >
                        <span>{cat.name}</span>
                        <span>{cat.blog_count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
