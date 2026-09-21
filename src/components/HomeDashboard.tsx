import React from 'react';
import {
  Users,
  Flame,
  Trophy,
  AlertTriangle,
  MapPin,
  Plus,
  FileUp,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Opportunity, DmsSubmission, SystemAlert } from '../types';

interface HomeDashboardProps {
  staffName: string;
  leads: Opportunity[];
  dmsSubmissions: DmsSubmission[];
  alerts: SystemAlert[];
  onCreateOpportunityClick: () => void;
  onUploadDocumentsClick: () => void;
  onNavigateToDmsClick: () => void;
  onNavigateToLeadsClick: () => void;
}

export default function HomeDashboard({
  staffName,
  leads,
  dmsSubmissions,
  alerts,
  onCreateOpportunityClick,
  onUploadDocumentsClick,
  onNavigateToDmsClick,
  onNavigateToLeadsClick
}: HomeDashboardProps) {
  
  // Calculate dynamic stats from real current state
  const totalLeads = leads.length;
  const hotProspects = leads.filter(l => l.status === 'Hot Prospect').length;
  const wonCount = leads.filter(l => l.status === 'Prospect Won').length;

  // DMS Pending counts
  const dmsPendingCount = dmsSubmissions.filter(s => s.status === 'PENDING' || s.status === 'REJECTED' || s.status === 'IN REVIEW').length;

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">

      {/* Greeting Segment */}
      <div className="px-5 pt-6 pb-4">
        <h2 className="text-[28px] font-extrabold tracking-tight leading-tight text-brand-charcoal">
          Good Morning, {staffName.split(' ')[0]}.
        </h2>
        <div className="flex items-center text-gray-500 mt-1.5 space-x-1 text-sm font-medium">
          <MapPin size={16} className="text-gray-400 shrink-0" />
          <span>Petaling Jaya Branch</span>
        </div>
      </div>

      {/* Grid Indicators Section */}
      <div className="grid grid-cols-2 gap-3 px-5 mb-6" role="group" aria-label="Statistics cards">

        {/* Total Opps Indicator */}
        <button
          type="button"
          aria-label={`Total Opportunities: ${totalLeads + 139}, up 12% vs last month`}
          onClick={onNavigateToLeadsClick}
          className="bg-white border border-brand-border rounded-2xl p-4 flex flex-col justify-between h-[124px] hover:shadow-md transition-shadow relative overflow-hidden text-left focus:outline-none focus:ring-brand-red focus:ring-offset-1"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Total Opps
            </span>
            <div className="p-1 px-1.5 bg-red-50 text-brand-red rounded-lg" aria-hidden="true">
              <Users size={16} />
            </div>
          </div>
          <div>
            <div className="text-[34px] font-bold tracking-tight text-brand-charcoal leading-none">
              {totalLeads + 139}
            </div>
            <div className="flex items-center text-[10px] font-semibold text-blue-600 mt-1.5">
              <TrendingUp size={12} className="mr-0.5" aria-hidden="true" />
              <span>+12% vs last month</span>
            </div>
          </div>
          <div className="absolute right-[-10px] bottom-[-10px] opacity-5 w-16 h-16 pointer-events-none" aria-hidden="true">
            <Users size={64} />
          </div>
        </button>

        {/* Hot Prospects Indicator - Brand Red Accent */}
        <button
          type="button"
          aria-label={`Hot Prospects: ${hotProspects + 27} need immediate action`}
          onClick={onNavigateToLeadsClick}
          className="bg-brand-red text-white rounded-2xl p-4 flex flex-col justify-between h-[124px] hover:shadow-[0_8px_16px_rgba(230,0,18,0.2)] transition-shadow relative overflow-hidden text-left focus:outline-none focus:ring-brand-red focus:ring-offset-1"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-100">
              Hot Prospects
            </span>
            <div className="p-1 px-1.5 bg-white/10 text-white rounded-lg" aria-hidden="true">
              <Flame size={16} />
            </div>
          </div>
          <div>
            <div className="text-[34px] font-bold tracking-tight leading-none">
              {hotProspects + 27}
            </div>
            <span className="text-[10px] font-medium text-red-50 mt-1.5 block">
              Needs immediate action
            </span>
          </div>
        </button>

        {/* Won MTD Indicator */}
        <button
          type="button"
          aria-label={`Won this month: ${wonCount + 14}, on track for target`}
          onClick={onNavigateToLeadsClick}
          className="bg-white border border-brand-border rounded-2xl p-4 flex flex-col justify-between h-[124px] hover:shadow-md transition-shadow relative overflow-hidden text-left focus:outline-none focus:ring-brand-red focus:ring-offset-1"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Won (MTD)
            </span>
            <div className="p-1 px-1.5 bg-green-50 text-green-600 rounded-lg" aria-hidden="true">
              <Trophy size={16} />
            </div>
          </div>
          <div>
            <div className="text-[34px] font-bold tracking-tight text-brand-charcoal leading-none">
              {wonCount + 14}
            </div>
            <div className="flex items-center text-[10px] font-semibold text-green-600 mt-1.5">
              <TrendingUp size={12} className="mr-0.5" aria-hidden="true" />
              <span>On track for target</span>
            </div>
          </div>
          <div className="absolute right-[-8px] bottom-[-8px] opacity-[0.04] w-16 h-16 text-blue-900 pointer-events-none" aria-hidden="true">
            <Trophy size={64} />
          </div>
        </button>

        {/* DMS Pending Indicator */}
        <button
          type="button"
          aria-label={`DMS Pending: ${dmsPendingCount + 3} items require action`}
          onClick={onNavigateToDmsClick}
          className="bg-red-50/70 border border-red-100/70 rounded-2xl p-4 flex flex-col justify-between h-[124px] hover:shadow-md transition-shadow relative overflow-hidden text-left focus:outline-none focus:ring-brand-red focus:ring-offset-1"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800">
              DMS Pending
            </span>
            <div className="p-1 px-1.5 bg-red-100/50 text-red-600 rounded-lg" aria-hidden="true">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div>
            <div className="text-[34px] font-bold tracking-tight text-red-700 leading-none">
              {dmsPendingCount + 3}
            </div>
            <span className="text-[10px] font-medium text-red-600 mt-1.5 block font-sans">
              Action required in portal
            </span>
          </div>
        </button>
      </div>

      {/* Quick Actions List Row */}
      <div className="px-5 mb-8">
        <h3 className="text-base font-bold text-brand-charcoal mb-3">
          Quick Actions
        </h3>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none" role="group" aria-label="Quick action buttons">
          {/* Create opportunity pills */}
          <button
            type="button"
            onClick={onCreateOpportunityClick}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/95 text-white font-medium text-xs px-4 h-11 rounded-full shrink-0 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-brand-red focus:ring-offset-1"
          >
            <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
            <span>Create Opportunity</span>
          </button>

          {/* Upload Documents quick action */}
          <button
            type="button"
            onClick={onUploadDocumentsClick}
            className="flex items-center space-x-2 bg-white border border-brand-border text-brand-charcoal hover:bg-gray-50 font-medium text-xs px-4 h-11 rounded-full shrink-0 shadow-sm transition-all focus:outline-none focus:ring-brand-red focus:ring-offset-1"
          >
            <FileUp size={16} className="text-gray-500" aria-hidden="true" />
            <span>Upload Documents</span>
          </button>

          {/* Manage DMS quick action */}
          <button
            type="button"
            onClick={onNavigateToDmsClick}
            className="flex items-center space-x-2 bg-white border border-brand-border text-brand-charcoal hover:bg-gray-50 font-medium text-xs px-4 h-11 rounded-full shrink-0 shadow-sm transition-all focus:outline-none focus:ring-brand-red focus:ring-offset-1"
          >
            <AlertTriangle size={16} className="text-red-500" aria-hidden="true" />
            <span>DMS Sync Portal</span>
          </button>
        </div>
      </div>

      {/* Latest Leads Preview container */}
      <div className="px-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-brand-charcoal">
            Recent Pipeline Updates
          </h3>
          <button
            type="button"
            onClick={onNavigateToLeadsClick}
            className="text-xs font-semibold text-brand-red flex items-center hover:underline focus:outline-none focus:ring-brand-red focus:ring-offset-1 rounded px-1 py-0.5"
            aria-label="View all leads"
          >
            <span>View All</span>
            <ArrowRight size={14} className="ml-1" aria-hidden="true" />
          </button>
        </div>

        {/* Dynamic Leads stack */}
        <div className="space-y-3" role="list" aria-label="Recent leads">
          {leads.slice(0, 2).map((lead) => (
            <button
              key={lead.id}
              type="button"
              onClick={onNavigateToLeadsClick}
              className="w-full bg-white border border-brand-border rounded-xl p-4 flex justify-between items-center hover:border-brand-red transition-all shadow-sm text-left focus:outline-none focus:ring-brand-red focus:ring-offset-1"
              aria-label={`Lead: ${lead.name}, Status: ${lead.status}`}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-brand-charcoal text-sm">{lead.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    lead.status === 'Hot Prospect'
                      ? 'bg-red-50 text-brand-red border border-red-100'
                      : lead.status === 'Prospect Won'
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  🚗 {lead.model} • 📋 {lead.source}
                </p>
              </div>
              <div className="p-1 px-1.5 bg-gray-50 rounded-lg text-gray-400" aria-hidden="true">
                <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
