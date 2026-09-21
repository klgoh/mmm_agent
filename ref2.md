Super App Product Requirements Document
1. Overview
This document defines the product requirements for a Super App for Mitsubishi Motors Malaysia that will launch with two mini apps:
1.	Sales Lead Management Mini App
2.	Sales Training Materials Mini App
The Super App is intended to provide a mobile-first experience for Sales Agents, while supporting Sales Managers through a separate web portal for management, approvals, monitoring, and reporting.
________________________________________
2. Product Vision
The Super App will serve as a unified digital platform for dealership sales operations and enable sales teams to:
•	Register and manage sales opportunities
•	Track leads through multiple sales stages
•	Perform approvals and oversight through a manager portal
•	Attach supporting documents before order submission to a third-party DMS system
•	Access training materials, product catalogues, and sales enablement resources
The long-term goal is to improve sales visibility, standardize lead handling, increase conversion efficiency, and support frontline sales capability.
________________________________________
3. Product Objectives
3.1 Business Objectives
•	Improve lead capture and opportunity tracking across the sales funnel
•	Increase visibility for Sales Managers into lead status, source, and conversion progress
•	Support faster and more consistent order handoff to the third-party DMS system
•	Provide easy access to training materials and product information for sales staff
•	Enable personalized tagging so sales teams can identify opportunity origin, referral source, campaign source, and other custom categories
•	Enable Sales Managers to assign opportunities to specific Sales Agents based on workload, territory, expertise, or business rules
3.2 User Objectives
•	Sales Agents should be able to create and manage opportunities quickly from mobile devices
•	Sales Managers should be able to review performance, approve submissions, and monitor pipeline health from a web portal
•	Users should be able to access training content from the same Super App environment
________________________________________
4. Scope
4.1 In Scope
•	Super App mobile application
•	Separate web portal for Sales Managers
•	Role-based access for Sales Agent and Sales Manager
•	Sales lead management workflow with opportunity stages
•	Opportunity creation, update, tracking, and tagging
•	File upload support before order submission to DMS
•	Manager approvals and review workflow
•	Sales dashboards and reporting
•	Training materials mini app
•	Product catalogue and supporting content for new car models
•	Generic third-party DMS integration
•	Opportunity assignment by Sales Managers to dedicated Sales Agents
•	Reassignment of opportunities when needed
•	Visibility of assigned owner for each opportunity
4.2 Out of Scope for Initial Release
•	Additional user roles beyond Sales Agent and Sales Manager
•	Advanced CRM automation rules
•	Marketing automation
•	Direct customer-facing lead submission
•	Complex workflow orchestration across multiple dealer entities
•	AI-based lead scoring
•	Offline-first capability unless later required
________________________________________
5. Target Platforms
5.1 Super App
•	Mobile application for Sales Agents
•	Access to training materials through the same mobile experience
5.2 Sales Manager Portal
•	Separate web portal for Sales Managers
•	Used for approvals, monitoring, and reporting dashboards
________________________________________
6. User Roles and Access
6.1 Sales Agent
Primary responsibilities:
•	Register new opportunities
•	Update opportunity details and status
•	Add personalized tags to opportunities
•	Upload supporting files
•	Submit opportunity for review or submission
•	View own opportunity list and progress
•	Access training materials
•	Receive opportunities assigned by Sales Managers
•	View assigned opportunities and ownership details
•	Update only the opportunities assigned to them, subject to business rules
6.2 Sales Manager
Primary responsibilities:
•	View team and individual opportunity data
•	Review pipeline and conversion performance
•	Approve or reject submissions
•	Monitor opportunity stages and throughput
•	Access dashboards and reports
•	View supporting documents and submission readiness
•	Assign opportunities to dedicated Sales Agents
•	Reassign opportunities when business conditions change
6.3 Role-Based Access Control
•	Sales Agents can only access and manage their own assigned opportunities, subject to business rules
•	Sales Managers can access data based on assigned team, branch, or region scope
•	Access to features is restricted based on role
________________________________________
7. Mini App 1: Sales Lead Management
7.1 Purpose
This mini app will support the end-to-end management of sales opportunities for Mitsubishi cars, from initial capture through conversion and handoff to the DMS system.
7.2 Sales Stages
The core pipeline stages are:
1.	Opportunity
2.	Prospect
3.	Hot Prospect
4.	Prospect Won
These stages represent the primary sales funnel progression.
7.3 Core Features
7.3.1 Opportunity Registration
Sales Agents shall be able to create a new opportunity record with basic information such as:
•	Customer name
•	Contact details
•	Preferred model / vehicle interest
•	Source of opportunity
•	Date created
•	Assigned Sales Agent
•	Branch or region, if applicable
•	Notes or remarks
7.3.2 Opportunity Tracking
Each opportunity shall maintain a history of changes, including:
•	Stage changes
•	Ownership changes
•	Notes and updates
•	Tag changes
•	File uploads
•	Approval actions
•	Submission status
•	Track assignment history, including who assigned the opportunity and when
•	Show current owner and previous owner if reassigned
7.3.3 Stage Management
The system shall allow Sales Agents and Managers, based on permissions, to move opportunities through the defined stages. Sales Managers may reassign opportunities before or after stage progression, based on workflow requirements
Stage transitions may be controlled by business rules. For example:
•	Opportunity → Prospect
•	Prospect → Hot Prospect
•	Hot Prospect → Prospect Won
7.3.4 Personalized Tagging
Sales Agents shall be able to create and apply personalized tags to opportunities to capture useful categorization such as:
•	Referral source
•	Campaign source
•	Walk-in customer
•	Social media lead
•	Event lead
•	Dealer referral
•	Fleet lead
•	Test drive source
•	Other custom tags
Tagging requirements:
•	Sales Agents can create their own tag values within allowed tagging rules
•	Tags can be applied to one or more opportunities
•	Tags should be searchable and reportable
•	Managers should be able to view tag usage for reporting purposes
7.3.5 File Uploads
Before submission to the third-party DMS system, the Sales Agent shall be able to upload supporting documents such as:
•	Customer identification documents
•	Order forms
•	Booking forms
•	Supporting approval documents
•	Other required attachments
File upload requirements:
•	Support multiple file attachments per opportunity
•	Show upload status and attachment list
•	Validate file type and size based on configured rules
•	Allow Sales Manager to review uploaded documents before approval or DMS submission
7.3.6 Approval Workflow
The application shall support approval steps managed by Sales Managers.
Possible approval actions:
•	Approve submission
•	Reject submission
•	Request revision or more information
•	Return to Sales Agent for update
The approval outcome shall be recorded in the audit trail.
7.3.7 Order Creation and DMS Submission
When an opportunity reaches Prospect Won, an order shall be created and prepared for submission to the third-party DMS system.
The system shall:
•	Generate order data from the winning opportunity
•	Validate required fields and attachments
•	Submit the order to the DMS system through an integration interface
•	Capture the DMS response and submission reference
•	Store submission status for tracking and reconciliation
7.3.8 Search and Filtering
Users shall be able to search and filter opportunities by:
•	Customer name
•	Opportunity stage
•	Tag
•	Date created
•	Assigned Sales Agent
•	Submission status
•	Model / vehicle interest
•	Source
7.3.9 Activity Timeline
Each opportunity should have a timeline view showing important actions and updates, including:
•	Creation date
•	Status changes
•	Comments or notes
•	Approvals
•	File uploads
•	DMS submission events

7.3.10 Opportunity Assignment
•	Sales Managers shall be able to assign an opportunity to a dedicated Sales Agent 
•	The system shall allow reassignment when required 
•	The system shall store assignment timestamp, assigned by, and assigned to details 
•	The assigned Sales Agent shall receive access to the opportunity immediately after assignment 
•	Assignment changes shall be recorded in the audit trail 
•	The system should prevent unauthorized users from changing ownership

________________________________________
8. Sales Manager Portal
8.1 Purpose
The Sales Manager Portal shall provide a separate web experience for management oversight, approvals, and reporting.
8.2 Core Features
8.2.1 Opportunity Oversight
Managers shall be able to view opportunities across their scope and monitor:
•	Total opportunities by stage
•	Conversion rate by Sales Agent or team
•	Opportunity aging
•	High-priority or hot prospects
•	Submission-ready orders
•	View unassigned opportunities
•	Assign opportunities to specific Sales Agents
•	Reassign opportunities when required
•	Monitor assigned workload by Sales Agent
8.2.2 Approval Review
Managers shall be able to:
•	Review opportunity details
•	Review uploaded documents
•	Approve or reject order submissions
•	Add comments and request changes
•	Review whether opportunity assignment is correct before approval
•	Reassign an opportunity if the current owner is not appropriate for the lead
8.2.3 Reporting Dashboards
The portal shall provide dashboards with useful sales metrics such as:
•	Opportunities created over time
•	Stage distribution
•	Won opportunities
•	Conversion funnel
•	Sales Agent performance
•	Source/tag performance
•	Pending approvals
•	DMS submission status
•	Opportunity assignment count by Sales Agent
•	Unassigned opportunities
•	Reassigned opportunities
•	Workload distribution by Sales Agent
•	Assignment aging and response time
8.2.4 Export and Reporting
The portal may support export of report data in common formats such as CSV or Excel, subject to business need.
________________________________________
9. Mini App 2: Sales Training Materials
9.1 Purpose
This mini app shall provide a convenient mobile-accessible library of sales enablement materials and product information.
9.2 Content Types
The mini app may include:
•	Product catalogues
•	New car model brochures
•	Feature comparison sheets
•	Launch announcements
•	Training documents
•	Sales scripts
•	Presentation slides
•	Videos or multimedia assets
•	FAQs
9.3 Core Features
9.3.1 Content Library
Users shall be able to browse available materials by category, such as:
•	New model launches
•	Existing model catalogues
•	Sales training
•	Promotions
•	Product knowledge
9.3.2 Search and Filter
Users shall be able to search materials by:
•	Model name
•	Document title
•	Category
•	Date published
•	Content type
9.3.3 Content Viewing
The app shall support viewing or downloading approved content files, subject to device capability and file type.
9.3.4 Content Management
An administration capability may be considered later for managing uploaded materials, publishing dates, and version control.
________________________________________
10. Functional Requirements
10.1 Sales Lead Management
•	Create opportunity
•	Edit opportunity
•	View opportunity details
•	Move opportunity between stages
•	Add notes and comments
•	Apply personal or shared tags
•	Upload files
•	Submit for approval
•	Create order upon won status
•	Send order to DMS
•	Track submission status
10.2 Sales Manager Portal
•	View all relevant opportunities
•	Filter and search records
•	Review approvals
•	View uploaded files
•	Access dashboards
•	Monitor team performance
•	Track DMS submissions
10.3 Training Materials
•	Browse materials
•	Search content
•	View / download materials
•	Organize by category
________________________________________
11. Data Requirements
11.1 Opportunity Record
Minimum data fields may include:
•	Opportunity ID
•	Customer name
•	Contact number / email
•	Assigned Sales Agent
•	Previous Assigned Agent
•	Manager / team assignment
•	Stage
•	Tags
•	Source of lead
•	Vehicle/model interest
•	Notes
•	Creation timestamp
•	Last updated timestamp
•	Approval status
•	DMS submission status
11.2 File Metadata
For each uploaded file, the system should capture:
•	File name
•	File type
•	File size
•	Upload timestamp
•	Uploaded by
•	Linked opportunity ID
•	Document category
11.3 Audit Trail
The system should maintain an audit trail for key actions such as:
•	Record creation
•	Stage updates
•	Tag changes
•	File uploads
•	Approval actions
•	DMS submission attempts
•	Status changes
•	Opportunity assignment
•	Opportunity reassignment
________________________________________
12. Integration Requirements
12.1 Third-Party DMS Integration
The Super App shall integrate with a generic third-party Dealer Management System (DMS) to send order information after a prospect is won.
Integration expectations:
•	Push order data to DMS
•	Receive response or reference number
•	Capture success / failure status
•	Support reconciliation of submitted orders
•	Handle validation errors gracefully
12.2 Future Integration Considerations
Potential future integrations may include:
•	Notification service
•	Analytics platform
•	Document management system
•	Identity provider / SSO
________________________________________
13. Reporting Requirements
13.1 Sales Agent View
Sales Agents may view:
•	Own opportunity list
•	Stage breakdown
•	Pending actions
•	Submission status
•	Personal performance summary
•	Assigned opportunities
•	New assignments received
13.2 Sales Manager View
Sales Managers may view:
•	Team pipeline summary
•	Opportunity count by stage
•	Won deals over time
•	Performance by agent
•	Source and tag analysis
•	Approval queue
•	DMS submission status
•	Assignment load by agent
•	Unassigned leads
•	Assignment turnaround time
________________________________________
14. Non-Functional Requirements
14.1 Security
•	Role-based access control shall be enforced
•	Users may only access authorized data based on role and scope
•	Sensitive customer and document data shall be protected
14.2 Auditability
•	Key actions shall be logged for traceability
•	Manager approvals shall be recorded
14.3 Performance
•	The mobile app should provide a responsive user experience
•	Common operations such as searching and viewing opportunities should perform efficiently under typical usage
14.4 Usability
•	The interface should be simple and optimized for field sales use
•	The mobile app should minimize the number of steps required to register or update an opportunity
________________________________________
15. Assumptions
•	Only two roles are required for the initial release: Sales Agent and Sales Manager
•	The first release will be mobile-first for Sales Agents
•	The manager experience will be delivered through a separate web portal
•	DMS integration will be handled through a generic third-party interface
•	Personalized tagging will be configurable and extensible for Sales Agents
________________________________________
