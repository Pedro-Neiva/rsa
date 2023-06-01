// Importing the necessary module for modular exponentiation
const { modPow } = require('bigint-crypto-utils')

// Function to calculate the greatest common divisor (GCD) using Euclid's algorithm
const gcd = (a, b) => {
  if (b === 0n) {
    return a
  }
  return gcd(b, a % b)
}

// Function to calculate the extended GCD, returning the GCD and coefficients x and y
const extendedGcd = (a, b) => {
  if (b === 0n) {
    return { gcd: a, x: 1n, y: 0n }
  }

  const { gcd, x: prevX, y: prevY } = extendedGcd(b, a % b)
  const x = prevY
  const y = prevX - (a / b) * prevY

  return { gcd, x, y }
}

// Function to convert text to a number representation using ASCII encoding
const textToNumber = text => {
  const asciiStr = encodeURIComponent(text)
  let hexChars = ''

  for (let i = 0; i < asciiStr.length; i++) {
    const hexValue = asciiStr.charCodeAt(i).toString(16).padStart(2, '0')
    hexChars += hexValue
  }

  const m = BigInt('0x' + hexChars)

  return m
}

// Function to convert a number representation back to text using ASCII encoding
const numberToText = m => {
  let hexNumber = m.toString(16)

  if (hexNumber.length % 2 !== 0) {
    hexNumber = '0' + hexNumber
  }

  let asciiStr = ''
  for (let i = 0; i < hexNumber.length; i += 2) {
    const hex = hexNumber.substr(i, 2)
    const charCode = parseInt(hex, 16)
    const char = String.fromCharCode(charCode)
    asciiStr += char
  }

  const text = decodeURIComponent(asciiStr)

  return text
}

// Function to compute the decryption exponent (d) using the extended GCD
const computeDecryptionExponent = (e, phi) => {
  let d = extendedGcd(e, phi).x

  while (d < 1n) {
    d += phi
  }

  return d
}

// Function to generate the encryption exponent (e) that is coprime with phi
const generateEncryptionExponent = phi => {
  let e = 65537n

  while (gcd(e, phi) !== 1n) {
    e += 2n
  }

  return e
}

// Function to encrypt a message using RSA
const encrypt = async (m, publicKey) => {
  const { e, n } = publicKey

  if (m < 0n || m >= n) {
    throw new Error(`Condition 0 <= m < n not met. m = ${m}`)
  }

  if (gcd(m, n) !== 1n) {
    throw new Error('Condition gcd(m, n) = 1 not met.')
  }

  const c = await modPow(m, e, n)

  return c
}

// Function to decrypt an encrypted message using RSA
const decrypt = async (c, secretKey) => {
  const { d, n } = secretKey

  const m = await modPow(c, d, n)

  return m
}

module.exports = {
  generateEncryptionExponent,
  computeDecryptionExponent,
  textToNumber,
  numberToText,
  encrypt,
  decrypt,
}
