import React from 'react';
import { Award, Download, ArrowLeft, Trophy, Calendar, Hash, FileText, CheckCircle2 } from 'lucide-react';

interface CourseCompletedProps {
  onBackToHub: () => void;
}

export default function CourseCompleted({ onBackToHub }: CourseCompletedProps) {
  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal flex flex-col justify-center items-center py-8 px-5 animate-fade-in my-auto min-h-[85vh]">
      
      {/* Trophy container badge */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-red-50 text-brand-red rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(230,0,18,0.12)] border border-red-100/50">
          <Trophy size={48} className="translate-y-[-1px] animate-bounce text-amber-500" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-sm">
          <CheckCircle2 size={16} />
        </div>
      </div>

      <div className="text-center space-y-2 max-w-sm">
        <span className="text-[10px] font-extrabold tracking-widest text-brand-red uppercase">
          Certification Awarded
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-charcoal leading-none">
          Congratulations!
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          You have successfully completed the curriculum <strong className="text-brand-charcoal">"Master the Mitsubishi Triton"</strong>. You can now download your digital certificate of completion below.
        </p>
      </div>

      {/* Course detailed transcript specifications card */}
      <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm w-full max-w-xs my-8 space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 border-b border-gray-50 pb-2 flex items-center">
          <Award size={14} className="mr-1.5 text-amber-500" />
          <span>Certificate Details</span>
        </h3>

        <div className="space-y-3.5 text-xs font-semibold">
          {/* Item 1 */}
          <div className="flex justify-between">
            <span className="text-gray-400">Course</span>
            <span className="text-brand-charcoal font-bold truncate max-w-[150px]">Mitsubishi Triton Specs</span>
          </div>

          {/* Item 2 */}
          <div className="flex justify-between">
            <span className="text-gray-400 flex items-center">
              <Calendar size={12} className="mr-1 text-gray-300" />
              <span>Completed</span>
            </span>
            <span className="text-brand-charcoal font-bold">May 22, 2026</span>
          </div>

          {/* Item 3 */}
          <div className="flex justify-between">
            <span className="text-gray-400">Grade / Score</span>
            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">98% (Distinction)</span>
          </div>

          {/* Item 4 */}
          <div className="flex justify-between">
            <span className="text-gray-400 flex items-center">
              <Hash size={12} className="mr-1 text-gray-300" />
              <span>Certificate ID</span>
            </span>
            <span className="text-brand-charcoal font-mono tracking-wide">#MC-99427-X1</span>
          </div>
        </div>
      </div>

      {/* Button action options */}
      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={() => {
            alert("Digital Certificate download triggered. PDF draft has been processed inside background threads.");
          }}
          className="w-full h-11 bg-brand-red text-white hover:bg-brand-red/95 font-extrabold text-sm rounded-lg flex items-center justify-center space-x-2 shadow cursor-pointer transition-all"
        >
          <Download size={16} />
          <span>Download Certificate File</span>
        </button>

        <button
          onClick={onBackToHub}
          className="w-full h-11 border border-brand-border text-gray-600 hover:bg-gray-50 font-bold text-xs rounded-lg flex items-center justify-center space-x-1 transition-colors cursor-pointer bg-white"
        >
          <ArrowLeft size={14} />
          <span>Back to Training Hub</span>
        </button>
      </div>

    </div>
  );
}
