import sgMail, { MailService } from '@sendgrid/mail'
import Container, { Token } from 'typedi'

import { CONFIG_TOKEN } from './config'

export const SENDGRID_TOKEN = new Token<MailService>('SENDGRID')

export function setupSendgrid (): void {
  const config = Container.get(CONFIG_TOKEN)

  sgMail.setApiKey(config.sendgrid.apiKey)

  Container.set(SENDGRID_TOKEN, sgMail)
}
