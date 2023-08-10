import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'elbrustestemail@gmail.com',
      pass: 'bpyvoeszkymcqdli',
    },
  },
  {
    from: 'Elbrustestemail <elbrustestemail@gmail.com',
  },
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  });
};

export default mailer;
