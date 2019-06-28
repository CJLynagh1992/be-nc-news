# NC-News

This project was to build the API that I will be using when I moveonto the Front End block of the Northcoders course. The database will store articles, users, topics and comments which are made available through various endpoints.

It is presently hosted at: https://colum-nc-news.herokuapp.com/api

## Getting Started

The below will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- node v11.14.0
- postgresSQL 11
- npm 6.9.0

I also used these as dependencies in the project:

- express: 4.17.1
- knex: 0.17.6
- chai: 4.2.0
- chai-sorted: 0.2.0
- mocha: 6.1.4
- supertest: 4.0.2

### Installing

1. Clone this repository into the correct files on local system

```bash
git clone https://github.com/CJLynagh1992/be-nc-news.git
```

2. cd into the respository

```bash
cd be-nc-news
```

3. open in your code editor

```bash
code .
```

4. Install the necessary dependencies

```bash
npm install
```

5. setup your database by running the correct script (You should also take a minute to familiarise yourself with the npm scripts you have been provided)

```bash
npm run setup-dbs
```

6. Knexfile.js - create your file and use the below:

```js
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: 'nc_news'
      // username,
      // password
    }
  },
  test: {
    connection: {
      database: 'nc_news_test'
      // username,
      // password
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

7. Run the seed script to seed

```bash
npm run seed
```

## Running the tests:

To run the provided tests on your endpoints:

```bash
npm run t
```

### Testing for each endpoint

/api/topics:

- GET: Tested that it returns an array of topic objects with correct properties and the correct length

/api/users/:username:

- GET: Tested that it returns an object of the passed user with the correct properties. Also tested for when no user has been found

/api/articles/article_id:

- GET: Tested that it returns an article object with correct properties and will also return correct errors when article_id does not exist or is an invalid ID

- PATCH: Tested that an article can have its votes updated when passed an object of inc_votes and valid number. It will also return the correct errors it inc_votes value is invalid or the url does not exist / is invalid. Will also ignore any additional properties in object

/api/articles/:article_id/comments:

- GET: Tested that we can retrieve all of a speciic articles comments by passing it into the url. It will return correct errors when the article does not exist or is invalid.

- POST: Tested that a new comment can be posted to a specified article. It needs to be passed an object with properties username and body and will return correct errors when properties are missing or the article_id is invalid / does not exist

/api/articles:

- GET: Tested to return an array of articles objects with the correct properties. This endpoint can use queries such as author, topic, sort_by and order and error handling has been added for these queries being invalid and/or not existing.

/api/comments/:comment_id:

- GET: Tested that it returns a comment object with correct properties and will also return correct errors when comment_id does not exist or is an invalid ID

- PATCH: Tested that a comment can have its votes updated when passed an object of inc_votes and valid number. It will also return the correct errors it inc_votes value is invalid or the url does not exist / is invalid. Will also ignore any additional properties in object

/api/comments/:comment_id:

- DELETE: Tested to ensure we can delete a comment by passing its ID. Tested for returning the correct errors when the ID passed is invalid and/or doesnt't exist

## Versioning

1.0

## Author

Colum Lynagh
