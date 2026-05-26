// Emergency Email API endpoint
// This would typically be a server-side endpoint (Node.js/Express)
// For now, this is a client-side simulation

export const sendEmergencyEmail = async (profile) => {
  try {
    // In a real implementation, this would use SendGrid or similar email service
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // const msg = {
    //   to: process.env.EMERGENCY_EMAIL,
    //   from: process.env.FROM_EMAIL,
    //   subject: `URGENT: Mental Health Alert - ${profile.name}`,
    //   html: `
    //     <h2>🚨 URGENT MENTAL HEALTH ALERT</h2>
    //     <p><strong>Student:</strong> ${profile.name}</p>
    //     <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    //     <p><strong>Student Phone:</strong> ${profile.phoneNumber || 'Not available'}</p>
    //     <p><strong>Guardian Phone:</strong> ${profile.guardianPhone || 'Not available'}</p>
    //     <p>The system has detected concerning language that may indicate distress or crisis. Immediate attention is required.</p>
    //     <p>Please contact the student immediately and ensure their safety.</p>
    //     <p><em>This is an automated alert from the mental health platform.</em></p>
    //   `
    // };
    
    // await sgMail.send(msg);

    // For demo purposes, simulate the email
    console.log(`📧 EMERGENCY EMAIL SIMULATION:`);
    console.log(`   To: emergency@mentalhealthplatform.com`);
    console.log(`   Subject: URGENT: Mental Health Alert - ${profile.name}`);
    console.log(`   Student: ${profile.name}`);
    console.log(`   Student Phone: ${profile.phoneNumber || 'Not available'}`);
    console.log(`   Guardian Phone: ${profile.guardianPhone || 'Not available'}`);
    
    // Simulate API response
    return {
      success: true,
      messageId: `msg_${Math.random().toString(36).substr(2, 32)}`,
      status: 'sent',
      message: 'Emergency email sent to support team'
    };
    
  } catch (error) {
    console.error('Emergency email failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
