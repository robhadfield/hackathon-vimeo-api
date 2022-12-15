const express = require('express');
const Datastore = require('nedb');

const database = new Datastore('vidcast.db');
database.loadDatabase();

const app = express();

app.post('/vidcast-api', async (req, res) => {
    try {
        if (req.query.video_id) {
            database.insert({video_id:req.query.video_id});
            //send response
            res.send({
                status: 200,
                message: 'Vidcast ID Saved',
                id: req.query.video_id
            });
        } else {
            res.send({
                status: 200,
                message: 'No video_id provided :('
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//start app 
const port = process.env.PORT || 3001;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);