import Container, { Inject, Service } from 'typedi'

import { SENDGRID_TOKEN } from '@/loaders/sendgrid'
import { Config, CONFIG_TOKEN } from '@/loaders/config'

export interface SendInviteInput {
  email: string;
  sender: string;
  ctaLink: string;
}

@Service()
export class EmailService {
  constructor (
    @Inject(CONFIG_TOKEN) private config: Config
  ) { }

  async sendInvite (data: SendInviteInput): Promise<void> {
    // To avoid cyclic dependency
    const sendgrid = Container.get(SENDGRID_TOKEN)

    const { email, sender, ctaLink } = data

    await sendgrid.send({
      from: this.config.sendgrid.from,
      to: email,
      templateId: this.config.sendgrid.inviteTemplate,
      dynamicTemplateData: {
        sender,
        cta_link: ctaLink
      }
    })
  }
}
