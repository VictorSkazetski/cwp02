const net = require('net');
const port = 8124;
var massivQe = {};


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getObj(obj) {
    let objMassiv = [];
    for (let i in rez) {
        let obj = {};
        obj.name = i;
        obj.massiv = rez[i];
        objMassiv.push(obj);
    }
}


const client = new net.Socket();

client.setEncoding('utf8');

async function read() {
    let objJson = require('./questions.json');
    return objJson;
  }

  read().then((rez) => {
    rez = shuffle(getObj(rez));
    return rez;
  }).then((rez) => {

    client.connect(port, function() {
    console.log('Connected');
    
    client.write("QA", () => {
            console.log("QA");
        });
    });

    client.on('data', function(data) {
        if (data === "ACK") {
          console.log("Можно спрашивать");
          massivQe = rez.shift();
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

});