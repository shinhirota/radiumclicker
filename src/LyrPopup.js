/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrPopup = cc.Layer.extend({

    sprBackground: null,
    sprPopup: null,
    lblCenter: null,
    lblBelow: null,
    mnuMain: null,
    itmNext: null,
    particle: null,

    nodPopupStarter: null,

    blocking: false,
    waitingNoClickState: false,

    ctor:function () {

        this._super();

        var size = cc.winSize;

        this.mnuMain = new cc.Menu();
        this.mnuMain.attr({
            x:0,
            y:0
        });
        this.addChild(this.mnuMain, 10);

        // Menu Item
        this.itmNext= new cc.MenuItemImage(res.OK_png, res.OKS_png, this.onNextClick, this);
        this.itmNext.attr({
            x: cc.winSize.width / 2,
            y: 350,
            enabled: false,
            visible: false
        });
        this.mnuMain.addChild(this.itmNext);

        // Sprites
        this.sprBackground = new cc.DrawNode();
        this.sprBackground.drawRect(cc.p(0, 0), cc.p(cc.winSize.width,cc.winSize.height), cc.color(0,0,0,192), 0, cc.color(0,0,0,192));
        this.addChild(this.sprBackground, 0);

        this.sprPopup = new cc.Sprite(rc.l(res.Popup_png, res.Popup_en_png));
        this.sprPopup.attr({
            anchorX: 0,
            anchorY: 0
        });
        this.addChild(this.sprPopup, 1);

        // Center
        this.lblCenter = new cc.LabelTTF("AAA", rc.fontName, 60);
        this.lblCenter.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 + 100,

            color: cc.color.WHITE,
            fillStyle: cc.color(96,32,32,255),

            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            anchorX: 0.5, anchorY: 0.5
        });
        this.lblCenter.enableStroke(cc.color(220,200,200,255), 4);
        this.addChild(this.lblCenter, 1);

        // Below
        this.lblBelow = new cc.LabelTTF("AAA", rc.fontName, 32);
        this.lblBelow.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 + 100 - 300,
            color: cc.color.WHITE,
            fillStyle: cc.color.YELLOW,
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            anchorX: 0.5, anchorY: 0.5
        });
        this.lblBelow.enableStroke(cc.color(0,0,0,255), 2);
        this.addChild(this.lblBelow, 1);

        this.x = -cc.winSize.width;
        this.y = 0;

        // Prepare Pop up waiter
        this.nodPopupStarter = new cc.Node();
        this.addChild(this.nodPopupStarter, 1);

        return true;
    },

    block: function (str1, str2) {

        // Pause Actions
        rc.lyrLabo.getChildren().forEach( function (c) { c.pause() });

        // Prepare protection for next (OK) button
        this.waitingNoClickState = true;
        this.resetWaitTimeAfterLastClick();

        this.lblCenter.string = str1;
        this.lblBelow.string = str2;

        // Disable clicks
        this.blocking = true;

        this.x = -cc.winSize.width;
        this.runAction(
            cc.moveTo(0.2, 0, 0)
        );

        // Particle effect
        // *** Fireworks ***
        this.particle = new cc.ParticleSystem(20);
        this.particle.attr({
            duration: cc.ParticleSystem.DURATION_INFINITY,
            emitterMode: cc.ParticleSystem.MODE_GRAVITY,
            angle: 90,
            angleVar: 20,
            emissionRate: 20,
            blendAdditive: false
        });
        //this.particle = new cc.ParticleFireworks();
        //this.particle._totalParticles = 3;
        this.particle.setTexture((new cc.Sprite(res.ParticleStars_png)).texture);
        this.particle.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 + 400,
            gravity: cc.p(0, -1000),
            sourcePos: cc.p(0, 0),
            posVar: cc.p(cc.winSize.width / 2, 200),
            speed: 300,
            speedVar: 900,
            startSize: 40,
            startSizeVar: 20,
            opacityModifyRGB: true,
            startColor: cc.color(255, 255,255,255),
            startColorVar: cc.color(255, 255,255,0),
            endColor: cc.color(255, 255, 255, 255),
            endColorVar: cc.color(255, 255, 255, 0),
            life: 1,
            lifeVar: 2,

            endSize: cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE
        });
        this.addChild(this.particle, 100);

    },

    onClick: function () {
        if (this.waitingNoClickState == true) {
            this.resetWaitTimeAfterLastClick();
        }
    },

    resetWaitTimeAfterLastClick: function () {
        //cc.log("reset! start waiting!");
        this.nodPopupStarter.stopAllActions();
        this.nodPopupStarter.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.callFunc(this.after1secNoClick)
            )
        );
    },

    after1secNoClick: function () {

        var that = rc.lyrPopup;

        that.itmNext.visible = true;
        that.itmNext.enabled = true;

        that.waitingNoClickState = false;

        cc.audioEngine.playEffect(res.Applause_snd);
    },

    onNextClick: function () {
        cc.audioEngine.playEffect(res.OK_snd);

        this.itmNext.visible = false;
        this.itmNext.enabled = false;

        // Resume Actions
        rc.lyrLabo.getChildren().forEach( function (c) { c.resume() });

        // Enable clicks
        this.blocking = false;

        this.runAction(
            cc.moveTo(0.2, cc.winSize.width, 0)
        );

        this.particle.removeFromParent();
    }

});
