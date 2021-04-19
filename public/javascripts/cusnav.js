/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('navigate', {
    schema: {
        url: {type: 'string'},
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
    this.el.addEventListener('click', function (evt) {
      var el1 = document.querySelectorAll('a-link');
      for(elem of el1)
        console.log(elem.getAttribute('position'));

      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});
