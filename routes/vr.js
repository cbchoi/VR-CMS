var express = require('express');
var router = express.Router();
var VRItem = require('../models/vrModel');
var Connections = require('../models/connectModel')
var mongoose = require('mongoose');

/* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('vr', { title: 'Express' });
//});

// init gfs
const mongoURI = "mongodb://localhost:27017/vr_images";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "images"
  });
});


router.get('/:vid', function(req, res) {
    VRItem.findOne({_id: req.params.vid}, function (err, vritem) {
        if (err) return res.status(500).json({ error: err });
        if (!vritem) return res.status(404).json({ error: 'vritem not found' });

        

        var linkList = {left:vritem.left_name, up:vritem.up_name, right:vritem.right_name, down:vritem.down_name};
        //console.log(linkList);
        return res.render("vr_item", { vrimage_id: vritem.image_file, arrowList:linkList });
    })
});

router.get('/scene/:scene_name', function(req, res) {
    VRItem.findOne({scene_name: req.params.scene_name}, function (err, vritem) {
        if (err) return res.status(500).json({ error: err });
        if (!vritem) return res.status(404).json({ error: 'vritem not found' });

        var linkList = {left:vritem.left_name, up:vritem.up_name, right:vritem.right_name, down:vritem.down_name};
        //console.log(linkList);
        return res.redirect("/vr/" + vritem._id);
        //return res.render("vr_item", { vrimage_id: vritem.image_file, arrowList:linkList });
    })
});

router.get("/image/:image_id", (req, res) => {
  //console.log('id', req.params.id)
  const obj_id = new mongoose.Types.ObjectId(req.params.image_id);
  const file = gfs
    .find(obj_id)
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      
      gfs.openDownloadStream(obj_id).pipe(res);
    });
});

module.exports = router;