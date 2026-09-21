import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Tag, Car, User, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { Opportunity, LeadStatus } from '../types';

interface LeadsViewProps {
  leads: Opportunity[];
  onSelectLead: (lead: Opportunity) => void;
}

type FilterTab = 'All' | LeadStatus;
type SortOption = 'Newest' | 'Oldest' | 'Stage' | 'Last Updated' | 'Customer Name';

// Stage order for sorting: Opportunity → Prospect → Hot Prospect → Prospect Won → Pending Approval
const STAGE_ORDER: LeadStatus[] = ['Opportunity', 'Prospect', 'Hot Prospect', 'Prospect Won', 'Pending Approval'];

// Get stage color classes
const getStageColorClasses = (status: LeadStatus) => {
  switch (status) {
    case 'Opportunity':
      return {
        border: 'border-l-[5px] border-l-gray-400',
        badge: 'bg-gray-100 text-gray-600 border-gray-200',
      };
    case 'Prospect':
      return {
        border: 'border-l-[5px] border-l-blue-500',
        badge: 'bg-blue-50 text-blue-700 border-blue-100',
      };
    case 'Hot Prospect':
      return {
        border: 'border-l-[5px] border-l-brand-red',
        badge: 'bg-red-50 text-brand-red border border-red-100',
      };
    case 'Prospect Won':
      return {
        border: 'border-l-[5px] border-l-green-500',
        badge: 'bg-green-50 text-green-700 border-green-100',
      };
    case 'Pending Approval':
      return {
        border: 'border-l-[5px] border-l-amber-400',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    default:
      return {
        border: 'border-l-[5px] border-l-gray-400',
        badge: 'bg-gray-100 text-gray-600 border-gray-200',
      };
  }
};

export default function LeadsView({ leads, onSelectLead }: LeadsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<FilterTab>('All');
  const [sortBy, setSortBy] = useState<SortOption>('Newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter pipeline logic
  const filteredAndSortedLeads = useMemo(() => {
    let result = leads.filter((lead) => {
      // 1. Search Query filter
      const matchesKeyword =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.assignedAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Tab Filter
      const matchesTab = selectedTab === 'All' || lead.status === selectedTab;

      return matchesKeyword && matchesTab;
    });

    // 3. Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'Newest':
          // Assuming createdDate is sortable - newer first
          return b.createdDate.localeCompare(a.createdDate);
        case 'Oldest':
          return a.createdDate.localeCompare(b.createdDate);
        case 'Stage':
          return STAGE_ORDER.indexOf(a.status) - STAGE_ORDER.indexOf(b.status);
        case 'Last Updated':
          return b.lastUpdated.localeCompare(a.lastUpdated);
        case 'Customer Name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [leads, searchQuery, selectedTab, sortBy]);

  const filterTabs: FilterTab[] = ['All', 'Opportunity', 'Prospect', 'Hot Prospect', 'Prospect Won', 'Pending Approval'];

  const getTabLabel = (tab: FilterTab): string => {
    if (tab === 'All') return 'All Leads';
    return tab;
  };

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">
      <div className="px-5 pt-6">
        <h1 className="text-[28px] font-extrabold tracking-tight text-brand-charcoal">
          Opportunities
        </h1>

        {/* Search input container */}
        <div className="relative mt-4 mb-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full h-11 pl-11 pr-3 border border-brand-border rounded-lg text-sm bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none shadow-sm transition-all"
            placeholder="Search customer, model, agent, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort dropdown and Filter tabs row */}
        <div className="flex items-center justify-between mb-3">
          {/* Scrollable Pills tabs */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-none flex-1" role="tablist" aria-label="Lead status filters">
            {filterTabs.map((tab) => {
              const isSelected = selectedTab === tab;
              const count = tab === 'All'
                ? leads.length
                : leads.filter((l) => l.status === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={tab === 'All' ? 'Show all leads' : `Show ${tab} leads (${count})`}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-2 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border focus:outline-none focus:ring-brand-red focus:ring-offset-1 flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-brand-red text-white border-brand-red shadow-sm'
                      : 'bg-white border-brand-border text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{getTabLabel(tab)}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort dropdown */}
          <div className="relative ml-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-1.5 py-2 px-3 bg-white border border-brand-border rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-brand-red focus:ring-offset-1"
              aria-label="Sort by"
              aria-expanded={showSortDropdown}
            >
              <ArrowUpDown size={12} />
              <span>{sortBy}</span>
              <ChevronDown size={12} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showSortDropdown && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-1 bg-white border border-brand-border rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                  {(['Newest', 'Oldest', 'Stage', 'Last Updated', 'Customer Name'] as SortOption[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSortBy(option);
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center justify-between py-2 px-4 text-xs font-semibold text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className={sortBy === option ? 'text-brand-red' : 'text-gray-700'}>
                        {option}
                      </span>
                      {sortBy === option && (
                        <Check size={12} className="text-brand-red" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-3">
          <p className="text-[10px] text-gray-400 font-medium">
            Showing {filteredAndSortedLeads.length} of {leads.length} opportunities
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Leads Stack */}
        <div className="space-y-3 mt-2" role="list" aria-label="Leads list">
          {filteredAndSortedLeads.length > 0 ? (
            filteredAndSortedLeads.map((lead) => {
              const colors = getStageColorClasses(lead.status);

              return (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => onSelectLead(lead)}
                  aria-label={`Open lead ${lead.name}, Status: ${lead.status}, Model: ${lead.model}`}
                  className={`w-full bg-white rounded-xl border border-brand-border shadow-sm flex justify-between items-center hover:shadow-md transition-shadow overflow-hidden p-4 text-left focus:outline-none focus:ring-brand-red focus:ring-offset-1 ${colors.border}`}
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    {/* Row 1: Name + Status */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-extrabold text-brand-charcoal text-[15px]">
                        {lead.name}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${colors.badge}`}>
                        {lead.status}
                      </span>
                    </div>

                    {/* Row 2: Model + Source */}
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <div className="flex items-center space-x-1">
                        <Car size={13} className="text-gray-400" aria-hidden="true" />
                        <span className="font-medium text-gray-600">{lead.model.replace('Mitsubishi ', '')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag size={12} className="text-gray-400" aria-hidden="true" />
                        <span className="font-medium text-gray-600">{lead.source}</span>
                      </div>
                    </div>

                    {/* Row 3: Agent + Last Updated */}
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <div className="flex items-center space-x-1">
                        <User size={11} className="text-gray-400" aria-hidden="true" />
                        <span className="text-gray-500">Assigned to: {lead.assignedAgent}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Updated {lead.lastUpdated}
                      </span>
                    </div>

                    {/* Tags row (if any) */}
                    {lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {lead.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                        {lead.tags.length > 3 && (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                            +{lead.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-full transition-colors shrink-0" aria-hidden="true">
                    <ChevronRight size={18} />
                  </div>
                </button>
              );
            })
          ) : (
            <div
              className="text-center py-12 bg-white border border-brand-border rounded-xl"
              role="status"
              aria-live="polite"
            >
              <div className="flex flex-col items-center">
                <Search size={32} className="text-gray-300 mb-3" />
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  No opportunities found
                </p>
                <p className="text-xs text-gray-400">
                  Try adjusting your filters or search query
                </p>
                {(selectedTab !== 'All' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTab('All');
                      setSearchQuery('');
                    }}
                    className="mt-4 text-xs font-semibold text-brand-red hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
