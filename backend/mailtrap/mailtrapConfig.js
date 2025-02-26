import Nodemailer from "nodemailer";
import {MailtrapTransport} from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

 const TOKEN = process.env.MAILTRAP_TOKEN;


 export const MailtrapTransportClient = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: "hello@demomailtrap.com", // como não tenho dominio eu uso demomailtrap.com
  name: "vitor",
};

/* const recipients = [
  "vitor06gomes@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error); */