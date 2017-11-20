/*global chrome*/
'use strict';
var slice = Array.prototype.slice;
var manifest = chrome.runtime.getManifest();
var allOptions = ["usingStorageApi", "url", "syncOptions", "lastInstall", "showWelcome", "always-tab-update"];

function log(){
    var args = slice.call(arguments);
    var msg = args.shift();
    msg = "(%s) " + msg;
    args.unshift(manifest.version);
    args.unshift(msg);

    console.log.apply(console, args);
}

function init() {
    log("background.js: init()");
}

function saveInitial() {
    log("background.js: Initial setup.");
    var options = {};
    var arr = window.localStorage.options;
    if (arr) {
        log('Found options on localStorage');
        options = JSON.parse(arr);
    }

    // by default, initial installs won't sync options
    options["syncOptions"] = false;
    options["usingStorageApi"] = true;

    if (!options.url) {
        log("Using default New Tab Redirect page");
        // this defaults to the New Tab Redirect Apps page
        options.url = "";
    }

    options["lastInstall"] = +new Date();

    log("trying to save these options", options);
    save(options, "local");
}



chrome.storage.onChanged.addListener(function (changes, namespace) {
    retrieve("syncOptions", "local", function (items) {
        if (items.syncOptions == "false" || namespace != "sync") return;

        var saveObj = {};
        for (var key in changes) {
            if (changes.hasOwnProperty(key)) {
                var change = changes[key];
                log('background.js: "%s|%s" changed. "%s" -> "%s"',
                    namespace,
                    key,
                    change.oldValue,
                    change.newValue);

                saveObj[key] = change.newValue;
            }
        }
        if(Object.keys(saveObj).length > 0) {
            log("Saving sync values locally");
            save(saveObj, "local");
        }
    });
});

function save(items, area) {
    chrome.storage.local.get(["syncOptions"], function (localQuery) {
        if (localQuery.syncOptions == false) {
            // if user doesn't want to save, we'll always sync to local
            area = "local";
        }

        log("Saving the following items to " + area + ":", items);
        chrome.storage[area].set(items);
    });
}

function retrieve(items, area, cb) {
    if ("function" !== typeof cb) {
        cb = function (items) {
            log("items:", items);
        };
    }

    chrome.storage[area].get(items, cb);
}

init();
