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

        
        if(!vritem.links)
        {
          var linkList = {left: {name:vritem.left_name, x:-6, y:1.5, z:0, yaw:0, pitch:90, roll:0},
                          up:   {name:vritem.up_name, x:0, y:1.5, z:6, yaw:0, pitch:0, roll:0},
                          right:{name:vritem.right_name, x:6, y:1.5, z:0, yaw:0, pitch:-90, roll:0},
                          down: {name:vritem.down_name, x:0, y:1.5, z:-6, yaw:0, pitch:0, roll:0}} 
        }  
        //{left:{vritem.left_name, up:vritem.up_name, right:vritem.right_name, down:vritem.down_name};
        else
        {
          var linkList = vritem.links;
        }
        console.log(linkList);
        return res.render("vr_item", { vrimage_id: vritem.image_file, arrowList:linkList });
    })
});

router.get('/scene/:scene_name', function(req, res) {
    VRItem.findOne({scene_name: req.params.scene_name}, function (err, vritem) {
        if (err) return res.status(500).json({ error: err });
        if (!vritem) return res.status(404).json({ error: 'vritem not found' });

        //if 
        //var linkList = {left:vritem.left_name, up:vritem.up_name, right:vritem.right_name, down:vritem.down_name};
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

router.put("/scene_update/:id", (req, res)=>{
  console.log(req.params.id, req.params);
  return res.send('updated');
});

router.get("/scene_update/:id", (req, res)=>{
  console.log(req.params.id, req.params);
});
module.exports = router;