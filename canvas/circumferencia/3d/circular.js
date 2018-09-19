! function e(t, r, i) {
    function n(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var h = "function" == typeof require && require;
                if (!s && h) return h(a, !0);
                if (o) return o(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = r[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var r = t[a][1][e];
                return n(r ? r : e)
            }, c, c.exports, e, t, r, i)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) n(i[a]);
    return n
}({
    1: [function(e, t, r) {
        function i() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }
        function n(e) {
            return "function" == typeof e
        }
        function o(e) {
            return "number" == typeof e
        }
        function a(e) {
            return "object" == typeof e && null !== e
        }
        function s(e) {
            return void 0 === e
        }
        t.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(e) {
            if (!o(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, i.prototype.emit = function(e) {
            var t, r, i, o, h, l;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
                if (t = arguments[1], t instanceof Error) throw t;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (r = this._events[e], s(r)) return !1;
            if (n(r)) switch (arguments.length) {
                case 1:
                    r.call(this);
                    break;
                case 2:
                    r.call(this, arguments[1]);
                    break;
                case 3:
                    r.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    o = Array.prototype.slice.call(arguments, 1), r.apply(this, o)
            } else if (a(r))
                for (o = Array.prototype.slice.call(arguments, 1), l = r.slice(), i = l.length, h = 0; i > h; h++) l[h].apply(this, o);
            return !0
        }, i.prototype.addListener = function(e, t) {
            var r;
            if (!n(t)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, n(t.listener) ? t.listener : t), this._events[e] ? a(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, a(this._events[e]) && !this._events[e].warned && (r = s(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners, r && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this
        }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(e, t) {
            function r() {
                this.removeListener(e, r), i || (i = !0, t.apply(this, arguments))
            }
            if (!n(t)) throw TypeError("listener must be a function");
            var i = !1;
            return r.listener = t, this.on(e, r), this
        }, i.prototype.removeListener = function(e, t) {
            var r, i, o, s;
            if (!n(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (r = this._events[e], o = r.length, i = -1, r === t || n(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (a(r)) {
                for (s = o; s-- > 0;)
                    if (r[s] === t || r[s].listener && r[s].listener === t) {
                        i = s;
                        break
                    }
                if (0 > i) return this;
                1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, i.prototype.removeAllListeners = function(e) {
            var t, r;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (r = this._events[e], n(r)) this.removeListener(e, r);
            else if (r)
                for (; r.length;) this.removeListener(e, r[r.length - 1]);
            return delete this._events[e], this
        }, i.prototype.listeners = function(e) {
            var t;
            return t = this._events && this._events[e] ? n(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, i.prototype.listenerCount = function(e) {
            if (this._events) {
                var t = this._events[e];
                if (n(t)) return 1;
                if (t) return t.length
            }
            return 0
        }, i.listenerCount = function(e, t) {
            return e.listenerCount(t)
        }
    }, {}],
    2: [function(e, t, r) {
        function i() {
            c = !1, s.length ? l = s.concat(l) : u = -1, l.length && n()
        }
        function n() {
            if (!c) {
                var e = setTimeout(i);
                c = !0;
                for (var t = l.length; t;) {
                    for (s = l, l = []; ++u < t;) s && s[u].run();
                    u = -1, t = l.length
                }
                s = null, c = !1, clearTimeout(e)
            }
        }
        function o(e, t) {
            this.fun = e, this.array = t
        }
        function a() {}
        var s, h = t.exports = {},
            l = [],
            c = !1,
            u = -1;
        h.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            l.push(new o(e, t)), 1 !== l.length || c || setTimeout(n, 0)
        }, o.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = a, h.addListener = a, h.once = a, h.off = a, h.removeListener = a, h.removeAllListeners = a, h.emit = a, h.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, h.cwd = function() {
            return "/"
        }, h.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, h.umask = function() {
            return 0
        }
    }, {}],
    3: [function(e, t, r) {
        var i = e(4),
            n = e(6);
        t.exports = function(e, t) {
            function r() {
                o();
                var t = e.width,
                    r = e.height;
                s[0] = t / o.scale, s[1] = r / o.scale
            }
            if (!e) throw new TypeError("must specify a canvas element");
            t = t || {};
            var o = i(e, t.parent, t.scale),
                a = n(),
                s = [0, 0];
            return r(), window.addEventListener("resize", function() {
                r(), a.emit("resize")
            }, !1), Object.defineProperties(a, {
                scale: {
                    get: function() {
                        return o.scale
                    },
                    set: function(e) {
                        o.scale = e
                    }
                },
                shape: {
                    get: function() {
                        return s
                    }
                },
                parent: {
                    get: function() {
                        return o.parent
                    },
                    set: function(e) {
                        o.parent = e
                    }
                }
            }), a
        }
    }, {
        4: 4,
        6: 6
    }],
    4: [function(e, t, r) {
        function i(e, t, r) {
            function i() {
                var t = i.parent || e.parentNode;
                if ("function" == typeof t) var r = t(o) || o,
                    s = r[0],
                    h = r[1];
                else if (t && t !== document.body) var l = n(t),
                    s = 0 | l[0],
                    h = 0 | l[1];
                else var s = window.innerWidth,
                        h = window.innerHeight;
                return a ? (e.setAttribute("width", s * i.scale + "px"), e.setAttribute("height", h * i.scale + "px")) : (e.width = s * i.scale, e.height = h * i.scale), e.style.width = s + "px", e.style.height = h + "px", i
            }
            var a = "SVG" === e.nodeName.toUpperCase();
            return e.style.position = e.style.position || "absolute", e.style.top = 0, e.style.left = 0, i.scale = parseFloat(r || 1), i.parent = t, i()
        }
        var n = e(5);
        t.exports = i;
        var o = new Float32Array(2)
    }, {
        5: 5
    }],
    5: [function(e, t, r) {
        function i(e) {
            if (e === window || e === document.body) return [window.innerWidth, window.innerHeight];
            if (!e.parentNode) {
                var t = !0;
                document.body.appendChild(e)
            }
            var r = e.getBoundingClientRect(),
                i = getComputedStyle(e),
                o = (0 | r.height) + n(i.getPropertyValue("margin-top")) + n(i.getPropertyValue("margin-bottom")),
                a = (0 | r.width) + n(i.getPropertyValue("margin-left")) + n(i.getPropertyValue("margin-right"));
            return t && document.body.removeChild(e), [a, o]
        }
        function n(e) {
            return parseFloat(e) || 0
        }
        t.exports = i
    }, {}],
    6: [function(e, t, r) {
        function i(e) {
            return this instanceof i ? (this.running = !1, this.last = a(), this._frame = 0, this._tick = this.tick.bind(this), void(e && this.on("tick", e))) : new i(e)
        }
        var n = e(24),
            o = e(1).EventEmitter,
            a = e(9),
            s = e(7);
        t.exports = i, n(i, o), i.prototype.start = function() {
            return this.running ? void 0 : (this.running = !0, this.last = a(), this._frame = s(this._tick), this)
        }, i.prototype.stop = function() {
            return this.running = !1, 0 !== this._frame && s.cancel(this._frame), this._frame = 0, this
        }, i.prototype.tick = function() {
            this._frame = s(this._tick);
            var e = a(),
                t = e - this.last;
            this.emit("tick", t), this.last = e
        }
    }, {
        1: 1,
        24: 24,
        7: 7,
        9: 9
    }],
    7: [function(e, t, r) {
        for (var i = e(8), n = "undefined" == typeof window ? {} : window, o = ["moz", "webkit"], a = "AnimationFrame", s = n["request" + a], h = n["cancel" + a] || n["cancelRequest" + a], l = 0; l < o.length && !s; l++) s = n[o[l] + "Request" + a], h = n[o[l] + "Cancel" + a] || n[o[l] + "CancelRequest" + a];
        if (!s || !h) {
            var c = 0,
                u = 0,
                f = [],
                p = 1e3 / 60;
            s = function(e) {
                if (0 === f.length) {
                    var t = i(),
                        r = Math.max(0, p - (t - c));
                    c = r + t, setTimeout(function() {
                        var e = f.slice(0);
                        f.length = 0;
                        for (var t = 0; t < e.length; t++)
                            if (!e[t].cancelled) try {
                                e[t].callback(c)
                            } catch (r) {
                                setTimeout(function() {
                                    throw r
                                }, 0)
                            }
                    }, Math.round(r))
                }
                return f.push({
                    handle: ++u,
                    callback: e,
                    cancelled: !1
                }), u
            }, h = function(e) {
                for (var t = 0; t < f.length; t++) f[t].handle === e && (f[t].cancelled = !0)
            }
        }
        t.exports = function(e) {
            return s.call(n, e)
        }, t.exports.cancel = function() {
            h.apply(n, arguments)
        }
    }, {
        8: 8
    }],
    8: [function(e, t, r) {
        (function(e) {
            (function() {
                var r, i, n;
                "undefined" != typeof performance && null !== performance && performance.now ? t.exports = function() {
                    return performance.now()
                } : "undefined" != typeof e && null !== e && e.hrtime ? (t.exports = function() {
                    return (r() - n) / 1e6
                }, i = e.hrtime, r = function() {
                    var e;
                    return e = i(), 1e9 * e[0] + e[1]
                }, n = r()) : Date.now ? (t.exports = function() {
                    return Date.now() - n
                }, n = Date.now()) : (t.exports = function() {
                    return (new Date).getTime() - n
                }, n = (new Date).getTime())
            }).call(this)
        }).call(this, e(2))
    }, {
        2: 2
    }],
    9: [function(e, t, r) {
        (function(e) {
            t.exports = e.performance && e.performance.now ? function() {
                return performance.now()
            } : Date.now || function() {
                return +new Date
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    10: [function(e, t, r) {
        function i(e, t, r) {
            return r > t ? t > e ? t : e > r ? r : e : r > e ? r : e > t ? t : e
        }
        t.exports = i
    }, {}],
    11: [function(e, t, r) {
        function i(e) {
            var t = {
                positions: [],
                cells: []
            };
            return e = e || {}, e.cellSize = e.cellSize || 3, e.x = e.x || 0, e.y = e.y || 0, e.z = e.z || 0, e.startRadian = e.startRadian || 0, e.endRadian = e.endRadian || 1.5 * Math.PI, e.innerRadius = "number" == typeof e.innerRadius ? e.innerRadius : 40, e.outerRadius = e.outerRadius || 200, e.numBands = e.numBands || 2, e.numSlices = e.numSlices || 40, e.drawOutline = void 0 !== e.drawOutline ? e.drawOutline : !0, n(e, t.positions, t.cells), t
        }
        function n(e, t, r) {
            for (var i, n, o, a, s, h, l, c = e, u = c.cellSize, f = c.endRadian - c.startRadian, p = Math.floor(Math.abs(f) / (2 * Math.PI) * c.numSlices), d = f / p, m = (c.outerRadius - c.innerRadius) / c.numBands, v = 0, g = p; g >= v; v++) {
                i = v * d + c.startRadian, l = (v - 1) * c.numBands, h = v * c.numBands;
                for (var y = 0, x = c.numBands; x > y; y++) s = c.innerRadius + m * y, n = Math.cos(i) * s + c.x, o = c.y, a = Math.sin(i) * s + c.z, t.push([n, o, a]), 1 == u ? r.push([h + y]) : 2 == u ? v > 0 && x > y + 1 && (r.push([l + y, h + y]), r.push([h + y + 1, l + y + 1]), c.drawOutline || r.push([h + y, h + y + 1])) : 3 == u && v > 0 && x > y + 1 && (r.push([h + y, l + y + 1, l + y]), r.push([h + y, h + y + 1, l + y + 1]))
            }
            if (2 == u && f % Math.PI * 2 != 0) {
                for (var y = 0, x = c.numBands - 1; x > y; y++) r.push([h + y, h + y + 1]);
                h = 0;
                for (var y = 0, x = c.numBands - 1; x > y; y++) r.push([h + y, h + y + 1])
            }
        }
        t.exports = i
    }, {}],
    12: [function(e, t, r) {
        function i(e) {
            var t = {
                positions: [],
                cells: []
            };
            return e = e || {}, e.cellSize = e.cellSize || 3, e.x = e.x || 0, e.y = e.y || 0, e.z = e.z || 0, e.width = e.width || 100, e.depth = e.depth || 50, e.thickness = e.thickness || 20, n(e, t.positions, t.cells), t
        }
        function n(e, t, r) {
            var i = e,
                n = .5 * i.width,
                o = .5 * i.depth,
                a = i.y,
                s = -o + i.x,
                h = -n + i.z,
                l = s + i.thickness + i.x,
                c = h + i.z,
                u = s,
                f = n,
                p = l,
                d = f,
                m = o,
                v = 0,
                g = o - i.thickness,
                y = 0,
                x = 0,
                _ = 1,
                b = 2,
                w = 3,
                M = 4,
                S = 5;
            t.push([s, a, h]), t.push([l, a, c]), t.push([g, a, y]), t.push([p, a, d]), t.push([u, a, f]), t.push([m, a, v]), 1 == i.cellSize ? r.push([x], [_], [b], [w], [M], [S]) : 2 == i.cellSize ? r.push([x, _], [_, S], [S, w], [w, M], [M, b], [b, x]) : 3 == i.cellSize && r.push([x, _, S], [x, b, S], [M, w, S], [M, b, S])
        }
        t.exports = i
    }, {}],
    13: [function(e, t, r) {
        function i(e) {
            var t = {
                positions: [],
                cells: []
            };
            return e = e || {}, e.cellSize = e.cellSize || 3, e.x = e.x || 0, e.y = e.y || 0, e.z = e.z || 0, e.radius = e.radius || 200, e.pieceSize = e.pieceSize || .15 * Math.PI, e.startRadian = e.startRadian || 0, e.numPieces = e.numPieces || 8, e.quadsPerPiece = e.quadsPerPiece || 5, e.height = e.height || 10, e.drawOutline = void 0 === e.drawOutline ? !0 : e.drawOutline, n(e, t.positions, t.cells), t
        }
        function n(e, t, r) {
            for (var i, n, o, a, s, h, l = e, c = t, u = l.y, f = .5 * l.height, p = l.radius, d = l.pieceSize, m = l.numPieces, v = l.quadsPerPiece, g = l.startRadian, y = (2 * Math.PI - m * d) / m, x = d / v, _ = 0, b = 0, w = 0; m > w; w++) {
                for (var M = 0; v > M; M++) s = _ + x * M + g, h = _ + x * (M + 1) + g, i = Math.cos(s) * p + l.x, n = Math.sin(s) * p + l.z, o = Math.cos(h) * p + l.x, a = Math.sin(h) * p + l.z, c.push([i, u - f, n]), c.push([i, u + f, n]), c.push([o, u + f, a]), c.push([o, u - f, a]), 1 == l.cellSize ? (r.push([b]), r.push([b + 1]), r.push([b + 2]), r.push([b + 3])) : 2 == l.cellSize ? (l.drawOutline ? 0 === M ? r.push([b, b + 1]) : M == v - 1 && r.push([b + 2, b + 3]) : (r.push([b, b + 1]), r.push([b + 2, b + 3])), r.push([b + 1, b + 2]), r.push([b + 3, b])) : 3 == l.cellSize && (r.push([b, b + 1, b + 2]), r.push([b + 3, b, b + 2])), b += 4;
                _ += y + d
            }
        }
        t.exports = i
    }, {}],
    14: [function(e, t, r) {
        function i(e, t) {
            var r = t[0] - e[0],
                i = t[1] - e[1];
            return Math.sqrt(r * r + i * i)
        }
        t.exports = i
    }, {}],
    15: [function(e, t, r) {
        function i(e, t, r) {
            return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e
        }
        t.exports = i
    }, {}],
    16: [function(e, t, r) {
        function i(e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
        }
        t.exports = i
    }, {}],
    17: [function(e, t, r) {
        function i(e, t, r) {
            var i = t[0],
                n = t[1],
                o = t[2],
                a = r[0],
                s = r[1],
                h = r[2];
            return e[0] = n * h - o * s, e[1] = o * a - i * h, e[2] = i * s - n * a, e
        }
        t.exports = i
    }, {}],
    18: [function(e, t, r) {
        function i(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        }
        t.exports = i
    }, {}],
    19: [function(e, t, r) {
        function i(e) {
            var t = e[0],
                r = e[1],
                i = e[2];
            return Math.sqrt(t * t + r * r + i * i)
        }
        t.exports = i
    }, {}],
    20: [function(e, t, r) {
        function i(e, t) {
            var r = t[0],
                i = t[1],
                n = t[2],
                o = r * r + i * i + n * n;
            return o > 0 && (o = 1 / Math.sqrt(o), e[0] = t[0] * o, e[1] = t[1] * o, e[2] = t[2] * o), e
        }
        t.exports = i
    }, {}],
    21: [function(e, t, r) {
        function i(e, t, r, i) {
            return e[0] = t, e[1] = r, e[2] = i, e
        }
        t.exports = i
    }, {}],
    22: [function(e, t, r) {
        function i(e, t, r) {
            return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e
        }
        t.exports = i
    }, {}],
    23: [function(e, t, r) {
        function i(e, t, r) {
            var i = t[0],
                n = t[1],
                o = t[2],
                a = r[0],
                s = r[1],
                h = r[2],
                l = r[3],
                c = l * i + s * o - h * n,
                u = l * n + h * i - a * o,
                f = l * o + a * n - s * i,
                p = -a * i - s * n - h * o;
            return e[0] = c * l + p * -a + u * -h - f * -s, e[1] = u * l + p * -s + f * -a - c * -h, e[2] = f * l + p * -h + c * -s - u * -a, e
        }
        t.exports = i
    }, {}],
    24: [function(e, t, r) {
        "function" == typeof Object.create ? t.exports = function(e, t) {
            e.super_ = t, e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : t.exports = function(e, t) {
            e.super_ = t;
            var r = function() {};
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
        }
    }, {}],
    25: [function(e, t, r) {
        function i(e, t, r) {
            t = t || e.currentTarget || e.srcElement, Array.isArray(r) || (r = [0, 0]);
            var i = e.clientX || 0,
                o = e.clientY || 0,
                a = n(t);
            return r[0] = i - a.left, r[1] = o - a.top, r
        }
        function n(e) {
            return e === window || e === document || e === document.body ? o : e.getBoundingClientRect()
        }
        var o = {
            left: 0,
            top: 0
        };
        t.exports = i
    }, {}],
    26: [function(e, t, r) {
        "use strict";
        function i(e) {
            if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }
        var n = Object.prototype.hasOwnProperty,
            o = Object.prototype.propertyIsEnumerable;
        t.exports = Object.assign || function(e, t) {
            for (var r, a, s = i(e), h = 1; h < arguments.length; h++) {
                r = Object(arguments[h]);
                for (var l in r) n.call(r, l) && (s[l] = r[l]);
                if (Object.getOwnPropertySymbols) {
                    a = Object.getOwnPropertySymbols(r);
                    for (var c = 0; c < a.length; c++) o.call(r, a[c]) && (s[a[c]] = r[a[c]])
                }
            }
            return s
        }
    }, {}],
    27: [function(e, t, r) {
        function i(e) {
            function t(e, t) {
                var r = 2 * Math.PI;
                d[0] -= r * e * y.rotateSpeed, d[1] -= r * t * y.rotateSpeed
            }
            function r(e) {
                d[2] += e * y.zoomSpeed
            }
            function i(e) {
                d[2] -= e * y.pinchSpeed
            }
            function p(e, t, r) {
                var i = r || u;
                h(v, i, u), l(g, v);
                var o = y.distance;
                c.subtract(m, e, y.target), c.transformQuat(m, m, v);
                var s = Math.atan2(m[0], m[2]),
                    p = Math.atan2(Math.sqrt(m[0] * m[0] + m[2] * m[2]), m[1]);
                s += d[0], p += d[1], s = a(s, y.thetaBounds[0], y.thetaBounds[1]), p = a(p, y.phiBounds[0], y.phiBounds[1]), p = a(p, f, Math.PI - f), o += d[2], o = a(o, y.distanceBounds[0], y.distanceBounds[1]);
                var x = Math.abs(o) <= f ? f : o;
                m[0] = x * Math.sin(p) * Math.sin(s), m[1] = x * Math.cos(p), m[2] = x * Math.sin(p) * Math.cos(s), y.phi = p, y.theta = s, y.distance = o, c.transformQuat(m, m, g), c.add(e, y.target, m), n(t, i, e, y.target);
                for (var _ = "number" == typeof y.damping ? y.damping : 1, b = 0; b < d.length; b++) d[b] *= 1 - _
            }
            e = e || {};
            var d = [0, 0, 0],
                m = [0, 0, 0],
                v = [0, 0, 0, 1],
                g = v.slice(),
                y = {
                    update: p,
                    target: e.target || [0, 0, 0],
                    phi: e.phi || 0,
                    theta: e.theta || 0,
                    distance: o(e.distance, 1),
                    damping: o(e.damping, .25),
                    rotateSpeed: o(e.rotateSpeed, .28),
                    zoomSpeed: o(e.zoomSpeed, .0075),
                    pinchSpeed: o(e.pinchSpeed, .0075),
                    pinch: e.pinching !== !1,
                    zoom: e.zoom !== !1,
                    rotate: e.rotate !== !1,
                    phiBounds: e.phiBounds || [0, Math.PI],
                    thetaBounds: e.thetaBounds || [-(1 / 0), 1 / 0],
                    distanceBounds: e.distanceBounds || [1, 1 / 0]
                };
            return s({
                parent: e.parent || window,
                element: e.element,
                rotate: e.rotate !== !1 ? t : null,
                zoom: e.zoom !== !1 ? r : null,
                pinch: e.pinch !== !1 ? i : null
            }), y
        }
        function n(e, t, r, i) {
            c.copy(e, i), c.subtract(e, e, r), c.normalize(e, e)
        }
        var o = e(29),
            a = e(10),
            s = e(28),
            h = e(36),
            l = e(30),
            c = {
                length: e(19),
                add: e(15),
                subtract: e(22),
                transformQuat: e(23),
                copy: e(16),
                normalize: e(20),
                cross: e(17)
            },
            u = [0, 1, 0],
            f = 1e-10;
        t.exports = i
    }, {
        10: 10,
        15: 15,
        16: 16,
        17: 17,
        19: 19,
        20: 20,
        22: 22,
        23: 23,
        28: 28,
        29: 29,
        30: 30,
        36: 36
    }],
    28: [function(e, t, r) {
        function i(e) {
            function t(e) {
                e.preventDefault()
            }
            function r() {
                d.addEventListener("touchmove", function(e) {
                    if (g && !i())
                        for (var t = 0; t < e.changedTouches.length; t++) {
                            var r = e.changedTouches[t],
                                n = p.indexOfTouch(r),
                                o = w ? -1 !== n : 0 === n;
                            if (o) {
                                c(r);
                                break
                            }
                        }
                }), p.on("place", function(e, t) {
                    if (g = !i()) {
                        var r = t || e;
                        h(r)
                    }
                }), p.on("lift", function(e, t) {
                    g = !i(), g && t && o(t, d, v)
                })
            }
            function i() {
                return p.pinching && w
            }
            function s() {
                p.on("change", function(e, t) {
                    w(e - t)
                })
            }
            function h(e) {
                o(e, d, v), u(v) && (g = !0)
            }
            function l() {
                g = !1
            }
            function c(e) {
                var t = o(e, d, y);
                if (p && i()) return void(v = t);
                if (g) {
                    var r = f(x),
                        n = (t[0] - v[0]) / r[0],
                        a = (t[1] - v[1]) / r[1];
                    b(n, a), v[0] = t[0], v[1] = t[1]
                }
            }
            function u(e) {
                if (d === window || d === document || d === document.body) return !0;
                var t = d.getBoundingClientRect();
                return e[0] >= 0 && e[1] >= 0 && e[0] < t.width && e[1] < t.height
            }
            function f(e) {
                var t = d;
                return (t === window || t === document || t === document.body) && (t = document.documentElement), e[0] = t.clientWidth, e[1] = t.clientHeight, e
            }
            var p, d = e.element || window,
                m = e.parent || d,
                v = [0, 0],
                g = !1,
                y = [0, 0],
                x = [0, 0],
                _ = e.zoom,
                b = e.rotate,
                w = e.pinch;
            _ && n(d, function(e, t) {
                _(t)
            }, !0), b && (m.addEventListener("mousedown", h), m.addEventListener("mousemove", c), m.addEventListener("mouseup", l)), (b || w) && (p = a(d), d.addEventListener("touchstart", t), b && r(), w && s())
        }
        var n = e(35),
            o = e(25),
            a = e(37);
        t.exports = i
    }, {
        25: 25,
        35: 35,
        37: 37
    }],
    29: [function(e, t, r) {
        t.exports = function() {
            for (var e = 0; e < arguments.length; e++)
                if (void 0 !== arguments[e]) return arguments[e]
        }
    }, {}],
    30: [function(e, t, r) {
        function i(e, t) {
            var r = t[0],
                i = t[1],
                n = t[2],
                o = t[3],
                a = r * r + i * i + n * n + o * o,
                s = a ? 1 / a : 0;
            return e[0] = -r * s, e[1] = -i * s, e[2] = -n * s, e[3] = o * s, e
        }
        t.exports = i
    }, {}],
    31: [function(e, t, r) {
        function i(e, t) {
            var r = t[0],
                i = t[1],
                n = t[2],
                o = t[3],
                a = r * r + i * i + n * n + o * o;
            return a > 0 && (a = 1 / Math.sqrt(a), e[0] = r * a, e[1] = i * a, e[2] = n * a, e[3] = o * a), e
        }
        t.exports = i
    }, {}],
    32: [function(e, t, r) {
        t.exports = e(31)
    }, {
        31: 31
    }],
    33: [function(e, t, r) {
        t.exports = function(e, t) {
            t || (t = [0, ""]), e = String(e);
            var r = parseFloat(e, 10);
            return t[0] = r, t[1] = e.match(/[\d.\-\+]*\s*(.*)/)[1] || "", t
        }
    }, {}],
    34: [function(e, t, r) {
        "use strict";
        function i(e, t) {
            var r = a(getComputedStyle(e).getPropertyValue(t));
            return r[0] * o(r[1], e)
        }
        function n(e, t) {
            var r = document.createElement("div");
            r.style["font-size"] = "128" + e, t.appendChild(r);
            var n = i(r, "font-size") / 128;
            return t.removeChild(r), n
        }
        function o(e, t) {
            switch (t = t || document.body, e = (e || "px").trim().toLowerCase(), (t === window || t === document) && (t = document.body), e) {
                case "%":
                    return t.clientHeight / 100;
                case "ch":
                case "ex":
                    return n(e, t);
                case "em":
                    return i(t, "font-size");
                case "rem":
                    return i(document.body, "font-size");
                case "vw":
                    return window.innerWidth / 100;
                case "vh":
                    return window.innerHeight / 100;
                case "vmin":
                    return Math.min(window.innerWidth, window.innerHeight) / 100;
                case "vmax":
                    return Math.max(window.innerWidth, window.innerHeight) / 100;
                case "in":
                    return s;
                case "cm":
                    return s / 2.54;
                case "mm":
                    return s / 25.4;
                case "pt":
                    return s / 72;
                case "pc":
                    return s / 6
            }
            return 1
        }
        var a = e(33);
        t.exports = o;
        var s = 96
    }, {
        33: 33
    }],
    35: [function(e, t, r) {
        "use strict";
        function i(e, t, r) {
            "function" == typeof e && (r = !!t, t = e, e = window);
            var i = n("ex", e);
            e.addEventListener("wheel", function(e) {
                r && e.preventDefault();
                var n = e.deltaX || 0,
                    o = e.deltaY || 0,
                    a = e.deltaZ || 0,
                    s = e.deltaMode,
                    h = 1;
                switch (s) {
                    case 1:
                        h = i;
                        break;
                    case 2:
                        h = window.innerHeight
                }
                return n *= h, o *= h, a *= h, n || o || a ? t(n, o, a) : void 0
            })
        }
        var n = e(34);
        t.exports = i
    }, {
        34: 34
    }],
    36: [function(e, t, r) {
        function i(e, t, r) {
            var i = n(t, r) + 1;
            return l > i ? (i = 0, Math.abs(t[0]) > Math.abs(t[2]) ? o(h, -t[1], t[0], 0) : o(h, 0, -t[2], t[1])) : s(h, t, r), e[0] = h[0], e[1] = h[1], e[2] = h[2], e[3] = i, a(e, e), e
        }
        var n = e(18),
            o = e(21),
            a = e(32),
            s = e(17),
            h = [0, 0, 0],
            l = 1e-6;
        t.exports = i
    }, {
        17: 17,
        18: 18,
        21: 21,
        32: 32
    }],
    37: [function(e, t, r) {
        function i(e) {
            function t(e) {
                for (var t = e.identifier, r = 0; r < d.length; r++)
                    if (d[r] && d[r].touch && d[r].touch.identifier === t) return r;
                return -1
            }
            function r() {
                y || (y = !0, e.addEventListener("touchstart", l, !1), e.addEventListener("touchmove", c, !1), e.addEventListener("touchend", u, !1), e.addEventListener("touchcancel", u, !1))
            }
            function i() {
                y && (y = !1, e.removeEventListener("touchstart", l, !1), e.removeEventListener("touchmove", c, !1), e.removeEventListener("touchend", u, !1), e.removeEventListener("touchcancel", u, !1))
            }
            function l(r) {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    var o = r.changedTouches[i],
                        a = o.identifier,
                        s = t(a);
                    if (-1 === s && 2 > m) {
                        var l = 0 === m,
                            c = d[0] ? 1 : 0,
                            u = d[0] ? 0 : 1,
                            y = new n;
                        d[c] = y, m++, y.touch = o, h(o, e, y.position);
                        var x = d[u] ? d[u].touch : void 0;
                        if (p.emit("place", o, x), !l) {
                            var _ = f();
                            g = !1, p.emit("start", _), v = _
                        }
                    }
                }
            }
            function c(r) {
                for (var i = !1, n = 0; n < r.changedTouches.length; n++) {
                    var o = r.changedTouches[n],
                        a = t(o); - 1 !== a && (i = !0, d[a].touch = o, h(o, e, d[a].position))
                }
                if (2 === m && i) {
                    var s = f();
                    p.emit("change", s, v), v = s
                }
            }
            function u(e) {
                for (var r = 0; r < e.changedTouches.length; r++) {
                    var i = e.changedTouches[r],
                        n = t(i);
                    if (-1 !== n) {
                        d[n] = null, m--;
                        var o = 0 === n ? 1 : 0,
                            a = d[o] ? d[o].touch : void 0;
                        p.emit("lift", i, a)
                    }
                }
                g || 2 === m || (g = !0, p.emit("end"))
            }
            function f() {
                return 2 > m ? 0 : o(d[0].position, d[1].position)
            }
            e = e || window;
            var p = new a,
                d = [null, null],
                m = 0,
                v = 0,
                g = !1,
                y = !1;
            return Object.defineProperties(p, {
                pinching: s(function() {
                    return 2 === m
                }),
                fingers: s(function() {
                    return d
                })
            }), r(), p.enable = r, p.disable = i, p.indexOfTouch = t, p
        }
        function n() {
            this.position = [0, 0], this.touch = null
        }
        var o = e(14),
            a = e(1).EventEmitter,
            s = e(38),
            h = e(25);
        t.exports = i
    }, {
        1: 1,
        14: 14,
        25: 25,
        38: 38
    }],
    38: [function(e, t, r) {
        function i(e, t) {
            return {
                configurable: !0,
                enumerable: !0,
                get: e,
                set: t
            }
        }
        t.exports = i
    }, {}],
    39: [function(e, t, r) {
        "use strict";
        t.exports = function(e, t) {
            if (void 0 === t && (t = e, e = 0), "number" != typeof e || "number" != typeof t) throw new TypeError("Expected all arguments to be numbers");
            return Math.random() * (t - e) + e
        }
    }, {}],
    40: [function(e, t, r) {
        var i = e(24);
        t.exports = function(e) {
            function t(r) {
                return this instanceof t ? (e.Geometry.call(this), this.dynamic = !0, void(r && this.update(r))) : new t(r)
            }
            return i(t, e.Geometry), t.prototype._updatePositions = function(t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    r > this.vertices.length - 1 ? this.vertices.push((new e.Vector3).fromArray(i)) : this.vertices[r].fromArray(i)
                }
                this.vertices.length = t.length, this.verticesNeedUpdate = !0
            }, t.prototype._updateCells = function(t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (r > this.faces.length - 1) this.faces.push(new e.Face3(i[0], i[1], i[2]));
                    else {
                        var n = this.faces[r];
                        n.a = i[0], n.b = i[1], n.c = i[2]
                    }
                }
                this.faces.length = t.length, this.elementsNeedUpdate = !0
            }, t.prototype.update = function(e) {
                this._updatePositions(e.positions), this._updateCells(e.cells)
            }, t
        }
    }, {
        24: 24
    }],
    41: [function(e, t, r) {
        var i = i || {},
            n = {
                REVISION: "69"
            };
        "object" == typeof t && (t.exports = n), void 0 === Math.sign && (Math.sign = function(e) {
            return 0 > e ? -1 : e > 0 ? 1 : 0
        }), n.MOUSE = {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
        }, n.CullFaceNone = 0, n.CullFaceBack = 1, n.CullFaceFront = 2, n.CullFaceFrontBack = 3, n.FrontFaceDirectionCW = 0, n.FrontFaceDirectionCCW = 1, n.BasicShadowMap = 0, n.PCFShadowMap = 1, n.PCFSoftShadowMap = 2, n.FrontSide = 0, n.BackSide = 1, n.DoubleSide = 2, n.NoShading = 0, n.FlatShading = 1, n.SmoothShading = 2, n.NoColors = 0, n.FaceColors = 1, n.VertexColors = 2, n.NoBlending = 0, n.NormalBlending = 1, n.AdditiveBlending = 2, n.SubtractiveBlending = 3, n.MultiplyBlending = 4, n.CustomBlending = 5, n.AddEquation = 100, n.SubtractEquation = 101, n.ReverseSubtractEquation = 102, n.MinEquation = 103, n.MaxEquation = 104, n.ZeroFactor = 200, n.OneFactor = 201, n.SrcColorFactor = 202, n.OneMinusSrcColorFactor = 203, n.SrcAlphaFactor = 204, n.OneMinusSrcAlphaFactor = 205, n.DstAlphaFactor = 206, n.OneMinusDstAlphaFactor = 207, n.DstColorFactor = 208, n.OneMinusDstColorFactor = 209, n.SrcAlphaSaturateFactor = 210, n.MultiplyOperation = 0, n.MixOperation = 1, n.AddOperation = 2, n.UVMapping = function() {}, n.CubeReflectionMapping = function() {}, n.CubeRefractionMapping = function() {}, n.SphericalReflectionMapping = function() {}, n.SphericalRefractionMapping = function() {}, n.RepeatWrapping = 1e3, n.ClampToEdgeWrapping = 1001, n.MirroredRepeatWrapping = 1002, n.NearestFilter = 1003, n.NearestMipMapNearestFilter = 1004, n.NearestMipMapLinearFilter = 1005, n.LinearFilter = 1006, n.LinearMipMapNearestFilter = 1007, n.LinearMipMapLinearFilter = 1008, n.UnsignedByteType = 1009, n.ByteType = 1010, n.ShortType = 1011, n.UnsignedShortType = 1012, n.IntType = 1013, n.UnsignedIntType = 1014, n.FloatType = 1015, n.UnsignedShort4444Type = 1016, n.UnsignedShort5551Type = 1017, n.UnsignedShort565Type = 1018, n.AlphaFormat = 1019, n.RGBFormat = 1020, n.RGBAFormat = 1021, n.LuminanceFormat = 1022, n.LuminanceAlphaFormat = 1023, n.RGB_S3TC_DXT1_Format = 2001, n.RGBA_S3TC_DXT1_Format = 2002, n.RGBA_S3TC_DXT3_Format = 2003, n.RGBA_S3TC_DXT5_Format = 2004, n.RGB_PVRTC_4BPPV1_Format = 2100, n.RGB_PVRTC_2BPPV1_Format = 2101, n.RGBA_PVRTC_4BPPV1_Format = 2102, n.RGBA_PVRTC_2BPPV1_Format = 2103, n.Color = function(e) {
            return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(e)
        }, n.Color.prototype = {
            constructor: n.Color,
            r: 1,
            g: 1,
            b: 1,
            set: function(e) {
                return e instanceof n.Color ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
            },
            setHex: function(e) {
                return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this
            },
            setRGB: function(e, t, r) {
                return this.r = e, this.g = t, this.b = r, this
            },
            setHSL: function(e, t, r) {
                if (0 === t) this.r = this.g = this.b = r;
                else {
                    var i = function(e, t, r) {
                            return 0 > r && (r += 1), r > 1 && (r -= 1), 1 / 6 > r ? e + 6 * (t - e) * r : .5 > r ? t : 2 / 3 > r ? e + 6 * (t - e) * (2 / 3 - r) : e
                        },
                        n = .5 >= r ? r * (1 + t) : r + t - r * t,
                        o = 2 * r - n;
                    this.r = i(o, n, e + 1 / 3), this.g = i(o, n, e), this.b = i(o, n, e - 1 / 3)
                }
                return this
            },
            setStyle: function(e) {
                if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(e)) {
                    var t = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(e);
                    return this.r = Math.min(255, parseInt(t[1], 10)) / 255, this.g = Math.min(255, parseInt(t[2], 10)) / 255, this.b = Math.min(255, parseInt(t[3], 10)) / 255, this
                }
                if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(e)) {
                    var t = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(e);
                    return this.r = Math.min(100, parseInt(t[1], 10)) / 100, this.g = Math.min(100, parseInt(t[2], 10)) / 100, this.b = Math.min(100, parseInt(t[3], 10)) / 100, this
                }
                if (/^\#([0-9a-f]{6})$/i.test(e)) {
                    var t = /^\#([0-9a-f]{6})$/i.exec(e);
                    return this.setHex(parseInt(t[1], 16)), this
                }
                if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(e)) {
                    var t = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e);
                    return this.setHex(parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3], 16)), this
                }
                return /^(\w+)$/i.test(e) ? (this.setHex(n.ColorKeywords[e]), this) : void 0
            },
            copy: function(e) {
                return this.r = e.r, this.g = e.g, this.b = e.b, this
            },
            copyGammaToLinear: function(e) {
                return this.r = e.r * e.r, this.g = e.g * e.g, this.b = e.b * e.b, this
            },
            copyLinearToGamma: function(e) {
                return this.r = Math.sqrt(e.r), this.g = Math.sqrt(e.g), this.b = Math.sqrt(e.b), this
            },
            convertGammaToLinear: function() {
                var e = this.r,
                    t = this.g,
                    r = this.b;
                return this.r = e * e, this.g = t * t, this.b = r * r, this
            },
            convertLinearToGamma: function() {
                return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
            },
            getHex: function() {
                return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
            },
            getHexString: function() {
                return ("000000" + this.getHex().toString(16)).slice(-6)
            },
            getHSL: function(e) {
                var t, r, i = e || {
                        h: 0,
                        s: 0,
                        l: 0
                    },
                    n = this.r,
                    o = this.g,
                    a = this.b,
                    s = Math.max(n, o, a),
                    h = Math.min(n, o, a),
                    l = (h + s) / 2;
                if (h === s) t = 0, r = 0;
                else {
                    var c = s - h;
                    switch (r = .5 >= l ? c / (s + h) : c / (2 - s - h), s) {
                        case n:
                            t = (o - a) / c + (a > o ? 6 : 0);
                            break;
                        case o:
                            t = (a - n) / c + 2;
                            break;
                        case a:
                            t = (n - o) / c + 4
                    }
                    t /= 6
                }
                return i.h = t, i.s = r, i.l = l, i
            },
            getStyle: function() {
                return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
            },
            offsetHSL: function(e, t, r) {
                var i = this.getHSL();
                return i.h += e, i.s += t, i.l += r, this.setHSL(i.h, i.s, i.l), this
            },
            add: function(e) {
                return this.r += e.r, this.g += e.g, this.b += e.b, this
            },
            addColors: function(e, t) {
                return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
            },
            addScalar: function(e) {
                return this.r += e, this.g += e, this.b += e, this
            },
            multiply: function(e) {
                return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
            },
            multiplyScalar: function(e) {
                return this.r *= e, this.g *= e, this.b *= e, this
            },
            lerp: function(e, t) {
                return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
            },
            equals: function(e) {
                return e.r === this.r && e.g === this.g && e.b === this.b
            },
            fromArray: function(e) {
                return this.r = e[0], this.g = e[1], this.b = e[2], this
            },
            toArray: function() {
                return [this.r, this.g, this.b]
            },
            clone: function() {
                return (new n.Color).setRGB(this.r, this.g, this.b)
            }
        }, n.ColorKeywords = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        }, n.Quaternion = function(e, t, r, i) {
            this._x = e || 0, this._y = t || 0, this._z = r || 0, this._w = void 0 !== i ? i : 1
        }, n.Quaternion.prototype = {
            constructor: n.Quaternion,
            _x: 0,
            _y: 0,
            _z: 0,
            _w: 0,
            get x() {
                return this._x
            },
            set x(e) {
                this._x = e, this.onChangeCallback()
            },
            get y() {
                return this._y
            },
            set y(e) {
                this._y = e, this.onChangeCallback()
            },
            get z() {
                return this._z
            },
            set z(e) {
                this._z = e, this.onChangeCallback()
            },
            get w() {
                return this._w
            },
            set w(e) {
                this._w = e, this.onChangeCallback()
            },
            set: function(e, t, r, i) {
                return this._x = e, this._y = t, this._z = r, this._w = i, this.onChangeCallback(), this
            },
            copy: function(e) {
                return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this.onChangeCallback(), this
            },
            setFromEuler: function(e, t) {
                if (e instanceof n.Euler == !1) throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                var r = Math.cos(e._x / 2),
                    i = Math.cos(e._y / 2),
                    o = Math.cos(e._z / 2),
                    a = Math.sin(e._x / 2),
                    s = Math.sin(e._y / 2),
                    h = Math.sin(e._z / 2);
                return "XYZ" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o - a * s * h) : "YXZ" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o + a * s * h) : "ZXY" === e.order ? (this._x = a * i * o - r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o - a * s * h) : "ZYX" === e.order ? (this._x = a * i * o - r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o + a * s * h) : "YZX" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o - a * s * h) : "XZY" === e.order && (this._x = a * i * o - r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o + a * s * h), t !== !1 && this.onChangeCallback(), this
            },
            setFromAxisAngle: function(e, t) {
                var r = t / 2,
                    i = Math.sin(r);
                return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(r), this.onChangeCallback(),
                    this
            },
            setFromRotationMatrix: function(e) {
                var t, r = e.elements,
                    i = r[0],
                    n = r[4],
                    o = r[8],
                    a = r[1],
                    s = r[5],
                    h = r[9],
                    l = r[2],
                    c = r[6],
                    u = r[10],
                    f = i + s + u;
                return f > 0 ? (t = .5 / Math.sqrt(f + 1), this._w = .25 / t, this._x = (c - h) * t, this._y = (o - l) * t, this._z = (a - n) * t) : i > s && i > u ? (t = 2 * Math.sqrt(1 + i - s - u), this._w = (c - h) / t, this._x = .25 * t, this._y = (n + a) / t, this._z = (o + l) / t) : s > u ? (t = 2 * Math.sqrt(1 + s - i - u), this._w = (o - l) / t, this._x = (n + a) / t, this._y = .25 * t, this._z = (h + c) / t) : (t = 2 * Math.sqrt(1 + u - i - s), this._w = (a - n) / t, this._x = (o + l) / t, this._y = (h + c) / t, this._z = .25 * t), this.onChangeCallback(), this
            },
            setFromUnitVectors: function() {
                var e, t, r = 1e-6;
                return function(i, o) {
                    return void 0 === e && (e = new n.Vector3), t = i.dot(o) + 1, r > t ? (t = 0, Math.abs(i.x) > Math.abs(i.z) ? e.set(-i.y, i.x, 0) : e.set(0, -i.z, i.y)) : e.crossVectors(i, o), this._x = e.x, this._y = e.y, this._z = e.z, this._w = t, this.normalize(), this
                }
            }(),
            inverse: function() {
                return this.conjugate().normalize(), this
            },
            conjugate: function() {
                return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
            },
            dot: function(e) {
                return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
            },
            lengthSq: function() {
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
            },
            length: function() {
                return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
            },
            normalize: function() {
                var e = this.length();
                return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this.onChangeCallback(), this
            },
            multiply: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
            },
            multiplyQuaternions: function(e, t) {
                var r = e._x,
                    i = e._y,
                    n = e._z,
                    o = e._w,
                    a = t._x,
                    s = t._y,
                    h = t._z,
                    l = t._w;
                return this._x = r * l + o * a + i * h - n * s, this._y = i * l + o * s + n * a - r * h, this._z = n * l + o * h + r * s - i * a, this._w = o * l - r * a - i * s - n * h, this.onChangeCallback(), this
            },
            multiplyVector3: function(e) {
                return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), e.applyQuaternion(this)
            },
            slerp: function(e, t) {
                if (0 === t) return this;
                if (1 === t) return this.copy(e);
                var r = this._x,
                    i = this._y,
                    n = this._z,
                    o = this._w,
                    a = o * e._w + r * e._x + i * e._y + n * e._z;
                if (0 > a ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1) return this._w = o, this._x = r, this._y = i, this._z = n, this;
                var s = Math.acos(a),
                    h = Math.sqrt(1 - a * a);
                if (Math.abs(h) < .001) return this._w = .5 * (o + this._w), this._x = .5 * (r + this._x), this._y = .5 * (i + this._y), this._z = .5 * (n + this._z), this;
                var l = Math.sin((1 - t) * s) / h,
                    c = Math.sin(t * s) / h;
                return this._w = o * l + this._w * c, this._x = r * l + this._x * c, this._y = i * l + this._y * c, this._z = n * l + this._z * c, this.onChangeCallback(), this
            },
            equals: function(e) {
                return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this.onChangeCallback(), this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
            },
            onChange: function(e) {
                return this.onChangeCallback = e, this
            },
            onChangeCallback: function() {},
            clone: function() {
                return new n.Quaternion(this._x, this._y, this._z, this._w)
            }
        }, n.Quaternion.slerp = function(e, t, r, i) {
            return r.copy(e).slerp(t, i)
        }, n.Vector2 = function(e, t) {
            this.x = e || 0, this.y = t || 0
        }, n.Vector2.prototype = {
            constructor: n.Vector2,
            set: function(e, t) {
                return this.x = e, this.y = t, this
            },
            setX: function(e) {
                return this.x = e, this
            },
            setY: function(e) {
                return this.y = e, this
            },
            setComponent: function(e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            getComponent: function(e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            copy: function(e) {
                return this.x = e.x, this.y = e.y, this
            },
            add: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
            },
            addVectors: function(e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this
            },
            addScalar: function(e) {
                return this.x += e, this.y += e, this
            },
            sub: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
            },
            subVectors: function(e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this
            },
            multiply: function(e) {
                return this.x *= e.x, this.y *= e.y, this
            },
            multiplyScalar: function(e) {
                return this.x *= e, this.y *= e, this
            },
            divide: function(e) {
                return this.x /= e.x, this.y /= e.y, this
            },
            divideScalar: function(e) {
                if (0 !== e) {
                    var t = 1 / e;
                    this.x *= t, this.y *= t
                } else this.x = 0, this.y = 0;
                return this
            },
            min: function(e) {
                return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this
            },
            max: function(e) {
                return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this
            },
            clamp: function(e, t) {
                return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this
            },
            clampScalar: function() {
                var e, t;
                return function(r, i) {
                    return void 0 === e && (e = new n.Vector2, t = new n.Vector2), e.set(r, r), t.set(i, i), this.clamp(e, t)
                }
            }(),
            floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
            },
            ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
            },
            round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this
            },
            roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
            },
            negate: function() {
                return this.x = -this.x, this.y = -this.y, this
            },
            dot: function(e) {
                return this.x * e.x + this.y * e.y
            },
            lengthSq: function() {
                return this.x * this.x + this.y * this.y
            },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            distanceTo: function(e) {
                return Math.sqrt(this.distanceToSquared(e))
            },
            distanceToSquared: function(e) {
                var t = this.x - e.x,
                    r = this.y - e.y;
                return t * t + r * r
            },
            setLength: function(e) {
                var t = this.length();
                return 0 !== t && e !== t && this.multiplyScalar(e / t), this
            },
            lerp: function(e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
            },
            equals: function(e) {
                return e.x === this.x && e.y === this.y
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e
            },
            clone: function() {
                return new n.Vector2(this.x, this.y)
            }
        }, n.Vector3 = function(e, t, r) {
            this.x = e || 0, this.y = t || 0, this.z = r || 0
        }, n.Vector3.prototype = {
            constructor: n.Vector3,
            set: function(e, t, r) {
                return this.x = e, this.y = t, this.z = r, this
            },
            setX: function(e) {
                return this.x = e, this
            },
            setY: function(e) {
                return this.y = e, this
            },
            setZ: function(e) {
                return this.z = e, this
            },
            setComponent: function(e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    case 2:
                        this.z = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            getComponent: function(e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            copy: function(e) {
                return this.x = e.x, this.y = e.y, this.z = e.z, this
            },
            add: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
            },
            addScalar: function(e) {
                return this.x += e, this.y += e, this.z += e, this
            },
            addVectors: function(e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
            },
            sub: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
            },
            subVectors: function(e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
            },
            multiply: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
            },
            multiplyScalar: function(e) {
                return this.x *= e, this.y *= e, this.z *= e, this
            },
            multiplyVectors: function(e, t) {
                return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
            },
            applyEuler: function() {
                var e;
                return function(t) {
                    return t instanceof n.Euler == !1 && console.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."), void 0 === e && (e = new n.Quaternion), this.applyQuaternion(e.setFromEuler(t)), this
                }
            }(),
            applyAxisAngle: function() {
                var e;
                return function(t, r) {
                    return void 0 === e && (e = new n.Quaternion), this.applyQuaternion(e.setFromAxisAngle(t, r)), this
                }
            }(),
            applyMatrix3: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements;
                return this.x = n[0] * t + n[3] * r + n[6] * i, this.y = n[1] * t + n[4] * r + n[7] * i, this.z = n[2] * t + n[5] * r + n[8] * i, this
            },
            applyMatrix4: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements;
                return this.x = n[0] * t + n[4] * r + n[8] * i + n[12], this.y = n[1] * t + n[5] * r + n[9] * i + n[13], this.z = n[2] * t + n[6] * r + n[10] * i + n[14], this
            },
            applyProjection: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements,
                    o = 1 / (n[3] * t + n[7] * r + n[11] * i + n[15]);
                return this.x = (n[0] * t + n[4] * r + n[8] * i + n[12]) * o, this.y = (n[1] * t + n[5] * r + n[9] * i + n[13]) * o, this.z = (n[2] * t + n[6] * r + n[10] * i + n[14]) * o, this
            },
            applyQuaternion: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.x,
                    o = e.y,
                    a = e.z,
                    s = e.w,
                    h = s * t + o * i - a * r,
                    l = s * r + a * t - n * i,
                    c = s * i + n * r - o * t,
                    u = -n * t - o * r - a * i;
                return this.x = h * s + u * -n + l * -a - c * -o, this.y = l * s + u * -o + c * -n - h * -a, this.z = c * s + u * -a + h * -o - l * -n, this
            },
            project: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Matrix4), e.multiplyMatrices(t.projectionMatrix, e.getInverse(t.matrixWorld)), this.applyProjection(e)
                }
            }(),
            unproject: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Matrix4), e.multiplyMatrices(t.matrixWorld, e.getInverse(t.projectionMatrix)), this.applyProjection(e)
                }
            }(),
            transformDirection: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = e.elements;
                return this.x = n[0] * t + n[4] * r + n[8] * i, this.y = n[1] * t + n[5] * r + n[9] * i, this.z = n[2] * t + n[6] * r + n[10] * i, this.normalize(), this
            },
            divide: function(e) {
                return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
            },
            divideScalar: function(e) {
                if (0 !== e) {
                    var t = 1 / e;
                    this.x *= t, this.y *= t, this.z *= t
                } else this.x = 0, this.y = 0, this.z = 0;
                return this
            },
            min: function(e) {
                return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this
            },
            max: function(e) {
                return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this
            },
            clamp: function(e, t) {
                return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this
            },
            clampScalar: function() {
                var e, t;
                return function(r, i) {
                    return void 0 === e && (e = new n.Vector3, t = new n.Vector3), e.set(r, r, r), t.set(i, i, i), this.clamp(e, t)
                }
            }(),
            floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
            },
            ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
            },
            round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
            },
            roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
            },
            negate: function() {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
            },
            dot: function(e) {
                return this.x * e.x + this.y * e.y + this.z * e.z
            },
            lengthSq: function() {
                return this.x * this.x + this.y * this.y + this.z * this.z
            },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
            },
            lengthManhattan: function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            setLength: function(e) {
                var t = this.length();
                return 0 !== t && e !== t && this.multiplyScalar(e / t), this
            },
            lerp: function(e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
            },
            cross: function(e, t) {
                if (void 0 !== t) return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t);
                var r = this.x,
                    i = this.y,
                    n = this.z;
                return this.x = i * e.z - n * e.y, this.y = n * e.x - r * e.z, this.z = r * e.y - i * e.x, this
            },
            crossVectors: function(e, t) {
                var r = e.x,
                    i = e.y,
                    n = e.z,
                    o = t.x,
                    a = t.y,
                    s = t.z;
                return this.x = i * s - n * a, this.y = n * o - r * s, this.z = r * a - i * o, this
            },
            projectOnVector: function() {
                var e, t;
                return function(r) {
                    return void 0 === e && (e = new n.Vector3), e.copy(r).normalize(), t = this.dot(e), this.copy(e).multiplyScalar(t)
                }
            }(),
            projectOnPlane: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Vector3), e.copy(this).projectOnVector(t), this.sub(e)
                }
            }(),
            reflect: function() {
                var e;
                return function(t) {
                    return void 0 === e && (e = new n.Vector3), this.sub(e.copy(t).multiplyScalar(2 * this.dot(t)))
                }
            }(),
            angleTo: function(e) {
                var t = this.dot(e) / (this.length() * e.length());
                return Math.acos(n.Math.clamp(t, -1, 1))
            },
            distanceTo: function(e) {
                return Math.sqrt(this.distanceToSquared(e))
            },
            distanceToSquared: function(e) {
                var t = this.x - e.x,
                    r = this.y - e.y,
                    i = this.z - e.z;
                return t * t + r * r + i * i
            },
            setEulerFromRotationMatrix: function(e, t) {
                console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
            },
            setEulerFromQuaternion: function(e, t) {
                console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
            },
            getPositionFromMatrix: function(e) {
                return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(e)
            },
            getScaleFromMatrix: function(e) {
                return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(e)
            },
            getColumnFromMatrix: function(e, t) {
                return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
            },
            setFromMatrixPosition: function(e) {
                return this.x = e.elements[12], this.y = e.elements[13], this.z = e.elements[14], this
            },
            setFromMatrixScale: function(e) {
                var t = this.set(e.elements[0], e.elements[1], e.elements[2]).length(),
                    r = this.set(e.elements[4], e.elements[5], e.elements[6]).length(),
                    i = this.set(e.elements[8], e.elements[9], e.elements[10]).length();
                return this.x = t, this.y = r, this.z = i, this
            },
            setFromMatrixColumn: function(e, t) {
                var r = 4 * e,
                    i = t.elements;
                return this.x = i[r], this.y = i[r + 1], this.z = i[r + 2], this
            },
            equals: function(e) {
                return e.x === this.x && e.y === this.y && e.z === this.z
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
            },
            clone: function() {
                return new n.Vector3(this.x, this.y, this.z)
            }
        }, n.Vector4 = function(e, t, r, i) {
            this.x = e || 0, this.y = t || 0, this.z = r || 0, this.w = void 0 !== i ? i : 1
        }, n.Vector4.prototype = {
            constructor: n.Vector4,
            set: function(e, t, r, i) {
                return this.x = e, this.y = t, this.z = r, this.w = i, this
            },
            setX: function(e) {
                return this.x = e, this
            },
            setY: function(e) {
                return this.y = e, this
            },
            setZ: function(e) {
                return this.z = e, this
            },
            setW: function(e) {
                return this.w = e, this
            },
            setComponent: function(e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    case 2:
                        this.z = t;
                        break;
                    case 3:
                        this.w = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            getComponent: function(e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    case 3:
                        return this.w;
                    default:
                        throw new Error("index is out of range: " + e)
                }
            },
            copy: function(e) {
                return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
            },
            add: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
            },
            addScalar: function(e) {
                return this.x += e, this.y += e, this.z += e, this.w += e, this
            },
            addVectors: function(e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
            },
            sub: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
            },
            subVectors: function(e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
            },
            multiplyScalar: function(e) {
                return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
            },
            applyMatrix4: function(e) {
                var t = this.x,
                    r = this.y,
                    i = this.z,
                    n = this.w,
                    o = e.elements;
                return this.x = o[0] * t + o[4] * r + o[8] * i + o[12] * n, this.y = o[1] * t + o[5] * r + o[9] * i + o[13] * n, this.z = o[2] * t + o[6] * r + o[10] * i + o[14] * n, this.w = o[3] * t + o[7] * r + o[11] * i + o[15] * n, this
            },
            divideScalar: function(e) {
                if (0 !== e) {
                    var t = 1 / e;
                    this.x *= t, this.y *= t, this.z *= t, this.w *= t
                } else this.x = 0, this.y = 0, this.z = 0, this.w = 1;
                return this
            },
            setAxisAngleFromQuaternion: function(e) {
                this.w = 2 * Math.acos(e.w);
                var t = Math.sqrt(1 - e.w * e.w);
                return 1e-4 > t ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
            },
            setAxisAngleFromRotationMatrix: function(e) {
                var t, r, i, n, o = .01,
                    a = .1,
                    s = e.elements,
                    h = s[0],
                    l = s[4],
                    c = s[8],
                    u = s[1],
                    f = s[5],
                    p = s[9],
                    d = s[2],
                    m = s[6],
                    v = s[10];
                if (Math.abs(l - u) < o && Math.abs(c - d) < o && Math.abs(p - m) < o) {
                    if (Math.abs(l + u) < a && Math.abs(c + d) < a && Math.abs(p + m) < a && Math.abs(h + f + v - 3) < a) return this.set(1, 0, 0, 0), this;
                    t = Math.PI;
                    var g = (h + 1) / 2,
                        y = (f + 1) / 2,
                        x = (v + 1) / 2,
                        _ = (l + u) / 4,
                        b = (c + d) / 4,
                        w = (p + m) / 4;
                    return g > y && g > x ? o > g ? (r = 0, i = .707106781, n = .707106781) : (r = Math.sqrt(g), i = _ / r, n = b / r) : y > x ? o > y ? (r = .707106781, i = 0, n = .707106781) : (i = Math.sqrt(y), r = _ / i, n = w / i) : o > x ? (r = .707106781, i = .707106781, n = 0) : (n = Math.sqrt(x), r = b / n, i = w / n), this.set(r, i, n, t), this
                }
                var M = Math.sqrt((m - p) * (m - p) + (c - d) * (c - d) + (u - l) * (u - l));
                return Math.abs(M) < .001 && (M = 1), this.x = (m - p) / M, this.y = (c - d) / M, this.z = (u - l) / M, this.w = Math.acos((h + f + v - 1) / 2), this
            },
            min: function(e) {
                return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this.w > e.w && (this.w = e.w), this
            },
            max: function(e) {
                return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this.w < e.w && (this.w = e.w), this
            },
            clamp: function(e, t) {
                return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this.w < e.w ? this.w = e.w : this.w > t.w && (this.w = t.w), this
            },
            clampScalar: function() {
                var e, t;
                return function(r, i) {
                    return void 0 === e && (e = new n.Vector4, t = new n.Vector4), e.set(r, r, r, r), t.set(i, i, i, i), this.clamp(e, t)
                }
            }(),
            floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
            },
            ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
            },
            round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
            },
            roundToZero: function() {
                return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
            },
            negate: function() {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
            },
            dot: function(e) {
                return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
            },
            lengthSq: function() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
            },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
            },
            lengthManhattan: function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            setLength: function(e) {
                var t = this.length();
                return 0 !== t && e !== t && this.multiplyScalar(e / t), this
            },
            lerp: function(e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
            },
            equals: function(e) {
                return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
            },
            fromArray: function(e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
            },
            toArray: function(e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
            },
            clone: function() {
                return new n.Vector4(this.x, this.y, this.z, this.w)
            }
        }, n.Euler = function(e, t, r, i) {
            this._x = e || 0, this._y = t || 0, this._z = r || 0, this._order = i || n.Euler.DefaultOrder
        }, n.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], n.Euler.DefaultOrder = "XYZ", n.Euler.prototype = {
            constructor: n.Euler,
            _x: 0,
            _y: 0,
            _z: 0,
            _order: n.Euler.DefaultOrder,
            get x() {
                return this._x
            },
            set x(e) {
                this._x = e, this.onChangeCallback()
            },
            get y() {
                return this._y
            },
            set y(e) {
                this._y = e, this.onChangeCallback()
            },
            get z() {
                return this._z
            },
            set z(e) {
                this._z = e, this.onChangeCallback()
            },
            get order() {
                return this._order
            },
            set order(e) {
                this._order = e, this.onChangeCallback()
            },
            set: function(e, t, r, i) {
                return this._x = e, this._y = t, this._z = r, this._order = i || this._order, this.onChangeCallback(), this
            },
            copy: function(e) {
                return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this.onChangeCallback(), this
            },
            setFromRotationMatrix: function(e, t) {
                var r = n.Math.clamp,
                    i = e.elements,
                    o = i[0],
                    a = i[4],
                    s = i[8],
                    h = i[1],
                    l = i[5],
                    c = i[9],
                    u = i[2],
                    f = i[6],
                    p = i[10];
                return t = t || this._order, "XYZ" === t ? (this._y = Math.asin(r(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(-c, p), this._z = Math.atan2(-a, o)) : (this._x = Math.atan2(f, l), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-r(c, -1, 1)), Math.abs(c) < .99999 ? (this._y = Math.atan2(s, p), this._z = Math.atan2(h, l)) : (this._y = Math.atan2(-u, o), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(r(f, -1, 1)), Math.abs(f) < .99999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(h, o))) : "ZYX" === t ? (this._y = Math.asin(-r(u, -1, 1)), Math.abs(u) < .99999 ? (this._x = Math.atan2(f, p), this._z = Math.atan2(h, o)) : (this._x = 0, this._z = Math.atan2(-a, l))) : "YZX" === t ? (this._z = Math.asin(r(h, -1, 1)), Math.abs(h) < .99999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-u, o)) : (this._x = 0, this._y = Math.atan2(s, p))) : "XZY" === t ? (this._z = Math.asin(-r(a, -1, 1)), Math.abs(a) < .99999 ? (this._x = Math.atan2(f, l), this._y = Math.atan2(s, o)) : (this._x = Math.atan2(-c, p), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, this.onChangeCallback(), this
            },
            setFromQuaternion: function(e, t, r) {
                var i = n.Math.clamp,
                    o = e.x * e.x,
                    a = e.y * e.y,
                    s = e.z * e.z,
                    h = e.w * e.w;
                return t = t || this._order, "XYZ" === t ? (this._x = Math.atan2(2 * (e.x * e.w - e.y * e.z), h - o - a + s), this._y = Math.asin(i(2 * (e.x * e.z + e.y * e.w), -1, 1)), this._z = Math.atan2(2 * (e.z * e.w - e.x * e.y), h + o - a - s)) : "YXZ" === t ? (this._x = Math.asin(i(2 * (e.x * e.w - e.y * e.z), -1, 1)), this._y = Math.atan2(2 * (e.x * e.z + e.y * e.w), h - o - a + s), this._z = Math.atan2(2 * (e.x * e.y + e.z * e.w), h - o + a - s)) : "ZXY" === t ? (this._x = Math.asin(i(2 * (e.x * e.w + e.y * e.z), -1, 1)), this._y = Math.atan2(2 * (e.y * e.w - e.z * e.x), h - o - a + s), this._z = Math.atan2(2 * (e.z * e.w - e.x * e.y), h - o + a - s)) : "ZYX" === t ? (this._x = Math.atan2(2 * (e.x * e.w + e.z * e.y), h - o - a + s), this._y = Math.asin(i(2 * (e.y * e.w - e.x * e.z), -1, 1)), this._z = Math.atan2(2 * (e.x * e.y + e.z * e.w), h + o - a - s)) : "YZX" === t ? (this._x = Math.atan2(2 * (e.x * e.w - e.z * e.y), h - o + a - s), this._y = Math.atan2(2 * (e.y * e.w - e.x * e.z), h + o - a - s), this._z = Math.asin(i(2 * (e.x * e.y + e.z * e.w), -1, 1))) : "XZY" === t ? (this._x = Math.atan2(2 * (e.x * e.w + e.y * e.z), h - o + a - s), this._y = Math.atan2(2 * (e.x * e.z + e.y * e.w), h + o - a - s), this._z = Math.asin(i(2 * (e.z * e.w - e.x * e.y), -1, 1))) : console.warn("THREE.Euler: .setFromQuaternion() given unsupported order: " + t), this._order = t, r !== !1 && this.onChangeCallback(), this
            },
            reorder: function() {
                var e = new n.Quaternion;
                return function(t) {
                    e.setFromEuler(this), this.setFromQuaternion(e, t)
                }
            }(),
            equals: function(e) {
                return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
            },
            fromArray: function(e) {
                return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this.onChangeCallback(), this
            },
            toArray: function() {
                return [this._x, this._y, this._z, this._order]
            },
            onChange: function(e) {
                return this.onChangeCallback = e, this
            },
            onChangeCallback: function() {},
            clone: function() {
                return new n.Euler(this._x, this._y, this._z, this._order)
            }
        }, n.Line3 = function(e, t) {
            this.start = void 0 !== e ? e : new n.Vector3, this.end = void 0 !== t ? t : new n.Vector3
        }, n.Line3.prototype = {
            constructor: n.Line3,
            set: function(e, t) {
                return this.start.copy(e), this.end.copy(t), this
            },
            copy: function(e) {
                return this.start.copy(e.start), this.end.copy(e.end), this
            },
            center: function(e) {
                var t = e || new n.Vector3;
                return t.addVectors(this.start, this.end).multiplyScalar(.5)
            },
            delta: function(e) {
                var t = e || new n.Vector3;
                return t.subVectors(this.end, this.start)
            },
            distanceSq: function() {
                return this.start.distanceToSquared(this.end)
            },
            distance: function() {
                return this.start.distanceTo(this.end)
            },
            at: function(e, t) {
                var r = t || new n.Vector3;
                return this.delta(r).multiplyScalar(e).add(this.start)
            },
            closestPointToPointParameter: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r, i) {
                    e.subVectors(r, this.start), t.subVectors(this.end, this.start);
                    var o = t.dot(t),
                        a = t.dot(e),
                        s = a / o;
                    return i && (s = n.Math.clamp(s, 0, 1)), s
                }
            }(),
            closestPointToPoint: function(e, t, r) {
                var i = this.closestPointToPointParameter(e, t),
                    o = r || new n.Vector3;
                return this.delta(o).multiplyScalar(i).add(this.start)
            },
            applyMatrix4: function(e) {
                return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this
            },
            equals: function(e) {
                return e.start.equals(this.start) && e.end.equals(this.end)
            },
            clone: function() {
                return (new n.Line3).copy(this)
            }
        }, n.Box2 = function(e, t) {
            this.min = void 0 !== e ? e : new n.Vector2(1 / 0, 1 / 0), this.max = void 0 !== t ? t : new n.Vector2(-(1 / 0), -(1 / 0))
        }, n.Box2.prototype = {
            constructor: n.Box2,
            set: function(e, t) {
                return this.min.copy(e), this.max.copy(t), this
            },
            setFromPoints: function(e) {
                this.makeEmpty();
                for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
                return this
            },
            setFromCenterAndSize: function() {
                var e = new n.Vector2;
                return function(t, r) {
                    var i = e.copy(r).multiplyScalar(.5);
                    return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
                }
            }(),
            copy: function(e) {
                return this.min.copy(e.min), this.max.copy(e.max), this
            },
            makeEmpty: function() {
                return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -(1 / 0), this
            },
            empty: function() {
                return this.max.x < this.min.x || this.max.y < this.min.y
            },
            center: function(e) {
                var t = e || new n.Vector2;
                return t.addVectors(this.min, this.max).multiplyScalar(.5)
            },
            size: function(e) {
                var t = e || new n.Vector2;
                return t.subVectors(this.max, this.min)
            },
            expandByPoint: function(e) {
                return this.min.min(e), this.max.max(e), this
            },
            expandByVector: function(e) {
                return this.min.sub(e), this.max.add(e), this
            },
            expandByScalar: function(e) {
                return this.min.addScalar(-e), this.max.addScalar(e), this
            },
            containsPoint: function(e) {
                return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y ? !1 : !0
            },
            containsBox: function(e) {
                return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y ? !0 : !1
            },
            getParameter: function(e, t) {
                var r = t || new n.Vector2;
                return r.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y))
            },
            isIntersectionBox: function(e) {
                return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y ? !1 : !0
            },
            clampPoint: function(e, t) {
                var r = t || new n.Vector2;
                return r.copy(e).clamp(this.min, this.max)
            },
            distanceToPoint: function() {
                var e = new n.Vector2;
                return function(t) {
                    var r = e.copy(t).clamp(this.min, this.max);
                    return r.sub(t).length()
                }
            }(),
            intersect: function(e) {
                return this.min.max(e.min), this.max.min(e.max), this
            },
            union: function(e) {
                return this.min.min(e.min), this.max.max(e.max), this
            },
            translate: function(e) {
                return this.min.add(e), this.max.add(e), this
            },
            equals: function(e) {
                return e.min.equals(this.min) && e.max.equals(this.max)
            },
            clone: function() {
                return (new n.Box2).copy(this)
            }
        }, n.Box3 = function(e, t) {
            this.min = void 0 !== e ? e : new n.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== t ? t : new n.Vector3(-(1 / 0), -(1 / 0), -(1 / 0))
        }, n.Box3.prototype = {
            constructor: n.Box3,
            set: function(e, t) {
                return this.min.copy(e), this.max.copy(t), this
            },
            setFromPoints: function(e) {
                this.makeEmpty();
                for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
                return this
            },
            setFromCenterAndSize: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    var i = e.copy(r).multiplyScalar(.5);
                    return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
                }
            }(),
            setFromObject: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = this;
                    return t.updateMatrixWorld(!0), this.makeEmpty(), t.traverse(function(t) {
                        var i = t.geometry;
                        if (void 0 !== i)
                            if (i instanceof n.Geometry)
                                for (var o = i.vertices, a = 0, s = o.length; s > a; a++) e.copy(o[a]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e);
                            else if (i instanceof n.BufferGeometry && void 0 !== i.attributes.position)
                                for (var h = i.attributes.position.array, a = 0, s = h.length; s > a; a += 3) e.set(h[a], h[a + 1], h[a + 2]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e)
                    }), this
                }
            }(),
            copy: function(e) {
                return this.min.copy(e.min), this.max.copy(e.max), this
            },
            makeEmpty: function() {
                return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -(1 / 0), this
            },
            empty: function() {
                return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
            },
            center: function(e) {
                var t = e || new n.Vector3;
                return t.addVectors(this.min, this.max).multiplyScalar(.5)
            },
            size: function(e) {
                var t = e || new n.Vector3;
                return t.subVectors(this.max, this.min)
            },
            expandByPoint: function(e) {
                return this.min.min(e), this.max.max(e), this
            },
            expandByVector: function(e) {
                return this.min.sub(e), this.max.add(e), this
            },
            expandByScalar: function(e) {
                return this.min.addScalar(-e), this.max.addScalar(e), this
            },
            containsPoint: function(e) {
                return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z ? !1 : !0
            },
            containsBox: function(e) {
                return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z ? !0 : !1
            },
            getParameter: function(e, t) {
                var r = t || new n.Vector3;
                return r.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
            },
            isIntersectionBox: function(e) {
                return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z ? !1 : !0
            },
            clampPoint: function(e, t) {
                var r = t || new n.Vector3;
                return r.copy(e).clamp(this.min, this.max)
            },
            distanceToPoint: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = e.copy(t).clamp(this.min, this.max);
                    return r.sub(t).length()
                }
            }(),
            getBoundingSphere: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = t || new n.Sphere;
                    return r.center = this.center(), r.radius = .5 * this.size(e).length(), r
                }
            }(),
            intersect: function(e) {
                return this.min.max(e.min), this.max.min(e.max), this
            },
            union: function(e) {
                return this.min.min(e.min), this.max.max(e.max), this
            },
            applyMatrix4: function() {
                var e = [new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3];
                return function(t) {
                    return e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.makeEmpty(), this.setFromPoints(e), this
                }
            }(),
            translate: function(e) {
                return this.min.add(e), this.max.add(e), this
            },
            equals: function(e) {
                return e.min.equals(this.min) && e.max.equals(this.max)
            },
            clone: function() {
                return (new n.Box3).copy(this)
            }
        }, n.Matrix3 = function() {
            this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
        }, n.Matrix3.prototype = {
            constructor: n.Matrix3,
            set: function(e, t, r, i, n, o, a, s, h) {
                var l = this.elements;
                return l[0] = e, l[3] = t, l[6] = r, l[1] = i, l[4] = n, l[7] = o, l[2] = a, l[5] = s, l[8] = h, this
            },
            identity: function() {
                return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
            },
            copy: function(e) {
                var t = e.elements;
                return this.set(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]), this
            },
            multiplyVector3: function(e) {
                return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), e.applyMatrix3(this)
            },
            multiplyVector3Array: function(e) {
                return console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
            },
            applyToVector3Array: function() {
                var e = new n.Vector3;
                return function(t, r, i) {
                    void 0 === r && (r = 0), void 0 === i && (i = t.length);
                    for (var n = 0, o = r; i > n; n += 3, o += 3) e.x = t[o], e.y = t[o + 1], e.z = t[o + 2], e.applyMatrix3(this), t[o] = e.x, t[o + 1] = e.y, t[o + 2] = e.z;
                    return t
                }
            }(),
            multiplyScalar: function(e) {
                var t = this.elements;
                return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
            },
            determinant: function() {
                var e = this.elements,
                    t = e[0],
                    r = e[1],
                    i = e[2],
                    n = e[3],
                    o = e[4],
                    a = e[5],
                    s = e[6],
                    h = e[7],
                    l = e[8];
                return t * o * l - t * a * h - r * n * l + r * a * s + i * n * h - i * o * s
            },
            getInverse: function(e, t) {
                var r = e.elements,
                    i = this.elements;
                i[0] = r[10] * r[5] - r[6] * r[9], i[1] = -r[10] * r[1] + r[2] * r[9], i[2] = r[6] * r[1] - r[2] * r[5], i[3] = -r[10] * r[4] + r[6] * r[8], i[4] = r[10] * r[0] - r[2] * r[8], i[5] = -r[6] * r[0] + r[2] * r[4], i[6] = r[9] * r[4] - r[5] * r[8], i[7] = -r[9] * r[0] + r[1] * r[8], i[8] = r[5] * r[0] - r[1] * r[4];
                var n = r[0] * i[0] + r[1] * i[3] + r[2] * i[6];
                if (0 === n) {
                    var o = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
                    if (t) throw new Error(o);
                    return console.warn(o), this.identity(), this
                }
                return this.multiplyScalar(1 / n), this
            },
            transpose: function() {
                var e, t = this.elements;
                return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
            },
            flattenToArrayOffset: function(e, t) {
                var r = this.elements;
                return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e
            },
            getNormalMatrix: function(e) {
                return this.getInverse(e).transpose(), this
            },
            transposeIntoArray: function(e) {
                var t = this.elements;
                return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
            },
            fromArray: function(e) {
                return this.elements.set(e), this
            },
            toArray: function() {
                var e = this.elements;
                return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
            },
            clone: function() {
                return (new n.Matrix3).fromArray(this.elements)
            }
        }, n.Matrix4 = function() {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
        }, n.Matrix4.prototype = {
            constructor: n.Matrix4,
            set: function(e, t, r, i, n, o, a, s, h, l, c, u, f, p, d, m) {
                var v = this.elements;
                return v[0] = e, v[4] = t, v[8] = r, v[12] = i, v[1] = n, v[5] = o, v[9] = a, v[13] = s, v[2] = h, v[6] = l, v[10] = c, v[14] = u, v[3] = f, v[7] = p, v[11] = d, v[15] = m, this
            },
            identity: function() {
                return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
            },
            copy: function(e) {
                return this.elements.set(e.elements), this
            },
            extractPosition: function(e) {
                return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(e)
            },
            copyPosition: function(e) {
                var t = this.elements,
                    r = e.elements;
                return t[12] = r[12], t[13] = r[13], t[14] = r[14], this
            },
            extractRotation: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = this.elements,
                        i = t.elements,
                        n = 1 / e.set(i[0], i[1], i[2]).length(),
                        o = 1 / e.set(i[4], i[5], i[6]).length(),
                        a = 1 / e.set(i[8], i[9], i[10]).length();
                    return r[0] = i[0] * n, r[1] = i[1] * n, r[2] = i[2] * n, r[4] = i[4] * o, r[5] = i[5] * o, r[6] = i[6] * o, r[8] = i[8] * a, r[9] = i[9] * a, r[10] = i[10] * a, this
                }
            }(),
            makeRotationFromEuler: function(e) {
                e instanceof n.Euler == !1 && console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                var t = this.elements,
                    r = e.x,
                    i = e.y,
                    o = e.z,
                    a = Math.cos(r),
                    s = Math.sin(r),
                    h = Math.cos(i),
                    l = Math.sin(i),
                    c = Math.cos(o),
                    u = Math.sin(o);
                if ("XYZ" === e.order) {
                    var f = a * c,
                        p = a * u,
                        d = s * c,
                        m = s * u;
                    t[0] = h * c, t[4] = -h * u, t[8] = l, t[1] = p + d * l, t[5] = f - m * l, t[9] = -s * h, t[2] = m - f * l, t[6] = d + p * l, t[10] = a * h
                } else if ("YXZ" === e.order) {
                    var v = h * c,
                        g = h * u,
                        y = l * c,
                        x = l * u;
                    t[0] = v + x * s, t[4] = y * s - g, t[8] = a * l, t[1] = a * u, t[5] = a * c, t[9] = -s, t[2] = g * s - y, t[6] = x + v * s, t[10] = a * h
                } else if ("ZXY" === e.order) {
                    var v = h * c,
                        g = h * u,
                        y = l * c,
                        x = l * u;
                    t[0] = v - x * s, t[4] = -a * u, t[8] = y + g * s, t[1] = g + y * s, t[5] = a * c, t[9] = x - v * s, t[2] = -a * l, t[6] = s, t[10] = a * h
                } else if ("ZYX" === e.order) {
                    var f = a * c,
                        p = a * u,
                        d = s * c,
                        m = s * u;
                    t[0] = h * c, t[4] = d * l - p, t[8] = f * l + m, t[1] = h * u, t[5] = m * l + f, t[9] = p * l - d, t[2] = -l, t[6] = s * h, t[10] = a * h
                } else if ("YZX" === e.order) {
                    var _ = a * h,
                        b = a * l,
                        w = s * h,
                        M = s * l;
                    t[0] = h * c, t[4] = M - _ * u, t[8] = w * u + b, t[1] = u, t[5] = a * c, t[9] = -s * c, t[2] = -l * c, t[6] = b * u + w, t[10] = _ - M * u
                } else if ("XZY" === e.order) {
                    var _ = a * h,
                        b = a * l,
                        w = s * h,
                        M = s * l;
                    t[0] = h * c, t[4] = -u, t[8] = l * c, t[1] = _ * u + M, t[5] = a * c, t[9] = b * u - w, t[2] = w * u - b, t[6] = s * c, t[10] = M * u + _
                }
                return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
            },
            setRotationFromQuaternion: function(e) {
                return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(e)
            },
            makeRotationFromQuaternion: function(e) {
                var t = this.elements,
                    r = e.x,
                    i = e.y,
                    n = e.z,
                    o = e.w,
                    a = r + r,
                    s = i + i,
                    h = n + n,
                    l = r * a,
                    c = r * s,
                    u = r * h,
                    f = i * s,
                    p = i * h,
                    d = n * h,
                    m = o * a,
                    v = o * s,
                    g = o * h;
                return t[0] = 1 - (f + d), t[4] = c - g, t[8] = u + v, t[1] = c + g, t[5] = 1 - (l + d), t[9] = p - m, t[2] = u - v, t[6] = p + m, t[10] = 1 - (l + f), t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
            },
            lookAt: function() {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Vector3;
                return function(i, n, o) {
                    var a = this.elements;
                    return r.subVectors(i, n).normalize(), 0 === r.length() && (r.z = 1), e.crossVectors(o, r).normalize(), 0 === e.length() && (r.x += 1e-4, e.crossVectors(o, r).normalize()), t.crossVectors(r, e), a[0] = e.x, a[4] = t.x, a[8] = r.x, a[1] = e.y, a[5] = t.y, a[9] = r.y, a[2] = e.z, a[6] = t.z, a[10] = r.z, this
                }
            }(),
            multiply: function(e, t) {
                return void 0 !== t ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
            },
            multiplyMatrices: function(e, t) {
                var r = e.elements,
                    i = t.elements,
                    n = this.elements,
                    o = r[0],
                    a = r[4],
                    s = r[8],
                    h = r[12],
                    l = r[1],
                    c = r[5],
                    u = r[9],
                    f = r[13],
                    p = r[2],
                    d = r[6],
                    m = r[10],
                    v = r[14],
                    g = r[3],
                    y = r[7],
                    x = r[11],
                    _ = r[15],
                    b = i[0],
                    w = i[4],
                    M = i[8],
                    S = i[12],
                    T = i[1],
                    C = i[5],
                    E = i[9],
                    A = i[13],
                    L = i[2],
                    P = i[6],
                    R = i[10],
                    F = i[14],
                    D = i[3],
                    U = i[7],
                    z = i[11],
                    B = i[15];
                return n[0] = o * b + a * T + s * L + h * D, n[4] = o * w + a * C + s * P + h * U, n[8] = o * M + a * E + s * R + h * z, n[12] = o * S + a * A + s * F + h * B, n[1] = l * b + c * T + u * L + f * D, n[5] = l * w + c * C + u * P + f * U, n[9] = l * M + c * E + u * R + f * z, n[13] = l * S + c * A + u * F + f * B, n[2] = p * b + d * T + m * L + v * D, n[6] = p * w + d * C + m * P + v * U, n[10] = p * M + d * E + m * R + v * z, n[14] = p * S + d * A + m * F + v * B, n[3] = g * b + y * T + x * L + _ * D, n[7] = g * w + y * C + x * P + _ * U, n[11] = g * M + y * E + x * R + _ * z, n[15] = g * S + y * A + x * F + _ * B, this
            },
            multiplyToArray: function(e, t, r) {
                var i = this.elements;
                return this.multiplyMatrices(e, t), r[0] = i[0], r[1] = i[1], r[2] = i[2], r[3] = i[3], r[4] = i[4], r[5] = i[5], r[6] = i[6], r[7] = i[7], r[8] = i[8], r[9] = i[9], r[10] = i[10], r[11] = i[11], r[12] = i[12], r[13] = i[13], r[14] = i[14], r[15] = i[15], this
            },
            multiplyScalar: function(e) {
                var t = this.elements;
                return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
            },
            multiplyVector3: function(e) {
                return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), e.applyProjection(this)
            },
            multiplyVector4: function(e) {
                return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
            },
            multiplyVector3Array: function(e) {
                return console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
            },
            applyToVector3Array: function() {
                var e = new n.Vector3;
                return function(t, r, i) {
                    void 0 === r && (r = 0), void 0 === i && (i = t.length);
                    for (var n = 0, o = r; i > n; n += 3, o += 3) e.x = t[o], e.y = t[o + 1], e.z = t[o + 2], e.applyMatrix4(this), t[o] = e.x, t[o + 1] = e.y, t[o + 2] = e.z;
                    return t
                }
            }(),
            rotateAxis: function(e) {
                console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), e.transformDirection(this)
            },
            crossVector: function(e) {
                return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
            },
            determinant: function() {
                var e = this.elements,
                    t = e[0],
                    r = e[4],
                    i = e[8],
                    n = e[12],
                    o = e[1],
                    a = e[5],
                    s = e[9],
                    h = e[13],
                    l = e[2],
                    c = e[6],
                    u = e[10],
                    f = e[14],
                    p = e[3],
                    d = e[7],
                    m = e[11],
                    v = e[15];
                return p * (+n * s * c - i * h * c - n * a * u + r * h * u + i * a * f - r * s * f) + d * (+t * s * f - t * h * u + n * o * u - i * o * f + i * h * l - n * s * l) + m * (+t * h * c - t * a * f - n * o * c + r * o * f + n * a * l - r * h * l) + v * (-i * a * l - t * s * c + t * a * u + i * o * c - r * o * u + r * s * l)
            },
            transpose: function() {
                var e, t = this.elements;
                return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
            },
            flattenToArrayOffset: function(e, t) {
                var r = this.elements;
                return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e[t + 9] = r[9], e[t + 10] = r[10], e[t + 11] = r[11], e[t + 12] = r[12], e[t + 13] = r[13], e[t + 14] = r[14], e[t + 15] = r[15], e
            },
            getPosition: function() {
                var e = new n.Vector3;
                return function() {
                    console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
                    var t = this.elements;
                    return e.set(t[12], t[13], t[14])
                }
            }(),
            setPosition: function(e) {
                var t = this.elements;
                return t[12] = e.x, t[13] = e.y, t[14] = e.z, this
            },
            getInverse: function(e, t) {
                var r = this.elements,
                    i = e.elements,
                    n = i[0],
                    o = i[4],
                    a = i[8],
                    s = i[12],
                    h = i[1],
                    l = i[5],
                    c = i[9],
                    u = i[13],
                    f = i[2],
                    p = i[6],
                    d = i[10],
                    m = i[14],
                    v = i[3],
                    g = i[7],
                    y = i[11],
                    x = i[15];
                r[0] = c * m * g - u * d * g + u * p * y - l * m * y - c * p * x + l * d * x, r[4] = s * d * g - a * m * g - s * p * y + o * m * y + a * p * x - o * d * x, r[8] = a * u * g - s * c * g + s * l * y - o * u * y - a * l * x + o * c * x, r[12] = s * c * p - a * u * p - s * l * d + o * u * d + a * l * m - o * c * m, r[1] = u * d * v - c * m * v - u * f * y + h * m * y + c * f * x - h * d * x, r[5] = a * m * v - s * d * v + s * f * y - n * m * y - a * f * x + n * d * x, r[9] = s * c * v - a * u * v - s * h * y + n * u * y + a * h * x - n * c * x, r[13] = a * u * f - s * c * f + s * h * d - n * u * d - a * h * m + n * c * m, r[2] = l * m * v - u * p * v + u * f * g - h * m * g - l * f * x + h * p * x, r[6] = s * p * v - o * m * v - s * f * g + n * m * g + o * f * x - n * p * x, r[10] = o * u * v - s * l * v + s * h * g - n * u * g - o * h * x + n * l * x, r[14] = s * l * f - o * u * f - s * h * p + n * u * p + o * h * m - n * l * m, r[3] = c * p * v - l * d * v - c * f * g + h * d * g + l * f * y - h * p * y, r[7] = o * d * v - a * p * v + a * f * g - n * d * g - o * f * y + n * p * y, r[11] = a * l * v - o * c * v - a * h * g + n * c * g + o * h * y - n * l * y, r[15] = o * c * f - a * l * f + a * h * p - n * c * p - o * h * d + n * l * d;
                var _ = n * r[0] + h * r[4] + f * r[8] + v * r[12];
                if (0 == _) {
                    var b = "Matrix4.getInverse(): can't invert matrix, determinant is 0";
                    if (t) throw new Error(b);
                    return console.warn(b), this.identity(), this
                }
                return this.multiplyScalar(1 / _), this
            },
            translate: function(e) {
                console.warn("THREE.Matrix4: .translate() has been removed.")
            },
            rotateX: function(e) {
                console.warn("THREE.Matrix4: .rotateX() has been removed.")
            },
            rotateY: function(e) {
                console.warn("THREE.Matrix4: .rotateY() has been removed.")
            },
            rotateZ: function(e) {
                console.warn("THREE.Matrix4: .rotateZ() has been removed.")
            },
            rotateByAxis: function(e, t) {
                console.warn("THREE.Matrix4: .rotateByAxis() has been removed.")
            },
            scale: function(e) {
                var t = this.elements,
                    r = e.x,
                    i = e.y,
                    n = e.z;
                return t[0] *= r, t[4] *= i, t[8] *= n, t[1] *= r, t[5] *= i, t[9] *= n, t[2] *= r, t[6] *= i, t[10] *= n, t[3] *= r, t[7] *= i, t[11] *= n, this
            },
            getMaxScaleOnAxis: function() {
                var e = this.elements,
                    t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
                    r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
                    i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
                return Math.sqrt(Math.max(t, Math.max(r, i)))
            },
            makeTranslation: function(e, t, r) {
                return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1), this
            },
            makeRotationX: function(e) {
                var t = Math.cos(e),
                    r = Math.sin(e);
                return this.set(1, 0, 0, 0, 0, t, -r, 0, 0, r, t, 0, 0, 0, 0, 1), this
            },
            makeRotationY: function(e) {
                var t = Math.cos(e),
                    r = Math.sin(e);
                return this.set(t, 0, r, 0, 0, 1, 0, 0, -r, 0, t, 0, 0, 0, 0, 1), this
            },
            makeRotationZ: function(e) {
                var t = Math.cos(e),
                    r = Math.sin(e);
                return this.set(t, -r, 0, 0, r, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
            },
            makeRotationAxis: function(e, t) {
                var r = Math.cos(t),
                    i = Math.sin(t),
                    n = 1 - r,
                    o = e.x,
                    a = e.y,
                    s = e.z,
                    h = n * o,
                    l = n * a;
                return this.set(h * o + r, h * a - i * s, h * s + i * a, 0, h * a + i * s, l * a + r, l * s - i * o, 0, h * s - i * a, l * s + i * o, n * s * s + r, 0, 0, 0, 0, 1), this
            },
            makeScale: function(e, t, r) {
                return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this
            },
            compose: function(e, t, r) {
                return this.makeRotationFromQuaternion(t), this.scale(r), this.setPosition(e), this
            },
            decompose: function() {
                var e = new n.Vector3,
                    t = new n.Matrix4;
                return function(r, i, n) {
                    var o = this.elements,
                        a = e.set(o[0], o[1], o[2]).length(),
                        s = e.set(o[4], o[5], o[6]).length(),
                        h = e.set(o[8], o[9], o[10]).length(),
                        l = this.determinant();
                    0 > l && (a = -a), r.x = o[12], r.y = o[13], r.z = o[14], t.elements.set(this.elements);
                    var c = 1 / a,
                        u = 1 / s,
                        f = 1 / h;
                    return t.elements[0] *= c, t.elements[1] *= c, t.elements[2] *= c, t.elements[4] *= u, t.elements[5] *= u, t.elements[6] *= u, t.elements[8] *= f, t.elements[9] *= f, t.elements[10] *= f, i.setFromRotationMatrix(t), n.x = a, n.y = s, n.z = h, this
                }
            }(),
            makeFrustum: function(e, t, r, i, n, o) {
                var a = this.elements,
                    s = 2 * n / (t - e),
                    h = 2 * n / (i - r),
                    l = (t + e) / (t - e),
                    c = (i + r) / (i - r),
                    u = -(o + n) / (o - n),
                    f = -2 * o * n / (o - n);
                return a[0] = s, a[4] = 0, a[8] = l, a[12] = 0, a[1] = 0, a[5] = h, a[9] = c, a[13] = 0, a[2] = 0, a[6] = 0, a[10] = u, a[14] = f, a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
            },
            makePerspective: function(e, t, r, i) {
                var o = r * Math.tan(n.Math.degToRad(.5 * e)),
                    a = -o,
                    s = a * t,
                    h = o * t;
                return this.makeFrustum(s, h, a, o, r, i)
            },
            makeOrthographic: function(e, t, r, i, n, o) {
                var a = this.elements,
                    s = t - e,
                    h = r - i,
                    l = o - n,
                    c = (t + e) / s,
                    u = (r + i) / h,
                    f = (o + n) / l;
                return a[0] = 2 / s, a[4] = 0, a[8] = 0, a[12] = -c, a[1] = 0, a[5] = 2 / h, a[9] = 0, a[13] = -u, a[2] = 0, a[6] = 0, a[10] = -2 / l, a[14] = -f, a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
            },
            fromArray: function(e) {
                return this.elements.set(e), this
            },
            toArray: function() {
                var e = this.elements;
                return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
            },
            clone: function() {
                return (new n.Matrix4).fromArray(this.elements)
            }
        }, n.Ray = function(e, t) {
            this.origin = void 0 !== e ? e : new n.Vector3, this.direction = void 0 !== t ? t : new n.Vector3
        }, n.Ray.prototype = {
            constructor: n.Ray,
            set: function(e, t) {
                return this.origin.copy(e), this.direction.copy(t), this
            },
            copy: function(e) {
                return this.origin.copy(e.origin), this.direction.copy(e.direction), this
            },
            at: function(e, t) {
                var r = t || new n.Vector3;
                return r.copy(this.direction).multiplyScalar(e).add(this.origin)
            },
            recast: function() {
                var e = new n.Vector3;
                return function(t) {
                    return this.origin.copy(this.at(t, e)), this
                }
            }(),
            closestPointToPoint: function(e, t) {
                var r = t || new n.Vector3;
                r.subVectors(e, this.origin);
                var i = r.dot(this.direction);
                return 0 > i ? r.copy(this.origin) : r.copy(this.direction).multiplyScalar(i).add(this.origin)
            },
            distanceToPoint: function() {
                var e = new n.Vector3;
                return function(t) {
                    var r = e.subVectors(t, this.origin).dot(this.direction);
                    return 0 > r ? this.origin.distanceTo(t) : (e.copy(this.direction).multiplyScalar(r).add(this.origin), e.distanceTo(t))
                }
            }(),
            distanceSqToSegment: function(e, t, r, i) {
                var n, o, a, s, h = e.clone().add(t).multiplyScalar(.5),
                    l = t.clone().sub(e).normalize(),
                    c = .5 * e.distanceTo(t),
                    u = this.origin.clone().sub(h),
                    f = -this.direction.dot(l),
                    p = u.dot(this.direction),
                    d = -u.dot(l),
                    m = u.lengthSq(),
                    v = Math.abs(1 - f * f);
                if (v >= 0)
                    if (n = f * d - p, o = f * p - d, s = c * v, n >= 0)
                        if (o >= -s)
                            if (s >= o) {
                                var g = 1 / v;
                                n *= g, o *= g, a = n * (n + f * o + 2 * p) + o * (f * n + o + 2 * d) + m
                            } else o = c, n = Math.max(0, -(f * o + p)), a = -n * n + o * (o + 2 * d) + m;
                        else o = -c, n = Math.max(0, -(f * o + p)), a = -n * n + o * (o + 2 * d) + m;
                    else -s >= o ? (n = Math.max(0, -(-f * c + p)), o = n > 0 ? -c : Math.min(Math.max(-c, -d), c), a = -n * n + o * (o + 2 * d) + m) : s >= o ? (n = 0, o = Math.min(Math.max(-c, -d), c), a = o * (o + 2 * d) + m) : (n = Math.max(0, -(f * c + p)), o = n > 0 ? c : Math.min(Math.max(-c, -d), c), a = -n * n + o * (o + 2 * d) + m);
                else o = f > 0 ? -c : c, n = Math.max(0, -(f * o + p)), a = -n * n + o * (o + 2 * d) + m;
                return r && r.copy(this.direction.clone().multiplyScalar(n).add(this.origin)), i && i.copy(l.clone().multiplyScalar(o).add(h)), a
            },
            isIntersectionSphere: function(e) {
                return this.distanceToPoint(e.center) <= e.radius
            },
            intersectSphere: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    e.subVectors(t.center, this.origin);
                    var i = e.dot(this.direction),
                        n = e.dot(e) - i * i,
                        o = t.radius * t.radius;
                    if (n > o) return null;
                    var a = Math.sqrt(o - n),
                        s = i - a,
                        h = i + a;
                    return 0 > s && 0 > h ? null : 0 > s ? this.at(h, r) : this.at(s, r)
                }
            }(),
            isIntersectionPlane: function(e) {
                var t = e.distanceToPoint(this.origin);
                if (0 === t) return !0;
                var r = e.normal.dot(this.direction);
                return 0 > r * t ? !0 : !1
            },
            distanceToPlane: function(e) {
                var t = e.normal.dot(this.direction);
                if (0 == t) return 0 == e.distanceToPoint(this.origin) ? 0 : null;
                var r = -(this.origin.dot(e.normal) + e.constant) / t;
                return r >= 0 ? r : null
            },
            intersectPlane: function(e, t) {
                var r = this.distanceToPlane(e);
                return null === r ? null : this.at(r, t)
            },
            isIntersectionBox: function() {
                var e = new n.Vector3;
                return function(t) {
                    return null !== this.intersectBox(t, e)
                }
            }(),
            intersectBox: function(e, t) {
                var r, i, n, o, a, s, h = 1 / this.direction.x,
                    l = 1 / this.direction.y,
                    c = 1 / this.direction.z,
                    u = this.origin;
                return h >= 0 ? (r = (e.min.x - u.x) * h, i = (e.max.x - u.x) * h) : (r = (e.max.x - u.x) * h, i = (e.min.x - u.x) * h), l >= 0 ? (n = (e.min.y - u.y) * l, o = (e.max.y - u.y) * l) : (n = (e.max.y - u.y) * l, o = (e.min.y - u.y) * l), r > o || n > i ? null : ((n > r || r !== r) && (r = n), (i > o || i !== i) && (i = o), c >= 0 ? (a = (e.min.z - u.z) * c, s = (e.max.z - u.z) * c) : (a = (e.max.z - u.z) * c, s = (e.min.z - u.z) * c), r > s || a > i ? null : ((a > r || r !== r) && (r = a), (i > s || i !== i) && (i = s), 0 > i ? null : this.at(r >= 0 ? r : i, t)))
            },
            intersectTriangle: function() {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Vector3,
                    i = new n.Vector3;
                return function(n, o, a, s, h) {
                    t.subVectors(o, n), r.subVectors(a, n), i.crossVectors(t, r);
                    var l, c = this.direction.dot(i);
                    if (c > 0) {
                        if (s) return null;
                        l = 1
                    } else {
                        if (!(0 > c)) return null;
                        l = -1, c = -c
                    }
                    e.subVectors(this.origin, n);
                    var u = l * this.direction.dot(r.crossVectors(e, r));
                    if (0 > u) return null;
                    var f = l * this.direction.dot(t.cross(e));
                    if (0 > f) return null;
                    if (u + f > c) return null;
                    var p = -l * e.dot(i);
                    return 0 > p ? null : this.at(p / c, h)
                }
            }(),
            applyMatrix4: function(e) {
                return this.direction.add(this.origin).applyMatrix4(e), this.origin.applyMatrix4(e), this.direction.sub(this.origin), this.direction.normalize(), this
            },
            equals: function(e) {
                return e.origin.equals(this.origin) && e.direction.equals(this.direction)
            },
            clone: function() {
                return (new n.Ray).copy(this)
            }
        }, n.Sphere = function(e, t) {
            this.center = void 0 !== e ? e : new n.Vector3, this.radius = void 0 !== t ? t : 0
        }, n.Sphere.prototype = {
            constructor: n.Sphere,
            set: function(e, t) {
                return this.center.copy(e), this.radius = t, this
            },
            setFromPoints: function() {
                var e = new n.Box3;
                return function(t, r) {
                    var i = this.center;
                    void 0 !== r ? i.copy(r) : e.setFromPoints(t).center(i);
                    for (var n = 0, o = 0, a = t.length; a > o; o++) n = Math.max(n, i.distanceToSquared(t[o]));
                    return this.radius = Math.sqrt(n), this
                }
            }(),
            copy: function(e) {
                return this.center.copy(e.center), this.radius = e.radius, this
            },
            empty: function() {
                return this.radius <= 0
            },
            containsPoint: function(e) {
                return e.distanceToSquared(this.center) <= this.radius * this.radius
            },
            distanceToPoint: function(e) {
                return e.distanceTo(this.center) - this.radius
            },
            intersectsSphere: function(e) {
                var t = this.radius + e.radius;
                return e.center.distanceToSquared(this.center) <= t * t
            },
            clampPoint: function(e, t) {
                var r = this.center.distanceToSquared(e),
                    i = t || new n.Vector3;
                return i.copy(e), r > this.radius * this.radius && (i.sub(this.center).normalize(), i.multiplyScalar(this.radius).add(this.center)), i
            },
            getBoundingBox: function(e) {
                var t = e || new n.Box3;
                return t.set(this.center, this.center), t.expandByScalar(this.radius), t
            },
            applyMatrix4: function(e) {
                return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
            },
            translate: function(e) {
                return this.center.add(e), this
            },
            equals: function(e) {
                return e.center.equals(this.center) && e.radius === this.radius
            },
            clone: function() {
                return (new n.Sphere).copy(this)
            }
        }, n.Frustum = function(e, t, r, i, o, a) {
            this.planes = [void 0 !== e ? e : new n.Plane, void 0 !== t ? t : new n.Plane, void 0 !== r ? r : new n.Plane, void 0 !== i ? i : new n.Plane, void 0 !== o ? o : new n.Plane, void 0 !== a ? a : new n.Plane]
        }, n.Frustum.prototype = {
            constructor: n.Frustum,
            set: function(e, t, r, i, n, o) {
                var a = this.planes;
                return a[0].copy(e), a[1].copy(t), a[2].copy(r), a[3].copy(i), a[4].copy(n), a[5].copy(o), this
            },
            copy: function(e) {
                for (var t = this.planes, r = 0; 6 > r; r++) t[r].copy(e.planes[r]);
                return this
            },
            setFromMatrix: function(e) {
                var t = this.planes,
                    r = e.elements,
                    i = r[0],
                    n = r[1],
                    o = r[2],
                    a = r[3],
                    s = r[4],
                    h = r[5],
                    l = r[6],
                    c = r[7],
                    u = r[8],
                    f = r[9],
                    p = r[10],
                    d = r[11],
                    m = r[12],
                    v = r[13],
                    g = r[14],
                    y = r[15];
                return t[0].setComponents(a - i, c - s, d - u, y - m).normalize(), t[1].setComponents(a + i, c + s, d + u, y + m).normalize(), t[2].setComponents(a + n, c + h, d + f, y + v).normalize(), t[3].setComponents(a - n, c - h, d - f, y - v).normalize(), t[4].setComponents(a - o, c - l, d - p, y - g).normalize(), t[5].setComponents(a + o, c + l, d + p, y + g).normalize(), this
            },
            intersectsObject: function() {
                var e = new n.Sphere;
                return function(t) {
                    var r = t.geometry;
                    return null === r.boundingSphere && r.computeBoundingSphere(), e.copy(r.boundingSphere), e.applyMatrix4(t.matrixWorld), this.intersectsSphere(e)
                }
            }(),
            intersectsSphere: function(e) {
                for (var t = this.planes, r = e.center, i = -e.radius, n = 0; 6 > n; n++) {
                    var o = t[n].distanceToPoint(r);
                    if (i > o) return !1
                }
                return !0
            },
            intersectsBox: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r) {
                    for (var i = this.planes, n = 0; 6 > n; n++) {
                        var o = i[n];
                        e.x = o.normal.x > 0 ? r.min.x : r.max.x, t.x = o.normal.x > 0 ? r.max.x : r.min.x, e.y = o.normal.y > 0 ? r.min.y : r.max.y, t.y = o.normal.y > 0 ? r.max.y : r.min.y, e.z = o.normal.z > 0 ? r.min.z : r.max.z, t.z = o.normal.z > 0 ? r.max.z : r.min.z;
                        var a = o.distanceToPoint(e),
                            s = o.distanceToPoint(t);
                        if (0 > a && 0 > s) return !1
                    }
                    return !0
                }
            }(),
            containsPoint: function(e) {
                for (var t = this.planes, r = 0; 6 > r; r++)
                    if (t[r].distanceToPoint(e) < 0) return !1;
                return !0
            },
            clone: function() {
                return (new n.Frustum).copy(this)
            }
        }, n.Plane = function(e, t) {
            this.normal = void 0 !== e ? e : new n.Vector3(1, 0, 0), this.constant = void 0 !== t ? t : 0
        }, n.Plane.prototype = {
            constructor: n.Plane,
            set: function(e, t) {
                return this.normal.copy(e), this.constant = t, this
            },
            setComponents: function(e, t, r, i) {
                return this.normal.set(e, t, r), this.constant = i, this
            },
            setFromNormalAndCoplanarPoint: function(e, t) {
                return this.normal.copy(e), this.constant = -t.dot(this.normal), this
            },
            setFromCoplanarPoints: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r, i, n) {
                    var o = e.subVectors(n, i).cross(t.subVectors(r, i)).normalize();
                    return this.setFromNormalAndCoplanarPoint(o, r), this
                }
            }(),
            copy: function(e) {
                return this.normal.copy(e.normal), this.constant = e.constant, this
            },
            normalize: function() {
                var e = 1 / this.normal.length();
                return this.normal.multiplyScalar(e), this.constant *= e, this
            },
            negate: function() {
                return this.constant *= -1, this.normal.negate(), this
            },
            distanceToPoint: function(e) {
                return this.normal.dot(e) + this.constant
            },
            distanceToSphere: function(e) {
                return this.distanceToPoint(e.center) - e.radius
            },
            projectPoint: function(e, t) {
                return this.orthoPoint(e, t).sub(e).negate()
            },
            orthoPoint: function(e, t) {
                var r = this.distanceToPoint(e),
                    i = t || new n.Vector3;
                return i.copy(this.normal).multiplyScalar(r)
            },
            isIntersectionLine: function(e) {
                var t = this.distanceToPoint(e.start),
                    r = this.distanceToPoint(e.end);
                return 0 > t && r > 0 || 0 > r && t > 0
            },
            intersectLine: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    var i = r || new n.Vector3,
                        o = t.delta(e),
                        a = this.normal.dot(o);
                    if (0 == a) return 0 == this.distanceToPoint(t.start) ? i.copy(t.start) : void 0;
                    var s = -(t.start.dot(this.normal) + this.constant) / a;
                    return 0 > s || s > 1 ? void 0 : i.copy(o).multiplyScalar(s).add(t.start)
                }
            }(),
            coplanarPoint: function(e) {
                var t = e || new n.Vector3;
                return t.copy(this.normal).multiplyScalar(-this.constant)
            },
            applyMatrix4: function() {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Matrix3;
                return function(i, n) {
                    var o = n || r.getNormalMatrix(i),
                        a = e.copy(this.normal).applyMatrix3(o),
                        s = this.coplanarPoint(t);
                    return s.applyMatrix4(i), this.setFromNormalAndCoplanarPoint(a, s), this
                }
            }(),
            translate: function(e) {
                return this.constant = this.constant - e.dot(this.normal), this
            },
            equals: function(e) {
                return e.normal.equals(this.normal) && e.constant == this.constant
            },
            clone: function() {
                return (new n.Plane).copy(this)
            }
        }, n.Math = {
            generateUUID: function() {
                var e, t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                    r = new Array(36),
                    i = 0;
                return function() {
                    for (var n = 0; 36 > n; n++) 8 == n || 13 == n || 18 == n || 23 == n ? r[n] = "-" : 14 == n ? r[n] = "4" : (2 >= i && (i = 33554432 + 16777216 * Math.random() | 0), e = 15 & i, i >>= 4, r[n] = t[19 == n ? 3 & e | 8 : e]);
                    return r.join("")
                }
            }(),
            clamp: function(e, t, r) {
                return t > e ? t : e > r ? r : e
            },
            clampBottom: function(e, t) {
                return t > e ? t : e
            },
            mapLinear: function(e, t, r, i, n) {
                return i + (e - t) * (n - i) / (r - t)
            },
            smoothstep: function(e, t, r) {
                return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * (3 - 2 * e))
            },
            smootherstep: function(e, t, r) {
                return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * e * (e * (6 * e - 15) + 10))
            },
            random16: function() {
                return (65280 * Math.random() + 255 * Math.random()) / 65535
            },
            randInt: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            },
            randFloat: function(e, t) {
                return e + Math.random() * (t - e)
            },
            randFloatSpread: function(e) {
                return e * (.5 - Math.random())
            },
            degToRad: function() {
                var e = Math.PI / 180;
                return function(t) {
                    return t * e
                }
            }(),
            radToDeg: function() {
                var e = 180 / Math.PI;
                return function(t) {
                    return t * e
                }
            }(),
            isPowerOfTwo: function(e) {
                return 0 === (e & e - 1) && 0 !== e
            }
        }, n.Spline = function(e) {
            function t(e, t, r, i, n, o, a) {
                var s = .5 * (r - e),
                    h = .5 * (i - t);
                return (2 * (t - r) + s + h) * a + (-3 * (t - r) - 2 * s - h) * o + s * n + t
            }
            this.points = e;
            var r, i, o, a, s, h, l, c, u, f = [],
                p = {
                    x: 0,
                    y: 0,
                    z: 0
                };
            this.initFromArray = function(e) {
                this.points = [];
                for (var t = 0; t < e.length; t++) this.points[t] = {
                    x: e[t][0],
                    y: e[t][1],
                    z: e[t][2]
                }
            }, this.getPoint = function(e) {
                return r = (this.points.length - 1) * e, i = Math.floor(r), o = r - i, f[0] = 0 === i ? i : i - 1, f[1] = i, f[2] = i > this.points.length - 2 ? this.points.length - 1 : i + 1, f[3] = i > this.points.length - 3 ? this.points.length - 1 : i + 2, h = this.points[f[0]], l = this.points[f[1]], c = this.points[f[2]], u = this.points[f[3]], a = o * o, s = o * a, p.x = t(h.x, l.x, c.x, u.x, o, a, s), p.y = t(h.y, l.y, c.y, u.y, o, a, s), p.z = t(h.z, l.z, c.z, u.z, o, a, s), p
            }, this.getControlPointsArray = function() {
                var e, t, r = this.points.length,
                    i = [];
                for (e = 0; r > e; e++) t = this.points[e], i[e] = [t.x, t.y, t.z];
                return i
            }, this.getLength = function(e) {
                var t, r, i, o, a = 0,
                    s = 0,
                    h = 0,
                    l = new n.Vector3,
                    c = new n.Vector3,
                    u = [],
                    f = 0;
                for (u[0] = 0, e || (e = 100), i = this.points.length * e, l.copy(this.points[0]), t = 1; i > t; t++) r = t / i, o = this.getPoint(r), c.copy(o), f += c.distanceTo(l), l.copy(o), a = (this.points.length - 1) * r, s = Math.floor(a), s != h && (u[s] = f, h = s);
                return u[u.length] = f, {
                    chunks: u,
                    total: f
                }
            }, this.reparametrizeByArcLength = function(e) {
                var t, r, i, o, a, s, h, l, c = [],
                    u = new n.Vector3,
                    f = this.getLength();
                for (c.push(u.copy(this.points[0]).clone()), t = 1; t < this.points.length; t++) {
                    for (s = f.chunks[t] - f.chunks[t - 1], h = Math.ceil(e * s / f.total), o = (t - 1) / (this.points.length - 1), a = t / (this.points.length - 1), r = 1; h - 1 > r; r++) i = o + r * (1 / h) * (a - o), l = this.getPoint(i), c.push(u.copy(l).clone());
                    c.push(u.copy(this.points[t]).clone())
                }
                this.points = c
            }
        }, n.Triangle = function(e, t, r) {
            this.a = void 0 !== e ? e : new n.Vector3, this.b = void 0 !== t ? t : new n.Vector3, this.c = void 0 !== r ? r : new n.Vector3
        }, n.Triangle.normal = function() {
            var e = new n.Vector3;
            return function(t, r, i, o) {
                var a = o || new n.Vector3;
                a.subVectors(i, r), e.subVectors(t, r), a.cross(e);
                var s = a.lengthSq();
                return s > 0 ? a.multiplyScalar(1 / Math.sqrt(s)) : a.set(0, 0, 0)
            }
        }(), n.Triangle.barycoordFromPoint = function() {
            var e = new n.Vector3,
                t = new n.Vector3,
                r = new n.Vector3;
            return function(i, o, a, s, h) {
                e.subVectors(s, o), t.subVectors(a, o), r.subVectors(i, o);
                var l = e.dot(e),
                    c = e.dot(t),
                    u = e.dot(r),
                    f = t.dot(t),
                    p = t.dot(r),
                    d = l * f - c * c,
                    m = h || new n.Vector3;
                if (0 == d) return m.set(-2, -1, -1);
                var v = 1 / d,
                    g = (f * u - c * p) * v,
                    y = (l * p - c * u) * v;
                return m.set(1 - g - y, y, g)
            }
        }(), n.Triangle.containsPoint = function() {
            var e = new n.Vector3;
            return function(t, r, i, o) {
                var a = n.Triangle.barycoordFromPoint(t, r, i, o, e);
                return a.x >= 0 && a.y >= 0 && a.x + a.y <= 1
            }
        }(), n.Triangle.prototype = {
            constructor: n.Triangle,
            set: function(e, t, r) {
                return this.a.copy(e), this.b.copy(t), this.c.copy(r), this
            },
            setFromPointsAndIndices: function(e, t, r, i) {
                return this.a.copy(e[t]), this.b.copy(e[r]), this.c.copy(e[i]), this
            },
            copy: function(e) {
                return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
            },
            area: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function() {
                    return e.subVectors(this.c, this.b), t.subVectors(this.a, this.b), .5 * e.cross(t).length()
                }
            }(),
            midpoint: function(e) {
                var t = e || new n.Vector3;
                return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
            },
            normal: function(e) {
                return n.Triangle.normal(this.a, this.b, this.c, e)
            },
            plane: function(e) {
                var t = e || new n.Plane;
                return t.setFromCoplanarPoints(this.a, this.b, this.c)
            },
            barycoordFromPoint: function(e, t) {
                return n.Triangle.barycoordFromPoint(e, this.a, this.b, this.c, t)
            },
            containsPoint: function(e) {
                return n.Triangle.containsPoint(e, this.a, this.b, this.c)
            },
            equals: function(e) {
                return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
            },
            clone: function() {
                return (new n.Triangle).copy(this)
            }
        }, n.Clock = function(e) {
            this.autoStart = void 0 !== e ? e : !0, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
        }, n.Clock.prototype = {
            constructor: n.Clock,
            start: function() {
                this.startTime = void 0 !== i.performance && void 0 !== i.performance.now ? i.performance.now() : Date.now(), this.oldTime = this.startTime, this.running = !0
            },
            stop: function() {
                this.getElapsedTime(), this.running = !1
            },
            getElapsedTime: function() {
                return this.getDelta(), this.elapsedTime
            },
            getDelta: function() {
                var e = 0;
                if (this.autoStart && !this.running && this.start(), this.running) {
                    var t = void 0 !== i.performance && void 0 !== i.performance.now ? i.performance.now() : Date.now();
                    e = .001 * (t - this.oldTime), this.oldTime = t, this.elapsedTime += e
                }
                return e
            }
        }, n.EventDispatcher = function() {}, n.EventDispatcher.prototype = {
            constructor: n.EventDispatcher,
            apply: function(e) {
                e.addEventListener = n.EventDispatcher.prototype.addEventListener, e.hasEventListener = n.EventDispatcher.prototype.hasEventListener, e.removeEventListener = n.EventDispatcher.prototype.removeEventListener, e.dispatchEvent = n.EventDispatcher.prototype.dispatchEvent
            },
            addEventListener: function(e, t) {
                void 0 === this._listeners && (this._listeners = {});
                var r = this._listeners;
                void 0 === r[e] && (r[e] = []), -1 === r[e].indexOf(t) && r[e].push(t)
            },
            hasEventListener: function(e, t) {
                if (void 0 === this._listeners) return !1;
                var r = this._listeners;
                return void 0 !== r[e] && -1 !== r[e].indexOf(t) ? !0 : !1
            },
            removeEventListener: function(e, t) {
                if (void 0 !== this._listeners) {
                    var r = this._listeners,
                        i = r[e];
                    if (void 0 !== i) {
                        var n = i.indexOf(t); - 1 !== n && i.splice(n, 1)
                    }
                }
            },
            dispatchEvent: function(e) {
                if (void 0 !== this._listeners) {
                    var t = this._listeners,
                        r = t[e.type];
                    if (void 0 !== r) {
                        e.target = this;
                        for (var i = [], n = r.length, o = 0; n > o; o++) i[o] = r[o];
                        for (var o = 0; n > o; o++) i[o].call(this, e)
                    }
                }
            }
        },
        function(e) {
            e.Raycaster = function(t, r, i, n) {
                this.ray = new e.Ray(t, r), this.near = i || 0, this.far = n || 1 / 0, this.params = {
                    Sprite: {},
                    Mesh: {},
                    PointCloud: {
                        threshold: 1
                    },
                    LOD: {},
                    Line: {}
                }
            };
            var t = function(e, t) {
                    return e.distance - t.distance
                },
                r = function(e, t, i, n) {
                    if (e.raycast(t, i), n === !0)
                        for (var o = e.children, a = 0, s = o.length; s > a; a++) r(o[a], t, i, !0)
                };
            e.Raycaster.prototype = {
                constructor: e.Raycaster,
                precision: 1e-4,
                linePrecision: 1,
                set: function(e, t) {
                    this.ray.set(e, t)
                },
                intersectObject: function(e, i) {
                    var n = [];
                    return r(e, this, n, i), n.sort(t), n
                },
                intersectObjects: function(e, i) {
                    var n = [];
                    if (e instanceof Array == !1) return console.log("THREE.Raycaster.intersectObjects: objects is not an Array."), n;
                    for (var o = 0, a = e.length; a > o; o++) r(e[o], this, n, i);
                    return n.sort(t), n
                }
            }
        }(n), n.Object3D = function() {
            Object.defineProperty(this, "id", {
                value: n.Object3DIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Object3D", this.parent = void 0, this.children = [], this.up = n.Object3D.DefaultUp.clone();
            var e = new n.Vector3,
                t = new n.Euler,
                r = new n.Quaternion,
                i = new n.Vector3(1, 1, 1),
                o = function() {
                    r.setFromEuler(t, !1)
                },
                a = function() {
                    t.setFromQuaternion(r, void 0, !1)
                };
            t.onChange(o), r.onChange(a), Object.defineProperties(this, {
                position: {
                    enumerable: !0,
                    value: e
                },
                rotation: {
                    enumerable: !0,
                    value: t
                },
                quaternion: {
                    enumerable: !0,
                    value: r
                },
                scale: {
                    enumerable: !0,
                    value: i
                }
            }), this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new n.Matrix4, this.matrixWorld = new n.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !1, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.userData = {}
        }, n.Object3D.DefaultUp = new n.Vector3(0, 1, 0), n.Object3D.prototype = {
            constructor: n.Object3D,
            get eulerOrder() {
                return console.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order
            },
            set eulerOrder(e) {
                console.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order = e
            },
            get useQuaternion() {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            },
            set useQuaternion(e) {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            },
            applyMatrix: function(e) {
                this.matrix.multiplyMatrices(e, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
            },
            setRotationFromAxisAngle: function(e, t) {
                this.quaternion.setFromAxisAngle(e, t)
            },
            setRotationFromEuler: function(e) {
                this.quaternion.setFromEuler(e, !0)
            },
            setRotationFromMatrix: function(e) {
                this.quaternion.setFromRotationMatrix(e)
            },
            setRotationFromQuaternion: function(e) {
                this.quaternion.copy(e)
            },
            rotateOnAxis: function() {
                var e = new n.Quaternion;
                return function(t, r) {
                    return e.setFromAxisAngle(t, r), this.quaternion.multiply(e), this
                }
            }(),
            rotateX: function() {
                var e = new n.Vector3(1, 0, 0);
                return function(t) {
                    return this.rotateOnAxis(e, t)
                }
            }(),
            rotateY: function() {
                var e = new n.Vector3(0, 1, 0);
                return function(t) {
                    return this.rotateOnAxis(e, t)
                }
            }(),
            rotateZ: function() {
                var e = new n.Vector3(0, 0, 1);
                return function(t) {
                    return this.rotateOnAxis(e, t)
                }
            }(),
            translateOnAxis: function() {
                var e = new n.Vector3;
                return function(t, r) {
                    return e.copy(t).applyQuaternion(this.quaternion), this.position.add(e.multiplyScalar(r)), this
                }
            }(),
            translate: function(e, t) {
                return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(t, e)
            },
            translateX: function() {
                var e = new n.Vector3(1, 0, 0);
                return function(t) {
                    return this.translateOnAxis(e, t)
                }
            }(),
            translateY: function() {
                var e = new n.Vector3(0, 1, 0);
                return function(t) {
                    return this.translateOnAxis(e, t)
                }
            }(),
            translateZ: function() {
                var e = new n.Vector3(0, 0, 1);
                return function(t) {
                    return this.translateOnAxis(e, t)
                }
            }(),
            localToWorld: function(e) {
                return e.applyMatrix4(this.matrixWorld)
            },
            worldToLocal: function() {
                var e = new n.Matrix4;
                return function(t) {
                    return t.applyMatrix4(e.getInverse(this.matrixWorld))
                }
            }(),
            lookAt: function() {
                var e = new n.Matrix4;
                return function(t) {
                    e.lookAt(t, this.position, this.up), this.quaternion.setFromRotationMatrix(e)
                }
            }(),
            add: function(e) {
                if (arguments.length > 1) {
                    for (var t = 0; t < arguments.length; t++) this.add(arguments[t]);
                    return this
                }
                return e === this ? (console.error("THREE.Object3D.add:", e, "can't be added as a child of itself."), this) : (e instanceof n.Object3D ? (void 0 !== e.parent && e.parent.remove(e), e.parent = this, e.dispatchEvent({
                    type: "added"
                }), this.children.push(e)) : console.error("THREE.Object3D.add:", e, "is not an instance of THREE.Object3D."), this)
            },
            remove: function(e) {
                if (arguments.length > 1)
                    for (var t = 0; t < arguments.length; t++) this.remove(arguments[t]);
                var r = this.children.indexOf(e); - 1 !== r && (e.parent = void 0, e.dispatchEvent({
                    type: "removed"
                }), this.children.splice(r, 1))
            },
            getChildByName: function(e, t) {
                return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(e, t)
            },
            getObjectById: function(e, t) {
                if (this.id === e) return this;
                for (var r = 0, i = this.children.length; i > r; r++) {
                    var n = this.children[r],
                        o = n.getObjectById(e, t);
                    if (void 0 !== o) return o
                }
                return void 0
            },
            getObjectByName: function(e, t) {
                if (this.name === e) return this;
                for (var r = 0, i = this.children.length; i > r; r++) {
                    var n = this.children[r],
                        o = n.getObjectByName(e, t);
                    if (void 0 !== o) return o
                }
                return void 0
            },
            getWorldPosition: function(e) {
                var t = e || new n.Vector3;
                return this.updateMatrixWorld(!0), t.setFromMatrixPosition(this.matrixWorld)
            },
            getWorldQuaternion: function() {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function(r) {
                    var i = r || new n.Quaternion;
                    return this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, i, t), i
                }
            }(),
            getWorldRotation: function() {
                var e = new n.Quaternion;
                return function(t) {
                    var r = t || new n.Euler;
                    return this.getWorldQuaternion(e), r.setFromQuaternion(e, this.rotation.order, !1)
                }
            }(),
            getWorldScale: function() {
                var e = new n.Vector3,
                    t = new n.Quaternion;
                return function(r) {
                    var i = r || new n.Vector3;
                    return this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, t, i), i
                }
            }(),
            getWorldDirection: function() {
                var e = new n.Quaternion;
                return function(t) {
                    var r = t || new n.Vector3;
                    return this.getWorldQuaternion(e), r.set(0, 0, 1).applyQuaternion(e)
                }
            }(),
            raycast: function() {},
            traverse: function(e) {
                e(this);
                for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverse(e)
            },
            traverseVisible: function(e) {
                if (this.visible !== !1) {
                    e(this);
                    for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverseVisible(e)
                }
            },
            updateMatrix: function() {
                this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
            },
            updateMatrixWorld: function(e) {
                this.matrixAutoUpdate === !0 && this.updateMatrix(), (this.matrixWorldNeedsUpdate === !0 || e === !0) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
                for (var t = 0, r = this.children.length; r > t; t++) this.children[t].updateMatrixWorld(e)
            },
            toJSON: function() {
                var e = {
                        metadata: {
                            version: 4.3,
                            type: "Object",
                            generator: "ObjectExporter"
                        }
                    },
                    t = {},
                    r = function(r) {
                        if (void 0 === e.geometries && (e.geometries = []), void 0 === t[r.uuid]) {
                            var i = r.toJSON();
                            delete i.metadata, t[r.uuid] = i, e.geometries.push(i)
                        }
                        return r.uuid
                    },
                    i = {},
                    o = function(t) {
                        if (void 0 === e.materials && (e.materials = []), void 0 === i[t.uuid]) {
                            var r = t.toJSON();
                            delete r.metadata, i[t.uuid] = r, e.materials.push(r)
                        }
                        return t.uuid
                    },
                    a = function(e) {
                        var t = {};
                        if (t.uuid = e.uuid, t.type = e.type, "" !== e.name && (t.name = e.name), "{}" !== JSON.stringify(e.userData) && (t.userData = e.userData), e.visible !== !0 && (t.visible = e.visible), e instanceof n.PerspectiveCamera ? (t.fov = e.fov, t.aspect = e.aspect, t.near = e.near, t.far = e.far) : e instanceof n.OrthographicCamera ? (t.left = e.left, t.right = e.right, t.top = e.top, t.bottom = e.bottom, t.near = e.near, t.far = e.far) : e instanceof n.AmbientLight ? t.color = e.color.getHex() : e instanceof n.DirectionalLight ? (t.color = e.color.getHex(), t.intensity = e.intensity) : e instanceof n.PointLight ? (t.color = e.color.getHex(), t.intensity = e.intensity, t.distance = e.distance) : e instanceof n.SpotLight ? (t.color = e.color.getHex(), t.intensity = e.intensity, t.distance = e.distance, t.angle = e.angle, t.exponent = e.exponent) : e instanceof n.HemisphereLight ? (t.color = e.color.getHex(), t.groundColor = e.groundColor.getHex()) : e instanceof n.Mesh ? (t.geometry = r(e.geometry), t.material = o(e.material)) : e instanceof n.Line ? (t.geometry = r(e.geometry), t.material = o(e.material)) : e instanceof n.Sprite && (t.material = o(e.material)), t.matrix = e.matrix.toArray(), e.children.length > 0) {
                            t.children = [];
                            for (var i = 0; i < e.children.length; i++) t.children.push(a(e.children[i]))
                        }
                        return t
                    };
                return e.object = a(this), e
            },
            clone: function(e, t) {
                if (void 0 === e && (e = new n.Object3D), void 0 === t && (t = !0), e.name = this.name, e.up.copy(this.up), e.position.copy(this.position), e.quaternion.copy(this.quaternion), e.scale.copy(this.scale), e.renderDepth = this.renderDepth, e.rotationAutoUpdate = this.rotationAutoUpdate, e.matrix.copy(this.matrix), e.matrixWorld.copy(this.matrixWorld), e.matrixAutoUpdate = this.matrixAutoUpdate, e.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, e.visible = this.visible, e.castShadow = this.castShadow, e.receiveShadow = this.receiveShadow, e.frustumCulled = this.frustumCulled, e.userData = JSON.parse(JSON.stringify(this.userData)), t === !0)
                    for (var r = 0; r < this.children.length; r++) {
                        var i = this.children[r];
                        e.add(i.clone())
                    }
                return e
            }
        }, n.EventDispatcher.prototype.apply(n.Object3D.prototype), n.Object3DIdCount = 0, n.Projector = function() {
            console.warn("THREE.Projector has been moved to /examples/renderers/Projector.js."), this.projectVector = function(e, t) {
                console.warn("THREE.Projector: .projectVector() is now vector.project()."), e.project(t)
            }, this.unprojectVector = function(e, t) {
                console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), e.unproject(t)
            }, this.pickingRay = function(e, t) {
                console.error("THREE.Projector: .pickingRay() has been removed.")
            }
        }, n.Face3 = function(e, t, r, i, o, a) {
            this.a = e, this.b = t, this.c = r, this.normal = i instanceof n.Vector3 ? i : new n.Vector3, this.vertexNormals = i instanceof Array ? i : [], this.color = o instanceof n.Color ? o : new n.Color, this.vertexColors = o instanceof Array ? o : [], this.vertexTangents = [], this.materialIndex = void 0 !== a ? a : 0
        }, n.Face3.prototype = {
            constructor: n.Face3,
            clone: function() {
                var e = new n.Face3(this.a, this.b, this.c);
                e.normal.copy(this.normal), e.color.copy(this.color), e.materialIndex = this.materialIndex;
                for (var t = 0, r = this.vertexNormals.length; r > t; t++) e.vertexNormals[t] = this.vertexNormals[t].clone();
                for (var t = 0, r = this.vertexColors.length; r > t; t++) e.vertexColors[t] = this.vertexColors[t].clone();
                for (var t = 0, r = this.vertexTangents.length; r > t; t++) e.vertexTangents[t] = this.vertexTangents[t].clone();
                return e
            }
        }, n.Face4 = function(e, t, r, i, o, a, s) {
            return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new n.Face3(e, t, r, o, a, s)
        }, n.BufferAttribute = function(e, t) {
            this.array = e, this.itemSize = t, this.needsUpdate = !1
        }, n.BufferAttribute.prototype = {
            constructor: n.BufferAttribute,
            get length() {
                return this.array.length
            },
            copyAt: function(e, t, r) {
                e *= this.itemSize, r *= t.itemSize;
                for (var i = 0, n = this.itemSize; n > i; i++) this.array[e + i] = t.array[r + i]
            },
            set: function(e) {
                return this.array.set(e), this
            },
            setX: function(e, t) {
                return this.array[e * this.itemSize] = t, this
            },
            setY: function(e, t) {
                return this.array[e * this.itemSize + 1] = t, this
            },
            setZ: function(e, t) {
                return this.array[e * this.itemSize + 2] = t, this
            },
            setXY: function(e, t, r) {
                return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this
            },
            setXYZ: function(e, t, r, i) {
                return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this
            },
            setXYZW: function(e, t, r, i, n) {
                return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this.array[e + 3] = n, this
            },
            clone: function() {
                return new n.BufferAttribute(new this.array.constructor(this.array), this.itemSize)
            }
        }, n.Int8Attribute = function(e, t) {
            return console.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint8Attribute = function(e, t) {
            return console.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint8ClampedAttribute = function(e, t) {
            return console.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Int16Attribute = function(e, t) {
            return console.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint16Attribute = function(e, t) {
            return console.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Int32Attribute = function(e, t) {
            return console.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Uint32Attribute = function(e, t) {
            return console.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Float32Attribute = function(e, t) {
            return console.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.Float64Attribute = function(e, t) {
            return console.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
        }, n.BufferGeometry = function() {
            Object.defineProperty(this, "id", {
                value: n.GeometryIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "BufferGeometry", this.attributes = {}, this.attributesKeys = [], this.drawcalls = [], this.offsets = this.drawcalls, this.boundingBox = null, this.boundingSphere = null
        }, n.BufferGeometry.prototype = {
            constructor: n.BufferGeometry,
            addAttribute: function(e, t) {
                return t instanceof n.BufferAttribute == !1 ? (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), void(this.attributes[e] = {
                    array: arguments[1],
                    itemSize: arguments[2]
                })) : (this.attributes[e] = t, void(this.attributesKeys = Object.keys(this.attributes)))
            },
            getAttribute: function(e) {
                return this.attributes[e]
            },
            addDrawCall: function(e, t, r) {
                this.drawcalls.push({
                    start: e,
                    count: t,
                    index: void 0 !== r ? r : 0
                })
            },
            applyMatrix: function(e) {
                var t = this.attributes.position;
                void 0 !== t && (e.applyToVector3Array(t.array), t.needsUpdate = !0);
                var r = this.attributes.normal;
                if (void 0 !== r) {
                    var i = (new n.Matrix3).getNormalMatrix(e);
                    i.applyToVector3Array(r.array), r.needsUpdate = !0
                }
            },
            center: function() {},
            fromGeometry: function(e, t) {
                t = t || {
                    vertexColors: n.NoColors
                };
                var r = e.vertices,
                    i = e.faces,
                    o = e.faceVertexUvs,
                    a = t.vertexColors,
                    s = o[0].length > 0,
                    h = 3 == i[0].vertexNormals.length,
                    l = new Float32Array(3 * i.length * 3);
                this.addAttribute("position", new n.BufferAttribute(l, 3));
                var c = new Float32Array(3 * i.length * 3);
                if (this.addAttribute("normal", new n.BufferAttribute(c, 3)), a !== n.NoColors) {
                    var u = new Float32Array(3 * i.length * 3);
                    this.addAttribute("color", new n.BufferAttribute(u, 3))
                }
                if (s === !0) {
                    var f = new Float32Array(3 * i.length * 2);
                    this.addAttribute("uv", new n.BufferAttribute(f, 2))
                }
                for (var p = 0, d = 0, m = 0; p < i.length; p++, d += 6, m += 9) {
                    var v = i[p],
                        g = r[v.a],
                        y = r[v.b],
                        x = r[v.c];
                    if (l[m] = g.x, l[m + 1] = g.y, l[m + 2] = g.z, l[m + 3] = y.x, l[m + 4] = y.y, l[m + 5] = y.z, l[m + 6] = x.x, l[m + 7] = x.y, l[m + 8] = x.z, h === !0) {
                        var _ = v.vertexNormals[0],
                            b = v.vertexNormals[1],
                            w = v.vertexNormals[2];
                        c[m] = _.x, c[m + 1] = _.y, c[m + 2] = _.z, c[m + 3] = b.x, c[m + 4] = b.y, c[m + 5] = b.z, c[m + 6] = w.x, c[m + 7] = w.y, c[m + 8] = w.z
                    } else {
                        var M = v.normal;
                        c[m] = M.x, c[m + 1] = M.y, c[m + 2] = M.z, c[m + 3] = M.x, c[m + 4] = M.y, c[m + 5] = M.z, c[m + 6] = M.x, c[m + 7] = M.y, c[m + 8] = M.z
                    }
                    if (a === n.FaceColors) {
                        var S = v.color;
                        u[m] = S.r, u[m + 1] = S.g, u[m + 2] = S.b, u[m + 3] = S.r, u[m + 4] = S.g, u[m + 5] = S.b, u[m + 6] = S.r, u[m + 7] = S.g, u[m + 8] = S.b
                    } else if (a === n.VertexColors) {
                        var T = v.vertexColors[0],
                            C = v.vertexColors[1],
                            E = v.vertexColors[2];
                        u[m] = T.r, u[m + 1] = T.g, u[m + 2] = T.b, u[m + 3] = C.r, u[m + 4] = C.g, u[m + 5] = C.b, u[m + 6] = E.r, u[m + 7] = E.g, u[m + 8] = E.b
                    }
                    if (s === !0) {
                        var A = o[0][p][0],
                            L = o[0][p][1],
                            P = o[0][p][2];
                        f[d] = A.x, f[d + 1] = A.y, f[d + 2] = L.x, f[d + 3] = L.y, f[d + 4] = P.x, f[d + 5] = P.y
                    }
                }
                return this.computeBoundingSphere(), this
            },
            computeBoundingBox: function() {
                var e = new n.Vector3;
                return function() {
                    null === this.boundingBox && (this.boundingBox = new n.Box3);
                    var t = this.attributes.position.array;
                    if (t) {
                        var r = this.boundingBox;
                        r.makeEmpty();
                        for (var i = 0, o = t.length; o > i; i += 3) e.set(t[i], t[i + 1], t[i + 2]), r.expandByPoint(e)
                    }(void 0 === t || 0 === t.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
                }
            }(),
            computeBoundingSphere: function() {
                var e = new n.Box3,
                    t = new n.Vector3;
                return function() {
                    null === this.boundingSphere && (this.boundingSphere = new n.Sphere);
                    var r = this.attributes.position.array;
                    if (r) {
                        e.makeEmpty();
                        for (var i = this.boundingSphere.center, o = 0, a = r.length; a > o; o += 3) t.set(r[o], r[o + 1], r[o + 2]), e.expandByPoint(t);
                        e.center(i);
                        for (var s = 0, o = 0, a = r.length; a > o; o += 3) t.set(r[o], r[o + 1], r[o + 2]), s = Math.max(s, i.distanceToSquared(t));
                        this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
                    }
                }
            }(),
            computeFaceNormals: function() {},
            computeVertexNormals: function() {
                var e = this.attributes;
                if (e.position) {
                    var t = e.position.array;
                    if (void 0 === e.normal) this.addAttribute("normal", new n.BufferAttribute(new Float32Array(t.length), 3));
                    else
                        for (var r = e.normal.array, i = 0, o = r.length; o > i; i++) r[i] = 0;
                    var a, s, h, r = e.normal.array,
                        l = new n.Vector3,
                        c = new n.Vector3,
                        u = new n.Vector3,
                        f = new n.Vector3,
                        p = new n.Vector3;
                    if (e.index)
                        for (var d = e.index.array, m = this.offsets.length > 0 ? this.offsets : [{
                            start: 0,
                            count: d.length,
                            index: 0
                        }], v = 0, g = m.length; g > v; ++v)
                            for (var y = m[v].start, x = m[v].count, _ = m[v].index, i = y, o = y + x; o > i; i += 3) a = 3 * (_ + d[i]), s = 3 * (_ + d[i + 1]), h = 3 * (_ + d[i + 2]), l.fromArray(t, a), c.fromArray(t, s), u.fromArray(t, h), f.subVectors(u, c), p.subVectors(l, c), f.cross(p), r[a] += f.x, r[a + 1] += f.y, r[a + 2] += f.z, r[s] += f.x, r[s + 1] += f.y, r[s + 2] += f.z, r[h] += f.x, r[h + 1] += f.y, r[h + 2] += f.z;
                    else
                        for (var i = 0, o = t.length; o > i; i += 9) l.fromArray(t, i), c.fromArray(t, i + 3), u.fromArray(t, i + 6), f.subVectors(u, c), p.subVectors(l, c), f.cross(p), r[i] = f.x, r[i + 1] = f.y, r[i + 2] = f.z, r[i + 3] = f.x, r[i + 4] = f.y, r[i + 5] = f.z, r[i + 6] = f.x, r[i + 7] = f.y, r[i + 8] = f.z;
                    this.normalizeNormals(), e.normal.needsUpdate = !0
                }
            },
            computeTangents: function() {
                function e(e, t, r) {
                    P.fromArray(i, 3 * e), R.fromArray(i, 3 * t), F.fromArray(i, 3 * r), D.fromArray(a, 2 * e), U.fromArray(a, 2 * t), z.fromArray(a, 2 * r), f = R.x - P.x, p = F.x - P.x, d = R.y - P.y, m = F.y - P.y, v = R.z - P.z, g = F.z - P.z, y = U.x - D.x, x = z.x - D.x, _ = U.y - D.y, b = z.y - D.y, w = 1 / (y * b - x * _), B.set((b * f - _ * p) * w, (b * d - _ * m) * w, (b * v - _ * g) * w), V.set((y * p - x * f) * w, (y * m - x * d) * w, (y * g - x * v) * w), l[e].add(B), l[t].add(B), l[r].add(B), c[e].add(V), c[t].add(V), c[r].add(V)
                }
                function t(e) {
                    q.fromArray(o, 3 * e), Y.copy(q), H = l[e], j.copy(H), j.sub(q.multiplyScalar(q.dot(H))).normalize(), X.crossVectors(Y, H), W = X.dot(c[e]), G = 0 > W ? -1 : 1, h[4 * e] = j.x, h[4 * e + 1] = j.y, h[4 * e + 2] = j.z, h[4 * e + 3] = G
                }
                if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) return void console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
                var r = this.attributes.index.array,
                    i = this.attributes.position.array,
                    o = this.attributes.normal.array,
                    a = this.attributes.uv.array,
                    s = i.length / 3;
                void 0 === this.attributes.tangent && this.addAttribute("tangent", new n.BufferAttribute(new Float32Array(4 * s), 4));
                for (var h = this.attributes.tangent.array, l = [], c = [], u = 0; s > u; u++) l[u] = new n.Vector3, c[u] = new n.Vector3;
                var f, p, d, m, v, g, y, x, _, b, w, M, S, T, C, E, A, L, P = new n.Vector3,
                    R = new n.Vector3,
                    F = new n.Vector3,
                    D = new n.Vector2,
                    U = new n.Vector2,
                    z = new n.Vector2,
                    B = new n.Vector3,
                    V = new n.Vector3;
                0 === this.drawcalls.length && this.addDrawCall(0, r.length, 0);
                var k = this.drawcalls;
                for (T = 0, C = k.length; C > T; ++T) {
                    var N = k[T].start,
                        O = k[T].count,
                        I = k[T].index;
                    for (M = N, S = N + O; S > M; M += 3) E = I + r[M], A = I + r[M + 1], L = I + r[M + 2], e(E, A, L)
                }
                var G, H, W, j = new n.Vector3,
                    X = new n.Vector3,
                    q = new n.Vector3,
                    Y = new n.Vector3;
                for (T = 0, C = k.length; C > T; ++T) {
                    var N = k[T].start,
                        O = k[T].count,
                        I = k[T].index;
                    for (M = N, S = N + O; S > M; M += 3) E = I + r[M], A = I + r[M + 1], L = I + r[M + 2], t(E), t(A), t(L)
                }
            },
            computeOffsets: function(e) {
                var t = e;
                void 0 === e && (t = 65535);
                for (var r = (Date.now(), this.attributes.index.array), i = this.attributes.position.array, n = (i.length / 3, r.length / 3), o = new Uint16Array(r.length), a = 0, s = 0, h = [{
                    start: 0,
                    count: 0,
                    index: 0
                }], l = h[0], c = 0, u = 0, f = new Int32Array(6), p = new Int32Array(i.length), d = new Int32Array(i.length), m = 0; m < i.length; m++) p[m] = -1, d[m] = -1;
                for (var v = 0; n > v; v++) {
                    u = 0;
                    for (var g = 0; 3 > g; g++) {
                        var y = r[3 * v + g]; - 1 == p[y] ? (f[2 * g] = y, f[2 * g + 1] = -1, u++) : p[y] < l.index ? (f[2 * g] = y, f[2 * g + 1] = -1, c++) : (f[2 * g] = y, f[2 * g + 1] = p[y])
                    }
                    var x = s + u;
                    if (x > l.index + t) {
                        var _ = {
                            start: a,
                            count: 0,
                            index: s
                        };
                        h.push(_), l = _;
                        for (var b = 0; 6 > b; b += 2) {
                            var w = f[b + 1];
                            w > -1 && w < l.index && (f[b + 1] = -1)
                        }
                    }
                    for (var b = 0; 6 > b; b += 2) {
                        var y = f[b],
                            w = f[b + 1]; - 1 === w && (w = s++), p[y] = w, d[w] = y, o[a++] = w - l.index, l.count++
                    }
                }
                return this.reorderBuffers(o, d, s), this.offsets = h, h
            },
            merge: function() {
                console.log("BufferGeometry.merge(): TODO")
            },
            normalizeNormals: function() {
                for (var e, t, r, i, n = this.attributes.normal.array, o = 0, a = n.length; a > o; o += 3) e = n[o], t = n[o + 1], r = n[o + 2], i = 1 / Math.sqrt(e * e + t * t + r * r), n[o] *= i, n[o + 1] *= i, n[o + 2] *= i
            },
            reorderBuffers: function(e, t, r) {
                var i = {};
                for (var n in this.attributes)
                    if ("index" != n) {
                        var o = this.attributes[n].array;
                        i[n] = new o.constructor(this.attributes[n].itemSize * r)
                    }
                for (var a = 0; r > a; a++) {
                    var s = t[a];
                    for (var n in this.attributes)
                        if ("index" != n)
                            for (var h = this.attributes[n].array, l = this.attributes[n].itemSize, c = i[n], u = 0; l > u; u++) c[a * l + u] = h[s * l + u]
                }
                this.attributes.index.array = e;
                for (var n in this.attributes) "index" != n && (this.attributes[n].array = i[n], this.attributes[n].numItems = this.attributes[n].itemSize * r)
            },
            toJSON: function() {
                var e = {
                        metadata: {
                            version: 4,
                            type: "BufferGeometry",
                            generator: "BufferGeometryExporter"
                        },
                        uuid: this.uuid,
                        type: this.type,
                        data: {
                            attributes: {}
                        }
                    },
                    t = this.attributes,
                    r = this.offsets,
                    i = this.boundingSphere;
                for (var n in t) {
                    for (var o = t[n], a = [], s = o.array, h = 0, l = s.length; l > h; h++) a[h] = s[h];
                    e.data.attributes[n] = {
                        itemSize: o.itemSize,
                        type: o.array.constructor.name,
                        array: a
                    }
                }
                return r.length > 0 && (e.data.offsets = JSON.parse(JSON.stringify(r))), null !== i && (e.data.boundingSphere = {
                    center: i.center.toArray(),
                    radius: i.radius
                }), e
            },
            clone: function() {
                var e = new n.BufferGeometry;
                for (var t in this.attributes) {
                    var r = this.attributes[t];
                    e.addAttribute(t, r.clone())
                }
                for (var i = 0, o = this.offsets.length; o > i; i++) {
                    var a = this.offsets[i];
                    e.offsets.push({
                        start: a.start,
                        index: a.index,
                        count: a.count
                    })
                }
                return e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.BufferGeometry.prototype), n.Geometry = function() {
            Object.defineProperty(this, "id", {
                value: n.GeometryIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
                []
            ], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.dynamic = !0, this.verticesNeedUpdate = !1, this.elementsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.tangentsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
        }, n.Geometry.prototype = {
            constructor: n.Geometry,
            applyMatrix: function(e) {
                for (var t = (new n.Matrix3).getNormalMatrix(e), r = 0, i = this.vertices.length; i > r; r++) {
                    var o = this.vertices[r];
                    o.applyMatrix4(e)
                }
                for (var r = 0, i = this.faces.length; i > r; r++) {
                    var a = this.faces[r];
                    a.normal.applyMatrix3(t).normalize();
                    for (var s = 0, h = a.vertexNormals.length; h > s; s++) a.vertexNormals[s].applyMatrix3(t).normalize()
                }
                this.boundingBox instanceof n.Box3 && this.computeBoundingBox(), this.boundingSphere instanceof n.Sphere && this.computeBoundingSphere()
            },
            fromBufferGeometry: function(e) {
                for (var t = this, r = e.attributes, i = r.position.array, o = void 0 !== r.index ? r.index.array : void 0, a = void 0 !== r.normal ? r.normal.array : void 0, s = void 0 !== r.color ? r.color.array : void 0, h = void 0 !== r.uv ? r.uv.array : void 0, l = [], c = [], u = 0, f = 0; u < i.length; u += 3, f += 2) t.vertices.push(new n.Vector3(i[u], i[u + 1], i[u + 2])), void 0 !== a && l.push(new n.Vector3(a[u], a[u + 1], a[u + 2])), void 0 !== s && t.colors.push(new n.Color(s[u], s[u + 1], s[u + 2])), void 0 !== h && c.push(new n.Vector2(h[f], h[f + 1]));
                var p = function(e, r, i) {
                    var o = void 0 !== a ? [l[e].clone(), l[r].clone(), l[i].clone()] : [],
                        h = void 0 !== s ? [t.colors[e].clone(), t.colors[r].clone(), t.colors[i].clone()] : [];
                    t.faces.push(new n.Face3(e, r, i, o, h)), t.faceVertexUvs[0].push([c[e], c[r], c[i]])
                };
                if (void 0 !== o)
                    for (var u = 0; u < o.length; u += 3) p(o[u], o[u + 1], o[u + 2]);
                else
                    for (var u = 0; u < i.length / 3; u += 3) p(u, u + 1, u + 2);
                return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
            },
            center: function() {
                this.computeBoundingBox();
                var e = new n.Vector3;
                return e.addVectors(this.boundingBox.min, this.boundingBox.max), e.multiplyScalar(-.5), this.applyMatrix((new n.Matrix4).makeTranslation(e.x, e.y, e.z)), this.computeBoundingBox(), e
            },
            computeFaceNormals: function() {
                for (var e = new n.Vector3, t = new n.Vector3, r = 0, i = this.faces.length; i > r; r++) {
                    var o = this.faces[r],
                        a = this.vertices[o.a],
                        s = this.vertices[o.b],
                        h = this.vertices[o.c];
                    e.subVectors(h, s), t.subVectors(a, s), e.cross(t), e.normalize(), o.normal.copy(e)
                }
            },
            computeVertexNormals: function(e) {
                var t, r, i, o, a, s;
                for (s = new Array(this.vertices.length), t = 0, r = this.vertices.length; r > t; t++) s[t] = new n.Vector3;
                if (e) {
                    var h, l, c, u = new n.Vector3,
                        f = new n.Vector3;
                    new n.Vector3, new n.Vector3, new n.Vector3;
                    for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], h = this.vertices[a.a], l = this.vertices[a.b], c = this.vertices[a.c], u.subVectors(c, l), f.subVectors(h, l), u.cross(f), s[a.a].add(u), s[a.b].add(u), s[a.c].add(u)
                } else
                    for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], s[a.a].add(a.normal), s[a.b].add(a.normal), s[a.c].add(a.normal);
                for (t = 0, r = this.vertices.length; r > t; t++) s[t].normalize();
                for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], a.vertexNormals[0] = s[a.a].clone(), a.vertexNormals[1] = s[a.b].clone(), a.vertexNormals[2] = s[a.c].clone()
            },
            computeMorphNormals: function() {
                var e, t, r, i, o;
                for (r = 0, i = this.faces.length; i > r; r++)
                    for (o = this.faces[r], o.__originalFaceNormal ? o.__originalFaceNormal.copy(o.normal) : o.__originalFaceNormal = o.normal.clone(), o.__originalVertexNormals || (o.__originalVertexNormals = []), e = 0, t = o.vertexNormals.length; t > e; e++) o.__originalVertexNormals[e] ? o.__originalVertexNormals[e].copy(o.vertexNormals[e]) : o.__originalVertexNormals[e] = o.vertexNormals[e].clone();
                var a = new n.Geometry;
                for (a.faces = this.faces, e = 0, t = this.morphTargets.length; t > e; e++) {
                    if (!this.morphNormals[e]) {
                        this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [];
                        var s, h, l = this.morphNormals[e].faceNormals,
                            c = this.morphNormals[e].vertexNormals;
                        for (r = 0, i = this.faces.length; i > r; r++) s = new n.Vector3, h = {
                            a: new n.Vector3,
                            b: new n.Vector3,
                            c: new n.Vector3
                        }, l.push(s), c.push(h)
                    }
                    var u = this.morphNormals[e];
                    a.vertices = this.morphTargets[e].vertices, a.computeFaceNormals(), a.computeVertexNormals();
                    var s, h;
                    for (r = 0, i = this.faces.length; i > r; r++) o = this.faces[r], s = u.faceNormals[r], h = u.vertexNormals[r], s.copy(o.normal), h.a.copy(o.vertexNormals[0]), h.b.copy(o.vertexNormals[1]), h.c.copy(o.vertexNormals[2])
                }
                for (r = 0, i = this.faces.length; i > r; r++) o = this.faces[r], o.normal = o.__originalFaceNormal, o.vertexNormals = o.__originalVertexNormals
            },
            computeTangents: function() {
                function e(e, t, r, i, n, o, a) {
                    c = e.vertices[t], u = e.vertices[r], f = e.vertices[i], p = l[n], d = l[o], m = l[a], v = u.x - c.x, g = f.x - c.x, y = u.y - c.y, x = f.y - c.y, _ = u.z - c.z, b = f.z - c.z, w = d.x - p.x, M = m.x - p.x, S = d.y - p.y, T = m.y - p.y, C = 1 / (w * T - M * S), F.set((T * v - S * g) * C, (T * y - S * x) * C, (T * _ - S * b) * C), D.set((w * g - M * v) * C, (w * x - M * y) * C, (w * b - M * _) * C), P[t].add(F), P[r].add(F), P[i].add(F), R[t].add(D), R[r].add(D), R[i].add(D)
                }
                var t, r, i, o, a, s, h, l, c, u, f, p, d, m, v, g, y, x, _, b, w, M, S, T, C, E, A, L, P = [],
                    R = [],
                    F = new n.Vector3,
                    D = new n.Vector3,
                    U = new n.Vector3,
                    z = new n.Vector3,
                    B = new n.Vector3;
                for (i = 0, o = this.vertices.length; o > i; i++) P[i] = new n.Vector3, R[i] = new n.Vector3;
                for (t = 0, r = this.faces.length; r > t; t++) h = this.faces[t], l = this.faceVertexUvs[0][t], e(this, h.a, h.b, h.c, 0, 1, 2);
                var V = ["a", "b", "c", "d"];
                for (t = 0, r = this.faces.length; r > t; t++)
                    for (h = this.faces[t], a = 0; a < Math.min(h.vertexNormals.length, 3); a++) B.copy(h.vertexNormals[a]), s = h[V[a]], E = P[s], U.copy(E), U.sub(B.multiplyScalar(B.dot(E))).normalize(), z.crossVectors(h.vertexNormals[a], E), A = z.dot(R[s]), L = 0 > A ? -1 : 1, h.vertexTangents[a] = new n.Vector4(U.x, U.y, U.z, L);
                this.hasTangents = !0
            },
            computeLineDistances: function() {
                for (var e = 0, t = this.vertices, r = 0, i = t.length; i > r; r++) r > 0 && (e += t[r].distanceTo(t[r - 1])), this.lineDistances[r] = e
            },
            computeBoundingBox: function() {
                null === this.boundingBox && (this.boundingBox = new n.Box3), this.boundingBox.setFromPoints(this.vertices)
            },
            computeBoundingSphere: function() {
                null === this.boundingSphere && (this.boundingSphere = new n.Sphere), this.boundingSphere.setFromPoints(this.vertices)
            },
            merge: function(e, t, r) {
                if (e instanceof n.Geometry == !1) return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e);
                var i, o = this.vertices.length,
                    a = this.vertices,
                    s = e.vertices,
                    h = this.faces,
                    l = e.faces,
                    c = this.faceVertexUvs[0],
                    u = e.faceVertexUvs[0];
                void 0 === r && (r = 0), void 0 !== t && (i = (new n.Matrix3).getNormalMatrix(t));
                for (var f = 0, p = s.length; p > f; f++) {
                    var d = s[f],
                        m = d.clone();
                    void 0 !== t && m.applyMatrix4(t), a.push(m)
                }
                for (f = 0, p = l.length; p > f; f++) {
                    var v, g, y, x = l[f],
                        _ = x.vertexNormals,
                        b = x.vertexColors;
                    v = new n.Face3(x.a + o, x.b + o, x.c + o), v.normal.copy(x.normal), void 0 !== i && v.normal.applyMatrix3(i).normalize();
                    for (var w = 0, M = _.length; M > w; w++) g = _[w].clone(), void 0 !== i && g.applyMatrix3(i).normalize(), v.vertexNormals.push(g);
                    v.color.copy(x.color);
                    for (var w = 0, M = b.length; M > w; w++) y = b[w], v.vertexColors.push(y.clone());
                    v.materialIndex = x.materialIndex + r, h.push(v)
                }
                for (f = 0, p = u.length; p > f; f++) {
                    var S = u[f],
                        T = [];
                    if (void 0 !== S) {
                        for (var w = 0, M = S.length; M > w; w++) T.push(new n.Vector2(S[w].x, S[w].y));
                        c.push(T)
                    }
                }
            },
            mergeVertices: function() {
                var e, t, r, i, n, o, a, s, h = {},
                    l = [],
                    c = [],
                    u = 4,
                    f = Math.pow(10, u);
                for (r = 0, i = this.vertices.length; i > r; r++) e = this.vertices[r], t = Math.round(e.x * f) + "_" + Math.round(e.y * f) + "_" + Math.round(e.z * f), void 0 === h[t] ? (h[t] = r, l.push(this.vertices[r]), c[r] = l.length - 1) : c[r] = c[h[t]];
                var p = [];
                for (r = 0, i = this.faces.length; i > r; r++) {
                    n = this.faces[r], n.a = c[n.a], n.b = c[n.b], n.c = c[n.c], o = [n.a, n.b, n.c];
                    for (var d = -1, m = 0; 3 > m; m++)
                        if (o[m] == o[(m + 1) % 3]) {
                            d = m, p.push(r);
                            break
                        }
                }
                for (r = p.length - 1; r >= 0; r--) {
                    var v = p[r];
                    for (this.faces.splice(v, 1), a = 0, s = this.faceVertexUvs.length; s > a; a++) this.faceVertexUvs[a].splice(v, 1)
                }
                var g = this.vertices.length - l.length;
                return this.vertices = l, g
            },
            toJSON: function() {
                function e(e, t, r) {
                    return r ? e | 1 << t : e & ~(1 << t)
                }
                function t(e) {
                    var t = e.x.toString() + e.y.toString() + e.z.toString();
                    return void 0 !== f[t] ? f[t] : (f[t] = u.length / 3, u.push(e.x, e.y, e.z), f[t])
                }
                function r(e) {
                    var t = e.r.toString() + e.g.toString() + e.b.toString();
                    return void 0 !== d[t] ? d[t] : (d[t] = p.length, p.push(e.getHex()), d[t])
                }
                function i(e) {
                    var t = e.x.toString() + e.y.toString();
                    return void 0 !== v[t] ? v[t] : (v[t] = m.length / 2, m.push(e.x, e.y), v[t])
                }
                var n = {
                    metadata: {
                        version: 4,
                        type: "BufferGeometry",
                        generator: "BufferGeometryExporter"
                    },
                    uuid: this.uuid,
                    type: this.type
                };
                if ("" !== this.name && (n.name = this.name), void 0 !== this.parameters) {
                    var o = this.parameters;
                    for (var a in o) void 0 !== o[a] && (n[a] = o[a]);
                    return n
                }
                for (var s = [], h = 0; h < this.vertices.length; h++) {
                    var l = this.vertices[h];
                    s.push(l.x, l.y, l.z)
                }
                for (var c = [], u = [], f = {}, p = [], d = {}, m = [], v = {}, h = 0; h < this.faces.length; h++) {
                    var g = this.faces[h],
                        y = !1,
                        x = !1,
                        _ = void 0 !== this.faceVertexUvs[0][h],
                        b = g.normal.length() > 0,
                        w = g.vertexNormals.length > 0,
                        M = 1 !== g.color.r || 1 !== g.color.g || 1 !== g.color.b,
                        S = g.vertexColors.length > 0,
                        T = 0;
                    if (T = e(T, 0, 0), T = e(T, 1, y), T = e(T, 2, x), T = e(T, 3, _), T = e(T, 4, b), T = e(T, 5, w), T = e(T, 6, M), T = e(T, 7, S), c.push(T), c.push(g.a, g.b, g.c), _) {
                        var C = this.faceVertexUvs[0][h];
                        c.push(i(C[0]), i(C[1]), i(C[2]))
                    }
                    if (b && c.push(t(g.normal)), w) {
                        var E = g.vertexNormals;
                        c.push(t(E[0]), t(E[1]), t(E[2]))
                    }
                    if (M && c.push(r(g.color)), S) {
                        var A = g.vertexColors;
                        c.push(r(A[0]), r(A[1]), r(A[2]))
                    }
                }
                return n.data = {}, n.data.vertices = s, n.data.normals = u, p.length > 0 && (n.data.colors = p), m.length > 0 && (n.data.uvs = [m]), n.data.faces = c, n
            },
            clone: function() {
                for (var e = new n.Geometry, t = this.vertices, r = 0, i = t.length; i > r; r++) e.vertices.push(t[r].clone());
                for (var o = this.faces, r = 0, i = o.length; i > r; r++) e.faces.push(o[r].clone());
                for (var a = this.faceVertexUvs[0], r = 0, i = a.length; i > r; r++) {
                    for (var s = a[r], h = [], l = 0, c = s.length; c > l; l++) h.push(new n.Vector2(s[l].x, s[l].y));
                    e.faceVertexUvs[0].push(h)
                }
                return e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.Geometry.prototype), n.GeometryIdCount = 0, n.Camera = function() {
            n.Object3D.call(this), this.type = "Camera", this.matrixWorldInverse = new n.Matrix4, this.projectionMatrix = new n.Matrix4
        }, n.Camera.prototype = Object.create(n.Object3D.prototype), n.Camera.prototype.getWorldDirection = function() {
            var e = new n.Quaternion;
            return function(t) {
                var r = t || new n.Vector3;
                return this.getWorldQuaternion(e), r.set(0, 0, -1).applyQuaternion(e)
            }
        }(), n.Camera.prototype.lookAt = function() {
            var e = new n.Matrix4;
            return function(t) {
                e.lookAt(this.position, t, this.up), this.quaternion.setFromRotationMatrix(e)
            }
        }(), n.Camera.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Camera), n.Object3D.prototype.clone.call(this, e), e.matrixWorldInverse.copy(this.matrixWorldInverse), e.projectionMatrix.copy(this.projectionMatrix), e
        }, n.CubeCamera = function(e, t, r) {
            n.Object3D.call(this), this.type = "CubeCamera";
            var i = 90,
                o = 1,
                a = new n.PerspectiveCamera(i, o, e, t);
            a.up.set(0, -1, 0), a.lookAt(new n.Vector3(1, 0, 0)), this.add(a);
            var s = new n.PerspectiveCamera(i, o, e, t);
            s.up.set(0, -1, 0), s.lookAt(new n.Vector3(-1, 0, 0)), this.add(s);
            var h = new n.PerspectiveCamera(i, o, e, t);
            h.up.set(0, 0, 1), h.lookAt(new n.Vector3(0, 1, 0)), this.add(h);
            var l = new n.PerspectiveCamera(i, o, e, t);
            l.up.set(0, 0, -1), l.lookAt(new n.Vector3(0, -1, 0)), this.add(l);
            var c = new n.PerspectiveCamera(i, o, e, t);
            c.up.set(0, -1, 0), c.lookAt(new n.Vector3(0, 0, 1)), this.add(c);
            var u = new n.PerspectiveCamera(i, o, e, t);
            u.up.set(0, -1, 0), u.lookAt(new n.Vector3(0, 0, -1)), this.add(u), this.renderTarget = new n.WebGLRenderTargetCube(r, r, {
                format: n.RGBFormat,
                magFilter: n.LinearFilter,
                minFilter: n.LinearFilter
            }), this.updateCubeMap = function(e, t) {
                var r = this.renderTarget,
                    i = r.generateMipmaps;
                r.generateMipmaps = !1, r.activeCubeFace = 0, e.render(t, a, r), r.activeCubeFace = 1, e.render(t, s, r), r.activeCubeFace = 2, e.render(t, h, r), r.activeCubeFace = 3, e.render(t, l, r), r.activeCubeFace = 4, e.render(t, c, r), r.generateMipmaps = i, r.activeCubeFace = 5, e.render(t, u, r)
            }
        }, n.CubeCamera.prototype = Object.create(n.Object3D.prototype), n.OrthographicCamera = function(e, t, r, i, o, a) {
            n.Camera.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.left = e, this.right = t, this.top = r, this.bottom = i, this.near = void 0 !== o ? o : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix()
        }, n.OrthographicCamera.prototype = Object.create(n.Camera.prototype), n.OrthographicCamera.prototype.updateProjectionMatrix = function() {
            var e = (this.right - this.left) / (2 * this.zoom),
                t = (this.top - this.bottom) / (2 * this.zoom),
                r = (this.right + this.left) / 2,
                i = (this.top + this.bottom) / 2;
            this.projectionMatrix.makeOrthographic(r - e, r + e, i + t, i - t, this.near, this.far)
        }, n.OrthographicCamera.prototype.clone = function() {
            var e = new n.OrthographicCamera;
            return n.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.left = this.left, e.right = this.right, e.top = this.top, e.bottom = this.bottom, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
        }, n.PerspectiveCamera = function(e, t, r, i) {
            n.Camera.call(this), this.type = "PerspectiveCamera", this.zoom = 1, this.fov = void 0 !== e ? e : 50, this.aspect = void 0 !== t ? t : 1, this.near = void 0 !== r ? r : .1, this.far = void 0 !== i ? i : 2e3, this.updateProjectionMatrix()
        }, n.PerspectiveCamera.prototype = Object.create(n.Camera.prototype), n.PerspectiveCamera.prototype.setLens = function(e, t) {
            void 0 === t && (t = 24), this.fov = 2 * n.Math.radToDeg(Math.atan(t / (2 * e))), this.updateProjectionMatrix()
        }, n.PerspectiveCamera.prototype.setViewOffset = function(e, t, r, i, n, o) {
            this.fullWidth = e, this.fullHeight = t, this.x = r, this.y = i, this.width = n, this.height = o, this.updateProjectionMatrix()
        }, n.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
            var e = n.Math.radToDeg(2 * Math.atan(Math.tan(.5 * n.Math.degToRad(this.fov)) / this.zoom));
            if (this.fullWidth) {
                var t = this.fullWidth / this.fullHeight,
                    r = Math.tan(n.Math.degToRad(.5 * e)) * this.near,
                    i = -r,
                    o = t * i,
                    a = t * r,
                    s = Math.abs(a - o),
                    h = Math.abs(r - i);
                this.projectionMatrix.makeFrustum(o + this.x * s / this.fullWidth, o + (this.x + this.width) * s / this.fullWidth, r - (this.y + this.height) * h / this.fullHeight, r - this.y * h / this.fullHeight, this.near, this.far)
            } else this.projectionMatrix.makePerspective(e, this.aspect, this.near, this.far)
        }, n.PerspectiveCamera.prototype.clone = function() {
            var e = new n.PerspectiveCamera;
            return n.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.fov = this.fov, e.aspect = this.aspect, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
        }, n.Light = function(e) {
            n.Object3D.call(this), this.type = "Light", this.color = new n.Color(e)
        }, n.Light.prototype = Object.create(n.Object3D.prototype), n.Light.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Light), n.Object3D.prototype.clone.call(this, e), e.color.copy(this.color), e
        }, n.AmbientLight = function(e) {
            n.Light.call(this, e), this.type = "AmbientLight"
        }, n.AmbientLight.prototype = Object.create(n.Light.prototype), n.AmbientLight.prototype.clone = function() {
            var e = new n.AmbientLight;
            return n.Light.prototype.clone.call(this, e), e
        }, n.AreaLight = function(e, t) {
            n.Light.call(this, e), this.type = "AreaLight", this.normal = new n.Vector3(0, -1, 0), this.right = new n.Vector3(1, 0, 0), this.intensity = void 0 !== t ? t : 1, this.width = 1, this.height = 1, this.constantAttenuation = 1.5, this.linearAttenuation = .5, this.quadraticAttenuation = .1
        }, n.AreaLight.prototype = Object.create(n.Light.prototype), n.DirectionalLight = function(e, t) {
            n.Light.call(this, e), this.type = "DirectionalLight", this.position.set(0, 1, 0), this.target = new n.Object3D, this.intensity = void 0 !== t ? t : 1, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraRight = 500, this.shadowCameraTop = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new n.Vector3(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
        }, n.DirectionalLight.prototype = Object.create(n.Light.prototype), n.DirectionalLight.prototype.clone = function() {
            var e = new n.DirectionalLight;
            return n.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraLeft = this.shadowCameraLeft, e.shadowCameraRight = this.shadowCameraRight, e.shadowCameraTop = this.shadowCameraTop, e.shadowCameraBottom = this.shadowCameraBottom, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e.shadowCascade = this.shadowCascade, e.shadowCascadeOffset.copy(this.shadowCascadeOffset), e.shadowCascadeCount = this.shadowCascadeCount, e.shadowCascadeBias = this.shadowCascadeBias.slice(0), e.shadowCascadeWidth = this.shadowCascadeWidth.slice(0), e.shadowCascadeHeight = this.shadowCascadeHeight.slice(0), e.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0), e.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0), e
        }, n.HemisphereLight = function(e, t, r) {
            n.Light.call(this, e), this.type = "HemisphereLight", this.position.set(0, 100, 0), this.groundColor = new n.Color(t), this.intensity = void 0 !== r ? r : 1
        }, n.HemisphereLight.prototype = Object.create(n.Light.prototype), n.HemisphereLight.prototype.clone = function() {
            var e = new n.HemisphereLight;
            return n.Light.prototype.clone.call(this, e), e.groundColor.copy(this.groundColor), e.intensity = this.intensity, e
        }, n.PointLight = function(e, t, r) {
            n.Light.call(this, e), this.type = "PointLight", this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0
        }, n.PointLight.prototype = Object.create(n.Light.prototype), n.PointLight.prototype.clone = function() {
            var e = new n.PointLight;
            return n.Light.prototype.clone.call(this, e), e.intensity = this.intensity, e.distance = this.distance, e
        }, n.SpotLight = function(e, t, r, i, o) {
            n.Light.call(this, e), this.type = "SpotLight", this.position.set(0, 1, 0), this.target = new n.Object3D, this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0, this.angle = void 0 !== i ? i : Math.PI / 3, this.exponent = void 0 !== o ? o : 10, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
        }, n.SpotLight.prototype = Object.create(n.Light.prototype), n.SpotLight.prototype.clone = function() {
            var e = new n.SpotLight;
            return n.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.distance = this.distance, e.angle = this.angle, e.exponent = this.exponent, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraFov = this.shadowCameraFov, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e
        }, n.Cache = function() {
            this.files = {}
        }, n.Cache.prototype = {
            constructor: n.Cache,
            add: function(e, t) {
                this.files[e] = t
            },
            get: function(e) {
                return this.files[e]
            },
            remove: function(e) {
                delete this.files[e]
            },
            clear: function() {
                this.files = {}
            }
        }, n.Loader = function(e) {
            this.showStatus = e, this.statusDomElement = e ? n.Loader.prototype.addStatusElement() : null, this.imageLoader = new n.ImageLoader, this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}
        }, n.Loader.prototype = {
            constructor: n.Loader,
            crossOrigin: void 0,
            addStatusElement: function() {
                var e = document.createElement("div");
                return e.style.position = "absolute", e.style.right = "0px", e.style.top = "0px", e.style.fontSize = "0.8em", e.style.textAlign = "left", e.style.background = "rgba(0,0,0,0.25)", e.style.color = "#fff", e.style.width = "120px", e.style.padding = "0.5em 0.5em 0.5em 0.5em", e.style.zIndex = 1e3, e.innerHTML = "Loading ...", e
            },
            updateProgress: function(e) {
                var t = "Loaded ";
                t += e.total ? (100 * e.loaded / e.total).toFixed(0) + "%" : (e.loaded / 1024).toFixed(2) + " KB", this.statusDomElement.innerHTML = t
            },
            extractUrlBase: function(e) {
                var t = e.split("/");
                return 1 === t.length ? "./" : (t.pop(), t.join("/") + "/")
            },
            initMaterials: function(e, t) {
                for (var r = [], i = 0; i < e.length; ++i) r[i] = this.createMaterial(e[i], t);
                return r
            },
            needsTangents: function(e) {
                for (var t = 0, r = e.length; r > t; t++) {
                    var i = e[t];
                    if (i instanceof n.ShaderMaterial) return !0
                }
                return !1
            },
            createMaterial: function(e, t) {
                function r(e) {
                    var t = Math.log(e) / Math.LN2;
                    return Math.pow(2, Math.round(t))
                }
                function i(e, i, o, s, h, l, c) {
                    var u, f = t + o,
                        p = n.Loader.Handlers.get(f);
                    if (null !== p ? u = p.load(f) : (u = new n.Texture, p = a.imageLoader, p.crossOrigin = a.crossOrigin, p.load(f, function(e) {
                            if (n.Math.isPowerOfTwo(e.width) === !1 || n.Math.isPowerOfTwo(e.height) === !1) {
                                var t = r(e.width),
                                    i = r(e.height),
                                    o = document.createElement("canvas");
                                o.width = t, o.height = i;
                                var a = o.getContext("2d");
                                a.drawImage(e, 0, 0, t, i), u.image = o
                            } else u.image = e;
                            u.needsUpdate = !0
                        })), u.sourceFile = o, s && (u.repeat.set(s[0], s[1]), 1 !== s[0] && (u.wrapS = n.RepeatWrapping), 1 !== s[1] && (u.wrapT = n.RepeatWrapping)), h && u.offset.set(h[0], h[1]), l) {
                        var d = {
                            repeat: n.RepeatWrapping,
                            mirror: n.MirroredRepeatWrapping
                        };
                        void 0 !== d[l[0]] && (u.wrapS = d[l[0]]), void 0 !== d[l[1]] && (u.wrapT = d[l[1]])
                    }
                    c && (u.anisotropy = c), e[i] = u
                }
                function o(e) {
                    return (255 * e[0] << 16) + (255 * e[1] << 8) + 255 * e[2]
                }
                var a = this,
                    s = "MeshLambertMaterial",
                    h = {
                        color: 15658734,
                        opacity: 1,
                        map: null,
                        lightMap: null,
                        normalMap: null,
                        bumpMap: null,
                        wireframe: !1
                    };
                if (e.shading) {
                    var l = e.shading.toLowerCase();
                    "phong" === l ? s = "MeshPhongMaterial" : "basic" === l && (s = "MeshBasicMaterial")
                }
                if (void 0 !== e.blending && void 0 !== n[e.blending] && (h.blending = n[e.blending]), (void 0 !== e.transparent || e.opacity < 1) && (h.transparent = e.transparent), void 0 !== e.depthTest && (h.depthTest = e.depthTest), void 0 !== e.depthWrite && (h.depthWrite = e.depthWrite), void 0 !== e.visible && (h.visible = e.visible), void 0 !== e.flipSided && (h.side = n.BackSide), void 0 !== e.doubleSided && (h.side = n.DoubleSide), void 0 !== e.wireframe && (h.wireframe = e.wireframe), void 0 !== e.vertexColors && ("face" === e.vertexColors ? h.vertexColors = n.FaceColors : e.vertexColors && (h.vertexColors = n.VertexColors)), e.colorDiffuse ? h.color = o(e.colorDiffuse) : e.DbgColor && (h.color = e.DbgColor), e.colorSpecular && (h.specular = o(e.colorSpecular)), e.colorAmbient && (h.ambient = o(e.colorAmbient)), e.colorEmissive && (h.emissive = o(e.colorEmissive)), e.transparency && (h.opacity = e.transparency), e.specularCoef && (h.shininess = e.specularCoef), e.mapDiffuse && t && i(h, "map", e.mapDiffuse, e.mapDiffuseRepeat, e.mapDiffuseOffset, e.mapDiffuseWrap, e.mapDiffuseAnisotropy), e.mapLight && t && i(h, "lightMap", e.mapLight, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy), e.mapBump && t && i(h, "bumpMap", e.mapBump, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy), e.mapNormal && t && i(h, "normalMap", e.mapNormal, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy), e.mapSpecular && t && i(h, "specularMap", e.mapSpecular, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy), e.mapAlpha && t && i(h, "alphaMap", e.mapAlpha, e.mapAlphaRepeat, e.mapAlphaOffset, e.mapAlphaWrap, e.mapAlphaAnisotropy), e.mapBumpScale && (h.bumpScale = e.mapBumpScale), e.mapNormal) {
                    var c = n.ShaderLib.normalmap,
                        u = n.UniformsUtils.clone(c.uniforms);
                    u.tNormal.value = h.normalMap, e.mapNormalFactor && u.uNormalScale.value.set(e.mapNormalFactor, e.mapNormalFactor), h.map && (u.tDiffuse.value = h.map, u.enableDiffuse.value = !0), h.specularMap && (u.tSpecular.value = h.specularMap, u.enableSpecular.value = !0), h.lightMap && (u.tAO.value = h.lightMap, u.enableAO.value = !0), u.diffuse.value.setHex(h.color), u.specular.value.setHex(h.specular), u.ambient.value.setHex(h.ambient), u.shininess.value = h.shininess, void 0 !== h.opacity && (u.opacity.value = h.opacity);
                    var f = {
                            fragmentShader: c.fragmentShader,
                            vertexShader: c.vertexShader,
                            uniforms: u,
                            lights: !0,
                            fog: !0
                        },
                        p = new n.ShaderMaterial(f);
                    h.transparent && (p.transparent = !0)
                } else var p = new n[s](h);
                return void 0 !== e.DbgName && (p.name = e.DbgName), p
            }
        }, n.Loader.Handlers = {
            handlers: [],
            add: function(e, t) {
                this.handlers.push(e, t)
            },
            get: function(e) {
                for (var t = 0, r = this.handlers.length; r > t; t += 2) {
                    var i = this.handlers[t],
                        n = this.handlers[t + 1];
                    if (i.test(e)) return n
                }
                return null
            }
        }, n.XHRLoader = function(e) {
            this.cache = new n.Cache, this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.XHRLoader.prototype = {
            constructor: n.XHRLoader,
            load: function(e, t, r, i) {
                var n = this,
                    o = n.cache.get(e);
                if (void 0 !== o) return void(t && t(o));
                var a = new XMLHttpRequest;
                a.open("GET", e, !0), a.addEventListener("load", function(r) {
                    n.cache.add(e, this.response), t && t(this.response), n.manager.itemEnd(e)
                }, !1), void 0 !== r && a.addEventListener("progress", function(e) {
                    r(e)
                }, !1), void 0 !== i && a.addEventListener("error", function(e) {
                    i(e)
                }, !1), void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), void 0 !== this.responseType && (a.responseType = this.responseType), a.send(null), n.manager.itemStart(e)
            },
            setResponseType: function(e) {
                this.responseType = e
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            }
        }, n.ImageLoader = function(e) {
            this.cache = new n.Cache, this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.ImageLoader.prototype = {
            constructor: n.ImageLoader,
            load: function(e, t, r, i) {
                var n = this,
                    o = n.cache.get(e);
                if (void 0 !== o) return void t(o);
                var a = document.createElement("img");
                return void 0 !== t && a.addEventListener("load", function(r) {
                    n.cache.add(e, this), t(this), n.manager.itemEnd(e)
                }, !1), void 0 !== r && a.addEventListener("progress", function(e) {
                    r(e)
                }, !1), void 0 !== i && a.addEventListener("error", function(e) {
                    i(e)
                }, !1), void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), a.src = e, n.manager.itemStart(e), a
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            }
        }, n.JSONLoader = function(e) {
            n.Loader.call(this, e), this.withCredentials = !1
        }, n.JSONLoader.prototype = Object.create(n.Loader.prototype), n.JSONLoader.prototype.load = function(e, t, r) {
            r = r && "string" == typeof r ? r : this.extractUrlBase(e), this.onLoadStart(), this.loadAjaxJSON(this, e, t, r)
        }, n.JSONLoader.prototype.loadAjaxJSON = function(e, t, r, i, n) {
            var o = new XMLHttpRequest,
                a = 0;
            o.onreadystatechange = function() {
                if (o.readyState === o.DONE)
                    if (200 === o.status || 0 === o.status) {
                        if (o.responseText) {
                            var s = JSON.parse(o.responseText);
                            if (void 0 !== s.metadata && "scene" === s.metadata.type) return void console.error('THREE.JSONLoader: "' + t + '" seems to be a Scene. Use THREE.SceneLoader instead.');
                            var h = e.parse(s, i);
                            r(h.geometry, h.materials)
                        } else console.error('THREE.JSONLoader: "' + t + '" seems to be unreachable or the file is empty.');
                        e.onLoadComplete()
                    } else console.error("THREE.JSONLoader: Couldn't load \"" + t + '" (' + o.status + ")");
                else o.readyState === o.LOADING ? n && (0 === a && (a = o.getResponseHeader("Content-Length")), n({
                    total: a,
                    loaded: o.responseText.length
                })) : o.readyState === o.HEADERS_RECEIVED && void 0 !== n && (a = o.getResponseHeader("Content-Length"))
            }, o.open("GET", t, !0), o.withCredentials = this.withCredentials, o.send(null)
        }, n.JSONLoader.prototype.parse = function(e, t) {
            function r(t) {
                function r(e, t) {
                    return e & 1 << t
                }
                var i, o, s, h, l, c, u, f, p, d, m, v, g, y, x, _, b, w, M, S, T, C, E, A, L, P, R, F = e.faces,
                    D = e.vertices,
                    U = e.normals,
                    z = e.colors,
                    B = 0;
                if (void 0 !== e.uvs) {
                    for (i = 0; i < e.uvs.length; i++) e.uvs[i].length && B++;
                    for (i = 0; B > i; i++) a.faceVertexUvs[i] = []
                }
                for (h = 0, l = D.length; l > h;) w = new n.Vector3, w.x = D[h++] * t, w.y = D[h++] * t, w.z = D[h++] * t, a.vertices.push(w);
                for (h = 0, l = F.length; l > h;)
                    if (d = F[h++], m = r(d, 0), v = r(d, 1), g = r(d, 3), y = r(d, 4), x = r(d, 5), _ = r(d, 6), b = r(d, 7), m) {
                        if (S = new n.Face3, S.a = F[h], S.b = F[h + 1], S.c = F[h + 3], T = new n.Face3, T.a = F[h + 1], T.b = F[h + 2], T.c = F[h + 3], h += 4, v && (p = F[h++], S.materialIndex = p, T.materialIndex = p), s = a.faces.length, g)
                            for (i = 0; B > i; i++)
                                for (A = e.uvs[i], a.faceVertexUvs[i][s] = [], a.faceVertexUvs[i][s + 1] = [], o = 0; 4 > o; o++) f = F[h++], P = A[2 * f], R = A[2 * f + 1], L = new n.Vector2(P, R), 2 !== o && a.faceVertexUvs[i][s].push(L), 0 !== o && a.faceVertexUvs[i][s + 1].push(L);
                        if (y && (u = 3 * F[h++], S.normal.set(U[u++], U[u++], U[u]), T.normal.copy(S.normal)), x)
                            for (i = 0; 4 > i; i++) u = 3 * F[h++], E = new n.Vector3(U[u++], U[u++], U[u]), 2 !== i && S.vertexNormals.push(E), 0 !== i && T.vertexNormals.push(E);
                        if (_ && (c = F[h++], C = z[c], S.color.setHex(C), T.color.setHex(C)), b)
                            for (i = 0; 4 > i; i++) c = F[h++], C = z[c], 2 !== i && S.vertexColors.push(new n.Color(C)), 0 !== i && T.vertexColors.push(new n.Color(C));
                        a.faces.push(S), a.faces.push(T)
                    } else {
                        if (M = new n.Face3, M.a = F[h++], M.b = F[h++], M.c = F[h++], v && (p = F[h++], M.materialIndex = p), s = a.faces.length, g)
                            for (i = 0; B > i; i++)
                                for (A = e.uvs[i], a.faceVertexUvs[i][s] = [], o = 0; 3 > o; o++) f = F[h++], P = A[2 * f], R = A[2 * f + 1], L = new n.Vector2(P, R), a.faceVertexUvs[i][s].push(L);
                        if (y && (u = 3 * F[h++], M.normal.set(U[u++], U[u++], U[u])), x)
                            for (i = 0; 3 > i; i++) u = 3 * F[h++], E = new n.Vector3(U[u++], U[u++], U[u]), M.vertexNormals.push(E);
                        if (_ && (c = F[h++], M.color.setHex(z[c])), b)
                            for (i = 0; 3 > i; i++) c = F[h++], M.vertexColors.push(new n.Color(z[c]));
                        a.faces.push(M)
                    }
            }
            function i() {
                var t = void 0 !== e.influencesPerVertex ? e.influencesPerVertex : 2;
                if (e.skinWeights)
                    for (var r = 0, i = e.skinWeights.length; i > r; r += t) {
                        var o = e.skinWeights[r],
                            s = t > 1 ? e.skinWeights[r + 1] : 0,
                            h = t > 2 ? e.skinWeights[r + 2] : 0,
                            l = t > 3 ? e.skinWeights[r + 3] : 0;
                        a.skinWeights.push(new n.Vector4(o, s, h, l))
                    }
                if (e.skinIndices)
                    for (var r = 0, i = e.skinIndices.length; i > r; r += t) {
                        var c = e.skinIndices[r],
                            u = t > 1 ? e.skinIndices[r + 1] : 0,
                            f = t > 2 ? e.skinIndices[r + 2] : 0,
                            p = t > 3 ? e.skinIndices[r + 3] : 0;
                        a.skinIndices.push(new n.Vector4(c, u, f, p))
                    }
                a.bones = e.bones, a.bones && a.bones.length > 0 && (a.skinWeights.length !== a.skinIndices.length || a.skinIndices.length !== a.vertices.length) && console.warn("When skinning, number of vertices (" + a.vertices.length + "), skinIndices (" + a.skinIndices.length + "), and skinWeights (" + a.skinWeights.length + ") should match."), a.animation = e.animation, a.animations = e.animations
            }
            function o(t) {
                if (void 0 !== e.morphTargets) {
                    var r, i, o, s, h, l;
                    for (r = 0, i = e.morphTargets.length; i > r; r++)
                        for (a.morphTargets[r] = {}, a.morphTargets[r].name = e.morphTargets[r].name, a.morphTargets[r].vertices = [], h = a.morphTargets[r].vertices, l = e.morphTargets[r].vertices, o = 0, s = l.length; s > o; o += 3) {
                            var c = new n.Vector3;
                            c.x = l[o] * t, c.y = l[o + 1] * t, c.z = l[o + 2] * t, h.push(c)
                        }
                }
                if (void 0 !== e.morphColors) {
                    var r, i, u, f, p, d, m;
                    for (r = 0, i = e.morphColors.length; i > r; r++)
                        for (a.morphColors[r] = {}, a.morphColors[r].name = e.morphColors[r].name, a.morphColors[r].colors = [], p = a.morphColors[r].colors, d = e.morphColors[r].colors, u = 0, f = d.length; f > u; u += 3) m = new n.Color(16755200), m.setRGB(d[u], d[u + 1], d[u + 2]), p.push(m)
                }
            }
            var a = new n.Geometry,
                s = void 0 !== e.scale ? 1 / e.scale : 1;
            if (r(s), i(), o(s), a.computeFaceNormals(), a.computeBoundingSphere(), void 0 === e.materials || 0 === e.materials.length) return {
                geometry: a
            };
            var h = this.initMaterials(e.materials, t);
            return this.needsTangents(h) && a.computeTangents(), {
                geometry: a,
                materials: h
            }
        }, n.LoadingManager = function(e, t, r) {
            var i = this,
                n = 0,
                o = 0;
            this.onLoad = e, this.onProgress = t, this.onError = r, this.itemStart = function(e) {
                o++
            }, this.itemEnd = function(e) {
                n++, void 0 !== i.onProgress && i.onProgress(e, n, o), n === o && void 0 !== i.onLoad && i.onLoad()
            }
        }, n.DefaultLoadingManager = new n.LoadingManager, n.BufferGeometryLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.BufferGeometryLoader.prototype = {
            constructor: n.BufferGeometryLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.XHRLoader;
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    t(o.parse(JSON.parse(e)))
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            },
            parse: function(e) {
                var t = new n.BufferGeometry,
                    r = e.attributes;
                for (var o in r) {
                    var a = r[o],
                        s = new i[a.type](a.array);
                    t.addAttribute(o, new n.BufferAttribute(s, a.itemSize))
                }
                var h = e.offsets;
                void 0 !== h && (t.offsets = JSON.parse(JSON.stringify(h)));
                var l = e.boundingSphere;
                if (void 0 !== l) {
                    var c = new n.Vector3;
                    void 0 !== l.center && c.fromArray(l.center), t.boundingSphere = new n.Sphere(c, l.radius)
                }
                return t
            }
        }, n.MaterialLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.MaterialLoader.prototype = {
            constructor: n.MaterialLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.XHRLoader;
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    t(o.parse(JSON.parse(e)))
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            },
            parse: function(e) {
                var t = new n[e.type];
                if (void 0 !== e.color && t.color.setHex(e.color), void 0 !== e.ambient && t.ambient.setHex(e.ambient), void 0 !== e.emissive && t.emissive.setHex(e.emissive), void 0 !== e.specular && t.specular.setHex(e.specular), void 0 !== e.shininess && (t.shininess = e.shininess), void 0 !== e.uniforms && (t.uniforms = e.uniforms), void 0 !== e.vertexShader && (t.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (t.fragmentShader = e.fragmentShader), void 0 !== e.vertexColors && (t.vertexColors = e.vertexColors), void 0 !== e.shading && (t.shading = e.shading), void 0 !== e.blending && (t.blending = e.blending), void 0 !== e.side && (t.side = e.side), void 0 !== e.opacity && (t.opacity = e.opacity), void 0 !== e.transparent && (t.transparent = e.transparent), void 0 !== e.wireframe && (t.wireframe = e.wireframe), void 0 !== e.materials)
                    for (var r = 0, i = e.materials.length; i > r; r++) t.materials.push(this.parse(e.materials[r]));
                return t
            }
        }, n.ObjectLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.ObjectLoader.prototype = {
            constructor: n.ObjectLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.XHRLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    t(o.parse(JSON.parse(e)))
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            },
            parse: function(e) {
                var t = this.parseGeometries(e.geometries),
                    r = this.parseMaterials(e.materials),
                    i = this.parseObject(e.object, t, r);
                return i
            },
            parseGeometries: function(e) {
                var t = {};
                if (void 0 !== e)
                    for (var r = new n.JSONLoader, i = new n.BufferGeometryLoader, o = 0, a = e.length; a > o; o++) {
                        var s, h = e[o];
                        switch (h.type) {
                            case "PlaneGeometry":
                                s = new n.PlaneGeometry(h.width, h.height, h.widthSegments, h.heightSegments);
                                break;
                            case "BoxGeometry":
                            case "CubeGeometry":
                                s = new n.BoxGeometry(h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
                                break;
                            case "CircleGeometry":
                                s = new n.CircleGeometry(h.radius, h.segments);
                                break;
                            case "CylinderGeometry":
                                s = new n.CylinderGeometry(h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded);
                                break;
                            case "SphereGeometry":
                                s = new n.SphereGeometry(h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
                                break;
                            case "IcosahedronGeometry":
                                s = new n.IcosahedronGeometry(h.radius, h.detail);
                                break;
                            case "TorusGeometry":
                                s = new n.TorusGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
                                break;
                            case "TorusKnotGeometry":
                                s = new n.TorusKnotGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.p, h.q, h.heightScale);
                                break;
                            case "BufferGeometry":
                                s = i.parse(h.data);
                                break;
                            case "Geometry":
                                s = r.parse(h.data).geometry
                        }
                        s.uuid = h.uuid, void 0 !== h.name && (s.name = h.name), t[h.uuid] = s
                    }
                return t
            },
            parseMaterials: function(e) {
                var t = {};
                if (void 0 !== e)
                    for (var r = new n.MaterialLoader, i = 0, o = e.length; o > i; i++) {
                        var a = e[i],
                            s = r.parse(a);
                        s.uuid = a.uuid, void 0 !== a.name && (s.name = a.name), t[a.uuid] = s
                    }
                return t
            },
            parseObject: function() {
                var e = new n.Matrix4;
                return function(t, r, i) {
                    var o;
                    switch (t.type) {
                        case "Scene":
                            o = new n.Scene;
                            break;
                        case "PerspectiveCamera":
                            o = new n.PerspectiveCamera(t.fov, t.aspect, t.near, t.far);
                            break;
                        case "OrthographicCamera":
                            o = new n.OrthographicCamera(t.left, t.right, t.top, t.bottom, t.near, t.far);
                            break;
                        case "AmbientLight":
                            o = new n.AmbientLight(t.color);
                            break;
                        case "DirectionalLight":
                            o = new n.DirectionalLight(t.color, t.intensity);
                            break;
                        case "PointLight":
                            o = new n.PointLight(t.color, t.intensity, t.distance);
                            break;
                        case "SpotLight":
                            o = new n.SpotLight(t.color, t.intensity, t.distance, t.angle, t.exponent);
                            break;
                        case "HemisphereLight":
                            o = new n.HemisphereLight(t.color, t.groundColor, t.intensity);
                            break;
                        case "Mesh":
                            var a = r[t.geometry],
                                s = i[t.material];
                            void 0 === a && console.warn("THREE.ObjectLoader: Undefined geometry", t.geometry), void 0 === s && console.warn("THREE.ObjectLoader: Undefined material", t.material), o = new n.Mesh(a, s);
                            break;
                        case "Line":
                            var a = r[t.geometry],
                                s = i[t.material];
                            void 0 === a && console.warn("THREE.ObjectLoader: Undefined geometry", t.geometry), void 0 === s && console.warn("THREE.ObjectLoader: Undefined material", t.material), o = new n.Line(a, s);
                            break;
                        case "Sprite":
                            var s = i[t.material];
                            void 0 === s && console.warn("THREE.ObjectLoader: Undefined material", t.material), o = new n.Sprite(s);
                            break;
                        case "Group":
                            o = new n.Group;
                            break;
                        default:
                            o = new n.Object3D
                    }
                    if (o.uuid = t.uuid, void 0 !== t.name && (o.name = t.name), void 0 !== t.matrix ? (e.fromArray(t.matrix), e.decompose(o.position, o.quaternion, o.scale)) : (void 0 !== t.position && o.position.fromArray(t.position), void 0 !== t.rotation && o.rotation.fromArray(t.rotation), void 0 !== t.scale && o.scale.fromArray(t.scale)), void 0 !== t.visible && (o.visible = t.visible), void 0 !== t.userData && (o.userData = t.userData), void 0 !== t.children)
                        for (var h in t.children) o.add(this.parseObject(t.children[h], r, i));
                    return o
                }
            }()
        }, n.TextureLoader = function(e) {
            this.manager = void 0 !== e ? e : n.DefaultLoadingManager
        }, n.TextureLoader.prototype = {
            constructor: n.TextureLoader,
            load: function(e, t, r, i) {
                var o = this,
                    a = new n.ImageLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                    var r = new n.Texture(e);
                    r.needsUpdate = !0, void 0 !== t && t(r)
                }, r, i)
            },
            setCrossOrigin: function(e) {
                this.crossOrigin = e
            }
        }, n.CompressedTextureLoader = function() {
            this._parser = null
        }, n.CompressedTextureLoader.prototype = {
            constructor: n.CompressedTextureLoader,
            load: function(e, t, r) {
                var i = this,
                    o = [],
                    a = new n.CompressedTexture;
                a.image = o;
                var s = new n.XHRLoader;
                if (s.setResponseType("arraybuffer"), e instanceof Array)
                    for (var h = 0, l = function(r) {
                        s.load(e[r], function(e) {
                            var s = i._parser(e, !0);
                            o[r] = {
                                width: s.width,
                                height: s.height,
                                format: s.format,
                                mipmaps: s.mipmaps
                            }, h += 1, 6 === h && (1 == s.mipmapCount && (a.minFilter = n.LinearFilter), a.format = s.format, a.needsUpdate = !0, t && t(a))
                        })
                    }, c = 0, u = e.length; u > c; ++c) l(c);
                else s.load(e, function(e) {
                    var r = i._parser(e, !0);
                    if (r.isCubemap)
                        for (var s = r.mipmaps.length / r.mipmapCount, h = 0; s > h; h++) {
                            o[h] = {
                                mipmaps: []
                            };
                            for (var l = 0; l < r.mipmapCount; l++) o[h].mipmaps.push(r.mipmaps[h * r.mipmapCount + l]), o[h].format = r.format, o[h].width = r.width, o[h].height = r.height
                        } else a.image.width = r.width, a.image.height = r.height, a.mipmaps = r.mipmaps;
                    1 === r.mipmapCount && (a.minFilter = n.LinearFilter), a.format = r.format, a.needsUpdate = !0, t && t(a)
                });
                return a
            }
        }, n.Material = function() {
            Object.defineProperty(this, "id", {
                value: n.MaterialIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Material", this.side = n.FrontSide, this.opacity = 1, this.transparent = !1, this.blending = n.NormalBlending, this.blendSrc = n.SrcAlphaFactor, this.blendDst = n.OneMinusSrcAlphaFactor, this.blendEquation = n.AddEquation, this.depthTest = !0, this.depthWrite = !0, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.overdraw = 0, this.visible = !0, this.needsUpdate = !0
        }, n.Material.prototype = {
            constructor: n.Material,
            setValues: function(e) {
                if (void 0 !== e)
                    for (var t in e) {
                        var r = e[t];
                        if (void 0 !== r) {
                            if (t in this) {
                                var i = this[t];
                                i instanceof n.Color ? i.set(r) : i instanceof n.Vector3 && r instanceof n.Vector3 ? i.copy(r) : "overdraw" == t ? this[t] = Number(r) : this[t] = r
                            }
                        } else console.warn("THREE.Material: '" + t + "' parameter is undefined.")
                    }
            },
            toJSON: function() {
                var e = {
                    metadata: {
                        version: 4.2,
                        type: "material",
                        generator: "MaterialExporter"
                    },
                    uuid: this.uuid,
                    type: this.type
                };
                return "" !== this.name && (e.name = this.name), this instanceof n.MeshBasicMaterial ? (e.color = this.color.getHex(), this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshLambertMaterial ? (e.color = this.color.getHex(), e.ambient = this.ambient.getHex(), e.emissive = this.emissive.getHex(), this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshPhongMaterial ? (e.color = this.color.getHex(), e.ambient = this.ambient.getHex(), e.emissive = this.emissive.getHex(), e.specular = this.specular.getHex(), e.shininess = this.shininess, this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshNormalMaterial ? (this.shading !== n.FlatShading && (e.shading = this.shading), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshDepthMaterial ? (this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.ShaderMaterial ? (e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader) : this instanceof n.SpriteMaterial && (e.color = this.color.getHex()), this.opacity < 1 && (e.opacity = this.opacity), this.transparent !== !1 && (e.transparent = this.transparent), this.wireframe !== !1 && (e.wireframe = this.wireframe), e
            },
            clone: function(e) {
                return void 0 === e && (e = new n.Material), e.name = this.name, e.side = this.side, e.opacity = this.opacity, e.transparent = this.transparent, e.blending = this.blending, e.blendSrc = this.blendSrc, e.blendDst = this.blendDst, e.blendEquation = this.blendEquation, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, e.polygonOffset = this.polygonOffset, e.polygonOffsetFactor = this.polygonOffsetFactor, e.polygonOffsetUnits = this.polygonOffsetUnits, e.alphaTest = this.alphaTest, e.overdraw = this.overdraw, e.visible = this.visible, e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.Material.prototype), n.MaterialIdCount = 0, n.LineBasicMaterial = function(e) {
            n.Material.call(this), this.type = "LineBasicMaterial", this.color = new n.Color(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.vertexColors = n.NoColors, this.fog = !0, this.setValues(e)
        }, n.LineBasicMaterial.prototype = Object.create(n.Material.prototype), n.LineBasicMaterial.prototype.clone = function() {
            var e = new n.LineBasicMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.linecap = this.linecap, e.linejoin = this.linejoin, e.vertexColors = this.vertexColors, e.fog = this.fog, e
        }, n.LineDashedMaterial = function(e) {
            n.Material.call(this), this.type = "LineDashedMaterial", this.color = new n.Color(16777215), this.linewidth = 1, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(e)
        }, n.LineDashedMaterial.prototype = Object.create(n.Material.prototype), n.LineDashedMaterial.prototype.clone = function() {
            var e = new n.LineDashedMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.scale = this.scale, e.dashSize = this.dashSize, e.gapSize = this.gapSize, e.vertexColors = this.vertexColors, e.fog = this.fog, e
        }, n.MeshBasicMaterial = function(e) {
            n.Material.call(this), this.type = "MeshBasicMaterial", this.color = new n.Color(16777215), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.setValues(e)
        }, n.MeshBasicMaterial.prototype = Object.create(n.Material.prototype), n.MeshBasicMaterial.prototype.clone = function() {
            var e = new n.MeshBasicMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e
        }, n.MeshLambertMaterial = function(e) {
            n.Material.call(this), this.type = "MeshLambertMaterial", this.color = new n.Color(16777215), this.ambient = new n.Color(16777215), this.emissive = new n.Color(0), this.wrapAround = !1, this.wrapRGB = new n.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
        }, n.MeshLambertMaterial.prototype = Object.create(n.Material.prototype), n.MeshLambertMaterial.prototype.clone = function() {
            var e = new n.MeshLambertMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.ambient.copy(this.ambient), e.emissive.copy(this.emissive), e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }, n.MeshPhongMaterial = function(e) {
            n.Material.call(this), this.type = "MeshPhongMaterial", this.color = new n.Color(16777215), this.ambient = new n.Color(16777215), this.emissive = new n.Color(0), this.specular = new n.Color(1118481), this.shininess = 30, this.metal = !1, this.wrapAround = !1, this.wrapRGB = new n.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new n.Vector2(1, 1), this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1,
                this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
        }, n.MeshPhongMaterial.prototype = Object.create(n.Material.prototype), n.MeshPhongMaterial.prototype.clone = function() {
            var e = new n.MeshPhongMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.ambient.copy(this.ambient), e.emissive.copy(this.emissive), e.specular.copy(this.specular), e.shininess = this.shininess, e.metal = this.metal, e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.bumpMap = this.bumpMap, e.bumpScale = this.bumpScale, e.normalMap = this.normalMap, e.normalScale.copy(this.normalScale), e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }, n.MeshDepthMaterial = function(e) {
            n.Material.call(this), this.type = "MeshDepthMaterial", this.morphTargets = !1, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e)
        }, n.MeshDepthMaterial.prototype = Object.create(n.Material.prototype), n.MeshDepthMaterial.prototype.clone = function() {
            var e = new n.MeshDepthMaterial;
            return n.Material.prototype.clone.call(this, e), e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
        }, n.MeshNormalMaterial = function(e) {
            n.Material.call(this, e), this.type = "MeshNormalMaterial", this.shading = n.FlatShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.morphTargets = !1, this.setValues(e)
        }, n.MeshNormalMaterial.prototype = Object.create(n.Material.prototype), n.MeshNormalMaterial.prototype.clone = function() {
            var e = new n.MeshNormalMaterial;
            return n.Material.prototype.clone.call(this, e), e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
        }, n.MeshFaceMaterial = function(e) {
            this.uuid = n.Math.generateUUID(), this.type = "MeshFaceMaterial", this.materials = e instanceof Array ? e : []
        }, n.MeshFaceMaterial.prototype = {
            constructor: n.MeshFaceMaterial,
            toJSON: function() {
                for (var e = {
                    metadata: {
                        version: 4.2,
                        type: "material",
                        generator: "MaterialExporter"
                    },
                    uuid: this.uuid,
                    type: this.type,
                    materials: []
                }, t = 0, r = this.materials.length; r > t; t++) e.materials.push(this.materials[t].toJSON());
                return e
            },
            clone: function() {
                for (var e = new n.MeshFaceMaterial, t = 0; t < this.materials.length; t++) e.materials.push(this.materials[t].clone());
                return e
            }
        }, n.PointCloudMaterial = function(e) {
            n.Material.call(this), this.type = "PointCloudMaterial", this.color = new n.Color(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.vertexColors = n.NoColors, this.fog = !0, this.setValues(e)
        }, n.PointCloudMaterial.prototype = Object.create(n.Material.prototype), n.PointCloudMaterial.prototype.clone = function() {
            var e = new n.PointCloudMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.size = this.size, e.sizeAttenuation = this.sizeAttenuation, e.vertexColors = this.vertexColors, e.fog = this.fog, e
        }, n.ParticleBasicMaterial = function(e) {
            return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."), new n.PointCloudMaterial(e)
        }, n.ParticleSystemMaterial = function(e) {
            return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."), new n.PointCloudMaterial(e)
        }, n.ShaderMaterial = function(e) {
            n.Material.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.attributes = null, this.vertexShader = "void main() {\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n   gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.shading = n.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.defaultAttributeValues = {
                color: [1, 1, 1],
                uv: [0, 0],
                uv2: [0, 0]
            }, this.index0AttributeName = void 0, this.setValues(e)
        }, n.ShaderMaterial.prototype = Object.create(n.Material.prototype), n.ShaderMaterial.prototype.clone = function() {
            var e = new n.ShaderMaterial;
            return n.Material.prototype.clone.call(this, e), e.fragmentShader = this.fragmentShader, e.vertexShader = this.vertexShader, e.uniforms = n.UniformsUtils.clone(this.uniforms), e.attributes = this.attributes, e.defines = this.defines, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.fog = this.fog, e.lights = this.lights, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
        }, n.RawShaderMaterial = function(e) {
            n.ShaderMaterial.call(this, e), this.type = "RawShaderMaterial"
        }, n.RawShaderMaterial.prototype = Object.create(n.ShaderMaterial.prototype), n.RawShaderMaterial.prototype.clone = function() {
            var e = new n.RawShaderMaterial;
            return n.ShaderMaterial.prototype.clone.call(this, e), e
        }, n.SpriteMaterial = function(e) {
            n.Material.call(this), this.type = "SpriteMaterial", this.color = new n.Color(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.setValues(e)
        }, n.SpriteMaterial.prototype = Object.create(n.Material.prototype), n.SpriteMaterial.prototype.clone = function() {
            var e = new n.SpriteMaterial;
            return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.rotation = this.rotation, e.fog = this.fog, e
        }, n.Texture = function(e, t, r, i, o, a, s, h, l) {
            Object.defineProperty(this, "id", {
                value: n.TextureIdCount++
            }), this.uuid = n.Math.generateUUID(), this.name = "", this.image = void 0 !== e ? e : n.Texture.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== t ? t : n.Texture.DEFAULT_MAPPING, this.wrapS = void 0 !== r ? r : n.ClampToEdgeWrapping, this.wrapT = void 0 !== i ? i : n.ClampToEdgeWrapping, this.magFilter = void 0 !== o ? o : n.LinearFilter, this.minFilter = void 0 !== a ? a : n.LinearMipMapLinearFilter, this.anisotropy = void 0 !== l ? l : 1, this.format = void 0 !== s ? s : n.RGBAFormat, this.type = void 0 !== h ? h : n.UnsignedByteType, this.offset = new n.Vector2(0, 0), this.repeat = new n.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this._needsUpdate = !1, this.onUpdate = null
        }, n.Texture.DEFAULT_IMAGE = void 0, n.Texture.DEFAULT_MAPPING = new n.UVMapping, n.Texture.prototype = {
            constructor: n.Texture,
            get needsUpdate() {
                return this._needsUpdate
            },
            set needsUpdate(e) {
                e === !0 && this.update(), this._needsUpdate = e
            },
            clone: function(e) {
                return void 0 === e && (e = new n.Texture), e.image = this.image, e.mipmaps = this.mipmaps.slice(0), e.mapping = this.mapping, e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.format = this.format, e.type = this.type, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.generateMipmaps = this.generateMipmaps, e.premultiplyAlpha = this.premultiplyAlpha, e.flipY = this.flipY, e.unpackAlignment = this.unpackAlignment, e
            },
            update: function() {
                this.dispatchEvent({
                    type: "update"
                })
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.Texture.prototype), n.TextureIdCount = 0, n.CubeTexture = function(e, t, r, i, o, a, s, h, l) {
            n.Texture.call(this, e, t, r, i, o, a, s, h, l), this.images = e
        }, n.CubeTexture.prototype = Object.create(n.Texture.prototype), n.CubeTexture.clone = function(e) {
            return void 0 === e && (e = new n.CubeTexture), n.Texture.prototype.clone.call(this, e), e.images = this.images, e
        }, n.CompressedTexture = function(e, t, r, i, o, a, s, h, l, c, u) {
            n.Texture.call(this, null, a, s, h, l, c, i, o, u), this.image = {
                width: t,
                height: r
            }, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1
        }, n.CompressedTexture.prototype = Object.create(n.Texture.prototype), n.CompressedTexture.prototype.clone = function() {
            var e = new n.CompressedTexture;
            return n.Texture.prototype.clone.call(this, e), e
        }, n.DataTexture = function(e, t, r, i, o, a, s, h, l, c, u) {
            n.Texture.call(this, null, a, s, h, l, c, i, o, u), this.image = {
                data: e,
                width: t,
                height: r
            }
        }, n.DataTexture.prototype = Object.create(n.Texture.prototype), n.DataTexture.prototype.clone = function() {
            var e = new n.DataTexture;
            return n.Texture.prototype.clone.call(this, e), e
        }, n.VideoTexture = function(e, t, r, i, o, a, s, h, l) {
            n.Texture.call(this, e, t, r, i, o, a, s, h, l), this.generateMipmaps = !1;
            var c = this,
                u = function() {
                    requestAnimationFrame(u), e.readyState === e.HAVE_ENOUGH_DATA && (c.needsUpdate = !0)
                };
            u()
        }, n.VideoTexture.prototype = Object.create(n.Texture.prototype), n.Group = function() {
            n.Object3D.call(this), this.type = "Group"
        }, n.Group.prototype = Object.create(n.Object3D.prototype), n.PointCloud = function(e, t) {
            n.Object3D.call(this), this.type = "PointCloud", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.PointCloudMaterial({
                color: 16777215 * Math.random()
            }), this.sortParticles = !1
        }, n.PointCloud.prototype = Object.create(n.Object3D.prototype), n.PointCloud.prototype.raycast = function() {
            var e = new n.Matrix4,
                t = new n.Ray;
            return function(r, i) {
                var o = this,
                    a = o.geometry,
                    s = r.params.PointCloud.threshold;
                if (e.getInverse(this.matrixWorld), t.copy(r.ray).applyMatrix4(e), null === a.boundingBox || t.isIntersectionBox(a.boundingBox) !== !1) {
                    var h = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                        l = new n.Vector3,
                        c = function(e, n) {
                            var a = t.distanceToPoint(e);
                            if (h > a) {
                                var s = t.closestPointToPoint(e);
                                s.applyMatrix4(o.matrixWorld);
                                var l = r.ray.origin.distanceTo(s);
                                i.push({
                                    distance: l,
                                    distanceToRay: a,
                                    point: s.clone(),
                                    index: n,
                                    face: null,
                                    object: o
                                })
                            }
                        };
                    if (a instanceof n.BufferGeometry) {
                        var u = a.attributes,
                            f = u.position.array;
                        if (void 0 !== u.index) {
                            var p = u.index.array,
                                d = a.offsets;
                            if (0 === d.length) {
                                var m = {
                                    start: 0,
                                    count: p.length,
                                    index: 0
                                };
                                d = [m]
                            }
                            for (var v = 0, g = d.length; g > v; ++v)
                                for (var y = d[v].start, x = d[v].count, _ = d[v].index, b = y, w = y + x; w > b; b++) {
                                    var M = _ + p[b];
                                    l.fromArray(f, 3 * M), c(l, M)
                                }
                        } else
                            for (var S = f.length / 3, b = 0; S > b; b++) l.set(f[3 * b], f[3 * b + 1], f[3 * b + 2]), c(l, b)
                    } else
                        for (var T = this.geometry.vertices, b = 0; b < T.length; b++) c(T[b], b)
                }
            }
        }(), n.PointCloud.prototype.clone = function(e) {
            return void 0 === e && (e = new n.PointCloud(this.geometry, this.material)), e.sortParticles = this.sortParticles, n.Object3D.prototype.clone.call(this, e), e
        }, n.ParticleSystem = function(e, t) {
            return console.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."), new n.PointCloud(e, t)
        }, n.Line = function(e, t, r) {
            n.Object3D.call(this), this.type = "Line", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.LineBasicMaterial({
                color: 16777215 * Math.random()
            }), this.mode = void 0 !== r ? r : n.LineStrip
        }, n.LineStrip = 0, n.LinePieces = 1, n.Line.prototype = Object.create(n.Object3D.prototype), n.Line.prototype.raycast = function() {
            var e = new n.Matrix4,
                t = new n.Ray,
                r = new n.Sphere;
            return function(i, o) {
                var a = i.linePrecision,
                    s = a * a,
                    h = this.geometry;
                if (null === h.boundingSphere && h.computeBoundingSphere(), r.copy(h.boundingSphere), r.applyMatrix4(this.matrixWorld), i.ray.isIntersectionSphere(r) !== !1 && (e.getInverse(this.matrixWorld), t.copy(i.ray).applyMatrix4(e), h instanceof n.Geometry))
                    for (var l = h.vertices, c = l.length, u = new n.Vector3, f = new n.Vector3, p = this.mode === n.LineStrip ? 1 : 2, d = 0; c - 1 > d; d += p) {
                        var m = t.distanceSqToSegment(l[d], l[d + 1], f, u);
                        if (!(m > s)) {
                            var v = t.origin.distanceTo(f);
                            v < i.near || v > i.far || o.push({
                                distance: v,
                                point: u.clone().applyMatrix4(this.matrixWorld),
                                face: null,
                                faceIndex: null,
                                object: this
                            })
                        }
                    }
            }
        }(), n.Line.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Line(this.geometry, this.material, this.mode)), n.Object3D.prototype.clone.call(this, e), e
        }, n.Mesh = function(e, t) {
            n.Object3D.call(this), this.type = "Mesh", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.MeshBasicMaterial({
                color: 16777215 * Math.random()
            }), this.updateMorphTargets()
        }, n.Mesh.prototype = Object.create(n.Object3D.prototype), n.Mesh.prototype.updateMorphTargets = function() {
            if (void 0 !== this.geometry.morphTargets && this.geometry.morphTargets.length > 0) {
                this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                for (var e = 0, t = this.geometry.morphTargets.length; t > e; e++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e
            }
        }, n.Mesh.prototype.getMorphTargetIndexByName = function(e) {
            return void 0 !== this.morphTargetDictionary[e] ? this.morphTargetDictionary[e] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + e + " does not exist. Returning 0."), 0)
        }, n.Mesh.prototype.raycast = function() {
            var e = new n.Matrix4,
                t = new n.Ray,
                r = new n.Sphere,
                i = new n.Vector3,
                o = new n.Vector3,
                a = new n.Vector3;
            return function(s, h) {
                var l = this.geometry;
                if (null === l.boundingSphere && l.computeBoundingSphere(), r.copy(l.boundingSphere), r.applyMatrix4(this.matrixWorld), s.ray.isIntersectionSphere(r) !== !1 && (e.getInverse(this.matrixWorld), t.copy(s.ray).applyMatrix4(e), null === l.boundingBox || t.isIntersectionBox(l.boundingBox) !== !1))
                    if (l instanceof n.BufferGeometry) {
                        var c = this.material;
                        if (void 0 === c) return;
                        var u, f, p, d = l.attributes,
                            m = s.precision;
                        if (void 0 !== d.index) {
                            var v = d.index.array,
                                g = d.position.array,
                                y = l.offsets;
                            0 === y.length && (y = [{
                                start: 0,
                                count: v.length,
                                index: 0
                            }]);
                            for (var x = 0, _ = y.length; _ > x; ++x)
                                for (var b = y[x].start, w = y[x].count, M = y[x].index, S = b, T = b + w; T > S; S += 3) {
                                    if (u = M + v[S], f = M + v[S + 1], p = M + v[S + 2], i.fromArray(g, 3 * u), o.fromArray(g, 3 * f), a.fromArray(g, 3 * p), c.side === n.BackSide) var C = t.intersectTriangle(a, o, i, !0);
                                    else var C = t.intersectTriangle(i, o, a, c.side !== n.DoubleSide);
                                    if (null !== C) {
                                        C.applyMatrix4(this.matrixWorld);
                                        var E = s.ray.origin.distanceTo(C);
                                        m > E || E < s.near || E > s.far || h.push({
                                            distance: E,
                                            point: C,
                                            face: new n.Face3(u, f, p, n.Triangle.normal(i, o, a)),
                                            faceIndex: null,
                                            object: this
                                        })
                                    }
                                }
                        } else
                            for (var g = d.position.array, S = 0, A = 0, T = g.length; T > S; S += 3, A += 9) {
                                if (u = S, f = S + 1, p = S + 2, i.fromArray(g, A), o.fromArray(g, A + 3), a.fromArray(g, A + 6), c.side === n.BackSide) var C = t.intersectTriangle(a, o, i, !0);
                                else var C = t.intersectTriangle(i, o, a, c.side !== n.DoubleSide);
                                if (null !== C) {
                                    C.applyMatrix4(this.matrixWorld);
                                    var E = s.ray.origin.distanceTo(C);
                                    m > E || E < s.near || E > s.far || h.push({
                                        distance: E,
                                        point: C,
                                        face: new n.Face3(u, f, p, n.Triangle.normal(i, o, a)),
                                        faceIndex: null,
                                        object: this
                                    })
                                }
                            }
                    } else if (l instanceof n.Geometry)
                        for (var u, f, p, L = this.material instanceof n.MeshFaceMaterial, P = L === !0 ? this.material.materials : null, m = s.precision, R = l.vertices, F = 0, D = l.faces.length; D > F; F++) {
                            var U = l.faces[F],
                                c = L === !0 ? P[U.materialIndex] : this.material;
                            if (void 0 !== c) {
                                if (u = R[U.a], f = R[U.b], p = R[U.c], c.morphTargets === !0) {
                                    var z = l.morphTargets,
                                        B = this.morphTargetInfluences;
                                    i.set(0, 0, 0), o.set(0, 0, 0), a.set(0, 0, 0);
                                    for (var V = 0, k = z.length; k > V; V++) {
                                        var N = B[V];
                                        if (0 !== N) {
                                            var O = z[V].vertices;
                                            i.x += (O[U.a].x - u.x) * N, i.y += (O[U.a].y - u.y) * N, i.z += (O[U.a].z - u.z) * N, o.x += (O[U.b].x - f.x) * N, o.y += (O[U.b].y - f.y) * N, o.z += (O[U.b].z - f.z) * N, a.x += (O[U.c].x - p.x) * N, a.y += (O[U.c].y - p.y) * N, a.z += (O[U.c].z - p.z) * N
                                        }
                                    }
                                    i.add(u), o.add(f), a.add(p), u = i, f = o, p = a
                                }
                                if (c.side === n.BackSide) var C = t.intersectTriangle(p, f, u, !0);
                                else var C = t.intersectTriangle(u, f, p, c.side !== n.DoubleSide);
                                if (null !== C) {
                                    C.applyMatrix4(this.matrixWorld);
                                    var E = s.ray.origin.distanceTo(C);
                                    m > E || E < s.near || E > s.far || h.push({
                                        distance: E,
                                        point: C,
                                        face: U,
                                        faceIndex: F,
                                        object: this
                                    })
                                }
                            }
                        }
            }
        }(), n.Mesh.prototype.clone = function(e, t) {
            return void 0 === e && (e = new n.Mesh(this.geometry, this.material)), n.Object3D.prototype.clone.call(this, e, t), e
        }, n.Bone = function(e) {
            n.Object3D.call(this), this.skin = e
        }, n.Bone.prototype = Object.create(n.Object3D.prototype), n.Skeleton = function(e, t, r) {
            if (this.useVertexTexture = void 0 !== r ? r : !0, this.identityMatrix = new n.Matrix4, e = e || [], this.bones = e.slice(0), this.useVertexTexture) {
                var i;
                i = this.bones.length > 256 ? 64 : this.bones.length > 64 ? 32 : this.bones.length > 16 ? 16 : 8, this.boneTextureWidth = i, this.boneTextureHeight = i, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new n.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, n.RGBAFormat, n.FloatType), this.boneTexture.minFilter = n.NearestFilter, this.boneTexture.magFilter = n.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1
            } else this.boneMatrices = new Float32Array(16 * this.bones.length);
            if (void 0 === t) this.calculateInverses();
            else if (this.bones.length === t.length) this.boneInverses = t.slice(0);
            else {
                console.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [];
                for (var o = 0, a = this.bones.length; a > o; o++) this.boneInverses.push(new n.Matrix4)
            }
        }, n.Skeleton.prototype.calculateInverses = function() {
            this.boneInverses = [];
            for (var e = 0, t = this.bones.length; t > e; e++) {
                var r = new n.Matrix4;
                this.bones[e] && r.getInverse(this.bones[e].matrixWorld), this.boneInverses.push(r)
            }
        }, n.Skeleton.prototype.pose = function() {
            for (var e, t = 0, r = this.bones.length; r > t; t++) e = this.bones[t], e && e.matrixWorld.getInverse(this.boneInverses[t]);
            for (var t = 0, r = this.bones.length; r > t; t++) e = this.bones[t], e && (e.parent ? (e.matrix.getInverse(e.parent.matrixWorld), e.matrix.multiply(e.matrixWorld)) : e.matrix.copy(e.matrixWorld), e.matrix.decompose(e.position, e.quaternion, e.scale))
        }, n.Skeleton.prototype.update = function() {
            var e = new n.Matrix4;
            return function() {
                for (var t = 0, r = this.bones.length; r > t; t++) {
                    var i = this.bones[t] ? this.bones[t].matrixWorld : this.identityMatrix;
                    e.multiplyMatrices(i, this.boneInverses[t]), e.flattenToArrayOffset(this.boneMatrices, 16 * t)
                }
                this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
            }
        }(), n.SkinnedMesh = function(e, t, r) {
            n.Mesh.call(this, e, t), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new n.Matrix4, this.bindMatrixInverse = new n.Matrix4;
            var i = [];
            if (this.geometry && void 0 !== this.geometry.bones) {
                for (var o, a, s, h, l, c = 0, u = this.geometry.bones.length; u > c; ++c) a = this.geometry.bones[c], s = a.pos, h = a.rotq, l = a.scl, o = new n.Bone(this), i.push(o), o.name = a.name, o.position.set(s[0], s[1], s[2]), o.quaternion.set(h[0], h[1], h[2], h[3]), void 0 !== l ? o.scale.set(l[0], l[1], l[2]) : o.scale.set(1, 1, 1);
                for (var c = 0, u = this.geometry.bones.length; u > c; ++c) a = this.geometry.bones[c], -1 !== a.parent ? i[a.parent].add(i[c]) : this.add(i[c])
            }
            this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new n.Skeleton(i, void 0, r))
        }, n.SkinnedMesh.prototype = Object.create(n.Mesh.prototype), n.SkinnedMesh.prototype.bind = function(e, t) {
            this.skeleton = e, void 0 === t && (this.updateMatrixWorld(!0), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.getInverse(t)
        }, n.SkinnedMesh.prototype.pose = function() {
            this.skeleton.pose()
        }, n.SkinnedMesh.prototype.normalizeSkinWeights = function() {
            if (this.geometry instanceof n.Geometry)
                for (var e = 0; e < this.geometry.skinIndices.length; e++) {
                    var t = this.geometry.skinWeights[e],
                        r = 1 / t.lengthManhattan();
                    r !== 1 / 0 ? t.multiplyScalar(r) : t.set(1)
                }
        }, n.SkinnedMesh.prototype.updateMatrixWorld = function(e) {
            n.Mesh.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
        }, n.SkinnedMesh.prototype.clone = function(e) {
            return void 0 === e && (e = new n.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), n.Mesh.prototype.clone.call(this, e), e
        }, n.MorphAnimMesh = function(e, t) {
            n.Mesh.call(this, e, t), this.type = "MorphAnimMesh", this.duration = 1e3, this.mirroredLoop = !1, this.time = 0, this.lastKeyframe = 0, this.currentKeyframe = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
        }, n.MorphAnimMesh.prototype = Object.create(n.Mesh.prototype), n.MorphAnimMesh.prototype.setFrameRange = function(e, t) {
            this.startKeyframe = e, this.endKeyframe = t, this.length = this.endKeyframe - this.startKeyframe + 1
        }, n.MorphAnimMesh.prototype.setDirectionForward = function() {
            this.direction = 1, this.directionBackwards = !1
        }, n.MorphAnimMesh.prototype.setDirectionBackward = function() {
            this.direction = -1, this.directionBackwards = !0
        }, n.MorphAnimMesh.prototype.parseAnimations = function() {
            var e = this.geometry;
            e.animations || (e.animations = {});
            for (var t, r = e.animations, i = /([a-z]+)_?(\d+)/, n = 0, o = e.morphTargets.length; o > n; n++) {
                var a = e.morphTargets[n],
                    s = a.name.match(i);
                if (s && s.length > 1) {
                    var h = s[1];
                    s[2];
                    r[h] || (r[h] = {
                        start: 1 / 0,
                        end: -(1 / 0)
                    });
                    var l = r[h];
                    n < l.start && (l.start = n), n > l.end && (l.end = n), t || (t = h)
                }
            }
            e.firstAnimation = t
        }, n.MorphAnimMesh.prototype.setAnimationLabel = function(e, t, r) {
            this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[e] = {
                start: t,
                end: r
            }
        }, n.MorphAnimMesh.prototype.playAnimation = function(e, t) {
            var r = this.geometry.animations[e];
            r ? (this.setFrameRange(r.start, r.end), this.duration = 1e3 * ((r.end - r.start) / t), this.time = 0) : console.warn("animation[" + e + "] undefined")
        }, n.MorphAnimMesh.prototype.updateAnimation = function(e) {
            var t = this.duration / this.length;
            this.time += this.direction * e, this.mirroredLoop ? (this.time > this.duration || this.time < 0) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), this.time < 0 && (this.time = 0, this.directionBackwards = !1)) : (this.time = this.time % this.duration, this.time < 0 && (this.time += this.duration));
            var r = this.startKeyframe + n.Math.clamp(Math.floor(this.time / t), 0, this.length - 1);
            r !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[r] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = r);
            var i = this.time % t / t;
            this.directionBackwards && (i = 1 - i), this.morphTargetInfluences[this.currentKeyframe] = i, this.morphTargetInfluences[this.lastKeyframe] = 1 - i
        }, n.MorphAnimMesh.prototype.interpolateTargets = function(e, t, r) {
            for (var i = this.morphTargetInfluences, n = 0, o = i.length; o > n; n++) i[n] = 0;
            e > -1 && (i[e] = 1 - r), t > -1 && (i[t] = r)
        }, n.MorphAnimMesh.prototype.clone = function(e) {
            return void 0 === e && (e = new n.MorphAnimMesh(this.geometry, this.material)), e.duration = this.duration, e.mirroredLoop = this.mirroredLoop, e.time = this.time, e.lastKeyframe = this.lastKeyframe, e.currentKeyframe = this.currentKeyframe, e.direction = this.direction, e.directionBackwards = this.directionBackwards, n.Mesh.prototype.clone.call(this, e), e
        }, n.LOD = function() {
            n.Object3D.call(this), this.objects = []
        }, n.LOD.prototype = Object.create(n.Object3D.prototype), n.LOD.prototype.addLevel = function(e, t) {
            void 0 === t && (t = 0), t = Math.abs(t);
            for (var r = 0; r < this.objects.length && !(t < this.objects[r].distance); r++);
            this.objects.splice(r, 0, {
                distance: t,
                object: e
            }), this.add(e)
        }, n.LOD.prototype.getObjectForDistance = function(e) {
            for (var t = 1, r = this.objects.length; r > t && !(e < this.objects[t].distance); t++);
            return this.objects[t - 1].object
        }, n.LOD.prototype.raycast = function() {
            var e = new n.Vector3;
            return function(t, r) {
                e.setFromMatrixPosition(this.matrixWorld);
                var i = t.ray.origin.distanceTo(e);
                this.getObjectForDistance(i).raycast(t, r)
            }
        }(), n.LOD.prototype.update = function() {
            var e = new n.Vector3,
                t = new n.Vector3;
            return function(r) {
                if (this.objects.length > 1) {
                    e.setFromMatrixPosition(r.matrixWorld), t.setFromMatrixPosition(this.matrixWorld);
                    var i = e.distanceTo(t);
                    this.objects[0].object.visible = !0;
                    for (var n = 1, o = this.objects.length; o > n && i >= this.objects[n].distance; n++) this.objects[n - 1].object.visible = !1, this.objects[n].object.visible = !0;
                    for (; o > n; n++) this.objects[n].object.visible = !1
                }
            }
        }(), n.LOD.prototype.clone = function(e) {
            void 0 === e && (e = new n.LOD), n.Object3D.prototype.clone.call(this, e);
            for (var t = 0, r = this.objects.length; r > t; t++) {
                var i = this.objects[t].object.clone();
                i.visible = 0 === t, e.addLevel(i, this.objects[t].distance)
            }
            return e
        }, n.Sprite = function() {
            var e = new Uint16Array([0, 1, 2, 0, 2, 3]),
                t = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0]),
                r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                i = new n.BufferGeometry;
            return i.addAttribute("index", new n.BufferAttribute(e, 1)), i.addAttribute("position", new n.BufferAttribute(t, 3)), i.addAttribute("uv", new n.BufferAttribute(r, 2)),
                function(e) {
                    n.Object3D.call(this), this.type = "Sprite", this.geometry = i, this.material = void 0 !== e ? e : new n.SpriteMaterial
                }
        }(), n.Sprite.prototype = Object.create(n.Object3D.prototype), n.Sprite.prototype.raycast = function() {
            var e = new n.Vector3;
            return function(t, r) {
                e.setFromMatrixPosition(this.matrixWorld);
                var i = t.ray.distanceToPoint(e);
                i > this.scale.x || r.push({
                    distance: i,
                    point: this.position,
                    face: null,
                    object: this
                })
            }
        }(), n.Sprite.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Sprite(this.material)), n.Object3D.prototype.clone.call(this, e), e
        }, n.Particle = n.Sprite, n.LensFlare = function(e, t, r, i, o) {
            n.Object3D.call(this), this.lensFlares = [], this.positionScreen = new n.Vector3, this.customUpdateCallback = void 0, void 0 !== e && this.add(e, t, r, i, o)
        }, n.LensFlare.prototype = Object.create(n.Object3D.prototype), n.LensFlare.prototype.add = function(e, t, r, i, o, a) {
            void 0 === t && (t = -1), void 0 === r && (r = 0), void 0 === a && (a = 1), void 0 === o && (o = new n.Color(16777215)), void 0 === i && (i = n.NormalBlending), r = Math.min(r, Math.max(0, r)), this.lensFlares.push({
                texture: e,
                size: t,
                distance: r,
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                rotation: 1,
                opacity: a,
                color: o,
                blending: i
            })
        }, n.LensFlare.prototype.updateLensFlares = function() {
            var e, t, r = this.lensFlares.length,
                i = 2 * -this.positionScreen.x,
                n = 2 * -this.positionScreen.y;
            for (e = 0; r > e; e++) t = this.lensFlares[e], t.x = this.positionScreen.x + i * t.distance, t.y = this.positionScreen.y + n * t.distance, t.wantedRotation = t.x * Math.PI * .25, t.rotation += .25 * (t.wantedRotation - t.rotation)
        }, n.Scene = function() {
            n.Object3D.call(this), this.type = "Scene", this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
        }, n.Scene.prototype = Object.create(n.Object3D.prototype), n.Scene.prototype.clone = function(e) {
            return void 0 === e && (e = new n.Scene), n.Object3D.prototype.clone.call(this, e), null !== this.fog && (e.fog = this.fog.clone()), null !== this.overrideMaterial && (e.overrideMaterial = this.overrideMaterial.clone()), e.autoUpdate = this.autoUpdate, e.matrixAutoUpdate = this.matrixAutoUpdate, e
        }, n.Fog = function(e, t, r) {
            this.name = "", this.color = new n.Color(e), this.near = void 0 !== t ? t : 1, this.far = void 0 !== r ? r : 1e3
        }, n.Fog.prototype.clone = function() {
            return new n.Fog(this.color.getHex(), this.near, this.far)
        }, n.FogExp2 = function(e, t) {
            this.name = "", this.color = new n.Color(e), this.density = void 0 !== t ? t : 25e-5
        }, n.FogExp2.prototype.clone = function() {
            return new n.FogExp2(this.color.getHex(), this.density)
        }, n.ShaderChunk = {}, n.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n if ( gl_FragColor.a < ALPHATEST ) discard;\n\n#endif\n", n.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n   vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n   vec3 dirVector = normalize( lDirection.xyz );\n\n   float dotProduct = dot( transformedNormal, dirVector );\n   vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n    #ifdef DOUBLE_SIDED\n\n     vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n       #ifdef WRAP_AROUND\n\n          vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n       #endif\n\n  #endif\n\n  #ifdef WRAP_AROUND\n\n      vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n      directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n       #ifdef DOUBLE_SIDED\n\n         directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n       #endif\n\n  #endif\n\n  vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n  #ifdef DOUBLE_SIDED\n\n     vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n   #endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n   for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n      vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n       vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n      float lDistance = 1.0;\n        if ( pointLightDistance[ i ] > 0.0 )\n          lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n      lVector = normalize( lVector );\n       float dotProduct = dot( transformedNormal, lVector );\n\n       vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n      #ifdef DOUBLE_SIDED\n\n         vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n         #ifdef WRAP_AROUND\n\n              vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n         #endif\n\n      #endif\n\n      #ifdef WRAP_AROUND\n\n          vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n            pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n         #ifdef DOUBLE_SIDED\n\n             pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n         #endif\n\n      #endif\n\n      vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n\n      #ifdef DOUBLE_SIDED\n\n         vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n\n       #endif\n\n  }\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n       vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n        vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n      float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n     if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n            spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n         float lDistance = 1.0;\n            if ( spotLightDistance[ i ] > 0.0 )\n               lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n           lVector = normalize( lVector );\n\n         float dotProduct = dot( transformedNormal, lVector );\n         vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n           #ifdef DOUBLE_SIDED\n\n             vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n              #ifdef WRAP_AROUND\n\n                  vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n              #endif\n\n          #endif\n\n          #ifdef WRAP_AROUND\n\n              vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n             spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n                #ifdef DOUBLE_SIDED\n\n                 spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n                #endif\n\n          #endif\n\n          vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n\n           #ifdef DOUBLE_SIDED\n\n             vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n\n            #endif\n\n      }\n\n   }\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n       vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n        vec3 lVector = normalize( lDirection.xyz );\n\n     float dotProduct = dot( transformedNormal, lVector );\n\n       float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n     float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n      vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n     #ifdef DOUBLE_SIDED\n\n         vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n      #endif\n\n  }\n\n#endif\n\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n\n#ifdef DOUBLE_SIDED\n\n vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n\n#endif", n.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n  uniform sampler2D map;\n\n#endif", n.ShaderChunk.default_vertex = "vec4 mvPosition;\n\n#ifdef USE_SKINNING\n\n  mvPosition = modelViewMatrix * skinned;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\n\n    mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\n\n mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n  varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n   uniform sampler2D map;\n\n#endif", n.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n   mat4 skinMatrix = mat4( 0.0 );\n    skinMatrix += skinWeight.x * boneMatX;\n    skinMatrix += skinWeight.y * boneMatY;\n    skinMatrix += skinWeight.z * boneMatZ;\n    skinMatrix += skinWeight.w * boneMatW;\n    skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n  #ifdef USE_MORPHNORMALS\n\n vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n   #else\n\n   vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n  #endif\n\n#endif\n",
        n.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n #ifdef USE_LOGDEPTHBUF_EXT\n\n      varying float vFragDepth;\n\n   #endif\n\n  uniform float logDepthBufFC;\n\n#endif", n.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n  varying vec2 vUv2;\n\n#endif", n.ShaderChunk.lights_phong_fragment = "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef DOUBLE_SIDED\n\n   normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n#endif\n\n#ifdef USE_NORMALMAP\n\n   normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n   normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n vec3 pointDiffuse = vec3( 0.0 );\n  vec3 pointSpecular = vec3( 0.0 );\n\n   for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n     vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n       vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n       float lDistance = 1.0;\n        if ( pointLightDistance[ i ] > 0.0 )\n          lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n      lVector = normalize( lVector );\n\n             // diffuse\n\n      float dotProduct = dot( normal, lVector );\n\n      #ifdef WRAP_AROUND\n\n          float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n            float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n          vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n       #else\n\n           float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n      #endif\n\n      pointDiffuse += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n\n                // specular\n\n     vec3 pointHalfVector = normalize( lVector + viewPosition );\n       float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n        float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n        float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n        vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n     pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n\n }\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  vec3 spotDiffuse = vec3( 0.0 );\n   vec3 spotSpecular = vec3( 0.0 );\n\n    for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n      vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n        vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n       float lDistance = 1.0;\n        if ( spotLightDistance[ i ] > 0.0 )\n           lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n       lVector = normalize( lVector );\n\n     float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n        if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n            spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n                 // diffuse\n\n          float dotProduct = dot( normal, lVector );\n\n          #ifdef WRAP_AROUND\n\n              float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n             float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n               vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n          #else\n\n               float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n           #endif\n\n          spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\n\n                  // specular\n\n         vec3 spotHalfVector = normalize( lVector + viewPosition );\n            float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n          float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n          float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n            vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n          spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n\n        }\n\n   }\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n   vec3 dirDiffuse = vec3( 0.0 );\n    vec3 dirSpecular = vec3( 0.0 );\n\n for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n        vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n       vec3 dirVector = normalize( lDirection.xyz );\n\n               // diffuse\n\n      float dotProduct = dot( normal, dirVector );\n\n        #ifdef WRAP_AROUND\n\n          float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n          float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n            vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n     #else\n\n           float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n        #endif\n\n      dirDiffuse += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n\n      // specular\n\n     vec3 dirHalfVector = normalize( dirVector + viewPosition );\n       float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n        float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n        /*\n        // fresnel term from skin shader\n      const float F0 = 0.128;\n\n     float base = 1.0 - dot( viewPosition, dirHalfVector );\n        float exponential = pow( base, 5.0 );\n\n       float fresnel = exponential + F0 * ( 1.0 - exponential );\n     */\n\n      /*\n        // fresnel term from fresnel shader\n       const float mFresnelBias = 0.08;\n      const float mFresnelScale = 0.3;\n      const float mFresnelPower = 5.0;\n\n        float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n     */\n\n      float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n        //      dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n      vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n     dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n   }\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  vec3 hemiDiffuse = vec3( 0.0 );\n   vec3 hemiSpecular = vec3( 0.0 );\n\n    for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n       vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n        vec3 lVector = normalize( lDirection.xyz );\n\n     // diffuse\n\n      float dotProduct = dot( normal, lVector );\n        float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n       vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n       hemiDiffuse += diffuse * hemiColor;\n\n     // specular (sky light)\n\n     vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n     float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n        float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n        // specular (ground light)\n\n      vec3 lVectorGround = -lVector;\n\n      vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n        float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n      float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n      float dotProductGround = dot( normal, lVectorGround );\n\n      float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n        vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n        vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n        hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n  }\n\n#endif\n\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n\n#if MAX_DIR_LIGHTS > 0\n\n    totalDiffuse += dirDiffuse;\n   totalSpecular += dirSpecular;\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  totalDiffuse += hemiDiffuse;\n  totalSpecular += hemiSpecular;\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n    totalDiffuse += pointDiffuse;\n totalSpecular += pointSpecular;\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n    totalDiffuse += spotDiffuse;\n  totalSpecular += spotSpecular;\n\n#endif\n\n#ifdef METAL\n\n    gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n\n#else\n\n   gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n\n#endif", n.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n  uniform vec3 fogColor;\n\n  #ifdef FOG_EXP2\n\n     uniform float fogDensity;\n\n   #else\n\n       uniform float fogNear;\n        uniform float fogFar;\n #endif\n\n#endif", n.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n  vec3 morphedNormal = vec3( 0.0 );\n\n   morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n  morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n  morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n  morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n    morphedNormal += normal;\n\n#endif", n.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n    uniform float reflectivity;\n   uniform samplerCube envMap;\n   uniform float flipEnvMap;\n uniform int combine;\n\n    #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n      uniform bool useRefract;\n      uniform float refractionRatio;\n\n  #else\n\n       varying vec3 vReflect;\n\n  #endif\n\n#endif", n.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n   gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif", n.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n uniform sampler2D normalMap;\n  uniform vec2 normalScale;\n\n           // Per-Pixel Tangent Space Normal Mapping\n         // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n   vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n        vec3 q0 = dFdx( eye_pos.xyz );\n        vec3 q1 = dFdy( eye_pos.xyz );\n        vec2 st0 = dFdx( vUv.st );\n        vec2 st1 = dFdy( vUv.st );\n\n      vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n        vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n       vec3 N = normalize( surf_norm );\n\n        vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n      mapN.xy = normalScale * mapN.xy;\n      mat3 tsn = mat3( S, T, N );\n       return normalize( tsn * mapN );\n\n }\n\n#endif\n", n.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n    varying vec3 vWorldPosition;\n\n#endif\n", n.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n  varying vec2 vUv2;\n    uniform sampler2D lightMap;\n\n#endif", n.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n  for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n       vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n  }\n\n#endif", n.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n   vWorldPosition = worldPosition.xyz;\n\n#endif", n.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n    vec4 texelColor = texture2D( map, vUv );\n\n    #ifdef GAMMA_INPUT\n\n      texelColor.xyz *= texelColor.xyz;\n\n   #endif\n\n  gl_FragColor = gl_FragColor * texelColor;\n\n#endif", n.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n  vUv2 = uv2;\n\n#endif", n.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n   gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n\n#endif", n.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n   varying vec3 vColor;\n\n#endif\n", n.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n   #ifdef GAMMA_INPUT\n\n      vColor = color * color;\n\n #else\n\n       vColor = color;\n\n #endif\n\n#endif", n.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n #ifdef USE_MORPHTARGETS\n\n vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n    #else\n\n   vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n   #endif\n\n  vec4 skinned = vec4( 0.0 );\n   skinned += boneMatX * skinVertex * skinWeight.x;\n  skinned += boneMatY * skinVertex * skinWeight.y;\n  skinned += boneMatZ * skinVertex * skinWeight.z;\n  skinned += boneMatW * skinVertex * skinWeight.w;\n  skinned  = bindMatrixInverse * skinned;\n\n#endif\n", n.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n varying vec3 vReflect;\n\n  uniform float refractionRatio;\n    uniform bool useRefract;\n\n#endif\n", n.ShaderChunk.linear_to_gamma_fragment = "#ifdef GAMMA_OUTPUT\n\n    gl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n\n#endif", n.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n    varying vec3 vColor;\n\n#endif", n.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\n\nuniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n  uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n  uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n   uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n  uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n   uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n    uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n uniform vec3 wrapRGB;\n\n#endif\n", n.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n  varying vec2 vUv;\n uniform vec4 offsetRepeat;\n\n#endif\n", n.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n vec3 reflectVec;\n\n    #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n      vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n     // http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\n      // Transforming Normal Vectors with the Inverse Transformation\n\n      vec3 worldNormal = normalize( vec3( vec4( normal, 0.0 ) * viewMatrix ) );\n\n       if ( useRefract ) {\n\n         reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n       } else { \n\n           reflectVec = reflect( cameraToVertex, worldNormal );\n\n        }\n\n   #else\n\n       reflectVec = vReflect;\n\n  #endif\n\n  #ifdef DOUBLE_SIDED\n\n     float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n      vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n  #else\n\n       vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n   #endif\n\n  #ifdef GAMMA_INPUT\n\n      cubeColor.xyz *= cubeColor.xyz;\n\n #endif\n\n  if ( combine == 1 ) {\n\n       gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n\n } else if ( combine == 2 ) {\n\n        gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n\n    } else {\n\n        gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n\n  }\n\n#endif", n.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n uniform sampler2D specularMap;\n\n#endif", n.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n   gl_Position.z = log2(max(1e-6, gl_Position.w + 1.0)) * logDepthBufFC;\n\n   #ifdef USE_LOGDEPTHBUF_EXT\n\n      vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n      gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n  #endif\n\n#endif", n.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n #ifndef USE_MORPHNORMALS\n\n    uniform float morphTargetInfluences[ 8 ];\n\n   #else\n\n   uniform float morphTargetInfluences[ 4 ];\n\n   #endif\n\n#endif", n.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n  vec4 texelSpecular = texture2D( specularMap, vUv );\n   specularStrength = texelSpecular.r;\n\n#else\n\n    specularStrength = 1.0;\n\n#endif", n.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n    #ifdef USE_LOGDEPTHBUF_EXT\n\n      float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n #else\n\n       float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n  #endif\n\n  #ifdef FOG_EXP2\n\n     const float LOG2 = 1.442695;\n      float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\n       fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\n #else\n\n       float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n #endif\n    \n  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n\n#endif", n.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n  uniform sampler2D bumpMap;\n    uniform float bumpScale;\n\n            // Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n         //  http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n            // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n vec2 dHdxy_fwd() {\n\n      vec2 dSTdx = dFdx( vUv );\n     vec2 dSTdy = dFdy( vUv );\n\n       float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n      float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n        float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n      return vec2( dBx, dBy );\n\n    }\n\n   vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n        vec3 vSigmaX = dFdx( surf_pos );\n      vec3 vSigmaY = dFdy( surf_pos );\n      vec3 vN = surf_norm;        // normalized\n\n       vec3 R1 = cross( vSigmaY, vN );\n       vec3 R2 = cross( vN, vSigmaX );\n\n     float fDet = dot( vSigmaX, R1 );\n\n        vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n      return normalize( abs( fDet ) * surf_norm - vGrad );\n\n    }\n\n#endif", n.ShaderChunk.defaultnormal_vertex = "vec3 objectNormal;\n\n#ifdef USE_SKINNING\n\n   objectNormal = skinnedNormal.xyz;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\n\n  objectNormal = morphedNormal;\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\n\n    objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n   objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;", n.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n    uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n  uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n  uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n   uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n   uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n  uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n  uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n   uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n    uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n   uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n    uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", n.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n    mat4 boneMatX = getBoneMatrix( skinIndex.x );\n mat4 boneMatY = getBoneMatrix( skinIndex.y );\n mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif", n.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif", n.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n    gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n\n#endif", n.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n  varying vec4 vShadowCoord[ MAX_SHADOWS ];\n uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif", n.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n  gl_FragColor = gl_FragColor * vec4( vColor, 1.0 );\n\n#endif", n.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n  vec3 morphed = vec3( 0.0 );\n   morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n  morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n  morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n  morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n    #ifndef USE_MORPHNORMALS\n\n    morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n  morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n  morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n  morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n    #endif\n\n  morphed += position;\n\n#endif", n.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n   vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\n   worldNormal = normalize( worldNormal );\n\n vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n  if ( useRefract ) {\n\n     vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n } else {\n\n        vReflect = reflect( cameraToVertex, worldNormal );\n\n  }\n\n#endif", n.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n  #ifdef SHADOWMAP_DEBUG\n\n      vec3 frustumColors[3];\n        frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n     frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n     frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n   #endif\n\n  #ifdef SHADOWMAP_CASCADE\n\n        int inFrustumCount = 0;\n\n #endif\n\n  float fDepth;\n vec3 shadowColor = vec3( 1.0 );\n\n for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n       vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n             // if ( something && something ) breaks ATI OpenGL shader compiler\n                // if ( all( something, something ) ) using this instead\n\n        bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n        bool inFrustum = all( inFrustumVec );\n\n               // don't shadow pixels outside of light frustum\n               // use just first frustum (for cascades)\n              // don't shadow pixels behind far plane of light frustum\n\n        #ifdef SHADOWMAP_CASCADE\n\n            inFrustumCount += int( inFrustum );\n           bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n       #else\n\n           bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n        #endif\n\n      bool frustumTest = all( frustumTestVec );\n\n       if ( frustumTest ) {\n\n            shadowCoord.z += shadowBias[ i ];\n\n           #if defined( SHADOWMAP_TYPE_PCF )\n\n                       // Percentage-close filtering\n                     // (9 pixel kernel)\n                       // http://fabiensanglard.net/shadowmappingPCF/\n\n              float shadow = 0.0;\n\n     /*\n                        // nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n                        // must enroll loop manually\n\n                for ( float y = -1.25; y <= 1.25; y += 1.25 )\n                 for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n                     vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n                              // doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n                               //vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n                       float fDepth = unpackDepth( rgbaDepth );\n\n                        if ( fDepth < shadowCoord.z )\n                         shadow += 1.0;\n\n              }\n\n               shadow /= 9.0;\n\n      */\n\n              const float shadowDelta = 1.0 / 9.0;\n\n                float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n              float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n                float dx0 = -1.25 * xPixelOffset;\n             float dy0 = -1.25 * yPixelOffset;\n             float dx1 = 1.25 * xPixelOffset;\n              float dy1 = 1.25 * yPixelOffset;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n              if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n               if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n                shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n         #elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n                        // Percentage-close filtering\n                     // (9 pixel kernel)\n                       // http://fabiensanglard.net/shadowmappingPCF/\n\n              float shadow = 0.0;\n\n             float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n              float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n                float dx0 = -1.0 * xPixelOffset;\n              float dy0 = -1.0 * yPixelOffset;\n              float dx1 = 1.0 * xPixelOffset;\n               float dy1 = 1.0 * yPixelOffset;\n\n             mat3 shadowKernel;\n                mat3 depthKernel;\n\n               depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n                depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n                depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n                depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n                depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n               depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n                depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n                depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n                depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n              vec3 shadowZ = vec3( shadowCoord.z );\n             shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n               shadowKernel[0] *= vec3(0.25);\n\n              shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n               shadowKernel[1] *= vec3(0.25);\n\n              shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n               shadowKernel[2] *= vec3(0.25);\n\n              vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n             shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n             shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n               vec4 shadowValues;\n                shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n                shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n                shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n                shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n              shadow = dot( shadowValues, vec4( 1.0 ) );\n\n              shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n         #else\n\n               vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n             float fDepth = unpackDepth( rgbaDepth );\n\n                if ( fDepth < shadowCoord.z )\n\n       // spot with multiple shadows is darker\n\n                 shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n      // spot with multiple shadows has the same color as single shadow spot\n\n      //                  shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n          #endif\n\n      }\n\n\n     #ifdef SHADOWMAP_DEBUG\n\n          #ifdef SHADOWMAP_CASCADE\n\n                if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n\n         #else\n\n               if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n\n            #endif\n\n      #endif\n\n  }\n\n   #ifdef GAMMA_OUTPUT\n\n     shadowColor *= shadowColor;\n\n #endif\n\n  gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n\n#endif\n", n.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n  #ifdef USE_SKINNING\n\n     vec4 worldPosition = modelMatrix * skinned;\n\n #endif\n\n  #if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n        vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n    #endif\n\n  #if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n   #endif\n\n#endif", n.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n    uniform sampler2D shadowMap[ MAX_SHADOWS ];\n   uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n  uniform float shadowDarkness[ MAX_SHADOWS ];\n  uniform float shadowBias[ MAX_SHADOWS ];\n\n    varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n   float unpackDepth( const in vec4 rgba_depth ) {\n\n     const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n        float depth = dot( rgba_depth, bit_shift );\n       return depth;\n\n   }\n\n#endif", n.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n uniform mat4 bindMatrix;\n  uniform mat4 bindMatrixInverse;\n\n #ifdef BONE_TEXTURE\n\n     uniform sampler2D boneTexture;\n        uniform int boneTextureWidth;\n     uniform int boneTextureHeight;\n\n      mat4 getBoneMatrix( const in float i ) {\n\n            float j = i * 4.0;\n            float x = mod( j, float( boneTextureWidth ) );\n            float y = floor( j / float( boneTextureWidth ) );\n\n           float dx = 1.0 / float( boneTextureWidth );\n           float dy = 1.0 / float( boneTextureHeight );\n\n            y = dy * ( y + 0.5 );\n\n           vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n          vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n          vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n          vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n            mat4 bone = mat4( v1, v2, v3, v4 );\n\n         return bone;\n\n        }\n\n   #else\n\n       uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n       mat4 getBoneMatrix( const in float i ) {\n\n            mat4 bone = boneGlobalMatrices[ int(i) ];\n         return bone;\n\n        }\n\n   #endif\n\n#endif\n", n.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n  uniform float logDepthBufFC;\n\n    #ifdef USE_LOGDEPTHBUF_EXT\n\n      #extension GL_EXT_frag_depth : enable\n     varying float vFragDepth;\n\n   #endif\n\n#endif", n.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n   gl_FragColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n", n.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n   uniform sampler2D alphaMap;\n\n#endif\n",
        n.UniformsUtils = {
            merge: function(e) {
                for (var t = {}, r = 0; r < e.length; r++) {
                    var i = this.clone(e[r]);
                    for (var n in i) t[n] = i[n]
                }
                return t
            },
            clone: function(e) {
                var t = {};
                for (var r in e) {
                    t[r] = {};
                    for (var i in e[r]) {
                        var o = e[r][i];
                        o instanceof n.Color || o instanceof n.Vector2 || o instanceof n.Vector3 || o instanceof n.Vector4 || o instanceof n.Matrix4 || o instanceof n.Texture ? t[r][i] = o.clone() : o instanceof Array ? t[r][i] = o.slice() : t[r][i] = o
                    }
                }
                return t
            }
        }, n.UniformsLib = {
            common: {
                diffuse: {
                    type: "c",
                    value: new n.Color(15658734)
                },
                opacity: {
                    type: "f",
                    value: 1
                },
                map: {
                    type: "t",
                    value: null
                },
                offsetRepeat: {
                    type: "v4",
                    value: new n.Vector4(0, 0, 1, 1)
                },
                lightMap: {
                    type: "t",
                    value: null
                },
                specularMap: {
                    type: "t",
                    value: null
                },
                alphaMap: {
                    type: "t",
                    value: null
                },
                envMap: {
                    type: "t",
                    value: null
                },
                flipEnvMap: {
                    type: "f",
                    value: -1
                },
                useRefract: {
                    type: "i",
                    value: 0
                },
                reflectivity: {
                    type: "f",
                    value: 1
                },
                refractionRatio: {
                    type: "f",
                    value: .98
                },
                combine: {
                    type: "i",
                    value: 0
                },
                morphTargetInfluences: {
                    type: "f",
                    value: 0
                }
            },
            bump: {
                bumpMap: {
                    type: "t",
                    value: null
                },
                bumpScale: {
                    type: "f",
                    value: 1
                }
            },
            normalmap: {
                normalMap: {
                    type: "t",
                    value: null
                },
                normalScale: {
                    type: "v2",
                    value: new n.Vector2(1, 1)
                }
            },
            fog: {
                fogDensity: {
                    type: "f",
                    value: 25e-5
                },
                fogNear: {
                    type: "f",
                    value: 1
                },
                fogFar: {
                    type: "f",
                    value: 2e3
                },
                fogColor: {
                    type: "c",
                    value: new n.Color(16777215)
                }
            },
            lights: {
                ambientLightColor: {
                    type: "fv",
                    value: []
                },
                directionalLightDirection: {
                    type: "fv",
                    value: []
                },
                directionalLightColor: {
                    type: "fv",
                    value: []
                },
                hemisphereLightDirection: {
                    type: "fv",
                    value: []
                },
                hemisphereLightSkyColor: {
                    type: "fv",
                    value: []
                },
                hemisphereLightGroundColor: {
                    type: "fv",
                    value: []
                },
                pointLightColor: {
                    type: "fv",
                    value: []
                },
                pointLightPosition: {
                    type: "fv",
                    value: []
                },
                pointLightDistance: {
                    type: "fv1",
                    value: []
                },
                spotLightColor: {
                    type: "fv",
                    value: []
                },
                spotLightPosition: {
                    type: "fv",
                    value: []
                },
                spotLightDirection: {
                    type: "fv",
                    value: []
                },
                spotLightDistance: {
                    type: "fv1",
                    value: []
                },
                spotLightAngleCos: {
                    type: "fv1",
                    value: []
                },
                spotLightExponent: {
                    type: "fv1",
                    value: []
                }
            },
            particle: {
                psColor: {
                    type: "c",
                    value: new n.Color(15658734)
                },
                opacity: {
                    type: "f",
                    value: 1
                },
                size: {
                    type: "f",
                    value: 1
                },
                scale: {
                    type: "f",
                    value: 1
                },
                map: {
                    type: "t",
                    value: null
                },
                fogDensity: {
                    type: "f",
                    value: 25e-5
                },
                fogNear: {
                    type: "f",
                    value: 1
                },
                fogFar: {
                    type: "f",
                    value: 2e3
                },
                fogColor: {
                    type: "c",
                    value: new n.Color(16777215)
                }
            },
            shadowmap: {
                shadowMap: {
                    type: "tv",
                    value: []
                },
                shadowMapSize: {
                    type: "v2v",
                    value: []
                },
                shadowBias: {
                    type: "fv1",
                    value: []
                },
                shadowDarkness: {
                    type: "fv1",
                    value: []
                },
                shadowMatrix: {
                    type: "m4v",
                    value: []
                }
            }
        }, n.ShaderLib = {
            basic: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, n.UniformsLib.shadowmap]),
                vertexShader: [n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.skinbase_vertex, "  #ifdef USE_ENVMAP", n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, "    #endif", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "    gl_FragColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, n.ShaderChunk.lightmap_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            lambert: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                    ambient: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    emissive: {
                        type: "c",
                        value: new n.Color(0)
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new n.Vector3(1, 1, 1)
                    }
                }]),
                vertexShader: ["#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", " varying vec3 vLightBack;", "#endif", n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.lights_lambert_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.lights_lambert_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "    varying vec3 vLightBack;", "#endif", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "   gl_FragColor = vec4( vec3( 1.0 ), opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, " #ifdef DOUBLE_SIDED", "     if ( gl_FrontFacing )", "           gl_FragColor.xyz *= vLightFront;", "        else", "            gl_FragColor.xyz *= vLightBack;", " #else", "       gl_FragColor.xyz *= vLightFront;", "    #endif", n.ShaderChunk.lightmap_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            phong: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.bump, n.UniformsLib.normalmap, n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                    ambient: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    emissive: {
                        type: "c",
                        value: new n.Color(0)
                    },
                    specular: {
                        type: "c",
                        value: new n.Color(1118481)
                    },
                    shininess: {
                        type: "f",
                        value: 30
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new n.Vector3(1, 1, 1)
                    }
                }]),
                vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.lights_phong_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, "  vNormal = normalize( transformedNormal );", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "  vViewPosition = -mvPosition.xyz;", n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.lights_phong_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.lights_phong_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.bumpmap_pars_fragment, n.ShaderChunk.normalmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "    gl_FragColor = vec4( vec3( 1.0 ), opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, n.ShaderChunk.lights_phong_fragment, n.ShaderChunk.lightmap_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            particle_basic: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.particle, n.UniformsLib.shadowmap]),
                vertexShader: ["uniform float size;", "uniform float scale;", n.ShaderChunk.color_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.color_vertex, "   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "  #ifdef USE_SIZEATTENUATION", "      gl_PointSize = size * ( scale / length( mvPosition.xyz ) );", " #else", "       gl_PointSize = size;", "    #endif", "  gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_particle_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "    gl_FragColor = vec4( psColor, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_particle_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            dashed: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, {
                    scale: {
                        type: "f",
                        value: 1
                    },
                    dashSize: {
                        type: "f",
                        value: 1
                    },
                    totalSize: {
                        type: "f",
                        value: 2
                    }
                }]),
                vertexShader: ["uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", n.ShaderChunk.color_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.color_vertex, "  vLineDistance = scale * lineDistance;", "   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "  gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", n.ShaderChunk.color_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "  if ( mod( vLineDistance, totalSize ) > dashSize ) {", "     discard;", "    }", "   gl_FragColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n")
            },
            depth: {
                uniforms: {
                    mNear: {
                        type: "f",
                        value: 1
                    },
                    mFar: {
                        type: "f",
                        value: 2e3
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    }
                },
                vertexShader: [n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform float mNear;", "uniform float mFar;", "uniform float opacity;", n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", n.ShaderChunk.logdepthbuf_fragment, "   #ifdef USE_LOGDEPTHBUF_EXT", "      float depth = gl_FragDepthEXT / gl_FragCoord.w;", " #else", "       float depth = gl_FragCoord.z / gl_FragCoord.w;", "  #endif", "  float color = 1.0 - smoothstep( mNear, mFar, depth );", "   gl_FragColor = vec4( vec3( color ), opacity );", "}"].join("\n")
            },
            normal: {
                uniforms: {
                    opacity: {
                        type: "f",
                        value: 1
                    }
                },
                vertexShader: ["varying vec3 vNormal;", n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "    vNormal = normalize( normalMatrix * normal );", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform float opacity;", "varying vec3 vNormal;", n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", " gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", n.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
            },
            normalmap: {
                uniforms: n.UniformsUtils.merge([n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                    enableAO: {
                        type: "i",
                        value: 0
                    },
                    enableDiffuse: {
                        type: "i",
                        value: 0
                    },
                    enableSpecular: {
                        type: "i",
                        value: 0
                    },
                    enableReflection: {
                        type: "i",
                        value: 0
                    },
                    enableDisplacement: {
                        type: "i",
                        value: 0
                    },
                    tDisplacement: {
                        type: "t",
                        value: null
                    },
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    tCube: {
                        type: "t",
                        value: null
                    },
                    tNormal: {
                        type: "t",
                        value: null
                    },
                    tSpecular: {
                        type: "t",
                        value: null
                    },
                    tAO: {
                        type: "t",
                        value: null
                    },
                    uNormalScale: {
                        type: "v2",
                        value: new n.Vector2(1, 1)
                    },
                    uDisplacementBias: {
                        type: "f",
                        value: 0
                    },
                    uDisplacementScale: {
                        type: "f",
                        value: 1
                    },
                    diffuse: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    specular: {
                        type: "c",
                        value: new n.Color(1118481)
                    },
                    ambient: {
                        type: "c",
                        value: new n.Color(16777215)
                    },
                    shininess: {
                        type: "f",
                        value: 30
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    useRefract: {
                        type: "i",
                        value: 0
                    },
                    refractionRatio: {
                        type: "f",
                        value: .98
                    },
                    reflectivity: {
                        type: "f",
                        value: .5
                    },
                    uOffset: {
                        type: "v2",
                        value: new n.Vector2(0, 0)
                    },
                    uRepeat: {
                        type: "v2",
                        value: new n.Vector2(1, 1)
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new n.Vector3(1, 1, 1)
                    }
                }]),
                fragmentShader: ["uniform vec3 ambient;", "uniform vec3 diffuse;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", "uniform bool enableDiffuse;", "uniform bool enableSpecular;", "uniform bool enableAO;", "uniform bool enableReflection;", "uniform sampler2D tDiffuse;", "uniform sampler2D tNormal;", "uniform sampler2D tSpecular;", "uniform sampler2D tAO;", "uniform samplerCube tCube;", "uniform vec2 uNormalScale;", "uniform bool useRefract;", "uniform float refractionRatio;", "uniform float reflectivity;", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", " uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "   uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "  uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "    uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", " uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", " uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "   uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "    uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "  uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", " uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "  uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", " uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", " uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", " uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "#endif", "#ifdef WRAP_AROUND", " uniform vec3 wrapRGB;", "#endif", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", n.ShaderChunk.logdepthbuf_fragment, "    gl_FragColor = vec4( vec3( 1.0 ), opacity );", "    vec3 specularTex = vec3( 1.0 );", " vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;", " normalTex.xy *= uNormalScale;", "   normalTex = normalize( normalTex );", " if( enableDiffuse ) {", "       #ifdef GAMMA_INPUT", "          vec4 texelColor = texture2D( tDiffuse, vUv );", "           texelColor.xyz *= texelColor.xyz;", "           gl_FragColor = gl_FragColor * texelColor;", "       #else", "           gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );", "       #endif", "  }", "   if( enableAO ) {", "        #ifdef GAMMA_INPUT", "          vec4 aoColor = texture2D( tAO, vUv );", "           aoColor.xyz *= aoColor.xyz;", "         gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;", "      #else", "           gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;", "        #endif", "  }", n.ShaderChunk.alphatest_fragment, " if( enableSpecular )", "        specularTex = texture2D( tSpecular, vUv ).xyz;", "  mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );", " vec3 finalNormal = tsb * normalTex;", " #ifdef FLIP_SIDED", "       finalNormal = -finalNormal;", " #endif", "  vec3 normal = normalize( finalNormal );", " vec3 viewPosition = normalize( vViewPosition );", " #if MAX_POINT_LIGHTS > 0", "        vec3 pointDiffuse = vec3( 0.0 );", "        vec3 pointSpecular = vec3( 0.0 );", "       for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "         vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "         vec3 pointVector = lPosition.xyz + vViewPosition.xyz;", "           float pointDistance = 1.0;", "          if ( pointLightDistance[ i ] > 0.0 )", "                pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );", "          pointVector = normalize( pointVector );", "         #ifdef WRAP_AROUND", "              float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );", "              float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );", "              vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );", "           #else", "               float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );", "          #endif", "          pointDiffuse += pointDistance * pointLightColor[ i ] * diffuse * pointDiffuseWeight;", "            vec3 pointHalfVector = normalize( pointVector + viewPosition );", "         float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "          float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, shininess ), 0.0 );", "           float specularNormalization = ( shininess + 2.0 ) / 8.0;", "            vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( pointVector, pointHalfVector ), 0.0 ), 5.0 );", "           pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;", "     }", "   #endif", "  #if MAX_SPOT_LIGHTS > 0", "     vec3 spotDiffuse = vec3( 0.0 );", "     vec3 spotSpecular = vec3( 0.0 );", "        for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "          vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "          vec3 spotVector = lPosition.xyz + vViewPosition.xyz;", "            float spotDistance = 1.0;", "           if ( spotLightDistance[ i ] > 0.0 )", "             spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );", "         spotVector = normalize( spotVector );", "           float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );", "            if ( spotEffect > spotLightAngleCos[ i ] ) {", "                spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );", "             #ifdef WRAP_AROUND", "                  float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );", "                    float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );", "                    vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );", "              #else", "                   float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );", "                #endif", "              spotDiffuse += spotDistance * spotLightColor[ i ] * diffuse * spotDiffuseWeight * spotEffect;", "               vec3 spotHalfVector = normalize( spotVector + viewPosition );", "               float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );", "                float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, shininess ), 0.0 );", "             float specularNormalization = ( shininess + 2.0 ) / 8.0;", "                vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( spotVector, spotHalfVector ), 0.0 ), 5.0 );", "             spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;", "         }", "       }", "   #endif", "  #if MAX_DIR_LIGHTS > 0", "      vec3 dirDiffuse = vec3( 0.0 );", "      vec3 dirSpecular = vec3( 0.0 );", "     for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {", "         vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "         vec3 dirVector = normalize( lDirection.xyz );", "           #ifdef WRAP_AROUND", "              float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );", "             float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );", "             vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );", "           #else", "               float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );", "          #endif", "          dirDiffuse += directionalLightColor[ i ] * diffuse * dirDiffuseWeight;", "          vec3 dirHalfVector = normalize( dirVector + viewPosition );", "         float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "          float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, shininess ), 0.0 );", "           float specularNormalization = ( shininess + 2.0 ) / 8.0;", "            vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );", "           dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;", "     }", "   #endif", "  #if MAX_HEMI_LIGHTS > 0", "     vec3 hemiDiffuse = vec3( 0.0 );", "     vec3 hemiSpecular = vec3( 0.0 );", "        for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "           vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "          vec3 lVector = normalize( lDirection.xyz );", "         float dotProduct = dot( normal, lVector );", "          float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "           vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "           hemiDiffuse += diffuse * hemiColor;", "         vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );", "           float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;", "          float hemiSpecularWeightSky = specularTex.r * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );", "           vec3 lVectorGround = -lVector;", "          vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );", "          float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;", "            float hemiSpecularWeightGround = specularTex.r * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );", "         float dotProductGround = dot( normal, lVectorGround );", "          float specularNormalization = ( shininess + 2.0 ) / 8.0;", "            vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );", "          vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );", "          hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );", "      }", "   #endif", "  vec3 totalDiffuse = vec3( 0.0 );", "    vec3 totalSpecular = vec3( 0.0 );", "   #if MAX_DIR_LIGHTS > 0", "      totalDiffuse += dirDiffuse;", "     totalSpecular += dirSpecular;", "   #endif", "  #if MAX_HEMI_LIGHTS > 0", "     totalDiffuse += hemiDiffuse;", "        totalSpecular += hemiSpecular;", "  #endif", "  #if MAX_POINT_LIGHTS > 0", "        totalDiffuse += pointDiffuse;", "       totalSpecular += pointSpecular;", " #endif", "  #if MAX_SPOT_LIGHTS > 0", "     totalDiffuse += spotDiffuse;", "        totalSpecular += spotSpecular;", "  #endif", "  #ifdef METAL", "        gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );", "   #else", "       gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;", "   #endif", "  if ( enableReflection ) {", "       vec3 vReflect;", "      vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );", "     if ( useRefract ) {", "         vReflect = refract( cameraToVertex, normal, refractionRatio );", "      } else {", "            vReflect = reflect( cameraToVertex, normal );", "       }", "       vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );", "        #ifdef GAMMA_INPUT", "          cubeColor.xyz *= cubeColor.xyz;", "     #endif", "      gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * reflectivity );", "    }", n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "}"].join("\n"),
                vertexShader: ["attribute vec4 tangent;", "uniform vec2 uOffset;", "uniform vec2 uRepeat;", "uniform bool enableDisplacement;", "#ifdef VERTEX_TEXTURES", " uniform sampler2D tDisplacement;", "    uniform float uDisplacementScale;", "   uniform float uDisplacementBias;", "#endif", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, "   #ifdef USE_SKINNING", "     vNormal = normalize( normalMatrix * skinnedNormal.xyz );", "        vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );", "        vTangent = normalize( normalMatrix * skinnedTangent.xyz );", "  #else", "       vNormal = normalize( normalMatrix * normal );", "       vTangent = normalize( normalMatrix * tangent.xyz );", " #endif", "  vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );", "    vUv = uv * uRepeat + uOffset;", "   vec3 displacedPosition;", " #ifdef VERTEX_TEXTURES", "      if ( enableDisplacement ) {", "         vec3 dv = texture2D( tDisplacement, uv ).xyz;", "           float df = uDisplacementScale * dv.x + uDisplacementBias;", "           displacedPosition = position + normalize( normal ) * df;", "        } else {", "            #ifdef USE_SKINNING", "             vec4 skinVertex = bindMatrix * vec4( position, 1.0 );", "               vec4 skinned = vec4( 0.0 );", "             skinned += boneMatX * skinVertex * skinWeight.x;", "                skinned += boneMatY * skinVertex * skinWeight.y;", "                skinned += boneMatZ * skinVertex * skinWeight.z;", "                skinned += boneMatW * skinVertex * skinWeight.w;", "                skinned  = bindMatrixInverse * skinned;", "             displacedPosition = skinned.xyz;", "            #else", "               displacedPosition = position;", "           #endif", "      }", "   #else", "       #ifdef USE_SKINNING", "         vec4 skinVertex = bindMatrix * vec4( position, 1.0 );", "           vec4 skinned = vec4( 0.0 );", "         skinned += boneMatX * skinVertex * skinWeight.x;", "            skinned += boneMatY * skinVertex * skinWeight.y;", "            skinned += boneMatZ * skinVertex * skinWeight.z;", "            skinned += boneMatW * skinVertex * skinWeight.w;", "            skinned  = bindMatrixInverse * skinned;", "         displacedPosition = skinned.xyz;", "        #else", "           displacedPosition = position;", "       #endif", "  #endif", "  vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );", " vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );", "  gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, "  vWorldPosition = worldPosition.xyz;", " vViewPosition = -mvPosition.xyz;", "    #ifdef USE_SHADOWMAP", "        for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "           vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;", "      }", "   #endif", "}"].join("\n")
            },
            cube: {
                uniforms: {
                    tCube: {
                        type: "t",
                        value: null
                    },
                    tFlip: {
                        type: "f",
                        value: -1
                    }
                },
                vertexShader: ["varying vec3 vWorldPosition;", n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "   vWorldPosition = worldPosition.xyz;", " gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: ["uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "  gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", n.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
            },
            depthRGBA: {
                uniforms: {},
                vertexShader: [n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.skinbase_vertex, n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                fragmentShader: [n.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {", "    const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "    const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "   vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", "   res -= res.xxyz * bit_mask;", " return res;", "}", "void main() {", n.ShaderChunk.logdepthbuf_fragment, "   #ifdef USE_LOGDEPTHBUF_EXT", "      gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );", "   #else", "       gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "    #endif", "}"].join("\n")
            }
        }, n.WebGLRenderer = function(e) {
            function t() {
                ke.clearColor(0, 0, 0, 1), ke.clearDepth(1), ke.clearStencil(0), ke.enable(ke.DEPTH_TEST), ke.depthFunc(ke.LEQUAL), ke.frontFace(ke.CCW), ke.cullFace(ke.BACK), ke.enable(ke.CULL_FACE), ke.enable(ke.BLEND), ke.blendEquation(ke.FUNC_ADD), ke.blendFunc(ke.SRC_ALPHA, ke.ONE_MINUS_SRC_ALPHA), ke.viewport(ot, at, st, ht), ke.clearColor(Le.r, Le.g, Le.b, Pe)
            }
            function r(e) {
                e.__webglVertexBuffer = ke.createBuffer(), e.__webglColorBuffer = ke.createBuffer(), Ne.info.memory.geometries++
            }
            function o(e) {
                e.__webglVertexBuffer = ke.createBuffer(), e.__webglColorBuffer = ke.createBuffer(), e.__webglLineDistanceBuffer = ke.createBuffer(), Ne.info.memory.geometries++
            }
            function a(e) {
                e.__webglVertexBuffer = ke.createBuffer(), e.__webglNormalBuffer = ke.createBuffer(), e.__webglTangentBuffer = ke.createBuffer(), e.__webglColorBuffer = ke.createBuffer(), e.__webglUVBuffer = ke.createBuffer(), e.__webglUV2Buffer = ke.createBuffer(), e.__webglSkinIndicesBuffer = ke.createBuffer(), e.__webglSkinWeightsBuffer = ke.createBuffer(), e.__webglFaceBuffer = ke.createBuffer(), e.__webglLineBuffer = ke.createBuffer();
                var t, r;
                if (e.numMorphTargets)
                    for (e.__webglMorphTargetsBuffers = [], t = 0, r = e.numMorphTargets; r > t; t++) e.__webglMorphTargetsBuffers.push(ke.createBuffer());
                if (e.numMorphNormals)
                    for (e.__webglMorphNormalsBuffers = [], t = 0, r = e.numMorphNormals; r > t; t++) e.__webglMorphNormalsBuffers.push(ke.createBuffer());
                Ne.info.memory.geometries++
            }
            function s(e) {
                var t = e.geometry,
                    r = e.material,
                    i = t.vertices.length;
                if (r.attributes) {
                    void 0 === t.__webglCustomAttributesList && (t.__webglCustomAttributesList = []);
                    for (var n in r.attributes) {
                        var o = r.attributes[n];
                        if (!o.__webglInitialized || o.createUniqueBuffers) {
                            o.__webglInitialized = !0;
                            var a = 1;
                            "v2" === o.type ? a = 2 : "v3" === o.type ? a = 3 : "v4" === o.type ? a = 4 : "c" === o.type && (a = 3), o.size = a, o.array = new Float32Array(i * a), o.buffer = ke.createBuffer(), o.buffer.belongsToAttribute = n, o.needsUpdate = !0
                        }
                        t.__webglCustomAttributesList.push(o)
                    }
                }
            }
            function h(e, t) {
                var r = e.vertices.length;
                e.__vertexArray = new Float32Array(3 * r), e.__colorArray = new Float32Array(3 * r), e.__sortArray = [], e.__webglParticleCount = r, s(t)
            }
            function l(e, t) {
                var r = e.vertices.length;
                e.__vertexArray = new Float32Array(3 * r), e.__colorArray = new Float32Array(3 * r), e.__lineDistanceArray = new Float32Array(1 * r), e.__webglLineCount = r, s(t)
            }
            function c(e, t) {
                var r = t.geometry,
                    i = e.faces3,
                    n = 3 * i.length,
                    o = 1 * i.length,
                    a = 3 * i.length,
                    s = u(t, e);
                e.__vertexArray = new Float32Array(3 * n), e.__normalArray = new Float32Array(3 * n), e.__colorArray = new Float32Array(3 * n), e.__uvArray = new Float32Array(2 * n), r.faceVertexUvs.length > 1 && (e.__uv2Array = new Float32Array(2 * n)), r.hasTangents && (e.__tangentArray = new Float32Array(4 * n)), t.geometry.skinWeights.length && t.geometry.skinIndices.length && (e.__skinIndexArray = new Float32Array(4 * n), e.__skinWeightArray = new Float32Array(4 * n));
                var h = null !== wt.get("OES_element_index_uint") && o > 21845 ? Uint32Array : Uint16Array;
                e.__typeArray = h, e.__faceArray = new h(3 * o), e.__lineArray = new h(2 * a);
                var l, c;
                if (e.numMorphTargets)
                    for (e.__morphTargetsArrays = [], l = 0, c = e.numMorphTargets; c > l; l++) e.__morphTargetsArrays.push(new Float32Array(3 * n));
                if (e.numMorphNormals)
                    for (e.__morphNormalsArrays = [], l = 0, c = e.numMorphNormals; c > l; l++) e.__morphNormalsArrays.push(new Float32Array(3 * n));
                if (e.__webglFaceCount = 3 * o, e.__webglLineCount = 2 * a, s.attributes) {
                    void 0 === e.__webglCustomAttributesList && (e.__webglCustomAttributesList = []);
                    for (var f in s.attributes) {
                        var p = s.attributes[f],
                            d = {};
                        for (var m in p) d[m] = p[m];
                        if (!d.__webglInitialized || d.createUniqueBuffers) {
                            d.__webglInitialized = !0;
                            var v = 1;
                            "v2" === d.type ? v = 2 : "v3" === d.type ? v = 3 : "v4" === d.type ? v = 4 : "c" === d.type && (v = 3), d.size = v, d.array = new Float32Array(n * v), d.buffer = ke.createBuffer(), d.buffer.belongsToAttribute = f, p.needsUpdate = !0, d.__original = p
                        }
                        e.__webglCustomAttributesList.push(d)
                    }
                }
                e.__inittedArrays = !0
            }
            function u(e, t) {
                return e.material instanceof n.MeshFaceMaterial ? e.material.materials[t.materialIndex] : e.material
            }
            function f(e) {
                return e && void 0 !== e.shading && e.shading === n.SmoothShading
            }
            function p(e, t, r) {
                var i, n, o, a, s, h, l, c, u, f, p, d, m = e.vertices,
                    v = m.length,
                    g = e.colors,
                    y = g.length,
                    x = e.__vertexArray,
                    _ = e.__colorArray,
                    b = e.__sortArray,
                    w = e.verticesNeedUpdate,
                    M = (e.elementsNeedUpdate, e.colorsNeedUpdate),
                    T = e.__webglCustomAttributesList;
                if (r.sortParticles) {
                    for (mt.copy(dt), mt.multiply(r.matrixWorld), i = 0; v > i; i++) o = m[i], vt.copy(o), vt.applyProjection(mt), b[i] = [vt.z, i];
                    for (b.sort(S), i = 0; v > i; i++) o = m[b[i][1]], a = 3 * i, x[a] = o.x, x[a + 1] = o.y, x[a + 2] = o.z;
                    for (n = 0; y > n; n++) a = 3 * n, h = g[b[n][1]], _[a] = h.r, _[a + 1] = h.g, _[a + 2] = h.b;
                    if (T)
                        for (l = 0, c = T.length; c > l; l++)
                            if (d = T[l], void 0 === d.boundTo || "vertices" === d.boundTo)
                                if (a = 0, f = d.value.length, 1 === d.size)
                                    for (u = 0; f > u; u++) s = b[u][1], d.array[u] = d.value[s];
                                else if (2 === d.size)
                                    for (u = 0; f > u; u++) s = b[u][1], p = d.value[s], d.array[a] = p.x, d.array[a + 1] = p.y, a += 2;
                                else if (3 === d.size)
                                    if ("c" === d.type)
                                        for (u = 0; f > u; u++) s = b[u][1], p = d.value[s], d.array[a] = p.r, d.array[a + 1] = p.g, d.array[a + 2] = p.b, a += 3;
                                    else
                                        for (u = 0; f > u; u++) s = b[u][1], p = d.value[s], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, a += 3;
                                else if (4 === d.size)
                                    for (u = 0; f > u; u++) s = b[u][1], p = d.value[s], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, d.array[a + 3] = p.w, a += 4
                } else {
                    if (w)
                        for (i = 0; v > i; i++) o = m[i], a = 3 * i, x[a] = o.x, x[a + 1] = o.y, x[a + 2] = o.z;
                    if (M)
                        for (n = 0; y > n; n++) h = g[n], a = 3 * n, _[a] = h.r, _[a + 1] = h.g, _[a + 2] = h.b;
                    if (T)
                        for (l = 0, c = T.length; c > l; l++)
                            if (d = T[l], d.needsUpdate && (void 0 === d.boundTo || "vertices" === d.boundTo))
                                if (f = d.value.length, a = 0, 1 === d.size)
                                    for (u = 0; f > u; u++) d.array[u] = d.value[u];
                                else if (2 === d.size)
                                    for (u = 0; f > u; u++) p = d.value[u], d.array[a] = p.x, d.array[a + 1] = p.y, a += 2;
                                else if (3 === d.size)
                                    if ("c" === d.type)
                                        for (u = 0; f > u; u++) p = d.value[u], d.array[a] = p.r, d.array[a + 1] = p.g, d.array[a + 2] = p.b, a += 3;
                                    else
                                        for (u = 0; f > u; u++) p = d.value[u], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, a += 3;
                                else if (4 === d.size)
                                    for (u = 0; f > u; u++) p = d.value[u], d.array[a] = p.x, d.array[a + 1] = p.y, d.array[a + 2] = p.z, d.array[a + 3] = p.w, a += 4
                }
                if ((w || r.sortParticles) && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglVertexBuffer), ke.bufferData(ke.ARRAY_BUFFER, x, t)), (M || r.sortParticles) && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglColorBuffer), ke.bufferData(ke.ARRAY_BUFFER, _, t)), T)
                    for (l = 0, c = T.length; c > l; l++) d = T[l], (d.needsUpdate || r.sortParticles) && (ke.bindBuffer(ke.ARRAY_BUFFER, d.buffer), ke.bufferData(ke.ARRAY_BUFFER, d.array, t))
            }
            function d(e, t) {
                var r, i, n, o, a, s, h, l, c, u, f, p, d = e.vertices,
                    m = e.colors,
                    v = e.lineDistances,
                    g = d.length,
                    y = m.length,
                    x = v.length,
                    _ = e.__vertexArray,
                    b = e.__colorArray,
                    w = e.__lineDistanceArray,
                    M = e.verticesNeedUpdate,
                    S = e.colorsNeedUpdate,
                    T = e.lineDistancesNeedUpdate,
                    C = e.__webglCustomAttributesList;
                if (M) {
                    for (r = 0; g > r; r++) o = d[r], a = 3 * r, _[a] = o.x, _[a + 1] = o.y, _[a + 2] = o.z;
                    ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglVertexBuffer), ke.bufferData(ke.ARRAY_BUFFER, _, t)
                }
                if (S) {
                    for (i = 0; y > i; i++) s = m[i], a = 3 * i, b[a] = s.r, b[a + 1] = s.g, b[a + 2] = s.b;
                    ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglColorBuffer), ke.bufferData(ke.ARRAY_BUFFER, b, t)
                }
                if (T) {
                    for (n = 0; x > n; n++) w[n] = v[n];
                    ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglLineDistanceBuffer), ke.bufferData(ke.ARRAY_BUFFER, w, t)
                }
                if (C)
                    for (h = 0, l = C.length; l > h; h++)
                        if (p = C[h], p.needsUpdate && (void 0 === p.boundTo || "vertices" === p.boundTo)) {
                            if (a = 0, u = p.value.length, 1 === p.size)
                                for (c = 0; u > c; c++) p.array[c] = p.value[c];
                            else if (2 === p.size)
                                for (c = 0; u > c; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, a += 2;
                            else if (3 === p.size)
                                if ("c" === p.type)
                                    for (c = 0; u > c; c++) f = p.value[c], p.array[a] = f.r, p.array[a + 1] = f.g, p.array[a + 2] = f.b, a += 3;
                                else
                                    for (c = 0; u > c; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, a += 3;
                            else if (4 === p.size)
                                for (c = 0; u > c; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, p.array[a + 3] = f.w, a += 4;
                            ke.bindBuffer(ke.ARRAY_BUFFER, p.buffer), ke.bufferData(ke.ARRAY_BUFFER, p.array, t)
                        }
            }
            function m(e, t, r, i, o) {
                if (e.__inittedArrays) {
                    var a, s, h, l, c, u, p, d, m, v, g, y, x, _, b, w, M, S, T, C, E, A, L, P, R, F, D, U, z, B, V, k, N, O, I, G, H, W, j, X, q, Y, K = f(o),
                        Z = 0,
                        Q = 0,
                        J = 0,
                        $ = 0,
                        ee = 0,
                        te = 0,
                        re = 0,
                        ie = 0,
                        ne = 0,
                        oe = 0,
                        ae = 0,
                        se = 0,
                        he = 0,
                        le = e.__vertexArray,
                        ce = e.__uvArray,
                        ue = e.__uv2Array,
                        fe = e.__normalArray,
                        pe = e.__tangentArray,
                        de = e.__colorArray,
                        me = e.__skinIndexArray,
                        ve = e.__skinWeightArray,
                        ge = e.__morphTargetsArrays,
                        ye = e.__morphNormalsArrays,
                        xe = e.__webglCustomAttributesList,
                        _e = e.__faceArray,
                        be = e.__lineArray,
                        we = t.geometry,
                        Me = we.verticesNeedUpdate,
                        Se = we.elementsNeedUpdate,
                        Te = we.uvsNeedUpdate,
                        Ce = we.normalsNeedUpdate,
                        Ee = we.tangentsNeedUpdate,
                        Ae = we.colorsNeedUpdate,
                        Le = we.morphTargetsNeedUpdate,
                        Pe = we.vertices,
                        Re = e.faces3,
                        Fe = we.faces,
                        De = we.faceVertexUvs[0],
                        Ue = we.faceVertexUvs[1],
                        ze = (we.colors, we.skinIndices),
                        Be = we.skinWeights,
                        Ve = we.morphTargets,
                        Ne = we.morphNormals;
                    if (Me) {
                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = Pe[l.a], x = Pe[l.b], _ = Pe[l.c], le[Q] = y.x, le[Q + 1] = y.y, le[Q + 2] = y.z, le[Q + 3] = x.x, le[Q + 4] = x.y, le[Q + 5] = x.z, le[Q + 6] = _.x, le[Q + 7] = _.y, le[Q + 8] = _.z, Q += 9;
                        ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglVertexBuffer), ke.bufferData(ke.ARRAY_BUFFER, le, r)
                    }
                    if (Le)
                        for (I = 0, G = Ve.length; G > I; I++) {
                            for (ae = 0, a = 0, s = Re.length; s > a; a++) j = Re[a], l = Fe[j], y = Ve[I].vertices[l.a], x = Ve[I].vertices[l.b], _ = Ve[I].vertices[l.c], H = ge[I], H[ae] = y.x, H[ae + 1] = y.y, H[ae + 2] = y.z, H[ae + 3] = x.x, H[ae + 4] = x.y, H[ae + 5] = x.z, H[ae + 6] = _.x, H[ae + 7] = _.y, H[ae + 8] = _.z, o.morphNormals && (K ? (X = Ne[I].vertexNormals[j], S = X.a, T = X.b, C = X.c) : (S = Ne[I].faceNormals[j], T = S, C = S), W = ye[I], W[ae] = S.x, W[ae + 1] = S.y, W[ae + 2] = S.z, W[ae + 3] = T.x, W[ae + 4] = T.y, W[ae + 5] = T.z, W[ae + 6] = C.x, W[ae + 7] = C.y, W[ae + 8] = C.z), ae += 9;
                            ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[I]), ke.bufferData(ke.ARRAY_BUFFER, ge[I], r), o.morphNormals && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[I]), ke.bufferData(ke.ARRAY_BUFFER, ye[I], r))
                        }
                    if (Be.length) {
                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], P = Be[l.a], R = Be[l.b], F = Be[l.c], ve[oe] = P.x, ve[oe + 1] = P.y, ve[oe + 2] = P.z, ve[oe + 3] = P.w, ve[oe + 4] = R.x, ve[oe + 5] = R.y, ve[oe + 6] = R.z, ve[oe + 7] = R.w, ve[oe + 8] = F.x, ve[oe + 9] = F.y, ve[oe + 10] = F.z, ve[oe + 11] = F.w, D = ze[l.a], U = ze[l.b], z = ze[l.c], me[oe] = D.x, me[oe + 1] = D.y, me[oe + 2] = D.z, me[oe + 3] = D.w, me[oe + 4] = U.x, me[oe + 5] = U.y, me[oe + 6] = U.z, me[oe + 7] = U.w, me[oe + 8] = z.x, me[oe + 9] = z.y, me[oe + 10] = z.z, me[oe + 11] = z.w, oe += 12;
                        oe > 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), ke.bufferData(ke.ARRAY_BUFFER, me, r), ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), ke.bufferData(ke.ARRAY_BUFFER, ve, r))
                    }
                    if (Ae) {
                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], p = l.vertexColors, d = l.color, 3 === p.length && o.vertexColors === n.VertexColors ? (E = p[0], A = p[1], L = p[2]) : (E = d, A = d, L = d), de[ne] = E.r, de[ne + 1] = E.g, de[ne + 2] = E.b, de[ne + 3] = A.r, de[ne + 4] = A.g, de[ne + 5] = A.b, de[ne + 6] = L.r, de[ne + 7] = L.g, de[ne + 8] = L.b, ne += 9;
                        ne > 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglColorBuffer), ke.bufferData(ke.ARRAY_BUFFER, de, r))
                    }
                    if (Ee && we.hasTangents) {
                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], m = l.vertexTangents, b = m[0], w = m[1], M = m[2], pe[re] = b.x, pe[re + 1] = b.y, pe[re + 2] = b.z, pe[re + 3] = b.w, pe[re + 4] = w.x, pe[re + 5] = w.y, pe[re + 6] = w.z, pe[re + 7] = w.w, pe[re + 8] = M.x, pe[re + 9] = M.y, pe[re + 10] = M.z, pe[re + 11] = M.w, re += 12;
                        ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglTangentBuffer), ke.bufferData(ke.ARRAY_BUFFER, pe, r)
                    }
                    if (Ce) {
                        for (a = 0, s = Re.length; s > a; a++)
                            if (l = Fe[Re[a]], c = l.vertexNormals, u = l.normal, 3 === c.length && K)
                                for (B = 0; 3 > B; B++) k = c[B], fe[te] = k.x, fe[te + 1] = k.y, fe[te + 2] = k.z, te += 3;
                            else
                                for (B = 0; 3 > B; B++) fe[te] = u.x, fe[te + 1] = u.y, fe[te + 2] = u.z, te += 3;
                        ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglNormalBuffer), ke.bufferData(ke.ARRAY_BUFFER, fe, r)
                    }
                    if (Te && De) {
                        for (a = 0, s = Re.length; s > a; a++)
                            if (h = Re[a], v = De[h], void 0 !== v)
                                for (B = 0; 3 > B; B++) N = v[B], ce[J] = N.x, ce[J + 1] = N.y, J += 2;
                        J > 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglUVBuffer), ke.bufferData(ke.ARRAY_BUFFER, ce, r))
                    }
                    if (Te && Ue) {
                        for (a = 0, s = Re.length; s > a; a++)
                            if (h = Re[a], g = Ue[h], void 0 !== g)
                                for (B = 0; 3 > B; B++) O = g[B], ue[$] = O.x, ue[$ + 1] = O.y, $ += 2;
                        $ > 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglUV2Buffer), ke.bufferData(ke.ARRAY_BUFFER, ue, r))
                    }
                    if (Se) {
                        for (a = 0, s = Re.length; s > a; a++) _e[ee] = Z, _e[ee + 1] = Z + 1, _e[ee + 2] = Z + 2, ee += 3, be[ie] = Z, be[ie + 1] = Z + 1, be[ie + 2] = Z, be[ie + 3] = Z + 2, be[ie + 4] = Z + 1, be[ie + 5] = Z + 2, ie += 6, Z += 3;
                        ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), ke.bufferData(ke.ELEMENT_ARRAY_BUFFER, _e, r), ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), ke.bufferData(ke.ELEMENT_ARRAY_BUFFER, be, r)
                    }
                    if (xe)
                        for (B = 0, V = xe.length; V > B; B++)
                            if (Y = xe[B], Y.__original.needsUpdate) {
                                if (se = 0, he = 0, 1 === Y.size) {
                                    if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], Y.array[se] = Y.value[l.a], Y.array[se + 1] = Y.value[l.b], Y.array[se + 2] = Y.value[l.c], se += 3;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], Y.array[se] = q, Y.array[se + 1] = q, Y.array[se + 2] = q, se += 3
                                } else if (2 === Y.size) {
                                    if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = Y.value[l.a], x = Y.value[l.b], _ = Y.value[l.c], Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = x.x, Y.array[se + 3] = x.y, Y.array[se + 4] = _.x, Y.array[se + 5] = _.y, se += 6;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q, x = q, _ = q, Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = x.x, Y.array[se + 3] = x.y, Y.array[se + 4] = _.x, Y.array[se + 5] = _.y, se += 6
                                } else if (3 === Y.size) {
                                    var Oe;
                                    if (Oe = "c" === Y.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = Y.value[l.a], x = Y.value[l.b], _ = Y.value[l.c], Y.array[se] = y[Oe[0]], Y.array[se + 1] = y[Oe[1]], Y.array[se + 2] = y[Oe[2]], Y.array[se + 3] = x[Oe[0]], Y.array[se + 4] = x[Oe[1]], Y.array[se + 5] = x[Oe[2]], Y.array[se + 6] = _[Oe[0]], Y.array[se + 7] = _[Oe[1]], Y.array[se + 8] = _[Oe[2]], se += 9;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q, x = q, _ = q, Y.array[se] = y[Oe[0]], Y.array[se + 1] = y[Oe[1]], Y.array[se + 2] = y[Oe[2]], Y.array[se + 3] = x[Oe[0]], Y.array[se + 4] = x[Oe[1]], Y.array[se + 5] = x[Oe[2]], Y.array[se + 6] = _[Oe[0]], Y.array[se + 7] = _[Oe[1]], Y.array[se + 8] = _[Oe[2]], se += 9;
                                    else if ("faceVertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q[0], x = q[1], _ = q[2], Y.array[se] = y[Oe[0]], Y.array[se + 1] = y[Oe[1]], Y.array[se + 2] = y[Oe[2]], Y.array[se + 3] = x[Oe[0]], Y.array[se + 4] = x[Oe[1]], Y.array[se + 5] = x[Oe[2]], Y.array[se + 6] = _[Oe[0]], Y.array[se + 7] = _[Oe[1]], Y.array[se + 8] = _[Oe[2]], se += 9
                                } else if (4 === Y.size)
                                    if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = Y.value[l.a], x = Y.value[l.b], _ = Y.value[l.c], Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = y.z, Y.array[se + 3] = y.w, Y.array[se + 4] = x.x, Y.array[se + 5] = x.y, Y.array[se + 6] = x.z, Y.array[se + 7] = x.w, Y.array[se + 8] = _.x, Y.array[se + 9] = _.y, Y.array[se + 10] = _.z, Y.array[se + 11] = _.w, se += 12;
                                    else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q, x = q, _ = q, Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = y.z, Y.array[se + 3] = y.w, Y.array[se + 4] = x.x, Y.array[se + 5] = x.y, Y.array[se + 6] = x.z, Y.array[se + 7] = x.w, Y.array[se + 8] = _.x, Y.array[se + 9] = _.y, Y.array[se + 10] = _.z, Y.array[se + 11] = _.w, se += 12;
                                    else if ("faceVertices" === Y.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) q = Y.value[Re[a]], y = q[0], x = q[1], _ = q[2], Y.array[se] = y.x, Y.array[se + 1] = y.y, Y.array[se + 2] = y.z, Y.array[se + 3] = y.w, Y.array[se + 4] = x.x, Y.array[se + 5] = x.y, Y.array[se + 6] = x.z, Y.array[se + 7] = x.w, Y.array[se + 8] = _.x, Y.array[se + 9] = _.y, Y.array[se + 10] = _.z, Y.array[se + 11] = _.w, se += 12;
                                ke.bindBuffer(ke.ARRAY_BUFFER, Y.buffer), ke.bufferData(ke.ARRAY_BUFFER, Y.array, r)
                            }
                    i && (delete e.__inittedArrays, delete e.__colorArray, delete e.__normalArray, delete e.__tangentArray, delete e.__uvArray, delete e.__uv2Array, delete e.__faceArray, delete e.__vertexArray, delete e.__lineArray, delete e.__skinIndexArray, delete e.__skinWeightArray)
                }
            }
            function v(e) {
                for (var t = e.attributes, r = e.attributesKeys, i = 0, n = r.length; n > i; i++) {
                    var o = r[i],
                        a = t[o];
                    if (void 0 === a.buffer && (a.buffer = ke.createBuffer(), a.needsUpdate = !0), a.needsUpdate === !0) {
                        var s = "index" === o ? ke.ELEMENT_ARRAY_BUFFER : ke.ARRAY_BUFFER;
                        ke.bindBuffer(s, a.buffer), ke.bufferData(s, a.array, ke.STATIC_DRAW), a.needsUpdate = !1
                    }
                }
            }
            function g(e, t, r, i) {
                for (var n = r.attributes, o = t.attributes, a = t.attributesKeys, s = 0, h = a.length; h > s; s++) {
                    var l = a[s],
                        c = o[l];
                    if (c >= 0) {
                        var u = n[l];
                        if (void 0 !== u) {
                            var f = u.itemSize;
                            ke.bindBuffer(ke.ARRAY_BUFFER, u.buffer), x(c), ke.vertexAttribPointer(c, f, ke.FLOAT, !1, 0, i * f * 4)
                        } else void 0 !== e.defaultAttributeValues && (2 === e.defaultAttributeValues[l].length ? ke.vertexAttrib2fv(c, e.defaultAttributeValues[l]) : 3 === e.defaultAttributeValues[l].length && ke.vertexAttrib3fv(c, e.defaultAttributeValues[l]))
                    }
                }
                _()
            }
            function y() {
                for (var e = 0, t = ut.length; t > e; e++) ut[e] = 0
            }
            function x(e) {
                ut[e] = 1, 0 === ft[e] && (ke.enableVertexAttribArray(e), ft[e] = 1)
            }
            function _() {
                for (var e = 0, t = ft.length; t > e; e++) ft[e] !== ut[e] && (ke.disableVertexAttribArray(e), ft[e] = 0)
            }
            function b(e, t, r) {
                var i = e.program.attributes;
                if (-1 !== r.morphTargetBase && i.position >= 0 ? (ke.bindBuffer(ke.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[r.morphTargetBase]), x(i.position), ke.vertexAttribPointer(i.position, 3, ke.FLOAT, !1, 0, 0)) : i.position >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, t.__webglVertexBuffer), x(i.position), ke.vertexAttribPointer(i.position, 3, ke.FLOAT, !1, 0, 0)), r.morphTargetForcedOrder.length)
                    for (var n = 0, o = r.morphTargetForcedOrder, a = r.morphTargetInfluences; n < e.numSupportedMorphTargets && n < o.length;) i["morphTarget" + n] >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[o[n]]), x(i["morphTarget" + n]), ke.vertexAttribPointer(i["morphTarget" + n], 3, ke.FLOAT, !1, 0, 0)), i["morphNormal" + n] >= 0 && e.morphNormals && (ke.bindBuffer(ke.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[o[n]]), x(i["morphNormal" + n]), ke.vertexAttribPointer(i["morphNormal" + n], 3, ke.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[n] = a[o[n]], n++;
                else {
                    var s, h, l = [],
                        a = r.morphTargetInfluences,
                        c = a.length;
                    for (h = 0; c > h; h++) s = a[h], s > 0 && l.push([s, h]);
                    l.length > e.numSupportedMorphTargets ? (l.sort(S), l.length = e.numSupportedMorphTargets) : l.length > e.numSupportedMorphNormals ? l.sort(S) : 0 === l.length && l.push([0, 0]);
                    for (var u, n = 0; n < e.numSupportedMorphTargets;) l[n] ? (u = l[n][1], i["morphTarget" + n] >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[u]), x(i["morphTarget" + n]), ke.vertexAttribPointer(i["morphTarget" + n], 3, ke.FLOAT, !1, 0, 0)), i["morphNormal" + n] >= 0 && e.morphNormals && (ke.bindBuffer(ke.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[u]), x(i["morphNormal" + n]), ke.vertexAttribPointer(i["morphNormal" + n], 3, ke.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[n] = a[u]) : r.__webglMorphTargetInfluences[n] = 0, n++
                }
                null !== e.program.uniforms.morphTargetInfluences && ke.uniform1fv(e.program.uniforms.morphTargetInfluences, r.__webglMorphTargetInfluences)
            }
            function w(e, t) {
                return e.material.id !== t.material.id ? t.material.id - e.material.id : e.z !== t.z ? t.z - e.z : e.id - t.id
            }
            function M(e, t) {
                return e.z !== t.z ? e.z - t.z : e.id - t.id
            }
            function S(e, t) {
                return t[0] - e[0]
            }
            function T(e, t) {
                if (t.visible !== !1) {
                    if (t instanceof n.Scene || t instanceof n.Group);
                    else if (P(t, e), t instanceof n.Light) Re.push(t);
                    else if (t instanceof n.Sprite) Be.push(t);
                    else if (t instanceof n.LensFlare) Ve.push(t);
                    else {
                        var r = Fe[t.id];
                        if (r && (t.frustumCulled === !1 || pt.intersectsObject(t) === !0)) {
                            z(t, e);
                            for (var i = 0, o = r.length; o > i; i++) {
                                var a = r[i];
                                L(a), a.render = !0, Ne.sortObjects === !0 && (null !== t.renderDepth ? a.z = t.renderDepth : (vt.setFromMatrixPosition(t.matrixWorld), vt.applyProjection(dt), a.z = vt.z))
                            }
                        }
                    }
                    for (var i = 0, o = t.children.length; o > i; i++) T(e, t.children[i])
                }
            }
            function C(e, t, r, i, o, a) {
                for (var s, h = e.length - 1; - 1 !== h; h--) {
                    var l = e[h],
                        c = l.object,
                        u = l.buffer;
                    if (te(c, t), a) s = a;
                    else {
                        if (s = l.material, !s) continue;
                        o && Ne.setBlending(s.blending, s.blendEquation, s.blendSrc, s.blendDst), Ne.setDepthTest(s.depthTest), Ne.setDepthWrite(s.depthWrite), ae(s.polygonOffset, s.polygonOffsetFactor, s.polygonOffsetUnits)
                    }
                    Ne.setMaterialFaces(s), u instanceof n.BufferGeometry ? Ne.renderBufferDirect(t, r, i, s, u, c) : Ne.renderBuffer(t, r, i, s, u, c)
                }
            }
            function E(e, t, r, i, n, o, a) {
                for (var s, h = 0, l = e.length; l > h; h++) {
                    var c = e[h],
                        u = c.object;
                    if (u.visible) {
                        if (a) s = a;
                        else {
                            if (s = c[t], !s) continue;
                            o && Ne.setBlending(s.blending, s.blendEquation, s.blendSrc, s.blendDst), Ne.setDepthTest(s.depthTest), Ne.setDepthWrite(s.depthWrite), ae(s.polygonOffset, s.polygonOffsetFactor, s.polygonOffsetUnits)
                        }
                        Ne.renderImmediateObject(r, i, n, s, u)
                    }
                }
            }
            function A(e) {
                var t = e.object,
                    r = t.material;
                r.transparent ? (e.transparent = r, e.opaque = null) : (e.opaque = r, e.transparent = null)
            }
            function L(e) {
                var t = e.object,
                    r = e.buffer,
                    i = t.geometry,
                    o = t.material;
                if (o instanceof n.MeshFaceMaterial) {
                    var a = i instanceof n.BufferGeometry ? 0 : r.materialIndex;
                    o = o.materials[a], e.material = o, o.transparent ? ze.push(e) : Ue.push(e)
                } else o && (e.material = o, o.transparent ? ze.push(e) : Ue.push(e))
            }
            function P(e, t) {
                void 0 === e.__webglInit && (e.__webglInit = !0, e._modelViewMatrix = new n.Matrix4, e._normalMatrix = new n.Matrix3, e.addEventListener("removed", Nt));
                var i = e.geometry;
                if (void 0 === i || void 0 === i.__webglInit && (i.__webglInit = !0, i.addEventListener("dispose", Ot), i instanceof n.BufferGeometry || (e instanceof n.Mesh ? F(t, e, i) : e instanceof n.Line ? void 0 === i.__webglVertexBuffer && (o(i), l(i, e), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0, i.lineDistancesNeedUpdate = !0) : e instanceof n.PointCloud && void 0 === i.__webglVertexBuffer && (r(i), h(i, e), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0))), void 0 === e.__webglActive)
                    if (e.__webglActive = !0, e instanceof n.Mesh) {
                        if (i instanceof n.BufferGeometry) D(Fe, i, e);
                        else if (i instanceof n.Geometry)
                            for (var a = Kt[i.id], s = 0, c = a.length; c > s; s++) D(Fe, a[s], e)
                    } else e instanceof n.Line || e instanceof n.PointCloud ? D(Fe, i, e) : (e instanceof n.ImmediateRenderObject || e.immediateRenderCallback) && U(De, e)
            }
            function R(e, t) {
                for (var r, i, n = wt.get("OES_element_index_uint") ? 4294967296 : 65535, o = {}, a = e.morphTargets.length, s = e.morphNormals.length, h = {}, l = [], c = 0, u = e.faces.length; u > c; c++) {
                    var f = e.faces[c],
                        p = t ? f.materialIndex : 0;
                    p in o || (o[p] = {
                        hash: p,
                        counter: 0
                    }), r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                        id: Zt++,
                        faces3: [],
                        materialIndex: p,
                        vertices: 0,
                        numMorphTargets: a,
                        numMorphNormals: s
                    }, h[r] = i, l.push(i)), h[r].vertices + 3 > n && (o[p].counter += 1, r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                        id: Zt++,
                        faces3: [],
                        materialIndex: p,
                        vertices: 0,
                        numMorphTargets: a,
                        numMorphNormals: s
                    }, h[r] = i, l.push(i))), h[r].faces3.push(c), h[r].vertices += 3
                }
                return l
            }
            function F(e, t, r) {
                var i = t.material,
                    o = !1;
                (void 0 === Kt[r.id] || r.groupsNeedUpdate === !0) && (delete Fe[t.id], Kt[r.id] = R(r, i instanceof n.MeshFaceMaterial), r.groupsNeedUpdate = !1);
                for (var s = Kt[r.id], h = 0, l = s.length; l > h; h++) {
                    var u = s[h];
                    void 0 === u.__webglVertexBuffer ? (a(u), c(u, t), r.verticesNeedUpdate = !0, r.morphTargetsNeedUpdate = !0, r.elementsNeedUpdate = !0, r.uvsNeedUpdate = !0, r.normalsNeedUpdate = !0, r.tangentsNeedUpdate = !0, r.colorsNeedUpdate = !0, o = !0) : o = !1, (o || void 0 === t.__webglActive) && D(Fe, u, t)
                }
                t.__webglActive = !0
            }
            function D(e, t, r) {
                var i = r.id;
                e[i] = e[i] || [], e[i].push({
                    id: i,
                    buffer: t,
                    object: r,
                    material: null,
                    z: 0
                })
            }
            function U(e, t) {
                e.push({
                    id: null,
                    object: t,
                    opaque: null,
                    transparent: null,
                    z: 0
                })
            }
            function z(e, t) {
                var r, i, o = e.geometry;
                if (o instanceof n.BufferGeometry) v(o);
                else if (e instanceof n.Mesh) {
                    o.groupsNeedUpdate === !0 && F(t, e, o);
                    for (var a = Kt[o.id], s = 0, h = a.length; h > s; s++) {
                        var l = a[s];
                        i = u(e, l), o.groupsNeedUpdate === !0 && c(l, e), r = i.attributes && B(i), (o.verticesNeedUpdate || o.morphTargetsNeedUpdate || o.elementsNeedUpdate || o.uvsNeedUpdate || o.normalsNeedUpdate || o.colorsNeedUpdate || o.tangentsNeedUpdate || r) && m(l, e, ke.DYNAMIC_DRAW, !o.dynamic, i)
                    }
                    o.verticesNeedUpdate = !1, o.morphTargetsNeedUpdate = !1, o.elementsNeedUpdate = !1, o.uvsNeedUpdate = !1, o.normalsNeedUpdate = !1, o.colorsNeedUpdate = !1, o.tangentsNeedUpdate = !1, i.attributes && V(i)
                } else e instanceof n.Line ? (i = u(e, o), r = i.attributes && B(i), (o.verticesNeedUpdate || o.colorsNeedUpdate || o.lineDistancesNeedUpdate || r) && d(o, ke.DYNAMIC_DRAW), o.verticesNeedUpdate = !1, o.colorsNeedUpdate = !1, o.lineDistancesNeedUpdate = !1, i.attributes && V(i)) : e instanceof n.PointCloud && (i = u(e, o), r = i.attributes && B(i), (o.verticesNeedUpdate || o.colorsNeedUpdate || e.sortParticles || r) && p(o, ke.DYNAMIC_DRAW, e), o.verticesNeedUpdate = !1, o.colorsNeedUpdate = !1, i.attributes && V(i))
            }
            function B(e) {
                for (var t in e.attributes)
                    if (e.attributes[t].needsUpdate) return !0;
                return !1
            }
            function V(e) {
                for (var t in e.attributes) e.attributes[t].needsUpdate = !1
            }
            function k(e) {
                e instanceof n.Mesh || e instanceof n.PointCloud || e instanceof n.Line ? delete Fe[e.id] : (e instanceof n.ImmediateRenderObject || e.immediateRenderCallback) && N(De, e), delete e.__webglInit, delete e._modelViewMatrix, delete e._normalMatrix, delete e.__webglActive
            }
            function N(e, t) {
                for (var r = e.length - 1; r >= 0; r--) e[r].object === t && e.splice(r, 1)
            }
            function O(e, t, r, i) {
                e.addEventListener("dispose", Ht);
                var o;
                if (e instanceof n.MeshDepthMaterial ? o = "depth" : e instanceof n.MeshNormalMaterial ? o = "normal" : e instanceof n.MeshBasicMaterial ? o = "basic" : e instanceof n.MeshLambertMaterial ? o = "lambert" : e instanceof n.MeshPhongMaterial ? o = "phong" : e instanceof n.LineBasicMaterial ? o = "basic" : e instanceof n.LineDashedMaterial ? o = "dashed" : e instanceof n.PointCloudMaterial && (o = "particle_basic"), o) {
                    var a = n.ShaderLib[o];
                    e.__webglShader = {
                        uniforms: n.UniformsUtils.clone(a.uniforms),
                        vertexShader: a.vertexShader,
                        fragmentShader: a.fragmentShader
                    }
                } else e.__webglShader = {
                    uniforms: e.uniforms,
                    vertexShader: e.vertexShader,
                    fragmentShader: e.fragmentShader
                };
                var s = ge(t),
                    h = ye(t),
                    l = ve(i),
                    c = {
                        precision: be,
                        supportsVertexTextures: Et,
                        map: !!e.map,
                        envMap: !!e.envMap,
                        lightMap: !!e.lightMap,
                        bumpMap: !!e.bumpMap,
                        normalMap: !!e.normalMap,
                        specularMap: !!e.specularMap,
                        alphaMap: !!e.alphaMap,
                        vertexColors: e.vertexColors,
                        fog: r,
                        useFog: e.fog,
                        fogExp: r instanceof n.FogExp2,
                        sizeAttenuation: e.sizeAttenuation,
                        logarithmicDepthBuffer: Ae,
                        skinning: e.skinning,
                        maxBones: l,
                        useVertexTexture: At && i && i.skeleton && i.skeleton.useVertexTexture,
                        morphTargets: e.morphTargets,
                        morphNormals: e.morphNormals,
                        maxMorphTargets: Ne.maxMorphTargets,
                        maxMorphNormals: Ne.maxMorphNormals,
                        maxDirLights: s.directional,
                        maxPointLights: s.point,
                        maxSpotLights: s.spot,
                        maxHemiLights: s.hemi,
                        maxShadows: h,
                        shadowMapEnabled: Ne.shadowMapEnabled && i.receiveShadow && h > 0,
                        shadowMapType: Ne.shadowMapType,
                        shadowMapDebug: Ne.shadowMapDebug,
                        shadowMapCascade: Ne.shadowMapCascade,
                        alphaTest: e.alphaTest,
                        metal: e.metal,
                        wrapAround: e.wrapAround,
                        doubleSided: e.side === n.DoubleSide,
                        flipSided: e.side === n.BackSide
                    },
                    u = [];
                if (o ? u.push(o) : (u.push(e.fragmentShader), u.push(e.vertexShader)), void 0 !== e.defines)
                    for (var f in e.defines) u.push(f), u.push(e.defines[f]);
                for (var f in c) u.push(f), u.push(c[f]);
                for (var p, d = u.join(), m = 0, v = Oe.length; v > m; m++) {
                    var g = Oe[m];
                    if (g.code === d) {
                        p = g, p.usedTimes++;
                        break
                    }
                }
                void 0 === p && (p = new n.WebGLProgram(Ne, d, e, c), Oe.push(p), Ne.info.memory.programs = Oe.length), e.program = p;
                var y = p.attributes;
                if (e.morphTargets) {
                    e.numSupportedMorphTargets = 0;
                    for (var x, _ = "morphTarget", b = 0; b < Ne.maxMorphTargets; b++) x = _ + b, y[x] >= 0 && e.numSupportedMorphTargets++
                }
                if (e.morphNormals) {
                    e.numSupportedMorphNormals = 0;
                    var x, _ = "morphNormal";
                    for (b = 0; b < Ne.maxMorphNormals; b++) x = _ + b, y[x] >= 0 && e.numSupportedMorphNormals++
                }
                e.uniformsList = [];
                for (var w in e.__webglShader.uniforms) {
                    var M = e.program.uniforms[w];
                    M && e.uniformsList.push([e.__webglShader.uniforms[w], M])
                }
            }
            function I(e, t, r, i, o) {
                Xe = 0, i.needsUpdate && (i.program && Yt(i), O(i, t, r, o), i.needsUpdate = !1), i.morphTargets && (o.__webglMorphTargetInfluences || (o.__webglMorphTargetInfluences = new Float32Array(Ne.maxMorphTargets)));
                var a = !1,
                    s = !1,
                    h = !1,
                    l = i.program,
                    c = l.uniforms,
                    u = i.__webglShader.uniforms;
                if (l.id !== Ie && (ke.useProgram(l.program), Ie = l.id, a = !0, s = !0, h = !0), i.id !== He && (-1 === He && (h = !0), He = i.id, s = !0), (a || e !== je) && (ke.uniformMatrix4fv(c.projectionMatrix, !1, e.projectionMatrix.elements), Ae && ke.uniform1f(c.logDepthBufFC, 2 / (Math.log(e.far + 1) / Math.LN2)), e !== je && (je = e), (i instanceof n.ShaderMaterial || i instanceof n.MeshPhongMaterial || i.envMap) && null !== c.cameraPosition && (vt.setFromMatrixPosition(e.matrixWorld), ke.uniform3f(c.cameraPosition, vt.x, vt.y, vt.z)), (i instanceof n.MeshPhongMaterial || i instanceof n.MeshLambertMaterial || i instanceof n.ShaderMaterial || i.skinning) && null !== c.viewMatrix && ke.uniformMatrix4fv(c.viewMatrix, !1, e.matrixWorldInverse.elements)), i.skinning)
                    if (o.bindMatrix && null !== c.bindMatrix && ke.uniformMatrix4fv(c.bindMatrix, !1, o.bindMatrix.elements), o.bindMatrixInverse && null !== c.bindMatrixInverse && ke.uniformMatrix4fv(c.bindMatrixInverse, !1, o.bindMatrixInverse.elements), At && o.skeleton && o.skeleton.useVertexTexture) {
                        if (null !== c.boneTexture) {
                            var f = $();
                            ke.uniform1i(c.boneTexture, f), Ne.setTexture(o.skeleton.boneTexture, f)
                        }
                        null !== c.boneTextureWidth && ke.uniform1i(c.boneTextureWidth, o.skeleton.boneTextureWidth), null !== c.boneTextureHeight && ke.uniform1i(c.boneTextureHeight, o.skeleton.boneTextureHeight)
                    } else o.skeleton && o.skeleton.boneMatrices && null !== c.boneGlobalMatrices && ke.uniformMatrix4fv(c.boneGlobalMatrices, !1, o.skeleton.boneMatrices);
                return s && (r && i.fog && X(u, r), (i instanceof n.MeshPhongMaterial || i instanceof n.MeshLambertMaterial || i.lights) && (yt && (h = !0, ne(t), yt = !1), h ? (K(u, xt), Z(u, !0)) : Z(u, !1)), (i instanceof n.MeshBasicMaterial || i instanceof n.MeshLambertMaterial || i instanceof n.MeshPhongMaterial) && G(u, i), i instanceof n.LineBasicMaterial ? H(u, i) : i instanceof n.LineDashedMaterial ? (H(u, i), W(u, i)) : i instanceof n.PointCloudMaterial ? j(u, i) : i instanceof n.MeshPhongMaterial ? q(u, i) : i instanceof n.MeshLambertMaterial ? Y(u, i) : i instanceof n.MeshDepthMaterial ? (u.mNear.value = e.near, u.mFar.value = e.far, u.opacity.value = i.opacity) : i instanceof n.MeshNormalMaterial && (u.opacity.value = i.opacity), o.receiveShadow && !i._shadowPass && Q(u, t), ee(i.uniformsList)), J(c, o), null !== c.modelMatrix && ke.uniformMatrix4fv(c.modelMatrix, !1, o.matrixWorld.elements), l
            }
            function G(e, t) {
                e.opacity.value = t.opacity, Ne.gammaInput ? e.diffuse.value.copyGammaToLinear(t.color) : e.diffuse.value = t.color, e.map.value = t.map, e.lightMap.value = t.lightMap, e.specularMap.value = t.specularMap, e.alphaMap.value = t.alphaMap, t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale));
                var r;
                if (t.map ? r = t.map : t.specularMap ? r = t.specularMap : t.normalMap ? r = t.normalMap : t.bumpMap ? r = t.bumpMap : t.alphaMap && (r = t.alphaMap), void 0 !== r) {
                    var i = r.offset,
                        o = r.repeat;
                    e.offsetRepeat.value.set(i.x, i.y, o.x, o.y)
                }
                e.envMap.value = t.envMap, e.flipEnvMap.value = t.envMap instanceof n.WebGLRenderTargetCube ? 1 : -1, Ne.gammaInput ? e.reflectivity.value = t.reflectivity : e.reflectivity.value = t.reflectivity, e.refractionRatio.value = t.refractionRatio, e.combine.value = t.combine, e.useRefract.value = t.envMap && t.envMap.mapping instanceof n.CubeRefractionMapping
            }
            function H(e, t) {
                e.diffuse.value = t.color, e.opacity.value = t.opacity
            }
            function W(e, t) {
                e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale
            }
            function j(e, t) {
                e.psColor.value = t.color, e.opacity.value = t.opacity, e.size.value = t.size, e.scale.value = xe.height / 2, e.map.value = t.map
            }
            function X(e, t) {
                e.fogColor.value = t.color, t instanceof n.Fog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t instanceof n.FogExp2 && (e.fogDensity.value = t.density)
            }
            function q(e, t) {
                e.shininess.value = t.shininess, Ne.gammaInput ? (e.ambient.value.copyGammaToLinear(t.ambient), e.emissive.value.copyGammaToLinear(t.emissive), e.specular.value.copyGammaToLinear(t.specular)) : (e.ambient.value = t.ambient, e.emissive.value = t.emissive, e.specular.value = t.specular), t.wrapAround && e.wrapRGB.value.copy(t.wrapRGB)
            }
            function Y(e, t) {
                Ne.gammaInput ? (e.ambient.value.copyGammaToLinear(t.ambient), e.emissive.value.copyGammaToLinear(t.emissive)) : (e.ambient.value = t.ambient, e.emissive.value = t.emissive), t.wrapAround && e.wrapRGB.value.copy(t.wrapRGB)
            }
            function K(e, t) {
                e.ambientLightColor.value = t.ambient, e.directionalLightColor.value = t.directional.colors, e.directionalLightDirection.value = t.directional.positions, e.pointLightColor.value = t.point.colors, e.pointLightPosition.value = t.point.positions, e.pointLightDistance.value = t.point.distances, e.spotLightColor.value = t.spot.colors, e.spotLightPosition.value = t.spot.positions, e.spotLightDistance.value = t.spot.distances, e.spotLightDirection.value = t.spot.directions, e.spotLightAngleCos.value = t.spot.anglesCos, e.spotLightExponent.value = t.spot.exponents, e.hemisphereLightSkyColor.value = t.hemi.skyColors, e.hemisphereLightGroundColor.value = t.hemi.groundColors, e.hemisphereLightDirection.value = t.hemi.positions
            }
            function Z(e, t) {
                e.ambientLightColor.needsUpdate = t, e.directionalLightColor.needsUpdate = t, e.directionalLightDirection.needsUpdate = t, e.pointLightColor.needsUpdate = t, e.pointLightPosition.needsUpdate = t, e.pointLightDistance.needsUpdate = t, e.spotLightColor.needsUpdate = t, e.spotLightPosition.needsUpdate = t, e.spotLightDistance.needsUpdate = t, e.spotLightDirection.needsUpdate = t, e.spotLightAngleCos.needsUpdate = t, e.spotLightExponent.needsUpdate = t, e.hemisphereLightSkyColor.needsUpdate = t, e.hemisphereLightGroundColor.needsUpdate = t, e.hemisphereLightDirection.needsUpdate = t
            }
            function Q(e, t) {
                if (e.shadowMatrix)
                    for (var r = 0, i = 0, o = t.length; o > i; i++) {
                        var a = t[i];
                        a.castShadow && (a instanceof n.SpotLight || a instanceof n.DirectionalLight && !a.shadowCascade) && (e.shadowMap.value[r] = a.shadowMap, e.shadowMapSize.value[r] = a.shadowMapSize, e.shadowMatrix.value[r] = a.shadowMatrix, e.shadowDarkness.value[r] = a.shadowDarkness, e.shadowBias.value[r] = a.shadowBias, r++)
                    }
            }
            function J(e, t) {
                ke.uniformMatrix4fv(e.modelViewMatrix, !1, t._modelViewMatrix.elements), e.normalMatrix && ke.uniformMatrix3fv(e.normalMatrix, !1, t._normalMatrix.elements)
            }
            function $() {
                var e = Xe;
                return e >= Mt && console.warn("WebGLRenderer: trying to use " + e + " texture units while this GPU supports only " + Mt), Xe += 1, e
            }
            function ee(e) {
                for (var t, r, i, o = 0, a = e.length; a > o; o++) {
                    var s = e[o][0];
                    if (s.needsUpdate !== !1) {
                        var h = s.type,
                            l = s.value,
                            c = e[o][1];
                        switch (h) {
                            case "1i":
                                ke.uniform1i(c, l);
                                break;
                            case "1f":
                                ke.uniform1f(c, l);
                                break;
                            case "2f":
                                ke.uniform2f(c, l[0], l[1]);
                                break;
                            case "3f":
                                ke.uniform3f(c, l[0], l[1], l[2]);
                                break;
                            case "4f":
                                ke.uniform4f(c, l[0], l[1], l[2], l[3]);
                                break;
                            case "1iv":
                                ke.uniform1iv(c, l);
                                break;
                            case "3iv":
                                ke.uniform3iv(c, l);
                                break;
                            case "1fv":
                                ke.uniform1fv(c, l);
                                break;
                            case "2fv":
                                ke.uniform2fv(c, l);
                                break;
                            case "3fv":
                                ke.uniform3fv(c, l);
                                break;
                            case "4fv":
                                ke.uniform4fv(c, l);
                                break;
                            case "Matrix3fv":
                                ke.uniformMatrix3fv(c, !1, l);
                                break;
                            case "Matrix4fv":
                                ke.uniformMatrix4fv(c, !1, l);
                                break;
                            case "i":
                                ke.uniform1i(c, l);
                                break;
                            case "f":
                                ke.uniform1f(c, l);
                                break;
                            case "v2":
                                ke.uniform2f(c, l.x, l.y);
                                break;
                            case "v3":
                                ke.uniform3f(c, l.x, l.y, l.z);
                                break;
                            case "v4":
                                ke.uniform4f(c, l.x, l.y, l.z, l.w);
                                break;
                            case "c":
                                ke.uniform3f(c, l.r, l.g, l.b);
                                break;
                            case "iv1":
                                ke.uniform1iv(c, l);
                                break;
                            case "iv":
                                ke.uniform3iv(c, l);
                                break;
                            case "fv1":
                                ke.uniform1fv(c, l);
                                break;
                            case "fv":
                                ke.uniform3fv(c, l);
                                break;
                            case "v2v":
                                void 0 === s._array && (s._array = new Float32Array(2 * l.length));
                                for (var u = 0, f = l.length; f > u; u++) i = 2 * u, s._array[i] = l[u].x, s._array[i + 1] = l[u].y;
                                ke.uniform2fv(c, s._array);
                                break;
                            case "v3v":
                                void 0 === s._array && (s._array = new Float32Array(3 * l.length));
                                for (var u = 0, f = l.length; f > u; u++) i = 3 * u, s._array[i] = l[u].x, s._array[i + 1] = l[u].y, s._array[i + 2] = l[u].z;
                                ke.uniform3fv(c, s._array);
                                break;
                            case "v4v":
                                void 0 === s._array && (s._array = new Float32Array(4 * l.length));
                                for (var u = 0, f = l.length; f > u; u++) i = 4 * u, s._array[i] = l[u].x, s._array[i + 1] = l[u].y, s._array[i + 2] = l[u].z, s._array[i + 3] = l[u].w;
                                ke.uniform4fv(c, s._array);
                                break;
                            case "m3":
                                ke.uniformMatrix3fv(c, !1, l.elements);
                                break;
                            case "m3v":
                                void 0 === s._array && (s._array = new Float32Array(9 * l.length));
                                for (var u = 0, f = l.length; f > u; u++) l[u].flattenToArrayOffset(s._array, 9 * u);
                                ke.uniformMatrix3fv(c, !1, s._array);
                                break;
                            case "m4":
                                ke.uniformMatrix4fv(c, !1, l.elements);
                                break;
                            case "m4v":
                                void 0 === s._array && (s._array = new Float32Array(16 * l.length));
                                for (var u = 0, f = l.length; f > u; u++) l[u].flattenToArrayOffset(s._array, 16 * u);
                                ke.uniformMatrix4fv(c, !1, s._array);
                                break;
                            case "t":
                                if (t = l, r = $(), ke.uniform1i(c, r), !t) continue;
                                t instanceof n.CubeTexture || t.image instanceof Array && 6 === t.image.length ? le(t, r) : t instanceof n.WebGLRenderTargetCube ? ce(t, r) : Ne.setTexture(t, r);
                                break;
                            case "tv":
                                void 0 === s._array && (s._array = []);
                                for (var u = 0, f = s.value.length; f > u; u++) s._array[u] = $();
                                ke.uniform1iv(c, s._array);
                                for (var u = 0, f = s.value.length; f > u; u++) t = s.value[u], r = s._array[u], t && Ne.setTexture(t, r);
                                break;
                            default:
                                console.warn("THREE.WebGLRenderer: Unknown uniform type: " + h)
                        }
                    }
                }
            }
            function te(e, t) {
                e._modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, e.matrixWorld), e._normalMatrix.getNormalMatrix(e._modelViewMatrix)
            }
            function re(e, t, r, i) {
                e[t] = r.r * r.r * i, e[t + 1] = r.g * r.g * i, e[t + 2] = r.b * r.b * i
            }
            function ie(e, t, r, i) {
                e[t] = r.r * i, e[t + 1] = r.g * i, e[t + 2] = r.b * i
            }
            function ne(e) {
                var t, r, i, o, a, s, h, l, c, u = 0,
                    f = 0,
                    p = 0,
                    d = xt,
                    m = d.directional.colors,
                    v = d.directional.positions,
                    g = d.point.colors,
                    y = d.point.positions,
                    x = d.point.distances,
                    _ = d.spot.colors,
                    b = d.spot.positions,
                    w = d.spot.distances,
                    M = d.spot.directions,
                    S = d.spot.anglesCos,
                    T = d.spot.exponents,
                    C = d.hemi.skyColors,
                    E = d.hemi.groundColors,
                    A = d.hemi.positions,
                    L = 0,
                    P = 0,
                    R = 0,
                    F = 0,
                    D = 0,
                    U = 0,
                    z = 0,
                    B = 0,
                    V = 0,
                    k = 0,
                    N = 0,
                    O = 0;
                for (t = 0, r = e.length; r > t; t++)
                    if (i = e[t], !i.onlyShadow)
                        if (o = i.color, h = i.intensity, c = i.distance, i instanceof n.AmbientLight) {
                            if (!i.visible) continue;
                            Ne.gammaInput ? (u += o.r * o.r, f += o.g * o.g, p += o.b * o.b) : (u += o.r, f += o.g, p += o.b)
                        } else if (i instanceof n.DirectionalLight) {
                            if (D += 1, !i.visible) continue;
                            gt.setFromMatrixPosition(i.matrixWorld), vt.setFromMatrixPosition(i.target.matrixWorld), gt.sub(vt), gt.normalize(), V = 3 * L, v[V] = gt.x, v[V + 1] = gt.y, v[V + 2] = gt.z, Ne.gammaInput ? re(m, V, o, h * h) : ie(m, V, o, h), L += 1
                        } else if (i instanceof n.PointLight) {
                            if (U += 1, !i.visible) continue;
                            k = 3 * P, Ne.gammaInput ? re(g, k, o, h * h) : ie(g, k, o, h), vt.setFromMatrixPosition(i.matrixWorld), y[k] = vt.x, y[k + 1] = vt.y, y[k + 2] = vt.z, x[P] = c, P += 1
                        } else if (i instanceof n.SpotLight) {
                            if (z += 1, !i.visible) continue;
                            N = 3 * R, Ne.gammaInput ? re(_, N, o, h * h) : ie(_, N, o, h), gt.setFromMatrixPosition(i.matrixWorld), b[N] = gt.x, b[N + 1] = gt.y, b[N + 2] = gt.z, w[R] = c, vt.setFromMatrixPosition(i.target.matrixWorld), gt.sub(vt), gt.normalize(), M[N] = gt.x, M[N + 1] = gt.y, M[N + 2] = gt.z, S[R] = Math.cos(i.angle), T[R] = i.exponent, R += 1
                        } else if (i instanceof n.HemisphereLight) {
                            if (B += 1, !i.visible) continue;
                            gt.setFromMatrixPosition(i.matrixWorld), gt.normalize(), O = 3 * F, A[O] = gt.x, A[O + 1] = gt.y, A[O + 2] = gt.z, a = i.color, s = i.groundColor, Ne.gammaInput ? (l = h * h, re(C, O, a, l), re(E, O, s, l)) : (ie(C, O, a, h), ie(E, O, s, h)), F += 1
                        }
                for (t = 3 * L, r = Math.max(m.length, 3 * D); r > t; t++) m[t] = 0;
                for (t = 3 * P, r = Math.max(g.length, 3 * U); r > t; t++) g[t] = 0;
                for (t = 3 * R, r = Math.max(_.length, 3 * z); r > t; t++) _[t] = 0;
                for (t = 3 * F, r = Math.max(C.length, 3 * B); r > t; t++) C[t] = 0;
                for (t = 3 * F, r = Math.max(E.length, 3 * B); r > t; t++) E[t] = 0;
                d.directional.length = L, d.point.length = P, d.spot.length = R, d.hemi.length = F, d.ambient[0] = u, d.ambient[1] = f, d.ambient[2] = p
            }
            function oe(e) {
                e !== nt && (ke.lineWidth(e), nt = e)
            }
            function ae(e, t, r) {
                tt !== e && (e ? ke.enable(ke.POLYGON_OFFSET_FILL) : ke.disable(ke.POLYGON_OFFSET_FILL), tt = e), !e || rt === t && it === r || (ke.polygonOffset(t, r), rt = t, it = r)
            }
            function se(e, t, r) {
                var i;
                r ? (ke.texParameteri(e, ke.TEXTURE_WRAP_S, me(t.wrapS)), ke.texParameteri(e, ke.TEXTURE_WRAP_T, me(t.wrapT)), ke.texParameteri(e, ke.TEXTURE_MAG_FILTER, me(t.magFilter)), ke.texParameteri(e, ke.TEXTURE_MIN_FILTER, me(t.minFilter))) : (ke.texParameteri(e, ke.TEXTURE_WRAP_S, ke.CLAMP_TO_EDGE), ke.texParameteri(e, ke.TEXTURE_WRAP_T, ke.CLAMP_TO_EDGE), ke.texParameteri(e, ke.TEXTURE_MAG_FILTER, de(t.magFilter)), ke.texParameteri(e, ke.TEXTURE_MIN_FILTER, de(t.minFilter))), i = wt.get("EXT_texture_filter_anisotropic"), i && t.type !== n.FloatType && (t.anisotropy > 1 || t.__oldAnisotropy) && (ke.texParameterf(e, i.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, Ne.getMaxAnisotropy())), t.__oldAnisotropy = t.anisotropy)
            }
            function he(e, t) {
                if (e.width > t || e.height > t) {
                    var r = t / Math.max(e.width, e.height),
                        i = document.createElement("canvas");
                    i.width = Math.floor(e.width * r), i.height = Math.floor(e.height * r);
                    var n = i.getContext("2d");
                    return n.drawImage(e, 0, 0, e.width, e.height, 0, 0, i.width, i.height), console.log("THREE.WebGLRenderer:", e, "is too big (" + e.width + "x" + e.height + "). Resized to " + i.width + "x" + i.height + "."), i
                }
                return e
            }
            function le(e, t) {
                if (6 === e.image.length)
                    if (e.needsUpdate) {
                        e.image.__webglTextureCube || (e.addEventListener("dispose", It), e.image.__webglTextureCube = ke.createTexture(), Ne.info.memory.textures++), ke.activeTexture(ke.TEXTURE0 + t), ke.bindTexture(ke.TEXTURE_CUBE_MAP, e.image.__webglTextureCube), ke.pixelStorei(ke.UNPACK_FLIP_Y_WEBGL, e.flipY);
                        for (var r = e instanceof n.CompressedTexture, i = e.image[0] instanceof n.DataTexture, o = [], a = 0; 6 > a; a++) !Ne.autoScaleCubemaps || r || i ? o[a] = i ? e.image[a].image : e.image[a] : o[a] = he(e.image[a], Ct);
                        var s = o[0],
                            h = n.Math.isPowerOfTwo(s.width) && n.Math.isPowerOfTwo(s.height),
                            l = me(e.format),
                            c = me(e.type);
                        se(ke.TEXTURE_CUBE_MAP, e, h);
                        for (var a = 0; 6 > a; a++)
                            if (r)
                                for (var u, f = o[a].mipmaps, p = 0, d = f.length; d > p; p++) u = f[p], e.format !== n.RGBAFormat && e.format !== n.RGBFormat ? Dt().indexOf(l) > -1 ? ke.compressedTexImage2D(ke.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, u.width, u.height, 0, u.data) : console.warn("Attempt to load unsupported compressed texture format") : ke.texImage2D(ke.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, u.width, u.height, 0, l, c, u.data);
                            else i ? ke.texImage2D(ke.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, o[a].width, o[a].height, 0, l, c, o[a].data) : ke.texImage2D(ke.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, l, c, o[a]);
                        e.generateMipmaps && h && ke.generateMipmap(ke.TEXTURE_CUBE_MAP), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
                    } else ke.activeTexture(ke.TEXTURE0 + t), ke.bindTexture(ke.TEXTURE_CUBE_MAP, e.image.__webglTextureCube)
            }
            function ce(e, t) {
                ke.activeTexture(ke.TEXTURE0 + t), ke.bindTexture(ke.TEXTURE_CUBE_MAP, e.__webglTexture)
            }
            function ue(e, t, r) {
                ke.bindFramebuffer(ke.FRAMEBUFFER, e), ke.framebufferTexture2D(ke.FRAMEBUFFER, ke.COLOR_ATTACHMENT0, r, t.__webglTexture, 0)
            }
            function fe(e, t) {
                ke.bindRenderbuffer(ke.RENDERBUFFER, e), t.depthBuffer && !t.stencilBuffer ? (ke.renderbufferStorage(ke.RENDERBUFFER, ke.DEPTH_COMPONENT16, t.width, t.height), ke.framebufferRenderbuffer(ke.FRAMEBUFFER, ke.DEPTH_ATTACHMENT, ke.RENDERBUFFER, e)) : t.depthBuffer && t.stencilBuffer ? (ke.renderbufferStorage(ke.RENDERBUFFER, ke.DEPTH_STENCIL, t.width, t.height), ke.framebufferRenderbuffer(ke.FRAMEBUFFER, ke.DEPTH_STENCIL_ATTACHMENT, ke.RENDERBUFFER, e)) : ke.renderbufferStorage(ke.RENDERBUFFER, ke.RGBA4, t.width, t.height)
            }
            function pe(e) {
                e instanceof n.WebGLRenderTargetCube ? (ke.bindTexture(ke.TEXTURE_CUBE_MAP, e.__webglTexture), ke.generateMipmap(ke.TEXTURE_CUBE_MAP), ke.bindTexture(ke.TEXTURE_CUBE_MAP, null)) : (ke.bindTexture(ke.TEXTURE_2D, e.__webglTexture), ke.generateMipmap(ke.TEXTURE_2D), ke.bindTexture(ke.TEXTURE_2D, null))
            }
            function de(e) {
                return e === n.NearestFilter || e === n.NearestMipMapNearestFilter || e === n.NearestMipMapLinearFilter ? ke.NEAREST : ke.LINEAR
            }
            function me(e) {
                var t;
                if (e === n.RepeatWrapping) return ke.REPEAT;
                if (e === n.ClampToEdgeWrapping) return ke.CLAMP_TO_EDGE;
                if (e === n.MirroredRepeatWrapping) return ke.MIRRORED_REPEAT;
                if (e === n.NearestFilter) return ke.NEAREST;
                if (e === n.NearestMipMapNearestFilter) return ke.NEAREST_MIPMAP_NEAREST;
                if (e === n.NearestMipMapLinearFilter) return ke.NEAREST_MIPMAP_LINEAR;
                if (e === n.LinearFilter) return ke.LINEAR;
                if (e === n.LinearMipMapNearestFilter) return ke.LINEAR_MIPMAP_NEAREST;
                if (e === n.LinearMipMapLinearFilter) return ke.LINEAR_MIPMAP_LINEAR;
                if (e === n.UnsignedByteType) return ke.UNSIGNED_BYTE;
                if (e === n.UnsignedShort4444Type) return ke.UNSIGNED_SHORT_4_4_4_4;
                if (e === n.UnsignedShort5551Type) return ke.UNSIGNED_SHORT_5_5_5_1;
                if (e === n.UnsignedShort565Type) return ke.UNSIGNED_SHORT_5_6_5;
                if (e === n.ByteType) return ke.BYTE;
                if (e === n.ShortType) return ke.SHORT;
                if (e === n.UnsignedShortType) return ke.UNSIGNED_SHORT;
                if (e === n.IntType) return ke.INT;
                if (e === n.UnsignedIntType) return ke.UNSIGNED_INT;
                if (e === n.FloatType) return ke.FLOAT;
                if (e === n.AlphaFormat) return ke.ALPHA;
                if (e === n.RGBFormat) return ke.RGB;
                if (e === n.RGBAFormat) return ke.RGBA;
                if (e === n.LuminanceFormat) return ke.LUMINANCE;
                if (e === n.LuminanceAlphaFormat) return ke.LUMINANCE_ALPHA;
                if (e === n.AddEquation) return ke.FUNC_ADD;
                if (e === n.SubtractEquation) return ke.FUNC_SUBTRACT;
                if (e === n.ReverseSubtractEquation) return ke.FUNC_REVERSE_SUBTRACT;
                if (e === n.ZeroFactor) return ke.ZERO;
                if (e === n.OneFactor) return ke.ONE;
                if (e === n.SrcColorFactor) return ke.SRC_COLOR;
                if (e === n.OneMinusSrcColorFactor) return ke.ONE_MINUS_SRC_COLOR;
                if (e === n.SrcAlphaFactor) return ke.SRC_ALPHA;
                if (e === n.OneMinusSrcAlphaFactor) return ke.ONE_MINUS_SRC_ALPHA;
                if (e === n.DstAlphaFactor) return ke.DST_ALPHA;
                if (e === n.OneMinusDstAlphaFactor) return ke.ONE_MINUS_DST_ALPHA;
                if (e === n.DstColorFactor) return ke.DST_COLOR;
                if (e === n.OneMinusDstColorFactor) return ke.ONE_MINUS_DST_COLOR;
                if (e === n.SrcAlphaSaturateFactor) return ke.SRC_ALPHA_SATURATE;
                if (t = wt.get("WEBGL_compressed_texture_s3tc"), null !== t) {
                    if (e === n.RGB_S3TC_DXT1_Format) return t.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (e === n.RGBA_S3TC_DXT1_Format) return t.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (e === n.RGBA_S3TC_DXT3_Format) return t.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (e === n.RGBA_S3TC_DXT5_Format) return t.COMPRESSED_RGBA_S3TC_DXT5_EXT
                }
                if (t = wt.get("WEBGL_compressed_texture_pvrtc"), null !== t) {
                    if (e === n.RGB_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (e === n.RGB_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (e === n.RGBA_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (e === n.RGBA_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                }
                if (t = wt.get("EXT_blend_minmax"), null !== t) {
                    if (e === n.MinEquation) return t.MIN_EXT;
                    if (e === n.MaxEquation) return t.MAX_EXT
                }
                return 0
            }
            function ve(e) {
                if (At && e && e.skeleton && e.skeleton.useVertexTexture) return 1024;
                var t = ke.getParameter(ke.MAX_VERTEX_UNIFORM_VECTORS),
                    r = Math.floor((t - 20) / 4),
                    i = r;
                return void 0 !== e && e instanceof n.SkinnedMesh && (i = Math.min(e.skeleton.bones.length, i), i < e.skeleton.bones.length && console.warn("WebGLRenderer: too many bones - " + e.skeleton.bones.length + ", this GPU supports just " + i + " (try OpenGL instead of ANGLE)")), i
            }
            function ge(e) {
                for (var t = 0, r = 0, i = 0, o = 0, a = 0, s = e.length; s > a; a++) {
                    var h = e[a];
                    h.onlyShadow || h.visible === !1 || (h instanceof n.DirectionalLight && t++, h instanceof n.PointLight && r++, h instanceof n.SpotLight && i++, h instanceof n.HemisphereLight && o++)
                }
                return {
                    directional: t,
                    point: r,
                    spot: i,
                    hemi: o
                }
            }
            function ye(e) {
                for (var t = 0, r = 0, i = e.length; i > r; r++) {
                    var o = e[r];
                    o.castShadow && (o instanceof n.SpotLight && t++, o instanceof n.DirectionalLight && !o.shadowCascade && t++)
                }
                return t
            }
            console.log("THREE.WebGLRenderer", n.REVISION), e = e || {};
            var xe = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
                _e = void 0 !== e.context ? e.context : null,
                be = void 0 !== e.precision ? e.precision : "highp",
                we = void 0 !== e.alpha ? e.alpha : !1,
                Me = void 0 !== e.depth ? e.depth : !0,
                Se = void 0 !== e.stencil ? e.stencil : !0,
                Te = void 0 !== e.antialias ? e.antialias : !1,
                Ce = void 0 !== e.premultipliedAlpha ? e.premultipliedAlpha : !0,
                Ee = void 0 !== e.preserveDrawingBuffer ? e.preserveDrawingBuffer : !1,
                Ae = void 0 !== e.logarithmicDepthBuffer ? e.logarithmicDepthBuffer : !1,
                Le = new n.Color(0),
                Pe = 0,
                Re = [],
                Fe = {},
                De = [],
                Ue = [],
                ze = [],
                Be = [],
                Ve = [];
            this.domElement = xe, this.context = null, this.devicePixelRatio = void 0 !== e.devicePixelRatio ? e.devicePixelRatio : void 0 !== i.devicePixelRatio ? i.devicePixelRatio : 1, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.gammaInput = !1, this.gammaOutput = !1, this.shadowMapEnabled = !1, this.shadowMapType = n.PCFShadowMap, this.shadowMapCullFace = n.CullFaceFront, this.shadowMapDebug = !1, this.shadowMapCascade = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.info = {
                memory: {
                    programs: 0,
                    geometries: 0,
                    textures: 0
                },
                render: {
                    calls: 0,
                    vertices: 0,
                    faces: 0,
                    points: 0
                }
            };
            var ke, Ne = this,
                Oe = [],
                Ie = null,
                Ge = null,
                He = -1,
                We = -1,
                je = null,
                Xe = 0,
                qe = -1,
                Ye = -1,
                Ke = -1,
                Ze = -1,
                Qe = -1,
                Je = -1,
                $e = -1,
                et = -1,
                tt = null,
                rt = null,
                it = null,
                nt = null,
                ot = 0,
                at = 0,
                st = xe.width,
                ht = xe.height,
                lt = 0,
                ct = 0,
                ut = new Uint8Array(16),
                ft = new Uint8Array(16),
                pt = new n.Frustum,
                dt = new n.Matrix4,
                mt = new n.Matrix4,
                vt = new n.Vector3,
                gt = new n.Vector3,
                yt = !0,
                xt = {
                    ambient: [0, 0, 0],
                    directional: {
                        length: 0,
                        colors: [],
                        positions: []
                    },
                    point: {
                        length: 0,
                        colors: [],
                        positions: [],
                        distances: []
                    },
                    spot: {
                        length: 0,
                        colors: [],
                        positions: [],
                        distances: [],
                        directions: [],
                        anglesCos: [],
                        exponents: []
                    },
                    hemi: {
                        length: 0,
                        skyColors: [],
                        groundColors: [],
                        positions: []
                    }
                };
            try {
                var _t = {
                    alpha: we,
                    depth: Me,
                    stencil: Se,
                    antialias: Te,
                    premultipliedAlpha: Ce,
                    preserveDrawingBuffer: Ee
                };
                if (ke = _e || xe.getContext("webgl", _t) || xe.getContext("experimental-webgl", _t), null === ke) throw null !== xe.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context."
            } catch (bt) {
                console.error(bt)
            }
            void 0 === ke.getShaderPrecisionFormat && (ke.getShaderPrecisionFormat = function() {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                }
            });
            var wt = new n.WebGLExtensions(ke);
            wt.get("OES_texture_float"), wt.get("OES_texture_float_linear"), wt.get("OES_standard_derivatives"), Ae && wt.get("EXT_frag_depth"), t(), this.context = ke;
            var Mt = ke.getParameter(ke.MAX_TEXTURE_IMAGE_UNITS),
                St = ke.getParameter(ke.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
                Tt = ke.getParameter(ke.MAX_TEXTURE_SIZE),
                Ct = ke.getParameter(ke.MAX_CUBE_MAP_TEXTURE_SIZE),
                Et = St > 0,
                At = Et && wt.get("OES_texture_float"),
                Lt = ke.getShaderPrecisionFormat(ke.VERTEX_SHADER, ke.HIGH_FLOAT),
                Pt = ke.getShaderPrecisionFormat(ke.VERTEX_SHADER, ke.MEDIUM_FLOAT),
                Rt = (ke.getShaderPrecisionFormat(ke.VERTEX_SHADER, ke.LOW_FLOAT), ke.getShaderPrecisionFormat(ke.FRAGMENT_SHADER, ke.HIGH_FLOAT)),
                Ft = ke.getShaderPrecisionFormat(ke.FRAGMENT_SHADER, ke.MEDIUM_FLOAT),
                Dt = (ke.getShaderPrecisionFormat(ke.FRAGMENT_SHADER, ke.LOW_FLOAT), function() {
                    var e;
                    return function() {
                        if (void 0 !== e) return e;
                        if (e = [], wt.get("WEBGL_compressed_texture_pvrtc") || wt.get("WEBGL_compressed_texture_s3tc"))
                            for (var t = ke.getParameter(ke.COMPRESSED_TEXTURE_FORMATS), r = 0; r < t.length; r++) e.push(t[r]);
                        return e
                    }
                }()),
                Ut = Lt.precision > 0 && Rt.precision > 0,
                zt = Pt.precision > 0 && Ft.precision > 0;
            "highp" !== be || Ut || (zt ? (be = "mediump", console.warn("THREE.WebGLRenderer: highp not supported, using mediump.")) : (be = "lowp", console.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp."))), "mediump" !== be || zt || (be = "lowp", console.warn("THREE.WebGLRenderer: mediump not supported, using lowp."));
            var Bt = new n.ShadowMapPlugin(this, Re, Fe, De),
                Vt = new n.SpritePlugin(this, Be),
                kt = new n.LensFlarePlugin(this, Ve);
            this.getContext = function() {
                return ke
            }, this.supportsVertexTextures = function() {
                return Et
            }, this.supportsFloatTextures = function() {
                return wt.get("OES_texture_float")
            }, this.supportsStandardDerivatives = function() {
                return wt.get("OES_standard_derivatives")
            }, this.supportsCompressedTextureS3TC = function() {
                return wt.get("WEBGL_compressed_texture_s3tc")
            }, this.supportsCompressedTexturePVRTC = function() {
                return wt.get("WEBGL_compressed_texture_pvrtc")
            }, this.supportsBlendMinMax = function() {
                return wt.get("EXT_blend_minmax")
            }, this.getMaxAnisotropy = function() {
                var e;
                return function() {
                    if (void 0 !== e) return e;
                    var t = wt.get("EXT_texture_filter_anisotropic");
                    return e = null !== t ? ke.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
                }
            }(), this.getPrecision = function() {
                return be
            }, this.setSize = function(e, t, r) {
                xe.width = e * this.devicePixelRatio, xe.height = t * this.devicePixelRatio, r !== !1 && (xe.style.width = e + "px", xe.style.height = t + "px"), this.setViewport(0, 0, e, t)
            }, this.setViewport = function(e, t, r, i) {
                ot = e * this.devicePixelRatio, at = t * this.devicePixelRatio, st = r * this.devicePixelRatio, ht = i * this.devicePixelRatio, ke.viewport(ot, at, st, ht)
            }, this.setScissor = function(e, t, r, i) {
                ke.scissor(e * this.devicePixelRatio, t * this.devicePixelRatio, r * this.devicePixelRatio, i * this.devicePixelRatio)
            }, this.enableScissorTest = function(e) {
                e ? ke.enable(ke.SCISSOR_TEST) : ke.disable(ke.SCISSOR_TEST)
            }, this.setClearColor = function(e, t) {
                Le.set(e), Pe = void 0 !== t ? t : 1, ke.clearColor(Le.r, Le.g, Le.b, Pe)
            }, this.setClearColorHex = function(e, t) {
                console.warn("THREE.WebGLRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead."), this.setClearColor(e, t)
            }, this.getClearColor = function() {
                return Le
            }, this.getClearAlpha = function() {
                return Pe
            }, this.clear = function(e, t, r) {
                var i = 0;
                (void 0 === e || e) && (i |= ke.COLOR_BUFFER_BIT), (void 0 === t || t) && (i |= ke.DEPTH_BUFFER_BIT), (void 0 === r || r) && (i |= ke.STENCIL_BUFFER_BIT), ke.clear(i)
            }, this.clearColor = function() {
                ke.clear(ke.COLOR_BUFFER_BIT)
            }, this.clearDepth = function() {
                ke.clear(ke.DEPTH_BUFFER_BIT)
            }, this.clearStencil = function() {
                ke.clear(ke.STENCIL_BUFFER_BIT)
            }, this.clearTarget = function(e, t, r, i) {
                this.setRenderTarget(e), this.clear(t, r, i)
            }, this.resetGLState = function() {
                Ie = null, je = null, Ke = -1, $e = -1, et = -1, qe = -1, Ye = -1, We = -1, He = -1, yt = !0
            };
            var Nt = function(e) {
                    var t = e.target;
                    t.traverse(function(e) {
                        e.removeEventListener("remove", Nt), k(e)
                    })
                },
                Ot = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", Ot), jt(t)
                },
                It = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", It), Xt(t), Ne.info.memory.textures--
                },
                Gt = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", Gt), qt(t), Ne.info.memory.textures--
                },
                Ht = function(e) {
                    var t = e.target;
                    t.removeEventListener("dispose", Ht), Yt(t)
                },
                Wt = function(e) {
                    for (var t = ["__webglVertexBuffer", "__webglNormalBuffer", "__webglTangentBuffer", "__webglColorBuffer", "__webglUVBuffer", "__webglUV2Buffer", "__webglSkinIndicesBuffer", "__webglSkinWeightsBuffer", "__webglFaceBuffer", "__webglLineBuffer", "__webglLineDistanceBuffer"], r = 0, i = t.length; i > r; r++) {
                        var n = t[r];
                        void 0 !== e[n] && (ke.deleteBuffer(e[n]), delete e[n])
                    }
                    if (void 0 !== e.__webglCustomAttributesList) {
                        for (var n in e.__webglCustomAttributesList) ke.deleteBuffer(e.__webglCustomAttributesList[n].buffer);
                        delete e.__webglCustomAttributesList
                    }
                    Ne.info.memory.geometries--
                },
                jt = function(e) {
                    if (delete e.__webglInit, e instanceof n.BufferGeometry) {
                        for (var t in e.attributes) {
                            var r = e.attributes[t];
                            void 0 !== r.buffer && (ke.deleteBuffer(r.buffer), delete r.buffer)
                        }
                        Ne.info.memory.geometries--
                    } else {
                        var i = Kt[e.id];
                        if (void 0 !== i) {
                            for (var o = 0, a = i.length; a > o; o++) {
                                var s = i[o];
                                if (void 0 !== s.numMorphTargets) {
                                    for (var h = 0, l = s.numMorphTargets; l > h; h++) ke.deleteBuffer(s.__webglMorphTargetsBuffers[h]);
                                    delete s.__webglMorphTargetsBuffers
                                }
                                if (void 0 !== s.numMorphNormals) {
                                    for (var h = 0, l = s.numMorphNormals; l > h; h++) ke.deleteBuffer(s.__webglMorphNormalsBuffers[h]);
                                    delete s.__webglMorphNormalsBuffers
                                }
                                Wt(s)
                            }
                            delete Kt[e.id]
                        } else Wt(e)
                    }
                    We = -1
                },
                Xt = function(e) {
                    if (e.image && e.image.__webglTextureCube) ke.deleteTexture(e.image.__webglTextureCube), delete e.image.__webglTextureCube;
                    else {
                        if (void 0 === e.__webglInit) return;
                        ke.deleteTexture(e.__webglTexture), delete e.__webglTexture, delete e.__webglInit
                    }
                },
                qt = function(e) {
                    if (e && void 0 !== e.__webglTexture) {
                        if (ke.deleteTexture(e.__webglTexture), delete e.__webglTexture, e instanceof n.WebGLRenderTargetCube)
                            for (var t = 0; 6 > t; t++) ke.deleteFramebuffer(e.__webglFramebuffer[t]), ke.deleteRenderbuffer(e.__webglRenderbuffer[t]);
                        else ke.deleteFramebuffer(e.__webglFramebuffer), ke.deleteRenderbuffer(e.__webglRenderbuffer);
                        delete e.__webglFramebuffer, delete e.__webglRenderbuffer
                    }
                },
                Yt = function(e) {
                    var t = e.program.program;
                    if (void 0 !== t) {
                        e.program = void 0;
                        var r, i, n, o = !1;
                        for (r = 0, i = Oe.length; i > r; r++)
                            if (n = Oe[r], n.program === t) {
                                n.usedTimes--, 0 === n.usedTimes && (o = !0);
                                break
                            }
                        if (o === !0) {
                            var a = [];
                            for (r = 0, i = Oe.length; i > r; r++) n = Oe[r], n.program !== t && a.push(n);
                            Oe = a, ke.deleteProgram(t), Ne.info.memory.programs--
                        }
                    }
                };
            this.renderBufferImmediate = function(e, t, r) {
                if (y(), e.hasPositions && !e.__webglVertexBuffer && (e.__webglVertexBuffer = ke.createBuffer()), e.hasNormals && !e.__webglNormalBuffer && (e.__webglNormalBuffer = ke.createBuffer()), e.hasUvs && !e.__webglUvBuffer && (e.__webglUvBuffer = ke.createBuffer()), e.hasColors && !e.__webglColorBuffer && (e.__webglColorBuffer = ke.createBuffer()), e.hasPositions && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglVertexBuffer), ke.bufferData(ke.ARRAY_BUFFER, e.positionArray, ke.DYNAMIC_DRAW), x(t.attributes.position), ke.vertexAttribPointer(t.attributes.position, 3, ke.FLOAT, !1, 0, 0)), e.hasNormals) {
                    if (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglNormalBuffer), r.shading === n.FlatShading) {
                        var i, o, a, s, h, l, c, u, f, p, d, m, v, g, b = 3 * e.count;
                        for (g = 0; b > g; g += 9) v = e.normalArray, s = v[g], c = v[g + 1], p = v[g + 2], h = v[g + 3], u = v[g + 4], d = v[g + 5], l = v[g + 6], f = v[g + 7], m = v[g + 8], i = (s + h + l) / 3, o = (c + u + f) / 3, a = (p + d + m) / 3, v[g] = i, v[g + 1] = o, v[g + 2] = a, v[g + 3] = i, v[g + 4] = o, v[g + 5] = a, v[g + 6] = i, v[g + 7] = o, v[g + 8] = a
                    }
                    ke.bufferData(ke.ARRAY_BUFFER, e.normalArray, ke.DYNAMIC_DRAW), x(t.attributes.normal), ke.vertexAttribPointer(t.attributes.normal, 3, ke.FLOAT, !1, 0, 0)
                }
                e.hasUvs && r.map && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglUvBuffer), ke.bufferData(ke.ARRAY_BUFFER, e.uvArray, ke.DYNAMIC_DRAW), x(t.attributes.uv), ke.vertexAttribPointer(t.attributes.uv, 2, ke.FLOAT, !1, 0, 0)), e.hasColors && r.vertexColors !== n.NoColors && (ke.bindBuffer(ke.ARRAY_BUFFER, e.__webglColorBuffer), ke.bufferData(ke.ARRAY_BUFFER, e.colorArray, ke.DYNAMIC_DRAW), x(t.attributes.color), ke.vertexAttribPointer(t.attributes.color, 3, ke.FLOAT, !1, 0, 0)), _(), ke.drawArrays(ke.TRIANGLES, 0, e.count), e.count = 0
            }, this.renderBufferDirect = function(e, t, r, i, o, a) {
                if (i.visible !== !1) {
                    var s = I(e, t, r, i, a),
                        h = !1,
                        l = i.wireframe ? 1 : 0,
                        c = 16777215 * o.id + 2 * s.id + l;
                    if (c !== We && (We = c, h = !0), h && y(), a instanceof n.Mesh) {
                        var u = i.wireframe === !0 ? ke.LINES : ke.TRIANGLES,
                            f = o.attributes.index;
                        if (f) {
                            var p, d;
                            f.array instanceof Uint32Array && wt.get("OES_element_index_uint") ? (p = ke.UNSIGNED_INT, d = 4) : (p = ke.UNSIGNED_SHORT, d = 2);
                            var m = o.offsets;
                            if (0 === m.length) h && (g(i, s, o, 0), ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, f.buffer)), ke.drawElements(u, f.array.length, p, 0), Ne.info.render.calls++, Ne.info.render.vertices += f.array.length, Ne.info.render.faces += f.array.length / 3;
                            else {
                                h = !0;
                                for (var v = 0, x = m.length; x > v; v++) {
                                    var _ = m[v].index;
                                    h && (g(i, s, o, _), ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, f.buffer)), ke.drawElements(u, m[v].count, p, m[v].start * d), Ne.info.render.calls++, Ne.info.render.vertices += m[v].count, Ne.info.render.faces += m[v].count / 3
                                }
                            }
                        } else {
                            h && g(i, s, o, 0);
                            var b = o.attributes.position;
                            ke.drawArrays(u, 0, b.array.length / 3), Ne.info.render.calls++, Ne.info.render.vertices += b.array.length / 3, Ne.info.render.faces += b.array.length / 9
                        }
                    } else if (a instanceof n.PointCloud) {
                        h && g(i, s, o, 0);
                        var b = o.attributes.position;
                        ke.drawArrays(ke.POINTS, 0, b.array.length / 3), Ne.info.render.calls++, Ne.info.render.points += b.array.length / 3
                    } else if (a instanceof n.Line) {
                        var u = a.mode === n.LineStrip ? ke.LINE_STRIP : ke.LINES;
                        oe(i.linewidth);
                        var f = o.attributes.index;
                        if (f) {
                            var p, d;
                            f.array instanceof Uint32Array ? (p = ke.UNSIGNED_INT, d = 4) : (p = ke.UNSIGNED_SHORT, d = 2);
                            var m = o.offsets;
                            if (0 === m.length) h && (g(i, s, o, 0), ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, f.buffer)), ke.drawElements(u, f.array.length, p, 0), Ne.info.render.calls++, Ne.info.render.vertices += f.array.length;
                            else {
                                m.length > 1 && (h = !0);
                                for (var v = 0, x = m.length; x > v; v++) {
                                    var _ = m[v].index;
                                    h && (g(i, s, o, _), ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, f.buffer)), ke.drawElements(u, m[v].count, p, m[v].start * d), Ne.info.render.calls++, Ne.info.render.vertices += m[v].count
                                }
                            }
                        } else {
                            h && g(i, s, o, 0);
                            var b = o.attributes.position;
                            ke.drawArrays(u, 0, b.array.length / 3), Ne.info.render.calls++, Ne.info.render.points += b.array.length / 3
                        }
                    }
                }
            }, this.renderBuffer = function(e, t, r, i, o, a) {
                if (i.visible !== !1) {
                    var s = I(e, t, r, i, a),
                        h = s.attributes,
                        l = !1,
                        c = i.wireframe ? 1 : 0,
                        u = 16777215 * o.id + 2 * s.id + c;
                    if (u !== We && (We = u, l = !0), l && y(), !i.morphTargets && h.position >= 0 ? l && (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglVertexBuffer), x(h.position), ke.vertexAttribPointer(h.position, 3, ke.FLOAT, !1, 0, 0)) : a.morphTargetBase && b(i, o, a), l) {
                        if (o.__webglCustomAttributesList)
                            for (var f = 0, p = o.__webglCustomAttributesList.length; p > f; f++) {
                                var d = o.__webglCustomAttributesList[f];
                                h[d.buffer.belongsToAttribute] >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, d.buffer), x(h[d.buffer.belongsToAttribute]), ke.vertexAttribPointer(h[d.buffer.belongsToAttribute], d.size, ke.FLOAT, !1, 0, 0))
                            }
                        h.color >= 0 && (a.geometry.colors.length > 0 || a.geometry.faces.length > 0 ? (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglColorBuffer), x(h.color), ke.vertexAttribPointer(h.color, 3, ke.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && ke.vertexAttrib3fv(h.color, i.defaultAttributeValues.color)), h.normal >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglNormalBuffer), x(h.normal), ke.vertexAttribPointer(h.normal, 3, ke.FLOAT, !1, 0, 0)), h.tangent >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglTangentBuffer), x(h.tangent), ke.vertexAttribPointer(h.tangent, 4, ke.FLOAT, !1, 0, 0)), h.uv >= 0 && (a.geometry.faceVertexUvs[0] ? (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglUVBuffer), x(h.uv), ke.vertexAttribPointer(h.uv, 2, ke.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && ke.vertexAttrib2fv(h.uv, i.defaultAttributeValues.uv)), h.uv2 >= 0 && (a.geometry.faceVertexUvs[1] ? (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglUV2Buffer), x(h.uv2), ke.vertexAttribPointer(h.uv2, 2, ke.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && ke.vertexAttrib2fv(h.uv2, i.defaultAttributeValues.uv2)), i.skinning && h.skinIndex >= 0 && h.skinWeight >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglSkinIndicesBuffer), x(h.skinIndex), ke.vertexAttribPointer(h.skinIndex, 4, ke.FLOAT, !1, 0, 0), ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglSkinWeightsBuffer), x(h.skinWeight), ke.vertexAttribPointer(h.skinWeight, 4, ke.FLOAT, !1, 0, 0)), h.lineDistance >= 0 && (ke.bindBuffer(ke.ARRAY_BUFFER, o.__webglLineDistanceBuffer), x(h.lineDistance), ke.vertexAttribPointer(h.lineDistance, 1, ke.FLOAT, !1, 0, 0))
                    }
                    if (_(), a instanceof n.Mesh) {
                        var m = o.__typeArray === Uint32Array ? ke.UNSIGNED_INT : ke.UNSIGNED_SHORT;
                        i.wireframe ? (oe(i.wireframeLinewidth), l && ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer), ke.drawElements(ke.LINES, o.__webglLineCount, m, 0)) : (l && ke.bindBuffer(ke.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer), ke.drawElements(ke.TRIANGLES, o.__webglFaceCount, m, 0)), Ne.info.render.calls++, Ne.info.render.vertices += o.__webglFaceCount, Ne.info.render.faces += o.__webglFaceCount / 3
                    } else if (a instanceof n.Line) {
                        var v = a.mode === n.LineStrip ? ke.LINE_STRIP : ke.LINES;
                        oe(i.linewidth), ke.drawArrays(v, 0, o.__webglLineCount), Ne.info.render.calls++
                    } else a instanceof n.PointCloud && (ke.drawArrays(ke.POINTS, 0, o.__webglParticleCount), Ne.info.render.calls++, Ne.info.render.points += o.__webglParticleCount)
                }
            }, this.render = function(e, t, r, i) {
                if (t instanceof n.Camera == !1) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                var o = e.fog;
                We = -1, He = -1, je = null, yt = !0, e.autoUpdate === !0 && e.updateMatrixWorld(), void 0 === t.parent && t.updateMatrixWorld(), e.traverse(function(e) {
                    e instanceof n.SkinnedMesh && e.skeleton.update()
                }), t.matrixWorldInverse.getInverse(t.matrixWorld), dt.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), pt.setFromMatrix(dt), Re.length = 0, Ue.length = 0, ze.length = 0, Be.length = 0, Ve.length = 0, T(e, e), Ne.sortObjects === !0 && (Ue.sort(w), ze.sort(M)), Bt.render(e, t), Ne.info.render.calls = 0, Ne.info.render.vertices = 0, Ne.info.render.faces = 0, Ne.info.render.points = 0, this.setRenderTarget(r), (this.autoClear || i) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
                for (var a = 0, s = De.length; s > a; a++) {
                    var h = De[a],
                        l = h.object;
                    l.visible && (te(l, t), A(h))
                }
                if (e.overrideMaterial) {
                    var c = e.overrideMaterial;
                    this.setBlending(c.blending, c.blendEquation, c.blendSrc, c.blendDst), this.setDepthTest(c.depthTest), this.setDepthWrite(c.depthWrite), ae(c.polygonOffset, c.polygonOffsetFactor, c.polygonOffsetUnits), C(Ue, t, Re, o, !0, c), C(ze, t, Re, o, !0, c), E(De, "", t, Re, o, !1, c)
                } else {
                    var c = null;
                    this.setBlending(n.NoBlending), C(Ue, t, Re, o, !1, c), E(De, "opaque", t, Re, o, !1, c), C(ze, t, Re, o, !0, c), E(De, "transparent", t, Re, o, !0, c)
                }
                Vt.render(e, t), kt.render(e, t, lt, ct), r && r.generateMipmaps && r.minFilter !== n.NearestFilter && r.minFilter !== n.LinearFilter && pe(r), this.setDepthTest(!0), this.setDepthWrite(!0)
            }, this.renderImmediateObject = function(e, t, r, i, n) {
                var o = I(e, t, r, i, n);
                We = -1, Ne.setMaterialFaces(i), n.immediateRenderCallback ? n.immediateRenderCallback(o, ke, pt) : n.render(function(e) {
                    Ne.renderBufferImmediate(e, o, i)
                })
            };
            var Kt = {},
                Zt = 0;
            this.setFaceCulling = function(e, t) {
                e === n.CullFaceNone ? ke.disable(ke.CULL_FACE) : (t === n.FrontFaceDirectionCW ? ke.frontFace(ke.CW) : ke.frontFace(ke.CCW), e === n.CullFaceBack ? ke.cullFace(ke.BACK) : e === n.CullFaceFront ? ke.cullFace(ke.FRONT) : ke.cullFace(ke.FRONT_AND_BACK), ke.enable(ke.CULL_FACE))
            }, this.setMaterialFaces = function(e) {
                var t = e.side === n.DoubleSide,
                    r = e.side === n.BackSide;
                qe !== t && (t ? ke.disable(ke.CULL_FACE) : ke.enable(ke.CULL_FACE), qe = t), Ye !== r && (r ? ke.frontFace(ke.CW) : ke.frontFace(ke.CCW), Ye = r)
            }, this.setDepthTest = function(e) {
                $e !== e && (e ? ke.enable(ke.DEPTH_TEST) : ke.disable(ke.DEPTH_TEST), $e = e)
            }, this.setDepthWrite = function(e) {
                et !== e && (ke.depthMask(e), et = e)
            }, this.setBlending = function(e, t, r, i) {
                e !== Ke && (e === n.NoBlending ? ke.disable(ke.BLEND) : e === n.AdditiveBlending ? (ke.enable(ke.BLEND), ke.blendEquation(ke.FUNC_ADD), ke.blendFunc(ke.SRC_ALPHA, ke.ONE)) : e === n.SubtractiveBlending ? (ke.enable(ke.BLEND), ke.blendEquation(ke.FUNC_ADD), ke.blendFunc(ke.ZERO, ke.ONE_MINUS_SRC_COLOR)) : e === n.MultiplyBlending ? (ke.enable(ke.BLEND), ke.blendEquation(ke.FUNC_ADD), ke.blendFunc(ke.ZERO, ke.SRC_COLOR)) : e === n.CustomBlending ? ke.enable(ke.BLEND) : (ke.enable(ke.BLEND), ke.blendEquationSeparate(ke.FUNC_ADD, ke.FUNC_ADD), ke.blendFuncSeparate(ke.SRC_ALPHA, ke.ONE_MINUS_SRC_ALPHA, ke.ONE, ke.ONE_MINUS_SRC_ALPHA)), Ke = e), e === n.CustomBlending ? (t !== Ze && (ke.blendEquation(me(t)), Ze = t), (r !== Qe || i !== Je) && (ke.blendFunc(me(r), me(i)), Qe = r, Je = i)) : (Ze = null, Qe = null, Je = null)
            }, this.uploadTexture = function(e) {
                void 0 === e.__webglInit && (e.__webglInit = !0, e.addEventListener("dispose", It), e.__webglTexture = ke.createTexture(), Ne.info.memory.textures++), ke.bindTexture(ke.TEXTURE_2D, e.__webglTexture), ke.pixelStorei(ke.UNPACK_FLIP_Y_WEBGL, e.flipY), ke.pixelStorei(ke.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), ke.pixelStorei(ke.UNPACK_ALIGNMENT, e.unpackAlignment), e.image = he(e.image, Tt);
                var t = e.image,
                    r = n.Math.isPowerOfTwo(t.width) && n.Math.isPowerOfTwo(t.height),
                    i = me(e.format),
                    o = me(e.type);
                se(ke.TEXTURE_2D, e, r);
                var a, s = e.mipmaps;
                if (e instanceof n.DataTexture)
                    if (s.length > 0 && r) {
                        for (var h = 0, l = s.length; l > h; h++) a = s[h], ke.texImage2D(ke.TEXTURE_2D, h, i, a.width, a.height, 0, i, o, a.data);
                        e.generateMipmaps = !1
                    } else ke.texImage2D(ke.TEXTURE_2D, 0, i, t.width, t.height, 0, i, o, t.data);
                else if (e instanceof n.CompressedTexture)
                    for (var h = 0, l = s.length; l > h; h++) a = s[h], e.format !== n.RGBAFormat && e.format !== n.RGBFormat ? Dt().indexOf(i) > -1 ? ke.compressedTexImage2D(ke.TEXTURE_2D, h, i, a.width, a.height, 0, a.data) : console.warn("Attempt to load unsupported compressed texture format") : ke.texImage2D(ke.TEXTURE_2D, h, i, a.width, a.height, 0, i, o, a.data);
                else if (s.length > 0 && r) {
                    for (var h = 0, l = s.length; l > h; h++) a = s[h], ke.texImage2D(ke.TEXTURE_2D, h, i, i, o, a);
                    e.generateMipmaps = !1
                } else ke.texImage2D(ke.TEXTURE_2D, 0, i, i, o, e.image);
                e.generateMipmaps && r && ke.generateMipmap(ke.TEXTURE_2D), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
            }, this.setTexture = function(e, t) {
                ke.activeTexture(ke.TEXTURE0 + t), e.needsUpdate ? Ne.uploadTexture(e) : ke.bindTexture(ke.TEXTURE_2D, e.__webglTexture)
            }, this.setRenderTarget = function(e) {
                var t = e instanceof n.WebGLRenderTargetCube;
                if (e && void 0 === e.__webglFramebuffer) {
                    void 0 === e.depthBuffer && (e.depthBuffer = !0), void 0 === e.stencilBuffer && (e.stencilBuffer = !0), e.addEventListener("dispose", Gt), e.__webglTexture = ke.createTexture(), Ne.info.memory.textures++;
                    var r = n.Math.isPowerOfTwo(e.width) && n.Math.isPowerOfTwo(e.height),
                        i = me(e.format),
                        o = me(e.type);
                    if (t) {
                        e.__webglFramebuffer = [], e.__webglRenderbuffer = [], ke.bindTexture(ke.TEXTURE_CUBE_MAP, e.__webglTexture), se(ke.TEXTURE_CUBE_MAP, e, r);
                        for (var a = 0; 6 > a; a++) e.__webglFramebuffer[a] = ke.createFramebuffer(), e.__webglRenderbuffer[a] = ke.createRenderbuffer(), ke.texImage2D(ke.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, i, e.width, e.height, 0, i, o, null), ue(e.__webglFramebuffer[a], e, ke.TEXTURE_CUBE_MAP_POSITIVE_X + a), fe(e.__webglRenderbuffer[a], e);
                        r && ke.generateMipmap(ke.TEXTURE_CUBE_MAP)
                    } else e.__webglFramebuffer = ke.createFramebuffer(), e.shareDepthFrom ? e.__webglRenderbuffer = e.shareDepthFrom.__webglRenderbuffer : e.__webglRenderbuffer = ke.createRenderbuffer(), ke.bindTexture(ke.TEXTURE_2D, e.__webglTexture), se(ke.TEXTURE_2D, e, r), ke.texImage2D(ke.TEXTURE_2D, 0, i, e.width, e.height, 0, i, o, null), ue(e.__webglFramebuffer, e, ke.TEXTURE_2D), e.shareDepthFrom ? e.depthBuffer && !e.stencilBuffer ? ke.framebufferRenderbuffer(ke.FRAMEBUFFER, ke.DEPTH_ATTACHMENT, ke.RENDERBUFFER, e.__webglRenderbuffer) : e.depthBuffer && e.stencilBuffer && ke.framebufferRenderbuffer(ke.FRAMEBUFFER, ke.DEPTH_STENCIL_ATTACHMENT, ke.RENDERBUFFER, e.__webglRenderbuffer) : fe(e.__webglRenderbuffer, e), r && ke.generateMipmap(ke.TEXTURE_2D);
                    t ? ke.bindTexture(ke.TEXTURE_CUBE_MAP, null) : ke.bindTexture(ke.TEXTURE_2D, null), ke.bindRenderbuffer(ke.RENDERBUFFER, null), ke.bindFramebuffer(ke.FRAMEBUFFER, null)
                }
                var s, h, l, c, u;
                e ? (s = t ? e.__webglFramebuffer[e.activeCubeFace] : e.__webglFramebuffer, h = e.width, l = e.height, c = 0, u = 0) : (s = null, h = st, l = ht, c = ot, u = at), s !== Ge && (ke.bindFramebuffer(ke.FRAMEBUFFER, s), ke.viewport(c, u, h, l), Ge = s), lt = h, ct = l
            }, this.initMaterial = function() {
                console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
            }, this.addPrePlugin = function() {
                console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
            }, this.addPostPlugin = function() {
                console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
            }, this.updateShadowMap = function() {
                console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
            }
        }, n.WebGLRenderTarget = function(e, t, r) {
            this.width = e, this.height = t, r = r || {}, this.wrapS = void 0 !== r.wrapS ? r.wrapS : n.ClampToEdgeWrapping, this.wrapT = void 0 !== r.wrapT ? r.wrapT : n.ClampToEdgeWrapping, this.magFilter = void 0 !== r.magFilter ? r.magFilter : n.LinearFilter, this.minFilter = void 0 !== r.minFilter ? r.minFilter : n.LinearMipMapLinearFilter, this.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1, this.offset = new n.Vector2(0, 0), this.repeat = new n.Vector2(1, 1), this.format = void 0 !== r.format ? r.format : n.RGBAFormat, this.type = void 0 !== r.type ? r.type : n.UnsignedByteType, this.depthBuffer = void 0 !== r.depthBuffer ? r.depthBuffer : !0,
                this.stencilBuffer = void 0 !== r.stencilBuffer ? r.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = null
        }, n.WebGLRenderTarget.prototype = {
            constructor: n.WebGLRenderTarget,
            setSize: function(e, t) {
                this.width = e, this.height = t
            },
            clone: function() {
                var e = new n.WebGLRenderTarget(this.width, this.height);
                return e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.format = this.format, e.type = this.type, e.depthBuffer = this.depthBuffer, e.stencilBuffer = this.stencilBuffer, e.generateMipmaps = this.generateMipmaps, e.shareDepthFrom = this.shareDepthFrom, e
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, n.EventDispatcher.prototype.apply(n.WebGLRenderTarget.prototype), n.WebGLRenderTargetCube = function(e, t, r) {
            n.WebGLRenderTarget.call(this, e, t, r), this.activeCubeFace = 0
        }, n.WebGLRenderTargetCube.prototype = Object.create(n.WebGLRenderTarget.prototype), n.WebGLExtensions = function(e) {
            var t = {};
            this.get = function(r) {
                if (void 0 !== t[r]) return t[r];
                var i;
                switch (r) {
                    case "OES_texture_float":
                        i = e.getExtension("OES_texture_float");
                        break;
                    case "OES_texture_float_linear":
                        i = e.getExtension("OES_texture_float_linear");
                        break;
                    case "OES_standard_derivatives":
                        i = e.getExtension("OES_standard_derivatives");
                        break;
                    case "EXT_texture_filter_anisotropic":
                        i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                        break;
                    case "WEBGL_compressed_texture_s3tc":
                        i = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                        break;
                    case "WEBGL_compressed_texture_pvrtc":
                        i = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                        break;
                    case "OES_element_index_uint":
                        i = e.getExtension("OES_element_index_uint");
                        break;
                    case "EXT_blend_minmax":
                        i = e.getExtension("EXT_blend_minmax");
                        break;
                    case "EXT_frag_depth":
                        i = e.getExtension("EXT_frag_depth")
                }
                return null === i && console.log("THREE.WebGLRenderer: " + r + " extension not supported."), t[r] = i, i
            }
        }, n.WebGLProgram = function() {
            var e = 0,
                t = function(e) {
                    var t, r, i = [];
                    for (var n in e) t = e[n], t !== !1 && (r = "#define " + n + " " + t, i.push(r));
                    return i.join("\n")
                },
                r = function(e, t, r) {
                    for (var i = {}, n = 0, o = r.length; o > n; n++) {
                        var a = r[n];
                        i[a] = e.getUniformLocation(t, a)
                    }
                    return i
                },
                i = function(e, t, r) {
                    for (var i = {}, n = 0, o = r.length; o > n; n++) {
                        var a = r[n];
                        i[a] = e.getAttribLocation(t, a)
                    }
                    return i
                };
            return function(o, a, s, h) {
                var l = o,
                    c = l.context,
                    u = s.defines,
                    f = s.__webglShader.uniforms,
                    p = s.attributes,
                    d = s.__webglShader.vertexShader,
                    m = s.__webglShader.fragmentShader,
                    v = s.index0AttributeName;
                void 0 === v && h.morphTargets === !0 && (v = "position");
                var g = "SHADOWMAP_TYPE_BASIC";
                h.shadowMapType === n.PCFShadowMap ? g = "SHADOWMAP_TYPE_PCF" : h.shadowMapType === n.PCFSoftShadowMap && (g = "SHADOWMAP_TYPE_PCF_SOFT");
                var y, x, _ = t(u),
                    b = c.createProgram();
                s instanceof n.RawShaderMaterial ? (y = "", x = "") : (y = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", _, h.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, "#define MAX_BONES " + h.maxBones, h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.skinning ? "#define USE_SKINNING" : "", h.useVertexTexture ? "#define BONE_TEXTURE" : "", h.morphTargets ? "#define USE_MORPHTARGETS" : "", h.morphNormals ? "#define USE_MORPHNORMALS" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + g : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "    attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "  attribute vec3 morphTarget0;", "    attribute vec3 morphTarget1;", "    attribute vec3 morphTarget2;", "    attribute vec3 morphTarget3;", "    #ifdef USE_MORPHNORMALS", "     attribute vec3 morphNormal0;", "        attribute vec3 morphNormal1;", "        attribute vec3 morphNormal2;", "        attribute vec3 morphNormal3;", "    #else", "       attribute vec3 morphTarget4;", "        attribute vec3 morphTarget5;", "        attribute vec3 morphTarget6;", "        attribute vec3 morphTarget7;", "    #endif", "#endif", "#ifdef USE_SKINNING", " attribute vec4 skinIndex;", "   attribute vec4 skinWeight;", "#endif", ""].join("\n"), x = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", h.bumpMap || h.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", _, "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, h.alphaTest ? "#define ALPHATEST " + h.alphaTest : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", h.useFog && h.fog ? "#define USE_FOG" : "", h.useFog && h.fogExp ? "#define FOG_EXP2" : "", h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.metal ? "#define METAL" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + g : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n"));
                var w = new n.WebGLShader(c, c.VERTEX_SHADER, y + d),
                    M = new n.WebGLShader(c, c.FRAGMENT_SHADER, x + m);
                c.attachShader(b, w), c.attachShader(b, M), void 0 !== v && c.bindAttribLocation(b, 0, v), c.linkProgram(b), c.getProgramParameter(b, c.LINK_STATUS) === !1 && (console.error("THREE.WebGLProgram: Could not initialise shader."), console.error("gl.VALIDATE_STATUS", c.getProgramParameter(b, c.VALIDATE_STATUS)), console.error("gl.getError()", c.getError())), "" !== c.getProgramInfoLog(b) && console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", c.getProgramInfoLog(b)), c.deleteShader(w), c.deleteShader(M);
                var S = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "cameraPosition", "morphTargetInfluences", "bindMatrix", "bindMatrixInverse"];
                h.useVertexTexture ? (S.push("boneTexture"), S.push("boneTextureWidth"), S.push("boneTextureHeight")) : S.push("boneGlobalMatrices"), h.logarithmicDepthBuffer && S.push("logDepthBufFC");
                for (var T in f) S.push(T);
                this.uniforms = r(c, b, S), S = ["position", "normal", "uv", "uv2", "tangent", "color", "skinIndex", "skinWeight", "lineDistance"];
                for (var C = 0; C < h.maxMorphTargets; C++) S.push("morphTarget" + C);
                for (var C = 0; C < h.maxMorphNormals; C++) S.push("morphNormal" + C);
                for (var E in p) S.push(E);
                return this.attributes = i(c, b, S), this.attributesKeys = Object.keys(this.attributes), this.id = e++, this.code = a, this.usedTimes = 1, this.program = b, this.vertexShader = w, this.fragmentShader = M, this
            }
        }(), n.WebGLShader = function() {
            var e = function(e) {
                for (var t = e.split("\n"), r = 0; r < t.length; r++) t[r] = r + 1 + ": " + t[r];
                return t.join("\n")
            };
            return function(t, r, i) {
                var n = t.createShader(r);
                return t.shaderSource(n, i), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) === !1 && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(n) && (console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", t.getShaderInfoLog(n)), console.warn(e(i))), n
            }
        }(), n.LensFlarePlugin = function(e, t) {
            function r(t) {
                var r = f.createProgram(),
                    i = f.createShader(f.FRAGMENT_SHADER),
                    n = f.createShader(f.VERTEX_SHADER),
                    o = "precision " + e.getPrecision() + " float;\n";
                return f.shaderSource(i, o + t.fragmentShader), f.shaderSource(n, o + t.vertexShader), f.compileShader(i), f.compileShader(n), f.attachShader(r, i), f.attachShader(r, n), f.linkProgram(r), r
            }
            var i, o, a, s, h, l, c, u, f = e.context,
                p = function() {
                    var e = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                        t = new Uint16Array([0, 1, 2, 0, 2, 3]);
                    i = f.createBuffer(), o = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, i), f.bufferData(f.ARRAY_BUFFER, e, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), f.bufferData(f.ELEMENT_ARRAY_BUFFER, t, f.STATIC_DRAW), c = f.createTexture(), u = f.createTexture(), f.bindTexture(f.TEXTURE_2D, c), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 16, 16, 0, f.RGB, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), f.bindTexture(f.TEXTURE_2D, u), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, 16, 16, 0, f.RGBA, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), l = f.getParameter(f.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
                    var n;
                    n = l ? {
                        vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                        fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                    } : {
                        vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                        fragmentShader: ["precision mediump float;", "uniform lowp int renderType;", "uniform sampler2D map;", "uniform sampler2D occlusionMap;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;", "visibility = ( 1.0 - visibility / 4.0 );", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * visibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                    }, a = r(n), s = {
                        vertex: f.getAttribLocation(a, "position"),
                        uv: f.getAttribLocation(a, "uv")
                    }, h = {
                        renderType: f.getUniformLocation(a, "renderType"),
                        map: f.getUniformLocation(a, "map"),
                        occlusionMap: f.getUniformLocation(a, "occlusionMap"),
                        opacity: f.getUniformLocation(a, "opacity"),
                        color: f.getUniformLocation(a, "color"),
                        scale: f.getUniformLocation(a, "scale"),
                        rotation: f.getUniformLocation(a, "rotation"),
                        screenPosition: f.getUniformLocation(a, "screenPosition")
                    }
                };
            this.render = function(r, d, m, v) {
                if (0 !== t.length) {
                    var g = new n.Vector3,
                        y = v / m,
                        x = .5 * m,
                        _ = .5 * v,
                        b = 16 / v,
                        w = new n.Vector2(b * y, b),
                        M = new n.Vector3(1, 1, 0),
                        S = new n.Vector2(1, 1);
                    void 0 === a && p(), f.useProgram(a), f.enableVertexAttribArray(s.vertex), f.enableVertexAttribArray(s.uv), f.uniform1i(h.occlusionMap, 0), f.uniform1i(h.map, 1), f.bindBuffer(f.ARRAY_BUFFER, i), f.vertexAttribPointer(s.vertex, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(s.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), f.disable(f.CULL_FACE), f.depthMask(!1);
                    for (var T = 0, C = t.length; C > T; T++) {
                        b = 16 / v, w.set(b * y, b);
                        var E = t[T];
                        if (g.set(E.matrixWorld.elements[12], E.matrixWorld.elements[13], E.matrixWorld.elements[14]), g.applyMatrix4(d.matrixWorldInverse), g.applyProjection(d.projectionMatrix), M.copy(g), S.x = M.x * x + x, S.y = M.y * _ + _, l || S.x > 0 && S.x < m && S.y > 0 && S.y < v) {
                            f.activeTexture(f.TEXTURE1), f.bindTexture(f.TEXTURE_2D, c), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGB, S.x - 8, S.y - 8, 16, 16, 0), f.uniform1i(h.renderType, 0), f.uniform2f(h.scale, w.x, w.y), f.uniform3f(h.screenPosition, M.x, M.y, M.z), f.disable(f.BLEND), f.enable(f.DEPTH_TEST), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, u), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGBA, S.x - 8, S.y - 8, 16, 16, 0), f.uniform1i(h.renderType, 1), f.disable(f.DEPTH_TEST), f.activeTexture(f.TEXTURE1), f.bindTexture(f.TEXTURE_2D, c), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), E.positionScreen.copy(M), E.customUpdateCallback ? E.customUpdateCallback(E) : E.updateLensFlares(), f.uniform1i(h.renderType, 2), f.enable(f.BLEND);
                            for (var A = 0, L = E.lensFlares.length; L > A; A++) {
                                var P = E.lensFlares[A];
                                P.opacity > .001 && P.scale > .001 && (M.x = P.x, M.y = P.y, M.z = P.z, b = P.size * P.scale / v, w.x = b * y, w.y = b, f.uniform3f(h.screenPosition, M.x, M.y, M.z), f.uniform2f(h.scale, w.x, w.y), f.uniform1f(h.rotation, P.rotation), f.uniform1f(h.opacity, P.opacity), f.uniform3f(h.color, P.color.r, P.color.g, P.color.b), e.setBlending(P.blending, P.blendEquation, P.blendSrc, P.blendDst), e.setTexture(P.texture, 1), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0))
                            }
                        }
                    }
                    f.enable(f.CULL_FACE), f.enable(f.DEPTH_TEST), f.depthMask(!0), e.resetGLState()
                }
            }
        }, n.ShadowMapPlugin = function(e, t, r, i) {
            function o(e, t, i) {
                if (t.visible) {
                    var n = r[t.id];
                    if (n && t.castShadow && (t.frustumCulled === !1 || m.intersectsObject(t) === !0))
                        for (var a = 0, s = n.length; s > a; a++) {
                            var h = n[a];
                            t._modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, t.matrixWorld), _.push(h)
                        }
                    for (var a = 0, s = t.children.length; s > a; a++) o(e, t.children[a], i)
                }
            }
            function a(e, t) {
                var r = new n.DirectionalLight;
                r.isVirtual = !0, r.onlyShadow = !0, r.castShadow = !0, r.shadowCameraNear = e.shadowCameraNear, r.shadowCameraFar = e.shadowCameraFar, r.shadowCameraLeft = e.shadowCameraLeft, r.shadowCameraRight = e.shadowCameraRight, r.shadowCameraBottom = e.shadowCameraBottom, r.shadowCameraTop = e.shadowCameraTop, r.shadowCameraVisible = e.shadowCameraVisible, r.shadowDarkness = e.shadowDarkness, r.shadowBias = e.shadowCascadeBias[t], r.shadowMapWidth = e.shadowCascadeWidth[t], r.shadowMapHeight = e.shadowCascadeHeight[t], r.pointsWorld = [], r.pointsFrustum = [];
                for (var i = r.pointsWorld, o = r.pointsFrustum, a = 0; 8 > a; a++) i[a] = new n.Vector3, o[a] = new n.Vector3;
                var s = e.shadowCascadeNearZ[t],
                    h = e.shadowCascadeFarZ[t];
                return o[0].set(-1, -1, s), o[1].set(1, -1, s), o[2].set(-1, 1, s), o[3].set(1, 1, s), o[4].set(-1, -1, h), o[5].set(1, -1, h), o[6].set(-1, 1, h), o[7].set(1, 1, h), r
            }
            function s(e, t) {
                var r = e.shadowCascadeArray[t];
                r.position.copy(e.position), r.target.position.copy(e.target.position), r.lookAt(r.target), r.shadowCameraVisible = e.shadowCameraVisible, r.shadowDarkness = e.shadowDarkness, r.shadowBias = e.shadowCascadeBias[t];
                var i = e.shadowCascadeNearZ[t],
                    n = e.shadowCascadeFarZ[t],
                    o = r.pointsFrustum;
                o[0].z = i, o[1].z = i, o[2].z = i, o[3].z = i, o[4].z = n, o[5].z = n, o[6].z = n, o[7].z = n
            }
            function h(e, t) {
                var r = t.shadowCamera,
                    i = t.pointsFrustum,
                    n = t.pointsWorld;
                g.set(1 / 0, 1 / 0, 1 / 0), y.set(-(1 / 0), -(1 / 0), -(1 / 0));
                for (var o = 0; 8 > o; o++) {
                    var a = n[o];
                    a.copy(i[o]), a.unproject(e), a.applyMatrix4(r.matrixWorldInverse), a.x < g.x && (g.x = a.x), a.x > y.x && (y.x = a.x), a.y < g.y && (g.y = a.y), a.y > y.y && (y.y = a.y), a.z < g.z && (g.z = a.z), a.z > y.z && (y.z = a.z)
                }
                r.left = g.x, r.right = y.x, r.top = y.y, r.bottom = g.y, r.updateProjectionMatrix()
            }
            function l(e) {
                return e.material instanceof n.MeshFaceMaterial ? e.material.materials[0] : e.material
            }
            var c, u, f, p, d = e.context,
                m = new n.Frustum,
                v = new n.Matrix4,
                g = new n.Vector3,
                y = new n.Vector3,
                x = new n.Vector3,
                _ = [],
                b = n.ShaderLib.depthRGBA,
                w = n.UniformsUtils.clone(b.uniforms);
            c = new n.ShaderMaterial({
                uniforms: w,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader
            }), u = new n.ShaderMaterial({
                uniforms: w,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader,
                morphTargets: !0
            }), f = new n.ShaderMaterial({
                uniforms: w,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader,
                skinning: !0
            }), p = new n.ShaderMaterial({
                uniforms: w,
                vertexShader: b.vertexShader,
                fragmentShader: b.fragmentShader,
                morphTargets: !0,
                skinning: !0
            }), c._shadowPass = !0, u._shadowPass = !0, f._shadowPass = !0, p._shadowPass = !0, this.render = function(r, g) {
                if (e.shadowMapEnabled !== !1) {
                    var y, b, w, M, S, T, C, E, A, L, P, R, F, D = [],
                        U = 0,
                        z = null;
                    for (d.clearColor(1, 1, 1, 1), d.disable(d.BLEND), d.enable(d.CULL_FACE), d.frontFace(d.CCW), e.shadowMapCullFace === n.CullFaceFront ? d.cullFace(d.FRONT) : d.cullFace(d.BACK), e.setDepthTest(!0), y = 0, b = t.length; b > y; y++)
                        if (F = t[y], F.castShadow)
                            if (F instanceof n.DirectionalLight && F.shadowCascade)
                                for (S = 0; S < F.shadowCascadeCount; S++) {
                                    var B;
                                    if (F.shadowCascadeArray[S]) B = F.shadowCascadeArray[S];
                                    else {
                                        B = a(F, S), B.originalCamera = g;
                                        var V = new n.Gyroscope;
                                        V.position.copy(F.shadowCascadeOffset), V.add(B), V.add(B.target), g.add(V), F.shadowCascadeArray[S] = B, console.log("Created virtualLight", B)
                                    }
                                    s(F, S), D[U] = B, U++
                                } else D[U] = F, U++;
                    for (y = 0, b = D.length; b > y; y++) {
                        if (F = D[y], !F.shadowMap) {
                            var k = n.LinearFilter;
                            e.shadowMapType === n.PCFSoftShadowMap && (k = n.NearestFilter);
                            var N = {
                                minFilter: k,
                                magFilter: k,
                                format: n.RGBAFormat
                            };
                            F.shadowMap = new n.WebGLRenderTarget(F.shadowMapWidth, F.shadowMapHeight, N), F.shadowMapSize = new n.Vector2(F.shadowMapWidth, F.shadowMapHeight), F.shadowMatrix = new n.Matrix4
                        }
                        if (!F.shadowCamera) {
                            if (F instanceof n.SpotLight) F.shadowCamera = new n.PerspectiveCamera(F.shadowCameraFov, F.shadowMapWidth / F.shadowMapHeight, F.shadowCameraNear, F.shadowCameraFar);
                            else {
                                if (!(F instanceof n.DirectionalLight)) {
                                    console.error("Unsupported light type for shadow");
                                    continue
                                }
                                F.shadowCamera = new n.OrthographicCamera(F.shadowCameraLeft, F.shadowCameraRight, F.shadowCameraTop, F.shadowCameraBottom, F.shadowCameraNear, F.shadowCameraFar)
                            }
                            r.add(F.shadowCamera), r.autoUpdate === !0 && r.updateMatrixWorld()
                        }
                        F.shadowCameraVisible && !F.cameraHelper && (F.cameraHelper = new n.CameraHelper(F.shadowCamera), r.add(F.cameraHelper)), F.isVirtual && B.originalCamera == g && h(g, F), T = F.shadowMap, C = F.shadowMatrix, E = F.shadowCamera, E.position.setFromMatrixPosition(F.matrixWorld), x.setFromMatrixPosition(F.target.matrixWorld), E.lookAt(x), E.updateMatrixWorld(), E.matrixWorldInverse.getInverse(E.matrixWorld), F.cameraHelper && (F.cameraHelper.visible = F.shadowCameraVisible), F.shadowCameraVisible && F.cameraHelper.update(), C.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), C.multiply(E.projectionMatrix), C.multiply(E.matrixWorldInverse), v.multiplyMatrices(E.projectionMatrix, E.matrixWorldInverse), m.setFromMatrix(v), e.setRenderTarget(T), e.clear(), _.length = 0, o(r, r, E);
                        var O, I, G;
                        for (w = 0, M = _.length; M > w; w++) P = _[w], R = P.object, A = P.buffer, O = l(R), I = void 0 !== R.geometry.morphTargets && R.geometry.morphTargets.length > 0 && O.morphTargets, G = R instanceof n.SkinnedMesh && O.skinning, L = R.customDepthMaterial ? R.customDepthMaterial : G ? I ? p : f : I ? u : c, e.setMaterialFaces(O), A instanceof n.BufferGeometry ? e.renderBufferDirect(E, t, z, L, A, R) : e.renderBuffer(E, t, z, L, A, R);
                        for (w = 0, M = i.length; M > w; w++) P = i[w], R = P.object, R.visible && R.castShadow && (R._modelViewMatrix.multiplyMatrices(E.matrixWorldInverse, R.matrixWorld), e.renderImmediateObject(E, t, z, c, R))
                    }
                    var H = e.getClearColor(),
                        W = e.getClearAlpha();
                    d.clearColor(H.r, H.g, H.b, W), d.enable(d.BLEND), e.shadowMapCullFace === n.CullFaceFront && d.cullFace(d.BACK), e.resetGLState()
                }
            }
        }, n.SpritePlugin = function(e, t) {
            function r() {
                var t = u.createProgram(),
                    r = u.createShader(u.VERTEX_SHADER),
                    i = u.createShader(u.FRAGMENT_SHADER);
                return u.shaderSource(r, ["precision " + e.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n")), u.shaderSource(i, ["precision " + e.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")), u.compileShader(r), u.compileShader(i), u.attachShader(t, r), u.attachShader(t, i), u.linkProgram(t), t
            }
            function i(e, t) {
                return e.z !== t.z ? t.z - e.z : t.id - e.id
            }
            var o, a, s, h, l, c, u = e.context,
                f = function() {
                    var e = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                        t = new Uint16Array([0, 1, 2, 0, 2, 3]);
                    o = u.createBuffer(), a = u.createBuffer(), u.bindBuffer(u.ARRAY_BUFFER, o), u.bufferData(u.ARRAY_BUFFER, e, u.STATIC_DRAW), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, a), u.bufferData(u.ELEMENT_ARRAY_BUFFER, t, u.STATIC_DRAW), s = r(), h = {
                        position: u.getAttribLocation(s, "position"),
                        uv: u.getAttribLocation(s, "uv")
                    }, l = {
                        uvOffset: u.getUniformLocation(s, "uvOffset"),
                        uvScale: u.getUniformLocation(s, "uvScale"),
                        rotation: u.getUniformLocation(s, "rotation"),
                        scale: u.getUniformLocation(s, "scale"),
                        color: u.getUniformLocation(s, "color"),
                        map: u.getUniformLocation(s, "map"),
                        opacity: u.getUniformLocation(s, "opacity"),
                        modelViewMatrix: u.getUniformLocation(s, "modelViewMatrix"),
                        projectionMatrix: u.getUniformLocation(s, "projectionMatrix"),
                        fogType: u.getUniformLocation(s, "fogType"),
                        fogDensity: u.getUniformLocation(s, "fogDensity"),
                        fogNear: u.getUniformLocation(s, "fogNear"),
                        fogFar: u.getUniformLocation(s, "fogFar"),
                        fogColor: u.getUniformLocation(s, "fogColor"),
                        alphaTest: u.getUniformLocation(s, "alphaTest")
                    };
                    var i = document.createElement("canvas");
                    i.width = 8, i.height = 8;
                    var f = i.getContext("2d");
                    f.fillStyle = "white", f.fillRect(0, 0, 8, 8), c = new n.Texture(i), c.needsUpdate = !0
                };
            this.render = function(r, p) {
                if (0 !== t.length) {
                    void 0 === s && f(), u.useProgram(s), u.enableVertexAttribArray(h.position), u.enableVertexAttribArray(h.uv), u.disable(u.CULL_FACE), u.enable(u.BLEND), u.bindBuffer(u.ARRAY_BUFFER, o), u.vertexAttribPointer(h.position, 2, u.FLOAT, !1, 16, 0), u.vertexAttribPointer(h.uv, 2, u.FLOAT, !1, 16, 8), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, a), u.uniformMatrix4fv(l.projectionMatrix, !1, p.projectionMatrix.elements), u.activeTexture(u.TEXTURE0), u.uniform1i(l.map, 0);
                    var d = 0,
                        m = 0,
                        v = r.fog;
                    v ? (u.uniform3f(l.fogColor, v.color.r, v.color.g, v.color.b), v instanceof n.Fog ? (u.uniform1f(l.fogNear, v.near), u.uniform1f(l.fogFar, v.far), u.uniform1i(l.fogType, 1), d = 1, m = 1) : v instanceof n.FogExp2 && (u.uniform1f(l.fogDensity, v.density), u.uniform1i(l.fogType, 2), d = 2, m = 2)) : (u.uniform1i(l.fogType, 0), d = 0, m = 0);
                    for (var g = 0, y = t.length; y > g; g++) {
                        var x = t[g];
                        x._modelViewMatrix.multiplyMatrices(p.matrixWorldInverse, x.matrixWorld), null === x.renderDepth ? x.z = -x._modelViewMatrix.elements[14] : x.z = x.renderDepth
                    }
                    t.sort(i);
                    for (var _ = [], g = 0, y = t.length; y > g; g++) {
                        var x = t[g],
                            b = x.material;
                        u.uniform1f(l.alphaTest, b.alphaTest), u.uniformMatrix4fv(l.modelViewMatrix, !1, x._modelViewMatrix.elements), _[0] = x.scale.x, _[1] = x.scale.y;
                        var w = 0;
                        r.fog && b.fog && (w = m), d !== w && (u.uniform1i(l.fogType, w), d = w), null !== b.map ? (u.uniform2f(l.uvOffset, b.map.offset.x, b.map.offset.y), u.uniform2f(l.uvScale, b.map.repeat.x, b.map.repeat.y)) : (u.uniform2f(l.uvOffset, 0, 0), u.uniform2f(l.uvScale, 1, 1)), u.uniform1f(l.opacity, b.opacity), u.uniform3f(l.color, b.color.r, b.color.g, b.color.b), u.uniform1f(l.rotation, b.rotation), u.uniform2fv(l.scale, _), e.setBlending(b.blending, b.blendEquation, b.blendSrc, b.blendDst), e.setDepthTest(b.depthTest), e.setDepthWrite(b.depthWrite), b.map && b.map.image && b.map.image.width ? e.setTexture(b.map, 0) : e.setTexture(c, 0), u.drawElements(u.TRIANGLES, 6, u.UNSIGNED_SHORT, 0)
                    }
                    u.enable(u.CULL_FACE), e.resetGLState()
                }
            }
        }, n.GeometryUtils = {
            merge: function(e, t, r) {
                console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
                var i;
                t instanceof n.Mesh && (t.matrixAutoUpdate && t.updateMatrix(), i = t.matrix, t = t.geometry), e.merge(t, i, r)
            },
            center: function(e) {
                return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), e.center()
            }
        }, n.ImageUtils = {
            crossOrigin: void 0,
            loadTexture: function(e, t, r, i) {
                var o = new n.ImageLoader;
                o.crossOrigin = this.crossOrigin;
                var a = new n.Texture(void 0, t);
                return o.load(e, function(e) {
                    a.image = e, a.needsUpdate = !0, r && r(a)
                }, void 0, function(e) {
                    i && i(e)
                }), a.sourceFile = e, a
            },
            loadTextureCube: function(e, t, r, i) {
                var o = [],
                    a = new n.ImageLoader;
                a.crossOrigin = this.crossOrigin;
                var s = new n.CubeTexture(o, t);
                s.flipY = !1;
                for (var h = 0, l = function(t) {
                    a.load(e[t], function(e) {
                        s.images[t] = e, h += 1, 6 === h && (s.needsUpdate = !0, r && r(s))
                    })
                }, c = 0, u = e.length; u > c; ++c) l(c);
                return s
            },
            loadCompressedTexture: function() {
                console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
            },
            loadCompressedTextureCube: function() {
                console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
            },
            getNormalMap: function(e, t) {
                var r = function(e, t) {
                        return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]]
                    },
                    i = function(e, t) {
                        return [e[0] - t[0], e[1] - t[1], e[2] - t[2]]
                    },
                    n = function(e) {
                        var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
                        return [e[0] / t, e[1] / t, e[2] / t]
                    };
                t = 1 | t;
                var o = e.width,
                    a = e.height,
                    s = document.createElement("canvas");
                s.width = o, s.height = a;
                var h = s.getContext("2d");
                h.drawImage(e, 0, 0);
                for (var l = h.getImageData(0, 0, o, a).data, c = h.createImageData(o, a), u = c.data, f = 0; o > f; f++)
                    for (var p = 0; a > p; p++) {
                        var d = 0 > p - 1 ? 0 : p - 1,
                            m = p + 1 > a - 1 ? a - 1 : p + 1,
                            v = 0 > f - 1 ? 0 : f - 1,
                            g = f + 1 > o - 1 ? o - 1 : f + 1,
                            y = [],
                            x = [0, 0, l[4 * (p * o + f)] / 255 * t];
                        y.push([-1, 0, l[4 * (p * o + v)] / 255 * t]), y.push([-1, -1, l[4 * (d * o + v)] / 255 * t]), y.push([0, -1, l[4 * (d * o + f)] / 255 * t]), y.push([1, -1, l[4 * (d * o + g)] / 255 * t]), y.push([1, 0, l[4 * (p * o + g)] / 255 * t]), y.push([1, 1, l[4 * (m * o + g)] / 255 * t]), y.push([0, 1, l[4 * (m * o + f)] / 255 * t]), y.push([-1, 1, l[4 * (m * o + v)] / 255 * t]);
                        for (var _ = [], b = y.length, w = 0; b > w; w++) {
                            var M = y[w],
                                S = y[(w + 1) % b];
                            M = i(M, x), S = i(S, x), _.push(n(r(M, S)))
                        }
                        for (var T = [0, 0, 0], w = 0; w < _.length; w++) T[0] += _[w][0], T[1] += _[w][1], T[2] += _[w][2];
                        T[0] /= _.length, T[1] /= _.length, T[2] /= _.length;
                        var C = 4 * (p * o + f);
                        u[C] = (T[0] + 1) / 2 * 255 | 0, u[C + 1] = (T[1] + 1) / 2 * 255 | 0, u[C + 2] = 255 * T[2] | 0, u[C + 3] = 255
                    }
                return h.putImageData(c, 0, 0), s
            },
            generateDataTexture: function(e, t, r) {
                for (var i = e * t, o = new Uint8Array(3 * i), a = Math.floor(255 * r.r), s = Math.floor(255 * r.g), h = Math.floor(255 * r.b), l = 0; i > l; l++) o[3 * l] = a, o[3 * l + 1] = s, o[3 * l + 2] = h;
                var c = new n.DataTexture(o, e, t, n.RGBFormat);
                return c.needsUpdate = !0, c
            }
        }, n.SceneUtils = {
            createMultiMaterialObject: function(e, t) {
                for (var r = new n.Object3D, i = 0, o = t.length; o > i; i++) r.add(new n.Mesh(e, t[i]));
                return r
            },
            detach: function(e, t, r) {
                e.applyMatrix(t.matrixWorld), t.remove(e), r.add(e)
            },
            attach: function(e, t, r) {
                var i = new n.Matrix4;
                i.getInverse(r.matrixWorld), e.applyMatrix(i), t.remove(e), r.add(e)
            }
        }, n.FontUtils = {
            faces: {},
            face: "helvetiker",
            weight: "normal",
            style: "normal",
            size: 150,
            divisions: 10,
            getFace: function() {
                try {
                    return this.faces[this.face][this.weight][this.style]
                } catch (e) {
                    throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."
                }
            },
            loadFace: function(e) {
                var t = e.familyName.toLowerCase(),
                    r = this;
                r.faces[t] = r.faces[t] || {}, r.faces[t][e.cssFontWeight] = r.faces[t][e.cssFontWeight] || {}, r.faces[t][e.cssFontWeight][e.cssFontStyle] = e;
                r.faces[t][e.cssFontWeight][e.cssFontStyle] = e;
                return e
            },
            drawText: function(e) {
                var t, r = this.getFace(),
                    i = this.size / r.resolution,
                    o = 0,
                    a = String(e).split(""),
                    s = a.length,
                    h = [];
                for (t = 0; s > t; t++) {
                    var l = new n.Path,
                        c = this.extractGlyphPoints(a[t], r, i, o, l);
                    o += c.offset, h.push(c.path)
                }
                var u = o / 2;
                return {
                    paths: h,
                    offset: u
                }
            },
            extractGlyphPoints: function(e, t, r, i, o) {
                var a, s, h, l, c, u, f, p, d, m, v, g, y, x, _, b, w, M, S, T = [],
                    C = t.glyphs[e] || t.glyphs["?"];
                if (C) {
                    if (C.o)
                        for (l = C._cachedOutline || (C._cachedOutline = C.o.split(" ")), u = l.length, f = r, p = r, a = 0; u > a;) switch (c = l[a++]) {
                            case "m":
                                d = l[a++] * f + i, m = l[a++] * p, o.moveTo(d, m);
                                break;
                            case "l":
                                d = l[a++] * f + i, m = l[a++] * p, o.lineTo(d, m);
                                break;
                            case "q":
                                if (v = l[a++] * f + i, g = l[a++] * p, _ = l[a++] * f + i, b = l[a++] * p, o.quadraticCurveTo(_, b, v, g), S = T[T.length - 1])
                                    for (y = S.x, x = S.y, s = 1, h = this.divisions; h >= s; s++) {
                                        var E = s / h;
                                        n.Shape.Utils.b2(E, y, _, v), n.Shape.Utils.b2(E, x, b, g)
                                    }
                                break;
                            case "b":
                                if (v = l[a++] * f + i, g = l[a++] * p, _ = l[a++] * f + i, b = l[a++] * p, w = l[a++] * f + i, M = l[a++] * p, o.bezierCurveTo(_, b, w, M, v, g), S = T[T.length - 1])
                                    for (y = S.x, x = S.y, s = 1, h = this.divisions; h >= s; s++) {
                                        var E = s / h;
                                        n.Shape.Utils.b3(E, y, _, w, v), n.Shape.Utils.b3(E, x, b, M, g)
                                    }
                        }
                    return {
                        offset: C.ha * r,
                        path: o
                    }
                }
            }
        }, n.FontUtils.generateShapes = function(e, t) {
            t = t || {};
            var r = void 0 !== t.size ? t.size : 100,
                i = void 0 !== t.curveSegments ? t.curveSegments : 4,
                o = void 0 !== t.font ? t.font : "helvetiker",
                a = void 0 !== t.weight ? t.weight : "normal",
                s = void 0 !== t.style ? t.style : "normal";
            n.FontUtils.size = r, n.FontUtils.divisions = i, n.FontUtils.face = o, n.FontUtils.weight = a, n.FontUtils.style = s;
            for (var h = n.FontUtils.drawText(e), l = h.paths, c = [], u = 0, f = l.length; f > u; u++) Array.prototype.push.apply(c, l[u].toShapes());
            return c
        },
        function(e) {
            var t = 1e-10,
                r = function(e, t) {
                    var r = e.length;
                    if (3 > r) return null;
                    var o, a, s, h = [],
                        l = [],
                        c = [];
                    if (i(e) > 0)
                        for (a = 0; r > a; a++) l[a] = a;
                    else
                        for (a = 0; r > a; a++) l[a] = r - 1 - a;
                    var u = r,
                        f = 2 * u;
                    for (a = u - 1; u > 2;) {
                        if (f-- <= 0) return console.log("Warning, unable to triangulate polygon!"), t ? c : h;
                        if (o = a, o >= u && (o = 0), a = o + 1, a >= u && (a = 0), s = a + 1, s >= u && (s = 0), n(e, o, a, s, u, l)) {
                            var p, d, m, v, g;
                            for (p = l[o], d = l[a], m = l[s], h.push([e[p], e[d], e[m]]), c.push([l[o], l[a], l[s]]),
                                     v = a, g = a + 1; u > g; v++, g++) l[v] = l[g];
                            u--, f = 2 * u
                        }
                    }
                    return t ? c : h
                },
                i = function(e) {
                    for (var t = e.length, r = 0, i = t - 1, n = 0; t > n; i = n++) r += e[i].x * e[n].y - e[n].x * e[i].y;
                    return .5 * r
                },
                n = function(e, r, i, n, o, a) {
                    var s, h, l, c, u, f, p, d, m;
                    if (h = e[a[r]].x, l = e[a[r]].y, c = e[a[i]].x, u = e[a[i]].y, f = e[a[n]].x, p = e[a[n]].y, t > (c - h) * (p - l) - (u - l) * (f - h)) return !1;
                    var v, g, y, x, _, b, w, M, S, T, C, E, A, L, P;
                    for (v = f - c, g = p - u, y = h - f, x = l - p, _ = c - h, b = u - l, s = 0; o > s; s++)
                        if (d = e[a[s]].x, m = e[a[s]].y, !(d === h && m === l || d === c && m === u || d === f && m === p) && (w = d - h, M = m - l, S = d - c, T = m - u, C = d - f, E = m - p, P = v * T - g * S, A = _ * M - b * w, L = y * E - x * C, P >= -t && L >= -t && A >= -t)) return !1;
                    return !0
                };
            return e.Triangulate = r, e.Triangulate.area = i, e
        }(n.FontUtils), i._typeface_js = {
            faces: n.FontUtils.faces,
            loadFace: n.FontUtils.loadFace
        }, n.typeface_js = i._typeface_js, n.Audio = function(e) {
            n.Object3D.call(this), this.type = "Audio", this.context = e.context, this.source = this.context.createBufferSource(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.panner = this.context.createPanner(), this.panner.connect(this.gain)
        }, n.Audio.prototype = Object.create(n.Object3D.prototype), n.Audio.prototype.load = function(e) {
            var t = this,
                r = new XMLHttpRequest;
            return r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function(e) {
                t.context.decodeAudioData(this.response, function(e) {
                    t.source.buffer = e, t.source.connect(t.panner), t.source.start(0)
                })
            }, r.send(), this
        }, n.Audio.prototype.setLoop = function(e) {
            this.source.loop = e
        }, n.Audio.prototype.setRefDistance = function(e) {
            this.panner.refDistance = e
        }, n.Audio.prototype.setRolloffFactor = function(e) {
            this.panner.rolloffFactor = e
        }, n.Audio.prototype.updateMatrixWorld = function() {
            var e = new n.Vector3;
            return function(t) {
                n.Object3D.prototype.updateMatrixWorld.call(this, t), e.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(e.x, e.y, e.z)
            }
        }(), n.AudioListener = function() {
            n.Object3D.call(this), this.type = "AudioListener", this.context = new(window.AudioContext || window.webkitAudioContext)
        }, n.AudioListener.prototype = Object.create(n.Object3D.prototype), n.AudioListener.prototype.updateMatrixWorld = function() {
            var e = new n.Vector3,
                t = new n.Quaternion,
                r = new n.Vector3,
                i = new n.Vector3,
                o = new n.Vector3,
                a = new n.Vector3;
            return function(s) {
                n.Object3D.prototype.updateMatrixWorld.call(this, s);
                var h = this.context.listener;
                this.matrixWorld.decompose(e, t, r), i.set(0, 0, -1).applyQuaternion(t), o.subVectors(e, a), h.setPosition(e.x, e.y, e.z), h.setOrientation(i.x, i.y, i.z, this.up.x, this.up.y, this.up.z), h.setVelocity(o.x, o.y, o.z), a.copy(e)
            }
        }(), n.Curve = function() {}, n.Curve.prototype.getPoint = function(e) {
            return console.log("Warning, getPoint() not implemented!"), null
        }, n.Curve.prototype.getPointAt = function(e) {
            var t = this.getUtoTmapping(e);
            return this.getPoint(t)
        }, n.Curve.prototype.getPoints = function(e) {
            e || (e = 5);
            var t, r = [];
            for (t = 0; e >= t; t++) r.push(this.getPoint(t / e));
            return r
        }, n.Curve.prototype.getSpacedPoints = function(e) {
            e || (e = 5);
            var t, r = [];
            for (t = 0; e >= t; t++) r.push(this.getPointAt(t / e));
            return r
        }, n.Curve.prototype.getLength = function() {
            var e = this.getLengths();
            return e[e.length - 1]
        }, n.Curve.prototype.getLengths = function(e) {
            if (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == e + 1 && !this.needsUpdate) return this.cacheArcLengths;
            this.needsUpdate = !1;
            var t, r, i = [],
                n = this.getPoint(0),
                o = 0;
            for (i.push(0), r = 1; e >= r; r++) t = this.getPoint(r / e), o += t.distanceTo(n), i.push(o), n = t;
            return this.cacheArcLengths = i, i
        }, n.Curve.prototype.updateArcLengths = function() {
            this.needsUpdate = !0, this.getLengths()
        }, n.Curve.prototype.getUtoTmapping = function(e, t) {
            var r, i = this.getLengths(),
                n = 0,
                o = i.length;
            r = t ? t : e * i[o - 1];
            for (var a, s = 0, h = o - 1; h >= s;)
                if (n = Math.floor(s + (h - s) / 2), a = i[n] - r, 0 > a) s = n + 1;
                else {
                    if (!(a > 0)) {
                        h = n;
                        break
                    }
                    h = n - 1
                }
            if (n = h, i[n] == r) {
                var l = n / (o - 1);
                return l
            }
            var c = i[n],
                u = i[n + 1],
                f = u - c,
                p = (r - c) / f,
                l = (n + p) / (o - 1);
            return l
        }, n.Curve.prototype.getTangent = function(e) {
            var t = 1e-4,
                r = e - t,
                i = e + t;
            0 > r && (r = 0), i > 1 && (i = 1);
            var n = this.getPoint(r),
                o = this.getPoint(i),
                a = o.clone().sub(n);
            return a.normalize()
        }, n.Curve.prototype.getTangentAt = function(e) {
            var t = this.getUtoTmapping(e);
            return this.getTangent(t)
        }, n.Curve.Utils = {
            tangentQuadraticBezier: function(e, t, r, i) {
                return 2 * (1 - e) * (r - t) + 2 * e * (i - r)
            },
            tangentCubicBezier: function(e, t, r, i, n) {
                return -3 * t * (1 - e) * (1 - e) + 3 * r * (1 - e) * (1 - e) - 6 * e * r * (1 - e) + 6 * e * i * (1 - e) - 3 * e * e * i + 3 * e * e * n
            },
            tangentSpline: function(e, t, r, i, n) {
                var o = 6 * e * e - 6 * e,
                    a = 3 * e * e - 4 * e + 1,
                    s = -6 * e * e + 6 * e,
                    h = 3 * e * e - 2 * e;
                return o + a + s + h
            },
            interpolate: function(e, t, r, i, n) {
                var o = .5 * (r - e),
                    a = .5 * (i - t),
                    s = n * n,
                    h = n * s;
                return (2 * t - 2 * r + o + a) * h + (-3 * t + 3 * r - 2 * o - a) * s + o * n + t
            }
        }, n.Curve.create = function(e, t) {
            return e.prototype = Object.create(n.Curve.prototype), e.prototype.getPoint = t, e
        }, n.CurvePath = function() {
            this.curves = [], this.bends = [], this.autoClose = !1
        }, n.CurvePath.prototype = Object.create(n.Curve.prototype), n.CurvePath.prototype.add = function(e) {
            this.curves.push(e)
        }, n.CurvePath.prototype.checkConnection = function() {}, n.CurvePath.prototype.closePath = function() {
            var e = this.curves[0].getPoint(0),
                t = this.curves[this.curves.length - 1].getPoint(1);
            e.equals(t) || this.curves.push(new n.LineCurve(t, e))
        }, n.CurvePath.prototype.getPoint = function(e) {
            for (var t, r, i = e * this.getLength(), n = this.getCurveLengths(), o = 0; o < n.length;) {
                if (n[o] >= i) {
                    t = n[o] - i, r = this.curves[o];
                    var a = 1 - t / r.getLength();
                    return r.getPointAt(a)
                }
                o++
            }
            return null
        }, n.CurvePath.prototype.getLength = function() {
            var e = this.getCurveLengths();
            return e[e.length - 1]
        }, n.CurvePath.prototype.getCurveLengths = function() {
            if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
            var e, t = [],
                r = 0,
                i = this.curves.length;
            for (e = 0; i > e; e++) r += this.curves[e].getLength(), t.push(r);
            return this.cacheLengths = t, t
        }, n.CurvePath.prototype.getBoundingBox = function() {
            var e, t, r, i, o, a, s = this.getPoints();
            e = t = Number.NEGATIVE_INFINITY, i = o = Number.POSITIVE_INFINITY;
            var h, l, c, u, f = s[0] instanceof n.Vector3;
            for (u = f ? new n.Vector3 : new n.Vector2, l = 0, c = s.length; c > l; l++) h = s[l], h.x > e ? e = h.x : h.x < i && (i = h.x), h.y > t ? t = h.y : h.y < o && (o = h.y), f && (h.z > r ? r = h.z : h.z < a && (a = h.z)), u.add(h);
            var p = {
                minX: i,
                minY: o,
                maxX: e,
                maxY: t
            };
            return f && (p.maxZ = r, p.minZ = a), p
        }, n.CurvePath.prototype.createPointsGeometry = function(e) {
            var t = this.getPoints(e, !0);
            return this.createGeometry(t)
        }, n.CurvePath.prototype.createSpacedPointsGeometry = function(e) {
            var t = this.getSpacedPoints(e, !0);
            return this.createGeometry(t)
        }, n.CurvePath.prototype.createGeometry = function(e) {
            for (var t = new n.Geometry, r = 0; r < e.length; r++) t.vertices.push(new n.Vector3(e[r].x, e[r].y, e[r].z || 0));
            return t
        }, n.CurvePath.prototype.addWrapPath = function(e) {
            this.bends.push(e)
        }, n.CurvePath.prototype.getTransformedPoints = function(e, t) {
            var r, i, n = this.getPoints(e);
            for (t || (t = this.bends), r = 0, i = t.length; i > r; r++) n = this.getWrapPoints(n, t[r]);
            return n
        }, n.CurvePath.prototype.getTransformedSpacedPoints = function(e, t) {
            var r, i, n = this.getSpacedPoints(e);
            for (t || (t = this.bends), r = 0, i = t.length; i > r; r++) n = this.getWrapPoints(n, t[r]);
            return n
        }, n.CurvePath.prototype.getWrapPoints = function(e, t) {
            var r, i, n, o, a, s, h = this.getBoundingBox();
            for (r = 0, i = e.length; i > r; r++) {
                n = e[r], o = n.x, a = n.y, s = o / h.maxX, s = t.getUtoTmapping(s, o);
                var l = t.getPoint(s),
                    c = t.getTangent(s);
                c.set(-c.y, c.x).multiplyScalar(a), n.x = l.x + c.x, n.y = l.y + c.y
            }
            return e
        }, n.Gyroscope = function() {
            n.Object3D.call(this)
        }, n.Gyroscope.prototype = Object.create(n.Object3D.prototype), n.Gyroscope.prototype.updateMatrixWorld = function() {
            var e = new n.Vector3,
                t = new n.Quaternion,
                r = new n.Vector3,
                i = new n.Vector3,
                o = new n.Quaternion,
                a = new n.Vector3;
            return function(n) {
                this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(i, o, a), this.matrix.decompose(e, t, r), this.matrixWorld.compose(i, t, a)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, n = !0);
                for (var s = 0, h = this.children.length; h > s; s++) this.children[s].updateMatrixWorld(n)
            }
        }(), n.Path = function(e) {
            n.CurvePath.call(this), this.actions = [], e && this.fromPoints(e)
        }, n.Path.prototype = Object.create(n.CurvePath.prototype), n.PathActions = {
            MOVE_TO: "moveTo",
            LINE_TO: "lineTo",
            QUADRATIC_CURVE_TO: "quadraticCurveTo",
            BEZIER_CURVE_TO: "bezierCurveTo",
            CSPLINE_THRU: "splineThru",
            ARC: "arc",
            ELLIPSE: "ellipse"
        }, n.Path.prototype.fromPoints = function(e) {
            this.moveTo(e[0].x, e[0].y);
            for (var t = 1, r = e.length; r > t; t++) this.lineTo(e[t].x, e[t].y)
        }, n.Path.prototype.moveTo = function(e, t) {
            var r = Array.prototype.slice.call(arguments);
            this.actions.push({
                action: n.PathActions.MOVE_TO,
                args: r
            })
        }, n.Path.prototype.lineTo = function(e, t) {
            var r = Array.prototype.slice.call(arguments),
                i = this.actions[this.actions.length - 1].args,
                o = i[i.length - 2],
                a = i[i.length - 1],
                s = new n.LineCurve(new n.Vector2(o, a), new n.Vector2(e, t));
            this.curves.push(s), this.actions.push({
                action: n.PathActions.LINE_TO,
                args: r
            })
        }, n.Path.prototype.quadraticCurveTo = function(e, t, r, i) {
            var o = Array.prototype.slice.call(arguments),
                a = this.actions[this.actions.length - 1].args,
                s = a[a.length - 2],
                h = a[a.length - 1],
                l = new n.QuadraticBezierCurve(new n.Vector2(s, h), new n.Vector2(e, t), new n.Vector2(r, i));
            this.curves.push(l), this.actions.push({
                action: n.PathActions.QUADRATIC_CURVE_TO,
                args: o
            })
        }, n.Path.prototype.bezierCurveTo = function(e, t, r, i, o, a) {
            var s = Array.prototype.slice.call(arguments),
                h = this.actions[this.actions.length - 1].args,
                l = h[h.length - 2],
                c = h[h.length - 1],
                u = new n.CubicBezierCurve(new n.Vector2(l, c), new n.Vector2(e, t), new n.Vector2(r, i), new n.Vector2(o, a));
            this.curves.push(u), this.actions.push({
                action: n.PathActions.BEZIER_CURVE_TO,
                args: s
            })
        }, n.Path.prototype.splineThru = function(e) {
            var t = Array.prototype.slice.call(arguments),
                r = this.actions[this.actions.length - 1].args,
                i = r[r.length - 2],
                o = r[r.length - 1],
                a = [new n.Vector2(i, o)];
            Array.prototype.push.apply(a, e);
            var s = new n.SplineCurve(a);
            this.curves.push(s), this.actions.push({
                action: n.PathActions.CSPLINE_THRU,
                args: t
            })
        }, n.Path.prototype.arc = function(e, t, r, i, n, o) {
            var a = this.actions[this.actions.length - 1].args,
                s = a[a.length - 2],
                h = a[a.length - 1];
            this.absarc(e + s, t + h, r, i, n, o)
        }, n.Path.prototype.absarc = function(e, t, r, i, n, o) {
            this.absellipse(e, t, r, r, i, n, o)
        }, n.Path.prototype.ellipse = function(e, t, r, i, n, o, a) {
            var s = this.actions[this.actions.length - 1].args,
                h = s[s.length - 2],
                l = s[s.length - 1];
            this.absellipse(e + h, t + l, r, i, n, o, a)
        }, n.Path.prototype.absellipse = function(e, t, r, i, o, a, s) {
            var h = Array.prototype.slice.call(arguments),
                l = new n.EllipseCurve(e, t, r, i, o, a, s);
            this.curves.push(l);
            var c = l.getPoint(1);
            h.push(c.x), h.push(c.y), this.actions.push({
                action: n.PathActions.ELLIPSE,
                args: h
            })
        }, n.Path.prototype.getSpacedPoints = function(e, t) {
            e || (e = 40);
            for (var r = [], i = 0; e > i; i++) r.push(this.getPoint(i / e));
            return r
        }, n.Path.prototype.getPoints = function(e, t) {
            if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(e, t);
            e = e || 12;
            var r, i, o, a, s, h, l, c, u, f, p, d, m, v, g, y, x, _, b = [];
            for (r = 0, i = this.actions.length; i > r; r++) switch (o = this.actions[r], a = o.action, s = o.args, a) {
                case n.PathActions.MOVE_TO:
                    b.push(new n.Vector2(s[0], s[1]));
                    break;
                case n.PathActions.LINE_TO:
                    b.push(new n.Vector2(s[0], s[1]));
                    break;
                case n.PathActions.QUADRATIC_CURVE_TO:
                    for (h = s[2], l = s[3], f = s[0], p = s[1], b.length > 0 ? (v = b[b.length - 1], d = v.x, m = v.y) : (v = this.actions[r - 1].args, d = v[v.length - 2], m = v[v.length - 1]), g = 1; e >= g; g++) y = g / e, x = n.Shape.Utils.b2(y, d, f, h), _ = n.Shape.Utils.b2(y, m, p, l), b.push(new n.Vector2(x, _));
                    break;
                case n.PathActions.BEZIER_CURVE_TO:
                    for (h = s[4], l = s[5], f = s[0], p = s[1], c = s[2], u = s[3], b.length > 0 ? (v = b[b.length - 1], d = v.x, m = v.y) : (v = this.actions[r - 1].args, d = v[v.length - 2], m = v[v.length - 1]), g = 1; e >= g; g++) y = g / e, x = n.Shape.Utils.b3(y, d, f, c, h), _ = n.Shape.Utils.b3(y, m, p, u, l), b.push(new n.Vector2(x, _));
                    break;
                case n.PathActions.CSPLINE_THRU:
                    v = this.actions[r - 1].args;
                    var w = new n.Vector2(v[v.length - 2], v[v.length - 1]),
                        M = [w],
                        S = e * s[0].length;
                    M = M.concat(s[0]);
                    var T = new n.SplineCurve(M);
                    for (g = 1; S >= g; g++) b.push(T.getPointAt(g / S));
                    break;
                case n.PathActions.ARC:
                    var C, E = s[0],
                        A = s[1],
                        L = s[2],
                        P = s[3],
                        R = s[4],
                        F = !!s[5],
                        D = R - P,
                        U = 2 * e;
                    for (g = 1; U >= g; g++) y = g / U, F || (y = 1 - y), C = P + y * D, x = E + L * Math.cos(C), _ = A + L * Math.sin(C), b.push(new n.Vector2(x, _));
                    break;
                case n.PathActions.ELLIPSE:
                    var C, E = s[0],
                        A = s[1],
                        z = s[2],
                        B = s[3],
                        P = s[4],
                        R = s[5],
                        F = !!s[6],
                        D = R - P,
                        U = 2 * e;
                    for (g = 1; U >= g; g++) y = g / U, F || (y = 1 - y), C = P + y * D, x = E + z * Math.cos(C), _ = A + B * Math.sin(C), b.push(new n.Vector2(x, _))
            }
            var V = b[b.length - 1],
                k = 1e-10;
            return Math.abs(V.x - b[0].x) < k && Math.abs(V.y - b[0].y) < k && b.splice(b.length - 1, 1), t && b.push(b[0]), b
        }, n.Path.prototype.toShapes = function(e, t) {
            function r(e) {
                var t, r, i, o, a, s = [],
                    h = new n.Path;
                for (t = 0, r = e.length; r > t; t++) i = e[t], a = i.args, o = i.action, o == n.PathActions.MOVE_TO && 0 != h.actions.length && (s.push(h), h = new n.Path), h[o].apply(h, a);
                return 0 != h.actions.length && s.push(h), s
            }
            function i(e) {
                for (var t = [], r = 0, i = e.length; i > r; r++) {
                    var o = e[r],
                        a = new n.Shape;
                    a.actions = o.actions, a.curves = o.curves, t.push(a)
                }
                return t
            }
            function o(e, t) {
                for (var r = 1e-10, i = t.length, n = !1, o = i - 1, a = 0; i > a; o = a++) {
                    var s = t[o],
                        h = t[a],
                        l = h.x - s.x,
                        c = h.y - s.y;
                    if (Math.abs(c) > r) {
                        if (0 > c && (s = t[a], l = -l, h = t[o], c = -c), e.y < s.y || e.y > h.y) continue;
                        if (e.y == s.y) {
                            if (e.x == s.x) return !0
                        } else {
                            var u = c * (e.x - s.x) - l * (e.y - s.y);
                            if (0 == u) return !0;
                            if (0 > u) continue;
                            n = !n
                        }
                    } else {
                        if (e.y != s.y) continue;
                        if (h.x <= e.x && e.x <= s.x || s.x <= e.x && e.x <= h.x) return !0
                    }
                }
                return n
            }
            var a = r(this.actions);
            if (0 == a.length) return [];
            if (t === !0) return i(a);
            var s, h, l, c = [];
            if (1 == a.length) return h = a[0], l = new n.Shape, l.actions = h.actions, l.curves = h.curves, c.push(l), c;
            var u = !n.Shape.Utils.isClockWise(a[0].getPoints());
            u = e ? !u : u;
            var f, p = [],
                d = [],
                m = [],
                v = 0;
            d[v] = void 0, m[v] = [];
            var g, y;
            for (g = 0, y = a.length; y > g; g++) h = a[g], f = h.getPoints(), s = n.Shape.Utils.isClockWise(f), s = e ? !s : s, s ? (!u && d[v] && v++, d[v] = {
                s: new n.Shape,
                p: f
            }, d[v].s.actions = h.actions, d[v].s.curves = h.curves, u && v++, m[v] = []) : m[v].push({
                h: h,
                p: f[0]
            });
            if (!d[0]) return i(a);
            if (d.length > 1) {
                for (var x = !1, _ = [], b = 0, w = d.length; w > b; b++) p[b] = [];
                for (var b = 0, w = d.length; w > b; b++)
                    for (var M = (d[b], m[b]), S = 0; S < M.length; S++) {
                        for (var T = M[S], C = !0, E = 0; E < d.length; E++) o(T.p, d[E].p) && (b != E && _.push({
                            froms: b,
                            tos: E,
                            hole: S
                        }), C ? (C = !1, p[E].push(T)) : x = !0);
                        C && p[b].push(T)
                    }
                _.length > 0 && (x || (m = p))
            }
            var A, L, P;
            for (g = 0, y = d.length; y > g; g++)
                for (l = d[g].s, c.push(l), A = m[g], L = 0, P = A.length; P > L; L++) l.holes.push(A[L].h);
            return c
        }, n.Shape = function() {
            n.Path.apply(this, arguments), this.holes = []
        }, n.Shape.prototype = Object.create(n.Path.prototype), n.Shape.prototype.extrude = function(e) {
            var t = new n.ExtrudeGeometry(this, e);
            return t
        }, n.Shape.prototype.makeGeometry = function(e) {
            var t = new n.ShapeGeometry(this, e);
            return t
        }, n.Shape.prototype.getPointsHoles = function(e) {
            var t, r = this.holes.length,
                i = [];
            for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedPoints(e, this.bends);
            return i
        }, n.Shape.prototype.getSpacedPointsHoles = function(e) {
            var t, r = this.holes.length,
                i = [];
            for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedSpacedPoints(e, this.bends);
            return i
        }, n.Shape.prototype.extractAllPoints = function(e) {
            return {
                shape: this.getTransformedPoints(e),
                holes: this.getPointsHoles(e)
            }
        }, n.Shape.prototype.extractPoints = function(e) {
            return this.useSpacedPoints ? this.extractAllSpacedPoints(e) : this.extractAllPoints(e)
        }, n.Shape.prototype.extractAllSpacedPoints = function(e) {
            return {
                shape: this.getTransformedSpacedPoints(e),
                holes: this.getSpacedPointsHoles(e)
            }
        }, n.Shape.Utils = {
            triangulateShape: function(e, t) {
                function r(e, t, r) {
                    return e.x != t.x ? e.x < t.x ? e.x <= r.x && r.x <= t.x : t.x <= r.x && r.x <= e.x : e.y < t.y ? e.y <= r.y && r.y <= t.y : t.y <= r.y && r.y <= e.y
                }
                function i(e, t, i, n, o) {
                    var a = 1e-10,
                        s = t.x - e.x,
                        h = t.y - e.y,
                        l = n.x - i.x,
                        c = n.y - i.y,
                        u = e.x - i.x,
                        f = e.y - i.y,
                        p = h * l - s * c,
                        d = h * u - s * f;
                    if (Math.abs(p) > a) {
                        var m;
                        if (p > 0) {
                            if (0 > d || d > p) return [];
                            if (m = c * u - l * f, 0 > m || m > p) return []
                        } else {
                            if (d > 0 || p > d) return [];
                            if (m = c * u - l * f, m > 0 || p > m) return []
                        }
                        if (0 == m) return !o || 0 != d && d != p ? [e] : [];
                        if (m == p) return !o || 0 != d && d != p ? [t] : [];
                        if (0 == d) return [i];
                        if (d == p) return [n];
                        var v = m / p;
                        return [{
                            x: e.x + v * s,
                            y: e.y + v * h
                        }]
                    }
                    if (0 != d || c * u != l * f) return [];
                    var g = 0 == s && 0 == h,
                        y = 0 == l && 0 == c;
                    if (g && y) return e.x != i.x || e.y != i.y ? [] : [e];
                    if (g) return r(i, n, e) ? [e] : [];
                    if (y) return r(e, t, i) ? [i] : [];
                    var x, _, b, w, M, S, T, C;
                    return 0 != s ? (e.x < t.x ? (x = e, b = e.x, _ = t, w = t.x) : (x = t, b = t.x, _ = e, w = e.x), i.x < n.x ? (M = i, T = i.x, S = n, C = n.x) : (M = n, T = n.x, S = i, C = i.x)) : (e.y < t.y ? (x = e, b = e.y, _ = t, w = t.y) : (x = t, b = t.y, _ = e, w = e.y), i.y < n.y ? (M = i, T = i.y, S = n, C = n.y) : (M = n, T = n.y, S = i, C = i.y)), T >= b ? T > w ? [] : w == T ? o ? [] : [M] : C >= w ? [M, _] : [M, S] : b > C ? [] : b == C ? o ? [] : [x] : C >= w ? [x, _] : [x, S]
                }
                function o(e, t, r, i) {
                    var n = 1e-10,
                        o = t.x - e.x,
                        a = t.y - e.y,
                        s = r.x - e.x,
                        h = r.y - e.y,
                        l = i.x - e.x,
                        c = i.y - e.y,
                        u = o * h - a * s,
                        f = o * c - a * l;
                    if (Math.abs(u) > n) {
                        var p = l * h - c * s;
                        return u > 0 ? f >= 0 && p >= 0 : f >= 0 || p >= 0
                    }
                    return f > 0
                }
                function a(e, t) {
                    function r(e, t) {
                        var r = y.length - 1,
                            i = e - 1;
                        0 > i && (i = r);
                        var n = e + 1;
                        n > r && (n = 0);
                        var a = o(y[e], y[i], y[n], s[t]);
                        if (!a) return !1;
                        var h = s.length - 1,
                            l = t - 1;
                        0 > l && (l = h);
                        var c = t + 1;
                        return c > h && (c = 0), a = o(s[t], s[l], s[c], y[e]), a ? !0 : !1
                    }
                    function n(e, t) {
                        var r, n, o;
                        for (r = 0; r < y.length; r++)
                            if (n = r + 1, n %= y.length, o = i(e, t, y[r], y[n], !0), o.length > 0) return !0;
                        return !1
                    }
                    function a(e, r) {
                        var n, o, a, s, h;
                        for (n = 0; n < x.length; n++)
                            for (o = t[x[n]], a = 0; a < o.length; a++)
                                if (s = a + 1, s %= o.length, h = i(e, r, o[a], o[s], !0), h.length > 0) return !0;
                        return !1
                    }
                    for (var s, h, l, c, u, f, p, d, m, v, g, y = e.concat(), x = [], _ = [], b = 0, w = t.length; w > b; b++) x.push(b);
                    for (var M = 0, S = 2 * x.length; x.length > 0;) {
                        if (S--, 0 > S) {
                            console.log("Infinite Loop! Holes left:" + x.length + ", Probably Hole outside Shape!");
                            break
                        }
                        for (l = M; l < y.length; l++) {
                            c = y[l], h = -1;
                            for (var b = 0; b < x.length; b++)
                                if (f = x[b], p = c.x + ":" + c.y + ":" + f, void 0 === _[p]) {
                                    s = t[f];
                                    for (var T = 0; T < s.length; T++)
                                        if (u = s[T], r(l, T) && !n(c, u) && !a(c, u)) {
                                            h = T, x.splice(b, 1), d = y.slice(0, l + 1), m = y.slice(l), v = s.slice(h), g = s.slice(0, h + 1), y = d.concat(v).concat(g).concat(m), M = l;
                                            break
                                        }
                                    if (h >= 0) break;
                                    _[p] = !0
                                }
                            if (h >= 0) break
                        }
                    }
                    return y
                }
                for (var s, h, l, c, u, f, p = {}, d = e.concat(), m = 0, v = t.length; v > m; m++) Array.prototype.push.apply(d, t[m]);
                for (s = 0, h = d.length; h > s; s++) u = d[s].x + ":" + d[s].y, void 0 !== p[u] && console.log("Duplicate point", u), p[u] = s;
                var g = a(e, t),
                    y = n.FontUtils.Triangulate(g, !1);
                for (s = 0, h = y.length; h > s; s++)
                    for (c = y[s], l = 0; 3 > l; l++) u = c[l].x + ":" + c[l].y, f = p[u], void 0 !== f && (c[l] = f);
                return y.concat()
            },
            isClockWise: function(e) {
                return n.FontUtils.Triangulate.area(e) < 0
            },
            b2p0: function(e, t) {
                var r = 1 - e;
                return r * r * t
            },
            b2p1: function(e, t) {
                return 2 * (1 - e) * e * t
            },
            b2p2: function(e, t) {
                return e * e * t
            },
            b2: function(e, t, r, i) {
                return this.b2p0(e, t) + this.b2p1(e, r) + this.b2p2(e, i)
            },
            b3p0: function(e, t) {
                var r = 1 - e;
                return r * r * r * t
            },
            b3p1: function(e, t) {
                var r = 1 - e;
                return 3 * r * r * e * t
            },
            b3p2: function(e, t) {
                var r = 1 - e;
                return 3 * r * e * e * t
            },
            b3p3: function(e, t) {
                return e * e * e * t
            },
            b3: function(e, t, r, i, n) {
                return this.b3p0(e, t) + this.b3p1(e, r) + this.b3p2(e, i) + this.b3p3(e, n)
            }
        }, n.LineCurve = function(e, t) {
            this.v1 = e, this.v2 = t
        }, n.LineCurve.prototype = Object.create(n.Curve.prototype), n.LineCurve.prototype.getPoint = function(e) {
            var t = this.v2.clone().sub(this.v1);
            return t.multiplyScalar(e).add(this.v1), t
        }, n.LineCurve.prototype.getPointAt = function(e) {
            return this.getPoint(e)
        }, n.LineCurve.prototype.getTangent = function(e) {
            var t = this.v2.clone().sub(this.v1);
            return t.normalize()
        }, n.QuadraticBezierCurve = function(e, t, r) {
            this.v0 = e, this.v1 = t, this.v2 = r
        }, n.QuadraticBezierCurve.prototype = Object.create(n.Curve.prototype), n.QuadraticBezierCurve.prototype.getPoint = function(e) {
            var t = new n.Vector2;
            return t.x = n.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t
        }, n.QuadraticBezierCurve.prototype.getTangent = function(e) {
            var t = new n.Vector2;
            return t.x = n.Curve.Utils.tangentQuadraticBezier(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Curve.Utils.tangentQuadraticBezier(e, this.v0.y, this.v1.y, this.v2.y), t.normalize()
        }, n.CubicBezierCurve = function(e, t, r, i) {
            this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
        }, n.CubicBezierCurve.prototype = Object.create(n.Curve.prototype), n.CubicBezierCurve.prototype.getPoint = function(e) {
            var t, r;
            return t = n.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = n.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new n.Vector2(t, r)
        }, n.CubicBezierCurve.prototype.getTangent = function(e) {
            var t, r;
            t = n.Curve.Utils.tangentCubicBezier(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = n.Curve.Utils.tangentCubicBezier(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
            var i = new n.Vector2(t, r);
            return i.normalize(), i
        }, n.SplineCurve = function(e) {
            this.points = void 0 == e ? [] : e
        }, n.SplineCurve.prototype = Object.create(n.Curve.prototype), n.SplineCurve.prototype.getPoint = function(e) {
            var t = this.points,
                r = (t.length - 1) * e,
                i = Math.floor(r),
                o = r - i,
                a = t[0 == i ? i : i - 1],
                s = t[i],
                h = t[i > t.length - 2 ? t.length - 1 : i + 1],
                l = t[i > t.length - 3 ? t.length - 1 : i + 2],
                c = new n.Vector2;
            return c.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c
        }, n.EllipseCurve = function(e, t, r, i, n, o, a) {
            this.aX = e, this.aY = t, this.xRadius = r, this.yRadius = i, this.aStartAngle = n, this.aEndAngle = o, this.aClockwise = a
        }, n.EllipseCurve.prototype = Object.create(n.Curve.prototype), n.EllipseCurve.prototype.getPoint = function(e) {
            var t = this.aEndAngle - this.aStartAngle;
            0 > t && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI);
            var r;
            r = this.aClockwise === !0 ? this.aEndAngle + (1 - e) * (2 * Math.PI - t) : this.aStartAngle + e * t;
            var i = new n.Vector2;
            return i.x = this.aX + this.xRadius * Math.cos(r), i.y = this.aY + this.yRadius * Math.sin(r), i
        }, n.ArcCurve = function(e, t, r, i, o, a) {
            n.EllipseCurve.call(this, e, t, r, r, i, o, a)
        }, n.ArcCurve.prototype = Object.create(n.EllipseCurve.prototype), n.LineCurve3 = n.Curve.create(function(e, t) {
            this.v1 = e, this.v2 = t
        }, function(e) {
            var t = new n.Vector3;
            return t.subVectors(this.v2, this.v1), t.multiplyScalar(e), t.add(this.v1), t
        }), n.QuadraticBezierCurve3 = n.Curve.create(function(e, t, r) {
            this.v0 = e, this.v1 = t, this.v2 = r
        }, function(e) {
            var t = new n.Vector3;
            return t.x = n.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t.z = n.Shape.Utils.b2(e, this.v0.z, this.v1.z, this.v2.z), t
        }), n.CubicBezierCurve3 = n.Curve.create(function(e, t, r, i) {
            this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
        }, function(e) {
            var t = new n.Vector3;
            return t.x = n.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), t.y = n.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t.z = n.Shape.Utils.b3(e, this.v0.z, this.v1.z, this.v2.z, this.v3.z), t
        }), n.SplineCurve3 = n.Curve.create(function(e) {
            this.points = void 0 == e ? [] : e
        }, function(e) {
            var t = this.points,
                r = (t.length - 1) * e,
                i = Math.floor(r),
                o = r - i,
                a = t[0 == i ? i : i - 1],
                s = t[i],
                h = t[i > t.length - 2 ? t.length - 1 : i + 1],
                l = t[i > t.length - 3 ? t.length - 1 : i + 2],
                c = new n.Vector3;
            return c.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c.z = n.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), c
        }), n.ClosedSplineCurve3 = n.Curve.create(function(e) {
            this.points = void 0 == e ? [] : e
        }, function(e) {
            var t = this.points,
                r = (t.length - 0) * e,
                i = Math.floor(r),
                o = r - i;
            i += i > 0 ? 0 : (Math.floor(Math.abs(i) / t.length) + 1) * t.length;
            var a = t[(i - 1) % t.length],
                s = t[i % t.length],
                h = t[(i + 1) % t.length],
                l = t[(i + 2) % t.length],
                c = new n.Vector3;
            return c.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c.z = n.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), c
        }), n.AnimationHandler = {
            LINEAR: 0,
            CATMULLROM: 1,
            CATMULLROM_FORWARD: 2,
            add: function() {
                console.warn("THREE.AnimationHandler.add() has been deprecated.")
            },
            get: function() {
                console.warn("THREE.AnimationHandler.get() has been deprecated.")
            },
            remove: function() {
                console.warn("THREE.AnimationHandler.remove() has been deprecated.")
            },
            animations: [],
            init: function(e) {
                if (e.initialized !== !0) {
                    for (var t = 0; t < e.hierarchy.length; t++) {
                        for (var r = 0; r < e.hierarchy[t].keys.length; r++)
                            if (e.hierarchy[t].keys[r].time < 0 && (e.hierarchy[t].keys[r].time = 0), void 0 !== e.hierarchy[t].keys[r].rot && !(e.hierarchy[t].keys[r].rot instanceof n.Quaternion)) {
                                var i = e.hierarchy[t].keys[r].rot;
                                e.hierarchy[t].keys[r].rot = (new n.Quaternion).fromArray(i)
                            }
                        if (e.hierarchy[t].keys.length && void 0 !== e.hierarchy[t].keys[0].morphTargets) {
                            for (var o = {}, r = 0; r < e.hierarchy[t].keys.length; r++)
                                for (var a = 0; a < e.hierarchy[t].keys[r].morphTargets.length; a++) {
                                    var s = e.hierarchy[t].keys[r].morphTargets[a];
                                    o[s] = -1
                                }
                            e.hierarchy[t].usedMorphTargets = o;
                            for (var r = 0; r < e.hierarchy[t].keys.length; r++) {
                                var h = {};
                                for (var s in o) {
                                    for (var a = 0; a < e.hierarchy[t].keys[r].morphTargets.length; a++)
                                        if (e.hierarchy[t].keys[r].morphTargets[a] === s) {
                                            h[s] = e.hierarchy[t].keys[r].morphTargetsInfluences[a];
                                            break
                                        }
                                    a === e.hierarchy[t].keys[r].morphTargets.length && (h[s] = 0)
                                }
                                e.hierarchy[t].keys[r].morphTargetsInfluences = h
                            }
                        }
                        for (var r = 1; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].time === e.hierarchy[t].keys[r - 1].time && (e.hierarchy[t].keys.splice(r, 1), r--);
                        for (var r = 0; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].index = r
                    }
                    return e.initialized = !0, e
                }
            },
            parse: function(e) {
                var t = function(e, r) {
                        r.push(e);
                        for (var i = 0; i < e.children.length; i++) t(e.children[i], r)
                    },
                    r = [];
                if (e instanceof n.SkinnedMesh)
                    for (var i = 0; i < e.skeleton.bones.length; i++) r.push(e.skeleton.bones[i]);
                else t(e, r);
                return r
            },
            play: function(e) {
                -1 === this.animations.indexOf(e) && this.animations.push(e)
            },
            stop: function(e) {
                var t = this.animations.indexOf(e); - 1 !== t && this.animations.splice(t, 1)
            },
            update: function(e) {
                for (var t = 0; t < this.animations.length; t++) this.animations[t].resetBlendWeights();
                for (var t = 0; t < this.animations.length; t++) this.animations[t].update(e)
            }
        }, n.Animation = function(e, t) {
            this.root = e, this.data = n.AnimationHandler.init(t), this.hierarchy = n.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = !0, this.weight = 0, this.interpolationType = n.AnimationHandler.LINEAR
        }, n.Animation.prototype.keyTypes = ["pos", "rot", "scl"], n.Animation.prototype.play = function(e, t) {
            this.currentTime = void 0 !== e ? e : 0, this.weight = void 0 !== t ? t : 1, this.isPlaying = !0, this.reset(), n.AnimationHandler.play(this)
        }, n.Animation.prototype.stop = function() {
            this.isPlaying = !1, n.AnimationHandler.stop(this)
        }, n.Animation.prototype.reset = function() {
            for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                var r = this.hierarchy[e];
                r.matrixAutoUpdate = !0, void 0 === r.animationCache && (r.animationCache = {
                    animations: {},
                    blending: {
                        positionWeight: 0,
                        quaternionWeight: 0,
                        scaleWeight: 0
                    }
                }), void 0 === r.animationCache.animations[this.data.name] && (r.animationCache.animations[this.data.name] = {}, r.animationCache.animations[this.data.name].prevKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                }, r.animationCache.animations[this.data.name].nextKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                }, r.animationCache.animations[this.data.name].originalMatrix = r.matrix);
                for (var i = r.animationCache.animations[this.data.name], n = 0; 3 > n; n++) {
                    for (var o = this.keyTypes[n], a = this.data.hierarchy[e].keys[0], s = this.getNextKeyWith(o, e, 1); s.time < this.currentTime && s.index > a.index;) a = s, s = this.getNextKeyWith(o, e, s.index + 1);
                    i.prevKey[o] = a, i.nextKey[o] = s
                }
            }
        }, n.Animation.prototype.resetBlendWeights = function() {
            for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                var r = this.hierarchy[e];
                void 0 !== r.animationCache && (r.animationCache.blending.positionWeight = 0, r.animationCache.blending.quaternionWeight = 0, r.animationCache.blending.scaleWeight = 0)
            }
        }, n.Animation.prototype.update = function() {
            var e = [],
                t = new n.Vector3,
                r = new n.Vector3,
                i = new n.Quaternion,
                o = function(e, t) {
                    var r, i, n, o, s, h, l, c, u, f = [],
                        p = [];
                    return r = (e.length - 1) * t, i = Math.floor(r), n = r - i, f[0] = 0 === i ? i : i - 1, f[1] = i, f[2] = i > e.length - 2 ? i : i + 1, f[3] = i > e.length - 3 ? i : i + 2, h = e[f[0]], l = e[f[1]], c = e[f[2]], u = e[f[3]], o = n * n, s = n * o, p[0] = a(h[0], l[0], c[0], u[0], n, o, s), p[1] = a(h[1], l[1], c[1], u[1], n, o, s), p[2] = a(h[2], l[2], c[2], u[2], n, o, s), p
                },
                a = function(e, t, r, i, n, o, a) {
                    var s = .5 * (r - e),
                        h = .5 * (i - t);
                    return (2 * (t - r) + s + h) * a + (-3 * (t - r) - 2 * s - h) * o + s * n + t
                };
            return function(a) {
                if (this.isPlaying !== !1 && (this.currentTime += a * this.timeScale, 0 !== this.weight)) {
                    var s = this.data.length;
                    if (this.currentTime > s || this.currentTime < 0) {
                        if (!this.loop) return void this.stop();
                        this.currentTime %= s, this.currentTime < 0 && (this.currentTime += s), this.reset()
                    }
                    for (var h = 0, l = this.hierarchy.length; l > h; h++)
                        for (var c = this.hierarchy[h], u = c.animationCache.animations[this.data.name], f = c.animationCache.blending, p = 0; 3 > p; p++) {
                            var d = this.keyTypes[p],
                                m = u.prevKey[d],
                                v = u.nextKey[d];
                            if (this.timeScale > 0 && v.time <= this.currentTime || this.timeScale < 0 && m.time >= this.currentTime) {
                                for (m = this.data.hierarchy[h].keys[0], v = this.getNextKeyWith(d, h, 1); v.time < this.currentTime && v.index > m.index;) m = v, v = this.getNextKeyWith(d, h, v.index + 1);
                                u.prevKey[d] = m, u.nextKey[d] = v
                            }
                            c.matrixAutoUpdate = !0, c.matrixWorldNeedsUpdate = !0;
                            var g = (this.currentTime - m.time) / (v.time - m.time),
                                y = m[d],
                                x = v[d];
                            if (0 > g && (g = 0), g > 1 && (g = 1), "pos" === d) {
                                if (this.interpolationType === n.AnimationHandler.LINEAR) {
                                    r.x = y[0] + (x[0] - y[0]) * g, r.y = y[1] + (x[1] - y[1]) * g, r.z = y[2] + (x[2] - y[2]) * g;
                                    var _ = this.weight / (this.weight + f.positionWeight);
                                    c.position.lerp(r, _), f.positionWeight += this.weight
                                } else if (this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD) {
                                    e[0] = this.getPrevKeyWith("pos", h, m.index - 1).pos, e[1] = y, e[2] = x, e[3] = this.getNextKeyWith("pos", h, v.index + 1).pos, g = .33 * g + .33;
                                    var b = o(e, g),
                                        _ = this.weight / (this.weight + f.positionWeight);
                                    f.positionWeight += this.weight;
                                    var w = c.position;
                                    if (w.x = w.x + (b[0] - w.x) * _, w.y = w.y + (b[1] - w.y) * _, w.z = w.z + (b[2] - w.z) * _, this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD) {
                                        var M = o(e, 1.01 * g);
                                        t.set(M[0], M[1], M[2]), t.sub(w), t.y = 0, t.normalize();
                                        var S = Math.atan2(t.x, t.z);
                                        c.rotation.set(0, S, 0)
                                    }
                                }
                            } else if ("rot" === d)
                                if (n.Quaternion.slerp(y, x, i, g), 0 === f.quaternionWeight) c.quaternion.copy(i), f.quaternionWeight = this.weight;
                                else {
                                    var _ = this.weight / (this.weight + f.quaternionWeight);
                                    n.Quaternion.slerp(c.quaternion, i, c.quaternion, _), f.quaternionWeight += this.weight
                                }
                            else if ("scl" === d) {
                                r.x = y[0] + (x[0] - y[0]) * g, r.y = y[1] + (x[1] - y[1]) * g, r.z = y[2] + (x[2] - y[2]) * g;
                                var _ = this.weight / (this.weight + f.scaleWeight);
                                c.scale.lerp(r, _), f.scaleWeight += this.weight
                            }
                        }
                    return !0
                }
            }
        }(), n.Animation.prototype.getNextKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD ? r = r < i.length - 1 ? r : i.length - 1 : r %= i.length; r < i.length; r++)
                if (void 0 !== i[r][e]) return i[r];
            return this.data.hierarchy[t].keys[0]
        }, n.Animation.prototype.getPrevKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (r = this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD ? r > 0 ? r : 0 : r >= 0 ? r : r + i.length; r >= 0; r--)
                if (void 0 !== i[r][e]) return i[r];
            return this.data.hierarchy[t].keys[i.length - 1]
        }, n.KeyFrameAnimation = function(e) {
            this.root = e.node, this.data = n.AnimationHandler.init(e), this.hierarchy = n.AnimationHandler.parse(this.root), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.isPaused = !0, this.loop = !0;
            for (var t = 0, r = this.hierarchy.length; r > t; t++) {
                var i = this.data.hierarchy[t].keys,
                    o = this.data.hierarchy[t].sids,
                    a = this.hierarchy[t];
                if (i.length && o) {
                    for (var s = 0; s < o.length; s++) {
                        var h = o[s],
                            l = this.getNextKeyWith(h, t, 0);
                        l && l.apply(h)
                    }
                    a.matrixAutoUpdate = !1, this.data.hierarchy[t].node.updateMatrix(), a.matrixWorldNeedsUpdate = !0
                }
            }
        }, n.KeyFrameAnimation.prototype.play = function(e) {
            if (this.currentTime = void 0 !== e ? e : 0, this.isPlaying === !1) {
                this.isPlaying = !0;
                var t, r, i, o = this.hierarchy.length;
                for (t = 0; o > t; t++) {
                    r = this.hierarchy[t], i = this.data.hierarchy[t], void 0 === i.animationCache && (i.animationCache = {}, i.animationCache.prevKey = null, i.animationCache.nextKey = null, i.animationCache.originalMatrix = r.matrix);
                    var a = this.data.hierarchy[t].keys;
                    a.length && (i.animationCache.prevKey = a[0], i.animationCache.nextKey = a[1], this.startTime = Math.min(a[0].time, this.startTime), this.endTime = Math.max(a[a.length - 1].time, this.endTime))
                }
                this.update(0)
            }
            this.isPaused = !1, n.AnimationHandler.play(this)
        }, n.KeyFrameAnimation.prototype.stop = function() {
            this.isPlaying = !1, this.isPaused = !1, n.AnimationHandler.stop(this);
            for (var e = 0; e < this.data.hierarchy.length; e++) {
                var t = this.hierarchy[e],
                    r = this.data.hierarchy[e];
                if (void 0 !== r.animationCache) {
                    var i = r.animationCache.originalMatrix;
                    i.copy(t.matrix), t.matrix = i, delete r.animationCache
                }
            }
        }, n.KeyFrameAnimation.prototype.update = function(e) {
            if (this.isPlaying !== !1) {
                this.currentTime += e * this.timeScale;
                var t = this.data.length;
                this.loop === !0 && this.currentTime > t && (this.currentTime %= t), this.currentTime = Math.min(this.currentTime, t);
                for (var r = 0, i = this.hierarchy.length; i > r; r++) {
                    var n = this.hierarchy[r],
                        o = this.data.hierarchy[r],
                        a = o.keys,
                        s = o.animationCache;
                    if (a.length) {
                        var h = s.prevKey,
                            l = s.nextKey;
                        if (l.time <= this.currentTime) {
                            for (; l.time < this.currentTime && l.index > h.index;) h = l, l = a[h.index + 1];
                            s.prevKey = h, s.nextKey = l
                        }
                        l.time >= this.currentTime ? h.interpolate(l, this.currentTime) : h.interpolate(l, l.time), this.data.hierarchy[r].node.updateMatrix(), n.matrixWorldNeedsUpdate = !0
                    }
                }
            }
        }, n.KeyFrameAnimation.prototype.getNextKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (r %= i.length; r < i.length; r++)
                if (i[r].hasTarget(e)) return i[r];
            return i[0]
        }, n.KeyFrameAnimation.prototype.getPrevKeyWith = function(e, t, r) {
            var i = this.data.hierarchy[t].keys;
            for (r = r >= 0 ? r : r + i.length; r >= 0; r--)
                if (i[r].hasTarget(e)) return i[r];
            return i[i.length - 1]
        }, n.MorphAnimation = function(e) {
            this.mesh = e, this.frames = e.morphTargetInfluences.length, this.currentTime = 0, this.duration = 1e3, this.loop = !0, this.isPlaying = !1
        }, n.MorphAnimation.prototype = {
            play: function() {
                this.isPlaying = !0
            },
            pause: function() {
                this.isPlaying = !1
            },
            update: function() {
                var e = 0,
                    t = 0;
                return function(r) {
                    if (this.isPlaying !== !1) {
                        this.currentTime += r, this.loop === !0 && this.currentTime > this.duration && (this.currentTime %= this.duration), this.currentTime = Math.min(this.currentTime, this.duration);
                        var i = this.duration / this.frames,
                            n = Math.floor(this.currentTime / i);
                        n != t && (this.mesh.morphTargetInfluences[e] = 0, this.mesh.morphTargetInfluences[t] = 1, this.mesh.morphTargetInfluences[n] = 0, e = t, t = n), this.mesh.morphTargetInfluences[n] = this.currentTime % i / i, this.mesh.morphTargetInfluences[e] = 1 - this.mesh.morphTargetInfluences[n]
                    }
                }
            }()
        }, n.BoxGeometry = function(e, t, r, i, o, a) {
            function s(e, t, r, i, o, a, s, l) {
                var c, u, f, p = h.widthSegments,
                    d = h.heightSegments,
                    m = o / 2,
                    v = a / 2,
                    g = h.vertices.length;
                "x" === e && "y" === t || "y" === e && "x" === t ? c = "z" : "x" === e && "z" === t || "z" === e && "x" === t ? (c = "y", d = h.depthSegments) : ("z" === e && "y" === t || "y" === e && "z" === t) && (c = "x", p = h.depthSegments);
                var y = p + 1,
                    x = d + 1,
                    _ = o / p,
                    b = a / d,
                    w = new n.Vector3;
                for (w[c] = s > 0 ? 1 : -1, f = 0; x > f; f++)
                    for (u = 0; y > u; u++) {
                        var M = new n.Vector3;
                        M[e] = (u * _ - m) * r, M[t] = (f * b - v) * i, M[c] = s, h.vertices.push(M)
                    }
                for (f = 0; d > f; f++)
                    for (u = 0; p > u; u++) {
                        var S = u + y * f,
                            T = u + y * (f + 1),
                            C = u + 1 + y * (f + 1),
                            E = u + 1 + y * f,
                            A = new n.Vector2(u / p, 1 - f / d),
                            L = new n.Vector2(u / p, 1 - (f + 1) / d),
                            P = new n.Vector2((u + 1) / p, 1 - (f + 1) / d),
                            R = new n.Vector2((u + 1) / p, 1 - f / d),
                            F = new n.Face3(S + g, T + g, E + g);
                        F.normal.copy(w), F.vertexNormals.push(w.clone(), w.clone(), w.clone()), F.materialIndex = l, h.faces.push(F), h.faceVertexUvs[0].push([A, L, R]), F = new n.Face3(T + g, C + g, E + g), F.normal.copy(w), F.vertexNormals.push(w.clone(), w.clone(), w.clone()), F.materialIndex = l, h.faces.push(F), h.faceVertexUvs[0].push([L.clone(), P, R.clone()])
                    }
            }
            n.Geometry.call(this), this.type = "BoxGeometry", this.parameters = {
                width: e,
                height: t,
                depth: r,
                widthSegments: i,
                heightSegments: o,
                depthSegments: a
            }, this.widthSegments = i || 1, this.heightSegments = o || 1, this.depthSegments = a || 1;
            var h = this,
                l = e / 2,
                c = t / 2,
                u = r / 2;
            s("z", "y", -1, -1, r, t, l, 0), s("z", "y", 1, -1, r, t, -l, 1), s("x", "z", 1, 1, e, r, c, 2), s("x", "z", 1, -1, e, r, -c, 3), s("x", "y", 1, -1, e, t, u, 4), s("x", "y", -1, -1, e, t, -u, 5), this.mergeVertices()
        }, n.BoxGeometry.prototype = Object.create(n.Geometry.prototype), n.CircleGeometry = function(e, t, r, i) {
            n.Geometry.call(this), this.type = "CircleGeometry", this.parameters = {
                radius: e,
                segments: t,
                thetaStart: r,
                thetaLength: i
            }, e = e || 50, t = void 0 !== t ? Math.max(3, t) : 8, r = void 0 !== r ? r : 0, i = void 0 !== i ? i : 2 * Math.PI;
            var o, a = [],
                s = new n.Vector3,
                h = new n.Vector2(.5, .5);
            for (this.vertices.push(s), a.push(h), o = 0; t >= o; o++) {
                var l = new n.Vector3,
                    c = r + o / t * i;
                l.x = e * Math.cos(c), l.y = e * Math.sin(c), this.vertices.push(l), a.push(new n.Vector2((l.x / e + 1) / 2, (l.y / e + 1) / 2))
            }
            var u = new n.Vector3(0, 0, 1);
            for (o = 1; t >= o; o++) this.faces.push(new n.Face3(o, o + 1, 0, [u.clone(), u.clone(), u.clone()])), this.faceVertexUvs[0].push([a[o].clone(), a[o + 1].clone(), h.clone()]);
            this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, e)
        }, n.CircleGeometry.prototype = Object.create(n.Geometry.prototype), n.CubeGeometry = function(e, t, r, i, o, a) {
            return console.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry."), new n.BoxGeometry(e, t, r, i, o, a)
        }, n.CylinderGeometry = function(e, t, r, i, o, a) {
            n.Geometry.call(this), this.type = "CylinderGeometry", this.parameters = {
                radiusTop: e,
                radiusBottom: t,
                height: r,
                radialSegments: i,
                heightSegments: o,
                openEnded: a
            }, e = void 0 !== e ? e : 20, t = void 0 !== t ? t : 20, r = void 0 !== r ? r : 100, i = i || 8, o = o || 1, a = void 0 !== a ? a : !1;
            var s, h, l = r / 2,
                c = [],
                u = [];
            for (h = 0; o >= h; h++) {
                var f = [],
                    p = [],
                    d = h / o,
                    m = d * (t - e) + e;
                for (s = 0; i >= s; s++) {
                    var v = s / i,
                        g = new n.Vector3;
                    g.x = m * Math.sin(v * Math.PI * 2), g.y = -d * r + l, g.z = m * Math.cos(v * Math.PI * 2), this.vertices.push(g), f.push(this.vertices.length - 1), p.push(new n.Vector2(v, 1 - d))
                }
                c.push(f), u.push(p)
            }
            var y, x, _ = (t - e) / r;
            for (s = 0; i > s; s++)
                for (0 !== e ? (y = this.vertices[c[0][s]].clone(), x = this.vertices[c[0][s + 1]].clone()) : (y = this.vertices[c[1][s]].clone(), x = this.vertices[c[1][s + 1]].clone()), y.setY(Math.sqrt(y.x * y.x + y.z * y.z) * _).normalize(), x.setY(Math.sqrt(x.x * x.x + x.z * x.z) * _).normalize(), h = 0; o > h; h++) {
                    var b = c[h][s],
                        w = c[h + 1][s],
                        M = c[h + 1][s + 1],
                        S = c[h][s + 1],
                        T = y.clone(),
                        C = y.clone(),
                        E = x.clone(),
                        A = x.clone(),
                        L = u[h][s].clone(),
                        P = u[h + 1][s].clone(),
                        R = u[h + 1][s + 1].clone(),
                        F = u[h][s + 1].clone();
                    this.faces.push(new n.Face3(b, w, S, [T, C, A])), this.faceVertexUvs[0].push([L, P, F]), this.faces.push(new n.Face3(w, M, S, [C.clone(), E, A.clone()])), this.faceVertexUvs[0].push([P.clone(), R, F.clone()])
                }
            if (a === !1 && e > 0)
                for (this.vertices.push(new n.Vector3(0, l, 0)), s = 0; i > s; s++) {
                    var b = c[0][s],
                        w = c[0][s + 1],
                        M = this.vertices.length - 1,
                        T = new n.Vector3(0, 1, 0),
                        C = new n.Vector3(0, 1, 0),
                        E = new n.Vector3(0, 1, 0),
                        L = u[0][s].clone(),
                        P = u[0][s + 1].clone(),
                        R = new n.Vector2(P.x, 0);
                    this.faces.push(new n.Face3(b, w, M, [T, C, E])), this.faceVertexUvs[0].push([L, P, R])
                }
            if (a === !1 && t > 0)
                for (this.vertices.push(new n.Vector3(0, -l, 0)), s = 0; i > s; s++) {
                    var b = c[h][s + 1],
                        w = c[h][s],
                        M = this.vertices.length - 1,
                        T = new n.Vector3(0, -1, 0),
                        C = new n.Vector3(0, -1, 0),
                        E = new n.Vector3(0, -1, 0),
                        L = u[h][s + 1].clone(),
                        P = u[h][s].clone(),
                        R = new n.Vector2(P.x, 1);
                    this.faces.push(new n.Face3(b, w, M, [T, C, E])), this.faceVertexUvs[0].push([L, P, R])
                }
            this.computeFaceNormals()
        }, n.CylinderGeometry.prototype = Object.create(n.Geometry.prototype), n.ExtrudeGeometry = function(e, t) {
            return "undefined" == typeof e ? void(e = []) : (n.Geometry.call(this), this.type = "ExtrudeGeometry", e = e instanceof Array ? e : [e], this.addShapeList(e, t), void this.computeFaceNormals())
        }, n.ExtrudeGeometry.prototype = Object.create(n.Geometry.prototype), n.ExtrudeGeometry.prototype.addShapeList = function(e, t) {
            for (var r = e.length, i = 0; r > i; i++) {
                var n = e[i];
                this.addShape(n, t)
            }
        }, n.ExtrudeGeometry.prototype.addShape = function(e, t) {
            function r(e, t, r) {
                return t || console.log("die"), t.clone().multiplyScalar(r).add(e)
            }
            function i(e, t, r) {
                var i, o, a = 1e-10,
                    s = 1,
                    h = e.x - t.x,
                    l = e.y - t.y,
                    c = r.x - e.x,
                    u = r.y - e.y,
                    f = h * h + l * l,
                    p = h * u - l * c;
                if (Math.abs(p) > a) {
                    var d = Math.sqrt(f),
                        m = Math.sqrt(c * c + u * u),
                        v = t.x - l / d,
                        g = t.y + h / d,
                        y = r.x - u / m,
                        x = r.y + c / m,
                        _ = ((y - v) * u - (x - g) * c) / (h * u - l * c);
                    i = v + h * _ - e.x, o = g + l * _ - e.y;
                    var b = i * i + o * o;
                    if (2 >= b) return new n.Vector2(i, o);
                    s = Math.sqrt(b / 2)
                } else {
                    var w = !1;
                    h > a ? c > a && (w = !0) : -a > h ? -a > c && (w = !0) : Math.sign(l) == Math.sign(u) && (w = !0), w ? (i = -l, o = h, s = Math.sqrt(f)) : (i = h, o = l, s = Math.sqrt(f / 2))
                }
                return new n.Vector2(i / s, o / s)
            }
            function o() {
                if (_) {
                    var e = 0,
                        t = j * e;
                    for (Y = 0; X > Y; Y++) W = V[Y], l(W[2] + t, W[1] + t, W[0] + t);
                    for (e = w + 2 * x, t = j * e, Y = 0; X > Y; Y++) W = V[Y], l(W[0] + t, W[1] + t, W[2] + t)
                } else {
                    for (Y = 0; X > Y; Y++) W = V[Y], l(W[2], W[1], W[0]);
                    for (Y = 0; X > Y; Y++) W = V[Y], l(W[0] + j * w, W[1] + j * w, W[2] + j * w)
                }
            }
            function a() {
                var e = 0;
                for (s(k, e), e += k.length, L = 0, P = z.length; P > L; L++) A = z[L], s(A, e), e += A.length
            }
            function s(e, t) {
                var r, i;
                for (Y = e.length; --Y >= 0;) {
                    r = Y, i = Y - 1, 0 > i && (i = e.length - 1);
                    var n = 0,
                        o = w + 2 * x;
                    for (n = 0; o > n; n++) {
                        var a = j * n,
                            s = j * (n + 1),
                            h = t + r + a,
                            l = t + i + a,
                            u = t + i + s,
                            f = t + r + s;
                        c(h, l, u, f, e, n, o, r, i)
                    }
                }
            }
            function h(e, t, r) {
                R.vertices.push(new n.Vector3(e, t, r))
            }
            function l(e, t, r) {
                e += F, t += F, r += F, R.faces.push(new n.Face3(e, t, r, null, null, T));
                var i = E.generateTopUV(R, e, t, r);
                R.faceVertexUvs[0].push(i)
            }
            function c(e, t, r, i, o, a, s, h, l) {
                e += F, t += F, r += F, i += F, R.faces.push(new n.Face3(e, t, i, null, null, C)), R.faces.push(new n.Face3(t, r, i, null, null, C));
                var c = E.generateSideWallUV(R, e, t, r, i);
                R.faceVertexUvs[0].push([c[0], c[1], c[3]]), R.faceVertexUvs[0].push([c[1], c[2], c[3]])
            }
            var u, f, p, d, m, v = void 0 !== t.amount ? t.amount : 100,
                g = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
                y = void 0 !== t.bevelSize ? t.bevelSize : g - 2,
                x = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
                _ = void 0 !== t.bevelEnabled ? t.bevelEnabled : !0,
                b = void 0 !== t.curveSegments ? t.curveSegments : 12,
                w = void 0 !== t.steps ? t.steps : 1,
                M = t.extrudePath,
                S = !1,
                T = t.material,
                C = t.extrudeMaterial,
                E = void 0 !== t.UVGenerator ? t.UVGenerator : n.ExtrudeGeometry.WorldUVGenerator;
            M && (u = M.getSpacedPoints(w), S = !0, _ = !1, f = void 0 !== t.frames ? t.frames : new n.TubeGeometry.FrenetFrames(M, w, !1), p = new n.Vector3, d = new n.Vector3, m = new n.Vector3), _ || (x = 0, g = 0, y = 0);
            var A, L, P, R = this,
                F = this.vertices.length,
                D = e.extractPoints(b),
                U = D.shape,
                z = D.holes,
                B = !n.Shape.Utils.isClockWise(U);
            if (B) {
                for (U = U.reverse(), L = 0, P = z.length; P > L; L++) A = z[L], n.Shape.Utils.isClockWise(A) && (z[L] = A.reverse());
                B = !1
            }
            var V = n.Shape.Utils.triangulateShape(U, z),
                k = U;
            for (L = 0, P = z.length; P > L; L++) A = z[L], U = U.concat(A);
            for (var N, O, I, G, H, W, j = U.length, X = V.length, q = (k.length, 180 / Math.PI, []), Y = 0, K = k.length, Z = K - 1, Q = Y + 1; K > Y; Y++, Z++, Q++) {
                Z === K && (Z = 0), Q === K && (Q = 0);
                k[Y], k[Z], k[Q];
                q[Y] = i(k[Y], k[Z], k[Q])
            }
            var J, $ = [],
                ee = q.concat();
            for (L = 0, P = z.length; P > L; L++) {
                for (A = z[L], J = [], Y = 0, K = A.length, Z = K - 1, Q = Y + 1; K > Y; Y++, Z++, Q++) Z === K && (Z = 0), Q === K && (Q = 0), J[Y] = i(A[Y], A[Z], A[Q]);
                $.push(J), ee = ee.concat(J)
            }
            for (N = 0; x > N; N++) {
                for (I = N / x, G = g * (1 - I), O = y * Math.sin(I * Math.PI / 2), Y = 0, K = k.length; K > Y; Y++) H = r(k[Y], q[Y], O), h(H.x, H.y, -G);
                for (L = 0, P = z.length; P > L; L++)
                    for (A = z[L], J = $[L], Y = 0, K = A.length; K > Y; Y++) H = r(A[Y], J[Y], O), h(H.x, H.y, -G)
            }
            for (O = y, Y = 0; j > Y; Y++) H = _ ? r(U[Y], ee[Y], O) : U[Y], S ? (d.copy(f.normals[0]).multiplyScalar(H.x), p.copy(f.binormals[0]).multiplyScalar(H.y), m.copy(u[0]).add(d).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, 0);
            var te;
            for (te = 1; w >= te; te++)
                for (Y = 0; j > Y; Y++) H = _ ? r(U[Y], ee[Y], O) : U[Y], S ? (d.copy(f.normals[te]).multiplyScalar(H.x), p.copy(f.binormals[te]).multiplyScalar(H.y), m.copy(u[te]).add(d).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, v / w * te);
            for (N = x - 1; N >= 0; N--) {
                for (I = N / x, G = g * (1 - I), O = y * Math.sin(I * Math.PI / 2), Y = 0, K = k.length; K > Y; Y++) H = r(k[Y], q[Y], O), h(H.x, H.y, v + G);
                for (L = 0, P = z.length; P > L; L++)
                    for (A = z[L], J = $[L], Y = 0, K = A.length; K > Y; Y++) H = r(A[Y], J[Y], O), S ? h(H.x, H.y + u[w - 1].y, u[w - 1].x + G) : h(H.x, H.y, v + G)
            }
            o(), a()
        }, n.ExtrudeGeometry.WorldUVGenerator = {
            generateTopUV: function(e, t, r, i) {
                var o = e.vertices,
                    a = o[t],
                    s = o[r],
                    h = o[i];
                return [new n.Vector2(a.x, a.y), new n.Vector2(s.x, s.y), new n.Vector2(h.x, h.y)]
            },
            generateSideWallUV: function(e, t, r, i, o) {
                var a = e.vertices,
                    s = a[t],
                    h = a[r],
                    l = a[i],
                    c = a[o];
                return Math.abs(s.y - h.y) < .01 ? [new n.Vector2(s.x, 1 - s.z), new n.Vector2(h.x, 1 - h.z), new n.Vector2(l.x, 1 - l.z), new n.Vector2(c.x, 1 - c.z)] : [new n.Vector2(s.y, 1 - s.z), new n.Vector2(h.y, 1 - h.z), new n.Vector2(l.y, 1 - l.z), new n.Vector2(c.y, 1 - c.z)]
            }
        }, n.ShapeGeometry = function(e, t) {
            n.Geometry.call(this), this.type = "ShapeGeometry", e instanceof Array == !1 && (e = [e]), this.addShapeList(e, t), this.computeFaceNormals()
        }, n.ShapeGeometry.prototype = Object.create(n.Geometry.prototype), n.ShapeGeometry.prototype.addShapeList = function(e, t) {
            for (var r = 0, i = e.length; i > r; r++) this.addShape(e[r], t);
            return this
        }, n.ShapeGeometry.prototype.addShape = function(e, t) {
            void 0 === t && (t = {});
            var r, i, o, a = void 0 !== t.curveSegments ? t.curveSegments : 12,
                s = t.material,
                h = void 0 === t.UVGenerator ? n.ExtrudeGeometry.WorldUVGenerator : t.UVGenerator,
                l = this.vertices.length,
                c = e.extractPoints(a),
                u = c.shape,
                f = c.holes,
                p = !n.Shape.Utils.isClockWise(u);
            if (p) {
                for (u = u.reverse(), r = 0, i = f.length; i > r; r++) o = f[r], n.Shape.Utils.isClockWise(o) && (f[r] = o.reverse());
                p = !1
            }
            var d = n.Shape.Utils.triangulateShape(u, f),
                m = u;
            for (r = 0, i = f.length; i > r; r++) o = f[r], u = u.concat(o);
            var v, g, y = u.length,
                x = d.length;
            m.length;
            for (r = 0; y > r; r++) v = u[r], this.vertices.push(new n.Vector3(v.x, v.y, 0));
            for (r = 0; x > r; r++) {
                g = d[r];
                var _ = g[0] + l,
                    b = g[1] + l,
                    w = g[2] + l;
                this.faces.push(new n.Face3(_, b, w, null, null, s)), this.faceVertexUvs[0].push(h.generateTopUV(this, _, b, w))
            }
        }, n.LatheGeometry = function(e, t, r, i) {
            n.Geometry.call(this), this.type = "LatheGeometry", this.parameters = {
                points: e,
                segments: t,
                phiStart: r,
                phiLength: i
            }, t = t || 12, r = r || 0, i = i || 2 * Math.PI;
            for (var o = 1 / (e.length - 1), a = 1 / t, s = 0, h = t; h >= s; s++)
                for (var l = r + s * a * i, c = Math.cos(l), u = Math.sin(l), f = 0, p = e.length; p > f; f++) {
                    var d = e[f],
                        m = new n.Vector3;
                    m.x = c * d.x - u * d.y, m.y = u * d.x + c * d.y, m.z = d.z, this.vertices.push(m)
                }
            for (var v = e.length, s = 0, h = t; h > s; s++)
                for (var f = 0, p = e.length - 1; p > f; f++) {
                    var g = f + v * s,
                        y = g,
                        x = g + v,
                        c = g + 1 + v,
                        _ = g + 1,
                        b = s * a,
                        w = f * o,
                        M = b + a,
                        S = w + o;
                    this.faces.push(new n.Face3(y, x, _)), this.faceVertexUvs[0].push([new n.Vector2(b, w), new n.Vector2(M, w), new n.Vector2(b, S)]), this.faces.push(new n.Face3(x, c, _)), this.faceVertexUvs[0].push([new n.Vector2(M, w), new n.Vector2(M, S), new n.Vector2(b, S)])
                }
            this.mergeVertices(), this.computeFaceNormals(), this.computeVertexNormals()
        }, n.LatheGeometry.prototype = Object.create(n.Geometry.prototype), n.PlaneGeometry = function(e, t, r, i) {
            console.info("THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint."), n.Geometry.call(this), this.type = "PlaneGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: r,
                heightSegments: i
            }, this.fromBufferGeometry(new n.PlaneBufferGeometry(e, t, r, i))
        }, n.PlaneGeometry.prototype = Object.create(n.Geometry.prototype), n.PlaneBufferGeometry = function(e, t, r, i) {
            n.BufferGeometry.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: r,
                heightSegments: i
            };
            for (var o = e / 2, a = t / 2, s = r || 1, h = i || 1, l = s + 1, c = h + 1, u = e / s, f = t / h, p = new Float32Array(l * c * 3), d = new Float32Array(l * c * 3), m = new Float32Array(l * c * 2), v = 0, g = 0, y = 0; c > y; y++)
                for (var x = y * f - a, _ = 0; l > _; _++) {
                    var b = _ * u - o;
                    p[v] = b, p[v + 1] = -x, d[v + 2] = 1, m[g] = _ / s, m[g + 1] = 1 - y / h, v += 3, g += 2
                }
            v = 0;
            for (var w = new(p.length / 3 > 65535 ? Uint32Array : Uint16Array)(s * h * 6), y = 0; h > y; y++)
                for (var _ = 0; s > _; _++) {
                    var M = _ + l * y,
                        S = _ + l * (y + 1),
                        T = _ + 1 + l * (y + 1),
                        C = _ + 1 + l * y;
                    w[v] = M, w[v + 1] = S, w[v + 2] = C, w[v + 3] = S, w[v + 4] = T, w[v + 5] = C, v += 6
                }
            this.addAttribute("index", new n.BufferAttribute(w, 1)), this.addAttribute("position", new n.BufferAttribute(p, 3)), this.addAttribute("normal", new n.BufferAttribute(d, 3)), this.addAttribute("uv", new n.BufferAttribute(m, 2))
        }, n.PlaneBufferGeometry.prototype = Object.create(n.BufferGeometry.prototype), n.RingGeometry = function(e, t, r, i, o, a) {
            n.Geometry.call(this), this.type = "RingGeometry", this.parameters = {
                innerRadius: e,
                outerRadius: t,
                thetaSegments: r,
                phiSegments: i,
                thetaStart: o,
                thetaLength: a
            }, e = e || 0, t = t || 50, o = void 0 !== o ? o : 0, a = void 0 !== a ? a : 2 * Math.PI, r = void 0 !== r ? Math.max(3, r) : 8, i = void 0 !== i ? Math.max(1, i) : 8;
            var s, h, l = [],
                c = e,
                u = (t - e) / i;
            for (s = 0; i + 1 > s; s++) {
                for (h = 0; r + 1 > h; h++) {
                    var f = new n.Vector3,
                        p = o + h / r * a;
                    f.x = c * Math.cos(p), f.y = c * Math.sin(p), this.vertices.push(f), l.push(new n.Vector2((f.x / t + 1) / 2, (f.y / t + 1) / 2))
                }
                c += u
            }
            var d = new n.Vector3(0, 0, 1);
            for (s = 0; i > s; s++) {
                var m = s * (r + 1);
                for (h = 0; r > h; h++) {
                    var p = h + m,
                        v = p,
                        g = p + r + 1,
                        y = p + r + 2;
                    this.faces.push(new n.Face3(v, g, y, [d.clone(), d.clone(), d.clone()])), this.faceVertexUvs[0].push([l[v].clone(), l[g].clone(), l[y].clone()]), v = p, g = p + r + 2, y = p + 1, this.faces.push(new n.Face3(v, g, y, [d.clone(), d.clone(), d.clone()])), this.faceVertexUvs[0].push([l[v].clone(), l[g].clone(), l[y].clone()])
                }
            }
            this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, c)
        }, n.RingGeometry.prototype = Object.create(n.Geometry.prototype), n.SphereGeometry = function(e, t, r, i, o, a, s) {
            n.Geometry.call(this), this.type = "SphereGeometry", this.parameters = {
                radius: e,
                widthSegments: t,
                heightSegments: r,
                phiStart: i,
                phiLength: o,
                thetaStart: a,
                thetaLength: s
            }, e = e || 50, t = Math.max(3, Math.floor(t) || 8), r = Math.max(2, Math.floor(r) || 6), i = void 0 !== i ? i : 0, o = void 0 !== o ? o : 2 * Math.PI, a = void 0 !== a ? a : 0, s = void 0 !== s ? s : Math.PI;
            var h, l, c = [],
                u = [];
            for (l = 0; r >= l; l++) {
                var f = [],
                    p = [];
                for (h = 0; t >= h; h++) {
                    var d = h / t,
                        m = l / r,
                        v = new n.Vector3;
                    v.x = -e * Math.cos(i + d * o) * Math.sin(a + m * s), v.y = e * Math.cos(a + m * s), v.z = e * Math.sin(i + d * o) * Math.sin(a + m * s), this.vertices.push(v), f.push(this.vertices.length - 1), p.push(new n.Vector2(d, 1 - m))
                }
                c.push(f), u.push(p)
            }
            for (l = 0; r > l; l++)
                for (h = 0; t > h; h++) {
                    var g = c[l][h + 1],
                        y = c[l][h],
                        x = c[l + 1][h],
                        _ = c[l + 1][h + 1],
                        b = this.vertices[g].clone().normalize(),
                        w = this.vertices[y].clone().normalize(),
                        M = this.vertices[x].clone().normalize(),
                        S = this.vertices[_].clone().normalize(),
                        T = u[l][h + 1].clone(),
                        C = u[l][h].clone(),
                        E = u[l + 1][h].clone(),
                        A = u[l + 1][h + 1].clone();
                    Math.abs(this.vertices[g].y) === e ? (T.x = (T.x + C.x) / 2, this.faces.push(new n.Face3(g, x, _, [b, M, S])), this.faceVertexUvs[0].push([T, E, A])) : Math.abs(this.vertices[x].y) === e ? (E.x = (E.x + A.x) / 2, this.faces.push(new n.Face3(g, y, x, [b, w, M])), this.faceVertexUvs[0].push([T, C, E])) : (this.faces.push(new n.Face3(g, y, _, [b, w, S])), this.faceVertexUvs[0].push([T, C, A]), this.faces.push(new n.Face3(y, x, _, [w.clone(), M, S.clone()])), this.faceVertexUvs[0].push([C.clone(), E, A.clone()]))
                }
            this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, e)
        }, n.SphereGeometry.prototype = Object.create(n.Geometry.prototype), n.TextGeometry = function(e, t) {
            t = t || {};
            var r = n.FontUtils.generateShapes(e, t);
            t.amount = void 0 !== t.height ? t.height : 50, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), n.ExtrudeGeometry.call(this, r, t), this.type = "TextGeometry"
        }, n.TextGeometry.prototype = Object.create(n.ExtrudeGeometry.prototype), n.TorusGeometry = function(e, t, r, i, o) {
            n.Geometry.call(this), this.type = "TorusGeometry", this.parameters = {
                radius: e,
                tube: t,
                radialSegments: r,
                tubularSegments: i,
                arc: o
            }, e = e || 100, t = t || 40, r = r || 8, i = i || 6, o = o || 2 * Math.PI;
            for (var a = new n.Vector3, s = [], h = [], l = 0; r >= l; l++)
                for (var c = 0; i >= c; c++) {
                    var u = c / i * o,
                        f = l / r * Math.PI * 2;
                    a.x = e * Math.cos(u), a.y = e * Math.sin(u);
                    var p = new n.Vector3;
                    p.x = (e + t * Math.cos(f)) * Math.cos(u), p.y = (e + t * Math.cos(f)) * Math.sin(u), p.z = t * Math.sin(f), this.vertices.push(p), s.push(new n.Vector2(c / i, l / r)), h.push(p.clone().sub(a).normalize())
                }
            for (var l = 1; r >= l; l++)
                for (var c = 1; i >= c; c++) {
                    var d = (i + 1) * l + c - 1,
                        m = (i + 1) * (l - 1) + c - 1,
                        v = (i + 1) * (l - 1) + c,
                        g = (i + 1) * l + c,
                        y = new n.Face3(d, m, g, [h[d].clone(), h[m].clone(), h[g].clone()]);
                    this.faces.push(y), this.faceVertexUvs[0].push([s[d].clone(), s[m].clone(), s[g].clone()]), y = new n.Face3(m, v, g, [h[m].clone(), h[v].clone(), h[g].clone()]), this.faces.push(y), this.faceVertexUvs[0].push([s[m].clone(), s[v].clone(), s[g].clone()])
                }
            this.computeFaceNormals()
        }, n.TorusGeometry.prototype = Object.create(n.Geometry.prototype), n.TorusKnotGeometry = function(e, t, r, i, o, a, s) {
            function h(e, t, r, i, o) {
                var a = Math.cos(e),
                    s = Math.sin(e),
                    h = t / r * e,
                    l = Math.cos(h),
                    c = i * (2 + l) * .5 * a,
                    u = i * (2 + l) * s * .5,
                    f = o * i * Math.sin(h) * .5;
                return new n.Vector3(c, u, f)
            }
            n.Geometry.call(this), this.type = "TorusKnotGeometry", this.parameters = {
                radius: e,
                tube: t,
                radialSegments: r,
                tubularSegments: i,
                p: o,
                q: a,
                heightScale: s
            }, e = e || 100, t = t || 40, r = r || 64, i = i || 8, o = o || 2, a = a || 3, s = s || 1;
            for (var l = new Array(r), c = new n.Vector3, u = new n.Vector3, f = new n.Vector3, p = 0; r > p; ++p) {
                l[p] = new Array(i);
                var d = p / r * 2 * o * Math.PI,
                    m = h(d, a, o, e, s),
                    v = h(d + .01, a, o, e, s);
                c.subVectors(v, m), u.addVectors(v, m), f.crossVectors(c, u), u.crossVectors(f, c), f.normalize(), u.normalize();
                for (var g = 0; i > g; ++g) {
                    var y = g / i * 2 * Math.PI,
                        x = -t * Math.cos(y),
                        _ = t * Math.sin(y),
                        b = new n.Vector3;
                    b.x = m.x + x * u.x + _ * f.x, b.y = m.y + x * u.y + _ * f.y, b.z = m.z + x * u.z + _ * f.z, l[p][g] = this.vertices.push(b) - 1
                }
            }
            for (var p = 0; r > p; ++p)
                for (var g = 0; i > g; ++g) {
                    var w = (p + 1) % r,
                        M = (g + 1) % i,
                        S = l[p][g],
                        T = l[w][g],
                        C = l[w][M],
                        E = l[p][M],
                        A = new n.Vector2(p / r, g / i),
                        L = new n.Vector2((p + 1) / r, g / i),
                        P = new n.Vector2((p + 1) / r, (g + 1) / i),
                        R = new n.Vector2(p / r, (g + 1) / i);
                    this.faces.push(new n.Face3(S, T, E)), this.faceVertexUvs[0].push([A, L, R]), this.faces.push(new n.Face3(T, C, E)), this.faceVertexUvs[0].push([L.clone(), P, R.clone()])
                }
            this.computeFaceNormals(), this.computeVertexNormals()
        }, n.TorusKnotGeometry.prototype = Object.create(n.Geometry.prototype), n.TubeGeometry = function(e, t, r, i, o) {
            function a(e, t, r) {
                return A.vertices.push(new n.Vector3(e, t, r)) - 1
            }
            n.Geometry.call(this), this.type = "TubeGeometry", this.parameters = {
                path: e,
                segments: t,
                radius: r,
                radialSegments: i,
                closed: o
            }, t = t || 64, r = r || 1, i = i || 8, o = o || !1;
            var s, h, l, c, u, f, p, d, m, v, g, y, x, _, b, w, M, S, T, C, E = [],
                A = this,
                L = t + 1,
                P = new n.Vector3,
                R = new n.TubeGeometry.FrenetFrames(e, t, o),
                F = R.tangents,
                D = R.normals,
                U = R.binormals;
            for (this.tangents = F, this.normals = D, this.binormals = U, m = 0; L > m; m++)
                for (E[m] = [], c = m / (L - 1), d = e.getPointAt(c), s = F[m], h = D[m], l = U[m], v = 0; i > v; v++) u = v / i * 2 * Math.PI, f = -r * Math.cos(u), p = r * Math.sin(u), P.copy(d), P.x += f * h.x + p * l.x, P.y += f * h.y + p * l.y, P.z += f * h.z + p * l.z, E[m][v] = a(P.x, P.y, P.z);
            for (m = 0; t > m; m++)
                for (v = 0; i > v; v++) g = o ? (m + 1) % t : m + 1, y = (v + 1) % i, x = E[m][v], _ = E[g][v], b = E[g][y], w = E[m][y], M = new n.Vector2(m / t, v / i), S = new n.Vector2((m + 1) / t, v / i), T = new n.Vector2((m + 1) / t, (v + 1) / i), C = new n.Vector2(m / t, (v + 1) / i), this.faces.push(new n.Face3(x, _, w)), this.faceVertexUvs[0].push([M, S, C]), this.faces.push(new n.Face3(_, b, w)), this.faceVertexUvs[0].push([S.clone(), T, C.clone()]);
            this.computeFaceNormals(), this.computeVertexNormals()
        }, n.TubeGeometry.prototype = Object.create(n.Geometry.prototype), n.TubeGeometry.FrenetFrames = function(e, t, r) {
            function i() {
                d[0] = new n.Vector3, m[0] = new n.Vector3, a = Number.MAX_VALUE, s = Math.abs(p[0].x), h = Math.abs(p[0].y), l = Math.abs(p[0].z), a >= s && (a = s, f.set(1, 0, 0)), a >= h && (a = h, f.set(0, 1, 0)), a >= l && f.set(0, 0, 1), v.crossVectors(p[0], f).normalize(), d[0].crossVectors(p[0], v), m[0].crossVectors(p[0], d[0])
            }
            var o, a, s, h, l, c, u, f = (new n.Vector3, new n.Vector3),
                p = (new n.Vector3, []),
                d = [],
                m = [],
                v = new n.Vector3,
                g = new n.Matrix4,
                y = t + 1,
                x = 1e-4;
            for (this.tangents = p, this.normals = d, this.binormals = m, c = 0; y > c; c++) u = c / (y - 1), p[c] = e.getTangentAt(u), p[c].normalize();
            for (i(), c = 1; y > c; c++) d[c] = d[c - 1].clone(), m[c] = m[c - 1].clone(), v.crossVectors(p[c - 1], p[c]), v.length() > x && (v.normalize(), o = Math.acos(n.Math.clamp(p[c - 1].dot(p[c]), -1, 1)), d[c].applyMatrix4(g.makeRotationAxis(v, o))), m[c].crossVectors(p[c], d[c]);
            if (r)
                for (o = Math.acos(n.Math.clamp(d[0].dot(d[y - 1]), -1, 1)), o /= y - 1, p[0].dot(v.crossVectors(d[0], d[y - 1])) > 0 && (o = -o), c = 1; y > c; c++) d[c].applyMatrix4(g.makeRotationAxis(p[c], o * c)), m[c].crossVectors(p[c], d[c])
        }, n.PolyhedronGeometry = function(e, t, r, i) {
            function o(e) {
                var t = e.normalize().clone();
                t.index = u.vertices.push(t) - 1;
                var r = h(e) / 2 / Math.PI + .5,
                    i = l(e) / Math.PI + .5;
                return t.uv = new n.Vector2(r, 1 - i), t
            }
            function a(e, t, r) {
                var i = new n.Face3(e.index, t.index, r.index, [e.clone(), t.clone(), r.clone()]);
                u.faces.push(i), _.copy(e).add(t).add(r).divideScalar(3);
                var o = h(_);
                u.faceVertexUvs[0].push([c(e.uv, e, o), c(t.uv, t, o), c(r.uv, r, o)])
            }
            function s(e, t) {
                for (var r = Math.pow(2, t), i = (Math.pow(4, t), o(u.vertices[e.a])), n = o(u.vertices[e.b]), s = o(u.vertices[e.c]), h = [], l = 0; r >= l; l++) {
                    h[l] = [];
                    for (var c = o(i.clone().lerp(s, l / r)), f = o(n.clone().lerp(s, l / r)), p = r - l, d = 0; p >= d; d++) 0 == d && l == r ? h[l][d] = c : h[l][d] = o(c.clone().lerp(f, d / p))
                }
                for (var l = 0; r > l; l++)
                    for (var d = 0; 2 * (r - l) - 1 > d; d++) {
                        var m = Math.floor(d / 2);
                        d % 2 == 0 ? a(h[l][m + 1], h[l + 1][m], h[l][m]) : a(h[l][m + 1], h[l + 1][m + 1], h[l + 1][m])
                    }
            }
            function h(e) {
                return Math.atan2(e.z, -e.x)
            }
            function l(e) {
                return Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z))
            }
            function c(e, t, r) {
                return 0 > r && 1 === e.x && (e = new n.Vector2(e.x - 1, e.y)), 0 === t.x && 0 === t.z && (e = new n.Vector2(r / 2 / Math.PI + .5, e.y)), e.clone()
            }
            n.Geometry.call(this), this.type = "PolyhedronGeometry", this.parameters = {
                vertices: e,
                indices: t,
                radius: r,
                detail: i
            }, r = r || 1, i = i || 0;
            for (var u = this, f = 0, p = e.length; p > f; f += 3) o(new n.Vector3(e[f], e[f + 1], e[f + 2]));
            for (var d = this.vertices, m = [], f = 0, v = 0, p = t.length; p > f; f += 3, v++) {
                var g = d[t[f]],
                    y = d[t[f + 1]],
                    x = d[t[f + 2]];
                m[v] = new n.Face3(g.index, y.index, x.index, [g.clone(), y.clone(), x.clone()])
            }
            for (var _ = new n.Vector3, f = 0, p = m.length; p > f; f++) s(m[f], i);
            for (var f = 0, p = this.faceVertexUvs[0].length; p > f; f++) {
                var b = this.faceVertexUvs[0][f],
                    w = b[0].x,
                    M = b[1].x,
                    S = b[2].x,
                    T = Math.max(w, Math.max(M, S)),
                    C = Math.min(w, Math.min(M, S));
                T > .9 && .1 > C && (.2 > w && (b[0].x += 1), .2 > M && (b[1].x += 1), .2 > S && (b[2].x += 1))
            }
            for (var f = 0, p = this.vertices.length; p > f; f++) this.vertices[f].multiplyScalar(r);
            this.mergeVertices(), this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, r)
        }, n.PolyhedronGeometry.prototype = Object.create(n.Geometry.prototype), n.DodecahedronGeometry = function(e, t) {
            this.parameters = {
                radius: e,
                detail: t
            };
            var r = (1 + Math.sqrt(5)) / 2,
                i = 1 / r,
                o = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, 0, -r, 0, -i, r, 0, -i, -r, 0, i, r, 0, i],
                a = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
            n.PolyhedronGeometry.call(this, o, a, e, t)
        }, n.DodecahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.IcosahedronGeometry = function(e, t) {
            var r = (1 + Math.sqrt(5)) / 2,
                i = [-1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, 0, 0, -1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, r, 0, -1, r, 0, 1, -r, 0, -1, -r, 0, 1],
                o = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
            n.PolyhedronGeometry.call(this, i, o, e, t), this.type = "IcosahedronGeometry", this.parameters = {
                radius: e,
                detail: t
            }
        }, n.IcosahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.OctahedronGeometry = function(e, t) {
            this.parameters = {
                radius: e,
                detail: t
            };
            var r = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
                i = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
            n.PolyhedronGeometry.call(this, r, i, e, t), this.type = "OctahedronGeometry", this.parameters = {
                radius: e,
                detail: t
            }
        }, n.OctahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.TetrahedronGeometry = function(e, t) {
            var r = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
                i = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
            n.PolyhedronGeometry.call(this, r, i, e, t), this.type = "TetrahedronGeometry", this.parameters = {
                radius: e,
                detail: t
            }
        }, n.TetrahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.ParametricGeometry = function(e, t, r) {
            n.Geometry.call(this), this.type = "ParametricGeometry", this.parameters = {
                func: e,
                slices: t,
                stacks: r
            };
            var i, o, a, s, h, l = this.vertices,
                c = this.faces,
                u = this.faceVertexUvs[0],
                f = t + 1;
            for (i = 0; r >= i; i++)
                for (h = i / r, o = 0; t >= o; o++) s = o / t, a = e(s, h), l.push(a);
            var p, d, m, v, g, y, x, _;
            for (i = 0; r > i; i++)
                for (o = 0; t > o; o++) p = i * f + o, d = i * f + o + 1, m = (i + 1) * f + o + 1, v = (i + 1) * f + o, g = new n.Vector2(o / t, i / r), y = new n.Vector2((o + 1) / t, i / r), x = new n.Vector2((o + 1) / t, (i + 1) / r), _ = new n.Vector2(o / t, (i + 1) / r), c.push(new n.Face3(p, d, v)), u.push([g, y, _]), c.push(new n.Face3(d, m, v)), u.push([y.clone(), x, _.clone()]);
            this.computeFaceNormals(), this.computeVertexNormals()
        }, n.ParametricGeometry.prototype = Object.create(n.Geometry.prototype), n.AxisHelper = function(e) {
            e = e || 1;
            var t = new Float32Array([0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e]),
                r = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]),
                i = new n.BufferGeometry;
            i.addAttribute("position", new n.BufferAttribute(t, 3)), i.addAttribute("color", new n.BufferAttribute(r, 3));
            var o = new n.LineBasicMaterial({
                vertexColors: n.VertexColors
            });
            n.Line.call(this, i, o, n.LinePieces)
        }, n.AxisHelper.prototype = Object.create(n.Line.prototype), n.ArrowHelper = function() {
            var e = new n.Geometry;
            e.vertices.push(new n.Vector3(0, 0, 0), new n.Vector3(0, 1, 0));
            var t = new n.CylinderGeometry(0, .5, 1, 5, 1);
            return t.applyMatrix((new n.Matrix4).makeTranslation(0, -.5, 0)),
                function(r, i, o, a, s, h) {
                    n.Object3D.call(this), void 0 === a && (a = 16776960), void 0 === o && (o = 1), void 0 === s && (s = .2 * o), void 0 === h && (h = .2 * s), this.position.copy(i), this.line = new n.Line(e, new n.LineBasicMaterial({
                        color: a
                    })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new n.Mesh(t, new n.MeshBasicMaterial({
                        color: a
                    })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(r), this.setLength(o, s, h)
                }
        }(), n.ArrowHelper.prototype = Object.create(n.Object3D.prototype), n.ArrowHelper.prototype.setDirection = function() {
            var e, t = new n.Vector3;
            return function(r) {
                r.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : r.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (t.set(r.z, 0, -r.x).normalize(), e = Math.acos(r.y), this.quaternion.setFromAxisAngle(t, e))
            }
        }(), n.ArrowHelper.prototype.setLength = function(e, t, r) {
            void 0 === t && (t = .2 * e), void 0 === r && (r = .2 * t), this.line.scale.set(1, e, 1), this.line.updateMatrix(), this.cone.scale.set(r, t, r), this.cone.position.y = e, this.cone.updateMatrix()
        }, n.ArrowHelper.prototype.setColor = function(e) {
            this.line.material.color.set(e), this.cone.material.color.set(e)
        }, n.BoxHelper = function(e) {
            var t = new n.BufferGeometry;
            t.addAttribute("position", new n.BufferAttribute(new Float32Array(72), 3)), n.Line.call(this, t, new n.LineBasicMaterial({
                color: 16776960
            }), n.LinePieces), void 0 !== e && this.update(e)
        }, n.BoxHelper.prototype = Object.create(n.Line.prototype), n.BoxHelper.prototype.update = function(e) {
            var t = e.geometry;
            null === t.boundingBox && t.computeBoundingBox();
            var r = t.boundingBox.min,
                i = t.boundingBox.max,
                n = this.geometry.attributes.position.array;
            n[0] = i.x, n[1] = i.y, n[2] = i.z, n[3] = r.x, n[4] = i.y, n[5] = i.z, n[6] = r.x, n[7] = i.y, n[8] = i.z, n[9] = r.x, n[10] = r.y, n[11] = i.z, n[12] = r.x, n[13] = r.y, n[14] = i.z, n[15] = i.x, n[16] = r.y, n[17] = i.z, n[18] = i.x, n[19] = r.y, n[20] = i.z, n[21] = i.x, n[22] = i.y, n[23] = i.z, n[24] = i.x, n[25] = i.y, n[26] = r.z, n[27] = r.x, n[28] = i.y, n[29] = r.z, n[30] = r.x, n[31] = i.y, n[32] = r.z, n[33] = r.x, n[34] = r.y, n[35] = r.z, n[36] = r.x, n[37] = r.y, n[38] = r.z, n[39] = i.x, n[40] = r.y, n[41] = r.z, n[42] = i.x, n[43] = r.y, n[44] = r.z, n[45] = i.x, n[46] = i.y, n[47] = r.z, n[48] = i.x, n[49] = i.y, n[50] = i.z, n[51] = i.x, n[52] = i.y, n[53] = r.z, n[54] = r.x, n[55] = i.y, n[56] = i.z, n[57] = r.x, n[58] = i.y, n[59] = r.z, n[60] = r.x, n[61] = r.y, n[62] = i.z, n[63] = r.x, n[64] = r.y, n[65] = r.z, n[66] = i.x, n[67] = r.y, n[68] = i.z, n[69] = i.x, n[70] = r.y, n[71] = r.z, this.geometry.attributes.position.needsUpdate = !0, this.geometry.computeBoundingSphere(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
        }, n.BoundingBoxHelper = function(e, t) {
            var r = void 0 !== t ? t : 8947848;
            this.object = e, this.box = new n.Box3, n.Mesh.call(this, new n.BoxGeometry(1, 1, 1), new n.MeshBasicMaterial({
                color: r,
                wireframe: !0
            }))
        }, n.BoundingBoxHelper.prototype = Object.create(n.Mesh.prototype), n.BoundingBoxHelper.prototype.update = function() {
            this.box.setFromObject(this.object), this.box.size(this.scale), this.box.center(this.position)
        }, n.CameraHelper = function(e) {
            function t(e, t, i) {
                r(e, i), r(t, i)
            }
            function r(e, t) {
                i.vertices.push(new n.Vector3), i.colors.push(new n.Color(t)), void 0 === a[e] && (a[e] = []), a[e].push(i.vertices.length - 1)
            }
            var i = new n.Geometry,
                o = new n.LineBasicMaterial({
                    color: 16777215,
                    vertexColors: n.FaceColors
                }),
                a = {},
                s = 16755200,
                h = 16711680,
                l = 43775,
                c = 16777215,
                u = 3355443;
            t("n1", "n2", s), t("n2", "n4", s), t("n4", "n3", s), t("n3", "n1", s), t("f1", "f2", s), t("f2", "f4", s), t("f4", "f3", s), t("f3", "f1", s), t("n1", "f1", s), t("n2", "f2", s), t("n3", "f3", s), t("n4", "f4", s), t("p", "n1", h), t("p", "n2", h), t("p", "n3", h), t("p", "n4", h), t("u1", "u2", l), t("u2", "u3", l), t("u3", "u1", l), t("c", "t", c), t("p", "c", u), t("cn1", "cn2", u), t("cn3", "cn4", u), t("cf1", "cf2", u), t("cf3", "cf4", u), n.Line.call(this, i, o, n.LinePieces), this.camera = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
        }, n.CameraHelper.prototype = Object.create(n.Line.prototype), n.CameraHelper.prototype.update = function() {
            var e, t, r = new n.Vector3,
                i = new n.Camera,
                o = function(n, o, a, s) {
                    r.set(o, a, s).unproject(i);
                    var h = t[n];
                    if (void 0 !== h)
                        for (var l = 0, c = h.length; c > l; l++) e.vertices[h[l]].copy(r)
                };
            return function() {
                e = this.geometry, t = this.pointMap;
                var r = 1,
                    n = 1;
                i.projectionMatrix.copy(this.camera.projectionMatrix), o("c", 0, 0, -1), o("t", 0, 0, 1), o("n1", -r, -n, -1), o("n2", r, -n, -1), o("n3", -r, n, -1), o("n4", r, n, -1), o("f1", -r, -n, 1), o("f2", r, -n, 1), o("f3", -r, n, 1), o("f4", r, n, 1), o("u1", .7 * r, 1.1 * n, -1), o("u2", .7 * -r, 1.1 * n, -1), o("u3", 0, 2 * n, -1), o("cf1", -r, 0, 1), o("cf2", r, 0, 1), o("cf3", 0, -n, 1), o("cf4", 0, n, 1), o("cn1", -r, 0, -1), o("cn2", r, 0, -1), o("cn3", 0, -n, -1), o("cn4", 0, n, -1), e.verticesNeedUpdate = !0
            }
        }(), n.DirectionalLightHelper = function(e, t) {
            n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, t = t || 1;
            var r = new n.Geometry;
            r.vertices.push(new n.Vector3(-t, t, 0), new n.Vector3(t, t, 0), new n.Vector3(t, -t, 0), new n.Vector3(-t, -t, 0), new n.Vector3(-t, t, 0));
            var i = new n.LineBasicMaterial({
                fog: !1
            });
            i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightPlane = new n.Line(r, i), this.add(this.lightPlane), r = new n.Geometry, r.vertices.push(new n.Vector3, new n.Vector3), i = new n.LineBasicMaterial({
                fog: !1
            }), i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new n.Line(r, i), this.add(this.targetLine), this.update()
        }, n.DirectionalLightHelper.prototype = Object.create(n.Object3D.prototype), n.DirectionalLightHelper.prototype.dispose = function() {
            this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
        }, n.DirectionalLightHelper.prototype.update = function() {
            var e = new n.Vector3,
                t = new n.Vector3,
                r = new n.Vector3;
            return function() {
                e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), r.subVectors(t, e), this.lightPlane.lookAt(r), this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine.geometry.vertices[1].copy(r), this.targetLine.geometry.verticesNeedUpdate = !0, this.targetLine.material.color.copy(this.lightPlane.material.color)
            }
        }(), n.EdgesHelper = function(e, t) {
            var r = void 0 !== t ? t : 16777215,
                i = [0, 0],
                o = {},
                a = function(e, t) {
                    return e - t
                },
                s = ["a", "b", "c"],
                h = new n.BufferGeometry,
                l = e.geometry.clone();
            l.mergeVertices(), l.computeFaceNormals();
            for (var c = l.vertices, u = l.faces, f = 0, p = 0, d = u.length; d > p; p++)
                for (var m = u[p], v = 0; 3 > v; v++) {
                    i[0] = m[s[v]], i[1] = m[s[(v + 1) % 3]], i.sort(a);
                    var g = i.toString();
                    void 0 === o[g] ? (o[g] = {
                        vert1: i[0],
                        vert2: i[1],
                        face1: p,
                        face2: void 0
                    }, f++) : o[g].face2 = p
                }
            var y = new Float32Array(2 * f * 3),
                x = 0;
            for (var g in o) {
                var _ = o[g];
                if (void 0 === _.face2 || u[_.face1].normal.dot(u[_.face2].normal) < .9999) {
                    var b = c[_.vert1];
                    y[x++] = b.x, y[x++] = b.y, y[x++] = b.z, b = c[_.vert2], y[x++] = b.x, y[x++] = b.y, y[x++] = b.z
                }
            }
            h.addAttribute("position", new n.BufferAttribute(y, 3)), n.Line.call(this, h, new n.LineBasicMaterial({
                color: r
            }), n.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
        }, n.EdgesHelper.prototype = Object.create(n.Line.prototype), n.FaceNormalsHelper = function(e, t, r, i) {
            this.object = e, this.size = void 0 !== t ? t : 1;
            for (var o = void 0 !== r ? r : 16776960, a = void 0 !== i ? i : 1, s = new n.Geometry, h = this.object.geometry.faces, l = 0, c = h.length; c > l; l++) s.vertices.push(new n.Vector3, new n.Vector3);
            n.Line.call(this, s, new n.LineBasicMaterial({
                color: o,
                linewidth: a
            }), n.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new n.Matrix3, this.update()
        }, n.FaceNormalsHelper.prototype = Object.create(n.Line.prototype), n.FaceNormalsHelper.prototype.update = function() {
            var e = this.geometry.vertices,
                t = this.object,
                r = t.geometry.vertices,
                i = t.geometry.faces,
                n = t.matrixWorld;
            t.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(n);
            for (var o = 0, a = 0, s = i.length; s > o; o++, a += 2) {
                var h = i[o];
                e[a].copy(r[h.a]).add(r[h.b]).add(r[h.c]).divideScalar(3).applyMatrix4(n), e[a + 1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(e[a])
            }
            return this.geometry.verticesNeedUpdate = !0, this
        }, n.GridHelper = function(e, t) {
            var r = new n.Geometry,
                i = new n.LineBasicMaterial({
                    vertexColors: n.VertexColors
                });
            this.color1 = new n.Color(4473924), this.color2 = new n.Color(8947848);
            for (var o = -e; e >= o; o += t) {
                r.vertices.push(new n.Vector3(-e, 0, o), new n.Vector3(e, 0, o), new n.Vector3(o, 0, -e), new n.Vector3(o, 0, e));
                var a = 0 === o ? this.color1 : this.color2;
                r.colors.push(a, a, a, a)
            }
            n.Line.call(this, r, i, n.LinePieces)
        }, n.GridHelper.prototype = Object.create(n.Line.prototype), n.GridHelper.prototype.setColors = function(e, t) {
            this.color1.set(e), this.color2.set(t), this.geometry.colorsNeedUpdate = !0
        }, n.HemisphereLightHelper = function(e, t, r, i) {
            n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.colors = [new n.Color, new n.Color];
            var o = new n.SphereGeometry(t, 4, 2);
            o.applyMatrix((new n.Matrix4).makeRotationX(-Math.PI / 2));
            for (var a = 0, s = 8; s > a; a++) o.faces[a].color = this.colors[4 > a ? 0 : 1];
            var h = new n.MeshBasicMaterial({
                vertexColors: n.FaceColors,
                wireframe: !0
            });
            this.lightSphere = new n.Mesh(o, h), this.add(this.lightSphere), this.update()
        }, n.HemisphereLightHelper.prototype = Object.create(n.Object3D.prototype), n.HemisphereLightHelper.prototype.dispose = function() {
            this.lightSphere.geometry.dispose(), this.lightSphere.material.dispose()
        }, n.HemisphereLightHelper.prototype.update = function() {
            var e = new n.Vector3;
            return function() {
                this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity), this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity), this.lightSphere.lookAt(e.setFromMatrixPosition(this.light.matrixWorld).negate()), this.lightSphere.geometry.colorsNeedUpdate = !0
            }
        }(), n.PointLightHelper = function(e, t) {
            this.light = e, this.light.updateMatrixWorld();
            var r = new n.SphereGeometry(t, 4, 2),
                i = new n.MeshBasicMaterial({
                    wireframe: !0,
                    fog: !1
                });
            i.color.copy(this.light.color).multiplyScalar(this.light.intensity), n.Mesh.call(this, r, i), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1
        }, n.PointLightHelper.prototype = Object.create(n.Mesh.prototype), n.PointLightHelper.prototype.dispose = function() {
            this.geometry.dispose(), this.material.dispose()
        }, n.PointLightHelper.prototype.update = function() {
            this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
        }, n.SkeletonHelper = function(e) {
            this.bones = this.getBoneList(e);
            for (var t = new n.Geometry, r = 0; r < this.bones.length; r++) {
                var i = this.bones[r];
                i.parent instanceof n.Bone && (t.vertices.push(new n.Vector3), t.vertices.push(new n.Vector3), t.colors.push(new n.Color(0, 0, 1)), t.colors.push(new n.Color(0, 1, 0)))
            }
            var o = new n.LineBasicMaterial({
                vertexColors: n.VertexColors,
                depthTest: !1,
                depthWrite: !1,
                transparent: !0
            });
            n.Line.call(this, t, o, n.LinePieces), this.root = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.update()
        }, n.SkeletonHelper.prototype = Object.create(n.Line.prototype), n.SkeletonHelper.prototype.getBoneList = function(e) {
            var t = [];
            e instanceof n.Bone && t.push(e);
            for (var r = 0; r < e.children.length; r++) t.push.apply(t, this.getBoneList(e.children[r]));
            return t
        }, n.SkeletonHelper.prototype.update = function() {
            for (var e = this.geometry, t = (new n.Matrix4).getInverse(this.root.matrixWorld), r = new n.Matrix4, i = 0, o = 0; o < this.bones.length; o++) {
                var a = this.bones[o];
                a.parent instanceof n.Bone && (r.multiplyMatrices(t, a.matrixWorld), e.vertices[i].setFromMatrixPosition(r), r.multiplyMatrices(t, a.parent.matrixWorld), e.vertices[i + 1].setFromMatrixPosition(r), i += 2)
            }
            e.verticesNeedUpdate = !0, e.computeBoundingSphere()
        }, n.SpotLightHelper = function(e) {
            n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1;
            var t = new n.CylinderGeometry(0, 1, 1, 8, 1, !0);
            t.applyMatrix((new n.Matrix4).makeTranslation(0, -.5, 0)), t.applyMatrix((new n.Matrix4).makeRotationX(-Math.PI / 2));
            var r = new n.MeshBasicMaterial({
                wireframe: !0,
                fog: !1
            });
            this.cone = new n.Mesh(t, r), this.add(this.cone), this.update()
        }, n.SpotLightHelper.prototype = Object.create(n.Object3D.prototype), n.SpotLightHelper.prototype.dispose = function() {
            this.cone.geometry.dispose(), this.cone.material.dispose()
        }, n.SpotLightHelper.prototype.update = function() {
            var e = new n.Vector3,
                t = new n.Vector3;
            return function() {
                var r = this.light.distance ? this.light.distance : 1e4,
                    i = r * Math.tan(this.light.angle);
                this.cone.scale.set(i, i, r), e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(t.sub(e)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
            }
        }(), n.VertexNormalsHelper = function(e, t, r, i) {
            this.object = e, this.size = void 0 !== t ? t : 1;
            for (var o = void 0 !== r ? r : 16711680, a = void 0 !== i ? i : 1, s = new n.Geometry, h = (e.geometry.vertices, e.geometry.faces), l = 0, c = h.length; c > l; l++)
                for (var u = h[l], f = 0, p = u.vertexNormals.length; p > f; f++) s.vertices.push(new n.Vector3, new n.Vector3);
            n.Line.call(this, s, new n.LineBasicMaterial({
                color: o,
                linewidth: a
            }), n.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new n.Matrix3, this.update()
        }, n.VertexNormalsHelper.prototype = Object.create(n.Line.prototype), n.VertexNormalsHelper.prototype.update = function(e) {
            var t = new n.Vector3;
            return function(e) {
                var r = ["a", "b", "c", "d"];
                this.object.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
                for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, l = o.length; l > h; h++)
                    for (var c = o[h], u = 0, f = c.vertexNormals.length; f > u; u++) {
                        var p = c[r[u]],
                            d = n[p],
                            m = c.vertexNormals[u];
                        i[s].copy(d).applyMatrix4(a), t.copy(m).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size), t.add(i[s]), s += 1, i[s].copy(t), s += 1
                    }
                return this.geometry.verticesNeedUpdate = !0, this
            }
        }(), n.VertexTangentsHelper = function(e, t, r, i) {
            this.object = e, this.size = void 0 !== t ? t : 1;
            for (var o = void 0 !== r ? r : 255, a = void 0 !== i ? i : 1, s = new n.Geometry, h = (e.geometry.vertices, e.geometry.faces), l = 0, c = h.length; c > l; l++)
                for (var u = h[l], f = 0, p = u.vertexTangents.length; p > f; f++) s.vertices.push(new n.Vector3), s.vertices.push(new n.Vector3);
            n.Line.call(this, s, new n.LineBasicMaterial({
                color: o,
                linewidth: a
            }), n.LinePieces), this.matrixAutoUpdate = !1, this.update()
        }, n.VertexTangentsHelper.prototype = Object.create(n.Line.prototype), n.VertexTangentsHelper.prototype.update = function(e) {
            var t = new n.Vector3;
            return function(e) {
                var r = ["a", "b", "c", "d"];
                this.object.updateMatrixWorld(!0);
                for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, l = o.length; l > h; h++)
                    for (var c = o[h], u = 0, f = c.vertexTangents.length; f > u; u++) {
                        var p = c[r[u]],
                            d = n[p],
                            m = c.vertexTangents[u];
                        i[s].copy(d).applyMatrix4(a), t.copy(m).transformDirection(a).multiplyScalar(this.size), t.add(i[s]), s += 1, i[s].copy(t), s += 1
                    }
                return this.geometry.verticesNeedUpdate = !0, this
            }
        }(), n.WireframeHelper = function(e, t) {
            var r = void 0 !== t ? t : 16777215,
                i = [0, 0],
                o = {},
                a = function(e, t) {
                    return e - t
                },
                s = ["a", "b", "c"],
                h = new n.BufferGeometry;
            if (e.geometry instanceof n.Geometry) {
                for (var l = e.geometry.vertices, c = e.geometry.faces, u = 0, f = new Uint32Array(6 * c.length), p = 0, d = c.length; d > p; p++)
                    for (var m = c[p], v = 0; 3 > v; v++) {
                        i[0] = m[s[v]], i[1] = m[s[(v + 1) % 3]], i.sort(a);
                        var g = i.toString();
                        void 0 === o[g] && (f[2 * u] = i[0], f[2 * u + 1] = i[1], o[g] = !0, u++)
                    }
                for (var y = new Float32Array(2 * u * 3), p = 0, d = u; d > p; p++)
                    for (var v = 0; 2 > v; v++) {
                        var x = l[f[2 * p + v]],
                            _ = 6 * p + 3 * v;
                        y[_ + 0] = x.x, y[_ + 1] = x.y, y[_ + 2] = x.z
                    }
                h.addAttribute("position", new n.BufferAttribute(y, 3))
            } else if (e.geometry instanceof n.BufferGeometry)
                if (void 0 !== e.geometry.attributes.index) {
                    var l = e.geometry.attributes.position.array,
                        b = e.geometry.attributes.index.array,
                        w = e.geometry.drawcalls,
                        u = 0;
                    0 === w.length && (w = [{
                        count: b.length,
                        index: 0,
                        start: 0
                    }]);
                    for (var f = new Uint32Array(2 * b.length), M = 0, S = w.length; S > M; ++M)
                        for (var T = w[M].start, C = w[M].count, _ = w[M].index, p = T, E = T + C; E > p; p += 3)
                            for (var v = 0; 3 > v; v++) {
                                i[0] = _ + b[p + v], i[1] = _ + b[p + (v + 1) % 3], i.sort(a);
                                var g = i.toString();
                                void 0 === o[g] && (f[2 * u] = i[0], f[2 * u + 1] = i[1], o[g] = !0, u++)
                            }
                    for (var y = new Float32Array(2 * u * 3), p = 0, d = u; d > p; p++)
                        for (var v = 0; 2 > v; v++) {
                            var _ = 6 * p + 3 * v,
                                A = 3 * f[2 * p + v];
                            y[_ + 0] = l[A], y[_ + 1] = l[A + 1], y[_ + 2] = l[A + 2]
                        }
                    h.addAttribute("position", new n.BufferAttribute(y, 3))
                } else {
                    for (var l = e.geometry.attributes.position.array, u = l.length / 3, L = u / 3, y = new Float32Array(2 * u * 3), p = 0, d = L; d > p; p++)
                        for (var v = 0; 3 > v; v++) {
                            var _ = 18 * p + 6 * v,
                                P = 9 * p + 3 * v;
                            y[_ + 0] = l[P], y[_ + 1] = l[P + 1], y[_ + 2] = l[P + 2];
                            var A = 9 * p + 3 * ((v + 1) % 3);
                            y[_ + 3] = l[A], y[_ + 4] = l[A + 1], y[_ + 5] = l[A + 2]
                        }
                    h.addAttribute("position", new n.BufferAttribute(y, 3))
                }
            n.Line.call(this, h, new n.LineBasicMaterial({
                color: r
            }), n.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
        }, n.WireframeHelper.prototype = Object.create(n.Line.prototype), n.ImmediateRenderObject = function() {
            n.Object3D.call(this), this.render = function(e) {}
        }, n.ImmediateRenderObject.prototype = Object.create(n.Object3D.prototype), n.MorphBlendMesh = function(e, t) {
            n.Mesh.call(this, e, t), this.animationsMap = {}, this.animationsList = [];
            var r = this.geometry.morphTargets.length,
                i = "__default",
                o = 0,
                a = r - 1,
                s = r / 1;
            this.createAnimation(i, o, a, s), this.setAnimationWeight(i, 1)
        }, n.MorphBlendMesh.prototype = Object.create(n.Mesh.prototype), n.MorphBlendMesh.prototype.createAnimation = function(e, t, r, i) {
            var n = {
                startFrame: t,
                endFrame: r,
                length: r - t + 1,
                fps: i,
                duration: (r - t) / i,
                lastFrame: 0,
                currentFrame: 0,
                active: !1,
                time: 0,
                direction: 1,
                weight: 1,
                directionBackwards: !1,
                mirroredLoop: !1
            };
            this.animationsMap[e] = n, this.animationsList.push(n)
        }, n.MorphBlendMesh.prototype.autoCreateAnimations = function(e) {
            for (var t, r = /([a-z]+)_?(\d+)/, i = {}, n = this.geometry, o = 0, a = n.morphTargets.length; a > o; o++) {
                var s = n.morphTargets[o],
                    h = s.name.match(r);
                if (h && h.length > 1) {
                    var l = h[1];
                    h[2];
                    i[l] || (i[l] = {
                        start: 1 / 0,
                        end: -(1 / 0)
                    });
                    var c = i[l];
                    o < c.start && (c.start = o), o > c.end && (c.end = o), t || (t = l)
                }
            }
            for (var l in i) {
                var c = i[l];
                this.createAnimation(l, c.start, c.end, e)
            }
            this.firstAnimation = t
        }, n.MorphBlendMesh.prototype.setAnimationDirectionForward = function(e) {
            var t = this.animationsMap[e];
            t && (t.direction = 1, t.directionBackwards = !1)
        }, n.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(e) {
            var t = this.animationsMap[e];
            t && (t.direction = -1, t.directionBackwards = !0)
        }, n.MorphBlendMesh.prototype.setAnimationFPS = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.fps = t, r.duration = (r.end - r.start) / r.fps)
        }, n.MorphBlendMesh.prototype.setAnimationDuration = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.duration = t, r.fps = (r.end - r.start) / r.duration)
        }, n.MorphBlendMesh.prototype.setAnimationWeight = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.weight = t)
        }, n.MorphBlendMesh.prototype.setAnimationTime = function(e, t) {
            var r = this.animationsMap[e];
            r && (r.time = t)
        }, n.MorphBlendMesh.prototype.getAnimationTime = function(e) {
            var t = 0,
                r = this.animationsMap[e];
            return r && (t = r.time), t
        }, n.MorphBlendMesh.prototype.getAnimationDuration = function(e) {
            var t = -1,
                r = this.animationsMap[e];
            return r && (t = r.duration), t
        }, n.MorphBlendMesh.prototype.playAnimation = function(e) {
            var t = this.animationsMap[e];
            t ? (t.time = 0, t.active = !0) : console.warn("animation[" + e + "] undefined")
        }, n.MorphBlendMesh.prototype.stopAnimation = function(e) {
            var t = this.animationsMap[e];
            t && (t.active = !1)
        }, n.MorphBlendMesh.prototype.update = function(e) {
            for (var t = 0, r = this.animationsList.length; r > t; t++) {
                var i = this.animationsList[t];
                if (i.active) {
                    var o = i.duration / i.length;
                    i.time += i.direction * e, i.mirroredLoop ? (i.time > i.duration || i.time < 0) && (i.direction *= -1, i.time > i.duration && (i.time = i.duration, i.directionBackwards = !0), i.time < 0 && (i.time = 0, i.directionBackwards = !1)) : (i.time = i.time % i.duration, i.time < 0 && (i.time += i.duration));
                    var a = i.startFrame + n.Math.clamp(Math.floor(i.time / o), 0, i.length - 1),
                        s = i.weight;
                    a !== i.currentFrame && (this.morphTargetInfluences[i.lastFrame] = 0, this.morphTargetInfluences[i.currentFrame] = 1 * s, this.morphTargetInfluences[a] = 0, i.lastFrame = i.currentFrame, i.currentFrame = a);
                    var h = i.time % o / o;
                    i.directionBackwards && (h = 1 - h), this.morphTargetInfluences[i.currentFrame] = h * s, this.morphTargetInfluences[i.lastFrame] = (1 - h) * s
                }
            }
        }, "undefined" != typeof r ? ("undefined" != typeof t && t.exports && (r = t.exports = n), r.THREE = n) : this.THREE = n
    }, {}],
    42: [function(e, t, r) {
        (function(t) {
            "use strict";
            function r() {
                n(a({
                    y: o(-3.5, 3),
                    height: o(.01, 1),
                    radius: o(.1, 1.5),
                    numPieces: Math.floor(o(5, 20)),
                    quadsPerPiece: 1,
                    pieceSize: 2 * f * 1 / o(20, 40)
                }));
                var e = o(0, 2);
                n(s({
                    y: o(-3.5, 3),
                    startRadian: o(-f, f),
                    endRadian: o(-f, f),
                    innerRadius: e,
                    outerRadius: e + o(.05, .15),
                    numBands: 4,
                    numSlices: 90
                }))
            }
            function i(e) {
                return n(h({
                    startRadian: 0,
                    width: 1,
                    depth: 1,
                    thickness: .5
                }), {
                    offset: e,
                    mirror: !0,
                    material: new THREE.MeshBasicMaterial({
                        color: 16777215,
                        side: THREE.DoubleSide
                    })
                })
            }
            function n(e, t) {
                t = t || {};
                var r = l(e),
                    i = void 0;
                t.material ? i = t.material : (i = m[Math.floor(Math.random() * m.length)].clone(), i.color.set(d[Math.floor(Math.random() * d.length)]), i.opacity = o(.5, 1));
                var n = new THREE.Mesh(r, i);
                if (n.position.fromArray(t.position || [0, 0, 0]), t.mirror) {
                    for (var a = t.offset || 0, s = new THREE.Object3D, h = 0; 4 > h; h++) {
                        var c = 2 * f * (h / 4),
                            u = n.clone();
                        u.rotation.y = -c, u.position.x = Math.cos(c) * a, u.position.z = Math.sin(c) * a, s.add(u)
                    }
                    v.push(s), n = s
                } else v.push(n);
                return n.rotationFactor = o(-1, 1), n
            }
            t.THREE = e(41);
            var o = e(39),
                a = e(13),
                s = e(11),
                h = e(12),
                l = e(40)(THREE),
                c = e(43),
                u = Math,
                f = u.PI,
                p = c({
                    distance: 9,
                    position: [-2.9, 3, 3.5],
                    near: .01,
                    distanceBounds: [.25, 20],
                    far: 100
                });
            p.renderer.setClearColor(3254766, 1);
            var d = ["#ffffff"],
                m = [new THREE.MeshBasicMaterial({
                    wireframe: !0,
                    transparent: !0,
                    opacity: 1,
                    side: THREE.DoubleSide
                }), new THREE.MeshBasicMaterial({
                    transparent: !0,
                    opacity: 1,
                    side: THREE.DoubleSide
                })],
                v = [],
                g = i(3);
            g.rotationFactor = .1;
            for (var y = 0; 32 > y; y++) r();
            v.forEach(function(e) {
                return p.scene.add(e)
            }), p.on("tick", function(e) {
                v.forEach(function(t, r) {
                    t.rotation.y += e / 1e3 * t.rotationFactor
                })
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        11: 11,
        12: 12,
        13: 13,
        39: 39,
        40: 40,
        41: 41,
        43: 43
    }],
    43: [function(e, t, r) {
        "use strict";
        function i(e) {
            function t() {
                r(), c.render(p, y)
            }
            function r() {
                var e = y.position.toArray(),
                    t = f.toArray();
                l.update(e, t), y.position.fromArray(e), y.lookAt(f.fromArray(t))
            }
            function i() {
                var e = u.shape[0],
                    t = u.shape[1];
                y.aspect = e / t, c.setSize(e, t), y.updateProjectionMatrix()
            }
            e = a({
                distance: 2
            }, e);
            var s = "number" == typeof e.distance ? e.distance : 5,
                h = e.canvas;
            h || (h = document.createElement("canvas"), document.body.appendChild(h));
            var l = o(a({}, e, {
                    canvas: h
                })),
                c = new THREE.WebGLRenderer(a({}, e, {
                    canvas: h,
                    devicePixelRatio: "number" == typeof e.devicePixelRatio ? e.devicePixelRatio : window.devicePixelRatio
                }));
            c.setClearColor(0, 1);
            var u = n(h, e),
                f = new THREE.Vector3,
                p = new THREE.Scene,
                d = "number" == typeof e.fov ? e.fov : 50,
                m = u.shape[0] / u.shape[1],
                v = "number" == typeof e.near ? e.near : .001,
                g = "number" == typeof e.far ? e.far : 1e3,
                y = new THREE.PerspectiveCamera(d, m, v, g);
            return y.position.fromArray(e.position || [0, 0, -s]), u.on("tick", t), u.on("resize", i), i(), u.scene = p, u.camera = y, u.controls = l, u.renderer = c, u.render = t, u.resize = i, u.target = f, u.start()
        }
        var n = e(3),
            o = e(27),
            a = e(26);
        t.exports = i
    }, {
        26: 26,
        27: 27,
        3: 3
    }]
}, {}, [42]);