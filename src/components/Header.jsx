import React from 'react';
import { Cpu, Home, Briefcase, Building2, Layers, Code2, Mail, Sun, Moon, User, LogOut, ShieldCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, theme, setTheme, currentUser, onOpenAuth, onLogout }) {
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'erp', label: 'ERP Suite', icon: Building2 },
    { id: 'capstones', label: 'Capstone Hub', icon: Layers },
    { id: 'labs', label: 'Dev Labs', icon: Code2 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="header-sticky">
      <div className="container nav-container">
        <div className="brand-logo" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon"><Cpu size={22} /></div>
          <div>
            <span>AMDOX</span>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'block', fontWeight: 500, marginTop: '-4px' }}>
              Enterprise ERP & Dev Hub
            </span>
          </div>
        </div>

        <nav>
          <ul className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button className={`nav-link-btn ${isActive ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-secondary btn-sm" onClick={toggleTheme} title="Toggle Light/Dark Theme" style={{ borderRadius: 'var(--radius-full)', width: '2.5rem', height: '2.5rem', padding: 0 }}>
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                <User size={16} color="var(--accent-primary)" />
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{currentUser.name}</span>
                {currentUser.role === 'admin' && (
                  <span className="badge badge-purple" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <ShieldCheck size={12} /> Admin
                  </span>
                )}
              </div>
              <button className="btn btn-danger btn-sm" onClick={onLogout} title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onOpenAuth}>
              <User size={16} />
              <span>Login / Signup</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}