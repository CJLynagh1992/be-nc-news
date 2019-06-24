const { expect } = require('chai');
const { formatDate, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDate', () => {
  it('should take an empty array and return an empty array', () => {
    const list = [];
    const actual = formatDate(list);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it('if passed an array of one object it will convert its timestamp into a javascript object', () => {
    const list = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body: '',
        created_at: 1471522072389
      }
    ];
    const actual = formatDate(list);
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body: '',
        created_at: new Date('2016-08-18T12:07:52.389Z')
      }
    ];
    expect(actual).to.eql(expected);
  });
  it('if passed an array of multiple objects it converts all of their timestamps to javascript objects', () => {
    const list = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body: '',
        created_at: 1471522072389
      },
      {
        title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body: '',
        created_at: 1500584273256
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body: '',
        created_at: 1500659650346
      }
    ];
    const actual = formatDate(list);
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body: '',
        created_at: new Date('2016-08-18T12:07:52.389Z')
      },
      {
        title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body: '',
        created_at: new Date('2017-07-20T20:57:53.256Z')
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body: '',
        created_at: new Date('2017-07-21T17:54:10.346Z')
      }
    ];
    expect(actual).to.eql(expected);
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
