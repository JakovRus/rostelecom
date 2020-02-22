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
      <h1>${body.rateName}</h1>
      <ul>${getDescriptionList(body.description)}</ul>
      <div>${body.price} р/мес</div>
    `,
  }
}

function getDescriptionList(description) {
  return description
    .map(item => {
      return `<li>${item}</li>`
    })
    .reduce((result, current) => {
      return result + current;
    }, '');
}

function isBodyInvalid(body) {
  return !body ||
    !body.name ||
    !body.phone ||
    !body.rateName ||
    !body.description ||
    !body.price;
}

router.post('/', async function(req, res, next) {
  const transporter = nodemailer.createTransport(getTransporterOptions());
  const invalid = isBodyInvalid(req.body);

  if(invalid) {
    res.status(404).send('invalid');
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
