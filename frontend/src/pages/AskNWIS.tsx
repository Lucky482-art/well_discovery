import { Send, FileText, User } from 'lucide-react';
import { useState } from 'react';

export default function AskNWIS() {
  const [query, setQuery] = useState('');
  
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 shrink-0">
         <h2 className="text-2xl font-bold text-industrial-900">Ask NWIS</h2>
         <p className="text-sm text-slate-500 mt-1">Get insights from nearby wells, historical reports and drilling knowledge.</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
         
         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* User Message */}
            <div className="flex gap-4 justify-end">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tr-none px-5 py-3 max-w-2xl">
                <p className="text-slate-800 text-sm">What problems occurred in nearby wells at 2,700 - 2,800 m?</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 flex items-center justify-center">
                 <User className="w-5 h-5 text-slate-500" />
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-accent-blue flex items-center justify-center font-bold text-accent-blue bg-white shrink-0">
                 N
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-5 py-4 max-w-3xl">
                <p className="text-slate-800 text-sm font-semibold mb-2">Based on analysis of 12 nearby wells, 3 wells experienced mud loss events between 2,700 - 2,800 m in Formation X.</p>
                <ol className="list-decimal pl-4 space-y-1 text-sm text-slate-700 mb-4">
                  <li>15/9-F-11 B: Mud loss at 2,760 m (High severity)</li>
                  <li>15/9-F-4: Mud loss at 2,772 m (Medium severity)</li>
                  <li>15/9-F-15 C: Partial loss at 2,890 m (Medium severity)</li>
                </ol>
                <p className="text-slate-700 text-sm mb-4">Similar geological conditions and high permeability found in this interval.</p>
                
                {/* Sources */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Sources</p>
                  <div className="flex flex-wrap gap-2">
                     <SourceBadge icon={<FileText className="w-3 h-3"/>} text="15/9-F-11 B Drilling Report - Page 12" />
                     <SourceBadge icon={<FileText className="w-3 h-3"/>} text="15/9-F-4 Well Completion... - Page 8" />
                     <SourceBadge icon={<FileText className="w-3 h-3"/>} text="Formation X Technical R... - Page 5" />
                  </div>
                </div>
              </div>
            </div>

         </div>

         {/* Suggested Queries */}
         <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
            <SuggestedBadge text="Summarize mud loss events in Formation X" />
            <SuggestedBadge text="Compare 15/9-F-11 B and 15/9-F-4" />
            <SuggestedBadge text="What is the recommended mud weight?" />
         </div>

         {/* Input Box */}
         <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative flex items-center">
               <input 
                 type="text" 
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="Ask a question about nearby wells, formations, or drilling events..."
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
               />
               <button className="absolute right-2 p-2 bg-accent-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Send className="w-4 h-4" />
               </button>
            </div>
         </div>

      </div>
    </div>
  );
}

function SourceBadge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
      {icon} {text}
    </div>
  )
}

function SuggestedBadge({ text }: any) {
  return (
    <div className="whitespace-nowrap px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-full text-xs cursor-pointer hover:bg-slate-100 transition-colors">
      ✨ {text}
    </div>
  )
}
