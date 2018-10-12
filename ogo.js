const child_process = require('child_process');

for(var i = 0; i<3; i++) {
    var workerProcess = child_process.spawn('node', ['client.js']);
  
    workerProcess.on('close', function (code) {
       console.log('child process exited with code ' + code);
    });
 }