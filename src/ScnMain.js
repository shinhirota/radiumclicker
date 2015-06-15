/****************************************************************************
  Copyright (c) 2015 Shin Hirota
  http://tomeapp.jp

  Released under the MIT license.
  https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.ScnMain = cc.Scene.extend({

    onEnter:function () {

        cc.sys.dump();

        this._super();

        rc.initRcData();

        rc.fontName = "YasashisaBold";
        if (cc.sys.browserType == null) {
            if (cc.sys.os == cc.sys.OS_IOS) {
                rc.fontName = "07YasashisaGothicBold";
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                rc.fontName = res.YasashisaB_ttf;
            }
        }

        rc.voice = new rc.Voice();

        rc.loadRcData();

        // Init language
        if (!rcd.language) {
            rcd.language = cc.sys.language;
            rc.saveRcData();
        }
        //rc.language = cc.sys.LANGUAGE_JAPANESE; //@@@ for iOS simulator...

        rc.lyrBackground = new rc.LyrBackground();
        rc.lyrLabo = new rc.LyrLaboCrash();
        rc.lyrStatus = new rc.LyrStatus();
        rc.lyrVoice = new rc.LyrVoice();
        rc.lyrPopup = new rc.LyrPopup();

        this.addChild(rc.lyrBackground, 1);
        this.addChild(rc.lyrLabo, 4);
        this.addChild(rc.lyrStatus, 5);
        this.addChild(rc.lyrVoice, 10);
        this.addChild(rc.lyrPopup, 100);

        rc.scnMain = this;
    }
});
