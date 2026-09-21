Below is a detailed **Stitch / Figma generation prompt** you can paste into an AI UI builder. It is based on the Mitsubishi Motors Malaysia Super App PRD, including the mobile-first Sales Agent app, Sales Manager web portal, sales lead workflow, DMS submission, tagging, file uploads, approvals, dashboards, and training materials mini app. 

---

## Stitch / Figma Prompt

Create a modern, polished, production-ready UI/UX design for a **Mitsubishi Motors Malaysia Sales Super App**. The application is built for dealership sales operations and should include two main experiences:

1. **Mobile Super App for Sales Agents**
2. **Web Portal for Sales Managers**

The visual style should feel corporate, automotive, premium, and practical for daily dealership use. Use Mitsubishi Motors Malaysia branding inspiration with a clean white background, strong red accents, dark charcoal text, light grey surfaces, rounded cards, clear hierarchy, and a professional enterprise SaaS feel. The interface should be simple, fast, and optimized for field sales users.

Use a design language that combines:

* Mitsubishi-inspired red primary action color
* White and light grey backgrounds
* Dark charcoal navigation and text
* Clean dashboard cards
* Rounded components
* Mobile-first layouts
* Clear status badges
* Automotive product imagery placeholders
* Simple icons for leads, documents, approvals, training, reports, and vehicles

---

# Product Name

**Mitsubishi Motors Malaysia Sales Super App**

Tagline:
**Manage leads, track opportunities, submit orders, and access sales training in one unified platform.**

---

# Core User Roles

Design the app around two roles:

## 1. Sales Agent

Sales Agents use the mobile app to:

* Create new sales opportunities
* View assigned opportunities
* Update opportunity stages
* Add notes and tags
* Upload customer and order documents
* Submit won prospects for manager approval
* Track DMS submission status
* Access training materials and product catalogues

## 2. Sales Manager

Sales Managers use a separate web portal to:

* View team pipeline performance
* Monitor opportunities by stage
* Assign and reassign opportunities to Sales Agents
* Review uploaded documents
* Approve, reject, or request revisions
* Track DMS submissions
* View reporting dashboards
* Monitor workload distribution

---

# Mobile App: Sales Agent Experience

Create a complete mobile app prototype with the following screens.

---

## 1. Mobile Login Screen

Design a clean login screen with:

* Mitsubishi Motors Malaysia logo area
* Welcome message: “Welcome to MMM Sales Super App”
* Email / Staff ID input
* Password input
* Login button
* Forgot password link
* Optional role indicator after login

Visual direction:

* White background
* Red primary login button
* Subtle automotive abstract background pattern
* Secure enterprise feel

---

## 2. Mobile Home Dashboard

Create a Sales Agent home dashboard showing:

Header:

* Greeting: “Good morning, Ahmad”
* Branch name: “Petaling Jaya Branch”
* Notification bell
* Profile avatar

Summary cards:

* Total Opportunities
* New Assignments
* Hot Prospects
* Pending Approval
* Prospect Won
* DMS Pending

Quick actions:

* Create Opportunity
* Upload Documents
* View Training
* Search Leads

Main sections:

* “My Pipeline”
* “Recently Assigned”
* “Pending Actions”
* “Training Highlights”

Include a bottom navigation bar:

* Home
* Leads
* Training
* Notifications
* Profile

---

## 3. Opportunity List Screen

Design a searchable opportunity list for Sales Agents.

Features:

* Search bar: “Search customer, model, tag…”
* Filter chips:

  * All
  * Opportunity
  * Prospect
  * Hot Prospect
  * Prospect Won
  * Pending Approval
* Sort dropdown:

  * Newest
  * Oldest
  * Stage
  * Last Updated

Opportunity card should show:

* Customer name
* Preferred vehicle model
* Current stage badge
* Source tag
* Assigned Sales Agent
* Last updated date
* Submission status
* Quick action icon

Example cards:

* “Daniel Lee — Xpander — Hot Prospect — Event Lead”
* “Nur Aisyah — Triton — Prospect — Walk-in”
* “Kumar Raj — Xforce — Prospect Won — Referral”

Use strong visual stage badges:

* Opportunity: grey / blue
* Prospect: blue
* Hot Prospect: orange / red
* Prospect Won: green
* Pending Approval: yellow

---

## 4. Create Opportunity Screen

Design a mobile form for creating a new opportunity.

Fields:

* Customer name
* Contact number
* Email address
* Preferred model / vehicle interest
* Source of opportunity
* Branch / region
* Assigned Sales Agent
* Tags
* Notes / remarks

Use sections:

* Customer Details
* Vehicle Interest
* Lead Source
* Tags & Notes

Include:

* Save Draft button
* Create Opportunity button
* Required field indicators
* Clear mobile-friendly input spacing

Vehicle model dropdown examples:

* Mitsubishi Xpander
* Mitsubishi Triton
* Mitsubishi Xforce
* Mitsubishi Pajero Sport
* Mitsubishi Outlander

---

## 5. Opportunity Detail Screen

Create a detailed opportunity profile page.

Top section:

* Customer name
* Contact information
* Preferred model
* Current stage badge
* Assigned Sales Agent
* Branch / region

Action buttons:

* Update Stage
* Add Note
* Upload File
* Submit for Approval

Tabbed content:

1. Overview
2. Timeline
3. Documents
4. Approval
5. DMS Status

Overview tab should show:

* Opportunity ID
* Source
* Tags
* Created date
* Last updated
* Previous assigned agent, if reassigned
* Notes

Timeline tab should show activity events:

* Opportunity created
* Assigned to agent
* Stage changed
* Tag added
* File uploaded
* Manager requested revision
* Approved for DMS submission
* Submitted to DMS

Documents tab should show:

* File name
* File type
* File size
* Upload date
* Uploaded by
* Document category
* Upload status

Approval tab should show:

* Approval status
* Manager comment
* Approve / reject history
* Revision request status

DMS Status tab should show:

* Submission status
* DMS reference number
* Last submission attempt
* Success / failed status
* Validation error message, if any

---

## 6. Stage Update Modal

Create a modal or bottom sheet for updating opportunity stage.

Current stage:

* Opportunity

Next available stage:

* Prospect

Stage workflow:

* Opportunity → Prospect → Hot Prospect → Prospect Won

Include:

* Stage dropdown
* Notes field
* Confirmation button
* Warning if required fields are missing

When moving to Prospect Won, show:

* Required documents checklist
* Submit for Manager Approval button

---

## 7. Tag Management UI

Design personalized tagging interaction.

Features:

* Add tag field
* Suggested tags
* Custom tag creation
* Search existing tags
* Applied tag chips

Example tags:

* Referral Source
* Campaign Source
* Walk-in Customer
* Social Media Lead
* Event Lead
* Dealer Referral
* Fleet Lead
* Test Drive Source

Design tags as small rounded chips with subtle colors.

---

## 8. File Upload Screen

Create a mobile document upload screen for an opportunity.

Document categories:

* Customer Identification
* Order Form
* Booking Form
* Supporting Approval Document
* Other Attachment

Features:

* Upload from device
* Camera scan option
* Multiple attachments
* Upload progress
* File validation message
* File type and size limit indicator
* Attachment list
* Replace / delete file action

Include a checklist:

* Customer ID uploaded
* Booking form uploaded
* Order form uploaded
* Supporting documents uploaded

---

## 9. Approval Submission Screen

Design a final review screen before submission to Sales Manager.

Sections:

* Customer details summary
* Vehicle model summary
* Uploaded document checklist
* Notes to manager
* Validation status

CTA:

* Submit for Approval

Show status after submission:

* “Pending Manager Review”
* “Revision Requested”
* “Approved”
* “Rejected”

---

## 10. Training Materials Mini App

Create a mobile training library experience.

Main training screen:

* Search bar
* Category cards
* Recently added
* Featured model launch
* Continue learning

Categories:

* New Model Launches
* Existing Model Catalogues
* Sales Training
* Promotions
* Product Knowledge
* FAQs
* Videos
* Sales Scripts

Content card should show:

* Thumbnail
* Title
* Category
* Content type badge: PDF, Video, Slides, FAQ
* Date published
* Download / View button

Create detail screen for a training item:

* Title
* Description
* Content type
* Version / date
* View button
* Download button
* Related materials

Use vehicle imagery placeholders and brochure-style thumbnails.

---

# Web Portal: Sales Manager Experience

Create a responsive desktop web portal for Sales Managers.

---

## 1. Web Login Screen

Design a clean enterprise login page.

Include:

* Mitsubishi Motors Malaysia logo
* “Sales Manager Portal”
* Email / Staff ID
* Password
* Login button
* Forgot password link

---

## 2. Manager Dashboard

Create a dashboard layout with a left sidebar and top navigation.

Sidebar menu:

* Dashboard
* Opportunities
* Approvals
* Assignments
* Reports
* DMS Submissions
* Training Materials
* Settings

Top bar:

* Search
* Notifications
* Manager profile
* Branch / region selector

Dashboard cards:

* Total Opportunities
* Opportunities by Stage
* Hot Prospects
* Prospect Won
* Pending Approvals
* DMS Submission Pending
* Unassigned Opportunities
* Reassigned Opportunities

Charts:

* Conversion Funnel
* Opportunities Created Over Time
* Stage Distribution
* Agent Performance
* Source / Tag Performance
* Assignment Workload by Agent
* Assignment Aging

Use clean charts, cards, tables, and red highlights.

---

## 3. Opportunity Management Table

Create a manager table view with:

Columns:

* Opportunity ID
* Customer Name
* Vehicle Model
* Stage
* Source
* Tags
* Assigned Agent
* Previous Agent
* Branch
* Created Date
* Last Updated
* Approval Status
* DMS Status
* Actions

Filters:

* Stage
* Agent
* Branch / region
* Source
* Tag
* Date range
* Submission status
* Approval status

Actions:

* View details
* Assign
* Reassign
* Approve
* Request revision
* Export

---

## 4. Assignment Management Screen

Create a screen for assigning opportunities to Sales Agents.

Sections:

* Unassigned Opportunities table
* Sales Agent workload panel
* Assignment recommendation area
* Assignment history

Sales Agent workload cards should show:

* Agent name
* Current opportunity count
* Hot prospects count
* Pending tasks
* Average response time

Assignment modal:

* Select opportunity
* Select Sales Agent
* Add assignment note
* Confirm assignment

Reassignment modal:

* Current owner
* New owner
* Reason for reassignment
* Confirm reassignment

Show audit trail:

* Assigned by
* Assigned to
* Timestamp
* Previous owner
* Reason

---

## 5. Approval Review Screen

Create a manager approval detail page.

Sections:

* Opportunity summary
* Customer details
* Vehicle interest
* Sales Agent details
* Uploaded documents
* Required document checklist
* Timeline
* Notes from Sales Agent
* Manager comments

Actions:

* Approve Submission
* Reject Submission
* Request Revision
* Reassign Opportunity

Show uploaded documents in a review-friendly layout:

* Document name
* Category
* Upload date
* Preview button
* Status

Approval status component:

* Pending Review
* Approved
* Rejected
* Revision Requested

---

## 6. DMS Submission Monitoring Screen

Create a manager screen to monitor third-party DMS submissions.

Table columns:

* Opportunity ID
* Customer Name
* Vehicle Model
* Sales Agent
* Submission Date
* DMS Reference Number
* Submission Status
* Error Message
* Retry Action

Status badges:

* Not Submitted
* Pending
* Submitted
* Failed
* Reconciled

Include a detail drawer:

* Order data summary
* Validation results
* DMS response
* Retry submission button
* Audit log

---

## 7. Reports Dashboard

Create a reporting screen with:

Report cards:

* Pipeline Summary
* Conversion Rate
* Won Opportunities
* Agent Performance
* Source / Tag Analysis
* Assignment Load
* DMS Submission Status

Charts:

* Funnel conversion chart
* Stage distribution donut chart
* Opportunities over time line chart
* Agent leaderboard table
* Source performance bar chart
* Tag usage table
* Assignment aging chart

Export options:

* Export CSV
* Export Excel

---

# Key Functional Requirements to Represent Visually

The design should clearly show these functions:

* Create opportunity
* Edit opportunity
* View opportunity details
* Move opportunity through stages
* Add notes and comments
* Apply personal or shared tags
* Upload supporting files
* Submit for approval
* Manager approval / rejection / revision request
* Create order when opportunity becomes Prospect Won
* Submit order to third-party DMS
* Track DMS submission status
* Assign and reassign opportunities
* View assignment history
* Browse training materials
* Search and filter content
* View and download files
* Dashboard reporting

---

# Data Objects to Include in UI

Represent the following data fields across the screens:

## Opportunity Record

* Opportunity ID
* Customer name
* Contact number
* Email
* Assigned Sales Agent
* Previous Assigned Agent
* Manager / team assignment
* Stage
* Tags
* Source of lead
* Vehicle / model interest
* Notes
* Created timestamp
* Last updated timestamp
* Approval status
* DMS submission status

## File Metadata

* File name
* File type
* File size
* Upload timestamp
* Uploaded by
* Linked opportunity ID
* Document category

## Audit Trail

* Record creation
* Stage updates
* Tag changes
* File uploads
* Approval actions
* DMS submission attempts
* Status changes
* Opportunity assignment
* Opportunity reassignment

---

# Visual Design Requirements

Use a premium automotive enterprise style.

## Colors

Primary:

* Mitsubishi Red

Secondary:

* Charcoal Black
* White
* Light Grey
* Cool Grey
* Success Green
* Warning Amber
* Error Red
* Info Blue

## Typography

Use a clean modern sans-serif font.

Suggested style:

* Large bold headers
* Medium section titles
* Compact table text
* Clear form labels
* Strong CTA text

## Components

Design a full component system including:

* Buttons
* Input fields
* Dropdowns
* Search bars
* Filter chips
* Cards
* Status badges
* Tables
* Modals
* Bottom sheets
* Timeline component
* Upload component
* Progress indicators
* Dashboard cards
* Charts
* Navigation bars
* Sidebar
* Tabs
* Toast notifications
* Empty states
* Error states

---

# Mobile UX Principles

For Sales Agents:

* Prioritize speed and simplicity
* Minimize typing
* Use large touch targets
* Use clear CTAs
* Keep opportunity creation short and guided
* Make upload and approval status very visible
* Keep bottom navigation persistent
* Use step-by-step flows for won prospects and DMS submission readiness

---

# Web UX Principles

For Sales Managers:

* Prioritize oversight and decision-making
* Use tables, filters, and dashboards
* Make approval queue highly visible
* Make assignment workload visible
* Support quick review of documents
* Provide export options
* Use side panels or modals for quick actions

---

# Suggested Prototype Flow

Create a clickable prototype with this main journey:

## Sales Agent Journey

1. Login
2. View Home Dashboard
3. Open Opportunity List
4. Create New Opportunity
5. Add tags and notes
6. Update stage from Opportunity to Prospect
7. Upload supporting documents
8. Move to Hot Prospect
9. Move to Prospect Won
10. Submit for Manager Approval
11. View approval status
12. View DMS submission status
13. Open Training Materials
14. View or download product catalogue

## Sales Manager Journey

1. Login to Manager Portal
2. View Dashboard
3. Open Unassigned Opportunities
4. Assign opportunity to Sales Agent
5. Open Approval Queue
6. Review opportunity and documents
7. Approve, reject, or request revision
8. Monitor DMS Submission
9. View Reports
10. Export report

---

# Sample UI Copy

Use realistic UI text such as:

* “Create Opportunity”
* “Assigned to You”
* “Pending Manager Review”
* “Upload Required Documents”
* “Submit for Approval”
* “Prospect Won”
* “DMS Submission Pending”
* “DMS Reference No.”
* “Request Revision”
* “Assign Sales Agent”
* “Reassign Opportunity”
* “View Training Materials”
* “Download Catalogue”
* “Pipeline Health”
* “Conversion Funnel”
* “Assignment Workload”
* “Source & Tag Performance”

---

# Output Expectation

Generate a complete Figma-ready UI design system and prototype for:

1. Mobile Sales Agent Super App
2. Sales Lead Management Mini App
3. Sales Training Materials Mini App
4. Desktop Sales Manager Portal
5. Dashboard, approval, assignment, reporting, and DMS monitoring screens

The final design should be polished enough for stakeholder presentation and detailed enough for product, design, and engineering teams to understand the required user flows, visual structure, and core application functionality.
