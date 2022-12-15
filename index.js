const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const Datastore = require('nedb');
const database = new Datastore('vidcast.db');
database.loadDatabase();

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

// add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// static files
app.use(express.static(__dirname + '/public'));

// upload single file
// https://attacomsian.com/blog/uploading-files-nodejs-express
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

// view engine and routing setup
const indexRouter = require('./routes/index');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/', indexRouter);

//make uploads directory static
app.use(express.static('uploads'));

//start app 
const port = process.env.PORT || 3001;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);