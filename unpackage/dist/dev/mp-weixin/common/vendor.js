(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"物业服务","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 101:
/*!******************************************************************************!*\
  !*** D:/workspace/物业服务前台V1.0.0/components/wyb-table/js/characterToPinyin.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*!
                                                                                                     author:kooboy_li@163.com
                                                                                                     MIT licensed
                                                                                                     */

var base = 19968,
middle = (40896 - base) / 2;
var EMPTY = '';
var COMA = ',';
var chars = function () {
  var a = [];
  for (var i = 33; i < 127; i++) {
    if (i != 34 && i != 92 && i != 45) {
      a.push(String.fromCharCode(i));
    }
  }
  return a.join(EMPTY);
}();
var SDB = {
  "a": {
    "yi": "!]#R$!$q(3(p)[*2*g+6+d.C.q0[0w1L2<717l8B8E9?:8;V;[;e;{<)<+<S<]=9>.>4??@~A`BbC:CGC^CiDMDjDkF!H/H;JaL?M.M2MoNCN|OgO|P$P)PBPyQ~R%R.S.T;T<TBTqT|UQUXU}V[WCXgYCYDY_YdYuZ9Zs];]j]p]q^.^@^S^w^x_,_T`H`J`ga)a8aQb9budJddgoh9hqi2itj&jEjRj]jzk>k^l$l<mLmdnDoEoMoQoop3p5pWp`qSr.u'uLv]wIxXy_y~{z}`~r-$=-$X-$Y-%!-%0-%j-&^-&s-'t-(<-)2-*n-+6-+f-/M-/N-0.-2|-3u-4b-4c-4m-5E-5N-5Z-5l-6&-6+-7*-70-73-8F-8R-8g-:*-:5",
    "ding": "!2%%&_&x'u=:=h@NC`H?LQNkQ3Xo^Gn?osrUsNvAwKxKy9-!T-$6-$v-%O-&b-(+-9%-9(",
    "zheng": "!S#(#D/]031$456+=L?OIzYM[']I^g_.eUl}m~qJsHulwuxU-!?-,d-3D",
    "kao": "<dLWr5x7-!J-,7-/Y-/s-2'",
    "qiao": "#+$4&.&1'7'Y'z($(),B,{0c7y8<:H<8<YE{F0GdKYMCZP]Y_8_zd.d/d{e5fGfHfUmKmrmvp#t>t?uJv$vMyE|R}a-!}-#&-#8-#L-#b-$Q-%?-+q-,6-,8",
    "yu": "#V$l%S&9&I('(7(=)))m*#*$*B+2+F+v,0,b,i.W0.1F232L2a3(384>6P8n;';i;y<1>(>)>]@iB<B?BDBEC'C*CoCpELE^HIHJHTIpJIJ`KXL&L1LxMbMqNXNqPdPsQ<RFT?U(URV7WnX:Z?ZT[6[H]!]~_7_J_``Za#eXg;h#hVhuiyj!j#k9kDkMl#lClUlmmUnFoAp(pzqnrSsSt0vJwszp{_|N}!}$}I}t~(~,~.~w-$D-$]-%^-&j-';-'k-(3-(H-(v-*1-*Z-+#-+d-+{-.1-.2-.<-.K-.[-.e-/d-0=-0P-1:-1m-39-3`-3b-3e-41-5e-5}-6/-6;-6p-7:-7Z-:(-:2-:F",
    "qi": "!8%&%>&X&m&s'2'X'd'f(9(c(i(j)@)l+'+M.).+1y1{2=3K4c6&6'6)606<6B6`9`9{:a<g>`?`AgCLCuD%D2F2GyH&H1I;K~LkLuM&MYO0O3O9P8PbPcQqR5S2SCU0U~V%XYY&Z}[G^P`7cUc}dEeNgOj$j)l?m:n4p,sOuRv.y'{/|i}1~P-$B-%Y-)|-)}-*K-+G-+H-,m-.@-.M-/|-0y-2D-2c-4W-4`-4h-7a-7p-9c-9i",
    "shang": ")Y6V9cJvR8UqXJXa])asbQc,s,uSvz-#+-.;",
    "xia": "#Y#w&,&;'''I)1.u/j7=:[<'B[ByCtL'NmNyQOR([0`(cLh[iRkVt/t_u4uezFzM|W|{~d-&)-*4-.}-0a-5;-8S",
    "han": "#,.m/h:l<P>MFrGXJqNrOUPCPqPrQ|]@`+`2h1lBlZnXp*r;rWrkz9{4{B}x-#c-#y-$;-$l-$y-%Q-%n-(i-(x-)i-/!-3*-5B-9V",
    "wan": "#=$0&o.]0F4@5X5b6*628u9p<K?e?h@IChFqG!G7H2HHJzL=O5Q'RQ`;a:b<bGeHh&h)rMr^s'slu!-$E-%V",
    "mo": "!`#$#&#y$%%P'e(T*N3v5$517`8R=6?XA5E6FZF~JLM;MgP+RTRcU6]'](_j`s`x`y`za+qkuDyR|G-!e-'g-($-(U-*R-+k-,(-.U-.k-.{-8/-80-8K-8L",
    "zhang": "#~(#.:2o3N>k@,JhR`b$b`knmtujz'z0}<-#+-'I-*Q-16-7m",
    "san": "3T3q3w3x7~uJuwzA-'n-([-,s",
    "ji": "#r%''l'y)3)d)o*Z+'+9+G+M+T+Z+^+g+x._.c/R090d1S1W2;43484J4R5C5w6)6C6`7f7s878H8t8w9J9X9Z9{;8;<;B;C=(=2>6?YA$B+CHD0D8DbE:EQF2I*I|JEJnKKL)L:LkLzMdN'N5N:NiQ6QyRrUWVcVnWPWQWtX6XEXYXuY(ZAZ|[/]O]e^F^J^U^~`)b#b0c*ckc}dee!e$e9e>eyf+fXfrg)hFhriMjZlrqmr)sRt%uov3vevw|@};}N}g~!~+~F~{-!&-!u-#N-$%-&a-'u-(,-*x-+]-,W-.?-.V-._-.d-.g-/+-0$-0H-1%-1/-10-1^-1o-2/-2@-3'-4)-4o-5>-5H-5U-6,-6J-7/-7P-9e-9g-9h-9i-9j-:l",
    "bu": "0$192,FKJgT=UYZ^e+hhjmm8mFoGpGp}sjw]w{-'7-'E-/m-3#-4.-6=",
    "fou": "4I:L:O:Q~1-3:",
    "mian": "!G!d#4$U$W$]3Y5X6A6_6o9g9w@qB/CkG!H_Q;-!L-!M-!P-/_-7y-7z-8'-8,-8q-8r",
    "gai": "):5=5LD,ErI!J1Z'_/`TaYaac!lnpcw[|O}1",
    "chou": "!+#n$N+0/y0}2:4e5/6#9jB*B.GNLfUmZ+^3^5_4e%e4fWkan]nbo.o6oU}u~$~*-.X-/>",
    "zhuan": "%H'S'V.K0k1B1H1r2?7Z<r@RA7IDRsVk[J]Tb3b<c8gThai'mp-%+-%u-'p-(]-14",
    "qie": "%>+7+f,8.#.|0K0p2O>#DNE1P.ccd]eMlpt8y>-0&",
    "ju": "!Z$L$w%R*W,c,l/e1~3&3J8#:t=#=`=k@FBGC0DlD}FeGAIaIkJbMrN[OVP`RDTlU|W>Y`[$^Z`Ua*ccc{dWd]dae#e@eFeff8fSg*g<guh~l'lXmIoOq(rps%vXw_x|y;zb|m}o-#/-#:-&4-&Q-)<-)?-)d-*z-+0-/.-/:-3[-48-4S-4k-5.-9H-9K-9x-:@",
    "pi": "#M%D'C(5(6)L*F*K+;.n1C4M8}:y;/;2;A<,<{>a@'@2@KA%C|DQO+O]O^PvR!REScU'UfZw]m`l`na'i[l_m;p<pYpyqCqyr*s1s;trx4{8|*|=|p}F-!!-#,-)@-,H-.p-/#-/3-2#-3>-4F-6'-63-91",
    "shi": "!E!Q!e#?$p%$&+'$([(](q*^.&/5/n0[1w204z<gBNBQG)I:ISIUJ3NlN{Q>QQR9VYW2W@W^X2XNYxY{ZI[:[<[v]X^l^{^}_p`DaDbmgqi8ixjdk!kNkpl(lkntoMo^ocoeofp5ppq%q&q*q4qbr=t9x/-&^-&_-&}-'<-'@-(*-(8-)!-)H-+,-/<-0?-0d-0o-0p-2:-2O-3+-38-57-6M-9C-9E",
    "qiu": "*6*7+a0r3k4D5]6j>7CaCeF`HEJXMhNgNjONP;QMQ_RfSWUUX?XUXqXrajc$d'jpjskXl]n@o.oup:r?-#5-#6-$8-/'-/k-0W-0X-1,-2Z-4v-7&-9U-:Y-:Z-:]",
    "bing": "!n)F*4+/,>.75@DsOcZ7l`puqar||>-!:-!q-#,-#G-''-'C-(D-/O",
    "ye": "$>$E(0,a6g=;@?HfSb[]_]lUlfn(oip=rmtDtTtevTx?-!O-!R-$5-%N-'F-'e-(T-*o-4Y-61",
    "cong": "$'&Y1>8==g=l=p=vDIE=I2JUK0LsRZZk]$a}a~sKtBuKu_-*)-*V-+Y",
    "dong": "&&.r0b5D?7?C@JD|G;I#KwQ([&jV~^-)T-/=-0)-4g-5/-6T-9,",
    "si": "'?(b)^)g)p*+.</#40415O6i8l9~;.<|<}>+>0KxL+NLP7PiQnReS&W_`tp1pvp{qTqnr8r`tIuzyB-&6-&R-&^-&c-&s-&{-(:-)L-)q-*8-+.-0.-5j-6`-9N-:o",
    "cheng": "#0$,$P&W*O*[*w+A+{,O,v/l5[7#:`?}FQOoS(UKZV_#cHcJk#m$nhrxtkuxv@vWx=xB|2-!A-$h-'w-)o-*>-+B-/u",
    "diu": "r2xL-&&",
    "liang": "3A3D3{6K@0CRF{Q%Up[,_Oe1h!h2hCiBiHojss-!=-)h-.J-.O",
    "you": "(r)O*I7o8W;L;f=5=M>VDKFoFsFwG/KaOOOSPSQLY8ZN_;`qh%hMjWjnk6kPlYmEn3n>ncodp~r3x&x<-),-.y-/1-1p-1z-7N-8P-9D",
    "yan": "##%F%L&%&F&T&v(Z,j/u1?2$5t7V;!;h?<@@AsCVCYCZD3FmGpH.JlN_PVQAT$UxV9WUX/XkXmXnY?Z3[U^1^C^E_e_~`B`C`RbDbPc;g/g7kIm#mNmsn5nHnsnyoPoVo`x+z7zkzmzn{A{`{e|}}2}b-%'-%,-%B-%v-'0-(#-)~-*$-*F-*j-*s-+C-.4-.H-.Y-0V-3$-3*-3B-3n-5#-5G-5u-7K-7r-8T-8W-8_-8`-8a-8d-8j-9L-9Q-9w-:1-:N",
    "sang": "'EVNts-%2-%{",
    "gun": "#<&#'U6F6z9dJ>JpTFTwUu]4h<iF-/2-/g-2<",
    "jiu": "+E,*42464]8mB:BCBHBMH7cQnGz){Z-#}-#~-,l-./-01-3!-5w-6I-79-7c-:$",
    "ge": "&!/30*4?8r>:?B@}AbB3BwECHxJ1NwOrP'U9UPXM[X[hhLhmq`tetlu.xSyUzTzU{W}4-!S-!s-#F-#`-#j-%f-(A-*%-+t-.3-/K-/U-1u-3T-3z-6g",
    "ya": "#B%C&{'I*{,a.g=UDEKqO;T1WEWGY.^[g=i!j4lUp=s=v7x;}f-3C-3c-4U-6O-6V-9o-:;",
    "pan": "!&!>!?!H!o'L'x2A76=F>R?$AIH<IrRoT{WBY[d[e{f0rvtpw=zx-#E-$J-4D",
    "zhong": "#%(n*8+>+m/V2T4{6b99>j@`BnEkK*O:OBP^R2RKSzTKTNTO[@e^f>ohparHtQv5wbyF-3_-9@",
    "jie": "#S%@&{(.*d+=.G0e4J5,599D;k=(@/CfD,G#G`J[LzOFP&P:PTQ=SKSQSqT/TITPTlU4U7UPVQXOXSX}Z%ZWZh]/^K^~_5ckdve=j^qGtNtXz,|1}.-!m-!u-$U-%c-&v-+i-.l-/@-2&-4{-5$",
    "feng": "!@%N'40m5v7R:3C$FdHnN.PFSaWI[R^c`?b.c5k'n+n;r[u5uXxs-!$-!4-&%-&J-&L-(w-3(-3,-3F-8)",
    "guan": "!'$b$j$k(W)B,Y/f0E6:9&:]:gBVFqIEWSW{X+X.a?bifMh?kmsUu>w7zOzS{,{2}{-'K-(N-0q-1N-1j-2e-2z-6D-7A",
    "kuang": "!Y!z$Y%1%r%w(G+}/O/z5'538V8vZ<ZG^y_=aNbpgHgRgXg`j+lHlhn/qUrevy-4>-8>",
    "chuan": ",40jA7BYB`BhBxEvale[hIkJp%wQ-5+",
    "chan": "&6'W)K)q1N6D7$8*8A8[8_:6;xCODJIHKQQ2RGR_R{S1UeW!W`X3ZMZy]B^+^7_N_bfbi|n2n6o@rTr]uWw3xYz%ze{7{g-#Q-%D-%~-(%-(S-+Z",
    "lin": "$B&['t0:393O5{8!<WA?B%GsKEMOaWb{fEf]fgfxhlh}iVk{lgn$utzg|9}C~[-*a-1G-2t-7_-7n",
    "zhuo": "#'&Q)a+l,%,V,]102E2`8?:J;&=NE.HtJ:L|SJSsZx[+]6_Fd!nArfvLvOy|-4J-5d-:x",
    "zhu": "!a$6$h%^%v'f)!)/*h,@.4.S.T.[.w/P/o0]0n141=1a4n4q5.9+:s;W<EBrD/DVDpE_EmFYHtJQKZMMO`O{QTS>S]SrU;V<YLYoZ;[S_$_B`[aCbhdVdjfRggjMjrk1ljq6q{r}vbwExIx`|x-&r-(~-)=-)]-+2-/H-0E-11-3s-6(-7T-7V-8x",
    "ba": "%#.a3#:y;2;N<z>sD5E4GTO$WNYk`LdDdNgjozp?wr~~-!a-&.-.D-.`-/&-/0-1t-1v-1}-9=",
    "dan": "!K%$%5)r,S0N1h4V8A=A=B=H=~>q@9ATAVH*JDOkPUTLV?VoXGX~ZK_'a|bBc3f{mHn&nKn~~t-$I-'G-'s-)*-)a-,C-3Z-8H-8b-8i",
    "wei": "#o$M%}&0'#'D'M6/6p6r7+8y9f;6>n@gC+D!DOE+FCGBH)I&I(I4INJ]K$KJL7LdMDN0PwQ$QDQHR?T3T6V`WkX$Z)[#[^^*^4_I_^e;fefig@hbj>k<k[m}nvs~t4uGzz{G}&}'}7}Y~n-!#-#Z-#a-#i-#q-#v-#z-$T-&7-'J-'X-'z-+a-+b-+c-.P-/,-/F-/P-0N-0O-2(-2W-2p",
    "jing": "#C*?*u,2.8.9.A.E.P.R042v3F3Q5(5q6!9@=_>g?:?k@<E;EtExFiG8HlS/Z`]ge(jTjwrhuYyi|+-!=-!@-!C-!D-!F-$N-$m-%b-*m-03-2M-4:-4a-4d-7e-7o-9I",
    "li": "!!!0#A#E%7%_%m%q'|(K(L(Q(^)u)y*%*H,&.$.J.{/c1.1:2Z3$303G3b4)5}7T8Q8g:7;4@*C%DPDbEEF%FDFWF[GUI[I`JFKIM1MKN4OWOnP#PNPlQaR[S*S:STSVS_ULU_VWXhYY]&^,`9`}cPdbf`hzh{i5jDk+l7l;m6n=oBoNogokqAqururzs3tludvuxjyU}V}W}X~&~8-!+-!5-*}-+A-,^-.3-/p-/v-07-1W-1b-1k-26-29-2x-2~-3Q-4X-5I-6F-6l-7f-7k-8A-8Z",
    "pie": "$2DmW]u~",
    "fu": "%8%[(u(v)U)j*k*o+:.'/$///_0$0=1j3C3d4a4j4u5B5k5p6q7B8L939<:0:o:}<&>N?#@!@D@E@nA3C!CWC}D*DFE'E,E]EpFFF|GKHKHjJXKsNSODOGOXOwPIPMQEQIQWTETsTvU.V(V6ViW+WKWMXpYS[C^H`Va4a{b4bXc(c7cRd=dZegh*hPhRiAiLlIm(m*mmnQowo|pFq<q@t#t5{s{t|?-#]-#x-$`-&(-&.-(n-)F-+/-,P-.5-/)-/8-/X-0^-1|-2[-2}-3%-34-3N-4H-4}-7x-7{-8#-8*-8o-8p",
    "nai": "<p<q?L@=CcH4R'VHj[o}sk-9'",
    "wu": "$A%*&l)+,D,o0a2tAMB]D#D<EPFSKvMVPLQzS#Z>ZYZZ]U_6_9d9fYj6j~lWm)mep)rQrbrctvwkxc{y|U}6~?~C~`~m-!Z-*'-+R-/j-0j-3i-4/-4@-5,-5f-6j-6s-7)-9G-9W-9X",
    "tuo": "%U%V&z0L2J4v?{@$F_H6MUTbT~Y'Yc^QdHdQnVq+r`x1{{|;|<-&d-(.-(z-({-)1-)J-)K-*:-*e-*p-+$-+3-.b-/%-/[-0b-3O-4,-6_-8}-9$-9?",
    "zhe": "#'%+%E'P2f2|<f=VHtJ~NoP4PKR9RRRSU%VXW<Yq]*]:^%^0_ucKe`h(h0hei@iUj:j{kurAtMy!-({-/f-5W-75",
    "ma": "#X%3'8(e)h;0GsK?N}R+RTRUkku/z2-(u-)N-+!-+9-,r-0n-5P-8.-80",
    "me": "-8/-80",
    "yao": "!T$R'T(g,3,:,=,F,I,J,e,f/C0^4<7o8Q8s<a>_@eB>CADvFAI0I>J:L]M:M~TgWHWfY/Ya[|[}^6_ngmi6k`kll*l9r!tdwhxRzv}!-!j-%=-&9-&T-'(-'=-*&-0u-1I-2f-3;-3]-5F-5Y-7+-9T-:%",
    "zhi": "!7!t$s%=(J(i(k(s(y)2)I)Z*2*>*A*T*^*c+(+)+J+Y,G/k4Q4b5T5W5s6~7^7|9(98;(<0=E=Q=b=}>L>|?+?QA<AJB1B2B5B6CzD$D?E8GeM7N/O3P1P]R@RhTQTTTxTyU{W.WgXCX[XcY9ZB^l`@`A`haAb!b=bbbwdAdYdueTeWf,f_fag6glg}i1i:jDlqm6neoyqrr=r_vsxAy3|)|Z}R}[}j-)!-))-)Q-*?-*L-*Y-+O-0:-31-3S-3m-5+-5^-6a-8m-8y",
    "zha": "!l%Q0>4^4g=0D{OPOZX]Yb[(]G]W^ng=o;t*xHzI{N~J-&t-/9-/a-1{-22-9]-9`",
    "hu": "(1(~.j0Z1M3!3^545r757G?0AMCtCxD<E$GxI+K%K;NGNHNPNWQ^R)T2X`Xd]<]x^^``gVi3mqo)snt+tK}Z}q~B-$4-$k-'O-,j-.s-0<-0c-1`-2v-32-4?-4x-5)-52-5?-65-6n-7!-7?",
    "fa": "#k%O/'/N:q;*;3EeKkLvo1oKstzV{V-,F-,J",
    "le": "%f.U1_>5C_{u-$*-'1-(A-1!-1d-2i",
    "yue": "$S%!(a){0^0|242S2_373H4<8sAlM{O,O.ZaZc_>cid2dCdFfZgApDqBw2whw}zczd{[-,V-6:-6B-8Y-:^-:m",
    "lao": "&)'n,71s3<5>9M<b<c=&=3F'HYP3Rvg.g4hin`oDr(v/x8xa-%8-,9-/W",
    "yin": "&#&j'a)Q*a,^/B2{5G6{7V?3DJEGEcF=FHIRK4K8MuO2RLRzU=Y$Y*Y2Zu[M^9cXczh'monipNp]qer/xFx^z{{||/|l|w|~}0}@}Q~W~f~p-!b-!r-$&-$2-&m-&q-(6-)^-+:-/I-5h-9p-:!-:?-:E",
    "ping": "%b&'.H0W1Q:T=f>~CXE%F$H(JWMaOQP%Yg^jgrh>mAqa-$^-(w-/(-1w",
    "pang": "!o'A1+=/>R?$?=A/B|QmWsd@jf~6~|-0k-2g-:K-:M",
    "guai": "0,;%",
    "sheng": "!D!^...t7*7q859e=[=x?*E(KM]^aMb1q2t2|#|Y|u-4_-9B",
    "hao": "*:.,25<x=ZEMJ$L3L5LWLtNYO<SG[0]z`Y`ym,mhu#y]-%>-%|-0i",
    "mie": "!`(D1G1dJxL>SNS~W]vt-1e-3M",
    "nie": "1&294(4,=G=|B)B0E!GDMlSX^=e)e?eAezforAs$sJu*vfw9wByVyY{&|c}(-%L-%x-:#",
    "xi": "!>#6$3$d%/&(&g'J's(!)P)n*l+7,,,n313z434i5j6H7?7W81878g979U;V;n<2<5<6>c>d@>A6BABBB}FUG]HeI9IbIwJ+JVKzL2NdPjQoQqRYRqSiT!U)UzW9WFWiWlX7XfXjXlZH[K[m]5]F_@`.`/`W`_a(cCcGcfcwesf)fulGlplwm&m4m_n:oIokp2p7pbqLqMqvsYu+ufv&w6wSxJy,z[{5{b}9}?}P}U~#~2~q-!%-&?-'2-'`-'r-(1-(C-*C-*O-*{-.)-/x-0_-1+-1J-2X-2q-46-6*-8I-9O",
    "xiang": "!;)*+50U5Q6Y8b9u:U;E;J<4APC{HGHvL<N~RbS4T.VgVsZ(_0`PdqmGmYmZmfqiq|v(w4z&zXzt|H-$3-$9-%R-&g-'+-'{-(&-(?-(b-*w-+_-/C-/~-1<-1L-1g-23-7g",
    "shu": "*V*x.0.D2B4#4K5%5^6s9/;,@[BPF(GuIBIeK7LUL`MLNePDShT*UHW'W0`=bOc+e%e0gIhOiOjQmSqIs_u[|I}!~Y-/A-1Z-1a-4G-4p-8@-98-99-:e",
    "dou": "$#,[,}1E@#FEKCOI_E`5jym%mMnMpCrIwpzH{.{~|]-'9-(F-.%-.&-.*-.,-..",
    "nang": "Sd-(&-()-(^-9b",
    "jia": "+L/23l=!?)?u@jF+FuI.P5P>TaU4UI`]a$a]bxdRjGl{m/q#qOrXu,x$x>y`-$a-$e-%c-%d-)B-+5-3J-3q-4(-7i",
    "mao": "!M#i$i*:/66e:u<eDDE/E2E3HVJOQ9QNRXT}WY`|a&aSbrgPmkn!nJq>qcsVx,y%-,B-,O-4|",
    "mai": "?W?XF>K^LgS{aKaxj(l+~g~h-!'-5{-7t-7u",
    "luan": ";D?dAzA{L=NDW~o{r7w@-4'-6G-6h-:y",
    "ru": "/M7F8G:1>AEgIYJ6KlLhQJSHU:VGW,inlEm`oSr+x_-%E-&!-1]-3)-3K-3x",
    "xue": "$?,(A=C@E@IGLKStTnXd[p_[coe,hdibig~/-!_-#M-18-2k-6%-6^",
    "sha": "%4&G052u4O8F8~<<<CFaG`H+K<U]t}xPzazi~S-,[-.h-/q-/r-2=",
    "na": "*0.u.x4E9#>WIYIuTJU!Zt`m`pgNlNlypHu7wcyZ~0-!d-.x",
    "qian": "'K.(/~0A0t1'2*2D2R2p6+7[8J8q:G;h>b@vA~CnD(EIElF:I%IjK>KLNNO&O8P}VR[*[u]u_q`!`&gSh;i~kjk~p9pEpOq;q?r6sPtYukvqwPwgwtwvx+{x-#U-$z-*+-*/-*=-+U-,y-,z-0x-37-4M-6z-8G-8M",
    "suo": "#*1Z1^4Z797U:?;cFaFbJ7P{VJcuk)tatju3u9xi-/b",
    "gan": "!3%)*1*t.Y/x1*1}3%4s91>GCmE#T>Y^bJbTcAcTcti}nE-+e-.Q-1T-2w-3*-:i",
    "gui": "!q#o$.$C%x%})0)s,E/?1K1T?NERJ;N%P/R*RpU<V{WVX0XPZ!_*aHbod<dng>gEi#lilxuyvlzY{P|M~#-#K-*;-.7-.:-.=-/S-1F-1U-2%-2r-34-:Y-:]",
    "jue": "$Z$l$o%6,%525S8#9NA^D=KiKtNnO6RwRxU!WWWbX%X5X>XBXZXiY4Zj]N^f_}a0c[chd<fCfDfwpKv)v:wCyo-)0-,$-2r-3<-3=-5g",
    "liao": "$:,A,m,x1g7n8%:@:C=OA#ADJcM(RnRv`1b8f$fJizl&mnopv,wNypz.-&@-&G-,)-5t-77",
    "er": "3><m<p=8=T?HEyLoS|U8Z6aBaGbjd3gshtjJl2q_x9|L}M-'/-(=-)Y-,Q-,R-/D-2)-3j-6b",
    "chu": "$e%s(/)M.%.)114y9=<~=%A_DCG=IdIoMMNOPQS'XRXe[/`E`Oa,cmf=fTfcmaq3rnxlzW|`}p}|-59-8O-9|-:)-:9",
    "kui": "#f#o$C'D,Z,p0v1m22=m=o=s={?NAFI6IJKnLyN1N;NbQY[edpf*fvk;mXt;tJ{0}7-$A-$d-%6-'a-'o-(P-(`-*6-+P-.B",
    "yun": "!F'N*;/`/|0y4T6z7!7<7C8z9|<y=?@_D@FLG7IAIVIyK_K|L#L0MIM`QcV@a3b)b@bYc=j1kQm!m7mVmgnRo0o8pVrO|'|d}5~7~i-#?-#g-#n-#{-$(-$/-'N-(p-)'-:'-:0",
    "sui": "!q#G#J%G&f)$)t+R+h+p5m7>7h7x8D9V:4AQCyFOFPNxV}Zm]c_QazkFkHl.uqv!vF}*}/}G}H}w-#$-#r-+|-,/",
    "gen": "CQEHdc",
    "xie": "';(f*&3c4k5+595I5h6g6v7&8>8T92:B:M<3>l?T?V?ZA&LRLTM0Q7QKS+S@SBStTRV*V^W4XKXOXS[B[y^<_Z_mflfnl,lU-!i-!v-#1-#D-#h-$#-%c-/S-2%-9Z-9q-9t-9~-:b",
    "zhai": "%X)3,92q<?a@b]q=-9c-9d-9i",
    "tou": "4G6sMyjqrItA-$b-&r-+h-8;",
    "wang": "!664:h:i:j:k:mFvGmO>P*Q,Znh5iGj+jM-.N",
    "kang": "%<+U2v3tg1lJpgugwmz={L-17",
    "da": "!W.u/(/S84;H=<EsF*LHS0VCYldzi{j0j7j;k?kZt]tqvZ-!g-!|-#R-:S-:U",
    "jiao": "$y$}'~+k,A,K.`/I1o5;8?8]9O:J?E?j@hA9AKB(CaEZE[KTM5NZP!RkR|WWWbX%X5X>Xs]Q]fa`d0dhe3gvh_hfi;i?lvnkoHo]p#q]v*xW-'%-(B-*h-+;-/Q-1>-20-3|-5k-5s-78-:a",
    "hai": "5L?Aj9l/lnnro<-'!-'~-)Z-)b-+>-+p",
    "heng": "?J?mMZT9vc-3o-4$-6e",
    "peng": "%c&'&S'+'Z+,.V1+1@5@8P>~AACgE%FdJRMkRiRjU3eSgbh:s9v{zL-$+-$0-):-*A-,X-,b-,q-4K-6y",
    "mu": "!1#N%]+V7`7n:@?.C5DeF~G%O=e/qKqPx!~3~G-#9",
    "ting": "/s5l<t=j=z>%>&?qC)FnI7PWQ8ZJ[El=rUxKz`~K-!~-$g-%e-9F",
    "qin": "$j$k*'*Q.d5c=>>MD1DAGZG^GkMRO8Q}RJS7TVWJWrZQc]pXpkriwix{}c-!]-$~-)f-+E-/c-33-4L",
    "qing": "&/&Z'i046+60:ZDaHzQ#Wr[%]%_Agph+i7m<s4vi-!;-!<-!B-$7-%P-/}-2B-8X",
    "bo": "%h&^'x(B(U*L+l081c2%2,3~4m:S>;>t?fA!BuC,DrGWH=I'J{L4MmO^U+U,U6VrW5ZL[d]Rd8d_eKf@m3pxq5qFrVtow0wxw|x(yT-'4-'^-(E-(V-(d-(g-).-)[-*^-+)-+~-,$-/0-1=-1}-42-6k",
    "lian": "'K+D2+2P2V6w7b8k94;s<T=Y=n=q=t=u@+AZAcG(G,HLJTKDLELOMsMtQtS=U`UaVUW#We]0f2j?k(n0oPsZsyt`u@vKxfy}-,n-0U-0}-27",
    "duo": "&U5|:!BtU0Uncrdfdid~eYg!g#g5plvUx5|E|J}*}3}S-&~-(;-(z-)1-,i-4]",
    "men": "#{$*+XGRNEsuwVz1z6{>{M-#!",
    "ren": "(o*,*e+#4A4U5)5y8x9$>?@AD)E}FGGDTUU2Y!ZC^I^Vg&gFi&p/p;pRqp-!W-![-#[-#w-&i-'#-(2-.^-3{",
    "shen": "!U![$8$r$u%j)#)9,12e2g3T3U3q3w4l96:p:~>i>m?t@BFkHwH}JGK!LCPGPHUNX)Y1YHZ*[2^)_%_L_S_VfylPqRrj-$W-)W-.m-/z-0@-0|-1)-2N-4A-8b",
    "ze": "#R#}$n(+*p/,0J1I=0BsKAS?Vz[(].a@b7b]c:jO-&t-6.-9s-:,",
    "jin": "!#$j$k%M)8)G.U.m/J4W4`6L70:/B6F&F;GcGkJYM!TWW%WzX<X@]9_sb&bIc#j2j<k8olomp>sTwGy2-!^-'m-(Y-)$-7D-88-::",
    "pu": "$5*k+j0$8LBTBUFXGGGaH~IsIt[D]]_|bEfInprtupv=xbyqyu|[-/m",
    "reng": "(_DGiu|z",
    "zong": "&Y'h+?3P3]4$5z6E6Q6n6x7(7M7X7e7t9%9n<J@MI=J=QU`eePeRf1t!v_-)z-*5-+K-,`-,f-.8-09-0G",
    "lun": "&n'k*|6:9&='@4D:GLPk[1^`eBhAi)s.|k-04",
    "cang": "15B$BpC<DUI~M#R3b/w8-50-6P",
    "zi": "!i!j%()R*/*X*b+E/)2l354F4d6I6W8O9s<u>z?!?MB'CwE5E7ENE`F4GHHuJbL;NsXHYOYP[I_caFa[bzb~cZcpd(h3hQiJmbp&pmsGtRtuy=yO-$s-$t-,I-/{-0r-2P-4e-9)-9f-9i-9u-:D",
    "zai": "#^7HGHb+g|i9n^",
    "ta": "(d)i2~VAZr]wdBe7etfFfOfpkdkiq+sBt]tex1{'{5{;{={R{o-!s-#*-#B-/?-0t-2d",
    "xian": "!:!O#5$<&#(F(h)X*3+D/D0V2k3B4%4|5A5c5t6,6]7J7r8Z8c8q90:%;];d;h?&@oAnA~B;BvDSDwFzG,LOM'M*MpOKO_O}PJT+T0V_W:WRX,ZXZo[O]d`>awbKb^cYdgd}f;fhgBhHnfo'oPqvr#r$rFrqs<sps{uww'xJxMy4zBzC{H|K|a|e|s|v}J~v-#T-$!-$$-%.-%H-'D-(M-(o-/T-1l-21-55-5x-5y-6$-6q-7G-7h-8$-9P",
    "cha": "'0*049B=C9CjD}EYEdTAYyY}_1enr't7t[vryDz!-!U-'Z-(O",
    "hong": "&*&8.*.>0o334=4P4f5i8o8{;z<!<==CDyF?HoHpL*LXNtXtXy^L`'`*`,gUhNhwi+p[q[rGrYt:z?zXzrzt{I~U~e-!n-.(-.a-3v-6i-8<-8?",
    "tong": "!r$@%o&>*]+m.?/Q/i345D5N5`9PA@EjJPO1T,Z,cFj|ndq:qYqjxC-')-/L-2*",
    "dai": "0,1n4x7%9AC?OMQ]TdW=Yd^xa7aLbqdff'gCgLg[i%jIk4p0~z-!0-)E-/>-3I-8N-8e",
    "ling": "%d)D*M++.5/+4p6@9];K;U<.=KBqD[GiJJJmL%M|OiT(TcUjYVdLgZh/n8oWpts0x)zN|q~;~O~]~a~c-!2-$L-%`-)C-/$-05-2C-3L-6Y-7E-7q-9z-9{-:A-:T",
    "chao": "!k,h,r2u6?9b;5<wXDY=]?cdh`mlpSwa-7w-8v-9#",
    "chang": ">J@mA+DTGMH!UlUqZfs&sWy+z'z(z0zh{1{a-#d-.0-02-1X-2H-2T-92-:d",
    "sa": "8g?^HDK{LYY@fnpQuwwS}A-!c-!s-&,-&P-)&",
    "fan": "%0(M/1/40i2A2d6R7i8$;o<[AIBcBfE0KNLPM>N!SOVqXva=bcf<gEg_hThkj5p'v#v?wT-&=-&Z-&n-&o-(5-1E-5r",
    "miao": "!J#m*=.10s6e6u7n9z:@D`M$l3-4s-6u",
    "yang": "!R#!(C)Y*R4t;E;J;P?5OxQ/YX[T_0gahGqDswt,wX{}|.|y~:~}-!p-&8-&M-&k-',-)G-0]-3a-3t-62-6X",
    "ang": ">Xo:-+g",
    "wo": "#l&A,R,_6}>I@OAlB!G*HQLgP[Qbe:-(p-:4-:I-:L",
    "jian": "!%#9#`$<$D$I&N&b','r'}(&(<(X+D.p/9/g0#0/0Q181k262I3_5U6Z788(899v:9<F>$>S@fB4BoCICSCTETE~G<GrHiI{K5K]L!LVLwN=RGSEU5UcVjVlWAWRW}X#X,YT[.[F[c],][]}^!_Y_v`K`Racaybkc|d?dKdye8ecephvp/p;qXrMrZs(tFtHu!ubv4vDvNvovpw.w1w5xwy:zCzD{J}d-!V-#;-#>-#O-#X-'A-'S-(7-(k-,h-0Y-0`-0h-1(-28-2h-37-40-4R-5@-71-7F-7I-7J-7W",
    "fen": "#|%A*9./2x3=3r4S9';M;q;~ARD4IxKmO?O@TGY,`^`ff|hjnOpUvY}K~5-'W-'}-(c-(r-.w-1M-2Q-35-85-8n-9.-9:",
    "bin": "%A8I::A)AiNc`X`cahailKvjya~l-$p-%G-%k-,'-,1-,E-,_-,p-.!",
    "di": "!u#/%W')'.'{)<)_*U.v/*1=2c4+6c:);X<?=b>;@WDXD_FMG9G_ICJMJrJwJ|M6Q+QVR<TtX*X8XIYW[:[A^q_f`dcee_f/gYjKjtjukLkekwldp0qNuIyj|5}#-!X-#=-$H-(y-+n-,>-0>-69",
    "fang": "!I!n(l4Y9*>TBjD;O!Y;^ed@lLp@siwn|,-,?-.v-1s-3E-51",
    "pei": ">Q?(JBSwUrUsauc2hyiPnBn{s5y7|%|f~M-)#",
    "diao": "$#&a,C,k.B1]5FJML|NhOaXxZ8Zv_M`ro~p_r!r:s*s[vawUxExR}v~D-.c-//-0%-2L-2{-3&-4O-9>",
    "dun": "!<!A%J'3(%Pxd;eZf?fKfVjikGkvpLw`-$G-%X-*c",
    "wen": "+C+`+z4B4C5X7!7<839)9|=d>^?gD'G!O'O(R/RO`ahShWiNu6zlzqzw{<{D{Q{c~4-#?-#{-%(-'f-)(-)4-.r-0g-0z-2V-36-3G-9<",
    "xin": "!=(F?zBID7FkLZSyVtY3Y<gBiWlOo[pIrNv1w,xtyn{w-%/-(q-(t-)$",
    "ai": "$F$|%l%~&e'M(:5=CbKGL6MN[K]k]{b2g(r9tWv^yK}1}8~s-!.-!3-'U-(m-1[-3l",
    "xiu": "**3h5g7u8,9T;Y?i?yB*B7DuQ{ToV0V1`ur%rBtSu=u^uvxp-&K-'l-(X-,@-,U-/Z-13-3}-6d-9^",
    "xu": "!$!*!4!Z#j$l%;)W+@+H3[5K5e5x6T6X6s7)8X9[9_=X=e?4D/IeJ)JXJfKrLxM/NQNTNUO[P$Q:UDX|YBYJYs[8[Z]C^^_3_ia^lUmwnLo*qovn~E-$<-$>-%T-%U-*[-,w-.G-.W-1_",
    "tang": "$f'@)f0{3V3j3o;l=)@zA4J4LJQSR$RAcMc~eef&g+m]o=tiu)uTv'wDx[yWyd{1}:-#I-']-'h-5:-96",
    "huo": "!V$S$^(*)>)S*Y*_*`+|,W10=$=4AuCJG.IhMTSI[g`0a<bacnlTpesrvhwoy6yyz5}y~R-!,-#S-*0",
    "hui": "#J#[$G)N*i+s1;5R8.869I9}<9<:<L<^CxEbF1K2KeL8L9MFN,NuO7OtOuPZR*RyT_V:Z$Z2Z_[L]S]n^#^X_!_<`FaXbyh4iEjUk*qouqvI{6{j}3}S-!Q-$c-%C-%l-'R-/V-1#-81",
    "kuai": "/w3}?]AWIJIql|n*-)0-1P-2.",
    "cui": "'g,w2z3L4[697>:4<%<@?R?U@.AEANAhG{THVmd#uQ}Y-$|",
    "che": "$;%I&?&@=JFjP@g<h~jA-$M",
    "chen": "#t&M&t'`*[+A+{5{>FA}EKFRFcK:LmRBTDW6Y7Zz[Q[o^;_V`$arb;c`cad>dKeagKimjHmDo@pAt(|C|o~H-5T-7]-9l-9m-:=",
    "xun": "!x$Q*p,^4;8MAjEnF:KLKSL[LaMcRzS%XwY#Y)Yt^R^T_+j%jajlkclsmzoTv`-%A-(}-)U-+%-1?-1H-24-5A",
    "chi": "!]!y$).X.y/A0+02133,5W<#<$<D<H<|=@>>?2?D@SE9E|GeO%OHORR;U/U0UkVMYFZ9Zq[t`8aRcBc^d+dfeGj@jBkKkfkrkyl7q7q^qusx~9-&l-(4-(|-+&-.R-3Y-4!-4r-4w-4y-5]-6Z-8(-8C-9k-9v-:<",
    "xuan": "!m!x#d$['5)k0R5?7J7d7w9K<G<_HMHNJ8K#L/MQMfPEQ?S<T)U$[;[W]_^&_abRgDi$jkl!q,ratLu?x0yl-#'-&2-)U-)k-0f",
    "nu": "%a/.?;-)>-+4",
    "bai": "+&.;3;3M51L^W3b:b_-#k",
    "gu": "!/$J'B)A*~+P.z010?0u3g75:r:v;Q>K@(AfE)G>GhJ,LSOdOjSeXFYR^h`%a]bxgdgehYi,iXk,nYprpws]wwy.}h-%@-%W-'Y-(Q-+`-/;-0'-2I-3^-5?-6S-7%-9*-9+",
    "ni": "!h#P*G2m73=i>$>}@pABA{DqLpOLP.Q!XXZt`~d`h.jhmCpnx3}L~X-(e-0,-2J-7`-:+",
    "ban": "*E2s5!9;>PBgBkQ*QvVKd[iciipPqEwfzx|$-!h-$F-%Z-.n-35",
    "zhou": "!+#U$x&y062.2@2C3+384:777o8p9:<B>B>o?#B^F@GoI$LfY][a]y^r_4_Manc0gkg{h,i0i<k7m>nCqg~Q-);-)`-)t-*r-+[-0(-3~-6f",
    "qu": "$L'o(}.2.F/@2U3?4o5#<1<U<~>u?/AxDlG:HhKbM}O[OfOpQdRDRlSkSpT'T:U&WxX!X&X=YeYjZj^tcjcld%d*fqf}g2gWw<zfzu{i|4-)3-)5-*W-+'-,S-.~-1'-1;-3W-4l-6E-6[-7}-7~-8&-8+-8U-8u-9A-:/-:H",
    "ci": "'=(A)%353a5579ESEUG6L;OsQpS3Yp^saqc.c_dSiYiZiaij}m-&y-'*-+l-,%-/+-3V-5C-5D-7'-:6",
    "beng": "(l5@657k9iGnO*dtf3jYk2uiygz>-#)",
    "ga": "g=onsfwH-.A",
    "dian": "&p'v,j1iIiKRPXdXeVewq!x%|8~@-!E-%3-%4-%z-*g-8Q-:8",
    "tian": "!:#;'1'H,j4w6D>v@:BRBXGvWmX9atnTr#rFsXx%xM{%{n-!>-!G-'$-3f-5J-5S-8:",
    "bi": "#L#M'!(w)L*@*C+;.n.o/E/Y0(0)1/1<2r2y4M4m6>7Q8@8};7<,=a>a>r@lA[BlC|E*F.FJG~H:J<JdKHLLPPR!TiUfVhW$W)X^Yh^v`<a!aEaUbMblc/d|e~fPfQi[kBl)l^mjmym{q1truFvQx2z8z9z:zP{B{C|V-#,-#G-#p-&u-'j-(f-)I-*X-+x-,N-.T-/*-0Z-2S-45-4}-5b-5n-8~-9S",
    "zhao": "#'$K.e00:V;#;?>*>1>2GdYf^ucScxorp<q.t6wL-)8-/G-3&",
    "shao": "#+*y/r4r6%9>C&CqD^FyHSK}Tjh$la-#&-$)-,Z-/`",
    "zuo": "(|*S+!+n/,/p4*7{?'D{F^H`HaJ?Th[(nWp||7-&t",
    "ti": "!g#e')'?)Z)|*v/8285f6|9Y9y:{DXF!KgLIUzV&V'[qd)d2eJemexf~g8jxk=kLo&rDt)xy-%$-%r-*2-+m-,0-,L-,]-,a-/^-0B-2U-4;-4w-4y-5L-5M-5i-6r",
    "zhan": "$H&b.33*6=9oGQLMN2N`NaOeWyYQZ/]h]l^B`#cghUhgiSl0n|zK~V-%~-&*-&N-&e-'|-*b-*l-.Z-1S-2y-37-60-7=-8i-:h",
    "he": "&c()*(0z2i3@4?8r<N<ODdFIGFGzJ1R(SMTmV2WOYGYIYw[z^i`x`yaTbtcIloovq0vgzRzU{){X{m}Z-!7-!8-!9-#7-$P-%f-'&-(@-.|-1u-5$-52-58-6?-7#-72-7v-9n-:>-:`",
    "she": "'y(`BJBKBLJuNpOgP(S5Y>^dagakc'cDg~{!{^-#h-)u-7l",
    "die": "!g!t&w5M9G<k<l>pB5C6D~PmQ`R@V,V]YU[7_WcbdOdXdreigojNz+-#1-0S-2R-3d",
    "gou": "/01%2)3g6t:&<h<i<jD>DhO[U#VBWwX;YNY~_(`ob5bgk_pMqHwl}k-#A-#m",
    "kou": "!P!Z#r$$,P.2/W1OD+K=KFp$-5K",
    "ning": "$P=R>!DpLevm-,~-64",
    "yong": "%p&>A]DcIPP=Yre2e]l@mJmio9rHuVyh}n}~-%*-%s-'x-/y-0w-15-2A-2o-5`",
    "wa": "%K,),?,E,`=N@r@xOyTuW1lc-#W-#^-#t-8w",
    "ka": "?8U@qV",
    "bao": ",<.~6h?,DgGYHcK`L4MJN^OJTeUdV4V5Vf`ib*d8q/w%x.zs~>-!6-&x-&|-(9-)/-+j-,M-/7-1~-3/-3A-6Q-9r-:B",
    "huai": "=7N3N8VDVSeE-:f",
    "ming": "!C!w#zEDJ'R,WuZ0m^n_q}xT-3.-6L",
    "hen": "Y|-!y",
    "quan": "$b%u/K0B5<6$7:9mEqI3NAP|SlXLZ#_)dkeIgzi=o5qxv%xO{#-#_-%M-&$-)V-*3-,e-0L-2^-9}",
    "tiao": "!~(t),,J,g/!3/4.5F=S?PCdD^H0J@JMJNPnWdZ8Zv_McqdwjCr!rdtyxR-#%-,G-/o-1&-2;-9y-:C",
    "xing": "!D#Z&$0Y0g6J@YApBFEuF7FhHrP9T#XVX_[_lMluo+pBqZqwrhwZx6|D|S-'V-(/-)p-+D-/5-0D",
    "kan": "!N$=$g%?'^.QG&T%h8ho{4{q-%)-.+-:R-:X",
    "lai": "#8#F/X0%2/2MG'H%MSW7Zqaob,c&c4k.mBsgxd-$q-$w-)y-0*-4B-4f-8%",
    "kua": "50?>B~Z=d9dlq~-+s",
    "gong": "'91*44474=8o;z>[OBXQXba6bZfzg$gtrG-!z-,T-:L-:Q-:W-:u",
    "mi": "!s#p$A(w)')w*C1d2b2}3p407c;>;F?bClH{J#K'K/L}N#N6PaU*WZW[WcX1Z.[j[l_g_rjXo4oXoYo_r,z/-!K-66-7X-7Y-7j-82-9&",
    "an": "!(!.;)?I@XEzGlHWHgJSUxZS[N_d`k`{r1s:x]zy}+~=-!w-!x-$1-(l-/E-4I-4u-6v-8c",
    "lu": "!)#Q$_%|&L&d'])E)J*}+[+o071X1v2!2#2G2H3I6S8^9q:f?9A,AtBmBzCFCMCND.G@JcJeJtKcM[N<NINVR>SYXh[~aVb|d$dseCf#gxh^h|i/i>iTk5nwpis2sascu8uMumvGw&w+yr|A|t~x-%J-%_-)+-)r-*N-,3-.q-.t-00-1i-1r-1y-3w-4E-4P-6!-6>-6U-7;-7C-7M-7b-8l",
    "mou": "!|7n:@Oq[[_Ue6t=-#9-3y-8!",
    "cun": ".N2nA>lS",
    "lv": "$()(*r+~0`5Z5~6S7_7j9q:*@wA(A8A;HkM,NKV=VZm'rJw#xDz_{T-*u-+*-5a",
    "zhen": "!X!b!c!}%Y'%)5)T)b+I.A0X264N4w5Y7D7L9,:2=I?%B9H5I5IWJ&LnTpUSWaYKZb^pa2afbWc%g^hZi4iqkOnNoxq$r~s`tOu$u%wJyS|0|_~L-)D-,o-1f-3@-6R-8d",
    "ce": "/%/U/^/t0G1W36F/H3HPJA",
    "chai": ")&>HCjEJNzS9T[Xz`jp4wY",
    "nong": ")v*j+q8C?cAXL,V~]iioipoL-,{-9a",
    "hou": "#c$t0q3Z<M<UEVHq`MjgltmWq|t@-'T-+r-/B-0C-1O-2!-2,-9Y",
    "jiong": ",M4~5uB#B&MeMjVIjFjjqi-$}-%h-)6-)X",
    "tui": "+y=N@tJ^MAM^P?PYQkVL^.eof7jb}D-$n-$o-$r-%m-)l-+u-.L",
    "nan": "@^G$HOQe[PcEk]}_~'",
    "xiao": "#+&4&:+i,N.l/q0!0O0c1(1b1u5a9R<;>@AGFyHCKyL2LtNBNMP<RPR^S!S[Y5YzZUZl[ke*jom9r@xh~I-&3-*`-+8-+q-,!-,+-.I-3X-3p-5Q-6W",
    "bian": "%`&}+8,;/=0S2A2W3W6k6y:$:+B/C4DLHUL{QBV+WTW}[5^/aJbfi^idieifihikiliviwkSl4l5oatPzO-##-#<-0I-0J-2`-3R-5&",
    "pian": "0l6y:$<I?K@5WX[9_haIaZdtejsq-)O-)v-*(-**-+?-+N-+w-.z-5&",
    "cu": "1P3)7S?xK)XAZDcjcvd%d*eOehf%fAfBo$-%<-7O-7R-7T-7s-8t",
    "e": "#3%:%B%Z%y'<(9@bDRF}HXKfO#PBQ)WpY+ZF[?]L^2^___`NgMgii(j8kRkUl%mRpJpjrrt&w*xoyCzn{f|!|3|:-$?-$R-$S-%%-%&-%t-%w-'6-'L-(G-)n-.f-0[-0v-1h-2Y-4&-4<-4=-4z-6o-7$-9[-:3",
    "guang": "%w?@B#B&EWgwj}r0-89",
    "ku": "%,&5*D,@,T5:9E>{DoU1UbVTdPllnm-+o-/R-:p",
    "jun": "&].=/`0<0CFlGCI1O/PeTXWhaeg?m1p^qfr&t'wj|Q}^}l-$j-'8-(J-)m-+F-/]-2?-43-44-47-7U-7^-7d-:Y-:]",
    "zu": "(x*J+10H4}95GqHbIkYm^kd6eLtdu2u;yk|6-!f",
    "hun": "!F#O#W#]F6I8JyXT[=_2hczo{d-'>-(L-.C-9J",
    "su": "';+1+3+],X1U3.324X7K7U:?>,>/@{DWFwJsM+M]MiXWYE[r^o_lcyf(k$khksnZrR-':-*_-+L-/i-1@-5p-6~",
    "pai": "0'1z1|IOhBjLtV",
    "biao": "'c,!1D@3A,A1AoJoM=T@UoVa[3]#b?seuZw$ycz#-&&-&+-&5-&D-&E-&F-&H-&O-&W-&X-*~-+@-+W-,;-2j-7Q",
    "fei": "%[//1!6M9a<A>O>e>r>z>{@GDFGjH$KhP_PuRuUtZp_GaObsvEyP|g~T-!/-!H-!I-&Y-&[-&]-'H-(j-*!-*,-0+-2F-9;",
    "bei": "&i&r)`0'3f>wA[DfJ9M8PAU'V;ZLZwa1bVgch@iDlbm5mQqWrPv[wd|=-!l-#,-#C-+k-4N-6x",
    "dao": ")=)H)x+B+K005F8h<B<`B_C7GwR7T4T7Umeqg9iwkYoq|b}=}O-.]-1n",
    "tan": "'/6D8A:_:eBOBSGtM@TkW(WJZ~]Z]a_R_xa.a>bdm?n~o,oJqQsMx#y8-$x",
    "chui": "&U0D@8GPsFtny0|n-$u-:_",
    "kong": "%.&V,/0@;gg,sA-#(-4[",
    "juan": "!{#2#H5J5V7Z9S:|;=?w@7AaG[K3SfUM^&mTrZras6u0vHy5yXzt}^}l-#'-&k-'.-6m-:w",
    "luo": "%T&!&='n/>0M2]5>8f9M:n;@@)@UAwF8H9HYJ5N9OrRHS6UvW~X'Z1dbf`g'kAl:uEw>y/yf}s-$f-('-)_-*P-*k-+=-+X-/K-4#-6)",
    "song": "&P.@===yGOY0Z]^b_?jcu1-$@-%[-'[-)e-,c",
    "leng": "#>&h++L@eD",
    "ben": "/&<(DxRuaUblk/sIy&",
    "cai": "#T677P8aGSK+U>a5b[dxeQob",
    "ying": "!R$v&C&|(P)c+_2K2^6U7/8`9^:>:X:Y:c=?A:ASDzEAF7F9G0G1H@HAHBHZJKLqMwOmQ0QPQiR0S8SgVPWv[i]M]|adbHc@g:j/m2twv8vky?~_-##-$.-$i-%g-%o-%p-1V-3g-4q-5*-53-5o-5~-67-6C-74-7>",
    "ruan": "&u(>6^<o@QgQhDi*|(",
    "chun": "#_0_4L8|>U?sA7C~G3G}HRITJZQgSUb(hKn}o/sL|T-0#-0Q-4i-4~-6{",
    "ruo": "0P1#DnI}mP-0e-0{-5<",
    "dang": "!,#s%2'((2/[1f2&CDF3GbKuN(S)UCW&]b^A_kd&kEvWxB{9~A-8[",
    "huang": "'w+e0f1q7O>=C1F#H|Q@RtSuYv[V[f_Xd,kWt3txu}yI},-$,-'P-*.-0T-1A-2]-5q-86-87",
    "duan": "${'&.I1`2X6a:#<r@kI/V/fdt.tGyG",
    "ou": "*$=*@VA*KPM)MG]3^Yu:-3H-5[-6N",
    "zan": ")},'1A1t1x3`W?^'^?apbCc<d4d5e}n1n7n<smuaubv2v<-((-4C",
    "za": "%k4^4gAvA|Vpj*q8}r}}~)-$'-.u",
    "lou": "$(0x1V=+=1C>IMK(QfRI]1a*g3kxu]yN|F~x-#J-+}-,*-5a",
    "sou": "#v2BC;IQJ(L_M?Qum[o3t~uAyH-&:-&<-&S-'c-(R-*<",
    "yuan": "!9!f)V.i0F6f7':.;m>CD3DYE?I?I_InLGLdO5PRPzQFQXQrT&TYUiUuV3VF[xa3bYh]iQj=k@kgl8lRnPphs'u(|^-%1-)9-*G-.o-30-3U-4V-5%-54-6K-6]-6}-8s-9!-90-95",
    "rong": "+Q+S5E7@9C;^>FEFEfF5J/QhQwQxSDVEghthyb-)R",
    "jiang": "(43u3|5P8:9L:F<>=.A2EaH^ILK.LAQjRM[w]=^W`6ngo>oF|H-#P-%5-12-2_",
    "bang": "&<'A+%5_749B@uC8IcO!O*OvPt[s_olQlVt^y^-#3-,#",
    "shan": "#:'m)K)q+W.s7g7}:D;p;r?pALATBaD&DtR}S,TCWjY%[b]r^ObFc?cVd^gGlAn#p!qtvBwRz4z5z;{@|P|X-'q-*J-+V-/l-1C-1D-2s-2y",
    "que": "&5&E&g'6'7(1(N:P:RI]O6c}z}{*{l{p}a-4Q-6t",
    "nuo": "+<+u3e3y4&<oU/U0[Y_DelkCt<y#}_~'",
    "can": "+W1A3ELBO4Q.SjSn]2uJ-&`-'3-*T-+M-8^-8f",
    "lei": "$X'F'b(,(H(I)7)~2j4h5H7Y8S8Y8j:=:d;t<s>5JiKWL.M4N*N+N7N@SPZ:^(^zhxnoqls?vPvvw:yz~<-!*-$O-$_-%7-%}-1Y-6<-9R",
    "zao": ",y,~1R3sC#LlMPOC]`d1f4fNk%ktoCwA",
    "cao": "3m>9C=C[EwJ_R:VbV|n)uc-*D-94",
    "ao": "!T'Y<Q<V<Z=wC]DBK&R=T]Vy]7]8g]kom9uBuMuNz*}>}I-*S-+S-0~-2b-5X-8{",
    "cou": "@ThJiK",
    "chuang": "'_,H,L,q{+{E",
    "piao": "$+).1D7a:;<RF|LiRCo?{3-%9-&A-&B-&V-*U-+W-.S-1.",
    "man": "#{$*$c5X7]:<JkJzN)P2R6R]SoVw]>_tmuuCuUye-#!-%;-%y-'i-(Z-,t-,u-1*-2m",
    "zun": "8':^U5]Pk|qqv+-1B-2u-4n-5|",
    "deng": "$7'q.M/H1pCCW|`:f9l>mxv6yx}E",
    "tie": "=VH8OhaPbndXq'qzv>vRx'-&z-'Q-*i",
    "seng": "-,v",
    "zhuang": "3:3nF)F]UBUZ",
    "min": "!B%9&`.}/<1l6O6d:,:wDiSSb'pqs7tEzEzZ{K{S-1$-2n-3P-8q-8r",
    "sai": "2'@cb6c9-%#-0_-2X",
    "tai": "0+27>h>yB8BeD]GeLjdIl[nSpfw^-&/-)E-+7-/6-2$",
    "lan": "17212Q4/8K8i9x;+I<JCL~N$N&VVVxW*W;WDWoX(X4]K^:_{fknxw/wFytz~{h-#Y-%K",
    "meng": "$/$T$`(?C.CKFgH'IZKONvPgQZRaSFn'n,rKsby<~?~k-!(-!)-%F-(!-,O-/t-08-68-7@-8q-8r-8z",
    "qiong": "#@#x,+,.,d,|/:/FB{EBM%MBP,P0cWdolFqs",
    "lie": "5}=]?oEOOzU?csf^j`-&0-,x-.#-/J-1c-3r",
    "teng": "2>2F7I@sAHM9N?R1Z@[`l1~u-)S-*B-*v-0s-97",
    "long": "!p$a%n&=(R(S,u.!.6/;1*162N=P>'?6E<MxS^S`W8`4bSffu`w)|B}%}T~y-!1-*t-6@-:J-:O-:P-:V",
    "rang": ")z+t,$8bMn]s^8^Nfm-.$",
    "xiong": "?F?GCrY:YiZ4^a^mb'}e",
    "chong": "*86b;:;|B@CBEhNfQRS$T5V)f!ohqhxZ||",
    "dui": "&k'O(m5nLb]H]vhsj_v0v9ys{v|j})-$[-3h",
    "rui": "#h.h6N8+D6E(KUKVKpMWMXO)P~r<rwuqxx",
    "ke": "#u%T&5&~'B'Q(*(;*<+.,U,r6[9t<7C3DdHFLFOTQ5S}TmZi_Hd:gni.o2psqds/wyxQy)zM-$Z-${-%i-%q-){-+I-+y",
    "tu": "*)*.*x,6/a@dFNG+GVHsIfcbe&j,jvnjp6porIs!s}wO-(h-)j-4*-49-4T-5!-5O-5z-9M",
    "nei": "?~@;lNsE-'5-(I-/e-0!",
    "liu": "&B&d'>'[,A6;9l;1;;</IgJ*MERWUTe|kbs#tctzuHu{xuy[ym~%~j-&>-&@-&C-&U-'b-(W-)M-)c-*@-*d-+T-.9-0m-5=-5_-7.-76-7[",
    "shou": "6.9h@yC2uA-(_-:s",
    "ran": "7v>ZDZIFOEOYTST`Tz-,A-,K",
    "gang": "%.&q/{639!:N:W:x>Ep+s)ttwe",
    "gua": "506}:z;%>xU<V#Z5[>^|cnedr#rFxM-&'-&1-*9-3k-6c",
    "zui": "#G)C+15&8d;$KjRdXHi]nInqo!s$s8",
    "qia": "%{'I?1HyU4dUnU-!{-+z",
    "mei": "!L!_#)#a({)]+X0h3p;I;T?S?r@PE&FfI@QGTZdMg0mOnlrKtUtZyMyQ~N-#^-.>-.F-5(-7(-8V-8h",
    "zhun": "+$,56(>UT8YAZ{_Pj.",
    "du": "#K#b*f.T.^1,>DCsFBR&SZSmUyWqZd^$^D_E`3b%bNc)mMo(sDs|v}yL{!{^-!Y-#V-#s-#u-*E-,,-8]-8k",
    "kai": "II`7gysvtbt{vCxGxvy@z<{({U-&;",
    "hua": "%;&K'B3S8/BWD9D:GgIKK[MzR#XKZ&Ze[4[>]A]o_&`0p(p)rbsdunxN-*]-+<-5m-8=",
    "bie": "FTNFObRmVuf6-19-2l-8|-:[",
    "pao": "%e(@(O,!?|H>M=TeTfV>dDdTgfq/x.-!N-!o-7Q-7S-7|",
    "geng": "56575d6m7,9Q;j;u<v=DFVGfavc1m0-%b-+v-/h-25-4j-6|",
    "shua": "<nZR",
    "cuo": "#1$z'G79?nFpFtImJ2J}NR[(erk0kzn7o7rEs^t[xqy$-7H-7L",
    "la": "%_'R<*@>AbArG?HYM3PfQ4Q[SRi_i`l6v|z$-#0-,k-0F",
    "pou": "0$UO",
    "tuan": "1H4'V8a%u<-5V-6#",
    "zuan": "1B2Y808N8U8e:Kb3fjftq)vxw?w~",
    "keng": "%t&3&RZOr>t1uOxg|&",
    "gao": "#R#g)4)6)e*m+N+O/v0~3i7E:5;O;TA'B,GILrMHZ[_:m+ryu#xny]-#o-'_-,4-,5-5R-5v-93",
    "lang": "&7*n/dC(F{IXJ.JHPOQlZEg%lzl~m.rLu&xzz^{]-)h",
    "weng": "#q:b;}=rJ0L(Qstg-56-7,-9_",
    "tao": ")?58617A7N9W9kG|PoUhX{Yn[{^MdwhXjPjenzs+|r-!k-!t-#@-#l-#|-&w-'d-'y-)P-)x-9/",
    "nao": "%z&q'*?a@&@ZAkP6R~YZ]Ju|x@zJ{O-.'",
    "zang": ";S?_AmAyB$I,K@M#abambLbUb}rC-)A-++-,.",
    "suan": "(z.b/m0;1BI^nn",
    "nian": "':*5*P1Y3*C/K6evf5f[h=iCiS-/4-0;-1x-2K-4%-8B",
    "shuai": "7>:4RNTH",
    "mang": "!5!6&<&D.ZCvEXEiG4G5M_OvRaSAlDp.rsx:-)g",
    "rou": "*!2w3X>3?l@aHdQC]tekhEt$-#2-#f-*7-0R-4t",
    "cen": "+W.m1A",
    "shuang": "(V7;CPuh}z~b-*M-*y-+^-5c-6A-7B",
    "po": "%g%i/70I3'7i<,IlK,jLn%n[o1oKotq9uswMwz|=-$K-%a-)7-,N-.E",
    "a": "@@s@x}|:",
    "tun": "AYAeC~OlVL`G`IgJ~Z-&h-(0-.j-1q-8J",
    "hang": ".k/T5*9HBiDHOAT#UAa9j3lJ-$C-%]-.i",
    "shun": "!x$&$1$9BZKo-$:-%S-,g",
    "ne": "!vY6^]",
    "chuo": "'j0^6?8&9bd!e'e<h6iIirisk:narfu;w!-'B-:&-:G",
    "wai": ".O-%:",
    "guo": "$Y1K3R68=W=c@6@LA.GJK9N]Q&Q1RVUwV!h7j'kTm=pZszvVxm-'?-(K-(a",
    "qiang": "%.157p82;G;R;Z;a;g;w@HCEJjKBLDMvPhVd[ndGeuf.tkuPurx~yAyw-50",
    "pen": "<XHm",
    "pin": "$V%A(8+w=^LcMaSLa;be-%I-%k-&#-(s-*q",
    "ha": "4_NyP'QOqdxQ",
    "o": "/}",
    "huan": "#.#x4!565b6l8;:(:I;b><EoH#H,I_M<^>`Q`b`va/hpj9k3l/lsn9tCvSyJy{{:{r}i}{-*|-,|-/n-0A-0K-2>-3?-4+-7<",
    "ken": "&#>8>Y>fUFV$`S`wsh-:?-:E",
    "chuai": "A0ACeb",
    "pa": "/b<zBdDrI)Trd7wr",
    "se": "+b+r,#3688CULD]Ehnr4tauuxVz[{5~2-&I",
    "re": "Dn",
    "sun": ".f/L0T1rF<J%L$LNt|}]-&f-&p-5A",
    "hei": "-8D-8E",
    "de": "OMsoy(",
    "kuo": "*Y*_/GH[H]O~r#rFxMz|{k~o-#.-#H-#e-$V-,V-,}",
    "ceng": ".Lf:-*f",
    "ca": "(E(Ykq",
    "zeng": "$~'p.L5z7H7z9n:E;9]DbAc>m|roxk-.6-1K",
    "nin": "?[",
    "kun": "#7&H);*s+*5oGEPpUEUJUgV.`wo%sCy*z]zj{Y-)w-,<-,=-,D-0/-2G-4^-5'-6w",
    "qun": "0<;_;`UVU^e.k&-7U",
    "ri": "TMp/p;pd-)%-+(",
    "lve": "+4rgrlxr",
    "zhui": "&U((.h66729r:'@C@|[!b>c6j_o#s>sQvdy1})}Y-)s-+J-4Z",
    "sao": "$O7m8<:A:HAdR4-&<-*#-*I-+Q-,:-0l-1R-2a",
    "en": "J!",
    "zou": "0&6GG=[)_CcNcOlem@mcn.|h-*H-+1-/w-06-2E-83-:.-:7-:n",
    "nv": "2h=TSvSxp8wW",
    "nuan": "-'M",
    "shuo": "$m&+'$0cIvZaZc_>qttmv~x*",
    "niu": "4H9.FxpTwq-!`",
    "rao": "+i8)9FF,KdVvk}}B-'v-(>",
    "niang": "nuoRoZ",
    "shui": "#I)7*q*z@1U[ZaZcZg_>_KzG",
    "nve": "&ONJ",
    "niao": "@%E>K1T^UGVO-2{-6H",
    "kuan": ",s,tAqw(-,&-,2",
    "cuan": ",',Q,s,t,z1)1[fLfsrZw;yv",
    "te": "?vRgr{xe",
    "zen": "]V_y",
    "zei": "S;a_bv-0M-1Q-2+",
    "zhua": "2(AU-,Y",
    "shuan": "5<@]z3{?",
    "zhuai": "#1dmi'",
    "nou": ";v=,tfv;",
    "shai": "/Z121J1e2[[K",
    "sen": "Ve",
    "run": "$1AOz@zQ{F",
    "ei": "ZH_@",
    "gei": "5C9J",
    "miu": "7n:@]+_w",
    "neng": "?LR'",
    "fiao": "WL",
    "shei": "Zg",
    "zhei": "j:",
    "nun": "-84" },

  "m": {
    "yi": "-:~-:<-:;-:4-:3-:#-:!-9~-9T-92-8u-8R-8N-8I-8+-8(-7O-7M-74-6l-6c-6L-5z-5)-40-2U-2Q-2>-11-0o-/_-..-,o-,B-,3-+q-+[-+<-)X-(o-(5-'w-'k-'=-'#-&6-$'-!?~=}E}1|x{Zz|zzxix6x.x%wKw,v%uPs_rurorEr8r)pppdpXojoioVnxn<mLm=l1j{jvjkj/j(i^i]i6h6gYg0g)g&g%fbf2f1f0f/etepd~dpd;c~c`c@bhbbbTaE_T_>_,^g]|]{]`]/[!Z=Y5XVVTTgT_T7T1SxSsR~RyR;QwQ0Q!PDP6NbN^N,MZMSLXLIL6L$J9I}IUIIHMG?EaEHE4D!CwCFBkBTBEB9B5@2?Y?K?I>K>H>'=a=R;m:~:48c8!7,5g4q3&2}2Y1j1f1`1M1/1'0t.O.K,_,,*x*f(c'G&.&&%b%Y%G%$$b$6$/#x#T!9",
    "ding": "-:}-8q-)?-%!vipfkGiydzY2Ik6u+B&^&[%_",
    "zheng": "-:}-9O-7L-0#{1{,yjuvsRm*lNlIi;eheZe8e4e3d/`x_v]3[+ZSY8Y2XlVFTYT#Q1C@A!4W3w07.),]%*#C",
    "kao": "-:|n{k][#TbL>>R3p/,",
    "qiao": "-:|-:(-6A-5v-4=-3(-2[-.@-,2-$H-$5-!q-!=y/y$xkx4rSm+m!k]k%j:iSi(hqbvaT_wVuV6V$T%KgGaF^FKFGEpDSBCBBB;8<2b1C1>.}#e",
    "yu": "-:|-:p-9^-9P-9J-9H-80-7t-75-6'-5g-5b-5H-4U-3F-2l-20-1F-+K-)O-)+-(J-%a-$p-$K-$9-!7}]}W}5{7zizNzEvyvwv9v3tytjtetcsqsos@rsq|pyp+p%oQn6m%l8kyklk8jfgvguf%eGdWbtb(aLaKa:`1_1^:]e]d]KZOZ!YmXiTDS`SUS7RpQyNvLAKsJKJJJ;IAH|HmHVDVD:D*D#D!CrC[CDC,B*@K=Q<><<<1;h;_:v9G908=7M7I7A535#2{2R1b1:1(0;/q.(.&,1+G+9+7)n)h)F))(+&*%!$M$D$=#V!A!0",
    "qi": "-:{-:r-9{-9E-9;-99-82-8$-5f-5(-3D-2{-1:-0G-.j-(Y-(A-(.-'v-'C-&%-%m-%I-%F-%E-%:-$D-#N-!Z-!B}$zvyHwbw;w1u~t[tFn;n3n$m~l^kkiBg/dpdTcKb<aBa&`3`2`'_b_)^K]OYRY@X?W1TgT1SkSjS1RxQ4PbO@N]MyMCL]LZKhKOJ~JcJ]J[J>J4GyGJE<E,CyCkCjC<AEABA6@a@7@$?+>W<Y<N;5;49h9*6f4x3D,m+N+8)a)](`'4&V&1%K!C",
    "shang": "-:z-:t-7k-3C-%S{p{*y:oAo@c8aA`@]}Q^G.BxBZ@P:h9>8l1T",
    "xia": "-:y-:s-9u-6I-5e-3w-+T-*+-(v-'m-%n-!!}({Mwtwpm/logkeB_3YST)P~M<Jm4X3z2i.L.,,}*C)1%V%J$8",
    "han": "-:x-8S-7J-3>-1A-/j-/i-*P-*J-(^-&C-&9-$k}[{Xtrrbp,n8lJl%dqbm_c_L]cZ(VLV%T]R_R^QRQQPOK9IJCH@l@^@?=k=Z=?<l8k7X6'3I3@1Z01.g,t**&{!p",
    "wan": "-:w-:E-5=-/S-.f-+)-+&-&1{0z*x=wlwkv6tJt3ptpen%iGf_f?d[b.b,]1Z9Y|YmY=QOQDQ@Q,NVNNK1J%G9B2@h<m:X7}7<5:3]+&)t)Z%z!n!7",
    "mo": "-:w-:5-0z-.(-#S-!l~j~b}!yQy#v!r_rMr$qno}o?iji_hR_(^d[cVzVkVjUHTyR$O4M[FrFMC$C#B~?~?o?e8m640`.8,%#m!x",
    "zhang": "-:v-8k-8]-8L-3=-1byErnkDimiIh}hsfnfmfXey`Q]hYEPRNeFt<y<p8Z8Y,$(V$`#}#u",
    "san": "-:u-8d-7q-5p-3c-*Q-)m-)l-)k-)j-)ix:iHg#T5AeAdAZ7s/%",
    "ji": "-:r-:O-:<-9p-99-8x-8w-8'-8$-6t-4W-41-2w-1:-12-10-0*-/l-/^-/W-/#-.d-.^-.0-,9-*z-*`-*U-)d-)P-)0-)#-'6-&c-%s-%d-$V-#x-!{~z|~|f|.zxz?z(z'xlw;v^vJuZuLs$qAp=p;oJnfnEn(l$l#kRjsj0iBhYh!gEf=f<eseMdxdaczbAb*a!_K_)^k^F^C]@ZRYCXHW1V`VBV$UtU^TgT1RnRmRlP]P[PCOAO@O$N9N5K,JNI*HrHhGoGTFfF3ExEXEPE8E'D[BdB:@O@B>y>]=x<`;t;(9.9(857&6{6d5m3D/;.j+?(>(!&8%{%t%4$X$,#H#>#'!w",
    "bu": "-:q-7F-,M-*w-*t-(d-'K-&D{B{?{6zPtOm#izh'gfd,bi[rY}Y{YfQHM,C>C;C:'=",
    "fou": "-:q-(cvCBj4H",
    "mian": "-:o-42-1d-0w-,S-,H-$`tktQsZqpq#aDNWJ^E=D~@p?|;k;,7G/o",
    "gai": "-:n-9w-6e-+u-+t|'uYm@dy^AW%T`QYNaHZGNGM:M8|'{&6!,",
    "chou": "-:m-:l-8m-5_-4=-2A-(m~{t/r!iKhld$b3aS_%[_Y%W~N?N=LJJkI|E?B_0h/O.s.p&3&!%l#v!m",
    "zhuan": "-:k-7o-3G-3+-2y-.I-)n-%+~EzRyPreq<oXoRc0V28t5%)5(f'.",
    "qie": "-:j-7Q-/`-+P-*@-#uw1u{iCcpbkaia8`fZoOZL]I~>;<`,E%g#(",
    "ju": "-:j-:?-9m-7n-62-5`-5S-4x-4j-2l-19-0%-.Z-.:-,.-+n-)H-'d-$|{/ztx_uct_tNt$o{nvnqnOnMmqmil`jYj9j7g+e%d<d3d(an`}_E^j];[I[C[;Z^Z@YdY$XMUdUVR3M^M9KxJyI{IzIrHSHDF:EcDPDCC8AqAi?b?L?(>:<g<I;[:o7)4L3o3<30/4/..P.A*e)m%5",
    "pi": "-:i-8@-7|-7P-2Z-.R-.9-+>-(h-(c-%5-!.-!,~|~X}2|L{2xhvCs<rwnumblFk7hWcibx_U]G[q[eXcUgS+OXN3N2HPB&B%<@8>7*6e4n2x.Q.G,n)Q'(%k%h%@$p#R!U",
    "shi": "-:h-:g-9q-9l-9N-9M-8t-8_-7R-6k-6]-1X-0m-,^-,:-+_-+6-++-*>-);-()-'{-',-%.-#t-#7-!W-!>{>z|y{x<wQvqunu<r4pbpap[pVpMp*oun~ninhm;m7l0l/kQi{iuiQg!f}f|eCdodTc_c[aU^*[.ZyXYS6RXRUQ{QzQhMWLxLrLlL5HiH[H,ELBiAJ>n=}:{:s:W:5:'9v7C7?6n4=4%28.3.+.#,0)$&3$}",
    "qiu": "-:f-:^-8m-6#-)u-)9-&+~*|FyTsQl4j2j1cFc&]rWkO%KIHeF8BpAn@s@b?J=o;^:l:k:j2D/T.k+D*'([!P!(",
    "bing": "-:e-:W-8h-8b-6u-5B-4T-3Y-1;-0a-0[{mp1ngnZhbhah&cm[vY,W5R0QpN/MQLQLLJnJbGXE:@~4E)r%,",
    "ye": "-:d-9z-9.-9&-4e-2_-0U-)7-(u-'%-$W-#,-!]{:zIxqxdwgoVm$jxjw[hZzZ!YyY;X:X6UhUcUUUSURQUPxP@P?P,OmOkMYMXIQHsHpCXBh>i<o8q7w753l3M2N1H0M0,0)).(T'b$V!a",
    "cong": "-:c-8f-+r-)K}w}ptPq6eUeTeReJdZcnbUbIa3`^`.PTMxJ`HyG2FgF[D?<G9!8v8L8D8#5V3+1n0H)X(e(a",
    "dong": "-:b-6R-4n-3,-0`-0P-0>-,u-,G-,/-'I|/{)y&u^tXr*mSm>lKl?eNc3_H^LZhX<QrNILfJGA8A+>L<j:n4#18.0",
    "si": "-:a-9B-7T-7R-7N-6H-5f-5X-4,-3y-2+-1[-03-*#-)x-)5-'F-#m-!u-!M~)ugtdsJqDoaj.gUd%cHa2VMSDNOMeL{J~I/H!C'@X?O?8?*>^>J=,7[6?1</R",
    "cheng": "-:`-:%-:$-68-4_-2z-0K-0C-(@{H{A{,zYz#ywu*pSlth%eZb^al`(_v^t^U]A[zZFYPXDWQW,VRVQVFQJQ)N}MnLtJPJ@IyF=F<F9EeETA!?0>e=_=G<8:?7f7d6/05/f*6*2)c%x!'",
    "diu": "-:_-:[",
    "liang": "-:]-:Y-9)-5x-5[-5>-5%-1G-0B-&J-%y-%7-$Ly2bWY7Q*KJIwG%<e:_",
    "you": "-:Z-9#-7w-7=-7'-6X-4;-2*-0t-*p-)f-)c-):-'~-&u-&>~n}bvRuAq=pZo8o6m1lyh[hZh(d]d$c|cqbY`,^xXkTaS4OVM;LAKGK=H{GFD}DJ@8@(?V?>=g;C:b976B/j/i/O.b.D,?,>+Z+Q&g&d%O%!",
    "yan": "-:X-9d-5]-4]-4O-3;-1u-1Z-1Y-.a-.[-+:-*O-*F-*/-*$-){-)z-'%-&=-&2-%'-$N-$G-!L~~~a~Q~5{GzAydy7xLx@wMw>vPv>uFu@titfrgr?r9qwqfqWpKmhlEl'kuktk0jUjKjJjIjGg<g*f'f&c$a7_5^~^8]w]?Y3Y'XhXPT3R8QZQ.P`P/O}OrJsJ<IFIEI5FeF'E^E.D`D3C_BhBG@,?P>M<V<&;K;D:i:H9R8y8S5O5I56544k4j3u3X3J3B3?3!2~2U1t1E140Q/U,w,g,d*Q*()V'$!3",
    "sang": "-:V-$J-#}WgK{KzGV",
    "gun": "-:Ub6JY9W93",
    "jiu": "-:T-:8-:7-9|-9v-5A-2p-.H-+|-+e-+]-+A-*(-'U-$wvdo(gogdgc`IZ2XkXBXAW9TGRhO#NTM+LsKwFxD;BW@v@Q5$/b+:%X",
    "ge": "-:S-9Q-8R-7!-6|-59-.O-+l-)(-)$-(e-(D-'4-&Y-&?-#s-#`-#J}6yhfLaO^^^R^=]_ZkX*WHULTML4GsE!CW9l9`/T.f,C+k%Y!,",
    "ya": "-:R-9>-9<-9:-7m-5K-0W-.$-*H-*G-*A-*?-(s-(H-&n-&'-%;}L}@}9{j{5zbxTuBu3t%q2n,lVlUhKh?[`[ZZZY:XLN'KlIsIFA0A,<r9,8//g.^,[,E+/)}'b%h%J$x$K",
    "pan": "-:Q-0S-/B-)R|Ys3i1[O[AW]U=MMGu?t>}>k:c9s84684l0$/w&C&/&,!*",
    "zhong": "-:P-8A-83-7x-4Z-0j-/C-$Tz8ysx$vMvHs^o)i)eqe0dddYS`MKC2@=?G4w2k.T$F!>",
    "jie": "-:N-8i-8<-5$-4~-4W-4!-3j-2]-/@-/?-/)-,r-,a-*j-*i-(e-&c-%d-%H-$m-$8-#q~zzKz7vevOuit>sasVsCs(qSpIoJnpnln*m|lCkvkbjrjqjgjbhihIeEbr^S^;]_[,YZY+X{XwX?W_UmUOUJS9RINXNJL0KxKoI~I1HqHgHfH8EOB,>j>;:z9b882?/'.6+0)H)8&K&J%g%]%M%##D!~",
    "feng": "-:M-8:-5L-4N-2Y-0]-0&-0!-/{-/y-%p{Rz9z5w}w9v7odoYl}l|l5W4MkKPI.E[?m?h=S;Y;#:R8e5Z4i3V3*2g1h/1,O)u%C$B",
    "guan": "-:L-58-1=-0l-*vphb@b?af`LXqW*SRJ+G*D(B2>w<v<W8G5Q0E)W(4'e$_$0#Y",
    "kuang": "-:L-22-0V-,b-+V-+N-*v-&o}&xNwFm_dJcW^z^y]>RWQkP#L)?N>=0X.X.U",
    "chuan": "-:K-7o-3G-2t-.K-$]}Tz3jFjDPMIRIDCbA?@i,H+<)7",
    "chan": "-:J-91-2y-2R-1~-1/-/:-.k-.J-.*-*~-%$-$F-!n~P~@xBszr>q3l>kJkCkBjXh{hpgWdu^r^lXsX+W;VqVhU#S9RYJsJXDEB#=v:^967o7n71655d5B2V1I,#&v&u",
    "lin": "-:I-9U-2g-0e-00-0/-)v-(l-%PxDlbk,gIgHc=bob)_=_6[MVGS?Q+PGN!FIEmED<U7j7H5h3819+u)S(I'+%o$Z#M#K",
    "zhuo": "-:H-4t-.`-.<-+#-)X-%U-%T-!G}+y@v,tYeu[BZ,Y~V3UxU[StSHSESBSAS>Q>L#JuJfJ3J,IoGcDh@j=|=h<b<J7%6S5[4}4N3_3#1>.h)e)N",
    "zhu": "-:G-:B-9]-7d-7G-7?-6Z-.&-,t-,n-#T-!z~4|=xpx3qVq!ploNnWnIl*i>[[[WT&StS;OqO1O0O.N>M#LzLFGWFmF,DhDbD^D0BH?&>Q;b7t7Z6s5x5>4V4A3y2^2@1+0x0?,K*K%B$J",
    "ba": "-:F-8l-7`-1E-)^-)@-(b-&M-&I|_{[x>wCv0mumIj,fq]o]I]6]#[GZ)O+M'D,5?4R0+.m+@%N#/#!",
    "dan": "-:D-8~-7{-7H-2r-2J-/V-,,-+G-*~-*{-'f-&2-%C-%B-$v-$F-!m-!b~[vTsjiofTfOfEb$aga>_q_P]4[VXuV@V?UjRiM/BeBSA*@)>r<?7.1I.@+#'O''%f%:$H#`#N!F",
    "wei": "-:C-8{-7p-7e-7A-4s-4V-4Q-3~-2x-2$-*h-*b-*O-)O-'q-%q-%k-$s-$S-$@~.}o}m}S}7y1xJueu7u$snsUsHoqoQnxn_m9m2lHl7kskZk=jljTiniEi9gme=e:avaPaM`?_JYnYUXbX1VEV1S^PuO5L*JqIOINHkD@?g>c>C=n=$;S;N;0:N:08?837i6R6G5|4]4>4$2]2O2F1]0u02/$.r,[,P,I*~)h);'f&H%!$N#X#U",
    "jing": "-:A-9C-9+-9'-5r-5%-3A-2O-1N-0K-0C-/9-.~-,y-,k-,[|i|g|cyIvQt:t8t+pojAh|fdfZeeeWb/___NUoT+S&S%Q:Q3PIP0KZJpEvBsBn@I@H>m>%=><87]6#,r,'(^(B(<%($u",
    "li": "-:@-6_-5u-5k-5Z-3s-2&-1z-08-/Q-/=-.o-.G-.'-.%-,l-,&-*L-*I-*:-*.-*!-)|-)Z-)X-(z-(2-&U-&0-%g-$C~g~`~A~>|`yrxEu+tat#rjqYq,nAmkm5m.lzjag@b]bXbRbB`l^&]q]gWYU@U3TsTlSpP_P>P%O&NmN^MqMSLnLcLYLUK!JoJdJMG1ECDuDjD_D8D.C/C+?k?[?Z=Y=U=/:/8z7@6C6$5H0a0U/>/=/#.z,~,u*V*$)z(t(_'x'u'l'W%R%F$l#P#A!Y",
    "pie": "-:>rVV]V[PHAD8>",
    "fu": "-:=-9c-8[-8#-7z-73-5y-5m-5j-5U-46-3v-0d-/|-/J-.R-+h-(=-(6-'[-'S-&E-!s|<|!{]wvwWvVvRuru'tDt,sbr5qJq/pmp3oWmgmFi~ifi7hzh;fwfkeje?c{ct^w]l]J]&]%[Y[QZ+YfV7S}SLS)ORN+M]MGM)M'L1KWJ2IYIPHKA:>~>Y=W<w9c7T4S3d3/0.+2*t*!()&m&b&N&G&@#h!)",
    "nai": "-::-6v-4iw:vhv)qxq(g6WVV{M$AC;<%`",
    "wu": "-:9-:1-9D-97-8>-8%-6;-5|-4k-2k-2:-1q-.T-,|-,C-+y-+/-*V-(U-(T-(J-(?-(+-&)-%K-#v}4|^zLykxvvxv4u%tjthsurTownkn9n+lmkzk_j6hFgQfudbd`d@c'b[bZbKat_]^[]e]d]]Z4WGTTS7RoROQENvNtNoM&K#FLCVC=B3@[@Z@S?{>T>*=V;^:,874(3C322*1w/V/A+3*4*3(|(P')$h",
    "tuo": "-:6-8X-77-6h-6.-'a-'G-%[-%$|Sz;v8sNrRmck'gzet]i]`[H[F[EZMYuV1NgN^MTM8ITI+GbFBF0AvA_@d?`?_?^<k.K",
    "zhe": "-:6-9[-*K-&L-%9-$o-#T~h{Er^bp`6]H]'W_ViQGQFNgM=JWFwC%=m<E",
    "ma": "-:5-9Q-3o-(r-&!-$%-#4-#3vUs1rWqNhR[cVzNQH2:2/&.c,4+5(x$[$Z",
    "me": "-:5~t~j~UhR6I",
    "yao": "-:5-:,-8;-6D-5@-4?-3_-2q-+m-)&-'7-$b-$2{}zBwUvGu_svs=pro3o,n/m,l,k#j~h^e;e.cqcRa%[oX2WrW@VdV$PkP'NGN#LuI;HBH9G5C!BA:B9J444&1|0f0(.E,;+r*D(~(l%S$%!t",
    "zhi": "-:2-9Y-6f-5^-5C-4|-4d-44-3y-2,-/}-/0-.U-.+-,v-*e-*>-)C-(W-'v-'8|||{|T|:z~z{yFy@x$v%uNtsrGp&m7l0j+iridiahyh5h3ggf5eYeKe4e3dmdUcU`6`*_$^{^E]Y]F]E[u[HZtZpZ]Y{XvWpWVW2V{VvVtUKUJU>TjSMRwRgQ`Q/NOMyMcM2LqLhL6K~K7JjIuI]I*H+GHF_D|DnCAC6BiAJ@t@O@N?v?T?3>V>3<L<!9e9S9B8}8@7~6>4`1_/9,x,^(R'w'[&3%c%;%7${$z$k$E",
    "zha": "-:0-48-.N-.=-*C-(w-'X-'?-&K-$j-$O-$Aw/pNd6]s[m[XZdX4WIW#O2M7M1M0LvLlI?H4Fv;X:67u5#4@2N/p&d%.!M!H",
    "hu": "-:/-:'-9j-9F-5E-0Z-+U-+L-'h-'W-%n-%Z-$_-$4-$1-#>-#2~k}v|;x1x0x,uGt4sEr]r[oxm[iphxfxfgdFd*d)cGa{^V^6^4^3^/^.^,^']y]9[xWWW$SXRFR<OjN(L8I%I$GEGCCR@9@&?f?7=t<.<+;$9E99986Y5s483S2;1a.J,S)b)+']'['I",
    "fa": "-:.-8!-6y-3Z-0R-)]|A{vy)uwm4fKL@FO?X?:=z5R*[)L%8#.#+",
    "le": "-:,-9R-8r-,J-)2-#1d}]qH`G5@z??/b+A",
    "yue": "-:,-1g-1e-1`-/P-&j-&@-%A-!DvAqrn1m^jec,bubS^]]g]8Y_U@OpOoOWN8LcH`G5FTDj?'5e0J+*",
    "lao": "-:,-6~-3!-,j-,i-,>-'$-&N-%z-#p-!}uSr`ljk/cY_f_eYtVZO:L=G5F!=O='8%7a3{/^./*<$f#c",
    "yin": "-:+-7}-6^-0t-0;-*c-(j-(V-%o-$d-!T-!+~l~+~$}`}$|&{w{YzXz:w_u=t0t&p:n}lnlLl<jdg^g>fya@`i`B_u_t_0SMO[L:KKEkE@E1DKCwC_BYBGA5>l>d>U<5;~:}:i9}9V6^6]4).],|,j*I(U$7#k#_#:",
    "ping": "-:*-5i-0]-/z-/s-'u|Qz1u/ngnZmTi[iJi4heh&`0_zMfEU?6>6=A<D3)*v'F';&_",
    "pang": "-:)-*B-#ww}r|o2h9h*ere<S2@<?y9p4i",
    "guai": "-:&-)_wVcuc>[KMbLw",
    "sheng": "-:%-:$-4H-.X-.Q-,?-+0-(9}=x{x7u*k}_VS[RGQJQIOeMuIyG~E{BzBF?%;k;@:q7G2u/M.N*h)i&y&s&`!'",
    "hao": "-:!-65-3k-2)-)6-'j-&_-#k-!t-!Y-!#~xxRvacOblRDR'QBPePaPWP7J!A~Ao=]<Q9j9U7S6c5N5@,/,)+}!y!q!h!f!c!_",
    "mie": "-9}-),-':-&Hq7hk^uWeDr9m64504!",
    "nie": "-9}-%*-#e-!O~m~D~5~2}#q'q&mFkTjujLivZ&YVY5X[WCVsT|T<MVG@DW=@:Z%+",
    "xi": "-9y-6&-5l-3i-3#-1B-0,-+?-+*-*n-*R-(P-'x-'>-'6-&/-%]-$X-$:-!p-![~T~8y?xWwnw'tgs;rCr@nsncn`nRnHkgk9jpj`jZiqiOeceOe9djd_dEcscgcZcKc/bqbeb8ay`r`p_s_r^V^6^4^3]_]O]HW%R:QKQ9Q6PEOzNON)MdLZKSIdIGG{GUFkFRE|EjCzCuCmCMCJA4@e>X>S=f<[;i:+9h9)8p8/8,7N3e3R3K343&2Y2+2)2%1q1P1O1N0}0P/E/?/*.{.t.#+p*r)|(#'h$1!k",
    "xiang": "-9x-9,-9(-6}-3*-1}-,4-,$-*0-(x-&r-%L~Ww~uXk5j)h7gqe'abQXP5LWH^F1DH;!8:*E'g'T",
    "shu": "-9s-61-5g-55-54-1|-1F-)Y-'3yNyGu[tGq4oNoCnWnIg}gxdWchcgcIbt^X].Z.Z#Y>WBU9T'S|PvPtP*OhO1O0O.N[NBMtL`JtFuFYEpBuBKAaA`?c<O8[8H7m7Z6m5q3Q1k)f(i('%h%e%d#O",
    "dou": "-9r-61-1T-1P-(~-(N-&&-%|])S]SPN&J}EwAm=d;n6<.$$v",
    "nang": "-9o-1s~d~;~1_QWwU{TkOwD+<n5b5;",
    "jia": "-9n-8<-7Q-6w-4X-3X-2]-,}-)S-&?-&4-#F|}{MwIwDsrs,pvpImei,e[eBd^cA^J^G]L[d[Z[,ZWZ8UhSYSVM`M_K/ILHNH:G^ENAz?H>&=L/3,E,B*n*d&f%0$8",
    "mao": "-9k-1,-1(-0|-0z-*dzLwksLmOkzi?a=_?^(S/QvPrN4M@I'B!AcAW?9;F/Y/#,J)E#$",
    "mai": "-9i-7I-,{-,*-*}-#${Kx5",
    "luan": "-9h-9Y-9V-*^}C}Bvmu0qXq:q$m)jOZ[TvOuL2D69K5J59#4#3",
    "ru": "-9f-6K-2C-1K-(N-#{-!$vkv[s7qyq)jciX]kZgUTP+NzL(E0@W>7;Q9u6b+^",
    "xue": "-9e-.x-(Q-!9|Bxbq>q+mmmMjzf=ckT/SlKvFc?!>u9j7>5y1&.B%L%<",
    "sha": "-9b-4c-3?-2H-/,-.t-*+-%t-%^-%H-%4-$R-$0iCgkZEZDW<N{NrK`H?FlCaC3BDAl?w6{2P,v$g",
    "na": "-9a-1*-*|-(R-(8-&T-#_v=tx]0[LZxZgYWWL",
    "qian": "-9`-9Z-9W-8T-8B-7l-7(-5q-4w-4^-3g-31-2<-/r-/[-.u-+4-)}-&4-#u}/}.zaySy4xZvgt7seqtq`q5n'n!k{kVdObgbLaN`f`<]Z]N[J[1ZCYLY=Y!X7WSVgVbVUU,U+U)O_NwJ_IbH3GiGPF%E7DzD'C~CeCZC7@]@M>$<%81806O5S4B2Z/J/B/2+%!l",
    "suo": "-9_-9=-3]-&8-%x-$&-#j-#gu&s(as^$ZEZDW:PjKaJz:E9y+|)w)v)!(]",
    "gan": "-9Z-8S-7J-5&-0=-/u-'c|Ro'o%o#o!hfh_dqa5U~T]T6R_NuMDKLH6FNEd@??;<:8f7_7/55+;*w'#%?!T",
    "gui": "-9X-6q-3{-/(-/&-.7-.5-+Q-+J-+I-+F-*%}3{zv2u;s?rhrIp|k$jpj`iLhLh,gmf;cMVxVVTiThRCQ2O%M9L.KeIeI`GTGAG<G;FWEQE)DXDQC*@v;;:H4t,Q*A(r(D'q#X#0!|",
    "jue": "-9S-50-3f-0X-/R-.?-+@-*,-)X-(Q-!a-!R-!9~I{PxbvAqRqQnLnJlPl@k$j}fmf>_k_Z^b]7Z`Y~Y9V^V;TnSgKTF7F6D[CvAG@:?!5P2|1d1>0S0G000/+z+M+)+'*](n(G%L$3",
    "liao": "-9R-2|-!rrLovomo<o5o4nKkLk+k*g]gG`/_^W9VaV9S{SZPLO~FxFA8Q8%4f1;0V0R+q(H%[#g",
    "er": "-9L-6v-6T-1r-1a-1_-/1-'B-%hoHoGoFmAg$f~NiLCLBK6FaAt>[>90%*F",
    "chu": "-9K-5N-3d-3R-2K-2!-0$-/m-/Y-/I-,t-*)-!o{$x!s>n5hjgXcj`g_SWxW$VoTNS=NEIjI&HoHQF|E}EsESE#DsDdCzCG?@9r9q6x4N/+*+(,&;",
    "kui": "-9I-3{-/4-+I-+F-$U-$;-!xwow4s/rBo*mQjVjHb]a.a,_y^BXgQdPyI2I0E&BV:S7x2l.q!/",
    "yun": "-9G-7r-3q-1p-+}-+x-(0-&^-$^}xwEvsvEqOb}aca4a)`c]2[yRNQTP}MwHWF@BmBaA&A%@0=3=!:!7W2h2:202(2$1b.Y+(&P",
    "sui": "-9A-5#-&F-#U{3wytvr1nwn4kpRqEWC1C0Ab=H9[7+6z5}2C1g0~(/'p",
    "gen": "-9@-9?-&pX=X'L7",
    "xie": "-9=-9!-7[-4J-4A-4/-39-1{-0s-0c-,w-,+-+'-+!-*k-*Z-)7-$(-!C~e{ry_wrw8w1u)sOq]opnenVnNm$jrgJeFcT`z`p_BZ~ZWZ8X9WnWMV*UiUFT}SWRePXMZLIK@JwI,HOH?H/FlC]?K>p>A;P9h7B695{5!4Q4P3b3E2,0w0s0O,C+k+e)8",
    "zhai": "-9;-6B-4f-4*-3E-*K-*C-&c~zw{p{os[u[2YxW/UwU>SiSfH#EL#t",
    "tou": "-98-4'-4&{$wNv'sqs@aK]*T0SQ",
    "wang": "-97-8v-87-1JvYo7o1o0o/eoeiefe[dldJa}]>RTQ(OEODO=N1JD@J6;+E",
    "kang": "-96-8)-+X}|rmkKg|dG`8]f](G=8_4d.a",
    "da": "-95-.N-+f-'f-'R-&m-#~-!J{hxrw[v*d'ag_q]nWZVJ@f?}:<4Y0p&@&4$#",
    "jiao": "-94-6n-6D-2q-2j-2I-.B-.6-,6-)B-(<-$H-#M-#K-#?-#(-!^-!=~IuUu1r=r6qcm+m(k1k%k!e.e+cJbl_~_i_KZjZTZ5X&W9VlVCV(ToTJT?T,SwSuSgSSQbPgP2LOIpG!>!:l:k9Y8w8<7b5[5C443,2b1>1*.9+l*X(5#e!v!^!V",
    "hai": "-93-'V-'0-$#-#h~ey]vOq;pL[!A3=N3[,C",
    "heng": "-90-&B-%QuJcXcLbaVKL/FiF&<|42*B",
    "peng": "-90-5,-3J-.F-+o-!~zgyqyYfUe|cyc+`%[tZ?Z6YkXpWvW4OTKCJLIlIWGGFn?6<R<D8e8]7Y3Z1h$a!u",
    "mu": "-9/-8H-/~-,=|Ey9usuSu%m<i&i!`[`Z[TPVPUO7O'I(FrFqB1AwApAX@#4h/a/_/X/L.S&U&Q&E&:&9&(",
    "ting": "-9*-68-60-4C-*M-*7-(]}>t}sxk~hVhJh)gBg?g;dzZ<K]KHH~H(@u=6;]6u453`3^*.&^&[",
    "qin": "-9%-64-1^-,8-(g-(f-&#-#f-!Q|w{Fshs.p.p(o~oyogkmkVk2k)hOgbdO`C_G_F]N]5YlX,X$V/UlS@R=J|E`Cg@3:$7'6(*J)R)M#l",
    "qing": "-9%-4b-3<-2(-0A-.b-,O-*S-%1}V{1wfp7hQgwgeb4`9YLUpUoQ5PsJ'G/EME/DcBnBFA7A.A(<';w;B916X&x",
    "bo": "-9$-8Q-7`-73-6,-2v-2f-.e-.]-,Y-*y-*w-&M-%#-!h~oxbq*k3ibeu`s^|[3ZJWyV=V5UgUfMFM'KYHKEVEUDFBj?E?,=e;};W:L2//l.?,9*q'`'^#2#1!Y!8",
    "lian": "-8}-34-.;-+E-+D-#V-!XzUwAvusMrKr/iegjd&cS`F_{^fW.T=SrJhI#GiGSE7DfCHBlBP=%;6:C8j8A777$6p5p5l4<2f1y0z)x)3(X",
    "duo": "-8|-8X-02-/2-/$-.c-.V-'`-&y-&e-$O~}~S{|{{z}z]xzxywiwhwHvtvlsNo+lOh1ae_oZrZqYJTET>T8T.O)O(NfN^MrMTMSM&KuIRAh?`?^&D$i",
    "men": "-8{-8G-53d8bcbCaz_9_&]VYgS^PZIh@>3=1,+((W",
    "ren": "-8z-8y-8s-8U-8F-88-/d-/cx;vSu`n:n2d|dwdv]XO,NiLPLMK6J7/]",
    "shen": "-8t-7V-6i-6/-5d-1Q-)l-)k-)j-)i-(V-'i-&}z^u|u>ttsys.qmp_pHorn7lui(fp`t`b]b]4WPTFR4P9P3M:J7J(IHHRA9@+=D<0</;f;e9?671?*g&~&w&q&e$G#{",
    "ze": "-8p-6B-4*-/M-.{-'X-%d-%2-%.-#9rcl:iAi#hU[~[2Z$UwRKR7G)C.@q?n?A>n:(9U7C5[!e",
    "jin": "-8o-8j-8d-7}-6<-35-2^-2=-01-,y-,k-,[-*X-*'-%o-!F~y{Fzkz6y<xPvFt7rfr9q~p(nyj'j!gbb+`CWfSOQaQ_N7HEG8CTB[>E=q=M:I9$6~6g3h2M0i*Y)y)K(z(d(@(*",
    "pu": "-8n-3$-+k-!S}^}O}<{BzPy(]p[rY{V0UvTeTdQ;PiPPP&O*M,FZE_AS=`:17k6T614r3a+v(C$m",
    "reng": "-8g]m",
    "zong": "-8f-5:-4y-43-3KzFpikxkrkNeJcdaraVY^XXX(W&Q|O>MxJQIKG28L8D8#3+1n1c0{,b,R%E#w",
    "fo": "-8e-8;-73|IJl",
    "lun": "-8c-7i-6S-4u}l}Y{.t*lSlRb9[{YMJa?j<6:3",
    "cang": "-8a-89-7h-5;-3e-07-+OkeD<?i9n6J,**{(p",
    "zi": "-8`-4m-17-.h-)%-(W-'t-'r-';-%@-#r-#cupuoudu9qTqNqMqHq1q.l;k[c;NnLKK8InH=Ez?s>W<];o:Y9g9_8a7;/G+J(!&Y&7",
    "zai": "-8`-3V-2G-1!-&v}8pOl.]j]>L3>f;>:.4|4{3~&Y&7",
    "ta": "-8^-6E-3^-#~-!&~Kz$yyy6vep}lc[HZXW`V&HCG}EqA[?}<c:<9w8^7(6w/`.3+d+V",
    "xian": "-8Z-8Y-7b-7,-30-2m-2d-2b-1i-0O-)o-'c-'E-'*-&O-&2-%6-#u-#:{`{!ycxXv`v&uKu>u.t`tZs~r~rOrNr9q`pUo;o:nBmylxlhjthhgCfhf+dI_a_X_R_'ZPYQXsWnWiVhVXVSU6U'QlQNPKNFMhGiFFEtDRC~ArA@>S=E=7:]:C7Q6*574*0l.=,s,G+f+c+U+O*|*s*T*,'3$c#b#Z",
    "cha": "-8X-6Q-4D-/,-.t-)e-$A-$$~s{yvbu?o|m}kqj3]a]OZ7Z.XZX5WJW1NsM0LvK?I?GjEB@k,<%s",
    "hong": "-8W-)w-).-(X-(K-(;-&{-%}-$)~i{kvXu6pqpjn=j[fvfBa*``XeVNQ[@E?y?<>@=b=S;J;B:R8J7U5(3|31+>+4'T",
    "tong": "-8V-7/-6R-4Z-2h-,/-(}-&|-#Z}o|/mNm>m3h:f(c%`P`)Z1Q]P<O<K|KUG+F+AV=P7l4C4#18.~.0+s%%$s",
    "dai": "-8P-6G-3W-)g-(B-(4|3{(w[m`ikiViMiFg[edd!_/^1PAMJJCC)ByB+5c,2*y)?'!",
    "ling": "-8O-7X-0?-/D-)G-(#}h|>wwuqtKqdmdmVlQjhekY<R)OQMRJeJ5DND)?/<77=5'4O0v0=.I*z){'H!z",
    "chao": "-8M-8D-.B-.6-,6-(S-!yjQj?j>ffd9]<VlQiOBGFG!C{9+7z4g303#22/v",
    "chang": "-8L-8J-7j-5D-5+-5!-3|-2~-26-1b-*P-)~-%i-#8~v}%z=yZtWrdo=iDgReLd>bDaxT:RBQtPcIiAT<T<P2t,`+6)^)4(h'B&z&R%w",
    "sa": "-8K-+2W<VPU:Dw?'>X7s5L",
    "fan": "-8E-0)-0(-0'-,1-+R-)a-!hy%v_tDr;r:iwhwdi_h]l[ARvRtNpMLKXJrJAG,FD@w@g?4955t5_3n2E15.l.[(A&O&/&,!.",
    "miao": "-8D-,m-)v-$?vDscrPh>gtgSX^NP<#;A+K",
    "yang": "-8C-7<-6{-3[-15-,f-,@-*g-'Z|J{xwTukswmrl6l3e`d4cEaA`m^}]T[lXRU<T*RVR2PmNRMHL9I7HvG`FpB|A=A2A'>z>`8N6A4y4D4.2B+6*O)4%Q$|$@#F",
    "ang": "-8C-*gn.RLQoN0!5",
    "wo": "-8?-4s-4L-*l-(/-'&-%q-$atCtBsfi8^TZYYbYSXKV#SRN8I>@1=#<m<h;V;U7!6`3.,N'|",
    "jian": "-8=-6J-5W-5P-4g-4:-3g-2s-2i-2L-14-0L-0<-.q-._-.W-.P-.4-.3-./-.,~6~'|bzmzaz2xovfuRuQp4oDiHhcg8fNfHeDaq^Z^Q^<^9[8Z>YqXmXjX7WmV!UGU'R{PpO_MoM(LEK3JgIfIJICI)HEG]FhFCEKE2DLC&BMBLA]>a>$<z;l;a;&;%:Q8T7P6H625k5f5a2a1l1Q/u/Q/2,g+%*W)<)6!2",
    "fen": "-86-3}-2n-/a-(`|v|q|]xuw7vpv;n&ithog,dDa0_gR>OYOSN.K&J*J)F)A>@66}5i4v391=16+{+.",
    "bin": "-86-3S-2EpAe}W?UNShJnImGXE:B^BO@r9I6q6Q6M6,+.(j((",
    "di": "-85-7@-5a-4F-3:-*D-'}-&t-&$-%R-%&-#O-!(}0|h|d|@{Q{L{8zMyFy;x|w?tqsmrimUkIjoi`hBg:fofjeld#`7]g[g[=YFX]XGW2TLT!R[NfN(MrM3KAK:JCHiG7AI=g<};T9f9=3F/K.V+=*5'1%c##",
    "fang": "-84-4}-+^|r{Qzcv5er^%TZS:S(RER6N/@<<M/Z'P",
    "pei": "-81-7$-5o-'lzyvZvCuCtOs_k7iid7[eU5S5S,M'LyJUAj?u=F<@.`*=)d",
    "diao": "-8/-0@-/f-/G-)1-)!w$njfzfYe~]gYHI|@m)U#p!?",
    "dun": "-8.-(a-!2}}|sy!x~x}hNdPb2_mVYV.T2HnF>@'8*4c1@/!+m",
    "wen": "-8,-/X-(M-(C-(&-%Jy`vNf)dfde]:X.WRSmQsKNHWH)C$B`@>;z;R:*4s+1*8(}(&$;$.",
    "xin": "-8*-7f-5d-5G-!3-!0~%v<r,qFgTe$e#dHawa>SCR9N@N%D$C^4a3$",
    "ai": "-8&-2W-09-)h-'!-&q-&5-%Y-$'-#]-#E-!;{SzIyfxUtgtUrxr'kaa9_7_,ZNYaT&T$QqP^P.CxClB.:%9t6U3.03(k(;#]!s!j!]",
    "xiu": "-7~-5c-5V-''-$/~|p@mfmPh2N~G09~9F8I4+*P*#(N",
    "xu": "-7~-7Y-6Y-6!-49-0x-,F-,E-*Y-)T-)+-'p-$e-$Q-#7-!o-!W}7{Wy,x+v&uxspsArFhHeXckcKc:b(`g^YY4XMTKT@RbRZR!QcP{O^OOLGI9GfC|CtCiCOCKBw@5@4>?=t<>;+;):P9r998W8B433W2H0m+t*N*?&;%T",
    "tang": "-7y-5+-4M-3l-3U-1v-.2-&.-${-#.|XzpyukdilaA^cW^V~OsJFH%F{F<@P<T:h:G8n5D3i23100A(u",
    "huo": "-7v-6r-5T-.Y-.1-(p-'W-'D-$e-!%~V~Fw^vouWf.f,b'^OZ/Y4UPU4RkO|E9@%>/:f8U6y6Y6+525127+_#@",
    "hui": "-7u-7#-2u-1{-+H-+.-'/-&j-$[-#=-!f-!U-!D~p~,~&}u}Fz]xztEsgr7q]onn?n>i*gmg7g5f6f4f3e,e*cDcCc<c(bfau`H_x^sZ|ZQX>VEQSQCP|PQO]KeIOI3GRF4EiEZEQDqBVB>B=B7@n?D>h>g=y;+:S9X897x796y6:5,5)3t3q3k2h0y0q+h*9)G(=(2$~$)",
    "kuai": "-7u-6@-2M-/p-&f-!8}:|ez&y'jEgMdXUkRrO]Cq=y79.*+g(2",
    "cui": "-7s-5?-3N-04-%I-%>y8lYlWkhdSbE`TV|IxH*GHAg<48P6a331g)p(b%I$L!d",
    "che": "-7n-5`-4I-,%-'y-&*|?vln|nGene/]QY.XcVsV>V<7`3r3b3E0C",
    "chen": "-7h-4_-3e-2'-#|~ZyWyAw]pGoBdRa>[aY]THS~QAP$L[K_K'J(HUG3D]@+@*2n05)l%P$?$$",
    "xun": "-7g-6O-4.-,Q-,A-,)-,(-+5-'3-!k-!P~u|y{=yixYxAw#uHqKq9o`oOmEj@j&j#g=ebe>c]`uXUTfRcP(NqL_KbF`BvB@Au@Y>5=r=l8+7y6V583O2h1{1D130j0Y0Q.5+b*H(L&T",
    "chi": "-7c-7M-6b-6P-5E-3@-,W-,K-+_-*]-)<-)3-))-(:-&W-$z-$I-#l-!g-!=|@|)yLw/vBs6n|fsf$eweve6cBc9`X`7_|_2]`[f[!ZvZ/W+TxTCSNNcMPM3G1ChC6C4BX@T?Y;:8g4~4;3U1K.O'A$Y$U$E$2#G",
    "xuan": "-7b-2N-/.-)o-)'-'(-$Y-$Mz)wsv&sWrqr.p]f[cobMaQaI_I^nX_SyS'RAR,QeQ$Q#PNK@HxHwEf?#;I8d4M3x2e+L*s*)*&)B(Z'~%/#E#<",
    "nu": "-7a-3r-,svjq?ilfed1Wo",
    "bai": "-7`-6z-(1-&:hJ[?[>ZwYeX}WAUfUCTAMFLN,n'D#*#)",
    "gu": "-7_-3T-2e-0F-)I-'s-'N-&<-&;-%G-#y-#@}gzfx#uhrUq@o&lXl=j5j4d*`~]_]9TSNaM.K<JIHFGzF$D{B<@K?R?=<X6P6./P/@$Q!L!G",
    "ni": "-7^-7]-7.-4v-2>-27-+8-(%|Nzsznv/v)t<rkqkq0nznbnEcvb5`{_,]0[i[<Y5UQS$QuQ7PSMPJ&E6@y?)<=9x6o.F,l%b",
    "ban": "-7Z-.!-+,|z|Yutn0d2]R]M[OW]W[T[ScSbRJOSN;MM:c/x*>'Y'R$*#[",
    "zhou": "-7W-6M-2X-0{-'|-'z-'Q-'5-%X-$i-!G~{v.t/pgjCiceIY%QnQLQ<I|>8<S494'*S'9%W!R!I",
    "qu": "-7U-7E-7+-/H-,q-+S-+=-+7-)t-)s-)W-'e|Vt^nnm{m]k?e%`&^0[^SzSIOnOOD=D4CzAL>)<3;[5U3G2o0D(K(8#9",
    "ci": "-7T-7B-6m-47-17-/+-/'-'t-'r-%@|*q}j3h<`hN|MILHD&C??56Z*p*k'E'6%=!{",
    "beng": "-7S-#w-#+{R{#zgyXw!lBkYX0>v)d)[',&k&j$a",
    "ga": "-7Q-'M-#A-#/-!4wIwDoEo>o.RaOM+C",
    "dian": "-7K-7:-3m-18-**~M|P{lyBxfw6v~t6t!kXj]jNjMh@ao^!YOTrTWT9I_GqG_FPF5B?<a9k764?*u)s&c&`%1$W$$#L#=#6",
    "tian": "-7K-56-1>-(7-%`ylybwYvit=nodgc2b:Y#WPQ?LSB{?U<A<$;2)g(q(.&}&|&h&`&L&F$W",
    "bi": "-7D-78-73-5F-45-+c-(h-']-&k-%?-#Y|jzVxgwLvnv:u}twt1r3qonrlFi|huhthPgLg'fRfQfJeme!crciaJaF[YT;SqS+OXO!MUM!K;I<HPB)B(B'B$A|Af?x?C:u9Z9D7q6e2`1p.%+y+x*`(:&W&V&G&5%^%H$T$S#'!o",
    "zhao": "-7C-1k-)A-%X-%T-!y|#v+j*]B[@S!Q}P8OBM{J,E*?S6S4T2G0r0:09.7(m!F",
    "shao": "-7C-,p-+~-*a-)A-&Vu,oIf^Z'R|NhM?K(7v3m2s17*m",
    "zuo": "-7>-72-66-4E-'L-&,-#!|lmtmsj;h0d6YTV4R%M7M&)e",
    "ti": "-7;-5N-5'-4R-/!-.n-*;-%H-$y-$3~w~rw?smsPnmnYnVl2foeCe6bnbjb#b!aU^)ZHY*X]XGU>OaONL$JxJCCQB]=0;T8O*5)A'r",
    "zhan": "-7:-4>-2y-*s-!IrQnamRl>l)kCkBk.j|d+b0^M^?^5W|SJSGS0RsMjLiL<KmJ?HLFCDEAyAQAO?Q:|)q!F!4!$",
    "he": "-79-,_-)$-(v-(/-'o-'Y-'W-'&-&R-%<-$Y-$W-$1-#d-!c-!!|,xVuyp6mJb&[jTROiOZMNL8I@CsA^?]<i;M7R3P2m2'2&0k0e.8,C#^!W!<!:!6!1!,",
    "she": "-76-*E-*9w/v|oVfP`_`;^h]'ZyZbYjX:WEWCT|EEDACJ?@=<<f;s9Q5Y,W&*&)&$",
    "die": "-74-)M-'>-&t-%H-$j{szSmDl/kIi3c}cPa`^IZbX:QwP!M2HsGUBcAK?I0*/}/n'_&#%q%j%i",
    "gou": "-71-3p-0y-+z-)H-'p-%W|C{uwdwcuTs0mnfM[CX%VcN6M^Gm?q:925.C*o%2",
    "kou": "-71-0f-.C-,g-)J-)DpCp8fId3]^[|VpTV9@",
    "ning": "-70-6>-4a-29-0.-'H-!)r%q!p2p)p'p!ot[4UMM5F/E5?17J6k.<+a&i",
    "yong": "-7*-5t-3M-,U-,T-'T-$t-$+-!:{Oz!yCxcrlkUg{gAe{ceb{bzapaC`w`n`:[6XTU}M4LaGQ@}>x=9:p947:5T/{/i&p&l%)#S#8",
    "wa": "-7)-/n-,e-(/-'P-'&-&x-%h-%A-#y-#nu5tbt3sGnCije[ZaWUTq>.:;8h'V'D'>&A",
    "ka": "-7&-*r-'O-'M-'4-$u{g",
    "bao": "-7%-5h-21-/>-.e-.]-,!-+{-+s~ozPzOz@sBqBpcpMp$ohoee&d:[w[kPPP1P&M]614J2<0_.u.h*G",
    "huai": "-7#-',|mx^xIe_dC_:^oGhDX<25z",
    "ming": "-6x-0g-06-(|-'guEs&`aXxR@PhOFH<>0:7,8",
    "hen": "-6s-&p-!3eac6[0.:$y",
    "quan": "-6p-1H-/.-.#-,5-,#-%%}X}Q{4w5u:t;q[m?jRf`c0b_b%['Y`WKNxJ:I[H_GLFjD>?F>F:a5841/I/H/7.o.n.m.O)2&I%'",
    "tiao": "-6o-%Xr#pWmjmWh4cRZfSQRdQjOLO'NYK.Fo",
    "xing": "-6j-5.-1<-/U-&g|0{auft{t5qljAh`f*cxb>aZUYR/P4Nl>Z<u9d2d.N,L)@![",
    "kan": "-6g-4G-0r-/r-/]-,D|n{!zGyDlkl)k{b7^D]ELRG]E2CeCc",
    "lai": "-6d-5Y-5<-%_u!t2lil_h$eSeHU2NUJiJ0DT=&<)6r5v5r,i)k%R#P#J#?",
    "kua": "-6a-'.{iwJuGcGZiQcI:",
    "gong": "-6`-6N-1D-1?-,~-+g-+d-)w-%}-$)yepTpQj<j8i2g4f{c1a*``[)[(T^N`L?@V7U1u*R",
    "mi": "-6[-0v-0n-0b-'9-#'yzqZpmpDp9m6i:i.hrfifafAcb^dVnU_TyTON2HIG$E6E+@L?{?Z?C>G<9;H9<8o6o6l5n5G1z0B,a+T'h",
    "an": "-6W-5J-4<-2D-*P-*J-')-%e-$x{b{&z_sYpwn@n8mXm:hXg~ZnXNQ.PnL'L&A1>M.g*w$V",
    "lu": "-6V-33-1C-.H-,N-,<-*q-*o-!N~q~_};|G|5yVyUxMtVmChGgZgFf9f8^7XzW)V)UzUAU/O{MpLeJ#G&FyEuDvDaARAM>s<K<;;p9:9'8.7L6@6)4p1m0T+W+H)Y(Q()'m&n!%",
    "mou": "-6U-,c-)x-($-&azLcVTTMEKs/a",
    "cun": "-6J-/Z-(~x'qLocdn[%Nj7^!O",
    "lv": "-6F-63-4#-38-23-,'-*x-(t-(F-&G|+nTnSnPl(e^`A`5ZcZ*YwS.K*HTDsDoAYA)9M6D3A0]+I",
    "zhen": "-6C-67-4)},ygybuMs*p5ndiUiRi<fc[nZlZGXWWOSTR*OJN$MhLVKjK_IHHuHLHAG_FVBb=~:y:$8$72,+*_*^({(q'8&Z&<%9",
    "ce": "-6B-4*-1%-1#-*=-*2wZgrc!aY_jZ}TQLl={;O&8",
    "chai": "-6?-2@-$h~?j3[UL}.i$'",
    "nong": "-6=-2S-0p-&b-!Eg.ZmZAElDG=s7#0o#W",
    "hou": "-6:-5*-*8-({-(L-(K-'p-$l|%zQi=e]>b._,A$C",
    "jiong": "-69-3'-1.-1$-0}}z|K{;]~]}?M=J7e4t4I3c2T2S1W1.",
    "tui": "-6.-6(-3&y'tmo$ftfodrY(F>24",
    "nan": "-6+-*|-$r~'~#v=tzstrb^e[sXfPqN*M6H}:d29&a&?",
    "xiao": "-6*-5v-5R-3a-.x-,d-'j-'1-&l-&P-$}-$1-#D-#?-#&-!|-!v~c~J~CuUtHqGpPpJoKlGh/fFcJ_iX;V:TPT/SoSnQVQ'P;MiMaLOK+DOCYCLBAB4>B===8<Z8E6!5+5*4,3L2&1L,o+r+o$t$o!i!b",
    "bian": "-6)-+9-*u-)UwzmKg1eAdVaX^#]=XSR#@A@@4Z26/o,@+`+,':%8",
    "pian": "-6)-4P}ysI^#I=Ht/y/0,@+`(j((",
    "cu": "-6%-+$-!csFegd(_YEsB},X$I#z!H",
    "e": "-6$-4K-2k-+j-*T-*N-(_-(E-(*-'A-')-&X-!j-!A}s{nzhzIzCv$uzuBtotUtTtSn]n)mGm'm&l+gnc'bOata?^+]DWsWdWNUbTMM}DZCEC(>M=5;9*7)`$V$O!r",
    "guang": "-5~-2}-1h-'@{~uIhXhTgOZsVKL+>28)5/4b4_4^3s.d+Y*U",
    "ku": "-5}-/3-&Q-$6~R}PzrhDh+gN]dZiZ5OPMgL!I%3N.>$9",
    "jun": "-5{-2T-0q-(n-(G|u{NuHollq_;Z3U5TzQPKMJH@F=l6V3G1B*1&'!Q!K!J",
    "zu": "-5w-5?-+1-+$-&S-%rlYlAd(S#M1Ix0'*e",
    "hun": "-5s-4o}_t9t'o9dMaz`oYDR?Q~JYJRBf=u<d<(;=:t:`9{3O36*9)G",
    "su": "-5n-3x-2c-$*~9}/{3y}y|wjs#p@a(a'_lVnKKJ2H;G(F~F8DYBo?2>>=4:&9z828&+F*L(F&r",
    "lia": "-5[-5>",
    "pai": "-5Q-&sg9eP[NY?JU?p>+;j;8/t.w,q",
    "biao": "-5O-36-2/yJtIryi%f!VfNhLjFzEG<.9C66511o0c,k#|",
    "fei": "-5M-.m-+M-*4-(i-%8w%vZt@t?nXh8gpgPbH]xSdQxQ%P:OPNLLxJVH5FOF)Di?W<C;x6K.`.H,p%3$]#a",
    "bei": "-5I-57-4B-4%-3b-37-,Y-+a-+%-(1-&:w|qIh#bdbGajaR`$X3RMNLNKLyK^K5JUJSIq3:/S/).R,y*/)T!@",
    "dao": "-52-/g-/e-/6-)E-#K-!5xSo_oLmvlvk;k:jiiKhld{b=YoYcWqUZO'JkIaGZEIE?AA3;0g'd!+!&",
    "tan": "-51-3^-3/-2R-)4-%$-#P-#I-!n-!m|o|a|U{'xxxsxaxKtAfTfOfEdtcfb$_p_W_OY/W=UDTuR5PJP=HYF5EnCUAk:w9H7|7{7.5E4K1G(3$}$^#~#7",
    "chui": "-5/-(O}T|9{Va|Y[WcKtJ6ItGl4o",
    "kong": "-4{{+qPlfcNb;Y)Iv<n",
    "juan": "-4z-,h-,P-,0-*[-((}X}Q{Iw<w5uVtut;jpj`j%iYf`byb%`4Z%Y`OGL%K@J:I[=2<^3M.!+j'C",
    "luo": "-4r-1y-.|-'4-%(~<~/o^mHZ*YbW(U@U3U/T{TlOvI^D9>q>O>N;y8^6F3{/(,T+P*M#y#5!Y",
    "song": "-4q-3I-0D-)'u8pulDk^kOgydYdAb`a3a$`D_MZ#XXW0N<N:MmM>K%J`HyEF<B9!6v",
    "leng": "-4p-0T-%uzdz,lQa1J5I!",
    "ben": "-4l-$E|q|pwSwPw.w(YXV8O3LQKXI4?B;|8]4v/8&=",
    "cai": "-4h-4,-%N{%tLp?f#]t]qY0NkJZA},Y",
    "ying": "-4`-3.-%1-$>-#*-!K~Oz%x#s{sXs9s%quqqq_q%kcj[jWhCgDexdha/_AVwV_U0U&R]R.Q:PwO?MHKpK]J{HvHdFbDMDI=_;E:U:K9d9O8K8F6j6i6N6=6&5~5o5j5M5A2w2r2_1x1)0b*:)*(y(S'i'5'%#j#;!B!;",
    "ruan": "-4[zJxQsiVWOUE0):'}",
    "chun": "-4Y-&7sda^RPR(PlOONDIBGrFQE(=T<,:[9N8u/6)C",
    "ruo": "-4S-)[sskPf]Z:YUI8;y3'0^",
    "dang": "-4M-2P-1V-/k-!1}*{fx]swpkl6kdf:aAZUUsTpKiEYD5@|8:7E5D*;(J(6'?%}",
    "huang": "-4@-1L-/w-$PzDz.xtw&s[pEl9jBi0e@clcQa_a#`dXTQgQfPBOEHbH7D{@9:x9i8)4:2c2.1J0X+w)((E#i!}!g!Z",
    "duan": "-4+-.Uz+s`SFS<IMBIB62j)0",
    "ou": "-4(-+=-+7-(q-(K-(3-#;yTd?`EDpC}CSBJB8?l8s1Y'M'0",
    "zan": "-4$-2.-1x-1o-'2-$c-!e~:p>[$XOVUU8U*TwR1Q&PYKrEy6E5K't'k'c",
    "za": "-4$-+Z-'b-'X-'2-$c-!c~B~:~5i}]s[$NyKr?r?a",
    "lou": "-4#-38-.}-$7-#ByMu4tRo{n[kjkEg_`5X)W'HaG#:O9&8~1i'2$5#o#n",
    "sou": "-3z-0J-)Q-)N-#z-#R-#QgsghZ#YvWlW>W0V:U`UBJ/DgCn:#,5#s",
    "yuan": "-3u-1n-1)-0h-.z-*3-*1-)y-(0-&^-$Y-!<}{}t}Z}R}N}M}D{t{_yawlv6v(sSs:s)qhpep<f[cwbyb,`qXoX8NNJ=HxH>H0ErDk@/<m<*;{;v;r;g:e:F:D5]04,M,6)/",
    "rong": "-3t-3`-0u|ts8s'qzp~pFlwkokcjj^WX#WwOyLmHGH.H&GQAsAU9|6%3T1v0b.2)#",
    "jiang": "-3p-2a-,7-+Y-+Wz/xew~w+vvvru]oToSkMfrfWfVfSfCVyVeKdGDEoDeBQ@U>P>#;L9A8M.|,&&B%y%n%m",
    "bang": "-3n{^ypiNi5h~hme|Z?YrWvS2KEJTJSH@=j/m++",
    "shan": "-3h-3)-2R-/F-/<-.a-.E-*~-$q-$F-#H}'{Gy+y*ulubr2nDj|i(f+]zZ;Y3XuXsWaVhV?UySvQ8NrL|LlIVFSEhCI@`7|7p7O5F4B2Z211~.4*b%U%1",
    "que": "-3f-*_-*W{Pyty$lgbNa+`KX!T8T.JBH$@j4e0|)O#q!N",
    "nuo": "-3Q-1w-$ftxa6_#_!ZLXnWoWbWLK0HJF2Am",
    "can": "-3P-2F-)l-)k-)j-)i-$D-#H~:r(q3amah`W`V`U_[XsVqVhO_BtBg;/784z1!0L(9",
    "lei": "-3O-24-1t-,J-)q-#1|(z0xOx?rrU|U;G'E]DyDxD/?$>I=+<F5X'z%u$)#Q",
    "zao": "-3L-/h-&(-%w-$5-!@`JRfMsLkK>JO7F5&2>1#(](7#&#%",
    "cao": "-3L-#GnGk@`v`k`^_DVAUqOgOfG:8x",
    "ao": "-3H-/n-*&-#X-#W|H|4xnxkv}vyvwsDs2rZmxmakAjnga`O_@]I]![DVuUeTBM*K=?>9;7M741m1^0Z,!+~(Y",
    "cou": "-3D-0:Hl;1",
    "chuang": "-3B-/b-/K-/5-.s-.i-.L-$T-!dhvhMd=`|W7O<F+0#/r/k%D$+",
    "piao": "-36-.D-,;-#Crteze7`]RuO*Br9/.v'Z!X",
    "man": "-32{KyKujtlrpn^i'bc`M`=VrOdG9Fs:V9P928b7<701V,(",
    "zun": "-3%-!ix}oPk&[%YzVILEFU5k",
    "deng": "-2z-/t-!VxwrHk(_v^@E$7d6/5.1A(O#,",
    "tie": "-2s-'yigd+",
    "seng": "-2o",
    "zhuang": "-2hx9x8x2w)vWv@tphvhShE^a^`^_VDKcKBG6:`8X3H.e.Z",
    "min": "-2`-0Q-/E-,X-(&|1uumYl]dfded8bJaWaG`S_`[]YhTUTIT(RSRRPzAH>|;z;+:t8(+1*c)o)j)=$R!D",
    "sai": "-2V-#b-#)-!/yod%a2XaAxAb",
    "tai": "-2B-0_-)=}e|Mw[wXwOvzqvqCdodQdB`e[pU]SpR]MeE>@f@D@C>{:=4G4F1$*f",
    "lan": "-2?-1@-)}-%P-!'~3|hx`xXt(qgqaqUmwkwhgb)_8_'^p[5X/UXU(TmSaS_PpLbHXDDD2D1=^9L8i7K6W5`5W5=5<46121%0n0d0I0@0>($'j",
    "meng": "-2;-0k-,Lwaw`qEo2hnh*_._+^qXtUaP)O9K$F;EAANAF:A6h,Z+]'/&X#B!#",
    "qiong": "-28-*fr.pza]`!K}F(3(3%2L1}*))J(G's'f",
    "lie": "-25-0N-/O-,z-,w-,`-'<-&G{D{CuDjaj=djZeZ_YiUEL;JMA{>_=p403f2A1$0a0[.x,h,V+k+[",
    "teng": "-2%i+9]8r1e%6%&",
    "long": "-2#-'J-&]~^|7|6xHxGo2n=k6j_j^g.e([9U.QmOxO8LgKDGYDU>t:g9T9%5w0N*Z'n#f",
    "rang": "-1}-,$~Nx[xC^mU$5b0K+S'X",
    "xiong": "-1m-1j-/q-+v-+p-&zwsdLc?Sy@;>42w2r2#2!",
    "chong": "-1l-0Y-#L{*p`oflelde0dc`+_dX<W8?z=K=98X0F*@%&",
    "dui": "-1g-1e-1`-%L|$zlymobo]oMcc_n_m_*TET>T2NB6[6G5|5u$P",
    "rui": "-1g-1e-1`-)LxFas]0M~KVF.@G)'&t",
    "ke": "-1f-/*-.w-,]-,R-+;-)>-'o-'0-$!|Dzqx4u#p^oUmomIkvknjqc4bra<a;XJWsT4M%J1G|F}CcBCBBA/;u;G:>6U4U0!/N//*j%>$O",
    "tu": "-1c-1]-0H-/o-(y-&3-%?}n}c}J}I}A}?zezZyvxipvnUlskikFh.gVeVc}bsZ.YYX@W2K?EL@R=C=::r7u(i$r$>",
    "nei": "-1I-1*-&TtvA<A;=H",
    "liu": "-1C-/N-.8~fy^s5qik`gl^vW9S4S*R}L~LpKnKQH'FHF#>(=w::8Q7V631r1[*a)~)%(v(?&S&>&%%r$(#d",
    "shou": "-13-)`-)V-%l-!o{ox)x&pxo[]v]uYITcTN<t.1+n+X$e$&",
    "ran": "-1+-1&-(!-##umsKMBF'2y1Z1F*i",
    "gang": "-1'-0^-/L-.gzjz4mzmplT^a^`^_]fYKWDNZJEGe;L2z2v/W/:.a%Z",
    "gua": "-0~-/8-.r-.S-.A-*m-)F-(/-'s-'&-%0|Ooz[/ZuY6LSK[C`2='a",
    "zui": "-0i-*6-'d-#U-!w-!*k<jmQ=O`OGLDG[F]EgEbD@6a(%",
    "qia": "-0M-+;-*r-'6})m0iZc.a<[j[7YAXJUhBq>,",
    "mei": "-0I~j|vz>yRv#sks]sTs4r<p/l&k|e)[bZBU%S3R&M|LoKFHzHjGgDrBfB0B/?~?o?d=I;?;7;32Q2J11,=+$*0)D$w",
    "zhun": "-0E-05-%L}5zwpnnFdPRQ<,:@",
    "du": "-0+-.`-+B-)p-#0z<vKv1uTqjh1SsQ4PvN_IcDlBRBNB+=(;n;Z6</s/h/5.y..+i)I'y!E",
    "kai": "-/x-/v-/%-.M-,I-#J{ey~w0n3kag2dEc#aB`y`r`GXCPfHfCxCu6U4m3}",
    "hua": "-/T-.>-+b-+(-(_-(.-&h-#%{@wGuWs}s|rJrDlaWTV}V+NAMvKfIgGKFX9a7c,7&]&+%~",
    "bie": "-/A-/;fGe2`#M'M!$!#I",
    "pao": "-/>-+i-'^~o|2w=hA]$[P?.4J4H3d06.M'^%A!S",
    "geng": "-/7-&A{TzHlrh=ZIOlK4IX=X2p&M",
    "shua": "-//-%j",
    "cuo": "-.y-.p-*5wukWkSh!ZKY&WuV4(o$j$'",
    "kei": "-.woU",
    "la": "-.v-%3-$n~L|8[RXFXEWnUEU2R`MOI6DT:T0['o$A",
    "pou": "-.l-'_-&[{]twtO]+]&Z+YGJS/<",
    "tuan": "-.I~!}~}K}HyPy&f7`>[}XIVmGLE;;.:m8t2[,F%v%p",
    "zuan": "-.)XOTt",
    "keng": "-,x-([|t|kvIZCXlVgBF/C",
    "gao": "-,Z-(I-(>wRlpWjNHGxGwGdG>E~E3Dm,)!y!t",
    "lang": "-,V-&J-$~{Jy[r{llgiSeOIOHO;KRHHG4Cp=[3Y,z*%(s",
    "weng": "-,@-#oyxv{kfU!Pd9o'N'&",
    "tao": "-+m-)E-'+-%DwPwMw*r}i/fl`j[oYBWXL,JkGtE?><=)<t<H9^6_(w",
    "nao": "-+`-'n{cz[wqt.rzq8l{jyjSd0b~bPad_QZVW9VOKkFJ<J,D+Z+Q),",
    "zang": "-+Oynw)g(/~",
    "suan": "-+C,{$n",
    "nian": "-+3-&i-%b{9uOhdg3dNbTa~[SYVVHV,U7HL=;<0:C2q",
    "shuai": "-*xixiWW3+I&o",
    "mang": "-*<-)*-&Zx(u(o2h*dkb|OENdNSAF@c=i8`/[/D.$$q",
    "rou": "-)uslpsXdMAHc;d2K)>'v",
    "cen": "-)l-)k-)j-)i{Un#kH@?=1",
    "shuang": "-)byOqeq^`NDB>t8R5w5^0&",
    "po": "-)8-&M-#6~]|ZvztMoZmlmZg9W]TXR+O*E%?E>q>o>D;*:J8;6F3v,9*l!`",
    "a": "-(s-'o-%O-$0",
    "tun": "-(k-(7-%L-!`}}|snFhNdP_mRQPFOC@x=335",
    "hang": "-([{dwSvIj)dGS8NML/@.",
    "shun": "-(ZHnF?",
    "ne": "-(R-(8-(%-&T]0%a",
    "chuo": "-(Q-&@-%=~Hu!t~t.ssqVa|^2Z}UuCC<q<J",
    "wai": "-(/-'&-$gwml7C95z",
    "guo": "-(/-'&-%)-$e-#<~.}r}k}f}d}a}U{<zTy>lMi@i$fDf@b1`Y_4XyW6TMMzJ$I:GOD{=#<W;U9#7!,c$<",
    "qiang": "-(,-%f-%M-$.-#[y=y3xmrXr0k>gKfVfSfC^P^N^>[zWQW!VySKMlIvGkFdEJ:)8{4[1s/|/z,f,.*{(p%m",
    "pen": "-('-$E-$=-!6CN;'6}'Q!=",
    "pin": "-&~~Yuatnrvq{[AZ{H]@_/c+!)r",
    "ha": "-&wvz",
    "yo": "-&`-%c-$B",
    "o": "-&X-$a-!H-!%",
    "n": "-&)-#a",
    "huan": "-%v-$Z-$Y~G}D{_zWw@w2r.q[pYp0okm8l!h]bVaH_I^iYpXQUnU1KyK2GBD%CPCB>1=c<~;c8V7D734/3>2I.[.;,3+R*})9(1'b$d$:",
    "ken": "-%V{qxjc*_CX~*I",
    "chuai": "-%=XIW}Ch",
    "pa": "-%/vLisihd.]oX|NC@r8608)P#!",
    "se": "-%,-$,yogK_<Z}VnUrLTGJC5C3>W<x;q7h7g6|6t60)p)&(0#r",
    "re": "-$fa[YU;y3g1X",
    "sun": "-$DqKq9]EYsW{WzW;H1Gv.',:",
    "hei": "-#h-!l7r",
    "dia": "-#^",
    "de": "-#5}0hBeQe5e1c)bFakR[JW<_##",
    "dei": "-#5eQ",
    "kuo": "-!`g`]W[:[/ZsUI8U6L",
    "ceng": "-!_ntnQk4OcObF*",
    "ca": "~s~B[UUWU:",
    "zeng": "~7y5y._}OcObF*1R(M'*",
    "nin": "~(c^bQ[*",
    "kun": "}q|Wzoz`x/x*t'l[lZbwZ0RHQMJv=B8C371U,e)_(g",
    "qun": "}jwxpRl~iPCT",
    "ri": "}iRjA=",
    "lve": "}Go^Y1&2&0",
    "zhui": "|[y0w#t]aaXIIt?s'<%|",
    "sao": "zus+`k_D]UYNXrWtK(AP:8$4",
    "en": "wBmBc5WF20",
    "zou": "w3s>Y%X`W~J/J.Hl",
    "nv": "vkc7OM@!",
    "nuan": "vcPo;`:m2X2W",
    "shuo": "v]a'WhT'S|OKGnCn>>470W+p",
    "niu": "v?q=dKd0]S]![DN?@8@!4u/e/d.W",
    "rao": "u2rA]PU?KkFJ",
    "niang": "t|r&qb",
    "shui": "t]iTZMYuA$A#@{=.=*",
    "nve": "t)%S$%",
    "nen": "sirarYc^",
    "niao": "s!r+qsnwFq9x",
    "kuan": "pBp#ooK)CoCfCd",
    "cuan": "jPV'U*T~TwDtD7BU@o6E5K1S0<",
    "te": "dsdr`R/F/9",
    "zen": "d5VU",
    "zei": "^H",
    "den": "][]C",
    "zhua": "],ZYV#ER0:09",
    "shuan": "[&L^GL<s",
    "zhuai": "Zz",
    "nou": "WoGpE0+^",
    "shai": "W<TsQWOt",
    "sen": "J8ISGI",
    "run": "FE<{8'",
    "ei": "Cl",
    "chua": "Ci" } };


var DB = {
  sToC: {},
  cToS: {} };

var sToC = DB.sToC,
cToS = DB.cToS,
ungroup = /-?.{2}/g,
rg = /^-/,
fromX = function fromX(str) {
  var result = 0,
  temp = 1;
  for (var idx = str.length; idx--;) {
    result += temp * chars.indexOf(str.charAt(idx));
    temp *= 91;
  }
  return result;
},
fn = function fn(a, f) {
  var p, gs, i, ch, num;
  for (p in a) {
    if (a.hasOwnProperty(p)) {
      gs = a[p].match(ungroup);
      for (i = 0; i < gs.length; i++) {
        ch = gs[i].replace(rg, '#');
        num = fromX(ch);
        ch = String.fromCharCode(base + middle + (f ? -num : num));
        if (sToC.hasOwnProperty(p)) {
          sToC[p] += ch;
        } else {
          sToC[p] = ch;
        }
        if (cToS.hasOwnProperty(ch)) {
          cToS[ch] += COMA + p;
        } else {
          cToS[ch] = p;
        }
      }
    }
  }
};
fn(SDB.m, 1);
fn(SDB.a);
SDB = null;var _default =
{
  getSpell: function getSpell(chars, polyphone, spliter) {
    var cToS = DB.cToS;
    var res = [],
    pp = typeof polyphone == 'function'; //判断polyphone是否是函数
    chars = String(chars).split(EMPTY);
    for (var i = 0, ch, ss; i < chars.length; i++) {
      ch = chars[i];
      if (cToS.hasOwnProperty(ch)) {
        ss = cToS[ch];
        if (~ss.indexOf(COMA)) {
          ss = ss.split(COMA);
          ss = pp ? polyphone(ch, ss) : '[' + ss + ']';
          res.push(ss);
        } else {
          res.push(ss);
        }
      } else {
        res.push(ch);
      }
    }
    return res.join(spliter || COMA);
  },
  getChars: function getChars(spell) {
    var sToC = DB.sToC;
    if (sToC.hasOwnProperty(spell)) {
      return sToC[spell].split(EMPTY);
    }
    return [];
  } };exports.default = _default;

/***/ }),

/***/ 102:
/*!*********************************************************************!*\
  !*** D:/workspace/物业服务前台V1.0.0/components/wyb-table/js/objEqual.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function isEqual(x, y) {
  if (x === y) {
    return true;
  }
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }
  if (x.constructor !== y.constructor) {
    return false;
  }
  for (var p in x) {
    if (x.hasOwnProperty(p)) {
      if (!y.hasOwnProperty(p)) {
        return false;
      }

      if (x[p] === y[p]) {
        continue;
      }

      if (typeof x[p] !== "object") {
        return false;
      }

      if (!Object.equals(x[p], y[p])) {
        return false;
      }
    }
  }
  for (p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  isEqual: isEqual };

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
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
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

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
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
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

if (true) {
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
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
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
      while (vm && vm.$options.name !== 'PageBody') {
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
        !vm.$options.isReserved && tree.push(vm);
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
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
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
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
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
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
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
      if (Dep.SharedObject.target) { // fixed by xxxxxx
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
      if ( true && customSetter) {
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
  if ( true &&
    (isUndef(target) || isPrimitive(target))
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
     true && warn(
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
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
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
if (true) {
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
       true && warn(
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
     true && assertObjectType(key, childVal, vm);
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
  if (true) {
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
  if (childVal && "development" !== 'production') {
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
      } else if (true) {
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
  } else if (true) {
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
  } else if (true) {
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
  if (true) {
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
  if ( true && warnMissing && !res) {
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
    true
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
  if ( true && isObject(def)) {
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
  if (true) {
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

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
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

var mark;
var measure;

if (true) {
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
       true && warn(
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

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
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
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
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
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
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
        } else if (true) {
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
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
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
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
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
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
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
       true && warn(
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
       true && warn(
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
    } else if ( true && key !== '' && key !== null) {
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
  if (true) {
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
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
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
    if (true) {
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
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

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
     true && warn(
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
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
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
      if ( true && isDef(data) && isDef(data.nativeOn)) {
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
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
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
      if ( true && vm.$options.renderError) {
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
      if ( true && Array.isArray(vnode)) {
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
       true && warn(
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
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
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
    if (true) {
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

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
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
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
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

  if (true) {
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
  if (true) {
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
    if ( true && has[id] != null) {
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

      if ( true && !config.async) {
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
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
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
    if (true) {
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
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
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
     true && warn(
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
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
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
    if ( true && getter == null) {
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
    } else if (true) {
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
  if ( true &&
      sharedPropertyDefinition.set === noop) {
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
      if (Dep.SharedObject.target) {// fixed by xxxxxx
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
    if (true) {
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
  if (true) {
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
    if ( true && config.performance && mark) {
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
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
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
  if ( true &&
    !(this instanceof Vue)
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
    if ( true && name) {
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
        if ( true && type === 'component') {
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
  if (true) {
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

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"物业服务","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"物业服务","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"物业服务","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"物业服务","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
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
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

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

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 36:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 4:
/*!********************************************!*\
  !*** D:/workspace/物业服务前台V1.0.0/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 61:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 62);

/***/ }),

/***/ 62:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 63);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 63:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 8:
/*!************************************************!*\
  !*** D:/workspace/物业服务前台V1.0.0/common/util.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.parGetData = parGetData;exports.parSetData = parSetData;exports.default = void 0; /* *
                                                                                                                                                                      * 通用公共js库，主要定义api接口，auth apikey 常量值和通用函数
                                                                                                                                                                      */

// api接口地址
var apiurl = 'http://www.wsh7799.top:8681/serve/';


// http校验值，需和服务器端一致，在请求时作为headers auth参数传入
var httpauth = 'asdgladsjgs3454adooewauatg454443452';

// 服务器端校验来源的参数值
var appkey = 'IQJ3VC4FIwpiBiAAMQUm';


// 设置标识 app wx 
var shebei = '';





shebei = 'wx';



// store 解析字符串或对象
function parGetData(v) {
  if (v.indexOf('obj-') === 0) {
    v = v.slice(4);
    return JSON.parse(v);
  } else {
    return v;
  }
}
// localstore 存储字符串或对象
function parSetData(v) {
  if (typeof v == 'object') {
    v = JSON.stringify(v);
    v = 'obj-' + v;
  }
  return v;
}

// 核对登录
function checklogin() {
  // 微信openid
  var openid = uni.getStorageSync('wxopenid');
  openid = openid ? parGetData(openid) : '';
  // 用户信息
  var userinfo = uni.getStorageSync('userinfo');
  userinfo = userinfo ? parGetData(userinfo) : '';
  // 登录后的token值，在请求api时传入
  var token = uni.getStorageSync('token');
  token = token ? parGetData(token) : '';

  var appusername = uni.getStorageSync('appusername');
  appusername = appusername ? parGetData(appusername) : '';

  return {
    openid: openid,
    userinfo: userinfo,
    token: token,
    appusername: appusername };

}

// 通用登录方法
function logincomm(info, self) {

















  /* 登录方法 */
  if (!info.detail || !info.detail.userInfo) {
    return false;
  }
  var userinfo = info.detail.userInfo;
  uni.showLoading({
    title: '登录中',
    icon: 'none' });

  if (typeof self.showlogin !== 'undefined') {
    self.showlogin = false;
  }
  uni.login({
    provider: 'weixin',
    success: function success(res) {
      // 根据code换取openid
      uni.request({
        url: apiurl + 'syj/index/getopenid',
        method: "POST",
        data: {
          code: res.code,
          nickname: userinfo.nickName,
          avatarurl: userinfo.avatarUrl,
          shebei: shebei },

        success: function success(ret) {
          if (ret.statusCode == 200 && ret.data.openid) {
            var openid = ret.data.openid;
            userinfo.openid = openid;
            userinfo.avatar = userinfo.avatarUrl;
            self.openid = openid;
            self.token = ret.data.token;
            self.userinfo = userinfo;
            // 存入缓存
            uni.setStorageSync(
            'wxopenid',
            parSetData(openid));

            // 存入用户信息
            uni.setStorageSync(
            'userinfo',
            parSetData(userinfo));

            // 存入token
            uni.setStorageSync(
            'token',
            parSetData(ret.data.token));

            if (ret.data.username) {
              // 已绑定app帐号
              // 存入appusername
              uni.setStorageSync(
              'appusername',
              parSetData(ret.data.username));

              if (typeof self.appusername !== 'undefined') {
                self.appusername = ret.data.username;
              }
            }
          }
        },
        complete: function complete() {
          uni.hideLoading();
        },
        header: {
          auth: httpauth } });


    } });


}


// 对某条笑话设置喜欢或不喜欢
function setlike(self, data, type, tid) {
  // self = vue object 
  // data = self.data self.list[index]
  // type = like or hate
  // tid = article id
  if (!self.token) {




    self.showlogin = true;
    return false;
  }
  if (data.type) {
    // 已表态 不变
    return false;
  } else {
    // 对应的表态数量+1
    if (type == 'like') {
      data.type = 'like';
      data.like += 1;
    } else {
      data.type = 'hate';
      data.hate += 1;
    }
  }
  // 服务器发起表态操作
  uni.request({
    url: apiurl + 'syj/index/setlike',
    method: "POST",
    dataType: "json",
    data: {
      type: type,
      id: tid,
      token: self.token,
      shebei: shebei },

    header: {
      auth: httpauth } });


}


// 将对象中项目存到数组arr中
function concat(arr, obj) {
  Object.keys(obj).forEach(function (key) {
    arr.push(obj[key]);
  });
  return arr;
}var _default =

{
  apiurl: apiurl,
  shebei: shebei,
  appkey: appkey,
  httpauth: httpauth,
  parSetData: parSetData,
  parGetData: parGetData,
  checklogin: checklogin,
  logincomm: logincomm,
  setlike: setlike,
  concat: concat };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map