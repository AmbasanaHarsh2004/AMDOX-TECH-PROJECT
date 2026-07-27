import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckSquare, 
  ShoppingBag, 
  StickyNote, 
  Plus, 
  Trash2, 
  Edit3, 
  Pin, 
  Search, 
  Filter, 
  ShoppingCart, 
  UserCheck, 
  MessageSquare, 
  Tag, 
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  CreditCard
} from 'lucide-react';

export default function CapstonesHub({ currentUser, onOpenAuth }) {
  const [activeCapstone, setActiveCapstone] = useState('blog');

  // --- Capstone 1 State: DevBlog ---
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Architecting Scalable Microservices with Node and React',
      category: 'Architecture',
      author: 'HARSHVARDHAN AMBASANA',
      authorId: '1',
      content: 'Building production-grade microservices requires clean state boundaries, idempotent endpoints, and resilient caching layers.',
      createdAt: '2026-07-20',
      comments: [
        { id: 'c1', author: 'Ananya Gupta', text: 'Great article on microservices pattern!' }
      ]
    },
    {
      id: '2',
      title: 'Mastering Modern CSS Glassmorphic UI Systems',
      category: 'Frontend',
      author: 'Amodx Lead',
      authorId: '2',
      content: 'Glassmorphism combines backdrop-filter blur effects with subtle border gradients to yield stunning modern web apps.',
      createdAt: '2026-07-22',
      comments: []
    }
  ]);
  const [newPost, setNewPost] = useState({ title: '', category: 'Frontend', content: '' });
  const [commentText, setCommentText] = useState({});

  // --- Capstone 2 State: FlowTask ---
  const [tasks, setTasks] = useState([
    { id: 't1', userId: '1', title: 'Setup Express REST API routes', category: 'Work', completed: true, createdAt: '2026-07-21' },
    { id: 't2', userId: '1', title: 'Implement MongoDB user schema', category: 'Work', completed: false, createdAt: '2026-07-23' },
    { id: 't3', userId: '1', title: 'Buy high-refresh monitor for workstation', category: 'Personal', completed: false, createdAt: '2026-07-24' },
    { id: 't4', userId: '1', title: 'Deploy Auth API on Render', category: 'Urgent', completed: false, createdAt: '2026-07-24' },
  ]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('Work');
  const [taskFilter, setTaskFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');

  // --- Capstone 3 State: Storefront ---
  const [products] = useState([
    { id: 'p1', name: 'Amodx Pro Workstation Laptop', price: 1499, category: 'Hardware', stock: 12, rating: 4.9, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80' },
    { id: 'p2', name: 'Ergonomic Mechanical Keyboard', price: 129, category: 'Peripherals', stock: 45, rating: 4.8, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80' },
    { id: 'p3', name: 'Ultra-Wide 4K Monitor 34"', price: 699, category: 'Displays', stock: 8, rating: 4.9, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80' },
    { id: 'p4', name: 'Studio Noise-Canceling Headset', price: 249, category: 'Audio', stock: 22, rating: 4.7, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  ]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderCompleteModal, setOrderCompleteModal] = useState(false);

  // --- Capstone 4 State: MindNote Pro ---
  const [notes, setNotes] = useState([
    { id: 'n1', userId: '1', title: 'System Architecture Checklist', content: 'Ensure JWT secret is stored in env, enable cors middleware, add rate limiting.', color: '#fef08a', pinned: true, createdAt: '2026-07-22' },
    { id: 'n2', userId: '1', title: 'API Response Standard', content: 'All REST API responses must follow { status, data, message } format.', color: '#bbf7d0', pinned: false, createdAt: '2026-07-23' },
    { id: 'n3', userId: '1', title: 'Sprint Meeting Notes', content: 'Discussion on deployment to Render and GitHub Pages integration.', color: '#bfdbfe', pinned: false, createdAt: '2026-07-24' }
  ]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState('#fef08a');
  const [noteSearch, setNoteSearch] = useState('');

  // LocalStorage sync
  useEffect(() => {
    const savedPosts = localStorage.getItem('amodx_posts');
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    const savedTasks = localStorage.getItem('amodx_tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    const savedNotes = localStorage.getItem('amodx_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  const savePosts = (updated) => { setPosts(updated); localStorage.setItem('amodx_posts', JSON.stringify(updated)); };
  const saveTasks = (updated) => { setTasks(updated); localStorage.setItem('amodx_tasks', JSON.stringify(updated)); };
  const saveNotes = (updated) => { setNotes(updated); localStorage.setItem('amodx_notes', JSON.stringify(updated)); };

  // --- Capstone 1 Handlers (Blog) ---
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!currentUser) { onOpenAuth(); return; }
    if (!newPost.title || !newPost.content) return;
    const item = {
      id: Date.now().toString(),
      title: newPost.title,
      category: newPost.category,
      author: currentUser.name,
      authorId: currentUser.id,
      content: newPost.content,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    };
    savePosts([item, ...posts]);
    setNewPost({ title: '', category: 'Frontend', content: '' });
  };

  const handleDeletePost = (id) => {
    savePosts(posts.filter(p => p.id !== id));
  };

  const handleAddComment = (postId) => {
    if (!commentText[postId]) return;
    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: Date.now().toString(), author: currentUser ? currentUser.name : 'Anonymous', text: commentText[postId] }]
        };
      }
      return p;
    });
    savePosts(updated);
    setCommentText({ ...commentText, [postId]: '' });
  };

  // --- Capstone 2 Handlers (Tasks) ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      userId: currentUser ? currentUser.id : 'guest',
      title: taskTitle.trim(),
      category: taskCategory,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    saveTasks([newTask, ...tasks]);
    setTaskTitle('');
  };

  const toggleTaskComplete = (id) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const clearAllTasks = () => {
    if (window.confirm('Clear all tasks?')) {
      saveTasks([]);
    }
  };

  const startEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditTitleText(task.title);
  };

  const saveEditTask = (id) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, title: editTitleText } : t));
    setEditingTaskId(null);
  };

  const userTasks = currentUser 
    ? tasks.filter(t => t.userId === currentUser.id || t.userId === 'guest' || t.userId === '1')
    : tasks;

  const filteredTasks = userTasks.filter(t => {
    if (taskFilter === 'pending') return !t.completed;
    if (taskFilter === 'completed') return t.completed;
    return true;
  });

  // --- Capstone 3 Handlers (Store) ---
  const addToCart = (product) => {
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
      setCart(cart.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateCartQty = (id, delta) => {
    setCart(cart.map(c => {
      if (c.id === id) {
        const newQty = c.qty + delta;
        return newQty > 0 ? { ...c, qty: newQty } : null;
      }
      return c;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // --- Capstone 4 Handlers (Notes) ---
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      userId: currentUser ? currentUser.id : 'guest',
      title: noteTitle,
      content: noteContent,
      color: noteColor,
      pinned: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    saveNotes([newNote, ...notes]);
    setNoteTitle('');
    setNoteContent('');
  };

  const togglePinNote = (id) => {
    saveNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const deleteNote = (id) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(noteSearch.toLowerCase()) || 
    n.content.toLowerCase().includes(noteSearch.toLowerCase())
  ).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
          Assignment 20 Capstone Projects
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          Flagship Applications Suite
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Fully functional React + Express/MongoDB mock capstone applications built to real-world software standards.
        </p>
      </div>

      {/* Capstone Selection Tabs */}
      <div className="tabs-header" style={{ justifyContent: 'center' }}>
        <button 
          className={`tab-btn ${activeCapstone === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveCapstone('blog')}
        >
          <FileText size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Capstone 1: DevBlog
        </button>
        <button 
          className={`tab-btn ${activeCapstone === 'task' ? 'active' : ''}`}
          onClick={() => setActiveCapstone('task')}
        >
          <CheckSquare size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Capstone 2: FlowTask
        </button>
        <button 
          className={`tab-btn ${activeCapstone === 'store' ? 'active' : ''}`}
          onClick={() => setActiveCapstone('store')}
        >
          <ShoppingBag size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Capstone 3: Amdox Store
        </button>
        <button 
          className={`tab-btn ${activeCapstone === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveCapstone('notes')}
        >
          <StickyNote size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Capstone 4: MindNote Pro
        </button>
      </div>

      {/* CAPSTONE 1: BLOGGING PLATFORM */}
      {activeCapstone === 'blog' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={20} color="var(--accent-primary)" />
                <span>Create Blog Article</span>
              </h3>

              {!currentUser ? (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Login required to publish or manage your blog articles.
                  </p>
                  <button className="btn btn-primary btn-sm" onClick={onOpenAuth}>
                    Login / Sign Up
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreatePost}>
                  <div className="form-group">
                    <label className="form-label">Article Title</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. Mastering Express middleware" 
                      value={newPost.title} 
                      onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="form-select"
                      value={newPost.category} 
                      onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                    >
                      <option value="Frontend">Frontend Development</option>
                      <option value="Backend">Backend & REST APIs</option>
                      <option value="Architecture">System Architecture</option>
                      <option value="DevOps">DevOps & Cloud</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Article Content</label>
                    <textarea 
                      className="form-textarea" 
                      rows="4" 
                      placeholder="Write your tech post content here..." 
                      value={newPost.content}
                      onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Publish Post (Express JWT Protected)
                  </button>
                </form>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Published Articles ({posts.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {posts.map(post => (
                  <div key={post.id} className="glass-panel" style={{ padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span className="badge badge-indigo">{post.category}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                        <Clock size={14} /> {post.createdAt}
                        {currentUser && (currentUser.name === post.author || currentUser.role === 'admin') && (
                          <button onClick={() => handleDeletePost(post.id)} style={{ color: 'var(--accent-rose)', marginLeft: '8px' }} title="Delete Post">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{post.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>{post.content}</p>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <UserCheck size={14} color="var(--accent-primary)" /> Author: <strong style={{ color: 'var(--text-main)' }}>{post.author}</strong>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <h5 style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MessageSquare size={14} /> Comments ({post.comments.length})
                      </h5>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {post.comments.map(c => (
                          <div key={c.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                            <strong style={{ color: 'var(--accent-secondary)' }}>{c.author}:</strong> {c.text}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text" 
                          className="form-input" 
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }} 
                          placeholder="Add a public comment..." 
                          value={commentText[post.id] || ''}
                          onChange={e => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        />
                        <button className="btn btn-secondary btn-sm" onClick={() => handleAddComment(post.id)}>Comment</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CAPSTONE 2: FLOWTASK */}
      {activeCapstone === 'task' && (
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem' }}>Personal Task Management Workspace</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Assignments 5.4, 6.3, 19 & 20: Title edit, categories, filters, date sort & user isolation
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-danger btn-sm" onClick={clearAllTasks}>
                  <Trash2 size={14} /> Clear All Tasks
                </button>
              </div>
            </div>

            <form onSubmit={handleAddTask} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 110px', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter task title..." 
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
              />
              <select className="form-select" value={taskCategory} onChange={e => setTaskCategory(e.target.value)}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button type="submit" className="btn btn-primary">
                <Plus size={16} /> Add Task
              </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Filter size={16} color="var(--text-muted)" />
                <button className={`btn btn-sm ${taskFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTaskFilter('all')}>All ({userTasks.length})</button>
                <button className={`btn btn-sm ${taskFilter === 'pending' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTaskFilter('pending')}>Pending ({userTasks.filter(t => !t.completed).length})</button>
                <button className={`btn btn-sm ${taskFilter === 'completed' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTaskFilter('completed')}>Completed ({userTasks.filter(t => t.completed).length})</button>
              </div>

              <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                Sorted by Creation Date
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredTasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No tasks found in this view.
                </div>
              ) : (
                filteredTasks.map(task => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexGrow: 1 }}>
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => toggleTaskComplete(task.id)}
                        style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                      />
                      
                      {editingTaskId === task.id ? (
                        <div style={{ display: 'flex', gap: '0.5rem', flexGrow: 1, maxWidth: '400px' }}>
                          <input 
                            type="text" 
                            className="form-input" 
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.9rem' }}
                            value={editTitleText} 
                            onChange={e => setEditTitleText(e.target.value)}
                          />
                          <button className="btn btn-primary btn-sm" onClick={() => saveEditTask(task.id)}>Save</button>
                        </div>
                      ) : (
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-light)' : 'var(--text-main)', fontWeight: 500 }}>
                          {task.title}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className={`badge ${task.category === 'Urgent' ? 'badge-amber' : task.category === 'Work' ? 'badge-indigo' : 'badge-emerald'}`}>
                        {task.category}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{task.createdAt}</span>

                      {editingTaskId !== task.id && (
                        <button onClick={() => startEditTask(task)} style={{ color: 'var(--text-muted)' }} title="Edit Task Title">
                          <Edit3 size={15} />
                        </button>
                      )}
                      <button onClick={() => deleteTask(task.id)} style={{ color: 'var(--accent-rose)' }} title="Delete Task">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* CAPSTONE 3: STORE */}
      {activeCapstone === 'store' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem' }}>Amdox Hardware & Developer Store</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Product listing, cart state, stock indicators & dummy checkout</p>
            </div>

            <button className="btn btn-primary" onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
              <ShoppingCart size={18} />
              <span>Cart ({cart.reduce((a, b) => a + b.qty, 0)})</span>
              <span className="badge badge-amber" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
                ${cartTotal}
              </span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {products.map(prod => (
              <div key={prod.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src={prod.img} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-purple">{prod.category}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>In Stock ({prod.stock})</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{prod.name}</h4>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                    ${prod.price}
                  </div>
                  <button className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => addToCart(prod)}>
                    <Plus size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isCartOpen && (
            <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '420px', background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)', zIndex: 1000, padding: '2rem', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShoppingCart size={20} color="var(--accent-primary)" /> Shopping Cart
                </h3>
                <button onClick={() => setIsCartOpen(false)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {cart.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>Your cart is empty.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>${item.price} x {item.qty}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => updateCartQty(item.id, -1)}>-</button>
                        <span style={{ fontWeight: 600 }}>{item.qty}</span>
                        <button className="btn btn-secondary btn-sm" onClick={() => updateCartQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                    <span>Total Amount:</span>
                    <span className="text-gradient">${cartTotal}</span>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setIsCartOpen(false); setOrderCompleteModal(true); setCart([]); }}>
                    <CreditCard size={18} /> Simulate Checkout
                  </button>
                </div>
              )}
            </div>
          )}

          {orderCompleteModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="glass-panel" style={{ maxWidth: '420px', padding: '2.5rem', textAlign: 'center' }}>
                <CheckCircle size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                <h2>Order Confirmed!</h2>
                <p style={{ color: 'var(--text-muted)', margin: '1rem 0 1.5rem', fontSize: '0.9rem' }}>
                  Simulated API Checkout completed successfully. Order receipt dispatched to account email.
                </p>
                <button className="btn btn-primary" onClick={() => setOrderCompleteModal(false)}>Close Window</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CAPSTONE 4: MINDNOTE PRO */}
      {activeCapstone === 'notes' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem' }}>MindNote Pro Workspace</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Notes app with pinning, color coding, and live keyword filter</p>
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: '2.25rem', fontSize: '0.88rem' }}
                placeholder="Search notes..." 
                value={noteSearch}
                onChange={e => setNoteSearch(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.75rem', height: 'fit-content' }}>
              <h4 style={{ marginBottom: '1rem' }}>Create New Note</h4>
              <form onSubmit={handleAddNote}>
                <div className="form-group">
                  <label className="form-label">Note Title</label>
                  <input type="text" className="form-input" placeholder="Title..." value={noteTitle} onChange={e => setNoteTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Note Content</label>
                  <textarea className="form-textarea" rows="3" placeholder="Key insights..." value={noteContent} onChange={e => setNoteContent(e.target.value)} required></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Color Code Tag</label>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {['#fef08a', '#bbf7d0', '#bfdbfe', '#e9d5ff'].map(c => (
                      <div 
                        key={c} 
                        onClick={() => setNoteColor(c)}
                        style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: c, cursor: 'pointer', border: noteColor === c ? '2px solid white' : 'none' }}
                      />
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  <Plus size={16} /> Save Note
                </button>
              </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {filteredNotes.map(note => (
                <div 
                  key={note.id} 
                  style={{
                    background: note.color,
                    color: '#0f172a',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    position: 'relative',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{note.title}</h5>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => togglePinNote(note.id)} style={{ color: note.pinned ? '#b91c1c' : '#475569' }} title="Pin Note">
                        <Pin size={16} fill={note.pinned ? '#b91c1c' : 'none'} />
                      </button>
                      <button onClick={() => deleteNote(note.id)} style={{ color: '#b91c1c' }} title="Delete Note">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{note.content}</p>
                  <div style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>
                    {note.pinned && <span style={{ fontWeight: 700, color: '#b91c1c', marginRight: '6px' }}>[PINNED]</span>}
                    {note.createdAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
