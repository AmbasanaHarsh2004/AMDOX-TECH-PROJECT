import React, { useState } from 'react';
import { 
  Sparkles, 
  Film, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Zap,
  Star,
  Building2
} from 'lucide-react';

export default function Home({ setActiveTab, onOpenAuth }) {
  const [tableType, setTableType] = useState('movies');

  const topMovies = [
    { rank: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010, rating: '8.8/10', genre: 'Sci-Fi / Thriller' },
    { rank: 2, title: 'Interstellar', director: 'Christopher Nolan', year: 2014, rating: '8.7/10', genre: 'Sci-Fi / Adventure' },
    { rank: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008, rating: '9.0/10', genre: 'Action / Drama' },
  ];

  const topBooks = [
    { rank: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, rating: '4.7/5', category: 'Software Engineering' },
    { rank: 2, title: 'Designing Data-Intensive Apps', author: 'Martin Kleppmann', year: 2017, rating: '4.9/5', category: 'Distributed Systems' },
    { rank: 3, title: 'You Don\'t Know JS Yet', author: 'Kyle Simpson', year: 2020, rating: '4.8/5', category: 'JavaScript Deep Dive' },
  ];

  return (
    <div style={{ paddingTop: '2rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem 3rem', position: 'relative' }}>
        <div className="badge badge-purple" style={{ marginBottom: '1.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
          <Sparkles size={14} /> Enterprise Web & AI ERP Engineering Hub
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Building Next-Gen Enterprise Platforms with <br />
          <span className="text-gradient">AMDOX TECHNOLOGIES</span>
        </h1>
        <p style={{ maxWidth: '750px', margin: '0 auto 2.5rem', color: 'var(--text-muted)', fontSize: '1.15rem' }}>
          Consolidating AI Cloud ERP Suites (AMX-ERP-2026-04), 20 Master Assignments, and 4 Flagship Capstones: DevBlog, FlowTask, Amdox Storefront, and MindNote Pro.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => setActiveTab('erp')} style={{ padding: '0.85rem 1.75rem' }}>
            <Building2 size={18} />
            <span>Launch AI Cloud ERP Suite</span>
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('capstones')} style={{ padding: '0.85rem 1.75rem' }}>
            <Layers size={18} />
            <span>Explore 4 Capstones</span>
          </button>
        </div>
      </section>

      {/* Feature Badges Grid */}
      <section className="container" style={{ margin: '2rem auto 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: Building2, title: 'AI ERP Cloud Suite', desc: 'Financial GL, AP/AR, HR & SCM' },
            { icon: Layers, title: '4 Capstone Apps', desc: 'Blog, Tasks, E-Commerce & Notes' },
            { icon: Code2, title: '20 Assignments', desc: 'Full coverage of PDF curriculum' },
            { icon: ShieldCheck, title: 'JWT & Keycloak SSO', desc: 'Multi-tenant auth & security' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-sm)', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Assignment 1.5: Top 3 Favorite Movies or Books Table */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Assignment 1.5</span>
              <h2 style={{ fontSize: '1.75rem' }}>Curated Top 3 Collection</h2>
            </div>

            {/* Switcher */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-sm)', padding: '4px' }}>
              <button 
                onClick={() => setTableType('movies')}
                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: tableType === 'movies' ? 'white' : 'var(--text-muted)', background: tableType === 'movies' ? 'var(--accent-primary)' : 'transparent' }}
              >
                <Film size={16} /> Top Movies
              </button>
              <button 
                onClick={() => setTableType('books')}
                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: tableType === 'books' ? 'white' : 'var(--text-muted)', background: tableType === 'books' ? 'var(--accent-primary)' : 'transparent' }}
              >
                <BookOpen size={16} /> Top Books
              </button>
            </div>
          </div>

          <div className="custom-table-wrapper">
            {tableType === 'movies' ? (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Movie Title</th>
                    <th>Director</th>
                    <th>Release Year</th>
                    <th>Genre</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topMovies.map((movie) => (
                    <tr key={movie.rank}>
                      <td><span className="badge badge-purple">{movie.rank}</span></td>
                      <td style={{ fontWeight: 600 }}>{movie.title}</td>
                      <td>{movie.director}</td>
                      <td>{movie.year}</td>
                      <td><span className="badge badge-indigo">{movie.genre}</span></td>
                      <td><Star size={14} color="#f59e0b" style={{ marginRight: '4px', verticalAlign: 'middle' }} />{movie.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Year Published</th>
                    <th>Category</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topBooks.map((book) => (
                    <tr key={book.rank}>
                      <td><span className="badge badge-purple">{book.rank}</span></td>
                      <td style={{ fontWeight: 600 }}>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year}</td>
                      <td><span className="badge badge-emerald">{book.category}</span></td>
                      <td><Star size={14} color="#f59e0b" style={{ marginRight: '4px', verticalAlign: 'middle' }} />{book.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* Assignment 1.3 & 10.1 Image Showcase */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Assignments 1.3 & 10.1</span>
          <h2>Visual Assets & Gallery Showcase</h2>
          <p style={{ color: 'var(--text-muted)' }}>Images formatted with proper alt text and smooth hover scale effects</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ overflow: 'hidden', height: '220px' }}>
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" 
                alt="Amdox Technologies Software Engineers Working on Cloud ERP Suite" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Amdox Technologies Engineering Division</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Alt text: "Amdox Technologies Software Engineers Working on Cloud ERP Suite". Building production Next.js 15 & NestJS 11 monoliths.
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ overflow: 'hidden', height: '220px' }}>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="High-Performance Business Intelligence Analytics Dashboard" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Cloud BI Analytics Engine</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Alt text: "High-Performance Business Intelligence Analytics Dashboard". Executive KPI metrics and P95 latency monitors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
