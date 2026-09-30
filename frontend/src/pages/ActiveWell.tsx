import { Activity, Beaker, Gauge, Thermometer, Droplet, ArrowDown, Zap, CircleDashed } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { time: '10:00', rop: 20, wob: 15, torque: 12, spp: 2500, flow: 600 },
  { time: '11:00', rop: 22, wob: 16, torque: 13, spp: 2600, flow: 610 },
  { time: '12:00', rop: 25, wob: 18, torque: 14, spp: 2800, flow: 620 },
  { time: '13:00', rop: 24, wob: 17, torque: 14.5, spp: 2750, flow: 615 },
  { time: '14:00', rop: 21, wob: 15, torque: 12.5, spp: 2650, flow: 605 },
  { time: '15:00', rop: 23, wob: 18, torque: 13.5, spp: 2700, flow: 610 },
  { time: '16:00', rop: 24.5, wob: 18.2, torque: 14.8, spp: 2850, flow: 620 },
];

export default function ActiveWell() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-industrial-900">Active Well: 15/9-F-1</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Drilling In Progress
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Volve Field, Norway | Water Depth: 120 m | Spud Date: 12 Jan 2026</p>
         </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6">
          <a href="#" className="py-3 text-sm font-semibold text-accent-blue border-b-2 border-accent-blue">Live Drilling Data</a>
          <a href="#" className="py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Well Details</a>
          <a href="#" className="py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Trajectory</a>
          <a href="#" className="py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Casing Program</a>
          <a href="#" className="py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Mud Program</a>
        </nav>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        <KPICard title="Current Depth" value="3,245 m" icon={<ArrowDown className="w-4 h-4 text-slate-500" />} />
        <KPICard title="ROP" value="24.5 m/hr" valueColor="text-green-600" icon={<Activity className="w-4 h-4 text-slate-500" />} />
        <KPICard title="WOB" value="18.2 klb" valueColor="text-green-600" icon={<Gauge className="w-4 h-4 text-slate-500" />} />
        <KPICard title="RPM" value="120" valueColor="text-blue-600" icon={<CircleDashed className="w-4 h-4 text-slate-500" />} />
        <KPICard title="Torque" value="14.8 kN·m" valueColor="text-red-600" icon={<Zap className="w-4 h-4 text-slate-500" />} alert />
        <KPICard title="Mud Weight" value="10.2 ppg" icon={<Beaker className="w-4 h-4 text-slate-500" />} />
        <KPICard title="Standpipe Press" value="2,850 psi" icon={<Thermometer className="w-4 h-4 text-slate-500" />} />
        <KPICard title="Flow Rate" value="620 gpm" icon={<Droplet className="w-4 h-4 text-slate-500" />} />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
         <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Drilling Parameters (Last 6 Hours)</h3>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Historical Telemetry Replay</span>
         </div>
         
         <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} />
                <YAxis yAxisId="left" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                <Line yAxisId="left" type="monotone" dataKey="rop" name="ROP (m/hr)" stroke="#16A34A" strokeWidth={2} dot={false} />
                <Line yAxisId="left" type="monotone" dataKey="wob" name="WOB (klb)" stroke="#2563EB" strokeWidth={2} dot={false} />
                <Line yAxisId="left" type="monotone" dataKey="torque" name="Torque (kN·m)" stroke="#DC2626" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="spp" name="SPP (psi)" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, valueColor = "text-slate-900", alert = false }: { title: string, value: string, icon: any, valueColor?: string, alert?: boolean }) {
  return (
    <div className={`bg-white p-4 rounded-xl border ${alert ? 'border-red-200 shadow-[0_0_15px_rgba(220,38,38,0.1)]' : 'border-slate-100 shadow-sm'} flex flex-col justify-between`}>
       <div className="flex items-center justify-between mb-2">
         <p className="text-xs font-medium text-slate-500 truncate pr-2">{title}</p>
         {icon}
       </div>
       <h3 className={`text-xl font-bold ${valueColor}`}>{value}</h3>
    </div>
  )
}
