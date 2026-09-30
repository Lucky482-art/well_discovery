import { useState } from 'react';
import WellMap3D from '../map/WellMap3D';
import { Search, MapPin, SlidersHorizontal, AlertTriangle, PlusCircle } from 'lucide-react';

export default function WellMap() {
  const [radius, setRadius] = useState('25 km');
  const [showPlanning, setShowPlanning] = useState(false);

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 shrink-0 flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-industrial-900">Well Map - Nearby Wells</h2>
            <p className="text-sm text-slate-500 mt-1">Visualize and analyze nearby wells, historical events and formation information.</p>
         </div>
         <button 
           onClick={() => setShowPlanning(!showPlanning)}
           className={`px-4 py-2 rounded font-medium text-sm border flex items-center gap-2 transition-colors ${showPlanning ? 'bg-accent-blue text-white border-accent-blue' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
         >
           <PlusCircle className="w-4 h-4" /> New Well Planning
         </button>
      </div>

      {/* Main Map Container */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 flex overflow-hidden">
         {/* Sidebar filters */}
         <div className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col">
           <div className="p-4 border-b border-slate-200">
             <h3 className="font-semibold text-slate-800 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Filters</h3>
           </div>
           <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Radius</label>
                <select value={radius} onChange={(e)=>setRadius(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue">
                  <option>5 km</option>
                  <option>10 km</option>
                  <option>25 km</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Event Type</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue"><option>All</option></select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Formation</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue"><option>All</option></select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Well Type</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue"><option>All</option></select>
              </div>

              {/* Offset Wells List */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-800">Nearby Wells (24)</h4>
                  <span className="text-xs text-accent-blue cursor-pointer">View All</span>
                </div>
                <div className="space-y-2">
                   <WellListItem id="15/9-F-11 B" dist="3.2 km" form="Formation X" event="Mud Loss" alert />
                   <WellListItem id="15/9-F-4" dist="5.7 km" form="Formation Y" event="Stuck Pipe" alert />
                   <WellListItem id="15/9-F-14" dist="8.1 km" form="Formation X" event="Kick" alert={false} />
                   <WellListItem id="15/9-F-12" dist="12.4 km" form="Formation Z" event="None" alert={false} />
                </div>
              </div>
           </div>
         </div>

         {/* 3D Map */}
         <div className="flex-1 relative">
            <WellMap3D />
            
            {showPlanning && (
               <div className="absolute top-4 right-4 w-80 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 p-5 z-10 animate-fade-in">
                  <h3 className="font-bold text-industrial-900 mb-2">Candidate Location A</h3>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Nearby wells analyzed:</span><span className="font-bold">12</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Historical events:</span><span className="font-bold text-red-600">8</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">High-risk intervals:</span><span className="font-bold text-red-600">3</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Dominant formation:</span><span className="font-medium">Formation X</span></div>
                     <div className="pt-3 border-t border-slate-200">
                        <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Historical Evidence</span>
                        <div className="flex items-center gap-1 text-sm"><AlertTriangle className="w-4 h-4 text-red-500"/> 2 Mud Loss, 1 Stuck Pipe</div>
                     </div>
                     <div className="pt-3 border-t border-slate-200">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold uppercase">Medium Confidence</span>
                        <p className="text-sm mt-2 text-slate-700">Suitable for further engineering evaluation.</p>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

function WellListItem({ id, dist, form, event, alert }: any) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded flex flex-col gap-1 cursor-pointer hover:border-accent-blue transition-colors">
      <div className="flex justify-between items-center">
        <span className="font-bold text-slate-800 text-sm">{id}</span>
        <span className="text-xs text-slate-500">{dist}</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-600">{form}</span>
        {alert ? <span className="text-red-600 font-semibold">{event}</span> : <span className="text-slate-400">{event}</span>}
      </div>
    </div>
  )
}
