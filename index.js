const express = require('express')
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5055;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9yn9k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection error', err);
  const eventCollection = client.db("volunteernetwork").collection("events");

app.get('/events',(req, res)=>{
  eventCollection.find()
  .toArray((err,items)=>{
    res.send(items)
  })
})


  app.post('/addEventNetwork',(req,res)=>{
    const newEvent = req.body;
    eventCollection.insertOne(newEvent)
    .then(result=>{
      res.send(result.insertedCount > 0)
     
    })
  })
  
  app.delete('/deleteEvent/:id',(req, res)=>{
    const id = ObjectID(req.params.id);
    console.log('delete this id', id);
    eventCollection.deleteOne({_id:id})
    .then(result=>{
      res.send(result.deletedCount>0)
    })
  })

});



app.listen(port);