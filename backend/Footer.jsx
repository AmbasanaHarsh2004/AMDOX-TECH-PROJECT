import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-icon"><Cpu size={22} /></div>
              <h3 style={{ fontSize: '1.25rem' }}>AMDOX TECHNOLOGIES</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Enterprise AI-Powered Cloud ERP Suite & Software Development Division. Next-generation intelligent resource planning platform.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-indigo">Assignments 1-20 Completed</span>
              <span className="badge badge-purple">4 Capstones Integrated</span>
              <span className="badge badge-emerald">AMX-ERP-2026-04</span>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-main)' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => setActiveTab('home')}>Home Portfolio</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setActiveTab('services')}>3-Column Services</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setActiveTab('erp')}>AI Cloud ERP Suite (AMX-ERP)</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setActiveTab('capstones')}>Capstone Applications Hub</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setActiveTab('labs')}>JavaScript Dev Labs</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setActiveTab('contact')}>Contact & Validation</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-main)' }}>Technology Stack</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><CheckCircle2 size={14} color="var(--accent-emerald)" style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Next.js 15 + React 19 + TypeScript</li>
              <li><CheckCircle2 size={14} color="var(--accent-emerald)" style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Node 22 + NestJS 11 Modular Monolith</li>
              <li><CheckCircle2 size={14} color="var(--accent-emerald)" style={{ marginRight: '6px', verticalAlign: 'middle' }} /> PostgreSQL 17 + TimescaleDB + Prisma</li>
              <li><CheckCircle2 size={14} color="var(--accent-emerald)" style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Keycloak 25 RS256 JWT Auth</li>
              <li><CheckCircle2 size={14} color="var(--accent-emerald)" style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Python FastAPI + Prophet / LSTM ML</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>
          <div>© {new Date().getFullYear()} Amdox Technologies Engineering Division. Built to exceed all project requirements.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Powered by</span>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>AMBASANA HARSH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}