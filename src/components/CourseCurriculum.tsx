import React from 'react';
import {
  ArrowLeft,
  Search,
  Settings,
  CheckCircle2,
  PlayCircle,
  Lock,
  Info,
  ChevronRight,
  ShieldAlert,
  Tv,
  Cpu,
  Zap,
  Workflow
} from 'lucide-react';
import { Course, Lesson } from '../types';

interface CourseCurriculumProps {
  course: Course;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onStartNextLesson: () => void;
}

export default function CourseCurriculum({
  course,
  onBack,
  onSelectLesson,
  onStartNextLesson
}: CourseCurriculumProps) {

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">
      
      {/* Course curriculum header */}
      <div className="bg-white border-b border-brand-border px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg focus:outline-none flex items-center cursor-pointer"
          aria-label="Back to training hub"
        >
          <ArrowLeft size={18} className="mr-1" aria-hidden="true" />
          <span className="text-xs font-semibold">Hub</span>
        </button>
        <span className="text-[10px] font-extrabold tracking-widest text-brand-charcoal uppercase select-none">
          Course Overview
        </span>
        <div className="w-6" aria-hidden="true" />
      </div>

      {/* Hero Header image with badges */}
      <div className="relative h-56 bg-brand-charcoal text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
          alt="Triton Banner"
          className="w-full h-full object-cover opacity-70 select-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[9px] font-extrabold bg-blue-600 text-white py-0.5 px-2 rounded tracking-wide uppercase">
              Platinum Series
            </span>
            <span className="text-[9px] font-bold bg-white/20 text-white py-0.5 px-2 rounded tracking-wide uppercase">
              {course.lessonsCount} Lessons
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight leading-none text-white shadow-sm">
            {course.title}
          </h1>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">
        
        {/* Course Overview Section text description */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-red mb-2">
            Course Overview
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            {course.description}
          </p>
        </div>

        {/* Dynamic Curriculum Accordion lessons checklist */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-4">
            Curriculum
          </h3>

          <div className="space-y-3">
            {course.lessons.map((lesson) => {
              const isCompleted = lesson.status === 'Completed';
              const isUpNext = lesson.status === 'Up Next';
              const isLocked = lesson.status === 'Locked';

              let borderClass = 'border-brand-border bg-white';
              let iconElement = <Lock size={16} className="text-gray-400" />;
              let badgeElement = null;

              if (isCompleted) {
                borderClass = 'border-brand-red bg-red-50/5';
                iconElement = <CheckCircle2 size={18} className="text-brand-red shrink-0" />;
                badgeElement = <span className="text-[9px] font-bold text-brand-red uppercase">Completed</span>;
              } else if (isUpNext) {
                borderClass = 'border-brand-red border-2 bg-white';
                iconElement = <PlayCircle size={18} className="text-brand-red shrink-0" />;
                badgeElement = <span className="text-[9px] font-extrabold bg-brand-red text-white px-2 py-0.5 rounded uppercase font-sans">Up Next</span>;
              }

              return (
                <div
                  key={lesson.id}
                  onClick={() => !isLocked && onSelectLesson(lesson)}
                  className={`border rounded-xl p-3.5 flex items-center justify-between transition-colors ${borderClass} ${
                    isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 pr-3">
                    <div className="shrink-0">{iconElement}</div>
                    <div className="text-xs">
                      <p className="font-extrabold text-brand-charcoal text-[13px] leading-tight">
                        {lesson.number}. {lesson.title}
                      </p>
                      {lesson.descriptionDetails && (
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-none">
                          {lesson.descriptionDetails}
                        </p>
                      )}
                    </div>
                  </div>
                  {badgeElement && <div className="shrink-0">{badgeElement}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Training Progress indicator */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm space-y-3.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold uppercase tracking-wider text-gray-500">Your Progress</span>
            <span className="font-bold text-brand-red">{course.progressPercent}% Completed</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-brand-red h-1.5 rounded-full" style={{ width: `${course.progressPercent}%` }}></div>
          </div>
          <p className="text-[10px] text-gray-400 font-semibold tracking-wide">
            Keep going! You're on track to master the Triton.
          </p>
        </div>

        {/* Highlights technical specs bento grid */}
        <div className="grid grid-cols-2 gap-3 pb-8">
          {/* Card: Engine */}
          <div className="bg-white border border-brand-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm relative">
            <Cpu size={18} className="text-brand-red mb-2" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Engine</p>
            <p className="text-xs font-bold text-brand-charcoal mt-1 text-center font-sans">
              {course.techSpecs.engine}
            </p>
          </div>

          {/* Card: Drivetrain */}
          <div className="bg-white border border-brand-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm relative">
            <Workflow size={18} className="text-brand-red mb-2" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Drivetrain</p>
            <p className="text-xs font-bold text-brand-charcoal mt-1 text-center font-sans">
              {course.techSpecs.drivetrain}
            </p>
          </div>

          {/* Card: Payload */}
          <div className="bg-white border border-brand-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm relative">
            <Zap size={18} className="text-brand-red mb-2" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-sans">Payload</p>
            <p className="text-xs font-bold text-brand-charcoal mt-1 text-center font-sans">
              {course.techSpecs.payload}
            </p>
          </div>

          {/* Card: Safety */}
          <div className="bg-white border border-brand-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm relative">
            <CheckCircle2 size={18} className="text-brand-red mb-2" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Safety</p>
            <p className="text-xs font-bold text-brand-charcoal mt-1 text-center font-sans">
              {course.techSpecs.safety}
            </p>
          </div>
        </div>

      </div>

      {/* STICKY BOTTOM ACTION CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border p-3.5 z-40">
        <button
          onClick={onStartNextLesson}
          className="w-full h-11 bg-brand-red text-white hover:bg-Primary/95 font-extrabold text-sm rounded-lg flex items-center justify-center space-x-1.5 shadow transition-colors cursor-pointer"
        >
          <span>Start Next Lesson</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
