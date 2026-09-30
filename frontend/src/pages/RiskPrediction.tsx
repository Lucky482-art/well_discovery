import { AlertTriangle, Activity, CheckCircle, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const riskTrendData = [
  { depth: 'Current', mudLoss: 72, stuckPipe: 31, kick: 18 },
  { depth: '+100m', mudLoss: 75, stuckPipe: 35, kick: 15 },
  { depth: '+200m', mudLoss: 80, stuckPipe: 45, kick: 12 },
  { depth: '+300m', mudLoss: 60, stuckPipe: 55, kick: 10 },
  { depth: '+400m', mudLoss: 40, stuckPipe: 60, kick: 15 },
  { depth: '+500m', mudLoss: 25, stuckPipe: 65, kick: 20 },
];

export default function RiskPrediction() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-industrial-900">Risk Assessment for 15/9-F-1</h2>
            <p className="text-sm text-slate-500 mt-1">ML-based prediction using real-time drilling data and nearby wells history</p>
         </div>
         <div className="text-right">
           <p className="text-xs text-slate-400">Last Updated</p>
           <p className="text-sm font-semibold text-slate-700">2 min ago</p>
         </div>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <RiskCard title="Mud Loss Risk" value="72%" status="High" trend="up" />
        <RiskCard title="Stuck Pipe Risk" value="31%" status="Medium" trend="up" />
        <RiskCard title="Kick Risk" value="18%" status="Low" trend="down" />
        <RiskCard title="Overall Risk" value="HIGH" status="High" icon />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Explainability Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-red-700 mb-4">Why is Mud Loss Risk High?</h3>
           <ul className="space-y-4">
             <ExplainItem num={1} text="Current depth (2,760 m) overlaps with historical mud loss zone." />
             <ExplainItem num={2} text="Similar events occurred in 3 nearby wells at this formation." />
             <ExplainItem num={3} text="Current mud weight is within historical high-risk interval." />
             <ExplainItem num={4} text="Formation X has high permeability." />
             <ExplainItem num={5} text="Increase in flow rate and decrease in ROP observed." />
           </ul>
           <button className="mt-6 px-4 py-2 border border-slate-300 rounded shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50">
             View Supporting Wells
           </button>
        </div>

        {/* Risk Trend Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-slate-800">Risk Trend (Next 500 m)</h3>
             <span className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded flex items-center gap-1"><Info className="w-3 h-3"/> Prototype Forecast</span>
           </div>
           
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="depth" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} />
                  <YAxis tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                  <Line type="monotone" dataKey="mudLoss" name="Mud Loss" stroke="#DC2626" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="stuckPipe" name="Stuck Pipe" stroke="#EAB308" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="kick" name="Kick" stroke="#16A34A" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}

function RiskCard({ title, value, status, icon = false, trend }: any) {
  const isHigh = status === 'High';
  const isMed = status === 'Medium';
  const isLow = status === 'Low';
  
  const color = isHigh ? 'text-red-600' : isMed ? 'text-yellow-600' : 'text-green-600';
  const bgBadge = isHigh ? 'bg-red-100 text-red-700' : isMed ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700';

  return (
    <div className={`bg-white p-5 rounded-xl border ${isHigh ? 'border-red-200' : 'border-slate-100'} shadow-sm text-center flex flex-col items-center justify-center`}>
       <p className="text-sm font-semibold text-slate-600 mb-2">{title}</p>
       <div className="flex items-center gap-2 mb-3">
         {icon && <AlertTriangle className={`w-8 h-8 ${color}`} />}
         <h3 className={`text-4xl font-bold ${color}`}>{value}</h3>
       </div>
       <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${bgBadge}`}>
         {status}
       </span>
    </div>
  )
}

function ExplainItem({ num, text }: { num: number, text: string }) {
  return (
    <li className="flex items-start gap-3">
       <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
         {num}
       </div>
       <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
    </li>
  )
}
