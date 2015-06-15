/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrStatus = cc.Layer.extend({

    menuItem1: null,
    menuItem2: null,
    menuItem3: null,

    lblBottom1: null,
    lblBottom2: null,
    lblBottom3: null,

    lblTotal_s: null,
    lblRadium_s: null,
    lblPich_s: null,

    lblTotal: null,
    lblRadium: null,
    lblPich: null,

    sprLocked: null,

    sprPlate: null,
    sprPowder: null,
    sprNovelP: null,
    sprNovelC: null,

    mnuMain: null,

    isFirstUpdate: true,

    lyrProjectsDefaultLabel: function () {

        var label = new cc.LabelTTF("あlg", rc.fontName, 30);

        label.attr({
            color: cc.color.WHITE,
            //lineWidth: 1,
            fillStyle: cc.color(0, 220, 220, 255),
            //strokeStyle: cc.color.BLACK,
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            anchorX: 0, anchorY: 1
        });
        label.enableStroke(cc.color(0,0,0,255), 2);
        this.addChild(label, 4);

        return label;
    },

    lyrProjectsMenuItem: function(image, image_selected, index) {

        var item = new cc.MenuItemImage(image, image_selected, res.BtnLocked_png, this.onProjectClicked, this);
        item.attr({
            x: 87 + 117 * index,
            y: 1210 - 120
        });
        item.tag = index;

        this.mnuMain.addChild(item, 1);

        return item;
    },

    lyrProjectsSubLabel: function (index) {
        var label = new cc.LabelTTF("", rc.fontName, 28);
        label.attr({
            x: 80 + 118 * index,
            y: 1158 - 120,
            color: cc.color.WHITE,
            fillStyle: cc.color.YELLOW,
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            anchorX: 0.5, anchorY: 1
        });
        label.enableStroke(cc.color(0,0,0,255), 2);

        this.addChild(label, 4);

        return label;
    },

    ctor:function () {

        this._super();

        this.mnuMain = new cc.Menu();
        this.mnuMain.attr( {x:0, y:0 });
        this.addChild(this.mnuMain, 10);

        /////////////////////////////
        // Action 1
        /////////////////////////////

        this.menuItem1 = this.lyrProjectsMenuItem(res.BtnCrash_png, res.BtnCrashS_png, 0);
        this.lblBottom1 = this.lyrProjectsSubLabel(0);

        this.menuItem2 = this.lyrProjectsMenuItem(res.BtnBoil_png, res.BtnBoilS_png, 1);
        this.lblBottom2 = this.lyrProjectsSubLabel(1);

        this.menuItem3 = this.lyrProjectsMenuItem(res.BtnChemistry_png, res.BtnChemistryS_png, 2);
        this.lblBottom3 = this.lyrProjectsSubLabel(2);

        this.lblRadium_s = this.lyrProjectsDefaultLabel();
        this.lblRadium_s.attr({
            string: "",
            x: 46 + 118 * 3,
            y: 1180  - 120
        });
        this.lblPich_s = this.lyrProjectsDefaultLabel();
        this.lblPich_s.attr({
            string: rc.l("投入ずみ鉱石 　    kg", "Used Ore 　       kg"),
            x: 46 + 118 * 3,
            y: 1220 - 120
        });
        this.lblTotal_s = this.lyrProjectsDefaultLabel();
        this.lblTotal_s.attr({
            string: rc.l("合計クリック       回", "# of Clicks"),
            x: 46 + 118 * 3,
            y: 1260 - 120
        });

        this.lblRadium = this.lyrProjectsDefaultLabel();
        this.lblRadium.attr({
            x: 46 + 118 * 3 + 280,
            y: 1180 - 120,
            fillStyle: cc.color.WHITE,
            anchorX: 1,
            textAlign: cc.TEXT_ALIGNMENT_RIGHT
        });
        this.lblPich = this.lyrProjectsDefaultLabel();
        this.lblPich.attr({
            x: 46 + 118 * 3 + 280,
            y: 1220 - 120,
            fillStyle: cc.color.WHITE,
            anchorX: 1,
            textAlign: cc.TEXT_ALIGNMENT_RIGHT
        });
        this.lblTotal = this.lyrProjectsDefaultLabel();
        this.lblTotal.attr({
            x: 46 + 118 * 3  + 280,
            y: 1260 - 120,
            fillStyle: cc.color.WHITE,
            anchorX: 1,
            textAlign: cc.TEXT_ALIGNMENT_RIGHT
        });

        this.sprLocked = new cc.Sprite(res.BtnLocked_png);

        this.sprPlate = new cc.Sprite(res.Plate_png);
        this.sprPlate.attr({
            x: 46 + 118 * 3 + 200,
            y: 1100 - 120,
            scaleX: 1,
            scaleY: 1
        });
        this.addChild(this.sprPlate, 1);

        this.sprPowder = new cc.Sprite(res.Powder_png);
        this.sprPowder.attr({
            x: 46 + 118 * 3 + 200,
            y: 1100 - 120,
            visible: false
        });
        this.sprPowder.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.tintTo(1, 200, 200, 255),
                    cc.tintTo(1, 255, 255, 255)
                )
            )
        );
        this.addChild(this.sprPowder, 2);

        this.sprNovelP = new cc.Sprite(res.Novel_png);
        this.sprNovelP.attr({
            x: 46 + 118 * 3 + 200 - 100,
            y: 1100 - 120 + 8,
            visible: false,
            scaleX: 0.3,
            scaleY: 0.3

        });
        this.addChild(this.sprNovelP, 3);

        this.sprNovelC = new cc.Sprite(res.Novel_png);
        this.sprNovelC.attr({
            x: 46 + 118 * 3 + 200 - 160,
            y: 1100 - 120 + 8,
            visible: false,
            scaleX: 0.3,
            scaleY: 0.3

        });
        this.addChild(this.sprNovelC, 3);

        this.update();

        return true;
    },

    onProjectClicked: function (menuItem) {
        var tag = menuItem.tag;

        switch (tag) {

            case 0:
                if (rc.lyrLabo instanceof rc.LyrLaboCrash) {
                    cc.audioEngine.playEffect(res.NG_snd);
                    return;
                }

                cc.audioEngine.playEffect(res.OK_snd);

                rc.lyrLabo.runAction(
                    cc.sequence(
                        cc.moveTo(0.25, cc.p(0, cc.winSize.height)),
                        cc.callFunc(function () {
                            rc.lyrLabo.removeFromParent();
                            rc.lyrLabo = new rc.LyrLaboCrash();
                            rc.lyrLabo.setPosition(cc.p(0, cc.winSize.height));
                            rc.lyrLabo.runAction(
                                cc.moveTo(0.25, cc.p(0, 300 - 210))
                            );
                            rc.scnMain.addChild(rc.lyrLabo, 4);

                            rc.lyrVoice.update();
                        }))
                );
                break;

            case 1:
                if (rc.lyrLabo instanceof rc.LyrLaboBoil) {
                    cc.audioEngine.playEffect(res.NG_snd);
                    return;
                }

                cc.audioEngine.playEffect(res.OK_snd);

                rcd.hasBeenToBoil = true;

                rc.lyrLabo.runAction(
                    cc.sequence(
                        cc.moveTo(0.25, cc.p(0, cc.winSize.height)),
                        cc.callFunc(function() {
                            rc.lyrLabo.removeFromParent();
                            rc.lyrLabo = new rc.LyrLaboBoil();
                            rc.lyrLabo.setPosition(cc.p(0, cc.winSize.height));
                            rc.lyrLabo.runAction(
                                cc.moveTo(0.25, cc.p(0, 300 - 210))
                            );
                            rc.scnMain.addChild(rc.lyrLabo, 4);

                            rc.lyrVoice.update();
                        }))
                );
                break;

            case 2:
                if (rc.lyrLabo instanceof rc.LyrLaboChenistry) {
                    cc.audioEngine.playEffect(res.NG_snd);
                    return;
                }

                cc.audioEngine.playEffect(res.OK_snd);

                rcd.hasBeenToChemistry = true;

                rc.lyrLabo.runAction(
                    cc.sequence(
                        cc.moveTo(0.25, cc.p(0, cc.winSize.height)),
                        cc.callFunc(function() {
                            rc.lyrLabo.removeFromParent();
                            rc.lyrLabo = new rc.LyrLaboChenistry();
                            rc.lyrLabo.setPosition(cc.p(0, cc.winSize.height));
                            rc.lyrLabo.runAction(
                                cc.moveTo(0.25, cc.p(0, 300 - 210))
                            );
                            rc.scnMain.addChild(rc.lyrLabo, 4);

                            rc.lyrVoice.update();
                        }))
                );

                break;
        }
    },

    update: function () {

        // 最初の１回だけ実行
        if (this.isFirstUpdate) {

            this.sprPowder.visible = rcd.hasPowderBeenVisible;

            var scale = 0.4 + 2 * ((rcd.chemied - 1000) / 9900);
            this.sprPowder.scaleX = scale;
            this.sprPowder.scaleY = scale;

            //「新元素」→「ラジウム」
            if (rcd.hasNameBecomeRadium == true) {
                this.lblRadium_s.string = rc.l("塩化ラジウム　     g", "Radium　          g");
            }
            else {
                this.lblRadium_s.string = rc.l("新元素 (?) 　      g", "Extracted 　      g");
            }

            //ノーベル賞
            this.sprNovelP.visible = rcd.hasNovelPBeenGot;
            this.sprNovelC.visible = rcd.hasNovelCBeenGot;
        }

        // 表示更新
        this.lblTotal.string = "" + ( -0 + rcd.nBoil + rcd.nChemistry + rcd.nCrash);
        this.lblPich.string = "" + rcd.totalUsed;
        this.lblRadium.string = "" + (Math.abs(rcd.chemied / 10000-0.0004)).toFixed(3);

        // 粉末絵更新
        if (rcd.hasPowderBeenVisible == false) {
            if (rcd.chemied / 10000 >= 0.1)
            {
                //粉見えた！
                rcd.hasPowderBeenVisible = true;
                this.sprPowder.visible = true;

                rc.showPopup(
                    rc.l(
                        "化学的分離による\n塩化ラジウム単離\n0.1 g 達成！",
                        "You separated 0.1 g\nof radium chloride by\nchemical processes!"
                    ),
                    rc.l(
                        "画面のシャーレ上でラジウムが輝き始めます",
                        "Radium starts emitting light on screen"
                    )
                );

                rcd.voiced.specialVoiceStack.push(3,
                    rc.l(
                        "まあ。ラジウムが・・・。",
                        "Oh, it is radium..."
                    )
                );

                rcd.voiced.specialVoiceStack.push(3,
                    rc.l(
                        "ラジウムが光り出したわ。",
                        "Radium started emitting light..."
                    )
                );
            }
        }

        //「新元素」→「ラジウム」
        if (rcd.hasNameBecomeRadium == false) {
            if (rcd.chemied / 10000 >= 0.5)
            {
                rc.showPopup(
                    rc.l(
                        "化学的分離による\n塩化ラジウム単離\n0.5 g 達成！！",
                        "You separated 0.5 g\nof radium chloride by\nchemical processes!"
                    ),
                    rc.l(
                        "『新元素(？)』が『塩化ラジウム』と\n" +
                        "表示されます",
                        "'Extracted' changes to 'Radium'\n" +
                        "on screen."
                    )
                );

                rcd.voiced.specialVoiceStack.push(3,
                    rc.l(
                        "トレビアン。ついに 0.5g 分離しました。",
                        "Très bien. You have separated 0.5g."
                    )
                );
                rcd.voiced.specialVoiceStack.push(3,
                    rc.l(
                        "スペクトル解析の結果、\nこの物質は『塩化ラジウム』であることが\n確認出来ました。",
                        "The result of spectral analysis\nshows that this substance is\nradium chloride."
                    )
                );

                rcd.hasNameBecomeRadium = true;
                this.lblRadium_s.string = rc.l("塩化ラジウム 　    g", "Radium　          g");
            }
        }

        //「ノーベル物理学賞」
        if (rcd.hasNovelPBeenGot == false) {
            if (rcd.chemied / 10000 >= 1.0)
            {
                rc.showPopup(
                    rc.l(
                        "化学的分離による\n塩化ラジウム単離\n1.0 g 達成！！",
                        "You separated 1.0 g\nof radium chloride by\nchemical processes!"
                    ),
                    rc.l(
                        "ノーベル物理学賞をもらいました",
                        "You gets Novel Prize in Physics."
                    )
                );

                rcd.voiced.specialVoiceStack.push(3,
                    rc.l(
                        "やりました。ついに 1g 分離しました。",
                        "Awesome. You have separated 1g."
                    )
                );
                rcd.voiced.specialVoiceStack.push(3,
                    rc.l(
                        "いままでの研究成果が認められて、\n『ノーベル物理学賞』が授与されましたよ。",
                        "The Novel Prize in Physics goes to you.\n"
                    )
                );

                rcd.hasNovelPBeenGot = true;
                this.sprNovelP.visible = true;
            }
        }

        //「ノーベル化学賞」
        if (rcd.hasNovelCBeenGot == false) {
            if (rcd.chemied / 10000 >= 2.0)
            {
                rc.showPopup(
                    rc.l(
                        "化学的分離による\n塩化ラジウム単離\n2.0 g 達成！！",
                        "You separated 2.0 g\nof radium chloride by\nchemical processes!"
                    ),
                    rc.l(
                        "ノーベル化学賞をもらいました",
                        "You gets Novel Prize in Chemistry."
                    )
                );

                rcd.voiced.specialVoiceStack.push(3,
                    rc.l(
                        "素晴らしい。とうとう 2g 分離しました。",
                        "Fantastic.\n" +
                        "You have separated 2g finally."
                    )
                );
                rcd.voiced.specialVoiceStack.push(3,
                    rc.l("物理学賞に続いて２つ目となる\n『ノーベル化学賞』が授与されましたよ。",
                        "The Novel Prize in Chemistry goes to\n" +
                        "you. This is the second one!\n"
                    )
                );

                rcd.hasNovelCBeenGot = true;
                this.sprNovelC.visible = true;
            }
        }

        if (rcd.hasPowderBeenVisible) {

            /*
             c = 1000 -> scale 0.4
             c = 100000 -> scale = 10
             */
            var scale = 0.4 + 2 * ((rcd.chemied - 1000) / 9900);

            this.sprPowder.scaleX = scale;
            this.sprPowder.scaleY = scale;
        }

        // Action 1
        this.lblBottom1.string = "" + rcd.nCrash + rc.l("回", "C") + "\n" +
            rcd.powder + "kg";

        // Action 2
        if (rcd.debug || rcd.boilUnlocked) {
            this.lblBottom2.string = "" + rcd.nBoil + rc.l("回", "C") + "\n" + rcd.boiled + "g";
            this.menuItem2.enabled = true;
        }
        else {
            this.lblBottom2.string = "？？";
            this.menuItem2.enabled = false;
        }

        // Action 3
        if (rcd.debug || rcd.chemistryUnlocked) {
            this.lblBottom3.string = "" + rcd.nChemistry + rc.l("回", "C") + "\n" + (Math.abs(rcd.chemied/10000-0.0004)).toFixed(3) + "g";
            this.menuItem3.enabled = true;
        }
        else {
            this.lblBottom3.string = "？？";
            this.menuItem3.enabled = false;
        }

        this.isFirstUpdate = false;
    }

});
