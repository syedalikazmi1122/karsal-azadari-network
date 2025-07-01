# Image Upload Setup Guide

## Overview
This application now supports optional image uploads for writings using Supabase storage. Images are uploaded to a bucket named "images" and the public URL is stored with the writing.

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the frontend directory with:
```
VITE_API_URL=http://localhost:5000/api
```

### 2. Supabase Configuration
The Supabase configuration is already set up in `src/lib/supabase.js` with the provided credentials:
- URL: https://jqqvrvzgrxalinzxodml.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcXZydnpncnhhbGluenhvZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNDc0MTIsImV4cCI6MjA2MDYyMzQxMn0.0dj8gvkurZHkJbdlczz4eS-PGaQOsfBUFZNvLqIrORg

### 3. Supabase Storage Bucket
Make sure you have created a storage bucket named "images" in your Supabase project with public access.

### 4. Features Added
- **Admin Dashboard**: Now includes an optional image upload field
- **Image Preview**: Shows a preview of the selected image before upload
- **Writing Cards**: Display images when available
- **Writing Detail**: Shows full-size images in the detail view
- **Error Handling**: Proper error handling for upload failures

### 5. File Structure
```
src/
├── lib/
│   └── supabase.js          # Supabase client configuration
├── utils/
│   └── imageUpload.js       # Image upload utility function
├── components/
│   ├── AdminDashboard.jsx   # Updated with image upload
│   ├── WritingCard.jsx      # Updated to display images
│   └── WritingDetail.jsx    # Updated to display images
```

### 6. Backend Changes
- Updated `Writing` model to include `imageUrl` field
- Updated writing controller to handle `imageUrl` in requests

## Usage
1. Go to the Admin Dashboard
2. Fill in the writing details (title, type, content)
3. Optionally select an image file
4. The image will be uploaded to Supabase and the URL will be saved with the writing
5. Images will be displayed in both the writing cards and detail views 