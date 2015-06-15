/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrLaboBoil = rc.LyrLabo.extend({

    sprPot: null,

    ////////////////////////////////////////////////////////////
    ctor:function () {

        this._super();

        this.sprPot = new cc.Sprite(res.Pot_png);
        this.sprPot.attr({
            x: 375,
            y: 320 - this.sprPot.height/2*2,
            anchorY: 0,
            scaleX: 2,
            scaleY: 2
        });

        this.addChild(this.sprPot, 1);

        // Particle effect
        // *** Fire ***
        var particle = new cc.ParticleFire();
        particle._totalParticles = 10;
        particle.setTexture((new cc.Sprite(res.ParticleFire_png)).texture);
        particle.attr({
            x: this.sprPot.x,
            y: this.sprPot.y - 60 + 120,
            _posVar: cc.p(100,0),

            speed: 0,
            speedVar: 0,
            life: 0.3,
            lifeVar: 0.1,
            startSize: 200,
            endColor: cc.color(32,16,8,255)
        });
        this.addChild(particle, 3);

        // *** Vapor ***
        var particle = new cc.ParticleSmoke();
        particle._totalParticles = 10;
        particle.setTexture((new cc.Sprite(res.ParticleFire_png)).texture);
        particle.attr({
            x: this.sprPot.x,
            y: this.sprPot.y + 300 + 120,

            emissionRate: 3,
            angle: 45,
            angleVar: 20,
            life: 4,
            startSize:240,
            startColor: cc.color(255,255,255,255),
            endColor: cc.color(255,255,255,80)
        });
        this.addChild(particle, 3);

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

        // Ignore action without powder...
        if (rcd.debug == false && rcd.powder <= 0) {
            rcd.powder = 0;

            cc.audioEngine.playEffect(res.NG_snd);

            rcd.voiced.specialVoiceStack.push(1,
                rc.l(
                    "ピッチブレンド粉末がありません。\n" +
                    "岩砕きに戻っていただけますか？",

                    "No crashed powder left.\n" +
                    "Could you please go back to\n" +
                    "stone-crashing?"
                )
            );

            rc.lyrVoice.prevVoice = ""; // force update

            rc.lyrVoice.update();

            return;
        }

        // Show "+1"
        var label = new cc.LabelTTF("+1g", rc.fontName, 60);
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
        node.sprPot.runAction(
            cc.sequence(
                cc.rotateTo(0.02, 10),
                cc.rotateTo(0.02, -10),
                cc.rotateTo(0.04, 5),
                cc.rotateTo(0.04, -5),
                cc.rotateTo(0.08, 5),
                cc.rotateTo(0.08, -5),
                cc.rotateTo(0.16, 2),
                cc.rotateTo(0.16, 0)
            )
        )

        // Play sound randomly
        var r = cc.random0To1();
        if (r < 0.3) {
            cc.audioEngine.playEffect(res.Blow1_snd);
        } else {
            cc.audioEngine.playEffect(res.Blow2_snd);
        }
        r = cc.random0To1();
        if (r < 0.1) {
            cc.audioEngine.playEffect(res.Bubble1_snd);
        } else if (r < 0.2) {
            cc.audioEngine.playEffect(res.Bubble2_snd);
        }

        rcd.nBoil = rcd.nBoil - 0 + (rc.cheat ? rc.cheatFactor : 1);
        rcd.boiled = rcd.boiled - 0 + (rc.cheat ? rc.cheatFactor : 1);
        rcd.powder = rcd.powder - 0 - (rc.cheat ? rc.cheatFactor : 1);
        if (rcd.powder < 0)
            rcd.powder = 0;

        if (rcd.nBoil > 33333) rcd.nBoil = 33333;
        if (rcd.boiled > 99999) rcd.boiled = 99999;

        if (rcd.chemistryUnlocked == false && rcd.boiled >= 300) {
            // Unlock!
            rcd.chemistryUnlocked = true;

            rc.showPopup(
                rc.l(
                    "苛性ソーダ煮沸による\n不純物除去\n300 g 達成！",
                    "Impurities removed\nwith caustic soda\non 300g of sample!"
                ),
                rc.l(
                    "化学処理ステージが選択可能になります",
                    "Flask stage unlocked.")
            );

            rcd.voiced.specialVoiceStack.push(3,
                rc.l(
                    "やりました。かなり硫酸が取り除けました。\n" +
                    "いよいよ本格的な化学処理を始めましょう。",

                    "Nice work. You have removed sulphates\n" +
                    "from samples. Let us start further\n" +
                    "chemical processes now."
                )
            );
        }

        if (rcd.boil1000Passed == false && rcd.nBoil >= 1000) {
            rcd.boil1000Passed = true;

            rc.showPopup(
                rc.l(
                    "苛性ソーダ煮沸による\n不純物除去\n1000回達成！",
                    "Impurities removed\nwith caustic soda\n1000 times!"
                ),
                rc.l(
                    "おめでとうございます",
                    "Congratulations!"
                )
            );

            rcd.voiced.specialVoiceStack.push(3,
                rc.l(
                    "やりました。\n" +
                    "苛性ソーダ（水酸化ナトリウム）という劇薬\n" +
                    "を物ともせずに、ついに 1000 回達成です。",

                    "Awesome.\n" +
                    "You removed impurities with hazardous\n" +
                    "substance, caustic soda, 1000 times\n" +
                    "bravely."
                )
            );
        }

        if (rcd.boil10000Passed == false && rcd.nBoil >= 10000) {
            rcd.boil10000Passed = true;

            rc.showPopup(
                rc.l(
                    "苛性ソーダ煮沸による\n不純物除去\n10000 回達成！",
                    "Impurities removed\nwith caustic soda\n10000 times!"
                ),
                rc.l(
                    "おめでとうございます",
                    "Congratulations!"
                )
            );

            rcd.voiced.specialVoiceStack.push(3,
                rc.l(
                    "やりました。\n" +
                    "苛性ソーダ（水酸化ナトリウム）という劇薬\n" +
                    "を物ともせずに、ついに 10000回達成です。",

                    "Awesome.\n" +
                    "You removed impurities with hazardous\n" +
                    "substance, caustic soda, 10000 times\n" +
                    "bravely."
                )
            );
        }

        // Update displays
        rc.lyrStatus.update();
        rc.lyrVoice.update();
    }
});
