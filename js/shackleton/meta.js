/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, globals, esri, map, SKMeta, SKMetaContent, SKMetaKey, theseTags, SKMapResponse*/

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
define([
    'dojo/_base/declare'
], function (
    declare
) {

    "use strict";

    var SKMeta,
        SKMetaContent,
        SKMetaKey;

    SKMeta = declare('shackleton.meta', null, {

        buildContent: function (thisContent) {

            if (thisContent === null) {
                return false;
            }

            for (var SKMetaKey in thisContent) {
                if (thisContent[SKMetaKey].content !== null) {
                    var _content = (thisContent[SKMetaKey].extra) ? thisContent[SKMetaKey].extra + thisContent[SKMetaKey].content : thisContent[SKMetaKey].content;
                    jQuery(thisContent[SKMetaKey].selector).html(_content);
                }
            }

        },

        buildTags: function (theseTags) {
            return '<p>' + theseTags.join(", ") + '</p>';
        },

        constructor: function () {

            SKMetaContent = {
                title: {
                    selector: '#details-title, title',
                    content: globals.details.title,
                    extra: ''
                },
                description: {
                    selector: '#details-description',
                    content: globals.details.description,
                    extra: ''
                },
                usage: {
                    selector: '#details-usage',
                    content: globals.details.licenseInfo,
                    extra: '<hr />'
                },
                credit: {
                    selector: '#details-credit',
                    content: globals.details.accessInformation,
                    extra: '<hr />'
                },
                tags: {
                    selector: '#details-tags',
                    content: this.buildTags(globals.details.tags),
                    extra: '<hr />'
                }
            };

            this.buildContent(SKMetaContent);

        }

    });

    return {
        SKMeta: SKMeta
    };

});