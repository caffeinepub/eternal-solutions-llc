# Eternal Solutions LLC - Insurance Claim Intake Website

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- One-page marketing/intake website for Eternal Solutions LLC
- Hero section with headline, subheadline, and CTA button
- "How It Works" section with 3 steps
- "Why Work With Us" section with 5 bullet points
- Pre-claim intake form with full contact, insurance, damage, and file upload fields
- Admin dashboard to view submitted intake form entries
- Disclaimer section
- Contact section with email, phone placeholder, and social media icons (TikTok, Facebook, Instagram)
- Privacy Policy page (separate route)
- Terms & Conditions page (separate route)
- Authorization (admin login to view dashboard)
- Blob storage for photo/video uploads from intake form

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend
- `IntakeSubmission` record type: id, fullName, phone, email, propertyAddress, preferredContact, insuranceCompany, policyNumber (optional), propertyType, dateOfLoss, causeOfLoss, damageDescription, fileIds (blob references), submittedAt, status
- `submitIntakeForm(submission)` -- public, saves a new submission
- `getSubmissions()` -- admin only, returns all submissions
- `getSubmission(id)` -- admin only, returns single submission
- `updateSubmissionStatus(id, status)` -- admin only, update status (e.g., Pending, Reviewed, Qualified, Declined)
- Authorization component for admin login

### Frontend Pages
1. **Home (/)** -- One-page layout:
   - Navigation bar with logo and anchor links
   - Hero section
   - How It Works (3 steps)
   - Why Work With Us (5 points)
   - Pre-Claim Intake Form (with blob upload)
   - Disclaimer
   - Contact section
2. **Admin Dashboard (/admin)** -- Protected route:
   - Login wall
   - Table of all submissions with name, date, cause of loss, status
   - Click row to expand full details
   - Status update control
3. **Privacy Policy (/privacy)** -- Static content page
4. **Terms & Conditions (/terms)** -- Static content page

### Data & Validation
- Required fields: fullName, phone, email, propertyAddress, preferredContact, insuranceCompany, propertyType, dateOfLoss, causeOfLoss, damageDescription
- Optional: policyNumber
- File uploads: photos (JPEG/PNG, max 10MB each), video (MP4, max 50MB)
- Cause of loss dropdown: Storm, Wind, Hail, Fire, Water, Plumbing Leak, Vandalism, Other
- Property types: Single Family, Townhouse, Condo, Multi-Family, Commercial
- Preferred contact: Phone, Email, Text
