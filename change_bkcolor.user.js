// ==UserScript==
// @name        change_bkcolor
// @namespace   https://github.com/pkhopper/gmScripts/raw/master/change_bkcolor.user.js
// @description 快捷键:F10，弹出小窗口，拖拽窗口，通过窗口位置改变背景颜色 ＝＝
// @include     *
// @version     0.1.1
// @grant       none
// ==/UserScript==


function init_drag_obj(float_div_id) {
  // init drag class
  function Hex(i) {
      if (i < 0) return "00";
      else if (i > 255) return "ff";
      else { var str = "0" + i.toString(16); return str.substring(str.length - 2); }
  }

  var Class = {
    create: function() {
      return function() { this.initialize.apply(this, arguments); }
    }
  }

  var Extend = function(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }
  }

  var Bind = function(object, fun) {
    return function() {
      return fun.apply(object, arguments);
    }
  }

  var BindAsEventListener = function(object, fun) {
    return function(event) {
      return fun.call(object, (event || window.event));
    }
  }

  function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
      oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
      oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
      oTarget["on" + sEventType] = fnHandler;
    }
  };

  function removeEventHandler(oTarget, sEventType, fnHandler) {
      if (oTarget.removeEventListener) {
          oTarget.removeEventListener(sEventType, fnHandler, false);
      } else if (oTarget.detachEvent) {
          oTarget.detachEvent("on" + sEventType, fnHandler);
      } else { 
          oTarget["on" + sEventType] = null;
      }
  };

  // drag object
  var SimpleDrag = Class.create();
  SimpleDrag.prototype = {
    //拖放对象,触发对象
    initialize: function(float_obj, on_mouse_move_callback) {
        this.OnMouseMove = on_mouse_move_callback;
        this.dragElement = float_obj;
        this._x = this._y = 0;
        this._fM = BindAsEventListener(this, this.Move);
        this._fS = Bind(this, this.Stop);
        addEventHandler(float_obj, "mousedown", BindAsEventListener(this, this.Start));
    },
    // 准备拖动
    Start: function(oEvent) {
        this._x = oEvent.clientX - this.dragElement.offsetLeft;
        this._y = oEvent.clientY - this.dragElement.offsetTop;
        addEventHandler(document, "mousemove", this._fM);
        addEventHandler(document, "mouseup", this._fS);
    },
    // 拖动
    Move: function(oEvent) {
        this.dragElement.style.left = oEvent.clientX - this._x + "px";
        this.dragElement.style.top = oEvent.clientY - this._y + "px";
        if (this.OnMouseMove) {
          this.OnMouseMove(oEvent);
        };
    },
    // 停止拖动
    Stop: function() {
        removeEventHandler(document, "mousemove", this._fM);
        removeEventHandler(document, "mouseup", this._fS);
    }
  };
  // create float div
  var float_div = document.createElement('div');
  float_div.id = float_div_id;
  document.body.appendChild(float_div);
  // document.head.appendChild(float_div);
  float_div.setAttribute(
    'style', 
    'width:50px;height:20px;'
    +'top:100;left:100;'
    // +'overflow:hidden'
    // +'margin:auto;'
    +'position:fixed;'
    +'z-index:9999;'
    +'color:black;'
    +'background:#FF0000;'
    // +'border: 1px solid black;'
    +'text-align:center;'
    +'vertical-align:middle;'
    +'font-size:10pt;'
    +'cursor:crosshair;'
  );
  float_div.innerHTML = document.body.style.background;
  drag = new SimpleDrag(
      float_div,
      function (event) {
        var nx = event.clientX;
        var ny = event.clientY;
        var bk = "#".concat(Hex(nx), Hex(ny), 98);
        document.body.style.background = bk;
        document.getElementById(float_div_id).innerHTML = bk;
      }
  );
  // position: static|absolute|fixed|relative|initial|inherit;
  drag.dragElement.style.position = "absolute";
  drag.dragElement.style.overflow = "hidden";
}

function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
      oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
      oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
      oTarget["on" + sEventType] = fnHandler;
    }
};

addEventHandler(
    document,
    "keydown",
    function (event) {
      if (event.keyCode == 121) { // 121 = F10
        var vavava = document.getElementById('vavava');
        console.log(vavava);
        if (vavava == null) {
          init_drag_obj('vavava');
        }else{
          if (vavava.style.visibility && vavava.style.visibility == 'visible') {
            vavava.style.visibility = 'hidden';
          } else{
            vavava.style.visibility = 'visible';
          };
        };
      };
    },
    false
);