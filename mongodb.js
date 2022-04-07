const {MongoClient,ObjectId} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(error)
    }
    const db = client.db(databaseName)
    // db.collection('users').insertOne({ name: 'Arisha', age: 18 },(error,result) => {
    //     if(error)
    //     {
    //         return error
    //     }
    //
    //     console.log(result)
    // })
    //   db.collection('tasks').insertMany([{description:'Buying Groceries',completed:true},
    //       {description: 'Learn DSA',completed: false}
    //   ],(error,result) => {
    //       if(error) return console.log(error)
    //       console.log(result)
    //   })

      // db.collection('tasks').find({_id: new ObjectId('62485db5673bdae5022fcd8b')}).toArray((error,result) => {
      //     console.log(result)
      // })
      //
      // db.collection('tasks').find({completed:false}).toArray((error,result) => {
      //     console.log(result)
      // })
    db.collection('tasks').updateMany({},{
        $set: {completed:false}
    }).then((result) => {console.log(result)}).catch((error) => {console.log(error)})
  }
)
