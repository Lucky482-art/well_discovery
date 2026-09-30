import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Html, Sphere } from '@react-three/drei';
import { useState } from 'react';

// Temporary mock data for the prototype map
const wellsData = [
  { id: '15/9-F-1', name: 'Active Well', pos: [0, 0, 0], color: '#2563EB', active: true, events: [] },
  { id: '15/9-F-11 B', name: 'Offset Well 021', pos: [2, 0, 1.5], color: '#16A34A', active: false, events: [{depth: 50, type: 'Mud Loss', risk: 'High'}] },
  { id: '15/9-F-4', name: 'Offset Well 034', pos: [-1.5, 0, 2], color: '#EAB308', active: false, events: [] },
  { id: '15/9-F-12', name: 'Offset Well 078', pos: [3, 0, -2], color: '#DC2626', active: false, events: [{depth: 120, type: 'Stuck Pipe', risk: 'High'}] }
];

export default function WellMap3D() {
  const [selectedWell, setSelectedWell] = useState<string | null>('15/9-F-1');

  return (
    <div className="w-full h-full bg-industrial-900 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <gridHelper args={[20, 20, '#475569', '#1E293B']} position={[0, -0.1, 0]} />
        
        {/* Draw Wells */}
        {wellsData.map(well => {
           // Simulate trajectory pointing down (negative Y)
           const trajectoryPoints = [
             well.pos,
             [well.pos[0] + (Math.random()*0.5), -2, well.pos[2] + (Math.random()*0.5)],
             [well.pos[0] + (Math.random()*1), -4, well.pos[2] + (Math.random()*1)],
             [well.pos[0] + (Math.random()*1.5), -6, well.pos[2] + (Math.random()*1.5)]
           ];

           const isSelected = selectedWell === well.id;

           return (
             <group key={well.id} onClick={() => setSelectedWell(well.id)}>
               {/* Surface Location */}
               <Sphere args={[0.15, 16, 16]} position={well.pos as any}>
                 <meshStandardMaterial color={isSelected ? '#ffffff' : well.color} emissive={isSelected ? well.color : '#000000'} emissiveIntensity={0.5} />
               </Sphere>
               
               {/* Trajectory */}
               <Line
                  points={trajectoryPoints as any}
                  color={isSelected ? '#ffffff' : well.color}
                  lineWidth={isSelected ? 3 : 1}
               />
               
               {/* Label */}
               <Html position={[well.pos[0], well.pos[1] + 0.5, well.pos[2]]} center>
                 <div className={`px-2 py-1 rounded text-xs font-bold shadow-lg cursor-pointer ${isSelected ? 'bg-white text-black' : 'bg-industrial-800 text-white border border-slate-600'}`}>
                   {well.id}
                 </div>
               </Html>

               {/* Events along trajectory */}
               {well.events.map((evt, idx) => (
                  <Html key={idx} position={[trajectoryPoints[1][0], trajectoryPoints[1][1], trajectoryPoints[1][2]]} center>
                     <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" title={`${evt.type} at ${evt.depth}m`} />
                  </Html>
               ))}
             </group>
           )
        })}

        <OrbitControls makeDefault />
      </Canvas>
      
      {/* Map UI Overlay */}
      <div className="absolute bottom-4 left-4 flex gap-2">
         <div className="flex items-center gap-2 bg-industrial-800/80 p-2 rounded text-xs text-white backdrop-blur-sm border border-slate-700">
           <div className="w-3 h-3 rounded-full bg-accent-blue"></div> Active Well
         </div>
         <div className="flex items-center gap-2 bg-industrial-800/80 p-2 rounded text-xs text-white backdrop-blur-sm border border-slate-700">
           <div className="w-3 h-3 rounded-full bg-accent-green"></div> Low Risk
         </div>
         <div className="flex items-center gap-2 bg-industrial-800/80 p-2 rounded text-xs text-white backdrop-blur-sm border border-slate-700">
           <div className="w-3 h-3 rounded-full bg-accent-red"></div> High Risk Event
         </div>
      </div>
    </div>
  );
}
