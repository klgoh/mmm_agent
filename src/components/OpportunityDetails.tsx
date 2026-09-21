import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  Car,
  MapPin,
  GitCommit,
  PlusCircle,
  FileUp,
  X,
  Flame,
  Trophy,
  History,
  CheckCircle2,
  Bookmark,
  Upload,
  RefreshCw,
  AlertCircle,
  Check,
  XCircle
} from 'lucide-react';
import { Opportunity, Note, LeadStatus, ToastType, AuditTrailEntry, SUGGESTED_TAGS } from '../types';

interface OpportunityDetailsProps {
  lead: Opportunity;
  onBack: () => void;
  onUpdateLead: (updatedLead: Opportunity) => void;
  onNavigateToMilestones: (lead: Opportunity) => void;
  addToast?: (type: ToastType, message: string, duration?: number) => void;
}

export default function OpportunityDetails({
  lead,
  onBack,
  onUpdateLead,
  onNavigateToMilestones,
  addToast,
}: OpportunityDetailsProps) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Timeline' | 'Documents' | 'Approval' | 'DMS Status'>('Overview');
  const [showStageModal, setShowStageModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);

  // Update Stage selections
  const [nextStage, setNextStage] = useState<LeadStatus>(lead.status);
  const [stageRationale, setStageRationale] = useState('');

  // Note inputs
  const [newNoteText, setNewNoteText] = useState('');

  // Tag management
  const [newTagText, setNewTagText] = useState('');

  const showToast = (type: ToastType, message: string) => {
    if (addToast) {
      addToast(type, message);
    } else {
      // Fallback to alert if addToast not provided
      alert(message);
    }
  };

  const initials = lead.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleUpdateStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageRationale.trim()) {
      alert('Rationale is required for stage audits.');
      return;
    }

    // Append stage change note
    const updatedNotesList: Note[] = [
      {
        id: `note-stage-${Date.now()}`,
        text: `TRANSITIONED STAGE TO "${nextStage.toUpperCase()}". Audit Notes: ${stageRationale}`,
        author: 'Ahmad Razali',
        timestamp: 'Just now'
      },
      ...lead.notes
    ];

    const updatedLead: Opportunity = {
      ...lead,
      status: nextStage,
      notes: updatedNotesList
    };

    // If transitioned to won and registration details don't exist, bootstrap them
    if (nextStage === 'Prospect Won' && !updatedLead.registrationProgress) {
      updatedLead.registrationProgress = {
        bookingConfirmed: { checked: true, date: 'Today' },
        loanApproved: { checked: true, date: 'Today', bank: 'Maybank Auto Finance' },
        jpjRegistration: { checked: false, status: 'Processing' },
        readyForDelivery: { checked: false }
      };
      updatedLead.jpjDetails = {
        requestedNumberPlate: 'VHM 1234',
        targetRegistrationDate: '2026-05-30',
        eDaftarReferenceId: '',
        status: 'Processing'
      };
      updatedLead.documents = {
        icCopy: 'Verified',
        drivingLicense: 'Verified',
        incomeProof: 'Required',
        insuranceCover: 'Pending',
        jpjFormK3: 'Missing'
      };
    }

    onUpdateLead(updatedLead);
    setShowStageModal(false);
    setStageRationale('');
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: Note = {
      id: `note-custom-${Date.now()}`,
      text: newNoteText,
      author: 'Ahmad Razali',
      timestamp: 'Just now'
    };

    const updatedLead: Opportunity = {
      ...lead,
      notes: [newNote, ...lead.notes]
    };

    onUpdateLead(updatedLead);
    setShowNoteModal(false);
    setNewNoteText('');
  };

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in relative">
      
      {/* Detail view header */}
      <div className="bg-white border-b border-brand-border px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg focus:outline-none flex items-center cursor-pointer"
          aria-label="Back to leads list"
        >
          <ArrowLeft size={20} className="mr-1" aria-hidden="true" />
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold text-brand-charcoal tracking-tight">
            {lead.name}
          </h2>
          <span className="text-[10px] text-gray-400 font-mono tracking-wide">{lead.id}</span>
        </div>
        <div className="w-6" aria-hidden="true" />
      </div>

      {/* Main Metadata panel */}
      <div className="bg-white border-b border-brand-border p-5">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-brand-red text-white flex items-center justify-center font-bold text-xl rounded-full shrink-0 select-none shadow-[0_4px_12px_rgba(230,0,18,0.15)]">
            {initials}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-brand-charcoal tracking-tight">{lead.name}</h1>
              <span className={`text-[9px] font-extrabold tracking-wider px-2 py-0.5 uppercase rounded-full border ${
                lead.status === 'Hot Prospect'
                  ? 'bg-red-50 text-brand-red border-red-100'
                  : lead.status === 'Prospect Won'
                    ? 'bg-green-50 text-green-700 border-green-100'
                    : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">Customer ID: {lead.id}</p>
          </div>
        </div>

        {/* Contact list items */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <Phone size={14} className="text-gray-400 shrink-0" />
            <span className="font-semibold">{lead.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 truncate">
            <Mail size={14} className="text-gray-400 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <Car size={14} className="text-gray-400 shrink-0" />
            <span className="font-semibold">{lead.model}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <span>Petaling Jaya</span>
          </div>
        </div>

        {/* Action Row menu buttons */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <button 
            onClick={() => {
              setNextStage(lead.status);
              setShowStageModal(true);
            }}
            className="h-10 bg-brand-red text-white font-semibold text-xs rounded-lg flex items-center justify-center space-x-1.5 hover:bg-brand-red/90 transition-colors cursor-pointer shadow-sm"
          >
            <History size={14} />
            <span>Update Stage</span>
          </button>
          
          <button 
            onClick={() => setShowNoteModal(true)}
            className="h-10 border border-brand-border hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle size={14} className="text-gray-400" />
            <span>Add Note</span>
          </button>

          <button
            onClick={() => {
              showToast('info', 'File picker activated. Select contract/ID proofs.');
              // Also add audit trail entry
              const newAuditEntry: AuditTrailEntry = {
                id: `audit-${Date.now()}`,
                type: 'file_uploaded',
                description: 'File upload initiated',
                actor: lead.assignedAgent,
                timestamp: 'Just now',
              };
              onUpdateLead({
                ...lead,
                lastUpdated: 'Just now',
                auditTrail: [newAuditEntry, ...lead.auditTrail],
              });
            }}
            className="h-10 border border-brand-border hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <FileUp size={14} className="text-gray-400" />
            <span>Upload File</span>
          </button>
        </div>

        {/* If Won, Show registration milestone gateway action */}
        {lead.status === 'Prospect Won' && (
          <button 
            onClick={() => onNavigateToMilestones(lead)}
            className="w-full mt-3 h-11 bg-green-600 text-white font-bold text-xs rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-green-700 transition-all cursor-pointer border border-green-500"
          >
            <CheckCircle2 size={16} />
            <span>Manage JPJ Registration Milestones & e-Daftar</span>
          </button>
        )}
      </div>

      {/* Tabs list representation */}
      <div className="border-b border-brand-border bg-white sticky top-[53px] z-20">
        <div className="flex justify-around">
          {(['Overview', 'Timeline', 'Documents', 'Approval', 'DMS Status'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-1 text-xs font-bold tracking-wide relative cursor-pointer outline-none transition-colors duration-150 ${
                  isSelected ? 'text-brand-red' : 'text-gray-500 hover:text-brand-charcoal'
                }`}
              >
                {tab}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-red rounded-t-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active tab contents */}
      <div className="px-5 pt-4 space-y-4">
        {activeTab === 'Overview' && (
          <>
            {/* Box: Lead Details */}
            <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3.5 flex items-center">
                <Bookmark size={13} className="text-gray-400 mr-1.5" />
                <span>Lead Details</span>
              </h3>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div>
                  <p className="text-xs text-gray-400 leading-none mb-1.5">Lead Source</p>
                  <p className="font-bold text-gray-800">{lead.source}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 leading-none mb-1.5">Created Date</p>
                  <p className="font-bold text-gray-800">{lead.createdDate}</p>
                </div>
                {lead.expectedClosingDate && (
                  <div>
                    <p className="text-xs text-gray-400 leading-none mb-1.5">Expected Closing</p>
                    <p className="font-semibold text-gray-800">{lead.expectedClosingDate}</p>
                  </div>
                )}
                {lead.color && (
                  <div>
                    <p className="text-xs text-gray-400 leading-none mb-1.5">Color Preference</p>
                    <p className="font-semibold text-gray-800">{lead.color}</p>
                  </div>
                )}
              </div>

              {lead.tags && lead.tags.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2 font-medium">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Box: Recent Notes */}
            <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Recent Notes
                </h3>
                <button
                  onClick={() => showToast('info', 'Currently showing all notes.')}
                  className="text-xs font-semibold text-brand-red hover:underline focus:outline-none"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {lead.notes && lead.notes.length > 0 ? (
                  lead.notes.map((note) => (
                    <div key={note.id} className="bg-gray-50/80 border border-gray-100 rounded-lg p-3.5 space-y-2">
                      <p className="text-xs text-gray-700 font-sans leading-relaxed">{note.text}</p>
                      <span className="block text-[10px] text-gray-400 font-medium">
                        - Agent {note.author}, {note.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">No logged notes for this opportunity yet.</p>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'Timeline' && (
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 text-left">Pipeline History Timeline</h3>
            <div className="space-y-6 text-left relative pl-4 border-l border-gray-100">
              <div className="relative">
                <span className="absolute left-[-21px] top-1 w-2.5 h-2.5 bg-brand-red rounded-full"></span>
                <p className="text-xs font-bold text-brand-charcoal leading-none">Status Transition</p>
                <p className="text-[11px] text-gray-500 mt-1">Lead marked as {lead.status} by Ahmad Razali</p>
                <span className="block text-[9px] text-gray-400 mt-0.5">Just now</span>
              </div>
              <div className="relative">
                <span className="absolute left-[-21px] top-1 w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
                <p className="text-xs font-medium text-gray-600 leading-none">Lead Created</p>
                <p className="text-[11px] text-gray-400 mt-1">Original intake logged from {lead.source}</p>
                <span className="block text-[9px] text-gray-400 mt-0.5">{lead.createdDate}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Documents' && (
          <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Attached Documents Pipeline</h3>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
              <span className="text-xs font-bold">Proof of Identity (IC Copy)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-100">VERIFIED</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
              <span className="text-xs font-bold">Driving License Copy</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-100">VERIFIED</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
              <span className="text-xs font-bold">Proof of Income Statement</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                lead.status === 'Prospect Won' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-600 border border-red-100'
              }`}>{lead.status === 'Prospect Won' ? 'PENDING VERIFICATION' : 'REQUIRED'}</span>
            </div>
          </div>
        )}

        {activeTab === 'Approval' && (
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Compliance & Manager Sign-Offs</h3>

            {/* Approval Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${
                lead.approvalStatus === 'Approved'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : lead.approvalStatus === 'Rejected'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : lead.approvalStatus === 'Pending Review'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : lead.approvalStatus === 'Revision Requested'
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
                {lead.approvalStatus === 'Approved' && <Check size={12} className="mr-1.5" />}
                {lead.approvalStatus === 'Rejected' && <XCircle size={12} className="mr-1.5" />}
                {lead.approvalStatus === 'Pending Review' && <AlertCircle size={12} className="mr-1.5" />}
                {lead.approvalStatus}
              </span>
            </div>

            {/* Document Checklist */}
            {lead.documents && (
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Required Documents:</p>
                {Object.entries({
                  'IC Copy': lead.documents.icCopy,
                  'Driving License': lead.documents.drivingLicense,
                  'Income Proof': lead.documents.incomeProof,
                  'Insurance Cover': lead.documents.insuranceCover,
                  'JPJ Form K3': lead.documents.jpjFormK3,
                }).map(([docName, status]) => {
                  const isVerified = status === 'Verified';
                  const isPending = status === 'Pending' || status === 'Processing';
                  return (
                    <div key={docName} className="flex justify-between items-center p-2.5 border border-gray-100 rounded-lg">
                      <span className="text-xs font-semibold text-gray-700">{docName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isVerified
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : isPending
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {status.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Approval Notes */}
            {lead.approvalNotes && (
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg mb-4">
                <p className="text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">Manager Notes</p>
                <p className="text-xs text-gray-700">{lead.approvalNotes}</p>
              </div>
            )}

            {/* Submit for Approval Button */}
            {lead.approvalStatus === 'Not Submitted' && (
              <button
                type="button"
                onClick={() => {
                  // Check if all documents are verified
                  const allVerified = lead.documents &&
                    Object.values(lead.documents).every(s => s === 'Verified');

                  if (!allVerified) {
                    showToast('warning', 'Please ensure all required documents are verified before submission.');
                    return;
                  }

                  // Update lead status
                  const newAuditEntry: AuditTrailEntry = {
                    id: `audit-${Date.now()}`,
                    type: 'approval_submitted',
                    description: 'Submitted for manager approval',
                    actor: lead.assignedAgent,
                    timestamp: 'Just now',
                  };

                  onUpdateLead({
                    ...lead,
                    status: 'Pending Approval',
                    approvalStatus: 'Pending Review',
                    lastUpdated: 'Just now',
                    auditTrail: [newAuditEntry, ...lead.auditTrail],
                  });

                  showToast('success', 'Opportunity submitted for manager approval!');
                }}
                className="w-full h-11 bg-brand-red text-white font-bold text-xs rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-brand-red/90 transition-colors"
              >
                <Upload size={14} />
                <span>Submit for Manager Approval</span>
              </button>
            )}

            {/* Retry Button if rejected or revision requested */}
            {(lead.approvalStatus === 'Rejected' || lead.approvalStatus === 'Revision Requested') && (
              <button
                type="button"
                onClick={() => showToast('info', 'Review and update documents before resubmitting.')}
                className="w-full h-11 border border-brand-border text-gray-600 font-bold text-xs rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={14} />
                <span>Review & Resubmit</span>
              </button>
            )}
          </div>
        )}

        {/* DMS Status Tab - NEW */}
        {activeTab === 'DMS Status' && (
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">DMS Submission Status</h3>

            {/* DMS Status Badge */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-2">Submission Status</p>
              <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold border ${
                lead.dmsStatus === 'Submitted' || lead.dmsStatus === 'Reconciled'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : lead.dmsStatus === 'Failed'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : lead.dmsStatus === 'Pending'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                {lead.dmsStatus === 'Submitted' && <Check size={14} className="mr-2" />}
                {lead.dmsStatus === 'Failed' && <XCircle size={14} className="mr-2" />}
                {lead.dmsStatus === 'Pending' && <AlertCircle size={14} className="mr-2" />}
                {lead.dmsStatus}
              </span>
            </div>

            {/* DMS Details */}
            <div className="space-y-3 mb-6">
              {lead.dmsReferenceNumber && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">DMS Reference Number</p>
                  <p className="text-sm font-mono font-bold text-brand-charcoal bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                    {lead.dmsReferenceNumber}
                  </p>
                </div>
              )}

              {lead.dmsSubmittedAt && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Submission Attempt</p>
                  <p className="text-sm font-semibold text-gray-700">{lead.dmsSubmittedAt}</p>
                </div>
              )}

              {lead.dmsErrorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs font-semibold text-red-700 mb-1">Error Message</p>
                  <p className="text-xs text-red-600">{lead.dmsErrorMessage}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {lead.dmsStatus === 'Not Submitted' && lead.approvalStatus === 'Approved' && (
              <button
                type="button"
                onClick={() => {
                  const dmsRef = `DMS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                  const newAuditEntry: AuditTrailEntry = {
                    id: `audit-${Date.now()}`,
                    type: 'dms_submitted',
                    description: `Submitted to DMS. Reference: ${dmsRef}`,
                    actor: lead.assignedAgent,
                    timestamp: 'Just now',
                    details: { dmsRef },
                  };

                  onUpdateLead({
                    ...lead,
                    dmsStatus: 'Submitted',
                    dmsReferenceNumber: dmsRef,
                    dmsSubmittedAt: 'Just now',
                    lastUpdated: 'Just now',
                    auditTrail: [newAuditEntry, ...lead.auditTrail],
                  });

                  showToast('success', `Successfully submitted to DMS! Reference: ${dmsRef}`);
                }}
                className="w-full h-11 bg-green-600 text-white font-bold text-xs rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-green-700 transition-colors"
              >
                <Upload size={14} />
                <span>Submit to DMS</span>
              </button>
            )}

            {lead.dmsStatus === 'Failed' && (
              <button
                type="button"
                onClick={() => {
                  const dmsRef = `DMS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                  const newAuditEntry: AuditTrailEntry = {
                    id: `audit-${Date.now()}`,
                    type: 'dms_submitted',
                    description: `Retry submission to DMS. Reference: ${dmsRef}`,
                    actor: lead.assignedAgent,
                    timestamp: 'Just now',
                  };

                  onUpdateLead({
                    ...lead,
                    dmsStatus: 'Submitted',
                    dmsReferenceNumber: dmsRef,
                    dmsSubmittedAt: 'Just now',
                    dmsErrorMessage: undefined,
                    lastUpdated: 'Just now',
                    auditTrail: [newAuditEntry, ...lead.auditTrail],
                  });

                  showToast('success', `Retry submission successful! Reference: ${dmsRef}`);
                }}
                className="w-full h-11 bg-brand-red text-white font-bold text-xs rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-brand-red/90 transition-colors"
              >
                <RefreshCw size={14} />
                <span>Retry DMS Submission</span>
              </button>
            )}

            {lead.dmsStatus === 'Not Submitted' && lead.approvalStatus !== 'Approved' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                <p className="text-xs text-amber-700">
                  DMS submission is only available after manager approval.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: Update Stage Slideup Context */}
      {showStageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center p-0 md:p-4 transition-opacity">
          <div className="bg-white w-full max-w-lg rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
            <div className="px-5 py-4 border-b border-brand-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-brand-charcoal">Update Stage</h3>
              <button 
                type="button"
                onClick={() => setShowStageModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateStage} className="p-5 space-y-5 overflow-y-auto flex-1">
              
              {/* Context Block: CURRENT STATUS */}
              <div>
                <span className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                  Current Status
                </span>
                <div className="bg-gray-50 border border-brand-border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] font-mono text-gray-400">Lead ID: #{lead.id.split('-').pop()}</span>
                    <span className="text-sm font-extrabold text-brand-charcoal">{lead.name}</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {lead.status === 'Prospect Won' ? 'Prospect Won' : lead.status}
                  </span>
                </div>
              </div>

              {/* NEXT STAGE CHOICES */}
              <div>
                <span className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2.5">
                  Select Next Stage
                </span>
                
                <div className="space-y-2">
                  {/* Option: Prospect */}
                  <div 
                    onClick={() => setNextStage('Prospect')}
                    className={`border rounded-xl p-3.5 flex items-center space-x-3 cursor-pointer transition-colors ${
                      nextStage === 'Prospect' 
                        ? 'border-brand-red bg-red-50/20' 
                        : 'border-brand-border hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${nextStage === 'Prospect' ? 'bg-red-50 text-brand-red' : 'bg-gray-50 text-gray-400'}`}>
                      <Bookmark size={16} />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-brand-charcoal">Prospect</span>
                      <span className="block text-xs text-gray-400 font-medium">Under active discussions</span>
                    </div>
                  </div>

                  {/* Option: Hot Prospect */}
                  <div 
                    onClick={() => setNextStage('Hot Prospect')}
                    className={`border rounded-xl p-3.5 flex items-center space-x-3 cursor-pointer transition-colors ${
                      nextStage === 'Hot Prospect' 
                        ? 'border-brand-red bg-red-50/20' 
                        : 'border-brand-border hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${nextStage === 'Hot Prospect' ? 'bg-red-50 text-brand-red' : 'bg-gray-50 text-gray-400'}`}>
                      <Flame size={16} />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-brand-charcoal">Hot Prospect</span>
                      <span className="block text-xs text-gray-400 font-medium font-sans">High intent to purchase</span>
                    </div>
                  </div>

                  {/* Option: Prospect Won */}
                  <div 
                    onClick={() => setNextStage('Prospect Won')}
                    className={`border rounded-xl p-3.5 flex items-center space-x-3 cursor-pointer transition-colors ${
                      nextStage === 'Prospect Won' 
                        ? 'border-brand-red bg-red-50/20' 
                        : 'border-brand-border hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${nextStage === 'Prospect Won' ? 'bg-red-50 text-brand-red' : 'bg-gray-50 text-gray-400'}`}>
                      <Trophy size={16} />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-brand-charcoal">Prospect Won</span>
                      <span className="block text-xs text-gray-400 font-medium font-sans">Booking confirmed & validated</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rationale field */}
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-1.5">
                  Notes *
                </label>
                <textarea
                  placeholder="Detail the rationale for this stage transition..."
                  className="block w-full p-3.5 border border-brand-border rounded-xl bg-gray-50 focus:bg-white text-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none min-h-[100px]"
                  value={stageRationale}
                  onChange={(e) => setStageRationale(e.target.value)}
                  required
                />
              </div>

              {/* Modal actions */}
              <div className="flex space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowStageModal(false)}
                  className="flex-1 h-11 border border-brand-border hover:bg-gray-50 font-bold text-xs rounded-lg transition-colors cursor-pointer text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 bg-brand-red text-white hover:bg-brand-red/90 font-extrabold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Update Stage
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


      {/* MODAL 2: Add Note Overlay Dialog */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-brand-charcoal">Add Memo Notes</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleCreateNote} className="space-y-4">
              <textarea
                placeholder="Log any client feedback, trade-in specifications or compliance indicators..."
                className="w-full h-28 border border-brand-border p-3 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-all"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 border border-brand-border text-xs rounded-lg text-gray-500 font-bold cursor-pointer hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-red text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-brand-red/90 shadow"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
