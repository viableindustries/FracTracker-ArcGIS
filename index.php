<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="" />
        
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="translucent black" />
        
        <link rel="stylesheet" href="css/global.css" />
        
        <link rel="shortcut icon" href="favicon.gif" />
        <link rel="apple-touch-startup-image" href="images/ios/apple-touch-startup-image.png" />
        <link rel="apple-touch-icon-precomposed" href="images/ios/apple-touch-icon-precomposed.png" />
        <link media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image" href="images/ios/apple-touch-startup-image-portrait.png" />
        <link media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image" href="images/ios/apple-touch-startup-image-landscape.png" />

        <title>FracMapper by FracTracker Alliance</title>

        <!-- Make sure we aren't caching anything -->
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta http-equiv="pragma" content="no-cache" />

  </head>

    <body>

        <div id="progress" class="progress progress-success progress-striped active">
          <div class="bar" style="width: 100%;">Loading map layers ...</div>
        </div>

        <a id="logo" class="logo element-invisible" href="http://maps.fractracker.org/" target="_blank">FracTracker</a>

        <section id="map"></section>

        <!-- Start:Toolbar -->
        <aside id="toolbox" class="toolbox-container element-invisible">
            <div class="toolbox fullscreen-navigation">
                <nav class="toolbox-inner">
                    <ul>
                        <li><a href="#details" role="button" title="Learn more about the contents of this map" data-toggle="modal" data-target="#details" data-dynamic="true"><i class="icon icon-about"></i> <span>About</span></a></li>
                        <li><a href="#search" title="Find a location or specific information on this map" data-toggle="modal"><i class="icon icon-search"></i> <span>Search</span></a></li>
                        <li><a href="#layers" title="Toggle the layers of this map"><i class="icon icon-layers"></i> <span>Layers</span></a></li>
                        <li><a href="#legend" title=""><i class="icon icon-legend"></i> <span>Legend</span></a></li>
                        <li><a href="#basemaps" title="" data-toggle="modal" data-target="basemaps" data-dynamic="true"><i class="icon icon-basemap"></i> <span>Base Maps</span></a></li>
                        <li><a href="#measurements" title=""><i class="icon icon-measure"></i> <span>Measure</span></a></li>
                        <li><a href="#notes" title=""><i class="icon icon-note"></i> <span>Notes</span></a></li>
                        <li><a href="#export" title="" data-toggle="modal"><i class="icon icon-export"></i> <span>Export</span></a></li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- End:Toolbar -->
          
        <!-- : Layers -->
        <!-- <div id="overlay" class="toolbox-container draggable">
          <div class="toolbox">
            <div class="toolbox-inner">
              <a data-toggle="modal" href="#modalOverlay" title="" target="" class="overlay-button titleButton modal-close-button close">close</a>
              <h3>Map Overlays</h3>
              <div id="overlay-content"></div>
            </div>
          </div>
        </div> -->

        <!-- : Bookmarks -->
        <!-- <div id="bookmarks" class="toolbox-container draggable">
          <div class="toolbox">
            <div class="toolbox-inner">
              <a data-toggle="modal" href="#modalBookmarks" title="" target="" class="bookmarks-button titleButton modal-close-button close">close</a>
              <h3>Bookmarks</h3>
              <div id="bookmarks-content"></div>
            </div>
          </div>
        </div> -->

        <!-- : Legend -->
        <!-- <div id="legend" class="toolbox-container draggable">
          <div class="toolbox">
            <div class="toolbox-inner">
              <a data-toggle="modal" href="#modalLegend" title="" target="" class="legend-button titleButton modal-close-button close">close</a>
              <h3>Legend</h3>
              <div id="legend-content" class="panel_content"></div>
            </div>
          </div>
        </div> -->

        <!-- : Measurement Tools -->
        <!-- <div id="measurements" class="toolbox-container draggable measurements">
          <div class="toolbox">
            <div class="toolbox-inner">
              <a data-toggle="modal" href="#modalMeasurement" title="" target="" class="measurement-button titleButton modal-close-button close">close</a>
              <h3>Measurement Tools</h3>
              <div id="measurement-content"></div>
            </div>
          </div>
        </div> -->

        <!-- Modal: Address Search Form -->
        <div class="modal hide" id="search">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h3>Find an address</h3>
          </div>
          <div class="modal-body">
            <form id="search-location" class="form-inline search" method="POST">
              <label class="control-label" for="input01">Search for </label>
              <select id="search-type" class="input-small" disabled>
                <option value="address">an address</option>
                <option value="data">data</option>
              </select> like 
              <input type="text" class="input-xlarge" id="address" placeholder="e.g., Pittburgh, PA" value="" /><p id="address-description">or find my <a data-dismiss="modal" href="#event_findMe" alt="Find my current location" class="event_findMe">current location</a></p>
              <input type="text" class="input-xlarge" id="data" placeholder="e.g., Well 1029384756" value="" />
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary event_executeLocationSearch" data-dismiss="modal">Locate Address</button>
            <button class="btn btn-primary event_executeDataSearch element-invisible" data-dismiss="modal">Search Data</button>
          </div>
        </div>

        <!-- Modal: Basemaps -->
        <div class="modal hide" id="basemaps">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h3>Base Map</h3>
          </div>
          <div class="modal-body">
            <form id="advanced-settings" class="form-vertical" action="#settings" method="POST">

              <div id="BookmarksProvider_alert" class="alert alert-success alert-hidden">
                <strong>The base map has been changed successfully</strong>
              </div>
          
              <div class="control-group">
                <div class="controls">
                  <div id="basemap-gallery"></div>
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button class="btn" data-dismiss="modal">Cancel</button>
            <button type="submit" data-dismiss="modal" class="btn btn-primary">Update</button>
          </div>
        </div>

        <!-- Modal: Map Details -->
        <div class="modal hide" id="details">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h4>About this map</h4>
          </div>

          <div class="modal-body">
            <h3 id="details-title"></h3>
            <div id="details-snippet"></div>
            <div id="details-description"></div>
            <div id="details-credit"></div>
            <div id="details-typeKeywords"></div>
            <div id="details-tags"></div>
          </div>
        </div>


        <!-- Modal: Map Embed -->
        <div class="modal hide" id="export">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h3>Embed this map</h3>
          </div>

          <div class="modal-body">
            <form class="form-horizontal" id="embed-code">
              <div class="control-group">
                <label class="control-label" for="input01">Embed Code</label>
                <div class="controls">
                  <textarea class="input-xlarge"></textarea>
                  <p class="help-block"><small>Click to select the code, copy the code, &amp; then paste.<br />The code will change based your choices below.</small></p>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label" for="input01">Custom size</label>
                <div class="controls">
                  <input type="text" class="input-small" id="embed-width" placeholder="width" /> x <input type="text" class="input-small" id="embed-height" placeholder="height" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <script type="text/javascript"> 
            var dojoConfig = {
              parseOnLoad: true,
              packages: [
                { name: 'esriTemplate', location: location.pathname.replace(/\/[^/]+$/, '') },
                { name: 'shackleton',   location: location.pathname.replace(/\/[^/]+$/, '') + 'js/shackleton', main: 'app' }
              ]
           };
        </script>
        <script src="//serverapi.arcgisonline.com/jsapi/arcgis/3.3/"></script>
        <script src="js/lib/jquery-1.8.1.min.js"></script>
        <script src="js/lib/bootstrap.min.js"></script>
        <script src="js/init.js?<?php print date('U'); ?>"></script>
    
   </body>

</html>
