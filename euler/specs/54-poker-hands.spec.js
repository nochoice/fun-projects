const assert = require('assert');
const app = require('../54-poker-hands');

describe('Poker hands', function() {

  it('it should Win player one', function() {
    assert.equal(app.checkGame(['3D','6D','7D','TD','QD'], ['2D','9C','AS','AH','AC']), 'p1');
    assert.equal(app.checkGame(['2D','9C','AS','AH','AC'], ['3D','6D','7D','TD','QD']), 'p2');
    assert.equal(app.checkGame(['2D','AC','AS','AH','AC'], ['3D','6D','7D','TD','QD']), 'p1');
    assert.equal(app.checkGame(['2D','AC','AS','AH','AC'], ['TC','JC','AC','QC','KC']), 'p2');
    // assert.equal(app.royalFlush(['JC','TC','QC','AC','KC']), true);
    // assert.equal(app.royalFlush(['TC','JC','QC','AC','KH']), false);
  });

  it('it should check if hand is a Royal Flush', function() {
    assert.equal(app.royalFlush(['TC','JC','QC','AC','KC']), true);
    assert.equal(app.royalFlush(['JC','TC','QC','AC','KC']), true);
    assert.equal(app.royalFlush(['TC','JC','QC','AC','KH']), false);
  });

  it('it should check if hand is a Height card', function() {
    assert.equal(app.highCard(['TC','9C','QC','AC','KC']), true);
    assert.equal(app.highCard(['2C','4C','3C','5C','6C']), true);
    assert.equal(app.highCard(['TC','9C','9C','AC','KC']), false);
  });

  it('it should check if hand is a Straight', function() {
    assert.equal(app.straight(['TC','JC','AC','QC','KC']), true);
    assert.equal(app.straight(['8C','9C','TC','6C','7C']), true);
    assert.equal(app.straight(['2C','3C','4C','5C','6C']), true);
    assert.equal(app.straight(['2C','3C','TC','5C','6C']), false);
  });

  it('it should check if hand is a Flush', function() {
    assert.equal(app.flush(['TC','JC','AC','QC','KC']), true);
    assert.equal(app.flush(['TS','4S','7S','4S','KS']), true);
    assert.equal(app.flush(['2C','3H','TC','5C','6C']), false);
    assert.equal(app.flush(['QC','JC','TC','AC','AH']), false);
  });

  it('it should check if hand is a One Pair', function() {
    assert.equal(app.onePair(['TC','JC','AC','AC','KC']), true);
    assert.equal(app.onePair(['TC','4C','AC','4C','KC']), true);
    assert.equal(app.onePair(['TC','5C','AC','4C','KC']), false);
    assert.equal(app.onePair(['TC','5C','AC','TC','KC']), true);
  });

  it('it should check if hand is a Three of kind', function() {
    assert.equal(app.threeOfKind(['TC','JC','AC','AC','AC']), true);
    assert.equal(app.threeOfKind(['4C','4C','AC','4C','KC']), true);
    assert.equal(app.threeOfKind(['TC','5C','AC','4C','KC']), false);
    assert.equal(app.threeOfKind(['TC','5C','TC','TC','KC']), true);
  });


  it('it should check if hand is a Four of kind', function() {
    assert.equal(app.fourOfKind(['TC','AC','AC','AC','AC']), true);
    assert.equal(app.fourOfKind(['4C','4C','4C','4C','KC']), true);
    assert.equal(app.fourOfKind(['TC','5C','AC','4C','KC']), false);
    assert.equal(app.fourOfKind(['TC','5C','TC','TC','KC']), false);
  });

  it('it should check if hand is a Straight flush', function() {
    assert.equal(app.straightFlush(['7C','4C','3C','5C','6C']), true);
    assert.equal(app.straightFlush(['2C','4C','3C','5C','6C']), true);
    assert.equal(app.straightFlush(['TC','KC','JC','QC','AC']), true);
    assert.equal(app.straightFlush(['TC','5C','AC','4C','KC']), false);
    assert.equal(app.straightFlush(['TC','5C','TC','TC','KC']), false);
  });

  it('it should check if hand is a Twoo pairs', function() {
    assert.equal(app.twoPairs(['TC','JC','AC','AC','JC']), true);
    assert.equal(app.twoPairs(['2C','4C','KC','4C','KC']), true);
    assert.equal(app.twoPairs(['TC','5C','AC','4C','KC']), false);
    assert.equal(app.twoPairs(['TC','5C','TC','TC','KC']), false);
  });

  it('it should check if hand is a Full house', function() {
    assert.equal(app.fullHouse(['2C','JC','2C','2C','JC']), true);
    assert.equal(app.fullHouse(['AC','AC','KC','AC','KC']), true);
    assert.equal(app.fullHouse(['TC','5C','AC','4C','KC']), false);
    assert.equal(app.fullHouse(['TC','5C','TC','TC','KC']), false);
    assert.equal(app.fullHouse(['3C','3D','3S','9S','9D']), true);
  });

  it('it should sort the cards on hand', function() {
    assert.deepEqual(app.sortHand(['8C','TS','KC','9H','4S']), ['4S','8C','9H','TS','KC']);
    assert.deepEqual(app.sortHand(['3C','4C','5C','6C','2C']), ['2C','3C','4C','5C','6C']);
    assert.deepEqual(app.sortHand(['QC','JC','TC','AC','KC']), ['TC','JC','QC','KC','AC']);
    assert.deepEqual(app.sortHand(['QC','JC','TC','AC','AH']), ['TC','JC','QC','AC','AH']);
    assert.deepEqual(app.sortHand(['AS','AD','TC','AH','AC']), ['TC','AC','AD','AH', 'AS']);
  });
});

