import React from 'react';
import {
  MapPin,
  Mail,
  ShieldCheck,
  HelpCircle,
  LogOut,
  RefreshCcw,
  Zap
} from 'lucide-react';

interface ProfileViewProps {
  staffName: string;
  staffEmail: string;
  onLogout: () => void;
  onResetApp: () => void;
}

export default function ProfileView({
  staffName,
  staffEmail,
  onLogout,
  onResetApp
}: ProfileViewProps) {
  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">

      <div className="px-5 pt-6 space-y-4">
        
        {/* headshot credentials Card */}
        <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm text-center space-y-4 flex flex-col justify-center items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-red shadow-md shrink-0 select-none">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240" 
              alt="Staff Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold tracking-tight text-brand-charcoal leading-none">
              {staffName}
            </h2>
            <p className="text-[11px] text-brand-red font-bold uppercase tracking-wider">Senior Sales Executive</p>
            <span className="block text-[10px] text-gray-400 font-mono tracking-wider font-semibold">Staff ID: #ML-2023-8842</span>
          </div>

          <div className="flex flex-col space-y-2.5 text-xs text-gray-500 font-medium pt-3 border-t border-gray-50 w-full text-left font-sans">
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-gray-400" />
              <span>Petaling Jaya Branch, Selangor DE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-gray-400" />
              <span>{staffEmail}</span>
            </div>
          </div>
        </div>

        {/* Sales targets MTD cockpit card */}
        <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">
            Monthly Performance (MTD)
          </h3>

          <div className="grid grid-cols-2 gap-3 pb-3">
            {/* Target sales count */}
            <div className="border border-brand-border rounded-xl p-3 bg-gray-50/50 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Target Goal</span>
              <p className="text-sm font-extrabold text-brand-charcoal font-sans">RM 500k</p>
            </div>

            {/* Commissions card */}
            <div className="border border-brand-border rounded-xl p-3 bg-gray-50/50 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Commissions</span>
              <p className="text-sm font-extrabold text-green-600 font-sans">RM 7.6k</p>
            </div>
          </div>

          {/* Progress achievements bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold font-sans">
              <span>Achieved Value</span>
              <span className="text-brand-red font-extrabold">RM 380,000 (76%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-brand-red h-2 rounded-full" style={{ width: '76%' }}></div>
            </div>
            <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase text-center pt-1">
              ** On track to trigger High-Tier Volume bonus
            </p>
          </div>
        </div>

        {/* Quick Utility Actions Settings list */}
        <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden text-sm">
          
          <button 
            type="button"
            onClick={onResetApp}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 border-b border-brand-border hover:text-brand-red transition-all cursor-pointer text-left outline-none"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-1 px-1.5 bg-red-50 text-brand-red rounded">
                <RefreshCcw size={16} />
              </div>
              <div>
                <span className="font-extrabold block text-xs">Reset Sandbox State</span>
                <span className="text-[10px] text-gray-400">Restore default demo lead statuses and alerts</span>
              </div>
            </div>
            <span className="text-[10px] bg-red-100/50 text-brand-red font-bold px-2 py-0.5 rounded">Revert</span>
          </button>

          <button 
            type="button"
            onClick={() => alert("Dealer Group compliance check: Fully verified active. Next audit: Q3 2026.")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 border-b border-brand-border transition-all cursor-pointer text-left outline-none"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-1 px-1.5 bg-blue-50 text-blue-600 rounded">
                <ShieldCheck size={16} />
              </div>
              <div>
                <span className="font-extrabold block text-xs">Compliance Audit Profile</span>
                <span className="text-[10px] text-gray-400">Fully validated with dealership standards</span>
              </div>
            </div>
            <span className="text-[10px] bg-green-50 text-green-700 border border-green-100 font-bold px-2.5 py-0.5 rounded-full uppercase">PASSED</span>
          </button>

          <button 
            type="button"
            onClick={() => alert("Connecting to Mitsubishi Motors IT Support Desk...")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer text-left outline-none"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-1 px-1.5 bg-gray-50 text-gray-500 rounded">
                <HelpCircle size={16} />
              </div>
              <div>
                <span className="font-extrabold block text-xs">IT Help & Contact Center</span>
                <span className="text-[10px] text-gray-400">Open active tickets with branch admins</span>
              </div>
            </div>
            <Zap size={14} className="text-gray-300" />
          </button>
        </div>

        {/* LOGOUT BUTTON ACTION */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onLogout}
            className="w-full h-11 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 font-extrabold text-sm rounded-lg flex items-center justify-center space-x-2 shadow cursor-pointer transition-colors"
          >
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </div>

      </div>

    </div>
  );
}
