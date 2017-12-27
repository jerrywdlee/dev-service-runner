'use strict';
// test for nomal process

console.log('Start Proc1');
let i = 0;
setInterval(() => {
  console.log(`i = ${i}`);
  i ++;
  if (i > 3) {
    process.exit(0);
  }
}, 10);

