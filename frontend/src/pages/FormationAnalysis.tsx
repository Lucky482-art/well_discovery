import { Layers, AlertTriangle } from 'lucide-react';

export default function FormationAnalysis() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-industrial-900">Formation Analysis</h2>
            <p className="text-sm text-slate-500 mt-1">Current well formations with historical events from nearby wells.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Lithology Log */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col h-[600px]">
            <h3 className="font-semibold text-slate-800 mb-4">Lithology Log</h3>
            <div className="flex-1 relative border border-slate-200 rounded-lg overflow-hidden flex bg-slate-50">
               {/* Depth Axis */}
               <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-2 text-xs text-slate-500 relative">
                  <div className="absolute top-[0%]">0</div>
                  <div className="absolute top-[14%]">500</div>
                  <div className="absolute top-[28%]">1,000</div>
                  <div className="absolute top-[42%]">1,500</div>
                  <div className="absolute top-[56%]">2,000</div>
                  <div className="absolute top-[70%]">2,500</div>
                  <div className="absolute top-[84%]">3,000</div>
                  <div className="absolute top-[98%]">3,500</div>
               </div>
               
               {/* Formation Blocks */}
               <div className="flex-1 relative">
                  <div className="absolute top-0 w-full h-[16%] bg-yellow-100 border-b border-slate-300 flex items-center justify-center">
                     <span className="text-sm font-semibold text-yellow-800">Formation A (Sandstone)</span>
                  </div>
                  <div className="absolute top-[16%] w-full h-[22%] bg-slate-300 border-b border-slate-400 flex items-center justify-center">
                     <span className="text-sm font-semibold text-slate-700">Formation B (Shale)</span>
                  </div>
                  <div className="absolute top-[38%] w-full h-[32%] bg-blue-100 border-b border-slate-300 flex items-center justify-center">
                     <span className="text-sm font-semibold text-blue-800">Formation C (Limestone)</span>
                  </div>
                  <div className="absolute top-[70%] w-full h-[14%] bg-red-100 border-b border-red-300 flex items-center justify-center shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]">
                     <span className="text-sm font-bold text-red-700">Formation X (High Risk)</span>
                  </div>
                  <div className="absolute top-[84%] w-full h-[16%] bg-blue-100 flex items-center justify-center">
                     <span className="text-sm font-semibold text-blue-800">Formation Y</span>
                  </div>
                  
                  {/* Current Depth Indicator */}
                  <div className="absolute top-[92%] w-full border-t-2 border-dashed border-blue-600 z-10">
                     <div className="absolute -top-3 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-md">
                        Current Depth: 3,245 m
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Formation Details */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
               <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-red-700">Formation X</h3>
                    <p className="text-sm text-slate-500">2,500 - 3,000 m | Sandstone</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded text-sm uppercase tracking-wide">High Risk</span>
               </div>
               
               <div className="grid grid-cols-4 gap-4 mb-6">
                 <div className="text-center p-3 bg-slate-50 rounded border border-slate-100">
                    <p className="text-2xl font-bold text-slate-800">12</p>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Nearby Wells</p>
                 </div>
                 <div className="text-center p-3 bg-red-50 rounded border border-red-100">
                    <p className="text-2xl font-bold text-red-600">4</p>
                    <p className="text-xs text-red-500 uppercase font-semibold">Mud Loss Events</p>
                 </div>
                 <div className="text-center p-3 bg-yellow-50 rounded border border-yellow-100">
                    <p className="text-2xl font-bold text-yellow-600">2</p>
                    <p className="text-xs text-yellow-500 uppercase font-semibold">Stuck Pipe Events</p>
                 </div>
                 <div className="text-center p-3 bg-green-50 rounded border border-green-100">
                    <p className="text-2xl font-bold text-green-600">1</p>
                    <p className="text-xs text-green-500 uppercase font-semibold">Kick Events</p>
                 </div>
               </div>

               <div className="flex gap-8 items-center">
                  <div className="w-32 h-32 rounded-full border-8 border-slate-100 relative">
                     {/* CSS pie chart trick placeholder */}
                     <div className="absolute inset-0 rounded-full border-8 border-red-500 border-r-transparent border-b-transparent transform rotate-45"></div>
                     <div className="absolute inset-0 rounded-full border-8 border-yellow-500 border-l-transparent border-t-transparent border-r-transparent transform rotate-45"></div>
                     <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xs text-slate-500 font-semibold uppercase">Risk</span>
                        <span className="text-lg font-bold text-red-600">HIGH</span>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full"></span><span className="text-sm text-slate-700">Mud Loss (33%)</span></div>
                     <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-500 rounded-full"></span><span className="text-sm text-slate-700">Stuck Pipe (17%)</span></div>
                     <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span><span className="text-sm text-slate-700">Kick (8%)</span></div>
                     <div className="flex items-center gap-2"><span className="w-3 h-3 bg-slate-300 rounded-full"></span><span className="text-sm text-slate-700">Others (42%)</span></div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
               <h3 className="font-semibold text-slate-800 mb-4">Key Insights</h3>
               <ul className="space-y-3">
                 <li className="flex items-start gap-2">
                   <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                   <p className="text-sm text-slate-700">High permeability zone with historical mud loss tendency.</p>
                 </li>
                 <li className="flex items-start gap-2">
                   <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                   <p className="text-sm text-slate-700">4 nearby wells experienced severe mud losses in the top 100m of this formation.</p>
                 </li>
                 <li className="flex items-start gap-2">
                   <Layers className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                   <p className="text-sm text-slate-700">Similar lithology confirmed across 12 offset wells.</p>
                 </li>
                 <li className="flex items-start gap-2">
                   <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px]">✓</span></div>
                   <p className="text-sm font-semibold text-slate-800">Recommended action: Monitor mud weight closely and maintain flow rate.</p>
                 </li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
}
