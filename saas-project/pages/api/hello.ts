import { NextApiRequest, NextApiResponse } from "next";
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  console.log(body);

  const message = `
  Name: ${body.name}\r\n
  Email:${body.mail}\r\n
  Message:${body.message}\r\n
  `;

  const data = {
    to: "akramnabh@gmail.com",
    from: "akramnabh@akramnabh.com",
    subject: "new mail from portfolio",
    text: message,
    html: message.replace(/\r\n/g, "br"),
  };
  res.status(200).json({ status: "okey :D" });
}
