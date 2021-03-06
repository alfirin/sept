'use strict';

/* global SC */

/* Sound Cloud Player Directives */

angular.module('septWebRadioDirectives')
  .directive('swrSoundcloudPlayer', [
    function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var config = '&amp;auto_play=true&amp;download=true&amp;show_comments=false';
          var widgetUrl = 'https://soundcloud.com/lapause/sets/la-pause-playlist-21' + config;
          var sourceUrl = location.protocol + '//w.soundcloud.com/player/?url=' + widgetUrl;
          element.attr('src', sourceUrl);
          SC.Widget(attrs.id);
        }
      };
    }
  ]
  );