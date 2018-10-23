const dice = require('../trpg-dice');

test(`maximum of d% equal to 100`, (done) => {
  function callback(err, data) {
    expect(data.max).toBe(100);
    done();
  }

  dice.roll(`d%`, callback);
});

test(`maximum of 4dF equal to 4`, (done) => {
  function callback(err, data) {
    expect(data.max).toBe(4);
    done();
  }

  dice.roll(`4dF`, callback);
});

test(`minimum of 2dF equal to -2`, (done) => {
  function callback(err, data) {
    expect(data.min).toBe(-2);
    done();
  }

  dice.roll(`2dF`, callback);
});
