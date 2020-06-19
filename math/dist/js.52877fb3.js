// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.ts":[function(require,module,exports) {
var runDecorators = function runDecorators(context, items) {
  items.forEach(function (item) {
    item.decorators.forEach(function (decorator) {
      decorator(context, item);
    });
  });
};

var move = function move(vector, steps) {
  if (steps === void 0) {
    steps = 10;
  }

  console.log(Array(steps).fill(5));
  return function (_ctx, item) {
    item.vector[0] += vector[0];
    item.vector[1] += vector[1];
    item.startPoint[0] += vector[0];
    item.startPoint[1] += vector[1];
  };
};

var scale = function scale(context, item) {};

var rotate = function rotate(context, item) {
  var matrix = [[0, 1], [-1, 0]];
  transform(item, matrix);
};

var flipX = function flipX(context, item) {
  var matrix = [[-1, 0], [0, 1]];
  transform(item, matrix);
};

var transform = function transform(item, matrix) {
  var x = matrix[0][0] * item.vector[0] + matrix[0][1] * item.vector[1];
  var y = matrix[1][0] * item.vector[0] + matrix[1][1] * item.vector[1];
  item.vector[0] = x;
  item.vector[1] = y;
  return item;
};

var line = function line(context, item) {
  context.beginPath();
  var start = vectorDrawposition(item.startPoint);
  var end = vectorDrawposition(item.vector);
  context.moveTo(start[0], start[1]);
  context.lineTo(end[0], end[1]);
  context.stroke();
};

var circleEnd = function circleEnd(ctx, item) {
  circle(ctx, vectorDrawposition(item.vector), 5);
};

var circle = function circle(ctx, center, width) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(center[0], center[1], 5, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
};

var prepareState = function prepareState(state) {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  state.context = context;
  state.canvas = canvas;
  context.lineWidth = 1;
  state.spaces[0].properties.startPoint = [200, 200];
  state.spaces.forEach(function (space) {
    space.items.forEach(function (item) {
      item.startPoint = [0, 0];
    });
  });
  return state;
};

var state = {
  context: null,
  canvas: null,
  spaces: [{
    properties: {
      startPoint: [250, 250],
      gage: 20
    },
    items: [{
      vector: [-450, 0],
      decorators: [line]
    }, {
      vector: [0, 250],
      decorators: [line]
    }, {
      vector: [450, 0],
      decorators: [line]
    }, {
      vector: [0, -250],
      decorators: [line]
    }, {
      vector: [200, 70],
      decorators: [circleEnd]
    }, {
      vector: [20, 200],
      decorators: [circleEnd]
    }, {
      vector: [90, -200],
      decorators: [circleEnd]
    }, {
      vector: [-200, -200],
      decorators: [line, circleEnd]
    }],
    modificators: [move([30, 30])],
    spaces: []
  }]
};

var draw = function draw(state) {
  state.spaces.forEach(function (space) {
    runDecorators(state.context, space.items);
  });
};

var applyModificators = function applyModificators(state) {
  state.spaces.forEach(function (space) {
    space.modificators.forEach(function (modificator) {
      space.items.forEach(function (item) {
        modificator(state.context, item); // runDecorators(state.context, space.items)
      });
    });
  });
};

var clean = function clean(state) {
  var _a = state.canvas.getBoundingClientRect(),
      width = _a.width,
      height = _a.height;

  state.context.clearRect(0, 0, width, height);
}; // new MathApp()


prepareState(state);

var vectorDrawposition = function (state) {
  return function (point) {
    return [point[0] + 200, point[1] + 200];
  };
}(state);

window.requestAnimationFrame(gameLoop);
var secondsPassed;
var oldTimeStamp;
var fps;

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp; //Calculate fps

  fps = Math.round(1 / secondsPassed);
  clean(state);
  applyModificators(state);
  draw(state);
  state.context.font = '25px Arial';
  state.context.fillStyle = 'black';
  state.context.fillText("FPS: " + fps, 10, 30); // Keep requesting new frames

  window.requestAnimationFrame(gameLoop);
}
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59096" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.ts"], null)
//# sourceMappingURL=/js.52877fb3.js.map