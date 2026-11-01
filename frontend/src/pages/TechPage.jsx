import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TechPage() {
  const [activeFilter, setActiveFilter] = useState('frontend');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    const navBar = document.getElementById('technology-stack');
    if (navBar) {
      window.scrollTo({
        top: navBar.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      {/*=========================================
              TECHNOLOGY HERO
      ==========================================*/}
      <section className="technology-hero-section">
        <div className="tech-orb tech-orb-1"></div>
        <div className="tech-orb tech-orb-2"></div>

        <div className="container">
          <div className="technology-hero-content">
            <div className="technology-badge">
              <i className="fa-solid fa-microchip"></i>
              Modern Technology Stack
            </div>

            <h1>
              Build Future-Ready <span>Digital Products</span> With Enterprise Technologies
            </h1>

            <p>
              Magencyinfo helps startups and enterprises build secure, scalable, and high-performance applications using the latest technologies including AI, Cloud, DevOps, Full Stack Development, and Automation.
            </p>

            <div className="technology-hero-buttons">
              <Link to="/booking/" className="technology-primary-btn">
                Start Your Project
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <a
                href="#technology-stack"
                className="technology-outline-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('technology-stack');
                  if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }}
              >
                Explore Technologies
              </a>
            </div>

            {/* Hero Stats Row */}
            <div className="technology-hero-stats">
              <div className="technology-stat-card">
                <h2>250+</h2>
                <span>Projects Delivered</span>
              </div>
              <div className="technology-stat-card">
                <h2>50+</h2>
                <span>Technologies</span>
              </div>
              <div className="technology-stat-card">
                <h2>40+</h2>
                <span>Experts</span>
              </div>
              <div className="technology-stat-card">
                <h2>99.9%</h2>
                <span>Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
              TRUSTED TECHNOLOGIES LOGO SLIDER
      ==========================================*/}
      <section className="technology-trusted-section">
        <div className="container">
          <div className="technology-trusted-header">
            <span>Trusted Technologies We Work With</span>
          </div>
          <div className="technology-logo-slider">
            <div className="technology-logo-track">
              <div className="technology-logo-item"><img src="/images/services/web-development/react.jpg" alt="React" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/python.jpg" alt="Python" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/django.jpg" alt="Django" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/docker.jpg" alt="Docker" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/aws.jpg" alt="AWS" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/openai.jpg" alt="OpenAI" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/langchain.jpg" alt="LangChain" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/postgresql.jpg" alt="PostgreSQL" /></div>
              {/* Duplication for infinite loop */}
              <div className="technology-logo-item"><img src="/images/services/web-development/react.jpg" alt="React" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/python.jpg" alt="Python" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/django.jpg" alt="Django" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/docker.jpg" alt="Docker" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/aws.jpg" alt="AWS" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/openai.jpg" alt="OpenAI" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/langchain.jpg" alt="LangChain" /></div>
              <div className="technology-logo-item"><img src="/images/services/web-development/postgresql.jpg" alt="PostgreSQL" /></div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
              TECHNOLOGY FILTER NAV
      ==========================================*/}
      <section className="technology-category-section" id="technology-stack">
        <div className="container">
          <div className="technology-section-header">
            <span className="technology-section-badge">Our Expertise</span>
            <h2>Technologies We Use To Build Modern Digital Products</h2>
            <p>
              From modern frontend frameworks to AI, cloud infrastructure, databases, and DevOps, Magency builds scalable applications using the latest enterprise technologies.
            </p>
          </div>

          <div className="technology-category-nav">
            <button
              className={`technology-category-btn ${activeFilter === 'frontend' ? 'active' : ''}`}
              onClick={() => handleFilterClick('frontend')}
            >
              Frontend
            </button>
            <button
              className={`technology-category-btn ${activeFilter === 'backend' ? 'active' : ''}`}
              onClick={() => handleFilterClick('backend')}
            >
              Backend
            </button>
            <button
              className={`technology-category-btn ${activeFilter === 'ai' ? 'active' : ''}`}
              onClick={() => handleFilterClick('ai')}
            >
              Artificial Intelligence
            </button>
            <button
              className={`technology-category-btn ${activeFilter === 'database' ? 'active' : ''}`}
              onClick={() => handleFilterClick('database')}
            >
              Database
            </button>
            <button
              className={`technology-category-btn ${activeFilter === 'cloud' ? 'active' : ''}`}
              onClick={() => handleFilterClick('cloud')}
            >
              Cloud & DevOps
            </button>
          </div>
        </div>
      </section>

      {/*=========================================
              FRONTEND TECHNOLOGIES SECTION
      ==========================================*/}
      {activeFilter === 'frontend' && (
        <section className="technology-stack-section section-fade-in" style={{ display: 'block', opacity: 1 }}>
          <div className="container">
            <div className="technology-stack-grid">
              <article className="technology-stack-card">
                <div className="technology-stack-icon"><img src="/images/services/tech/react.svg" alt="React" /></div>
                <h3>React.js</h3>
                <p>Build modern, interactive, and scalable web applications.</p>
                <ul>
                  <li>SPA Development</li>
                  <li>Reusable Components</li>
                  <li>Redux Toolkit</li>
                </ul>
              </article>

              <article className="technology-stack-card">
                <div className="technology-stack-icon"><img src="/images/services/tech/nextjs.svg" alt="Next.js" /></div>
                <h3>Next.js</h3>
                <p>High-performance, SEO friendly enterprise applications.</p>
                <ul>
                  <li>SSR & SSG</li>
                  <li>App Router</li>
                  <li>Optimal Performance</li>
                </ul>
              </article>

              <article className="technology-stack-card">
                <div className="technology-stack-icon"><img src="/images/services/tech/vue.svg" alt="Vue" /></div>
                <h3>Vue.js</h3>
                <p>Lightweight framework for scalable, clean user interfaces.</p>
                <ul>
                  <li>Composition API</li>
                  <li>Pinia State Management</li>
                  <li>Vue Router</li>
                </ul>
              </article>

              <article className="technology-stack-card">
                <div className="technology-stack-icon"><img src="/images/services/tech/angular.svg" alt="Angular" /></div>
                <h3>Angular</h3>
                <p>Robust framework for complex, enterprise-grade systems.</p>
                <ul>
                  <li>TypeScript Architecture</li>
                  <li>RxJS Observables</li>
                  <li>Dependency Injection</li>
                </ul>
              </article>

              <article className="technology-stack-card">
                <div className="technology-stack-icon"><img src="/images/services/tech/tailwind.svg" alt="Tailwind" /></div>
                <h3>Tailwind CSS</h3>
                <p>Modern utility-first CSS framework for custom styling.</p>
                <ul>
                  <li>Responsive Layouts</li>
                  <li>Custom Grid Systems</li>
                  <li>Rapid Prototyping</li>
                </ul>
              </article>

              <article className="technology-stack-card">
                <div className="technology-stack-icon"><img src="/images/services/tech/typescript.svg" alt="TypeScript" /></div>
                <h3>TypeScript</h3>
                <p>Strict syntactical superset of JavaScript for typing safety.</p>
                <ul>
                  <li>Type Safety & Auto-complete</li>
                  <li>Scalable Codebases</li>
                  <li>OOP Design Patterns</li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      )}

      {/*=========================================
              BACKEND TECHNOLOGIES SECTION
      ==========================================*/}
      {activeFilter === 'backend' && (
        <section className="technology-backend-section section-fade-in" style={{ display: 'block', opacity: 1 }}>
          <div className="container">
            <div className="technology-backend-grid">
              <article className="technology-backend-card">
                <div className="technology-backend-icon"><img src="/images/services/tech/python.svg" alt="Python" /></div>
                <h3>Python</h3>
                <p>Powerful language for automation, AI, and scalable web applications.</p>
                <span>Automation • APIs • AI</span>
              </article>

              <article className="technology-backend-card">
                <div className="technology-backend-icon"><img src="/images/services/tech/django.svg" alt="Django" /></div>
                <h3>Django</h3>
                <p>High-level Python web framework for secure and rapid development.</p>
                <span>Django ORM • Security • REST API</span>
              </article>

              <article className="technology-backend-card">
                <div className="technology-backend-icon"><img src="/images/services/tech/fastapi.svg" alt="FastAPI" /></div>
                <h3>FastAPI</h3>
                <p>Modern, fast, high-performance web framework for APIs.</p>
                <span>Fast API Speed • Async Support • Typing</span>
              </article>

              <article className="technology-backend-card">
                <div className="technology-backend-icon"><img src="/images/services/tech/nodejs.svg" alt="Node.js" /></div>
                <h3>Node.js</h3>
                <p>JavaScript runtime built on Chrome's V8 engine for fast servers.</p>
                <span>Event Driven • NPM Packages • Express</span>
              </article>

              <article className="technology-backend-card">
                <div className="technology-backend-icon"><img src="/images/services/tech/go.svg" alt="Go" /></div>
                <h3>Go</h3>
                <p>Google's open source language for concurrent backend servers.</p>
                <span>Goroutines • Microservices • High Speed</span>
              </article>

              <article className="technology-backend-card">
                <div className="technology-backend-icon"><img src="/images/services/tech/java.svg" alt="Java" /></div>
                <h3>Java</h3>
                <p>Object-oriented language for stable, enterprise-scale software.</p>
                <span>Spring Boot • Scalable ERP • Secure</span>
              </article>
            </div>
          </div>
        </section>
      )}

      {/*=========================================
              AI TECHNOLOGIES SECTION
      ==========================================*/}
      {activeFilter === 'ai' && (
        <section className="technology-ai-section section-fade-in" style={{ display: 'block', opacity: 1 }}>
          <div className="container">
            <div className="technology-ai-grid">
              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/openai.svg" alt="OpenAI" /></div>
                <h3>OpenAI</h3>
                <p>Advanced LLM APIs like GPT-4o for intelligent product features.</p>
                <span>GPT-4o • Embeddings • Agents</span>
              </article>

              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/gemini.svg" alt="Gemini" /></div>
                <h3>Gemini</h3>
                <p>Google's multimodal AI models for reasoning and text processing.</p>
                <span>1.5 Pro • Multimodal • High Context</span>
              </article>

              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/claude.svg" alt="Claude" /></div>
                <h3>Claude</h3>
                <p>Anthropic's LLMs optimized for writing and complex coding tasks.</p>
                <span>Claude 3.5 Sonnet • Complex Code</span>
              </article>

              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/langchain.svg" alt="LangChain" /></div>
                <h3>LangChain</h3>
                <p>Framework for building LLM applications and agent chains.</p>
                <span>Prompt Templates • Chains • Agents</span>
              </article>

              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/huggingface.svg" alt="HuggingFace" /></div>
                <h3>HuggingFace</h3>
                <p>Hub for open source ML models, datasets, and transformers.</p>
                <span>Transformers • Custom Models</span>
              </article>

              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/pytorch.svg" alt="PyTorch" /></div>
                <h3>PyTorch</h3>
                <p>Deep learning framework for training and testing ML models.</p>
                <span>Neural Networks • GPU Acceleration</span>
              </article>

              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/tensorflow.svg" alt="TensorFlow" /></div>
                <h3>TensorFlow</h3>
                <p>Open source framework for machine learning and deep models.</p>
                <span>Production Scale • TF Lite • Keras</span>
              </article>

              <article className="technology-ai-card">
                <div className="technology-ai-icon"><img src="/images/services/tech/rag.svg" alt="RAG" /></div>
                <h3>RAG + MCP</h3>
                <p>Retrieval Augmented Generation and Model Context Protocols.</p>
                <span>Vector Indexes • Knowledge Bases</span>
              </article>
            </div>
          </div>
        </section>
      )}

      {/*=========================================
              DATABASE TECHNOLOGIES SECTION
      ==========================================*/}
      {activeFilter === 'database' && (
        <section className="technology-database-section section-fade-in" style={{ display: 'block', opacity: 1 }}>
          <div className="container">
            <div className="technology-db-grid">
              <article className="technology-db-card">
                <div className="technology-db-icon"><img src="/images/services/tech/postgresql.svg" alt="PostgreSQL" /></div>
                <h3>PostgreSQL</h3>
                <p>Enterprise grade relational database with rich indexing features.</p>
                <span>ACID Compliance • JSONB • SQL</span>
              </article>

              <article className="technology-db-card">
                <div className="technology-db-icon"><img src="/images/services/tech/mysql.svg" alt="MySQL" /></div>
                <h3>MySQL</h3>
                <p>Reliable, open source relational database for standard web apps.</p>
                <span>Replication • Fast Read • Scalable</span>
              </article>

              <article className="technology-db-card">
                <div className="technology-db-icon"><img src="/images/services/tech/mongodb.svg" alt="MongoDB" /></div>
                <h3>MongoDB</h3>
                <p>Flexible, document-oriented NoSQL database for JSON data structures.</p>
                <span>Sharding • BSON Document • Scalable Schema</span>
              </article>

              <article className="technology-db-card">
                <div className="technology-db-icon"><img src="/images/services/tech/redis.svg" alt="Redis" /></div>
                <h3>Redis</h3>
                <p>In-memory database used for database caching, sessions, and queues.</p>
                <span>Caching Speed • Key-Value • Pub/Sub</span>
              </article>

              <article className="technology-db-card">
                <div className="technology-db-icon"><img src="/images/services/tech/sql.svg" alt="SQL" /></div>
                <h3>SQLite</h3>
                <p>Lightweight, file-based relational database for development.</p>
                <span>Local Storage • Zero Config • Serverless</span>
              </article>

              <article className="technology-db-card">
                <div className="technology-db-icon"><img src="/images/services/tech/supabase.svg" alt="Supabase" /></div>
                <h3>Supabase</h3>
                <p>Open source Firebase alternative built on PostgreSQL backend.</p>
                <span>Realtime APIs • Auto Auth • File Storage</span>
              </article>
            </div>
          </div>
        </section>
      )}

      {/*=========================================
              CLOUD & DEVOPS SECTION
      ==========================================*/}
      {activeFilter === 'cloud' && (
        <section className="technology-cloud-section section-fade-in" style={{ display: 'block', opacity: 1 }}>
          <div className="container">
            <div className="technology-cloud-layout">
              <div className="technology-cloud-content">
                <div className="technology-cloud-feature">
                  <i className="fa-solid fa-cloud"></i>
                  <div>
                    <h4>Cloud Deployment</h4>
                    <p>AWS, Azure & Google Cloud infrastructure provisioning.</p>
                  </div>
                </div>

                <div className="technology-cloud-feature">
                  <i className="fa-solid fa-server"></i>
                  <div>
                    <h4>Containerization</h4>
                    <p>Docker & Kubernetes setup for microservices isolation.</p>
                  </div>
                </div>

                <div className="technology-cloud-feature">
                  <i className="fa-solid fa-code-branch"></i>
                  <div>
                    <h4>CI/CD Pipelines</h4>
                    <p>GitHub Actions automation for build, test, and release.</p>
                  </div>
                </div>

                <div className="technology-cloud-feature">
                  <i className="fa-solid fa-shield-halved"></i>
                  <div>
                    <h4>Enterprise Security</h4>
                    <p>SSL setup, automated backups, and server monitoring.</p>
                  </div>
                </div>
              </div>

              <div className="technology-cloud-grid">
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/aws.svg" alt="AWS" />
                  <h4>AWS</h4>
                </div>
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/azure.svg" alt="Azure" />
                  <h4>Azure</h4>
                </div>
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/gcp.svg" alt="Google Cloud" />
                  <h4>Google Cloud</h4>
                </div>
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/docker.svg" alt="Docker" />
                  <h4>Docker</h4>
                </div>
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/kubernetes.svg" alt="Kubernetes" />
                  <h4>Kubernetes</h4>
                </div>
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/github-actions.svg" alt="GitHub Actions" />
                  <h4>GitHub Actions</h4>
                </div>
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/terraform.svg" alt="Terraform" />
                  <h4>Terraform</h4>
                </div>
                <div className="technology-cloud-card">
                  <img src="/images/services/tech/linux.svg" alt="Linux" />
                  <h4>Linux</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/*=========================================
              FAQ SECTION
      ==========================================*/}
      <section className="technology-faq-section">
        <div className="container">
          <div className="technology-section-header">
            <span className="technology-section-badge">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="technology-faq-wrapper">
            <details>
              <summary>Which technologies do you specialize in?</summary>
              <p>
                We specialize in Python, Django, React, Next.js, FastAPI, AI integration (GPT/Claude), AWS, Azure, Docker, Kubernetes, PostgreSQL, and many other modern technology stacks.
              </p>
            </details>

            <details>
              <summary>Do you build AI-powered applications?</summary>
              <p>
                Yes. We develop custom AI chatbots, Retrieval-Augmented Generation (RAG) knowledge systems, workflow automation bots, and custom LLM interfaces.
              </p>
            </details>

            <details>
              <summary>Can you modernize existing software platforms?</summary>
              <p>
                Absolutely. We specialize in legacy systems migration, moving monolithic codebases to scalable, containerized cloud-native microservices architectures.
              </p>
            </details>

            <details>
              <summary>Do you provide ongoing technical support?</summary>
              <p>
                Yes. We provide comprehensive post-deployment support including server health monitoring, infrastructure scaling, code maintenance, and security updates.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/*=========================================
              FINAL CTA
      ==========================================*/}
      <section className="technology-cta-section">
        <div className="container">
          <div className="technology-cta-box">
            <span>Ready To Build Something Amazing?</span>
            <h2>Let's Transform Your Idea Into A Scalable Digital Product</h2>
            <p>
              Whether you're building an AI platform, SaaS product, enterprise application, eCommerce store, or cloud solution, Magency is ready to help you succeed.
            </p>
            <div className="technology-cta-buttons">
              <Link to="/booking/" className="technology-primary-btn">
                Start Your Project
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact/" className="technology-outline-btn">
                Talk To Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
