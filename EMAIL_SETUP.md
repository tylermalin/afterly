# Email Collection Setup Guide

## Overview
The Afterly website now collects email addresses from the waitlist signup form. You can configure it to send data to either Google Sheets or your email address.

## Option 1: Google Sheets Integration

### Step 1: Create a Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([
        ['Email', 'Waitlist Number', 'Timestamp', 'Referrer', 'User Agent']
      ]);
    }
    
    // Add the data
    sheet.appendRow([
      data.email,
      data.waitlistNumber,
      data.timestamp,
      data.referrer,
      data.userAgent
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 2: Deploy the Script
1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy" and copy the web app URL

### Step 3: Configure Environment Variables
Create a `.env` file in your project root:

```
REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Option 2: Email Notifications

### Using EmailJS (Recommended)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your service ID, template ID, and public key

### Step 1: Install EmailJS
```bash
npm install @emailjs/browser
```

### Step 2: Update SignupModal.tsx
Replace the `sendToEmail` function with:

```typescript
import emailjs from '@emailjs/browser';

const sendToEmail = async (data: any) => {
  try {
    const templateParams = {
      to_email: 'your-email@example.com',
      email: data.email,
      waitlist_number: data.waitlistNumber,
      timestamp: new Date(data.timestamp).toLocaleString(),
      referrer: data.referrer,
      user_agent: data.userAgent
    };

    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID', 
      templateParams,
      'YOUR_PUBLIC_KEY'
    );
    
    console.log('Successfully sent email notification');
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};
```

### Step 3: Configure Environment Variables
Add to your `.env` file:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

## Option 3: Custom Backend

### Using Netlify Functions
1. Create `netlify/functions/collect-email.js`:

```javascript
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Send email using your preferred service
    // (SendGrid, Mailgun, AWS SES, etc.)
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

2. Update the `EMAIL_SERVICE_URL` in your environment variables

## Testing

1. Start your development server: `npm run dev`
2. Open the website and click "Start Your Legacy" or "Learn More"
3. Enter an email address and submit
4. Check your Google Sheet or email for the new entry

## Data Collected

For each signup, the system collects:
- Email address
- Waitlist position number
- Timestamp
- Referrer URL
- User agent (browser/device info)

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive URLs and keys
- Consider rate limiting for production use
- Validate email addresses on the backend
