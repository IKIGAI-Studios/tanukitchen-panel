const {spawn} = require('child_process');

//const find = spawn('find', ['.', '-type', 'f']);
let wc = spawn('python', ['test.py']);

//find.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
    console.log(`${data}`);
});