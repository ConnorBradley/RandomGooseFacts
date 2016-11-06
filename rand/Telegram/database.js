var Crate = require('crate-connect');

// You can have as many db instance as you please :)
// You should probably add this part to another module and export it!
var db = new Crate({
  host: 'localhost', //Defaults to localhost
  port: 4200, //Defaults to 4200
  // You can also send in a cluster of nodes
  cluster: [
      {
        host: 'localhost',
        port:4200
      },
  ]
});

// Now lets build some queries, using placeholders, you can either use ? or $1, $2, $3...
var q = {
  getFacts: db.Query('SELECT top 1 thing from facts'),
};

// Get some tweets
q.getFacts.execute([10], onResponse);

function onResponse(err, res) {
    if(err) {
      //Do something
      return;
    }

    console.log('Returned %d rows', res.rowcount);
    console.log('Columns returned:\n', res.cols);
    console.log(res.rows);
}
