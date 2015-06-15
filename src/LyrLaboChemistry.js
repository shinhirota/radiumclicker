/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrLaboChenistry = rc.LyrLabo.extend({

    sprFlask: null,
    sprBeaker: null,
    sprBeaker2: null,

    ////////////////////////////////////////////////////////////
    ctor:function () {

        this._super();

        this.sprFlask = new cc.Sprite(res.Flask_png);
        this.sprFlask.attr({
            x: 180,
            y: 400 - 40 + this.sprFlask.height * (-0.5 + 0.6),
            anchorY: 0.6,
            scaleX: 1.6,
            scaleY: 1.6
        });

        this.sprFlask.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveBy(0.5, cc.p(0, 20)),
                    cc.moveBy(0.5, cc.p(0, -20)))
            )
        );

        this.addChild(this.sprFlask, 1);

        this.sprBeaker = new cc.Sprite(res.Beaker_png);
        this.sprBeaker.attr({
            x: 450,
            y: 400 - 20,
            scaleX: 1,
            scaleY: 1
        });

        this.sprBeaker.x0 = this.sprBeaker.x;
        this.sprBeaker.y0 = this.sprBeaker.y;
        this.addChild(this.sprBeaker, 1);

        this.sprBeaker2 = new cc.Sprite(res.Beaker_png);
        this.sprBeaker2.attr({
            x: 600,
            y: 400 - 20 - 10,
            scaleX: 1,
            scaleY: 1
        });
        this.sprBeaker2.x0 = this.sprBeaker2.x;
        this.sprBeaker2.y0 = this.sprBeaker2.y;

        this.addChild(this.sprBeaker2, 1);

        return true;
    },

    ////////////////////////////////////////////////////////////
    // Target Clicked
    ////////////////////////////////////////////////////////////
    onTargetClicked: function (touchPos) {

        var node = this;

        if (rc.cheat == false && rcd.hasEnoughPowderBeenGot == false) {
            return;
        }

        // Ignore action without boiled...
        if (rcd.debug == false && rcd.boiled <= 0) {
            rcd.boilded = 0;

            cc.audioEngine.playEffect(res.NG_snd);

            rcd.voiced.specialVoiceStack.push(1,
                rc.l(
                    "煮沸済み試料がありません。\n" +
                    "ぐつぐつ大鍋に戻っていただけますか？",

                    "No sulphate-removed sample left.\n" +
                    "Could you please go back to boiling pot?"
                )
            );

            rc.lyrVoice.prevVoice = ""; // force update

            rc.lyrVoice.update();
            return;
        }

        // Show "+1"
        var label = new cc.LabelTTF("+0.1 mg", rc.fontName, 60);
        label.attr({
            x: touchPos.x,
            y: touchPos.y
        });
        label.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(1, cc.p(0, 300)),
                    cc.fadeTo(0.5, 0.8)
                ),
                cc.removeSelf()
            )
        );
        node.addChild(label, 2);


        // Shake
        if (cc.random0To1() < 0.8) {
            node.sprFlask.runAction(
                cc.sequence(
                    cc.delayTime(0.5),
                    cc.rotateTo(0.02, 10),
                    cc.rotateTo(0.02, -10),
                    cc.rotateTo(0.04, 5),
                    cc.rotateTo(0.04, -5),
                    cc.rotateTo(0.08, 5),
                    cc.rotateTo(0.08, -5),
                    cc.rotateTo(0.16, 2),
                    cc.rotateTo(0.16, 0)
                )
            );
        } else {
            node.sprFlask.runAction(
                cc.sequence(
                    cc.delayTime(0.5),
                    cc.rotateTo(0.3, 135),
                    cc.callFunc(function(){
                        cc.audioEngine.playEffect(res.Water1_snd);
                    }),
                    cc.rotateTo(0.2, 0)
                )
            );
        }

        // Pour
        if (cc.random0To1() < 0.5) {
            node.sprBeaker.stopAllActions();
            node.sprBeaker.runAction(
                cc.sequence(
                    cc.moveTo(0.2, node.sprBeaker.x0 + -65, node.sprBeaker.y0 + 80),
                    cc.spawn(
                        cc.rotateTo(0.1, -45),
                        cc.moveTo(0.1, node.sprBeaker.x0 + -130, node.sprBeaker.y0 + 160)),
                    cc.callFunc(function(){
                        cc.audioEngine.playEffect(res.Water2_snd);
                    }),
                    cc.spawn(
                        cc.moveTo(0.1, node.sprBeaker.x0 + -65, node.sprBeaker.y0 + 80),
                        cc.rotateTo(0.1, 0)),
                    cc.moveTo(0.1, node.sprBeaker.x0, node.sprBeaker.y0)
                )
            );
        }
        else {
            node.sprBeaker2.stopAllActions();
            node.sprBeaker2.runAction(
                cc.sequence(
                    cc.moveTo(0.1, node.sprBeaker2.x0 + -145, node.sprBeaker2.y0 + 90),
                    cc.spawn(
                        cc.rotateTo(0.1, -45),
                        cc.moveTo(0.2, node.sprBeaker2.x0 + -290, node.sprBeaker2.y0 + 180)
                    ),
                    cc.callFunc(function(){
                        cc.audioEngine.playEffect(res.Water2_snd);
                    }),
                    cc.spawn(
                        cc.moveTo(0.2, node.sprBeaker2.x0, node.sprBeaker2.y0),
                        cc.rotateTo(0.1, 0)
                    )
                )
            );
        }

        // Play sound randomly
        cc.audioEngine.playEffect(res.Water3_snd);

        rcd.nChemistry = rcd.nChemistry - 0 + (rc.cheat ? rc.cheatFactor : 1);
        rcd.boiled = rcd.boiled - (rc.cheat ? rc.cheatFactor : 1);
        rcd.chemied = rcd.chemied - 0 + (rc.cheat ? rc.cheatFactor : 1);
        if (rcd.boiled < 0)
            rcd.boiled = 0;

        if (rcd.nChemistry > 33333) rcd.nChemistry = 33333;
        if (rcd.chemied > 99999) rcd.chemied = 99999;


        // Update displays
        rc.lyrStatus.update();
        rc.lyrVoice.update();
    }
});
