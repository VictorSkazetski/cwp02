const net = require('net');
const port = 8124;
var time = require('yyyy-mm-dd');
var seed = 0;
var history = [];
var path = "D:\\lab jsssss\\cwp02\\";
var write = require('fs');


const server = net.createServer((client) => {
  client.id = seed; // + time.withTime();
  seed++;
  console.log('\nClient connected ' + client.id.toString() + time.withTime());
  client.setEncoding('utf8');

  client.on('data', (data) => {

   // console.log(data);

      if (data === "QA") {
        client.write("ACK");  
      }
      else if(data ==="End"){
        client.write("DEC");
      }
    else{
      let str = "";
      let otvet = (Math.floor(Math.random() * 3)).toString();
      console.log(data);
      str += data + " Ответ(сервер): " + otvet + "\r\n";
      history.push(str)
      client.write(otvet);
    }

  });
 
    client.on('end', () => {
     // seed++;
      let str = "";
      for (let i = 0; i < history.length; i++) {
        str += history[i];
      }
      while (history.length > 0) {
        history.pop();
      }
      log(str, client);
      console.log('History get, Client disconnected')
    }); 
  
});

server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});


function log(str, client) {
  write.writeFile(path + "client_" + client.id.toString() + ".txt", str,() => {
    console.log("YRA");
  });
  
}