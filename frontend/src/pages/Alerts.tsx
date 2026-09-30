import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

const alertsData = [
  { status: 'High', time: '2 min ago', type: 'Mud Loss Risk', desc: 'Mud loss risk increased to 72% at 2,760 m. Similar events in 3 nearby wells.' },
  { status: 'Medium', time: '15 min ago', type: 'Formation Risk', desc: 'Entering historical stuck-pipe interval Formation X (2,700 - 2,900 m)' },
  { status: 'Medium', time: '1 hour ago', type: 'Parameter Deviation', desc: 'ROP decreased by 30% in last 30 mins' },
  { status: 'Low', time: '2 hours ago', type: 'Nearby Well Event', desc: '15/9-F-11 B mud loss event at 2,760 m' },
  { status: 'Low', time: '3 hours ago', type: 'System', desc: 'New drilling report available for 15/9-F-4' }
];

export default function Alerts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-industrial-900">Alerts & Notifications</h2>
            <p className="text-sm text-slate-500 mt-1">Real-time and predictive alerts based on drilling data and nearby wells intelligence</p>
         </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-4 border-b border-slate-100 flex items-center justify-between">
           <div className="flex gap-2">
             <button className="px-4 py-1.5 bg-accent-blue text-white text-sm font-medium rounded-full">All Alerts (12)</button>
             <button className="px-4 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-200">High (3)</button>
             <button className="px-4 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-200">Medium (5)</button>
             <button className="px-4 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-200">Low (4)</button>
           </div>
           <button className="text-sm font-semibold text-accent-blue hover:underline px-4 py-1.5 border border-accent-blue rounded-full">
             Mark All as Read
           </button>
         </div>

         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 border-b border-slate-200">
               <tr>
                 <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                 <th className="px-6 py-4 font-semibold text-slate-600">Time</th>
                 <th className="px-6 py-4 font-semibold text-slate-600">Alert Type</th>
                 <th className="px-6 py-4 font-semibold text-slate-600">Description</th>
                 <th className="px-6 py-4 font-semibold text-slate-600 text-right">Action</th>
               </tr>
             </thead>
             <div className="table-row-group divide-y divide-slate-100">
                {alertsData.map((alert, i) => (
                  <div className="table-row hover:bg-slate-50 transition-colors" key={i}>
                    <div className="table-cell px-6 py-4 align-middle">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                         alert.status === 'High' ? 'bg-red-100 text-red-700' : 
                         alert.status === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                       }`}>
                         {alert.status === 'High' ? <AlertTriangle className="w-3.5 h-3.5"/> : 
                          alert.status === 'Medium' ? <AlertTriangle className="w-3.5 h-3.5"/> : <CheckCircle className="w-3.5 h-3.5"/>}
                         {alert.status}
                       </span>
                    </div>
                    <div className="table-cell px-6 py-4 align-middle text-slate-500 whitespace-nowrap">{alert.time}</div>
                    <div className="table-cell px-6 py-4 align-middle font-medium text-slate-800 whitespace-nowrap">{alert.type}</div>
                    <div className="table-cell px-6 py-4 align-middle text-slate-600">{alert.desc}</div>
                    <div className="table-cell px-6 py-4 align-middle text-right">
                       <button className="text-accent-blue font-semibold hover:underline whitespace-nowrap">View Details</button>
                    </div>
                  </div>
                ))}
             </div>
           </table>
         </div>
      </div>
    </div>
  );
}
