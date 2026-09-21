import React, { useState } from 'react';
import {
  ArrowLeft,
  Car,
  Clock,
  CheckCircle,
  AlertTriangle,
  Upload,
  Eye,
  CornerDownRight,
  ShieldCheck,
  Sparkles,
  CloudLightning
} from 'lucide-react';
import { Opportunity } from '../types';

interface RegistrationMilestonesProps {
  lead: Opportunity;
  onBack: () => void;
  onUpdateLead: (updatedLead: Opportunity) => void;
  onTriggerDocumentUpload: () => void;
}

export default function RegistrationMilestones({
  lead,
  onBack,
  onUpdateLead,
  onTriggerDocumentUpload
}: RegistrationMilestonesProps) {
  const [refId, setRefId] = useState(lead.jpjDetails?.eDaftarReferenceId || '');
  const [plateNumber, setPlateNumber] = useState(lead.jpjDetails?.requestedNumberPlate || 'VHM 1234');
  const [targetDate, setTargetDate] = useState(lead.jpjDetails?.targetRegistrationDate || '2023-10-25');
  const [submittingJpj, setSubmittingJpj] = useState(false);

  // Status indicators reflecting current state
  const icStatus = lead.documents?.icCopy || 'Verified';
  const licenseStatus = lead.documents?.drivingLicense || 'Verified';
  const insuranceStatus = lead.documents?.insuranceCover || 'Pending';
  const formStatus = lead.documents?.jpjFormK3 || 'Missing';

  // Calculate verification counts
  const docsList = [icStatus, licenseStatus, insuranceStatus, formStatus];
  const verifiedCount = docsList.filter(d => d === 'Verified').length;

  const handleSaveDraft = () => {
    if (!lead.jpjDetails) return;
    const updatedLead: Opportunity = {
      ...lead,
      jpjDetails: {
        ...lead.jpjDetails,
        requestedNumberPlate: plateNumber,
        targetRegistrationDate: targetDate,
        eDaftarReferenceId: refId
      }
    };
    onUpdateLead(updatedLead);
    alert('Draft saved successfully.');
  };

  const handleSubmitToJpj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) {
      alert('e-Daftar Reference ID is required to submit to central JPJ system.');
      return;
    }

    setSubmittingJpj(true);

    setTimeout(() => {
      if (!lead.jpjDetails || !lead.registrationProgress) return;
      const updatedLead: Opportunity = {
        ...lead,
        jpjDetails: {
          ...lead.jpjDetails,
          requestedNumberPlate: plateNumber,
          targetRegistrationDate: targetDate,
          eDaftarReferenceId: refId,
          status: 'Submitted'
        },
        registrationProgress: {
          ...lead.registrationProgress,
          jpjRegistration: {
            checked: true,
            status: 'Completed',
            date: 'Today'
          },
          readyForDelivery: {
            checked: true,
            date: 'Pending'
          }
        }
      };
      onUpdateLead(updatedLead);
      setSubmittingJpj(false);
      alert('Success: Lead submitted to JPJ central registry. Delivery sequence generated.');
    }, 1200);
  };

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">
      
      {/* Registration milestone header */}
      <div className="bg-white border-b border-brand-border px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg focus:outline-none flex items-center cursor-pointer"
          aria-label="Back to leads"
        >
          <ArrowLeft size={18} className="mr-1" aria-hidden="true" />
          <span className="text-xs font-semibold">Leads</span>
        </button>
        <h2 className="text-sm font-extrabold text-brand-charcoal uppercase tracking-wider">
          Registration Milestone
        </h2>
        <div className="w-6" aria-hidden="true" />
      </div>

      <div className="px-5 pt-6 space-y-4">
        
        {/* Main Header card info */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none text-brand-charcoal">
                {lead.name}
              </h1>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">ID: {lead.id}</span>
            </div>
            <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              Corporate Buyer
            </span>
          </div>

          {/* SUV Vector Image Representation */}
          <div className="h-44 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100 shadow-inner flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=480"
              alt="Mitsubishi Vehicle"
              className="w-full h-full object-cover shrink-0 select-none"
              referrerPolicy="no-referrer"
            />
            {/* Hover overlay metadata banner */}
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 text-white text-[9px] font-bold rounded tracking-wide uppercase">
              Brand Active Model
            </div>
          </div>

          {/* Specs column grids */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-1.5 text-xs font-semibold border-t border-gray-100 pt-3">
            <div>
              <p className="text-[10px] font-medium text-gray-400">Model</p>
              <p className="text-brand-charcoal truncate mt-0.5">{lead.model}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400">Color</p>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-gray-300"></span>
                <p className="text-brand-charcoal truncate">{lead.color}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400">Chassis No.</p>
              <p className="text-brand-charcoal font-mono tracking-wider text-[11px] mt-0.5">{lead.chassisNo || 'MMBTNCK10ME004'}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400">Sale Value</p>
              <p className="text-brand-red font-mono text-sm leading-none mt-0.5">RM {(lead.saleValue || 99980.00).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Milestone Vertical Timeline indicator */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-4 flex items-center">
            <ShieldCheck size={14} className="text-brand-red mr-1.5 shrink-0" />
            <span>Registration Progress Timeline</span>
          </h3>

          <div className="space-y-4 pl-3 relative border-l border-gray-100 ml-2">
            {/* Point 1: Booking */}
            <div className="relative">
              <span className="absolute left-[-21px] top-0 w-4 h-4 rounded-full bg-green-50 z-10 flex items-center justify-center border border-green-500">
                <CheckCircle size={10} className="text-green-600 shrink-0" />
              </span>
              <div className="text-xs">
                <p className="font-extrabold text-brand-charcoal">Booking Confirmed</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Oct 12, 2023 - Deposit Cleared and Authenticated</p>
              </div>
            </div>

            {/* Point 2: Loan */}
            <div className="relative">
              <span className="absolute left-[-21px] top-0 w-4 h-4 rounded-full bg-green-50 z-10 flex items-center justify-center border border-green-500">
                <CheckCircle size={10} className="text-green-600 shrink-0" />
              </span>
              <div className="text-xs">
                <p className="font-extrabold text-brand-charcoal">Loan Approved</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Oct 18, 2023 - Maybank Auto Finance (90% Loan)</p>
              </div>
            </div>

            {/* Point 3: JPJ registration active/processed */}
            <div className="relative">
              {!lead.registrationProgress?.jpjRegistration.checked ? (
                <span className="absolute left-[-22px] top-0 w-4.5 h-4.5 rounded-full bg-red-50 z-10 flex items-center justify-center border border-brand-red animate-pulse">
                  <Clock size={11} className="text-brand-red shrink-0" />
                </span>
              ) : (
                <span className="absolute left-[-21px] top-0 w-4 h-4 rounded-full bg-green-50 z-10 flex items-center justify-center border border-green-500">
                  <CheckCircle size={10} className="text-green-600 shrink-0" />
                </span>
              )}
              <div className="text-xs">
                <p className="font-extrabold text-brand-charcoal">JPJ Registration</p>
                <p className="text-[10px] text-brand-red mt-0.5 font-sans flex items-center">
                  {!lead.registrationProgress?.jpjRegistration.checked ? (
                    <>
                      <Sparkles size={11} className="mr-1 animate-spin" />
                      <span>In Progress - Waiting for e-Daftar compliance verification</span>
                    </>
                  ) : (
                    <span className="text-green-600">Completed - Registration number plate locked successfully</span>
                  )}
                </p>
              </div>
            </div>

            {/* Point 4: Ready for Delivery */}
            <div className="relative">
              <span className="absolute left-[-21px] top-0 w-4 h-4 rounded-full bg-gray-50 z-10 flex items-center justify-center border border-gray-200">
                <Clock size={10} className="text-gray-400 shrink-0" />
              </span>
              <div className="text-xs">
                <p className="font-bold text-gray-400">Ready for Delivery</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Pending Registration Completion and logistics release</p>
              </div>
            </div>
          </div>
        </div>

        {/* JPJ Registration Details edit Form */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-charcoal flex items-center">
              <Car size={14} className="text-brand-red mr-1.5 shrink-0" />
              <span>JPJ Registration Details</span>
            </h3>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
              lead.jpjDetails?.status === 'Submitted'
                ? 'bg-green-50 text-green-700 border-green-100'
                : 'bg-amber-50 text-amber-700 border-amber-100'
            }`}>
              {lead.jpjDetails?.status === 'Submitted' ? 'Submitted' : 'Processing'}
            </span>
          </div>

          <form onSubmit={handleSubmitToJpj} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Requested Number Plate
              </label>
              <input 
                type="text"
                disabled={lead.jpjDetails?.status === 'Submitted'}
                className="w-full h-11 border border-brand-border rounded-lg bg-gray-50 pl-3 focus:bg-white text-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-colors uppercase font-mono font-bold tracking-wide disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Target Registration Date
              </label>
              <input 
                type="date"
                disabled={lead.jpjDetails?.status === 'Submitted'}
                className="w-full h-11 border border-brand-border rounded-lg bg-gray-50 px-3 focus:bg-white text-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                e-Daftar Reference ID
              </label>
              <input 
                type="text"
                disabled={lead.jpjDetails?.status === 'Submitted'}
                placeholder="Enter reference ID when available"
                className="w-full h-11 border border-brand-border rounded-lg bg-gray-50 pl-3 focus:bg-white text-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
              />
            </div>

            {lead.jpjDetails?.status !== 'Submitted' && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="h-11 border border-brand-border font-bold text-xs rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={submittingJpj}
                  className="h-11 bg-brand-red text-white hover:bg-brand-red/95 font-extrabold text-xs rounded-lg flex items-center justify-center space-x-1 shadow-sm transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submittingJpj ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <CloudLightning size={14} className="animate-bounce" />
                      <span>Submit to JPJ</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Registration Documents Verification card */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3.5 pb-2 border-b border-gray-50">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-charcoal">
              Registration Documents Pipeline
            </h3>
            <span className="text-[10px] font-mono font-bold text-gray-400">
              {verifiedCount} / 4 Verified
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Doc 1: IC Copy */}
            <div className="flex items-center justify-between p-3 bg-gray-50/80 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-2.5">
                <span className="w-5 h-5 bg-green-500 rounded-lg flex items-center justify-center text-white font-mono text-xs">
                  ID
                </span>
                <div className="text-xs">
                  <p className="font-extrabold text-brand-charcoal">IC Copy (Front & Back)</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Uploaded on Oct 12, 2023</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-full uppercase">
                  VERIFIED
                </span>
                <button 
                  onClick={() => alert("Simulated: Proof of identity PDF viewer opened.")}
                  className="p-1 text-gray-400 hover:text-brand-charcoal select-none cursor-pointer"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>

            {/* Doc 2: License */}
            <div className="flex items-center justify-between p-3 bg-gray-50/80 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-2.5">
                <span className="w-5 h-5 bg-green-500 rounded-lg flex items-center justify-center text-white font-mono text-xs">
                  DL
                </span>
                <div className="text-xs">
                  <p className="font-extrabold text-brand-charcoal">Valid Driving License</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Uploaded on Oct 12, 2023</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-full uppercase">
                  VERIFIED
                </span>
                <button 
                  onClick={() => alert("Simulated: Driving License document viewer opened.")}
                  className="p-1 text-gray-400 hover:text-brand-charcoal select-none cursor-pointer"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>

            {/* Doc 3: Income proof */}
            <div className="flex items-center justify-between p-3 bg-gray-50/80 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-2.5">
                <span className="w-5 h-5 bg-amber-500 rounded-lg flex items-center justify-center text-white font-mono text-xs">
                  $$
                </span>
                <div className="text-xs">
                  <p className="font-extrabold text-brand-charcoal">Income Proof (3 Months)</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {insuranceStatus === 'Verified' ? 'Verified on active upload' : 'Awaiting generation from finance'}
                  </p>
                </div>
              </div>
              <div>
                <span className={`text-[9px] font-bold border px-2.5 py-0.5 rounded-full uppercase ${
                  insuranceStatus === 'Verified'
                    ? 'bg-green-50 text-green-600 border-green-100'
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {insuranceStatus === 'Verified' ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
            </div>

            {/* Doc 4: JPJ e-Daftar Form K3 */}
            <div className="flex items-center justify-between p-3 bg-red-50/10 border border-red-100/30 rounded-lg">
              <div className="flex items-center space-x-2.5">
                <span className="w-5 h-5 bg-brand-red rounded-lg flex items-center justify-center text-white font-mono text-xs font-bold leading-none">
                  K3
                </span>
                <div className="text-xs">
                  <span className="font-extrabold text-brand-charcoal">JPJ e-Daftar Form K3</span>
                  <p className="text-[10px] text-brand-red mt-0.5 flex items-center">
                    <AlertTriangle size={10} className="mr-0.5 shrink-0" />
                    <span>Required for next registration step</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className={`text-[9px] font-bold border px-2 py-0.5 rounded-full uppercase ${
                  formStatus === 'Verified' 
                    ? 'bg-green-50 text-green-600 border-green-100'
                    : 'bg-red-50 text-brand-red border border-red-100'
                }`}>
                  {formStatus === 'Verified' ? 'VERIFIED' : 'MISSING'}
                </span>
                {formStatus !== 'Verified' && (
                  <button 
                    onClick={onTriggerDocumentUpload}
                    className="h-7 px-3 bg-white border border-brand-red text-brand-red hover:bg-red-50 font-bold text-[10px] uppercase tracking-wide rounded flex items-center space-x-1 cursor-pointer"
                  >
                    <Upload size={10} />
                    <span>Upload</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
