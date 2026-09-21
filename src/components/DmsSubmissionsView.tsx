import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  AlertTriangle,
  RefreshCcw,
  ChevronRight,
  Menu,
  Car,
  FileX2,
  Sparkles
} from 'lucide-react';
import { DmsSubmission } from '../types';

interface DmsSubmissionsViewProps {
  submissions: DmsSubmission[];
  onBack: () => void;
  onNavigateToUpload: () => void;
  onUpdateSubmissions: (updatedSubmissions: DmsSubmission[]) => void;
}

export default function DmsSubmissionsView({
  submissions,
  onBack,
  onNavigateToUpload,
  onUpdateSubmissions
}: DmsSubmissionsViewProps) {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'REJECTED'>('REJECTED');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pipeline logic
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesKeyword = 
      sub.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'ALL' || sub.status === activeTab;
    return matchesKeyword && matchesTab;
  });

  const handleResubmitMock = (subId: string) => {
    alert(`Initiating resubmission pipeline context for ${subId}. Launching unified Document Upload super-workflow.`);
    onNavigateToUpload();
  };

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">
      
      {/* DMS submission header */}
      <div className="bg-white border-b border-brand-border px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg focus:outline-none flex items-center cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={20} className="mr-1" aria-hidden="true" />
          </button>
          <span className="text-sm font-extrabold text-brand-charcoal uppercase tracking-wider">
            DMS Sync Portal
          </span>
        </div>
      </div>

      <div className="px-5 pt-6">
        <h1 className="text-[28px] font-extrabold tracking-tight text-brand-charcoal">
          DMS Submissions
        </h1>
        <p className="text-[11px] text-gray-400 font-medium mt-1">Reconcile vehicle records against central dealer servers</p>

        {/* Search Input bar */}
        <div className="relative mt-4 mb-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full h-11 pl-11 pr-3 border border-brand-border rounded-lg text-sm bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none shadow-sm transition-all text-brand-charcoal font-medium"
            placeholder="Search customer, reference ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-3 gap-1.5 border border-brand-border rounded-lg p-1.5 bg-white mb-5 shadow-sm">
          {(['ALL', 'PENDING', 'REJECTED'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-[10px] uppercase font-bold text-center tracking-wider rounded-md transition-colors cursor-pointer outline-none ${
                  isSelected
                    ? 'bg-brand-red text-white'
                    : 'text-gray-500 hover:text-brand-charcoal hover:bg-gray-50'
                }`}
              >
                {tab === 'ALL' ? 'All Syncs' : tab}
              </button>
            );
          })}
        </div>

        {/* Submissions items stream stack */}
        <div className="space-y-4">
          {filteredSubmissions.length > 0 ? (
            filteredSubmissions.map((sub) => {
              const isRejected = sub.status === 'REJECTED';
              const isPending = sub.status === 'PENDING' || sub.status === 'IN REVIEW';
              
              let borderHighlightClass = 'border-l-[5px] border-l-blue-400';
              let badgeStyle = 'bg-blue-50 text-blue-700 border-blue-100';

              if (isRejected) {
                borderHighlightClass = 'border-l-[5px] border-l-brand-red';
                badgeStyle = 'bg-red-50 text-brand-red border border-red-100';
              } else if (sub.status === 'COMPLETED') {
                borderHighlightClass = 'border-l-[5px] border-l-green-500';
                badgeStyle = 'bg-green-50 text-green-700 border-green-100';
              }

              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-xl border border-brand-border shadow-sm p-4 overflow-hidden space-y-4 ${borderHighlightClass}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-[15px] text-brand-charcoal">{sub.leadName}</h3>
                      <span className="text-[10px] text-gray-400 font-mono tracking-wider font-semibold">Ref: {sub.id}</span>
                    </div>
                    <span className={`text-[9px] font-bold px-2 px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                      {sub.status}
                    </span>
                  </div>

                  {/* Vehicle summary specifications row */}
                  <div className="flex items-center text-xs text-gray-500 space-x-3 pt-1">
                    <div className="flex items-center space-x-1">
                      <Car size={13} className="text-gray-400" />
                      <span className="font-medium text-gray-600">{sub.model}</span>
                    </div>
                  </div>

                  {/* ERROR BANNER DISPLAY IF REJECTED OR ACTION NEEDED */}
                  {isRejected && sub.errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700 space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                        <AlertTriangle size={12} className="shrink-0" />
                        <span>Rejection Rationale</span>
                      </div>
                      <p className="leading-relaxed font-semibold">{sub.errorMessage}</p>
                    </div>
                  )}

                  {/* Resubmit CTA action button */}
                  {isRejected && (
                    <button
                      type="button"
                      onClick={() => handleResubmitMock(sub.id)}
                      className="w-full h-10 border border-brand-red text-brand-red hover:bg-red-50 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer bg-white shadow-sm"
                    >
                      <RefreshCcw size={12} />
                      <span>Resubmit Compliance Documents</span>
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white border border-brand-border rounded-xl space-y-3">
              <FileX2 size={36} className="text-gray-300 mx-auto" />
              <p className="text-sm text-gray-400 font-medium">Currently no submissions matched in this category.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
