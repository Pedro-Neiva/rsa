const {
  generateEncryptionExponent,
  computeDecryptionExponent,
  textToNumber,
  encrypt,
  decrypt,
  numberToText,
} = require('./rsa')

// Example demonstrating RSA encryption and decryption
const rsaExample = async () => {
  // Choosing prime numbers p and q
  const p = 994326653n
  const q = 65537n

  const n = p * q // Calculating the modulus (n)
  const phi = (p - 1n) * (q - 1n) // Calculating Euler's totient function (phi)

  const e = generateEncryptionExponent(phi) // Generating the encryption exponent (e)

  const d = computeDecryptionExponent(e, phi) // Computing the decryption exponent (d)

  const publicKey = { e, n } // Public key consists of (e, n)
  console.log('Public Key:', publicKey)

  const privateKey = { d, n } // Private key consists of (d, n)
  console.log('Private Key: ', privateKey)

  const originalMessage = 'Hello'
  console.log('Original Message: ', originalMessage)

  const m = textToNumber(originalMessage) // Converting the plaintext message to a number
  console.log('Original text converted to number: ', m)

  const c = await encrypt(m, publicKey) // Encrypting the message using the public key
  console.log('Encrypted text: ', c)

  const decryptedM = await decrypt(c, privateKey) // Decrypting the message using the private key
  console.log('Decrypted message: ', decryptedM)

  const plaintext = numberToText(decryptedM) // Converting the decrypted number back to plaintext
  console.log('Back to text: ', plaintext)
}

rsaExample()
