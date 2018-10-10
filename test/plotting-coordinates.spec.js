var plottingFile = require('../src/plotting.js');
var testConfigFile = require('./testConfig.js');
var assert = require('assert');

describe('plotting tests', function() {
  var plotting = plottingFile.plotting;
  var config = testConfigFile.testConfig;
  var coordinates;

  plotting.setConfig(config);

  beforeEach(function() {
    coordinates = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }];
  });

  it('return 5 as the max y value', function(done) {
    var result = plotting.findLargestYval(coordinates);
    assert.equal(result, 5);
    delete coordinates;
    done();
  });

  it('return 120 as the max x value', function(done) {
    var result = plotting.findLargestXval(coordinates);
    assert.equal(result, 5);
    delete coordinates;
    done();
  });

  it('should return scaled values', function(done) {
    var result = plotting.fitCoordiatesToChart(coordinates);
    assert.equal(result[0].x, 0);
    assert.equal(result[1].x, 20);
    assert.equal(result[2].x, 40);
    assert.equal(result[3].x, 60);
    assert.equal(result[4].x, 80);
    assert.equal(result[5].x, 100);
    assert.equal(result[0].y, 0);
    assert.equal(result[1].y, 20);
    assert.equal(result[2].y, 40);
    assert.equal(result[3].y, 60);
    assert.equal(result[4].y, 80);
    assert.equal(result[5].y, 100);

    delete coordinates;
    done();
  });
});
