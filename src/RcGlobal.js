/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

var rcd = rcd || {};
var rc = rc || {

        lyrBackground: null,
        lyrLabo: null,
        lyrStatus: null,
        lyrVoice: null,
        lyrPopup: null,
        lyrOption: null,

        scnMain: null,
        fontName: null,

        cheat: false,

        voice: null
    };

rc.cheatFactor = 50;

rc.initRcData = function () {

    rcd = {
        debug: false,
        sound: true,
        language: "",

        nCrash: 0,
        nBoil: 0,
        nChemistry: 0,
        nCurie: 0,
        totalUsed: 0,
        powder: 0,
        boiled: 0,
        chemied: 0,
        radium: 0,

        boilUnlocked: false,
        chemistryUnlocked: false,
        crash1000Passed: false,
        boil1000Passed: false,
        crash10000Passed: false,
        boil10000Passed: false,

        hasFirstMessageShown: false,
        hasBeenToBoil: false,
        hasBeenToChemistry: false,
        hasPowderBeenVisible: false,
        hasNameBecomeRadium: false,
        hasNovelPBeenGot: false,
        hasNovelCBeenGot: false,

        voiced: new rc.VoiceD()
    };
};


rc.saveRcObject = function (parentName, obj) {

    var prefix = parentName ? parentName + "." : "";
    var propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach( function (propName) {

        var currentVal = Object.getOwnPropertyDescriptor(obj, propName).value;

        if (typeof currentVal == "number" || typeof currentVal == "string"
            || typeof currentVal == "boolean") {
            cc.sys.localStorage.setItem(prefix + propName, currentVal);
            //cc.log("[save] propName = " + prefix + propName + ", currentVal=" + currentVal);
        }
        else if (typeof currentVal == "object")
        {
            rc.saveRcObject(prefix + propName, currentVal);
        }
    });
};

rc.saveRcData = function () {
    rc.saveRcObject("radiumclicker", rcd);
};

rc.loadRcObject = function (parentName, obj) {

    var prefix = parentName ? parentName + "." : "";
    var propNames = Object.getOwnPropertyNames(obj);

    var loadedVal;
    propNames.forEach( function (propName) {

        //var currentVal = Object.getOwnPropertyDescriptor(obj, propName).value;
        var currentVal = obj[propName];

        if (typeof currentVal == "number" || typeof currentVal == "string"
            || typeof currentVal == "boolean") {

            loadedVal = cc.sys.localStorage.getItem(prefix + propName);
            //cc.log("[load] prefix + propName = " + prefix + propName + ", loadedVal=" + loadedVal, "typeof=" + (typeof loadedVal));
            if (loadedVal != null  && loadedVal != "") {
                if (typeof currentVal == "number") loadedVal = loadedVal - 0;
                else if (loadedVal == "false") loadedVal = false;
                else if (loadedVal == "true") loadedVal = true;
                obj[propName] = loadedVal;
            }
        }
        else if (currentVal && (typeof currentVal == "object"))
        {
            rc.loadRcObject(prefix + propName, currentVal);
        }

        //cc.log("[load] prefix + propName = " + prefix + propName + ", result=" + obj[propName]);
    });
};

rc.loadRcData = function ()  {
    rc.loadRcObject("radiumclicker", rcd);
};

rc.showPopup = function (str1, str2) {
    rc.lyrPopup.block(str1, str2);
};

// localize
rc.l = function (jpStr, enStr) {
    if (!enStr)
      return jpStr;

    if (rcd.language != cc.sys.LANGUAGE_ENGLISH)
        return jpStr;

    return enStr;
}

rc.pauseNode = function (node) {
    if (!node) return;
    node.pause();
    var children = node.getChildren();
    for (var i = 0; i < children.length; i++) {
        rc.pauseNode(children[i]);
    }
};

rc.resumeNode = function (node) {
    if (!node) return;
    node.resume();
    var children = node.getChildren();
    for (var i = 0; i < children.length; i++) {
        rc.resumeNode(children[i]);
    }
};
