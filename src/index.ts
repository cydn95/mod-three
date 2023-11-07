import { modThree } from './utils';

function main() {
  const inputs = ['1101', '1110', '1111'];

  for (const input of inputs) {
    console.log(modThree(input))
  }
}

main();
