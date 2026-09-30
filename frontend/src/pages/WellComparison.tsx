import { Plus, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ropData = [
  { depth: 2500, w1: 15, w2: 12, w3: 18, w4: 14 },
  { depth: 2600, w1: 18, w2: 15, w3: 20, w4: 16 },
  { depth: 2700, w1: 12, w2: 10, w3: 15, w4: 11 },
  { depth: 2800, w1: 8, w2: 5, w3: 10, w4: 7 }, // Mud loss / stuck pipe zone
  { depth: 2900, w1: 20, w2: 18, w3: 22, w4: 19 },
  { depth: 3000, w1: 25, w2: 22, w3: 26, w4: 24 },
];

export default function WellComparison() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-industrial-900">Well Comparison</h2>
            <p className="text-sm text-slate-500 mt-1">Compare drilling parameters and events across multiple wells.</p>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
         <h3 className="font-semibold text-slate-800 mb-3">Select Wells to Compare</h3>
         <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-sm font-semibold text-blue-800">15/9-F-1 (Current)</span>
              <X className="w-3 h-3 text-blue-500 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-sm font-semibold text-slate-700">15/9-F-11 B</span>
              <X className="w-3 h-3 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="text-sm font-semibold text-slate-700">15/9-F-4</span>
              <X className="w-3 h-3 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-semibold text-slate-700">15/9-F-14</span>
              <X className="w-3 h-3 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <button className="flex items-center gap-1 px-4 py-1.5 bg-accent-blue text-white rounded-full text-sm font-semibold hover:bg-blue-700 ml-auto">
              <Plus className="w-4 h-4" /> Add Well
            </button>
         </div>

         <div className="mt-6 border-b border-slate-200">
           <nav className="flex gap-6">
             <a href="#" className="py-2 text-sm font-semibold text-accent-blue border-b-2 border-accent-blue">Drilling Parameters</a>
             <a href="#" className="py-2 text-sm font-medium text-slate-500 hover:text-slate-700">Events Comparison</a>
             <a href="#" className="py-2 text-sm font-medium text-slate-500 hover:text-slate-700">Formation Comparison</a>
             <a href="#" className="py-2 text-sm font-medium text-slate-500 hover:text-slate-700">Trajectory Comparison</a>
           </nav>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-6">ROP Comparison</h3>
            <div className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={ropData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                   <XAxis dataKey="depth" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} />
                   <YAxis tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
                   <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                   <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                   <Line type="monotone" dataKey="w1" name="15/9-F-1" stroke="#2563EB" strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="w2" name="15/9-F-11 B" stroke="#DC2626" strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="w3" name="15/9-F-4" stroke="#EAB308" strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="w4" name="15/9-F-14" stroke="#16A34A" strokeWidth={2} dot={false} />
                 </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-6">Key Parameters at 2,800 m</h3>
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                   <th className="px-4 py-3 font-semibold text-slate-600">Parameter</th>
                   <th className="px-4 py-3 font-semibold text-slate-600">15/9-F-1</th>
                   <th className="px-4 py-3 font-semibold text-slate-600">15/9-F-11 B</th>
                   <th className="px-4 py-3 font-semibold text-slate-600">15/9-F-4</th>
                   <th className="px-4 py-3 font-semibold text-slate-600">15/9-F-14</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">ROP (m/hr)</td>
                    <td className="px-4 py-3 font-semibold">8.0</td>
                    <td className="px-4 py-3 text-red-600 font-bold bg-red-50">5.0</td>
                    <td className="px-4 py-3">10.0</td>
                    <td className="px-4 py-3">7.0</td>
                 </tr>
                 <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">WOB (klb)</td>
                    <td className="px-4 py-3 font-semibold">18.2</td>
                    <td className="px-4 py-3">15.1</td>
                    <td className="px-4 py-3">19.0</td>
                    <td className="px-4 py-3 text-red-600 font-bold bg-red-50">25.0</td>
                 </tr>
                 <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">Torque (kN·m)</td>
                    <td className="px-4 py-3 font-semibold text-yellow-600 bg-yellow-50">14.8</td>
                    <td className="px-4 py-3 text-red-600 font-bold bg-red-50">18.5</td>
                    <td className="px-4 py-3">12.1</td>
                    <td className="px-4 py-3">13.0</td>
                 </tr>
                 <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">Mud Weight (ppg)</td>
                    <td className="px-4 py-3 font-semibold">10.2</td>
                    <td className="px-4 py-3 text-yellow-600 bg-yellow-50">9.8</td>
                    <td className="px-4 py-3">10.4</td>
                    <td className="px-4 py-3">10.2</td>
                 </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
