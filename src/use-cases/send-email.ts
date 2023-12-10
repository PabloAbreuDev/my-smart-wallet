import nodemailer from "nodemailer";
import { environmentVariables } from "../common/environment";
import { injectable } from "inversify";

export interface ISendEmailUseCaseRequest {
  to: string,
    template: string,
    subject: string
}

export interface ISendEmailUseCase {
  execute(
  data: ISendEmailUseCaseRequest
  ): Promise<void>;
}

@injectable()
export class SendEmailNodemailerUseCase implements ISendEmailUseCase {
  async execute(
    data: ISendEmailUseCaseRequest
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: environmentVariables.smtp.host,
      port: environmentVariables.smtp.port,
      secure:environmentVariables.smtp.secure,
      auth: {
        user: environmentVariables.smtp.auth.user,
        pass: environmentVariables.smtp.auth.pass,
      },
    });

    await transporter.sendMail({
      from: environmentVariables.smtp.auth.user,
      to: data.to,
      subject: data.subject,
      text: data.template,
      html: data.template,
    });

    console.log({
      action: "MESSAGE SENT BY EMAIL",
      info: {
        subject: data.subject,
        to: data.to,
      },
    });
  }
}
