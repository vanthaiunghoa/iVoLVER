// test bitOr
var assert = require('assert'),
    error = require('../../../lib/error/index'),
    math = require('../../../index'),
    bignumber = math.bignumber,
    bitOr = math.bitOr;

describe('bitOr', function () {

  it('should bitwise or two numbers', function () {
    assert.equal(bitOr(53, 131), 183);
    assert.equal(bitOr(2, 3), 3);
    assert.equal(bitOr(-2, 3), -1);
    assert.equal(bitOr(2, -3), -1);
    assert.equal(bitOr(-5, -3), -1);
  });

  it('should bitwise or booleans', function () {
    assert.equal(bitOr(true, true), 1);
    assert.equal(bitOr(true, false), 1);
    assert.equal(bitOr(false, true), 1);
    assert.equal(bitOr(false, false), 0);
  });

  it('should bitwise or numbers and null', function () {
    assert.equal(math.bitOr(null, null), 0);
    assert.equal(math.bitOr(null, 1), 1);
    assert.equal(math.bitOr(1, null), 1);
  });

  it('should bitwise or mixed numbers and booleans', function () {
    assert.equal(bitOr(0, true), 1);
    assert.equal(bitOr(0, false), 0);
    assert.equal(bitOr(true, 0), 1);
    assert.equal(bitOr(false, 0), 0);
  });

  it('should bitwise or bignumbers', function () {
    assert.deepEqual(bitOr(bignumber(1), bignumber(2)), bignumber(3));
    assert.deepEqual(bitOr(bignumber('-1.0e+31'), bignumber('-1.0e+32')), bignumber('-8726602014714682917963150917632'));
    assert.deepEqual(bitOr(bignumber('1.0e+31'), bignumber('1.0e+32')), bignumber('101273397985285317082038996566016'));
    assert.deepEqual(bitOr(bignumber('-1.0e+31'), bignumber('1.0e+32')), bignumber('-1273397985285317082038996566016'));
    assert.deepEqual(bitOr(bignumber('1.0e+31'), bignumber('-1.0e+32')), bignumber('-91273397985285317082036849082368'));
  });

  it('should bitwise or mixed numbers and bignumbers', function () {
    assert.deepEqual(bitOr(bignumber(1), 2), bignumber(3));
    assert.deepEqual(bitOr(1, bignumber(2)), bignumber(3));
    assert.deepEqual(bitOr(bignumber(7), 9), bignumber(15));
    assert.deepEqual(bitOr(7, bignumber(9)), bignumber(15));
  });

  it('should bitwise or mixed booleans and bignumbers', function () {
    assert.deepEqual(bitOr(bignumber(1), false), bignumber(1));
    assert.deepEqual(bitOr(bignumber(2), true), bignumber(3));
    assert.deepEqual(bitOr(false, bignumber(1)), bignumber(1));
    assert.deepEqual(bitOr(true, bignumber(2)), bignumber(3));
  });

  it('should throw an error if used with a unit', function() {
    assert.throws(function () {bitOr(math.unit('5cm'), 2)}, error.UnsupportedTypeError);
    assert.throws(function () {bitOr(2, math.unit('5cm'))}, error.UnsupportedTypeError);
    assert.throws(function () {bitOr(math.unit('2cm'), math.unit('5cm'))}, error.UnsupportedTypeError);
  });

  it('should throw an error if the parameters are not integers', function () {
    assert.throws(function () {
      bitOr(1.1, 1);
    }, /Parameters in function bitOr must be integer numbers/);
    assert.throws(function () {
      bitOr(1, 1.1);
    }, /Parameters in function bitOr must be integer numbers/);
    assert.throws(function () {
      bitOr(1.1, 1.1);
    }, /Parameters in function bitOr must be integer numbers/);
    assert.throws(function () {
      bitOr(bignumber(1.1), 1);
    }, /Parameters in function bitOr must be integer numbers/);
    assert.throws(function () {
      bitOr(1, bignumber(1.1));
    }, /Parameters in function bitOr must be integer numbers/);
    assert.throws(function () {
      bitOr(bignumber(1.1), bignumber(1));
    }, /Parameters in function bitOr must be integer numbers/);
    assert.throws(function () {
      bitOr(bignumber(1), bignumber(1.1));
    }, /Parameters in function bitOr must be integer numbers/);
  });

  it('should bitwise or matrices correctly', function () {
    var a2 = math.matrix([[1,2],[3,4]]);
    var a3 = math.matrix([[5,6],[7,8]]);
    var a4 = bitOr(a2, a3);
    assert.ok(a4 instanceof math.type.Matrix);
    assert.deepEqual(a4.size(), [2,2]);
    assert.deepEqual(a4.valueOf(), [[5,6],[7,12]]);
    var a5 = math.pow(a2, 2);
    assert.ok(a5 instanceof math.type.Matrix);
    assert.deepEqual(a5.size(), [2,2]);
    assert.deepEqual(a5.valueOf(), [[7,10],[15,22]]);
  });

  it('should bitwise or a scalar and a matrix correctly', function () {
    assert.deepEqual(bitOr(12, math.matrix([3,9])), math.matrix([15,13]));
    assert.deepEqual(bitOr(math.matrix([3,9]), 12), math.matrix([15,13]));
  });

  it('should bitwise or a scalar and an array correctly', function () {
    assert.deepEqual(bitOr(12, [3,9]), [15,13]);
    assert.deepEqual(bitOr([3,9], 12), [15,13]);
  });

  it('should bitwise or a matrix and an array correctly', function () {
    var a = [6,4,28];
    var b = math.matrix([13,92,101]);
    var c = bitOr(a, b);

    assert.ok(c instanceof math.type.Matrix);
    assert.deepEqual(c, math.matrix([15,92,125]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    assert.throws(function () {bitOr(1)}, error.ArgumentsError);
    assert.throws(function () {bitOr(1, 2, 3)}, error.ArgumentsError);
  });
  it('should throw an error in case of invalid type of arguments', function () {
    assert.throws(function () {bitOr(new Date(), true)}, error.UnsupportedTypeError);
    assert.throws(function () {bitOr(true, new Date())}, error.UnsupportedTypeError);
    assert.throws(function () {bitOr(true, 'foo')}, error.UnsupportedTypeError);
    assert.throws(function () {bitOr('foo', true)}, error.UnsupportedTypeError);
    assert.throws(function () {bitOr(true, undefined)}, error.UnsupportedTypeError);
    assert.throws(function () {bitOr(undefined, true)}, error.UnsupportedTypeError);
  });

});
