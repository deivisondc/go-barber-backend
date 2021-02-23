interface IMailConfig {
  driver: 'ethereal' | 'mailtrap' | 'ses'
  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailtrap',
  defaults: {
    from: {
      email: 'deivisondc@gmail.com',
      name: 'Deivison Cardoso'
    }
  }
} as IMailConfig;
