import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './model/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import MailTrapProvider from './implementations/MailTrapProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  mailtrap: container.resolve(MailTrapProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
