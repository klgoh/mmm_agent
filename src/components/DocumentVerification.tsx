import React, { useState } from 'react';
import { 
  ArrowLeft, 
  UploadCloud, 
  Scan, 
  Image as ImageIcon, 
  Trash2, 
  Upload, 
  Plus, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Opportunity } from '../types';

interface DocumentVerificationProps {
  lead: Opportunity;
  onBack: () => void;
  onUpdateLead: (updatedLead: Opportunity) => void;
}

export default function DocumentVerification({
  lead,
  onBack,
  onUpdateLead
}: DocumentVerificationProps) {
  const [icUploaded, setIcUploaded] = useState(true);
  const [licenseUploaded, setLicenseUploaded] = useState(true); // "Processing" as in mockup
  const [incomeUploaded, setIncomeUploaded] = useState(false);
  const [insuranceUploaded, setInsuranceUploaded] = useState(false);
  const [uploadingState, setUploadingState] = useState(false);

  // Verification counts dynamically
  const totalVerifiedCount = (icUploaded ? 1 : 0) + 
                             (licenseUploaded ? 1 : 0) + 
                             (incomeUploaded ? 1 : 0) + 
                             (insuranceUploaded ? 1 : 0);

  const simulateIncomeUpload = () => {
    setUploadingState(true);
    setTimeout(() => {
      setIncomeUploaded(true);
      setUploadingState(false);
      
      // Update the parent state as well to sync
      const updatedLead: Opportunity = {
        ...lead,
        documents: {
          icCopy: 'Verified',
          drivingLicense: 'Verified',
          incomeProof: 'Verified',
          insuranceCover: insuranceUploaded ? 'Verified' : 'Pending',
          jpjFormK3: 'Verified'
        }
      };
      onUpdateLead(updatedLead);
    }, 1500);
  };

  const simulateInsuranceUpload = () => {
    setInsuranceUploaded(true);
    // Update parent
    const updatedLead: Opportunity = {
      ...lead,
      documents: {
        icCopy: 'Verified',
        drivingLicense: 'Verified',
        incomeProof: incomeUploaded ? 'Verified' : 'Required',
        insuranceCover: 'Verified',
        jpjFormK3: 'Verified'
      }
    };
    onUpdateLead(updatedLead);
  };

  const handleGoToReview = () => {
    alert("Compliance and e-Daftar identity audit checks completed successfully. Moving to final audit.");
    onBack();
  };

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">
      
      {/* Stepper Header bar */}
      <div className="bg-white border-b border-brand-border px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-1 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg focus:outline-none flex items-center cursor-pointer"
        >
          <ArrowLeft size={20} className="mr-1" />
        </button>
        <h2 className="text-base font-extrabold text-brand-charcoal">
          Registration
        </h2>
        <button 
          onClick={() => {
            alert('Draft credentials cached locally.');
            onBack();
          }}
          className="text-xs font-bold text-brand-red uppercase tracking-wider hover:underline"
        >
          Save Draft
        </button>
      </div>

      {/* Stepper indicator badges */}
      <div className="flex items-center justify-center space-x-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center space-x-1">
          <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
          <span className="text-[11px] font-bold text-gray-500">Details</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-5 h-5 rounded-full border-2 border-brand-red text-brand-red flex items-center justify-center text-[10px] font-extrabold">2</span>
          <span className="text-[11px] font-extrabold text-brand-red">Documents</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-bold">3</span>
          <span className="text-[11px] font-bold text-gray-400">Review</span>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Verification title details */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-extrabold tracking-tight leading-tight text-brand-charcoal">
            Verify Identity & Compliance
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            Please upload clear, legible copies of the required documents below to proceed with the agent registration process.
          </p>
        </div>

        {/* Quick Upload dropzone Card */}
        <div className="bg-white border border-dashed border-brand-red/50 rounded-2xl p-6 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto shadow-sm">
            <UploadCloud size={28} className="animate-bounce" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-brand-charcoal">Quick Upload</h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-1 whitespace-pre-line px-4">
              Drag and drop files here, or tap below to choose an action. Supported formats: JPG, PNG, PDF.
            </p>
          </div>

          <div className="flex space-x-3 max-w-xs mx-auto pt-2">
            <button 
              type="button"
              onClick={() => alert("Scanner mode initiated. Accessing camera frame permissions...")}
              className="flex-1 h-10 bg-brand-red hover:bg-brand-red/95 text-white font-extrabold text-xs rounded-lg flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <Scan size={14} />
              <span>Scan Document</span>
            </button>
            <button 
              type="button"
              onClick={() => alert("Open system photo galleries...")}
              className="flex-1 h-10 border border-brand-border hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-lg flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <ImageIcon size={14} className="text-gray-400" />
              <span>Gallery</span>
            </button>
          </div>
        </div>

        {/* Required files stack list container */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
            Required Files (4)
          </h3>

          <div className="space-y-2.5">
            {/* File 1: IC COPY */}
            <div className="bg-white border border-brand-border rounded-xl p-4 flex justify-between items-center shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                  <span className="font-mono text-xs font-bold font-sans">ID</span>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-brand-charcoal">IC Copy</p>
                  <p className="text-[10px] text-gray-400 font-medium">Front and Back • PDF</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase select-none">
                Verified
              </span>
            </div>

            {/* File 2: DRIVING LICENSE (Processing) */}
            <div className="bg-white border border-brand-border rounded-xl p-4 flex justify-between items-center shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                  <span className="font-mono text-xs font-bold font-sans">DL</span>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-brand-charcoal">Driving License</p>
                  <p className="text-[10px] text-gray-400 font-medium font-sans">Valid Class D • PNG</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase flex items-center">
                  <RefreshCw size={10} className="mr-1 animate-spin" />
                  <span>Processing</span>
                </span>
                <button 
                  onClick={() => alert("Simulation restriction: Base driving license cannot be removed.")}
                  className="p-1 text-gray-400 hover:text-red-500 outline-none select-none cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* File 3: INCOME PROOF (Required - Red Highlight Border) */}
            <div className={`rounded-xl p-4 flex justify-between items-center shadow-sm transition-all duration-300 border ${
              incomeUploaded 
                ? 'bg-white border-brand-border' 
                : 'bg-red-50/10 border-brand-red border-2 shadow-[0_4px_12px_rgba(230,0,18,0.05)]'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 border rounded-lg flex items-center justify-center shrink-0 ${
                  incomeUploaded ? 'bg-gray-50 border-gray-100 text-gray-500' : 'bg-red-50 border-red-100 text-brand-red'
                }`}>
                  <span className="font-mono text-xs font-bold font-sans">$$</span>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-brand-charcoal">Income Proof (3 Months)</p>
                  <p className={`text-[10px] font-semibold mt-0.5 ${incomeUploaded ? 'text-gray-400' : 'text-brand-red'}`}>
                    {incomeUploaded ? 'Uploaded and Validated' : 'Required'}
                  </p>
                </div>
              </div>
              <div>
                {uploadingState ? (
                  <span className="text-xs text-brand-red font-semibold animate-pulse">Uploading...</span>
                ) : incomeUploaded ? (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full uppercase select-none">
                    Verified
                  </span>
                ) : (
                  <button 
                    type="button"
                    onClick={simulateIncomeUpload}
                    className="h-8 pr-3.5 pl-3 border border-brand-red hover:bg-red-50 text-brand-red font-extrabold text-[11px] uppercase tracking-wider rounded-lg flex items-center space-x-1 outline-none transition-colors cursor-pointer bg-white"
                  >
                    <Upload size={11} />
                    <span>Upload</span>
                  </button>
                )}
              </div>
            </div>

            {/* File 4: INSURANCE COVER NOTE */}
            <div className="bg-white border border-brand-border rounded-xl p-4 flex justify-between items-center shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                  <span className="font-mono text-xs font-bold font-sans">CO</span>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-brand-charcoal">Insurance Cover Note</p>
                  <p className="text-[10px] text-gray-400 font-medium">Active Policy • Cover Note</p>
                </div>
              </div>
              <div>
                {insuranceUploaded ? (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full uppercase select-none">
                    Verified
                  </span>
                ) : (
                  <button 
                    type="button"
                    onClick={simulateInsuranceUpload}
                    className="h-8 pr-3 pl-2 border border-brand-border hover:bg-gray-50 text-gray-600 font-extrabold text-[11px] uppercase tracking-wider rounded-lg flex items-center space-x-0.5 cursor-pointer bg-white"
                  >
                    <Plus size={12} className="text-gray-400" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status Banner & Button */}
        <div className="pt-4 space-y-3.5 text-center">
          <p className="text-xs text-gray-500 font-semibold tracking-wide">
            {totalVerifiedCount} of 4 Required Documents completed
          </p>

          <button
            type="button"
            disabled={totalVerifiedCount < 4}
            onClick={handleGoToReview}
            className="w-full h-11 bg-brand-red text-white hover:bg-brand-red/95 font-extrabold text-sm rounded-lg flex items-center justify-center space-x-2 shadow disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer"
          >
            <span>Continue to Review</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
}
