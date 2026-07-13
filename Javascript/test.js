console.log("Hi Vasu")



const data = [1, 2, 3, 4, 5];
const result = data.filter(n => n % 2 === 0)
                   .map(n => n * 10)
                   .reduce((sum, n) => sum + n, 0);
console.log(`Even numbers doubled and summed: ${result}`);   