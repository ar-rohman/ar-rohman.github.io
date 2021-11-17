/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 86:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
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
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
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
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
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
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
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
  }; // Within the body of any async function, `await x` is transformed to
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

      return previousPromise = // If enqueue has been called before, then we want to wait until
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
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
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
        } // Be forgiving, per 25.3.3.3.3 of the spec:
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
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
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
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
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
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
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
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
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
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
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

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
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
    } // Return an iterator with no values.


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
      this.next = 0; // Resetting context._sent for legacy support of Babel's
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
      } // The context.catch method must only be called with a location
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
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
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

/***/ 61:
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DomainCheck = /*#__PURE__*/function (_HTMLElement) {
  _inherits(DomainCheck, _HTMLElement);

  var _super = _createSuper(DomainCheck);

  function DomainCheck() {
    _classCallCheck(this, DomainCheck);

    return _super.apply(this, arguments);
  }

  _createClass(DomainCheck, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "domainRecordData",
    set: function set(data) {
      this.domainAvailability = data.domainAvailability;
      this.domainName = data.domainName;

      if (this.domainAvailability.toLowerCase() === 'available') {
        this.result = "Yey! ".concat(this.domainName, " is available.");
        this.illustraion = '<img src="assets/illustration/check.svg" alt="Domain availability" class="illustration">';
      } else {
        this.result = "Sorry, ".concat(this.domainName, " is unavailable.");
        this.illustraion = '<img src="assets/illustration/cross.svg" alt="Domain unavailability" class="illustration">';
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div class=\"content\">\n                ".concat(this.illustraion, "\n                <p>").concat(this.result, "</p>\n            </div>\n        ");
    }
  }]);

  return DomainCheck;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('domain-check', DomainCheck);

/***/ }),

/***/ 107:
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ErrorPage = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ErrorPage, _HTMLElement);

  var _super = _createSuper(ErrorPage);

  function ErrorPage() {
    _classCallCheck(this, ErrorPage);

    return _super.apply(this, arguments);
  }

  _createClass(ErrorPage, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "message",
    set: function set(message) {
      this.errorMessage = message;
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div class=\"error-page\">\n                <img src=\"assets/illustration/error-page.svg\" alt=\"Error\" class=\"illustration\">\n                <p>".concat(this.errorMessage, "</p>\n            </div>\n        ");
    }
  }]);

  return ErrorPage;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('error-page', ErrorPage);

/***/ }),

/***/ 390:
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GeolocationLookup = /*#__PURE__*/function (_HTMLElement) {
  _inherits(GeolocationLookup, _HTMLElement);

  var _super = _createSuper(GeolocationLookup);

  function GeolocationLookup() {
    _classCallCheck(this, GeolocationLookup);

    return _super.apply(this, arguments);
  }

  _createClass(GeolocationLookup, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "geolocationRecordData",
    set: function set(data) {
      this.data = data;

      if (this.data.domains) {
        var domains = this.data.domains;
        domains = domains.toString().replace(/,/g, '<br>');
        this.domains = domains.toLowerCase();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.data.as) {
        this.as = "\n                <div class=\"card\">\n                    <div class=\"card-header\">Autonomus System Information</div>\n                    <div class=\"card-body\">\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">AS Number </div>\n                            <div class=\"card-content-value\">\n                                ".concat(this.data.as.asn || '-', "\n                            </div>\n                        </div>\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">AS Name</div>\n                            <div class=\"card-content-value\">\n                                ").concat(this.data.as.asn || '-', "\n                            </div>\n                        </div>\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">AS Route</div>\n                            <div class=\"card-content-value\">\n                                ").concat(this.data.as.route || '-', "\n                            </div>\n                        </div>\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">AS Website's URL</div>\n                            <div class=\"card-content-value\">\n                                ").concat(this.data.as.domain || '-', "\n                            </div>\n                        </div>\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">AS Type</div>\n                            <div class=\"card-content-value\">").concat(this.data.as.type || '', "</div>\n                        </div>\n                    </div>\n                </div>\n            ");
      } else {
        this.as = '';
      }

      this.innerHTML = "\n            <div class=\"card\">\n                <div class=\"card-header\">Location Information</div>\n                <div class=\"card-body\">\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Country</div>\n                        <div class=\"card-content-value\">\n                            ".concat(this.data.location.country || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Region</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.location.region || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">City</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.location.city || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Latitude</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.location.lat || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Longiude</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.location.lng || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Postal Code</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.location.postalCode || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Timezone</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.location.timezone || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Geoname ID</div>\n                        <div class=\"card-content-value\">").concat(this.data.location.geonameId || '', "</div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card\">\n                <div class=\"card-header\">Network Information</div>\n                <div class=\"card-body\">\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">IP</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.ip || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Internet Service Provider</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.isp || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Connection Type</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.data.connectionType || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Domain</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.domains || '-', "\n                        </div>\n                    </div>\n                </div>\n            </div>\n            ").concat(this.as, "\n        ");
    }
  }]);

  return GeolocationLookup;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('geolocation-lookup', GeolocationLookup);

/***/ }),

/***/ 171:
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InputCheckbox = /*#__PURE__*/function (_HTMLElement) {
  _inherits(InputCheckbox, _HTMLElement);

  var _super = _createSuper(InputCheckbox);

  function InputCheckbox() {
    _classCallCheck(this, InputCheckbox);

    return _super.apply(this, arguments);
  }

  _createClass(InputCheckbox, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "checkboxId",
    get: function get() {
      return this.getAttribute('checkboxId');
    }
  }, {
    key: "label",
    get: function get() {
      return this.hasAttribute('label') ? this.getAttribute('label') : 'Prefer latest results';
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div class=\"input-checkbox-container\">\n                <div class=\"input-checkbox-group\">\n                    <input type=\"checkbox\" id=\"".concat(this.checkboxId, "\" class=\"input-checkbox\">\n                    <label>").concat(this.label, "<label>\n                </div>\n            </div>\n        ");
    }
  }]);

  return InputCheckbox;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('input-checkbox', InputCheckbox);

/***/ }),

/***/ 995:
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InputSearch = /*#__PURE__*/function (_HTMLElement) {
  _inherits(InputSearch, _HTMLElement);

  var _super = _createSuper(InputSearch);

  function InputSearch() {
    _classCallCheck(this, InputSearch);

    return _super.apply(this, arguments);
  }

  _createClass(InputSearch, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "inputId",
    get: function get() {
      if (this.getAttribute('inputId') === 'domain-input') {
        this.placeholders = ['Type domain name', 'e.g example.com'];
      } else if (this.getAttribute('inputId') === 'email-input') {
        this.placeholders = ['Type email address', 'e.g mail@example.com'];
      } else {
        this.placeholders = ['Type domain name', 'Type IPv4 address', 'Type IPv6 address', 'Type email address', 'e.g example.com', 'e.g 10.10.10.10', 'e.g ::ffff:c0a8:101', 'e.g mail@example.com'];
      }

      return this.getAttribute('inputId');
    }
  }, {
    key: "buttonId",
    get: function get() {
      return this.getAttribute('buttonId');
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.innerHTML = "\n        <div class=\"input-search\">\n            <div class=\"input-search-group\">\n                <input type=\"text\" id=\"".concat(this.inputId, "\" class=\"input-text\" placeholder=\"").concat(this.placeholders[0], "\">\n                <div class=\"input-search-group-append\">\n                    <button id=\"").concat(this.buttonId, "\" class=\"button\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                            <path fill-rule=\"evenodd\" d=\"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1\n                                1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z\" clip-rule=\"evenodd\" />\n                        </svg>\n                    </button>\n                </div>\n            </div>\n        </div>\n        ");
      var inputPlaceholderId = document.getElementById(this.inputId);
      setInterval(function () {
        var list = _this.placeholders[Math.floor(Math.random() * _this.placeholders.length)];

        inputPlaceholderId.placeholder = list;
      }, 5000);
    }
  }]);

  return InputSearch;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('input-search', InputSearch);

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"mydo","version":"2.0.1","description":"Domain lookup","main":"index.js","scripts":{"lint":"eslint","start-dev":"webpack-dev-server --config webpack.dev.js --open","build":"webpack --config webpack.prod.js"},"author":"rohman","license":"ISC","dependencies":{"regenerator-runtime":"^0.13.9"},"devDependencies":{"@babel/core":"^7.15.8","@babel/preset-env":"^7.15.8","babel-eslint":"^10.1.0","babel-loader":"^8.2.3","copy-webpack-plugin":"^9.0.1","css-loader":"^4.3.0","css-minimizer-webpack-plugin":"^3.1.1","cssnano":"^5.0.10","eslint":"^7.32.0","eslint-config-airbnb-base":"^14.2.1","eslint-plugin-import":"^2.25.2","favicons":"^6.2.2","favicons-webpack-plugin":"^5.0.2","file-loader":"^6.2.0","html-loader":"^1.3.2","html-webpack-plugin":"^5.5.0","mini-css-extract-plugin":"^2.4.4","postcss":"^8.3.11","style-loader":"^1.3.0","webpack":"^5.60.0","webpack-cli":"^4.9.1","webpack-dev-server":"^4.3.1","webpack-merge":"^5.8.0"}}');

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(86);
;// CONCATENATED MODULE: ./src/script/utils/drawer-initiator.js
var DrawerInitiator = {
  init: function init(_ref) {
    var _this = this;

    var hamburger = _ref.hamburger,
        navigation = _ref.navigation,
        drawer = _ref.drawer;
    hamburger.addEventListener('click', function (event) {
      _this.toggleDrawer(event, navigation);
    });
    document.addEventListener('click', function (event) {
      _this.closeDrawer(event, navigation, drawer);
    }); // handle swipe left event

    navigation.addEventListener('touchstart', function (event) {
      _this.touchStart = event.touches[0].clientX;
    });
    navigation.addEventListener('touchmove', function (event) {
      _this.touchMove = event.touches[0].clientX;

      if (_this.touchStart - _this.touchMove > 50) {
        navigation.classList.remove('open');
      }
    });
  },
  toggleDrawer: function toggleDrawer(event, navigation) {
    event.stopPropagation();
    navigation.classList.toggle('open');
  },
  closeDrawer: function closeDrawer(event, navigation, drawer) {
    var isClickedInsideDrawer = drawer.contains(event.target);

    if (!isClickedInsideDrawer) {
      event.stopPropagation();
      navigation.classList.remove('open');
    }
  }
};
/* harmony default export */ const drawer_initiator = (DrawerInitiator);
;// CONCATENATED MODULE: ./src/script/router/url-parser.js
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
;// CONCATENATED MODULE: ./src/script/globals/config.js
var Config = {
  key: 'at_sVKWc7ce8A6XbtuEEf8U25xs2EUSo',
  whoisUrl: 'https://www.whoisxmlapi.com/whoisserver/WhoisService',
  domainAvailabilityUrl: 'https://domain-availability.whoisxmlapi.com/api/v1',
  ipGeolocationUrl: 'https://ip-geolocation.whoisxmlapi.com/api/v1',
  emailVerificationUrl: 'https://emailverification.whoisxmlapi.com/api/v1'
};
/* harmony default export */ const config = (Config);
;// CONCATENATED MODULE: ./src/script/helper/regex.js
var Regex = {
  isEmail: function isEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  isUrl: function isUrl(url) {
    var regexp = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;
    return regexp.test(String(url).toLowerCase());
  }
};
/* harmony default export */ const regex = (Regex);
;// CONCATENATED MODULE: ./src/script/globals/api-endpoint.js


var ApiEndpoint = {
  whois: function whois(parameter) {
    var url = new URL(config.whoisUrl);
    url.search = new URLSearchParams({
      ip: 1,
      domainName: parameter,
      apiKey: config.key,
      outputFormat: 'JSON',
      ignoreRawTexts: 1
    });
    return url;
  },
  domainAvailability: function domainAvailability(parameter) {
    var url = new URL(config.domainAvailabilityUrl);
    url.search = new URLSearchParams({
      domainName: parameter,
      mode: 'DNS_AND_WHOIS ',
      credits: 'DA',
      // DA WHOIS
      apiKey: config.key,
      outputFormat: 'JSON'
    });
    return url;
  },
  ipGeolocation: function ipGeolocation(parameter) {
    var url = new URL(config.ipGeolocationUrl);

    if (regex.isEmail(parameter)) {
      url.search = new URLSearchParams({
        email: parameter,
        apiKey: config.key,
        reverseIp: 1,
        outputFormat: 'JSON'
      });
    } else if (regex.isUrl(parameter)) {
      url.search = new URLSearchParams({
        domain: parameter,
        apiKey: config.key,
        reverseIp: 1,
        outputFormat: 'JSON'
      });
    } else {
      url.search = new URLSearchParams({
        ipAddress: parameter,
        apiKey: config.key,
        reverseIp: 1,
        outputFormat: 'JSON'
      });
    }

    return url;
  },
  emailVerification: function emailVerification(keyword, isChecked) {
    var freshResult = isChecked ? 1 : 0;
    var url = new URL(config.emailVerificationUrl);
    url.search = new URLSearchParams({
      emailAddress: keyword,
      validateDns: 1,
      validateSMTP: 1,
      _hardRefresh: freshResult,
      apiKey: config.key,
      outputFormat: 'JSON'
    });
    return url;
  }
};
/* harmony default export */ const api_endpoint = (ApiEndpoint);
;// CONCATENATED MODULE: ./src/script/globals/fetch-api.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FetchApi = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var options,
        response,
        responseJson,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            _context.next = 3;
            return fetch(url, options);

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            responseJson = _context.sent;
            return _context.abrupt("return", responseJson);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function FetchApi(_x) {
    return _ref.apply(this, arguments);
  };
}();

/* harmony default export */ const fetch_api = (FetchApi);
;// CONCATENATED MODULE: ./src/script/data/api-source.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ApiSource = /*#__PURE__*/function () {
  function ApiSource() {
    _classCallCheck(this, ApiSource);
  }

  _createClass(ApiSource, null, [{
    key: "whoisLookup",
    value: function whoisLookup(parameter) {
      return fetch_api(api_endpoint.whois(parameter));
    }
  }, {
    key: "domainAvailabilityLookup",
    value: function domainAvailabilityLookup(parameter) {
      return fetch_api(api_endpoint.domainAvailability(parameter));
    }
  }, {
    key: "ipGeolocationLookup",
    value: function ipGeolocationLookup(parameter) {
      return fetch_api(api_endpoint.ipGeolocation(parameter));
    }
  }, {
    key: "emailVerificationLookup",
    value: function emailVerificationLookup(keyword, isChecked) {
      return fetch_api(api_endpoint.emailVerification(keyword, isChecked));
    }
  }]);

  return ApiSource;
}();

/* harmony default export */ const api_source = (ApiSource);
// EXTERNAL MODULE: ./src/script/views/components/error-page.js
var error_page = __webpack_require__(107);
// EXTERNAL MODULE: ./src/script/views/components/input-search.js
var input_search = __webpack_require__(995);
;// CONCATENATED MODULE: ./src/script/helper/dateFormat.js
var DateFormat = {
  timeFromNow: function timeFromNow(date) {
    var fromDate = new Date(date);
    var difference = fromDate - new Date();
    var units = {
      year: 1000 * 60 * 60 * 24 * 365,
      month: 1000 * 60 * 60 * 24 * (365 / 12),
      day: 1000 * 60 * 60 * 24,
      hour: 1000 * 60 * 60,
      minute: 1000 * 60,
      second: 1000
    };
    var rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto'
    });
    var result; // eslint-disable-next-line no-restricted-syntax

    for (var unit in units) {
      if (Math.abs(difference) > units[unit] || unit === 'second') {
        result = rtf.format(Math.round(difference / units[unit]), unit);
        break;
      }
    }

    return result;
  }
};
/* harmony default export */ const dateFormat = (DateFormat);
;// CONCATENATED MODULE: ./src/script/views/components/whois-lookup.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function whois_lookup_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function whois_lookup_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function whois_lookup_createClass(Constructor, protoProps, staticProps) { if (protoProps) whois_lookup_defineProperties(Constructor.prototype, protoProps); if (staticProps) whois_lookup_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var WhoisLookup = /*#__PURE__*/function (_HTMLElement) {
  _inherits(WhoisLookup, _HTMLElement);

  var _super = _createSuper(WhoisLookup);

  function WhoisLookup() {
    whois_lookup_classCallCheck(this, WhoisLookup);

    return _super.apply(this, arguments);
  }

  whois_lookup_createClass(WhoisLookup, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "whoisRecordData",
    set: function set(data) {
      this.whoisData = data;

      if (this.whoisData.ips) {
        var ips = this.whoisData.ips;
        this.ip = ips.toString().replace(/,/g, '<br>');
      }

      if (this.whoisData.registryData.nameServers) {
        var hostNames = this.whoisData.registryData.nameServers.hostNames;
        hostNames = hostNames.toString().replace(/,/g, '<br>');
        this.hostName = hostNames.toLowerCase();
      }

      if (this.whoisData.registryData.status) {
        var status = this.whoisData.registryData.status;
        this.status = status.toString().replace(/\s/g, '<br>');
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.whoisData.registrant) {
        this.registrant = "\n                <div class=\"card\">\n                    <div class=\"card-header\">Registrant Information</div>\n                    <div class=\"card-body\">\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">Organization</div>\n                            <div class=\"card-content-value\">\n                                ".concat(this.whoisData.registrant.organization || this.whoisData.registrant.name || '-', "\n                            </div>\n                        </div>\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">State/Province</div>\n                            <div class=\"card-content-value\">\n                                ").concat(this.whoisData.registrant.state || '-', "\n                            </div>\n                        </div>\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">Country</div>\n                            <div class=\"card-content-value\">\n                                ").concat(this.whoisData.registrant.country || '-', "\n                            </div>\n                        </div>\n                        <div class=\"card-body-divide\">\n                            <div class=\"card-content-key\">Country Code</div>\n                            <div class=\"card-content-value\">\n                                ").concat(this.whoisData.registrant.countryCode || '-', "\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ");
      } else {
        this.registrant = '';
      }

      this.innerHTML = "\n            <div class=\"card\">\n                <div class=\"card-header\">Domain Information</div>\n                <div class=\"card-body\">\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Name</div>\n                        <div class=\"card-content-value\">".concat(this.whoisData.domainName || '-', "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">IP Address</div>\n                        <div class=\"card-content-value\">").concat(this.ip || '-', "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Name Server</div>\n                        <div class=\"card-content-value\">").concat(this.hostName || '-', "</div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card\">\n                <div class=\"card-header\">Important Dates</div>\n                <div class=\"card-body\">\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Created Date</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.whoisData.registryData.createdDateNormalized || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Updated Date</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.whoisData.registryData.updatedDateNormalized || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Expires Date</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.whoisData.registryData.expiresDateNormalized || '-', "\n                        </div>\n                    </div>\n                </div>\n            </div>\n            ").concat(this.registrant, "\n            <div class=\"card\">\n                <div class=\"card-header\">Registrar Information</div>\n                <div class=\"card-body\">\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Name</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.whoisData.registryData.registrarName || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Email</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.whoisData.contactEmail || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">IANA ID</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.whoisData.registryData.registrarIANAID || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Whois Server</div>\n                        <div class=\"card-content-value\">\n                            ").concat(this.whoisData.registryData.whoisServer || '-', "\n                        </div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Status</div>\n                        <div class=\"card-content-value\">").concat(this.status || '', "</div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"last-update\">\n                Last updated ").concat(dateFormat.timeFromNow(this.whoisData.audit.updatedDate) || '-', "\n            </div>\n        ");
    }
  }]);

  return WhoisLookup;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('whois-lookup', WhoisLookup);
;// CONCATENATED MODULE: ./src/script/views/pages/whois-home.js
function whois_home_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function whois_home_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { whois_home_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { whois_home_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Whois = {
  render: function render() {
    return whois_home_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "\n            <div id=\"content\" class=\"content\">\n                <img src=\"assets/illustration/whois.svg\" alt=\"Whois illustration\" class=\"illustration\">\n                <p>Search whois record by IP address, domain name, or email address</p>\n            </div>\n            <input-search inputId=\"whois-input\" buttonId=\"whois-button\"></input-search>\n            <div id=\"whois-container\"></div>\n        ");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  afterRender: function afterRender() {
    var _this = this;

    return whois_home_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var input, button;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              document.title = 'Whois - MyDo';
              input = document.getElementById('whois-input');
              button = document.getElementById('whois-button');
              button.addEventListener('click', function () {
                if (input.value) {
                  _this.renderContent(input.value);
                }
              });
              input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter' && input.value) {
                  _this.renderContent(input.value);
                }
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  renderContent: function renderContent(value) {
    return whois_home_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var whoisContainer, content, whoisResult, whoisContent, msg, WhoisRecord, _whoisContent, _whoisContent2, error;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              whoisContainer = document.querySelector('#whois-container');
              content = document.getElementById('content');
              whoisContainer.innerHTML = '<div class="loader">Loading...</div>';
              _context3.next = 5;
              return api_source.whoisLookup(value);

            case 5:
              whoisResult = _context3.sent;
              content.classList.add('hide');
              whoisContainer.innerHTML = '';

              if (whoisResult.ErrorMessage) {
                whoisContent = document.createElement('error-page');
                msg = whoisResult.ErrorMessage.msg;
                whoisContent.message = msg;
                whoisContainer.appendChild(whoisContent);
              } else if (whoisResult.WhoisRecord) {
                WhoisRecord = whoisResult.WhoisRecord;
                _whoisContent = document.createElement('whois-lookup');
                _whoisContent.whoisRecordData = WhoisRecord;
                whoisContainer.appendChild(_whoisContent);
              } else {
                _whoisContent2 = document.createElement('error-page');
                error = 'Something went wrong, try again';
                _whoisContent2.message = error;
                whoisContainer.appendChild(_whoisContent2);
              }

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
/* harmony default export */ const whois_home = (Whois);
// EXTERNAL MODULE: ./src/script/views/components/domain-lookup.js
var domain_lookup = __webpack_require__(61);
;// CONCATENATED MODULE: ./src/script/views/pages/domain-availability.js
function domain_availability_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function domain_availability_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { domain_availability_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { domain_availability_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var DomainAvailability = {
  render: function render() {
    return domain_availability_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "\n            <div id=\"content\" class=\"content\">\n                <img src=\"assets/illustration/domain-availability.svg\" alt=\"Domain availability illustration\" class=\"illustration\">\n                <p>Domain availability check</p>\n            </div>\n            <input-search inputId=\"domain-input\" buttonId=\"domain-button\"></input-search>\n            <div id=\"domain-availability-container\"></div>\n        ");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  afterRender: function afterRender() {
    var _this = this;

    return domain_availability_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var input, button;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              document.title = 'Domain Availability - MyDo';
              input = document.getElementById('domain-input');
              button = document.getElementById('domain-button');
              button.addEventListener('click', function () {
                if (input.value) {
                  _this.renderContent(input.value);
                }
              });
              input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter' && input.value) {
                  _this.renderContent(input.value);
                }
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  renderContent: function renderContent(value) {
    return domain_availability_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var domainContainer, content, domainResult, DomainInfo, domainContent, whoisContent, msg, _domainContent, messages, _domainContent2, error;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              domainContainer = document.querySelector('#domain-availability-container');
              content = document.getElementById('content');
              domainContainer.innerHTML = '<div class="loader">Loading...</div>';
              _context3.next = 5;
              return api_source.domainAvailabilityLookup(value);

            case 5:
              domainResult = _context3.sent;
              content.classList.add('hide');
              domainContainer.innerHTML = '';

              if (domainResult.DomainInfo) {
                DomainInfo = domainResult.DomainInfo;
                domainContent = document.createElement('domain-check');
                domainContent.domainRecordData = DomainInfo;
                domainContainer.appendChild(domainContent);
              } else if (domainResult.ErrorMessage) {
                whoisContent = document.createElement('error-page');
                msg = domainResult.ErrorMessage.msg;
                whoisContent.message = msg;
                domainContainer.appendChild(whoisContent);
              } else if (domainResult.messages) {
                _domainContent = document.createElement('error-page');
                messages = domainResult.messages;
                _domainContent.message = messages;
                domainContainer.appendChild(_domainContent);
              } else {
                _domainContent2 = document.createElement('error-page');
                error = 'Something went wrong, try again';
                _domainContent2.message = error;
                domainContainer.appendChild(_domainContent2);
              }

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
/* harmony default export */ const domain_availability = (DomainAvailability);
// EXTERNAL MODULE: ./src/script/views/components/geolocation-lookup.js
var geolocation_lookup = __webpack_require__(390);
;// CONCATENATED MODULE: ./src/script/views/pages/ip-geolocation.js
function ip_geolocation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function ip_geolocation_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { ip_geolocation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { ip_geolocation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var IpGeolocation = {
  render: function render() {
    return ip_geolocation_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "\n            <div id=\"content\" class=\"content\">\n                <img src=\"assets/illustration/ip-geolocation.svg\" alt=\"IP geolocation illustration\" class=\"illustration\">\n                <p>Search geographical location by IP address, domain name, or email address</p>\n            </div>\n            <input-search inputId=\"geolocation-input\" buttonId=\"geolocation-button\"></input-search>\n            <div id=\"tips\" class=\"tips\">\n                <div>\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                            d=\"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4\n                            12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374\n                            3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z\" />\n                    </svg>\n                </div>\n                <div>\n                    <p>You can also hit enter or search button without typing any keyword to check your public IP</p>\n                </div>\n            </div>\n            <div id=\"ip-geolocation-container\"></div>\n        ");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  afterRender: function afterRender() {
    var _this = this;

    return ip_geolocation_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var input, button;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              document.title = 'IP Geolocation - MyDo';
              input = document.getElementById('geolocation-input');
              button = document.getElementById('geolocation-button');
              button.addEventListener('click', function () {
                _this.renderContent(input.value);
              });
              input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                  _this.renderContent(input.value);
                }
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  renderContent: function renderContent(value) {
    return ip_geolocation_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var geolocationContainer, content, tips, geolocationResult, geolocationContent, _geolocationContent, error, _geolocationContent2, _error;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              geolocationContainer = document.querySelector('#ip-geolocation-container');
              content = document.getElementById('content');
              tips = document.getElementById('tips');
              tips.classList.add('hide');
              geolocationContainer.innerHTML = '<div class="loader">Loading...</div>';
              _context3.next = 7;
              return api_source.ipGeolocationLookup(value);

            case 7:
              geolocationResult = _context3.sent;
              content.classList.add('hide');
              geolocationContainer.innerHTML = '';

              if (geolocationResult.location) {
                geolocationContent = document.createElement('geolocation-lookup');
                geolocationContent.geolocationRecordData = geolocationResult;
                geolocationContainer.appendChild(geolocationContent);
              } else if (geolocationResult.error) {
                _geolocationContent = document.createElement('error-page');
                error = geolocationResult.error;
                _geolocationContent.message = error;
                geolocationContainer.appendChild(_geolocationContent);
              } else {
                _geolocationContent2 = document.createElement('error-page');
                _error = 'Something went wrong, try again';
                _geolocationContent2.message = _error;
                geolocationContainer.appendChild(_geolocationContent2);
              }

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
/* harmony default export */ const ip_geolocation = (IpGeolocation);
;// CONCATENATED MODULE: ./src/script/views/components/email-lookup.js
function email_lookup_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { email_lookup_typeof = function _typeof(obj) { return typeof obj; }; } else { email_lookup_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return email_lookup_typeof(obj); }

function email_lookup_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function email_lookup_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function email_lookup_createClass(Constructor, protoProps, staticProps) { if (protoProps) email_lookup_defineProperties(Constructor.prototype, protoProps); if (staticProps) email_lookup_defineProperties(Constructor, staticProps); return Constructor; }

function email_lookup_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) email_lookup_setPrototypeOf(subClass, superClass); }

function email_lookup_createSuper(Derived) { var hasNativeReflectConstruct = email_lookup_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = email_lookup_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = email_lookup_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return email_lookup_possibleConstructorReturn(this, result); }; }

function email_lookup_possibleConstructorReturn(self, call) { if (call && (email_lookup_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return email_lookup_assertThisInitialized(self); }

function email_lookup_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function email_lookup_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; email_lookup_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !email_lookup_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return email_lookup_construct(Class, arguments, email_lookup_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return email_lookup_setPrototypeOf(Wrapper, Class); }; return email_lookup_wrapNativeSuper(Class); }

function email_lookup_construct(Parent, args, Class) { if (email_lookup_isNativeReflectConstruct()) { email_lookup_construct = Reflect.construct; } else { email_lookup_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) email_lookup_setPrototypeOf(instance, Class.prototype); return instance; }; } return email_lookup_construct.apply(null, arguments); }

function email_lookup_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function email_lookup_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function email_lookup_setPrototypeOf(o, p) { email_lookup_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return email_lookup_setPrototypeOf(o, p); }

function email_lookup_getPrototypeOf(o) { email_lookup_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return email_lookup_getPrototypeOf(o); }



var EmailLookup = /*#__PURE__*/function (_HTMLElement) {
  email_lookup_inherits(EmailLookup, _HTMLElement);

  var _super = email_lookup_createSuper(EmailLookup);

  function EmailLookup() {
    email_lookup_classCallCheck(this, EmailLookup);

    return _super.apply(this, arguments);
  }

  email_lookup_createClass(EmailLookup, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "emailRecordData",
    set: function set(data) {
      this.emailData = data;

      if (this.emailData.formatCheck.toLowerCase() === 'true') {
        this.formatCheck = '<p class="green">The email address is valid</p>';
      } else {
        this.formatCheck = '<p class="red">The email address is invalid</p>';
      }

      if (this.emailData.smtpCheck.toLowerCase() === 'true') {
        this.smtpCheck = '<p class="green">The email address exists and can receive email over SMTP.</p>';
      } else {
        this.smtpCheck = "\n                <p class=\"red\">\n                    The email address doesn't exist on the target SMTP server,\n                    doesn't use SMTP protocol or temporarily couldn't receive messages.\n                </p>";
      }

      if (this.emailData.dnsCheck.toLowerCase() === 'true') {
        this.dnsCheck = '<p class="green">The domain in the email address has passed DNS check.</p>';
      } else {
        this.dnsCheck = '<p class="red">The domain in email address hasn\'t passed DNS check.</p>';
      }

      if (this.emailData.freeCheck.toLowerCase() === 'true') {
        this.freeCheck = '<p class="green">The email address is free.</p>';
      } else {
        this.freeCheck = '<p class="green">The email address is paid.</p>';
      }

      if (this.emailData.disposableCheck.toLowerCase() === 'true') {
        this.disposableCheck = '<p class="red">The email address is disposable.</p>';
      } else {
        this.disposableCheck = '<p class="green">The email address isn\'t disposable.</p>';
      }

      if (this.emailData.catchAllCheck.toLowerCase() === 'true') {
        this.catchAllCheck = '<p class="green">The mail server has a <i>"catch-all"</i> address.</p>';
      } else {
        this.catchAllCheck = '<p class="red">The mail server doesn\'t have a <i>"catch-all"</i> address.</p>';
      }

      if (this.emailData.mxRecords) {
        var mxRecords = this.emailData.mxRecords;
        mxRecords = mxRecords.toString().replace(/,/g, '<br>');
        this.mxRecord = mxRecords.toLowerCase();
      } else {
        this.mxRecord = '-';
      }

      if (this.emailData.formatCheck.toLowerCase() === 'true' && this.emailData.dnsCheck.toLowerCase() === 'true') {
        this.result = "<p class=\"green\"><b>Yey! ".concat(this.emailData.emailAddress, " is valid.</b></p>");
        this.illustraion = '<img src="assets/illustration/check.svg" alt="Email valid" class="illustration">';
      } else {
        this.result = "<p class=\"red\"><b>Sorry, ".concat(this.emailData.emailAddress, " is invalid.</b></p>");
        this.illustraion = '<img src="assets/illustration/cross.svg" alt="Email invalid" class="illustration">';
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = "\n            <div class=\"content pb-8\">\n                ".concat(this.illustraion, "\n                ").concat(this.result, "\n                <p>Check detail below</p>\n            </div>\n            <div class=\"card\">\n                <div class=\"card-header\">Email Verification Detail</div>\n                <div class=\"card-body\">\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Email address</div>\n                        <div class=\"card-content-value\">").concat(this.emailData.emailAddress, "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Email address check</div>\n                        <div class=\"card-content-value\">").concat(this.formatCheck, "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">SMTP check</div>\n                        <div class=\"card-content-value\">").concat(this.smtpCheck, "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Domain name system check</div>\n                        <div class=\"card-content-value\">").concat(this.dnsCheck, "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Free email address check</div>\n                        <div class=\"card-content-value\">").concat(this.freeCheck, "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Check email provider for abuse</div>\n                        <div class=\"card-content-value\">").concat(this.disposableCheck, "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">Catch all emails address</div>\n                        <div class=\"card-content-value\">").concat(this.catchAllCheck, "</div>\n                    </div>\n                    <div class=\"card-body-divide\">\n                        <div class=\"card-content-key\">mxRecords</div>\n                        <div class=\"card-content-value\">").concat(this.mxRecord, "</div>\n                    </div>\n                </div>\n            </div>            \n            <div class=\"last-update\">\n                Last updated ").concat(dateFormat.timeFromNow(this.emailData.audit.auditUpdatedDate) || '-', "\n            </div>\n        ");
    }
  }]);

  return EmailLookup;
}( /*#__PURE__*/email_lookup_wrapNativeSuper(HTMLElement));

customElements.define('email-lookup', EmailLookup);
// EXTERNAL MODULE: ./src/script/views/components/input-checkbox.js
var input_checkbox = __webpack_require__(171);
;// CONCATENATED MODULE: ./src/script/views/pages/email-verification.js
function email_verification_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function email_verification_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { email_verification_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { email_verification_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var EmailVerification = {
  render: function render() {
    return email_verification_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "\n            <div id=\"content\" class=\"content\">\n                <img src=\"assets/illustration/email-verification.svg\" alt=\"Email verification illustration\" class=\"illustration\">\n                <p>Verify and validate email address</p>\n            </div>\n            <input-search inputId=\"email-input\" buttonId=\"email-button\"></input-search>\n            <input-checkbox checkboxId=\"email-checkbox\"></input-checkbox>\n            <div id=\"email-verification-container\"></div>\n        ");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  afterRender: function afterRender() {
    var _this = this;

    return email_verification_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var input, button, checkbox;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              document.title = 'Email Verification - MyDo';
              input = document.getElementById('email-input');
              button = document.getElementById('email-button');
              checkbox = document.getElementById('email-checkbox');
              button.addEventListener('click', function () {
                if (input.value) {
                  _this.renderContent(input.value, checkbox.checked);
                }
              });
              input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter' && input.value) {
                  _this.renderContent(input.value, checkbox.checked);
                }
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  renderContent: function renderContent(text, checkbox) {
    return email_verification_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var emailContainer, content, emailResult, emailContent, ErrorMessage, errorMsg, _emailContent;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              emailContainer = document.querySelector('#email-verification-container');
              content = document.getElementById('content');
              emailContainer.innerHTML = '<div class="loader">Loading...</div>';
              _context3.next = 5;
              return api_source.emailVerificationLookup(text, checkbox);

            case 5:
              emailResult = _context3.sent;
              content.classList.add('hide');
              emailContainer.innerHTML = '';

              if (emailResult.ErrorMessage) {
                emailContent = document.createElement('error-page');
                ErrorMessage = emailResult.ErrorMessage;
                errorMsg = [];
                ErrorMessage.forEach(function (error) {
                  errorMsg.push(error.Error);
                });
                errorMsg = errorMsg.toString().replace(/,/g, '<br>');
                emailContent.message = errorMsg;
                emailContainer.appendChild(emailContent);
              } else {
                _emailContent = document.createElement('email-lookup');
                _emailContent.emailRecordData = emailResult;
                emailContainer.appendChild(_emailContent);
              }

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
/* harmony default export */ const email_verification = (EmailVerification);
;// CONCATENATED MODULE: ./src/script/views/pages/about.js
function about_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function about_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { about_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { about_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = __webpack_require__(147),
    version = _require.version;

var About = {
  render: function render() {
    return about_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "\n            <div class=\"about-content\">\n                <img src=\"assets/illustration/about.svg\" alt=\"About illustration\" class=\"illustration\">\n                <div id=\"about-description\" class=\"about-description\"></div>    \n            </div>\n        ");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  afterRender: function afterRender() {
    return about_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var aboutContainer;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              document.title = 'About - MyDo';
              aboutContainer = document.querySelector('#about-description');
              aboutContainer.innerHTML = "\n            <p class=\"about-title\">About MyDo</p>\n            <p>MyDo is an application that provides domain and email information.</p>\n            <p class=\"about-services\">Our services</p>\n            <ul class=\"service-list\">\n                <li>\n                    <p>Whois Lookup</p>\n                    <p>Provides the registration details, also known as the WHOIS record data,</p>\n                    <p>of a domain name, an IP address, or an email address.</p>\n                </li>\n                <li>\n                    <p>Domain Availability Check</p>\n                    <p>Instantly know which domains can be purchased.</p>\n                </li>\n                <li>\n                    <p>IP Geolocation Lookup</p>\n                    <p>Identify web visitors and users\u2019 geographical location.</p>\n                </li>\n                <li>\n                    <p>Email Verification Check</p>\n                    <p>Verify the existence, validity & quality of any email address.</p>\n                </li>\n            </ul>\n            <p class=\"mb-4\">\n                Data taken from\n                <a href=\"https://whoisxmlapi.com\" target=\"_blank\" class=\"link\">WhoisXMLAPI</a>.\n            </p>\n            <p class=\"mb-4\">\n                Developed by\n                <a href=\"https://github.com/ar-rohman\" target=\"_blank\" class=\"link\">Rohman</a>\n            </p>\n            <p class=\"pb-8\">Version ".concat(version, "</p>\n        ");

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
/* harmony default export */ const about = (About);
;// CONCATENATED MODULE: ./src/script/router/routes.js





var routes = {
  '/': whois_home,
  // default page
  '/whois': whois_home,
  '/domain-availability': domain_availability,
  '/ip-geolocation': ip_geolocation,
  '/email-verification': email_verification,
  '/about': about
};
/* harmony default export */ const router_routes = (routes);
;// CONCATENATED MODULE: ./src/script/utils/active-menu.js
var ActiveMenu = {
  click: function click(_ref) {
    var _this = this;

    var clickedLinks = _ref.clickedLinks,
        links = _ref.links,
        navigation = _ref.navigation;
    clickedLinks.forEach(function (clickedLink) {
      _this.active({
        clickedLink: clickedLink,
        links: links,
        navigation: navigation
      });
    });
  },
  active: function active(_ref2) {
    var _this2 = this;

    var clickedLink = _ref2.clickedLink,
        links = _ref2.links,
        navigation = _ref2.navigation;

    if (window.location.href === clickedLink.href) {
      this.toggleActive(links, clickedLink);
    }

    clickedLink.addEventListener('click', function (event) {
      _this2.toggleActive(links, clickedLink);

      event.stopPropagation();
      navigation.classList.remove('open');
    });
  },
  toggleActive: function toggleActive(links, clickedLink) {
    links.forEach(function (node) {
      node.classList.remove('active');
    });
    clickedLink.classList.add('active');
  }
};
/* harmony default export */ const active_menu = (ActiveMenu);
;// CONCATENATED MODULE: ./src/script/views/app.js
function app_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function app_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { app_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { app_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function app_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function app_createClass(Constructor, protoProps, staticProps) { if (protoProps) app_defineProperties(Constructor.prototype, protoProps); if (staticProps) app_defineProperties(Constructor, staticProps); return Constructor; }






var App = /*#__PURE__*/function () {
  function App(_ref) {
    var hamburger = _ref.hamburger,
        navigation = _ref.navigation,
        drawer = _ref.drawer,
        content = _ref.content,
        clickedLinks = _ref.clickedLinks,
        links = _ref.links;

    app_classCallCheck(this, App);

    this.hamburger = hamburger;
    this.navigation = navigation;
    this.drawer = drawer;
    this.content = content;
    this.clickedLinks = clickedLinks;
    this.links = links;
    this.initialAppShell();
  }

  app_createClass(App, [{
    key: "initialAppShell",
    value: function initialAppShell() {
      drawer_initiator.init({
        hamburger: this.hamburger,
        navigation: this.navigation,
        drawer: this.drawer
      });
      active_menu.click({
        clickedLinks: this.clickedLinks,
        links: this.links,
        navigation: this.navigation
      });
    }
  }, {
    key: "renderPage",
    value: function () {
      var _renderPage = app_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var url, page;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
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
          }
        }, _callee, this);
      }));

      function renderPage() {
        return _renderPage.apply(this, arguments);
      }

      return renderPage;
    }()
  }]);

  return App;
}();

/* harmony default export */ const app = (App);
;// CONCATENATED MODULE: ./src/index.js



var hamburger = document.querySelector('#hamburger');
var navigation = document.querySelector('#navigation');
var drawer = document.querySelector('#drawer');
var content = document.querySelector('#page-content');
var whois = document.getElementById('whois-link');
var domainAvailability = document.getElementById('domain-availability-link');
var ipGeolocation = document.getElementById('ip-geolocation-link');
var emailVerification = document.getElementById('email-verification-link');
var src_about = document.getElementById('about-link');
var links = document.querySelectorAll('.menu-link');
var clickedLinks = [whois, domainAvailability, ipGeolocation, emailVerification, src_about];
var src_app = new app({
  hamburger: hamburger,
  navigation: navigation,
  drawer: drawer,
  content: content,
  clickedLinks: clickedLinks,
  links: links
});
window.addEventListener('hashchange', function () {
  src_app.renderPage();
});
window.addEventListener('load', function () {
  src_app.renderPage();
});
})();

/******/ })()
;