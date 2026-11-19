# Admin Panel Guide

## Overview

Your portfolio now includes a fully-functional admin panel that allows you to dynamically manage all your portfolio information without touching the code. All changes are automatically reflected on your portfolio website.

## Accessing the Admin Panel

Visit: `http://yoursite.com/admin`

**Default Password:** `admin123`

> **Security Tip:** Change the password in `/app/admin/page.tsx` line 45 (`if (password === 'admin123')`) for production use.

## Features

### 1. Personal Information
- **Name** - Your full name
- **Professional Title** - e.g., "Full Stack Developer"
- **Email** - Contact email address
- **Phone** - Contact phone number
- **Location** - Your location
- **Bio** - Short biography (used on hero section)
- **Education** - Education details

### 2. Skills Management
Organize your skills by category:
- Add/remove skill categories
- Add/remove individual skills within each category
- Supported categories: Programming Languages, Web Technologies, Databases, Tools & Platforms, Core Concepts, and Soft Skills

### 3. Projects Management
Add and manage your portfolio projects:
- Project name and description
- Technologies used
- Key features (detailed feature list)
- Add, edit, or remove projects
- All changes appear immediately on the portfolio website

### 4. Experience Management
Manage your work experience:
- Company name
- Position/Job title
- Duration (e.g., "2023 - Present")
- Key responsibilities
- Add or remove experience entries

### 5. Contact Information
Update your contact details:
- Email address
- Phone number
- Location
- GitHub profile URL
- LinkedIn profile URL

## How It Works

### Data Storage
All changes are saved to your browser's **localStorage**. This means:
- Data persists across sessions
- No backend required
- Data stays on your device
- Data syncs across your site automatically

### Real-Time Updates
When you make changes in the admin panel:
1. Click "Save Changes"
2. See the confirmation message
3. Changes appear immediately on your portfolio website
4. All sections (hero, skills, projects, experience, contact) update dynamically

### Navigation
The admin panel features:
- Sticky sidebar navigation (desktop view)
- Tab-based navigation (mobile view)
- Easy switching between different sections
- Logout button for security

## Tips & Best Practices

1. **Before You Start**
   - Take screenshots of your current information as backup
   - Plan your portfolio structure before entering the admin panel

2. **Adding Projects**
   - Be descriptive in project descriptions
   - List 5-6 key features per project
   - Use relevant technology tags

3. **Skills Organization**
   - Group similar skills together
   - Remove outdated technologies
   - Add skills in order of proficiency

4. **Experience Details**
   - Use bullet points for responsibilities
   - Be specific about achievements
   - Update dates as you progress

## Troubleshooting

### Changes Not Saving?
- Check your browser's localStorage is enabled
- Try refreshing the page
- Check browser console for errors

### Can't Login?
- Default password is `admin123`
- Ensure caps lock is off
- Clear browser cache and try again

### Data Lost?
- localStorage can be cleared by:
  - Clearing browser cache/cookies
  - Clearing site data in settings
  - Incognito/Private mode won't persist data
- Consider exporting your data regularly

## Changing Password

To change the admin password:

1. Open `/app/admin/page.tsx`
2. Find line 45: `if (password === 'admin123')`
3. Replace `'admin123'` with your desired password
4. Deploy the changes

Example:
```javascript
if (password === 'your-secure-password-here') {
```

## Backup & Export

To backup your portfolio data:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run: `copy(JSON.stringify(localStorage.getItem('portfolioData'), null, 2))`
4. Paste in a text file and save

## Migration to Database (Future)

When you're ready to move to a database-backed solution:
- All data can be easily migrated
- No code restructuring needed
- Same admin interface can be used

---

**Need Help?** All portfolio data is stored in your browser. Visit the admin panel anytime to update your information.
