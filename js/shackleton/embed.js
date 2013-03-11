//
// Enable the user to embed the map via an iFrame on any site
//
define([ 'dojo/_base/declare' ], function( declare ) {
    
  var SKEmbed = declare('shackleton.embed', null, {
    
    constructor: function() {
      
      var _embed   = '#embed-code textarea';
      var _url     = 'http://maps.fractracker.org/2.0/?embed=1&appid=' + globals.query.appid;
      var _code    = jQuery(_embed).val('<iframe width="' + (jQuery('#embed-width').val() != '' ? jQuery('#embed-width').val(): '640') + '" height="' + (jQuery('#embed-height').val() != '' ? jQuery('#embed-height').val(): '360') + '" src="' + _url + '" frameborder="0" allowfullscreen></iframe>');

      /**
       * Change the width and height of the embed code
       * as the user updates it to their desired dimensions.
       */
      jQuery('#embed-width, #embed-height').keyup(function () {
        jQuery(_embed).val('<iframe width="' + (jQuery('#embed-width').val() != '' ? jQuery('#embed-width').val(): '640') + '" height="' + (jQuery('#embed-height').val() != '' ? jQuery('#embed-height').val(): '360') + '" src="' + _url + '" frameborder="0" allowfullscreen></iframe>');
      });
      
      /**
       * Make sure that the textarea selects all
       * text when the user clicks inside of the
       * embed code textarea.
       */
      jQuery(_embed).focus(function() {

        this.select();
        this.onmouseup = function () {
          this.onmouseup = null;
          return false;
        };

      });

      jQuery('#fullscreen-mode').attr('href', 'http://maps.fractracker.org/2.0/?appid=' + globals.query.appid );      

      if (globals.query.embed == 1) {
          jQuery('#fullscreen').toggle();
      } else {
          jQuery('#toolbox').toggle();          
      }

    }

  });

  return {
    SKEmbed: SKEmbed
  };

});

// * * *
//     Shackleton is a framework for building web map applications
//     that are compatible with ArcGIS Online.
//
//     It is named in honor of the famous and widely respected
//     British Antarctic explorer Sir Ernest Henry Shackleton.
//
//     Viable Industries, ArcGIS Compatible Web Application,
//     where applicable. This application was built by the 
//     folks at Viable Industries for use by it's clients only. 
//     Any code herein is property of Viable Industries.
//     unless where otherwise noted property of Esri/ArcGIS
//
//     To find out how you can use this software or have your
//     own version of this software, custom built to fit your
//     organizations needs, contact us by visiting
//     www.viableindustries.com or emailing us at joshua@viable.io
//
//     Copyright (c) 2013 Viable Industries, All rights reserved.
//     Unless otherwise noted. 


