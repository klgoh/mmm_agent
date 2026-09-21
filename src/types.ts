export interface Note {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

// PRD Section 7.2: 4 core sales stages + Pending Approval
export type LeadStatus =
  | 'Opportunity'      // Initial unqualified stage (NEW)
  | 'Prospect'
  | 'Hot Prospect'
  | 'Prospect Won'
  | 'Pending Approval'; // For manager review (NEW)

// PRD Section 7.3.6: Approval workflow status
export type ApprovalStatus =
  | 'Not Submitted'
  | 'Pending Review'
  | 'Revision Requested'
  | 'Approved'
  | 'Rejected';

// PRD Section 7.3.7: DMS submission status
export type DmsSubmissionStatus =
  | 'Not Submitted'
  | 'Pending'
  | 'Submitted'
  | 'Failed'
  | 'Reconciled';

// PRD Section 11.3: Structured audit trail entry
export type AuditTrailType =
  | 'created'
  | 'stage_changed'
  | 'tag_added'
  | 'tag_removed'
  | 'file_uploaded'
  | 'approval_submitted'
  | 'approval_approved'
  | 'approval_rejected'
  | 'approval_revision_requested'
  | 'dms_submitted'
  | 'dms_failed'
  | 'dms_succeeded'
  | 'assigned'
  | 'reassigned';

export interface AuditTrailEntry {
  id: string;
  type: AuditTrailType;
  description: string;
  actor: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

// Toast notification for UI feedback
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastNotification {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// PRD Section 7.3.4: Tag definitions for suggested tags
export type TagCategory = 'source' | 'referral' | 'campaign' | 'custom';

export interface TagDefinition {
  id: string;
  name: string;
  category: TagCategory;
  color?: string;
}

// PRD Section 11.1: Complete Opportunity record
export interface Opportunity {
  // Core identification
  id: string;
  name: string;
  phone: string;
  email: string;

  // Vehicle interest
  model: string;
  variant: string;
  color: string;

  // Lead source & tracking
  source: string;
  expectedClosingDate?: string;
  createdDate: string;
  status: LeadStatus;
  tags: string[];
  notes: Note[];

  // Sale details
  chassisNo?: string;
  saleValue?: number;

  // NEW: Assignment fields (PRD Section 11.1)
  assignedAgent: string;
  assignedAgentId: string;
  previousAssignedAgent?: string;
  branch: string;
  lastUpdated: string;

  // NEW: Approval status (PRD Section 11.1)
  approvalStatus: ApprovalStatus;
  approvalNotes?: string;

  // NEW: DMS integration (PRD Section 7.3.7)
  dmsStatus: DmsSubmissionStatus;
  dmsReferenceNumber?: string;
  dmsErrorMessage?: string;
  dmsSubmittedAt?: string;

  // NEW: Structured audit trail (PRD Section 11.3)
  auditTrail: AuditTrailEntry[];

  // JPJ Registration details (existing)
  registrationProgress?: {
    bookingConfirmed: { checked: boolean; date: string };
    loanApproved: { checked: boolean; date: string; bank?: string };
    jpjRegistration: { checked: boolean; status: 'Pending' | 'Processing' | 'Completed'; date?: string };
    readyForDelivery: { checked: boolean; date?: string };
  };
  jpjDetails?: {
    requestedNumberPlate: string;
    targetRegistrationDate: string;
    eDaftarReferenceId: string;
    status: 'Draft' | 'Processing' | 'Submitted';
  };
  documents?: {
    icCopy: 'Verified' | 'Processing' | 'Required' | 'Pending' | 'Missing';
    drivingLicense: 'Verified' | 'Processing' | 'Required' | 'Pending' | 'Missing';
    incomeProof: 'Verified' | 'Processing' | 'Required' | 'Pending' | 'Missing';
    insuranceCover: 'Verified' | 'Processing' | 'Required' | 'Pending' | 'Missing';
    jpjFormK3: 'Verified' | 'Processing' | 'Required' | 'Pending' | 'Missing';
  };
}

export interface DmsSubmission {
  id: string;
  leadName: string;
  model: string;
  status: 'PENDING' | 'REJECTED' | 'COMPLETED' | 'IN REVIEW';
  date: string;
  errorMessage?: string;
}

export interface SystemAlert {
  id: string;
  title: string;
  description: string;
  type: 'failed' | 'assigned' | 'requested' | 'info';
  timestamp: string;
  read: boolean;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  status: 'Completed' | 'Up Next' | 'Locked';
  descriptionDetails?: string;
}

export interface Course {
  id: string;
  title: string;
  badgeLevel: string;
  lessonsCount: number;
  description: string;
  lessons: Lesson[];
  progressPercent: number;
  techSpecs: {
    engine: string;
    drivetrain: string;
    payload: string;
    safety: string;
  };
}

// Suggested tags per PRD Section 7.3.4
export const SUGGESTED_TAGS: TagDefinition[] = [
  { id: 'tag-walkin', name: 'Walk-in Customer', category: 'source' },
  { id: 'tag-social', name: 'Social Media Lead', category: 'source' },
  { id: 'tag-event', name: 'Event Lead', category: 'source' },
  { id: 'tag-roadshow', name: 'Roadshow', category: 'source' },
  { id: 'tag-referral', name: 'Referral Source', category: 'referral' },
  { id: 'tag-dealer', name: 'Dealer Referral', category: 'referral' },
  { id: 'tag-campaign', name: 'Campaign Source', category: 'campaign' },
  { id: 'tag-fleet', name: 'Fleet Lead', category: 'custom' },
  { id: 'tag-testdrive', name: 'Test Drive Source', category: 'custom' },
  { id: 'tag-hot', name: 'Hot Lead', category: 'custom' },
  { id: 'tag-finance', name: 'Needs Finance', category: 'custom' },
  { id: 'tag-tradein', name: 'Trade-in', category: 'custom' },
];
