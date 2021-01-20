webpackJsonp([42],{

/***/ "162o":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("mypn");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "7+uW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (false) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (false
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (false
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "production" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (false) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    false
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (false) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (false) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (false) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (false) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (false) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (false) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (false) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (false) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (false) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (false) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (false) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (false) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (false) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (false) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (false) {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (false) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (false) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (false) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (false) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        false
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (false
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (false) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (false) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (false) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        if (false) {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else if (false) {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (false) {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "production" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        if (false) {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (false) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        if (false) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (false) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (false) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (false) {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (false) {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (false) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (false) {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (false) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (false) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        if (false) {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        if (false) {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else if (false) {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (false) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          false
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (false) {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (false) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      false
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (false) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "production" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (false
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (false) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

function checkFunctionParameterExpression (exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn(
      "invalid function parameter expression: " + (e.message) + " in\n\n" +
      "    " + exp + "\n\n" +
      "  Raw expression: " + (text.trim()) + "\n",
      range
    );
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (false) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (false) {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (false) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (false) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      if (false) {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "production" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (false) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (false) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (false) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "production" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (false) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("DuR2"), __webpack_require__("162o").setImmediate))

/***/ }),

/***/ "DuR2":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "G5Az":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_stockmind_vue__ = __webpack_require__("WOS9");
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b78404e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_stockmind_vue__ = __webpack_require__("qE7L");
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_stockmind_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b78404e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_stockmind_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "IeYx":
/***/ (function(module, exports, __webpack_require__) {

(function(t,e){ true?module.exports=e(__webpack_require__("7+uW")):"function"===typeof define&&define.amd?define([],e):"object"===typeof exports?exports["mindmap"]=e(require("vue")):t["mindmap"]=e(t["Vue"])})("undefined"!==typeof self?self:this,(function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="fb15")}({"00ee":function(t,e,n){var r=n("b622"),i=r("toStringTag"),o={};o[i]="z",t.exports="[object z]"===String(o)},"0366":function(t,e,n){var r=n("1c0b");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},"0538":function(t,e,n){"use strict";var r=n("1c0b"),i=n("861d"),o=[].slice,a={},u=function(t,e,n){if(!(e in a)){for(var r=[],i=0;i<e;i++)r[i]="a["+i+"]";a[e]=Function("C,a","return new C("+r.join(",")+")")}return a[e](t,n)};t.exports=Function.bind||function(t){var e=r(this),n=o.call(arguments,1),a=function(){var r=n.concat(o.call(arguments));return this instanceof a?u(e,r.length,r):e.apply(t,r)};return i(e.prototype)&&(a.prototype=e.prototype),a}},"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],u=function(t){try{return i(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?u(t):i(r(t))}},"06cf":function(t,e,n){var r=n("83ab"),i=n("d1e7"),o=n("5c6c"),a=n("fc6a"),u=n("c04e"),c=n("5135"),s=n("0cfb"),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=a(t),e=u(e,!0),s)try{return l(t,e)}catch(n){}if(c(t,e))return o(!i.f.call(t,e),t[e])}},"0cfb":function(t,e,n){var r=n("83ab"),i=n("d039"),o=n("cc12");t.exports=!r&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},"0d3b":function(t,e,n){var r=n("d039"),i=n("b622"),o=n("c430"),a=i("iterator");t.exports=!r((function(){var t=new URL("b?a=1&b=2&c=3","http://a"),e=t.searchParams,n="";return t.pathname="c%20d",e.forEach((function(t,r){e["delete"]("b"),n+=r+t})),o&&!t.toJSON||!e.sort||"http://a/c%20d?a=1&c=3"!==t.href||"3"!==e.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!e[a]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host}))},1276:function(t,e,n){"use strict";var r=n("d784"),i=n("44e7"),o=n("825a"),a=n("1d80"),u=n("4840"),c=n("8aa5"),s=n("50c4"),l=n("14c3"),f=n("9263"),h=n("d039"),d=[].push,p=Math.min,v=4294967295,g=!h((function(){return!RegExp(v,"y")}));r("split",2,(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(a(this)),o=void 0===n?v:n>>>0;if(0===o)return[];if(void 0===t)return[r];if(!i(t))return e.call(r,t,o);var u,c,s,l=[],h=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,g=new RegExp(t.source,h+"g");while(u=f.call(g,r)){if(c=g.lastIndex,c>p&&(l.push(r.slice(p,u.index)),u.length>1&&u.index<r.length&&d.apply(l,u.slice(1)),s=u[0].length,p=c,l.length>=o))break;g.lastIndex===u.index&&g.lastIndex++}return p===r.length?!s&&g.test("")||l.push(""):l.push(r.slice(p)),l.length>o?l.slice(0,o):l}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=a(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,i,n):r.call(String(i),e,n)},function(t,i){var a=n(r,t,this,i,r!==e);if(a.done)return a.value;var f=o(t),h=String(this),d=u(f,RegExp),m=f.unicode,y=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(g?"y":"g"),b=new d(g?f:"^(?:"+f.source+")",y),A=void 0===i?v:i>>>0;if(0===A)return[];if(0===h.length)return null===l(b,h)?[h]:[];var w=0,x=0,k=[];while(x<h.length){b.lastIndex=g?x:0;var _,S=l(b,g?h:h.slice(x));if(null===S||(_=p(s(b.lastIndex+(g?0:x)),h.length))===w)x=c(h,x,m);else{if(k.push(h.slice(w,x)),k.length===A)return k;for(var E=1;E<=S.length-1;E++)if(k.push(S[E]),k.length===A)return k;x=w=_}}return k.push(h.slice(w)),k}]}),!g)},"131a":function(t,e,n){var r=n("23e7"),i=n("d2bb");r({target:"Object",stat:!0},{setPrototypeOf:i})},"14c3":function(t,e,n){var r=n("c6b6"),i=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"178b":function(t,e,n){"use strict";var r=n("43b2"),i=n.n(r);i.a},"19aa":function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},"1be4":function(t,e,n){var r=n("d066");t.exports=r("document","documentElement")},"1c0b":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},"1c7e":function(t,e,n){var r=n("b622"),i=r("iterator"),o=!1;try{var a=0,u={next:function(){return{done:!!a++}},return:function(){o=!0}};u[i]=function(){return this},Array.from(u,(function(){throw 2}))}catch(c){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var r={};r[i]=function(){return{next:function(){return{done:n=!0}}}},t(r)}catch(c){}return n}},"1cdc":function(t,e,n){var r=n("342f");t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(r)},"1d80":function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on "+t);return t}},"1dde":function(t,e,n){var r=n("d039"),i=n("b622"),o=n("2d00"),a=i("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"1de5":function(t,e,n){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},2266:function(t,e,n){var r=n("825a"),i=n("e95a"),o=n("50c4"),a=n("0366"),u=n("35a1"),c=n("9bdd"),s=function(t,e){this.stopped=t,this.result=e},l=t.exports=function(t,e,n,l,f){var h,d,p,v,g,m,y,b=a(e,n,l?2:1);if(f)h=t;else{if(d=u(t),"function"!=typeof d)throw TypeError("Target is not iterable");if(i(d)){for(p=0,v=o(t.length);v>p;p++)if(g=l?b(r(y=t[p])[0],y[1]):b(t[p]),g&&g instanceof s)return g;return new s(!1)}h=d.call(t)}m=h.next;while(!(y=m.call(h)).done)if(g=c(h,b,y.value,l),"object"==typeof g&&g&&g instanceof s)return g;return new s(!1)};l.stop=function(t){return new s(!0,t)}},"234d":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAL5JREFUSMfdlUsOgzAMRJ+qbnq00gOxJN3RawJ3YAmLNlJqPrGdLKqOZAkpkxlnHBH4JzyACVgKawSaPYOxgnisYc8gLpbiS+di3ByAvorzgXjk9B6dM4NUPGfiMnBzcjMI5KGeiewuoLtVMi5VRIFt5kd8ORNVRLP22JY9stPWEFFnjSgiVOKcL5RwtL8KGZeMRYVcd23C6bQ6V0MDL+D2+X5au9ecwKWTzmASBG/B+/HaoKHOqzYA9wpJ/AhWvz2e2M3ZuhAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDItMjNUMDc6MTI6NDQrMDA6MDBN0Wd6AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTAyLTIzVDA3OjEyOjQ0KzAwOjAwPIzfxgAAACh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vdG1wL21hZ2ljay04YXdza0hmQsMy75cAAAAASUVORK5CYII="},"23cb":function(t,e,n){var r=n("a691"),i=Math.max,o=Math.min;t.exports=function(t,e){var n=r(t);return n<0?i(n+e,0):o(n,e)}},"23d4":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgUlEQVRIx+2UMQ6AIBAEiX+4xCdY4P8r4h+k8DljIYUxIiBgNLIVxbJ7dwunVMM/AQzABPQRXAEMMKYYGDZYQALi1nFNioEAs7u4nHUSw7ltki1+JVRM3DNnezhLlrink6TKuyIVvHZEVUOu+kyrf7QnVoV2JsEQd8tO38qi4ftYAR2/iAqKWJdNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTI2VDA5OjQ5OjIyKzAwOjAwCA7QNgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0yNlQwOTo0OToyMiswMDowMHlTaIoAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"},"23e7":function(t,e,n){var r=n("da84"),i=n("06cf").f,o=n("9112"),a=n("6eeb"),u=n("ce4e"),c=n("e893"),s=n("94ca");t.exports=function(t,e){var n,l,f,h,d,p,v=t.target,g=t.global,m=t.stat;if(l=g?r:m?r[v]||u(v,{}):(r[v]||{}).prototype,l)for(f in e){if(d=e[f],t.noTargetGet?(p=i(l,f),h=p&&p.value):h=l[f],n=s(g?f:v+(m?".":"#")+f,t.forced),!n&&void 0!==h){if(typeof d===typeof h)continue;c(d,h)}(t.sham||h&&h.sham)&&o(d,"sham",!0),a(l,f,d,t)}}},"241c":function(t,e,n){var r=n("ca84"),i=n("7839"),o=i.concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},"24fb":function(t,e,n){"use strict";function r(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"===typeof btoa){var o=i(r),a=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}function i(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(n," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=r(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"===typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var u=0;u<t.length;u++){var c=[].concat(t[u]);r&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}},2532:function(t,e,n){"use strict";var r=n("23e7"),i=n("5a34"),o=n("1d80"),a=n("ab13");r({target:"String",proto:!0,forced:!a("includes")},{includes:function(t){return!!~String(o(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},"25f0":function(t,e,n){"use strict";var r=n("6eeb"),i=n("825a"),o=n("d039"),a=n("ad6d"),u="toString",c=RegExp.prototype,s=c[u],l=o((function(){return"/a/b"!=s.call({source:"a",flags:"b"})})),f=s.name!=u;(l||f)&&r(RegExp.prototype,u,(function(){var t=i(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?a.call(t):n);return"/"+e+"/"+r}),{unsafe:!0})},2626:function(t,e,n){"use strict";var r=n("d066"),i=n("9bf2"),o=n("b622"),a=n("83ab"),u=o("species");t.exports=function(t){var e=r(t),n=i.f;a&&e&&!e[u]&&n(e,u,{configurable:!0,get:function(){return this}})}},"2ab2":function(t,e,n){var r=n("24fb"),i=n("1de5"),o=n("e8c1"),a=n("234d"),u=n("d767"),c=n("b076"),s=n("480e"),l=n("23d4"),f=n("fa08"),h=n("3792"),d=n("3f55");e=r(!1);var p=i(o),v=i(a),g=i(u),m=i(c),y=i(s),b=i(l),A=i(f),w=i(h),x=i(d);e.push([t.i,'button:focus{outline:none}button.icon{position:relative;cursor:pointer;width:36px;height:36px;border-radius:50%;background-repeat:no-repeat;background-color:transparent;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:0;border:0;color:#3f51b5}button.icon:before{background-color:currentColor;border-radius:inherit;bottom:0;color:inherit;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;-webkit-transition:opacity .2s cubic-bezier(.4,0,.6,1);transition:opacity .2s cubic-bezier(.4,0,.6,1)}button.icon:hover:before{opacity:.1}button.icon.disabled{cursor:default}button.icon.disabled:hover:before{opacity:0}button.icon i{width:24px;height:24px}button.icon i.gps{background-image:url('+p+")}button.icon i.fitView{background-image:url("+v+")}button.icon i.download{background-image:url("+g+")}button.icon i.undo{background-image:url("+m+")}button.icon i.redo{background-image:url("+y+")}button.icon i.close{background-image:url("+b+')}div#mindmap{font-size:14px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex}div#mindmap div.rightClickTrigger{position:absolute;width:100%;height:100%}div#mindmap div#dummy div{white-space:pre-wrap;width:-webkit-max-content;width:-moz-max-content;width:max-content}div#mindmap svg{-webkit-box-flex:1;-ms-flex:auto;flex:auto;outline:none;background-color:#eeeef3}div#mindmap svg.grab{cursor:-webkit-grab;cursor:grab}div#mindmap svg foreignObject{cursor:default;border-radius:3px;border:2px solid transparent}div#mindmap svg foreignObject:focus{outline:none}div#mindmap svg foreignObject div{text-align:left;-webkit-box-sizing:content-box;box-sizing:content-box;border:1px solid transparent;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:16px;min-height:21px;white-space:pre-wrap;color:#6d6d6d}div#mindmap svg foreignObject div:focus{border-color:#9a9a9a;outline:none}div#mindmap svg g.depth_0.node>foreignObject{background-color:#fff;border-radius:5px}div#mindmap svg g.depth_0.node>foreignObject div{color:#4b4b4b}div#mindmap svg g.gButton{opacity:0}div#mindmap svg g.gButton>path{fill:#8685ff}div#mindmap svg g.gButton>rect{fill:#fff;stroke:grey;stroke-width:.5}div#mindmap svg g.gEllipsis{opacity:0}div#mindmap svg g.gEllipsis.show{opacity:1}div#mindmap svg g.gEllipsis circle{fill:#000}div#mindmap svg g.gEllipsis:hover>rect.btn{stroke:grey;fill:#fff}div#mindmap svg g.gEllipsis:hover circle{fill:#5a5ad2}div#mindmap svg.stroke-width-1 path{stroke-width:1}div#mindmap svg.stroke-width-2 path{stroke-width:2}div#mindmap svg.stroke-width-3 path{stroke-width:3}div#mindmap svg.stroke-width-4 path{stroke-width:4}div#mindmap svg.stroke-width-5 path{stroke-width:5}div#mindmap svg.stroke-width-6 path{stroke-width:6}div#mindmap svg.stroke-width-7 path{stroke-width:7}div#mindmap svg.stroke-width-8 path{stroke-width:8}div#mindmap svg.stroke-width-9 path{stroke-width:9}div#mindmap svg.stroke-width-10 path{stroke-width:10}div#mindmap svg path{fill:none;stroke-linecap:round}div#mindmap svg #selectedNode:not(.depth_0)>foreignObject{background-color:rgba(0,0,255,.15)}div#mindmap svg #selectedNode.depth_0>foreignObject{outline:3px solid;outline-color:rgba(0,0,255,.15)}div#mindmap svg .multiSelectedNode:not(.depth_0)>foreignObject{background-color:rgba(0,0,255,.15)}div#mindmap svg .multiSelectedNode.depth_0>foreignObject{outline:3px solid;outline-color:rgba(0,0,255,.15)}div#mindmap svg #newParentNode>foreignObject{border-color:rgba(0,0,255,.15)}div#mindmap svg #editing>foreignObject>div{background-color:#fff}div#mindmap svg #selectedBox{color:#393936;opacity:.1;stroke:#000;stroke-width:2}div#mindmap #menu{position:absolute;border-radius:4px;-webkit-box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);background-color:#eae9ed;padding:4px 0;font-weight:500;color:#3a353d}div#mindmap #menu:focus{outline:none}div#mindmap #menu .menu-item{position:relative;padding:0 20px;cursor:pointer}div#mindmap #menu .menu-item:before{background-color:#000;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;-webkit-transition:.3s cubic-bezier(.25,.8,.5,1);transition:.3s cubic-bezier(.25,.8,.5,1)}div#mindmap #menu .menu-item:not(.disabled):hover:before{opacity:.09}div#mindmap #menu .menu-item.disabled{color:#aeb2b5;cursor:not-allowed}div#mindmap div.buttonList{position:absolute}div#mindmap div.buttonList.right-bottom{bottom:0;right:0}div#mindmap div.buttonList.top-right{top:0;right:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}div#mindmap div.buttonList i{-webkit-filter:invert(25%) sepia(40%) saturate(5050%) hue-rotate(227deg) brightness(78%) contrast(74%);filter:invert(25%) sepia(40%) saturate(5050%) hue-rotate(227deg) brightness(78%) contrast(74%)}div#mindmap div.buttonList button.icon.disabled i{-webkit-filter:invert(85%) sepia(20%) saturate(0) hue-rotate(125deg) brightness(86%) contrast(93%);filter:invert(85%) sepia(20%) saturate(0) hue-rotate(125deg) brightness(86%) contrast(93%)}div#mindmap div.pop-ups{position:absolute;left:0;top:0;bottom:0;right:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}div#mindmap div.pop-ups div.layer{position:absolute;left:0;top:0;bottom:0;right:0;opacity:.46;background-color:#212121}div#mindmap div.pop-ups .content{position:relative;-webkit-box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}div#mindmap div.pop-ups .content div.exportTo{background-color:#ececec;border-radius:4px;width:-webkit-min-content;width:-moz-min-content;width:min-content}div#mindmap div.pop-ups .content div.exportTo .optionList{padding:5px;background-color:#fff;border-top-left-radius:inherit;border-top-right-radius:inherit;display:-webkit-box;display:-ms-flexbox;display:flex}div#mindmap div.pop-ups .content div.exportTo .optionList .option{cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:84px;height:84px;border-radius:4px;color:#747474}div#mindmap div.pop-ups .content div.exportTo .optionList .option.select{background-color:#e8e8e8}div#mindmap div.pop-ups .content div.exportTo .optionList .option.disabled{cursor:not-allowed}div#mindmap div.pop-ups .content div.exportTo .optionList .option.disabled .icon{background-color:rgba(0,0,0,.12)!important}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon{padding:2px;border-radius:6px;margin-bottom:10px}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon.purpleOpt{background-color:#c38efc}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon.greenOpt{background-color:#4bd964}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon.grassOpt{background-color:#97d439}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon i{display:block;width:36px;height:36px}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon i.code-json{background-image:url('+A+")}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon i.image{background-image:url("+w+")}div#mindmap div.pop-ups .content div.exportTo .optionList .option .icon i.markdown{background-image:url("+x+")}div#mindmap div.pop-ups .content div.exportTo .optionList .option .text{font-size:12px}div#mindmap div.pop-ups .content div.exportTo .optionTip{padding:10px 30px;border-top:1px solid #ddddde;border-bottom:1px solid #ddddde}div#mindmap div.pop-ups .content div.exportTo .action{padding:10px;display:-webkit-box;display:-ms-flexbox;display:flex}div#mindmap div.pop-ups .content div.exportTo .action .spacer{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}div#mindmap div.pop-ups .content div.exportTo .action button{height:24px;width:64px;margin:0 5px;background-color:#3c89fd;color:#fff;border-radius:4px}div#mindmap div.pop-ups .content div.exportTo .action button.cancel{background-color:#fff;color:#000}",""]),t.exports=e},"2b3d":function(t,e,n){"use strict";n("3ca3");var r,i=n("23e7"),o=n("83ab"),a=n("0d3b"),u=n("da84"),c=n("37e8"),s=n("6eeb"),l=n("19aa"),f=n("5135"),h=n("60da"),d=n("4df4"),p=n("6547").codeAt,v=n("5fb2"),g=n("d44e"),m=n("9861"),y=n("69f3"),b=u.URL,A=m.URLSearchParams,w=m.getState,x=y.set,k=y.getterFor("URL"),_=Math.floor,S=Math.pow,E="Invalid authority",O="Invalid scheme",M="Invalid host",R="Invalid port",j=/[A-Za-z]/,N=/[\d+-.A-Za-z]/,C=/\d/,T=/^(0x|0X)/,B=/^[0-7]+$/,L=/^\d+$/,P=/^[\dA-Fa-f]+$/,I=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,z=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,U=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,D=/[\u0009\u000A\u000D]/g,Y=function(t,e){var n,r,i;if("["==e.charAt(0)){if("]"!=e.charAt(e.length-1))return M;if(n=V(e.slice(1,-1)),!n)return M;t.host=n}else if(W(t)){if(e=v(e),I.test(e))return M;if(n=G(e),null===n)return M;t.host=n}else{if(z.test(e))return M;for(n="",r=d(e),i=0;i<r.length;i++)n+=Z(r[i],J);t.host=n}},G=function(t){var e,n,r,i,o,a,u,c=t.split(".");if(c.length&&""==c[c.length-1]&&c.pop(),e=c.length,e>4)return t;for(n=[],r=0;r<e;r++){if(i=c[r],""==i)return t;if(o=10,i.length>1&&"0"==i.charAt(0)&&(o=T.test(i)?16:8,i=i.slice(8==o?1:2)),""===i)a=0;else{if(!(10==o?L:8==o?B:P).test(i))return t;a=parseInt(i,o)}n.push(a)}for(r=0;r<e;r++)if(a=n[r],r==e-1){if(a>=S(256,5-e))return null}else if(a>255)return null;for(u=n.pop(),r=0;r<n.length;r++)u+=n[r]*S(256,3-r);return u},V=function(t){var e,n,r,i,o,a,u,c=[0,0,0,0,0,0,0,0],s=0,l=null,f=0,h=function(){return t.charAt(f)};if(":"==h()){if(":"!=t.charAt(1))return;f+=2,s++,l=s}while(h()){if(8==s)return;if(":"!=h()){e=n=0;while(n<4&&P.test(h()))e=16*e+parseInt(h(),16),f++,n++;if("."==h()){if(0==n)return;if(f-=n,s>6)return;r=0;while(h()){if(i=null,r>0){if(!("."==h()&&r<4))return;f++}if(!C.test(h()))return;while(C.test(h())){if(o=parseInt(h(),10),null===i)i=o;else{if(0==i)return;i=10*i+o}if(i>255)return;f++}c[s]=256*c[s]+i,r++,2!=r&&4!=r||s++}if(4!=r)return;break}if(":"==h()){if(f++,!h())return}else if(h())return;c[s++]=e}else{if(null!==l)return;f++,s++,l=s}}if(null!==l){a=s-l,s=7;while(0!=s&&a>0)u=c[s],c[s--]=c[l+a-1],c[l+--a]=u}else if(8!=s)return;return c},F=function(t){for(var e=null,n=1,r=null,i=0,o=0;o<8;o++)0!==t[o]?(i>n&&(e=r,n=i),r=null,i=0):(null===r&&(r=o),++i);return i>n&&(e=r,n=i),e},X=function(t){var e,n,r,i;if("number"==typeof t){for(e=[],n=0;n<4;n++)e.unshift(t%256),t=_(t/256);return e.join(".")}if("object"==typeof t){for(e="",r=F(t),n=0;n<8;n++)i&&0===t[n]||(i&&(i=!1),r===n?(e+=n?":":"::",i=!0):(e+=t[n].toString(16),n<7&&(e+=":")));return"["+e+"]"}return t},J={},K=h({},J,{" ":1,'"':1,"<":1,">":1,"`":1}),q=h({},K,{"#":1,"?":1,"{":1,"}":1}),Q=h({},q,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),Z=function(t,e){var n=p(t,0);return n>32&&n<127&&!f(e,t)?t:encodeURIComponent(t)},H={ftp:21,file:null,http:80,https:443,ws:80,wss:443},W=function(t){return f(H,t.scheme)},$=function(t){return""!=t.username||""!=t.password},tt=function(t){return!t.host||t.cannotBeABaseURL||"file"==t.scheme},et=function(t,e){var n;return 2==t.length&&j.test(t.charAt(0))&&(":"==(n=t.charAt(1))||!e&&"|"==n)},nt=function(t){var e;return t.length>1&&et(t.slice(0,2))&&(2==t.length||"/"===(e=t.charAt(2))||"\\"===e||"?"===e||"#"===e)},rt=function(t){var e=t.path,n=e.length;!n||"file"==t.scheme&&1==n&&et(e[0],!0)||e.pop()},it=function(t){return"."===t||"%2e"===t.toLowerCase()},ot=function(t){return t=t.toLowerCase(),".."===t||"%2e."===t||".%2e"===t||"%2e%2e"===t},at={},ut={},ct={},st={},lt={},ft={},ht={},dt={},pt={},vt={},gt={},mt={},yt={},bt={},At={},wt={},xt={},kt={},_t={},St={},Et={},Ot=function(t,e,n,i){var o,a,u,c,s=n||at,l=0,h="",p=!1,v=!1,g=!1;n||(t.scheme="",t.username="",t.password="",t.host=null,t.port=null,t.path=[],t.query=null,t.fragment=null,t.cannotBeABaseURL=!1,e=e.replace(U,"")),e=e.replace(D,""),o=d(e);while(l<=o.length){switch(a=o[l],s){case at:if(!a||!j.test(a)){if(n)return O;s=ct;continue}h+=a.toLowerCase(),s=ut;break;case ut:if(a&&(N.test(a)||"+"==a||"-"==a||"."==a))h+=a.toLowerCase();else{if(":"!=a){if(n)return O;h="",s=ct,l=0;continue}if(n&&(W(t)!=f(H,h)||"file"==h&&($(t)||null!==t.port)||"file"==t.scheme&&!t.host))return;if(t.scheme=h,n)return void(W(t)&&H[t.scheme]==t.port&&(t.port=null));h="","file"==t.scheme?s=bt:W(t)&&i&&i.scheme==t.scheme?s=st:W(t)?s=dt:"/"==o[l+1]?(s=lt,l++):(t.cannotBeABaseURL=!0,t.path.push(""),s=_t)}break;case ct:if(!i||i.cannotBeABaseURL&&"#"!=a)return O;if(i.cannotBeABaseURL&&"#"==a){t.scheme=i.scheme,t.path=i.path.slice(),t.query=i.query,t.fragment="",t.cannotBeABaseURL=!0,s=Et;break}s="file"==i.scheme?bt:ft;continue;case st:if("/"!=a||"/"!=o[l+1]){s=ft;continue}s=pt,l++;break;case lt:if("/"==a){s=vt;break}s=kt;continue;case ft:if(t.scheme=i.scheme,a==r)t.username=i.username,t.password=i.password,t.host=i.host,t.port=i.port,t.path=i.path.slice(),t.query=i.query;else if("/"==a||"\\"==a&&W(t))s=ht;else if("?"==a)t.username=i.username,t.password=i.password,t.host=i.host,t.port=i.port,t.path=i.path.slice(),t.query="",s=St;else{if("#"!=a){t.username=i.username,t.password=i.password,t.host=i.host,t.port=i.port,t.path=i.path.slice(),t.path.pop(),s=kt;continue}t.username=i.username,t.password=i.password,t.host=i.host,t.port=i.port,t.path=i.path.slice(),t.query=i.query,t.fragment="",s=Et}break;case ht:if(!W(t)||"/"!=a&&"\\"!=a){if("/"!=a){t.username=i.username,t.password=i.password,t.host=i.host,t.port=i.port,s=kt;continue}s=vt}else s=pt;break;case dt:if(s=pt,"/"!=a||"/"!=h.charAt(l+1))continue;l++;break;case pt:if("/"!=a&&"\\"!=a){s=vt;continue}break;case vt:if("@"==a){p&&(h="%40"+h),p=!0,u=d(h);for(var m=0;m<u.length;m++){var y=u[m];if(":"!=y||g){var b=Z(y,Q);g?t.password+=b:t.username+=b}else g=!0}h=""}else if(a==r||"/"==a||"?"==a||"#"==a||"\\"==a&&W(t)){if(p&&""==h)return E;l-=d(h).length+1,h="",s=gt}else h+=a;break;case gt:case mt:if(n&&"file"==t.scheme){s=wt;continue}if(":"!=a||v){if(a==r||"/"==a||"?"==a||"#"==a||"\\"==a&&W(t)){if(W(t)&&""==h)return M;if(n&&""==h&&($(t)||null!==t.port))return;if(c=Y(t,h),c)return c;if(h="",s=xt,n)return;continue}"["==a?v=!0:"]"==a&&(v=!1),h+=a}else{if(""==h)return M;if(c=Y(t,h),c)return c;if(h="",s=yt,n==mt)return}break;case yt:if(!C.test(a)){if(a==r||"/"==a||"?"==a||"#"==a||"\\"==a&&W(t)||n){if(""!=h){var A=parseInt(h,10);if(A>65535)return R;t.port=W(t)&&A===H[t.scheme]?null:A,h=""}if(n)return;s=xt;continue}return R}h+=a;break;case bt:if(t.scheme="file","/"==a||"\\"==a)s=At;else{if(!i||"file"!=i.scheme){s=kt;continue}if(a==r)t.host=i.host,t.path=i.path.slice(),t.query=i.query;else if("?"==a)t.host=i.host,t.path=i.path.slice(),t.query="",s=St;else{if("#"!=a){nt(o.slice(l).join(""))||(t.host=i.host,t.path=i.path.slice(),rt(t)),s=kt;continue}t.host=i.host,t.path=i.path.slice(),t.query=i.query,t.fragment="",s=Et}}break;case At:if("/"==a||"\\"==a){s=wt;break}i&&"file"==i.scheme&&!nt(o.slice(l).join(""))&&(et(i.path[0],!0)?t.path.push(i.path[0]):t.host=i.host),s=kt;continue;case wt:if(a==r||"/"==a||"\\"==a||"?"==a||"#"==a){if(!n&&et(h))s=kt;else if(""==h){if(t.host="",n)return;s=xt}else{if(c=Y(t,h),c)return c;if("localhost"==t.host&&(t.host=""),n)return;h="",s=xt}continue}h+=a;break;case xt:if(W(t)){if(s=kt,"/"!=a&&"\\"!=a)continue}else if(n||"?"!=a)if(n||"#"!=a){if(a!=r&&(s=kt,"/"!=a))continue}else t.fragment="",s=Et;else t.query="",s=St;break;case kt:if(a==r||"/"==a||"\\"==a&&W(t)||!n&&("?"==a||"#"==a)){if(ot(h)?(rt(t),"/"==a||"\\"==a&&W(t)||t.path.push("")):it(h)?"/"==a||"\\"==a&&W(t)||t.path.push(""):("file"==t.scheme&&!t.path.length&&et(h)&&(t.host&&(t.host=""),h=h.charAt(0)+":"),t.path.push(h)),h="","file"==t.scheme&&(a==r||"?"==a||"#"==a))while(t.path.length>1&&""===t.path[0])t.path.shift();"?"==a?(t.query="",s=St):"#"==a&&(t.fragment="",s=Et)}else h+=Z(a,q);break;case _t:"?"==a?(t.query="",s=St):"#"==a?(t.fragment="",s=Et):a!=r&&(t.path[0]+=Z(a,J));break;case St:n||"#"!=a?a!=r&&("'"==a&&W(t)?t.query+="%27":t.query+="#"==a?"%23":Z(a,J)):(t.fragment="",s=Et);break;case Et:a!=r&&(t.fragment+=Z(a,K));break}l++}},Mt=function(t){var e,n,r=l(this,Mt,"URL"),i=arguments.length>1?arguments[1]:void 0,a=String(t),u=x(r,{type:"URL"});if(void 0!==i)if(i instanceof Mt)e=k(i);else if(n=Ot(e={},String(i)),n)throw TypeError(n);if(n=Ot(u,a,null,e),n)throw TypeError(n);var c=u.searchParams=new A,s=w(c);s.updateSearchParams(u.query),s.updateURL=function(){u.query=String(c)||null},o||(r.href=jt.call(r),r.origin=Nt.call(r),r.protocol=Ct.call(r),r.username=Tt.call(r),r.password=Bt.call(r),r.host=Lt.call(r),r.hostname=Pt.call(r),r.port=It.call(r),r.pathname=zt.call(r),r.search=Ut.call(r),r.searchParams=Dt.call(r),r.hash=Yt.call(r))},Rt=Mt.prototype,jt=function(){var t=k(this),e=t.scheme,n=t.username,r=t.password,i=t.host,o=t.port,a=t.path,u=t.query,c=t.fragment,s=e+":";return null!==i?(s+="//",$(t)&&(s+=n+(r?":"+r:"")+"@"),s+=X(i),null!==o&&(s+=":"+o)):"file"==e&&(s+="//"),s+=t.cannotBeABaseURL?a[0]:a.length?"/"+a.join("/"):"",null!==u&&(s+="?"+u),null!==c&&(s+="#"+c),s},Nt=function(){var t=k(this),e=t.scheme,n=t.port;if("blob"==e)try{return new URL(e.path[0]).origin}catch(r){return"null"}return"file"!=e&&W(t)?e+"://"+X(t.host)+(null!==n?":"+n:""):"null"},Ct=function(){return k(this).scheme+":"},Tt=function(){return k(this).username},Bt=function(){return k(this).password},Lt=function(){var t=k(this),e=t.host,n=t.port;return null===e?"":null===n?X(e):X(e)+":"+n},Pt=function(){var t=k(this).host;return null===t?"":X(t)},It=function(){var t=k(this).port;return null===t?"":String(t)},zt=function(){var t=k(this),e=t.path;return t.cannotBeABaseURL?e[0]:e.length?"/"+e.join("/"):""},Ut=function(){var t=k(this).query;return t?"?"+t:""},Dt=function(){return k(this).searchParams},Yt=function(){var t=k(this).fragment;return t?"#"+t:""},Gt=function(t,e){return{get:t,set:e,configurable:!0,enumerable:!0}};if(o&&c(Rt,{href:Gt(jt,(function(t){var e=k(this),n=String(t),r=Ot(e,n);if(r)throw TypeError(r);w(e.searchParams).updateSearchParams(e.query)})),origin:Gt(Nt),protocol:Gt(Ct,(function(t){var e=k(this);Ot(e,String(t)+":",at)})),username:Gt(Tt,(function(t){var e=k(this),n=d(String(t));if(!tt(e)){e.username="";for(var r=0;r<n.length;r++)e.username+=Z(n[r],Q)}})),password:Gt(Bt,(function(t){var e=k(this),n=d(String(t));if(!tt(e)){e.password="";for(var r=0;r<n.length;r++)e.password+=Z(n[r],Q)}})),host:Gt(Lt,(function(t){var e=k(this);e.cannotBeABaseURL||Ot(e,String(t),gt)})),hostname:Gt(Pt,(function(t){var e=k(this);e.cannotBeABaseURL||Ot(e,String(t),mt)})),port:Gt(It,(function(t){var e=k(this);tt(e)||(t=String(t),""==t?e.port=null:Ot(e,t,yt))})),pathname:Gt(zt,(function(t){var e=k(this);e.cannotBeABaseURL||(e.path=[],Ot(e,t+"",xt))})),search:Gt(Ut,(function(t){var e=k(this);t=String(t),""==t?e.query=null:("?"==t.charAt(0)&&(t=t.slice(1)),e.query="",Ot(e,t,St)),w(e.searchParams).updateSearchParams(e.query)})),searchParams:Gt(Dt),hash:Gt(Yt,(function(t){var e=k(this);t=String(t),""!=t?("#"==t.charAt(0)&&(t=t.slice(1)),e.fragment="",Ot(e,t,Et)):e.fragment=null}))}),s(Rt,"toJSON",(function(){return jt.call(this)}),{enumerable:!0}),s(Rt,"toString",(function(){return jt.call(this)}),{enumerable:!0}),b){var Vt=b.createObjectURL,Ft=b.revokeObjectURL;Vt&&s(Mt,"createObjectURL",(function(t){return Vt.apply(b,arguments)})),Ft&&s(Mt,"revokeObjectURL",(function(t){return Ft.apply(b,arguments)}))}g(Mt,"URL"),i({global:!0,forced:!a,sham:!o},{URL:Mt})},"2cf4":function(t,e,n){var r,i,o,a=n("da84"),u=n("d039"),c=n("c6b6"),s=n("0366"),l=n("1be4"),f=n("cc12"),h=n("1cdc"),d=a.location,p=a.setImmediate,v=a.clearImmediate,g=a.process,m=a.MessageChannel,y=a.Dispatch,b=0,A={},w="onreadystatechange",x=function(t){if(A.hasOwnProperty(t)){var e=A[t];delete A[t],e()}},k=function(t){return function(){x(t)}},_=function(t){x(t.data)},S=function(t){a.postMessage(t+"",d.protocol+"//"+d.host)};p&&v||(p=function(t){var e=[],n=1;while(arguments.length>n)e.push(arguments[n++]);return A[++b]=function(){("function"==typeof t?t:Function(t)).apply(void 0,e)},r(b),b},v=function(t){delete A[t]},"process"==c(g)?r=function(t){g.nextTick(k(t))}:y&&y.now?r=function(t){y.now(k(t))}:m&&!h?(i=new m,o=i.port2,i.port1.onmessage=_,r=s(o.postMessage,o,1)):!a.addEventListener||"function"!=typeof postMessage||a.importScripts||u(S)||"file:"===d.protocol?r=w in f("script")?function(t){l.appendChild(f("script"))[w]=function(){l.removeChild(this),x(t)}}:function(t){setTimeout(k(t),0)}:(r=S,a.addEventListener("message",_,!1))),t.exports={set:p,clear:v}},"2d00":function(t,e,n){var r,i,o=n("da84"),a=n("342f"),u=o.process,c=u&&u.versions,s=c&&c.v8;s?(r=s.split("."),i=r[0]+r[1]):a&&(r=a.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/),r&&(i=r[1]))),t.exports=i&&+i},3410:function(t,e,n){var r=n("23e7"),i=n("d039"),o=n("7b0b"),a=n("e163"),u=n("e177"),c=i((function(){a(1)}));r({target:"Object",stat:!0,forced:c,sham:!u},{getPrototypeOf:function(t){return a(o(t))}})},"342f":function(t,e,n){var r=n("d066");t.exports=r("navigator","userAgent")||""},"35a1":function(t,e,n){var r=n("f5df"),i=n("3f8c"),o=n("b622"),a=o("iterator");t.exports=function(t){if(void 0!=t)return t[a]||t["@@iterator"]||i[r(t)]}},3792:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABM0lEQVRYw+2WoU7EQBCG/zlRBAkJjhAcEg0kCCQKXoHgMaB4BzSe8AQIXoEcAiwEg+bOcAYBR8iHaI+U0u31uG73EvaTnensl840O1IkEvlnWPEBsCxpV9Ki57MHkq7M7NmZAWwCA9rjBVivEuq2KDPi2tky4F1S4rlVRYZmNucSomWZVMLs26MTQqCKKBRK6FDSw9RVGvqNz7Jaa8BrnRemFboA+o7YDZDk6h34FuoCCbAFvBVifWClpOa5L6Ee6T03yt3PxT6BHUfNeeC+aaEPYLsk/zSLn4yZzcp5+ovQsSO/AxwBpjFQMU+TCl3WObAOrnmaROgRWGhCJqtfOk/5nJm/XIcBfH6cWRS6CyB064wAG6RrZVv8WmHLlvwlSXuSVj1/mSelS34vQFcikcjs8AV/fwWj+hXXkQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNi0yN1QwODowNDoyNSswMDowMPtwXp4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDYtMjdUMDg6MDQ6MjUrMDA6MDCKLeYiAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="},"37e8":function(t,e,n){var r=n("83ab"),i=n("9bf2"),o=n("825a"),a=n("df75");t.exports=r?Object.defineProperties:function(t,e){o(t);var n,r=a(e),u=r.length,c=0;while(u>c)i.f(t,n=r[c++],e[n]);return t}},"3bbe":function(t,e,n){var r=n("861d");t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},"3ca3":function(t,e,n){"use strict";var r=n("6547").charAt,i=n("69f3"),o=n("7dd0"),a="String Iterator",u=i.set,c=i.getterFor(a);o(String,"String",(function(t){u(this,{type:a,string:String(t),index:0})}),(function(){var t,e=c(this),n=e.string,i=e.index;return i>=n.length?{value:void 0,done:!0}:(t=r(n,i),e.index+=t.length,{value:t,done:!1})}))},"3f55":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABf0lEQVRYw+2WMShFURjHf59IKQbZxSIMkg2LwWBRKOMrk5LlmS1CVimD0YLBRFllEj3rwxMpIat6IfE3uOV0u/ddL9djOL+63Xu//3c6//Ode8494PF4PJ54JPVLOlPlOJXU53qwkKECUATWgPdfHn8VMAnUmVlbXIUkKVvBGclKUtjlv6KkIUlLknLBNR2hDzr6ToTe6Ojr3zFUnaC3Aj3Bc7ekKzPbCzprATaApkBvjGhf47R/+3GFInI3JXVIqgd2HTOpkVShMA3ANnANdKZtptwKnQT3dmAoFPsTQzPAofN+C4xFJUpakHQJHDnhLkmXki4kDaRh6AUYAW6AZ2AUuI/JnQPyQLMTq+Vzkaya2X4ahjCzh8DIhJkdl8h7BcaBg5A0a2bLpfooe2M0s5yZbX0j7wkYBnJBaMXMFpPaJa2yK74+3GKELke/izD1KGkImALmyx28/5dFEZ6yApCR9ERljh8Z4Dw2Q1KfpHwFD2h5Sb1/OiUej8fz3/kAofCKQ2o85qYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDYtMjdUMDc6NTQ6MTUrMDA6MDAj2CAKAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA2LTI3VDA3OjU0OjE1KzAwOjAwUoWYtgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="},"3f8c":function(t,e){t.exports={}},"428f":function(t,e,n){var r=n("da84");t.exports=r},"43b2":function(t,e,n){var r=n("2ab2");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("499e").default;i("40ae7104",r,!0,{sourceMap:!1,shadowMode:!1})},"43da":function(t){t.exports=JSON.parse('{"a":"2.1.1"}')},"44ad":function(t,e,n){var r=n("d039"),i=n("c6b6"),o="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==i(t)?o.call(t,""):Object(t)}:Object},"44d2":function(t,e,n){var r=n("b622"),i=n("7c73"),o=n("9bf2"),a=r("unscopables"),u=Array.prototype;void 0==u[a]&&o.f(u,a,{configurable:!0,value:i(null)}),t.exports=function(t){u[a][t]=!0}},"44de":function(t,e,n){var r=n("da84");t.exports=function(t,e){var n=r.console;n&&n.error&&(1===arguments.length?n.error(t):n.error(t,e))}},"44e7":function(t,e,n){var r=n("861d"),i=n("c6b6"),o=n("b622"),a=o("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==i(t))}},"480e":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA7klEQVRIS+3TPU4DMRCG4SenAUHJBShoOAAcAaQ06VEkQoMoaSighQpukBuEny6ipucSkZEXWY43XmmVItJammY9/r6Zd2ZHtnxGW9Y3GFQJD4jaEF3hNlzWEB3hHPvYi7HAO5b4ipEaTXDfaLcZBOGLGLVBPmGKX4zxEB/8aZcMzvCaqf7gGx84iHGY5dzgOvlWNMjFn/GCeaGNE9whdFs6awYh8TPJDOzfanwwyypvnqwZPCbM+4r/429mkFYfhnbZo/JiB8cI/EOcFlYv92vDkua1blGH4run1H607kqbVqm3ygaBoYMq3d1HtAIbdiAZj1AwpAAAAABJRU5ErkJggg=="},4840:function(t,e,n){var r=n("825a"),i=n("1c0b"),o=n("b622"),a=o("species");t.exports=function(t,e){var n,o=r(t).constructor;return void 0===o||void 0==(n=r(o)[a])?e:i(n)}},4930:function(t,e,n){var r=n("d039");t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},"499e":function(t,e,n){"use strict";function r(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],u=o[1],c=o[2],s=o[3],l={id:t+":"+i,css:u,media:c,sourceMap:s};r[a]?r[a].parts.push(l):n.push(r[a]={id:a,parts:[l]})}return n}n.r(e),n.d(e,"default",(function(){return p}));var i="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=i&&(document.head||document.getElementsByTagName("head")[0]),u=null,c=0,s=!1,l=function(){},f=null,h="data-vue-ssr-id",d="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,n,i){s=n,f=i||{};var a=r(t,e);return v(a),function(e){for(var n=[],i=0;i<a.length;i++){var u=a[i],c=o[u.id];c.refs--,n.push(c)}e?(a=r(t,e),v(a)):a=[];for(i=0;i<n.length;i++){c=n[i];if(0===c.refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete o[c.id]}}}}function v(t){for(var e=0;e<t.length;e++){var n=t[e],r=o[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(m(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(m(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:a}}}}function g(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,n,r=document.querySelector("style["+h+'~="'+t.id+'"]');if(r){if(s)return l;r.parentNode.removeChild(r)}if(d){var i=c++;r=u||(u=g()),e=b.bind(null,r,i,!1),n=b.bind(null,r,i,!0)}else r=g(),e=A.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function b(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function A(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),f.ssrId&&t.setAttribute(h,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}},"4ae1":function(t,e,n){var r=n("23e7"),i=n("d066"),o=n("1c0b"),a=n("825a"),u=n("861d"),c=n("7c73"),s=n("0538"),l=n("d039"),f=i("Reflect","construct"),h=l((function(){function t(){}return!(f((function(){}),[],t)instanceof t)})),d=!l((function(){f((function(){}))})),p=h||d;r({target:"Reflect",stat:!0,forced:p,sham:p},{construct:function(t,e){o(t),a(e);var n=arguments.length<3?t:o(arguments[2]);if(d&&!h)return f(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(s.apply(t,r))}var i=n.prototype,l=c(u(i)?i:Object.prototype),p=Function.apply.call(t,l,e);return u(p)?p:l}})},"4d64":function(t,e,n){var r=n("fc6a"),i=n("50c4"),o=n("23cb"),a=function(t){return function(e,n,a){var u,c=r(e),s=i(c.length),l=o(a,s);if(t&&n!=n){while(s>l)if(u=c[l++],u!=u)return!0}else for(;s>l;l++)if((t||l in c)&&c[l]===n)return t||l||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},"4de4":function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").filter,o=n("1dde"),a=n("ae40"),u=o("filter"),c=a("filter");r({target:"Array",proto:!0,forced:!u||!c},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"4df4":function(t,e,n){"use strict";var r=n("0366"),i=n("7b0b"),o=n("9bdd"),a=n("e95a"),u=n("50c4"),c=n("8418"),s=n("35a1");t.exports=function(t){var e,n,l,f,h,d,p=i(t),v="function"==typeof this?this:Array,g=arguments.length,m=g>1?arguments[1]:void 0,y=void 0!==m,b=s(p),A=0;if(y&&(m=r(m,g>2?arguments[2]:void 0,2)),void 0==b||v==Array&&a(b))for(e=u(p.length),n=new v(e);e>A;A++)d=y?m(p[A],A):p[A],c(n,A,d);else for(f=b.call(p),h=f.next,n=new v;!(l=h.call(f)).done;A++)d=y?o(f,m,[l.value,A],!0):l.value,c(n,A,d);return n.length=A,n}},"50c4":function(t,e,n){var r=n("a691"),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},5135:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},5692:function(t,e,n){var r=n("c430"),i=n("c6cd");(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.5",mode:r?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},"56ef":function(t,e,n){var r=n("d066"),i=n("241c"),o=n("7418"),a=n("825a");t.exports=r("Reflect","ownKeys")||function(t){var e=i.f(a(t)),n=o.f;return n?e.concat(n(t)):e}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var r=n("1d80"),i=n("5899"),o="["+i+"]",a=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),c=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(a,"")),2&t&&(n=n.replace(u,"")),n}};t.exports={start:c(1),end:c(2),trim:c(3)}},"5a34":function(t,e,n){var r=n("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},"5c6c":function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},"5fb2":function(t,e,n){"use strict";var r=2147483647,i=36,o=1,a=26,u=38,c=700,s=72,l=128,f="-",h=/[^\0-\u007E]/,d=/[.\u3002\uFF0E\uFF61]/g,p="Overflow: input needs wider integers to process",v=i-o,g=Math.floor,m=String.fromCharCode,y=function(t){var e=[],n=0,r=t.length;while(n<r){var i=t.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){var o=t.charCodeAt(n++);56320==(64512&o)?e.push(((1023&i)<<10)+(1023&o)+65536):(e.push(i),n--)}else e.push(i)}return e},b=function(t){return t+22+75*(t<26)},A=function(t,e,n){var r=0;for(t=n?g(t/c):t>>1,t+=g(t/e);t>v*a>>1;r+=i)t=g(t/v);return g(r+(v+1)*t/(t+u))},w=function(t){var e=[];t=y(t);var n,u,c=t.length,h=l,d=0,v=s;for(n=0;n<t.length;n++)u=t[n],u<128&&e.push(m(u));var w=e.length,x=w;w&&e.push(f);while(x<c){var k=r;for(n=0;n<t.length;n++)u=t[n],u>=h&&u<k&&(k=u);var _=x+1;if(k-h>g((r-d)/_))throw RangeError(p);for(d+=(k-h)*_,h=k,n=0;n<t.length;n++){if(u=t[n],u<h&&++d>r)throw RangeError(p);if(u==h){for(var S=d,E=i;;E+=i){var O=E<=v?o:E>=v+a?a:E-v;if(S<O)break;var M=S-O,R=i-O;e.push(m(b(O+M%R))),S=g(M/R)}e.push(m(b(S))),v=A(d,_,x==w),d=0,++x}}++d,++h}return e.join("")};t.exports=function(t){var e,n,r=[],i=t.toLowerCase().replace(d,".").split(".");for(e=0;e<i.length;e++)n=i[e],r.push(h.test(n)?"xn--"+w(n):n);return r.join(".")}},"60da":function(t,e,n){"use strict";var r=n("83ab"),i=n("d039"),o=n("df75"),a=n("7418"),u=n("d1e7"),c=n("7b0b"),s=n("44ad"),l=Object.assign,f=Object.defineProperty;t.exports=!l||i((function(){if(r&&1!==l({b:1},l(f({},"a",{enumerable:!0,get:function(){f(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},e={},n=Symbol(),i="abcdefghijklmnopqrst";return t[n]=7,i.split("").forEach((function(t){e[t]=t})),7!=l({},t)[n]||o(l({},e)).join("")!=i}))?function(t,e){var n=c(t),i=arguments.length,l=1,f=a.f,h=u.f;while(i>l){var d,p=s(arguments[l++]),v=f?o(p).concat(f(p)):o(p),g=v.length,m=0;while(g>m)d=v[m++],r&&!h.call(p,d)||(n[d]=p[d])}return n}:l},6547:function(t,e,n){var r=n("a691"),i=n("1d80"),o=function(t){return function(e,n){var o,a,u=String(i(e)),c=r(n),s=u.length;return c<0||c>=s?t?"":void 0:(o=u.charCodeAt(c),o<55296||o>56319||c+1===s||(a=u.charCodeAt(c+1))<56320||a>57343?t?u.charAt(c):o:t?u.slice(c,c+2):a-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},"65f0":function(t,e,n){var r=n("861d"),i=n("e8b5"),o=n("b622"),a=o("species");t.exports=function(t,e){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[a],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"69f3":function(t,e,n){var r,i,o,a=n("7f9a"),u=n("da84"),c=n("861d"),s=n("9112"),l=n("5135"),f=n("f772"),h=n("d012"),d=u.WeakMap,p=function(t){return o(t)?i(t):r(t,{})},v=function(t){return function(e){var n;if(!c(e)||(n=i(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}};if(a){var g=new d,m=g.get,y=g.has,b=g.set;r=function(t,e){return b.call(g,t,e),e},i=function(t){return m.call(g,t)||{}},o=function(t){return y.call(g,t)}}else{var A=f("state");h[A]=!0,r=function(t,e){return s(t,A,e),e},i=function(t){return l(t,A)?t[A]:{}},o=function(t){return l(t,A)}}t.exports={set:r,get:i,has:o,enforce:p,getterFor:v}},"6eeb":function(t,e,n){var r=n("da84"),i=n("9112"),o=n("5135"),a=n("ce4e"),u=n("8925"),c=n("69f3"),s=c.get,l=c.enforce,f=String(String).split("String");(t.exports=function(t,e,n,u){var c=!!u&&!!u.unsafe,s=!!u&&!!u.enumerable,h=!!u&&!!u.noTargetGet;"function"==typeof n&&("string"!=typeof e||o(n,"name")||i(n,"name",e),l(n).source=f.join("string"==typeof e?e:"")),t!==r?(c?!h&&t[e]&&(s=!0):delete t[e],s?t[e]=n:i(t,e,n)):s?t[e]=n:a(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&s(this).source||u(this)}))},7156:function(t,e,n){var r=n("861d"),i=n("d2bb");t.exports=function(t,e,n){var o,a;return i&&"function"==typeof(o=e.constructor)&&o!==n&&r(a=o.prototype)&&a!==n.prototype&&i(t,a),t}},7418:function(t,e){e.f=Object.getOwnPropertySymbols},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||a(e,t,{value:o.f(t)})}},7839:function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},"7b0b":function(t,e,n){var r=n("1d80");t.exports=function(t){return Object(r(t))}},"7c73":function(t,e,n){var r,i=n("825a"),o=n("37e8"),a=n("7839"),u=n("d012"),c=n("1be4"),s=n("cc12"),l=n("f772"),f=">",h="<",d="prototype",p="script",v=l("IE_PROTO"),g=function(){},m=function(t){return h+p+f+t+h+"/"+p+f},y=function(t){t.write(m("")),t.close();var e=t.parentWindow.Object;return t=null,e},b=function(){var t,e=s("iframe"),n="java"+p+":";return e.style.display="none",c.appendChild(e),e.src=String(n),t=e.contentWindow.document,t.open(),t.write(m("document.F=Object")),t.close(),t.F},A=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(e){}A=r?y(r):b();var t=a.length;while(t--)delete A[d][a[t]];return A()};u[v]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(g[d]=i(t),n=new g,g[d]=null,n[v]=t):n=A(),void 0===e?n:o(n,e)}},"7db0":function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").find,o=n("44d2"),a=n("ae40"),u="find",c=!0,s=a(u);u in[]&&Array(1)[u]((function(){c=!1})),r({target:"Array",proto:!0,forced:c||!s},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o(u)},"7dd0":function(t,e,n){"use strict";var r=n("23e7"),i=n("9ed3"),o=n("e163"),a=n("d2bb"),u=n("d44e"),c=n("9112"),s=n("6eeb"),l=n("b622"),f=n("c430"),h=n("3f8c"),d=n("ae93"),p=d.IteratorPrototype,v=d.BUGGY_SAFARI_ITERATORS,g=l("iterator"),m="keys",y="values",b="entries",A=function(){return this};t.exports=function(t,e,n,l,d,w,x){i(n,e,l);var k,_,S,E=function(t){if(t===d&&N)return N;if(!v&&t in R)return R[t];switch(t){case m:return function(){return new n(this,t)};case y:return function(){return new n(this,t)};case b:return function(){return new n(this,t)}}return function(){return new n(this)}},O=e+" Iterator",M=!1,R=t.prototype,j=R[g]||R["@@iterator"]||d&&R[d],N=!v&&j||E(d),C="Array"==e&&R.entries||j;if(C&&(k=o(C.call(new t)),p!==Object.prototype&&k.next&&(f||o(k)===p||(a?a(k,p):"function"!=typeof k[g]&&c(k,g,A)),u(k,O,!0,!0),f&&(h[O]=A))),d==y&&j&&j.name!==y&&(M=!0,N=function(){return j.call(this)}),f&&!x||R[g]===N||c(R,g,N),h[e]=N,d)if(_={values:E(y),keys:w?N:E(m),entries:E(b)},x)for(S in _)(v||M||!(S in R))&&s(R,S,_[S]);else r({target:e,proto:!0,forced:v||M},_);return _}},"7f9a":function(t,e,n){var r=n("da84"),i=n("8925"),o=r.WeakMap;t.exports="function"===typeof o&&/native code/.test(i(o))},"825a":function(t,e,n){var r=n("861d");t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},"83ab":function(t,e,n){var r=n("d039");t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},8418:function(t,e,n){"use strict";var r=n("c04e"),i=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var a=r(e);a in t?i.f(t,a,o(0,n)):t[a]=n}},"857a":function(t,e,n){var r=n("1d80"),i=/"/g;t.exports=function(t,e,n,o){var a=String(r(t)),u="<"+e;return""!==n&&(u+=" "+n+'="'+String(o).replace(i,"&quot;")+'"'),u+">"+a+"</"+e+">"}},"861d":function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},8875:function(t,e,n){var r,i,o;(function(n,a){i=[],r=a,o="function"===typeof r?r.apply(e,i):r,void 0===o||(t.exports=o)})("undefined"!==typeof self&&self,(function(){function t(){var e=Object.getOwnPropertyDescriptor(document,"currentScript");if(!e&&"currentScript"in document&&document.currentScript)return document.currentScript;if(e&&e.get!==t&&document.currentScript)return document.currentScript;try{throw new Error}catch(d){var n,r,i,o=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,a=/@([^@]*):(\d+):(\d+)\s*$/gi,u=o.exec(d.stack)||a.exec(d.stack),c=u&&u[1]||!1,s=u&&u[2]||!1,l=document.location.href.replace(document.location.hash,""),f=document.getElementsByTagName("script");c===l&&(n=document.documentElement.outerHTML,r=new RegExp("(?:[^\\n]+?\\n){0,"+(s-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),i=n.replace(r,"$1").trim());for(var h=0;h<f.length;h++){if("interactive"===f[h].readyState)return f[h];if(f[h].src===c)return f[h];if(c===l&&f[h].innerHTML&&f[h].innerHTML.trim()===i)return f[h]}return null}}return t}))},8925:function(t,e,n){var r=n("c6cd"),i=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return i.call(t)}),t.exports=r.inspectSource},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"8bbf":function(e,n){e.exports=t},"90e3":function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},9112:function(t,e,n){var r=n("83ab"),i=n("9bf2"),o=n("5c6c");t.exports=r?function(t,e,n){return i.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},9263:function(t,e,n){"use strict";var r=n("ad6d"),i=n("9f7f"),o=RegExp.prototype.exec,a=String.prototype.replace,u=o,c=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),s=i.UNSUPPORTED_Y||i.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],f=c||l||s;f&&(u=function(t){var e,n,i,u,f=this,h=s&&f.sticky,d=r.call(f),p=f.source,v=0,g=t;return h&&(d=d.replace("y",""),-1===d.indexOf("g")&&(d+="g"),g=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(p="(?: "+p+")",g=" "+g,v++),n=new RegExp("^(?:"+p+")",d)),l&&(n=new RegExp("^"+p+"$(?!\\s)",d)),c&&(e=f.lastIndex),i=o.call(h?n:f,g),h?i?(i.input=i.input.slice(v),i[0]=i[0].slice(v),i.index=f.lastIndex,f.lastIndex+=i[0].length):f.lastIndex=0:c&&i&&(f.lastIndex=f.global?i.index+i[0].length:e),l&&i&&i.length>1&&a.call(i[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(i[u]=void 0)})),i}),t.exports=u},"94ca":function(t,e,n){var r=n("d039"),i=/#|\.prototype\./,o=function(t,e){var n=u[a(t)];return n==s||n!=c&&("function"==typeof e?r(e):!!e)},a=o.normalize=function(t){return String(t).replace(i,".").toLowerCase()},u=o.data={},c=o.NATIVE="N",s=o.POLYFILL="P";t.exports=o},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function c(t,e,n,r){var i=e&&e.prototype instanceof v?e:v,o=Object.create(i.prototype),a=new M(r||[]);return o._invoke=_(t,n,a),o}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=c;var l="suspendedStart",f="suspendedYield",h="executing",d="completed",p={};function v(){}function g(){}function m(){}var y={};y[o]=function(){return this};var b=Object.getPrototypeOf,A=b&&b(b(R([])));A&&A!==n&&r.call(A,o)&&(y=A);var w=m.prototype=v.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function k(t,e){function n(i,o,a,u){var c=s(t[i],t,o);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"===typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,u)}))}u(c.arg)}var i;function o(t,r){function o(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function _(t,e,n){var r=l;return function(i,o){if(r===h)throw new Error("Generator is already running");if(r===d){if("throw"===i)throw o;return j()}n.method=i,n.arg=o;while(1){var a=n.delegate;if(a){var u=S(a,n);if(u){if(u===p)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var c=s(t,e,n);if("normal"===c.type){if(r=n.done?d:f,c.arg===p)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=d,n.method="throw",n.arg=c.arg)}}}function S(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,S(t,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var i=s(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,p;var o=i.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,p):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function R(t){if(t){var n=t[o];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function n(){while(++i<t.length)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:j}}function j(){return{value:e,done:!0}}return g.prototype=w.constructor=m,m.constructor=g,m[u]=g.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(k.prototype),k.prototype[a]=function(){return this},t.AsyncIterator=k,t.async=function(e,n,r,i,o){void 0===o&&(o=Promise);var a=new k(c(e,n,r,i),o);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),w[u]="Generator",w[o]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=R,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return u.type="throw",u.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],u=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;O(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:R(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=r}catch(i){Function("r","regeneratorRuntime = r")(r)}},9861:function(t,e,n){"use strict";n("e260");var r=n("23e7"),i=n("d066"),o=n("0d3b"),a=n("6eeb"),u=n("e2cc"),c=n("d44e"),s=n("9ed3"),l=n("69f3"),f=n("19aa"),h=n("5135"),d=n("0366"),p=n("f5df"),v=n("825a"),g=n("861d"),m=n("7c73"),y=n("5c6c"),b=n("9a1f"),A=n("35a1"),w=n("b622"),x=i("fetch"),k=i("Headers"),_=w("iterator"),S="URLSearchParams",E=S+"Iterator",O=l.set,M=l.getterFor(S),R=l.getterFor(E),j=/\+/g,N=Array(4),C=function(t){return N[t-1]||(N[t-1]=RegExp("((?:%[\\da-f]{2}){"+t+"})","gi"))},T=function(t){try{return decodeURIComponent(t)}catch(e){return t}},B=function(t){var e=t.replace(j," "),n=4;try{return decodeURIComponent(e)}catch(r){while(n)e=e.replace(C(n--),T);return e}},L=/[!'()~]|%20/g,P={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},I=function(t){return P[t]},z=function(t){return encodeURIComponent(t).replace(L,I)},U=function(t,e){if(e){var n,r,i=e.split("&"),o=0;while(o<i.length)n=i[o++],n.length&&(r=n.split("="),t.push({key:B(r.shift()),value:B(r.join("="))}))}},D=function(t){this.entries.length=0,U(this.entries,t)},Y=function(t,e){if(t<e)throw TypeError("Not enough arguments")},G=s((function(t,e){O(this,{type:E,iterator:b(M(t).entries),kind:e})}),"Iterator",(function(){var t=R(this),e=t.kind,n=t.iterator.next(),r=n.value;return n.done||(n.value="keys"===e?r.key:"values"===e?r.value:[r.key,r.value]),n})),V=function(){f(this,V,S);var t,e,n,r,i,o,a,u,c,s=arguments.length>0?arguments[0]:void 0,l=this,d=[];if(O(l,{type:S,entries:d,updateURL:function(){},updateSearchParams:D}),void 0!==s)if(g(s))if(t=A(s),"function"===typeof t){e=t.call(s),n=e.next;while(!(r=n.call(e)).done){if(i=b(v(r.value)),o=i.next,(a=o.call(i)).done||(u=o.call(i)).done||!o.call(i).done)throw TypeError("Expected sequence with length 2");d.push({key:a.value+"",value:u.value+""})}}else for(c in s)h(s,c)&&d.push({key:c,value:s[c]+""});else U(d,"string"===typeof s?"?"===s.charAt(0)?s.slice(1):s:s+"")},F=V.prototype;u(F,{append:function(t,e){Y(arguments.length,2);var n=M(this);n.entries.push({key:t+"",value:e+""}),n.updateURL()},delete:function(t){Y(arguments.length,1);var e=M(this),n=e.entries,r=t+"",i=0;while(i<n.length)n[i].key===r?n.splice(i,1):i++;e.updateURL()},get:function(t){Y(arguments.length,1);for(var e=M(this).entries,n=t+"",r=0;r<e.length;r++)if(e[r].key===n)return e[r].value;return null},getAll:function(t){Y(arguments.length,1);for(var e=M(this).entries,n=t+"",r=[],i=0;i<e.length;i++)e[i].key===n&&r.push(e[i].value);return r},has:function(t){Y(arguments.length,1);var e=M(this).entries,n=t+"",r=0;while(r<e.length)if(e[r++].key===n)return!0;return!1},set:function(t,e){Y(arguments.length,1);for(var n,r=M(this),i=r.entries,o=!1,a=t+"",u=e+"",c=0;c<i.length;c++)n=i[c],n.key===a&&(o?i.splice(c--,1):(o=!0,n.value=u));o||i.push({key:a,value:u}),r.updateURL()},sort:function(){var t,e,n,r=M(this),i=r.entries,o=i.slice();for(i.length=0,n=0;n<o.length;n++){for(t=o[n],e=0;e<n;e++)if(i[e].key>t.key){i.splice(e,0,t);break}e===n&&i.push(t)}r.updateURL()},forEach:function(t){var e,n=M(this).entries,r=d(t,arguments.length>1?arguments[1]:void 0,3),i=0;while(i<n.length)e=n[i++],r(e.value,e.key,this)},keys:function(){return new G(this,"keys")},values:function(){return new G(this,"values")},entries:function(){return new G(this,"entries")}},{enumerable:!0}),a(F,_,F.entries),a(F,"toString",(function(){var t,e=M(this).entries,n=[],r=0;while(r<e.length)t=e[r++],n.push(z(t.key)+"="+z(t.value));return n.join("&")}),{enumerable:!0}),c(V,S),r({global:!0,forced:!o},{URLSearchParams:V}),o||"function"!=typeof x||"function"!=typeof k||r({global:!0,enumerable:!0,forced:!0},{fetch:function(t){var e,n,r,i=[t];return arguments.length>1&&(e=arguments[1],g(e)&&(n=e.body,p(n)===S&&(r=e.headers?new k(e.headers):new k,r.has("content-type")||r.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),e=m(e,{body:y(0,String(n)),headers:y(0,r)}))),i.push(e)),x.apply(this,i)}}),t.exports={URLSearchParams:V,getState:M}},9911:function(t,e,n){"use strict";var r=n("23e7"),i=n("857a"),o=n("af03");r({target:"String",proto:!0,forced:o("link")},{link:function(t){return i(this,"a","href",t)}})},"99af":function(t,e,n){"use strict";var r=n("23e7"),i=n("d039"),o=n("e8b5"),a=n("861d"),u=n("7b0b"),c=n("50c4"),s=n("8418"),l=n("65f0"),f=n("1dde"),h=n("b622"),d=n("2d00"),p=h("isConcatSpreadable"),v=9007199254740991,g="Maximum allowed index exceeded",m=d>=51||!i((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),y=f("concat"),b=function(t){if(!a(t))return!1;var e=t[p];return void 0!==e?!!e:o(t)},A=!m||!y;r({target:"Array",proto:!0,forced:A},{concat:function(t){var e,n,r,i,o,a=u(this),f=l(a,0),h=0;for(e=-1,r=arguments.length;e<r;e++)if(o=-1===e?a:arguments[e],b(o)){if(i=c(o.length),h+i>v)throw TypeError(g);for(n=0;n<i;n++,h++)n in o&&s(f,h,o[n])}else{if(h>=v)throw TypeError(g);s(f,h++,o)}return f.length=h,f}})},"9a1f":function(t,e,n){var r=n("825a"),i=n("35a1");t.exports=function(t){var e=i(t);if("function"!=typeof e)throw TypeError(String(t)+" is not iterable");return r(e.call(t))}},"9bdd":function(t,e,n){var r=n("825a");t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(a){var o=t["return"];throw void 0!==o&&r(o.call(t)),a}}},"9bf2":function(t,e,n){var r=n("83ab"),i=n("0cfb"),o=n("825a"),a=n("c04e"),u=Object.defineProperty;e.f=r?u:function(t,e,n){if(o(t),e=a(e,!0),o(n),i)try{return u(t,e,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},"9ed3":function(t,e,n){"use strict";var r=n("ae93").IteratorPrototype,i=n("7c73"),o=n("5c6c"),a=n("d44e"),u=n("3f8c"),c=function(){return this};t.exports=function(t,e,n){var s=e+" Iterator";return t.prototype=i(r,{next:o(1,n)}),a(t,s,!1,!0),u[s]=c,t}},"9f7f":function(t,e,n){"use strict";var r=n("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a15b:function(t,e,n){"use strict";var r=n("23e7"),i=n("44ad"),o=n("fc6a"),a=n("a640"),u=[].join,c=i!=Object,s=a("join",",");r({target:"Array",proto:!0,forced:c||!s},{join:function(t){return u.call(o(this),void 0===t?",":t)}})},a434:function(t,e,n){"use strict";var r=n("23e7"),i=n("23cb"),o=n("a691"),a=n("50c4"),u=n("7b0b"),c=n("65f0"),s=n("8418"),l=n("1dde"),f=n("ae40"),h=l("splice"),d=f("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,v=Math.min,g=9007199254740991,m="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!h||!d},{splice:function(t,e){var n,r,l,f,h,d,y=u(this),b=a(y.length),A=i(t,b),w=arguments.length;if(0===w?n=r=0:1===w?(n=0,r=b-A):(n=w-2,r=v(p(o(e),0),b-A)),b+n-r>g)throw TypeError(m);for(l=c(y,r),f=0;f<r;f++)h=A+f,h in y&&s(l,f,y[h]);if(l.length=r,n<r){for(f=A;f<b-r;f++)h=f+r,d=f+n,h in y?y[d]=y[h]:delete y[d];for(f=b;f>b-r+n;f--)delete y[f-1]}else if(n>r)for(f=b-r;f>A;f--)h=f+r-1,d=f+n-1,h in y?y[d]=y[h]:delete y[d];for(f=0;f<n;f++)y[f+A]=arguments[f+2];return y.length=b-r+n,l}})},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),a=n("c430"),u=n("83ab"),c=n("4930"),s=n("fdbf"),l=n("d039"),f=n("5135"),h=n("e8b5"),d=n("861d"),p=n("825a"),v=n("7b0b"),g=n("fc6a"),m=n("c04e"),y=n("5c6c"),b=n("7c73"),A=n("df75"),w=n("241c"),x=n("057f"),k=n("7418"),_=n("06cf"),S=n("9bf2"),E=n("d1e7"),O=n("9112"),M=n("6eeb"),R=n("5692"),j=n("f772"),N=n("d012"),C=n("90e3"),T=n("b622"),B=n("e538"),L=n("746f"),P=n("d44e"),I=n("69f3"),z=n("b727").forEach,U=j("hidden"),D="Symbol",Y="prototype",G=T("toPrimitive"),V=I.set,F=I.getterFor(D),X=Object[Y],J=i.Symbol,K=o("JSON","stringify"),q=_.f,Q=S.f,Z=x.f,H=E.f,W=R("symbols"),$=R("op-symbols"),tt=R("string-to-symbol-registry"),et=R("symbol-to-string-registry"),nt=R("wks"),rt=i.QObject,it=!rt||!rt[Y]||!rt[Y].findChild,ot=u&&l((function(){return 7!=b(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=q(X,e);r&&delete X[e],Q(t,e,n),r&&t!==X&&Q(X,e,r)}:Q,at=function(t,e){var n=W[t]=b(J[Y]);return V(n,{type:D,tag:t,description:e}),u||(n.description=e),n},ut=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof J},ct=function(t,e,n){t===X&&ct($,e,n),p(t);var r=m(e,!0);return p(n),f(W,r)?(n.enumerable?(f(t,U)&&t[U][r]&&(t[U][r]=!1),n=b(n,{enumerable:y(0,!1)})):(f(t,U)||Q(t,U,y(1,{})),t[U][r]=!0),ot(t,r,n)):Q(t,r,n)},st=function(t,e){p(t);var n=g(e),r=A(n).concat(pt(n));return z(r,(function(e){u&&!ft.call(n,e)||ct(t,e,n[e])})),t},lt=function(t,e){return void 0===e?b(t):st(b(t),e)},ft=function(t){var e=m(t,!0),n=H.call(this,e);return!(this===X&&f(W,e)&&!f($,e))&&(!(n||!f(this,e)||!f(W,e)||f(this,U)&&this[U][e])||n)},ht=function(t,e){var n=g(t),r=m(e,!0);if(n!==X||!f(W,r)||f($,r)){var i=q(n,r);return!i||!f(W,r)||f(n,U)&&n[U][r]||(i.enumerable=!0),i}},dt=function(t){var e=Z(g(t)),n=[];return z(e,(function(t){f(W,t)||f(N,t)||n.push(t)})),n},pt=function(t){var e=t===X,n=Z(e?$:g(t)),r=[];return z(n,(function(t){!f(W,t)||e&&!f(X,t)||r.push(W[t])})),r};if(c||(J=function(){if(this instanceof J)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=C(t),n=function(t){this===X&&n.call($,t),f(this,U)&&f(this[U],e)&&(this[U][e]=!1),ot(this,e,y(1,t))};return u&&it&&ot(X,e,{configurable:!0,set:n}),at(e,t)},M(J[Y],"toString",(function(){return F(this).tag})),M(J,"withoutSetter",(function(t){return at(C(t),t)})),E.f=ft,S.f=ct,_.f=ht,w.f=x.f=dt,k.f=pt,B.f=function(t){return at(T(t),t)},u&&(Q(J[Y],"description",{configurable:!0,get:function(){return F(this).description}}),a||M(X,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:J}),z(A(nt),(function(t){L(t)})),r({target:D,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var n=J(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ut(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!c,sham:!u},{create:lt,defineProperty:ct,defineProperties:st,getOwnPropertyDescriptor:ht}),r({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:dt,getOwnPropertySymbols:pt}),r({target:"Object",stat:!0,forced:l((function(){k.f(1)}))},{getOwnPropertySymbols:function(t){return k.f(v(t))}}),K){var vt=!c||l((function(){var t=J();return"[null]"!=K([t])||"{}"!=K({a:t})||"{}"!=K(Object(t))}));r({target:"JSON",stat:!0,forced:vt},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(d(e)||void 0!==t)&&!ut(t))return h(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ut(e))return e}),i[1]=e,K.apply(null,i)}})}J[Y][G]||O(J[Y],G,J[Y].valueOf),P(J,D),N[U]=!0},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},a691:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},a9e3:function(t,e,n){"use strict";var r=n("83ab"),i=n("da84"),o=n("94ca"),a=n("6eeb"),u=n("5135"),c=n("c6b6"),s=n("7156"),l=n("c04e"),f=n("d039"),h=n("7c73"),d=n("241c").f,p=n("06cf").f,v=n("9bf2").f,g=n("58a8").trim,m="Number",y=i[m],b=y.prototype,A=c(h(b))==m,w=function(t){var e,n,r,i,o,a,u,c,s=l(t,!1);if("string"==typeof s&&s.length>2)if(s=g(s),e=s.charCodeAt(0),43===e||45===e){if(n=s.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(s.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+s}for(o=s.slice(2),a=o.length,u=0;u<a;u++)if(c=o.charCodeAt(u),c<48||c>i)return NaN;return parseInt(o,r)}return+s};if(o(m,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var x,k=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof k&&(A?f((function(){b.valueOf.call(n)})):c(n)!=m)?s(new y(w(e)),n,k):w(e)},_=r?d(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;_.length>S;S++)u(y,x=_[S])&&!u(k,x)&&v(k,x,p(y,x));k.prototype=b,b.constructor=k,a(i,m,k)}},ab13:function(t,e,n){var r=n("b622"),i=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[i]=!1,"/./"[t](e)}catch(r){}}return!1}},ac1f:function(t,e,n){"use strict";var r=n("23e7"),i=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},ae40:function(t,e,n){var r=n("83ab"),i=n("d039"),o=n("5135"),a=Object.defineProperty,u={},c=function(t){throw t};t.exports=function(t,e){if(o(u,t))return u[t];e||(e={});var n=[][t],s=!!o(e,"ACCESSORS")&&e.ACCESSORS,l=o(e,0)?e[0]:c,f=o(e,1)?e[1]:void 0;return u[t]=!!n&&!i((function(){if(s&&!r)return!0;var t={length:-1};s?a(t,1,{enumerable:!0,get:c}):t[1]=1,n.call(t,l,f)}))}},ae93:function(t,e,n){"use strict";var r,i,o,a=n("e163"),u=n("9112"),c=n("5135"),s=n("b622"),l=n("c430"),f=s("iterator"),h=!1,d=function(){return this};[].keys&&(o=[].keys(),"next"in o?(i=a(a(o)),i!==Object.prototype&&(r=i)):h=!0),void 0==r&&(r={}),l||c(r,f)||u(r,f,d),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:h}},af03:function(t,e,n){var r=n("d039");t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},b041:function(t,e,n){"use strict";var r=n("00ee"),i=n("f5df");t.exports=r?{}.toString:function(){return"[object "+i(this)+"]"}},b076:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA6ElEQVRIS+3UsU4CQRSF4Y834B3sTSBWVlT2FlJpbUNjYqWF0FDb0FBjg4mFT2BjqAwVJja8imbIQNYFMrMFBYRNbiaZPXP/OedutmbHT23H/R0ByYQPK6I+HpKeKwqKEf1igE6pRwPnCGszrjN8Y45XfG3jlgFB94w71HGPx4xLDxFqDbQJEPr18FRq/INQU5zGOilp2tHRansboHjuI85mssHJBa5xU3j3D5ICBCfdjIiuMC7ozpZxpQDLuKpCwjxuw+EcQBXIGy6jk4WLXEAupIUXjPCOz8P6VWR8LNUlx4iSme1/RH9DnykZwQm1/AAAAABJRU5ErkJggg=="},b0c0:function(t,e,n){var r=n("83ab"),i=n("9bf2").f,o=Function.prototype,a=o.toString,u=/^\s*function ([^ (]*)/,c="name";r&&!(c in o)&&i(o,c,{configurable:!0,get:function(){try{return a.call(this).match(u)[1]}catch(t){return""}}})},b575:function(t,e,n){var r,i,o,a,u,c,s,l,f=n("da84"),h=n("06cf").f,d=n("c6b6"),p=n("2cf4").set,v=n("1cdc"),g=f.MutationObserver||f.WebKitMutationObserver,m=f.process,y=f.Promise,b="process"==d(m),A=h(f,"queueMicrotask"),w=A&&A.value;w||(r=function(){var t,e;b&&(t=m.domain)&&t.exit();while(i){e=i.fn,i=i.next;try{e()}catch(n){throw i?a():o=void 0,n}}o=void 0,t&&t.enter()},b?a=function(){m.nextTick(r)}:g&&!v?(u=!0,c=document.createTextNode(""),new g(r).observe(c,{characterData:!0}),a=function(){c.data=u=!u}):y&&y.resolve?(s=y.resolve(void 0),l=s.then,a=function(){l.call(s,r)}):a=function(){p.call(f,r)}),t.exports=w||function(t){var e={fn:t,next:void 0};o&&(o.next=e),i||(i=e,a()),o=e}},b622:function(t,e,n){var r=n("da84"),i=n("5692"),o=n("5135"),a=n("90e3"),u=n("4930"),c=n("fdbf"),s=i("wks"),l=r.Symbol,f=c?l:l&&l.withoutSetter||a;t.exports=function(t){return o(s,t)||(u&&o(l,t)?s[t]=l[t]:s[t]=f("Symbol."+t)),s[t]}},b727:function(t,e,n){var r=n("0366"),i=n("44ad"),o=n("7b0b"),a=n("50c4"),u=n("65f0"),c=[].push,s=function(t){var e=1==t,n=2==t,s=3==t,l=4==t,f=6==t,h=5==t||f;return function(d,p,v,g){for(var m,y,b=o(d),A=i(b),w=r(p,v,3),x=a(A.length),k=0,_=g||u,S=e?_(d,x):n?_(d,0):void 0;x>k;k++)if((h||k in A)&&(m=A[k],y=w(m,k,b),t))if(e)S[k]=y;else if(y)switch(t){case 3:return!0;case 5:return m;case 6:return k;case 2:c.call(S,m)}else if(l)return!1;return f?-1:s||l?l:S}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6)}},c04e:function(t,e,n){var r=n("861d");t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},c430:function(t,e){t.exports=!1},c6b6:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},c6cd:function(t,e,n){var r=n("da84"),i=n("ce4e"),o="__core-js_shared__",a=r[o]||i(o,{});t.exports=a},c8ba:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}t.exports=n},ca84:function(t,e,n){var r=n("5135"),i=n("fc6a"),o=n("4d64").indexOf,a=n("d012");t.exports=function(t,e){var n,u=i(t),c=0,s=[];for(n in u)!r(a,n)&&r(u,n)&&s.push(n);while(e.length>c)r(u,n=e[c++])&&(~o(s,n)||s.push(n));return s}},caad:function(t,e,n){"use strict";var r=n("23e7"),i=n("4d64").includes,o=n("44d2"),a=n("ae40"),u=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!u},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},cc12:function(t,e,n){var r=n("da84"),i=n("861d"),o=r.document,a=i(o)&&i(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},cdf9:function(t,e,n){var r=n("825a"),i=n("861d"),o=n("f069");t.exports=function(t,e){if(r(t),i(e)&&e.constructor===t)return e;var n=o.f(t),a=n.resolve;return a(e),n.promise}},ce4e:function(t,e,n){var r=n("da84"),i=n("9112");t.exports=function(t,e){try{i(r,t,e)}catch(n){r[t]=e}return e}},d012:function(t,e){t.exports={}},d039:function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},d066:function(t,e,n){var r=n("428f"),i=n("da84"),o=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?o(r[t])||o(i[t]):r[t]&&r[t][e]||i[t]&&i[t][e]}},d1e7:function(t,e,n){"use strict";var r={}.propertyIsEnumerable,i=Object.getOwnPropertyDescriptor,o=i&&!r.call({1:2},1);e.f=o?function(t){var e=i(this,t);return!!e&&e.enumerable}:r},d28b:function(t,e,n){var r=n("746f");r("iterator")},d2bb:function(t,e,n){var r=n("825a"),i=n("3bbe");t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set,t.call(n,[]),e=n instanceof Array}catch(o){}return function(n,o){return r(n),i(o),e?t.call(n,o):n.__proto__=o,n}}():void 0)},d3b7:function(t,e,n){var r=n("00ee"),i=n("6eeb"),o=n("b041");r||i(Object.prototype,"toString",o,{unsafe:!0})},d44e:function(t,e,n){var r=n("9bf2").f,i=n("5135"),o=n("b622"),a=o("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,a)&&r(t,a,{configurable:!0,value:e})}},d767:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAGdJREFUSMdjYBgFBAAjker+k6ufidY+GLVg8FpQzgBJOTCMCyCrqSfVcnRL8GGSDSfFErINJ8YSig3HZwnVDMdmCdGGM5NgwVEGSNlzkIGBoZHarh+8AFdx+58kU/CYR/OiYhQMPAAAjmEtvC5aR3YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDMtMDlUMTI6MjQ6MzMrMDA6MDBhAr59AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTAzLTA5VDEyOjI0OjMzKzAwOjAwEF8GwQAAACh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vdG1wL21hZ2ljay16aWlQenltMcMsFE8AAAAASUVORK5CYII="},d784:function(t,e,n){"use strict";n("ac1f");var r=n("6eeb"),i=n("d039"),o=n("b622"),a=n("9263"),u=n("9112"),c=o("species"),s=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),f=o("replace"),h=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),d=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var p=o(t),v=!i((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),g=v&&!i((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!v||!g||"replace"===t&&(!s||!l||h)||"split"===t&&!d){var m=/./[p],y=n(p,""[t],(function(t,e,n,r,i){return e.exec===a?v&&!i?{done:!0,value:m.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:h}),b=y[0],A=y[1];r(String.prototype,t,b),r(RegExp.prototype,p,2==e?function(t,e){return A.call(t,this,e)}:function(t){return A.call(t,this)})}f&&u(RegExp.prototype[p],"sham",!0)}},d81d:function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").map,o=n("1dde"),a=n("ae40"),u=o("map"),c=a("map");r({target:"Array",proto:!0,forced:!u||!c},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},da84:function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n("c8ba"))},ddb0:function(t,e,n){var r=n("da84"),i=n("fdbc"),o=n("e260"),a=n("9112"),u=n("b622"),c=u("iterator"),s=u("toStringTag"),l=o.values;for(var f in i){var h=r[f],d=h&&h.prototype;if(d){if(d[c]!==l)try{a(d,c,l)}catch(v){d[c]=l}if(d[s]||a(d,s,f),i[f])for(var p in o)if(d[p]!==o[p])try{a(d,p,o[p])}catch(v){d[p]=o[p]}}}},df75:function(t,e,n){var r=n("ca84"),i=n("7839");t.exports=Object.keys||function(t){return r(t,i)}},e01a:function(t,e,n){"use strict";var r=n("23e7"),i=n("83ab"),o=n("da84"),a=n("5135"),u=n("861d"),c=n("9bf2").f,s=n("e893"),l=o.Symbol;if(i&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var f={},h=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof h?new l(t):void 0===t?l():l(t);return""===t&&(f[e]=!0),e};s(h,l);var d=h.prototype=l.prototype;d.constructor=h;var p=d.toString,v="Symbol(test)"==String(l("test")),g=/^Symbol\((.*)\)[^)]+$/;c(d,"description",{configurable:!0,get:function(){var t=u(this)?this.valueOf():this,e=p.call(t);if(a(f,t))return"";var n=v?e.slice(7,-1):e.replace(g,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:h})}},e163:function(t,e,n){var r=n("5135"),i=n("7b0b"),o=n("f772"),a=n("e177"),u=o("IE_PROTO"),c=Object.prototype;t.exports=a?Object.getPrototypeOf:function(t){return t=i(t),r(t,u)?t[u]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},e177:function(t,e,n){var r=n("d039");t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},e260:function(t,e,n){"use strict";var r=n("fc6a"),i=n("44d2"),o=n("3f8c"),a=n("69f3"),u=n("7dd0"),c="Array Iterator",s=a.set,l=a.getterFor(c);t.exports=u(Array,"Array",(function(t,e){s(this,{type:c,target:r(t),index:0,kind:e})}),(function(){var t=l(this),e=t.target,n=t.kind,r=t.index++;return!e||r>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}}),"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},e2cc:function(t,e,n){var r=n("6eeb");t.exports=function(t,e,n){for(var i in e)r(t,i,e[i],n);return t}},e538:function(t,e,n){var r=n("b622");e.f=r},e667:function(t,e){t.exports=function(t){try{return{error:!1,value:t()}}catch(e){return{error:!0,value:e}}}},e6cf:function(t,e,n){"use strict";var r,i,o,a,u=n("23e7"),c=n("c430"),s=n("da84"),l=n("d066"),f=n("fea9"),h=n("6eeb"),d=n("e2cc"),p=n("d44e"),v=n("2626"),g=n("861d"),m=n("1c0b"),y=n("19aa"),b=n("c6b6"),A=n("8925"),w=n("2266"),x=n("1c7e"),k=n("4840"),_=n("2cf4").set,S=n("b575"),E=n("cdf9"),O=n("44de"),M=n("f069"),R=n("e667"),j=n("69f3"),N=n("94ca"),C=n("b622"),T=n("2d00"),B=C("species"),L="Promise",P=j.get,I=j.set,z=j.getterFor(L),U=f,D=s.TypeError,Y=s.document,G=s.process,V=l("fetch"),F=M.f,X=F,J="process"==b(G),K=!!(Y&&Y.createEvent&&s.dispatchEvent),q="unhandledrejection",Q="rejectionhandled",Z=0,H=1,W=2,$=1,tt=2,et=N(L,(function(){var t=A(U)!==String(U);if(!t){if(66===T)return!0;if(!J&&"function"!=typeof PromiseRejectionEvent)return!0}if(c&&!U.prototype["finally"])return!0;if(T>=51&&/native code/.test(U))return!1;var e=U.resolve(1),n=function(t){t((function(){}),(function(){}))},r=e.constructor={};return r[B]=n,!(e.then((function(){}))instanceof n)})),nt=et||!x((function(t){U.all(t)["catch"]((function(){}))})),rt=function(t){var e;return!(!g(t)||"function"!=typeof(e=t.then))&&e},it=function(t,e,n){if(!e.notified){e.notified=!0;var r=e.reactions;S((function(){var i=e.value,o=e.state==H,a=0;while(r.length>a){var u,c,s,l=r[a++],f=o?l.ok:l.fail,h=l.resolve,d=l.reject,p=l.domain;try{f?(o||(e.rejection===tt&&ct(t,e),e.rejection=$),!0===f?u=i:(p&&p.enter(),u=f(i),p&&(p.exit(),s=!0)),u===l.promise?d(D("Promise-chain cycle")):(c=rt(u))?c.call(u,h,d):h(u)):d(i)}catch(v){p&&!s&&p.exit(),d(v)}}e.reactions=[],e.notified=!1,n&&!e.rejection&&at(t,e)}))}},ot=function(t,e,n){var r,i;K?(r=Y.createEvent("Event"),r.promise=e,r.reason=n,r.initEvent(t,!1,!0),s.dispatchEvent(r)):r={promise:e,reason:n},(i=s["on"+t])?i(r):t===q&&O("Unhandled promise rejection",n)},at=function(t,e){_.call(s,(function(){var n,r=e.value,i=ut(e);if(i&&(n=R((function(){J?G.emit("unhandledRejection",r,t):ot(q,t,r)})),e.rejection=J||ut(e)?tt:$,n.error))throw n.value}))},ut=function(t){return t.rejection!==$&&!t.parent},ct=function(t,e){_.call(s,(function(){J?G.emit("rejectionHandled",t):ot(Q,t,e.value)}))},st=function(t,e,n,r){return function(i){t(e,n,i,r)}},lt=function(t,e,n,r){e.done||(e.done=!0,r&&(e=r),e.value=n,e.state=W,it(t,e,!0))},ft=function(t,e,n,r){if(!e.done){e.done=!0,r&&(e=r);try{if(t===n)throw D("Promise can't be resolved itself");var i=rt(n);i?S((function(){var r={done:!1};try{i.call(n,st(ft,t,r,e),st(lt,t,r,e))}catch(o){lt(t,r,o,e)}})):(e.value=n,e.state=H,it(t,e,!1))}catch(o){lt(t,{done:!1},o,e)}}};et&&(U=function(t){y(this,U,L),m(t),r.call(this);var e=P(this);try{t(st(ft,this,e),st(lt,this,e))}catch(n){lt(this,e,n)}},r=function(t){I(this,{type:L,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:Z,value:void 0})},r.prototype=d(U.prototype,{then:function(t,e){var n=z(this),r=F(k(this,U));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=J?G.domain:void 0,n.parent=!0,n.reactions.push(r),n.state!=Z&&it(this,n,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r,e=P(t);this.promise=t,this.resolve=st(ft,t,e),this.reject=st(lt,t,e)},M.f=F=function(t){return t===U||t===o?new i(t):X(t)},c||"function"!=typeof f||(a=f.prototype.then,h(f.prototype,"then",(function(t,e){var n=this;return new U((function(t,e){a.call(n,t,e)})).then(t,e)}),{unsafe:!0}),"function"==typeof V&&u({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return E(U,V.apply(s,arguments))}}))),u({global:!0,wrap:!0,forced:et},{Promise:U}),p(U,L,!1,!0),v(L),o=l(L),u({target:L,stat:!0,forced:et},{reject:function(t){var e=F(this);return e.reject.call(void 0,t),e.promise}}),u({target:L,stat:!0,forced:c||et},{resolve:function(t){return E(c&&this===o?U:this,t)}}),u({target:L,stat:!0,forced:nt},{all:function(t){var e=this,n=F(e),r=n.resolve,i=n.reject,o=R((function(){var n=m(e.resolve),o=[],a=0,u=1;w(t,(function(t){var c=a++,s=!1;o.push(void 0),u++,n.call(e,t).then((function(t){s||(s=!0,o[c]=t,--u||r(o))}),i)})),--u||r(o)}));return o.error&&i(o.value),n.promise},race:function(t){var e=this,n=F(e),r=n.reject,i=R((function(){var i=m(e.resolve);w(t,(function(t){i.call(e,t).then(n.resolve,r)}))}));return i.error&&r(i.value),n.promise}})},e893:function(t,e,n){var r=n("5135"),i=n("56ef"),o=n("06cf"),a=n("9bf2");t.exports=function(t,e){for(var n=i(e),u=a.f,c=o.f,s=0;s<n.length;s++){var l=n[s];r(t,l)||u(t,l,c(e,l))}}},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},e8c1:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAWxJREFUSMfNlU1OwlAUhb8y1cIGdORAcKKwATGxYaKrcWKCuBYjIwvGsQMnGBLdgbADMYiwARz0Nh6hvLYaEm5y0/b+nPN6+u4rbJjNzTNbYd0rSiPwgAbQBoYSHwK3lvP+Sn4A9EWWVd4HKnnBT4CpAbwDTeAI2DKvAleWmwNfQD3PymPwEPAdtT7QEZJyGrgnsoQZ9fWE5DmtpyGy6Mp3gS4wM38A9iVfBEbWG7gI2lbUXAAfs/xxPy0XW8viNy6CoRUdSqzL6h0USl3VYoMk4MVGlWfmIJhKnZ+Q//ck67GR+HELkvT4mdY9qXlyEDzKfdwzELylN3i165nELoFJAvgYuJDnc7u+uF7ZtU1DIs2nwB2wI/kS8GG9py4CHbQO2Qft3np6WXoqRGMfkxQdtSUBn/B7+JxWF5IR0RDVgG3zGnAtskyA46zgsZWJzpa047qXZ+VJ+gZE4z8Q0DeLBVk0z2Ob909eu30D0eKD2ON1XwcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDItMjFUMDc6MTg6MDYrMDA6MDDOhs0DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTAyLTIxVDA3OjE4OjA2KzAwOjAwv9t1vwAAACh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vdG1wL21hZ2ljay1SM05jR3BZZD+JYfIAAAAASUVORK5CYII="},e95a:function(t,e,n){var r=n("b622"),i=n("3f8c"),o=r("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||a[o]===t)}},f069:function(t,e,n){"use strict";var r=n("1c0b"),i=function(t){var e,n;this.promise=new t((function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r})),this.resolve=r(e),this.reject=r(n)};t.exports.f=function(t){return new i(t)}},f5df:function(t,e,n){var r=n("00ee"),i=n("c6b6"),o=n("b622"),a=o("toStringTag"),u="Arguments"==i(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(n){}};t.exports=r?i:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=c(e=Object(t),a))?n:u?i(e):"Object"==(r=i(e))&&"function"==typeof e.callee?"Arguments":r}},f772:function(t,e,n){var r=n("5692"),i=n("90e3"),o=r("keys");t.exports=function(t){return o[t]||(o[t]=i(t))}},fa08:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABv0lEQVRYw+2Xvy5EQRTGf2eJRkOJVifR+BPJimp5ApXV8goaxZY8BxvvgEpWsgWNxCOgVClWyKcwK3Pvnbt2x90Ncr/kJjNnZs73zTn33pkDJUr8DJY3IGkLWATGnOnazFoxJJLWgarrvgN3ZnY+iINTZdGI3bWkRsDfaWhuJScy9VjyAVCXtJk2jgcmLnnta6Cbpqh0eWuPXdtP3zJw0XNlKryNosPynf9KhM+hohT0LwRNjJA/wxUStDxCQRmuhCBJdcD/WT0MQcSj1950nF8wSQfAJLCWEvMMLJjZU5FqJM0A98C0Z74A2sALgTOmI6klaWUI0emKWnUcnTR53ldm9LgJFISgf5N0xOcVYxHY8sZGmbJz4I7Pq0licj0Vwb2iwyJpP8WReKkTKTOzJsnTd65oQcCsHxnHGRbkcJOzs4qkXfdYrD2F27QhdB96zVm8A5x0+YBmpL0n1687y8YHmNt0OxVw9gN7MYLMLBj2Qe3f4U+krOO1q+6sg+Lqsqo31Oln8YbCaMTuOqcuU6gMyqTMzK6AQ+AtVkCfaJpZpgTqVUrPA9vAlDNdmtllZIRqQM11X4B2SEyJEkXgAzPcc0xJNGzyAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTI3VDA4OjAxOjExKzAwOjAwZ5m2KgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0yN1QwODowMToxMSswMDowMBbEDpYAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"},fb15:function(t,e,n){"use strict";if(n.r(e),"undefined"!==typeof window){var r=window.document.currentScript,i=n("8875");r=i(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:i});var o=r&&r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);o&&(n.p=o[1])}var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"mindmap",style:t.mmStyle,attrs:{id:"mindmap"}},[n("svg",{ref:"svg",class:t.svgClass,attrs:{tabindex:"0"}},[n("g",{ref:"content",attrs:{id:"content"}}),n("rect",{directives:[{name:"show",rawName:"v-show",value:t.showSelectedBox,expression:"showSelectedBox"}],ref:"selectedBox",attrs:{id:"selectedBox",width:t.seleBox.width,height:t.seleBox.height,transform:"translate("+t.seleBox.x+","+t.seleBox.y+")"}})]),n("div",{ref:"dummy",attrs:{id:"dummy"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showContextMenu,expression:"showContextMenu"}],ref:"menu",style:{top:t.contextMenuY+"px",left:t.contextMenuX+"px"},attrs:{id:"menu",tabindex:"0"},on:{blur:function(e){t.showContextMenu=!1}}},t._l(t.contextMenuItems,(function(e,r){return n("div",{key:r,class:"menu-item "+(e.disabled?"disabled":""),on:{click:function(n){!e.disabled&&t.clickMenu(e.name)}}},[n("div",[t._v(t._s(e.title))])])})),0),n("div",{staticClass:"buttonList right-bottom"},[n("button",{directives:[{name:"show",rawName:"v-show",value:t.gps,expression:"gps"}],ref:"gps",staticClass:"icon",attrs:{type:"button"},on:{click:function(e){return t.makeCenter()}}},[n("i",{staticClass:"gps"})]),n("button",{directives:[{name:"show",rawName:"v-show",value:t.fitView,expression:"fitView"}],ref:"fitView",staticClass:"icon",attrs:{type:"button"},on:{click:function(e){return t.fitContent()}}},[n("i",{staticClass:"fitView"})]),n("button",{directives:[{name:"show",rawName:"v-show",value:t.download,expression:"download"}],ref:"download",staticClass:"icon",attrs:{type:"button"},on:{click:function(e){t.showPopUps=!0}}},[n("i",{staticClass:"download"})])]),n("div",{staticClass:"buttonList top-right"},[n("button",{directives:[{name:"show",rawName:"v-show",value:t.showUndo,expression:"showUndo"}],ref:"undo",staticClass:"icon",class:{disabled:!t.canUndo},attrs:{type:"button"},on:{click:function(e){return t.undo()}}},[n("i",{staticClass:"undo"})]),n("button",{directives:[{name:"show",rawName:"v-show",value:t.showUndo,expression:"showUndo"}],ref:"redo",staticClass:"icon",class:{disabled:!t.canRedo},attrs:{type:"button"},on:{click:function(e){return t.redo()}}},[n("i",{staticClass:"redo"})])]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showPopUps,expression:"showPopUps"}],staticClass:"pop-ups"},[n("div",{staticClass:"layer"}),n("div",{staticClass:"content"},[n("div",{staticClass:"exportTo"},[n("div",{staticClass:"optionList"},t._l(t.optionList,(function(e,r){return n("div",{key:r,class:"option "+(r===t.selectedOption?"select":"")+" "+(e.disabled?"disabled":""),on:{click:function(n){!e.disabled&&(t.selectedOption=r)}}},[n("div",{class:"icon "+e.color},[n("i",{class:e.icon})]),n("div",{staticClass:"text"},[t._v(t._s(e.title))])])})),0),n("div",{staticClass:"optionTip"},[t._v(t._s(t.optionTip))]),n("div",{staticClass:"action"},[n("div",{staticClass:"spacer"}),n("button",{staticClass:"cancel",on:{click:function(e){t.showPopUps=!1}}},[t._v("取消")]),n("button",{on:{click:function(e){t.exportTo(),t.showPopUps=!1}}},[t._v("导出")])])])])])])},u=[];n("99af"),n("4de4"),n("caad"),n("e260"),n("a15b"),n("b0c0"),n("a9e3"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("1276"),n("9911"),n("ddb0"),n("2b3d"),n("96cf"),n("e6cf");function c(t,e,n,r,i,o,a){try{var u=t[o](a),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(r,i)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function a(t){c(o,r,i,a,u,"next",t)}function u(t){c(o,r,i,a,u,"throw",t)}a(void 0)}))}}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),t}n("131a");function d(t,e){return d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},d(t,e)}function p(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}n("4ae1"),n("3410");function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}n("25f0");function g(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}n("a4d3"),n("e01a"),n("d28b");function m(t){return m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t,e){return!e||"object"!==m(e)&&"function"!==typeof e?y(t):e}function A(t){var e=g();return function(){var n,r=v(t);if(e){var i=v(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return b(this,n)}}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function w(t,e,n,r){var i,o=arguments.length,a=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var u=t.length-1;u>=0;u--)(i=t[u])&&(a=(o<3?i(a):o>3?i(e,n,a):i(e,n))||a);return o>3&&a&&Object.defineProperty(e,n,a),a}function x(t,e){if("object"===typeof Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(t,e)}var k=n("8bbf"),_=n.n(k);
/**
  * vue-class-component v7.2.5
  * (c) 2015-present Evan You
  * @license MIT
  */
function S(t){return S="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function E(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function O(t){return M(t)||R(t)||j()}function M(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function R(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function j(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function N(){return"undefined"!==typeof Reflect&&Reflect.defineMetadata&&Reflect.getOwnMetadataKeys}function C(t,e){T(t,e),Object.getOwnPropertyNames(e.prototype).forEach((function(n){T(t.prototype,e.prototype,n)})),Object.getOwnPropertyNames(e).forEach((function(n){T(t,e,n)}))}function T(t,e,n){var r=n?Reflect.getOwnMetadataKeys(e,n):Reflect.getOwnMetadataKeys(e);r.forEach((function(r){var i=n?Reflect.getOwnMetadata(r,e,n):Reflect.getOwnMetadata(r,e);n?Reflect.defineMetadata(r,i,t,n):Reflect.defineMetadata(r,i,t)}))}var B={__proto__:[]},L=B instanceof Array;function P(t){return function(e,n,r){var i="function"===typeof e?e:e.constructor;i.__decorators__||(i.__decorators__=[]),"number"!==typeof r&&(r=void 0),i.__decorators__.push((function(e){return t(e,n,r)}))}}function I(t){var e=S(t);return null==t||"object"!==e&&"function"!==e}function z(t,e){var n=e.prototype._init;e.prototype._init=function(){var e=this,n=Object.getOwnPropertyNames(t);if(t.$options.props)for(var r in t.$options.props)t.hasOwnProperty(r)||n.push(r);n.forEach((function(n){Object.defineProperty(e,n,{get:function(){return t[n]},set:function(e){t[n]=e},configurable:!0})}))};var r=new e;e.prototype._init=n;var i={};return Object.keys(r).forEach((function(t){void 0!==r[t]&&(i[t]=r[t])})),i}var U=["data","beforeCreate","created","beforeMount","mounted","beforeDestroy","destroyed","beforeUpdate","updated","activated","deactivated","render","errorCaptured","serverPrefetch"];function D(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.name=e.name||t._componentTag||t.name;var n=t.prototype;Object.getOwnPropertyNames(n).forEach((function(t){if("constructor"!==t)if(U.indexOf(t)>-1)e[t]=n[t];else{var r=Object.getOwnPropertyDescriptor(n,t);void 0!==r.value?"function"===typeof r.value?(e.methods||(e.methods={}))[t]=r.value:(e.mixins||(e.mixins=[])).push({data:function(){return E({},t,r.value)}}):(r.get||r.set)&&((e.computed||(e.computed={}))[t]={get:r.get,set:r.set})}})),(e.mixins||(e.mixins=[])).push({data:function(){return z(this,t)}});var r=t.__decorators__;r&&(r.forEach((function(t){return t(e)})),delete t.__decorators__);var i=Object.getPrototypeOf(t.prototype),o=i instanceof _.a?i.constructor:_.a,a=o.extend(e);return G(a,t,o),N()&&C(a,t),a}var Y={prototype:!0,arguments:!0,callee:!0,caller:!0};function G(t,e,n){Object.getOwnPropertyNames(e).forEach((function(r){if(!Y[r]){var i=Object.getOwnPropertyDescriptor(t,r);if(!i||i.configurable){var o=Object.getOwnPropertyDescriptor(e,r);if(!L){if("cid"===r)return;var a=Object.getOwnPropertyDescriptor(n,r);if(!I(o.value)&&a&&a.value===o.value)return}0,Object.defineProperty(t,r,o)}}}))}function V(t){return"function"===typeof t?D(t):function(e){return D(e,t)}}V.registerHooks=function(t){U.push.apply(U,O(t))};var F=V;var X="undefined"!==typeof Reflect&&"undefined"!==typeof Reflect.getMetadata;function J(t,e,n){if(X&&!Array.isArray(t)&&"function"!==typeof t&&"undefined"===typeof t.type){var r=Reflect.getMetadata("design:type",e,n);r!==Object&&(t.type=r)}}function K(t,e){return void 0===e&&(e={}),function(n,r){J(e,n,r),P((function(n,r){(n.props||(n.props={}))[r]=e,n.model={prop:r,event:t||r}}))(n,r)}}function q(t){return void 0===t&&(t={}),function(e,n){J(t,e,n),P((function(e,n){(e.props||(e.props={}))[n]=t}))(e,n)}}function Q(t,e){void 0===e&&(e={});var n=e.deep,r=void 0!==n&&n,i=e.immediate,o=void 0!==i&&i;return P((function(e,n){"object"!==typeof e.watch&&(e.watch=Object.create(null));var i=e.watch;"object"!==typeof i[t]||Array.isArray(i[t])?"undefined"===typeof i[t]&&(i[t]=[]):i[t]=[i[t]],i[t].push({handler:n,deep:r,immediate:o})}))}function Z(){}var H=function(t){return null==t?Z:function(){return this.querySelector(t)}},W=function(t){"function"!==typeof t&&(t=H(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var o,a,u=e[i],c=u.length,s=r[i]=new Array(c),l=0;l<c;++l)(o=u[l])&&(a=t.call(o,o.__data__,l,u))&&("__data__"in o&&(a.__data__=o.__data__),s[l]=a);return new ze(r,this._parents)};function $(){return[]}var tt=function(t){return null==t?$:function(){return this.querySelectorAll(t)}},et=function(t){"function"!==typeof t&&(t=tt(t));for(var e=this._groups,n=e.length,r=[],i=[],o=0;o<n;++o)for(var a,u=e[o],c=u.length,s=0;s<c;++s)(a=u[s])&&(r.push(t.call(a,a.__data__,s,u)),i.push(a));return new ze(r,i)},nt=function(t){return function(){return this.matches(t)}},rt=function(t){"function"!==typeof t&&(t=nt(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var o,a=e[i],u=a.length,c=r[i]=[],s=0;s<u;++s)(o=a[s])&&t.call(o,o.__data__,s,a)&&c.push(o);return new ze(r,this._parents)},it=function(t){return new Array(t.length)},ot=function(){return new ze(this._enter||this._groups.map(it),this._parents)};function at(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}at.prototype={constructor:at,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var ut=function(t){return function(){return t}},ct="$";function st(t,e,n,r,i,o){for(var a,u=0,c=e.length,s=o.length;u<s;++u)(a=e[u])?(a.__data__=o[u],r[u]=a):n[u]=new at(t,o[u]);for(;u<c;++u)(a=e[u])&&(i[u]=a)}function lt(t,e,n,r,i,o,a){var u,c,s,l={},f=e.length,h=o.length,d=new Array(f);for(u=0;u<f;++u)(c=e[u])&&(d[u]=s=ct+a.call(c,c.__data__,u,e),s in l?i[u]=c:l[s]=c);for(u=0;u<h;++u)s=ct+a.call(t,o[u],u,o),(c=l[s])?(r[u]=c,c.__data__=o[u],l[s]=null):n[u]=new at(t,o[u]);for(u=0;u<f;++u)(c=e[u])&&l[d[u]]===c&&(i[u]=c)}var ft=function(t,e){if(!t)return d=new Array(this.size()),s=-1,this.each((function(t){d[++s]=t})),d;var n=e?lt:st,r=this._parents,i=this._groups;"function"!==typeof t&&(t=ut(t));for(var o=i.length,a=new Array(o),u=new Array(o),c=new Array(o),s=0;s<o;++s){var l=r[s],f=i[s],h=f.length,d=t.call(l,l&&l.__data__,s,r),p=d.length,v=u[s]=new Array(p),g=a[s]=new Array(p),m=c[s]=new Array(h);n(l,f,v,g,m,d,e);for(var y,b,A=0,w=0;A<p;++A)if(y=v[A]){A>=w&&(w=A+1);while(!(b=g[w])&&++w<p);y._next=b||null}}return a=new ze(a,r),a._enter=u,a._exit=c,a},ht=function(){return new ze(this._exit||this._groups.map(it),this._parents)},dt=function(t,e,n){var r=this.enter(),i=this,o=this.exit();return r="function"===typeof t?t(r):r.append(t+""),null!=e&&(i=e(i)),null==n?o.remove():n(o),r&&i?r.merge(i).order():i},pt=function(t){for(var e=this._groups,n=t._groups,r=e.length,i=n.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var c,s=e[u],l=n[u],f=s.length,h=a[u]=new Array(f),d=0;d<f;++d)(c=s[d]||l[d])&&(h[d]=c);for(;u<r;++u)a[u]=e[u];return new ze(a,this._parents)},vt=function(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r,i=t[e],o=i.length-1,a=i[o];--o>=0;)(r=i[o])&&(a&&4^r.compareDocumentPosition(a)&&a.parentNode.insertBefore(r,a),a=r);return this},gt=function(t){function e(e,n){return e&&n?t(e.__data__,n.__data__):!e-!n}t||(t=mt);for(var n=this._groups,r=n.length,i=new Array(r),o=0;o<r;++o){for(var a,u=n[o],c=u.length,s=i[o]=new Array(c),l=0;l<c;++l)(a=u[l])&&(s[l]=a);s.sort(e)}return new ze(i,this._parents).order()};function mt(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}var yt=function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},bt=function(){var t=new Array(this.size()),e=-1;return this.each((function(){t[++e]=this})),t},At=function(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],i=0,o=r.length;i<o;++i){var a=r[i];if(a)return a}return null},wt=function(){var t=0;return this.each((function(){++t})),t},xt=function(){return!this.node()},kt=function(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var i,o=e[n],a=0,u=o.length;a<u;++a)(i=o[a])&&t.call(i,i.__data__,a,o);return this},_t="http://www.w3.org/1999/xhtml",St={svg:"http://www.w3.org/2000/svg",xhtml:_t,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},Et=function(t){var e=t+="",n=e.indexOf(":");return n>=0&&"xmlns"!==(e=t.slice(0,n))&&(t=t.slice(n+1)),St.hasOwnProperty(e)?{space:St[e],local:t}:t};function Ot(t){return function(){this.removeAttribute(t)}}function Mt(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Rt(t,e){return function(){this.setAttribute(t,e)}}function jt(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function Nt(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n)}}function Ct(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}var Tt=function(t,e){var n=Et(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((null==e?n.local?Mt:Ot:"function"===typeof e?n.local?Ct:Nt:n.local?jt:Rt)(n,e))},Bt=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView};function Lt(t){return function(){this.style.removeProperty(t)}}function Pt(t,e,n){return function(){this.style.setProperty(t,e,n)}}function It(t,e,n){return function(){var r=e.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}var zt=function(t,e,n){return arguments.length>1?this.each((null==e?Lt:"function"===typeof e?It:Pt)(t,e,null==n?"":n)):Ut(this.node(),t)};function Ut(t,e){return t.style.getPropertyValue(e)||Bt(t).getComputedStyle(t,null).getPropertyValue(e)}function Dt(t){return function(){delete this[t]}}function Yt(t,e){return function(){this[t]=e}}function Gt(t,e){return function(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n}}var Vt=function(t,e){return arguments.length>1?this.each((null==e?Dt:"function"===typeof e?Gt:Yt)(t,e)):this.node()[t]};function Ft(t){return t.trim().split(/^|\s+/)}function Xt(t){return t.classList||new Jt(t)}function Jt(t){this._node=t,this._names=Ft(t.getAttribute("class")||"")}function Kt(t,e){var n=Xt(t),r=-1,i=e.length;while(++r<i)n.add(e[r])}function qt(t,e){var n=Xt(t),r=-1,i=e.length;while(++r<i)n.remove(e[r])}function Qt(t){return function(){Kt(this,t)}}function Zt(t){return function(){qt(this,t)}}function Ht(t,e){return function(){(e.apply(this,arguments)?Kt:qt)(this,t)}}Jt.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var Wt=function(t,e){var n=Ft(t+"");if(arguments.length<2){var r=Xt(this.node()),i=-1,o=n.length;while(++i<o)if(!r.contains(n[i]))return!1;return!0}return this.each(("function"===typeof e?Ht:e?Qt:Zt)(n,e))};function $t(){this.textContent=""}function te(t){return function(){this.textContent=t}}function ee(t){return function(){var e=t.apply(this,arguments);this.textContent=null==e?"":e}}var ne=function(t){return arguments.length?this.each(null==t?$t:("function"===typeof t?ee:te)(t)):this.node().textContent};function re(){this.innerHTML=""}function ie(t){return function(){this.innerHTML=t}}function oe(t){return function(){var e=t.apply(this,arguments);this.innerHTML=null==e?"":e}}var ae=function(t){return arguments.length?this.each(null==t?re:("function"===typeof t?oe:ie)(t)):this.node().innerHTML};function ue(){this.nextSibling&&this.parentNode.appendChild(this)}var ce=function(){return this.each(ue)};function se(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}var le=function(){return this.each(se)};function fe(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===_t&&e.documentElement.namespaceURI===_t?e.createElement(t):e.createElementNS(n,t)}}function he(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}var de=function(t){var e=Et(t);return(e.local?he:fe)(e)},pe=function(t){var e="function"===typeof t?t:de(t);return this.select((function(){return this.appendChild(e.apply(this,arguments))}))};function ve(){return null}var ge=function(t,e){var n="function"===typeof t?t:de(t),r=null==e?ve:"function"===typeof e?e:H(e);return this.select((function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)}))};function me(){var t=this.parentNode;t&&t.removeChild(this)}var ye=function(){return this.each(me)};function be(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function Ae(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}var we=function(t){return this.select(t?Ae:be)},xe=function(t){return arguments.length?this.property("__data__",t):this.node().__data__},ke={},_e=null;if("undefined"!==typeof document){var Se=document.documentElement;"onmouseenter"in Se||(ke={mouseenter:"mouseover",mouseleave:"mouseout"})}function Ee(t,e,n){return t=Oe(t,e,n),function(e){var n=e.relatedTarget;n&&(n===this||8&n.compareDocumentPosition(this))||t.call(this,e)}}function Oe(t,e,n){return function(r){var i=_e;_e=r;try{t.call(this,this.__data__,e,n)}finally{_e=i}}}function Me(t){return t.trim().split(/^|\s+/).map((function(t){var e="",n=t.indexOf(".");return n>=0&&(e=t.slice(n+1),t=t.slice(0,n)),{type:t,name:e}}))}function Re(t){return function(){var e=this.__on;if(e){for(var n,r=0,i=-1,o=e.length;r<o;++r)n=e[r],t.type&&n.type!==t.type||n.name!==t.name?e[++i]=n:this.removeEventListener(n.type,n.listener,n.capture);++i?e.length=i:delete this.__on}}}function je(t,e,n){var r=ke.hasOwnProperty(t.type)?Ee:Oe;return function(i,o,a){var u,c=this.__on,s=r(e,o,a);if(c)for(var l=0,f=c.length;l<f;++l)if((u=c[l]).type===t.type&&u.name===t.name)return this.removeEventListener(u.type,u.listener,u.capture),this.addEventListener(u.type,u.listener=s,u.capture=n),void(u.value=e);this.addEventListener(t.type,s,n),u={type:t.type,name:t.name,value:e,listener:s,capture:n},c?c.push(u):this.__on=[u]}}var Ne=function(t,e,n){var r,i,o=Me(t+""),a=o.length;if(!(arguments.length<2)){for(u=e?je:Re,null==n&&(n=!1),r=0;r<a;++r)this.each(u(o[r],e,n));return this}var u=this.node().__on;if(u)for(var c,s=0,l=u.length;s<l;++s)for(r=0,c=u[s];r<a;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value};function Ce(t,e,n,r){var i=_e;t.sourceEvent=_e,_e=t;try{return e.apply(n,r)}finally{_e=i}}function Te(t,e,n){var r=Bt(t),i=r.CustomEvent;"function"===typeof i?i=new i(e,n):(i=r.document.createEvent("Event"),n?(i.initEvent(e,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(e,!1,!1)),t.dispatchEvent(i)}function Be(t,e){return function(){return Te(this,t,e)}}function Le(t,e){return function(){return Te(this,t,e.apply(this,arguments))}}var Pe=function(t,e){return this.each(("function"===typeof e?Le:Be)(t,e))},Ie=[null];function ze(t,e){this._groups=t,this._parents=e}function Ue(){return new ze([[document.documentElement]],Ie)}ze.prototype=Ue.prototype={constructor:ze,select:W,selectAll:et,filter:rt,data:ft,enter:ot,exit:ht,join:dt,merge:pt,order:vt,sort:gt,call:yt,nodes:bt,node:At,size:wt,empty:xt,each:kt,attr:Tt,style:zt,property:Vt,classed:Wt,text:ne,html:ae,raise:ce,lower:le,append:pe,insert:ge,remove:ye,clone:we,datum:xe,on:Ne,dispatch:Pe};var De=Ue,Ye={value:function(){}};function Ge(){for(var t,e=0,n=arguments.length,r={};e<n;++e){if(!(t=arguments[e]+"")||t in r||/[\s.]/.test(t))throw new Error("illegal type: "+t);r[t]=[]}return new Ve(r)}function Ve(t){this._=t}function Fe(t,e){return t.trim().split(/^|\s+/).map((function(t){var n="",r=t.indexOf(".");if(r>=0&&(n=t.slice(r+1),t=t.slice(0,r)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:n}}))}function Xe(t,e){for(var n,r=0,i=t.length;r<i;++r)if((n=t[r]).name===e)return n.value}function Je(t,e,n){for(var r=0,i=t.length;r<i;++r)if(t[r].name===e){t[r]=Ye,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=n&&t.push({name:e,value:n}),t}Ve.prototype=Ge.prototype={constructor:Ve,on:function(t,e){var n,r=this._,i=Fe(t+"",r),o=-1,a=i.length;if(!(arguments.length<2)){if(null!=e&&"function"!==typeof e)throw new Error("invalid callback: "+e);while(++o<a)if(n=(t=i[o]).type)r[n]=Je(r[n],t.name,e);else if(null==e)for(n in r)r[n]=Je(r[n],t.name,null);return this}while(++o<a)if((n=(t=i[o]).type)&&(n=Xe(r[n],t.name)))return n},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new Ve(t)},call:function(t,e){if((n=arguments.length-2)>0)for(var n,r,i=new Array(n),o=0;o<n;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(r=this._[t],o=0,n=r.length;o<n;++o)r[o].value.apply(e,i)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(e,n)}};var Ke,qe,Qe=Ge,Ze=0,He=0,We=0,$e=1e3,tn=0,en=0,nn=0,rn="object"===typeof performance&&performance.now?performance:Date,on="object"===typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function an(){return en||(on(un),en=rn.now()+nn)}function un(){en=0}function cn(){this._call=this._time=this._next=null}function sn(t,e,n){var r=new cn;return r.restart(t,e,n),r}function ln(){an(),++Ze;var t,e=Ke;while(e)(t=en-e._time)>=0&&e._call.call(null,t),e=e._next;--Ze}function fn(){en=(tn=rn.now())+nn,Ze=He=0;try{ln()}finally{Ze=0,dn(),en=0}}function hn(){var t=rn.now(),e=t-tn;e>$e&&(nn-=e,tn=t)}function dn(){var t,e,n=Ke,r=1/0;while(n)n._call?(r>n._time&&(r=n._time),t=n,n=n._next):(e=n._next,n._next=null,n=t?t._next=e:Ke=e);qe=t,pn(r)}function pn(t){if(!Ze){He&&(He=clearTimeout(He));var e=t-en;e>24?(t<1/0&&(He=setTimeout(fn,t-rn.now()-nn)),We&&(We=clearInterval(We))):(We||(tn=rn.now(),We=setInterval(hn,$e)),Ze=1,on(fn))}}cn.prototype=sn.prototype={constructor:cn,restart:function(t,e,n){if("function"!==typeof t)throw new TypeError("callback is not a function");n=(null==n?an():+n)+(null==e?0:+e),this._next||qe===this||(qe?qe._next=this:Ke=this,qe=this),this._call=t,this._time=n,pn()},stop:function(){this._call&&(this._call=null,this._time=1/0,pn())}};var vn=function(t,e,n){var r=new cn;return e=null==e?0:+e,r.restart((function(n){r.stop(),t(n+e)}),e,n),r},gn=Qe("start","end","cancel","interrupt"),mn=[],yn=0,bn=1,An=2,wn=3,xn=4,kn=5,_n=6,Sn=function(t,e,n,r,i,o){var a=t.__transition;if(a){if(n in a)return}else t.__transition={};Rn(t,n,{name:e,index:r,group:i,on:gn,tween:mn,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:yn})};function En(t,e){var n=Mn(t,e);if(n.state>yn)throw new Error("too late; already scheduled");return n}function On(t,e){var n=Mn(t,e);if(n.state>wn)throw new Error("too late; already running");return n}function Mn(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function Rn(t,e,n){var r,i=t.__transition;function o(t){n.state=bn,n.timer.restart(a,n.delay,n.time),n.delay<=t&&a(t-n.delay)}function a(o){var s,l,f,h;if(n.state!==bn)return c();for(s in i)if(h=i[s],h.name===n.name){if(h.state===wn)return vn(a);h.state===xn?(h.state=_n,h.timer.stop(),h.on.call("interrupt",t,t.__data__,h.index,h.group),delete i[s]):+s<e&&(h.state=_n,h.timer.stop(),h.on.call("cancel",t,t.__data__,h.index,h.group),delete i[s])}if(vn((function(){n.state===wn&&(n.state=xn,n.timer.restart(u,n.delay,n.time),u(o))})),n.state=An,n.on.call("start",t,t.__data__,n.index,n.group),n.state===An){for(n.state=wn,r=new Array(f=n.tween.length),s=0,l=-1;s<f;++s)(h=n.tween[s].value.call(t,t.__data__,n.index,n.group))&&(r[++l]=h);r.length=l+1}}function u(e){var i=e<n.duration?n.ease.call(null,e/n.duration):(n.timer.restart(c),n.state=kn,1),o=-1,a=r.length;while(++o<a)r[o].call(t,i);n.state===kn&&(n.on.call("end",t,t.__data__,n.index,n.group),c())}function c(){for(var r in n.state=_n,n.timer.stop(),delete i[e],i)return;delete t.__transition}i[e]=n,n.timer=sn(o,0,n.time)}var jn,Nn,Cn,Tn,Bn=function(t,e){var n,r,i,o=t.__transition,a=!0;if(o){for(i in e=null==e?null:e+"",o)(n=o[i]).name===e?(r=n.state>An&&n.state<kn,n.state=_n,n.timer.stop(),n.on.call(r?"interrupt":"cancel",t,t.__data__,n.index,n.group),delete o[i]):a=!1;a&&delete t.__transition}},Ln=function(t){return this.each((function(){Bn(this,t)}))},Pn=function(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}},In=180/Math.PI,zn={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1},Un=function(t,e,n,r,i,o){var a,u,c;return(a=Math.sqrt(t*t+e*e))&&(t/=a,e/=a),(c=t*n+e*r)&&(n-=t*c,r-=e*c),(u=Math.sqrt(n*n+r*r))&&(n/=u,r/=u,c/=u),t*r<e*n&&(t=-t,e=-e,c=-c,a=-a),{translateX:i,translateY:o,rotate:Math.atan2(e,t)*In,skewX:Math.atan(c)*In,scaleX:a,scaleY:u}};function Dn(t){return"none"===t?zn:(jn||(jn=document.createElement("DIV"),Nn=document.documentElement,Cn=document.defaultView),jn.style.transform=t,t=Cn.getComputedStyle(Nn.appendChild(jn),null).getPropertyValue("transform"),Nn.removeChild(jn),t=t.slice(7,-1).split(","),Un(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5]))}function Yn(t){return null==t?zn:(Tn||(Tn=document.createElementNS("http://www.w3.org/2000/svg","g")),Tn.setAttribute("transform",t),(t=Tn.transform.baseVal.consolidate())?(t=t.matrix,Un(t.a,t.b,t.c,t.d,t.e,t.f)):zn)}function Gn(t,e,n,r){function i(t){return t.length?t.pop()+" ":""}function o(t,r,i,o,a,u){if(t!==i||r!==o){var c=a.push("translate(",null,e,null,n);u.push({i:c-4,x:Pn(t,i)},{i:c-2,x:Pn(r,o)})}else(i||o)&&a.push("translate("+i+e+o+n)}function a(t,e,n,o){t!==e?(t-e>180?e+=360:e-t>180&&(t+=360),o.push({i:n.push(i(n)+"rotate(",null,r)-2,x:Pn(t,e)})):e&&n.push(i(n)+"rotate("+e+r)}function u(t,e,n,o){t!==e?o.push({i:n.push(i(n)+"skewX(",null,r)-2,x:Pn(t,e)}):e&&n.push(i(n)+"skewX("+e+r)}function c(t,e,n,r,o,a){if(t!==n||e!==r){var u=o.push(i(o)+"scale(",null,",",null,")");a.push({i:u-4,x:Pn(t,n)},{i:u-2,x:Pn(e,r)})}else 1===n&&1===r||o.push(i(o)+"scale("+n+","+r+")")}return function(e,n){var r=[],i=[];return e=t(e),n=t(n),o(e.translateX,e.translateY,n.translateX,n.translateY,r,i),a(e.rotate,n.rotate,r,i),u(e.skewX,n.skewX,r,i),c(e.scaleX,e.scaleY,n.scaleX,n.scaleY,r,i),e=n=null,function(t){var e,n=-1,o=i.length;while(++n<o)r[(e=i[n]).i]=e.x(t);return r.join("")}}}var Vn=Gn(Dn,"px, ","px)","deg)"),Fn=Gn(Yn,", ",")",")");function Xn(t,e){var n,r;return function(){var i=On(this,t),o=i.tween;if(o!==n){r=n=o;for(var a=0,u=r.length;a<u;++a)if(r[a].name===e){r=r.slice(),r.splice(a,1);break}}i.tween=r}}function Jn(t,e,n){var r,i;if("function"!==typeof n)throw new Error;return function(){var o=On(this,t),a=o.tween;if(a!==r){i=(r=a).slice();for(var u={name:e,value:n},c=0,s=i.length;c<s;++c)if(i[c].name===e){i[c]=u;break}c===s&&i.push(u)}o.tween=i}}var Kn=function(t,e){var n=this._id;if(t+="",arguments.length<2){for(var r,i=Mn(this.node(),n).tween,o=0,a=i.length;o<a;++o)if((r=i[o]).name===t)return r.value;return null}return this.each((null==e?Xn:Jn)(n,t,e))};function qn(t,e,n){var r=t._id;return t.each((function(){var t=On(this,r);(t.value||(t.value={}))[e]=n.apply(this,arguments)})),function(t){return Mn(t,r).value[e]}}var Qn=function(t,e,n){t.prototype=e.prototype=n,n.constructor=t};function Zn(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function Hn(){}var Wn=.7,$n=1/Wn,tr="\\s*([+-]?\\d+)\\s*",er="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",nr="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",rr=/^#([0-9a-f]{3,8})$/,ir=new RegExp("^rgb\\("+[tr,tr,tr]+"\\)$"),or=new RegExp("^rgb\\("+[nr,nr,nr]+"\\)$"),ar=new RegExp("^rgba\\("+[tr,tr,tr,er]+"\\)$"),ur=new RegExp("^rgba\\("+[nr,nr,nr,er]+"\\)$"),cr=new RegExp("^hsl\\("+[er,nr,nr]+"\\)$"),sr=new RegExp("^hsla\\("+[er,nr,nr,er]+"\\)$"),lr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function fr(){return this.rgb().formatHex()}function hr(){return _r(this).formatHsl()}function dr(){return this.rgb().formatRgb()}function pr(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=rr.exec(t))?(n=e[1].length,e=parseInt(e[1],16),6===n?vr(e):3===n?new br(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===n?gr(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===n?gr(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=ir.exec(t))?new br(e[1],e[2],e[3],1):(e=or.exec(t))?new br(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=ar.exec(t))?gr(e[1],e[2],e[3],e[4]):(e=ur.exec(t))?gr(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=cr.exec(t))?kr(e[1],e[2]/100,e[3]/100,1):(e=sr.exec(t))?kr(e[1],e[2]/100,e[3]/100,e[4]):lr.hasOwnProperty(t)?vr(lr[t]):"transparent"===t?new br(NaN,NaN,NaN,0):null}function vr(t){return new br(t>>16&255,t>>8&255,255&t,1)}function gr(t,e,n,r){return r<=0&&(t=e=n=NaN),new br(t,e,n,r)}function mr(t){return t instanceof Hn||(t=pr(t)),t?(t=t.rgb(),new br(t.r,t.g,t.b,t.opacity)):new br}function yr(t,e,n,r){return 1===arguments.length?mr(t):new br(t,e,n,null==r?1:r)}function br(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}function Ar(){return"#"+xr(this.r)+xr(this.g)+xr(this.b)}function wr(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}function xr(t){return t=Math.max(0,Math.min(255,Math.round(t)||0)),(t<16?"0":"")+t.toString(16)}function kr(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new Er(t,e,n,r)}function _r(t){if(t instanceof Er)return new Er(t.h,t.s,t.l,t.opacity);if(t instanceof Hn||(t=pr(t)),!t)return new Er;if(t instanceof Er)return t;t=t.rgb();var e=t.r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),o=Math.max(e,n,r),a=NaN,u=o-i,c=(o+i)/2;return u?(a=e===o?(n-r)/u+6*(n<r):n===o?(r-e)/u+2:(e-n)/u+4,u/=c<.5?o+i:2-o-i,a*=60):u=c>0&&c<1?0:a,new Er(a,u,c,t.opacity)}function Sr(t,e,n,r){return 1===arguments.length?_r(t):new Er(t,e,n,null==r?1:r)}function Er(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}function Or(t,e,n){return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)}function Mr(t,e,n,r,i){var o=t*t,a=o*t;return((1-3*t+3*o-a)*e+(4-6*o+3*a)*n+(1+3*t+3*o-3*a)*r+a*i)/6}Qn(Hn,pr,{copy:function(t){return Object.assign(new this.constructor,this,t)},displayable:function(){return this.rgb().displayable()},hex:fr,formatHex:fr,formatHsl:hr,formatRgb:dr,toString:dr}),Qn(br,yr,Zn(Hn,{brighter:function(t){return t=null==t?$n:Math.pow($n,t),new br(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?Wn:Math.pow(Wn,t),new br(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Ar,formatHex:Ar,formatRgb:wr,toString:wr})),Qn(Er,Sr,Zn(Hn,{brighter:function(t){return t=null==t?$n:Math.pow($n,t),new Er(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?Wn:Math.pow(Wn,t),new Er(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,i=2*n-r;return new br(Or(t>=240?t-240:t+120,i,r),Or(t,i,r),Or(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")")}}));var Rr=function(t){var e=t.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,e-1):Math.floor(n*e),i=t[r],o=t[r+1],a=r>0?t[r-1]:2*i-o,u=r<e-1?t[r+2]:2*o-i;return Mr((n-r/e)*e,a,i,o,u)}},jr=function(t){var e=t.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*e),i=t[(r+e-1)%e],o=t[r%e],a=t[(r+1)%e],u=t[(r+2)%e];return Mr((n-r/e)*e,i,o,a,u)}},Nr=function(t){return function(){return t}};function Cr(t,e){return function(n){return t+n*e}}function Tr(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n)}}function Br(t){return 1===(t=+t)?Lr:function(e,n){return n-e?Tr(e,n,t):Nr(isNaN(e)?n:e)}}function Lr(t,e){var n=e-t;return n?Cr(t,n):Nr(isNaN(t)?e:t)}var Pr=function t(e){var n=Br(e);function r(t,e){var r=n((t=yr(t)).r,(e=yr(e)).r),i=n(t.g,e.g),o=n(t.b,e.b),a=Lr(t.opacity,e.opacity);return function(e){return t.r=r(e),t.g=i(e),t.b=o(e),t.opacity=a(e),t+""}}return r.gamma=t,r}(1);function Ir(t){return function(e){var n,r,i=e.length,o=new Array(i),a=new Array(i),u=new Array(i);for(n=0;n<i;++n)r=yr(e[n]),o[n]=r.r||0,a[n]=r.g||0,u[n]=r.b||0;return o=t(o),a=t(a),u=t(u),r.opacity=1,function(t){return r.r=o(t),r.g=a(t),r.b=u(t),r+""}}}Ir(Rr),Ir(jr);var zr=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ur=new RegExp(zr.source,"g");function Dr(t){return function(){return t}}function Yr(t){return function(e){return t(e)+""}}var Gr=function(t,e){var n,r,i,o=zr.lastIndex=Ur.lastIndex=0,a=-1,u=[],c=[];t+="",e+="";while((n=zr.exec(t))&&(r=Ur.exec(e)))(i=r.index)>o&&(i=e.slice(o,i),u[a]?u[a]+=i:u[++a]=i),(n=n[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,c.push({i:a,x:Pn(n,r)})),o=Ur.lastIndex;return o<e.length&&(i=e.slice(o),u[a]?u[a]+=i:u[++a]=i),u.length<2?c[0]?Yr(c[0].x):Dr(e):(e=c.length,function(t){for(var n,r=0;r<e;++r)u[(n=c[r]).i]=n.x(t);return u.join("")})},Vr=function(t,e){var n;return("number"===typeof e?Pn:e instanceof pr?Pr:(n=pr(e))?(e=n,Pr):Gr)(t,e)};function Fr(t){return function(){this.removeAttribute(t)}}function Xr(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Jr(t,e,n){var r,i,o=n+"";return function(){var a=this.getAttribute(t);return a===o?null:a===r?i:i=e(r=a,n)}}function Kr(t,e,n){var r,i,o=n+"";return function(){var a=this.getAttributeNS(t.space,t.local);return a===o?null:a===r?i:i=e(r=a,n)}}function qr(t,e,n){var r,i,o;return function(){var a,u,c=n(this);if(null!=c)return a=this.getAttribute(t),u=c+"",a===u?null:a===r&&u===i?o:(i=u,o=e(r=a,c));this.removeAttribute(t)}}function Qr(t,e,n){var r,i,o;return function(){var a,u,c=n(this);if(null!=c)return a=this.getAttributeNS(t.space,t.local),u=c+"",a===u?null:a===r&&u===i?o:(i=u,o=e(r=a,c));this.removeAttributeNS(t.space,t.local)}}var Zr=function(t,e){var n=Et(t),r="transform"===n?Fn:Vr;return this.attrTween(t,"function"===typeof e?(n.local?Qr:qr)(n,r,qn(this,"attr."+t,e)):null==e?(n.local?Xr:Fr)(n):(n.local?Kr:Jr)(n,r,e))};function Hr(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function Wr(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function $r(t,e){var n,r;function i(){var i=e.apply(this,arguments);return i!==r&&(n=(r=i)&&Wr(t,i)),n}return i._value=e,i}function ti(t,e){var n,r;function i(){var i=e.apply(this,arguments);return i!==r&&(n=(r=i)&&Hr(t,i)),n}return i._value=e,i}var ei=function(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(null==e)return this.tween(n,null);if("function"!==typeof e)throw new Error;var r=Et(t);return this.tween(n,(r.local?$r:ti)(r,e))};function ni(t,e){return function(){En(this,t).delay=+e.apply(this,arguments)}}function ri(t,e){return e=+e,function(){En(this,t).delay=e}}var ii=function(t){var e=this._id;return arguments.length?this.each(("function"===typeof t?ni:ri)(e,t)):Mn(this.node(),e).delay};function oi(t,e){return function(){On(this,t).duration=+e.apply(this,arguments)}}function ai(t,e){return e=+e,function(){On(this,t).duration=e}}var ui=function(t){var e=this._id;return arguments.length?this.each(("function"===typeof t?oi:ai)(e,t)):Mn(this.node(),e).duration};function ci(t,e){if("function"!==typeof e)throw new Error;return function(){On(this,t).ease=e}}var si=function(t){var e=this._id;return arguments.length?this.each(ci(e,t)):Mn(this.node(),e).ease},li=function(t){"function"!==typeof t&&(t=nt(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var o,a=e[i],u=a.length,c=r[i]=[],s=0;s<u;++s)(o=a[s])&&t.call(o,o.__data__,s,a)&&c.push(o);return new Ui(r,this._parents,this._name,this._id)},fi=function(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,r=e.length,i=n.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var c,s=e[u],l=n[u],f=s.length,h=a[u]=new Array(f),d=0;d<f;++d)(c=s[d]||l[d])&&(h[d]=c);for(;u<r;++u)a[u]=e[u];return new Ui(a,this._parents,this._name,this._id)};function hi(t){return(t+"").trim().split(/^|\s+/).every((function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||"start"===t}))}function di(t,e,n){var r,i,o=hi(e)?En:On;return function(){var a=o(this,t),u=a.on;u!==r&&(i=(r=u).copy()).on(e,n),a.on=i}}var pi=function(t,e){var n=this._id;return arguments.length<2?Mn(this.node(),n).on.on(t):this.each(di(n,t,e))};function vi(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}var gi=function(){return this.on("end.remove",vi(this._id))},mi=function(t){var e=this._name,n=this._id;"function"!==typeof t&&(t=H(t));for(var r=this._groups,i=r.length,o=new Array(i),a=0;a<i;++a)for(var u,c,s=r[a],l=s.length,f=o[a]=new Array(l),h=0;h<l;++h)(u=s[h])&&(c=t.call(u,u.__data__,h,s))&&("__data__"in u&&(c.__data__=u.__data__),f[h]=c,Sn(f[h],e,n,h,f,Mn(u,n)));return new Ui(o,this._parents,e,n)},yi=function(t){var e=this._name,n=this._id;"function"!==typeof t&&(t=tt(t));for(var r=this._groups,i=r.length,o=[],a=[],u=0;u<i;++u)for(var c,s=r[u],l=s.length,f=0;f<l;++f)if(c=s[f]){for(var h,d=t.call(c,c.__data__,f,s),p=Mn(c,n),v=0,g=d.length;v<g;++v)(h=d[v])&&Sn(h,e,n,v,d,p);o.push(d),a.push(c)}return new Ui(o,a,e,n)},bi=De.prototype.constructor,Ai=function(){return new bi(this._groups,this._parents)};function wi(t,e){var n,r,i;return function(){var o=Ut(this,t),a=(this.style.removeProperty(t),Ut(this,t));return o===a?null:o===n&&a===r?i:i=e(n=o,r=a)}}function xi(t){return function(){this.style.removeProperty(t)}}function ki(t,e,n){var r,i,o=n+"";return function(){var a=Ut(this,t);return a===o?null:a===r?i:i=e(r=a,n)}}function _i(t,e,n){var r,i,o;return function(){var a=Ut(this,t),u=n(this),c=u+"";return null==u&&(this.style.removeProperty(t),c=u=Ut(this,t)),a===c?null:a===r&&c===i?o:(i=c,o=e(r=a,u))}}function Si(t,e){var n,r,i,o,a="style."+e,u="end."+a;return function(){var c=On(this,t),s=c.on,l=null==c.value[a]?o||(o=xi(e)):void 0;s===n&&i===l||(r=(n=s).copy()).on(u,i=l),c.on=r}}var Ei=function(t,e,n){var r="transform"===(t+="")?Vn:Vr;return null==e?this.styleTween(t,wi(t,r)).on("end.style."+t,xi(t)):"function"===typeof e?this.styleTween(t,_i(t,r,qn(this,"style."+t,e))).each(Si(this._id,t)):this.styleTween(t,ki(t,r,e),n).on("end.style."+t,null)};function Oi(t,e,n){return function(r){this.style.setProperty(t,e.call(this,r),n)}}function Mi(t,e,n){var r,i;function o(){var o=e.apply(this,arguments);return o!==i&&(r=(i=o)&&Oi(t,o,n)),r}return o._value=e,o}var Ri=function(t,e,n){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==e)return this.tween(r,null);if("function"!==typeof e)throw new Error;return this.tween(r,Mi(t,e,null==n?"":n))};function ji(t){return function(){this.textContent=t}}function Ni(t){return function(){var e=t(this);this.textContent=null==e?"":e}}var Ci=function(t){return this.tween("text","function"===typeof t?Ni(qn(this,"text",t)):ji(null==t?"":t+""))};function Ti(t){return function(e){this.textContent=t.call(this,e)}}function Bi(t){var e,n;function r(){var r=t.apply(this,arguments);return r!==n&&(e=(n=r)&&Ti(r)),e}return r._value=t,r}var Li=function(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(null==t)return this.tween(e,null);if("function"!==typeof t)throw new Error;return this.tween(e,Bi(t))},Pi=function(){for(var t=this._name,e=this._id,n=Yi(),r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],c=u.length,s=0;s<c;++s)if(a=u[s]){var l=Mn(a,e);Sn(a,t,n,s,u,{time:l.time+l.delay+l.duration,delay:0,duration:l.duration,ease:l.ease})}return new Ui(r,this._parents,t,n)},Ii=function(){var t,e,n=this,r=n._id,i=n.size();return new Promise((function(o,a){var u={value:a},c={value:function(){0===--i&&o()}};n.each((function(){var n=On(this,r),i=n.on;i!==t&&(e=(t=i).copy(),e._.cancel.push(u),e._.interrupt.push(u),e._.end.push(c)),n.on=e}))}))},zi=0;function Ui(t,e,n,r){this._groups=t,this._parents=e,this._name=n,this._id=r}function Di(t){return De().transition(t)}function Yi(){return++zi}var Gi=De.prototype;function Vi(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}Ui.prototype=Di.prototype={constructor:Ui,select:mi,selectAll:yi,filter:li,merge:fi,selection:Ai,transition:Pi,call:Gi.call,nodes:Gi.nodes,node:Gi.node,size:Gi.size,empty:Gi.empty,each:Gi.each,on:pi,attr:Zr,attrTween:ei,style:Ei,styleTween:Ri,text:Ci,textTween:Li,remove:gi,tween:Kn,delay:ii,duration:ui,ease:si,end:Ii};var Fi={time:null,delay:0,duration:250,ease:Vi};function Xi(t,e){var n;while(!(n=t.__transition)||!(n=n[e]))if(!(t=t.parentNode))return Fi.time=an(),Fi;return n}var Ji=function(t){var e,n;t instanceof Ui?(e=t._id,t=t._name):(e=Yi(),(n=Fi).time=an(),t=null==t?null:t+"");for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],c=u.length,s=0;s<c;++s)(a=u[s])&&Sn(a,t,e,s,u,n||Xi(a,e));return new Ui(r,this._parents,t,e)};De.prototype.interrupt=Ln,De.prototype.transition=Ji;var Ki=Math.PI,qi=2*Ki,Qi=1e-6,Zi=qi-Qi;function Hi(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function Wi(){return new Hi}Hi.prototype=Wi.prototype={constructor:Hi,moveTo:function(t,e){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,e){this._+="L"+(this._x1=+t)+","+(this._y1=+e)},quadraticCurveTo:function(t,e,n,r){this._+="Q"+ +t+","+ +e+","+(this._x1=+n)+","+(this._y1=+r)},bezierCurveTo:function(t,e,n,r,i,o){this._+="C"+ +t+","+ +e+","+ +n+","+ +r+","+(this._x1=+i)+","+(this._y1=+o)},arcTo:function(t,e,n,r,i){t=+t,e=+e,n=+n,r=+r,i=+i;var o=this._x1,a=this._y1,u=n-t,c=r-e,s=o-t,l=a-e,f=s*s+l*l;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=e);else if(f>Qi)if(Math.abs(l*u-c*s)>Qi&&i){var h=n-o,d=r-a,p=u*u+c*c,v=h*h+d*d,g=Math.sqrt(p),m=Math.sqrt(f),y=i*Math.tan((Ki-Math.acos((p+f-v)/(2*g*m)))/2),b=y/m,A=y/g;Math.abs(b-1)>Qi&&(this._+="L"+(t+b*s)+","+(e+b*l)),this._+="A"+i+","+i+",0,0,"+ +(l*h>s*d)+","+(this._x1=t+A*u)+","+(this._y1=e+A*c)}else this._+="L"+(this._x1=t)+","+(this._y1=e);else;},arc:function(t,e,n,r,i,o){t=+t,e=+e,n=+n,o=!!o;var a=n*Math.cos(r),u=n*Math.sin(r),c=t+a,s=e+u,l=1^o,f=o?r-i:i-r;if(n<0)throw new Error("negative radius: "+n);null===this._x1?this._+="M"+c+","+s:(Math.abs(this._x1-c)>Qi||Math.abs(this._y1-s)>Qi)&&(this._+="L"+c+","+s),n&&(f<0&&(f=f%qi+qi),f>Zi?this._+="A"+n+","+n+",0,1,"+l+","+(t-a)+","+(e-u)+"A"+n+","+n+",0,1,"+l+","+(this._x1=c)+","+(this._y1=s):f>Qi&&(this._+="A"+n+","+n+",0,"+ +(f>=Ki)+","+l+","+(this._x1=t+n*Math.cos(i))+","+(this._y1=e+n*Math.sin(i))))},rect:function(t,e,n,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)+"h"+ +n+"v"+ +r+"h"+-n+"Z"},toString:function(){return this._}};var $i=Wi,to=Array.prototype.slice,eo=function(t){return function(){return t}};function no(t){return t[0]}function ro(t){return t[1]}function io(t){return t.source}function oo(t){return t.target}function ao(t){var e=io,n=oo,r=no,i=ro,o=null;function a(){var a,u=to.call(arguments),c=e.apply(this,u),s=n.apply(this,u);if(o||(o=a=$i()),t(o,+r.apply(this,(u[0]=c,u)),+i.apply(this,u),+r.apply(this,(u[0]=s,u)),+i.apply(this,u)),a)return o=null,a+""||null}return a.source=function(t){return arguments.length?(e=t,a):e},a.target=function(t){return arguments.length?(n=t,a):n},a.x=function(t){return arguments.length?(r="function"===typeof t?t:eo(+t),a):r},a.y=function(t){return arguments.length?(i="function"===typeof t?t:eo(+t),a):i},a.context=function(t){return arguments.length?(o=null==t?null:t,a):o},a}function uo(t,e,n,r,i){t.moveTo(e,n),t.bezierCurveTo(e=(e+r)/2,n,e,i,r,i)}function co(){return ao(uo)}var so=3,lo=(function t(e){function n(t){return Math.pow(t,e)}return e=+e,n.exponent=t,n}(so),function t(e){function n(t){return 1-Math.pow(1-t,e)}return e=+e,n.exponent=t,n}(so),function t(e){function n(t){return((t*=2)<=1?Math.pow(t,e):2-Math.pow(2-t,e))/2}return e=+e,n.exponent=t,n}(so)),fo=function(t){return"string"===typeof t?new ze([[document.querySelector(t)]],[document.documentElement]):new ze([[t]],Ie)};function ho(){_e.stopImmediatePropagation()}var po=function(){_e.preventDefault(),_e.stopImmediatePropagation()},vo=function(t){var e=t.document.documentElement,n=fo(t).on("dragstart.drag",po,!0);"onselectstart"in e?n.on("selectstart.drag",po,!0):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")};function go(t,e){var n=t.document.documentElement,r=fo(t).on("dragstart.drag",null);e&&(r.on("click.drag",po,!0),setTimeout((function(){r.on("click.drag",null)}),0)),"onselectstart"in n?r.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}var mo=Math.SQRT2,yo=2,bo=4,Ao=1e-12;function wo(t){return((t=Math.exp(t))+1/t)/2}function xo(t){return((t=Math.exp(t))-1/t)/2}function ko(t){return((t=Math.exp(2*t))-1)/(t+1)}var _o=function(t,e){var n,r,i=t[0],o=t[1],a=t[2],u=e[0],c=e[1],s=e[2],l=u-i,f=c-o,h=l*l+f*f;if(h<Ao)r=Math.log(s/a)/mo,n=function(t){return[i+t*l,o+t*f,a*Math.exp(mo*t*r)]};else{var d=Math.sqrt(h),p=(s*s-a*a+bo*h)/(2*a*yo*d),v=(s*s-a*a-bo*h)/(2*s*yo*d),g=Math.log(Math.sqrt(p*p+1)-p),m=Math.log(Math.sqrt(v*v+1)-v);r=(m-g)/mo,n=function(t){var e=t*r,n=wo(g),u=a/(yo*d)*(n*ko(mo*e+g)-xo(g));return[i+u*l,o+u*f,a*n/wo(mo*e+g)]}}return n.duration=1e3*r,n},So=function(){var t,e=_e;while(t=e.sourceEvent)e=t;return e},Eo=function(t,e){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var i=t.getBoundingClientRect();return[e.clientX-i.left-t.clientLeft,e.clientY-i.top-t.clientTop]},Oo=function(t){var e=So();return e.changedTouches&&(e=e.changedTouches[0]),Eo(t,e)},Mo=function(t,e,n){arguments.length<3&&(n=e,e=So().changedTouches);for(var r,i=0,o=e?e.length:0;i<o;++i)if((r=e[i]).identifier===n)return Eo(t,r);return null},Ro=function(t){return function(){return t}};function jo(t,e,n){this.target=t,this.type=e,this.transform=n}function No(t,e,n){this.k=t,this.x=e,this.y=n}No.prototype={constructor:No,scale:function(t){return 1===t?this:new No(this.k*t,this.x,this.y)},translate:function(t,e){return 0===t&0===e?this:new No(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Co=new No(1,0,0);function To(t){while(!t.__zoom)if(!(t=t.parentNode))return Co;return t.__zoom}function Bo(){_e.stopImmediatePropagation()}To.prototype=No.prototype;var Lo=function(){_e.preventDefault(),_e.stopImmediatePropagation()};function Po(){return!_e.ctrlKey&&!_e.button}function Io(){var t=this;return t instanceof SVGElement?(t=t.ownerSVGElement||t,t.hasAttribute("viewBox")?(t=t.viewBox.baseVal,[[t.x,t.y],[t.x+t.width,t.y+t.height]]):[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]):[[0,0],[t.clientWidth,t.clientHeight]]}function zo(){return this.__zoom||Co}function Uo(){return-_e.deltaY*(1===_e.deltaMode?.05:_e.deltaMode?1:.002)}function Do(){return navigator.maxTouchPoints||"ontouchstart"in this}function Yo(t,e,n){var r=t.invertX(e[0][0])-n[0][0],i=t.invertX(e[1][0])-n[1][0],o=t.invertY(e[0][1])-n[0][1],a=t.invertY(e[1][1])-n[1][1];return t.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),a>o?(o+a)/2:Math.min(0,o)||Math.max(0,a))}var Go=function(){var t,e,n=Po,r=Io,i=Yo,o=Uo,a=Do,u=[0,1/0],c=[[-1/0,-1/0],[1/0,1/0]],s=250,l=_o,f=Qe("start","zoom","end"),h=500,d=150,p=0;function v(t){t.property("__zoom",zo).on("wheel.zoom",x).on("mousedown.zoom",k).on("dblclick.zoom",_).filter(a).on("touchstart.zoom",S).on("touchmove.zoom",E).on("touchend.zoom touchcancel.zoom",O).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function g(t,e){return e=Math.max(u[0],Math.min(u[1],e)),e===t.k?t:new No(e,t.x,t.y)}function m(t,e,n){var r=e[0]-n[0]*t.k,i=e[1]-n[1]*t.k;return r===t.x&&i===t.y?t:new No(t.k,r,i)}function y(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function b(t,e,n){t.on("start.zoom",(function(){A(this,arguments).start()})).on("interrupt.zoom end.zoom",(function(){A(this,arguments).end()})).tween("zoom",(function(){var t=this,i=arguments,o=A(t,i),a=r.apply(t,i),u=null==n?y(a):"function"===typeof n?n.apply(t,i):n,c=Math.max(a[1][0]-a[0][0],a[1][1]-a[0][1]),s=t.__zoom,f="function"===typeof e?e.apply(t,i):e,h=l(s.invert(u).concat(c/s.k),f.invert(u).concat(c/f.k));return function(t){if(1===t)t=f;else{var e=h(t),n=c/e[2];t=new No(n,u[0]-e[0]*n,u[1]-e[1]*n)}o.zoom(null,t)}}))}function A(t,e,n){return!n&&t.__zooming||new w(t,e)}function w(t,e){this.that=t,this.args=e,this.active=0,this.extent=r.apply(t,e),this.taps=0}function x(){if(n.apply(this,arguments)){var t=A(this,arguments),e=this.__zoom,r=Math.max(u[0],Math.min(u[1],e.k*Math.pow(2,o.apply(this,arguments)))),a=Oo(this);if(t.wheel)t.mouse[0][0]===a[0]&&t.mouse[0][1]===a[1]||(t.mouse[1]=e.invert(t.mouse[0]=a)),clearTimeout(t.wheel);else{if(e.k===r)return;t.mouse=[a,e.invert(a)],Bn(this),t.start()}Lo(),t.wheel=setTimeout(s,d),t.zoom("mouse",i(m(g(e,r),t.mouse[0],t.mouse[1]),t.extent,c))}function s(){t.wheel=null,t.end()}}function k(){if(!e&&n.apply(this,arguments)){var t=A(this,arguments,!0),r=fo(_e.view).on("mousemove.zoom",s,!0).on("mouseup.zoom",l,!0),o=Oo(this),a=_e.clientX,u=_e.clientY;vo(_e.view),Bo(),t.mouse=[o,this.__zoom.invert(o)],Bn(this),t.start()}function s(){if(Lo(),!t.moved){var e=_e.clientX-a,n=_e.clientY-u;t.moved=e*e+n*n>p}t.zoom("mouse",i(m(t.that.__zoom,t.mouse[0]=Oo(t.that),t.mouse[1]),t.extent,c))}function l(){r.on("mousemove.zoom mouseup.zoom",null),go(_e.view,t.moved),Lo(),t.end()}}function _(){if(n.apply(this,arguments)){var t=this.__zoom,e=Oo(this),o=t.invert(e),a=t.k*(_e.shiftKey?.5:2),u=i(m(g(t,a),e,o),r.apply(this,arguments),c);Lo(),s>0?fo(this).transition().duration(s).call(b,u,e):fo(this).call(v.transform,u)}}function S(){if(n.apply(this,arguments)){var e,r,i,o,a=_e.touches,u=a.length,c=A(this,arguments,_e.changedTouches.length===u);for(Bo(),r=0;r<u;++r)i=a[r],o=Mo(this,a,i.identifier),o=[o,this.__zoom.invert(o),i.identifier],c.touch0?c.touch1||c.touch0[2]===o[2]||(c.touch1=o,c.taps=0):(c.touch0=o,e=!0,c.taps=1+!!t);t&&(t=clearTimeout(t)),e&&(c.taps<2&&(t=setTimeout((function(){t=null}),h)),Bn(this),c.start())}}function E(){if(this.__zooming){var e,n,r,o,a=A(this,arguments),u=_e.changedTouches,s=u.length;for(Lo(),t&&(t=clearTimeout(t)),a.taps=0,e=0;e<s;++e)n=u[e],r=Mo(this,u,n.identifier),a.touch0&&a.touch0[2]===n.identifier?a.touch0[0]=r:a.touch1&&a.touch1[2]===n.identifier&&(a.touch1[0]=r);if(n=a.that.__zoom,a.touch1){var l=a.touch0[0],f=a.touch0[1],h=a.touch1[0],d=a.touch1[1],p=(p=h[0]-l[0])*p+(p=h[1]-l[1])*p,v=(v=d[0]-f[0])*v+(v=d[1]-f[1])*v;n=g(n,Math.sqrt(p/v)),r=[(l[0]+h[0])/2,(l[1]+h[1])/2],o=[(f[0]+d[0])/2,(f[1]+d[1])/2]}else{if(!a.touch0)return;r=a.touch0[0],o=a.touch0[1]}a.zoom("touch",i(m(n,r,o),a.extent,c))}}function O(){if(this.__zooming){var t,n,r=A(this,arguments),i=_e.changedTouches,o=i.length;for(Bo(),e&&clearTimeout(e),e=setTimeout((function(){e=null}),h),t=0;t<o;++t)n=i[t],r.touch0&&r.touch0[2]===n.identifier?delete r.touch0:r.touch1&&r.touch1[2]===n.identifier&&delete r.touch1;if(r.touch1&&!r.touch0&&(r.touch0=r.touch1,delete r.touch1),r.touch0)r.touch0[1]=this.__zoom.invert(r.touch0[0]);else if(r.end(),2===r.taps){var a=fo(this).on("dblclick.zoom");a&&a.apply(this,arguments)}}}return v.transform=function(t,e,n){var r=t.selection?t.selection():t;r.property("__zoom",zo),t!==r?b(t,e,n):r.interrupt().each((function(){A(this,arguments).start().zoom(null,"function"===typeof e?e.apply(this,arguments):e).end()}))},v.scaleBy=function(t,e,n){v.scaleTo(t,(function(){var t=this.__zoom.k,n="function"===typeof e?e.apply(this,arguments):e;return t*n}),n)},v.scaleTo=function(t,e,n){v.transform(t,(function(){var t=r.apply(this,arguments),o=this.__zoom,a=null==n?y(t):"function"===typeof n?n.apply(this,arguments):n,u=o.invert(a),s="function"===typeof e?e.apply(this,arguments):e;return i(m(g(o,s),a,u),t,c)}),n)},v.translateBy=function(t,e,n){v.transform(t,(function(){return i(this.__zoom.translate("function"===typeof e?e.apply(this,arguments):e,"function"===typeof n?n.apply(this,arguments):n),r.apply(this,arguments),c)}))},v.translateTo=function(t,e,n,o){v.transform(t,(function(){var t=r.apply(this,arguments),a=this.__zoom,u=null==o?y(t):"function"===typeof o?o.apply(this,arguments):o;return i(Co.translate(u[0],u[1]).scale(a.k).translate("function"===typeof e?-e.apply(this,arguments):-e,"function"===typeof n?-n.apply(this,arguments):-n),t,c)}),o)},w.prototype={start:function(){return 1===++this.active&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(t,e){return this.mouse&&"mouse"!==t&&(this.mouse[1]=e.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=e.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=e.invert(this.touch1[0])),this.that.__zoom=e,this.emit("zoom"),this},end:function(){return 0===--this.active&&(delete this.that.__zooming,this.emit("end")),this},emit:function(t){Ce(new jo(v,t,this.that.__zoom),f.apply,f,[t,this.that,this.args])}},v.wheelDelta=function(t){return arguments.length?(o="function"===typeof t?t:Ro(+t),v):o},v.filter=function(t){return arguments.length?(n="function"===typeof t?t:Ro(!!t),v):n},v.touchable=function(t){return arguments.length?(a="function"===typeof t?t:Ro(!!t),v):a},v.extent=function(t){return arguments.length?(r="function"===typeof t?t:Ro([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),v):r},v.scaleExtent=function(t){return arguments.length?(u[0]=+t[0],u[1]=+t[1],v):[u[0],u[1]]},v.translateExtent=function(t){return arguments.length?(c[0][0]=+t[0][0],c[1][0]=+t[1][0],c[0][1]=+t[0][1],c[1][1]=+t[1][1],v):[[c[0][0],c[0][1]],[c[1][0],c[1][1]]]},v.constrain=function(t){return arguments.length?(i=t,v):i},v.duration=function(t){return arguments.length?(s=+t,v):s},v.interpolate=function(t){return arguments.length?(l=t,v):l},v.on=function(){var t=f.on.apply(f,arguments);return t===f?v:t},v.clickDistance=function(t){return arguments.length?(p=(t=+t)*t,v):Math.sqrt(p)},v},Vo=function(t){return"string"===typeof t?new ze([document.querySelectorAll(t)],[document.documentElement]):new ze([null==t?[]:t],Ie)},Fo=function(t){return function(){return t}};function Xo(t,e,n,r,i,o,a,u,c,s){this.target=t,this.type=e,this.subject=n,this.identifier=r,this.active=i,this.x=o,this.y=a,this.dx=u,this.dy=c,this._=s}function Jo(){return!_e.ctrlKey&&!_e.button}function Ko(){return this.parentNode}function qo(t){return null==t?{x:_e.x,y:_e.y}:t}function Qo(){return navigator.maxTouchPoints||"ontouchstart"in this}Xo.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};var Zo=function(){var t,e,n,r,i=Jo,o=Ko,a=qo,u=Qo,c={},s=Qe("start","drag","end"),l=0,f=0;function h(t){t.on("mousedown.drag",d).filter(u).on("touchstart.drag",g).on("touchmove.drag",m).on("touchend.drag touchcancel.drag",y).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function d(){if(!r&&i.apply(this,arguments)){var a=b("mouse",o.apply(this,arguments),Oo,this,arguments);a&&(fo(_e.view).on("mousemove.drag",p,!0).on("mouseup.drag",v,!0),vo(_e.view),ho(),n=!1,t=_e.clientX,e=_e.clientY,a("start"))}}function p(){if(po(),!n){var r=_e.clientX-t,i=_e.clientY-e;n=r*r+i*i>f}c.mouse("drag")}function v(){fo(_e.view).on("mousemove.drag mouseup.drag",null),go(_e.view,n),po(),c.mouse("end")}function g(){if(i.apply(this,arguments)){var t,e,n=_e.changedTouches,r=o.apply(this,arguments),a=n.length;for(t=0;t<a;++t)(e=b(n[t].identifier,r,Mo,this,arguments))&&(ho(),e("start"))}}function m(){var t,e,n=_e.changedTouches,r=n.length;for(t=0;t<r;++t)(e=c[n[t].identifier])&&(po(),e("drag"))}function y(){var t,e,n=_e.changedTouches,i=n.length;for(r&&clearTimeout(r),r=setTimeout((function(){r=null}),500),t=0;t<i;++t)(e=c[n[t].identifier])&&(ho(),e("end"))}function b(t,e,n,r,i){var o,u,f,d=n(e,t),p=s.copy();if(Ce(new Xo(h,"beforestart",o,t,l,d[0],d[1],0,0,p),(function(){return null!=(_e.subject=o=a.apply(r,i))&&(u=o.x-d[0]||0,f=o.y-d[1]||0,!0)})))return function a(s){var v,g=d;switch(s){case"start":c[t]=a,v=l++;break;case"end":delete c[t],--l;case"drag":d=n(e,t),v=l;break}Ce(new Xo(h,s,o,t,v,d[0]+u,d[1]+f,d[0]-g[0],d[1]-g[1],p),p.apply,p,[s,r,i])}}return h.filter=function(t){return arguments.length?(i="function"===typeof t?t:Fo(!!t),h):i},h.container=function(t){return arguments.length?(o="function"===typeof t?t:Fo(t),h):o},h.subject=function(t){return arguments.length?(a="function"===typeof t?t:Fo(t),h):a},h.touchable=function(t){return arguments.length?(u="function"===typeof t?t:Fo(!!t),h):u},h.on=function(){var t=s.on.apply(s,arguments);return t===s?h:t},h.clickDistance=function(t){return arguments.length?(f=(t=+t)*t,h):Math.sqrt(f)},h};function Ho(t){var e=0,n=t.children,r=n&&n.length;if(r)while(--r>=0)e+=n[r].value;else e=1;t.value=e}var Wo=function(){return this.eachAfter(Ho)},$o=function(t){var e,n,r,i,o=this,a=[o];do{e=a.reverse(),a=[];while(o=e.pop())if(t(o),n=o.children,n)for(r=0,i=n.length;r<i;++r)a.push(n[r])}while(a.length);return this},ta=function(t){var e,n,r=this,i=[r];while(r=i.pop())if(t(r),e=r.children,e)for(n=e.length-1;n>=0;--n)i.push(e[n]);return this},ea=function(t){var e,n,r,i=this,o=[i],a=[];while(i=o.pop())if(a.push(i),e=i.children,e)for(n=0,r=e.length;n<r;++n)o.push(e[n]);while(i=a.pop())t(i);return this},na=function(t){return this.eachAfter((function(e){var n=+t(e.data)||0,r=e.children,i=r&&r.length;while(--i>=0)n+=r[i].value;e.value=n}))},ra=function(t){return this.eachBefore((function(e){e.children&&e.children.sort(t)}))},ia=function(t){var e=this,n=oa(e,t),r=[e];while(e!==n)e=e.parent,r.push(e);var i=r.length;while(t!==n)r.splice(i,0,t),t=t.parent;return r};function oa(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),i=null;t=n.pop(),e=r.pop();while(t===e)i=t,t=n.pop(),e=r.pop();return i}var aa=function(){var t=this,e=[t];while(t=t.parent)e.push(t);return e},ua=function(){var t=[];return this.each((function(e){t.push(e)})),t},ca=function(){var t=[];return this.eachBefore((function(e){e.children||t.push(e)})),t},sa=function(){var t=this,e=[];return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e};function la(t,e){var n,r,i,o,a,u=new va(t),c=+t.value&&(u.value=t.value),s=[u];null==e&&(e=ha);while(n=s.pop())if(c&&(n.value=+n.data.value),(i=e(n.data))&&(a=i.length))for(n.children=new Array(a),o=a-1;o>=0;--o)s.push(r=n.children[o]=new va(i[o])),r.parent=n,r.depth=n.depth+1;return u.eachBefore(pa)}function fa(){return la(this).eachBefore(da)}function ha(t){return t.children}function da(t){t.data=t.data.data}function pa(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function va(t){this.data=t,this.depth=this.height=0,this.parent=null}va.prototype=la.prototype={constructor:va,count:Wo,each:$o,eachAfter:ea,eachBefore:ta,sum:na,sort:ra,path:ia,ancestors:aa,descendants:ua,leaves:ca,links:sa,copy:fa};var ga=n("43da");const ma=Object.freeze({children:t=>t.children,nodeSize:t=>t.data.size,spacing:0});function ya(t){const e=Object.assign({},ma,t);function n(t){const n=e[t];return"function"===typeof n?n:()=>n}function r(t){const e=a(o(),t,t=>t.children);return e.update(),e.data}function i(){const t=n("nodeSize"),e=n("spacing");return class n extends la.prototype.constructor{constructor(t){super(t)}copy(){const t=a(this.constructor,this,t=>t.children);return t.each(t=>t.data=t.data.data),t}get size(){return t(this)}spacing(t){return e(this,t)}get nodes(){return this.descendants()}get xSize(){return this.size[0]}get ySize(){return this.size[1]}get top(){return this.y}get bottom(){return this.y+this.ySize}get left(){return this.x-this.xSize/2}get right(){return this.x+this.xSize/2}get root(){const t=this.ancestors();return t[t.length-1]}get numChildren(){return this.hasChildren?this.children.length:0}get hasChildren(){return!this.noChildren}get noChildren(){return null===this.children}get firstChild(){return this.hasChildren?this.children[0]:null}get lastChild(){return this.hasChildren?this.children[this.numChildren-1]:null}get extents(){return(this.children||[]).reduce((t,e)=>n.maxExtents(t,e.extents),this.nodeExtents)}get nodeExtents(){return{top:this.top,bottom:this.bottom,left:this.left,right:this.right}}static maxExtents(t,e){return{top:Math.min(t.top,e.top),bottom:Math.max(t.bottom,e.bottom),left:Math.min(t.left,e.left),right:Math.max(t.right,e.right)}}}}function o(){const t=i(),e=n("nodeSize"),r=n("spacing");return class extends t{constructor(t){super(t),Object.assign(this,{x:0,y:0,relX:0,prelim:0,shift:0,change:0,lExt:this,lExtRelX:0,lThr:null,rExt:this,rExtRelX:0,rThr:null})}get size(){return e(this.data)}spacing(t){return r(this.data,t.data)}get x(){return this.data.x}set x(t){this.data.x=t}get y(){return this.data.y}set y(t){this.data.y=t}update(){return ba(this),Aa(this),this}}}function a(t,e,n){const r=(e,i)=>{const o=new t(e);Object.assign(o,{parent:i,depth:null===i?0:i.depth+1,height:0,length:1});const a=n(e)||[];return o.children=0===a.length?null:a.map(t=>r(t,o)),o.children&&Object.assign(o,o.children.reduce((t,e)=>({height:Math.max(t.height,e.height+1),length:t.length+e.length}),o)),o};return r(e,null)}return Object.assign(r,{nodeSize(t){return arguments.length?(e.nodeSize=t,r):e.nodeSize},spacing(t){return arguments.length?(e.spacing=t,r):e.spacing},children(t){return arguments.length?(e.children=t,r):e.children},hierarchy(t,n){const r="undefined"===typeof n?e.children:n;return a(i(),t,r)},dump(t){const e=n("nodeSize"),r=t=>n=>{const i=t+"  ",o=t+"    ",{x:a,y:u}=n,c=e(n),s=n.children||[],l=0===s.length?" ":`,${i}children: [${o}${s.map(r(o)).join(o)}${i}],${t}`;return`{ size: [${c.join(", ")}],${i}x: ${a}, y: ${u}${l}},`};return r("\n")(t)}}),r}ya.version=ga["a"];const ba=(t,e=0)=>(t.y=e,(t.children||[]).reduce((e,n)=>{const[r,i]=e;ba(n,t.y+t.ySize);const o=(0===r?n.lExt:n.rExt).bottom;0!==r&&xa(t,r,i);const a=ja(o,r,i);return[r+1,a]},[0,null]),wa(t),Ra(t),t),Aa=(t,e,n)=>{"undefined"===typeof e&&(e=-t.relX-t.prelim,n=0);const r=e+t.relX;return t.relX=r+t.prelim-n,t.prelim=0,t.x=n+t.relX,(t.children||[]).forEach(e=>Aa(e,r,t.x)),t},wa=t=>{(t.children||[]).reduce((t,e)=>{const[n,r]=t,i=n+e.shift,o=r+i+e.change;return e.relX+=o,[i,o]},[0,0])},xa=(t,e,n)=>{const r=t.children[e-1],i=t.children[e];let o=r,a=r.relX,u=i,c=i.relX,s=!0;while(o&&u){o.bottom>n.lowY&&(n=n.next);const r=a+o.prelim-(c+u.prelim)+o.xSize/2+u.xSize/2+o.spacing(u);(r>0||r<0&&s)&&(c+=r,ka(i,r),_a(t,e,n.index,r)),s=!1;const l=o.bottom,f=u.bottom;l<=f&&(o=Ea(o),o&&(a+=o.relX)),l>=f&&(u=Sa(u),u&&(c+=u.relX))}!o&&u?Oa(t,e,u,c):o&&!u&&Ma(t,e,o,a)},ka=(t,e)=>{t.relX+=e,t.lExtRelX+=e,t.rExtRelX+=e},_a=(t,e,n,r)=>{const i=t.children[e],o=e-n;if(o>1){const e=r/o;t.children[n+1].shift+=e,i.shift-=e,i.change-=r-e}},Sa=t=>t.hasChildren?t.firstChild:t.lThr,Ea=t=>t.hasChildren?t.lastChild:t.rThr,Oa=(t,e,n,r)=>{const i=t.firstChild,o=i.lExt,a=t.children[e];o.lThr=n;const u=r-n.relX-i.lExtRelX;o.relX+=u,o.prelim-=u,i.lExt=a.lExt,i.lExtRelX=a.lExtRelX},Ma=(t,e,n,r)=>{const i=t.children[e],o=i.rExt,a=t.children[e-1];o.rThr=n;const u=r-n.relX-i.rExtRelX;o.relX+=u,o.prelim-=u,i.rExt=a.rExt,i.rExtRelX=a.rExtRelX},Ra=t=>{if(t.hasChildren){const e=t.firstChild,n=t.lastChild,r=(e.prelim+e.relX-e.xSize/2+n.relX+n.prelim+n.xSize/2)/2;Object.assign(t,{prelim:r,lExt:e.lExt,lExtRelX:e.lExtRelX,rExt:n.rExt,rExtRelX:n.rExtRelX})}},ja=(t,e,n)=>{while(null!==n&&t>=n.lowY)n=n.next;return{lowY:t,index:e,next:n}};n("7db0"),n("d81d"),n("a434");var Na=function(t){var e=t.length/6|0,n=new Array(e),r=0;while(r<e)n[r]="#"+t.slice(6*r,6*++r);return n},Ca=Na("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");function Ta(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t);break}return this}const Ba=Symbol("implicit");function La(){var t=new Map,e=[],n=[],r=Ba;function i(i){var o=i+"",a=t.get(o);if(!a){if(r!==Ba)return r;t.set(o,a=e.push(i))}return n[(a-1)%n.length]}return i.domain=function(n){if(!arguments.length)return e.slice();e=[],t=new Map;for(const r of n){const n=r+"";t.has(n)||t.set(n,e.push(r))}return i},i.range=function(t){return arguments.length?(n=Array.from(t),i):n.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return La(e,n).unknown(r)},Ta.apply(i,arguments),i}var Pa,Ia=La(Ca),za=0,Ua=0;function Da(t,e){var n;"0"!==t.id&&(n=e||Ia("".concat(za+=1)),t.color=n);var r=t.children,i=t._children;if(r)for(var o=0;o<r.length;o+=1)Da(r[o],n);if(i)for(var a=0;a<i.length;a+=1)Da(i[a],n)}function Ya(t){t.size=Pa(t.name,"0"===t.id);var e=t.children,n=t._children;if(e)for(var r=0;r<e.length;r+=1)Ya(e[r]);if(n)for(var i=0;i<n.length;i+=1)Ya(n[i])}function Ga(t){var e=t.children,n=t._children,r={name:t.name};if(r.left=t.left,e){var i=e.length;r.children=new Array(i);for(var o=0;o<i;o++)r.children[o]=Ga(e[o])}if(n){var a=n.length;r._children=new Array(a);for(var u=0;u<a;u++)r._children[u]=Ga(n[u])}return r}function Va(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"0";t.id=e,t.gKey=t.gKey||(Ua+=1);var n=t.children,r=t._children;if((null===n||void 0===n?void 0:n.length)&&(null===r||void 0===r?void 0:r.length))console.error("[Mindmap warn]: Error in data: data.children and data._children cannot contain data at the same time");else{if(n)for(var i=0;i<n.length;)"del"===n[i].id?n.splice(i,1):(Va(n[i],"".concat(e,"-").concat(i)),i+=1);if(r)for(var o=0;o<r.length;)"del"===r[o].id?r.splice(o,1):(Va(r[o],"".concat(e,"-").concat(o)),o+=1)}}function Fa(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.left=e;var n=t.children,r=t._children;if(n)for(var i=0;i<n.length;i+=1)Fa(n[i],t.left);if(r)for(var o=0;o<r.length;o+=1)Fa(r[o],t.left)}var Xa=function(){function t(e,n){l(this,t),Pa=n,this.data=JSON.parse(JSON.stringify(e)),Va(this.data),Da(this.data),Ya(this.data),this.data.left=!1;var r=this.data,i=r.children,o=r._children;if(i)for(var a=0;a<i.length;a+=1)Fa(i[a],i[a].left);if(o)for(var u=0;u<o.length;u+=1)Fa(o[u],o[u].left)}return h(t,[{key:"getSource",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"0",e=this.find(t);return e?Ga(e):{name:""}}},{key:"resize",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"0",e=this.find(t);e&&Ya(e)}},{key:"find",value:function(t){for(var e=t.split("-").map((function(t){return~~t})),n=this.data,r=1;r<e.length;r++){if(!n||!n.children)return null;n=n.children[e[r]]}return n}},{key:"rename",value:function(t,e){if(t.length>0){var n=this.find(t);return n&&(n.name=e,n.size=Pa(e,"0"===n.id)),n}}},{key:"collapse",value:function(t){for(var e=Array.isArray(t)?t:[t],n=0;n<e.length;n++){var r=e[n],i=this.find(r);!i||i._children&&0!==i._children.length||(i._children=i.children,i.children=[])}}},{key:"expand",value:function(t){for(var e=Array.isArray(t)?t:[t],n=0;n<e.length;n++){var r=e[n],i=this.find(r);!i||i.children&&0!==i.children.length||(i.children=i._children,i._children=[])}}},{key:"del",value:function(t){for(var e,n=Array.isArray(t)?t:[t],r=0;r<n.length;r++){var i=n[r],o=i.split("-");if(o.length>=2){var a=o.pop(),u=this.find(o.join("-"));a&&u&&(u.children&&(u.children[~~a].id="del"),(void 0===e||e.id.split("-").length>u.id.split("-").length)&&(e=u))}}e&&Va(e,e.id)}},{key:"add",value:function(t,e){if(t.length>0){var n=this.find(t);if(n){var r;((null===(r=n._children)||void 0===r?void 0:r.length)||0)>0&&(n.children=n._children,n._children=[]);var i=JSON.parse(JSON.stringify(e));return n.children?n.children.push(i):n.children=[i],Da(i,n.color||Ia("".concat(za+=1))),Va(i,"".concat(n.id,"-").concat(n.children.length-1)),i.left=n.left,Ya(i),i}}}},{key:"insert",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(t.length>2){var r=t.split("-"),i=r.pop(),o=r.join("-"),a=this.find(o);if(i&&a){var u=JSON.parse(JSON.stringify(e)),c=a.children;return c&&(c.splice(~~i+n,0,u),u.left=c[~~i].left),Da(u,a.color||Ia("".concat(za+=1))),Va(a,a.id),Ya(u),u}}}},{key:"move",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(t.length>2)if(e){if(e.length>2){var r=this.find(e),i=t.split("-"),o=i.pop(),a=i.join("-"),u=this.find(a),c=e.split("-").pop();if(o&&c&&r&&u&&u.children){var s=~~o,l=~~c;s<l&&(l-=1);var f=u.children.splice(s,1)[0];f.left!==r.left&&Fa(f,r.left),u.children.splice(l+n,0,f),Va(u,u.id)}}}else{var h=this.find(t);h&&Fa(h,!h.left)}}},{key:"reparent",value:function(t,e){if(e.length>2&&t.length>0&&t!==e){var n=this.find(t),r=e.split("-"),i=r.pop(),o=r.join("-"),a=this.find(o);if(i&&a&&n){var u,c,s,l,f,h=null===(u=a.children)||void 0===u?void 0:u.splice(~~i,1)[0];if(h)((null===(c=n.children)||void 0===c?void 0:c.length)||0)>0?null===(s=n.children)||void 0===s||s.push(h):((null===(l=n._children)||void 0===l?void 0:l.length)||0)>0?null===(f=n._children)||void 0===f||f.push(h):n.children=[h],Da(h,"0"===t?Ia("".concat(za+=1)):n.color),Fa(h,"0"===t?h.left:n.left),Va(n,n.id),Va(a,a.id)}}}}]),t}(),Ja=Xa,Ka=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:20;l(this,t),this.maxSnapshots=e,this.snapshots=[],this.cursor=-1}return h(t,[{key:"record",value:function(t){while(this.cursor<this.snapshots.length-1)this.snapshots.pop();this.snapshots.push(t),this.snapshots.length>this.maxSnapshots&&this.snapshots.shift(),this.cursor=this.snapshots.length-1}},{key:"undo",value:function(){return this.canUndo?(this.cursor-=1,this.snapshots[this.cursor]):null}},{key:"redo",value:function(){return this.canRedo?(this.cursor+=1,this.snapshots[this.cursor]):null}},{key:"move",value:function(t){if(this.snapshots.length>t)return this.cursor=t,this.snapshots[this.cursor]}},{key:"clear",value:function(){this.cursor=-1,this.snapshots=[]}},{key:"canUndo",get:function(){return this.cursor>0}},{key:"canClear",get:function(){return this.snapshots.length>=0}},{key:"canRedo",get:function(){return this.snapshots.length>this.cursor+1}}]),t}(),qa=Ka;function Qa(t,e,n,r){for(var i=0;i<(null===t||void 0===t?void 0:t.length);i+=1){var o=t[i];e.length>3&&"#"===e[0]?(n+="- ".concat(o.name,"\n"),o.children&&(n=Qa(o.children,"  -",n,"  "))):(n+="".concat(e," ").concat(o.name,"\n"),o.children&&(n=Qa(o.children,"".concat(r).concat(e),n,r)))}return n}function Za(t){var e=Array.isArray(t)?t:[t];return Qa(e,"#","","#")}var Ha,Wa,$a=Za,tu=function(t){p(n,t);var e=A(n);function n(){var t;return l(this,n),t=e.apply(this,arguments),t.dragFlag=!1,t.multiSeleFlag=!1,t.minTextWidth=16,t.minTextHeight=21,t.gBtnSide=24,t.foreignBorderWidth=3,t.spaceKey=!1,t.toRecord=!0,t.toUpdate=!0,t.showContextMenu=!1,t.showPopUps=!1,t.showSelectedBox=!1,t.contextMenuX=0,t.contextMenuY=0,t.mouse={x0:0,y0:0,x1:0,y1:0},t.contextMenuItems=[{title:"删除节点",name:"delete",disabled:!1},{title:"折叠节点",name:"collapse",disabled:!1},{title:"展开节点",name:"expand",disabled:!1}],t.optionList=[{title:"JSON",icon:"code-json",tip:"创建一个JSON格式的文本文件",color:"purpleOpt"},{title:"图像",icon:"image",tip:"创建一个PNG格式的图像文件",color:"greenOpt",disabled:!0},{title:"Markdown",icon:"markdown",tip:"创建一个Markdown格式的文本文件",color:"grassOpt"}],t.selectedOption=0,t.easePolyInOut=Di().duration(1e3).ease(lo),t.link=co().x((function(t){return t[0]})).y((function(t){return t[1]})),t.zoom=Go(),t.history=new qa,t}return h(n,[{key:"onKeyboardChanged",value:function(t){this.makeKeyboard(t)}},{key:"onShowNodeAddChanged",value:function(t){this.makeNodeAdd(t)}},{key:"onDraggableChanged",value:function(t){this.makeDrag(t)}},{key:"onContextMenuChanged",value:function(t){this.makeContextMenu(t)}},{key:"onXSpacingChanged",value:function(){Wa.resize(),this.updateMmdata(),this.updateMindmap()}},{key:"onYSpacingChanged",value:function(){this.updateMindmap()}},{key:"onZoomableChanged",value:function(t){this.makeZoom(t)}},{key:"getViewPos",value:function(t){var e=this.$refs.svg.getBoundingClientRect(),n=_e,r=n.pageX,i=n.pageY,o=e.left+window.pageXOffset,a=e.top+window.pageYOffset,u=t||{left:r,top:i,right:r,bottom:i},c=u.left,s=u.top,l=u.right,f=u.bottom;return{left:c-o,top:s-a,right:l-o,bottom:f-a}}},{key:"updateMmdata",value:function(t){t&&(Wa.data=JSON.parse(JSON.stringify(t))),this.toRecord&&this.history.record(JSON.parse(JSON.stringify(Wa.data))),this.updateMindmap(),this.toUpdate=!1,this.$emit("change",[Wa.getSource()])}},{key:"init",value:function(){var t=this;this.mindmapSvg=fo(this.$refs.svg),this.mindmapG=fo(this.$refs.content),this.mindmapG.style("opacity",0),this.dummy=fo(this.$refs.dummy),this.makeKeyboard(this.keyboard),this.mindmapSvg.on("contextmenu",(function(){_e.preventDefault()})),this.mindmapSvgZoom=this.zoom.on("zoom",(function(){t.mindmapG.attr("transform",_e.transform)})).filter((function(){return(_e.ctrlKey&&"mousedown"!==_e.type||t.spaceKey&&"wheel"!==_e.type)&&!_e.button})).scaleExtent([.1,8]),this.makeZoom(this.zoomable)}},{key:"initNodeEvent",value:function(){this.makeDrag(this.draggable),this.makeNodeAdd(this.showNodeAdd),this.makeContextMenu(this.contextMenu)}},{key:"makeKeyboard",value:function(t){t?this.mindmapSvg.on("keydown",this.svgKeyDown).on("keyup",this.svgKeyUp):this.mindmapSvg.on("keydown",null).on("keyup",null)}},{key:"makeNodeAdd",value:function(t){var e=this.mindmapG.selectAll("foreignObject"),n=this.mindmapG.selectAll(".gButton");if(t){var r=this.mouseLeave,i=this.mouseEnter,o=this.gBtnClick;e.on("mouseenter",i).on("mouseleave",r),n.on("mouseenter",i).on("mouseleave",r).on("mousedown",o)}else e.on("mouseenter",null).on("mouseleave",null),n.on("mouseenter",null).on("mouseleave",null).on("mousedown",null)}},{key:"makeContextMenu",value:function(t){var e=this.mindmapG.selectAll("foreignObject");t?e.on("contextmenu",this.fObjectRightClick):e.on("contextmenu",null)}},{key:"makeDrag",value:function(t){var e=this.mindmapG,n=this.dragged,r=this.fObjMousedown,i=this.dragended,o=e.selectAll("foreignObject"),a=Zo().container((function(t,e,n){var r;return null===(r=n[e].parentNode)||void 0===r?void 0:r.parentNode}));t?o.call(a.on("start",r).on("drag",n).on("end",i)):o.call(a.on("start",null).on("drag",null).on("end",null))}},{key:"makeZoom",value:function(t){var e=this,n=this.mindmapSvg,r=this.mindmapSvgZoom,i=this.zoom;t?n.call(r).on("dblclick.zoom",null).on("wheel.zoom",(function(){var t=_e,r=t.ctrlKey,o=t.deltaY,a=t.deltaX,u=t.x,c=t.y;_e.preventDefault();var s=To(e.$refs.svg);if(r){var l=e.$refs.svg.getBoundingClientRect(),f=l.left+window.pageXOffset,h=l.top+window.pageYOffset,d=s.k-.02*o;i.scaleTo(n,d,[u-f,c-h])}else i.translateBy(n,-a,-o)})):n.on(".zoom",null)}},{key:"undo",value:function(){this.canUndo&&(this.toRecord=!1,this.updateMmdata(this.history.undo()))}},{key:"redo",value:function(){this.canRedo&&(this.toRecord=!1,this.updateMmdata(this.history.redo()))}},{key:"downloadFile",value:function(t,e){var n=document.createElement("a");n.download=e,n.style.display="none";var r=new Blob([t]);n.href=URL.createObjectURL(r),document.body.appendChild(n),n.click(),document.body.removeChild(n)}},{key:"exportTo",value:function(){var t=Wa.getSource(),e="",n=t.name;switch(this.selectedOption){case 0:e=JSON.stringify(t,null,2),n+=".json";break;case 2:e=$a(t),n+=".md";break;default:break}this.downloadFile(e,n)}},{key:"makeCenter",value:function(){var t=s(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Di().end().then((function(){e.mindmapSvg.call(e.zoom.translateTo,0,0)}));case 2:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"fitContent",value:function(){var t=s(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Di().end().then((function(){var t=e.$refs.content.getBBox(),n=e.$refs.mindmap,r=n.offsetWidth/t.width,i=n.offsetHeight/t.height,o=Math.min(r,i);e.mindmapSvg.transition(e.easePolyInOut).call(e.zoom.scaleTo,o)}));case 2:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"add",value:function(t,e){this.toRecord=!0;var n=Wa.add(t.id,e);return this.updateMmdata(),n}},{key:"insert",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.toRecord=!0;var r=Wa.insert(t.id,e,n);return this.updateMmdata(),r}},{key:"move",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.toRecord=!0,Wa.move(t.id,null===e||void 0===e?void 0:e.id,n),this.updateMmdata()}},{key:"reparent",value:function(t,e){this.toRecord=!0,Wa.reparent(t.id,e.id),this.updateMmdata()}},{key:"del",value:function(t){if(this.toRecord=!0,Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(t[n].id);Wa.del(e)}else Wa.del(t.id);this.updateMmdata()}},{key:"updateName",value:function(t,e){if(t.name!==e){this.toRecord=!0;var n=Wa.rename(t.id,e);return this.updateMmdata(),n}}},{key:"collapse",value:function(t){if(this.toRecord=!0,Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(t[n].id);Wa.collapse(e)}else Wa.collapse(t.id);this.updateMmdata()}},{key:"expand",value:function(t){if(this.toRecord=!0,Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(t[n].id);Wa.expand(e)}else Wa.expand(t.id);this.updateMmdata()}},{key:"svgKeyDown",value:function(){var t=_e,e=t.key;if(" "!==e||this.spaceKey||(this.spaceKey=!0),t.metaKey)"z"===e?(_e.preventDefault(),this.undo()):"y"===e&&(_e.preventDefault(),this.redo());else{var n=fo("#selectedNode"),r=n.node();if(r){var i=n.data()[0],o=i.depth,a=i.data,u=r.parentNode;switch(e){case"Tab":_e.preventDefault();var c=this.add(a,{name:""});c&&this.editNew(c,o+1,u);break;case"Enter":if(_e.preventDefault(),u===this.$refs.content){var s=this.add(a,{name:""});s&&this.editNew(s,o+1,u)}else{var l=this.insert(a,{name:""},1);l&&this.editNew(l,o,u)}break;case"Backspace":_e.preventDefault(),this.del(a);break;default:break}}}}},{key:"svgKeyUp",value:function(){" "===_e.key&&(this.spaceKey=!1)}},{key:"divKeyDown",value:function(){_e.key}},{key:"updateNodeName",value:function(){var t,e=this,n=document.querySelector("#editing > foreignObject > div");null===(t=window.getSelection())||void 0===t||t.removeAllRanges();var r=n.innerText||"";this.mindmapG.select("g#editing").each((function(t,n,i){i[n].removeAttribute("id");var o=e.updateName(t.data,r);o&&e.$emit("updateNodeName",Wa.getSource(o.id),o.id)})),n.setAttribute("contenteditable","false")}},{key:"removeSelectedId",value:function(){var t=document.getElementById("selectedNode");t&&(t.setAttribute("__click__","0"),t.removeAttribute("id"))}},{key:"selectNode",value:function(t){this.removeMultiSelected(),"selectedNode"!==t.getAttribute("id")&&(this.removeSelectedId(),t.setAttribute("id","selectedNode"))}},{key:"editNode",value:function(t){this.removeSelectedId(),t.setAttribute("id","editing");var e=fo(t).selectAll("foreignObject").filter((function(e,n,r){return r[n].parentNode===t}));this.focusNode(e),e.select("div").attr("contenteditable",!0);var n,r=document.querySelector("#editing > foreignObject > div");r&&(null===(n=window.getSelection())||void 0===n||n.selectAllChildren(r))}},{key:"focusNode",value:function(t){var e=To(this.$refs.svg),n=e.k,r=t.node().getBoundingClientRect();if(r){var i=this.$refs.svg.getBoundingClientRect(),o=r.right-i.right,a=r.bottom-i.bottom,u=r.left-i.left,c=r.top-i.top,s=o>0&&o||u<0&&u,l=a>0&&a||c<0&&c;s&&this.mindmapSvg.call(this.zoom.translateBy,-s/n,0),l&&this.mindmapSvg.call(this.zoom.translateBy,0,-l/n)}}},{key:"editNew",value:function(t,e,n){var r=this;Di().end().then((function(){var i=fo(n).selectAll("g.node.depth_".concat(e)).filter((function(e){return e.data.id===t.id})).node();r.editNode(i)}),(function(t){console.log(t)}))}},{key:"fdivMouseDown",value:function(){var t=_e.target.getAttribute("contenteditable");"true"===t&&_e.stopPropagation()}},{key:"fObjMousedown",value:function(t,e,n){var r=document.getElementById("editing"),i=0,o=n[e].parentNode;if(r&&r!==o){var a=Vo("foreignObject").filter((function(t,e,n){return n[e].parentNode===r})).node().firstElementChild;a.blur(),i=1}r&&!i||this.selectNode(o)}},{key:"fObjectClick",value:function(t,e,n){var r=document.getElementById("selectedNode"),i=this.dragFlag;r&&("1"!==r.getAttribute("__click__")||n[e].parentNode!==r||document.activeElement===n[e].firstElementChild||i?(r.setAttribute("__click__","1"),i||this.$emit("click",Wa.getSource(t.data.id),t.data.id)):(this.editNode(r),r.setAttribute("__click__","0")))}},{key:"fObjectRightClick",value:function(t,e,n){var r=this,i=document.getElementById("selectedNode"),o=document.getElementById("editing"),a=n[e].parentNode,u=function(){var t=r.getViewPos();r.contextMenuX=t.left,r.contextMenuY=t.top,r.showContextMenu=!0,r.clearSelection(),setTimeout((function(){r.$refs.menu.focus()}),300)};if(a.classList.contains("multiSelectedNode")){var c=[];this.mindmapG.selectAll("g.multiSelectedNode").each((function(t,e,n){c.push(t.data)}));var s=c.filter((function(t){return t.children&&t.children.length>0})).length>0,l=c.filter((function(t){return t._children&&t._children.length>0})).length>0;this.contextMenuItems[1].disabled=!s,this.contextMenuItems[2].disabled=!l,this.contextMenuTarget=c,u()}else if(a!==o){a!==i&&this.selectNode(a);var f=t.data;this.contextMenuItems[1].disabled=!(f.children&&f.children.length>0),this.contextMenuItems[2].disabled=!(f._children&&f._children.length>0),this.contextMenuTarget=f,u()}}},{key:"gBtnClick",value:function(t,e,n){if("1"===n[e].style.opacity){_e.stopPropagation();var r=fo(n[e].parentNode).data()[0],i=this.add(r.data,{name:""});this.mouseLeave(r,e,n),i&&this.editNew(i,r.depth+1,n[e].parentNode)}}},{key:"clickMenu",value:function(t){this.showContextMenu=!1;var e=this.contextMenuTarget;switch(t){case"delete":this.del(e);break;case"collapse":this.collapse(e);break;case"expand":this.expand(e);break;default:break}this.$refs.svg.focus(),this.removeSelectedId()}},{key:"mouseLeave",value:function(t,e,n){n[e].className.baseVal.includes("gButton")?fo(n[e]).style("opacity",0):Vo("g.gButton").filter((function(t,r,i){return i[r].parentNode===n[e].parentNode})).style("opacity",0)}},{key:"mouseEnter",value:function(t,e,n){var r,i=((null===(r=t.data._children)||void 0===r?void 0:r.length)||0)>0;i||(n[e].className.baseVal.includes("gButton")?fo(n[e]).style("opacity",1):Vo("g.gButton").filter((function(t,r,i){return i[r].parentNode===n[e].parentNode})).style("opacity",.5))}},{key:"draggedNodeRenew",value:function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4?arguments[4]:void 0,o=this.path,a=this.renewOffset;a(i,e,n);var u=i.dy+n,c=i.dx+e,s=Di().duration(r).ease(lo);fo(t).transition(s).attr("transform","translate(".concat(u,",").concat(c,")")),fo("path#path_".concat(i.data.id)).transition(s).attr("d",(function(t){return o(t)}))}},{key:"renewOffset",value:function(t,e,n){if(t.px=e,t.py=n,t.children)for(var r=0;r<t.children.length;r+=1){var i=t.children[r];this.renewOffset(i,e,n)}}},{key:"dragged",value:function(t,e,n){if(this.dragFlag=!0,0!==t.depth){var r=this.mindmapG,i=this.xSpacing,o=this.foreignX,a=this.foreignY,u=n[e].parentNode;this.draggedNodeRenew(u,_e.y-t.y,_e.x-t.x,void 0,t);var c=Oo(this.$refs.content),s=c[0],l=c[1];r.selectAll("g.node").filter((function(t,e,n){return u!==n[e]&&u.parentNode!==n[e]})).each((function(t,e,n){var r=n[e],u={y:o(t)+t.y,x:a(t)+t.x,width:t.size[1]-i,height:t.size[0]};s>u.y&&s<u.y+u.width&&l>u.x&&l<u.x+u.height?r.setAttribute("id","newParentNode"):"newParentNode"===r.getAttribute("id")&&r.removeAttribute("id")}))}}},{key:"dragback",value:function(t,e){this.draggedNodeRenew(e,0,0,1e3,t)}},{key:"dragended",value:function(t,e,n){var r=this.dragback,i=this.reparent,o=this.fObjectClick,a=n[e].parentNode,u=document.getElementById("newParentNode");if(u){u.removeAttribute("id");var c=fo(u).data()[0];i(c.data,t.data)}else{var s=2===t.data.id.split("-").length&&(t.y>0&&t.y+t.py<0||t.y<0&&t.y+t.py>0),l=s?function(e){return e.data.left!==t.data.left}:function(e){return e.data.left===t.data.left},f=fo(a.parentNode),h=f.selectAll("g.depth_".concat(t.depth)).filter((function(t,e,n){return a!==n[e]&&l(t)}));if(h.nodes()[0]){var d={x0:1/0,x1:-1/0};if(h.each((function(e,n,r){(e.x>t.x||s)&&e.x>d.x1&&e.x<t.x+t.px&&(d.x1=e.x,d.b1=e.data,d.n1=r[n]),(e.x<t.x||s)&&e.x<d.x0&&e.x>t.x+t.px&&(d.x0=e.x,d.b0=e.data,d.n0=r[n])})),d.b0||d.b1){var p,v=t.data;if(d.b0&&d.n0)this.move(v,d.b0),null===(p=a.parentNode)||void 0===p||p.insertBefore(a,d.n0);else if(d.b1&&d.n1){var g;this.move(v,d.b1,1),null===(g=a.parentNode)||void 0===g||g.insertBefore(a,d.n1.nextSibling)}}else r(t,a),o(t,e,n)}else s?this.move(t.data):(r(t,a),o(t,e,n))}this.dragFlag=!1}},{key:"removeMultiSelected",value:function(){this.mindmapG.selectAll("g.multiSelectedNode").each((function(t,e,n){n[e].classList.remove("multiSelectedNode")}))}},{key:"multiSelectStart",value:function(){if(this.removeSelectedId(),0===_e.button){this.removeMultiSelected(),this.multiSeleFlag=!0;var t=this.mouse,e=this.getViewPos,n=e();t.x0=n.left,t.y0=n.top}}},{key:"multiSelect",value:function(){if(this.multiSeleFlag){this.showSelectedBox=!0,_e.preventDefault();var t=this.mouse,e=this.getViewPos,n=e();t.x1=n.left,t.y1=n.top;var r=this.mindmapG,i=this.seleBox;r.selectAll("foreignObject").each((function(t,n,r){var o=r[n],a=o.parentNode,u=e(o.getBoundingClientRect()),c=u.left<i.right&&u.bottom>i.top&&u.right>i.left&&u.top<i.bottom;c?a.classList.add("multiSelectedNode"):a.classList.remove("multiSelectedNode")}))}}},{key:"multiSelectEnd",value:function(){this.multiSeleFlag=!1,this.showSelectedBox=!1;var t=this.mouse;t.x0=t.x1=t.y0=t.y1=0}},{key:"updateMindmap",value:function(){this.tree(),this.getDTop(),this.draw(),this.initNodeEvent()}},{key:"dKey",value:function(t){return t.data.gKey}},{key:"gClass",value:function(t){return"depth_".concat(t.depth," node")}},{key:"gTransform",value:function(t){return"translate(".concat(t.dy,",").concat(t.dx,")")}},{key:"foreignX",value:function(t){var e=this.xSpacing,n=this.foreignBorderWidth;return-n+("0"!==t.data.id?t.data.left?-t.size[1]+e:0:-(t.size[1]-2*e)/2)}},{key:"foreignY",value:function(t){return-this.foreignBorderWidth+("0"!==t.data.id?-t.size[0]:-t.size[0]/2)}},{key:"gBtnTransform",value:function(t){var e=this.xSpacing,n=this.gBtnSide,r="0"===t.data.id?(t.size[1]-2*e)/2+8:t.size[1]-e+8;return t.data.left&&(r=-r-n),"translate(".concat(r,",").concat(-n/2,")")}},{key:"gBtnVisible",value:function(t){var e;return((null===(e=t.data._children)||void 0===e?void 0:e.length)||0)<=0?"visible":"hidden"}},{key:"gEllTransform",value:function(t){var e=this.xSpacing,n="0"===t.data.id?(t.size[1]-2*e)/2+6:t.size[1]-e+6;return t.data.left&&(n=-n-16),"translate(".concat(n,",",0,")")}},{key:"gEllVisible",value:function(t){var e;return((null===(e=t.data._children)||void 0===e?void 0:e.length)||0)>0?"visible":"hidden"}},{key:"pathId",value:function(t){return"path_".concat(t.data.id)}},{key:"pathClass",value:function(t){return"depth_".concat(t.depth)}},{key:"pathColor",value:function(t){return t.data.color||"white"}},{key:"path",value:function(t){var e=this.xSpacing,n=this.link,r=t.parent&&"0"===t.parent.data.id?-t.dy:t.data.left?e:-e,i=r-t.py,o=0-t.dx-t.px,a=t.size[1]-e;return t.data.left&&(a=-a),"".concat(n({source:[i,o],target:[0,0]}),"L").concat(a,",",0)}},{key:"nest",value:function(t,e,n){var r=this.dKey,i=this.appendNode,o=this.updateNode,a=this.exitNode,u=t.children||[];fo(n[e]).selectAll("g".concat(u[0]?".depth_".concat(u[0].depth,".node"):"")).data(u,r).join(i,o,a)}},{key:"appendNode",value:function(t){var e=this.expand,n=this.gEllTransform,r=this.gClass,i=this.gTransform,o=this.updateNodeName,a=this.divKeyDown,u=this.foreignY,c=this.gBtnTransform,s=this.pathId,l=this.pathClass,f=this.pathColor,h=this.path,d=this.nest,p=this.fdivMouseDown,v=this.foreignX,g=this.gBtnSide,m=this.gBtnVisible,y=this.gEllVisible,b=t.append("g").attr("class",r).attr("transform",i),A=b.append("foreignObject").attr("x",v).attr("y",u),w=A.append("xhtml:div").attr("contenteditable",!1).text((function(t){return t.data.name}));w.on("blur",o).on("keydown",a).on("mousedown",p),w.each((function(t,e,n){var r=new ResizeObserver((function(t){var n=t[0].target,r=getComputedStyle(n).borderTopWidth,i=getComputedStyle(n.parentNode).borderTopWidth,o=parseInt(r,10)+parseInt(i,10)||0;A.filter((function(t,n){return e===n})).attr("width",t[0].contentRect.width+2*o).attr("height",t[0].contentRect.height+2*o)}));r.observe(n[e])}));var x=b.append("g").attr("class","gButton").attr("transform",c).style("visibility",m);x.append("rect").attr("width",g).attr("height",g).attr("rx",3).attr("ry",3),x.append("path").attr("d","M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z");var k=b.append("g").attr("class","gEllipsis").attr("transform",n).style("visibility",y).classed("show",(function(t){var e;return((null===(e=t.data._children)||void 0===e?void 0:e.length)||0)>0})).on("click",(function(t){return e(t.data)}));k.append("rect").attr("x",-2).attr("y",-6).attr("width",20).attr("height",14).style("opacity",0),k.append("rect").attr("x",0).attr("y",-2).attr("width",16).attr("height",4).attr("rx",2).attr("ry",2).attr("class","btn").attr("stroke",f).attr("fill",f),k.append("circle").attr("cx",4).attr("cy",0).attr("r",1),k.append("circle").attr("cx",8).attr("cy",0).attr("r",1),k.append("circle").attr("cx",12).attr("cy",0).attr("r",1);var _=t.data();return _.length&&("0"!==_[0].data.id&&b.append("path").attr("id",s).attr("class",l).lower().attr("stroke",f).attr("d",h),b.each(d)),x.raise(),A.raise(),b}},{key:"updateNode",value:function(t){var e=this.gEllTransform,n=this.gClass,r=this.gTransform,i=this.easePolyInOut,o=this.foreignY,a=this.gBtnTransform,u=this.pathId,c=this.pathClass,s=this.pathColor,l=this.path,f=this.nest,h=this.foreignX;return t.interrupt().selectAll("*").interrupt(),t.attr("class",n).transition(i).attr("transform",r),t.each((function(t,n,r){var d,p=fo(r[n]),v=p.selectAll("foreignObject").filter((function(t,e,i){return i[e].parentNode===r[n]})).data([t]).attr("x",h).attr("y",o);v.select("div").text(t.data.name),p.select("path").filter((function(t,e,i){return i[e].parentNode===r[n]})).attr("id",u(t)).attr("class",c(t)).attr("stroke",s(t)).transition(i).attr("d",l(t)),p.each(f);var g=((null===(d=t.data._children)||void 0===d?void 0:d.length)||0)>0;p.selectAll("g.gButton").filter((function(t,e,i){return i[e].parentNode===r[n]})).data([t]).attr("transform",a).style("visibility",g?"hidden":"visible").raise();var m=p.selectAll("g.gEllipsis").filter((function(t,e,i){return i[e].parentNode===r[n]})).data([t]).attr("transform",e).classed("show",g).style("visibility",g?"visible":"hidden");m.select("rect.btn").attr("stroke",s).attr("fill",s),v.raise()})),t}},{key:"exitNode",value:function(t){t.filter((function(t,e,n){return"node"===n[e].classList[1]})).remove()}},{key:"draw",value:function(){var t=this.dKey,e=this.mindmapG,n=this.appendNode,r=this.updateNode,i=this.exitNode,o=[this.root];e.selectAll("g".concat(o[0]?".depth_".concat(o[0].depth,".node"):"")).data(o,t).join(n,r,i)}},{key:"tree",value:function(){var t=this.ySpacing,e=ya({spacing:t}),n=Wa.data.size[1]/2,r=e.hierarchy(Wa.data,(function(t){var e;return 1===t.id.split("-").length?null===(e=t.children)||void 0===e?void 0:e.filter((function(t){return t.left})):t.children}));e(r),r.each((function(t){"0"!==t.data.id&&(t.y=-t.y+n)}));var i=e.hierarchy(Wa.data,(function(t){var e;return 1===t.id.split("-").length?null===(e=t.children)||void 0===e?void 0:e.filter((function(t){return!t.left})):t.children}));e(i),i.each((function(t){"0"!==t.data.id&&(t.y=t.y-n)})),i.children=r.children?i.children?i.children.concat(r.children):r.children:i.children,i.each((function(t){"0"!==t.data.id&&(t.x+=t.size[0]/2),t.dx=t.x-(t.parent?t.parent.x:0),t.dy=t.y-(t.parent?t.parent.y:0),t.px=0,t.py=0})),this.root=i}},{key:"getDTop",value:function(){var t=this.root;while(t.children)t=t.children[0];this.dTop=t}},{key:"getSize",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.dummy,r=this.xSpacing,i=this.minTextWidth,o=this.minTextHeight,a=0,u=0;return n.selectAll(".dummyText").data([t]).enter().append("div").text((function(t){return t})).each((function(t,e,n){a=n[e].offsetWidth,u=n[e].offsetHeight,n[e].remove()})),a=Math.max(i,a),u=Math.max(o,u),[u,a+(e?2*r:r)]}},{key:"clearSelection",value:function(){if(window.getSelection){var t=window.getSelection();null===t||void 0===t||t.removeAllRanges()}}},{key:"addWatch",value:function(){var t=this;this.$watch("value",(function(e){t.toUpdate?(Wa=new Ja(e[0],t.getSize),t.updateMmdata()):t.toUpdate=!0}),{immediate:!0,deep:!0})}},{key:"mounted",value:function(){var t=s(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.init(),this.mindmapSvg.on("mousedown",this.multiSelectStart),this.mindmapSvg.on("mousemove",this.multiSelect),this.mindmapSvg.on("mouseup",this.multiSelectEnd),this.addWatch(),t.next=7,this.makeCenter();case 7:return t.next=9,this.fitContent();case 9:this.mindmapG.style("opacity",1);case 10:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"mmStyle",get:function(){return{width:this.width?"".concat(this.width,"px"):"100%",height:this.height?"".concat(this.height,"px"):""}}},{key:"svgClass",get:function(){return"stroke-width-".concat(this.strokeWidth," ").concat(this.spaceKey&&this.zoomable?"grab":"")}},{key:"optionTip",get:function(){return this.optionList[this.selectedOption].tip}},{key:"canUndo",get:function(){return this.history.canUndo}},{key:"canRedo",get:function(){return this.history.canRedo}},{key:"seleBox",get:function(){var t=this.mouse,e=t.x0,n=t.x1,r=t.y0,i=t.y1,o=Math.min(e,n),a=Math.min(r,i),u=Math.abs(e-n),c=Math.abs(r-i);return{x:o,y:a,width:u,height:c,left:o,top:a,right:o+u,bottom:a+c}}}]),n}(_.a);w([q(),x("design:type",Object)],tu.prototype,"width",void 0),w([q(),x("design:type",Object)],tu.prototype,"height",void 0),w([q({default:50}),x("design:type",Number)],tu.prototype,"xSpacing",void 0),w([q({default:20}),x("design:type",Number)],tu.prototype,"ySpacing",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"draggable",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"gps",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"fitView",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"download",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"keyboard",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"showNodeAdd",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"contextMenu",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"zoomable",void 0),w([q({default:!0}),x("design:type",Boolean)],tu.prototype,"showUndo",void 0),w([q({default:4}),x("design:type",Number)],tu.prototype,"strokeWidth",void 0),w([K("change",{required:!0}),x("design:type","function"===typeof(Ha="undefined"!==typeof Array&&Array)?Ha:Object)],tu.prototype,"value",void 0),w([Q("keyboard"),x("design:type",Function),x("design:paramtypes",[Boolean]),x("design:returntype",void 0)],tu.prototype,"onKeyboardChanged",null),w([Q("showNodeAdd"),x("design:type",Function),x("design:paramtypes",[Boolean]),x("design:returntype",void 0)],tu.prototype,"onShowNodeAddChanged",null),w([Q("draggable"),x("design:type",Function),x("design:paramtypes",[Boolean]),x("design:returntype",void 0)],tu.prototype,"onDraggableChanged",null),w([Q("contextMenu"),x("design:type",Function),x("design:paramtypes",[Boolean]),x("design:returntype",void 0)],tu.prototype,"onContextMenuChanged",null),w([Q("xSpacing"),x("design:type",Function),x("design:paramtypes",[]),x("design:returntype",void 0)],tu.prototype,"onXSpacingChanged",null),w([Q("ySpacing"),x("design:type",Function),x("design:paramtypes",[]),x("design:returntype",void 0)],tu.prototype,"onYSpacingChanged",null),w([Q("zoomable"),x("design:type",Function),x("design:paramtypes",[Boolean]),x("design:returntype",void 0)],tu.prototype,"onZoomableChanged",null),tu=w([F],tu);var eu=tu,nu=eu;n("178b");function ru(t,e,n,r,i,o,a,u){var c,s="function"===typeof t?t.options:t;if(e&&(s.render=e,s.staticRenderFns=n,s._compiled=!0),r&&(s.functional=!0),o&&(s._scopeId="data-v-"+o),a?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},s._ssrRegister=c):i&&(c=u?function(){i.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(s.functional){s._injectStyles=c;var l=s.render;s.render=function(t,e){return c.call(e),l(t,e)}}else{var f=s.beforeCreate;s.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:s}}var iu=ru(nu,a,u,!1,null,null,null),ou=iu.exports;e["default"]=ou},fc6a:function(t,e,n){var r=n("44ad"),i=n("1d80");t.exports=function(t){return r(i(t))}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},fdbf:function(t,e,n){var r=n("4930");t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},fea9:function(t,e,n){var r=n("da84");t.exports=r.Promise}})["default"]}));
//# sourceMappingURL=mindmap.umd.min.js.map

/***/ }),

/***/ "W2nU":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "WOS9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("Xxa5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("exGp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hellowuxin_mindmap__ = __webpack_require__("IeYx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hellowuxin_mindmap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__hellowuxin_mindmap__);


//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: { mindmap: __WEBPACK_IMPORTED_MODULE_2__hellowuxin_mindmap___default.a },
  data: function data() {
    return {
      data: [{
        "name": "",
        "children": [{
          "name": "股东",
          "children": []
        }, {
          "name": "高管",
          "children": []
        }, {
          "name": "对外投资",
          "children": []
        }, {
          "name": "分支机构",
          "children": []
        }]
      }]
    };
  },
  created: function created() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  mounted: function mounted() {
    var _this2 = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.setGraphData();

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },

  methods: {
    setGraphData: function setGraphData() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
        var companyID, nodes, invs, persons, branchs, asInvs;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                companyID = 25; //获取所有公司信息

                _context3.next = 3;
                return Betools.query.queryTableDataByWhereSQL('bs_company_flow_base', "_where=(id,eq,25)~and(status,eq,0)&_sort=-id");

              case 3:
                nodes = _context3.sent;
                _context3.next = 6;
                return Betools.query.queryTableDataByWhereSQL('bs_company_stockholder', "_where=(company_id,eq,25)~and(status,eq,valid)&_sort=-id");

              case 6:
                invs = _context3.sent;
                _context3.next = 9;
                return Betools.query.queryTableDataByWhereSQL('bs_company_senior_executive', "_where=(company_id,eq,25)~and(status,eq,valid)&_sort=-id");

              case 9:
                persons = _context3.sent;
                _context3.next = 12;
                return Betools.query.queryTableDataByWhereSQL('bs_company_branch', "_where=(company_id,eq,25)&_sort=-id");

              case 12:
                branchs = _context3.sent;
                _context3.next = 15;
                return Betools.query.queryTableDataByWhereSQL('bs_company_investments', "_where=(relation_company_id,eq,25)&_sort=-id");

              case 15:
                asInvs = _context3.sent;

                invs.map(function (item) {
                  item.id = 'invs_' + item.id;item.name = item.holder_name;item.desc = '控股: ' + item.ratio + '%';
                });
                persons.map(function (item) {
                  item.id = 'persons_' + item.id;item.name = item.holder_name;item.desc = item.position;
                });
                branchs.map(function (item) {
                  item.id = 'branchs_' + item.id;item.desc = '法人: ' + item.principal;
                });
                asInvs.map(function (item) {
                  item.id = 'asInvs_' + item.id;item.name = item.company_name;item.desc = '法人: ' + item.legal_person;
                });
                _this3.data[0].name = nodes && nodes.length > 0 ? nodes[0].name : '', _this3.data[0].children[0].children = invs;
                _this3.data[0].children[1].children = persons;
                _this3.data[0].children[2].children = asInvs;
                _this3.data[0].children[3].children = branchs;

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    }
  }
});

/***/ }),

/***/ "mypn":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2"), __webpack_require__("W2nU")))

/***/ }),

/***/ "qE7L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('mindmap',{staticStyle:{"height":"100vh"},model:{value:(_vm.data),callback:function ($$v) {_vm.data=$$v},expression:"data"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=42@v1.3.42.js.map