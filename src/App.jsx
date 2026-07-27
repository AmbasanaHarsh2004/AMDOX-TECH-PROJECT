import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Interactive3DBackground from './components/Interactive3DBackground';

import Home from './pages/Home';
import Services from './pages/Services';
import ErpSuiteHub from './pages/ErpSuiteHub';
import CapstonesHub from './pages/CapstonesHub';
import DevLabsHub from './pages/DevLabsHub';
import Contact from './pages/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('amodx_user_db');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', name: 'Rahul Sharma', email: 'rahul@amdox.tech', role: 'admin', age: 26, isActive: true, createdAt: '2026-07-01' },
      { id: '2', name: 'Ananya Gupta', email: 'ananya@amdox.tech', role: 'user', age: 24, isActive: true, createdAt: '2026-07-05' },
      { id: '3', name: 'Vikram Singh', email: 'vikram@amdox.tech', role: 'user', age: 17, isActive: false, createdAt: '2026-07-10' },
      { id: '4', name: 'Siddharth V', email: 'sid@amdox.tech', role: 'admin', age: 29, isActive: true, createdAt: '2026-07-12' },
    ];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('amodx_jwt_token');
    const savedUser = localStorage.getItem('amodx_current_user');
    if (token && savedUser) {
      return JSON.parse(savedUser);
    }
    return { id: '1', name: 'Rahul Sharma', email: 'rahul@amdox.tech', role: 'admin', age: 26, isActive: true };
  });

  useEffect(() => {
    localStorage.setItem('amodx_user_db', JSON.stringify(users));
  }, [users]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('amodx_current_user', JSON.stringify(user));
    if (!users.find(u => u.id === user.id)) {
      setUsers([...users, user]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('amodx_jwt_token');
    localStorage.removeItem('amodx_current_user');
    setCurrentUser(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* 3D Interactive Background Layer responding to Cursor Movement */}
      <Interactive3DBackground theme={theme} />

      {/* Main UI Layer */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        <main style={{ flexGrow: 1 }}>
          {activeTab === 'home' && <Home setActiveTab={setActiveTab} onOpenAuth={() => setIsAuthModalOpen(true)} />}
          {activeTab === 'services' && <Services />}
          {activeTab === 'erp' && <ErpSuiteHub />}
          {activeTab === 'capstones' && <CapstonesHub currentUser={currentUser} onOpenAuth={() => setIsAuthModalOpen(true)} />}
          {activeTab === 'labs' && <DevLabsHub users={users} setUsers={setUsers} currentUser={currentUser} />}
          {activeTab === 'contact' && <Contact />}
        </main>

        <Footer setActiveTab={setActiveTab} />

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          users={users}
        />
      </div>
    </div>
  );
}