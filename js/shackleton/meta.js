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

    constructor: function ( thisMeta ) {

      if (jQuery) {
        jQuery('#details-title').html(thisMeta.title);
        jQuery('#details-credit').html(thisMeta.credit);
        jQuery('#details-description').html(thisMeta.description);

        /**
         * Break out tags into a comma separated list
         */
        var tags;

        for (var keys in thisMeta.tags) {
          if (thisMeta.tags[keys] !== 'undefined') {
            tags += thisMeta.tags[keys] + ',';
          };
        };

        jQuery('#details-tags').html(tags.substring(0, tags.length-1));

      };

    }

  });

  return meta;

});