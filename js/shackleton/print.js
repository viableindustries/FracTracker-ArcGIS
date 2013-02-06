//
// Enable the user print the map they see on their screen to a PDF
//
define([ 'dojo/_base/declare', 'esri/dijit/Print' ], function( declare, esriDijitPrint ) {
    
  var SKPrint = declare('shackleton.print', null, {
    
    constructor: function() {
      
      var thisPrinter = new esri.dijit.Print({
        map: map,
        templates: [{
          label: "Layout",
          format: "PDF",
          layout: "A4 Portrait",
          layoutOptions: {
            titleText: defaults.details.title,
            authorText: "FracTracker Alliance",
            copyrightText: "FracTracker Alliance © 2013",
            scalebarUnit: "Miles",
          },
          exportOptions: {
            dpi: 300
          }
        }],
        url: "http://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
      }, dojo.byId('print-initialize'));
      
      thisPrinter.startup();
      
      jQuery('.print-initial .dijitButtonText').text('Create a PDF').addClass('btn');
            
      dojo.connect( thisPrinter,'onPrintStart', function() {
        jQuery('.print-initial, .print-processing').toggle(); 
      });
      
      dojo.connect( thisPrinter, 'onPrintComplete', function( value ) {
        jQuery('.print-processing, .print-complete').toggle(); 
        jQuery('.print-complete a').attr('href', value.url);
      });  
  
    }

  });

  return {
    SKPrint: SKPrint
  };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#print" target=_blank">Class: Print</a>

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


