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

describe('makeRefObj', list => {
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

// This utility function should be able to take an array of comment objects (comments) and a reference object, and return a new array of formatted comments.

// Each formatted comment must have:

// Its created_by property renamed to an author key
// Its belongs_to property renamed to an article_id key
// The value of the new article_id key must be the id corresponding to the original title value provided
// Its created_at value converted into a javascript date object
// The rest of the comment's properties must be maintained

describe('formatComments', (comments, articleRef) => {
  it('returns a new empty array, when passed an empty array', () => {
    const comments = [];
    const articleRef = {};
    const actual = formatComments(comments, articleRef);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it('takes an array with an object containing a created_by property and returns a new array with this property renamed to an author key', () => {
    const comments = [{ created_by: 'tickle122' }];
    const articleRef = { author: 'tickle122' };
    const actual = formatComments(comments, articleRef);
    const expected = [{ author: 'tickle122' }];
    expect(actual).to.eql(expected);
  });
});
