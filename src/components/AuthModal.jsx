import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, users }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    age: '24'
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLoginTab) {
      // Login Logic
      const found = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
      if (!found) {
        setErrorMsg('No user found with this email address.');
        return;
      }
      if (formData.password.length < 3) {
        setErrorMsg('Password is too short.');
        return;
      }
      
      // Simulate JWT creation
      const simulatedToken = `jwt-header.${btoa(JSON.stringify({ id: found.id, role: found.role }))}.signature`;
      localStorage.setItem('amodx_jwt_token', simulatedToken);
      onLogin(found);
      onClose();
    } else {
      // Signup Logic - Assignment 16.1: Prevent duplicate emails
      if (!formData.name || !formData.email || !formData.password) {
        setErrorMsg('Please fill in all required fields.');
        return;
      }
      const duplicate = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
      if (duplicate) {
        setErrorMsg('Duplicate email detected! An account already exists with this email.');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        age: parseInt(formData.age) || 25,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      const simulatedToken = `jwt-header.${btoa(JSON.stringify({ id: newUser.id, role: newUser.role }))}.signature`;
      localStorage.setItem('amodx_jwt_token', simulatedToken);
      
      setSuccessMsg('Account created successfully! Logging you in...');
      setTimeout(() => {
        onLogin(newUser);
        onClose();
      }, 1000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2rem', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            {isLoginTab ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {isLoginTab ? 'Access your Amodx Tech multi-user workspace' : 'Assignments 16 & 17 JWT Auth API Simulation'}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '4px', marginBottom: '1.5rem' }}>
          <button 
            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, color: isLoginTab ? 'white' : 'var(--text-muted)', background: isLoginTab ? 'var(--accent-primary)' : 'transparent' }}
            onClick={() => { setIsLoginTab(true); setErrorMsg(''); }}
          >
            Login
          </button>
          <button 
            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, color: !isLoginTab ? 'white' : 'var(--text-muted)', background: !isLoginTab ? 'var(--accent-primary)' : 'transparent' }}
            onClick={() => { setIsLoginTab(false); setErrorMsg(''); }}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: 'var(--accent-rose)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--accent-emerald)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLoginTab && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }} 
                  placeholder="HARSH AMBASANA" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input 
                type="email" 
                name="email" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }} 
                placeholder="user@amodx.tech" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input 
                type="password" 
                name="password" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }} 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {!isLoginTab && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  className="form-input" 
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select 
                  name="role" 
                  className="form-select" 
                  value={formData.role} 
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLoginTab ? 'Sign In & Connect API' : 'Register Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
