/**
 * Developed Simple ArcGIS Web Application (c) 2013
 *
 *
 * This application was built by the folks at Viable for
 * use by it's clients. Any code herein is property of Developed
 * Simple unless where otherwise noted property of ESRI.
 *
 * To find out how you can use this software or have your
 * own version of this software built to fit your custom
 * needs, contact us by visiting www.developedsimple.com.
 *
 */

define([ 'dojo/_base/declare' ], function( declare ) {

  var meta = declare('shackleton.meta', null, {

    constructor: function () {

      if (jQuery) {
        jQuery('#details-title, title').html(defaults.details.title);
        jQuery('#details-credit').html(defaults.details.credit);
        jQuery('#details-description').html(defaults.details.description);

        /**
         * Break out tags into a comma separated list
         */
        var tags;

        for (var keys in defaults.details.tags) {
          if (defaults.details.tags[keys] !== 'undefined') {
            tags += defaults.details.tags[keys] + ',';
          };
        };

        jQuery('#details-tags').html(tags.substring(0, tags.length-1));

      };

    }

  });

  return meta;

});