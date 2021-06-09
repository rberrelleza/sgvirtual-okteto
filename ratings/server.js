const express = require("express");
const mongo = require("mongodb").MongoClient;

const app = express();
app.use(express.json());

const url = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DATABASE}`;

function startWithRetry() {
  mongo.connect(url, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 1000,
    socketTimeoutMS: 1000,
  }, (err, client) => {
    if (err) {
      console.error(`Error connecting, retrying in 1 sec: ${err}`);
      setTimeout(startWithRetry, 1000);
      return;
    }

    const db = client.db(process.env.MONGODB_DATABASE);

    app.listen(8080, () => {
      app.get("/api/ratings/:isbn", (req, res, next) => {
        console.log(`GET /api/ratings/${req.params["isbn"]}`)
        db.collection('ratings').findOne({isbn: req.params["isbn"]}, (err, result) =>{
          if (err){
            console.log(`failed to query ratings: ${err}`)
            res.json({});
            return;
          }
          if (result){
            res.json(result);
          } else{
            res.json({rating: 0})
          }
        });
      });

      app.post("/api/ratings/:isbn", (req, res, next) => {
        console.log(`POST /api/ratings/${req.params["isbn"]}`)
        isbn = req.params["isbn"]
        rating = req.body["rating"]
        console.log(isbn, rating)
        
        db.collection('ratings').findOneAndUpdate({isbn: isbn}, {$set: {rating:rating}}, {upsert: true}, (err, result) =>{
          if (err){
            console.log(`failed to update ratings: ${err}`)
            next(err)
            return
          }

          console.log(result)
          res.json(result);
        });
      });

      console.log("Server running on port 8080.");
    });
  });
};

startWithRetry();