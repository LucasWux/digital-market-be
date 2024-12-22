export function getRandomNumbersCustom(x: number, n: number): number[] {
  if (x > n) {
    throw new Error('');
  }

  const numbers = Array.from({ length: n }, (_, i) => i + 1);

  // Fisher-Yates Shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
  }

  return numbers.slice(0, x);
}
