import React from 'react';
import { Bell, BellOff, CheckCheck, Landmark, ShieldAlert, ChevronRight, CornerDownRight } from 'lucide-react';
import { SystemAlert } from '../types';

interface AlertsViewProps {
  alerts: SystemAlert[];
  onMarkAllRead: () => void;
  onAlertClick: (alert: SystemAlert) => void;
}

export default function AlertsView({
  alerts,
  onMarkAllRead,
  onAlertClick
}: AlertsViewProps) {

  const hasUnread = alerts.some((a) => !a.read);

  return (
    <div className="flex-1 bg-brand-bg pb-24 font-sans text-brand-charcoal animate-fade-in">

      <div className="px-5 pt-6 space-y-4">
        {hasUnread && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-xs font-bold text-brand-red uppercase tracking-wider hover:underline flex items-center space-x-1 focus:outline-none focus:ring-brand-red focus:ring-offset-1 rounded px-2 py-1"
            >
              <CheckCheck size={14} className="mr-0.5" aria-hidden="true" />
              <span>Mark all read</span>
            </button>
          </div>
        )}

        {/* Core Alerts listing columns */}
        <div className="space-y-2.5" role="list" aria-label="Notifications">
          {alerts.length > 0 ? (
            alerts.map((alertItem) => {
              // Select appropriate icon
              let iconBg = 'bg-blue-50 text-blue-600 border border-blue-100';
              let IconComp = Bell;

              if (alertItem.type === 'failed' || alertItem.type === 'requested') {
                iconBg = 'bg-red-50 text-brand-red border border-red-100';
                IconComp = ShieldAlert;
              } else if (alertItem.type === 'assigned') {
                iconBg = 'bg-green-50 text-green-700 border border-green-100';
                IconComp = Landmark;
              }

              return (
                <div
                  key={alertItem.id}
                  onClick={() => onAlertClick(alertItem)}
                  className={`bg-white rounded-xl border p-4 shadow-sm flex items-start space-x-4 cursor-pointer hover:border-brand-red transition-all relative ${
                    alertItem.read ? 'border-brand-border opacity-75' : 'border-brand-red bg-red-50/5 border-2 shadow-sm'
                  }`}
                >
                  {/* Category icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
                    <IconComp size={18} />
                  </div>

                  {/* Context area */}
                  <div className="space-y-1 pr-2 flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase leading-none">
                        {alertItem.type}
                      </span>
                      <span className="text-[9px] text-gray-400 font-semibold">{alertItem.timestamp}</span>
                    </div>

                    <h4 className={`text-sm text-brand-charcoal ${alertItem.read ? 'font-bold' : 'font-extrabold text-[14px]'}`}>
                      {alertItem.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-normal font-sans">
                      {alertItem.description}
                    </p>

                    {!alertItem.read && (
                      <div className="pt-2 flex items-center text-[10px] font-bold text-brand-red">
                        <CornerDownRight size={10} className="mr-1 mt-0.5 shrink-0" />
                        <span>Action Required</span>
                      </div>
                    )}
                  </div>

                  {/* Indicator Dot */}
                  {!alertItem.read && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-brand-red rounded-full"></span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white border border-brand-border rounded-xl space-y-3">
              <BellOff size={36} className="text-gray-300 mx-auto" />
              <p className="text-sm text-gray-400">Your notifications mailbox is empty.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
