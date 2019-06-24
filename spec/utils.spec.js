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

describe('makeRefObj', () => {
  it('returns an empty object when invoked with an empty array', () => {
    const list = [];
    const actual = makeRefObj(list);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it('takes an array with a single object and returns a reference object keys with each items title and the values being each items corresponding id', () => {
    const list = [{ article_id: 1, title: 'A' }];
    const actual = makeRefObj(list);
    const expected = { A: 1 };
    expect(actual).to.eql(expected);
  });
  it('takes an array of multiple objects and returns a reference object keys with each items title and the values being each items corresponding id', () => {
    const list = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }];
    const actual = makeRefObj(list);
    const expected = { A: 1, B: 2 };
    expect(actual).to.eql(expected);
  });
});

describe('formatComments', () => {
  it('returns a new empty array, when passed an empty array', () => {
    const comments = [];
    const articleRef = {};
    const actual = formatComments(comments, articleRef);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it('takes an array with an object containing a created_by and a belongs_to property and returns a new array with these renamed to author and article_id respectively', () => {
    const comments = [{ created_by: 'tickle122', belongs_to: 'World Cup', created_at: 1468087638932 }];
    const articleRef = { 'World Cup': 1 };
    const actual = formatComments(comments, articleRef);
    const expected = [{ author: 'tickle122', article_id: 1, created_at: new Date('2016-07-09T18:07:18.932Z') }];
    expect(actual).to.eql(expected);
  });
  it('takes an array with an object containing a created_by and a belongs_to property and returns a new array with these renamed to author and article_id respectively', () => {
    const comments = [{ body: 'Itaque quisquam', created_by: 'tickle122', belongs_to: 'World Cup', votes: -1, created_at: 1468087638932 }, { body: 'Nobis', belongs_to: 'Making sense of Redux', created_by: 'grumpy19', votes: 7, created_at: 1478813209256 }];
    const articleRef = { 'World Cup': 1, 'Making sense of Redux': 2 };
    const actual = formatComments(comments, articleRef);
    const expected = [{ body: 'Itaque quisquam', author: 'tickle122', article_id: 1, votes: -1, created_at: new Date('2016-07-09T18:07:18.932Z') }, { body: 'Nobis', article_id: 2, author: 'grumpy19', votes: 7, created_at: new Date('2016-11-10T21:26:49.256Z') }];
    expect(actual).to.eql(expected);
  });
});
