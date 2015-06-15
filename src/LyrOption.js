/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrOption = cc.Layer.extend({

    menu: null,
    pollingCnt: 0,

    ctor: function (callBack, target) {
        this._super();

        {
            // Text
            var label = new cc.LabelTTF(rc.l("オプション", "OPTION"), rc.fontName, 32);
            label.attr({
                x: cc.winSize.width / 2,
                y: cc.winSize.height - 200
            });
            this.addChild(label, 100);
        }

        //*** Menu
        {
            // The menu - Language
            this.menu = new cc.Menu();
            this.menu.attr( { anchorY: 1, x: cc.winSize.width/2, y: cc.winSize.height * 0.75 } );
            this.addChild(this.menu, 1);

            // Toggle Item
            {
                var item1 = new cc.MenuItemLabel(new cc.LabelTTF("[LANGUAGE 日本語→English]", rc.fontName, 32), function(){});
                var item2 = new cc.MenuItemLabel(new cc.LabelTTF("[LANGUAGE English→日本語]", rc.fontName, 32), function(){});
                var item = new cc.MenuItemToggle(item1, item2, function (arg) {

                    cc.audioEngine.playEffect(res.OK_snd);

                    var sel = arg.getSelectedIndex();
                    rcd.language = sel == 0 ? cc.sys.LANGUAGE_JAPANESE : cc.sys.LANGUAGE_ENGLISH;

                    if (rcd.nCrash == 0) {
                        // Special treatment for the case just after "Rest all"
                        rcd.hasFirstMessageShown = false;
                    }

                    rc.saveRcData();

                    cc.director.runScene(new cc.TransitionFade(0.5, new rc.ScnMain()));
                });
                item.setSelectedIndex(rcd.language == cc.sys.LANGUAGE_ENGLISH ? 1 : 0);

                this.menu.addChild(item);
            }

            // Toggle Item - Sound
            {
                var strSound = rc.l("サウンド", "SOUND");
                var item1 = new cc.MenuItemLabel(new cc.LabelTTF("[" + strSound + " ON→OFF]", rc.fontName, 32), function(){});
                var item2 = new cc.MenuItemLabel(new cc.LabelTTF("[" + strSound + " OFF→ON]", rc.fontName, 32), function(){});
                var item = new cc.MenuItemToggle(item1, item2, function (arg) {
                    var sel = arg.getSelectedIndex();
                    rcd.sound = sel == 0;

                    cc.audioEngine.setEffectsVolume(rcd.sound ? 1 : 0);

                    cc.audioEngine.playEffect(res.OK_snd);

                    rc.saveRcData();
                });
                item.setSelectedIndex(rcd.sound ? 0 : 1);

                this.menu.addChild(item);
            }

            // Item - Clear Data
            {
                var label = new cc.LabelTTF(rc.l("[全データ消去]", "[CLEAR ALL DATA]"), rc.fontName, 32);
                var item = new cc.MenuItemLabel(label, function () {

                    cc.audioEngine.playEffect(res.OK_snd);

                    //*** Confirm
                    this.addChild(new rc.LyrConfirm(rc.l(
                            "全データが\n消去されます！！\n\nよろしいですか？",
                            "All saved records will be cleared!!\n\nAre you sure?"), function (wasOK) {
                        cc.log("wasOK=" + wasOK);

                        if (wasOK) {
                            //*** Go ahead! ***
                            cc.audioEngine.playEffect(res.OK_snd);

                            rc.initRcData();
                            rc.saveRcData();

                            cc.log("Data Cleared!");

                            cc.director.runScene(new cc.TransitionFade(3.0, new rc.ScnMain()));
                        }
                        else {
                            // Cancelled
                            cc.audioEngine.playEffect(res.Cancel_snd);
                        }

                    }, this), 100);

                }, this);
                this.menu.addChild(item);
            }

            // Item - Back
            {
                var label = new cc.LabelTTF(rc.l("[戻る]", "[BACK]"), rc.fontName, 32);
                var item = new cc.MenuItemLabel(label, function () {
                    cc.audioEngine.playEffect(res.Cancel_snd);

                    // Resume Game
                    rc.resumeNode(rc.lyrLabo);

                    // Dismiss popup
                    this.runAction(
                        cc.sequence(
                            cc.moveTo(0.3, cc.p(this.x, this.height)),
                            cc.removeSelf(true)
                        )
                    );

                }, this);
                this.menu.addChild(item);
            }

            this.menu.alignItemsVerticallyWithPadding(60);
            this.menu.y -= (60+this.menu.getChildren()[0].height)*(this.menu.getChildrenCount()-1)/2;
        }

        // Black Wall
        {
            var spr = new cc.LayerColor(cc.color(0, 0, 0));
            spr.setOpacity(192);
            this.addChild(spr, 0);
        }

        // Block touches
        {
            cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function () { return true; },
                    onTouchMoved: function () { return true; },
                    onTouchEnded: function () { return true; },
                    onTouchCancelled: function () { return true; }
                }),
                this
            );
        }

        // Pop up action
        this.y = this.height;
        this.runAction(
            cc.sequence(
                cc.moveTo(0.3, cc.p(this.x, 0))
            )
        );

        // Pause Game
        rc.pauseNode(rc.lyrLabo);
    }

});
