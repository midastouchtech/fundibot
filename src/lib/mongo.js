// mongodb.js

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://d99c137:KioMtgdZQRgLsDtn@cluster0.ssyma3l.mongodb.net/?retryWrites=true&w=majority"
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to Environment vars')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
        useUnifiedTopology: true,
      },
      {
        useNewUrlParser: true,
      },
      {
        connectTimeoutMS: 30000,
      },
      {
        keepAlive: 1,
      })
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, {
    useUnifiedTopology: true,
  },
  {
    useNewUrlParser: true,
  },
  {
    connectTimeoutMS: 30000,
  },
  {
    keepAlive: 1,
  })
  clientPromise = client.connect()
}

module.exports = clientPromise