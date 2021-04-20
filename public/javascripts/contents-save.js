/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('navigate', {
    schema: {
        scene_id: {type: 'string', default:"hello"},
    },
/*
    init: function () {
        var data = this.data;
        var el = this.el;

        this.el.addEventListener('click', function (event) {
            event.preventDefault();
            // Fade out image.
            window.location = data.url;
            // Wait for fade to complete.
        });
    },*/
    init: function () {
    
    var self = this;
    this.el.addEventListener('click', function (evt) {
      var el1 = document.querySelectorAll('a-link');


      var jdata = new Object();

      //jdata.left   = el1[0].getAttribute('position');
      //jdata.right  = el1[1].getAttribute('position');
      //jdata.up     = el1[2].getAttribute('position');
      //jdata.down   = el1[3].getAttribute('position');

      for(elem of el1)
      {
        jdata[elem.getAttribute('loc')] = [elem.getAttribute('position'), elem.getAttribute('rotation')];
      }
      
      this.setAttribute('material', 'color', 'green');
      //console.log('I was clicked at: ', evt.detail.intersection.point);

      var url = 'scene_update/' + self.data.scene_id;
      console.log(url)
      /*$.ajax({
          type: "PUT",
          url: url,
          data: el1,
      });*/
      var xhr = new XMLHttpRequest();
      
      const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); 
      
      xhr.onreadystatechange = function() { // Call a function when the state changes.
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
             console.log(xhr.responseText);
          }
      }
      console.log(JSON.stringify(jdata, getCircularReplacer()));
      xhr.send(JSON.stringify(jdata, getCircularReplacer())); 
    });
  }
});
