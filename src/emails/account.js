const sgMail = require('@sendgrid/mail');

const sendGridAPIKey =
  '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';

sgMail.setApiKey(sendGridAPIKey);

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
