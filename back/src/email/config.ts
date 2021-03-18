import nodemailer from 'nodemailer';
import {config} from 'dotenv';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';

config();

interface SendEmailProps {
  password: string;
  name: string;
  email: string;
};

const sendEmail = async ({name, password, email}: SendEmailProps): Promise<void> => {
  const {user, pass} = await nodemailer.createTestAccount();
  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user, 
      pass 
    },
  });
  
  const html = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'static', 'sendPassword.html')).toString());

  const htmlToSend = html({name, password});
  const mailOptions: Mail.Options = {
    from: '"Hybrium" <noreply@hybrium.com>',
    to: [email, email],
    subject: "Sua Senha de acesso" ,
    text: htmlToSend, 
    html: htmlToSend
  }
  const information = await transport.sendMail(mailOptions);

  console.log("email:", nodemailer.getTestMessageUrl(information));
};

export default sendEmail;