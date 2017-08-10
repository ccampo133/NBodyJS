if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'nbody'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'nbody'.");
}
var nbody = function (_, Kotlin) {
  'use strict';
  var toSet = Kotlin.kotlin.collections.toSet_7wnvza$;
  var trimMargin = Kotlin.kotlin.text.trimMargin_rjktp$;
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  var minus = Kotlin.kotlin.collections.minus_xfiyik$;
  var minus_0 = Kotlin.kotlin.collections.minus_khz7k3$;
  var plus = Kotlin.kotlin.collections.plus_mydzjv$;
  var takeLast = Kotlin.kotlin.collections.takeLast_yzln2o$;
  var plus_0 = Kotlin.kotlin.collections.plus_qloxvw$;
  var emptySet = Kotlin.kotlin.collections.emptySet_287e2$;
  var plus_1 = Kotlin.kotlin.collections.plus_xfiyik$;
  var Pair = Kotlin.kotlin.Pair;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var drop = Kotlin.kotlin.collections.drop_ba2ldo$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var setOf = Kotlin.kotlin.collections.setOf_i5x0yv$;
  function MainController(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.tempBody_0 = Body$Companion_getInstance().empty;
    this.mouseDown_0 = false;
    this.paused_0 = false;
    this.debug_0 = false;
    this.trails_lnhoxq$_0 = false;
  }
  Object.defineProperty(MainController.prototype, 'trails_0', {
    get: function () {
      return this.trails_lnhoxq$_0;
    },
    set: function (value) {
      this.trails_lnhoxq$_0 = value;
      this.context.clearPositionHistory();
    }
  });
  MainController.prototype.run = function () {
    var tmp$;
    if (!this.paused_0) {
      draw(this.canvas, this.context.bodies, this.trails_0, toSet(this.context.removedBodies));
      if (this.mouseDown_0 && !((tmp$ = this.tempBody_0) != null ? tmp$.equals(Body$Companion_getInstance().empty) : null))
        drawBody(this.canvas, this.tempBody_0);
      if (this.debug_0)
        this.drawDebugInfo();
      this.context.run();
    }
  };
  MainController.prototype.keyDownListener_kc24xn$ = function (event) {
    var tmp$;
    if (event.defaultPrevented)
      return;
    tmp$ = event.key;
    if (Kotlin.equals(tmp$, 't'))
      this.trails_0 = !this.trails_0;
    else if (Kotlin.equals(tmp$, 'p'))
      this.paused_0 = !this.paused_0;
    else if (Kotlin.equals(tmp$, 'r'))
      this.context.reset();
    else if (Kotlin.equals(tmp$, 'c'))
      this.context.clear();
    else if (Kotlin.equals(tmp$, 'd'))
      this.debug_0 = !this.debug_0;
    else if (Kotlin.equals(tmp$, 'ArrowUp')) {
      var tmp$_0 = this.mouseWheelHandler_itjbex$;
      var deltaX = void 0;
      var deltaY = -1.0;
      var deltaZ;
      var deltaMode;
      var screenX;
      var screenY;
      var clientX;
      var clientY;
      var button;
      var buttons;
      var relatedTarget;
      var ctrlKey;
      var shiftKey;
      var altKey;
      var metaKey;
      var modifierAltGraph;
      var modifierCapsLock;
      var modifierFn;
      var modifierFnLock;
      var modifierHyper;
      var modifierNumLock;
      var modifierScrollLock;
      var modifierSuper;
      var modifierSymbol;
      var modifierSymbolLock;
      var view;
      var detail;
      var bubbles;
      var cancelable;
      var composed;
      if (deltaX === void 0) {
        deltaX = 0;
      }
      if (deltaY === void 0) {
        deltaY = 0;
      }
      if (deltaZ === void 0) {
        deltaZ = 0;
      }
      if (deltaMode === void 0) {
        deltaMode = 0;
      }
      if (screenX === void 0) {
        screenX = 0;
      }
      if (screenY === void 0) {
        screenY = 0;
      }
      if (clientX === void 0) {
        clientX = 0;
      }
      if (clientY === void 0) {
        clientY = 0;
      }
      if (button === void 0) {
        button = 0;
      }
      if (buttons === void 0) {
        buttons = 0;
      }
      if (relatedTarget === void 0) {
        relatedTarget = null;
      }
      if (ctrlKey === void 0) {
        ctrlKey = false;
      }
      if (shiftKey === void 0) {
        shiftKey = false;
      }
      if (altKey === void 0) {
        altKey = false;
      }
      if (metaKey === void 0) {
        metaKey = false;
      }
      if (modifierAltGraph === void 0) {
        modifierAltGraph = false;
      }
      if (modifierCapsLock === void 0) {
        modifierCapsLock = false;
      }
      if (modifierFn === void 0) {
        modifierFn = false;
      }
      if (modifierFnLock === void 0) {
        modifierFnLock = false;
      }
      if (modifierHyper === void 0) {
        modifierHyper = false;
      }
      if (modifierNumLock === void 0) {
        modifierNumLock = false;
      }
      if (modifierScrollLock === void 0) {
        modifierScrollLock = false;
      }
      if (modifierSuper === void 0) {
        modifierSuper = false;
      }
      if (modifierSymbol === void 0) {
        modifierSymbol = false;
      }
      if (modifierSymbolLock === void 0) {
        modifierSymbolLock = false;
      }
      if (view === void 0) {
        view = null;
      }
      if (detail === void 0) {
        detail = 0;
      }
      if (bubbles === void 0) {
        bubbles = false;
      }
      if (cancelable === void 0) {
        cancelable = false;
      }
      if (composed === void 0) {
        composed = false;
      }
      var o = {};
      o['deltaX'] = deltaX;
      o['deltaY'] = deltaY;
      o['deltaZ'] = deltaZ;
      o['deltaMode'] = deltaMode;
      o['screenX'] = screenX;
      o['screenY'] = screenY;
      o['clientX'] = clientX;
      o['clientY'] = clientY;
      o['button'] = button;
      o['buttons'] = buttons;
      o['relatedTarget'] = relatedTarget;
      o['ctrlKey'] = ctrlKey;
      o['shiftKey'] = shiftKey;
      o['altKey'] = altKey;
      o['metaKey'] = metaKey;
      o['modifierAltGraph'] = modifierAltGraph;
      o['modifierCapsLock'] = modifierCapsLock;
      o['modifierFn'] = modifierFn;
      o['modifierFnLock'] = modifierFnLock;
      o['modifierHyper'] = modifierHyper;
      o['modifierNumLock'] = modifierNumLock;
      o['modifierScrollLock'] = modifierScrollLock;
      o['modifierSuper'] = modifierSuper;
      o['modifierSymbol'] = modifierSymbol;
      o['modifierSymbolLock'] = modifierSymbolLock;
      o['view'] = view;
      o['detail'] = detail;
      o['bubbles'] = bubbles;
      o['cancelable'] = cancelable;
      o['composed'] = composed;
      tmp$_0.call(this, new WheelEvent('wheel', o));
    }
     else if (Kotlin.equals(tmp$, 'ArrowDown')) {
      var tmp$_1 = this.mouseWheelHandler_itjbex$;
      var deltaX_0 = void 0;
      var deltaY_0 = 1.0;
      var deltaZ_0;
      var deltaMode_0;
      var screenX_0;
      var screenY_0;
      var clientX_0;
      var clientY_0;
      var button_0;
      var buttons_0;
      var relatedTarget_0;
      var ctrlKey_0;
      var shiftKey_0;
      var altKey_0;
      var metaKey_0;
      var modifierAltGraph_0;
      var modifierCapsLock_0;
      var modifierFn_0;
      var modifierFnLock_0;
      var modifierHyper_0;
      var modifierNumLock_0;
      var modifierScrollLock_0;
      var modifierSuper_0;
      var modifierSymbol_0;
      var modifierSymbolLock_0;
      var view_0;
      var detail_0;
      var bubbles_0;
      var cancelable_0;
      var composed_0;
      if (deltaX_0 === void 0) {
        deltaX_0 = 0;
      }
      if (deltaY_0 === void 0) {
        deltaY_0 = 0;
      }
      if (deltaZ_0 === void 0) {
        deltaZ_0 = 0;
      }
      if (deltaMode_0 === void 0) {
        deltaMode_0 = 0;
      }
      if (screenX_0 === void 0) {
        screenX_0 = 0;
      }
      if (screenY_0 === void 0) {
        screenY_0 = 0;
      }
      if (clientX_0 === void 0) {
        clientX_0 = 0;
      }
      if (clientY_0 === void 0) {
        clientY_0 = 0;
      }
      if (button_0 === void 0) {
        button_0 = 0;
      }
      if (buttons_0 === void 0) {
        buttons_0 = 0;
      }
      if (relatedTarget_0 === void 0) {
        relatedTarget_0 = null;
      }
      if (ctrlKey_0 === void 0) {
        ctrlKey_0 = false;
      }
      if (shiftKey_0 === void 0) {
        shiftKey_0 = false;
      }
      if (altKey_0 === void 0) {
        altKey_0 = false;
      }
      if (metaKey_0 === void 0) {
        metaKey_0 = false;
      }
      if (modifierAltGraph_0 === void 0) {
        modifierAltGraph_0 = false;
      }
      if (modifierCapsLock_0 === void 0) {
        modifierCapsLock_0 = false;
      }
      if (modifierFn_0 === void 0) {
        modifierFn_0 = false;
      }
      if (modifierFnLock_0 === void 0) {
        modifierFnLock_0 = false;
      }
      if (modifierHyper_0 === void 0) {
        modifierHyper_0 = false;
      }
      if (modifierNumLock_0 === void 0) {
        modifierNumLock_0 = false;
      }
      if (modifierScrollLock_0 === void 0) {
        modifierScrollLock_0 = false;
      }
      if (modifierSuper_0 === void 0) {
        modifierSuper_0 = false;
      }
      if (modifierSymbol_0 === void 0) {
        modifierSymbol_0 = false;
      }
      if (modifierSymbolLock_0 === void 0) {
        modifierSymbolLock_0 = false;
      }
      if (view_0 === void 0) {
        view_0 = null;
      }
      if (detail_0 === void 0) {
        detail_0 = 0;
      }
      if (bubbles_0 === void 0) {
        bubbles_0 = false;
      }
      if (cancelable_0 === void 0) {
        cancelable_0 = false;
      }
      if (composed_0 === void 0) {
        composed_0 = false;
      }
      var o_0 = {};
      o_0['deltaX'] = deltaX_0;
      o_0['deltaY'] = deltaY_0;
      o_0['deltaZ'] = deltaZ_0;
      o_0['deltaMode'] = deltaMode_0;
      o_0['screenX'] = screenX_0;
      o_0['screenY'] = screenY_0;
      o_0['clientX'] = clientX_0;
      o_0['clientY'] = clientY_0;
      o_0['button'] = button_0;
      o_0['buttons'] = buttons_0;
      o_0['relatedTarget'] = relatedTarget_0;
      o_0['ctrlKey'] = ctrlKey_0;
      o_0['shiftKey'] = shiftKey_0;
      o_0['altKey'] = altKey_0;
      o_0['metaKey'] = metaKey_0;
      o_0['modifierAltGraph'] = modifierAltGraph_0;
      o_0['modifierCapsLock'] = modifierCapsLock_0;
      o_0['modifierFn'] = modifierFn_0;
      o_0['modifierFnLock'] = modifierFnLock_0;
      o_0['modifierHyper'] = modifierHyper_0;
      o_0['modifierNumLock'] = modifierNumLock_0;
      o_0['modifierScrollLock'] = modifierScrollLock_0;
      o_0['modifierSuper'] = modifierSuper_0;
      o_0['modifierSymbol'] = modifierSymbol_0;
      o_0['modifierSymbolLock'] = modifierSymbolLock_0;
      o_0['view'] = view_0;
      o_0['detail'] = detail_0;
      o_0['bubbles'] = bubbles_0;
      o_0['cancelable'] = cancelable_0;
      o_0['composed'] = composed_0;
      tmp$_1.call(this, new WheelEvent('wheel', o_0));
    }
  };
  MainController.prototype.mouseWheelHandler_itjbex$ = function (event) {
    var tmp$;
    if (event.defaultPrevented || !this.mouseDown_0)
      return;
    if (event.deltaY < 0) {
      tmp$ = this.tempBody_0.m <= 0 ? 10.0 : Math.min(this.tempBody_0.m * 10, 100001.0);
    }
     else if (this.tempBody_0.m >= 100001.0)
      tmp$ = 100000.0;
    else if (this.tempBody_0.m > 10)
      tmp$ = this.tempBody_0.m / 10;
    else
      tmp$ = 0.0;
    var mass = tmp$;
    this.tempBody_0 = this.tempBody_0.copy_mfpiic$(mass, massToRadius(mass));
  };
  MainController.prototype.mouseDownListener_tfvzir$ = function (event) {
    if (this.paused_0 || event.defaultPrevented)
      return;
    this.mouseDown_0 = true;
    var bRect = this.canvas.getBoundingClientRect();
    var mouseX = (event.clientX - bRect.left) * (this.canvas.width / bRect.width) - (this.canvas.width / 2 | 0);
    var mouseY = (this.canvas.height / 2 | 0) - (event.clientY - bRect.top) * (this.canvas.height / bRect.height);
    var mass = this.tempBody_0.m;
    var radius = massToRadius(mass);
    this.tempBody_0 = new Body(mass, radius, new Vector(mouseX, mouseY), Vector$Companion_getInstance().zero);
    drawBody(this.canvas, this.tempBody_0);
  };
  MainController.prototype.mouseUpListener_tfvzir$ = function (event) {
    if (this.paused_0 || event.defaultPrevented)
      return;
    this.mouseDown_0 = false;
    var bRect = this.canvas.getBoundingClientRect();
    var mouseX = (event.clientX - bRect.left) * (this.canvas.width / bRect.width) - (this.canvas.width / 2 | 0);
    var mouseY = (this.canvas.height / 2 | 0) - (event.clientY - bRect.top) * (this.canvas.height / bRect.height);
    var velocity = (new Vector(mouseX, mouseY)).minus_7q8zhp$(this.tempBody_0.x);
    this.tempBody_0 = this.tempBody_0.copy_mfpiic$(void 0, void 0, void 0, velocity);
    this.context.addBody_ns60mq$(this.tempBody_0);
  };
  MainController.prototype.drawDebugInfo = function () {
    var debugInfo = trimMargin('\n' + '            |mouseDown = ' + this.mouseDown_0 + '\n' + '            |trails = ' + this.trails_0 + ' (' + this.context.nPos + ' points)' + '\n' + '            |num bodies = ' + this.context.bodies.size + '\n' + '            |tempBody = ' + this.tempBody_0 + '\n' + '            ');
    drawText(this.canvas, debugInfo, 5.0, 10.0);
  };
  MainController.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'MainController',
    interfaces: []
  };
  function Body(m, r, x, v, positions) {
    Body$Companion_getInstance();
    if (positions === void 0)
      positions = emptyList();
    this.m = m;
    this.r = r;
    this.x = x;
    this.v = v;
    this.positions = positions;
  }
  Body.prototype.isCollision_ns60mq$ = function (other) {
    return this.x.minus_7q8zhp$(other.x).len < other.r && this.m <= other.m;
  };
  function Body$Companion() {
    Body$Companion_instance = this;
    this.empty = new Body(0.0, 0.0, Vector$Companion_getInstance().zero, Vector$Companion_getInstance().zero);
  }
  Body$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Body$Companion_instance = null;
  function Body$Companion_getInstance() {
    if (Body$Companion_instance === null) {
      new Body$Companion();
    }
    return Body$Companion_instance;
  }
  Body.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Body',
    interfaces: []
  };
  Body.prototype.component1 = function () {
    return this.m;
  };
  Body.prototype.component2 = function () {
    return this.r;
  };
  Body.prototype.component3 = function () {
    return this.x;
  };
  Body.prototype.component4 = function () {
    return this.v;
  };
  Body.prototype.component5 = function () {
    return this.positions;
  };
  Body.prototype.copy_mfpiic$ = function (m, r, x, v, positions) {
    return new Body(m === void 0 ? this.m : m, r === void 0 ? this.r : r, x === void 0 ? this.x : x, v === void 0 ? this.v : v, positions === void 0 ? this.positions : positions);
  };
  Body.prototype.toString = function () {
    return 'Body(m=' + Kotlin.toString(this.m) + (', r=' + Kotlin.toString(this.r)) + (', x=' + Kotlin.toString(this.x)) + (', v=' + Kotlin.toString(this.v)) + (', positions=' + Kotlin.toString(this.positions)) + ')';
  };
  Body.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.m) | 0;
    result = result * 31 + Kotlin.hashCode(this.r) | 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.v) | 0;
    result = result * 31 + Kotlin.hashCode(this.positions) | 0;
    return result;
  };
  Body.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.m, other.m) && Kotlin.equals(this.r, other.r) && Kotlin.equals(this.x, other.x) && Kotlin.equals(this.v, other.v) && Kotlin.equals(this.positions, other.positions)))));
  };
  function SimulationContext(dt, initBodies, width, height, nPos, nOld) {
    if (initBodies === void 0)
      initBodies = emptySet();
    if (width === void 0)
      width = 100;
    if (height === void 0)
      height = 100;
    if (nPos === void 0)
      nPos = 0;
    if (nOld === void 0)
      nOld = 0;
    this.dt = dt;
    this.initBodies = initBodies;
    this.width = width;
    this.height = height;
    this.nPos = nPos;
    this.nOld = nOld;
    this.bodies_axf1k2$_0 = this.initBodies;
    this.removedBodies_axf1k2$_0 = Kotlin.kotlin.collections.emptyList_287e2$();
  }
  Object.defineProperty(SimulationContext.prototype, 'bodies', {
    get: function () {
      return this.bodies_axf1k2$_0;
    },
    set: function (bodies) {
      this.bodies_axf1k2$_0 = bodies;
    }
  });
  Object.defineProperty(SimulationContext.prototype, 'removedBodies', {
    get: function () {
      return this.removedBodies_axf1k2$_0;
    },
    set: function (removedBodies) {
      this.removedBodies_axf1k2$_0 = removedBodies;
    }
  });
  function SimulationContext$run$lambda$lambda(this$SimulationContext, closure$it) {
    return function (pos) {
      return gravityAcceleration(pos, minus(this$SimulationContext.bodies, closure$it));
    };
  }
  SimulationContext.prototype.run = function () {
    var $receiver = this.bodies;
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0 = isWayOutOfBounds(element.x.x, element.x.y, this.width, this.height);
      if (!tmp$_0) {
        var $receiver_0 = minus(this.bodies, element);
        var any$result;
        any$break: do {
          var tmp$_1;
          tmp$_1 = $receiver_0.iterator();
          while (tmp$_1.hasNext()) {
            var element_0 = tmp$_1.next();
            if (element.isCollision_ns60mq$(element_0)) {
              any$result = true;
              break any$break;
            }
          }
          any$result = false;
        }
         while (false);
        tmp$_0 = any$result;
      }
      if (tmp$_0) {
        destination.add_11rb$(element);
      }
    }
    var bodiesToRemove = destination;
    this.bodies = minus_0(this.bodies, bodiesToRemove);
    this.removedBodies = takeLast(plus(this.removedBodies, bodiesToRemove), this.nOld);
    var $receiver_1 = this.bodies;
    var destination_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_1, 10));
    var tmp$_2;
    tmp$_2 = $receiver_1.iterator();
    while (tmp$_2.hasNext()) {
      var item = tmp$_2.next();
      var tmp$_3 = destination_0.add_11rb$;
      var tmp$_4 = verlet(item.x, item.v, this.dt, SimulationContext$run$lambda$lambda(this, item));
      var x = tmp$_4.component1()
      , v = tmp$_4.component2();
      tmp$_3.call(destination_0, new Body(item.m, item.r, x, v, takeLast(plus_0(item.positions, x), this.nPos)));
    }
    this.bodies = toSet(destination_0);
  };
  SimulationContext.prototype.clear = function () {
    this.removedBodies = Kotlin.kotlin.collections.emptyList_287e2$();
    this.bodies = emptySet();
  };
  SimulationContext.prototype.reset = function () {
    this.removedBodies = Kotlin.kotlin.collections.emptyList_287e2$();
    this.bodies = this.initBodies;
  };
  SimulationContext.prototype.clearPositionHistory = function () {
    var $receiver = this.bodies;
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.copy_mfpiic$(void 0, void 0, void 0, void 0, emptyList()));
    }
    this.bodies = toSet(destination);
  };
  SimulationContext.prototype.addBody_ns60mq$ = function (body) {
    this.bodies = plus_1(this.bodies, body);
  };
  SimulationContext.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'SimulationContext',
    interfaces: []
  };
  function Vector(x, y) {
    Vector$Companion_getInstance();
    this.x = x;
    this.y = y;
    this.len = Math.sqrt(this.dot_7q8zhp$(this));
  }
  Vector.prototype.plus_7q8zhp$ = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };
  Vector.prototype.minus_7q8zhp$ = function (other) {
    return new Vector(this.x - other.x, this.y - other.y);
  };
  Vector.prototype.times_14dthe$ = function (scalar) {
    return new Vector(scalar * this.x, scalar * this.y);
  };
  Vector.prototype.div_14dthe$ = function (scalar) {
    return new Vector(this.x / scalar, this.y / scalar);
  };
  Vector.prototype.dot_7q8zhp$ = function (other) {
    return this.x * other.x + this.y * other.y;
  };
  function Vector$Companion() {
    Vector$Companion_instance = this;
    this.zero = new Vector(0.0, 0.0);
  }
  Vector$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector$Companion_instance = null;
  function Vector$Companion_getInstance() {
    if (Vector$Companion_instance === null) {
      new Vector$Companion();
    }
    return Vector$Companion_instance;
  }
  Vector.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vector',
    interfaces: []
  };
  Vector.prototype.component1 = function () {
    return this.x;
  };
  Vector.prototype.component2 = function () {
    return this.y;
  };
  Vector.prototype.copy_lu1900$ = function (x, y) {
    return new Vector(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Vector.prototype.toString = function () {
    return 'Vector(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Vector.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Vector.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function isInbounds($receiver, x, y) {
    return x >= 0 && x <= $receiver.width && y >= 0 && y <= $receiver.height;
  }
  function xy($receiver, x0, y0) {
    return new Pair($receiver.width / 2.0 + x0, $receiver.height / 2.0 - y0);
  }
  function draw($receiver, bodies, trails, deletedBodies) {
    if (trails === void 0)
      trails = false;
    if (deletedBodies === void 0)
      deletedBodies = null;
    var tmp$;
    var ctx = Kotlin.isType(tmp$ = $receiver.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : Kotlin.throwCCE();
    ctx.clearRect(0.0, 0.0, $receiver.width, $receiver.height);
    var tmp$_0;
    tmp$_0 = bodies.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1 = xy($receiver, element.x.x, element.x.y);
      var x = tmp$_1.component1()
      , y = tmp$_1.component2();
      if (isInbounds($receiver, x, y))
        drawBody($receiver, element);
      var tmp$_2 = trails;
      if (tmp$_2) {
        tmp$_2 = !element.positions.isEmpty();
      }
      if (tmp$_2)
        drawTrail($receiver, element.positions);
    }
    if (trails) {
      if (deletedBodies != null) {
        var tmp$_3;
        tmp$_3 = deletedBodies.iterator();
        while (tmp$_3.hasNext()) {
          var element_0 = tmp$_3.next();
          drawTrail($receiver, element_0.positions);
        }
      }
    }
  }
  function drawBody($receiver, body) {
    var tmp$;
    var ctx = Kotlin.isType(tmp$ = $receiver.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : Kotlin.throwCCE();
    var tmp$_0 = xy($receiver, body.x.x, body.x.y);
    var x = tmp$_0.component1()
    , y = tmp$_0.component2();
    var grd = ctx.createRadialGradient(x, y, 0.1, x, y, 10 * Math.log(body.r));
    grd.addColorStop(0.0, 'wheat');
    grd.addColorStop(1.0, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(x - body.r * 4, y - body.r * 4, 150.0, 150.0);
    ctx.beginPath();
    ctx.arc(x, y, body.r, 0.0, 2 * Math.PI, false);
    ctx.fillStyle = massToColor(body.m);
    ctx.fill();
  }
  function drawTrail($receiver, positions) {
    var tmp$;
    var ctx = Kotlin.isType(tmp$ = $receiver.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : Kotlin.throwCCE();
    ctx.beginPath();
    var tmp$_0 = xy($receiver, first(positions).x, first(positions).y);
    var x = tmp$_0.component1()
    , y = tmp$_0.component2();
    ctx.moveTo(x, y);
    var tmp$_1;
    tmp$_1 = drop(positions, 1).iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      var tmp$_2 = xy($receiver, element.x, element.y);
      var px = tmp$_2.component1()
      , py = tmp$_2.component2();
      if (isInbounds($receiver, px, py))
        ctx.lineTo(px, py);
      else
        ctx.moveTo(px, py);
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.01;
    ctx.stroke();
  }
  function drawText($receiver, text, x, y, font, fillStyle, textAlign) {
    if (font === void 0)
      font = '10px Arial';
    if (fillStyle === void 0)
      fillStyle = 'white';
    if (textAlign === void 0) {
      textAlign = 'left';
    }
    var tmp$;
    var ctx = Kotlin.isType(tmp$ = $receiver.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : Kotlin.throwCCE();
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = textAlign;
    var lineHeight = ctx.measureText('M').width * 1.2;
    var dy = {v: y};
    var tmp$_0;
    tmp$_0 = split(text, ['\n']).iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      ctx.fillText(element, x, dy.v);
      dy.v += lineHeight;
    }
  }
  var G;
  var SOFTENING_LENGTH;
  function verlet(x, v, dt, a) {
    var x1 = x.plus_7q8zhp$(v.times_14dthe$(dt)).plus_7q8zhp$(a(x).times_14dthe$(Math.pow(dt, 2.0) / 2.0));
    var v1 = v.plus_7q8zhp$(a(x).plus_7q8zhp$(a(x1)).times_14dthe$(dt / 2));
    return new Pair(x1, v1);
  }
  function gravityAcceleration$gravity(pos, body2) {
    var r12 = body2.x.minus_7q8zhp$(pos);
    return r12.times_14dthe$(body2.m * G).div_14dthe$(Math.pow(Math.pow(r12.len, 2.0) + Math.pow(SOFTENING_LENGTH, 2.0), 3 / 2.0));
  }
  function gravityAcceleration(x, bodies) {
    var gravity = gravityAcceleration$gravity;
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$(bodies, 10));
    var tmp$;
    tmp$ = bodies.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(gravity(x, item));
    }
    var tmp$_0;
    var accumulator = Vector$Companion_getInstance().zero;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      accumulator = accumulator.plus_7q8zhp$(element);
    }
    return accumulator;
  }
  function massToRadius(mass) {
    return mass > 1 ? Math.max(1.5, (10 * Math.log(mass) / Math.log(10.0) - 14) / 3) : 1.02;
  }
  function massToColor(mass) {
    if (mass >= 100001.0)
      return 'black';
    else if (mass >= 100000.0)
      return '#FFD699';
    else if (mass >= 10000.0)
      return 'lemonchiffon';
    else
      return 'white';
  }
  function isWayOutOfBounds(x, y, width, height) {
    return Math.abs(x) > (2 * width | 0) || Math.abs(y) > (2 * height | 0);
  }
  function Application() {
    this.initBodies = setOf([new Body(100000.0, massToRadius(100000.0), new Vector(0.0, 0.0), new Vector(0.0, 0.0)), new Body(0.0, massToRadius(10.0), new Vector(20.0, 0.0), new Vector(0.0, 70.0)), new Body(0.0, massToRadius(75.0), new Vector(50.0, 0.0), new Vector(0.0, 45.0)), new Body(0.0, massToRadius(80.0), new Vector(75.0, 0.0), new Vector(0.0, 37.0)), new Body(0.0, massToRadius(80.0), new Vector(120.0, 0.0), new Vector(0.0, 29.0)), new Body(0.0, massToRadius(1000.0), new Vector(220.0, 0.0), new Vector(0.0, 21.0))]);
    this.numTrailPts = 1000;
    this.dt = 0.05;
    this.targetFps = 60;
    var tmp$;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    this.context = new SimulationContext(this.dt, this.initBodies, this.canvas.width, this.canvas.height, this.numTrailPts);
    this.controller = new MainController(this.canvas, this.context);
    this.canvas.addEventListener('mousedown', Application_init$lambda(this), false);
    this.canvas.addEventListener('mouseup', Application_init$lambda_0(this), false);
    window.addEventListener('keydown', Application_init$lambda_1(this), false);
    window.addEventListener('wheel', Application_init$lambda_2(this), false);
  }
  Application.prototype.start = function () {
    window.setInterval(Kotlin.getCallableRef('run', function ($receiver) {
      return $receiver.run();
    }.bind(null, this.controller)), 1000 / this.targetFps | 0);
  };
  function Application_init$lambda(this$Application) {
    return function (it) {
      var tmp$;
      this$Application.controller.mouseDownListener_tfvzir$(Kotlin.isType(tmp$ = it, MouseEvent) ? tmp$ : Kotlin.throwCCE());
    };
  }
  function Application_init$lambda_0(this$Application) {
    return function (it) {
      var tmp$;
      this$Application.controller.mouseUpListener_tfvzir$(Kotlin.isType(tmp$ = it, MouseEvent) ? tmp$ : Kotlin.throwCCE());
    };
  }
  function Application_init$lambda_1(this$Application) {
    return function (it) {
      var tmp$;
      this$Application.controller.keyDownListener_kc24xn$(Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : Kotlin.throwCCE());
    };
  }
  function Application_init$lambda_2(this$Application) {
    return function (it) {
      var tmp$;
      this$Application.controller.mouseWheelHandler_itjbex$(Kotlin.isType(tmp$ = it, WheelEvent) ? tmp$ : Kotlin.throwCCE());
    };
  }
  Application.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Application',
    interfaces: []
  };
  var package$me = _.me || (_.me = {});
  var package$ccampo = package$me.ccampo || (package$me.ccampo = {});
  var package$nbody = package$ccampo.nbody || (package$ccampo.nbody = {});
  var package$controller = package$nbody.controller || (package$nbody.controller = {});
  package$controller.MainController = MainController;
  Object.defineProperty(Body, 'Companion', {
    get: Body$Companion_getInstance
  });
  var package$model = package$nbody.model || (package$nbody.model = {});
  package$model.Body = Body;
  package$model.SimulationContext = SimulationContext;
  Object.defineProperty(Vector, 'Companion', {
    get: Vector$Companion_getInstance
  });
  package$model.Vector = Vector;
  var package$util = package$nbody.util || (package$nbody.util = {});
  package$util.isInbounds_4oodkz$ = isInbounds;
  package$util.xy_4oodkz$ = xy;
  package$util.draw_8mn7dd$ = draw;
  package$util.drawBody_yctfmj$ = drawBody;
  package$util.drawTrail_w2scx7$ = drawTrail;
  package$util.drawText_3oy5m$ = drawText;
  Object.defineProperty(package$util, 'G', {
    get: function () {
      return G;
    }
  });
  Object.defineProperty(package$util, 'SOFTENING_LENGTH', {
    get: function () {
      return SOFTENING_LENGTH;
    }
  });
  package$util.verlet_x3gmia$ = verlet;
  package$util.gravityAcceleration_m7dbdk$ = gravityAcceleration;
  package$util.massToRadius_14dthe$ = massToRadius;
  package$util.massToColor_14dthe$ = massToColor;
  package$util.isWayOutOfBounds_83x1ww$ = isWayOutOfBounds;
  var package$web = package$nbody.web || (package$nbody.web = {});
  package$web.Application = Application;
  G = 1.0;
  SOFTENING_LENGTH = 2.0;
  Kotlin.defineModule('nbody', _);
  return _;
}(typeof nbody === 'undefined' ? {} : nbody, kotlin);

//# sourceMappingURL=nbody.js.map
