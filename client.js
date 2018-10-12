const net = require('net');
const port = 8124;
//var clientOtvet = [];
var massivQe = {};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const client = new net.Socket();

client.setEncoding('utf8');


async function read() {
  let objJson = require('./questions.json');
  return objJson;
}

read().then((rez) => {
  let objMassiv = [];
  for (let i in rez) {
    let obj = {};
    obj.name = i;
    obj.massiv = rez[i];
    objMassiv.push(obj);
  }
  objMassiv = shuffle(objMassiv);
  return objMassiv;
}).then((rez) => {
    client.connect(port, function() {
    console.log('Connected');

    client.write("QA", () => {
      console.log("QA");
    });
    
  
  
    client.on('data', function(data) {
      if (data === "ACK") {
        console.log("Можно спрашивать");
        massivQe = rez.shift();
        // clientOtvet.push((Math.floor(Math.random() * 3)).toString());
        client.write(massivQe.name + " " + massivQe.massiv + "\n");
      }
      else if(data === "DEC") {
      client.destroy();   
      }
      else 
      {
        getQuest(data);
      }
     
  });

  function getQuest(data){
    //let otvet = clientOtvet[clientOtvet.length - 1];
    let ready = "";
    let otvet = massivQe.massiv[0];
    if (otvet == massivQe.massiv[data]) ready = "==";
    else ready = "!=";
    console.log(massivQe.name + " " + massivQe.massiv + 
    " Сервер: " + data + " " 
    + ready + " (Правильный: " + massivQe.massiv[0] + ")");
    if(rez.length>0){
      massivQe = rez.shift();
     // clientOtvet.push((Math.floor(Math.random() * 3)).toString());
      client.write(massivQe.name + " " + massivQe.massiv + "\n");
    }
    else{
      console.log("End");
      client.write("End");
    }
  }

  });

});









