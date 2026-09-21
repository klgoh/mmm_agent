import React, { useState } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  Zap,
  Activity,
  Sparkles,
  Info,
  Compass,
  ChevronRight,
  Tv,
  Eye,
  Target
} from 'lucide-react';
import { Lesson } from '../types';

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
  onCompleteLesson: () => void;
}

export default function LessonDetail({
  lesson,
  onBack,
  onCompleteLesson
}: LessonDetailProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      name: 'MIVEC Dual-Camshafts',
      top: '47%',
      left: '42%',
      specs: 'MIVEC controls valve lift and duration on the intake side, switching between low and high-speed cam profiles instantly at 3,600 RPM to maximize performance.'
    },
    {
      id: 2,
      name: 'Electro-Magnetic Oil Control Valve (OCV)',
      top: '68%',
      left: '65%',
      specs: 'Directs hydraulic engine oil pressure directly to the camshaft phasers to advance or retard valve timing in milliseconds.'
    },
    {
      id: 3,
      name: 'High-Velocity Compression Fuel Injectors',
      top: '76%',
      left: '30%',
      specs: 'Common-rail ultra-high pressure fuel injectors deliver precise spray patterns, optimizing thermodynamics for optimal torque bands under heavy payload loads.'
    }
  ];

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">
      
      {/* Lesson Progress header */}
      <div className="bg-white border-b border-brand-border px-4 py-2 sticky top-0 z-30 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg focus:outline-none flex items-center cursor-pointer"
            aria-label="Back to curriculum"
          >
            <ArrowLeft size={18} className="mr-1" aria-hidden="true" />
            <span className="text-xs font-semibold">Curriculum</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand-red">Lesson Progress</span>
          </div>

          <div className="w-6" aria-hidden="true" />
        </div>

        {/* Progress bar line */}
        <div className="space-y-1 pb-1">
          <div className="flex justify-between text-[11px] font-bold text-gray-500">
            <span>Lesson 2: Performance</span>
            <span>45%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1">
            <div className="bg-brand-red h-1 rounded-full transition-all" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-5">
        
        {/* Main Lesson illustration representation */}
        <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden p-4 space-y-4">
          <div className="h-44 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100 shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=480"
              alt="MIVEC Engine Technical View"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-extrabold text-brand-charcoal tracking-tight">
              The Heart of Performance
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              Mitsubishi Innovative Valve timing Electronic Control system (MIVEC) optimizes power output, emissions, and fuel efficiency. It continuously varies the timing of the intake and exhaust valves to suit engine speed and load.
            </p>
          </div>

          {/* Core checkpoints Checklist itemizer */}
          <div className="space-y-3 pt-3 border-t border-gray-50 text-xs">
            {/* Bullet 1 */}
            <div className="flex items-start space-x-3 bg-red-50/10 p-2.5 rounded-lg border border-red-100/20">
              <CheckCircle2 size={16} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-brand-charcoal block">Variable Valve Timing</span>
                <span className="text-gray-500 leading-relaxed font-sans text-[11px] mt-0.5 block">
                  Adjusts timing across all RPM ranges, guaranteeing peak torque under tow-loads.
                </span>
              </div>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-start space-x-3 bg-red-50/10 p-2.5 rounded-lg border border-red-100/20">
              <CheckCircle2 size={16} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-brand-charcoal block">Enhanced Power Band</span>
                <span className="text-gray-500 leading-relaxed font-sans text-[11px] mt-0.5 block">
                  Delivers robust torque at low speeds and high horsepower at high speeds.
                </span>
              </div>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-start space-x-3 bg-red-50/10 p-2.5 rounded-lg border border-red-100/20">
              <CheckCircle2 size={16} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-brand-charcoal block">Efficiency Optimization</span>
                <span className="text-gray-500 leading-relaxed font-sans text-[11px] mt-0.5 block">
                  Reduces pumping losses, improving fuel economy and lowering overall emissions.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE COMPONENT EXPLORER */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-red flex items-center">
              <Compass size={14} className="mr-1.5 animate-spin" />
              <span>Interactive Component Explorer</span>
            </h3>
            <p className="text-[11px] text-gray-400 font-medium">
              Click the pulsing hotspots to reveal detailed specifications of the MIVEC system components.
            </p>
          </div>

          {/* Engine image stage blueprint with hotspots */}
          <div className="relative rounded-lg overflow-hidden h-64 bg-slate-900 border border-brand-border">
            <img 
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=480"
              alt="Isometric Engine Blueprint"
              className="w-full h-full object-cover opacity-65"
              referrerPolicy="no-referrer"
            />
            
            {/* Hotspots absolute placement */}
            {hotspots.map((spot) => {
              const numActive = activeHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveHotspot(numActive ? null : spot.id)}
                  style={{ top: spot.top, left: spot.left }}
                  className="absolute w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center cursor-pointer pulsate outline-none select-none"
                >
                  <Target size={12} className={numActive ? "animate-spin" : "animate-pulse"} />
                </button>
              );
            })}
          </div>

          {/* Dynamically active specifications panel popup */}
          {activeHotspot !== null ? (
            <div className="bg-red-50/50 border border-brand-red/30 rounded-xl p-4 space-y-1.5 animate-fade-in">
              <h4 className="font-extrabold text-brand-charcoal text-[13px] uppercase tracking-wide flex items-center">
                <Sparkles size={14} className="text-brand-red mr-1.5" />
                <span>{hotspots.find(h => h.id === activeHotspot)?.name}</span>
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {hotspots.find(h => h.id === activeHotspot)?.specs}
              </p>
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-400 font-medium tracking-wide">
              * Tap a pulsing hotspot on the engine layout above to reveal metrics
            </div>
          )}
        </div>

      </div>

      {/* BOTTOM FOOTER NAVIGATION BUTTONS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border p-3.5 z-40 flex space-x-3.5">
        <button
          onClick={onBack}
          className="flex-1 h-11 border border-brand-border text-gray-600 hover:bg-gray-50 font-bold text-xs rounded-lg transition-colors cursor-pointer"
        >
          Previous Section
        </button>
        <button
          onClick={onCompleteLesson}
          className="flex-1 h-11 bg-brand-red text-white hover:bg-brand-red/95 font-extrabold text-xs rounded-lg flex items-center justify-center space-x-1 shadow transition-colors cursor-pointer"
        >
          <span>Next Section</span>
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
