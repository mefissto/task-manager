const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'mefissto.w@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Hello ${name}`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'mefissto.w@gmail.com',
    subject: 'Why did you remove the account?',
    text: `Hello ${name}`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendRemoveEmail: sendCancelationEmail
};
