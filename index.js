const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Database
let video_ids = [];

app.get('/', (req, res) => {
    res.send({
        status: 200,
        current: video_ids
    });
});

app.get('/clear', (req, res) => {
    video_ids = [];
    res.send({
        status: 200,
        message: 'list cleared',
        current: video_ids
    });
});

app.post('/', (req, res) => {
    try {
        if (req.query.video_id) {
            video_ids.push(req.query.video_id);
            //send response
            res.send({
                status: 200,
                message: 'Vidcast ID Saved',
                id: req.query.video_id,
                current: video_ids
            });
        } else {
            res.send({
                status: 200,
                message: 'No video_id provided',
                current: video_ids
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

const port = process.env.PORT || 3002;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

module.exports = app;