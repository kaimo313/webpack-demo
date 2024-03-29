"use strict";

const runCount = 100;
const keyCount = 10000;

let map = new Map();

let keys = new Array(keyCount);
for (let i = 0; i < keyCount; i++) keys[i] = {};

for (let key of keys) map.set(key, true);

let startTime = process.hrtime();

for (let i = 0; i < runCount; i++) {
    for (let key of keys) {
        let value = map.get(key);
        if (value !== true) throw new Error(); 
    }
}

let elapsed = process.hrtime(startTime);
console.log(elapsed)
let [seconds, nanoseconds] = elapsed;
let milliseconds = Math.round(seconds * 1e3 + nanoseconds);

console.log(`${process.version} ${milliseconds} ms`);