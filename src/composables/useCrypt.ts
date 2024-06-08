import crypto from 'crypto'
import * as buffer from 'buffer'

export const ENCRYPTION_KEY = '2fCzmDmgygY3ioL7CE0VS4FYfUcdRuBt'
const INITIALIZATION_VECTOR = 'lX8pmJSF8BSB2xwU'

export default function useCrypt(encryptionKey: string) {
  function encrypt(text: string) {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      buffer.Buffer.from(encryptionKey),
      buffer.Buffer.from(INITIALIZATION_VECTOR)
    )

    let crypted = cipher.update(text, 'utf8', 'hex')

    crypted += cipher.final('hex')

    return crypted
  }

  function decrypt(text: string) {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      buffer.Buffer.from(encryptionKey),
      buffer.Buffer.from(INITIALIZATION_VECTOR)
    )

    let dec = decipher.update(text, 'hex', 'utf8')

    dec += decipher.final('utf8')

    return dec
  }

  return {
    encrypt,
    decrypt
  }
}
