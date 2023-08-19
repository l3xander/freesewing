import 'dotenv/config'
import mustache from 'mustache'
import { send } from './email-lib.mjs'
import {
  buttonRow,
  newsletterClosingRow,
  headingRow,
  lead1Row,
  wrap,
} from '../sites/backend/src/templates/email/shared/blocks.mjs'

const text = `
Dear FreeSewing user,

Your account on FreeSewing.org has been inactive an scheduled for removal.

If you want to keep your account, please login on FreeSewing.org within the next 2 weeks.

If your account stays dormant, it will at one point become unavailable.
That does not have to be a disaster, you can always create a new one, but you will lose all data stored in your account.

This will be the only email I sent you about this.
If you have questions, you can reply to this message.

love,
joost
`
const html = mustache.render(
  wrap.html(`
    ${headingRow.html}
    ${lead1Row.html}
    ${buttonRow.html}
    ${newsletterClosingRow.html}
  `),
  {
    intro: 'Your account is inactive. Login now to revive it.',
    heading: 'Your FreeSewing account is inactive and marked for removal',
    lead: `
      Due to inactivity, your account on FreeSewing.org has been marked for removal.
      <br><br>
      If you want to keep your account, please login on FreeSewing.org within the next 2 weeks.`,
    button: 'Go to FreeSewing.org',
    actionUrl: 'https://freesewing.org/login',
    closing: `
      If your account stays dormant, it will at one point become unavailable.
      <br><br>
      That does not have to be a disaster, you can always create a new one, but you will lose all data stored in your account.
      <br><br>
      This will be the only email I sent you about this.
      <br>
      If you have questions, you can reply to this message.`,

    greeting: `love,`,
    website: 'FreeSewing.org',
    seeWhy: 'You received this email because removing inactive accounts is in line with our',
    urlWhy: 'https://freesewing.org/docs/various/privacy/account/',
    whyDidIGetThis: 'Privacy Notice',
    notMarketing: 'This is not marketing, but a transactional email about your FreeSewing account.',
  }
)

send({
  to: ['joost@joost.at'],
  bcc: ['joost@decock.org'],
  subject: '[FreeSewing] Your account is inactive and marked for removal',
  html,
  text,
})