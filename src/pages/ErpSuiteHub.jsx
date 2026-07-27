import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  BarChart3, 
  Briefcase, 
  ShieldCheck, 
  Bell, 
  Cpu, 
  WifiOff, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Layers, 
  Activity, 
  Zap, 
  RefreshCw, 
  Play, 
  Search,
  ArrowUpRight,
  PieChart,
  Terminal,
  Database,
  Lock,
  GitBranch,
  FileCode
} from 'lucide-react';

export default function ErpSuiteHub() {
  const [activeErpTab, setActiveErpTab] = useState('finance');

  // --- F-02 & F-03 State: Financial Ledger & AP/AR ---
  const [ledgerEntries] = useState([
    { id: 'TX-1001', account: '1010 - Cash & Equivalents', type: 'Debit', amount: 150000, date: '2026-07-20', ref: 'Client Retainer Payment' },
    { id: 'TX-1002', account: '4010 - Cloud Software Revenue', type: 'Credit', amount: 150000, date: '2026-07-20', ref: 'Client Retainer Payment' },
    { id: 'TX-1003', account: '5020 - Server & Infrastructure', type: 'Debit', amount: 12500, date: '2026-07-22', ref: 'AWS & Kubernetes Hosting' },
    { id: 'TX-1004', account: '2010 - Accounts Payable', type: 'Credit', amount: 12500, date: '2026-07-22', ref: 'AWS & Kubernetes Hosting' },
  ]);

  const [invoices] = useState([
    { id: 'INV-2026-001', vendor: 'Amazon Web Services', amount: 12500, dueDate: '2026-08-05', status: 'Approved', ocrAccuracy: '98.5%' },
    { id: 'INV-2026-002', vendor: 'Datadog Monitoring', amount: 3400, dueDate: '2026-08-10', status: 'Pending 3-Way Match', ocrAccuracy: '96.2%' },
    { id: 'INV-2026-003', vendor: 'GitHub Enterprise', amount: 5800, dueDate: '2026-08-15', status: 'Approved', ocrAccuracy: '99.1%' },
  ]);

  // --- F-04 State: HR & Payroll Engine ---
  const [employees] = useState([
    { id: 'EMP-01', name: 'Rahul Sharma', department: 'Engineering', role: 'Lead Architect', grossSalary: 12500, tax: 2500, netSalary: 10000, status: 'Active' },
    { id: 'EMP-02', name: 'Ananya Gupta', department: 'Data Science', role: 'AI / ML Engineer', grossSalary: 11500, tax: 2300, netSalary: 9200, status: 'Active' },
    { id: 'EMP-03', name: 'Siddharth V', department: 'DevOps', role: 'Cloud Admin', grossSalary: 10800, tax: 2160, netSalary: 8640, status: 'Active' },
    { id: 'EMP-04', name: 'Priya Mehta', department: 'Finance', role: 'Financial Controller', grossSalary: 11000, tax: 2200, netSalary: 8800, status: 'Active' },
  ]);
  const [payrollRunning, setPayrollRunning] = useState(false);
  const [payrollSuccess, setPayrollSuccess] = useState(false);

  // --- F-05 & F-06 State: SCM & AI Demand Forecasting ---
  const [inventory] = useState([
    { sku: 'SKU-SER-64', name: 'Amdox Enterprise Edge Server', stock: 42, reorderPoint: 50, cost: 2400, forecastDemand: 65 },
    { sku: 'SKU-GPU-80', name: 'NVIDIA H100 ML Node', stock: 12, reorderPoint: 15, cost: 28000, forecastDemand: 22 },
    { sku: 'SKU-SW-10G', name: 'Managed 48-Port Switch', stock: 88, reorderPoint: 30, cost: 850, forecastDemand: 45 },
    { sku: 'SKU-SSD-8TB', name: 'NVMe Gen5 Enterprise SSD', stock: 150, reorderPoint: 60, cost: 450, forecastDemand: 180 },
  ]);
  const [aiPredicting, setAiPredicting] = useState(false);

  // --- F-07 State: Project Management & Gantt ---
  const [projects] = useState([
    { id: 'PRJ-01', name: 'AI Demand Forecasting Microservice', budget: 85000, spent: 62000, progress: 78, status: 'On Track' },
    { id: 'PRJ-02', name: 'Keycloak 25 Multi-Tenant SSO Migration', budget: 45000, spent: 44000, progress: 95, status: 'Budget Warning' },
    { id: 'PRJ-03', name: 'Kubernetes 1.31 Cluster Deployment', budget: 120000, spent: 89000, progress: 65, status: 'On Track' },
  ]);

  // --- F-09 State: Audit Log & Security Audit ---
  const [auditLogs] = useState([
    { id: 'LOG-8801', timestamp: '2026-07-24T10:14:22Z', tenant: 'tenant-enterprise-01', user: 'rahul@amdox.tech', event: 'GL_JOURNAL_ENTRY_POST', hash: 'a8f9c2d1...' },
    { id: 'LOG-8802', timestamp: '2026-07-24T10:30:15Z', tenant: 'tenant-enterprise-01', user: 'system_cron', event: 'ML_FORECAST_RETRAIN', hash: 'e4b107a9...' },
    { id: 'LOG-8803', timestamp: '2026-07-24T11:05:44Z', tenant: 'tenant-enterprise-02', user: 'ananya@amdox.tech', event: 'PAYROLL_SAGA_TRIGGER', hash: '7c89e0f3...' },
  ]);

  // --- F-11 State: OpenAPI & GraphQL Sandbox ---
  const [apiProtocol, setApiProtocol] = useState('graphql');
  const [graphqlQuery, setGraphqlQuery] = useState(`query GetSystemMetrics {\n  erpMetrics {\n    uptimeSla\n    p95LatencyMs\n    activeTenants\n    securityCompliance\n  }\n}`);
  const [queryResponse, setQueryResponse] = useState(null);

  const handleRunPayroll = () => {
    setPayrollRunning(true);
    setPayrollSuccess(false);
    setTimeout(() => {
      setPayrollRunning(false);
      setPayrollSuccess(true);
    }, 1500);
  };

  const handleRunAiForecast = () => {
    setAiPredicting(true);
    setTimeout(() => {
      setAiPredicting(false);
    }, 1200);
  };

  const handleExecuteApiSandbox = () => {
    if (apiProtocol === 'graphql') {
      setQueryResponse({
        data: {
          erpMetrics: {
            uptimeSla: '99.94%',
            p95LatencyMs: 142,
            activeTenants: 18,
            securityCompliance: 'SOC 2 Type II / ISO 27001'
          }
        },
        status: 200,
        executionTimeMs: 18
      });
    } else {
      setQueryResponse({
        openapi: '3.1.0',
        info: { title: 'Amdox ERP API Gateway', version: '1.0.0' },
        paths: {
          '/api/v1/gl/entries': { get: { summary: 'Fetch General Ledger Entries' } },
          '/api/v1/payroll/run': { post: { summary: 'Trigger BullMQ Payroll Saga' } },
          '/api/v1/ml/forecast': { get: { summary: 'Get 90-Day SKU Demand Prediction' } }
        }
      });
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 100%)', border: '1px solid var(--border-glow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-purple">Project Code: AMX-ERP-2026-04</span>
              <span className="badge badge-indigo">Version 1.0</span>
              <span className="badge badge-emerald">SOC 2 Type II Compliant</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              AMDOX TECHNOLOGIES <span className="text-gradient">AI-Powered Cloud ERP Suite</span>
            </h1>
            <p style={{ maxWidth: '780px', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Next-Generation Intelligent Resource Planning Platform for enterprise multi-tenant financial GL, supply chain automation, HR & payroll sagas, AI demand forecasting, and real-time BI.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
            <div>Target Uptime SLA: <strong style={{ color: 'var(--accent-emerald)' }}>99.9% Uptime</strong></div>
            <div>P95 API Latency: <strong style={{ color: 'var(--accent-primary)' }}>&lt; 300ms</strong></div>
            <div>Throughput Capacity: <strong style={{ color: 'var(--accent-purple)' }}>&ge; 2,000 Concurrent Users</strong></div>
            <div>Architecture Security: <strong style={{ color: 'var(--accent-amber)' }}>OWASP + GDPR Compliant</strong></div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="tabs-header" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
        <button className={`tab-btn ${activeErpTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveErpTab('finance')}>
          <DollarSign size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Financial GL & AP/AR (F-02, F-03)
        </button>
        <button className={`tab-btn ${activeErpTab === 'hr' ? 'active' : ''}`} onClick={() => setActiveErpTab('hr')}>
          <Users size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          HR & Payroll Engine (F-04)
        </button>
        <button className={`tab-btn ${activeErpTab === 'scm' ? 'active' : ''}`} onClick={() => setActiveErpTab('scm')}>
          <Package size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Supply Chain & AI Forecast (F-05, F-06)
        </button>
        <button className={`tab-btn ${activeErpTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveErpTab('projects')}>
          <Briefcase size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Projects & Gantt (F-07)
        </button>
        <button className={`tab-btn ${activeErpTab === 'bi' ? 'active' : ''}`} onClick={() => setActiveErpTab('bi')}>
          <BarChart3 size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          BI & Analytics (F-08)
        </button>

        {/* HIGH-IMPACT SENIOR IMPLEMENTATIONS */}
        <button className={`tab-btn ${activeErpTab === 'c4' ? 'active' : ''}`} onClick={() => setActiveErpTab('c4')}>
          <GitBranch size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          C4 & ERD Architecture
        </button>
        <button className={`tab-btn ${activeErpTab === 'security' ? 'active' : ''}`} onClick={() => setActiveErpTab('security')}>
          <Lock size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Audit Log & OWASP (F-09)
        </button>
        <button className={`tab-btn ${activeErpTab === 'sandbox' ? 'active' : ''}`} onClick={() => setActiveErpTab('sandbox')}>
          <Terminal size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          GraphQL / REST Sandbox (F-11)
        </button>
        <button className={`tab-btn ${activeErpTab === 'adrs' ? 'active' : ''}`} onClick={() => setActiveErpTab('adrs')}>
          <FileCode size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Architecture Decision Records (ADRs)
        </button>
      </div>

      {/* MODULE 1: FINANCIAL LEDGER & AP/AR */}
      {activeErpTab === 'finance' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>F-02 Module</span>
                <h3 style={{ fontSize: '1.3rem' }}>Double-Entry General Ledger (GL)</h3>
              </div>
              <span className="badge badge-emerald">Balanced</span>
            </div>

            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Tx ID</th>
                    <th>Account</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerEntries.map(e => (
                    <tr key={e.id}>
                      <td><code style={{ fontSize: '0.75rem' }}>{e.id}</code></td>
                      <td style={{ fontSize: '0.85rem' }}>{e.account}</td>
                      <td>
                        <span className={`badge ${e.type === 'Debit' ? 'badge-indigo' : 'badge-emerald'}`}>
                          {e.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>${e.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '0.4rem' }}>F-03 Module</span>
                <h3 style={{ fontSize: '1.3rem' }}>AP / AR Invoice OCR Automation</h3>
              </div>
              <span className="badge badge-amber">3-Way Match Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {invoices.map(inv => (
                <div key={inv.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{inv.vendor}</span>
                    <span className={`badge ${inv.status.includes('Approved') ? 'badge-emerald' : 'badge-amber'}`}>{inv.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>Amount: <strong style={{ color: 'var(--text-main)' }}>${inv.amount.toLocaleString()}</strong></span>
                    <span>OCR Accuracy: <strong style={{ color: 'var(--accent-primary)' }}>{inv.ocrAccuracy}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: HR & PAYROLL */}
      {activeErpTab === 'hr' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>F-04 Module</span>
                <h3 style={{ fontSize: '1.5rem' }}>Enterprise Payroll Saga Engine</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>BullMQ async batch processing & gross-to-net tax calculation</p>
              </div>

              <button className="btn btn-primary" onClick={handleRunPayroll} disabled={payrollRunning}>
                <RefreshCw size={16} className={payrollRunning ? 'spin' : ''} />
                <span>{payrollRunning ? 'Executing BullMQ Saga...' : 'Run Payroll Batch'}</span>
              </button>
            </div>

            {payrollSuccess && (
              <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--accent-emerald)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} />
                <span>Payroll Saga completed in 1.2s! 4 Payslip PDFs generated and audit log registered.</span>
              </div>
            )}

            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Employee Name</th>
                    <th>Role</th>
                    <th>Gross Salary</th>
                    <th>Tax Slabs</th>
                    <th>Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td><code style={{ fontSize: '0.75rem' }}>{emp.id}</code></td>
                      <td style={{ fontWeight: 600 }}>{emp.name}</td>
                      <td><span className="badge badge-indigo">{emp.role}</span></td>
                      <td>${emp.grossSalary.toLocaleString()}</td>
                      <td style={{ color: 'var(--accent-rose)' }}>-${emp.tax.toLocaleString()}</td>
                      <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>${emp.netSalary.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: SCM & AI FORECASTING */}
      {activeErpTab === 'scm' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '0.4rem' }}>F-05 Module</span>
                <h3 style={{ fontSize: '1.3rem' }}>SCM Real-Time Inventory</h3>
              </div>
              <span className="badge badge-emerald">FIFO Costing</span>
            </div>

            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>SKU Code</th>
                    <th>Item Name</th>
                    <th>Current Stock</th>
                    <th>Reorder Trigger</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => (
                    <tr key={item.sku}>
                      <td><code style={{ fontSize: '0.75rem' }}>{item.sku}</code></td>
                      <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.name}</td>
                      <td>
                        <span className={`badge ${item.stock < item.reorderPoint ? 'badge-rose' : 'badge-emerald'}`}>
                          {item.stock} units
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{item.reorderPoint} units</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>F-06 Module</span>
                <h3 style={{ fontSize: '1.3rem' }}>AI Demand Forecasting (FastAPI + Prophet)</h3>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={handleRunAiForecast} disabled={aiPredicting}>
                <Zap size={14} color="var(--accent-amber)" />
                <span>{aiPredicting ? 'Running Model...' : 'Predict Demand'}</span>
              </button>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Forecast Model: <strong style={{ color: 'var(--accent-purple)' }}>LSTM / Prophet ML</strong></span>
                <span>Accuracy: <strong style={{ color: 'var(--accent-emerald)' }}>MAPE &lt; 12%</strong></span>
              </div>
              <div>Horizon: <strong>90 Days SKU Prediction</strong></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {inventory.map(item => (
                <div key={item.sku} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stock: {item.stock}</span>
                    <span className="badge badge-purple">
                      <ArrowUpRight size={12} /> Forecast: {item.forecastDemand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: PROJECT MANAGEMENT */}
      {activeErpTab === 'projects' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>F-07 Module</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Enterprise Project Gantt & Budget Variance</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {projects.map(prj => (
                <div key={prj.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div>
                      <span className="badge badge-indigo" style={{ marginRight: '8px' }}>{prj.id}</span>
                      <strong style={{ fontSize: '1.05rem' }}>{prj.name}</strong>
                    </div>
                    <span className={`badge ${prj.status === 'On Track' ? 'badge-emerald' : 'badge-amber'}`}>
                      {prj.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <span>Budget Spent: <strong>${prj.spent.toLocaleString()}</strong> / ${prj.budget.toLocaleString()}</span>
                    <span>Progress: <strong>{prj.progress}%</strong></span>
                  </div>

                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${prj.progress}%`, height: '100%', background: prj.status === 'On Track' ? 'var(--accent-emerald)' : 'var(--accent-amber)', transition: 'width 0.5s' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: BUSINESS INTELLIGENCE */}
      {activeErpTab === 'bi' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'System Uptime SLA', val: '99.94%', badge: 'Target > 99.9%', color: 'var(--accent-emerald)' },
              { label: 'API P95 Response', val: '142 ms', badge: 'Target < 300ms', color: 'var(--accent-primary)' },
              { label: 'Active Tenant Users', val: '2,450', badge: 'Cap >= 2,000', color: 'var(--accent-purple)' },
              { label: 'OCR Auto-Approve', val: '97.8%', badge: 'Target >= 95%', color: 'var(--accent-amber)' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>{stat.badge}</span>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: stat.color, margin: '0.25rem 0' }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HIGH IMPACT: C4 & ERD ARCHITECTURE */}
      {activeErpTab === 'c4' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>System Architecture</span>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>C4 System Container Topology</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div style={{ background: 'rgba(99,102,241,0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>1. Client Layer:</strong> Next.js 15 SPA/SSR + Tailwind CSS 4
              </div>
              <div style={{ background: 'rgba(168,85,247,0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168,85,247,0.3)' }}>
                <strong style={{ color: 'var(--accent-purple)' }}>2. API Gateway:</strong> NestJS 11 Gateway + Keycloak 25 JWT Guards
              </div>
              <div style={{ background: 'rgba(6,182,212,0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(6,182,212,0.3)' }}>
                <strong style={{ color: 'var(--accent-secondary)' }}>3. ML Microservice:</strong> Python 3.13 FastAPI + Prophet / LSTM
              </div>
              <div style={{ background: 'rgba(16,185,129,0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <strong style={{ color: 'var(--accent-emerald)' }}>4. Persistence:</strong> PostgreSQL 17 + TimescaleDB + Redis 8 Cache
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Prisma Schema</span>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Database ERD Entity Inspector</h3>
            <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--accent-emerald)', maxHeight: '280px', overflowY: 'auto' }}>
{`model Tenant {
  id        String   @id @default(uuid())
  name      String
  users     User[]
  accounts  Account[]
}

model User {
  id        String   @id @default(uuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  role      Role     @default(USER)
}

model Account {
  id        String   @id @default(uuid())
  code      String   @unique
  balance   Decimal  @default(0.00)
}`}
            </pre>
          </div>
        </div>
      )}

      {/* HIGH IMPACT: AUDIT LOG & OWASP SECURITY */}
      {activeErpTab === 'security' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>F-09 Module & Security</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Immutable Audit Log & OWASP Controls</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              TimescaleDB append-only hash chains providing tamper-evident GDPR & SOC 2 compliance.
            </p>

            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Timestamp</th>
                    <th>Tenant Context</th>
                    <th>Event Mutation</th>
                    <th>Cryptographic Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(l => (
                    <tr key={l.id}>
                      <td><code style={{ fontSize: '0.75rem' }}>{l.id}</code></td>
                      <td style={{ fontSize: '0.8rem' }}>{l.timestamp}</td>
                      <td><span className="badge badge-indigo">{l.tenant}</span></td>
                      <td style={{ fontWeight: 600 }}>{l.event}</td>
                      <td><code style={{ fontSize: '0.75rem', color: 'var(--accent-purple)' }}>{l.hash}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* HIGH IMPACT: GRAPHQL / REST SANDBOX */}
      {activeErpTab === 'sandbox' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>F-11 Module</span>
                <h3 style={{ fontSize: '1.5rem' }}>GraphQL & OpenAPI 3.1 Interactive Sandbox</h3>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className={`btn btn-sm ${apiProtocol === 'graphql' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setApiProtocol('graphql')}>GraphQL Query</button>
                <button className={`btn btn-sm ${apiProtocol === 'rest' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setApiProtocol('rest')}>OpenAPI Spec</button>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              {apiProtocol === 'graphql' ? (
                <textarea className="form-textarea" rows="5" value={graphqlQuery} onChange={e => setGraphqlQuery(e.target.value)} style={{ fontFamily: 'monospace', fontSize: '0.88rem' }} />
              ) : (
                <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
                  OpenAPI 3.1 Endpoint: <code style={{ color: 'var(--accent-primary)' }}>GET /api/v1/openapi.json</code>
                </div>
              )}
            </div>

            <button className="btn btn-primary" onClick={handleExecuteApiSandbox} style={{ marginBottom: '1.5rem' }}>
              <Play size={16} /> Execute API Request
            </button>

            {queryResponse && (
              <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: 'var(--radius-sm)', color: 'var(--accent-emerald)', fontSize: '0.85rem', overflowX: 'auto' }}>
                {JSON.stringify(queryResponse, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* HIGH IMPACT: ARCHITECTURE DECISION RECORDS */}
      {activeErpTab === 'adrs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { id: 'ADR-001', title: 'Modular Monolith over Microservices for Phase 1', rationale: 'Chosen NestJS modular monolith to eliminate network latency while preserving clean bounded context boundaries for future microservices decomposition.' },
            { id: 'ADR-002', title: 'Keycloak 25 with RS256 JWT Asymmetric Signatures', rationale: 'Evaluated Auth0; selected Keycloak for self-hosted multi-tenant realm isolation and zero vendor lock-in.' },
            { id: 'ADR-003', title: 'TimescaleDB for Audit Logging & Metric Telemetry', rationale: 'Evaluated InfluxDB; selected TimescaleDB extension on Postgres to leverage unified relational ACID joins alongside hypertable time-series efficiency.' }
          ].map(adr => (
            <div key={adr.id} className="glass-panel" style={{ padding: '1.75rem' }}>
              <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>{adr.id}</span>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{adr.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{adr.rationale}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
