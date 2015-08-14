var mocha = require('mocha');
var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http:localhost:3000');
 
var Server = require('../app.js');

describe('Watches', function() {
  before(function(done) {
    Server.init(function(err, srvr) {
      if(err) {
        throw err;
      }
      server = srvr;
      done();
    })
  });
  after(function(done) {
    server.stop(function() {
      Mongoose.disconnect(done);
    })
  });
  it('should return a 200 response', function(done) {
    api.get('/watches')
    .set('Accept')
    .expect(200, done)
  });
})








































// describe('Routing', function() {
//   var url = 'http://localhost:3000';
//   before(function(done) {
//     mongoose.connect('mongodb://localhost/stockboard');
//     done();
//   });
// })

// describe("Users", function(d) {
//   describe("Post and get to users", function() {
  
//   })
// })

// describe("Watches", function() {
//   describe("HTTP requests to watches", function() {
//     var url = 'http://localhost:3000';
//     // get
//     it("Should retrieve all watches from /watches", function() {
//       request(url)
//         .get('/watches')
//         .end(function(err, res) {
//           if(err) {
//             throw err;
//           }
//           res.should.have.status(200);
//           done();
//         })
//     })
//     // delete
//     it("Should delete a watch", function(done) {
//       var _id = '55cbb7f2cdf80ac64f33225b';
//       request(url)
//         .delete('/watches/' + _id)
//         .end(function(err, res) {
//           if(err) {
//             throw err;
//           }
//           res.should.have.status(200);
//           done();
//         })
//     })
//     // fail delete
//     it("Should fail to delete a watch", function(done) {
//       var _id = '55cbb7f2cdf80ac64f33225bqwe';
//       request(url)
//         .delete('/watches/' + _id)
//         .end(function(err, res) {
//           if(err) {
//             throw err;
//           }
//           res.should.have.status(400);
//           done();
//         })
//     })    
//     // post
//     it("Should post a watch to /watches", function(done) {
//       var payload = {
//         name: 'Apple',
//         symbol: 'AAPL',
//         user: 'Bonnie So',
//         hash: '12344566789asdfghjAAPL'
//       };
//       request(url)
//         .post('/watches')
//         .send(payload)
//         .end(function(err, res) {
//           if(err) {
//             throw err;
//           }
//           res.should.have.status(200);
//           done();
//         })
//     })
//     // fail to post
//     it("Should fail to post a watch to /watches", function(done) {
//       var payload = {
//         name: 'Apple',
//         symbol: 'AAPL',
//         user: 'Bonnie So',
//         hash: '12344566789asdfghjAAPL'
//       };
//       request(url)
//         .post('/watches')
//         .send(payload)
//         .end(function(err, res) {
//           if(err) {
//             throw err;
//           }
//           res.should.have.status(400);
//           done();
//         })
//     })
//   })
// })

// describe("Purchases", function() {
//   describe("HTTP requests to purchases", function() {
//     // get all purchases
//     it("Should retrieve all of purchases", function() {
//       Server.get('/purchases', function(err, req, res, obj) {
//         assert.equal(200, res.statusCode)
//         // match to length
//       });
//     });
//     // variable to post to purchases
//     var req.body
//     // post a purchase
//     it("", function() {
//       Server.post('/purchases', req.body, function() {
//         assert.equal(200, res.statusCode)
//       })
//     })
//     // patch a purchase
//     it("", function() {
//       Server.patch('/purchases/:id', req.body, function() {
//         assert.equal(200, res.statusCode)
//       })
//     })
//     // delete a purchase
//     it("", function() {
//       Server.delete('/purchases/:id', req.params.id , function() {
//         assert.equal(200, res.statusCode)
//       })
//     })    
//   })
// })

// TEST CASES

// Test Google Authentication
// Test Get to stockQuote
// Test Get to stockHistory


// get all watches
// it("Should retrieve all watches from /watches", function() {
//   Server.get('/watches', function(err, req, res, obj) {
//     assert.equal(200, res.statusCode);
//   });
// });
// post a watch
// it("Should post a watch to /watches", function() {
//   Server.post('/watches', function(err, req, res, obj) {
//     assert.equal(200, res.statusCode);
//   })
// });
// post the same watch
// it("Should fail when same watch is being posted to /watches", function() {
//   Server.post('/watches', payload, function() {
//     assert.equal(500, res.statusCode);
//   })
// })
// patch a watch
// it("Should patch a stock being watched", function() {
//   Server.patch('/watches/:id', req.body, function() {
//     assert.equal(200, res.statusCode)
//   })
// });
// delete a watch
// it("Should delete a stock from /watches", function() {
//   Server.delete('/watches/:id', req.params.id , function() {
//     assert.equal(200, res.statusCode)
//   })
// });

