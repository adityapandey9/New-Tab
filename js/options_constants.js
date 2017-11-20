(function(angular) {
    'use strict';
    var controllers = angular.module('newTab.controllers');

    controllers.constant('popularPages', [
        {name: 'Google+', location: 'https://plus.google.com'},
        {name: 'Facebook', location: 'https://www.facebook.com'},
        {name: 'Twitter', location: 'https://twitter.com'},
        {name: 'Reddit', location: 'http://www.reddit.com/'},
        {name: 'Wikipedia', location: 'https://www.wikipedia.org'}
    ]);

    controllers.constant('internalPages', [
        { name: 'Chrome Apps', location: 'chrome://apps/' },
        { name: 'Extensions', location: 'chrome://extensions/' },
        { name: 'History', location: 'chrome://history/' },
        { name: 'Downloads', location: 'chrome://downloads/' },
        { name: 'Bookmarks', location: 'chrome://bookmarks/' },
        { name: 'Internals', location: 'chrome://net-internals/' },
        { name: 'Devices', location: 'chrome://devices/' },
        { name: 'Flags', location: 'chrome://flags/' },
        { name: 'Inspect', location: 'chrome://inspect/' },
        { name: 'Memory', location: 'chrome://memory-redirect/' },
        { name: 'Version', location: 'chrome://version/' },
        { name: 'Blank Page', location: 'about:blank' }
    ]);
})(angular);
