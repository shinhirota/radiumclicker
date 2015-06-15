/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrVoice = cc.Layer.extend({

    sprFace: null,
    sprVoice: null,
    lblVoice: null,
    prevVoice: "",

    ctor:function () {

        this._super();

        var size = cc.winSize;

        this.mnuMain = new cc.Menu();
        this.mnuMain.attr({x: 0, y: 0});
        this.addChild(this.mnuMain, 1);

        this.sprFace = new cc.Sprite(res.Curie_png);
        this.sprFace.attr({
            x: 16,
            y: 250 + 690 - 155,
            anchorX: 0,
            anchorY: 0,
            scaleX: 1.2,
            scaleY: 1.2
        });

        //---
        this.sprVoice = new cc.Sprite(res.Voice_png);
        this.sprVoice.attr({
            x: 140,
            y: 250 + 690,
            anchorX: 0,
            anchorY: 1,
            scaleX: 1.15,
            scaleY: 1.2
        });

        //---
        this.lblVoice = new cc.LabelTTF("", rc.fontName, 22);
        this.lblVoice.attr({
            x: 173,
            y: 250 - 10 + 690,
            anchorX: 0,
            anchorY: 1,
            scaleX: 1.2,
            scaleY: 1.2,
            color: cc.color.BLACK
        });

        this.addChild(this.sprFace, 1);
        this.addChild(this.sprVoice, 1);
        this.addChild(this.lblVoice, 1);

        this.update();

        return true;
    },

    update: function () {

        if (rcd.hasFirstMessageShown == false) {
            rcd.voiced.specialVoiceStack.push(1,
                rc.l(
                    "ようこそ、ラジウム・クリッカーへ。\n" +
                    "『ピッチブレンド鉱石』をクリックして\n" +
                    "新元素ラジウムを取り出しましょう。\n" +
                    "【実験室】をクリックしてください。",

                    "Welcome to Radium Clicker!\n" +
                    "Let's extract 'radium', the new element,\n" +
                    "from 'pitchblende' ore by clicking.\n" +
                    "Please click on LABO below.")
            );
            rcd.hasFirstMessageShown = true;
        }

        var str = rc.voice.getNextVoice();

        if (this.prevVoice != str) {

            this.lblVoice.string = str;
            this.lblVoice.runAction(
                cc.jumpBy(0.2, 0, 0, 20, 1)
            );
            this.sprVoice.runAction(
                cc.jumpBy(0.2, 0, 0, 20, 1)
            );
            this.prevVoice = str;
        }
    },

    hitCurie: function () {

        rcd.nCurie++;

        rc.lyrVoice.sprFace.runAction(
            cc.sequence(
                cc.moveBy(0.02, cc.p(40,0)),
                cc.moveBy(0.02, cc.p(-80,0)),
                cc.moveBy(0.02, cc.p(80,0)),
                cc.moveBy(0.02, cc.p(-80,0)),
                cc.moveBy(0.02, cc.p(40,0))
            )
        );

        var str = rc.l("いてっ。", "Ouch.");

        if (rcd.nCurie % 5 == 0) {

            cc.audioEngine.playEffect(res.Hit2_snd);

            if (rcd.nCurie % 25 < 5) {
                str = rc.l(
                    "私をたたかないで実験室をたたいてください。",
                    "Please hit the LABO instead of me."
                );
            }
            else if (rcd.nCurie % 25 < 10) {
                str = rc.l(
                    "たたくのはここじゃない。",
                    "You are hitting a wrong position."
                );
            }
            else if (rcd.nCurie % 25 < 15) {
                str = rc.l(
                    "ここじゃないって言ってるのに・・・。",
                    "I am telling you it is a wrong position."
                );
            }
            else if (rcd.nCurie % 25 < 20) {
                str = rc.l(
                    rcd.nCurie + "回もたたきましたね・・・。",
                    "You already hit me " + rcd.nCurie + " times..."
                );
            }
            else {
                str = rc.l(
                    "実は私はいたくないのです。\n" +
                    "いたいのはあなたの指の方です。",
                    "Actually, I do not have any pain with it.\n" +
                    "It is your finger that hurts.");
            }
        }
        else {
            cc.audioEngine.playEffect(res.Hit1_snd);

            if (rcd.nCurie % 100 < 20) {
                str = rc.l("うっ。", "Oh!");
            }
            else if (rcd.nCurie % 100 < 40) {
                str = rc.l("いてっ。", "Ouch!");
            }
            else if (rcd.nCurie % 100 < 60) {
                str = rc.l("ほげっ。", "Wow!");
            }
            else if (rcd.nCurie % 100 < 80) {
                str = rc.l("ぐぐっ。", "It hurts!");
            }
            else {
                str = rc.l("おごっ。", "Good one.");
            }
        }

        rcd.voiced.specialVoiceStack.push(1, str);
        rc.lyrVoice.prevVoice = ""; // force update
        rc.lyrVoice.update();
    }

});
