import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Activity, AlertTriangle, Layers, History, ArrowRightLeft, MessageSquare, Bell, Settings, FileText, UserCircle } from 'lucide-react';
import { useState } from 'react';

export default function MainLayout() {
  const [role, setRole] = useState<'Office' | 'Field'>('Office');
  const location = useLocation();

  const allNavItems = [
    { name: 'Overview', path: '/overview', icon: LayoutDashboard },
    { name: 'Well Map', path: '/map', icon: Map },
    { name: 'Active Well', path: '/active-well', icon: Activity },
    { name: 'Risk Prediction', path: '/risk', icon: AlertTriangle },
    { name: 'Formation Analysis', path: '/formations', icon: Layers },
    { name: 'Historical Events', path: '/events', icon: History },
    { name: 'Well Comparison', path: '/comparison', icon: ArrowRightLeft },
    { name: 'Reports & Documents', path: '/reports', icon: FileText },
    { name: 'Ask NWIS (AI)', path: '/ask', icon: MessageSquare },
    { name: 'Alerts', path: '/alerts', icon: Bell },
  ];

  // Role-based prioritization
  const navItems = role === 'Office' 
    ? allNavItems 
    : [
        { name: 'Command Center', path: '/overview', icon: LayoutDashboard },
        { name: 'Live Monitoring', path: '/active-well', icon: Activity },
        { name: 'Risk & Alerts', path: '/alerts', icon: Bell },
        { name: '40m Torque Forecast', path: '/risk', icon: AlertTriangle },
        { name: 'Nearby Offsets', path: '/map', icon: Map },
        { name: 'Quick Recommendations', path: '/ask', icon: MessageSquare },
      ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-industrial-900 text-white flex flex-col">
        <div className="p-4 border-b border-industrial-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-accent-blue flex items-center justify-center font-bold">
              N
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">NWIS</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Volve Prototype</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-accent-blue text-white shadow-md' 
                        : 'text-slate-300 hover:bg-industrial-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-industrial-700">
           <NavLink
              to="/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                location.pathname === '/settings' 
                  ? 'bg-accent-blue text-white shadow-md' 
                  : 'text-slate-300 hover:bg-industrial-800 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Settings</span>
            </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
          <div className="flex-1 max-w-xl relative">
            <input 
              type="text" 
              placeholder="Global Search: wells, formations, events..." 
              className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue transition-shadow"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-700">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-red rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200 cursor-pointer" onClick={() => setRole(role === 'Office' ? 'Field' : 'Office')}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Drilling Engineer</p>
                <p className="text-xs text-accent-blue font-bold tracking-wide uppercase flex items-center justify-end gap-1">
                  <UserCircle className="w-3 h-3" /> {role} Role
                </p>
              </div>
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border border-slate-300">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
