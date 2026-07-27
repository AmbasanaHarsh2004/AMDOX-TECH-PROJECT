import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.msg) setStatus({ type: '', msg: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setStatus({ type: 'error', msg: 'Please complete all required form fields.' });
      return;
    }
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus({ type: 'error', msg: 'Invalid phone number format! Please enter a valid 10-digit phone number.' });
      return;
    }
    setStatus({
      type: 'success',
      msg: `Thank you ${formData.name}! Your message regarding "${formData.subject}" has been successfully logged with Amdox Technologies Engineering Division.`
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-purple">Assignments 1.4 & 10.2</span>
          <span className="badge badge-indigo">AMX-ERP-2026-04</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Contact Amdox Technologies Engineering</h1>
        <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Reach out directly to the Amdox Technologies Engineering Division for AI Cloud ERP Suite consultations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Enterprise Contact Directory</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Building2 size={22} color="var(--accent-primary)" />
              <div>
                <h4 style={{ fontSize: '0.95rem' }}>Organization & Division</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Amdox Technologies – Engineering Division</p>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Mail size={22} color="var(--accent-emerald)" />
              <div>
                <h4 style={{ fontSize: '0.95rem' }}>Direct Email Desk</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ambasanaharshvardhan1234@gmail.com / engineering@amdox.com</p>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Phone size={22} color="var(--accent-purple)" />
              <div>
                <h4 style={{ fontSize: '0.95rem' }}>Engineering Hotlines</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>+91 8460602560</p>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MapPin size={22} color="var(--accent-secondary)" />
              <div>
                <h4 style={{ fontSize: '0.95rem' }}>Global HQ Address</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Amdox Enterprise Campus, Silicon Valley, CA 94025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send Technical Inquiry</h2>
          {status.msg && (
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: status.type === 'error' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: status.type === 'error' ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
              {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
              <span style={{ fontSize: '0.9rem' }}>{status.msg}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" name="name" className="form-input" placeholder="HARSHVARDHAN AMBASANA" value={formData.name} onChange={handleChange} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" name="email" className="form-input" placeholder="rahul@amdox.tech" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number * (Validated)</label>
                <input type="tel" name="phone" className="form-input" placeholder="+1 415-890-2026" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject *</label>
              <input type="text" name="subject" className="form-input" placeholder="AI ERP Integration Request" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea name="message" className="form-textarea" rows="4" placeholder="Describe your technical requirements..." value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}