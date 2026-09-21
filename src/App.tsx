import React, { useState, useCallback } from 'react';
import {
  Home as HomeIcon,
  Users,
  GraduationCap,
  Bell,
  User
} from 'lucide-react';

// Type imports
import {
  Opportunity,
  DmsSubmission,
  SystemAlert,
  Course,
  Lesson,
  ToastNotification,
  ToastType,
} from './types';

// Mock Data imports
import {
  INITIAL_LEADS,
  INITIAL_DMS_SUBMISSIONS,
  INITIAL_ALERTS,
  INITIAL_COURSES
} from './mockData';

// Component imports
import LoginView from './components/LoginView';
import HomeDashboard from './components/HomeDashboard';
import CreateOpportunityForm from './components/CreateOpportunityForm';
import LeadsView from './components/LeadsView';
import OpportunityDetails from './components/OpportunityDetails';
import RegistrationMilestones from './components/RegistrationMilestones';
import DocumentVerification from './components/DocumentVerification';
import TrainingHub from './components/TrainingHub';
import CourseCurriculum from './components/CourseCurriculum';
import LessonDetail from './components/LessonDetail';
import CourseCompleted from './components/CourseCompleted';
import DmsSubmissionsView from './components/DmsSubmissionsView';
import AlertsView from './components/AlertsView';
import ProfileView from './components/ProfileView';
import ToastContainer from './components/ToastContainer';
import MitsubishiLogo from './components/MitsubishiLogo';

export default function App() {
  // Session authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffName, setStaffName] = useState('Ahmad Razali');
  const [staffEmail, setStaffEmail] = useState('ahmad.razali@mitsubishi.com');

  // Master Data state registries
  const [leads, setLeads] = useState<Opportunity[]>(INITIAL_LEADS);
  const [submissions, setSubmissions] = useState<DmsSubmission[]>(INITIAL_DMS_SUBMISSIONS);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((prev: ToastNotification[]) => [...prev, { id, type, message, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev: ToastNotification[]) => prev.filter((t: ToastNotification) => t.id !== id));
  }, []);

  // Global Workspace and view routing parameters
  const [activeTab, setActiveTab] = useState<'Home' | 'Leads' | 'Training' | 'Alerts' | 'Profile'>('Home');
  const [selectedLead, setSelectedLead] = useState<Opportunity | null>(null);
  const [showMilestones, setShowMilestones] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const [showDmsPortal, setShowDmsPortal] = useState(false);

  // Calculate unread notifications counts for Bottom Tab overlay badges
  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  const handleLoginSuccess = (name: string, email: string) => {
    setStaffName(name);
    setStaffEmail(email);
    setIsLoggedIn(true);
    setActiveTab('Home');
    addToast('success', 'Welcome back, ' + name + '!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Reset secondary subview states
    clearSubviews();
    addToast('info', 'You have been logged out.');
  };

  const handleResetApp = () => {
    setLeads(INITIAL_LEADS);
    setSubmissions(INITIAL_DMS_SUBMISSIONS);
    setAlerts(INITIAL_ALERTS);
    setCourses(INITIAL_COURSES);
    clearSubviews();
    setActiveTab('Home');
    addToast('info', 'App reset to initial state.');
  };

  const clearSubviews = () => {
    setSelectedLead(null);
    setShowMilestones(false);
    setShowCreateForm(false);
    setShowDocumentUpload(false);
    setSelectedCourse(null);
    setSelectedLesson(null);
    setCourseCompleted(false);
    setShowDmsPortal(false);
  };

  const handleTabChange = (tab: 'Home' | 'Leads' | 'Training' | 'Alerts' | 'Profile') => {
    clearSubviews();
    setActiveTab(tab);
  };

  // SUCCESS ACTIONS
  const handleCreateOpportunitySuccess = (newLead: Opportunity) => {
    setLeads([newLead, ...leads]);
    setShowCreateForm(false);
    // Transition direct to leads view for newly logged customer pipeline
    setSelectedLead(newLead);
    setActiveTab('Leads');
    addToast('success', 'Opportunity created successfully!');
  };

  const handleUpdateOpportunity = (updatedLead: Opportunity) => {
    // 1. Update matching entry in Master list
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    // 2. Refresh active selected lead details reference
    setSelectedLead(updatedLead);
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const handleAlertClick = (clickedAlert: SystemAlert) => {
    // 1. Mark alert as Read
    setAlerts(alerts.map(a => a.id === clickedAlert.id ? { ...a, read: true } : a));

    // 2. Multi-point action switches
    if (clickedAlert.title.includes('DMS') || clickedAlert.title.includes('Compliance')) {
      clearSubviews();
      setShowDmsPortal(true);
    } else if (clickedAlert.title.includes('Lead Assigned')) {
      clearSubviews();
      setActiveTab('Leads');
    } else if (clickedAlert.title.includes('Training')) {
      clearSubviews();
      setActiveTab('Training');
    }
  };

  // COURSE MANAGEMENT
  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCompleteActiveLesson = () => {
    if (!selectedCourse || !selectedLesson) return;

    // Simulate completion
    const updatedLessons: Lesson[] = selectedCourse.lessons.map(les => {
      if (les.id === selectedLesson.id) {
        return { ...les, status: 'Completed' as const };
      }
      // Unlock subsequent lesson
      if (les.number === selectedLesson.number + 1) {
        return { ...les, status: 'Up Next' as const };
      }
      return les;
    });

    const hasMoreLessons = selectedCourse.lessons.some(l => l.number > selectedLesson.number);
    const updatedProgress = Math.min(100, Math.floor((updatedLessons.filter(l => l.status === 'Completed').length / selectedCourse.lessonsCount) * 100));

    const updatedCourse: Course = {
      ...selectedCourse,
      lessons: updatedLessons,
      progressPercent: updatedProgress
    };

    // Update in courses master state
    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);

    addToast('success', 'Lesson completed! Progress: ' + updatedProgress + '%');

    if (!hasMoreLessons || updatedProgress === 100) {
      // Completed last section
      setSelectedLesson(null);
      setCourseCompleted(true);
    } else {
      setSelectedLesson(null);
    }
  };

  const handleStartNextLesson = () => {
    if (!selectedCourse) return;
    const nextLesson = selectedCourse.lessons.find(l => l.status === 'Up Next' || l.status === 'Completed' && l.number === 2);
    if (nextLesson) {
      setSelectedLesson(nextLesson);
    } else {
      setSelectedLesson(selectedCourse.lessons[0]);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between font-sans text-brand-charcoal select-none antialiased max-w-lg mx-auto border-x border-brand-border relative bg-[#f8f9fa]">

      {/* Dynamic View State Gateway router */}
      <div className="flex-1 flex flex-col bg-[#f8f9fa] overflow-y-auto">
        {!isLoggedIn ? (
          <LoginView onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            {/* UNIFIED TOP HEADER BAR */}
            <header className="bg-white border-b border-brand-border px-4 py-3.5 sticky top-0 z-30 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3 select-none">
                <MitsubishiLogo className="w-6 h-5" showText={false} />
                <span className="text-sm font-bold tracking-tight text-brand-charcoal">
                  {activeTab === 'Home' && 'Dashboard'}
                  {activeTab === 'Leads' && 'Opportunities'}
                  {activeTab === 'Training' && 'Training Hub'}
                  {activeTab === 'Alerts' && 'Notifications'}
                  {activeTab === 'Profile' && 'Profile'}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {/* Notification bell */}
                <button
                  type="button"
                  aria-label={unreadAlertsCount > 0 ? `Notifications - ${unreadAlertsCount} unread` : 'Notifications'}
                  onClick={() => setActiveTab('Alerts')}
                  className="p-2 text-gray-600 hover:text-brand-charcoal relative rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-brand-red focus:ring-offset-1"
                >
                  <Bell size={20} aria-hidden="true" />
                  {unreadAlertsCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-brand-red text-white text-[9px] font-bold rounded-full flex items-center justify-center" aria-hidden="true">
                      {unreadAlertsCount}
                    </span>
                  )}
                </button>

                {/* User Profile Avatar */}
                <button
                  type="button"
                  aria-label="Profile"
                  onClick={() => setActiveTab('Profile')}
                  className="w-8 h-8 rounded-full overflow-hidden border border-brand-border focus:outline-none focus:ring-brand-red focus:ring-offset-1 transition-colors"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                    alt="Staff Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>
            </header>

            {/* View Switching Logic Container */}
            {(() => {
              // Priority subviews
              if (showCreateForm) {
                return (
                  <CreateOpportunityForm
                    onBack={() => setShowCreateForm(false)}
                    onSuccess={handleCreateOpportunitySuccess}
                    currentAgent={staffName}
                  />
                );
              }

              if (showDocumentUpload) {
                return (
                  <DocumentVerification
                    lead={selectedLead || leads[0]}
                    onBack={() => setShowDocumentUpload(false)}
                    onUpdateLead={handleUpdateOpportunity}
                  />
                );
              }

              if (showDmsPortal) {
                return (
                  <DmsSubmissionsView
                    submissions={submissions}
                    onBack={() => setShowDmsPortal(false)}
                    onNavigateToUpload={() => {
                      setShowDmsPortal(false);
                      setShowDocumentUpload(true);
                    }}
                    onUpdateSubmissions={setSubmissions}
                  />
                );
              }

              if (selectedCourse && selectedLesson) {
                return (
                  <LessonDetail
                    lesson={selectedLesson}
                    onBack={() => setSelectedLesson(null)}
                    onCompleteLesson={handleCompleteActiveLesson}
                  />
                );
              }

              if (selectedCourse && courseCompleted) {
                return (
                  <CourseCompleted
                    onBackToHub={() => {
                      setSelectedCourse(null);
                      setCourseCompleted(false);
                      setActiveTab('Training');
                    }}
                  />
                );
              }

              if (selectedCourse) {
                return (
                  <CourseCurriculum
                    course={selectedCourse}
                    onBack={() => setSelectedCourse(null)}
                    onSelectLesson={handleSelectLesson}
                    onStartNextLesson={handleStartNextLesson}
                  />
                );
              }

              if (selectedLead && showMilestones) {
                return (
                  <RegistrationMilestones
                    lead={selectedLead}
                    onBack={() => setShowMilestones(false)}
                    onUpdateLead={handleUpdateOpportunity}
                    onTriggerDocumentUpload={() => {
                      setShowMilestones(false);
                      setShowDocumentUpload(true);
                    }}
                  />
                );
              }

              if (selectedLead) {
                return (
                  <OpportunityDetails
                    lead={selectedLead}
                    onBack={() => setSelectedLead(null)}
                    onUpdateLead={handleUpdateOpportunity}
                    onNavigateToMilestones={(lead) => {
                      setSelectedLead(lead);
                      setShowMilestones(true);
                    }}
                    addToast={addToast}
                  />
                );
              }

              // Standard tabs render
              switch (activeTab) {
                case 'Home':
                  return (
                    <HomeDashboard
                      staffName={staffName}
                      leads={leads}
                      dmsSubmissions={submissions}
                      alerts={alerts}
                      onCreateOpportunityClick={() => setShowCreateForm(true)}
                      onUploadDocumentsClick={() => setShowDocumentUpload(true)}
                      onNavigateToDmsClick={() => setShowDmsPortal(true)}
                      onNavigateToLeadsClick={() => setActiveTab('Leads')}
                    />
                  );
                case 'Leads':
                  return (
                    <LeadsView
                      leads={leads}
                      onSelectLead={(lead) => setSelectedLead(lead)}
                    />
                  );
                case 'Training':
                  return (
                    <TrainingHub
                      courses={courses}
                      onSelectCourse={setSelectedCourse}
                      onNavigateToMyLearning={() => addToast('info', 'My Learning section coming soon!')}
                    />
                  );
                case 'Alerts':
                  return (
                    <AlertsView
                      alerts={alerts}
                      onMarkAllRead={handleMarkAllAlertsRead}
                      onAlertClick={handleAlertClick}
                    />
                  );
                case 'Profile':
                  return (
                    <ProfileView
                      staffName={staffName}
                      staffEmail={staffEmail}
                      onLogout={handleLogout}
                      onResetApp={handleResetApp}
                    />
                  );
                default:
                  return (
                    <div className="p-8 text-center text-sm text-gray-500">
                      View component failed compilation. Please reset.
                    </div>
                  );
              }
            })()}
          </>
        )}
      </div>

      {/* FIXED BOTTOM NAVIGATION BAR */}
      {isLoggedIn && !showCreateForm && !selectedLead && !showDocumentUpload && !selectedCourse && !showDmsPortal && (
        <nav aria-label="Main navigation" className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-brand-border h-[64px] grid grid-cols-5 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] px-1" role="tablist">

          {/* Tab 1: Home */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'Home'}
            aria-label="Home tab"
            onClick={() => handleTabChange('Home')}
            className={`flex flex-col items-center justify-center space-y-1 select-none outline-none focus:outline-none focus:ring-brand-red focus:ring-inset rounded-lg ${
              activeTab === 'Home' ? 'text-brand-red' : 'text-gray-400 hover:text-brand-charcoal'
            }`}
          >
            <HomeIcon size={20} strokeWidth={activeTab === 'Home' ? 2.5 : 2} aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wide">Home</span>
          </button>

          {/* Tab 2: Leads */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'Leads'}
            aria-label="Leads tab"
            onClick={() => handleTabChange('Leads')}
            className={`flex flex-col items-center justify-center space-y-1 select-none outline-none focus:outline-none focus:ring-brand-red focus:ring-inset rounded-lg ${
              activeTab === 'Leads' ? 'text-brand-red' : 'text-gray-400 hover:text-brand-charcoal'
            }`}
          >
            <Users size={20} strokeWidth={activeTab === 'Leads' ? 2.5 : 2} aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wide">Leads</span>
          </button>

          {/* Tab 3: Training */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'Training'}
            aria-label="Training tab"
            onClick={() => handleTabChange('Training')}
            className={`flex flex-col items-center justify-center space-y-1 select-none outline-none focus:outline-none focus:ring-brand-red focus:ring-inset rounded-lg ${
              activeTab === 'Training' ? 'text-brand-red' : 'text-gray-400 hover:text-brand-charcoal'
            }`}
          >
            <GraduationCap size={20} strokeWidth={activeTab === 'Training' ? 2.5 : 2} aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wide">Training</span>
          </button>

          {/* Tab 4: Alerts */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'Alerts'}
            aria-label={unreadAlertsCount > 0 ? `Alerts tab, ${unreadAlertsCount} unread` : 'Alerts tab'}
            onClick={() => handleTabChange('Alerts')}
            className={`flex flex-col items-center justify-center space-y-1 relative select-none outline-none focus:outline-none focus:ring-brand-red focus:ring-inset rounded-lg ${
              activeTab === 'Alerts' ? 'text-brand-red' : 'text-gray-400 hover:text-brand-charcoal'
            }`}
          >
            <Bell size={20} strokeWidth={activeTab === 'Alerts' ? 2.5 : 2} aria-hidden="true" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-2 right-5 min-w-[15px] h-[15px] px-1 bg-brand-red border border-white text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse" aria-hidden="true">
                {unreadAlertsCount}
              </span>
            )}
            <span className="text-[10px] font-bold tracking-wide">Alerts</span>
          </button>

          {/* Tab 5: Profile */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'Profile'}
            aria-label="Profile tab"
            onClick={() => handleTabChange('Profile')}
            className={`flex flex-col items-center justify-center space-y-1 select-none outline-none focus:outline-none focus:ring-brand-red focus:ring-inset rounded-lg ${
              activeTab === 'Profile' ? 'text-brand-red' : 'text-gray-400 hover:text-brand-charcoal'
            }`}
          >
            <User size={20} strokeWidth={activeTab === 'Profile' ? 2.5 : 2} aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wide">Profile</span>
          </button>

        </nav>
      )}

      {/* TOAST CONTAINER */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
