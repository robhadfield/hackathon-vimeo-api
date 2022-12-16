const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.post('/', (req, res) => {
    try {
        if (req.query.video_id) {
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
})

const port = process.env.PORT || 3002;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

module.exports = app;