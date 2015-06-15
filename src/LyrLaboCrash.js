/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrLaboCrash = rc.LyrLabo.extend({

    sprPich: null,
    texture: null,

    ////////////////////////////////////////////////////////////
    ctor:function () {

        this._super();

        this.sprPich = new cc.Sprite(res.Pichblende_png);
        this.sprPich.attr({
            x: 375,
            y: 400,
            scaleX: 2,
            scaleY: 2
        });
        this.sprPich.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveBy(1, cc.p(0,20)),
                    cc.moveBy(1, cc.p(0,-20))
                )
            )
        );
        this.addChild(this.sprPich, 1);

        // Prepare Particle
        this.texture = new cc.Sprite(res.ParticleFire_png).texture;

        return true;
    },

    ////////////////////////////////////////////////////////////
    // Target Clicked
    ////////////////////////////////////////////////////////////
    onTargetClicked: function (touchPos) {

        var node = this;

        // Show "+1"
        var label = new cc.LabelTTF("+1kg", rc.fontName, 60);
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
        node.sprPich.runAction(
            cc.sequence(
                cc.moveBy(0.02, cc.p(40,0)),
                cc.moveBy(0.02, cc.p(-80,0)),
                cc.moveBy(0.02, cc.p(80,0)),
                cc.moveBy(0.02, cc.p(-80,0)),
                cc.moveBy(0.02, cc.p(40,0))
            )
        );

        // Particle effect
        var particle = new cc.ParticleSystem(4);
        particle.attr({
            x: label.x,
            y: label.y,
            emitterMode: cc.ParticleSystem.MODE_GRAVITY,
            emissionRate: 100,
            duration: 0.2,
            gravity: cc.p(0, -600),
            speed: -600,
            angle: 90,
            angleVar: 5,
            startSize: 16,
            startSizeVar:4,
            endSize: cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE,
            startColor: cc.color(0, 0, 0, 255),
            startColorVar: cc.color(0, 0, 0, 0),
            endColor: cc.color(0, 0, 0, 255),
            endColorVar: cc.color(0, 0, 0, 0),
            autoRemoveOnFinish: true,
            life: 1,
            texture: node.texture
        });
        node.addChild(particle, 3);

        // Play sound randomly
        var r = cc.random0To1();
        if (r < 0.1) {
            cc.audioEngine.playEffect(res.Hit5_snd);
        } else if (r < 0.4) {
            cc.audioEngine.playEffect(res.Hit4_snd);
        } else {
            cc.audioEngine.playEffect(res.Hit3_snd);
        }

        // Score Up!
        rcd.nCrash = rcd.nCrash - 0 + (rc.cheat ? rc.cheatFactor : 1);
        rcd.powder = rcd.powder - 0 + (rc.cheat ? rc.cheatFactor : 1);
        rcd.totalUsed = rcd.totalUsed - 0 + (rc.cheat ? rc.cheatFactor : 1);

        if (rcd.nCrash > 33333) rcd.nCrash = 33333;
        if (rcd.powder > 99999) rcd.powder = 99999;
        if (rcd.totalUsed > 99999) rcd.totalUsed = 99999;

        if (rcd.boilUnlocked == false && rcd.powder >= 100) {
            // Unlock!
            rcd.boilUnlocked = true;

            rc.showPopup(
                rc.l(
                    "ピッチブレンド鉱石\n100 kg 破砕達成！",
                    "You crashed 100 kg\n of pitchblende ore!"
                ),
                rc.l(
                    "大鍋ステージが選択可能になります",
                    "Giant Pot stage unlocked."
                )
            );

            rcd.voiced.specialVoiceStack.push(3,
                rc.l(
                    "やりました。かなり粉末が溜まりました。\n" +
                    "苛性ソーダで煮詰めて硫酸や不純物を取り\n" +
                    "除いていきましょう。",

                    "Great job. A lot of crashed powder\n" +
                    "has been obtained.\n" +
                    "Next step is to remove impurities."
                )
            );
        }

        if (rcd.crash1000Passed == false && rcd.nCrash >= 1000) {
            rcd.crash1000Passed = true;

            rc.showPopup(
                rc.l(
                    "ピッチブレンド鉱石\n1t 破砕達成！",
                    "You crashed 1 t\n of pitchblende ore!"
                    )
                ,
                rc.l(
                    "おめでとうございます",
                    "Congratulations!"
                )
            );

            rcd.voiced.specialVoiceStack.push(3,
                rc.l(
                    "やりました。岩を砕く事1000回です。\n" +
                    "クリック好きな方は引き続きクリックを、\n" +
                    "もう良いって方、ありがとうございました。",

                    "Great.\n" +
                    "You crashed the stone 1000 times.\n" +
                    "If you like clicking, keep on.\n" +
                    "If you don't like clicking, thank you."
                )
            );
        }

        if (rcd.crash10000Passed == false && rcd.nCrash >= 10000) {
           rcd.crash10000Passed = true;

            rc.showPopup(
                rc.l(
                    "ピッチブレンド鉱石\n10t 破砕達成！",
                    "You crashed 10 t\n of pitchblende ore!"
                ),
                rc.l(
                    "おめでとうございます",
                    "Congratulations!"
                )
            );

            rcd.voiced.specialVoiceStack.push(3,
                rc.l(
                    "そなたのような勇者が現れるのを待っておっ\n" +
                    "たぞ。\n" +
                    "ラジウム1g集めて世界を救ってくれぬか？",

                    "I have been waiting for a hero like you\n" +
                    "for a long time...\n" +
                    "Please save the world by gathering 1g\n" +
                    "of the radium..."
                )
            );
        }

        // Update displays
        rc.lyrStatus.update();
        rc.lyrVoice.update();
    }
});
