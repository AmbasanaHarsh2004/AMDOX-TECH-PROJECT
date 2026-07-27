import React, { useState } from 'react';
import { 
  Cloud, 
  Code, 
  Database, 
  ArrowRight, 
  Check, 
  X,
  Server,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  // Assignments 2 & 3: 3 Columns using Flexbox
  const servicesList = [
    {
      id: 1,
      title: 'Full-Stack Web Engineering',
      icon: Code,
      badge: 'Core Specialty',
      color: 'var(--accent-primary)',
      description: 'End-to-end web architecture with React, Express REST APIs, JWT authentication, and responsive modern layouts.',
      features: [
        'Responsive Flexbox & Grid layouts',
        'Multi-user JWT Token Authentication',
        'State Management & LocalStorage persistence',
        'SEO-optimized Semantic HTML'
      ],
      price: '$4,999 / proj'
    },
    {
      id: 2,
      title: 'Cloud Infrastructure & Microservices',
      icon: Cloud,
      badge: 'Scalable Cloud',
      color: 'var(--accent-purple)',
      description: 'Deployable cloud microservices with Express routing, MongoDB persistence, automated CI/CD pipeline, and Netlify/Render deployment.',
      features: [
        'RESTful Express.js API Routing',
        'MongoDB schema modeling & CRUD',
        'Sequential async file downloaders',
        'Render / Netlify deployment readiness'
      ],
      price: '$6,499 / proj'
    },
    {
      id: 3,
      title: 'AI Data & Real-Time Analytics',
      icon: Database,
      badge: 'Next-Gen AI',
      color: 'var(--accent-secondary)',
      description: 'Real-time data aggregation, live API fetching, automated metric calculations, and interactive statistics dashboards.',
      features: [
        'Live JSON API fetchers',
        'Weather & geolocation simulators',
        'Interactive analytics & user statistics',
        'Real-time counter & input validation'
      ],
      price: '$5,499 / proj'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
          Assignments 2 & 3 (3-Column Flexbox Layout)
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Enterprise Software Services
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Designed with 3-column Flexbox, interactive hover micro-animations, and full mobile responsiveness.
        </p>
      </div>

      {/* 3 Columns Flexbox Container */}
      <div className="services-grid">
        {servicesList.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.id} className="service-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div className="service-icon" style={{ background: `rgba(99, 102, 241, 0.1)`, color: service.color }}>
                  <Icon size={28} />
                </div>
                <span className="badge badge-indigo">{service.badge}</span>
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                {service.description}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                {service.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                    <Check size={16} color="var(--accent-emerald)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>{service.price}</span>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedService(service)}
                >
                  <span>Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '550px', padding: '2.5rem', position: 'relative' }}>
            <button 
              onClick={() => setSelectedService(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-muted)' }}
            >
              <X size={22} />
            </button>

            <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>{selectedService.badge}</span>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{selectedService.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{selectedService.description}</p>

            <h4 style={{ marginBottom: '0.75rem' }}>Included Capabilities:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {selectedService.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <ShieldCheck size={18} color="var(--accent-emerald)" />
                  <span style={{ fontSize: '0.92rem' }}>{f}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedService(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => { alert(`Thank you for choosing ${selectedService.title}!`); setSelectedService(null); }}>
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
