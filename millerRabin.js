const crypto = require('crypto')

const generateRandomBigInt = (min, max) => {
  const range = max - min
  const bits = range.toString(2).length

  let randomBigInt
  do {
    // Generate random bytes with the appropriate length
    const randomBytes = crypto.randomBytes(Math.ceil(bits / 8))
    // Convert the random bytes to a BigInt
    randomBigInt = BigInt(`0x${randomBytes.toString('hex')}`)
  } while (randomBigInt >= range)

  // Add the minimum value to ensure the result is within the desired range
  return randomBigInt + min
}

function modPow(base, exponent, modulus) {
  if (modulus === 1n) {
    return 0n
  }

  let result = 1n
  base = base % modulus

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus
    }

    exponent = exponent >> 1n
    base = (base * base) % modulus
  }

  return result
}

function isMillerRabinPrime(n, k) {
  // Handle base cases
  if (n === 2n || n === 3n) {
    return true
  }
  if (n <= 1n || n % 2n === 0n) {
    return false
  }

  // Express n - 1 as (2^r) * d
  let r = 0n
  let d = n - 1n
  while (d % 2n === 0n) {
    r++
    d /= 2n
  }

  // Perform Miller-Rabin primality test k times
  for (let i = 0; i < k; i++) {
    const a = generateRandomBigInt(2n, n - 2n)
    let x = modPow(a, d, n)

    if (x === 1n || x === n - 1n) {
      continue
    }

    let j = 1n
    while (j < r && x !== n - 1n) {
      x = modPow(x, 2n, n)
      if (x === 1n) {
        return false
      }
      j++
    }

    if (x !== n - 1n) {
      return false
    }
  }

  return true
}

// Example usage
const n = 9999999967n
const k = 10
const isPrime = isMillerRabinPrime(n, k)
console.log(isPrime) // Output: true or false
