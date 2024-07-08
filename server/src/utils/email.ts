import * as nodemailer from 'nodemailer';
// const verifyEmailTemplate = fs.readFileSync(
//   './src/utils/templates/verifyEmail.html',
//   'utf8',
// );
// const forgotPasswordTemplate = fs.readFileSync(
//   './src/utils/templates/verifyEmail.html',
//   'utf8',
// );
export const sendMail = (to: string, subject: string, url: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let htmlCont;
  // if (subject === 'Reset your password') {
  //   htmlCont = forgotPasswordTemplate.replace('{verificationLink}', url);
  // } else htmlCont = verifyEmailTemplate.replace('{verificationLink}', url);

  const options = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlCont,
  };
  return transporter.sendMail(options, (error: any, info: any) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
