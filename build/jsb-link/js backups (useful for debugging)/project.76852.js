window.__require = function t(e, o, n) {
function i(c, s) {
if (!o[c]) {
if (!e[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!e[a]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(a, !0);
if (r) return r(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
}
var p = o[c] = {
exports: {}
};
e[c][0].call(p.exports, function(t) {
return i(e[c][1][t] || t);
}, p, p.exports, t, e, o, n);
}
return o[c].exports;
}
for (var r = "function" == typeof __require && __require, c = 0; c < n.length; c++) i(n[c]);
return i;
}({
GameRecord: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b1830KqiA1GJIc6zfJZLb1h", "GameRecord");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function t() {}
t.starGame = function() {
cc.director.loadScene("hall");
};
return t;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Game: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "616f8t2FfJCPYgbanUXGuUC", "Game");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = t("../../../globel/panel"), c = cc._decorator, s = c.ccclass, a = c.property, l = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.hbPrefab = null;
e.tipPrefab = null;
e.players_Prefab = null;
e.scorePrefab = null;
e.hb_tip_node = null;
e.players_node = null;
e.declarer_node = null;
e.declarerPrefab = null;
e.hb_myself = null;
e.hb_myself_node = null;
e.hb_node = null;
e.score_node = null;
e.s1 = 0;
e.s2 = 0;
e.s3 = 0;
e.s4 = 0;
e.timer = 0;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
var t = cc.instantiate(this.tipPrefab);
this.hb_tip_node.addChild(t);
var e = cc.instantiate(this.hbPrefab);
this.hb_node.addChild(e);
var o = cc.instantiate(this.players_Prefab);
this.players_node.addChild(o);
var i = cc.instantiate(this.declarerPrefab);
this.declarer_node.addChild(i);
var r = cc.instantiate(this.hb_myself);
this.hb_myself_node.addChild(r);
var c = cc.instantiate(this.scorePrefab);
this.score_node.addChild(c);
this.hb_tip_node.active = !0;
this.hb_tip_node.zIndex = 999;
this.regisrterEvent();
this.gameStart();
};
e.prototype.creathb = function() {
this.hb_node.active = !0;
};
e.prototype.recycleHb = function(t) {};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbConfig.logicOnCreateHb, this.creathb, this);
};
e.prototype.unregisterEvent = function() {
window.Emitter.off(i.HbConfig.logicOnCreateHb, this);
};
e.prototype.start = function() {};
e.prototype.update = function(t) {};
e.prototype.onClickButton = function() {
if (this.logic.getProcess() == i.Process.openGrab) if (this.logic.getHbCount() < 0) {
this.logic.hbCount = 0;
console.log("紅包沒了");
r.default.showTip("紅包沒了");
} else if (999 != this.logic.getCurrentBankerUid()) if (this.logic.isOpenBoom) {
console.log("已經領過紅包");
r.default.showTip("已經領過紅包");
} else {
this.logic.isOpenBoom = !0;
console.log("搶到紅包");
r.default.showTip("搶到紅包");
window.Emitter.emit(i.HbClientEvent.onOpenBoom);
} else {
console.log("你是莊家!");
r.default.showTip("你是莊家");
} else {
console.log("不能搶紅包");
r.default.showTip("不能搶紅包");
}
};
e.prototype.backHall = function() {
console.log("backhall");
cc.director.loadScene("hall");
this.destroy();
};
e.prototype.fakeTime = function() {
var t = this;
this.timer = setInterval(function() {
t.logic.getHbCount() >= 0 ? window.Emitter.emit(i.HbClientEvent.onOpenBoom) : clearInterval(t.timer);
}, 400);
};
e.prototype.gameStart = function() {
var t = this;
this.init();
this.schedule(function() {
t.step1();
t.step2();
t.step3();
t.step4();
}, 9);
};
e.prototype.step1 = function() {
var t = this;
this.logic.g >= this.logic.getMaxGame() ? this.logic.g = 1 : this.logic.g += 1;
if (this.logic.getBankerList().length <= 1) {
this.logic.createBankerList();
console.log("莊家列表1", this.logic.getBankerList());
} else console.log("莊家列表2", this.logic.getBankerList());
this.s1 = setTimeout(function() {
t.logic.isOpenBoom = !1;
window.Emitter.emit(i.HbClientEvent.onConfirmGrab);
window.Emitter.emit(i.HbClientEvent.onProcess, {
process: i.Process.waitStart
});
}, 1e3);
};
e.prototype.step2 = function() {
this.s2 = setTimeout(function() {
window.Emitter.emit(i.HbClientEvent.onProcess, {
process: i.Process.createhb
});
}, 2e3);
};
e.prototype.step3 = function() {
var t = this;
this.s3 = setTimeout(function() {
window.Emitter.emit(i.HbClientEvent.onProcess, {
process: i.Process.openGrab
});
t.fakeTime();
}, 3e3);
};
e.prototype.step4 = function() {
var t = this.logic.settleData["settle_" + this.logic.g];
this.s4 = setTimeout(function() {
window.Emitter.emit(i.HbClientEvent.onSettle, {
settle: t
});
}, 7e3);
};
e.prototype.playBGM = function(t) {
cc.audioEngine.play(t, !0, .5);
};
e.prototype.loadData = function(t) {
return new Promise(function(e, o) {
cc.loader.loadRes(t, function(t, n) {
if (t) {
cc.error(t.message || t);
o(t);
} else e(n);
});
});
};
e.prototype.init = function() {
var t = this;
this.loadData("settle.json").then(function(e) {
t.logic.settleData = e.json;
});
this.loadData("fakerplayer.json").then(function(e) {
t.logic.fakerPlayer = e.json.allPlayers;
});
};
e.prototype.canelTime = function() {
clearTimeout(this.s1);
clearTimeout(this.s2);
clearTimeout(this.s3);
clearTimeout(this.s4);
clearInterval(this.timer);
};
e.prototype.onDestroy = function() {
this.canelTime();
this.unscheduleAllCallbacks();
this.unregisterEvent();
this.logic.destory();
n.default.OnDestory();
delete this.logic;
};
__decorate([ a(cc.Prefab) ], e.prototype, "hbPrefab", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "tipPrefab", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "players_Prefab", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "scorePrefab", void 0);
__decorate([ a(cc.Node) ], e.prototype, "hb_tip_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "players_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "declarer_node", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "declarerPrefab", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "hb_myself", void 0);
__decorate([ a(cc.Node) ], e.prototype, "hb_myself_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "hb_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "score_node", void 0);
__decorate([ a(cc.RawAsset) ], e.prototype, "hb_bgm", void 0);
return e = __decorate([ s ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../globel/panel": "panel",
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
IBaseGameObject: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "cd540E3U0pP8bDGDaTuTTUZ", "IBaseGameObject");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = (n.property, function(t) {
__extends(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onClick = function(t, e) {};
return e = __decorate([ i ], e);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {} ],
Imodel: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b2f7bUuVENLga0g3Q6mNdxf", "Imodel");
cc._RF.pop();
}, {} ],
Iplayer: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a8ed0+ZKUVOrL1jLBMvJr/S", "Iplayer");
cc._RF.pop();
}, {} ],
Singleton: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2c86cSqKrFH9qiCBjd/HfDA", "Singleton");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function t() {}
t.GetInstance = function(t) {
null == this.instance && (this.instance = new t());
return this.instance;
};
t.prototype.unRegisterEvent = function() {};
t.OnDestory = function() {
if (this.instance) {
console.log("logic destory");
this.instance.unRegisterEvent();
this.instance = null;
delete this.instance;
}
};
t.instance = null;
return t;
}();
o.default = n;
cc._RF.pop();
}, {} ],
center: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "360begp0NRF87V9fhAsP62u", "center");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, c = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.gameItem = null;
e.content = null;
e.gamelist = [ {
game_path: "prefab/hall/gameitemanim/hb_animation"
}, {
game_path: "prefab/hall/gameitemanim/lhd_animation"
} ];
return e;
}
e.prototype.onLoad = function() {
for (var t = 0; t < this.gamelist.length; t++) this.createGameItem(this.gamelist[t]);
};
e.prototype.start = function() {};
e.prototype.createGameItem = function(t) {
var e = cc.instantiate(this.gameItem);
e.getComponent("mygameitem").init(t);
e.parent = this.content;
};
__decorate([ r(cc.Prefab) ], e.prototype, "gameItem", void 0);
__decorate([ r(cc.Node) ], e.prototype, "content", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
chip_actions: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "5c2afnuJTRPoqNQdtGNc2+8", "chip_actions");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = (n.property, function(t) {
__extends(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.start = function() {};
e.prototype.createCmAction = function(t, e) {
if (t && e) {
this.node.stopAllActions();
this.node.position = t;
var o = cc.moveTo(.4, e), n = cc.sequence([ cc.delayTime(.4), cc.scaleTo(.05, .45, .45), cc.scaleTo(.05, .3, .3) ]), i = cc.spawn([ o, n, cc.rotateBy(.4, 360 * Math.random() * -1), cc.sequence(cc.delayTime(.2), cc.fadeIn(.2)) ]);
this.node.runAction(i);
}
};
e.prototype.chipFlyBankerAction = function(t, e) {
var o = this;
if (t && e) {
this.node.stopAllActions();
var n = cc.moveTo(.7, e), i = cc.scaleTo(.4, .45);
this.node.runAction(cc.sequence(n, i, cc.callFunc(function() {
t && t.put(o.node);
})));
}
};
e.prototype.chipToWinPlayer = function(t, e, o, n) {
var i = this;
n = n || 999;
this.node.position = e;
var r = cc.moveTo(1, o), c = cc.scaleTo(.7, .7);
this.node.runAction(cc.sequence(cc.delayTime(2), r, c, cc.callFunc(function() {
t && t.put(i.node);
})));
};
return e = __decorate([ i ], e);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {} ],
declarer: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "4406725zQdEO7FJ3nwpOQE7", "declarer");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = t("../../../globel/panel"), c = t("../../../globel/pulicPath"), s = cc._decorator, a = s.ccclass, l = s.property, p = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.boom_count = null;
e.boom_node = null;
e.template_boom = "";
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
window.Emitter.on(i.HbClientEvent.onProcess, this.onProcess, this);
};
e.prototype.start = function() {};
e.prototype.applyDeclare = function() {
r.default.showAsynPanelByName(c.default.Prefab.HB_UP_BANKER);
};
e.prototype.getBankerList = function() {
r.default.showAsynPanelByName(c.default.Prefab.HB_DEALER);
};
e.prototype.onProcess = function(t) {
if (t.process == i.Process.createhb) {
this.boom_node.active = !0;
var e = this.logic.getBoomNumber();
this.boom_count.string = e;
} else t.process == i.Process.openGrab || t.process == i.Process.waitStart && (this.boom_count.string = "");
};
e.prototype.onDestroy = function() {
window.Emitter.off(i.HbClientEvent.onProcess, this);
};
__decorate([ l(cc.Label) ], e.prototype, "boom_count", void 0);
__decorate([ l(cc.Node) ], e.prototype, "boom_node", void 0);
return e = __decorate([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../globel/panel": "panel",
"../../../globel/pulicPath": "pulicPath",
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
emitter: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a54eaTBZctO45MTfiRMwGHX", "emitter");
var n = function(t, e) {
for (var o = 0; o < t.length; ++o) if (t[o].obj === e) return o;
return -1;
}, i = null;
e.exports = function() {
i || (i = new r());
return i;
};
function r(t) {
if (t) return c(t);
}
function c(t) {
for (var e in r.prototype) t[e] = r.prototype[e];
return t;
}
r.prototype.on = function(t, e, o) {
this._callbacks = this._callbacks || {};
(this._callbacks[t] = this._callbacks[t] || []).push({
func: e,
obj: o
});
return this;
};
r.prototype.once = function(t, e, o) {
var n = this;
this._callbacks = this._callbacks || {};
function i() {
console.log("触发了一次性事件", t);
n.off(t, i);
e.apply(o, arguments);
}
e._off = i;
this.on(t, i, o);
return this;
};
r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = function(t, e) {
this._callbacks = this._callbacks || {};
if (0 == arguments.length) {
this._callbacks = {};
return this;
}
var o = this._callbacks[t];
if (!o) return this;
if (1 == arguments.length) {
delete this._callbacks[t];
return this;
}
var i = n(o, e);
~i && o.splice(i, 1);
return this;
};
r.prototype.emit = function(t) {
this._callbacks = this._callbacks || {};
var e = [].slice.call(arguments, 1), o = this._callbacks[t];
if (o) for (var n = 0, i = (o = o.slice(0)).length; n < i; ++n) {
var r = o[n].obj;
o[n].func.apply(r, e);
}
return this;
};
r.prototype.listeners = function(t) {
this._callbacks = this._callbacks || {};
return this._callbacks[t] || [];
};
r.prototype.hasListeners = function(t) {
return !!this.listeners(t).length;
};
cc._RF.pop();
}, {} ],
faker_data: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "7352eYJbORIZqitAp069AC0", "faker_data");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.gameData = [ {
cardList: {
1: "3",
2: "3"
},
win: 3
}, {
cardList: {
1: "43",
2: "44"
},
win: 2
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "1"
},
win: 3
}, {
cardList: {
1: "3",
2: "3"
},
win: 3
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "1"
},
win: 3
}, {
cardList: {
1: "3",
2: "3"
},
win: 3
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
}, {
cardList: {
1: "1",
2: "57"
},
win: 2
}, {
cardList: {
1: "2",
2: "3"
},
win: 2
}, {
cardList: {
1: "44",
2: "43"
},
win: 1
} ];
cc._RF.pop();
}, {} ],
game_tip: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "03b56qyZMNPnoU9ZqLS7S2v", "game_tip");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, c = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.label = null;
return e;
}
e.prototype.onLoad = function() {};
e.prototype.showTip = function(t) {
this.label.string = t;
this.openAction();
};
e.prototype.start = function() {};
e.prototype.openAction = function() {
var t = this;
this.node.runAction(cc.sequence([ cc.spawn(cc.moveBy(.2, 0, 60), cc.fadeIn(.2)), cc.delayTime(1.5), cc.spawn(cc.moveBy(.2, 0, 20), cc.fadeOut(.2)), cc.callFunc(function() {
t.node.destroy();
}) ]));
this.node.runAction(cc.moveBy(1, cc.v2(0, 120)));
};
__decorate([ r(cc.Label) ], e.prototype, "label", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
globel: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "d9771mApfZBz52eBEQJBMpU", "globel");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./GameRecord"), i = t("emitter")();
window.GameRecord = n.default;
window.Emitter = i;
cc._RF.pop();
}, {
"./GameRecord": "GameRecord",
emitter: "emitter"
} ],
hall: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "41599Qo1clCmbNrb/xYed/s", "hall");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, c = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.center = null;
e.center_node = null;
return e;
}
e.prototype.onLoad = function() {
var t = cc.instantiate(this.center);
this.center_node.addChild(t);
};
e.prototype.start = function() {};
__decorate([ r(cc.Prefab) ], e.prototype, "center", void 0);
__decorate([ r(cc.Node) ], e.prototype, "center_node", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
hb_config: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1b901AbRodA8JAHzVB2urTj", "hb_config");
Object.defineProperty(o, "__esModule", {
value: !0
});
(function(t) {
t.createhb = "createhb";
t.onOpenBoom = "onOpenBoom_hb";
t.onProcess = "onProcess";
t.onSettle = "onSettle";
t.onConfirmGrab = "onConfirmGrab";
t.onUserUpBanker = "onUserUpBanker";
})(o.HbClientEvent || (o.HbClientEvent = {}));
(function(t) {
t.logicOnOpenBoom = "logic_onOpenBoom";
t.logicOnProcess = "logic_onProcess";
t.logicOnCreateHb = "logic_onCreateHb";
t.logicOnSettle = "logic_onSettle";
t.logiconConfirmGrab = "logiconConfirmGrab";
})(o.HbConfig || (o.HbConfig = {}));
(function(t) {
t[t.waitStart = 1] = "waitStart";
t[t.createhb = 2] = "createhb";
t[t.openGrab = 3] = "openGrab";
})(o.Process || (o.Process = {}));
cc._RF.pop();
}, {} ],
hb_dealerlist: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "524d2TAUNpC4qbltAAUjNfn", "hb_dealerlist");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, c = t("../../../model/hb_logic"), s = t("../../../globel/panel"), a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.boom_number = null;
e.slider = null;
e.progressBar = null;
e.bet = null;
e.logic = null;
e.max = 200;
e.min = 10;
return e;
}
e.prototype.onLoad = function() {
this.progressBar.progress = 1;
this.slider.progress = 1;
this.logic = c.default.GetInstance(c.default);
this.bet.string = "200";
};
e.prototype.start = function() {};
e.prototype.onSliderProcess = function(t) {
var e = t.progress;
e = e <= .05 ? .05 : e;
var o = parseInt((200 * e / 10).toString());
this.bet.string = (10 * o).toString();
this.progressBar.progress = this.slider.progress;
s.default.showTip("開發中...");
};
e.prototype.close = function() {
this.node.destroy();
console.log("close!");
};
e.prototype.buttonClick = function(t) {
var e = t.target.name;
switch (e) {
case "less":
if (this.getDisplayNumber() < this.min) return;
this.bet.string = (this.getDisplayNumber() - this.min).toString();
this.setSlider();
break;

case "plus":
console.log("plus", this.getDisplayNumber());
if (this.getDisplayNumber() >= this.max) return;
this.bet.string = (this.getDisplayNumber() + this.min).toString();
this.setSlider();
break;

case "apply_button":
this.apply();
break;

default:
this.setBoom(e);
}
};
e.prototype.setSlider = function() {
var t = this.getDisplayNumber();
this.slider.progress = t / 200 <= .05 ? 0 : t / 200;
this.progressBar.progress = this.slider.progress;
};
e.prototype.getDisplayNumber = function() {
return parseInt(this.bet.string);
};
e.prototype.setBoom = function(t) {
this.boom_number.string = t;
};
e.prototype.apply = function() {
var t;
t = {
boom: this.boom_number.string,
uid: this.logic.myUid,
name: this.logic.userName,
hbmoney: parseInt(this.bet.string),
money: this.logic.money,
banker: !0
};
this.logic.setUserUpBanker(t);
this.logic.createUserBanker();
s.default.showTip("上莊成功");
this.close();
};
e.prototype.regisrterEvent = function() {};
__decorate([ r(cc.Label) ], e.prototype, "boom_number", void 0);
__decorate([ r(cc.Slider) ], e.prototype, "slider", void 0);
__decorate([ r(cc.ProgressBar) ], e.prototype, "progressBar", void 0);
__decorate([ r(cc.Label) ], e.prototype, "bet", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../globel/panel": "panel",
"../../../model/hb_logic": "hb_logic"
} ],
hb_logic: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "9b1aap8SVNMHI5Wze6btk/u", "hb_logic");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./Singleton"), i = t("../game/hb/res/hb_config"), r = function(t) {
__extends(e, t);
function e() {
var e = t.call(this) || this;
e.roomType = 7;
e.money = 1e5;
e.hbArray = null;
e.hbCount = 0;
e.userName = "user";
e.processType = 0;
e.isOpenBoom = !1;
e.g = 0;
e.myUid = 999;
e.settleData = {};
e.boom = "";
e.settleHbNumber = [];
e.bankerList = [];
e.boomMoney = 200;
e.fakerPlayer = [];
e.currentPlayers = [];
e.sum = 0;
e.result = [];
console.log("hb init");
e.hbCount = 7;
e.regisrterEvent();
return e;
}
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbClientEvent.onOpenBoom, this.onOpenBoom, this);
window.Emitter.on(i.HbClientEvent.onProcess, this.onProcess, this);
window.Emitter.on(i.HbClientEvent.onSettle, this.onSettle, this);
window.Emitter.on(i.HbClientEvent.onConfirmGrab, this.onConfirmGrab, this);
window.Emitter.on(i.HbClientEvent.onUserUpBanker, this.onUserUpBanker, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.HbClientEvent.onOpenBoom, this);
window.Emitter.off(i.HbClientEvent.onProcess, this);
window.Emitter.off(i.HbClientEvent.onSettle, this);
window.Emitter.off(i.HbClientEvent.onConfirmGrab, this);
window.Emitter.off(i.HbClientEvent.onUserUpBanker, this);
};
e.prototype.enterGame = function() {};
e.prototype.onOpenBoom = function() {
window.Emitter.emit(i.HbConfig.logicOnOpenBoom);
this.hbCount--;
};
e.prototype.getHbCount = function() {
return this.hbCount;
};
e.prototype.getSum = function() {
return this.sum;
};
e.prototype.settleResult = function(t) {
var e = this;
return this.isOpenBoom ? this.currentPlayers.map(function(o, n) {
return e.isBoomNumber(e.settleHbNumber[n].hbmoney) ? {
money: o.money - 1.5 * e.boomMoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
} : o.banker ? {
banker: !0,
name: o.name,
uid: o.uid,
money: o.money + t,
boom: o.boom,
hbmoney: ""
} : o.uid == e.settleHbNumber[n].uid ? {
money: o.money + e.settleHbNumber[n].hbmoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
} : {
money: e.money + e.settleHbNumber[n].hbmoney,
uid: e.myUid,
name: e.userName,
hbmoney: e.settleHbNumber[n].hbmoney
};
}) : 999 == this.getCurrentBankerUid() ? this.currentPlayers.map(function(o, n) {
if (e.isBoomNumber(e.settleHbNumber[n].hbmoney)) return {
money: o.money - 1.5 * e.boomMoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
};
if (999 == o.uid) {
console.log("$", t);
console.log("$", e.money + t);
return {
banker: !0,
name: e.userName,
uid: e.myUid,
money: e.money + t,
boom: o.boom,
hbmoney: ""
};
}
return o.uid == e.settleHbNumber[n].uid ? {
money: o.money + e.settleHbNumber[n].hbmoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
} : {
money: e.money + e.settleHbNumber[n].hbmoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
};
}) : this.currentPlayers.map(function(o, n) {
return e.isBoomNumber(e.settleHbNumber[n].hbmoney) ? {
money: o.money - 1.5 * e.boomMoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
} : o.banker ? {
banker: !0,
name: o.name,
uid: o.uid,
money: o.money + t,
boom: o.boom,
hbmoney: ""
} : o.banker && 999 == e.getCurrentBankerUid() ? {
money: o.money + e.settleHbNumber[n].hbmoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
} : {
money: e.money + e.settleHbNumber[n].hbmoney,
uid: o.uid,
name: o.name,
hbmoney: e.settleHbNumber[n].hbmoney
};
});
};
e.prototype.onProcess = function(t) {
this.processType = t.process;
if (t.process == i.Process.waitStart) {
this.sum = 0;
var e = this.bankerList[0].boom;
this.boom = e;
this.currentBankerUid = this.bankerList[0].uid;
this.test();
this.hbCount = 7;
} else t.process == i.Process.createhb || t.process == i.Process.openGrab && this.removeCurrentBanker();
};
e.prototype.onSettle = function(t) {
var e = this;
this.sum = 0;
this.settleHbNumber = this.chooseBooms(this.boomMoney);
this.settleHbNumber.forEach(function(t, o) {
e.isBoomNumber(t.hbmoney) ? e.sum += 150 : 999 == t.uid || (e.sum -= t.hbmoney);
});
this.result = this.settleResult(this.sum);
if (999 == this.getCurrentBankerUid()) {
var o = this.result.filter(function(t, e) {
return 0 !== e;
});
this.result = o;
}
var n = this.result.find(function(t) {
return t.uid == e.myUid;
});
n && (this.money = n.money);
this.margeFakerPlayer();
window.Emitter.emit(i.HbConfig.logicOnSettle);
};
e.prototype.onConfirmGrab = function() {
window.Emitter.emit(i.HbConfig.logiconConfirmGrab);
};
e.prototype.margeFakerPlayer = function() {
var t = this;
this.fakerPlayer.forEach(function(e, o) {
t.result.forEach(function(t) {
if (e.uid == t.uid) {
e.uid, t.uid, e.name = t.name;
e.money = t.money;
e.boom = "";
}
});
});
};
e.prototype.getProcess = function() {
return this.processType;
};
e.prototype.createBoomNumert = function() {
return Math.floor(9 * Math.random()).toString();
};
e.prototype.getBoomNumber = function() {
return this.boom;
};
e.prototype.getMaxGame = function() {
return Object.keys(this.settleData).length;
};
e.prototype.createRandomBanker = function() {
var t = this.getRandomArrayPlayers(this.fakerPlayer, 1)[0], e = {
boom: "",
bet_money: 0,
uid: 0,
name: "",
money: 0,
banker: !0
};
e.boom = this.createBoomNumert();
e.bet_money = this.getRandomHbMoney(200);
e.uid = t.uid;
e.name = t.name;
e.money = t.money;
return e;
};
e.prototype.getCurrentPlayers = function() {
return this.currentPlayers;
};
e.prototype.getBankerList = function() {
return this.bankerList;
};
e.prototype.createBankerList = function() {
for (var t = 0; t < 3; t++) {
var e = this.createRandomBanker();
this.bankerList.push(e);
}
};
e.prototype.createUserBanker = function() {
var t = this.getUserUpBanker();
this.bankerList.push(t);
};
e.prototype.setUserUpBanker = function(t) {
this.upBanker = t;
};
e.prototype.getUserUpBanker = function() {
return this.upBanker;
};
e.prototype.getCurrentBankerUid = function() {
return this.currentBankerUid;
};
e.prototype.isBoomNumber = function(t) {
var e = Math.abs(t).toString();
return e.substr(e.length - 1, 1) == this.getBoomNumber();
};
e.prototype.getRandomHbMoney = function(t) {
for (var e = 1; e % 10 != 0; ) e = this.roll(t);
return e;
};
e.prototype.roll = function(t) {
return Math.floor(Math.random() * t + 10);
};
e.prototype.chooseBooms = function(t) {
for (var e, o, n, i, r, c, s = this, a = Math.floor(6 * Math.random()), l = 0, p = [], h = Math.floor(Math.abs(t / 5)); e + o + n + i + r + c + l !== t; ) {
e = this.roll(h);
o = this.roll(h);
n = this.roll(h);
i = this.roll(h);
r = this.roll(h);
c = this.roll(h);
l = this.roll(h);
}
var u = [ e, o, n, i, r, c, l ];
this.getCurrentPlayers().forEach(function(t, e) {
s.isOpenBoom && e == a ? p.push({
uid: s.myUid,
hbmoney: u[e]
}) : p.push({
uid: t.uid,
hbmoney: u[e]
});
});
return p;
};
e.prototype.getRandomArrayPlayers = function(t, e) {
for (var o, n, i = t.slice(0), r = t.length, c = r - e; r-- > c; ) {
o = i[n = Math.floor((r + 1) * Math.random())];
i[n] = i[r];
i[r] = o;
}
return i.slice(c);
};
e.prototype.test = function() {
var t = this, e = 999 == this.getCurrentBankerUid() ? 7 : 6;
this.currentPlayers = this.getRandomArrayPlayers(this.fakerPlayer, e);
if (this.currentPlayers.find(function(e) {
return e.uid == t.bankerList[0].uid;
})) {
var o = this.currentPlayers.filter(function(e) {
return e.uid !== t.bankerList[0].uid;
});
o.push(this.bankerList[0]);
var n = this.createDifferentPlayer(o);
o.push(n);
this.currentPlayers = o;
} else this.currentPlayers.push(this.bankerList[0]);
};
e.prototype.createDifferentPlayer = function(t) {
for (var e = this.getRandomArrayPlayers(this.fakerPlayer, 1)[0], o = t[0], n = t[1], i = t[2], r = t[3], c = t[4], s = t[5]; o.uid == e.uid || n.uid == e.uid || n.uid == e.uid || i.uid == e.uid || i.uid == e.uid || r.uid == e.uid || c.uid == e.uid || s.uid == e.uid; ) e = this.getRandomArrayPlayers(this.fakerPlayer, 1)[0];
return e;
};
e.prototype.removeCurrentBanker = function() {
this.bankerList.splice(0, 1);
};
e.prototype.onUserUpBanker = function() {
var t = this.getUserUpBanker();
this.bankerList.push(t);
};
e.prototype.destory = function() {
this.unregisrterEvent();
};
return e;
}(n.default);
o.default = r;
cc._RF.pop();
}, {
"../game/hb/res/hb_config": "hb_config",
"./Singleton": "Singleton"
} ],
hb_self_seat: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e4fc13c/ppDEqvPUnjMn3Dk", "hb_self_seat");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.momey = null;
e.nickname = null;
e.coin_node = null;
e.banker_node = null;
e.boom_node = null;
e.myScore = null;
e.fontList = [];
e.score = null;
e.logic = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.nickname.string = "user";
this.momey.string = this.logic.money.toString();
this.banker_node.active = !1;
this.boom_node.active = !1;
this.regisrterEvent();
this.init();
};
e.prototype.start = function() {};
e.prototype.init = function() {
var t = cc.instantiate(this.score);
this.myScore.addChild(t);
this.myScore.getComponent(cc.Label).string = "";
this.myScore.active = !1;
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbClientEvent.onProcess, this.onProcess, this);
window.Emitter.on(i.HbConfig.logicOnSettle, this.onSettle, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.HbClientEvent.onProcess, this);
window.Emitter.off(i.HbConfig.logicOnSettle, this);
};
e.prototype.onProcess = function(t) {
switch (t.process) {
case i.Process.createhb:
break;

case i.Process.waitStart:
this.node.getChildByName("seat").active = !0;
this.coin_node.getComponent(cc.Label).string = "";
this.banker_node.active = !1;
this.boom_node.active = !1;
this.myScore.active = !1;
this.myScore.getComponent(cc.Label).string = "";
break;

case i.Process.openGrab:
}
};
e.prototype.onSettle = function(t) {
var e = this, o = this.logic.result.find(function(t, o) {
return t.uid == e.logic.myUid;
});
if (this.logic.isOpenBoom) if (this.logic.isBoomNumber(o.hbmoney)) {
this.coin_node.color = cc.Color.RED;
this.coin_node.getComponent(cc.Label).string = o.hbmoney;
this.boom_node.active = !0;
this.myScore.active = !0;
this.myScore.getComponent(cc.Label).string = "-" + 1.5 * this.logic.boomMoney;
this.myScore.getComponent(cc.Label).font = this.fontList[1];
} else {
this.coin_node.color = cc.Color.YELLOW;
this.momey.string = this.logic.money.toString();
this.coin_node.getComponent(cc.Label).string = o.hbmoney;
this.myScore.active = !0;
this.myScore.getComponent(cc.Label).string = "+" + o.hbmoney;
this.myScore.getComponent(cc.Label).font = this.fontList[0];
}
if (999 == this.logic.getCurrentBankerUid()) {
this.myScore.active = !0;
this.banker_node.active = !0;
this.coin_node.getComponent(cc.Label).string = "當前莊家";
this.momey.string = o.money.toString();
if (this.logic.getSum() > 0) {
this.myScore.getComponent(cc.Label).string = "+" + this.logic.getSum();
this.myScore.getComponent(cc.Label).font = this.fontList[0];
} else {
this.myScore.getComponent(cc.Label).string = this.logic.getSum().toString();
this.myScore.getComponent(cc.Label).font = this.fontList[1];
}
}
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Label) ], e.prototype, "momey", void 0);
__decorate([ s(cc.Label) ], e.prototype, "nickname", void 0);
__decorate([ s(cc.Node) ], e.prototype, "coin_node", void 0);
__decorate([ s(cc.Node) ], e.prototype, "banker_node", void 0);
__decorate([ s(cc.Node) ], e.prototype, "boom_node", void 0);
__decorate([ s(cc.Node) ], e.prototype, "myScore", void 0);
__decorate([ s([ cc.Font ]) ], e.prototype, "fontList", void 0);
__decorate([ s(cc.Prefab) ], e.prototype, "score", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
hb_tip: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "00c1ekD10tFs5xMfpffSbB4", "hb_tip");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.label = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.regisrterEvent();
};
e.prototype.start = function() {};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbConfig.logicOnOpenBoom, this.onOpenBoom, this);
window.Emitter.on(i.HbClientEvent.onProcess, this.onProcess, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.HbConfig.logicOnOpenBoom, this);
window.Emitter.off(i.HbClientEvent.onProcess, this);
};
e.prototype.onOpenBoom = function() {
this.label.string = "剩餘紅包" + this.logic.getHbCount().toString();
};
e.prototype.onProcess = function(t) {
i.Process.createhb == t.process ? this.node.active = !0 : i.Process.waitStart == t.process && (this.node.active = !1);
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Label) ], e.prototype, "label", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
lhd_action: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e2408Q86FJIXIkAEBBq3ev1", "lhd_action");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./lhd_logic"), i = t("../../../common/res/chip_actions"), r = t("./lhd_config"), c = cc._decorator, s = c.ccclass, a = c.property, l = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.chippool = null;
e.chipList = [];
e.chip_parent_node = null;
e.card_parent_node = null;
e.dragon = null;
e.tiger = null;
e.area_pos_node = null;
e.chip_node = null;
e.my_pos = null;
e.banker_pos = null;
e.chipAtlas = null;
e.cardsAtlas = null;
e.rightPos = null;
e.leftPos = null;
e.kongCard = null;
e.right_text = null;
e.left_text = null;
e.CARD_INDEX = {
CARD_LONG: 1,
CARD_HU: 2
};
e.SCALENUM = .7;
e.timer_1 = 0;
e.timer_2 = 0;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.initChipPool();
this.regisrterEvent();
};
e.prototype.start = function() {};
e.prototype.regisrterEvent = function() {
window.Emitter.on(r.LhdLogicEvent.logicOnPour, this.userOnPour, this);
window.Emitter.on(r.LhdLogicEvent.logicOnProcess, this.onProcess, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(r.LhdLogicEvent.logicOnPour, this);
window.Emitter.off(r.LhdLogicEvent.logicOnProcess, this);
};
e.prototype.chipfly = function(t, e, o, n) {
var i = this.creatFromPool(n);
this.chipList.push(i);
var r = this.getendPos(e, i);
i.getComponent("chip_actions").createCmAction(t, r);
};
e.prototype.initChipPool = function() {
this.chippool = new cc.NodePool();
for (var t = 0; t < 80; t++) {
var e = cc.instantiate(this.chip_node);
e.addComponent(i.default);
this.chippool.put(e);
}
};
e.prototype.creatFromPool = function(t) {
if (this.chippool) {
var e = null;
this.chippool.size() > 0 ? (e = this.chippool.get()).stopAllActions() : (e = cc.instantiate(this.chip_node)).addComponent(i.default);
e.getChildByName("text").getComponent(cc.Label).string = t.toString();
var o = this.logic.getCurrentBetSprite();
e.getComponent(cc.Sprite).spriteFrame = this.chipAtlas.getSpriteFrame(o);
e.parent = this.chip_parent_node;
e.active = !0;
return e;
}
};
e.prototype.getendPos = function(t, e) {
var o = this.area_pos_node.children[t - 1], n = o.position;
n.x = Math.random() * (o.width - .6 * e.width) + (o.x - o.width / 2 + .6 * e.width / 2);
n.y = Math.random() * (o.height - .6 * e.height) + (o.y - o.height / 2 + .6 * e.height / 2);
return n;
};
e.prototype.userOnPour = function() {
var t = this.logic.getbetData(), e = this.logic.getPourStore(t), o = this.logic.getCurrentBetIndex();
this.chipfly(this.my_pos.position, o, 999, e);
};
e.prototype.onProcess = function() {
switch (this.logic.getStatus()) {
case r.Process.waitStart:
this.card_parent_node.destroyAllChildren();
this.closeFrame();
break;

case r.Process.betStart:
this.right_text.string = this.logic.getCardCount();
this.left_text.string = (2 * this.logic.getCurrentGame()).toString();
this.fapaiAni();
break;

case r.Process.onSettle:
this.setteleOpenCardAnimation();
this.settleAnimation();
this.chipFlyToPlayer();
}
};
e.prototype.settleAnimation = function() {
var t = this, e = this.banker_pos.position;
this.chipList.forEach(function(o) {
o.getComponent("chip_actions").chipFlyBankerAction(t.chippool, e);
});
};
e.prototype.chipFlyToPlayer = function() {
this.my_pos.position;
for (var t = 0, e = this.logic.getWinAndUserBet(), o = Object.keys(e), n = 0; n < o.length; n++) t += e[o[n]];
t *= 2;
this.timer_1 = setTimeout(function() {
window.Emitter.emit(r.LhdAnimationEvent.updateUserCoin);
}, 1200);
t > 0 && window.Emitter.emit(r.LhdAnimationEvent.showResult, {
sum: t
});
};
e.prototype.setteleOpenCardAnimation = function() {
var t = this, e = [];
e.push(cc.delayTime(.6), cc.callFunc(function() {
t.openCard(1);
}), cc.delayTime(.5), cc.callFunc(function() {
t.openCard(2);
}), cc.delayTime(.5), cc.callFunc(function() {
t.winAinmation();
window.Emitter.emit(r.LhdLogicEvent.logicOnOpenCard);
}));
this.node.runAction(cc.sequence(e));
};
e.prototype.winAinmation = function() {
if (1 == this.logic.getWin()) this.dragon.getChildByName("frame").active = !0; else if (2 == this.logic.getWin()) this.tiger.getChildByName("frame").active = !0; else if (3 == this.logic.getWin()) {
this.dragon.getChildByName("frame").active = !0;
this.tiger.getChildByName("frame").active = !0;
}
};
e.prototype.closeFrame = function() {
this.dragon.getChildByName("frame").active = !1;
this.tiger.getChildByName("frame").active = !1;
};
e.prototype.addCard = function() {
var t = new cc.Node();
t.parent = this.card_parent_node;
t.addComponent(cc.Sprite);
this.setCardValue(t);
return t;
};
e.prototype.setCardValue = function(t, e) {
void 0 === e && (e = 0);
var o = this.logic.getCarList(), n = 0 === e ? 0 : o[e], i = this.getSixValue(n), r = this.cardsAtlas.getSpriteFrame("bull1_" + i);
r && (t.getComponent(cc.Sprite).spriteFrame = r);
};
e.prototype.getSixValue = function(t) {
var e = parseInt(t);
return (e < 14 ? "0x0" : "0x") + e.toString(16);
};
e.prototype.dealwasteCard = function() {
var t = this.addCard();
t.rotation = -45;
t.setScale(.2);
t.parent = this.card_parent_node;
t.position = this.rightPos.position;
var e = cc.moveTo(.2, this.kongCard.position), o = cc.rotateTo(.2, 0), n = cc.scaleTo(.2, this.SCALENUM, this.SCALENUM), i = cc.delayTime(.6), r = cc.moveTo(.2, this.leftPos.position), c = cc.rotateTo(.2, 45), s = cc.scaleTo(.2, .2, .2), a = cc.callFunc(function() {
t.removeFromParent();
t.destroy();
});
t.runAction(cc.sequence(cc.spawn(e, o, n), i, cc.spawn(r, c, s), a));
};
e.prototype.dealfapai = function(t) {
var e = this.addCard();
e.rotation = -45;
e.setScale(.6);
e.parent = this.card_parent_node;
e.position = this.rightPos.position;
var o = cc.moveTo(.2, t), n = cc.rotateTo(.2, 0), i = cc.scaleTo(.2, this.SCALENUM, this.SCALENUM);
e.runAction(cc.sequence(o, n, i));
};
e.prototype.fapaiAni = function() {
var t = this, e = [];
e.push(cc.callFunc(function() {}));
e.push(cc.delayTime(1));
e.push(cc.callFunc(function() {
t.dealfapai(t.dragon.position);
}));
e.push(cc.delayTime(.6));
e.push(cc.callFunc(function() {
t.dealfapai(t.tiger.position);
}));
this.node.runAction(cc.sequence(e));
};
e.prototype.openCard = function(t) {
var e = this.card_parent_node.children, o = 1 === t ? e[0] : e[1];
this._openCard(o, t);
if (0 !== t) {
var n = this.logic.getCarList()[t];
n = n % 16 - 1;
}
};
e.prototype._openCard = function(t, e) {
var o = this;
if (t) {
var n = cc.scaleTo(.15, 0, 1), i = cc.scaleTo(.15, this.SCALENUM, this.SCALENUM), r = cc.callFunc(function() {
o.setCardValue(t, e);
});
t.runAction(cc.sequence(n, cc.spawn(i, r)));
}
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
clearTimeout(this.timer_1);
clearTimeout(this.timer_2);
};
__decorate([ a(cc.Node) ], e.prototype, "chip_parent_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "card_parent_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "dragon", void 0);
__decorate([ a(cc.Node) ], e.prototype, "tiger", void 0);
__decorate([ a(cc.Node) ], e.prototype, "area_pos_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "chip_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "my_pos", void 0);
__decorate([ a(cc.Node) ], e.prototype, "banker_pos", void 0);
__decorate([ a(cc.SpriteAtlas) ], e.prototype, "chipAtlas", void 0);
__decorate([ a(cc.SpriteAtlas) ], e.prototype, "cardsAtlas", void 0);
__decorate([ a(cc.Node) ], e.prototype, "rightPos", void 0);
__decorate([ a(cc.Node) ], e.prototype, "leftPos", void 0);
__decorate([ a(cc.Node) ], e.prototype, "kongCard", void 0);
__decorate([ a(cc.Label) ], e.prototype, "right_text", void 0);
__decorate([ a(cc.Label) ], e.prototype, "left_text", void 0);
return e = __decorate([ s ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../common/res/chip_actions": "chip_actions",
"./lhd_config": "lhd_config",
"./lhd_logic": "lhd_logic"
} ],
lhd_bottom_pour: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "cdc29J0eTJLvKuhGKQMWoRh", "lhd_bottom_pour");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../globel/panel"), i = t("./lhd_config"), r = t("./lhd_logic"), c = cc._decorator, s = c.ccclass, a = c.property, l = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.chipList = null;
e.trend_node = null;
e.d = null;
e.t = null;
e.h = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = r.default.GetInstance(r.default);
this.regisrterEvent();
this.initChipList();
};
e.prototype.onButtonClick = function(t) {
if (this.logic.getUserCoin() <= 0) n.default.showTip("金額不足"); else {
var e = t.target.name, o = e;
e = e.split("_")[1];
e = parseInt(e);
if (this.logic.getStatus() == i.Process.betStart) {
this.logic.setCurrentBetIndex(e);
for (var r = this.chipList.children, c = 0; c < r.length; c++) if (r[c].name == o) {
r[c].getChildByName("effect").getComponent(cc.Animation).play();
break;
}
window.Emitter.emit(i.FakerRoomEvent.playerBet, e);
} else n.default.showTip("無法下注");
}
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.LhdLogicEvent.logicOnProcess, this.onProcess, this);
window.Emitter.on(i.LhdLogicEvent.logicOnPour, this.userOnPour, this);
window.Emitter.on(i.LhdLogicEvent.logicOnOpenCard, this.trend, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.LhdLogicEvent.logicOnProcess, this);
window.Emitter.off(i.LhdLogicEvent.logicOnPour, this);
window.Emitter.off(i.LhdLogicEvent.logicOnOpenCard, this);
};
e.prototype.onProcess = function() {
switch (this.logic.getStatus()) {
case i.Process.waitStart:
this.initChipList();
this.resumeEffect();
break;

case i.Process.onSettle:
}
};
e.prototype.trend = function() {
var t = new cc.Node();
t.addComponent(cc.Sprite);
switch (this.logic.getWin()) {
case 1:
t.addComponent(cc.Sprite).spriteFrame = this.d;
break;

case 2:
t.addComponent(cc.Sprite).spriteFrame = this.t;
break;

case 3:
t.addComponent(cc.Sprite).spriteFrame = this.h;
}
this.trend_node.addChild(t);
this.onSettleEffect();
};
e.prototype.setCoinSum = function(t, e) {
t.getChildByName("coin_sum").getComponent(cc.Label).string = e.toString();
};
e.prototype.setCoinNow = function(t, e) {
t.getChildByName("coin_now").getComponent(cc.Label).string = e.toString();
};
e.prototype.userOnPour = function() {
var t = this.chipList.children, e = this.logic.getAreaChipIndex(), o = this.logic.getMyAreaChipIndex(), n = this.logic.getCurrentBetIndex();
this.setCoinSum(t[n - 1], e);
this.setCoinNow(t[n - 1], o);
};
e.prototype.initChipList = function() {
for (var t = this.chipList.children, e = 0; e < t.length; e++) {
this.setCoinNow(t[e], 0);
this.setCoinSum(t[e], 0);
}
};
e.prototype.onSettleEffect = function() {
var t = this.logic.getUserBetWinArea(), e = this.chipList.children;
t.forEach(function(t) {
var o = parseInt(t);
e[o - 1].getChildByName("effect").opacity = 255;
});
};
e.prototype.resumeEffect = function() {
for (var t = this.chipList.children, e = 0; e < t.length; e++) t[e].getChildByName("effect").opacity = 0;
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ a(cc.Node) ], e.prototype, "chipList", void 0);
__decorate([ a(cc.Node) ], e.prototype, "trend_node", void 0);
__decorate([ a(cc.SpriteFrame) ], e.prototype, "d", void 0);
__decorate([ a(cc.SpriteFrame) ], e.prototype, "t", void 0);
__decorate([ a(cc.SpriteFrame) ], e.prototype, "h", void 0);
return e = __decorate([ s ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../globel/panel": "panel",
"./lhd_config": "lhd_config",
"./lhd_logic": "lhd_logic"
} ],
lhd_clock: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "856214CCCJJS5Gi/3vbt7mf", "lhd_clock");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./lhd_logic"), i = t("./lhd_config"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.t = 0;
e.time = "10";
e.clock_node = null;
return e;
}
e.prototype.start = function() {};
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.regisrterEvent();
};
e.prototype.onDestroy = function() {
this.unregisterEvent();
this.destroyClock();
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.LhdLogicEvent.logicOnProcess, this.onProcess, this);
};
e.prototype.unregisterEvent = function() {
window.Emitter.off(i.LhdLogicEvent.logicOnProcess, this);
};
e.prototype.onProcess = function() {
switch (this.logic.getStatus()) {
case i.Process.betStart:
this.clock_node.active = !0;
this.showClock();
break;

default:
this.clock_node.active = !1;
this.destroyClock();
}
};
e.prototype.showClock = function() {
var t = this, e = 11;
this.t = setInterval(function() {
if (e > 0) {
e -= 1;
t.time.string = e.toString();
}
}, 1e3);
};
e.prototype.destroyClock = function() {
clearInterval(this.t);
};
__decorate([ s(cc.Label) ], e.prototype, "time", void 0);
__decorate([ s(cc.Node) ], e.prototype, "clock_node", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"./lhd_config": "lhd_config",
"./lhd_logic": "lhd_logic"
} ],
lhd_config: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "4654evKvBRIjo7qi8BckOy+", "lhd_config");
Object.defineProperty(o, "__esModule", {
value: !0
});
(function(t) {
t.onProcess = "onProcess";
t.onSettle = "onSettle";
t.onMyChooseChip = "onMyChooseChip";
})(o.LhdClientEvent || (o.LhdClientEvent = {}));
(function(t) {
t.logicOnProcess = "logic_onProcess";
t.logicOnSettle = "logicOnSettle";
t.logicOnPour = "logicOnPour";
t.logicOnOpenCard = "logicOnOpenCard";
})(o.LhdLogicEvent || (o.LhdLogicEvent = {}));
(function(t) {
t.updateUserCoin = "updateUserCoin";
t.showResult = "showResult";
})(o.LhdAnimationEvent || (o.LhdAnimationEvent = {}));
(function(t) {
t[t.waitStart = 1] = "waitStart";
t[t.betStart = 2] = "betStart";
t[t.onSettle = 3] = "onSettle";
})(o.Process || (o.Process = {}));
(function(t) {
t.playerBet = "playerBet";
})(o.FakerRoomEvent || (o.FakerRoomEvent = {}));
cc._RF.pop();
}, {} ],
lhd_effect_ctrl: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "06e5658RPpJ0a/bV0bSMsNr", "lhd_effect_ctrl");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, c = t("../res/lhd_logic"), s = t("./lhd_config"), a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.dragon_effect = null;
e.tiger_effect = null;
e.tie_effect = null;
e.dragon_node = null;
e.tiger_node = null;
e.tie_node = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = c.default.GetInstance(c.default);
var t = cc.instantiate(this.dragon_effect);
this.dragon_node.addChild(t);
var e = cc.instantiate(this.tiger_effect);
this.tiger_node.addChild(e);
var o = cc.instantiate(this.tie_effect);
this.tie_node.addChild(o);
this.regisrterEvent();
};
e.prototype.start = function() {};
e.prototype.regisrterEvent = function() {
window.Emitter.on(s.LhdLogicEvent.logicOnProcess, this.onProcess, this);
window.Emitter.on(s.LhdAnimationEvent.updateUserCoin, this.showResult, this);
};
e.prototype.onProcess = function() {
switch (this.logic.getStatus()) {
case s.Process.onSettle:
break;

case s.Process.waitStart:
this.disappear();
}
};
e.prototype.showResult = function() {
switch (this.logic.getWin()) {
case 1:
this.node.children[0].active = !0;
this.dragon_node.getChildByName("dragon").getComponent(cc.Animation).play();
break;

case 2:
this.node.children[1].active = !0;
this.tiger_node.getChildByName("tiger").getComponent(cc.Animation).play();
break;

case 3:
this.node.children[2].active = !0;
this.tie_node.getChildByName("tie").getComponent(cc.Animation).play();
}
};
e.prototype.disappear = function() {
for (var t = this.node.children, e = 0; e < t.length; e++) t[e].active = !1;
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(s.LhdLogicEvent.logicOnProcess, this);
window.Emitter.off(s.LhdAnimationEvent.updateUserCoin, this);
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ r(cc.Prefab) ], e.prototype, "dragon_effect", void 0);
__decorate([ r(cc.Prefab) ], e.prototype, "tiger_effect", void 0);
__decorate([ r(cc.Prefab) ], e.prototype, "tie_effect", void 0);
__decorate([ r(cc.Node) ], e.prototype, "dragon_node", void 0);
__decorate([ r(cc.Node) ], e.prototype, "tiger_node", void 0);
__decorate([ r(cc.Node) ], e.prototype, "tie_node", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../res/lhd_logic": "lhd_logic",
"./lhd_config": "lhd_config"
} ],
lhd_game: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "890039mEwVMvYcKLCkJlXMk", "lhd_game");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./lhd_logic"), i = t("../../../globel/panel"), r = t("./lhd_config"), c = cc._decorator, s = c.ccclass, a = c.property, l = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.myChips = null;
e.myTable = null;
e.user = null;
e.myTable_node = null;
e.myChips_node = null;
e.action_ctrl = null;
e.action_ctrl_node = null;
e.user_node = null;
e.clock_node = null;
e.clock = null;
e.effect = null;
e.effect_node = null;
e.result_prefab = null;
e.result_node = null;
e.s1 = null;
e.s2 = null;
e.s3 = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
var t = cc.instantiate(this.myTable);
this.myTable_node.addChild(t);
var e = cc.instantiate(this.action_ctrl);
this.action_ctrl_node.addChild(e);
var o = cc.instantiate(this.myChips);
this.myChips_node.addChild(o);
this.myChips_node.zIndex = 99;
var i = cc.instantiate(this.user);
this.user_node.addChild(i);
var r = cc.instantiate(this.clock);
this.clock_node.addChild(r);
var c = cc.instantiate(this.effect);
this.effect_node.addChild(c);
var s = cc.instantiate(this.result_prefab);
this.result_node.addChild(s);
this.registerEvent();
this.gameStart();
};
e.prototype.start = function() {};
e.prototype.gameStart = function() {
var t = this;
this.step1();
this.step2();
this.step3();
this.schedule(function() {
t.step1();
t.step2();
t.step3();
}, 28);
};
e.prototype.step1 = function() {
var t = this;
this.s1 = setTimeout(function() {
i.default.showTip("遊戲準備開始");
t.logic.setCurrentGame(1);
window.Emitter.emit(r.LhdClientEvent.onProcess, {
process: r.Process.waitStart
});
}, 1e3);
};
e.prototype.step2 = function() {
this.s2 = setTimeout(function() {
i.default.showTip("開始下注");
window.Emitter.emit(r.LhdClientEvent.onProcess, {
process: r.Process.betStart
});
}, 6e3);
};
e.prototype.step3 = function() {
this.s3 = setTimeout(function() {
window.Emitter.emit(r.LhdClientEvent.onProcess, {
process: r.Process.onSettle
});
i.default.showTip("停止下注");
}, 18e3);
};
e.prototype.registerEvent = function() {
window.Emitter.on(r.FakerRoomEvent.playerBet, this.playerBet, this);
};
e.prototype.unregisterEvent = function() {
window.Emitter.off(r.FakerRoomEvent.playerBet, this);
};
e.prototype.playerBet = function(t) {
var e = this.logic.getbetData(), o = {
areaIndex: t,
chipValue: this.logic.getPourStore(e)
};
window.Emitter.emit(r.LhdClientEvent.onMyChooseChip, o);
};
e.prototype.back = function() {
cc.director.loadScene("hall");
this.destroy();
};
e.prototype.canelTime = function() {
clearTimeout(this.s1);
clearTimeout(this.s2);
clearTimeout(this.s3);
};
e.prototype.onDestroy = function() {
console.log("lhd game onDestroy");
this.canelTime();
this.unscheduleAllCallbacks();
this.unregisterEvent();
this.logic.destory();
n.default.OnDestory();
delete this.logic;
};
__decorate([ a(cc.Prefab) ], e.prototype, "myChips", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "myTable", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "user", void 0);
__decorate([ a(cc.Node) ], e.prototype, "myTable_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "myChips_node", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "action_ctrl", void 0);
__decorate([ a(cc.Node) ], e.prototype, "action_ctrl_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "user_node", void 0);
__decorate([ a(cc.Node) ], e.prototype, "clock_node", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "clock", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "effect", void 0);
__decorate([ a(cc.Node) ], e.prototype, "effect_node", void 0);
__decorate([ a(cc.Prefab) ], e.prototype, "result_prefab", void 0);
__decorate([ a(cc.Node) ], e.prototype, "result_node", void 0);
return e = __decorate([ s ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../globel/panel": "panel",
"./lhd_config": "lhd_config",
"./lhd_logic": "lhd_logic"
} ],
lhd_logic: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "0ae71pRyQRAzaaglbIX9lsz", "lhd_logic");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/Singleton"), i = t("./lhd_config"), r = t("./faker_data"), c = function(t) {
__extends(e, t);
function e() {
var e = t.call(this) || this;
e.betData = 1;
e.myUid = 999;
e.pourStore = {};
e.status = 0;
e.winAreaIndex = 0;
e.chip = [ 10, 50, 100, 500 ];
e.currentGame = 0;
e.win = 0;
e.userBetWinArea = [];
e.userCoin = 1e3;
e.chipsToArray = [];
e.cardList = {};
e.chipSorite = [ "img_yxcm_cheng", "img_yxcm_huang", "img_yxcm_szs", "img_yxcm_zong" ];
e.cardCount = 416;
e.currentBetIndex = 0;
e.areaChip = {};
e.myAreaChip = {};
e.result = {};
e.templateCoin = 0;
console.log("lhd init");
e.regisrterEvent();
e.initChip();
e.initareaChip();
return e;
}
e.prototype.initChip = function() {
for (var t = 0; t < this.chip.length; t++) this.pourStore[t + 1] = this.chip[t];
};
e.prototype.initareaChip = function() {
for (var t = 1; t <= 11; t++) this.areaChip[t] = 0;
for (t = 1; t <= 11; t++) this.myAreaChip[t] = 0;
};
e.prototype.setUserBetWinArea = function(t) {
this.userBetWinArea.push(t);
};
e.prototype.getResult = function() {
return this.result;
};
e.prototype.getCardCount = function() {
this.cardCount = this.cardCount - 2;
return this.cardCount.toString();
};
e.prototype.getUserCoin = function() {
return this.userCoin;
};
e.prototype.setUserCoin = function(t) {
return this.userCoin = this.userCoin + t;
};
e.prototype.getMyUid = function() {
return this.myUid;
};
e.prototype.getWin = function() {
return this.win;
};
e.prototype.setDownPour = function(t) {
void 0 === t && (t = 1);
this.betData = t;
};
e.prototype.getCurrentBetIndex = function() {
return this.currentBetIndex;
};
e.prototype.setCurrentBetIndex = function(t) {
this.currentBetIndex = t;
};
e.prototype.getbetData = function() {
return this.betData;
};
e.prototype.getPourStore = function(t) {
return this.pourStore[t];
};
e.prototype.getChips = function() {
return this.chip;
};
e.prototype.getStatus = function() {
return this.status;
};
e.prototype.getwinAreaIndex = function() {
return this.winAreaIndex;
};
e.prototype.getChipSprite = function(t) {
return this.chipSorite[t];
};
e.prototype.getCurrentBetSprite = function() {
return this.chipSorite[this.betData - 1];
};
e.prototype.getAreaChip = function() {
return this.areaChip;
};
e.prototype.getMyAreaChip = function() {
return this.myAreaChip;
};
e.prototype.getAreaChipIndex = function() {
return this.areaChip[this.currentBetIndex];
};
e.prototype.getMyAreaChipIndex = function() {
return this.myAreaChip[this.currentBetIndex];
};
e.prototype.getCarList = function() {
return this.cardList;
};
e.prototype.getFakerData = function() {
var t = r.gameData[this.getCurrentGame() - 1];
this.win = t.win;
this.cardList = t.cardList;
};
e.prototype.getCurrentGame = function() {
return this.currentGame;
};
e.prototype.setCurrentGame = function(t) {
this.currentGame += t;
};
e.prototype.getUserBetWinArea = function() {
return this.userBetWinArea;
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.LhdClientEvent.onProcess, this.onProcess, this);
window.Emitter.on(i.LhdClientEvent.onMyChooseChip, this.onMyChooseChip, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.LhdClientEvent.onProcess, this);
window.Emitter.off(i.LhdClientEvent.onMyChooseChip, this);
};
e.prototype.onProcess = function(t) {
this.status = t.process;
switch (this.status) {
case i.Process.waitStart:
this.initareaChip();
this.templateCoin = 0;
this.userBetWinArea = [];
this.chipsToArray = [];
break;

case i.Process.betStart:
this.getFakerData();
break;

case i.Process.onSettle:
this.getWinArea();
this.onSettle();
}
window.Emitter.emit(i.LhdLogicEvent.logicOnProcess);
};
e.prototype.onSettle = function() {
this.myChipsToArray();
var t = this.calcWinOther(), e = this.calcWin();
this.templateCoin = t + e;
this.setUserCoin(this.templateCoin);
};
e.prototype.calcWin = function() {
var t = this.getWin(), e = 0;
1 == t ? (e = 2 * this.myAreaChip[1]) > 0 && this.setUserBetWinArea("1") : 2 == t ? (e = 2 * this.myAreaChip[2]) > 0 && this.setUserBetWinArea("2") : 3 == t ? (e = 8 * this.myAreaChip[7]) > 0 && this.setUserBetWinArea("7") : console.error("caleWin err");
return e;
};
e.prototype.myChipsToArray = function() {
for (var t = Object.keys(this.myAreaChip), e = 1; e <= t.length; e++) this.myAreaChip[e] > 0 && this.chipsToArray.push({
bet: t[e - 1],
coin: this.myAreaChip[e]
});
};
e.prototype.calcWinOther = function() {
var t = this, e = this.cardList[1], o = this.getWinArea2(parseInt(e)), n = this.cardList[2], i = this.getWinArea2(parseInt(n)), r = 0;
this.chipsToArray.forEach(function(e) {
if ("3" == e.bet) {
if (o.spade || o.clubs) {
r += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else if ("4" == e.bet) {
if (o.heart || o.diamond) {
r += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else if ("5" == e.bet) {
if (o.even) {
r += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else if ("6" == e.bet) {
if (o.odd) {
r += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else console.log("not dragon");
});
var c = 0;
this.chipsToArray.forEach(function(e) {
if ("11" == e.bet) {
if (i.spade || i.clubs) {
c += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else if ("10" == e.bet) {
if (i.heart || i.diamond) {
c += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else if ("9" == e.bet) {
if (i.even) {
c += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else if ("8" == e.bet) {
if (i.odd) {
c += 2 * e.coin;
t.setUserBetWinArea(e.bet);
}
} else console.log("not tiger");
});
return r + c;
};
e.prototype.getWinAndUserBet = function() {
for (var t = {}, e = this.getWinAreaByIndex(), o = Object.keys(this.myAreaChip), n = 1; n <= o.length; n++) for (var i = 0; i < e.length; i++) this.myAreaChip[n] > 0 && n == e[i] && (t[n] = this.myAreaChip[n]);
return t;
};
e.prototype.getWinCoin = function() {
for (var t = this.getWinAreaByIndex(), e = Object.keys(this.myAreaChip), o = 0, n = 1; n <= e.length; n++) for (var i = 0; i < t.length; i++) n == t[i] && (o += this.myAreaChip[n]);
return o *= 2;
};
e.prototype.onMyChooseChip = function(t) {
this.setUserCoin(-t.chipValue);
this.areaChip[t.areaIndex] = this.areaChip[t.areaIndex] + t.chipValue;
this.myAreaChip[t.areaIndex] = this.myAreaChip[t.areaIndex] + t.chipValue;
window.Emitter.emit(i.LhdLogicEvent.logicOnPour);
};
e.prototype.getWinArea = function() {
var t = !1, e = !1, o = !1, n = !1, i = !1, r = !1, c = this.cardList[this.getWin()];
if ((c = parseInt(c)) < 14) {
o = !0;
c % 2 == 0 ? r = !0 : i = !0;
} else if (17 <= c && c <= 29) {
n = !0;
c % 2 == 0 ? r = !0 : i = !0;
} else if (33 <= c && c <= 45) {
e = !0;
c % 2 == 0 ? r = !0 : i = !0;
} else {
t = !0;
c % 2 == 0 ? r = !0 : i = !0;
}
return {
spade: t,
heart: e,
diamond: o,
clubs: n,
odd: i,
even: r
};
};
e.prototype.getWinArea2 = function(t) {
var e = !1, o = !1, n = !1, i = !1, r = !1, c = !1;
if (t < 14) {
n = !0;
t % 2 == 0 ? c = !0 : r = !0;
} else if (17 <= t && t <= 29) {
i = !0;
t % 2 == 0 ? c = !0 : r = !0;
} else if (33 <= t && t <= 45) {
o = !0;
t % 2 == 0 ? c = !0 : r = !0;
} else {
e = !0;
t % 2 == 0 ? c = !0 : r = !0;
}
return {
spade: e,
heart: o,
diamond: n,
clubs: i,
odd: r,
even: c
};
};
e.prototype.getWinAreaByIndex = function() {
var t = [], e = this.getWinArea();
if (1 == this.win) {
t.push(1);
e.odd ? t.push(6) : t.push(5);
e.diamond || e.heart ? t.push(4) : t.push(3);
} else if (2 == this.win) {
t.push(2);
e.odd ? t.push(8) : t.push(9);
e.diamond || e.heart ? t.push(10) : t.push(11);
} else {
if (3 != this.win) throw console.error("error");
t.push(7);
}
return t;
};
e.prototype.destory = function() {
this.unregisrterEvent();
};
return e;
}(n.default);
o.default = c;
cc._RF.pop();
}, {
"../../../model/Singleton": "Singleton",
"./faker_data": "faker_data",
"./lhd_config": "lhd_config"
} ],
lhd_mychips: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a36b6k3XFtFHJo/5wdGSGMa", "lhd_mychips");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./lhd_config"), i = t("./lhd_logic"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.POURINDEX = {
btnPour_1: 1,
btnPour_2: 2,
btnPour_3: 3,
btnPour_4: 4
};
return e;
}
e.prototype.onLoad = function() {
this.logic = i.default.GetInstance(i.default);
this.chipFrame.children[0].setScale(1.2);
this.regisrterEvent();
this.checkChip();
};
e.prototype.start = function() {};
e.prototype.onButtonClick = function(t) {
var e = t.target.name;
this.btnPour(e);
};
e.prototype.btnPour = function(t) {
this.logic.setDownPour(this.POURINDEX[t]);
this.setScale(t);
};
e.prototype.setScale = function(t) {
var e = this.chipFrame.children;
if (this.logic.getbetData() === this.POURINDEX[t]) {
e[this.POURINDEX[t] - 1].setScale(1.2);
}
for (var o = 0; o < e.length; o++) o !== this.POURINDEX[t] - 1 && e[o].setScale(1);
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(n.LhdLogicEvent.logicOnProcess, this.onProcess, this);
window.Emitter.on(n.LhdLogicEvent.logicOnPour, this.checkChip, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(n.LhdLogicEvent.logicOnProcess, this);
window.Emitter.off(n.LhdLogicEvent.logicOnPour, this);
};
e.prototype.onProcess = function() {
switch (this.logic.getStatus()) {
case n.Process.waitStart:
this.checkChip();
break;

case n.Process.betStart:
}
};
e.prototype.switchButtons = function() {
var t = this;
this.chipFrame.children.forEach(function(e) {
e.getComponent(cc.Button).interactable = t.logic.getStatus() == n.Process.betStart;
e.getComponent(cc.Button).enableAutoGrayEffect = t.logic.getStatus() != n.Process.betStart;
});
};
e.prototype.checkChip = function() {
var t = this.logic.getUserCoin(), e = this.chipFrame.children;
this.logic.getChips().forEach(function(o, n) {
if (t >= o) {
e[n].getComponent(cc.Button).interactable = !0;
e[n].getComponent(cc.Button).enableAutoGrayEffect = !1;
} else {
e[n].getComponent(cc.Button).interactable = !1;
e[n].getComponent(cc.Button).enableAutoGrayEffect = !0;
e[n].setScale(1);
}
});
this.chipMove();
};
e.prototype.chipMove = function() {
for (var t = this.logic.getUserCoin(), e = 4; e >= 1; e--) if (t >= this.logic.getPourStore(e) && this.logic.getbetData() >= e) {
var o = "btnPour_" + e;
this.logic.setDownPour(this.POURINDEX[o]);
this.setScale(o);
break;
}
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Node) ], e.prototype, "chipFrame", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"./lhd_config": "lhd_config",
"./lhd_logic": "lhd_logic"
} ],
lhd_result: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "40977MBcBpHDq/HfgCvAT4g", "lhd_result");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, c = t("../res/lhd_logic"), s = t("./lhd_config"), a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.panel_node = null;
e.logic = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = c.default.GetInstance(c.default);
this.regisrterEvent();
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(s.LhdAnimationEvent.showResult, this.show, this);
};
e.prototype.show = function(t) {
var e = this;
console.log("show", t);
var o = cc.delayTime(2.5), n = cc.callFunc(function() {
e.panel_node.active = !0;
console.log("action2");
}), i = cc.delayTime(3.5), r = cc.callFunc(function() {
console.log("action4");
e.panel_node.active = !1;
});
this.node.runAction(cc.sequence(o, n, i, r));
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(s.LhdAnimationEvent.showResult);
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ r(cc.Node) ], e.prototype, "panel_node", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../res/lhd_logic": "lhd_logic",
"./lhd_config": "lhd_config"
} ],
lhd_user: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "8e1feGDRpdNA5ZSlI7DP/Ej", "lhd_user");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./lhd_config"), i = t("./lhd_logic"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.user_name = null;
e.user_coin = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = i.default.GetInstance(i.default);
this.registerEvent();
this.user_coin.string = this.logic.getUserCoin().toString();
};
e.prototype.start = function() {};
e.prototype.registerEvent = function() {
window.Emitter.on(n.LhdLogicEvent.logicOnPour, this.onPour, this);
window.Emitter.on(n.LhdAnimationEvent.updateUserCoin, this.updateUserCoin, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(n.LhdLogicEvent.logicOnPour, this);
window.Emitter.off(n.LhdAnimationEvent.updateUserCoin, this);
};
e.prototype.onPour = function() {
this.user_coin.string = this.logic.getUserCoin().toString();
};
e.prototype.updateUserCoin = function() {
console.log(this.logic.templateCoin);
this.user_coin.string = this.logic.getUserCoin().toString();
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Label) ], e.prototype, "user_name", void 0);
__decorate([ s(cc.Label) ], e.prototype, "user_coin", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"./lhd_config": "lhd_config",
"./lhd_logic": "lhd_logic"
} ],
loading: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "4da82N7z3VIY6ECXc6I7W3W", "loading");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = (n.property, function(t) {
__extends(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {};
e.prototype.init = function() {
console.log("loding init");
};
e.prototype.loadingScene = function() {};
return e = __decorate([ i ], e);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {} ],
login: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c7202Nj1HNA+q7ElkwT6X5H", "login");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../globel/panel"), i = t("../../../game/lhd/res/lhd_logic"), r = t("../../../model/hb_logic"), c = cc._decorator, s = c.ccclass, a = c.property, l = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.stop = !1;
return e;
}
e.prototype.onLoad = function() {
this.progressBar.progress = 0;
n.default.preLoadPrab();
cc.director.preloadScene("lhd", function(t, e) {
i.default.GetInstance(i.default).destory();
i.default.OnDestory();
});
cc.director.preloadScene("hb", function(t, e) {
r.default.GetInstance(r.default).destory();
r.default.OnDestory();
});
};
e.prototype.start = function() {};
e.prototype.update = function(t) {
this.progressBar.progress += .005;
if (!this.stop && this.progressBar.progress >= 1) {
this.progressBar.progress = 1;
this.stop = !0;
window.GameRecord.starGame();
this.node.destroy();
}
};
__decorate([ a(cc.ProgressBar) ], e.prototype, "progressBar", void 0);
return e = __decorate([ s ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../game/lhd/res/lhd_logic": "lhd_logic",
"../../../globel/panel": "panel",
"../../../model/hb_logic": "hb_logic"
} ],
mygameitem: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "5cf52UfWMJITozTwCcJn4qD", "mygameitem");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, c = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.game_animation = null;
e.gameName = null;
return e;
}
e.prototype.onLoad = function() {};
e.prototype.start = function() {};
e.prototype.init = function(t) {
var e = t.game_path;
this.createGameItem(e);
};
e.prototype.createGameItem = function(t) {
var e = this;
cc.loader.loadRes(t, function(t, o) {
if (t) console.log(t); else {
e.gameName = o.name.split("_")[0];
var n = cc.instantiate(o);
e.game_animation.addChild(n);
}
});
};
e.prototype.buttonClick = function(t) {
cc.director.loadScene(this.gameName);
};
__decorate([ r(cc.Node) ], e.prototype, "game_animation", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
panel: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "685c5J9nllMfIo8a/53zCRP", "panel");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../globel/pulicPath"), i = function() {
function t() {}
t.showAsynPanelByName = function(e) {
var o = cc.director.getScene();
return new Promise(function(n, i) {
t.publicPanelDictic[e];
t.readPrefab(e).then(function(e) {
n(t.showChildPanel(e, o));
});
});
};
t.showTip = function(t) {
"hall" != cc.director.getScene().name && this.showAsynPanelByName(n.default.OTHER.GAME_TIP).then(function(e) {
e.getComponent("game_tip").showTip(t);
});
};
t.readPrefab = function(t) {
var e = cc.director.getScene();
e.getChildByName("loadmask") || function() {
var t = cc.size(640, 960), o = new cc.Node();
o.name = "loadmask";
o.setContentSize(t);
o.setPosition(new cc.Vec2(t.width / 2, t.height / 2));
o.addComponent(cc.Button);
e.addChild(o, 1e3);
}();
return new Promise(function(o, n) {
cc.loader.loadRes(t, cc.Prefab, function(i, r) {
e.getChildByName("loadmask") && e.getChildByName("loadmask").destroy();
if (i) {
console.error(t + ".prefab 文件读取失败");
return n(i);
}
o(r);
});
});
};
t.showChildPanel = function(t, e) {
var o = cc.instantiate(t);
o.parent = e;
return o;
};
t.preLoadPrab = function() {
var e = n.default.Prefab, o = function(o) {
t.readPrefab(e[o]).then(function(e) {
t.publicPanelDictic[o] = e;
});
};
for (var i in e) o(i);
};
t.preLoadOther = function() {
var e = n.default.OTHER, o = function(o) {
t.readPrefab(e[o]).then(function(e) {
t.publicPanelDictic[o] = e;
});
};
for (var i in e) o(i);
};
t.publicPanelDictic = {};
return t;
}();
o.default = i;
cc._RF.pop();
}, {
"../globel/pulicPath": "pulicPath"
} ],
play_seat: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "52f2dwgJFZEKYdYQIyk7fs3", "play_seat");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.itemList = [];
e.num = 0;
e.plyer = null;
e.rightLayout = null;
e.leftLayout = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.onEnter();
this.regisrterEvent();
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbClientEvent.onProcess, this.onProcess, this);
window.Emitter.on(i.HbConfig.logicOnSettle, this.onSettle, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.HbClientEvent.onProcess, this);
window.Emitter.off(i.HbConfig.logicOnSettle, this);
};
e.prototype.resetData = function() {
this.itemList.forEach(function(t, e) {
t.getComponent("player").init();
t.active = !1;
});
};
e.prototype.initPlayer = function() {
var t = this.logic.getCurrentPlayers();
this.itemList.forEach(function(e, o) {
e.getComponent("player").refresh(t[o]);
e.active = !0;
});
};
e.prototype.onProcess = function(t) {
switch (t.process) {
case i.Process.createhb:
this.initPlayer();
break;

case i.Process.waitStart:
this.resetData();
break;

case i.Process.openGrab:
this.logic.playerPosttion = this.setScroePostion();
}
};
e.prototype.onEnter = function() {
this.logic.roomType;
this.num = Math.ceil(this.logic.roomType / 2);
for (var t = 0; t < this.logic.roomType; t++) {
var e = cc.instantiate(this.plyer);
e.parent = t < this.num ? this.rightLayout : this.leftLayout;
this.itemList.push(e);
e.active = !1;
}
};
e.prototype.onSettle = function() {
var t = this;
console.log("players result", this.logic.result);
this.itemList.forEach(function(e, o) {
var n = t.logic.result[o];
e.getComponent("player").setScore(n);
});
};
e.prototype.setScroePostion = function() {
var t = this.logic.getCurrentPlayers();
return this.itemList.map(function(e, o) {
return {
pos: e.position,
uid: t[o].uid
};
});
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Prefab) ], e.prototype, "plyer", void 0);
__decorate([ s(cc.Node) ], e.prototype, "rightLayout", void 0);
__decorate([ s(cc.Node) ], e.prototype, "leftLayout", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
player_score: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1a5e7v9aFZBLqjxoW/7IHBY", "player_score");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.num = 0;
e.rightLayout = null;
e.leftLayout = null;
e.score = null;
e.fontList = [];
e.scoreList = [];
e.myScorePos = [ {
x: 0,
y: 205
}, {
x: 0,
y: 15
}, {
x: 0,
y: -135
}, {
x: 0,
y: -315
}, {
x: 40,
y: 120
}, {
x: 40,
y: -80
}, {
x: 40,
y: -230
} ];
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.onEnter();
this.regisrterEvent();
};
e.prototype.start = function() {};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbClientEvent.onProcess, this.onProcess, this);
window.Emitter.on(i.HbConfig.logicOnSettle, this.onSettle, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.HbClientEvent.onProcess, this);
window.Emitter.off(i.HbConfig.logicOnSettle, this);
};
e.prototype.onProcess = function(t) {
switch (t.process) {
case i.Process.createhb:
break;

case i.Process.waitStart:
this.resetData();
break;

case i.Process.openGrab:
this.getScorePostion();
}
};
e.prototype.onSettle = function() {
for (var t = this.logic.result, e = 0; e < this.scoreList.length; e++) if (this.logic.isBoomNumber(t[e].hbmoney)) {
this.scoreList[e].getComponent(cc.Label).string = "-" + 1.5 * this.logic.boomMoney;
this.scoreList[e].getComponent(cc.Label).font = this.fontList[1];
} else if (t[e].banker) ; else {
this.scoreList[e].getComponent(cc.Label).string = "+" + t[e].hbmoney;
this.scoreList[e].getComponent(cc.Label).font = this.fontList[0];
this.scoreList[e].active = !0;
}
};
e.prototype.resetData = function() {
for (var t = 0; t < this.scoreList.length; t++) this.scoreList[t].getComponent(cc.Label).string = "";
};
e.prototype.onEnter = function() {
this.logic.roomType;
this.num = Math.ceil(this.logic.roomType / 2);
for (var t = 0; t < this.logic.roomType; t++) {
var e = cc.instantiate(this.score);
e.parent = t < this.num ? this.rightLayout : this.leftLayout;
e.position = cc.v2(this.myScorePos[t].x, this.myScorePos[t].y);
e.active = !1;
this.scoreList.push(e);
}
};
e.prototype.getScorePostion = function() {};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Node) ], e.prototype, "rightLayout", void 0);
__decorate([ s(cc.Node) ], e.prototype, "leftLayout", void 0);
__decorate([ s(cc.Prefab) ], e.prototype, "score", void 0);
__decorate([ s([ cc.Font ]) ], e.prototype, "fontList", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
player: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2d5c7QKxoNCV64/jg5JI0cn", "player");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.nick_name = null;
e.money = null;
e.settle_coin = null;
e.head_sprite = null;
e.banker = null;
e.logic = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.regisrterEvent();
};
e.prototype.start = function() {};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbClientEvent.onProcess, this.onProcess, this);
window.Emitter.on(i.HbConfig.logicOnSettle, this.onSettle, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.HbClientEvent.onProcess, this);
window.Emitter.off(i.HbConfig.logicOnSettle, this);
};
e.prototype.refresh = function(t) {
t || console.log("error");
this.uid = t.uid;
this.nick_name.string = t.name;
this.money.string = t.money.toString();
this.settle_coin.getComponent(cc.Label).string = "";
this.banker.active = !1;
};
e.prototype.showBoom = function(t) {
this.boom.active = t;
};
e.prototype.init = function() {
this.boom.active = !1;
this.nick_name.string = "";
this.money.string = "";
this.uid = null;
this.settle_coin.getComponent(cc.Label).string = "";
this.banker.active = !1;
};
e.prototype.setScore = function() {
var t = this, e = this.logic.result.find(function(e) {
return e.uid == t.uid;
});
if (e) if (e.uid == this.uid) {
this.settle_coin.active = !0;
var o = this.node.getChildByName("settle_coin");
if (this.logic.isBoomNumber(e.hbmoney)) {
o.color = cc.Color.RED;
this.settle_coin.getComponent(cc.Label).string = e.hbmoney.toString();
this.boom.active = !0;
} else if (this.logic.getCurrentBankerUid() == e.uid) {
o.color = cc.Color.WHITE;
this.banker.active = !0;
this.settle_coin.getComponent(cc.Label).string = "當前莊家";
} else {
o.color = cc.Color.YELLOW;
this.settle_coin.getComponent(cc.Label).string = e.hbmoney.toString();
}
this.money.string = e.money.toString();
} else console.log("not set score", e, "??", this.uid);
};
e.prototype.onProcess = function(t) {
switch (t.process) {
case i.Process.createhb:
case i.Process.waitStart:
case i.Process.openGrab:
}
};
e.prototype.onSettle = function() {};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Label) ], e.prototype, "nick_name", void 0);
__decorate([ s(cc.Label) ], e.prototype, "money", void 0);
__decorate([ s(cc.Label) ], e.prototype, "settle_coin", void 0);
__decorate([ s(cc.Sprite) ], e.prototype, "head_sprite", void 0);
__decorate([ s(cc.Node) ], e.prototype, "boom", void 0);
__decorate([ s(cc.Node) ], e.prototype, "banker", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
pulicPath: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "69442dLxSpFIIPdZ4wvDgm0", "pulicPath");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = {
Prefab: {
HB_DEALER: "prefab/hb_dealerlist",
HB_UP_BANKER: "prefab/hb_up_banker"
},
OTHER: {
GAME_TIP: "common/game_tip"
}
};
cc._RF.pop();
}, {} ],
room: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b9aa7SIwzxBPp27K6bfPZSZ", "room");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(t) {
__extends(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e;
}(t("../model/Singleton").default);
o.default = n;
cc._RF.pop();
}, {
"../model/Singleton": "Singleton"
} ],
scene: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "964f4eR4QBJ4bqnpV7HaG7O", "scene");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = (n.property, function(t) {
__extends(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {};
e.prototype.start = function() {};
e.prototype.enterNextScene = function() {
return new Promise(function(t, e) {});
};
return e = __decorate([ i ], e);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {} ],
showBankerList: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2964c0ckkhF0qmOmh3wDnRT", "showBankerList");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../model/hb_logic"), i = t("./hb_config"), r = cc._decorator, c = r.ccclass, s = r.property, a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.logic = null;
e.bankerPool = null;
e.poolMax = 5;
e.item = null;
e.content = null;
return e;
}
e.prototype.onLoad = function() {
this.logic = n.default.GetInstance(n.default);
this.initPool();
this.regisrterEvent();
this.onConfirmGrab();
};
e.prototype.start = function() {};
e.prototype.close = function() {
this.unregisrterEvent();
this.node.destroy();
};
e.prototype.initPool = function() {
this.bankerPool = new cc.NodePool();
for (var t = 0; t < this.poolMax; t++) {
var e = cc.instantiate(this.item);
this.bankerPool.put(e);
}
};
e.prototype.addBanker = function() {};
e.prototype.addItems = function(t) {
for (var e = t.length, o = 0; o < e; o++) {
var n = t[o], i = this.getItem();
i.getChildByName("nickname").getComponent(cc.Label).string = n.name;
i.getChildByName("money").getComponent(cc.Label).string = n.money.toString();
}
};
e.prototype.getItem = function() {
var t = null;
(t = this.bankerPool.size() > 0 ? this.bankerPool.get() : cc.instantiate(this.item)).parent = this.content;
return t;
};
e.prototype.regisrterEvent = function() {
window.Emitter.on(i.HbConfig.logiconConfirmGrab, this.onConfirmGrab, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(i.HbConfig.logiconConfirmGrab);
};
e.prototype.removeItems = function() {
for (;this.content && this.content.childrenCount > 0; ) this.bankerPool.put(this.content.children[0]);
};
e.prototype.onConfirmGrab = function() {
this.removeItems();
var t = this.logic.getBankerList();
t.length > 0 ? this.addItems(t) : console.log("error");
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ s(cc.Node) ], e.prototype, "item", void 0);
__decorate([ s(cc.Node) ], e.prototype, "content", void 0);
return e = __decorate([ c ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../model/hb_logic": "hb_logic",
"./hb_config": "hb_config"
} ],
smallHb: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "03fc5vZbuhJTZqp9qMdURn7", "smallHb");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../res/hb_config"), i = cc._decorator, r = i.ccclass, c = i.property, s = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.hb = null;
return e;
}
e.prototype.start = function() {};
e.prototype.onLoad = function() {
this.hb.active = !1;
this.regisrterEvent();
};
e.prototype.update = function(t) {};
e.prototype.regisrterEvent = function() {
window.Emitter.on(n.HbConfig.logicOnCreateHb, this.creathb, this);
window.Emitter.on(n.HbClientEvent.onProcess, this.onProcess, this);
};
e.prototype.unregisrterEvent = function() {
window.Emitter.off(n.HbConfig.logicOnCreateHb, this);
window.Emitter.off(n.HbClientEvent.onProcess, this);
};
e.prototype.creathb = function() {};
e.prototype.playAction = function() {
var t = cc.moveTo(.3, cc.v2(0, -10)).easing(cc.easeOut(2)), e = cc.scaleTo(.1, 1.4);
this.hb.runAction(cc.sequence(t, e));
};
e.prototype.onProcess = function(t) {
var e = this;
if (t.process == n.Process.waitStart) {
this.hb.setPosition(0, 300);
this.hb.setScale(1, 1);
this.hb.active = !0;
this.playAction();
} else if (t.process == n.Process.openGrab) {
var o = cc.rotateTo(.05, 10), i = cc.rotateTo(.05, -10), r = cc.rotateTo(.05, 0), c = cc.callFunc(function() {
e.hb.active = !1;
});
this.hb.runAction(cc.sequence(o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, o, i, r, c));
}
};
e.prototype.onDestroy = function() {
this.unregisrterEvent();
};
__decorate([ c(cc.Node) ], e.prototype, "hb", void 0);
return e = __decorate([ r ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {
"../res/hb_config": "hb_config"
} ]
}, {}, [ "Imodel", "Iplayer", "chip_actions", "game_tip", "mygameitem", "Game", "declarer", "hb_config", "hb_dealerlist", "hb_self_seat", "hb_tip", "play_seat", "player", "player_score", "showBankerList", "smallHb", "faker_data", "lhd_action", "lhd_bottom_pour", "lhd_clock", "lhd_config", "lhd_effect_ctrl", "lhd_game", "lhd_logic", "lhd_mychips", "lhd_result", "lhd_user", "GameRecord", "IBaseGameObject", "center", "globel", "hall", "loading", "panel", "pulicPath", "room", "scene", "emitter", "login", "Singleton", "hb_logic" ]);