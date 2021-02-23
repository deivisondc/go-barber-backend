import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '../model/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class MailTrapProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e063a38a8a6cf2",
        pass: "f13ccefdab49dd"
      }
    });

    this.client = transporter;
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'GoBarber',
        address: from?.email || 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
