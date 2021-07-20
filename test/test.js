var chai = require('chai')
  , expect = chai.expect
  , assert = chai.assert
  , should = chai.should();
var request = require("request");

var calculator = require("../calculator.js");

describe("Prueba API BBDD", function() {

	it("Return /api/personas/...", function(done) {
	  var url = "http://localhost:5000/apis/personas/17-01-2021";
	  request(url, function(error, response, body) {
	        expect(response.statusCode).to.equal(200);
	        done();
	      });
	});

	it("Return /api/estacionamiento/...", function(done) {
	  var url = "http://localhost:5000/apis/incidencias/17-01-2021";
	  request(url, function(error, response, body) {
	        expect(response.statusCode).to.equal(200);
	        done();
	      });
	});

	it("Return /api/entradas/...", function(done) {
	  var url = "http://localhost:5000/apis/mascarillas/17-01-2021";
	  request(url, function(error, response, body) {
	        expect(response.statusCode).to.equal(200);
	        done();
	      });
	});

});

describe("Pruebas Chai ASSERT", function() {
	it("Usando assert.equal(value,'value'): ", function() {
		result = calculator.addTested("text");
		assert.equal(result, "text tested");
	});
	it("Usando assert.typeOf(value,'value'): ", function() {
		result = calculator.addTested("text");
		assert.typeOf(result, "string");
	});
	it("Usando assert.lengthOf(value,'value'): ", function() {
		result = calculator.addTested("text");
		assert.lengthOf(result, 11);
	});
});

describe("Pruebas Chai EXPECT", function() {
	it("Usando expect(value).to.equal('value'): ", function() {
		result   = calculator.addTested("text");
		expect(result).to.equal("text tested");
	});
	it("Usando expect(value).to.be.a('value')): ", function() {
		result   = calculator.addTested("text");
		expect(result).to.be.a('string');
	});
	it("Usando expect(value).to.have.lengthOf(value): ", function() {
		result   = calculator.addTested("text");
		expect(result).to.have.lengthOf(11);
	});
});

describe("Pruebas Chai SHOULD", function() {
	it("Usando value.should.equal(value): ", function() {
		result   = calculator.addTested("text");
		result.should.equal("text tested");
	});
	it("Usando value.should.be.a('value'): ", function() {
		result   = calculator.addTested("text");
		result.should.be.a('string');
	});
	it("Usando expect(value).to.have.lengthOf(value): ", function() {
		result   = calculator.addTested("text");
		result.should.have.lengthOf(11);
	});
});
