const telegram = require('telegram-bot-api');
const MongoClient = require('mongodb').MongoClient;

const AddUser = require('./models/AddUser');

const api = new telegram({ token: '905006022:AAEHX5KqWTtK5SFzCacwuirLGOnEceh1cSw', updates: { enabled: true }});
const uri = 'mongodb+srv://admin:codingiseasy@cluster-cgxus.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'Cluster';

client.connect(err => {

  if(err) return console.error(err)
  const db = client.db(dbName);

  api.on('message', message => {
    AddUser(message, db, api);
  })

})