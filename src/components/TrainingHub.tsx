import React from 'react';
import { Trophy, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import { Course } from '../types';

interface TrainingHubProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onNavigateToMyLearning: () => void;
}

export default function TrainingHub({ courses, onSelectCourse, onNavigateToMyLearning }: TrainingHubProps) {

  const tritonCourse = courses.find((c) => c.id === 'course-triton') || courses[0];

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">

      {/* Main Campaign/Enroll Hero Banner */}
      <div className="px-5 pt-6">
        <button
          type="button"
          onClick={() => onSelectCourse(tritonCourse)}
          aria-label="Enroll in Master the Mitsubishi Triton course"
          className="w-full text-left bg-brand-charcoal text-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all relative focus:outline-none focus:ring-brand-red focus:ring-offset-2"
        >
          {/* Main Triton background image */}
          <div className="h-56 relative">
            <img
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
              alt="Mitsubishi Triton"
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            {/* Linear background shading to make fonts highly legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
          </div>
          {/* Header texts */}
          <div className="absolute bottom-5 left-5 right-5 space-y-2.5">
            <span className="text-[10px] font-extrabold bg-brand-red text-white py-0.5 px-2.5 rounded uppercase tracking-wider">
              Autosales Academy
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight leading-none text-white shadow-sm">
              Master the Mitsubishi Triton
            </h2>
            <p className="text-[11px] text-gray-200 leading-relaxed max-w-sm line-clamp-2">
              Elevate your sales performance with our comprehensive guide to the all-new Triton. Learn key selling points and competitive advantages.
            </p>
            <span className="inline-flex items-center mt-1 h-9 px-4 bg-brand-red font-extrabold text-xs text-white rounded space-x-1.5 hover:bg-brand-red/90 transition-colors uppercase tracking-wider">
              <span>Enroll Now</span>
              <span>→</span>
            </span>
          </div>
        </button>
      </div>

      {/* Continue Learning Row Carousel */}
      <div className="mt-8 px-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-extrabold text-brand-charcoal">
            Continue Learning
          </h3>
          <button
            type="button"
            onClick={onNavigateToMyLearning}
            className="text-xs font-semibold text-brand-red hover:underline focus:outline-none focus:ring-brand-red rounded px-1 py-0.5"
            aria-label="View all courses"
          >
            View All
          </button>
        </div>

        {/* Horizontal scroll grid */}
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-none">
          
          {/* Card 1: Outlander */}
          <div 
            onClick={() => onSelectCourse(tritonCourse)}
            className="w-64 shrink-0 bg-white border border-brand-border rounded-xl p-4 cursor-pointer hover:border-brand-red transition-all flex flex-col justify-between h-[178px] shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-extrabold tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded uppercase">
                  In Progress
                </span>
                <span className="text-[10px] font-bold text-gray-400">Standard Class</span>
              </div>
              <h4 className="font-extrabold text-brand-charcoal text-[15px] tracking-tight leading-tight">
                Outlander PHEV Tech Specs
              </h4>
              <p className="text-xs text-gray-500 leading-normal line-clamp-2">
                Deep dive into the dual-motor hybrid powertrain and cell chemistry.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-50">
              <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                <span>65% Completed</span>
                <span>2/3 Lessons</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-brand-red h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 2: Objections */}
          <div 
            onClick={() => alert("Simulated Course: Objections & Handling")}
            className="w-64 shrink-0 bg-white border border-brand-border rounded-xl p-4 cursor-pointer hover:border-brand-red transition-all flex flex-col justify-between h-[178px] shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-extrabold tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded uppercase">
                  In Progress
                </span>
                <span className="text-[10px] font-bold text-gray-400">Sales Mastery</span>
              </div>
              <h4 className="font-extrabold text-brand-charcoal text-[15px] tracking-tight leading-tight">
                Objection Handling Techniques
              </h4>
              <p className="text-xs text-gray-500 leading-normal line-clamp-2">
                Learn advanced closing and competitive financing value matrices.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-50">
              <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                <span>30% Completed</span>
                <span>1/4 Lessons</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-brand-red h-1.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory of Training Categories */}
      <div className="mt-6 px-5 space-y-4">
        <h3 className="text-base font-extrabold text-brand-charcoal">
          Training Categories
        </h3>

        <div className="space-y-3">
          {/* Category A: Product Knowledge */}
          <div className="bg-white border border-brand-border rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-brand-red cursor-pointer">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-red-50 text-brand-red rounded-lg flex items-center justify-center shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-brand-charcoal">Product Knowledge</h4>
                <p className="text-xs text-gray-500 font-medium">Master the entire Mitsubishi vehicle lineup.</p>
                <div className="flex items-center space-x-2.5 mt-2">
                  <div className="w-24 bg-gray-100 rounded-full h-1">
                    <div className="bg-brand-red h-1 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">24 Lessons</span>
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          {/* Category B: Sales Mastery */}
          <div className="bg-white border border-brand-border rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-brand-red cursor-pointer">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-brand-charcoal">Sales Mastery</h4>
                <p className="text-xs text-gray-500 font-medium">Advanced negotiation and closing techniques.</p>
                <div className="flex items-center space-x-2.5 mt-2">
                  <div className="w-24 bg-gray-100 rounded-full h-1">
                    <div className="bg-brand-red h-1 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">18 Lessons</span>
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          {/* Category C: Financial Services */}
          <div className="bg-white border border-brand-border rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-brand-red cursor-pointer">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-green-50 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-brand-charcoal">Financial Services</h4>
                <p className="text-xs text-gray-500 font-medium">Understanding financing, lease schemes, and insurance.</p>
                <div className="flex items-center space-x-2.5 mt-2">
                  <div className="w-24 bg-gray-100 rounded-full h-1">
                    <div className="bg-brand-red h-1 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">12 Lessons</span>
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

    </div>
  );
}
