const nodemailer = require('nodemailer');

const express = require('express');
const router = express.Router();

function getTransporterOptions() {
  return {
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  }
}

function getMailOptions() {
  return {
    from: process.env.GMAIL_USER,
    to: '',
    subject: 'Услуга',
    text: 'Тариф 450',
    html: 'Номер телефона: 891711111111',
  }
}

router.post('/', async function(req, res, next) {
  const transporter = nodemailer.createTransport(getTransporterOptions());

  try {
    await transporter.sendMail(getMailOptions());
  } catch (error) {
    next(error);
  }

  res.status(200).send('Success');
});

module.exports = router;
