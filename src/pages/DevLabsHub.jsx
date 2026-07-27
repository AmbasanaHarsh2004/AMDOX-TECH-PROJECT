import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Code, 
  Download, 
  CloudSun, 
  UserCheck, 
  Globe, 
  Play, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  Hash, 
  PieChart, 
  Sliders, 
  Layers,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function DevLabsHub({ users, setUsers, currentUser }) {
  const [activeLabTab, setActiveLabTab] = useState('math');

  // --- Lab 1 State: Math & Logic ---
  const [multNum, setMultNum] = useState(7);
  const [primeInput, setPrimeInput] = useState(13);
  const [primeResult, setPrimeResult] = useState(null);
  
  const [targetGuess] = useState(() => Math.floor(Math.random() * 50) + 1);
  const [userGuessInput, setUserGuessInput] = useState('');
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [guessFeedback, setGuessFeedback] = useState({ msg: '', status: 'playing' });

  // --- Lab 2 State: Functions & Utilities ---
  const [factInput, setFactInput] = useState(5);
  const [strInput, setStrInput] = useState('Amodx Tech');
  
  const [marksList, setMarksList] = useState([85, 92, 78, 95, 88, 64]);
  const [newMarkInput, setNewMarkInput] = useState('');

  const laptopObject = {
    brand: 'Amodx ProBook',
    ram: '32 GB DDR5',
    price: '$1,899',
    details: function() {
      return `${this.brand} equipped with ${this.ram} priced at ${this.price}`;
    }
  };

  const [students, setStudents] = useState([
    { id: 's1', name: 'Rahul Sharma', course: 'Computer Science', mark: 92 },
    { id: 's2', name: 'Ananya Gupta', course: 'Data Science', mark: 88 }
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', course: 'Computer Science', mark: '' });

  // --- Lab 3 State: UI Components ---
  const [counter, setCounter] = useState(0);
  const [tweetText, setTweetText] = useState('');

  // --- Lab 4 State: Async & APIs ---
  const [apiPosts, setApiPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  
  const [downloadProgress, setDownloadProgress] = useState([
    { name: 'Core_Engine.zip', status: 'idle', progress: 0 },
    { name: 'Database_Schema.sql', status: 'idle', progress: 0 },
    { name: 'Assets_Package.tar.gz', status: 'idle', progress: 0 }
  ]);
  const [isDownloading, setIsDownloading] = useState(false);

  const [weatherCity, setWeatherCity] = useState('Delhi');
  const [weatherResult, setWeatherResult] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // --- Lab 5 State: Express API & Admin ---
  const [searchNameQuery, setSearchNameQuery] = useState('');
  const [ageMinQuery, setAgeMinQuery] = useState(18);
  const [filterMode, setFilterMode] = useState('all');

  const handleCheckPrime = () => {
    const num = parseInt(primeInput);
    if (isNaN(num) || num <= 1) { setPrimeResult({ isPrime: false, num }); return; }
    let isP = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) { isP = false; break; }
    }
    setPrimeResult({ isPrime: isP, num });
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const g = parseInt(userGuessInput);
    if (isNaN(g)) return;

    const nextAttempts = guessAttempts + 1;
    setGuessAttempts(nextAttempts);

    if (g === targetGuess) {
      setGuessFeedback({ msg: `🎉 Congratulations! You guessed the exact number (${targetGuess}) in ${nextAttempts} attempt(s)!`, status: 'won' });
    } else if (nextAttempts >= 5) {
      setGuessFeedback({ msg: `❌ Game Over! You reached the 5 attempt limit. The secret number was ${targetGuess}.`, status: 'lost' });
    } else if (g < targetGuess) {
      setGuessFeedback({ msg: `Too low! (${5 - nextAttempts} attempt(s) remaining)`, status: 'playing' });
    } else {
      setGuessFeedback({ msg: `Too high! (${5 - nextAttempts} attempt(s) remaining)`, status: 'playing' });
    }
    setUserGuessInput('');
  };

  const calcFactorial = (n) => {
    const num = parseInt(n);
    if (isNaN(num) || num < 0) return 'Invalid';
    let res = 1;
    for (let i = 1; i <= num; i++) res *= i;
    return res;
  };

  const reverseStr = (str) => str.split('').reverse().join('');
  const isPal = (str) => {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.mark) return;
    setStudents([...students, { id: Date.now().toString(), name: newStudent.name, course: newStudent.course, mark: parseInt(newStudent.mark) }]);
    setNewStudent({ name: '', course: 'Computer Science', mark: '' });
  };

  const handleFetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setApiPosts(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleStartDownloads = async () => {
    setIsDownloading(true);
    const files = ['Core_Engine.zip', 'Database_Schema.sql', 'Assets_Package.tar.gz'];
    
    for (let i = 0; i < files.length; i++) {
      setDownloadProgress(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'downloading', progress: 30 } : f));
      
      const duration = Math.floor(Math.random() * 2000) + 1500;
      await new Promise(r => setTimeout(r, duration));
      
      setDownloadProgress(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'completed', progress: 100 } : f));
    }
    setIsDownloading(false);
  };

  const handleFetchWeather = () => {
    setWeatherLoading(true);
    setWeatherResult(null);
    setTimeout(() => {
      const temps = { 'Delhi': '30°C', 'Mumbai': '28°C', 'New York': '22°C', 'London': '18°C', 'Tokyo': '26°C' };
      const temp = temps[weatherCity] || '25°C';
      setWeatherResult({ city: weatherCity, temp, timestamp: new Date().toLocaleTimeString() });
      setWeatherLoading(false);
    }, 1200);
  };

  const activeUsers = users.filter(u => u.isActive);
  const adultsList = users.filter(u => u.age > 18);
  const adminUsers = users.filter(u => u.role === 'admin');
  const avgAge = (users.reduce((acc, u) => acc + (u.age || 20), 0) / (users.length || 1)).toFixed(1);

  const displayedUsers = users.filter(u => {
    if (searchNameQuery && !u.name.toLowerCase().includes(searchNameQuery.toLowerCase())) return false;
    if (filterMode === 'adults' && u.age <= 18) return false;
    if (filterMode === 'minage' && u.age < ageMinQuery) return false;
    if (filterMode === 'active' && !u.isActive) return false;
    if (filterMode === 'admin' && u.role !== 'admin') return false;
    return true;
  });

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>
          Assignments 4 - 18 Interactive Hub
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          JavaScript & Express API Dev Labs
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Interactive execution environment testing math algorithms, string utilities, async downloaders, and mock database queries.
        </p>
      </div>

      <div className="tabs-header" style={{ justifyContent: 'center' }}>
        <button className={`tab-btn ${activeLabTab === 'math' ? 'active' : ''}`} onClick={() => setActiveLabTab('math')}>
          <Calculator size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Math & Games (Assgn 4)
        </button>
        <button className={`tab-btn ${activeLabTab === 'utils' ? 'active' : ''}`} onClick={() => setActiveLabTab('utils')}>
          <Code size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Functions & Stats (Assgn 5, 7)
        </button>
        <button className={`tab-btn ${activeLabTab === 'ui' ? 'active' : ''}`} onClick={() => setActiveLabTab('ui')}>
          <Sliders size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Counter & UI (Assgn 6)
        </button>
        <button className={`tab-btn ${activeLabTab === 'async' ? 'active' : ''}`} onClick={() => setActiveLabTab('async')}>
          <Download size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Async & APIs (Assgn 8, 12)
        </button>
        <button className={`tab-btn ${activeLabTab === 'express' ? 'active' : ''}`} onClick={() => setActiveLabTab('express')}>
          <Globe size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Express API Admin (Assgn 13-17)
        </button>
      </div>

      {activeLabTab === 'math' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Assignment 4.1</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Multiplication Table Generator</h3>
            <div className="form-group">
              <label className="form-label">Enter Number</label>
              <input type="number" className="form-input" value={multNum} onChange={e => setMultNum(e.target.value)} />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.8' }}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <div key={n}>{multNum} × {n} = <strong style={{ color: 'var(--accent-primary)' }}>{multNum * n}</strong></div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Assignment 4.2</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Prime Number Checker</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input type="number" className="form-input" value={primeInput} onChange={e => setPrimeInput(e.target.value)} />
                <button className="btn btn-primary btn-sm" onClick={handleCheckPrime}>Check</button>
              </div>
              {primeResult && (
                <div style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', background: primeResult.isPrime ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)', color: primeResult.isPrime ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                  {primeResult.isPrime ? `✔ ${primeResult.num} is a Prime Number!` : `✖ ${primeResult.num} is NOT a Prime Number.`}
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Assignment 4.3</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Sum of 1 - 100 Loop Result</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                Result: { (100 * 101) / 2 } (5050)
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Calculated via loop iterations 1 through 100.</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Assignment 4.4</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Number Guessing Game</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Guess a number between 1 and 50. Limit: <strong>5 Attempts Max</strong>.
            </p>

            <form onSubmit={handleGuessSubmit}>
              <div className="form-group">
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="Enter your guess (1-50)" 
                  value={userGuessInput} 
                  onChange={e => setUserGuessInput(e.target.value)}
                  disabled={guessFeedback.status !== 'playing'}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={guessFeedback.status !== 'playing'}>
                Submit Guess ({5 - guessAttempts} left)
              </button>
            </form>

            {guessFeedback.msg && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', background: guessFeedback.status === 'won' ? 'rgba(16,185,129,0.15)' : guessFeedback.status === 'lost' ? 'rgba(244,63,94,0.15)' : 'rgba(255,255,255,0.06)' }}>
                {guessFeedback.msg}
              </div>
            )}
          </div>
        </div>
      )}

      {activeLabTab === 'utils' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Assignment 5.1 - 5.3</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Functional Utility Suite</h3>

            <div className="form-group">
              <label className="form-label">Factorial Input `factorial(n)`</label>
              <input type="number" className="form-input" value={factInput} onChange={e => setFactInput(e.target.value)} />
              <div style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                factorial({factInput}) = {calcFactorial(factInput)}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">String Transformer `reverseString()` & `isPalindrome()`</label>
              <input type="text" className="form-input" value={strInput} onChange={e => setStrInput(e.target.value)} />
              <div style={{ marginTop: '6px', fontSize: '0.88rem' }}>
                <div>Reversed: <strong style={{ color: 'var(--accent-purple)' }}>{reverseStr(strInput)}</strong></div>
                <div>Is Palindrome: <strong style={{ color: isPal(strInput) ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>{isPal(strInput) ? 'YES' : 'NO'}</strong></div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Assignment 7.3</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Student Marks Statistics</h3>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input type="number" className="form-input" placeholder="Add mark (0-100)" value={newMarkInput} onChange={e => setNewMarkInput(e.target.value)} />
              <button className="btn btn-secondary btn-sm" onClick={() => { if(newMarkInput) setMarksList([...marksList, parseInt(newMarkInput)]); setNewMarkInput(''); }}>Add</button>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {marksList.map((m, i) => (
                <span key={i} className="badge badge-purple" style={{ fontSize: '0.85rem' }}>{m}</span>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
              <div>Highest Mark: <strong>{Math.max(...marksList)}</strong></div>
              <div>Lowest Mark: <strong>{Math.min(...marksList)}</strong></div>
              <div>Average Mark: <strong>{(marksList.reduce((a,b)=>a+b, 0)/marksList.length).toFixed(1)}</strong></div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Assignment 7.2 & 7.4</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Student Records & Laptop Object</h3>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>Laptop.details() execution:</div>
              <p style={{ marginTop: '4px' }}>"{laptopObject.details()}"</p>
            </div>

            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>addStudent() Form</h4>
            <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input type="text" className="form-input" style={{ padding: '0.4rem' }} placeholder="Student Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} required />
              <input type="number" className="form-input" style={{ padding: '0.4rem' }} placeholder="Mark" value={newStudent.mark} onChange={e => setNewStudent({...newStudent, mark: e.target.value})} required />
              <button type="submit" className="btn btn-primary btn-sm">Add Student Record</button>
            </form>
          </div>
        </div>
      )}

      {activeLabTab === 'ui' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Assignment 6.1</span>
            <h3>Interactive Counter App</h3>

            <div style={{ fontSize: '4rem', fontWeight: 800, margin: '1.5rem 0', color: 'var(--accent-primary)' }}>
              {counter}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setCounter(counter - 1)} style={{ padding: '0.75rem 1.5rem', fontSize: '1.2rem' }}>-</button>
              <button className="btn btn-secondary" onClick={() => setCounter(0)}><RotateCcw size={16} /></button>
              <button className="btn btn-primary" onClick={() => setCounter(counter + 1)} style={{ padding: '0.75rem 1.5rem', fontSize: '1.2rem' }}>+</button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Assignment 6.4</span>
            <h3>Live Character Counter</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Live counter enforcing Twitter-style 280 character limit.
            </p>

            <textarea 
              className="form-textarea" 
              rows="4" 
              placeholder="What is happening in Amodx tech today?" 
              value={tweetText}
              onChange={e => setTweetText(e.target.value)}
              maxLength={280}
            ></textarea>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.85rem' }}>
              <span style={{ color: 280 - tweetText.length < 20 ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                {280 - tweetText.length} characters remaining
              </span>
              <button className="btn btn-primary btn-sm" disabled={tweetText.length === 0}>Post Update</button>
            </div>
          </div>
        </div>
      )}

      {activeLabTab === 'async' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Assignment 8.1</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>JSONPlaceholder Live API</h3>
            <button className="btn btn-primary btn-sm" onClick={handleFetchPosts} style={{ marginBottom: '1rem' }}>
              {loadingPosts ? 'Fetching...' : 'Fetch First 5 Posts'}
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {apiPosts.map(p => (
                <div key={p.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <strong style={{ color: 'var(--accent-secondary)' }}>#{p.id}:</strong> {p.title}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Assignment 8.2</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Sequential Async Downloader</h3>
            <button className="btn btn-primary btn-sm" onClick={handleStartDownloads} disabled={isDownloading} style={{ marginBottom: '1rem' }}>
              <Download size={14} /> Start 3-File Download Sequence
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {downloadProgress.map((f, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span>{f.name}</span>
                    <span className={`badge ${f.status === 'completed' ? 'badge-emerald' : f.status === 'downloading' ? 'badge-amber' : 'badge-indigo'}`}>{f.status}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${f.progress}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.5s' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Assignment 8.4 & 12.1</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>`/weather/:city` API Simulator</h3>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <select className="form-select" value={weatherCity} onChange={e => setWeatherCity(e.target.value)}>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
              </select>
              <button className="btn btn-primary btn-sm" onClick={handleFetchWeather}>
                {weatherLoading ? 'Simulating...' : 'GET Route'}
              </button>
            </div>

            {weatherResult && (
              <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>
                {JSON.stringify({ city: weatherResult.city, temp: weatherResult.temp, status: 200 }, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}

      {activeLabTab === 'express' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3>Express REST API & Mongo User Directory</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Assignments 13, 14, 15, 17: Search users, adults filter, active status & avg age metric
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-purple">Total: {users.length}</span>
                <span className="badge badge-indigo">Admins: {adminUsers.length}</span>
                <span className="badge badge-emerald">Avg Age: {avgAge} yrs</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search user by name (`/users/search?name=Rahul`)..." 
                value={searchNameQuery}
                onChange={e => setSearchNameQuery(e.target.value)}
              />

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className={`btn btn-sm ${filterMode === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterMode('all')}>All</button>
                <button className={`btn btn-sm ${filterMode === 'adults' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterMode('adults')}>Adults (&gt;18)</button>
                <button className={`btn btn-sm ${filterMode === 'admin' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterMode('admin')}>Admins Only</button>
              </div>
            </div>

            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map(u => (
                    <tr key={u.id}>
                      <td><code style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{u.id.substring(0,6)}</code></td>
                      <td style={{ fontWeight: 600 }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.age} yrs</td>
                      <td>
                        <span className={`badge ${u.role === 'admin' ? 'badge-purple' : 'badge-indigo'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${u.isActive ? 'badge-emerald' : 'badge-amber'}`}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
