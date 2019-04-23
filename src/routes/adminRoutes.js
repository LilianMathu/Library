const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: 'Cinderella',
    genre: 'fiction',
    author: 'Lilian Taylor',
    read: true,
  },
  {
    title: 'Rapunzel',
    genre: 'fiction',
    author: 'David Stockman',
    read: false,
  },
  {
    title: 'Winnie the Pooh',
    genre: 'fiction',
    author: 'Eleanor Grace',
    read: false,
  },
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('correctly connected to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = router;
