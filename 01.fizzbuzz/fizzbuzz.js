#!/usr/bin/env node

const fizzbuzz = (num) => {
    if (num % 15 === 0) {
        console.log("FizzBuzz");
    } else if (num % 3 === 0) {
        console.log("Fizz");
    } else if (num % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(String(num));
    }
};

for (let i = 1; i <= 20; i++) {
  fizzbuzz(i);
}
