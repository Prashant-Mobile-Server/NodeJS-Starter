export default function getRandomInteger() {
    return Math.floor(Math.random() * 1000) + 1;
}

const randomInt = getRandomInteger();
console.log(randomInt);