/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('navigate', {
    schema: {
        image_id: {type: 'string', default:"hello"},
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
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    var self = this;
    this.el.addEventListener('click', function (evt) {
      var el1 = document.querySelectorAll('a-link');
      var jdata = new Object();

      jdata.left   = el1[0].getAttribute('position');
      jdata.right  = el1[1].getAttribute('position');
      jdata.up     = el1[2].getAttribute('position');
      jdata.down   = el1[3].getAttribute('position');

      for(elem of el1)
        console.log(elem.getAttribute('position'));

      console.log(self.data.image_id)
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      //console.log('I was clicked at: ', evt.detail.intersection.point);

      var url = '/vr/scene_update/' + self.data.image_id;
      console.log(url)
      /*$.ajax({
          type: "PUT",
          url: url,
          data: el1,
      });*/
      var xhr = new XMLHttpRequest();
      
      xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
          console.log(xhr.responseText);
        } else {
          console.error(xhr.responseText);
        }
      };

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

      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json'); 
      console.log(JSON.stringify(jdata, getCircularReplacer()))
      xhr.send(JSON.stringify(jdata, getCircularReplacer())); 
    });
  }
});
