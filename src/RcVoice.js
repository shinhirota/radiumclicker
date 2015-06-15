/****************************************************************************
 Copyright (c) 2015 Shin Hirota
 http://tomeapp.jp

 Released under the MIT license.
 https://github.com/shinhirota/radiumclicker/blob/master/LICENSE
 ***************************************************************************/

rc.VoiceD = cc.Class.extend({

    ctor: function() {
        this.specialVoiceStack = [];
        this.currentSpecialVoice = "";
        this.currentSpecialVoiceToClick = 0;
    },

    specialVoiceStack: null,

    currentSpecialVoice: "",
    currentSpecialVoiceToClick: 0,

    crashVoice: {},
    boilVoice: {},
    chemistryVoice: {}
});

rc.Voice = cc.Class.extend( {

    crashVoice: {
        scenario: [

            3, /* 3回までのセリフ */
            "そう。\n" +
            "そうやって何度かクリックしてください。",

            10,
            "いいですね。\n" +
            "その調子です。\n" +
            "さらにクリックしてください。",

            30,
            "このピッチブレンド鉱石にわずかに\n" +
            "含まれている謎の物質を取り出すのが\n" +
            "ゴールです。\n" +
            "ひたすら鉱石をクリックです。",

            100,
            "この調子でまとまった量の粉末を用意しま\n" +
            "しょう。\n" +
            "ひたすら鉱石をクリックです。",

            300,
            "このピッチブレンド鉱石はウランを\n" +
            "硫酸で抽出した残りかすです。\n" +
            "ですから無償で大量にもらえました・・。\n" +
            "ひたすら鉱石をクリックです。",

            1000,
            "いったいどれくらいの鉱石を処理すれば\n" +
            "ラジウムが取り出せるのかしら・・・。\n" +
            "ひたすら鉱石をクリックです。",

            2000,
            "よくよく考えたら、スマホの場合\n" +
            "「クリック」じゃなくて「タップ」？\n" +
            "ひたすら鉱石をタップです。",

            3000,
            "いったいどれくらいの鉱石を処理すれば\n" +
            "ラジウムが取り出せるのかしら・・・。\n" +
            "ひたすら鉱石をクリックです。",

            5000,
            "え？いつ割れるのか？\n" +
            "すみません。この鉱石は割れない仕様に\n" +
            "なっております。\n" +
            "ひたすら鉱石をクリックです。",

            20000,
            "いったいどれくらいの鉱石を処理すれば\n" +
            "ラジウムが取り出せるのかしら・・・。\n" +
            "ひたすら鉱石をクリックです。",

            0,
            "ここまでクリックしていただきありがとう\n" +
            "ございました。"
        ]
    },

    boilVoice: {
        scenario: [

            3,
            "ここでは鉱石の粉末を苛性ソーダ\n" +
            "で煮詰めます。\n" +
            "さらにクリックしてください。",

            10,
            "そう。\n" +
            "その調子でクリックしてください。",

            30,
            "この調子で苛性ソーダで煮詰めることで\n" +
            "ウラン抽出時についてしまった硫酸を\n" +
            "除去できます。\n" +
            "ひたすら大釜をクリックです。",

            100,
            "ウラン抽出前のピッチブレンド鉱石は\n" +
            "高価で手が出ないので仕方ないですね・・。\n" +
            "ひたすら大釜をクリックです。",

            300,
            "硫酸成分が残っているとこれから先の化学\n" +
            "処理がうまくいきません。\n" +
            "がんばって除去します\n" +
            "ひたすら大釜をクリックです。",

            400,
            "ラジウム元素はあります！\n" +
            "ひたすら大釜をクリックです。",

            1000,
            "硫酸成分が残っているとこれから先の化学\n" +
            "処理がうまくいきません。\n" +
            "がんばって除去します\n" +
            "ひたすら大釜をクリックです。",

            2000,
            "わたし物理学を専攻していたはずなのに、\n" +
            "いまやってることは完全に化学だわ・・・。\n" +
            "ひたすら大釜をクリックです。",

            5000,
            "硫酸成分が残っているとこれから先の化学\n" +
            "処理がうまくいきません。\n" +
            "がんばって除去します\n" +
            "ひたすら大釜をクリックです。",

            20000,
            "ここまでしなくてもラジウム元素について\n" +
            "の状況証拠は十分にあるのに、一部の人が\n" +
            "信じないんですよね・・・。",

            0,
            "ここまでクリックしていただきありがとう\n" +
            "ございました。"
        ]
    },

    chemistryVoice: {

        scenario: [

            3,
            "ここからはさらに様々な化学的処理でラジウム\n" +
            "の分離を試みます。",

            10,
            "そう。\n" +
            "その調子で何度かクリックしてください。",

            30,
            "金属イオンは系統分析で大まかに分別\n" +
            "できます。\n" +
            "しかしこの鉱石、様々な金属が微量に含まれ\n" +
            "ているので分離は相当に困難ですよ。",

            100,
            "この調子で化学処理によって不純物を\n" +
            "取り除きましょう。\n" +
            "ひたすらフラスコをクリックです。",

            300,
            "どうやらラジウムはバリウムに似た性質を\n" +
            "持っているようなので、\n" +
            "まずバリウムを取り出す処理をしましょう。\n" +
            "ひたすらフラスコをクリックです。",

            500,
            "カルシウムとバリウムの分離むずかしい・・\n" +
            "希塩酸への溶解度の違いで何とかなる・・？\n" +
            "ひたすらフラスコをクリックです。",

            700,
            "ラジウムを抽出して、\n" +
            "この物理学界を・・・変えたい・・・。\n" +
            "ひたすらフラスコをクリックです。",

            1000,
            "ほぼ単離できた塩化バリウムが強い放射性を\n" +
            "示している・・・。\n" +
            "ラジウムが含まれているとしか思えないわ。\n" +
            "ひたすらフラスコをクリックです。",

            3000,
            "結晶する温度の違いを利用する分別結晶法で\n" +
            "塩化ラジウムを取り出したわ。\n" +
            "ひたすらフラスコをクリックです。",

            5000,
            "少なくとも0.5gはないとスペクトル分析\n" +
            "できないわ・・。\n" +
            "ひたすらフラスコをクリックです。",

            10000,
            "1.0g分離すればきっとみんなわかってくれる\n" +
            "はずです。\n" +
            "ひたすらフラスコをクリックです。",

            20000,
            "よくぞここまで来ました。\n" +
            "もう何もないと思いますよ。たぶん・・・。",

            0,
            "ここまでクリックしていただきありがとう\n" +
            "ございました。\n" +
            "次回作にご期待ください！"
        ]
    },

    crashVoiceEn: {
        scenario: [

            3, /* 3回までのセリフ */
            "Good.\n" +
            "Please keep clicking like that.",

            10,
            "Very good.\n" +
            "You are doing great.\n" +
            "Please keep clicking the stone.",

            30,
            "The goal is to extract the new element\n" +
            "that is contained in the 'pitchblende'\n" +
            "ore.\n" +
            "Please keep clicking the stone.",

            100,
            "Fantastic.\n" +
            "A lot of crashed powder is getting\n" +
            "obtained.\n" +
            "Please keep clicking the stone.",

            300,
            "You could get large quantities of the\n" +
            "pitchblende because this is residue after\n" +
            "extracting uranium.\n" +
            "Please keep clicking the stone.",

            1000,
            "I wonder how much ore is needed to be\n" +
            "processed to extract some amount of\n" +
            "the new element...\n" +
            "Please keep clicking the stone.",

            2000,
            "Is it 'click' or 'tap' for a smart phone?\n" +
            "Please keep clicking the stone.",

            3000,
            "I wonder how much ore is needed to be\n" +
            "processed to extract some amount of\n" +
            "the new element...\n" +
            "Please keep clicking the stone.",

            5000,
            "When will the stone be broken?\n" +
            "I heard that this stone is too hard to\n" +
            "break.\n" +
            "Please keep clicking the stone.",

            20000,
            "I wonder how much ore is needed to be\n" +
            "processed to extract some amount of\n" +
            "the new element...\n" +
            "Please keep clicking the stone.",

            0,
            "Many thanks for many clicking!"
        ]
    },

    boilVoiceEn: {
        scenario: [

            3,
            "In here, the crashed powder will be\n" +
            "treated with a strong boiling solution\n" +
            "of caustic soda.\n" +
            "Please click the giant pot below.",

            10,
            "Good.\n" +
            "Please keep clicking like that.",

            30,
            "You need to get rid of the sulphuric\n" +
            "acid as completely as possible.\n" +
            "Please keep clicking the giant pot.",

            100,
            "It can't be helped because pure\n" +
            "pitchblende that still contains uranium\n" +
            "is too expensive for this purpose...\n" +
            "Please keep clicking the giant pot.",

            300,
            "If sulphates remain in the sample,\n" +
            "further chemical process would fail.\n" +
            "Please keep clicking the giant pot.",

            1000,
            "You have to do this just because\n" +
            "some suspicious people do not believe\n" +
            "the existence of radium...\n" +
            "Please keep clicking the giant pot.",

            2000,
            "I thought my major was physics.\n" +
            "Now this looks like pure chemistry.\n" +
            "Please keep clicking the giant pot.",

            5000,
            "If sulphates remain in the sample,\n" +
            "further chemical process would fail.\n" +
            "Please keep clicking the giant pot.",

            20000,
            "You have to do this just because\n" +
            "some suspicious people do not believe\n" +
            "the existence of radium...\n" +
            "Please keep clicking the giant pot.",

            0,
            "Many thanks for many clicking! "
        ]
    },

    chemistryVoiceEn: {

        scenario: [

            3,
            "In here, we will try much more chemical\n" +
            "approaches on the sample.\n" +
            "Please click the flask below.",

            10,
            "Good.\n" +
            "Please keep clicking like that.",

            30,
            "Metallic ions can basically be separated\n" +
            "by qualitative inorganic analysis.\n" +
            "But this ore includes so many kinds...\n" +
            "Please keep clicking the flask.",

            100,
            "Nice work. A lot of impurities have been\n" +
            "removed.\n" +
            "Please keep clicking the flask.",

            300,
            "Seems like radium has a nature similar\n" +
            "to barium. Let us first extract barium\n" +
            "from the sample.\n" +
            "Please keep clicking the flask.",

            500,
            "Separation of calcium from barium is\n" +
            "difficult...\n" +
            "Please keep clicking the flask.",

            700,
            "I will change physics by radium!\n" +
            "Please keep clicking the flask.",

            1000,
            "The extracted 'barium chloride' has\n" +
            "strong radioactivity. There must be\n" +
            "'radium chloride' with it.\n" +
            "Please keep clicking the flask.",

            3000,
            "Fractional crystallization worked.\n" +
            "You got pure radium chloride.\n" +
            "Please keep clicking the flask.",

            5000,
            "We need at least 0.5g of radium to\n" +
            "perform spectral analysis...\n" +
            "Please keep clicking the flask.",

            10000,
            "I am sure people will believe the\n" +
            "existence of radium if you get 1.0g.\n" +
            "Please keep clicking the flask.",

            20000,
            "Splendid.\n" +
            "I am very proud of you.",

            0,
            "Many thanks for many clicking!\n" +
            "(This is the final message!)"
        ]
    },


    getNextVoice: function () {

        //cc.log("getNextVoice starts...");

        if (rcd.voiced.currentSpecialVoiceToClick > 0) {

            // Special Voice　再生中...
            rcd.voiced.currentSpecialVoiceToClick--;

            if (rcd.voiced.currentSpecialVoiceToClick == 0) {
                //このspecial voice おわり。
                if (rcd.voiced.specialVoiceStack.length > 0) {
                    // 次の special voice あった
                    rcd.voiced.currentSpecialVoiceToClick = rcd.voiced.specialVoiceStack.shift();
                    rcd.voiced.currentSpecialVoice = rcd.voiced.specialVoiceStack.shift();

                    return rcd.voiced.currentSpecialVoice;
                }
                else {
                    // いまからは通常voice..
                }
            }
            else {
                return rcd.voiced.currentSpecialVoice;
            }
        }

        // Special voice きてた
        if (rcd.voiced.specialVoiceStack.length > 0) {
            rcd.voiced.currentSpecialVoiceToClick = rcd.voiced.specialVoiceStack.shift();
            rcd.voiced.currentSpecialVoice = rcd.voiced.specialVoiceStack.shift();

            return rcd.voiced.currentSpecialVoice;
        }

        // Define special voices with condition here...
        if (rc.lyrLabo instanceof rc.LyrLaboCrash && rcd.boilUnlocked == true && rcd.hasBeenToBoil == false)
        {
            // Why don't you...
            var str = rc.l(
                "苛性ソーダで煮詰めて不純物を取り除き\n" +
                "ましょう。\n" +
                "最上部から『大釜』を選んでみませんか？",

                "Impurities need to be removed with\n" +
                "a strong boiling solution of caustic\n" +
                "soda.\n" +
                "Why don't you select 'Giant Pot'?"
            );

            return str;
        }

        if (rc.lyrLabo instanceof rc.LyrLaboBoil && rcd.chemistryUnlocked == true && rcd.hasBeenToChemistry == false)
        {
            // Why don't you...
            var str = rc.l(
                "かなりの量の試料から硫酸などの不純物を\n" +
                "除去できました。\n" +
                "最上部から『フラスコ』を選んでみませんか？",

                "We are ready for the rest of\n" +
                "chemical processes.\n" +
                "Why don't you select 'Flask'?"
            );

            return str;

        }

        // Normal - Use scenario data...
        var sub;
        //var subd;
        var currentClick;

        if (rc.lyrLabo instanceof rc.LyrLaboCrash) {
            if (rcd.language == cc.sys.LANGUAGE_ENGLISH) {
                sub = this.crashVoiceEn;
            }
            else {
                sub = this.crashVoice;
            }
            currentClick = rcd.nCrash;
        }
        else if (rc.lyrLabo instanceof rc.LyrLaboBoil) {
            if (rcd.language == cc.sys.LANGUAGE_ENGLISH) {
                sub = this.boilVoiceEn;
            }
            else {
                sub = this.boilVoice;
            }
            currentClick = rcd.nBoil;
        }
        else if (rc.lyrLabo instanceof rc.LyrLaboChenistry) {
            if (rcd.language == cc.sys.LANGUAGE_ENGLISH) {
                sub = this.chemistryVoiceEn;
            }
            else {
                sub = this.chemistryVoice;
            }
            currentClick = rcd.nChemistry;
        }
        else {
            cc.log("Invalid lyrLabo Error...");
        }

        // Start
        var i = 0;
        var str;
        do {
            var currentToClick = sub.scenario[i*2];

            if (currentToClick == 0 || currentToClick > currentClick) {
                //確定
                str = sub.scenario[i*2+1];
                break;
            }
            i++;

        } while (true);

        return str;
    }
});

