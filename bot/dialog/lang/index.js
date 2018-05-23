'use strict';

const config = require('../../../config');
const arb = require('./arb');
const eng = require('./eng');

module.exports = {
  getText: getText
};

function getText(textId) {
  let msgs = {};
  if (config.lang === 'eng') {
    msgs = Object.assign(arb, eng);
  }
  else if (config.lang === 'arb') {
    msgs = Object.assign(eng, arb);
  }
  else {
    msgs = eng;
  }
  return msgs[textId] ? msgs[textId] : `label not defined for ${textId}`;
}
