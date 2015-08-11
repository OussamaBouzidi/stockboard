var assert = require('assert');
var mocha = require('mocha');



describe("Users", function() {
  describe("Post and get to /users", function() {
  
  }) 
})

describe("Watches", function() {
  describe("HTTP requests to watches", function() {
    // get all watches
    it("Should retrieve all watches from /watches", function() {
      client.get('/watches', function(err, req, res, obj) {
        assert.equal(200, res.statusCode)
      });
    });
    // variable to post to watches
    var watch = {
      name: 'Apple',
      symbol: 'AAPL',
      user: 'Bonnie So',
      hash: new Date + 'Bonnie So'
    };
    var req.body = watch;
    // post a watch
    it("Should post a watch to /watches", function() {
      client.post('/watches', req.body, function() {
        assert.equal(200, res.statusCode)
      })
    })
    // patch a watch
    it("Should patch a stock being watched", function() {
      client.patch('/watches/:id', req.body, function() {
        assert.equal(200, res.statusCode)
      })
    })
    // delete a watch
    it("Should delete a stock from /watches", function() {
      client.delete('/watches/:id', req.params.id , function() {
        assert.equal(200, res.statusCode)
      })
    })    
  })
})

describe("Purchases", function() {
  describe("Post and get to purchases", function() {
    // get all purchases
    it("Should retrieve all of purchases", function() {
      client.get('/purchases', function(err, req, res, obj) {
        assert.equal(200, res.statusCode)
        // match to length
      });
    });
    // variable to post to purchases
    var req.body
    // post a watch
    it("", function() {
      client.post('/purchases', req.body, function() {
        assert.equal(200, res.statusCode)
      })
    })
    // patch a watch
    it("", function() {
      client.patch('/purchases/:id', req.body, function() {
        assert.equal(200, res.statusCode)
      })
    })
    // delete a watch
    it("", function() {
      client.delete('/purchases/:id', req.params.id , function() {
        assert.equal(200, res.statusCode)
      })
    })    
  })
})

// TEST CASES

// Test Google Authentication
// Test Get to stockQuote
// Test Get to stockHistory
