const supertest = require('supertest');
var assert = require("assert");
const api = supertest('http://localhost:3006');

describe('api.init.test', () => {
  it('should return 200', (done) => {
    api.get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })
})


describe('api.post.test', () => {
  it('should insert ips correctly into Mongodb', async () => {
    var i
    for(i = 0; i < 10; i++) {
    	setTimeout(() => {}, 1000)
        const ip1 = await api.post('/requestIp')
        			   .set('content-type', 'application/x-www-form-urlencoded')
        			   .send({'ip' : '8.8.8.8'}) 
        			   .end((err, res) => {
					        //console.log(res.body)
					        
					   })
    

    }

    var j
    for(j = 0; j < 62; j++) {
    	setTimeout(() => {}, 300)
        const ip2 = await api.post('/requestIp')
        			   .set('content-type', 'application/x-www-form-urlencoded')
        			   .send({'ip' : '7.7.7.7'}) 
        			   .end((err, res) => {
					        
					   })
    }

  })

});


describe('api.get.test', () => {
  it('should return correct html content', (done) => {
    api.get('/')
      .set('content-type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        // I am not sure how to verify the content of res.render here, so I test the status code, and print the entire html content here.
        // Maybe I could make a comparison between res.text and the corresponding html file.
        // print 8.8.8.8 10
        // print 7.7.7.7 error
        console.log(res.text)
        done()
      })
  })
})


describe('api.get.test.after.60.sec', () => {
  it('should return correct html content', function(done) {
  	this.timeout(65000)
  	setTimeout(function () {
	    api.get('/')
	      .set('content-type', 'application/json')
	      .expect(200)
	      .end((err, res) => {
	        if (err) {
	          done(err)
	        }
	        // print 8.8.8.8 0
	        // print 7.7.7.7 0
	        console.log(res.text)
	        done()
	      })

  	}, 60000)

  })
})




