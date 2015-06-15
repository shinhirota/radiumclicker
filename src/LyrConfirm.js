/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.LyrConfirm = cc.Layer.extend({

    isDemoDone: false,
    onActionDone: null,
    onActionDoneTarget: null,

    ctor: function (str, callBack, target, opacity) {
        this._super();

        //*** Label
        {
            var group = new cc.Node();

            // Text
            str = str || "全データを消去します。\n\nよろしいですか？";
            var label = new cc.LabelTTF(str, rc.fontName, 32);
            label.attr({
                x: cc.winSize.width / 2,
                y: cc.winSize.height * 0.7
            });

            group.addChild(label, 2);

            this.addChild(group, 100);

            group.x -= cc.winSize.width;

            group.runAction(
                cc.sequence(
                    cc.moveBy(0.2, cc.p(cc.winSize.width, 0)),
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                            this.isDemoDone = true;
                        }, this
                    )
                )
            );

        }

        //*** Selection
        {
            // The menu
            var menu = new cc.Menu();
            menu.attr( { x: cc.winSize.width/2, y: cc.winSize.height * 0.5 } );
            this.addChild(menu, 1);

            // Menu Items
            {
                var label = new cc.LabelTTF(rc.l("[ＯＫ]", "[OK]"), rc.fontName, 32);
                var item = new cc.MenuItemLabel(label, function () {

                        if (this.onActionDone) {
                            this.onActionDone.call(this.onActionDoneTarget, true);
                        }

                        this.runAction(
                            cc.sequence(
                                cc.moveTo(0.2, cc.p(cc.winSize.width, this.y)),
                                cc.removeSelf(true)
                            )
                        );
                    }, this
                );

                menu.addChild(item, 1);

                var label = new cc.LabelTTF(rc.l("[キャンセル]", "[CANCEL]"), rc.fontName, 32);
                var item = new cc.MenuItemLabel(label, function () {

                        if (this.onActionDone) {
                            this.onActionDone.call(this.onActionDoneTarget, false);
                        }

                        this.runAction(
                            cc.sequence(
                                cc.moveTo(0.2, cc.p(-cc.winSize.width, this.y)),
                                cc.removeSelf(true)
                            )
                        );
                    }, this
                );
                menu.addChild(item, 1);
            }

            menu.alignItemsVerticallyWithPadding(50);
        }

        // Black Wall
        {
            var opacity = opacity ? opacity : 255;
            var spr = new cc.LayerColor(cc.color(0, 0, 0));
            spr.setOpacity(opacity);
            this.addChild(spr, 0);
        }

        // Swallow touches
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

        this.x = -this.width;

        this.runAction(
            cc.sequence(
                cc.moveTo(0.2, cc.p(0, this.y))
            )
        );

        this.onActionDone = callBack;
        this.onActionDoneTarget = target;
    }

});
