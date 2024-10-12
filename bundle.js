/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 358:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) {
    obj[key] = desc.value;
  };
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    });
    return generator;
  }
  exports.wrap = wrap;

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
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  });
  defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  });
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };
  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }
        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }
    var previousPromise;
    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
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
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", {
      value: enqueue
    });
  }
  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
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
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
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
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next mehtod, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
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
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
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
    if (!info) {
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
  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
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
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }
  exports.keys = function (val) {
    var object = Object(val);
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
        var i = -1,
          next = function next() {
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
    return {
      next: doneResult
    };
  }
  exports.values = values;
  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }
  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
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
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
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
        return !!caught;
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
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
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
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }
      if (record.type === "break" || record.type === "continue") {
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
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
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
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
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

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;
}(
// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? 0 : _typeof(module)) === "object" ? module.exports : {});
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ 305:
/***/ (() => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var BackHeader = /*#__PURE__*/function (_HTMLElement) {
  function BackHeader() {
    _classCallCheck(this, BackHeader);
    return _callSuper(this, BackHeader, arguments);
  }
  _inherits(BackHeader, _HTMLElement);
  return _createClass(BackHeader, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "backHeaderTitle",
    set: function set(title) {
      this.title = title;
    }
  }, {
    key: "render",
    value: function render() {
      var pageTitle = this.title || 'Detail';
      this.innerHTML = "\n            <header>\n                <div class=\"back max-content\">\n                    <a href=\"javascript: history.go(-1)\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                            <path fill-rule=\"evenodd\" d=\"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1\n                                1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1\n                                1 0 010 1.414z\" clip-rule=\"evenodd\">\n                            </path>\n                        </svg>\n                    </a>\n                    <p>".concat(pageTitle, "</p>\n                </div>\n            </header>\n        ");
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('back-header', BackHeader);

/***/ }),

/***/ 152:
/***/ (() => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var PortfolioCard = /*#__PURE__*/function (_HTMLElement) {
  function PortfolioCard() {
    _classCallCheck(this, PortfolioCard);
    return _callSuper(this, PortfolioCard, arguments);
  }
  _inherits(PortfolioCard, _HTMLElement);
  return _createClass(PortfolioCard, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "portfolioData",
    set: function set(data) {
      this.image = data.image;
      this.projectTitle = data.title;
      this.description = data.description;
      this.hastag = data.hastag;
      this.demoLink = data.demoLink;
      this.detailLink = data.detailLink;
      this.disableDemo = data.demoLink ? '' : 'disabled';
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div class=\"card-logo\">\n                <img src=\"".concat(this.image, "\" alt=\"").concat(this.projectTitle, "\" height=\"64\" width=\"64\">\n            </div>\n            <div class=\"card-title\">").concat(this.projectTitle, "</div>\n            <div class=\"card-content\">\n                <p>").concat(this.description, "</p>\n            </div>\n            <div class=\"card-hashtag\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                    <path fill-rule=\"evenodd\" d=\"M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1\n                        1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1\n                        1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0\n                        110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1\n                        4h2.938l1-4H9.031z\" clip-rule=\"evenodd\" />\n                </svg>\n                <p>").concat(this.hastag, "</p>\n            </div>\n            <div class=\"card-footer\">\n                <a href=\"").concat(this.demoLink, "\" target=\"_blank\" rel=\"noopener\" class=\"demo-link ").concat(this.disableDemo, "\">Demo</a>\n                <a href=\"").concat(this.detailLink, "\" class=\"detail-link\">Detail</a>\n            </div>\n        ");
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('portfolio-card', PortfolioCard);

/***/ }),

/***/ 372:
/***/ (() => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var FooterSection = /*#__PURE__*/function (_HTMLElement) {
  function FooterSection() {
    _classCallCheck(this, FooterSection);
    return _callSuper(this, FooterSection, arguments);
  }
  _inherits(FooterSection, _HTMLElement);
  return _createClass(FooterSection, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "isNavMenu",
    set: function set(data) {
      this.navMenu = data;
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.navMenu ? 'footer-app' : 'footer-no-nav';
      var assetSource = this.navMenu ? '<a href="#/assets-source" class="link">Assets source</a>' : '';
      var year = new Date().getFullYear();
      this.innerHTML = "\n            <footer>\n                <div class=\"max-content\">\n                    <div class=\"".concat(className, "\">\n                        ").concat(assetSource, "\n                        <p>\n                            Copyright &copy; 2021-").concat(year, " by\n                            <a href=\"https://github.com/ar-rohman\" class=\"link\" target=\"_blank\" rel=\"noopener\">Rohman</a>\n                        </p>\n                    </div>\n                </div>\n            </footer>\n        ");
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('footer-section', FooterSection);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(358);
;// ./src/scripts/router/url-parser.js
var UrlParser = {
  parseUrl: function parseUrl() {
    var url = window.location.hash.slice(1).toLowerCase();
    var urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null
    };
  },
  parseUrlWithCombiner: function parseUrlWithCombiner() {
    var splitedUrl = this.parseUrl();
    return this.urlCombiner(splitedUrl);
  },
  urlCombiner: function urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? "/".concat(splitedUrl.resource) : '/') + (splitedUrl.id ? '/:id' : '') + (splitedUrl.verb ? "/".concat(splitedUrl.verb) : '');
  }
};
/* harmony default export */ const url_parser = (UrlParser);
;// ./src/assets/portfolio/glow-maskable.png
const glow_maskable_namespaceObject = __webpack_require__.p + "assets/images/b305a3a405a115762a93.png";
;// ./src/scripts/data/modules/glow.js

var projectTitle = 'Glow';
var projectSlug = projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const glow = ({
  title: projectTitle,
  slug: projectSlug,
  description: 'Glow (Global Weather) is an application that provides weather data for any location on Earth.',
  image: glow_maskable_namespaceObject,
  features: ['Current weather forecast', 'Hourly weather forecast', 'Daily weather forecast', 'Search weather forecast by city', 'Set default city &amp; temperature', 'Support dark mode', 'Bilingual'],
  technologies: ['Vue', 'Tailwind', 'Progressive Web App (PWA)', 'Indexed DB', 'Local Storage'],
  hastag: 'Vue',
  demoLink: 'https://glow-forecast.web.app',
  detailLink: "#/portfolio/".concat(projectSlug),
  repoLink: ''
});
;// ./src/assets/portfolio/code-sport.png
const code_sport_namespaceObject = __webpack_require__.p + "assets/images/50942c31ff14d2dd6ace.png";
;// ./src/scripts/data/modules/code-sport.js

var code_sport_projectTitle = 'Code Sport';
var code_sport_projectSlug = code_sport_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const code_sport = ({
  title: code_sport_projectTitle,
  slug: code_sport_projectSlug,
  description: 'Provides information about Champions League.',
  image: code_sport_namespaceObject,
  features: ['Matches', 'Standings', 'Teams', 'Scorers'],
  technologies: ['Vue', 'Tailwind', 'Progressive Web Application (PWA)', 'SPA (Single Page Application)'],
  hastag: 'Vue',
  demoLink: 'https://code-sport.web.app',
  detailLink: "#/portfolio/".concat(code_sport_projectSlug),
  repoLink: 'https://github.com/ar-rohman/code-sport'
});
;// ./src/assets/portfolio/mydo.png
const mydo_namespaceObject = __webpack_require__.p + "assets/images/866ce345281c92d1a286.png";
;// ./src/scripts/data/modules/mydo.js

var mydo_projectTitle = 'MyDo';
var mydo_projectSlug = mydo_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const mydo = ({
  title: mydo_projectTitle,
  slug: mydo_projectSlug,
  description: 'MyDo is an application that provides domain and email information.',
  image: mydo_namespaceObject,
  features: ['Whois Lookup', 'Domain Availability Check', 'IP Geolocation Lookup', 'Email Verification Check'],
  technologies: ['Javascript', 'Webpack', 'SPA (Single Page Application)'],
  hastag: 'Javascript',
  demoLink: 'https://ar-rohman.github.io/mydo',
  detailLink: "#/portfolio/".concat(mydo_projectSlug),
  repoLink: 'https://github.com/ar-rohman/mydo'
});
;// ./src/assets/portfolio/dishmenu.png
const dishmenu_namespaceObject = __webpack_require__.p + "assets/images/463c0edd649c91443d56.png";
;// ./src/scripts/data/modules/dishmenu.js

var dishmenu_projectTitle = 'dishmenu';
var dishmenu_projectSlug = dishmenu_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const dishmenu = ({
  title: dishmenu_projectTitle,
  slug: dishmenu_projectSlug,
  description: 'Dish information and review (dummy).',
  image: dishmenu_namespaceObject,
  features: ['Dish list', 'Dish Review'],
  technologies: ['Javascript', 'Webpack', 'Progressive Web Application (PWA)', 'SPA (Single Page Application)', 'Indexed DB'],
  hastag: 'Javascript',
  demoLink: '',
  detailLink: "#/portfolio/".concat(dishmenu_projectSlug),
  repoLink: 'https://github.com/ar-rohman/dishmenu'
});
;// ./src/assets/portfolio/moview.png
const moview_namespaceObject = __webpack_require__.p + "assets/images/b6d2e67edf38e9af83c8.png";
;// ./src/scripts/data/modules/moview.js

var moview_projectTitle = 'MOVIEW';
var moview_projectSlug = moview_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const moview = ({
  title: moview_projectTitle,
  slug: moview_projectSlug,
  description: 'Moview is where people find their favorite movies and discover movies around the world.',
  image: moview_namespaceObject,
  features: ['Discover movies', 'Play trailers', 'Share movies', 'Add / remove favorite movies', 'Dark mode'],
  technologies: ['Vue 3', 'Tailwindcss', 'Pinia', 'Indexed DB', 'Local Storage'],
  hastag: 'Vue',
  demoLink: 'https://moview-app.vercel.app',
  detailLink: "#/portfolio/".concat(moview_projectSlug),
  repoLink: ''
});
;// ./src/scripts/data/index.js





/* harmony default export */ const data = ([moview, glow, code_sport, mydo, dishmenu]);
;// ./src/scripts/utils/active-nav.js
var ActiveNav = {
  /**
   * Add active class when nav menu clicked
   * @param {HTMLElement} navMenu - A HTMLElement of navigation
   */
  click: function click(navMenu) {
    var _this = this;
    navMenu.forEach(function (link) {
      link.addEventListener('click', function () {
        var section = link.id.split('-')[0];
        var sectionId = document.getElementById(section);
        sectionId.scrollIntoView();
        if (navMenu.length > 1) {
          _this.removeActiveState(navMenu);
          _this.addActiveState(link);
        }
        var capitalized = _this.pascalCase(section);
        document.title = "".concat(capitalized, " - ArRohman");
      });
    });
  },
  /**
   * Add active class when scrolled
   * @param {HTMLElement} sections - A HTMLElement of section
   * @param {HTMLElement} navigation - A HTMLElement of navigation
   */
  scroll: function scroll(sections, navigation) {
    var _this2 = this;
    window.addEventListener('scroll', function () {
      var index = sections.length;

      // Decrements the index value each iteration.
      // see https://stackoverflow.com/a/55749862
      while (--index >= 0 && window.scrollY + 50 < sections[index].offsetTop) {
        // do nothing
        // just to decrement index value
      }
      _this2.removeActiveState(navigation);

      // add active class if within visible height of the element
      if (window.scrollY - sections[index].offsetHeight < sections[index].offsetTop) {
        _this2.addActiveState(navigation[index]);
      }
    });
  },
  /**
   * Remove other active state if navigation link clicked
   * This is private method
   * @param {HTMLElement} navMenu - An array of navigation menu
   */
  removeActiveState: function removeActiveState(navMenu) {
    navMenu.forEach(function (element) {
      element.classList.remove('active');
      element.querySelector('.outline').classList.remove('hide');
      element.querySelector('.solid').classList.add('hide');
    });
  },
  /**
   * Add active state if navigation link clicked
   * This is private method
   * @param {HTMLElement} link - A HTMLElement of link
   */
  addActiveState: function addActiveState(link) {
    link.classList.add('active');
    link.querySelector('.solid').classList.remove('hide');
    link.querySelector('.outline').classList.add('hide');
  },
  /**
   * Capitalize each first word of string
   * This is private method
   * @param {String} string - A string param
   * @return {String} A pascal case string
   */
  pascalCase: function pascalCase(string) {
    return string.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }
};
/* harmony default export */ const active_nav = (ActiveNav);
;// ./src/scripts/views/components/section/header-section.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }

var HeaderSection = /*#__PURE__*/function (_HTMLElement) {
  function HeaderSection() {
    _classCallCheck(this, HeaderSection);
    return _callSuper(this, HeaderSection, arguments);
  }
  _inherits(HeaderSection, _HTMLElement);
  return _createClass(HeaderSection, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
      this.navActiveState();
    }
  }, {
    key: "navActiveState",
    value: function navActiveState() {
      this.navigation = document.querySelectorAll('.menu-nav');
      active_nav.click(this.navigation);
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <header>\n                <div class=\"max-content header-content\">\n                    <div class=\"brand\">ArRohman</div>\n                    <nav class=\"menu\">\n                        <div id=\"hello-nav\" class=\"menu-nav active\" tabindex=\"0\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"hide outline\" fill=\"none\" viewBox=\"0 0 24 24\"\n                                stroke=\"currentColor\">\n                                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                                    d=\"M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5\n                                    0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0\n                                    0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11\" />\n                            </svg>\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"solid\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                                <path fill-rule=\"evenodd\" d=\"M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1\n                                    1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z\"\n                                    clip-rule=\"evenodd\" />\n                            </svg>\n                            Hello!\n                        </div>\n                        <div id=\"portfolio-nav\" class=\"menu-nav\" tabindex=\"0\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"outline\" fill=\"none\" viewBox=\"0 0 24 24\"\n                                stroke=\"currentColor\">\n                                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                                    d=\"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0\n                                    012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10\" />\n                            </svg>\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"hide solid\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                                <path d=\"M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2\n                                    11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z\" />\n                            </svg>\n                            Portfolio\n                        </div>\n                        <div id=\"about-nav\" class=\"menu-nav\" tabindex=\"0\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"outline\" fill=\"none\" viewBox=\"0 0 24 24\"\n                                stroke=\"currentColor\">\n                                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                                    d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n                            </svg>\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"hide solid\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                                <path fill-rule=\"evenodd\" d=\"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1\n                                    0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z\" clip-rule=\"evenodd\" />\n                            </svg>\n                            About\n                        </div>\n                        <div id=\"contact-nav\" class=\"menu-nav\" tabindex=\"0\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"outline\" fill=\"none\" viewBox=\"0 0 24 24\"\n                                stroke=\"currentColor\">\n                                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" \n                                    d=\"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257\n                                    1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0\n                                    01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z\" />\n                            </svg>\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"hide solid\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                                <path d=\"M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037\n                                    11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1\n                                    1h-2C7.82 18 2 12.18 2 5V3z\" />\n                            </svg>\n                            Contact\n                        </div>\n                    </nav>\n                </div>\n            </header>\n        ";
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('header-section', HeaderSection);
;// ./src/assets/illustrations/hello.svg
const hello_namespaceObject = __webpack_require__.p + "assets/images/ef6d71edc096239b9618.svg";
;// ./src/scripts/views/components/section/hello-section.js
function hello_section_typeof(o) { "@babel/helpers - typeof"; return hello_section_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, hello_section_typeof(o); }
function hello_section_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function hello_section_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, hello_section_toPropertyKey(o.key), o); } }
function hello_section_createClass(e, r, t) { return r && hello_section_defineProperties(e.prototype, r), t && hello_section_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function hello_section_toPropertyKey(t) { var i = hello_section_toPrimitive(t, "string"); return "symbol" == hello_section_typeof(i) ? i : i + ""; }
function hello_section_toPrimitive(t, r) { if ("object" != hello_section_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != hello_section_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function hello_section_callSuper(t, o, e) { return o = hello_section_getPrototypeOf(o), hello_section_possibleConstructorReturn(t, hello_section_isNativeReflectConstruct() ? Reflect.construct(o, e || [], hello_section_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function hello_section_possibleConstructorReturn(t, e) { if (e && ("object" == hello_section_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return hello_section_assertThisInitialized(t); }
function hello_section_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function hello_section_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && hello_section_setPrototypeOf(t, e); }
function hello_section_wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return hello_section_wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !hello_section_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return hello_section_construct(t, arguments, hello_section_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), hello_section_setPrototypeOf(Wrapper, t); }, hello_section_wrapNativeSuper(t); }
function hello_section_construct(t, e, r) { if (hello_section_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && hello_section_setPrototypeOf(p, r.prototype), p; }
function hello_section_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (hello_section_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function hello_section_isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function hello_section_setPrototypeOf(t, e) { return hello_section_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, hello_section_setPrototypeOf(t, e); }
function hello_section_getPrototypeOf(t) { return hello_section_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, hello_section_getPrototypeOf(t); }


var HelloSection = /*#__PURE__*/function (_HTMLElement) {
  function HelloSection() {
    hello_section_classCallCheck(this, HelloSection);
    return hello_section_callSuper(this, HelloSection, arguments);
  }
  hello_section_inherits(HelloSection, _HTMLElement);
  return hello_section_createClass(HelloSection, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
      this.navActiveState();
    }
  }, {
    key: "navActiveState",
    value: function navActiveState() {
      this.goToPortfolio = document.getElementById('portfolio-go-to');
      active_nav.click([this.goToPortfolio]);
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div id=\"hello\" class=\"hello\">\n                <div class=\"max-content\">\n                    <div class=\"hello-section\">\n                        <div class=\"hello-content\">\n                            <div>\n                                <p>Hi,</p>\n                                <p>Rohman is here.</p>\n                                <p>This is my portfolio page.</p>\n                                <p>Let's explore them.</p>\n                            </div>\n                            <img src=\"".concat(hello_namespaceObject, "\" alt=\"Hello\" class=\"hello-illustration\">\n                        </div>\n                        <div class=\"chevron-down\">\n                            <div class=\"chevron-down-content\">\n                                <div id=\"portfolio-go-to\" class=\"chevron-down-rounded\" tabindex=\"0\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"\n                                        stroke=\"currentColor\">\n                                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                                            d=\"M19 13l-7 7-7-7m14-8l-7 7-7-7\" />\n                                    </svg>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
    }
  }]);
}(/*#__PURE__*/hello_section_wrapNativeSuper(HTMLElement));
customElements.define('hello-section', HelloSection);
;// ./src/assets/illustrations/about.svg
const about_namespaceObject = __webpack_require__.p + "assets/images/8ec75bd0699fb1b5cc9b.svg";
;// ./src/scripts/views/components/section/about-section.js
function about_section_typeof(o) { "@babel/helpers - typeof"; return about_section_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, about_section_typeof(o); }
function about_section_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function about_section_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, about_section_toPropertyKey(o.key), o); } }
function about_section_createClass(e, r, t) { return r && about_section_defineProperties(e.prototype, r), t && about_section_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function about_section_toPropertyKey(t) { var i = about_section_toPrimitive(t, "string"); return "symbol" == about_section_typeof(i) ? i : i + ""; }
function about_section_toPrimitive(t, r) { if ("object" != about_section_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != about_section_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function about_section_callSuper(t, o, e) { return o = about_section_getPrototypeOf(o), about_section_possibleConstructorReturn(t, about_section_isNativeReflectConstruct() ? Reflect.construct(o, e || [], about_section_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function about_section_possibleConstructorReturn(t, e) { if (e && ("object" == about_section_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return about_section_assertThisInitialized(t); }
function about_section_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function about_section_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && about_section_setPrototypeOf(t, e); }
function about_section_wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return about_section_wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !about_section_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return about_section_construct(t, arguments, about_section_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), about_section_setPrototypeOf(Wrapper, t); }, about_section_wrapNativeSuper(t); }
function about_section_construct(t, e, r) { if (about_section_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && about_section_setPrototypeOf(p, r.prototype), p; }
function about_section_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (about_section_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function about_section_isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function about_section_setPrototypeOf(t, e) { return about_section_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, about_section_setPrototypeOf(t, e); }
function about_section_getPrototypeOf(t) { return about_section_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, about_section_getPrototypeOf(t); }

var AboutSection = /*#__PURE__*/function (_HTMLElement) {
  function AboutSection() {
    about_section_classCallCheck(this, AboutSection);
    return about_section_callSuper(this, AboutSection, arguments);
  }
  about_section_inherits(AboutSection, _HTMLElement);
  return about_section_createClass(AboutSection, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div id=\"about\" class=\"about\">\n                <div class=\"max-content\">\n                    <div class=\"about-section\">About</div>\n                    <div class=\"about-content\">\n                        <img src=\"".concat(about_namespaceObject, "\" alt=\"About\" class=\"about-illustration\">\n                        <div class=\"about-text\">\n                            <p>\n                                I am web developer based in Jakarta, ID\n                                who passionate about building excellent software\n                                that improves the lives of those around me.\n                            </p>\n                            <p>\n                                In my spare time I like to tinker on side projects for clients\n                                ranging from individuals and small businesses\n                                the way to large enterprise corporations.\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
    }
  }]);
}(/*#__PURE__*/about_section_wrapNativeSuper(HTMLElement));
customElements.define('about-section', AboutSection);
;// ./src/assets/illustrations/contact.svg
const contact_namespaceObject = __webpack_require__.p + "assets/images/aefcfdbac49aa586e7ea.svg";
;// ./src/scripts/views/components/section/contact-section.js
function contact_section_typeof(o) { "@babel/helpers - typeof"; return contact_section_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, contact_section_typeof(o); }
function contact_section_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function contact_section_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, contact_section_toPropertyKey(o.key), o); } }
function contact_section_createClass(e, r, t) { return r && contact_section_defineProperties(e.prototype, r), t && contact_section_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function contact_section_toPropertyKey(t) { var i = contact_section_toPrimitive(t, "string"); return "symbol" == contact_section_typeof(i) ? i : i + ""; }
function contact_section_toPrimitive(t, r) { if ("object" != contact_section_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != contact_section_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function contact_section_callSuper(t, o, e) { return o = contact_section_getPrototypeOf(o), contact_section_possibleConstructorReturn(t, contact_section_isNativeReflectConstruct() ? Reflect.construct(o, e || [], contact_section_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function contact_section_possibleConstructorReturn(t, e) { if (e && ("object" == contact_section_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return contact_section_assertThisInitialized(t); }
function contact_section_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function contact_section_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && contact_section_setPrototypeOf(t, e); }
function contact_section_wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return contact_section_wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !contact_section_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return contact_section_construct(t, arguments, contact_section_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), contact_section_setPrototypeOf(Wrapper, t); }, contact_section_wrapNativeSuper(t); }
function contact_section_construct(t, e, r) { if (contact_section_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && contact_section_setPrototypeOf(p, r.prototype), p; }
function contact_section_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (contact_section_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function contact_section_isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function contact_section_setPrototypeOf(t, e) { return contact_section_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, contact_section_setPrototypeOf(t, e); }
function contact_section_getPrototypeOf(t) { return contact_section_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, contact_section_getPrototypeOf(t); }

var ContactSection = /*#__PURE__*/function (_HTMLElement) {
  function ContactSection() {
    contact_section_classCallCheck(this, ContactSection);
    return contact_section_callSuper(this, ContactSection, arguments);
  }
  contact_section_inherits(ContactSection, _HTMLElement);
  return contact_section_createClass(ContactSection, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div id=\"contact\" class=\"contact\">\n                <div class=\"max-content\">\n                    <div class=\"contact-section\">Contact</div>\n                    <div class=\"contact-content\">\n                        <div>\n                            <p>If you wanna get in touch,</p> <p>talk to me about a project or just say hi,</p>\n                            <p>feel free to contact me via email at</p>\n                            <a href=\"mailto:kontak.rohman@gmail.com\" class=\"link\">kontak.rohman@gmail.com</a>\n                        </div>\n                        <img src=\"".concat(contact_namespaceObject, "\" alt=\"Contact\" class=\"contact-illustration\">\n                    </div>\n                </div>\n            </div>\n        ");
    }
  }]);
}(/*#__PURE__*/contact_section_wrapNativeSuper(HTMLElement));
customElements.define('contact-section', ContactSection);
// EXTERNAL MODULE: ./src/scripts/views/components/section/footer-section.js
var footer_section = __webpack_require__(372);
// EXTERNAL MODULE: ./src/scripts/views/components/portfolio-card.js
var portfolio_card = __webpack_require__(152);
;// ./src/scripts/views/pages/main.js
function main_typeof(o) { "@babel/helpers - typeof"; return main_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, main_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == main_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(main_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }








var Main = {
  render: function render() {
    return "\n            <header-section></header-section>\n            <main>\n                <hello-section></hello-section>\n                <div id=\"portfolio\" class=\"portfolio\">\n                    <div class=\"max-content\">\n                        <div class=\"portfolio-section\">Portfolio</div>\n                        <div class=\"portfolio-content\" id=\"js-portfolio-content\"></div>\n                    </div>\n                </div>\n                <about-section></about-section>\n                <contact-section></contact-section>\n            </main>\n            <div id=\"footer-section\"></div>\n        ";
  },
  afterRender: function afterRender() {
    var portfolioContent = document.getElementById('js-portfolio-content');
    var footerId = document.getElementById('footer-section');
    var footerSection = document.createElement('footer-section');
    footerSection.isNavMenu = true;
    footerId.appendChild(footerSection);
    data.forEach(function (element) {
      var card = document.createElement('portfolio-card');
      card.setAttribute('class', 'card');
      card.portfolioData = element;
      portfolioContent.appendChild(card);
    });
    var hello = document.querySelector('#hello');
    var portfolio = document.querySelector('#portfolio');
    var about = document.querySelector('#about');
    var contact = document.querySelector('#contact');
    var pageSections = [hello, portfolio, about, contact];
    var navigation = document.querySelectorAll('.menu-nav');
    active_nav.scroll(pageSections, navigation);
  },
  removeActiveState: function removeActiveState(links) {
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return links.forEach(function (active) {
              active.classList.remove('active');
              active.querySelector('.outline').classList.remove('hide');
              active.querySelector('.solid').classList.add('hide');
            });
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  addActiveState: function addActiveState(link) {
    link.classList.add('active');
    link.querySelector('.solid').classList.remove('hide');
    link.querySelector('.outline').classList.add('hide');
  }
};
/* harmony default export */ const main = (Main);
// EXTERNAL MODULE: ./src/scripts/views/components/back-header.js
var back_header = __webpack_require__(305);
;// ./src/assets/illustrations/asset-source.svg
const asset_source_namespaceObject = __webpack_require__.p + "assets/images/c55c86ae569236dfd2bf.svg";
;// ./src/scripts/views/pages/assets-source.js



var Page = {
  render: function render() {
    return "\n           <div id=\"js-asset-source-header\"></div>\n            <main>\n                <div class=\"asset-source\">\n                    <div class=\"max-content\">\n                        <div class=\"asset-source-content\">\n                            <div>\n                                <div class=\"detail-summary\">Assets used in this website</div>\n                                <div class=\"detail-list-header\">Icon</div>\n                                <div class=\"detail-list\">\n                                    <ul>\n                                        <li>\n                                            <a href=\"https://heroicons.com/\" target=\"_blank\" rel=\"noopener\" class=\"link\">heroicons</a>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"detail-list-header\">Illustrations</div>\n                                <div class=\"detail-list\">\n                                    <ul>\n                                        <li>\n                                            <a href=\"https://drawkit.com/product/grape-illustration-pack\" target=\"_blank\" rel=\"noopener\" class=\"link\">\n                                                DrawKit\n                                            </a>\n                                            (with some changes)\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                            <img src=\"".concat(asset_source_namespaceObject, "\" alt=\"Asset Source\" class=\"asset-source-illustration\">\n                        </div>\n                    </div>\n                </div>\n            </main>\n            <footer-section></footer-section>\n        ");
  },
  afterRender: function afterRender() {
    document.title = 'Asset Source - ArRohman';
    var assetSource = document.getElementById('js-asset-source-header');
    var backHeader = document.createElement('back-header');
    backHeader.backHeaderTitle = 'Asset Source';
    assetSource.appendChild(backHeader);
  }
};
/* harmony default export */ const assets_source = (Page);
;// ./src/assets/illustrations/detail.svg
const detail_namespaceObject = __webpack_require__.p + "assets/images/976ec549a6180a1290d4.svg";
;// ./src/scripts/views/components/detail-page.js
function detail_page_typeof(o) { "@babel/helpers - typeof"; return detail_page_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, detail_page_typeof(o); }
function detail_page_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function detail_page_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, detail_page_toPropertyKey(o.key), o); } }
function detail_page_createClass(e, r, t) { return r && detail_page_defineProperties(e.prototype, r), t && detail_page_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function detail_page_toPropertyKey(t) { var i = detail_page_toPrimitive(t, "string"); return "symbol" == detail_page_typeof(i) ? i : i + ""; }
function detail_page_toPrimitive(t, r) { if ("object" != detail_page_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != detail_page_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function detail_page_callSuper(t, o, e) { return o = detail_page_getPrototypeOf(o), detail_page_possibleConstructorReturn(t, detail_page_isNativeReflectConstruct() ? Reflect.construct(o, e || [], detail_page_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function detail_page_possibleConstructorReturn(t, e) { if (e && ("object" == detail_page_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return detail_page_assertThisInitialized(t); }
function detail_page_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function detail_page_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && detail_page_setPrototypeOf(t, e); }
function detail_page_wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return detail_page_wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !detail_page_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return detail_page_construct(t, arguments, detail_page_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), detail_page_setPrototypeOf(Wrapper, t); }, detail_page_wrapNativeSuper(t); }
function detail_page_construct(t, e, r) { if (detail_page_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && detail_page_setPrototypeOf(p, r.prototype), p; }
function detail_page_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (detail_page_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function detail_page_isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function detail_page_setPrototypeOf(t, e) { return detail_page_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, detail_page_setPrototypeOf(t, e); }
function detail_page_getPrototypeOf(t) { return detail_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, detail_page_getPrototypeOf(t); }

var DetailPage = /*#__PURE__*/function (_HTMLElement) {
  function DetailPage() {
    detail_page_classCallCheck(this, DetailPage);
    return detail_page_callSuper(this, DetailPage, arguments);
  }
  detail_page_inherits(DetailPage, _HTMLElement);
  return detail_page_createClass(DetailPage, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "data",
    set: function set(data) {
      this.projectTitle = data.title;
      this.description = data.description;
      this.features = data.features.map(function (item) {
        return "<li>".concat(item, "</li>");
      });
      this.technologies = data.technologies.map(function (item) {
        return "<li>".concat(item, "</li>");
      });
      this.repoLink = data.repoLink;
      this.demoLink = data.demoLink;
      this.disableRepo = data.repoLink ? '' : 'disabled';
      this.disableDemo = data.demoLink ? '' : 'disabled';
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <main>\n                <div class=\"detail\">\n                    <div class=\"max-content\">\n                        <div class=\"detail-content\">\n                            <div>\n                                <div class=\"detail-title\">".concat(this.projectTitle, "</div>\n                                <p class=\"detail-summary\">").concat(this.description, "</p>\n                                <div class=\"detail-list-header\">Features</div>\n                                <div class=\"detail-list\">\n                                    <ul>").concat(this.features.join(''), "</ul>\n                                </div>\n                                <div class=\"detail-list-header\">Technology used</div>\n                                <div class=\"detail-list\">\n                                    <ul>").concat(this.technologies.join(''), "</ul>\n                                </div>\n                                <div class=\"detail-button\">\n                                    <a href=\"").concat(this.repoLink, "\" target=\"_blank\" rel=\"noopener\" class=\"detail-button-repo ").concat(this.disableRepo, "\">\n                                        Repository\n                                    </a>\n                                    <a href=\"").concat(this.demoLink, "\" target=\"_blank\" rel=\"noopener\" class=\"detail-button-demo ").concat(this.disableDemo, "\">Demo</a>\n                                </div>\n                            </div>\n                            <img src=\"").concat(detail_namespaceObject, "\" alt=\"Detail\" class=\"detail-illustration\">\n                        </div>\n                    </div>\n                </div>\n            </main>\n        ");
    }
  }]);
}(/*#__PURE__*/detail_page_wrapNativeSuper(HTMLElement));
customElements.define('detail-page', DetailPage);
;// ./src/scripts/views/pages/portfolio-detail.js





/* harmony default export */ const portfolio_detail = ({
  render: function render() {
    return "\n            <back-header></back-header>\n            <div id=\"js-detail-page\"></div>\n            <footer-section></footer-section>\n        ";
  },
  afterRender: function afterRender() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    var slug = url_parser.parseUrl();
    var detailData = data.filter(function (item) {
      return item.slug === slug.id;
    })[0];
    document.title = "".concat(detailData.title, " Detail - ArRohman");
    var detailPage = document.getElementById('js-detail-page');
    var element = document.createElement('detail-page');
    element.data = detailData;
    detailPage.appendChild(element);
  }
});
;// ./src/scripts/router/routes.js



var routes = {
  '/': main,
  '/portfolio/:id': portfolio_detail,
  '/assets-source': assets_source
};
/* harmony default export */ const router_routes = (routes);
;// ./src/scripts/app.js
function app_typeof(o) { "@babel/helpers - typeof"; return app_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, app_typeof(o); }
function app_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ app_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == app_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(app_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function app_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function app_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { app_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { app_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function app_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function app_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, app_toPropertyKey(o.key), o); } }
function app_createClass(e, r, t) { return r && app_defineProperties(e.prototype, r), t && app_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function app_toPropertyKey(t) { var i = app_toPrimitive(t, "string"); return "symbol" == app_typeof(i) ? i : i + ""; }
function app_toPrimitive(t, r) { if ("object" != app_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != app_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var App = /*#__PURE__*/function () {
  function App(content, navLink) {
    app_classCallCheck(this, App);
    this.content = content;
    this.navLink = navLink;
  }
  return app_createClass(App, [{
    key: "renderPage",
    value: function () {
      var _renderPage = app_asyncToGenerator(/*#__PURE__*/app_regeneratorRuntime().mark(function _callee() {
        var url, page;
        return app_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              url = url_parser.parseUrlWithCombiner();
              page = router_routes[url];
              _context.next = 4;
              return page.render();
            case 4:
              this.content.innerHTML = _context.sent;
              _context.next = 7;
              return page.afterRender();
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function renderPage() {
        return _renderPage.apply(this, arguments);
      }
      return renderPage;
    }()
  }]);
}();
/* harmony default export */ const app = (App);
;// ./src/index.js



var content = document.getElementById('app');
var src_app = new app(content);
window.addEventListener('hashchange', function () {
  src_app.renderPage();
});
window.addEventListener('load', function () {
  src_app.renderPage();
});
})();

/******/ })()
;