/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrBackground = cc.Layer.extend({

    sprBackground: null,
    mnuMain: null,

    lblVersion: null,

    lblResetData: null,
    lblClickCheatOn: null,
    lblClickCheatOff: null,
    itmResetData: null,
    itmClickCheatOn: null,
    itmClickCheatOff: null,

    itmTwitter: null,
    itmConfig: null,

    itmDebug: null,

    debugMenuShown: false,

    ////////////////////////////////////////////////////////////
    ctor:function () {

        this._super();

        var size = cc.winSize;

        this.lblVersion = new cc.LabelTTF("Ver 1.0.5", "Arial", 20);
        this.lblVersion.attr({
            x: size.width / 2 + 140,
            y: size.height - this.lblVersion.height - 75,
            color: cc.color.WHITE
        });
        this.addChild(this.lblVersion, 1);

        this.mnuMain = new cc.Menu();
        this.mnuMain.attr({
            x:0,
            y:0
        });
        this.addChild(this.mnuMain, 1);


        if (rcd.sound == false) {
            cc.audioEngine.setEffectsVolume(0);
        }

        var sprTwitter = new cc.Sprite(res.Twitter_png);
        var sprTwitterDown = new cc.Sprite(res.Twitter_png);
        sprTwitterDown.attr({
            x: 4,
            y: -4
        });
        this.itmTwitter = new cc.MenuItemSprite(
            sprTwitter,
            sprTwitterDown,
            null,
            function () {
                //cc.log("Tweet!");

                var amount = "" + Math.abs(rcd.chemied / 10000-0.0004).toFixed(3);

                // Do Tweet!
                if (cc.sys.browserType == null) {
                    if (cc.sys.os == cc.sys.OS_IOS) {

                        jsb.reflection.callStaticMethod(
                            "NativeOcClass",
                            "callNativeUIWithTitle:andContent:",
                            rc.l(
                                "http://tomeapp.jp",
                                "http://tomeapp.jp/index_en.html"
                            ),
                            rc.l(
                                "ピッチブレンド鉱石を" + rcd.nCrash + "回砕いてラジウムを" + amount +
                                "g分離しました。 #ラジウムクリッカー [iOSアプリ]",

                                "I crashed pitchblende ore " + rcd.nCrash + " times and got " + amount +
                                " gram of radium. #radiumclicker [iOS App]"
                            )
                        );
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        //cc.log("Try to call Java Func...");

                        jsb.reflection.callStaticMethod(
                            "org\/cocos2dx\/javascript\/AppActivity",
                            "callNativeUIWithTitle",
                            "(Ljava/lang/String;Ljava/lang/String;)V",
                            rc.l(
                                "http://tomeapp.jp",
                                "http://tomeapp.jp/index_en.html"
                            ),
                            rc.l(
                                "ピッチブレンド鉱石を" + rcd.nCrash + "回砕いてラジウムを" + amount +
                                "g分離しました。 #ラジウムクリッカー [Androidアプリ]",

                                "I crashed pitchblende ore " + rcd.nCrash + " times and got " + amount +
                                " gram of radium. #radiumclicker [Android App]"
                            )
                        );
                    }
                }
                else {
                    // Browser
                    var url = "http://tomeapp.jp/apps/radiumclicker";
                    var via = "shinhirota";
                    var hashtags = rc.l("ラジウムクリッカー", "radiumclicker");
                    var text = rc.l(
                        "ピッチブレンド鉱石を" + rcd.nCrash + "回砕いてラジウムを" + amount +
                        "g分離しました。",

                        "I crashed pitchblende ore " + rcd.nCrash + " times and got " + amount +
                        " gram of radium."
                    );

                    var strArg =
                        "text=" + encodeURIComponent(text) + "&" +
                        "url=" + encodeURIComponent(url) + "&" +
                        "via=" + encodeURIComponent(via) + "&" +
                        "hashtags=" + encodeURIComponent(hashtags);

                    var urlForWindow = "https://twitter.com/intent/tweet?" + strArg;

                    window.open(urlForWindow);
                }

            },
            this);

        this.itmTwitter.attr({
                x: size.width - this.itmTwitter.width / 2 - this.itmTwitter.width - 16,
                y: size.height - this.itmTwitter.height / 2 - 50
            }
        );
        this.mnuMain.addChild(this.itmTwitter);


        var sprConfig = new cc.Sprite(res.Config_png);
        var sprConfigDown = new cc.Sprite(res.Config_png);
        sprConfigDown.attr({
            x: 4,
            y: -4
        });
        this.itmConfig = new cc.MenuItemSprite(
            sprConfig,
            sprConfigDown,
            null,
            function () {
                //cc.log("CLICKED!");

                cc.audioEngine.playEffect(res.OK_snd);

                var scene = cc.director.getRunningScene();
                scene.addChild(new rc.LyrOption(), 100);
            }
        );
        this.itmConfig.attr({
                x: size.width - this.itmConfig.width / 2 - 12,
                y: size.height - this.itmConfig.height / 2 - 50
            }
        );
        this.mnuMain.addChild(this.itmConfig);

        //--- Create debug menu... ---
        // add a "close" icon to exit the progress. it's an autorelease object
        this.itmDebug = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {

                cc.log("Menu is clicked!");

                if (this.debugMenuShown)
                    this.hideDebugMenu();
                else
                    this.showDebugMenu();

            }, this);
        this.itmDebug.attr({
            x: size.width - 20,
            y: size.height - 20 - 150,
            anchorX: 0.5,
            anchorY: 0.5,
            enabled: false,
            visible: false
        });
        this.mnuMain.addChild(this.itmDebug);

        this.lblResetData = new cc.LabelTTF("[Reset Data]", "Arial", 24);
        this.lblResetData.color = cc.color.RED;
        this.itmResetData = new cc.MenuItemLabel(this.lblResetData, function () {

            rc.initRcData();
            rc.saveRcData();

            rc.lyrStatus.isFirstUpdate = true;
            rc.lyrStatus.update();

            if (rc.lyrLabo instanceof  rc.LyrLaboCrash)
            {
                rc.lyrVoice.update();
            }
            else {
                var itm = new cc.MenuItem();
                itm.tag = 0;
                rc.lyrStatus.onProjectClicked(itm);
            }

            this.hideDebugMenu();
        }, this);
        this.itmResetData.attr({
            x: size.width - this.lblResetData.width,
            y: size.height - 20 - 150
        });
        this.mnuMain.addChild(this.itmResetData);

        this.lblClickCheatOn = new cc.LabelTTF("[Cheat On]", "Arial", 24);
        this.lblClickCheatOn.color = cc.color.RED;
        this.itmClickCheatOn = new cc.MenuItemLabel(this.lblClickCheatOn, function () {
            rc.cheat = true;
            this.hideDebugMenu();
        }, this);
        this.itmClickCheatOn.attr({
            x: size.width - this.lblClickCheatOn.width,
            y: size.height + 10  - 150
        });
        this.mnuMain.addChild(this.itmClickCheatOn);

        this.lblClickCheatOff = new cc.LabelTTF("[Cheat Off]", "Arial", 24);
        this.lblClickCheatOff.color = cc.color.RED;
        this.itmClickCheatOff = new cc.MenuItemLabel(this.lblClickCheatOff, function () {
            rc.cheat = false;
            this.hideDebugMenu();
        }, this);
        this.itmClickCheatOff.attr({
            x: size.width - this.lblClickCheatOff.width,
            y: size.height + 10 - 150
        });
        this.mnuMain.addChild(this.itmClickCheatOff);
        //---

        this.sprBackground = new cc.Sprite(rc.l(res.Background_png, res.Background_en_png));
        this.sprBackground.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });

        this.addChild(this.sprBackground, 0);

        this.hideDebugMenu();

        return true;
    },

    showDebugMenu: function () {
        this.itmResetData.attr({
                visible: true,
                enabled: true
        });

        this.itmClickCheatOn.attr({
            visible: rc.cheat == false,
            enabled: rc.cheat == false
        });

        this.itmClickCheatOff.attr({
            visible: rc.cheat,
            enabled: rc.cheat
        });
        this.debugMenuShown = true;
    },

    hideDebugMenu: function () {
        this.itmResetData.attr({
            visible: false,
            enabled: false
        });

        this.itmClickCheatOn.attr({
            visible: false,
            enabled: false
        });

        this.itmClickCheatOff.attr({
            visible: false,
            enabled: false
        });
        this.debugMenuShown = false;
    }
});
