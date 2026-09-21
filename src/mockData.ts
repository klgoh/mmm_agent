import {
  Opportunity,
  DmsSubmission,
  SystemAlert,
  Course,
  AuditTrailEntry,
  LeadStatus,
  ApprovalStatus,
  DmsSubmissionStatus,
} from './types';

// Helper to create audit trail entries
const createAuditEntry = (
  id: string,
  type: AuditTrailEntry['type'],
  description: string,
  actor: string,
  timestamp: string,
  details?: Record<string, unknown>
): AuditTrailEntry => ({
  id,
  type,
  description,
  actor,
  timestamp,
  details,
});

// ============================================
// OPPORTUNITIES (Leads) with complete PRD fields
// ============================================
export const INITIAL_LEADS: Opportunity[] = [
  // 1. Hot Prospect - Daniel Lee
  {
    id: 'OPP-2023-8842',
    name: 'Daniel Lee',
    phone: '+60 12-345 6789',
    email: 'd.lee@example.com',
    model: 'Mitsubishi Xpander',
    variant: 'Premium Variant',
    color: 'Quartz White Pearl',
    source: 'Roadshow Event',
    expectedClosingDate: '2023-11-15',
    createdDate: 'Oct 24, 2023',
    status: 'Hot Prospect',
    tags: ['Hot Lead', 'Xpander Cross'],
    notes: [
      {
        id: 'note-1',
        text: 'Customer visited the PJ branch today. Very interested in the Xpander Cross variant. Requested a test drive for next weekend. Need to follow up on trade-in valuation for his current Honda City.',
        author: 'Ahmad Razali',
        timestamp: '2 hours ago',
      },
    ],
    chassisNo: 'MMBTNCK10ME004',
    saleValue: 99980.0,

    // NEW: Assignment fields
    assignedAgent: 'Ahmad Razali',
    assignedAgentId: 'agent-001',
    branch: 'Petaling Jaya',
    lastUpdated: '2 hours ago',

    // NEW: Approval status
    approvalStatus: 'Not Submitted',

    // NEW: DMS status
    dmsStatus: 'Not Submitted',

    // NEW: Audit trail
    auditTrail: [
      createAuditEntry('audit-1', 'created', 'Opportunity created from Roadshow Event lead', 'Sarah Jenkins', 'Oct 24, 2023', { source: 'Roadshow Event' }),
      createAuditEntry('audit-2', 'assigned', 'Assigned to Ahmad Razali', 'Sarah Jenkins', 'Oct 24, 2023', { assignedTo: 'Ahmad Razali' }),
      createAuditEntry('audit-3', 'stage_changed', 'Stage changed from Prospect to Hot Prospect', 'Ahmad Razali', 'Oct 25, 2023', { from: 'Prospect', to: 'Hot Prospect' }),
    ],

    // Existing registration fields
    registrationProgress: {
      bookingConfirmed: { checked: true, date: 'Oct 12, 2023' },
      loanApproved: { checked: true, date: 'Oct 18, 2023', bank: 'Maybank Auto Finance' },
      jpjRegistration: { checked: false, status: 'Processing' },
      readyForDelivery: { checked: false },
    },
    jpjDetails: {
      requestedNumberPlate: 'VHM 1234',
      targetRegistrationDate: '2023-10-25',
      eDaftarReferenceId: '',
      status: 'Processing',
    },
    documents: {
      icCopy: 'Verified',
      drivingLicense: 'Verified',
      incomeProof: 'Required',
      insuranceCover: 'Pending',
      jpjFormK3: 'Missing',
    },
  },

  // 2. Prospect - Nur Aisyah
  {
    id: 'OPP-2023-9251',
    name: 'Nur Aisyah',
    phone: '+60 19-876 5432',
    email: 'nur.aisyah@example.com',
    model: 'Mitsubishi Triton',
    variant: 'Athlete VGT',
    color: 'Jet Black Mica',
    source: 'Walk-in',
    expectedClosingDate: '2023-11-20',
    createdDate: 'Oct 23, 2023',
    status: 'Prospect',
    tags: ['Needs Finance', 'Walk-in'],
    notes: [
      {
        id: 'note-2',
        text: 'Inquired about financing terms. Requesting 90% loan with 9 years tenor. Prefers the Athlete variant in black.',
        author: 'Ahmad Razali',
        timestamp: '1 day ago',
      },
    ],

    // NEW: Assignment fields
    assignedAgent: 'Ahmad Razali',
    assignedAgentId: 'agent-001',
    branch: 'Petaling Jaya',
    lastUpdated: '1 day ago',

    // NEW: Approval status
    approvalStatus: 'Not Submitted',

    // NEW: DMS status
    dmsStatus: 'Not Submitted',

    // NEW: Audit trail
    auditTrail: [
      createAuditEntry('audit-4', 'created', 'Opportunity created from Walk-in', 'Ahmad Razali', 'Oct 23, 2023', { source: 'Walk-in' }),
      createAuditEntry('audit-5', 'tag_added', 'Tag "Needs Finance" added', 'Ahmad Razali', 'Oct 23, 2023', { tag: 'Needs Finance' }),
    ],
  },

  // 3. Prospect Won - Kumar Raj (Submitted to DMS)
  {
    id: 'OPP-2023-7741',
    name: 'Kumar Raj',
    phone: '+60 17-642 9841',
    email: 'kumar.raj@example.com',
    model: 'Mitsubishi Xforce',
    variant: 'Ultimate',
    color: 'Energetic Yellow',
    source: 'Referral',
    expectedClosingDate: '2023-10-30',
    createdDate: 'Oct 20, 2023',
    status: 'Prospect Won',
    tags: ['Referral', 'Fast Delivery'],
    notes: [
      {
        id: 'note-3',
        text: 'Booking confirmed and processed. Deposit fully cleared. Customer is very excited about the hands-free power tailgate.',
        author: 'Ahmad Razali',
        timestamp: '3 days ago',
      },
    ],
    chassisNo: 'MMBTNEK30ME222',
    saleValue: 115000.0,

    // NEW: Assignment fields
    assignedAgent: 'Ahmad Razali',
    assignedAgentId: 'agent-001',
    branch: 'Petaling Jaya',
    lastUpdated: '3 days ago',

    // NEW: Approval status
    approvalStatus: 'Approved',
    approvalNotes: 'All documents verified. Approved for DMS submission.',

    // NEW: DMS status
    dmsStatus: 'Submitted',
    dmsReferenceNumber: 'DMS-2023-1075',
    dmsSubmittedAt: 'Oct 28, 2023',

    // NEW: Audit trail
    auditTrail: [
      createAuditEntry('audit-6', 'created', 'Opportunity created from Referral', 'Sarah Jenkins', 'Oct 20, 2023', { source: 'Referral' }),
      createAuditEntry('audit-7', 'assigned', 'Assigned to Ahmad Razali', 'Sarah Jenkins', 'Oct 20, 2023', { assignedTo: 'Ahmad Razali' }),
      createAuditEntry('audit-8', 'stage_changed', 'Stage changed from Prospect to Hot Prospect', 'Ahmad Razali', 'Oct 22, 2023', { from: 'Prospect', to: 'Hot Prospect' }),
      createAuditEntry('audit-9', 'stage_changed', 'Stage changed from Hot Prospect to Prospect Won', 'Ahmad Razali', 'Oct 25, 2023', { from: 'Hot Prospect', to: 'Prospect Won' }),
      createAuditEntry('audit-10', 'approval_submitted', 'Submitted for manager approval', 'Ahmad Razali', 'Oct 26, 2023', {}),
      createAuditEntry('audit-11', 'approval_approved', 'Approved by Manager Sarah Jenkins', 'Sarah Jenkins', 'Oct 27, 2023', {}),
      createAuditEntry('audit-12', 'dms_submitted', 'Submitted to DMS. Reference: DMS-2023-1075', 'Ahmad Razali', 'Oct 28, 2023', { dmsRef: 'DMS-2023-1075' }),
    ],

    // Existing registration fields
    registrationProgress: {
      bookingConfirmed: { checked: true, date: 'Oct 20, 2023' },
      loanApproved: { checked: true, date: 'Oct 22, 2023', bank: 'CIMB Bank' },
      jpjRegistration: { checked: true, status: 'Completed', date: 'Oct 25, 2023' },
      readyForDelivery: { checked: true, date: 'Oct 28, 2023' },
    },
    jpjDetails: {
      requestedNumberPlate: 'WXY 9988',
      targetRegistrationDate: '2023-10-25',
      eDaftarReferenceId: 'ED-998842-MALWAY',
      status: 'Submitted',
    },
    documents: {
      icCopy: 'Verified',
      drivingLicense: 'Verified',
      incomeProof: 'Verified',
      insuranceCover: 'Verified',
      jpjFormK3: 'Verified',
    },
  },

  // 4. NEW: Opportunity (initial stage) - Tan Siew Ling
  {
    id: 'OPP-2023-9901',
    name: 'Tan Siew Ling',
    phone: '+60 16-555 1234',
    email: 'siew.ling.tan@example.com',
    model: 'Mitsubishi Pajero Sport',
    variant: 'GT 4x4',
    color: 'Deep Bronze Metallic',
    source: 'Social Media Lead',
    expectedClosingDate: '2023-12-05',
    createdDate: 'Oct 28, 2023',
    status: 'Opportunity',
    tags: ['Social Media Lead'],
    notes: [],

    // NEW: Assignment fields
    assignedAgent: 'Ahmad Razali',
    assignedAgentId: 'agent-001',
    branch: 'Petaling Jaya',
    lastUpdated: '6 hours ago',

    // NEW: Approval status
    approvalStatus: 'Not Submitted',

    // NEW: DMS status
    dmsStatus: 'Not Submitted',

    // NEW: Audit trail
    auditTrail: [
      createAuditEntry('audit-13', 'created', 'Opportunity created from Social Media enquiry', 'System', 'Oct 28, 2023', { source: 'Facebook Ad' }),
      createAuditEntry('audit-14', 'assigned', 'Auto-assigned to Ahmad Razali', 'System', 'Oct 28, 2023', { assignedTo: 'Ahmad Razali' }),
    ],
  },

  // 5. NEW: Opportunity (initial stage) - Mohd Hafiz
  {
    id: 'OPP-2023-9902',
    name: 'Mohd Hafiz',
    phone: '+60 19-777 8888',
    email: 'mohd.hafiz@example.com',
    model: 'Mitsubishi Outlander',
    variant: '2.4L AWD',
    color: 'White Diamond',
    source: 'Website Enquiry',
    expectedClosingDate: '2023-11-28',
    createdDate: 'Oct 27, 2023',
    status: 'Opportunity',
    tags: [],
    notes: [],

    // NEW: Assignment fields
    assignedAgent: 'Sarah Jenkins',
    assignedAgentId: 'agent-002',
    branch: 'Petaling Jaya',
    lastUpdated: '1 day ago',

    // NEW: Approval status
    approvalStatus: 'Not Submitted',

    // NEW: DMS status
    dmsStatus: 'Not Submitted',

    // NEW: Audit trail
    auditTrail: [
      createAuditEntry('audit-15', 'created', 'Opportunity created from Website Enquiry', 'System', 'Oct 27, 2023', { source: 'Website' }),
      createAuditEntry('audit-16', 'assigned', 'Assigned to Sarah Jenkins by Manager', 'Manager', 'Oct 27, 2023', { assignedTo: 'Sarah Jenkins' }),
    ],
  },

  // 6. NEW: Pending Approval - Lim Mei Chen
  {
    id: 'OPP-2023-9850',
    name: 'Lim Mei Chen',
    phone: '+60 12-999 0000',
    email: 'mei.chen.lim@example.com',
    model: 'Mitsubishi Xpander',
    variant: 'Standard',
    color: 'Silver Metallic',
    source: 'Dealer Referral',
    expectedClosingDate: '2023-10-30',
    createdDate: 'Oct 15, 2023',
    status: 'Pending Approval',
    tags: ['Dealer Referral', 'Fast Track'],
    notes: [
      {
        id: 'note-4',
        text: 'Referred from another dealer. Special pricing approval requested.',
        author: 'Sarah Jenkins',
        timestamp: '5 hours ago',
      },
    ],
    chassisNo: 'MMBTNCK10ME099',
    saleValue: 92000.0,

    // NEW: Assignment fields
    assignedAgent: 'Sarah Jenkins',
    assignedAgentId: 'agent-002',
    previousAssignedAgent: 'Ahmad Razali',
    branch: 'Petaling Jaya',
    lastUpdated: '5 hours ago',

    // NEW: Approval status
    approvalStatus: 'Pending Review',
    approvalNotes: 'Special discount of RM3,000 requested. Waiting for manager review.',

    // NEW: DMS status
    dmsStatus: 'Not Submitted',

    // NEW: Audit trail
    auditTrail: [
      createAuditEntry('audit-17', 'created', 'Opportunity created from Dealer Referral', 'Ahmad Razali', 'Oct 15, 2023', { source: 'Dealer Referral' }),
      createAuditEntry('audit-18', 'assigned', 'Assigned to Ahmad Razali', 'Manager', 'Oct 15, 2023', { assignedTo: 'Ahmad Razali' }),
      createAuditEntry('audit-19', 'stage_changed', 'Prospect → Hot Prospect', 'Ahmad Razali', 'Oct 20, 2023', { from: 'Prospect', to: 'Hot Prospect' }),
      createAuditEntry('audit-20', 'stage_changed', 'Hot Prospect → Prospect Won', 'Ahmad Razali', 'Oct 25, 2023', { from: 'Hot Prospect', to: 'Prospect Won' }),
      createAuditEntry('audit-21', 'reassigned', 'Reassigned from Ahmad Razali to Sarah Jenkins (special pricing case)', 'Manager', 'Oct 26, 2023', { from: 'Ahmad Razali', to: 'Sarah Jenkins', reason: 'Special pricing request' }),
      createAuditEntry('audit-22', 'approval_submitted', 'Submitted for approval with RM3,000 discount request', 'Sarah Jenkins', 'Oct 28, 2023', { discountRequested: 3000 }),
    ],

    // Documents
    documents: {
      icCopy: 'Verified',
      drivingLicense: 'Verified',
      incomeProof: 'Verified',
      insuranceCover: 'Verified',
      jpjFormK3: 'Verified',
    },
  },

  // 7. DMS Failed - Chong Wei Ming
  {
    id: 'OPP-2023-9700',
    name: 'Chong Wei Ming',
    phone: '+60 16-222 3333',
    email: 'wei.ming@example.com',
    model: 'Mitsubishi Triton',
    variant: 'Premium',
    color: 'Graphite Gray',
    source: 'Test Drive',
    expectedClosingDate: '2023-10-25',
    createdDate: 'Oct 10, 2023',
    status: 'Prospect Won',
    tags: ['Test Drive Source'],
    notes: [],

    // NEW: Assignment fields
    assignedAgent: 'Ahmad Razali',
    assignedAgentId: 'agent-001',
    branch: 'Petaling Jaya',
    lastUpdated: '2 days ago',

    // NEW: Approval status
    approvalStatus: 'Approved',

    // NEW: DMS status - FAILED
    dmsStatus: 'Failed',
    dmsReferenceNumber: 'DMS-2023-1079',
    dmsErrorMessage: 'Invalid chassis number format. Please verify and resubmit.',
    dmsSubmittedAt: 'Oct 26, 2023',

    // NEW: Audit trail
    auditTrail: [
      createAuditEntry('audit-23', 'created', 'Created from Test Drive', 'Ahmad Razali', 'Oct 10, 2023', { source: 'Test Drive' }),
      createAuditEntry('audit-24', 'dms_submitted', 'Submitted to DMS', 'Ahmad Razali', 'Oct 26, 2023', { dmsRef: 'DMS-2023-1079' }),
      createAuditEntry('audit-25', 'dms_failed', 'DMS submission failed: Invalid chassis number', 'System', 'Oct 27, 2023', { error: 'Invalid chassis number format' }),
    ],
  },
];

// ============================================
// DMS SUBMISSIONS (separate list view)
// ============================================
export const INITIAL_DMS_SUBMISSIONS: DmsSubmission[] = [
  {
    id: 'DMS-1082',
    leadName: 'Daniel Lee',
    model: 'Mitsubishi Xpander',
    status: 'IN REVIEW',
    date: 'Oct 24, 2023',
  },
  {
    id: 'DMS-1079',
    leadName: 'Chong Wei Ming',
    model: 'Mitsubishi Triton',
    status: 'REJECTED',
    date: 'Oct 23, 2023',
    errorMessage: 'Please re-upload the customer\'s proof of income.',
  },
  {
    id: 'DMS-1075',
    leadName: 'Kumar Raj',
    model: 'Mitsubishi Outlander',
    status: 'COMPLETED',
    date: 'Oct 21, 2023',
  },
  {
    id: 'DMS-1074',
    leadName: 'Wong Wei Kiat',
    model: 'Mitsubishi Xpander',
    status: 'COMPLETED',
    date: 'Oct 20, 2023',
  },
];

// ============================================
// ALERTS / NOTIFICATIONS
// ============================================
export const INITIAL_ALERTS: SystemAlert[] = [
  {
    id: 'alert-1',
    title: 'DMS Submission Failed (Action Required)',
    description: 'The sales order for Chong Wei Ming (Triton) failed to sync with the central DMS due to an invalid chassis code. Please correct the chassis number and retry.',
    type: 'failed',
    timestamp: 'Just now',
    read: false,
  },
  {
    id: 'alert-2',
    title: 'New Lead Assigned',
    description: 'A new warm lead for a Pajero Sport has been assigned to your queue. Source: Social Media Lead (Petaling Jaya catchment area).',
    type: 'assigned',
    timestamp: '10m ago',
    read: false,
  },
  {
    id: 'alert-3',
    title: 'Approval Requested by Manager',
    description: 'Manager Sarah Jenkins has requested final approval on the discount structure for Lim Mei Chen\'s Xpander purchase (Dealer Referral).',
    type: 'requested',
    timestamp: '2h ago',
    read: false,
  },
  {
    id: 'alert-4',
    title: 'New Training Module Available',
    description: 'The updated Q3 financing guidelines module is now available. Please complete by Friday afternoon (mandatory criteria compliance review).',
    type: 'info',
    timestamp: '1d ago',
    read: true,
  },
];

// ============================================
// TRAINING COURSES
// ============================================
export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-triton',
    title: 'Master the Mitsubishi Triton',
    badgeLevel: 'Triton Expert',
    lessonsCount: 4,
    description: 'Dive deep into the ultimate sales guide for the new Mitsubishi Triton Athlete 2024. This comprehensive module covers everything from its aggressive new styling to the advanced Bi-Turbo diesel engine capabilities.',
    progressPercent: 25,
    techSpecs: {
      engine: '2.4L Bi-Turbo',
      drivetrain: 'Super Select 4WD-II',
      payload: 'Up to 1000kg',
      safety: '7 Airbags, ADAS',
    },
    lessons: [
      {
        id: 'lesson-triton-1',
        number: 1,
        title: 'Introduction to Triton 2024',
        status: 'Completed',
        descriptionDetails: 'Overview & Key Selling Points',
      },
      {
        id: 'lesson-triton-2',
        number: 2,
        title: 'Engine & Performance',
        status: 'Up Next',
        descriptionDetails: 'Bi-Turbo Diesel Deep Dive',
      },
      {
        id: 'lesson-triton-3',
        number: 3,
        title: 'Safety Tech & Features',
        status: 'Locked',
        descriptionDetails: 'ADAS & Structural Integrity',
      },
      {
        id: 'lesson-triton-4',
        number: 4,
        title: 'Sales Techniques',
        status: 'Locked',
        descriptionDetails: 'Handling Objections & Competitor Comparisons',
      },
    ],
  },
];
