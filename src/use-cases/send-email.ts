import nodemailer from "nodemailer";
import { environmentVariables } from "../common/environment";
import { injectable } from "inversify";

export interface ISendEmailUseCase {
  execute(
    to: string,
    template: string,
    subject: string
  ): Promise<void>;
}

@injectable()
export class SendEmailNodemailerUseCase implements ISendEmailUseCase {
  async execute(
    to: string,
    template: string,
    subject: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: String(environmentVariables.smtp.host),
      port: Number(environmentVariables.smtp.port),
      secure: Boolean(environmentVariables.smtp.secure),
      auth: {
        user: String(environmentVariables.smtp.auth.user),
        pass: String(environmentVariables.smtp.auth.pass),
      },
    });

    await transporter.sendMail({
      from: String(environmentVariables.smtp.auth.user),
      to,
      subject,
      text: template,
      html: template,
    });

    console.log({
      action: "MESSAGE SENT BY EMAIL",
      info: {
        subject: subject,
        to,
      },
    });
  }
}
