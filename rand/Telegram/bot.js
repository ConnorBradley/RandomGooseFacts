var TelegramBot = require('node-telegram-bot-api');

var token = '288593608:AAG5PQB0JvGV0IuZsLl7bCBI9RXNvH7i9lY';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

var crate = require('node-crate');

crate.connect('localhost', 4200)

var table = [['A goose can ',1,' at ',2], ['A ', 3, ' goose can ', 1, ' at ', 2],['An ', 4, ' goose can ', 1, ' at ', 2],
						['A ', 3, ' goose\'s ', 5, ' is ', 7], ['An ', 4, ' goose\'s ', 5, ' is ', 7], ['A ', 3, ' goose\'s ', 6, ' are ', 7],
						['An ', 4, ' goose\'s ', 6, ' are ', 7], [3, ' geese fly in a "', 8, '" formation'], [4, ' geese fly in an "', 9, '" formation'],
						[3, ' geese eat ', 10], ['Geese can beat a ', 11, ' in a fight'], [4, ' geese live for ', 12]];

// You can have as many db instance as you please :)
// You should probably add this part to another module and export it!
//var db = new Crate({
//   host: 'localhost', //Defaults to localhost
//   port: 4200, //Defaults to 4200
//   // You can also send in a cluster of nodes
//   cluster: [
//       {
//         host: 'localhost',
//         port:4200
//       },
//   ]
// });


function onResponse(err, res) {
    if(err) {
      //Do something
      return;
    }

    console.log('Returned %d rows', res.rowcount);
    console.log('Columns returned:\n', res.cols);
    console.log(res.rows);
}


// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Any kind of message
// bot.on('message', function (msg) {
//   var chatId = msg.chat.id;
//   bot.sendMessage(chatId, "Hello");
// });

bot.onText(/\/fact (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  // var resp = match[1];
	var resp = getFact();
  bot.sendMessage(fromId, resp);
});

// function getFact () {
// 	var ans='';
// 	var sentence_nr = Math.floor((Math.random() * 12) + 1);
// 	for(var i=0; i<table[sentence_nr].length; i++) {
//
// 		if(typeof table[i] == 'number') {
// 			//take random data from sql, column nr: number, add to ans
// 			var crateRequest = crate.execute('SELECT thing FROM facts WHERE type = ' + table[i] + ' ORDER BY RAND() LIMIT 1');
// 			crateRequest.success(function(res) {
// 				ans+=res.thing;
// 			});
// 			//ans+=getFacts;
// 		}
// 		else {
// 			ans+=table[i];
// 		}
// 		ans+='\n';
// 	}
// 	return ans;
// }

function getFact(cb) {
 var factnum = Math.floor((Math.random() * 12) + 1);
 switch(factnum) {
   case 1:
       return "Geese are considered gods in ancient Canadian culture."
       break;
   case 2:
       return "Geese are often used by the US army to blind and confuse their enemies."
       break;
   case 3:
       return "A goose can swim at Mach 3."
       break;
   case 4:
      return "American geese fly in an S formation."
      break;
   case 5:
      return "An Armenian goose's bill is purple."
      break;
   case 6:
      return "The Botswanian geese live in shells."
      break;
   case 7:
      return "Canadian Geeses' quack does echo, 3 times more in fact than normal Geese."
      break;
   case 8:
     return "Geese Swanson, Hollyponds favourite actor, has won 4 Oscars."
     break;
   case 9:
     return "Due to the influx of Subway chains in Switzerland, the Swiss geeses' main diet now consists of Meatball Mariana Subways."
     break;
   case 10:
     return "The Persian Geese don't actually fly, instead they jump like a Kangaroo."
   case 11:
     return "Geese don't give a damn what you think."
   default:
       return "Quack"
}


};
