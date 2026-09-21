import React, { useState } from 'react';
import { ArrowLeft, Check, Calendar, Car, User, FileText } from 'lucide-react';
import { Opportunity, LeadStatus, ApprovalStatus, DmsSubmissionStatus, AuditTrailEntry } from '../types';

interface CreateOpportunityFormProps {
  onBack: () => void;
  onSuccess: (newLead: Opportunity) => void;
  currentAgent: string;
}

export default function CreateOpportunityForm({ onBack, onSuccess, currentAgent }: CreateOpportunityFormProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+60 ');
  const [email, setEmail] = useState('');
  
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedColor, setSelectedColor] = useState('Any Color');
  
  const [leadSource, setLeadSource] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [internalNotes, setInternalNotes] = useState('');

  const [validationError, setValidationError] = useState('');

  const availableModels = [
    { name: 'Mitsubishi Xpander', variants: ['1.5L Premium', 'Xpander Cross'] },
    { name: 'Mitsubishi Triton', variants: ['Athlete 2.4L VGT', 'Premium 2.4L MT', 'Single Cab'] },
    { name: 'Mitsubishi Xforce', variants: ['Ultimate 1.5L', 'Exceed 1.5L'] },
    { name: 'Mitsubishi Outlander PHEV', variants: ['2.4L AWD Active', '2.4L AWD Luxury'] }
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName.trim()) {
      setValidationError('Full Name is required.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim() === '+60') {
      setValidationError('Phone Number is required.');
      return;
    }
    if (!selectedModel) {
      setValidationError('Please select a Vehicle Model.');
      return;
    }
    if (!leadSource) {
      setValidationError('Please select a Lead Source.');
      return;
    }

    // Generate accurate data mock
    const randomId = `OPP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = 'Today';

    // New leads start as 'Opportunity' (initial stage per PRD)
    const initialStatus: LeadStatus = 'Opportunity';

    // Create audit trail for creation
    const auditTrail: AuditTrailEntry[] = [
      {
        id: `audit-${Date.now()}-1`,
        type: 'created',
        description: `Opportunity created from ${leadSource}`,
        actor: currentAgent,
        timestamp: 'Just now',
        details: { source: leadSource },
      },
    ];

    const newLead: Opportunity = {
      // Core identification
      id: randomId,
      name: fullName,
      phone: phoneNumber,
      email: email || 'not.provided@example.com',

      // Vehicle interest
      model: selectedModel,
      variant: selectedVariant || 'Standard Base',
      color: selectedColor,

      // Lead source & tracking
      source: leadSource,
      expectedClosingDate: expectedDate || '2026-06-30',
      createdDate: today,
      status: initialStatus,
      tags: selectedTags,
      notes: internalNotes
        ? [
            {
              id: 'note-new',
              text: internalNotes,
              author: currentAgent,
              timestamp: 'Just now',
            },
          ]
        : [],

      // NEW: Assignment fields (PRD Section 11.1)
      assignedAgent: currentAgent,
      assignedAgentId: 'agent-001',
      branch: 'Petaling Jaya',
      lastUpdated: 'Just now',

      // NEW: Approval status
      approvalStatus: 'Not Submitted' as ApprovalStatus,

      // NEW: DMS status
      dmsStatus: 'Not Submitted' as DmsSubmissionStatus,

      // NEW: Audit trail
      auditTrail,
    };

    onSuccess(newLead);
  };

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-brand-border px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg focus:outline-none flex items-center cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="mr-1" aria-hidden="true" />
        </button>
        <h2 className="text-base font-bold text-primary tracking-wide">
          Create Opportunity
        </h2>
        <div className="w-6" aria-hidden="true" />
      </div>

      {/* Navigation / Progress bubble stepper */}
      <div className="flex items-center justify-center space-x-3 py-4 bg-gray-50/50 border-b border-gray-100 mb-5">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xs">
            1
          </div>
          <span className="h-[2px] w-8 bg-brand-red ml-2"></span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <span className="h-[2px] w-8 bg-gray-200 ml-2"></span>
        </div>
        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs">
          3
        </div>
      </div>

      <div className="px-5 pt-2">
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">
            {validationError}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4">
          
          {/* Section: Customer Details */}
          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-3 flex items-center">
              <User size={14} className="mr-1.5 shrink-0" />
              <span>Customer Details</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ahmad Razali"
                  className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-colors"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  placeholder="+60"
                  className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-colors"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Optional"
                  className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section: Vehicle Interest */}
          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-3 flex items-center">
              <Car size={14} className="mr-1.5 shrink-0" />
              <span>Vehicle Interest</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Model *
                </label>
                <select
                  className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none cursor-pointer"
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    setSelectedVariant('');
                  }}
                >
                  <option value="">Select Model</option>
                  {availableModels.map((m) => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Variant
                </label>
                <select
                  disabled={!selectedModel}
                  className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none cursor-pointer"
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                >
                  <option value="">Select Variant</option>
                  {selectedModel && 
                    availableModels
                      .find((m) => m.name === selectedModel)
                      ?.variants.map((variant) => (
                        <option key={variant} value={variant}>{variant}</option>
                      ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Color Preference
                </label>
                <select
                  className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none cursor-pointer"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="Any Color">Any Color</option>
                  <option value="Quartz White Pearl">Quartz White Pearl</option>
                  <option value="Jet Black Mica">Jet Black Mica</option>
                  <option value="Sterling Grey">Sterling Grey</option>
                  <option value="Red Metallic">Red Metallic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Lead Details */}
          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-3 flex items-center">
              <FileText size={14} className="mr-1.5 shrink-0" />
              <span>Lead Details</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Lead Source *
                </label>
                <select
                  className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none cursor-pointer"
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value)}
                >
                  <option value="">Select Source</option>
                  <option value="Roadshow Event">Roadshow Event</option>
                  <option value="Walk-in">Walk-in</option>
                  <option value="Referral">Referral</option>
                  <option value="Website Enquiry">Website Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Expected Closing Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <Calendar size={16} />
                  </div>
                  <input
                    type="date"
                    className="block w-full h-11 px-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none tracking-wide"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Tags Choice selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Hot Lead', 'Needs Finance', 'Fleet Sales'].map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border outline-none ${
                          isSelected
                            ? 'bg-brand-red/10 border-brand-red text-brand-red shadow-sm'
                            : 'bg-white border-brand-border text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TextArea internal note */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Internal Notes
                </label>
                <textarea
                  placeholder="Add any context..."
                  rows={3}
                  className="block w-full p-3 border border-brand-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-colors"
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Form Actions footer */}
          <div className="pt-4 flex flex-col space-y-3">
            <button
              type="button"
              onClick={onBack}
              className="w-full h-11 border border-brand-border text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="w-full h-11 bg-brand-red text-white hover:bg-brand-red/90 font-semibold text-sm rounded-lg flex items-center justify-center space-x-2 shadow transition-colors cursor-pointer"
            >
              <Check size={18} strokeWidth={2.5} />
              <span>Create Opportunity</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
