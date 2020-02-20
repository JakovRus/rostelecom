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

function getMailOptions(body) {
  return {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_RECEIVER,
    subject: `${body.name} - ${body.phone}`,
    html: `
      <h1>${body.rate}</h1>
      <div>${body.description}</div>
      <div>${body.price}</div>
    `,
  }
}

function isBodyInvalid(body) {
  return !body &&
    !body.name &&
    !body.phone &&
    !body.rate &&
    !body.description &&
    !body.price;
}

router.post('/', async function(req, res, next) {
  const transporter = nodemailer.createTransport(getTransporterOptions());
  const invalid = isBodyInvalid(req.body);

  if(invalid) {
    console.log(invalid);
    res.status(404).send();
    return;
  }

  try {
    await transporter.sendMail(getMailOptions(req.body));
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }

  res.status(200).send('Success');
});

module.exports = {emailRouter: router};
