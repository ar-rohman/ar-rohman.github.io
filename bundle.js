/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 358
(module) {

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
    define = function (obj, key, value) {
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
        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
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
    reset: function (skipTempReset) {
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
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }
      return this.rval;
    },
    dispatchException: function (exception) {
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
    abrupt: function (type, arg) {
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
    complete: function (record, afterLoc) {
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
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
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
    delegateYield: function (iterable, resultName, nextLoc) {
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
 true ? module.exports : 0);
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
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ },

/***/ 305
() {

class BackHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  set backHeaderTitle(title) {
    this.title = title;
  }
  render() {
    const pageTitle = this.title || 'Detail';
    this.innerHTML = `
            <header>
                <div class="back max-content">
                    <a href="javascript: history.go(-1)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1
                                1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1
                                1 0 010 1.414z" clip-rule="evenodd">
                            </path>
                        </svg>
                    </a>
                    <p>${pageTitle}</p>
                </div>
            </header>
        `;
  }
}
customElements.define('back-header', BackHeader);

/***/ },

/***/ 152
() {

class PortfolioCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  set portfolioData(data) {
    this.image = data.image;
    this.projectTitle = data.title;
    this.description = data.description;
    this.hastag = data.hastag;
    this.demoLink = data.demoLink;
    this.detailLink = data.detailLink;
    this.disableDemo = data.demoLink ? '' : 'disabled';
  }
  render() {
    this.innerHTML = `
            <div class="card-logo">
                <img src="${this.image}" alt="${this.projectTitle}" height="64" width="64">
            </div>
            <div class="card-title">${this.projectTitle}</div>
            <div class="card-content">
                <p>${this.description}</p>
            </div>
            <div class="card-hashtag">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1
                        1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1
                        1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0
                        110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1
                        4h2.938l1-4H9.031z" clip-rule="evenodd" />
                </svg>
                <p>${this.hastag}</p>
            </div>
            <div class="card-footer">
                <a href="${this.demoLink}" target="_blank" rel="noopener" class="demo-link ${this.disableDemo}">Demo</a>
                <a href="${this.detailLink}" class="detail-link">Detail</a>
            </div>
        `;
  }
}
customElements.define('portfolio-card', PortfolioCard);

/***/ },

/***/ 372
() {

class FooterSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  set isNavMenu(data) {
    this.navMenu = data;
  }
  render() {
    const className = this.navMenu ? 'footer-app' : 'footer-no-nav';
    const assetSource = this.navMenu ? '<a href="#/assets-source" class="link">Assets source</a>' : '';
    const year = new Date().getFullYear();
    this.innerHTML = `
            <footer>
                <div class="max-content">
                    <div class="${className}">
                        ${assetSource}
                        <p>
                            Copyright &copy; 2021-${year} by
                            <a href="https://github.com/ar-rohman" class="link" target="_blank" rel="noopener">Rohman</a>
                        </p>
                    </div>
                </div>
            </footer>
        `;
  }
}
customElements.define('footer-section', FooterSection);

/***/ }

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(358);
;// ./src/scripts/router/url-parser.js
const UrlParser = {
  parseUrl() {
    const url = window.location.hash.slice(1).toLowerCase();
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null
    };
  },
  parseUrlWithCombiner() {
    const splitedUrl = this.parseUrl();
    return this.urlCombiner(splitedUrl);
  },
  urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/') + (splitedUrl.id ? '/:id' : '') + (splitedUrl.verb ? `/${splitedUrl.verb}` : '');
  }
};
/* harmony default export */ const url_parser = (UrlParser);
;// ./src/assets/portfolio/glow-maskable.png
const glow_maskable_namespaceObject = __webpack_require__.p + "assets/images/b305a3a405a115762a93.png";
;// ./src/scripts/data/modules/glow.js

const projectTitle = 'Glow';
const projectSlug = projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const glow = ({
  title: projectTitle,
  slug: projectSlug,
  description: 'Glow (Global Weather) is an application that provides weather data for any location on Earth.',
  image: glow_maskable_namespaceObject,
  features: ['Current weather forecast', 'Hourly weather forecast', 'Daily weather forecast', 'Search weather forecast by city', 'Set default city &amp; temperature', 'Support dark mode', 'Bilingual'],
  technologies: ['Vue', 'Tailwind', 'Progressive Web App (PWA)', 'Indexed DB', 'Local Storage'],
  hastag: 'Vue',
  demoLink: 'https://glow-forecast.web.app',
  detailLink: `#/portfolio/${projectSlug}`,
  repoLink: ''
});
;// ./src/assets/portfolio/code-sport.png
const code_sport_namespaceObject = __webpack_require__.p + "assets/images/50942c31ff14d2dd6ace.png";
;// ./src/scripts/data/modules/code-sport.js

const code_sport_projectTitle = 'Code Sport';
const code_sport_projectSlug = code_sport_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const code_sport = ({
  title: code_sport_projectTitle,
  slug: code_sport_projectSlug,
  description: 'Provides information about Champions League.',
  image: code_sport_namespaceObject,
  features: ['Matches', 'Standings', 'Teams', 'Scorers'],
  technologies: ['Vue', 'Tailwind', 'Progressive Web Application (PWA)', 'SPA (Single Page Application)'],
  hastag: 'Vue',
  demoLink: 'https://code-sport.web.app',
  detailLink: `#/portfolio/${code_sport_projectSlug}`,
  repoLink: 'https://github.com/ar-rohman/code-sport'
});
;// ./src/assets/portfolio/mydo.png
const mydo_namespaceObject = __webpack_require__.p + "assets/images/866ce345281c92d1a286.png";
;// ./src/scripts/data/modules/mydo.js

const mydo_projectTitle = 'MyDo';
const mydo_projectSlug = mydo_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const mydo = ({
  title: mydo_projectTitle,
  slug: mydo_projectSlug,
  description: 'MyDo is an application that provides domain and email information.',
  image: mydo_namespaceObject,
  features: ['Whois Lookup', 'Domain Availability Check', 'IP Geolocation Lookup', 'Email Verification Check'],
  technologies: ['Javascript', 'Webpack', 'SPA (Single Page Application)'],
  hastag: 'Javascript',
  demoLink: 'https://ar-rohman.github.io/mydo',
  detailLink: `#/portfolio/${mydo_projectSlug}`,
  repoLink: 'https://github.com/ar-rohman/mydo'
});
;// ./src/assets/portfolio/dishmenu.png
const dishmenu_namespaceObject = __webpack_require__.p + "assets/images/463c0edd649c91443d56.png";
;// ./src/scripts/data/modules/dishmenu.js

const dishmenu_projectTitle = 'dishmenu';
const dishmenu_projectSlug = dishmenu_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const dishmenu = ({
  title: dishmenu_projectTitle,
  slug: dishmenu_projectSlug,
  description: 'Dish information and review (dummy).',
  image: dishmenu_namespaceObject,
  features: ['Dish list', 'Dish Review'],
  technologies: ['Javascript', 'Webpack', 'Progressive Web Application (PWA)', 'SPA (Single Page Application)', 'Indexed DB'],
  hastag: 'Javascript',
  demoLink: '',
  detailLink: `#/portfolio/${dishmenu_projectSlug}`,
  repoLink: 'https://github.com/ar-rohman/dishmenu'
});
;// ./src/assets/portfolio/moview.png
const moview_namespaceObject = __webpack_require__.p + "assets/images/b6d2e67edf38e9af83c8.png";
;// ./src/scripts/data/modules/moview.js

const moview_projectTitle = 'MOVIEW';
const moview_projectSlug = moview_projectTitle.toLowerCase().replace(/\s/g, '-');
/* harmony default export */ const moview = ({
  title: moview_projectTitle,
  slug: moview_projectSlug,
  description: 'Moview is where people find their favorite movies and discover movies around the world.',
  image: moview_namespaceObject,
  features: ['Discover movies', 'Play trailers', 'Share movies', 'Add / remove favorite movies', 'Dark mode'],
  technologies: ['Vue 3', 'Tailwindcss', 'Pinia', 'Indexed DB', 'Local Storage'],
  hastag: 'Vue',
  demoLink: 'https://moview-app.vercel.app',
  detailLink: `#/portfolio/${moview_projectSlug}`,
  repoLink: ''
});
;// ./src/scripts/data/index.js





/* harmony default export */ const data = ([moview, glow, code_sport, mydo, dishmenu]);
;// ./src/scripts/utils/active-nav.js
const ActiveNav = {
  /**
   * Add active class when nav menu clicked
   * @param {HTMLElement} navMenu - A HTMLElement of navigation
   */
  click(navMenu) {
    navMenu.forEach(link => {
      link.addEventListener('click', () => {
        const section = link.id.split('-')[0];
        const sectionId = document.getElementById(section);
        sectionId.scrollIntoView();
        if (navMenu.length > 1) {
          this.removeActiveState(navMenu);
          this.addActiveState(link);
        }
        const capitalized = this.pascalCase(section);
        document.title = `${capitalized} - ArRohman`;
      });
    });
  },
  /**
   * Add active class when scrolled
   * @param {HTMLElement} sections - A HTMLElement of section
   * @param {HTMLElement} navigation - A HTMLElement of navigation
   */
  scroll(sections, navigation) {
    window.addEventListener('scroll', () => {
      let index = sections.length;

      // Decrements the index value each iteration.
      // see https://stackoverflow.com/a/55749862
      while (--index >= 0 && window.scrollY + 50 < sections[index].offsetTop) {
        // do nothing
        // just to decrement index value
      }
      this.removeActiveState(navigation);

      // add active class if within visible height of the element
      if (window.scrollY - sections[index].offsetHeight < sections[index].offsetTop) {
        this.addActiveState(navigation[index]);
      }
    });
  },
  /**
   * Remove other active state if navigation link clicked
   * This is private method
   * @param {HTMLElement} navMenu - An array of navigation menu
   */
  removeActiveState(navMenu) {
    navMenu.forEach(element => {
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
  addActiveState(link) {
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
  pascalCase(string) {
    return string.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }
};
/* harmony default export */ const active_nav = (ActiveNav);
;// ./src/scripts/views/components/section/header-section.js

class HeaderSection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.navActiveState();
  }
  navActiveState() {
    this.navigation = document.querySelectorAll('.menu-nav');
    active_nav.click(this.navigation);
  }
  render() {
    this.innerHTML = `
            <header>
                <div class="max-content header-content">
                    <div class="brand">ArRohman</div>
                    <nav class="menu">
                        <div id="hello-nav" class="menu-nav active" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5
                                    0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0
                                    0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="solid" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1
                                    1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z"
                                    clip-rule="evenodd" />
                            </svg>
                            Hello!
                        </div>
                        <div id="portfolio-nav" class="menu-nav" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0
                                    012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide solid" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2
                                    11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                            Portfolio
                        </div>
                        <div id="about-nav" class="menu-nav" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide solid" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1
                                    0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                            About
                        </div>
                        <div id="contact-nav" class="menu-nav" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="outline" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257
                                    1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0
                                    01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="hide solid" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037
                                    11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1
                                    1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            Contact
                        </div>
                    </nav>
                </div>
            </header>
        `;
  }
}
customElements.define('header-section', HeaderSection);
;// ./src/assets/illustrations/hello.svg
const hello_namespaceObject = __webpack_require__.p + "assets/images/ef6d71edc096239b9618.svg";
;// ./src/scripts/views/components/section/hello-section.js


class HelloSection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.navActiveState();
  }
  navActiveState() {
    this.goToPortfolio = document.getElementById('portfolio-go-to');
    active_nav.click([this.goToPortfolio]);
  }
  render() {
    this.innerHTML = `
            <div id="hello" class="hello">
                <div class="max-content">
                    <div class="hello-section">
                        <div class="hello-content">
                            <div>
                                <p>Hi,</p>
                                <p>Rohman is here.</p>
                                <p>This is my portfolio page.</p>
                                <p>Let's explore them.</p>
                            </div>
                            <img src="${hello_namespaceObject}" alt="Hello" class="hello-illustration">
                        </div>
                        <div class="chevron-down">
                            <div class="chevron-down-content">
                                <div id="portfolio-go-to" class="chevron-down-rounded" tabindex="0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}
customElements.define('hello-section', HelloSection);
;// ./src/assets/illustrations/about.svg
const about_namespaceObject = __webpack_require__.p + "assets/images/8ec75bd0699fb1b5cc9b.svg";
;// ./src/scripts/views/components/section/about-section.js

class AboutSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
            <div id="about" class="about">
                <div class="max-content">
                    <div class="about-section">About</div>
                    <div class="about-content">
                        <img src="${about_namespaceObject}" alt="About" class="about-illustration">
                        <div class="about-text">
                            <p>
                                I am web developer based in Jakarta, ID
                                who passionate about building excellent software
                                that improves the lives of those around me.
                            </p>
                            <p>
                                In my spare time I like to tinker on side projects for clients
                                ranging from individuals and small businesses
                                the way to large enterprise corporations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}
customElements.define('about-section', AboutSection);
;// ./src/assets/illustrations/contact.svg
const contact_namespaceObject = __webpack_require__.p + "assets/images/aefcfdbac49aa586e7ea.svg";
;// ./src/scripts/views/components/section/contact-section.js

class ContactSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
            <div id="contact" class="contact">
                <div class="max-content">
                    <div class="contact-section">Contact</div>
                    <div class="contact-content">
                        <div>
                            <p>If you wanna get in touch,</p> <p>talk to me about a project or just say hi,</p>
                            <p>feel free to contact me via email at</p>
                            <a href="mailto:kontak.rohman@gmail.com" class="link">kontak.rohman@gmail.com</a>
                        </div>
                        <img src="${contact_namespaceObject}" alt="Contact" class="contact-illustration">
                    </div>
                </div>
            </div>
        `;
  }
}
customElements.define('contact-section', ContactSection);
// EXTERNAL MODULE: ./src/scripts/views/components/section/footer-section.js
var footer_section = __webpack_require__(372);
// EXTERNAL MODULE: ./src/scripts/views/components/portfolio-card.js
var portfolio_card = __webpack_require__(152);
;// ./src/scripts/views/pages/main.js








const Main = {
  render() {
    return `
            <header-section></header-section>
            <main>
                <hello-section></hello-section>
                <div id="portfolio" class="portfolio">
                    <div class="max-content">
                        <div class="portfolio-section">Portfolio</div>
                        <div class="portfolio-content" id="js-portfolio-content"></div>
                    </div>
                </div>
                <about-section></about-section>
                <contact-section></contact-section>
            </main>
            <div id="footer-section"></div>
        `;
  },
  afterRender() {
    const portfolioContent = document.getElementById('js-portfolio-content');
    const footerId = document.getElementById('footer-section');
    const footerSection = document.createElement('footer-section');
    footerSection.isNavMenu = true;
    footerId.appendChild(footerSection);
    data.forEach(element => {
      const card = document.createElement('portfolio-card');
      card.setAttribute('class', 'card');
      card.portfolioData = element;
      portfolioContent.appendChild(card);
    });
    const hello = document.querySelector('#hello');
    const portfolio = document.querySelector('#portfolio');
    const about = document.querySelector('#about');
    const contact = document.querySelector('#contact');
    const pageSections = [hello, portfolio, about, contact];
    const navigation = document.querySelectorAll('.menu-nav');
    active_nav.scroll(pageSections, navigation);
  },
  async removeActiveState(links) {
    await links.forEach(active => {
      active.classList.remove('active');
      active.querySelector('.outline').classList.remove('hide');
      active.querySelector('.solid').classList.add('hide');
    });
  },
  addActiveState(link) {
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



const Page = {
  render() {
    return `
           <div id="js-asset-source-header"></div>
            <main>
                <div class="asset-source">
                    <div class="max-content">
                        <div class="asset-source-content">
                            <div>
                                <div class="detail-summary">Assets used in this website</div>
                                <div class="detail-list-header">Icon</div>
                                <div class="detail-list">
                                    <ul>
                                        <li>
                                            <a href="https://heroicons.com/" target="_blank" rel="noopener" class="link">heroicons</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="detail-list-header">Illustrations</div>
                                <div class="detail-list">
                                    <ul>
                                        <li>
                                            <a href="https://drawkit.com/product/grape-illustration-pack" target="_blank" rel="noopener" class="link">
                                                DrawKit
                                            </a>
                                            (with some changes)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <img src="${asset_source_namespaceObject}" alt="Asset Source" class="asset-source-illustration">
                        </div>
                    </div>
                </div>
            </main>
            <footer-section></footer-section>
        `;
  },
  afterRender() {
    document.title = 'Asset Source - ArRohman';
    const assetSource = document.getElementById('js-asset-source-header');
    const backHeader = document.createElement('back-header');
    backHeader.backHeaderTitle = 'Asset Source';
    assetSource.appendChild(backHeader);
  }
};
/* harmony default export */ const assets_source = (Page);
;// ./src/assets/illustrations/detail.svg
const detail_namespaceObject = __webpack_require__.p + "assets/images/976ec549a6180a1290d4.svg";
;// ./src/scripts/views/components/detail-page.js

class DetailPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  set data(data) {
    this.projectTitle = data.title;
    this.description = data.description;
    this.features = data.features.map(item => `<li>${item}</li>`);
    this.technologies = data.technologies.map(item => `<li>${item}</li>`);
    this.repoLink = data.repoLink;
    this.demoLink = data.demoLink;
    this.disableRepo = data.repoLink ? '' : 'disabled';
    this.disableDemo = data.demoLink ? '' : 'disabled';
  }
  render() {
    this.innerHTML = `
            <main>
                <div class="detail">
                    <div class="max-content">
                        <div class="detail-content">
                            <div>
                                <div class="detail-title">${this.projectTitle}</div>
                                <p class="detail-summary">${this.description}</p>
                                <div class="detail-list-header">Features</div>
                                <div class="detail-list">
                                    <ul>${this.features.join('')}</ul>
                                </div>
                                <div class="detail-list-header">Technology used</div>
                                <div class="detail-list">
                                    <ul>${this.technologies.join('')}</ul>
                                </div>
                                <div class="detail-button">
                                    <a href="${this.repoLink}" target="_blank" rel="noopener" class="detail-button-repo ${this.disableRepo}">
                                        Repository
                                    </a>
                                    <a href="${this.demoLink}" target="_blank" rel="noopener" class="detail-button-demo ${this.disableDemo}">Demo</a>
                                </div>
                            </div>
                            <img src="${detail_namespaceObject}" alt="Detail" class="detail-illustration">
                        </div>
                    </div>
                </div>
            </main>
        `;
  }
}
customElements.define('detail-page', DetailPage);
;// ./src/scripts/views/pages/portfolio-detail.js





/* harmony default export */ const portfolio_detail = ({
  render() {
    return `
            <back-header></back-header>
            <div id="js-detail-page"></div>
            <footer-section></footer-section>
        `;
  },
  afterRender() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    const slug = url_parser.parseUrl();
    const detailData = data.filter(item => item.slug === slug.id)[0];
    document.title = `${detailData.title} Detail - ArRohman`;
    const detailPage = document.getElementById('js-detail-page');
    const element = document.createElement('detail-page');
    element.data = detailData;
    detailPage.appendChild(element);
  }
});
;// ./src/scripts/router/routes.js



const routes = {
  '/': main,
  '/portfolio/:id': portfolio_detail,
  '/assets-source': assets_source
};
/* harmony default export */ const router_routes = (routes);
;// ./src/scripts/app.js


class App {
  constructor(content, navLink) {
    this.content = content;
    this.navLink = navLink;
  }
  async renderPage() {
    const url = url_parser.parseUrlWithCombiner();
    const page = router_routes[url];
    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}
/* harmony default export */ const app = (App);
;// ./src/index.js



const content = document.getElementById('app');
const src_app = new app(content);
window.addEventListener('hashchange', () => {
  src_app.renderPage();
});
window.addEventListener('load', () => {
  src_app.renderPage();
});
})();

/******/ })()
;