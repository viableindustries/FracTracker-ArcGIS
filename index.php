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
                        <li><a href="#legend" title="" data-target="#legend"><i class="icon icon-legend"></i> <span>Legend</span></a></li>
                        <li><a href="#basemaps" title="" data-toggle="modal" data-target="#basemaps" data-dynamic="true"><i class="icon icon-basemap"></i> <span>Base Maps</span></a></li>
                        <li><a href="#measurements" title=""><i class="icon icon-measure"></i> <span>Measure</span></a></li>
                        <li><a href="#notes" title=""><i class="icon icon-note"></i> <span>Notes</span></a></li>
                        <li><a href="#export" data-dynamic="true" data-toggle="modal"><i class="icon icon-export"></i> <span>Export</span></a></li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- End:Toolbar -->

        <!-- Start:Legend -->
        <aside id="legend" class="toolbox-container draggable">
            <div class="toolbox">
                <div class="toolbox-inner">
                    <button class="close" data-dismiss="modal">×</button>
                    <h3>Legend</h3>
                    <div id="legend-content"></div>
                </div>
            </div>
        </aside>
        <!-- End:Toolbar -->

        <!-- Start:Layers -->
        <aside id="layers" class="toolbox-container draggable">
            <div class="toolbox">
                <div class="toolbox-inner">
                    <button class="close" data-dismiss="modal">×</button>
                    <h3>Layer</h3>
                    <div id="layers-content"></div>
                </div>
            </div>
        </aside>
        <!-- End:Layers -->
          
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
              <label class="control-label" for="search-type">Search for </label>
              <select id="search-type" class="input-small" disabled>
                <option value="address">an address</option>
                <option value="data">data</option>
              </select> like 
              <div id="search-address-test"></div>
              <input type="text" class="input-xlarge" style="display:none;" id="search-address" placeholder="e.g., Pittburgh, PA" value="" /><p id="address-description">or find my <a data-dismiss="modal" href="#event_findMe" title="Find my current location" class="event_findMe" id="geolocationBegin">current location</a></p>
              <input type="text" class="input-xlarge" style="display:none;" id="search-data" placeholder="e.g., Well 1029384756" value="" />
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary"  style="display:none;" id="search-address-begin" data-dismiss="modal">Locate Address</button>
            <button class="btn btn-primary" style="display:none;" id="search-data-begin" data-dismiss="modal">Search Data</button>
          </div>
        </div>

        <!-- Modal: Basemaps -->
        <div class="modal hide" id="basemaps">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h4>Change the base map</h4>
          </div>
          <div class="modal-body">

              <!-- <div id="BookmarksProvider_alert" class="alert alert-success alert-hidden">
                <strong>The base map has been changed successfully</strong>
              </div> -->
          
              <div class="control-group">
                <div class="controls">
                  <div id="basemaps-gallery"></div>
                </div>
              </div>

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
        <div class="modal hide fade" id="export">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h4>Export this map</h4>
          </div>

          <div class="modal-body">
            <h5>Embed this map</h5>
            <form class="form-horizontal" id="embed-code">
              <div class="control-group">
                <label class="control-label" for="embed-code-iframe">Embed Code</label>
                <div class="controls">
                  <textarea id="embed-code-iframe" class="input-xlarge"></textarea>
                  <p class="help-block"><small>Click to select the code, copy the code, &amp; then paste.<br />The code will change based your choices below.</small></p>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label" for="embed-width">Custom size</label>
                <div class="controls">
                  <input type="text" class="input-small" id="embed-width" placeholder="width" value="640" /> x <input type="text" class="input-small" id="embed-height" placeholder="height" value="360" />
                </div>
              </div>
            </form>
            
            <hr />
            
            <h5>Save as a PDF</h5>
            <div class="row-fluid print-initial">               
                <div class="span8">
                    <p>Create a PDF version of your map with it's attribution information, legend, scale bar, and map features.</p>
                </div>
                <div class="span4">
                    <div id="print-initialize">
                    </div>
                </div>
            </div>
            <div class="row-fluid print-processing element-invisible">               
                <div class="span12">
                    <div id="print-indicator" class="progress progress-striped active">
                        <div class="bar" style="width: 100%;">Preparing your PDF...</div>
                    </div>
                    <p class="center">
                        <small>You can safely close this window while we create your PDF.</small>
                    </p>
                </div>
            </div>
            <div class="row-fluid print-complete element-invisible">
                <div class="span7">
                    <p>We have created a PDF version of the map for you and it's ready to download.</p>
                </div>               
                <div class="span5">
                    <a href="#download" title="Download your PDF" target="_blank" class="btn btn-success"><i class="icon-white icon-circle-arrow-down"></i> Download your PDF</a>
                </div>
            </div>
            
            <hr />
            
            <h5>Download map data</h5>
            <div class="row-fluid">               
                <div class="span8"></div>
                <div class="span4"></div>
            </div>
            
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
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script src="js/lib/jquery.draggable.min.js"></script>
        <script src="js/lib/bootstrap.min.js"></script>
        <script src="js/init.js?<?php print date('U'); ?>"></script>
    
   </body>

</html>
