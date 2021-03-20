/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('navigate', {
    schema: {
        on: {type: 'string'},
        url: {type: 'string'},
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        el.addEventListener(data.on, function (event) {
            event.preventDefault();
            // Fade out image.
            window.location = data.url;
            // Wait for fade to complete.
        });
    },
});