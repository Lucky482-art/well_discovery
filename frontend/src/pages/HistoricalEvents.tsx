import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const eventsData = [
  { id: '15/9-F-11 B', type: 'Mud Loss', depth: 2760, formation: 'Formation X', severity: 'High', cause: 'High permeability', mitigation: 'Reduce mud weight', report: 'View' },
  { id: '15/9-F-4', type: 'Stuck Pipe', depth: 2910, formation: 'Formation X', severity: 'High', cause: 'Differential sticking', mitigation: 'Rotate & circulate', report: 'View' },
  { id: '15/9-F-14', type: 'Kick', depth: 3120, formation: 'Formation Y', severity: 'Medium', cause: 'Overpressure', mitigation: 'Increase mud weight', report: 'View' },
  { id: '15/9-F-1 C', type: 'Mud Loss', depth: 2450, formation: 'Formation X', severity: 'Medium', cause: 'Fractures', mitigation: 'LCM pills', report: 'View' },
  { id: '15/9-F-12', type: 'Equip. Failure', depth: 1850, formation: 'Formation C', severity: 'Low', cause: 'Bit wear', mitigation: 'Replace bit', report: 'View' },
];

export default function HistoricalEvents() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
         <div>
            <h2 className="text-2xl font-bold text-industrial-900">Historical Drilling Events</h2>
            <p className="text-sm text-slate-500 mt-1">Search and analyze past drilling events from nearby wells</p>
         </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 flex flex-col min-h-0 overflow-hidden">
         {/* Filters & Search */}
         <div className="p-5 border-b border-slate-100 shrink-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
               <div className="flex flex-col gap-1">
                 <label className="text-xs font-semibold text-slate-600">Event Type</label>
                 <select className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-accent-blue"><option>All</option><option>Mud Loss</option><option>Stuck Pipe</option></select>
               </div>
               <div className="flex flex-col gap-1">
                 <label className="text-xs font-semibold text-slate-600">Formation</label>
                 <select className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-accent-blue"><option>All</option><option>Formation X</option></select>
               </div>
               <div className="flex flex-col gap-1 lg:col-span-2">
                 <label className="text-xs font-semibold text-slate-600">Depth Range</label>
                 <div className="flex gap-2">
                   <input type="number" placeholder="Min" className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-accent-blue" />
                   <span className="text-slate-400 self-center">-</span>
                   <input type="number" placeholder="Max" className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-accent-blue" />
                 </div>
               </div>
               <div className="flex flex-col gap-1">
                 <label className="text-xs font-semibold text-slate-600">Well</label>
                 <select className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-accent-blue"><option>All</option></select>
               </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input type="text" placeholder="Search events, causes, mitigation..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-accent-blue" />
            </div>
         </div>

         {/* Table */}
         <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                  <tr>
                     <th className="px-6 py-3 font-semibold text-slate-600">Well ID</th>
                     <th className="px-6 py-3 font-semibold text-slate-600">Event Type</th>
                     <th className="px-6 py-3 font-semibold text-slate-600">Depth (m)</th>
                     <th className="px-6 py-3 font-semibold text-slate-600">Formation</th>
                     <th className="px-6 py-3 font-semibold text-slate-600">Severity</th>
                     <th className="px-6 py-3 font-semibold text-slate-600">Cause</th>
                     <th className="px-6 py-3 font-semibold text-slate-600">Mitigation</th>
                     <th className="px-6 py-3 font-semibold text-slate-600">Report</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {eventsData.map((ev, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                       <td className="px-6 py-4 font-medium text-slate-900">{ev.id}</td>
                       <td className={`px-6 py-4 font-medium ${ev.type === 'Mud Loss' ? 'text-red-600' : ev.type === 'Stuck Pipe' ? 'text-yellow-600' : 'text-slate-700'}`}>{ev.type}</td>
                       <td className="px-6 py-4 text-slate-700">{ev.depth}</td>
                       <td className="px-6 py-4 text-slate-700">{ev.formation}</td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${ev.severity === 'High' ? 'bg-red-100 text-red-700' : ev.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {ev.severity}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-slate-700">{ev.cause}</td>
                       <td className="px-6 py-4 text-slate-700">{ev.mitigation}</td>
                       <td className="px-6 py-4">
                          <button className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded text-accent-blue hover:bg-slate-50 transition-colors">
                            <Eye className="w-3 h-3" /> {ev.report}
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-4 border-t border-slate-100 flex items-center justify-between shrink-0 bg-white">
            <p className="text-sm text-slate-500">Showing 1-5 of 24 events</p>
            <div className="flex gap-1">
              <button className="p-1 rounded border border-slate-200 text-slate-400 hover:text-slate-600 disabled:opacity-50"><ChevronLeft className="w-5 h-5"/></button>
              <button className="w-8 h-8 rounded bg-accent-blue text-white text-sm font-medium">1</button>
              <button className="w-8 h-8 rounded border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">2</button>
              <button className="w-8 h-8 rounded border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">3</button>
              <button className="p-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50"><ChevronRight className="w-5 h-5"/></button>
            </div>
         </div>
      </div>
    </div>
  );
}
