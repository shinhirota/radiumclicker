/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrLabo = cc.Layer.extend({

    isJustClicked: false,
    nodAutoSaver: null,

    ////////////////////////////////////////////////////////////
    ctor:function () {

        this._super();

        var size = cc.winSize;

        // Set Event Listener for Clicks

        cc.eventManager.addListener(
            cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: false,
                    onTouchBegan: this.onMyTouchBegan,
                    onTouchMoved: function () { return false; },
                    onTouchEnded: function () { return false; },
                    onTouchCancelled: function () { return false; }
                }),
            this
        );

        // Event Listener for Key press
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener(
                {
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed: function (key, event) {
                        var x = cc.winSize.width * (0.2 + 0.6 * cc.random0To1());
                        var y = cc.winSize.height * (0.1 + 0.4 * cc.random0To1());
                        var touch = new cc.Touch(x, y, null);
                        var node = event.getCurrentTarget();
                        node.onMyTouchBegan(touch, event);
                    }
                }, this);
        }


        this.width = cc.winSize.width;
        this.height = 660;
        this.x = 0;
        this.y = 300 - 210;

        /* For position debug */
/*
        var node = new cc.DrawNode();
        node.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,128), 0, 0);
        this.addChild(node,1);
*/

        //cc.log("lyrLabo at " + this.x + ", " + this.y + " - " + (0 + this.x + this.width) +", " + (0 + this.y+this.height)); //@@@

        // Prepare Auto Save Action
        this.nodAutoSaver = new cc.Node();
        this.addChild(this.nodAutoSaver);

        return true;
    },

    secretSuccessCount: 0,
    secretPoints: [
        {x: 78, y:858},
        {x: 106, y:1254},
        {x: 334, y:1254},
        {x: 78, y:858},
        {x: 377, y:1184},
        {x: 78, y:858}
    ],

    checkSecret: function (touchPos) {

        var nextSecretPoint = this.secretPoints[this.secretSuccessCount];

        var dist = Math.abs(touchPos.x - nextSecretPoint.x)
            + Math.abs (touchPos.y - nextSecretPoint.y);

        if (dist < 60) {
            this.secretSuccessCount++;

            if (this.secretSuccessCount == this.secretPoints.length) {
                // Unlock!!
                rc.lyrBackground.itmDebug.visible = true;
                rc.lyrBackground.itmDebug.enabled = true;
                this.secretSuccessCount = 0;
            }
        }
        else {
            this.secretSuccessCount = 0;
        }

        //cc.log("dist=" + dist + ", count=" + this.secretSuccessCount); //@@@
    },

    ////////////////////////////////////////////////////////////
    // Target Clicked
    ////////////////////////////////////////////////////////////
    onMyTouchBegan: function (touch, event) {

        var node = event.getCurrentTarget();


        var touchPos = touch.getLocationInView();

        if (cc.sys.browserType == null) {
            if (cc.sys.os == cc.sys.OS_IOS) {
                touchPos.y = cc.winSize.height - touchPos.y;
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                touchPos.y = cc.winSize.height - touchPos.y;
            }
        }

        rc.lyrPopup.onClick();

        node.checkSecret(touchPos);

        //cc.log("touch = " + touchPos.x + ", " + touchPos.y); //@@@

        // Ignore clicks during popup
        if (rc.lyrPopup.waitingNoClickState || rc.lyrPopup.blocking)
        {
            return true;
        }

        // 夫人click check
        var rect = cc.rect(rc.lyrVoice.sprFace.x, rc.lyrVoice.sprFace.y,
            rc.lyrVoice.sprFace.width*1.5, rc.lyrVoice.sprFace.height*1.5);
        if (cc.rectContainsPoint(rect, touchPos))
        {
            rc.lyrVoice.hitCurie();
            return true;
        }

        // Ignore clicks for out of the layer
        if (cc.rectContainsPoint(node.getBoundingBox(), touchPos) == false)
        {
            return true;
        }

        // Ignore clicks for a while
        if (node.isJustClicked) {
            return true;
        }
        node.isJustClicked = true;
        node.runAction(
            cc.sequence(
                cc.delayTime(0.025),
                cc.callFunc(function(){ node.isJustClicked = false; })
            )
        );

        var touchPosInLayer = cc.p(touchPos.x, touchPos.y - node.y);
        node.onTargetClicked(touchPosInLayer);

        // Auto Save only 1 sec later from last click.
        // Save is time-consuming!
        node.nodAutoSaver.stopAllActions();
        node.nodAutoSaver.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    rc.saveRcData();
                    //cc.log("autosave!");
                })
            )
        );

        return true;
    },

    onTargetClicked: function (touchPos) {
        cc.log("Override me!");
    }
});
