const sieveOfEratosthenes = n => {
  // Create an array of boolean values representing numbers from 0 to n
  // Initially, assume all numbers are prime (true)
  let primes = new Array(n + 1).fill(true)

  // 0 and 1 are not prime, so mark them as false
  primes[0] = primes[1] = false

  // Iterate through the numbers from 2 to the square root of n
  for (let i = 2; i <= Math.sqrt(n); i++) {
    // If the current number is prime
    if (primes[i]) {
      // Mark all multiples of the current number as composite (not prime)
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false
      }
    }
  }

  // Collect the prime numbers into a separate array
  let result = []
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      result.push(i)
    }
  }

  return result
}

// Example usage
const n = 100
const primes = sieveOfEratosthenes(n)
console.log(primes) // all values
console.log(primes[primes.length - 1]) // largest value
