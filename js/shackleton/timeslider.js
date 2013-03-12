/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, globals, esri, map, SKMapResponse, SKTimeSliderContainer:true*/

    var SKTimeSlider,
        SKTimeSliderBuild,
        thisTimeSlider,
        thisTimeProperties = null,
        thisTimeExtent,
        thisTimeSliderLabels;


//
// Enable the user to view data over time with a simple sliding widget
//
// When a user clicks play, it shows the user data as it progressed over time
// one year at a time.
//
define([
    'dojo/_base/declare',
    'esri/dijit/TimeSlider'
], function (
    declare
) {
    
    SKTimeSlider = declare('shackleton.timeslider', null, {
        
        buildTimeSlider: function (SKTimeSliderContainer) {
            
            jQuery('#timeslider').css('display', 'block');
            
            thisTimeSliderWidget = SKMapResponse.itemInfo.itemData.widgets.timeSlider.properties;

            map.setTimeExtent(thisTimeProperties.timeExtent);

            thisTimeSlider = new esri.dijit.TimeSlider({
                'thumbCount': thisTimeSliderWidget.thumbCount,
                'thumbMovingRate': thisTimeSliderWidget.thumbMovingRate
            }, dojo.byId(SKTimeSliderContainer));

            map.setTimeSlider(thisTimeSlider);

            var layerTimeExtent = thisTimeProperties.timeExtent;
            layerTimeExtent.startTime = thisTimeProperties.timeExtent.startTime;
            thisTimeSlider.createTimeStopsByTimeInterval(layerTimeExtent, 1, thisTimeProperties.timeIntervalUnits);

            thisTimeSlider.startup();

            var thisTimeSliderLabels = [thisTimeProperties.timeExtent.startTime.getFullYear(), thisTimeProperties.timeExtent.endTime.getFullYear()];
            thisTimeSlider.setLabels(thisTimeSliderLabels);

        },

        constructor: function (SKTimeSliderContainer, thisTimeProperties) {

            if (thisTimeProperties !== null) {
                this.buildTimeSlider(SKTimeSliderContainer);
            }
            else {
                exit();
            }


        }

    });

    return {
        SKTimeSlider: SKTimeSlider
    };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jssamples/#sample/time_slider_layerdef" target=_blank">Time Slider Layer Definition</a>
// - <a href="http://ft.maps.arcgis.com/home/item.html?id=126e9cd578234588a8823fad31b0c3a8" target="_blank">San Francisco street trees by year</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/samples/time_slider_layerDef/index.html" target="_blank">Progressive Time Slider</a>
// - <a href="http://ft.maps.arcgis.com/apps/OnePane/azuretime/index.html?webmap=7ee5c1c5a42040ecbdde145d5c5eb283" target="_blank">Our map in Esri's Date Enabled Web Application</a>

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

