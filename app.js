const http = require("http");
const MongoClient = require("mongodb").MongoClient;

//Ex1
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/student";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      res.write("Database created !");
      db.close();
      res.end();
    });
  })
  .listen(3000);

//Ex2
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      dbo.createCollection("studentmarks", (err, response) => {
        if (err) throw err;
        res.write("Collection created!");
        db.close();
        res.end();
      });
    });
  })
  .listen(3000);

//Ex3
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var myobj = [
        { name: "Mala", maths_marks: 45, english_marks: 53, science_marks: 72 },
        { name: "Vanu", maths_marks: 80, english_marks: 75, science_marks: 85 },
        { name: "Kala", maths_marks: 32, english_marks: 46, science_marks: 53 },
        {
          name: "Aruli",
          maths_marks: 78,
          english_marks: 85,
          science_marks: 80,
        },
        {
          name: "Shayu",
          maths_marks: 80,
          english_marks: 76,
          science_marks: 65,
        },
        {
          name: "Kumaran",
          maths_marks: 32,
          english_marks: 73,
          science_marks: 84,
        },
        {
          name: "Lucky",
          maths_marks: 66,
          english_marks: 90,
          science_marks: 45,
        },
        { name: "Gva", maths_marks: 71, english_marks: 75, science_marks: 56 },
        { name: "Raam", maths_marks: 41, english_marks: 65, science_marks: 88 },
      ];

      dbo.collection("studentmarks").insertMany(myobj, (err, response) => {
        if (err) throw err;
        res.write("Inserted successfully !");
        db.close();
        res.end();
      });
    });
  })
  .listen(3000);

//Ex5
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var query = { maths_marks: { $gt: 50 } };

      dbo
        .collection("studentmarks")
        .find(query, { projection: { _id: 0, name: 1 } })
        .toArray((err, result) => {
          if (err) throw err;
          console.log(result);
          db.close();
          res.end();
        });
    });
  })
  .listen(3000);

//Ex6
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      dbo
        .collection("studentmarks")
        .updateMany({}, { $set: { average: 1 } }, (err, response) => {
          if (err) throw err;

          console.log(response);
          db.close();
        });
      res.write("Updated");
      res.end();
    });
  })
  .listen(3000);

//Ex7
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      dbo
        .collection("studentmarks")
        .updateOne(
          { name: "Lucky" },
          { $rename: { science_marks: "marks_science" } },
          { $set: { marks_science: 75 } },
          (err, response) => {
            if (err) throw err;

            console.log(response);
            db.close();
          }
        );
      res.write("Renamed and updated data");
      res.end();
    });
  })
  .listen(3000);

//Ex8
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var query = {
        $and: [
          { maths_marks: { $gt: 50 } },
          { english_marks: { $gt: 50 } },
          { science_marks: { $gt: 50 } },
        ],
      };
      dbo
        .collection("studentmarks")
        .find(query, { projection: { _id: 0, name: 1 } })
        .toArray((err, response) => {
          if (err) throw err;
          console.log(response);
          db.close();
        });
    });
    res.write("Find it !");
    res.end();
  })
  .listen(3000);

//Ex9
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var query = {
        $and: [{ maths_marks: { $lt: 50 } }, { english_marks: { $gt: 50 } }],
      };
      dbo
        .collection("studentmarks")
        .find(query, { projection: { _id: 0, name: 1 } })
        .toArray((err, response) => {
          if (err) throw err;
          console.log(response);
          db.close();
        });
    });
    res.write("Find it !");
    res.end();
  })
  .listen(3000);

//Ex10
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var query = {
        $and: [{ maths_marks: { $lt: 40 } }, { science_marks: { $lt: 40 } }],
      };
      dbo
        .collection("studentmarks")
        .find(query, { projection: { _id: 0, name: 1 } })
        .toArray((err, response) => {
          if (err) throw err;
          console.log(response);
          db.close();
        });
    });
    res.write("Find it !");
    res.end();
  })
  .listen(3000);

//Ex11
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      dbo
        .collection("studentmarks")
        .updateOne(
          { name: "Raam" },
          { $unset: { science_marks: 1 } },
          (err, response) => {
            if (err) throw err;

            console.log(response);
            db.close();
          }
        );
      res.write("Remove science column data");
      res.end();
    });
  })
  .listen(3000);

//Ex12
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var query = { $set: { maths_marks: 87, english_marks: 23 } };

      dbo
        .collection("studentmarks")
        .updateOne(
          { name: "J0hn" },
          query,
          { upsert: true },
          (err, response) => {
            if (err) throw err;
            console.log(response);
            db.close();
          }
        );
    });
    res.write("Upsert data");
    res.end();
  })
  .listen(3000);

//Ex13
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var query = { $rename: { english_marks: "science_marks" } };

      dbo
        .collection("studentmarks")
        .updateOne({ name: "John" }, query, (err, response) => {
          if (err) throw err;
          console.log(response);
          db.close();
        });
    });
    res.write("Field updated");
    res.end();
  })
  .listen(3000);

//Ex14
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("student");
      var query = { name: "Kumaran" };
      dbo.collection("studentmarks").deleteOne(query, (err, response) => {
        if (err) throw err;
        console.log(response);
        db.close();
      });
    });
    res.write("Data deleted!");
    res.end();
  })
  .listen(3000);

//Ex15
http
  .createServer((req, res) => {
    console.log("Got a connetion");
    const url = "mongodb://localhost:27017/";

    try {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("student");
        var query = { $or: [{ name: "Kala" }, { name: "Aruli" }] };

        dbo
          .collection("studentmarks")
          .find(query, {
            projection: { maths_marks: 1, science_marks: 1, _id: 0, name: 1 },
          })
          .toArray((err, response) => {
            if (err) throw err;
            console.log(response);
            db.close();
          });
      });
    } catch (error) {
      console.log(error);
    }
    res.write("Find it!");
    res.end();
  })
  .listen(3000);
