import { AlertTriangle, MapPin, Target, Activity, Layers, ArrowRightLeft, MessageSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import WellMap3D from '../map/WellMap3D';
import { useWells } from '../hooks/useApi';

export default function Overview() {
  const { wells, loading } = useWells();
  
  // Find active well (first one that is drilling, or fallback)
  const activeWell = wells.find(w => w.well_type === 'Active' || w.status === 'Drilling') || { well_name: 'Loading...', field: '' };
  
  // Count offsets
  const offsetWells = wells.filter(w => w.well_type !== 'Active' && w.status !== 'Drilling');
  const offsetCount = offsetWells.length > 0 ? offsetWells.length : (loading ? '...' : 0);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-industrial-900">Welcome to NWIS</h2>
          <p className="text-slate-500 font-medium">Nearby Wells Intelligence System</p>
          <p className="text-sm text-slate-400 mt-1">Turning historical drilling knowledge into smarter decisions.</p>
        </div>
        <div className="hidden lg:block w-32 h-20 bg-slate-200 rounded-lg overflow-hidden relative">
           {/* Placeholder for rig image from the mockup */}
           <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Well */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-accent-blue">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Well</p>
              <h3 className="text-xl font-bold text-slate-900">{activeWell.well_name}</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 ml-13">{activeWell.field ? `${activeWell.field} Field, Norway` : 'Loading...'}</p>
        </div>

        {/* Nearby Wells */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center">
           <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-accent-green">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Nearby Wells</p>
              <h3 className="text-2xl font-bold text-accent-green">24</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 ml-13">within 25 km</p>
        </div>

        {/* Active Risks */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100 flex flex-col justify-center">
           <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-accent-red">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Risks</p>
              <h3 className="text-2xl font-bold text-accent-red">3</h3>
            </div>
          </div>
          <p className="text-xs text-red-400 mt-2 ml-13">High: 1 | Medium: 2</p>
        </div>

        {/* Historical Events */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center">
           <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Historical Events</p>
              <h3 className="text-2xl font-bold text-purple-600">17</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 ml-13">in nearby wells</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-96">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Nearby Wells Map</h3>
            <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm text-slate-600">
              <option>25 km</option>
              <option>10 km</option>
              <option>5 km</option>
            </select>
          </div>
          <div className="flex-1 bg-slate-200 relative p-1">
             <WellMap3D />
          </div>
        </div>

        {/* Side Panel: Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Recent Alerts</h3>
              <a href="#" className="text-xs text-accent-blue hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-accent-red shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">High Mud Loss Risk</p>
                  <p className="text-xs text-slate-500 mt-0.5">Depth: 2,760 m</p>
                  <p className="text-xs text-slate-400 mt-1">Similar event in 3 nearby wells</p>
                </div>
                <span className="text-xs text-slate-400 ml-auto whitespace-nowrap">2 min ago</span>
              </div>
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-accent-yellow shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Formation X - High Risk Zone</p>
                  <p className="text-xs text-slate-500 mt-0.5">Entering historical stuck-pipe interval</p>
                </div>
                <span className="text-xs text-slate-400 ml-auto whitespace-nowrap">15 min ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
             <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-3">
               <NavLink to="/active-well" className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-accent-blue/30 transition-colors">
                 <Target className="w-5 h-5 text-accent-blue mb-2" />
                 <span className="text-xs font-medium text-slate-700">View Active Well</span>
               </NavLink>
               <NavLink to="/formations" className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-accent-blue/30 transition-colors">
                 <Layers className="w-5 h-5 text-accent-blue mb-2" />
                 <span className="text-xs font-medium text-slate-700">Analyze Formation</span>
               </NavLink>
               <NavLink to="/comparison" className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-accent-blue/30 transition-colors">
                 <ArrowRightLeft className="w-5 h-5 text-accent-blue mb-2" />
                 <span className="text-xs font-medium text-slate-700">Compare Wells</span>
               </NavLink>
               <NavLink to="/ask" className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-accent-blue/30 transition-colors">
                 <MessageSquare className="w-5 h-5 text-accent-blue mb-2" />
                 <span className="text-xs font-medium text-slate-700">Ask NWIS (AI)</span>
               </NavLink>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
