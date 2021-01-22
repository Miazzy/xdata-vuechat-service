(function(t, e) { "object" === typeof exports && "object" === typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define([], e) : "object" === typeof exports ? exports["vueD3Cloud"] = e() : t["vueD3Cloud"] = e() })("undefined" !== typeof self ? self : this, function() { return function(t) { var e = {};

        function n(r) { if (e[r]) return e[r].exports; var i = e[r] = { i: r, l: !1, exports: {} }; return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports } return n.m = t, n.c = e, n.d = function(t, e, r) { n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r }) }, n.r = function(t) { "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, n.t = function(t, e) { if (1 & e && (t = n(t)), 8 & e) return t; if (4 & e && "object" === typeof t && t && t.__esModule) return t; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t)
                for (var i in t) n.d(r, i, function(e) { return t[e] }.bind(null, i)); return r }, n.n = function(t) { var e = t && t.__esModule ? function() { return t["default"] } : function() { return t }; return n.d(e, "a", e), e }, n.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, n.p = "", n(n.s = "fb15") }({ "014b": function(t, e, n) { "use strict"; var r = n("e53d"),
                i = n("07e3"),
                a = n("8e60"),
                f = n("63b6"),
                o = n("9138"),
                c = n("ebfd").KEY,
                u = n("294c"),
                s = n("dbdb"),
                h = n("45f2"),
                l = n("62a0"),
                d = n("5168"),
                p = n("ccb9"),
                b = n("6718"),
                _ = n("47ee"),
                y = n("9003"),
                v = n("e4ae"),
                g = n("f772"),
                x = n("36c3"),
                w = n("1bc3"),
                m = n("aebd"),
                M = n("a159"),
                S = n("0395"),
                N = n("bf0b"),
                T = n("d9f6"),
                k = n("c3a1"),
                C = N.f,
                A = T.f,
                E = S.f,
                P = r.Symbol,
                O = r.JSON,
                j = O && O.stringify,
                U = "prototype",
                D = d("_hidden"),
                F = d("toPrimitive"),
                L = {}.propertyIsEnumerable,
                R = s("symbol-registry"),
                I = s("symbols"),
                z = s("op-symbols"),
                Y = Object[U],
                q = "function" == typeof P,
                H = r.QObject,
                X = !H || !H[U] || !H[U].findChild,
                $ = a && u(function() { return 7 != M(A({}, "a", { get: function() { return A(this, "a", { value: 7 }).a } })).a }) ? function(t, e, n) { var r = C(Y, e);
                    r && delete Y[e], A(t, e, n), r && t !== Y && A(Y, e, r) } : A,
                V = function(t) { var e = I[t] = M(P[U]); return e._k = t, e },
                W = q && "symbol" == typeof P.iterator ? function(t) { return "symbol" == typeof t } : function(t) { return t instanceof P },
                B = function(t, e, n) { return t === Y && B(z, e, n), v(t), e = w(e, !0), v(n), i(I, e) ? (n.enumerable ? (i(t, D) && t[D][e] && (t[D][e] = !1), n = M(n, { enumerable: m(0, !1) })) : (i(t, D) || A(t, D, m(1, {})), t[D][e] = !0), $(t, e, n)) : A(t, e, n) },
                Z = function(t, e) { v(t); var n, r = _(e = x(e)),
                        i = 0,
                        a = r.length; while (a > i) B(t, n = r[i++], e[n]); return t },
                J = function(t, e) { return void 0 === e ? M(t) : Z(M(t), e) },
                Q = function(t) { var e = L.call(this, t = w(t, !0)); return !(this === Y && i(I, t) && !i(z, t)) && (!(e || !i(this, t) || !i(I, t) || i(this, D) && this[D][t]) || e) },
                G = function(t, e) { if (t = x(t), e = w(e, !0), t !== Y || !i(I, e) || i(z, e)) { var n = C(t, e); return !n || !i(I, e) || i(t, D) && t[D][e] || (n.enumerable = !0), n } },
                K = function(t) { var e, n = E(x(t)),
                        r = [],
                        a = 0; while (n.length > a) i(I, e = n[a++]) || e == D || e == c || r.push(e); return r },
                tt = function(t) { var e, n = t === Y,
                        r = E(n ? z : x(t)),
                        a = [],
                        f = 0; while (r.length > f) !i(I, e = r[f++]) || n && !i(Y, e) || a.push(I[e]); return a };
            q || (P = function() { if (this instanceof P) throw TypeError("Symbol is not a constructor!"); var t = l(arguments.length > 0 ? arguments[0] : void 0),
                    e = function(n) { this === Y && e.call(z, n), i(this, D) && i(this[D], t) && (this[D][t] = !1), $(this, t, m(1, n)) }; return a && X && $(Y, t, { configurable: !0, set: e }), V(t) }, o(P[U], "toString", function() { return this._k }), N.f = G, T.f = B, n("6abf").f = S.f = K, n("355d").f = Q, n("9aa9").f = tt, a && !n("b8e3") && o(Y, "propertyIsEnumerable", Q, !0), p.f = function(t) { return V(d(t)) }), f(f.G + f.W + f.F * !q, { Symbol: P }); for (var et = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), nt = 0; et.length > nt;) d(et[nt++]); for (var rt = k(d.store), it = 0; rt.length > it;) b(rt[it++]);
            f(f.S + f.F * !q, "Symbol", { for: function(t) { return i(R, t += "") ? R[t] : R[t] = P(t) }, keyFor: function(t) { if (!W(t)) throw TypeError(t + " is not a symbol!"); for (var e in R)
                        if (R[e] === t) return e }, useSetter: function() { X = !0 }, useSimple: function() { X = !1 } }), f(f.S + f.F * !q, "Object", { create: J, defineProperty: B, defineProperties: Z, getOwnPropertyDescriptor: G, getOwnPropertyNames: K, getOwnPropertySymbols: tt }), O && f(f.S + f.F * (!q || u(function() { var t = P(); return "[null]" != j([t]) || "{}" != j({ a: t }) || "{}" != j(Object(t)) })), "JSON", { stringify: function(t) { var e, n, r = [t],
                        i = 1; while (arguments.length > i) r.push(arguments[i++]); if (n = e = r[1], (g(e) || void 0 !== t) && !W(t)) return y(e) || (e = function(t, e) { if ("function" == typeof n && (e = n.call(this, t, e)), !W(e)) return e }), r[1] = e, j.apply(O, r) } }), P[U][F] || n("35e8")(P[U], F, P[U].valueOf), h(P, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0) }, "0395": function(t, e, n) { var r = n("36c3"),
                i = n("6abf").f,
                a = {}.toString,
                f = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
                o = function(t) { try { return i(t) } catch (e) { return f.slice() } };
            t.exports.f = function(t) { return f && "[object Window]" == a.call(t) ? o(t) : i(r(t)) } }, "07e3": function(t, e) { var n = {}.hasOwnProperty;
            t.exports = function(t, e) { return n.call(t, e) } }, "0d58": function(t, e, n) { var r = n("ce10"),
                i = n("e11e");
            t.exports = Object.keys || function(t) { return r(t, i) } }, "0fc9": function(t, e, n) { var r = n("3a38"),
                i = Math.max,
                a = Math.min;
            t.exports = function(t, e) { return t = r(t), t < 0 ? i(t + e, 0) : a(t, e) } }, "11e9": function(t, e, n) { var r = n("52a7"),
                i = n("4630"),
                a = n("6821"),
                f = n("6a99"),
                o = n("69a8"),
                c = n("c69a"),
                u = Object.getOwnPropertyDescriptor;
            e.f = n("9e1e") ? u : function(t, e) { if (t = a(t), e = f(e, !0), c) try { return u(t, e) } catch (n) {}
                if (o(t, e)) return i(!r.f.call(t, e), t[e]) } }, 1495: function(t, e, n) { var r = n("86cc"),
                i = n("cb7c"),
                a = n("0d58");
            t.exports = n("9e1e") ? Object.defineProperties : function(t, e) { i(t); var n, f = a(e),
                    o = f.length,
                    c = 0; while (o > c) r.f(t, n = f[c++], e[n]); return t } }, 1691: function(t, e) { t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",") }, "1bc3": function(t, e, n) { var r = n("f772");
            t.exports = function(t, e) { if (!r(t)) return t; var n, i; if (e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i; if ("function" == typeof(n = t.valueOf) && !r(i = n.call(t))) return i; if (!e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i; throw TypeError("Can't convert object to primitive value") } }, "1ec9": function(t, e, n) { var r = n("f772"),
                i = n("e53d").document,
                a = r(i) && r(i.createElement);
            t.exports = function(t) { return a ? i.createElement(t) : {} } }, "230e": function(t, e, n) { var r = n("d3f4"),
                i = n("7726").document,
                a = r(i) && r(i.createElement);
            t.exports = function(t) { return a ? i.createElement(t) : {} } }, "241e": function(t, e, n) { var r = n("25eb");
            t.exports = function(t) { return Object(r(t)) } }, "25eb": function(t, e) { t.exports = function(t) { if (void 0 == t) throw TypeError("Can't call method on  " + t); return t } }, "268f": function(t, e, n) { t.exports = n("fde4") }, "294c": function(t, e) { t.exports = function(t) { try { return !!t() } catch (e) { return !0 } } }, "2aba": function(t, e, n) { var r = n("7726"),
                i = n("32e9"),
                a = n("69a8"),
                f = n("ca5a")("src"),
                o = n("fa5b"),
                c = "toString",
                u = ("" + o).split(c);
            n("8378").inspectSource = function(t) { return o.call(t) }, (t.exports = function(t, e, n, o) { var c = "function" == typeof n;
                c && (a(n, "name") || i(n, "name", e)), t[e] !== n && (c && (a(n, f) || i(n, f, t[e] ? "" + t[e] : u.join(String(e)))), t === r ? t[e] = n : o ? t[e] ? t[e] = n : i(t, e, n) : (delete t[e], i(t, e, n))) })(Function.prototype, c, function() { return "function" == typeof this && this[f] || o.call(this) }) }, "2aeb": function(t, e, n) { var r = n("cb7c"),
                i = n("1495"),
                a = n("e11e"),
                f = n("613b")("IE_PROTO"),
                o = function() {},
                c = "prototype",
                u = function() { var t, e = n("230e")("iframe"),
                        r = a.length,
                        i = "<",
                        f = ">";
                    e.style.display = "none", n("fab2").appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(i + "script" + f + "document.F=Object" + i + "/script" + f), t.close(), u = t.F; while (r--) delete u[c][a[r]]; return u() };
            t.exports = Object.create || function(t, e) { var n; return null !== t ? (o[c] = r(t), n = new o, o[c] = null, n[f] = t) : n = u(), void 0 === e ? n : i(n, e) } }, "2b4c": function(t, e, n) { var r = n("5537")("wks"),
                i = n("ca5a"),
                a = n("7726").Symbol,
                f = "function" == typeof a,
                o = t.exports = function(t) { return r[t] || (r[t] = f && a[t] || (f ? a : i)("Symbol." + t)) };
            o.store = r }, "2d00": function(t, e) { t.exports = !1 }, "2d95": function(t, e) { var n = {}.toString;
            t.exports = function(t) { return n.call(t).slice(8, -1) } }, "32a6": function(t, e, n) { var r = n("241e"),
                i = n("c3a1");
            n("ce7e")("keys", function() { return function(t) { return i(r(t)) } }) }, "32e9": function(t, e, n) { var r = n("86cc"),
                i = n("4630");
            t.exports = n("9e1e") ? function(t, e, n) { return r.f(t, e, i(1, n)) } : function(t, e, n) { return t[e] = n, t } }, "32fc": function(t, e, n) { var r = n("e53d").document;
            t.exports = r && r.documentElement }, "335c": function(t, e, n) { var r = n("6b4c");
            t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) { return "String" == r(t) ? t.split("") : Object(t) } }, "355d": function(t, e) { e.f = {}.propertyIsEnumerable }, "35e8": function(t, e, n) { var r = n("d9f6"),
                i = n("aebd");
            t.exports = n("8e60") ? function(t, e, n) { return r.f(t, e, i(1, n)) } : function(t, e, n) { return t[e] = n, t } }, "36bd": function(t, e, n) { "use strict"; var r = n("4bf8"),
                i = n("77f1"),
                a = n("9def");
            t.exports = function(t) { var e = r(this),
                    n = a(e.length),
                    f = arguments.length,
                    o = i(f > 1 ? arguments[1] : void 0, n),
                    c = f > 2 ? arguments[2] : void 0,
                    u = void 0 === c ? n : i(c, n); while (u > o) e[o++] = t; return e } }, "36c3": function(t, e, n) { var r = n("335c"),
                i = n("25eb");
            t.exports = function(t) { return r(i(t)) } }, "3a38": function(t, e) { var n = Math.ceil,
                r = Math.floor;
            t.exports = function(t) { return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t) } }, "454f": function(t, e, n) { n("46a7"); var r = n("584a").Object;
            t.exports = function(t, e, n) { return r.defineProperty(t, e, n) } }, 4588: function(t, e) { var n = Math.ceil,
                r = Math.floor;
            t.exports = function(t) { return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t) } }, "45f2": function(t, e, n) { var r = n("d9f6").f,
                i = n("07e3"),
                a = n("5168")("toStringTag");
            t.exports = function(t, e, n) { t && !i(t = n ? t : t.prototype, a) && r(t, a, { configurable: !0, value: e }) } }, 4630: function(t, e) { t.exports = function(t, e) { return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e } } }, "46a7": function(t, e, n) { var r = n("63b6");
            r(r.S + r.F * !n("8e60"), "Object", { defineProperty: n("d9f6").f }) }, "47ee": function(t, e, n) { var r = n("c3a1"),
                i = n("9aa9"),
                a = n("355d");
            t.exports = function(t) { var e = r(t),
                    n = i.f; if (n) { var f, o = n(t),
                        c = a.f,
                        u = 0; while (o.length > u) c.call(t, f = o[u++]) && e.push(f) } return e } }, "4a83": function(t, e, n) { var r = n("df45").dispatch,
                i = Math.PI / 180,
                a = 64,
                f = 2048;

            function o(t) { return t.text }

            function c() { return "serif" }

            function u() { return "normal" }

            function s(t) { return Math.sqrt(t.value) }

            function h() { return 30 * (~~(6 * Math.random()) - 3) }

            function l() { return 1 }

            function d(t, e, n, r) { if (!e.sprite) { var o = t.context,
                        c = t.ratio;
                    o.clearRect(0, 0, (a << 5) / c, f / c); var u = 0,
                        s = 0,
                        h = 0,
                        l = n.length;--r; while (++r < l) { e = n[r], o.save(), o.font = e.style + " " + e.weight + " " + ~~((e.size + 1) / c) + "px " + e.font; var d = o.measureText(e.text + "m").width * c,
                            p = e.size << 1; if (e.rotate) { var b = Math.sin(e.rotate * i),
                                _ = Math.cos(e.rotate * i),
                                y = d * _,
                                v = d * b,
                                g = p * _,
                                x = p * b;
                            d = Math.max(Math.abs(y + x), Math.abs(y - x)) + 31 >> 5 << 5, p = ~~Math.max(Math.abs(v + g), Math.abs(v - g)) } else d = d + 31 >> 5 << 5; if (p > h && (h = p), u + d >= a << 5 && (u = 0, s += h, h = 0), s + p >= f) break;
                        o.translate((u + (d >> 1)) / c, (s + (p >> 1)) / c), e.rotate && o.rotate(e.rotate * i), o.fillText(e.text, 0, 0), e.padding && (o.lineWidth = 2 * e.padding, o.strokeText(e.text, 0, 0)), o.restore(), e.width = d, e.height = p, e.xoff = u, e.yoff = s, e.x1 = d >> 1, e.y1 = p >> 1, e.x0 = -e.x1, e.y0 = -e.y1, e.hasText = !0, u += d } var w = o.getImageData(0, 0, (a << 5) / c, f / c).data,
                        m = []; while (--r >= 0)
                        if (e = n[r], e.hasText) { d = e.width; for (var M = d >> 5, S = (p = e.y1 - e.y0, 0); S < p * M; S++) m[S] = 0; if (u = e.xoff, null == u) return;
                            s = e.yoff; for (var N = 0, T = -1, k = 0; k < p; k++) { for (S = 0; S < d; S++) { var C = M * k + (S >> 5),
                                        A = w[(s + k) * (a << 5) + (u + S) << 2] ? 1 << 31 - S % 32 : 0;
                                    m[C] |= A, N |= A }
                                N ? T = k : (e.y0++, p--, k--, s++) }
                            e.y1 = e.y0 + T, e.sprite = m.slice(0, (e.y1 - e.y0) * M) } } }

            function p(t, e, n) { n >>= 5; for (var r, i = t.sprite, a = t.width >> 5, f = t.x - (a << 4), o = 127 & f, c = 32 - o, u = t.y1 - t.y0, s = (t.y + t.y0) * n + (f >> 5), h = 0; h < u; h++) { r = 0; for (var l = 0; l <= a; l++)
                        if ((r << c | (l < a ? (r = i[h * a + l]) >>> o : 0)) & e[s + l]) return !0;
                    s += n } return !1 }

            function b(t, e) { var n = t[0],
                    r = t[1];
                e.x + e.x0 < n.x && (n.x = e.x + e.x0), e.y + e.y0 < n.y && (n.y = e.y + e.y0), e.x + e.x1 > r.x && (r.x = e.x + e.x1), e.y + e.y1 > r.y && (r.y = e.y + e.y1) }

            function _(t, e) { return t.x + t.x1 > e[0].x && t.x + t.x0 < e[1].x && t.y + t.y1 > e[0].y && t.y + t.y0 < e[1].y }

            function y(t) { var e = t[0] / t[1]; return function(t) { return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)] } }

            function v(t) { var e = 4,
                    n = e * t[0] / t[1],
                    r = 0,
                    i = 0; return function(t) { var a = t < 0 ? -1 : 1; switch (Math.sqrt(1 + 4 * a * t) - a & 3) {
                        case 0:
                            r += n; break;
                        case 1:
                            i += e; break;
                        case 2:
                            r -= n; break;
                        default:
                            i -= e; break } return [r, i] } }

            function g(t) { var e = [],
                    n = -1; while (++n < t) e[n] = 0; return e }

            function x() { return document.createElement("canvas") }

            function w(t) { return "function" === typeof t ? t : function() { return t } }
            t.exports = function() { var t = [256, 256],
                    e = o,
                    n = c,
                    i = s,
                    v = u,
                    M = u,
                    S = h,
                    N = l,
                    T = y,
                    k = [],
                    C = 1 / 0,
                    A = r("word", "end"),
                    E = null,
                    P = Math.random,
                    O = {},
                    j = x;

                function U(t) { t.width = t.height = 1; var e = Math.sqrt(t.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
                    t.width = (a << 5) / e, t.height = f / e; var n = t.getContext("2d"); return n.fillStyle = n.strokeStyle = "red", n.textAlign = "center", { context: n, ratio: e } }

                function D(e, n, r) { t[0], t[1]; var i, a, f, o = n.x,
                        c = n.y,
                        u = Math.sqrt(t[0] * t[0] + t[1] * t[1]),
                        s = T(t),
                        h = P() < .5 ? 1 : -1,
                        l = -h; while (i = s(l += h)) { if (a = ~~i[0], f = ~~i[1], Math.min(Math.abs(a), Math.abs(f)) >= u) break; if (n.x = o + a, n.y = c + f, !(n.x + n.x0 < 0 || n.y + n.y0 < 0 || n.x + n.x1 > t[0] || n.y + n.y1 > t[1]) && (!r || !p(n, e, t[0])) && (!r || _(n, r))) { for (var d, b = n.sprite, y = n.width >> 5, v = t[0] >> 5, g = n.x - (y << 4), x = 127 & g, w = 32 - x, m = n.y1 - n.y0, M = (n.y + n.y0) * v + (g >> 5), S = 0; S < m; S++) { d = 0; for (var N = 0; N <= y; N++) e[M + N] |= d << w | (N < y ? (d = b[S * y + N]) >>> x : 0);
                                M += v } return delete n.sprite, !0 } } return !1 } return O.canvas = function(t) { return arguments.length ? (j = w(t), O) : j }, O.start = function() { var r = U(j()),
                        a = g((t[0] >> 5) * t[1]),
                        f = null,
                        o = k.length,
                        c = -1,
                        u = [],
                        s = k.map(function(t, r) { return t.text = e.call(this, t, r), t.font = n.call(this, t, r), t.style = v.call(this, t, r), t.weight = M.call(this, t, r), t.rotate = S.call(this, t, r), t.size = ~~i.call(this, t, r), t.padding = N.call(this, t, r), t }).sort(function(t, e) { return e.size - t.size }); return E && clearInterval(E), E = setInterval(h, 0), h(), O;

                    function h() { var e = Date.now(); while (Date.now() - e < C && ++c < o && E) { var n = s[c];
                            n.x = t[0] * (P() + .5) >> 1, n.y = t[1] * (P() + .5) >> 1, d(r, n, s, c), n.hasText && D(a, n, f) && (u.push(n), A.call("word", O, n), f ? b(f, n) : f = [{ x: n.x + n.x0, y: n.y + n.y0 }, { x: n.x + n.x1, y: n.y + n.y1 }], n.x -= t[0] >> 1, n.y -= t[1] >> 1) }
                        c >= o && (O.stop(), A.call("end", O, u, f)) } }, O.stop = function() { return E && (clearInterval(E), E = null), O }, O.timeInterval = function(t) { return arguments.length ? (C = null == t ? 1 / 0 : t, O) : C }, O.words = function(t) { return arguments.length ? (k = t, O) : k }, O.size = function(e) { return arguments.length ? (t = [+e[0], +e[1]], O) : t }, O.font = function(t) { return arguments.length ? (n = w(t), O) : n }, O.fontStyle = function(t) { return arguments.length ? (v = w(t), O) : v }, O.fontWeight = function(t) { return arguments.length ? (M = w(t), O) : M }, O.rotate = function(t) { return arguments.length ? (S = w(t), O) : S }, O.text = function(t) { return arguments.length ? (e = w(t), O) : e }, O.spiral = function(t) { return arguments.length ? (T = m[t] || t, O) : T }, O.fontSize = function(t) { return arguments.length ? (i = w(t), O) : i }, O.padding = function(t) { return arguments.length ? (N = w(t), O) : N }, O.random = function(t) { return arguments.length ? (P = t, O) : P }, O.on = function() { var t = A.on.apply(A, arguments); return t === A ? O : t }, O }; var m = { archimedean: y, rectangular: v } }, "4bf8": function(t, e, n) { var r = n("be13");
            t.exports = function(t) { return Object(r(t)) } }, 5168: function(t, e, n) { var r = n("dbdb")("wks"),
                i = n("62a0"),
                a = n("e53d").Symbol,
                f = "function" == typeof a,
                o = t.exports = function(t) { return r[t] || (r[t] = f && a[t] || (f ? a : i)("Symbol." + t)) };
            o.store = r }, "52a7": function(t, e) { e.f = {}.propertyIsEnumerable }, 5537: function(t, e, n) { var r = n("8378"),
                i = n("7726"),
                a = "__core-js_shared__",
                f = i[a] || (i[a] = {});
            (t.exports = function(t, e) { return f[t] || (f[t] = void 0 !== e ? e : {}) })("versions", []).push({ version: r.version, mode: n("2d00") ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" }) }, 5559: function(t, e, n) { var r = n("dbdb")("keys"),
                i = n("62a0");
            t.exports = function(t) { return r[t] || (r[t] = i(t)) } }, "584a": function(t, e) { var n = t.exports = { version: "2.6.5" }; "number" == typeof __e && (__e = n) }, "5b4e": function(t, e, n) { var r = n("36c3"),
                i = n("b447"),
                a = n("0fc9");
            t.exports = function(t) { return function(e, n, f) { var o, c = r(e),
                        u = i(c.length),
                        s = a(f, u); if (t && n != n) { while (u > s)
                            if (o = c[s++], o != o) return !0 } else
                        for (; u > s; s++)
                            if ((t || s in c) && c[s] === n) return t || s || 0; return !t && -1 } } }, "5ca1": function(t, e, n) { var r = n("7726"),
                i = n("8378"),
                a = n("32e9"),
                f = n("2aba"),
                o = n("9b43"),
                c = "prototype",
                u = function(t, e, n) { var s, h, l, d, p = t & u.F,
                        b = t & u.G,
                        _ = t & u.S,
                        y = t & u.P,
                        v = t & u.B,
                        g = b ? r : _ ? r[e] || (r[e] = {}) : (r[e] || {})[c],
                        x = b ? i : i[e] || (i[e] = {}),
                        w = x[c] || (x[c] = {}); for (s in b && (n = e), n) h = !p && g && void 0 !== g[s], l = (h ? g : n)[s], d = v && h ? o(l, r) : y && "function" == typeof l ? o(Function.call, l) : l, g && f(g, s, l, t & u.U), x[s] != l && a(x, s, d), y && w[s] != l && (w[s] = l) };
            r.core = i, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, t.exports = u }, "5dbc": function(t, e, n) { var r = n("d3f4"),
                i = n("8b97").set;
            t.exports = function(t, e, n) { var a, f = e.constructor; return f !== n && "function" == typeof f && (a = f.prototype) !== n.prototype && r(a) && i && i(t, a), t } }, "613b": function(t, e, n) { var r = n("5537")("keys"),
                i = n("ca5a");
            t.exports = function(t) { return r[t] || (r[t] = i(t)) } }, "626a": function(t, e, n) { var r = n("2d95");
            t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) { return "String" == r(t) ? t.split("") : Object(t) } }, "62a0": function(t, e) { var n = 0,
                r = Math.random();
            t.exports = function(t) { return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36)) } }, "63b6": function(t, e, n) { var r = n("e53d"),
                i = n("584a"),
                a = n("d864"),
                f = n("35e8"),
                o = n("07e3"),
                c = "prototype",
                u = function(t, e, n) { var s, h, l, d = t & u.F,
                        p = t & u.G,
                        b = t & u.S,
                        _ = t & u.P,
                        y = t & u.B,
                        v = t & u.W,
                        g = p ? i : i[e] || (i[e] = {}),
                        x = g[c],
                        w = p ? r : b ? r[e] : (r[e] || {})[c]; for (s in p && (n = e), n) h = !d && w && void 0 !== w[s], h && o(g, s) || (l = h ? w[s] : n[s], g[s] = p && "function" != typeof w[s] ? n[s] : y && h ? a(l, r) : v && w[s] == l ? function(t) { var e = function(e, n, r) { if (this instanceof t) { switch (arguments.length) {
                                    case 0:
                                        return new t;
                                    case 1:
                                        return new t(e);
                                    case 2:
                                        return new t(e, n) } return new t(e, n, r) } return t.apply(this, arguments) }; return e[c] = t[c], e }(l) : _ && "function" == typeof l ? a(Function.call, l) : l, _ && ((g.virtual || (g.virtual = {}))[s] = l, t & u.R && x && !x[s] && f(x, s, l))) };
            u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, t.exports = u }, 6718: function(t, e, n) { var r = n("e53d"),
                i = n("584a"),
                a = n("b8e3"),
                f = n("ccb9"),
                o = n("d9f6").f;
            t.exports = function(t) { var e = i.Symbol || (i.Symbol = a ? {} : r.Symbol || {}); "_" == t.charAt(0) || t in e || o(e, t, { value: f.f(t) }) } }, 6821: function(t, e, n) { var r = n("626a"),
                i = n("be13");
            t.exports = function(t) { return r(i(t)) } }, "69a8": function(t, e) { var n = {}.hasOwnProperty;
            t.exports = function(t, e) { return n.call(t, e) } }, "6a99": function(t, e, n) { var r = n("d3f4");
            t.exports = function(t, e) { if (!r(t)) return t; var n, i; if (e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i; if ("function" == typeof(n = t.valueOf) && !r(i = n.call(t))) return i; if (!e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i; throw TypeError("Can't convert object to primitive value") } }, "6abf": function(t, e, n) { var r = n("e6f3"),
                i = n("1691").concat("length", "prototype");
            e.f = Object.getOwnPropertyNames || function(t) { return r(t, i) } }, "6b4c": function(t, e) { var n = {}.toString;
            t.exports = function(t) { return n.call(t).slice(8, -1) } }, "6c7b": function(t, e, n) { var r = n("5ca1");
            r(r.P, "Array", { fill: n("36bd") }), n("9c6c")("fill") }, 7726: function(t, e) { var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = n) }, "77f1": function(t, e, n) { var r = n("4588"),
                i = Math.max,
                a = Math.min;
            t.exports = function(t, e) { return t = r(t), t < 0 ? i(t + e, 0) : a(t, e) } }, "794b": function(t, e, n) { t.exports = !n("8e60") && !n("294c")(function() { return 7 != Object.defineProperty(n("1ec9")("div"), "a", { get: function() { return 7 } }).a }) }, "79aa": function(t, e) { t.exports = function(t) { if ("function" != typeof t) throw TypeError(t + " is not a function!"); return t } }, "79e5": function(t, e) { t.exports = function(t) { try { return !!t() } catch (e) { return !0 } } }, "7e90": function(t, e, n) { var r = n("d9f6"),
                i = n("e4ae"),
                a = n("c3a1");
            t.exports = n("8e60") ? Object.defineProperties : function(t, e) { i(t); var n, f = a(e),
                    o = f.length,
                    c = 0; while (o > c) r.f(t, n = f[c++], e[n]); return t } }, 8378: function(t, e) { var n = t.exports = { version: "2.6.5" }; "number" == typeof __e && (__e = n) }, "85f2": function(t, e, n) { t.exports = n("454f") }, "86cc": function(t, e, n) { var r = n("cb7c"),
                i = n("c69a"),
                a = n("6a99"),
                f = Object.defineProperty;
            e.f = n("9e1e") ? Object.defineProperty : function(t, e, n) { if (r(t), e = a(e, !0), r(n), i) try { return f(t, e, n) } catch (o) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!"); return "value" in n && (t[e] = n.value), t } }, "8aae": function(t, e, n) { n("32a6"), t.exports = n("584a").Object.keys }, "8b97": function(t, e, n) { var r = n("d3f4"),
                i = n("cb7c"),
                a = function(t, e) { if (i(t), !r(e) && null !== e) throw TypeError(e + ": can't set as prototype!") };
            t.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, e, r) { try { r = n("9b43")(Function.call, n("11e9").f(Object.prototype, "__proto__").set, 2), r(t, []), e = !(t instanceof Array) } catch (i) { e = !0 } return function(t, n) { return a(t, n), e ? t.__proto__ = n : r(t, n), t } }({}, !1) : void 0), check: a } }, "8e60": function(t, e, n) { t.exports = !n("294c")(function() { return 7 != Object.defineProperty({}, "a", { get: function() { return 7 } }).a }) }, 9003: function(t, e, n) { var r = n("6b4c");
            t.exports = Array.isArray || function(t) { return "Array" == r(t) } }, 9093: function(t, e, n) { var r = n("ce10"),
                i = n("e11e").concat("length", "prototype");
            e.f = Object.getOwnPropertyNames || function(t) { return r(t, i) } }, 9138: function(t, e, n) { t.exports = n("35e8") }, "9aa9": function(t, e) { e.f = Object.getOwnPropertySymbols }, "9b43": function(t, e, n) { var r = n("d8e8");
            t.exports = function(t, e, n) { if (r(t), void 0 === e) return t; switch (n) {
                    case 1:
                        return function(n) { return t.call(e, n) };
                    case 2:
                        return function(n, r) { return t.call(e, n, r) };
                    case 3:
                        return function(n, r, i) { return t.call(e, n, r, i) } } return function() { return t.apply(e, arguments) } } }, "9c6c": function(t, e, n) { var r = n("2b4c")("unscopables"),
                i = Array.prototype;
            void 0 == i[r] && n("32e9")(i, r, {}), t.exports = function(t) { i[r][t] = !0 } }, "9def": function(t, e, n) { var r = n("4588"),
                i = Math.min;
            t.exports = function(t) { return t > 0 ? i(r(t), 9007199254740991) : 0 } }, "9e1e": function(t, e, n) { t.exports = !n("79e5")(function() { return 7 != Object.defineProperty({}, "a", { get: function() { return 7 } }).a }) }, a159: function(t, e, n) { var r = n("e4ae"),
                i = n("7e90"),
                a = n("1691"),
                f = n("5559")("IE_PROTO"),
                o = function() {},
                c = "prototype",
                u = function() { var t, e = n("1ec9")("iframe"),
                        r = a.length,
                        i = "<",
                        f = ">";
                    e.style.display = "none", n("32fc").appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(i + "script" + f + "document.F=Object" + i + "/script" + f), t.close(), u = t.F; while (r--) delete u[c][a[r]]; return u() };
            t.exports = Object.create || function(t, e) { var n; return null !== t ? (o[c] = r(t), n = new o, o[c] = null, n[f] = t) : n = u(), void 0 === e ? n : i(n, e) } }, a4bb: function(t, e, n) { t.exports = n("8aae") }, aa77: function(t, e, n) { var r = n("5ca1"),
                i = n("be13"),
                a = n("79e5"),
                f = n("fdef"),
                o = "[" + f + "]",
                c = "​",
                u = RegExp("^" + o + o + "*"),
                s = RegExp(o + o + "*$"),
                h = function(t, e, n) { var i = {},
                        o = a(function() { return !!f[t]() || c[t]() != c }),
                        u = i[t] = o ? e(l) : f[t];
                    n && (i[n] = u), r(r.P + r.F * o, "String", i) },
                l = h.trim = function(t, e) { return t = String(i(t)), 1 & e && (t = t.replace(u, "")), 2 & e && (t = t.replace(s, "")), t };
            t.exports = h }, aebd: function(t, e) { t.exports = function(t, e) { return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e } } }, b447: function(t, e, n) { var r = n("3a38"),
                i = Math.min;
            t.exports = function(t) { return t > 0 ? i(r(t), 9007199254740991) : 0 } }, b8e3: function(t, e) { t.exports = !0 }, be13: function(t, e) { t.exports = function(t) { if (void 0 == t) throw TypeError("Can't call method on  " + t); return t } }, bf0b: function(t, e, n) { var r = n("355d"),
                i = n("aebd"),
                a = n("36c3"),
                f = n("1bc3"),
                o = n("07e3"),
                c = n("794b"),
                u = Object.getOwnPropertyDescriptor;
            e.f = n("8e60") ? u : function(t, e) { if (t = a(t), e = f(e, !0), c) try { return u(t, e) } catch (n) {}
                if (o(t, e)) return i(!r.f.call(t, e), t[e]) } }, bf90: function(t, e, n) { var r = n("36c3"),
                i = n("bf0b").f;
            n("ce7e")("getOwnPropertyDescriptor", function() { return function(t, e) { return i(r(t), e) } }) }, c366: function(t, e, n) { var r = n("6821"),
                i = n("9def"),
                a = n("77f1");
            t.exports = function(t) { return function(e, n, f) { var o, c = r(e),
                        u = i(c.length),
                        s = a(f, u); if (t && n != n) { while (u > s)
                            if (o = c[s++], o != o) return !0 } else
                        for (; u > s; s++)
                            if ((t || s in c) && c[s] === n) return t || s || 0; return !t && -1 } } }, c3a1: function(t, e, n) { var r = n("e6f3"),
                i = n("1691");
            t.exports = Object.keys || function(t) { return r(t, i) } }, c5f6: function(t, e, n) { "use strict"; var r = n("7726"),
                i = n("69a8"),
                a = n("2d95"),
                f = n("5dbc"),
                o = n("6a99"),
                c = n("79e5"),
                u = n("9093").f,
                s = n("11e9").f,
                h = n("86cc").f,
                l = n("aa77").trim,
                d = "Number",
                p = r[d],
                b = p,
                _ = p.prototype,
                y = a(n("2aeb")(_)) == d,
                v = "trim" in String.prototype,
                g = function(t) { var e = o(t, !1); if ("string" == typeof e && e.length > 2) { e = v ? e.trim() : l(e, 3); var n, r, i, a = e.charCodeAt(0); if (43 === a || 45 === a) { if (n = e.charCodeAt(2), 88 === n || 120 === n) return NaN } else if (48 === a) { switch (e.charCodeAt(1)) {
                                case 66:
                                case 98:
                                    r = 2, i = 49; break;
                                case 79:
                                case 111:
                                    r = 8, i = 55; break;
                                default:
                                    return +e } for (var f, c = e.slice(2), u = 0, s = c.length; u < s; u++)
                                if (f = c.charCodeAt(u), f < 48 || f > i) return NaN;
                            return parseInt(c, r) } } return +e }; if (!p(" 0o1") || !p("0b1") || p("+0x1")) { p = function(t) { var e = arguments.length < 1 ? 0 : t,
                        n = this; return n instanceof p && (y ? c(function() { _.valueOf.call(n) }) : a(n) != d) ? f(new b(g(e)), n, p) : g(e) }; for (var x, w = n("9e1e") ? u(b) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), m = 0; w.length > m; m++) i(b, x = w[m]) && !i(p, x) && h(p, x, s(b, x));
                p.prototype = _, _.constructor = p, n("2aba")(r, d, p) } }, c69a: function(t, e, n) { t.exports = !n("9e1e") && !n("79e5")(function() { return 7 != Object.defineProperty(n("230e")("div"), "a", { get: function() { return 7 } }).a }) }, ca5a: function(t, e) { var n = 0,
                r = Math.random();
            t.exports = function(t) { return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36)) } }, cb7c: function(t, e, n) { var r = n("d3f4");
            t.exports = function(t) { if (!r(t)) throw TypeError(t + " is not an object!"); return t } }, ccb9: function(t, e, n) { e.f = n("5168") }, ce10: function(t, e, n) { var r = n("69a8"),
                i = n("6821"),
                a = n("c366")(!1),
                f = n("613b")("IE_PROTO");
            t.exports = function(t, e) { var n, o = i(t),
                    c = 0,
                    u = []; for (n in o) n != f && r(o, n) && u.push(n); while (e.length > c) r(o, n = e[c++]) && (~a(u, n) || u.push(n)); return u } }, ce7e: function(t, e, n) { var r = n("63b6"),
                i = n("584a"),
                a = n("294c");
            t.exports = function(t, e) { var n = (i.Object || {})[t] || Object[t],
                    f = {};
                f[t] = e(n), r(r.S + r.F * a(function() { n(1) }), "Object", f) } }, d3f4: function(t, e) { t.exports = function(t) { return "object" === typeof t ? null !== t : "function" === typeof t } }, d864: function(t, e, n) { var r = n("79aa");
            t.exports = function(t, e, n) { if (r(t), void 0 === e) return t; switch (n) {
                    case 1:
                        return function(n) { return t.call(e, n) };
                    case 2:
                        return function(n, r) { return t.call(e, n, r) };
                    case 3:
                        return function(n, r, i) { return t.call(e, n, r, i) } } return function() { return t.apply(e, arguments) } } }, d8e8: function(t, e) { t.exports = function(t) { if ("function" != typeof t) throw TypeError(t + " is not a function!"); return t } }, d9f6: function(t, e, n) { var r = n("e4ae"),
                i = n("794b"),
                a = n("1bc3"),
                f = Object.defineProperty;
            e.f = n("8e60") ? Object.defineProperty : function(t, e, n) { if (r(t), e = a(e, !0), r(n), i) try { return f(t, e, n) } catch (o) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!"); return "value" in n && (t[e] = n.value), t } }, dbdb: function(t, e, n) { var r = n("584a"),
                i = n("e53d"),
                a = "__core-js_shared__",
                f = i[a] || (i[a] = {});
            (t.exports = function(t, e) { return f[t] || (f[t] = void 0 !== e ? e : {}) })("versions", []).push({ version: r.version, mode: n("b8e3") ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" }) }, df45: function(t, e, n) { "use strict";
            n.r(e); var r = { value: function() {} };

            function i() { for (var t, e = 0, n = arguments.length, r = {}; e < n; ++e) { if (!(t = arguments[e] + "") || t in r) throw new Error("illegal type: " + t);
                    r[t] = [] } return new a(r) }

            function a(t) { this._ = t }

            function f(t, e) { return t.trim().split(/^|\s+/).map(function(t) { var n = "",
                        r = t.indexOf("."); if (r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), t && !e.hasOwnProperty(t)) throw new Error("unknown type: " + t); return { type: t, name: n } }) }

            function o(t, e) { for (var n, r = 0, i = t.length; r < i; ++r)
                    if ((n = t[r]).name === e) return n.value }

            function c(t, e, n) { for (var i = 0, a = t.length; i < a; ++i)
                    if (t[i].name === e) { t[i] = r, t = t.slice(0, i).concat(t.slice(i + 1)); break }
                return null != n && t.push({ name: e, value: n }), t }
            a.prototype = i.prototype = { constructor: a, on: function(t, e) { var n, r = this._,
                        i = f(t + "", r),
                        a = -1,
                        u = i.length; if (!(arguments.length < 2)) { if (null != e && "function" !== typeof e) throw new Error("invalid callback: " + e); while (++a < u)
                            if (n = (t = i[a]).type) r[n] = c(r[n], t.name, e);
                            else if (null == e)
                            for (n in r) r[n] = c(r[n], t.name, null); return this } while (++a < u)
                        if ((n = (t = i[a]).type) && (n = o(r[n], t.name))) return n }, copy: function() { var t = {},
                        e = this._; for (var n in e) t[n] = e[n].slice(); return new a(t) }, call: function(t, e) { if ((n = arguments.length - 2) > 0)
                        for (var n, r, i = new Array(n), a = 0; a < n; ++a) i[a] = arguments[a + 2]; if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t); for (r = this._[t], a = 0, n = r.length; a < n; ++a) r[a].value.apply(e, i) }, apply: function(t, e, n) { if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t); for (var r = this._[t], i = 0, a = r.length; i < a; ++i) r[i].value.apply(e, n) } }; var u = i;
            n.d(e, "dispatch", function() { return u }) }, e11e: function(t, e) { t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",") }, e265: function(t, e, n) { t.exports = n("ed33") }, e4ae: function(t, e, n) { var r = n("f772");
            t.exports = function(t) { if (!r(t)) throw TypeError(t + " is not an object!"); return t } }, e53d: function(t, e) { var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = n) }, e6f3: function(t, e, n) { var r = n("07e3"),
                i = n("36c3"),
                a = n("5b4e")(!1),
                f = n("5559")("IE_PROTO");
            t.exports = function(t, e) { var n, o = i(t),
                    c = 0,
                    u = []; for (n in o) n != f && r(o, n) && u.push(n); while (e.length > c) r(o, n = e[c++]) && (~a(u, n) || u.push(n)); return u } }, ebfd: function(t, e, n) { var r = n("62a0")("meta"),
                i = n("f772"),
                a = n("07e3"),
                f = n("d9f6").f,
                o = 0,
                c = Object.isExtensible || function() { return !0 },
                u = !n("294c")(function() { return c(Object.preventExtensions({})) }),
                s = function(t) { f(t, r, { value: { i: "O" + ++o, w: {} } }) },
                h = function(t, e) { if (!i(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t; if (!a(t, r)) { if (!c(t)) return "F"; if (!e) return "E";
                        s(t) } return t[r].i },
                l = function(t, e) { if (!a(t, r)) { if (!c(t)) return !0; if (!e) return !1;
                        s(t) } return t[r].w },
                d = function(t) { return u && p.NEED && c(t) && !a(t, r) && s(t), t },
                p = t.exports = { KEY: r, NEED: !1, fastKey: h, getWeak: l, onFreeze: d } }, ed33: function(t, e, n) { n("014b"), t.exports = n("584a").Object.getOwnPropertySymbols }, f6fd: function(t, e) {
            (function(t) { var e = "currentScript",
                    n = t.getElementsByTagName("script");
                e in t || Object.defineProperty(t, e, { get: function() { try { throw new Error } catch (r) { var t, e = (/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(r.stack) || [!1])[1]; for (t in n)
                                if (n[t].src == e || "interactive" == n[t].readyState) return n[t];
                            return null } } }) })(document) }, f772: function(t, e) { t.exports = function(t) { return "object" === typeof t ? null !== t : "function" === typeof t } }, fa5b: function(t, e, n) { t.exports = n("5537")("native-function-to-string", Function.toString) }, fab2: function(t, e, n) { var r = n("7726").document;
            t.exports = r && r.documentElement }, fb15: function(t, e, n) { "use strict"; var r;
            (n.r(e), "undefined" !== typeof window) && (n("f6fd"), (r = window.document.currentScript) && (r = r.src.match(/(.+\/)[^\/]+\.js(\?.*)?$/)) && (n.p = r[1])); var i = function() { var t = this,
                        e = t.$createElement,
                        n = t._self._c || e; return n("div", { ref: "wordCloud", staticClass: "wordCloud" }) },
                a = [],
                f = (n("6c7b"), n("268f")),
                o = n.n(f),
                c = n("e265"),
                u = n.n(c),
                s = n("a4bb"),
                h = n.n(s),
                l = n("85f2"),
                d = n.n(l);

            function p(t, e, n) { return e in t ? d()(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t }

            function b(t) { for (var e = 1; e < arguments.length; e++) { var n = null != arguments[e] ? arguments[e] : {},
                        r = h()(n); "function" === typeof u.a && (r = r.concat(u()(n).filter(function(t) { return o()(n, t).enumerable }))), r.forEach(function(e) { p(t, e, n[e]) }) } return t }
            n("c5f6"); var _ = function(t, e) { return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN },
                y = function(t) { return 1 === t.length && (t = v(t)), { left: function(e, n, r, i) { null == r && (r = 0), null == i && (i = e.length); while (r < i) { var a = r + i >>> 1;
                                t(e[a], n) < 0 ? r = a + 1 : i = a } return r }, right: function(e, n, r, i) { null == r && (r = 0), null == i && (i = e.length); while (r < i) { var a = r + i >>> 1;
                                t(e[a], n) > 0 ? i = a : r = a + 1 } return r } } };

            function v(t) { return function(e, n) { return _(t(e), n) } } var g = y(_);
            g.right, g.left; var x = Array.prototype;
            x.slice, x.map, Math.sqrt(50), Math.sqrt(10), Math.sqrt(2); var w = function(t) { var e, n, r, i = t.length,
                    a = -1,
                    f = 0; while (++a < i) f += t[a].length;
                n = new Array(f); while (--i >= 0) { r = t[i], e = r.length; while (--e >= 0) n[--f] = r[e] } return n };
            Array.prototype.slice; var m = n("df45"),
                M = "http://www.w3.org/1999/xhtml",
                S = { svg: "http://www.w3.org/2000/svg", xhtml: M, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" },
                N = function(t) { var e = t += "",
                        n = e.indexOf(":"); return n >= 0 && "xmlns" !== (e = t.slice(0, n)) && (t = t.slice(n + 1)), S.hasOwnProperty(e) ? { space: S[e], local: t } : t };

            function T(t) { return function() { var e = this.ownerDocument,
                        n = this.namespaceURI; return n === M && e.documentElement.namespaceURI === M ? e.createElement(t) : e.createElementNS(n, t) } }

            function k(t) { return function() { return this.ownerDocument.createElementNS(t.space, t.local) } } var C = function(t) { var e = N(t); return (e.local ? k : T)(e) };

            function A() {} var E = function(t) { return null == t ? A : function() { return this.querySelector(t) } },
                P = function(t) { "function" !== typeof t && (t = E(t)); for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
                        for (var a, f, o = e[i], c = o.length, u = r[i] = new Array(c), s = 0; s < c; ++s)(a = o[s]) && (f = t.call(a, a.__data__, s, o)) && ("__data__" in a && (f.__data__ = a.__data__), u[s] = f); return new le(r, this._parents) };

            function O() { return [] } var j = function(t) { return null == t ? O : function() { return this.querySelectorAll(t) } },
                U = function(t) { "function" !== typeof t && (t = j(t)); for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
                        for (var f, o = e[a], c = o.length, u = 0; u < c; ++u)(f = o[u]) && (r.push(t.call(f, f.__data__, u, o)), i.push(f)); return new le(r, i) },
                D = function(t) { return function() { return this.matches(t) } }; if ("undefined" !== typeof document) { var F = document.documentElement; if (!F.matches) { var L = F.webkitMatchesSelector || F.msMatchesSelector || F.mozMatchesSelector || F.oMatchesSelector;
                    D = function(t) { return function() { return L.call(this, t) } } } } var R = D,
                I = function(t) { "function" !== typeof t && (t = R(t)); for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
                        for (var a, f = e[i], o = f.length, c = r[i] = [], u = 0; u < o; ++u)(a = f[u]) && t.call(a, a.__data__, u, f) && c.push(a); return new le(r, this._parents) },
                z = function(t) { return new Array(t.length) },
                Y = function() { return new le(this._enter || this._groups.map(z), this._parents) };

            function q(t, e) { this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e }
            q.prototype = { constructor: q, appendChild: function(t) { return this._parent.insertBefore(t, this._next) }, insertBefore: function(t, e) { return this._parent.insertBefore(t, e) }, querySelector: function(t) { return this._parent.querySelector(t) }, querySelectorAll: function(t) { return this._parent.querySelectorAll(t) } }; var H = function(t) { return function() { return t } },
                X = "$";

            function $(t, e, n, r, i, a) { for (var f, o = 0, c = e.length, u = a.length; o < u; ++o)(f = e[o]) ? (f.__data__ = a[o], r[o] = f) : n[o] = new q(t, a[o]); for (; o < c; ++o)(f = e[o]) && (i[o] = f) }

            function V(t, e, n, r, i, a, f) { var o, c, u, s = {},
                    h = e.length,
                    l = a.length,
                    d = new Array(h); for (o = 0; o < h; ++o)(c = e[o]) && (d[o] = u = X + f.call(c, c.__data__, o, e), u in s ? i[o] = c : s[u] = c); for (o = 0; o < l; ++o) u = X + f.call(t, a[o], o, a), (c = s[u]) ? (r[o] = c, c.__data__ = a[o], s[u] = null) : n[o] = new q(t, a[o]); for (o = 0; o < h; ++o)(c = e[o]) && s[d[o]] === c && (i[o] = c) } var W = function(t, e) { if (!t) return d = new Array(this.size()), u = -1, this.each(function(t) { d[++u] = t }), d; var n = e ? V : $,
                        r = this._parents,
                        i = this._groups; "function" !== typeof t && (t = H(t)); for (var a = i.length, f = new Array(a), o = new Array(a), c = new Array(a), u = 0; u < a; ++u) { var s = r[u],
                            h = i[u],
                            l = h.length,
                            d = t.call(s, s && s.__data__, u, r),
                            p = d.length,
                            b = o[u] = new Array(p),
                            _ = f[u] = new Array(p),
                            y = c[u] = new Array(l);
                        n(s, h, b, _, y, d, e); for (var v, g, x = 0, w = 0; x < p; ++x)
                            if (v = b[x]) { x >= w && (w = x + 1); while (!(g = _[w]) && ++w < p);
                                v._next = g || null } } return f = new le(f, r), f._enter = o, f._exit = c, f },
                B = function() { return new le(this._exit || this._groups.map(z), this._parents) },
                Z = function(t) { for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), f = new Array(r), o = 0; o < a; ++o)
                        for (var c, u = e[o], s = n[o], h = u.length, l = f[o] = new Array(h), d = 0; d < h; ++d)(c = u[d] || s[d]) && (l[d] = c); for (; o < r; ++o) f[o] = e[o]; return new le(f, this._parents) },
                J = function() { for (var t = this._groups, e = -1, n = t.length; ++e < n;)
                        for (var r, i = t[e], a = i.length - 1, f = i[a]; --a >= 0;)(r = i[a]) && (f && f !== r.nextSibling && f.parentNode.insertBefore(r, f), f = r); return this },
                Q = function(t) {
                    function e(e, n) { return e && n ? t(e.__data__, n.__data__) : !e - !n }
                    t || (t = G); for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) { for (var f, o = n[a], c = o.length, u = i[a] = new Array(c), s = 0; s < c; ++s)(f = o[s]) && (u[s] = f);
                        u.sort(e) } return new le(i, this._parents).order() };

            function G(t, e) { return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN } var K = function() { var t = arguments[0]; return arguments[0] = this, t.apply(null, arguments), this },
                tt = function() { var t = new Array(this.size()),
                        e = -1; return this.each(function() { t[++e] = this }), t },
                et = function() { for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
                        for (var r = t[e], i = 0, a = r.length; i < a; ++i) { var f = r[i]; if (f) return f }
                    return null },
                nt = function() { var t = 0; return this.each(function() {++t }), t },
                rt = function() { return !this.node() },
                it = function(t) { for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
                        for (var i, a = e[n], f = 0, o = a.length; f < o; ++f)(i = a[f]) && t.call(i, i.__data__, f, a); return this };

            function at(t) { return function() { this.removeAttribute(t) } }

            function ft(t) { return function() { this.removeAttributeNS(t.space, t.local) } }

            function ot(t, e) { return function() { this.setAttribute(t, e) } }

            function ct(t, e) { return function() { this.setAttributeNS(t.space, t.local, e) } }

            function ut(t, e) { return function() { var n = e.apply(this, arguments);
                    null == n ? this.removeAttribute(t) : this.setAttribute(t, n) } }

            function st(t, e) { return function() { var n = e.apply(this, arguments);
                    null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n) } } var ht = function(t, e) { var n = N(t); if (arguments.length < 2) { var r = this.node(); return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n) } return this.each((null == e ? n.local ? ft : at : "function" === typeof e ? n.local ? st : ut : n.local ? ct : ot)(n, e)) },
                lt = function(t) { return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView };

            function dt(t) { return function() { this.style.removeProperty(t) } }

            function pt(t, e, n) { return function() { this.style.setProperty(t, e, n) } }

            function bt(t, e, n) { return function() { var r = e.apply(this, arguments);
                    null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, n) } } var _t = function(t, e, n) { return arguments.length > 1 ? this.each((null == e ? dt : "function" === typeof e ? bt : pt)(t, e, null == n ? "" : n)) : yt(this.node(), t) };

            function yt(t, e) { return t.style.getPropertyValue(e) || lt(t).getComputedStyle(t, null).getPropertyValue(e) }

            function vt(t) { return function() { delete this[t] } }

            function gt(t, e) { return function() { this[t] = e } }

            function xt(t, e) { return function() { var n = e.apply(this, arguments);
                    null == n ? delete this[t] : this[t] = n } } var wt = function(t, e) { return arguments.length > 1 ? this.each((null == e ? vt : "function" === typeof e ? xt : gt)(t, e)) : this.node()[t] };

            function mt(t) { return t.trim().split(/^|\s+/) }

            function Mt(t) { return t.classList || new St(t) }

            function St(t) { this._node = t, this._names = mt(t.getAttribute("class") || "") }

            function Nt(t, e) { var n = Mt(t),
                    r = -1,
                    i = e.length; while (++r < i) n.add(e[r]) }

            function Tt(t, e) { var n = Mt(t),
                    r = -1,
                    i = e.length; while (++r < i) n.remove(e[r]) }

            function kt(t) { return function() { Nt(this, t) } }

            function Ct(t) { return function() { Tt(this, t) } }

            function At(t, e) { return function() {
                    (e.apply(this, arguments) ? Nt : Tt)(this, t) } }
            St.prototype = { add: function(t) { var e = this._names.indexOf(t);
                    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" "))) }, remove: function(t) { var e = this._names.indexOf(t);
                    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" "))) }, contains: function(t) { return this._names.indexOf(t) >= 0 } }; var Et = function(t, e) { var n = mt(t + ""); if (arguments.length < 2) { var r = Mt(this.node()),
                        i = -1,
                        a = n.length; while (++i < a)
                        if (!r.contains(n[i])) return !1;
                    return !0 } return this.each(("function" === typeof e ? At : e ? kt : Ct)(n, e)) };

            function Pt() { this.textContent = "" }

            function Ot(t) { return function() { this.textContent = t } }

            function jt(t) { return function() { var e = t.apply(this, arguments);
                    this.textContent = null == e ? "" : e } } var Ut = function(t) { return arguments.length ? this.each(null == t ? Pt : ("function" === typeof t ? jt : Ot)(t)) : this.node().textContent };

            function Dt() { this.innerHTML = "" }

            function Ft(t) { return function() { this.innerHTML = t } }

            function Lt(t) { return function() { var e = t.apply(this, arguments);
                    this.innerHTML = null == e ? "" : e } } var Rt = function(t) { return arguments.length ? this.each(null == t ? Dt : ("function" === typeof t ? Lt : Ft)(t)) : this.node().innerHTML };

            function It() { this.nextSibling && this.parentNode.appendChild(this) } var zt = function() { return this.each(It) };

            function Yt() { this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild) } var qt = function() { return this.each(Yt) },
                Ht = function(t) { var e = "function" === typeof t ? t : C(t); return this.select(function() { return this.appendChild(e.apply(this, arguments)) }) };

            function Xt() { return null } var $t = function(t, e) { var n = "function" === typeof t ? t : C(t),
                    r = null == e ? Xt : "function" === typeof e ? e : E(e); return this.select(function() { return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null) }) };

            function Vt() { var t = this.parentNode;
                t && t.removeChild(this) } var Wt = function() { return this.each(Vt) };

            function Bt() { return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling) }

            function Zt() { return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling) } var Jt = function(t) { return this.select(t ? Zt : Bt) },
                Qt = function(t) { return arguments.length ? this.property("__data__", t) : this.node().__data__ },
                Gt = {},
                Kt = null; if ("undefined" !== typeof document) { var te = document.documentElement; "onmouseenter" in te || (Gt = { mouseenter: "mouseover", mouseleave: "mouseout" }) }

            function ee(t, e, n) { return t = ne(t, e, n),
                    function(e) { var n = e.relatedTarget;
                        n && (n === this || 8 & n.compareDocumentPosition(this)) || t.call(this, e) } }

            function ne(t, e, n) { return function(r) { var i = Kt;
                    Kt = r; try { t.call(this, this.__data__, e, n) } finally { Kt = i } } }

            function re(t) { return t.trim().split(/^|\s+/).map(function(t) { var e = "",
                        n = t.indexOf("."); return n >= 0 && (e = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: e } }) }

            function ie(t) { return function() { var e = this.__on; if (e) { for (var n, r = 0, i = -1, a = e.length; r < a; ++r) n = e[r], t.type && n.type !== t.type || n.name !== t.name ? e[++i] = n : this.removeEventListener(n.type, n.listener, n.capture);++i ? e.length = i : delete this.__on } } }

            function ae(t, e, n) { var r = Gt.hasOwnProperty(t.type) ? ee : ne; return function(i, a, f) { var o, c = this.__on,
                        u = r(e, a, f); if (c)
                        for (var s = 0, h = c.length; s < h; ++s)
                            if ((o = c[s]).type === t.type && o.name === t.name) return this.removeEventListener(o.type, o.listener, o.capture), this.addEventListener(o.type, o.listener = u, o.capture = n), void(o.value = e);
                    this.addEventListener(t.type, u, n), o = { type: t.type, name: t.name, value: e, listener: u, capture: n }, c ? c.push(o) : this.__on = [o] } } var fe = function(t, e, n) { var r, i, a = re(t + ""),
                    f = a.length; if (!(arguments.length < 2)) { for (o = e ? ae : ie, null == n && (n = !1), r = 0; r < f; ++r) this.each(o(a[r], e, n)); return this } var o = this.node().__on; if (o)
                    for (var c, u = 0, s = o.length; u < s; ++u)
                        for (r = 0, c = o[u]; r < f; ++r)
                            if ((i = a[r]).type === c.type && i.name === c.name) return c.value };

            function oe(t, e, n) { var r = lt(t),
                    i = r.CustomEvent; "function" === typeof i ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i) }

            function ce(t, e) { return function() { return oe(this, t, e) } }

            function ue(t, e) { return function() { return oe(this, t, e.apply(this, arguments)) } } var se = function(t, e) { return this.each(("function" === typeof e ? ue : ce)(t, e)) },
                he = [null];

            function le(t, e) { this._groups = t, this._parents = e }

            function de() { return new le([
                    [document.documentElement]
                ], he) }
            le.prototype = de.prototype = { constructor: le, select: P, selectAll: U, filter: I, data: W, enter: Y, exit: B, merge: Z, order: J, sort: Q, call: K, nodes: tt, node: et, size: nt, empty: rt, each: it, attr: ht, style: _t, property: wt, classed: Et, text: Ut, html: Rt, raise: zt, lower: qt, append: Ht, insert: $t, remove: Wt, clone: Jt, datum: Qt, on: fe, dispatch: se }; var pe = de,
                be = function(t) { return "string" === typeof t ? new le([
                        [document.querySelector(t)]
                    ], [document.documentElement]) : new le([
                        [t]
                    ], he) },
                _e = 0;

            function ye() { return new ve }

            function ve() { this._ = "@" + (++_e).toString(36) }
            ve.prototype = ye.prototype = { constructor: ve, get: function(t) { var e = this._; while (!(e in t))
                        if (!(t = t.parentNode)) return;
                    return t[e] }, set: function(t, e) { return t[this._] = e }, remove: function(t) { return this._ in t && delete t[this._] }, toString: function() { return this._ } };

            function ge(t, e, n, r, i, a, f, o, c, u) { this.target = t, this.type = e, this.subject = n, this.identifier = r, this.active = i, this.x = a, this.y = f, this.dx = o, this.dy = c, this._ = u }
            ge.prototype.on = function() { var t = this._.on.apply(this._, arguments); return t === this._ ? this : t }; var xe = function(t, e, n) { t.prototype = e.prototype = n, n.constructor = t };

            function we(t, e) { var n = Object.create(t.prototype); for (var r in e) n[r] = e[r]; return n }

            function me() {} var Me = .7,
                Se = 1 / Me,
                Ne = "\\s*([+-]?\\d+)\\s*",
                Te = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
                ke = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
                Ce = /^#([0-9a-f]{3})$/,
                Ae = /^#([0-9a-f]{6})$/,
                Ee = new RegExp("^rgb\\(" + [Ne, Ne, Ne] + "\\)$"),
                Pe = new RegExp("^rgb\\(" + [ke, ke, ke] + "\\)$"),
                Oe = new RegExp("^rgba\\(" + [Ne, Ne, Ne, Te] + "\\)$"),
                je = new RegExp("^rgba\\(" + [ke, ke, ke, Te] + "\\)$"),
                Ue = new RegExp("^hsl\\(" + [Te, ke, ke] + "\\)$"),
                De = new RegExp("^hsla\\(" + [Te, ke, ke, Te] + "\\)$"),
                Fe = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };

            function Le(t) { var e; return t = (t + "").trim().toLowerCase(), (e = Ce.exec(t)) ? (e = parseInt(e[1], 16), new qe(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, (15 & e) << 4 | 15 & e, 1)) : (e = Ae.exec(t)) ? Re(parseInt(e[1], 16)) : (e = Ee.exec(t)) ? new qe(e[1], e[2], e[3], 1) : (e = Pe.exec(t)) ? new qe(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, 1) : (e = Oe.exec(t)) ? Ie(e[1], e[2], e[3], e[4]) : (e = je.exec(t)) ? Ie(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, e[4]) : (e = Ue.exec(t)) ? Xe(e[1], e[2] / 100, e[3] / 100, 1) : (e = De.exec(t)) ? Xe(e[1], e[2] / 100, e[3] / 100, e[4]) : Fe.hasOwnProperty(t) ? Re(Fe[t]) : "transparent" === t ? new qe(NaN, NaN, NaN, 0) : null }

            function Re(t) { return new qe(t >> 16 & 255, t >> 8 & 255, 255 & t, 1) }

            function Ie(t, e, n, r) { return r <= 0 && (t = e = n = NaN), new qe(t, e, n, r) }

            function ze(t) { return t instanceof me || (t = Le(t)), t ? (t = t.rgb(), new qe(t.r, t.g, t.b, t.opacity)) : new qe }

            function Ye(t, e, n, r) { return 1 === arguments.length ? ze(t) : new qe(t, e, n, null == r ? 1 : r) }

            function qe(t, e, n, r) { this.r = +t, this.g = +e, this.b = +n, this.opacity = +r }

            function He(t) { return t = Math.max(0, Math.min(255, Math.round(t) || 0)), (t < 16 ? "0" : "") + t.toString(16) }

            function Xe(t, e, n, r) { return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new We(t, e, n, r) }

            function $e(t) { if (t instanceof We) return new We(t.h, t.s, t.l, t.opacity); if (t instanceof me || (t = Le(t)), !t) return new We; if (t instanceof We) return t;
                t = t.rgb(); var e = t.r / 255,
                    n = t.g / 255,
                    r = t.b / 255,
                    i = Math.min(e, n, r),
                    a = Math.max(e, n, r),
                    f = NaN,
                    o = a - i,
                    c = (a + i) / 2; return o ? (f = e === a ? (n - r) / o + 6 * (n < r) : n === a ? (r - e) / o + 2 : (e - n) / o + 4, o /= c < .5 ? a + i : 2 - a - i, f *= 60) : o = c > 0 && c < 1 ? 0 : f, new We(f, o, c, t.opacity) }

            function Ve(t, e, n, r) { return 1 === arguments.length ? $e(t) : new We(t, e, n, null == r ? 1 : r) }

            function We(t, e, n, r) { this.h = +t, this.s = +e, this.l = +n, this.opacity = +r }

            function Be(t, e, n) { return 255 * (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) }
            xe(me, Le, { displayable: function() { return this.rgb().displayable() }, hex: function() { return this.rgb().hex() }, toString: function() { return this.rgb() + "" } }), xe(qe, Ye, we(me, { brighter: function(t) { return t = null == t ? Se : Math.pow(Se, t), new qe(this.r * t, this.g * t, this.b * t, this.opacity) }, darker: function(t) { return t = null == t ? Me : Math.pow(Me, t), new qe(this.r * t, this.g * t, this.b * t, this.opacity) }, rgb: function() { return this }, displayable: function() { return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1 }, hex: function() { return "#" + He(this.r) + He(this.g) + He(this.b) }, toString: function() { var t = this.opacity; return t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)), (1 === t ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")") } })), xe(We, Ve, we(me, { brighter: function(t) { return t = null == t ? Se : Math.pow(Se, t), new We(this.h, this.s, this.l * t, this.opacity) }, darker: function(t) { return t = null == t ? Me : Math.pow(Me, t), new We(this.h, this.s, this.l * t, this.opacity) }, rgb: function() { var t = this.h % 360 + 360 * (this.h < 0),
                        e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                        n = this.l,
                        r = n + (n < .5 ? n : 1 - n) * e,
                        i = 2 * n - r; return new qe(Be(t >= 240 ? t - 240 : t + 120, i, r), Be(t, i, r), Be(t < 120 ? t + 240 : t - 120, i, r), this.opacity) }, displayable: function() { return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1 } })); var Ze = Math.PI / 180,
                Je = 180 / Math.PI,
                Qe = 18,
                Ge = .96422,
                Ke = 1,
                tn = .82521,
                en = 4 / 29,
                nn = 6 / 29,
                rn = 3 * nn * nn,
                an = nn * nn * nn;

            function fn(t) { if (t instanceof cn) return new cn(t.l, t.a, t.b, t.opacity); if (t instanceof bn) { if (isNaN(t.h)) return new cn(t.l, 0, 0, t.opacity); var e = t.h * Ze; return new cn(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity) }
                t instanceof qe || (t = ze(t)); var n, r, i = ln(t.r),
                    a = ln(t.g),
                    f = ln(t.b),
                    o = un((.2225045 * i + .7168786 * a + .0606169 * f) / Ke); return i === a && a === f ? n = r = o : (n = un((.4360747 * i + .3850649 * a + .1430804 * f) / Ge), r = un((.0139322 * i + .0971045 * a + .7141733 * f) / tn)), new cn(116 * o - 16, 500 * (n - o), 200 * (o - r), t.opacity) }

            function on(t, e, n, r) { return 1 === arguments.length ? fn(t) : new cn(t, e, n, null == r ? 1 : r) }

            function cn(t, e, n, r) { this.l = +t, this.a = +e, this.b = +n, this.opacity = +r }

            function un(t) { return t > an ? Math.pow(t, 1 / 3) : t / rn + en }

            function sn(t) { return t > nn ? t * t * t : rn * (t - en) }

            function hn(t) { return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055) }

            function ln(t) { return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4) }

            function dn(t) { if (t instanceof bn) return new bn(t.h, t.c, t.l, t.opacity); if (t instanceof cn || (t = fn(t)), 0 === t.a && 0 === t.b) return new bn(NaN, 0, t.l, t.opacity); var e = Math.atan2(t.b, t.a) * Je; return new bn(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity) }

            function pn(t, e, n, r) { return 1 === arguments.length ? dn(t) : new bn(t, e, n, null == r ? 1 : r) }

            function bn(t, e, n, r) { this.h = +t, this.c = +e, this.l = +n, this.opacity = +r }
            xe(cn, on, we(me, { brighter: function(t) { return new cn(this.l + Qe * (null == t ? 1 : t), this.a, this.b, this.opacity) }, darker: function(t) { return new cn(this.l - Qe * (null == t ? 1 : t), this.a, this.b, this.opacity) }, rgb: function() { var t = (this.l + 16) / 116,
                        e = isNaN(this.a) ? t : t + this.a / 500,
                        n = isNaN(this.b) ? t : t - this.b / 200; return e = Ge * sn(e), t = Ke * sn(t), n = tn * sn(n), new qe(hn(3.1338561 * e - 1.6168667 * t - .4906146 * n), hn(-.9787684 * e + 1.9161415 * t + .033454 * n), hn(.0719453 * e - .2289914 * t + 1.4052427 * n), this.opacity) } })), xe(bn, pn, we(me, { brighter: function(t) { return new bn(this.h, this.c, this.l + Qe * (null == t ? 1 : t), this.opacity) }, darker: function(t) { return new bn(this.h, this.c, this.l - Qe * (null == t ? 1 : t), this.opacity) }, rgb: function() { return fn(this).rgb() } })); var _n = -.14861,
                yn = 1.78277,
                vn = -.29227,
                gn = -.90649,
                xn = 1.97294,
                wn = xn * gn,
                mn = xn * yn,
                Mn = yn * vn - gn * _n;

            function Sn(t) { if (t instanceof Tn) return new Tn(t.h, t.s, t.l, t.opacity);
                t instanceof qe || (t = ze(t)); var e = t.r / 255,
                    n = t.g / 255,
                    r = t.b / 255,
                    i = (Mn * r + wn * e - mn * n) / (Mn + wn - mn),
                    a = r - i,
                    f = (xn * (n - i) - vn * a) / gn,
                    o = Math.sqrt(f * f + a * a) / (xn * i * (1 - i)),
                    c = o ? Math.atan2(f, a) * Je - 120 : NaN; return new Tn(c < 0 ? c + 360 : c, o, i, t.opacity) }

            function Nn(t, e, n, r) { return 1 === arguments.length ? Sn(t) : new Tn(t, e, n, null == r ? 1 : r) }

            function Tn(t, e, n, r) { this.h = +t, this.s = +e, this.l = +n, this.opacity = +r }

            function kn(t, e, n, r, i) { var a = t * t,
                    f = a * t; return ((1 - 3 * t + 3 * a - f) * e + (4 - 6 * a + 3 * f) * n + (1 + 3 * t + 3 * a - 3 * f) * r + f * i) / 6 }
            xe(Tn, Nn, we(me, { brighter: function(t) { return t = null == t ? Se : Math.pow(Se, t), new Tn(this.h, this.s, this.l * t, this.opacity) }, darker: function(t) { return t = null == t ? Me : Math.pow(Me, t), new Tn(this.h, this.s, this.l * t, this.opacity) }, rgb: function() { var t = isNaN(this.h) ? 0 : (this.h + 120) * Ze,
                        e = +this.l,
                        n = isNaN(this.s) ? 0 : this.s * e * (1 - e),
                        r = Math.cos(t),
                        i = Math.sin(t); return new qe(255 * (e + n * (_n * r + yn * i)), 255 * (e + n * (vn * r + gn * i)), 255 * (e + n * (xn * r)), this.opacity) } })); var Cn = function(t) { var e = t.length - 1; return function(n) { var r = n <= 0 ? n = 0 : n >= 1 ? (n = 1, e - 1) : Math.floor(n * e),
                            i = t[r],
                            a = t[r + 1],
                            f = r > 0 ? t[r - 1] : 2 * i - a,
                            o = r < e - 1 ? t[r + 2] : 2 * a - i; return kn((n - r / e) * e, f, i, a, o) } },
                An = function(t) { var e = t.length; return function(n) { var r = Math.floor(((n %= 1) < 0 ? ++n : n) * e),
                            i = t[(r + e - 1) % e],
                            a = t[r % e],
                            f = t[(r + 1) % e],
                            o = t[(r + 2) % e]; return kn((n - r / e) * e, i, a, f, o) } },
                En = function(t) { return function() { return t } };

            function Pn(t, e) { return function(n) { return t + n * e } }

            function On(t, e, n) { return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n,
                    function(r) { return Math.pow(t + r * e, n) } }

            function jn(t, e) { var n = e - t; return n ? Pn(t, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : En(isNaN(t) ? e : t) }

            function Un(t) { return 1 === (t = +t) ? Dn : function(e, n) { return n - e ? On(e, n, t) : En(isNaN(e) ? n : e) } }

            function Dn(t, e) { var n = e - t; return n ? Pn(t, n) : En(isNaN(t) ? e : t) } var Fn = function t(e) { var n = Un(e);

                function r(t, e) { var r = n((t = Ye(t)).r, (e = Ye(e)).r),
                        i = n(t.g, e.g),
                        a = n(t.b, e.b),
                        f = Dn(t.opacity, e.opacity); return function(e) { return t.r = r(e), t.g = i(e), t.b = a(e), t.opacity = f(e), t + "" } } return r.gamma = t, r }(1);

            function Ln(t) { return function(e) { var n, r, i = e.length,
                        a = new Array(i),
                        f = new Array(i),
                        o = new Array(i); for (n = 0; n < i; ++n) r = Ye(e[n]), a[n] = r.r || 0, f[n] = r.g || 0, o[n] = r.b || 0; return a = t(a), f = t(f), o = t(o), r.opacity = 1,
                        function(t) { return r.r = a(t), r.g = f(t), r.b = o(t), r + "" } } } var Rn = Ln(Cn),
                In = (Ln(An), function(t, e) { return t = +t, e -= t,
                        function(n) { return t + e * n } }),
                zn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
                Yn = new RegExp(zn.source, "g");

            function qn(t) { return function() { return t } }

            function Hn(t) { return function(e) { return t(e) + "" } } var Xn, $n, Vn, Wn, Bn = function(t, e) { var n, r, i, a = zn.lastIndex = Yn.lastIndex = 0,
                        f = -1,
                        o = [],
                        c = [];
                    t += "", e += ""; while ((n = zn.exec(t)) && (r = Yn.exec(e)))(i = r.index) > a && (i = e.slice(a, i), o[f] ? o[f] += i : o[++f] = i), (n = n[0]) === (r = r[0]) ? o[f] ? o[f] += r : o[++f] = r : (o[++f] = null, c.push({ i: f, x: In(n, r) })), a = Yn.lastIndex; return a < e.length && (i = e.slice(a), o[f] ? o[f] += i : o[++f] = i), o.length < 2 ? c[0] ? Hn(c[0].x) : qn(e) : (e = c.length, function(t) { for (var n, r = 0; r < e; ++r) o[(n = c[r]).i] = n.x(t); return o.join("") }) },
                Zn = 180 / Math.PI,
                Jn = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 },
                Qn = function(t, e, n, r, i, a) { var f, o, c; return (f = Math.sqrt(t * t + e * e)) && (t /= f, e /= f), (c = t * n + e * r) && (n -= t * c, r -= e * c), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, c /= o), t * r < e * n && (t = -t, e = -e, c = -c, f = -f), { translateX: i, translateY: a, rotate: Math.atan2(e, t) * Zn, skewX: Math.atan(c) * Zn, scaleX: f, scaleY: o } };

            function Gn(t) { return "none" === t ? Jn : (Xn || (Xn = document.createElement("DIV"), $n = document.documentElement, Vn = document.defaultView), Xn.style.transform = t, t = Vn.getComputedStyle($n.appendChild(Xn), null).getPropertyValue("transform"), $n.removeChild(Xn), t = t.slice(7, -1).split(","), Qn(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5])) }

            function Kn(t) { return null == t ? Jn : (Wn || (Wn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Wn.setAttribute("transform", t), (t = Wn.transform.baseVal.consolidate()) ? (t = t.matrix, Qn(t.a, t.b, t.c, t.d, t.e, t.f)) : Jn) }

            function tr(t, e, n, r) {
                function i(t) { return t.length ? t.pop() + " " : "" }

                function a(t, r, i, a, f, o) { if (t !== i || r !== a) { var c = f.push("translate(", null, e, null, n);
                        o.push({ i: c - 4, x: In(t, i) }, { i: c - 2, x: In(r, a) }) } else(i || a) && f.push("translate(" + i + e + a + n) }

                function f(t, e, n, a) { t !== e ? (t - e > 180 ? e += 360 : e - t > 180 && (t += 360), a.push({ i: n.push(i(n) + "rotate(", null, r) - 2, x: In(t, e) })) : e && n.push(i(n) + "rotate(" + e + r) }

                function o(t, e, n, a) { t !== e ? a.push({ i: n.push(i(n) + "skewX(", null, r) - 2, x: In(t, e) }) : e && n.push(i(n) + "skewX(" + e + r) }

                function c(t, e, n, r, a, f) { if (t !== n || e !== r) { var o = a.push(i(a) + "scale(", null, ",", null, ")");
                        f.push({ i: o - 4, x: In(t, n) }, { i: o - 2, x: In(e, r) }) } else 1 === n && 1 === r || a.push(i(a) + "scale(" + n + "," + r + ")") } return function(e, n) { var r = [],
                        i = []; return e = t(e), n = t(n), a(e.translateX, e.translateY, n.translateX, n.translateY, r, i), f(e.rotate, n.rotate, r, i), o(e.skewX, n.skewX, r, i), c(e.scaleX, e.scaleY, n.scaleX, n.scaleY, r, i), e = n = null,
                        function(t) { var e, n = -1,
                                a = i.length; while (++n < a) r[(e = i[n]).i] = e.x(t); return r.join("") } } } var er = tr(Gn, "px, ", "px)", "deg)"),
                nr = tr(Kn, ", ", ")", ")");
            Math.SQRT2;

            function rr(t) { return function(e, n) { var r = t((e = Ve(e)).h, (n = Ve(n)).h),
                        i = Dn(e.s, n.s),
                        a = Dn(e.l, n.l),
                        f = Dn(e.opacity, n.opacity); return function(t) { return e.h = r(t), e.s = i(t), e.l = a(t), e.opacity = f(t), e + "" } } }
            rr(jn), rr(Dn);

            function ir(t) { return function(e, n) { var r = t((e = pn(e)).h, (n = pn(n)).h),
                        i = Dn(e.c, n.c),
                        a = Dn(e.l, n.l),
                        f = Dn(e.opacity, n.opacity); return function(t) { return e.h = r(t), e.c = i(t), e.l = a(t), e.opacity = f(t), e + "" } } }
            ir(jn), ir(Dn);

            function ar(t) { return function e(n) {
                    function r(e, r) { var i = t((e = Nn(e)).h, (r = Nn(r)).h),
                            a = Dn(e.s, r.s),
                            f = Dn(e.l, r.l),
                            o = Dn(e.opacity, r.opacity); return function(t) { return e.h = i(t), e.s = a(t), e.l = f(Math.pow(t, n)), e.opacity = o(t), e + "" } } return n = +n, r.gamma = e, r }(1) }
            ar(jn); var fr = ar(Dn); var or, cr, ur = 0,
                sr = 0,
                hr = 0,
                lr = 1e3,
                dr = 0,
                pr = 0,
                br = 0,
                _r = "object" === typeof performance && performance.now ? performance : Date,
                yr = "object" === typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) { setTimeout(t, 17) };

            function vr() { return pr || (yr(gr), pr = _r.now() + br) }

            function gr() { pr = 0 }

            function xr() { this._call = this._time = this._next = null }

            function wr(t, e, n) { var r = new xr; return r.restart(t, e, n), r }

            function mr() { vr(), ++ur; var t, e = or; while (e)(t = pr - e._time) >= 0 && e._call.call(null, t), e = e._next;--ur }

            function Mr() { pr = (dr = _r.now()) + br, ur = sr = 0; try { mr() } finally { ur = 0, Nr(), pr = 0 } }

            function Sr() { var t = _r.now(),
                    e = t - dr;
                e > lr && (br -= e, dr = t) }

            function Nr() { var t, e, n = or,
                    r = 1 / 0; while (n) n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : or = e);
                cr = t, Tr(r) }

            function Tr(t) { if (!ur) { sr && (sr = clearTimeout(sr)); var e = t - pr;
                    e > 24 ? (t < 1 / 0 && (sr = setTimeout(Mr, t - _r.now() - br)), hr && (hr = clearInterval(hr))) : (hr || (dr = _r.now(), hr = setInterval(Sr, lr)), ur = 1, yr(Mr)) } }
            xr.prototype = wr.prototype = { constructor: xr, restart: function(t, e, n) { if ("function" !== typeof t) throw new TypeError("callback is not a function");
                    n = (null == n ? vr() : +n) + (null == e ? 0 : +e), this._next || cr === this || (cr ? cr._next = this : or = this, cr = this), this._call = t, this._time = n, Tr() }, stop: function() { this._call && (this._call = null, this._time = 1 / 0, Tr()) } }; var kr = function(t, e, n) { var r = new xr; return e = null == e ? 0 : +e, r.restart(function(n) { r.stop(), t(n + e) }, e, n), r },
                Cr = Object(m["dispatch"])("start", "end", "interrupt"),
                Ar = [],
                Er = 0,
                Pr = 1,
                Or = 2,
                jr = 3,
                Ur = 4,
                Dr = 5,
                Fr = 6,
                Lr = function(t, e, n, r, i, a) { var f = t.__transition; if (f) { if (n in f) return } else t.__transition = {};
                    Yr(t, n, { name: e, index: r, group: i, on: Cr, tween: Ar, time: a.time, delay: a.delay, duration: a.duration, ease: a.ease, timer: null, state: Er }) };

            function Rr(t, e) { var n = zr(t, e); if (n.state > Er) throw new Error("too late; already scheduled"); return n }

            function Ir(t, e) { var n = zr(t, e); if (n.state > Or) throw new Error("too late; already started"); return n }

            function zr(t, e) { var n = t.__transition; if (!n || !(n = n[e])) throw new Error("transition not found"); return n }

            function Yr(t, e, n) { var r, i = t.__transition;

                function a(t) { n.state = Pr, n.timer.restart(f, n.delay, n.time), n.delay <= t && f(t - n.delay) }

                function f(a) { var u, s, h, l; if (n.state !== Pr) return c(); for (u in i)
                        if (l = i[u], l.name === n.name) { if (l.state === jr) return kr(f);
                            l.state === Ur ? (l.state = Fr, l.timer.stop(), l.on.call("interrupt", t, t.__data__, l.index, l.group), delete i[u]) : +u < e && (l.state = Fr, l.timer.stop(), delete i[u]) }
                    if (kr(function() { n.state === jr && (n.state = Ur, n.timer.restart(o, n.delay, n.time), o(a)) }), n.state = Or, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Or) { for (n.state = jr, r = new Array(h = n.tween.length), u = 0, s = -1; u < h; ++u)(l = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++s] = l);
                        r.length = s + 1 } }

                function o(e) { var i = e < n.duration ? n.ease.call(null, e / n.duration) : (n.timer.restart(c), n.state = Dr, 1),
                        a = -1,
                        f = r.length; while (++a < f) r[a].call(null, i);
                    n.state === Dr && (n.on.call("end", t, t.__data__, n.index, n.group), c()) }

                function c() { for (var r in n.state = Fr, n.timer.stop(), delete i[e], i) return;
                    delete t.__transition }
                i[e] = n, n.timer = wr(a, 0, n.time) } var qr = function(t, e) { var n, r, i, a = t.__transition,
                        f = !0; if (a) { for (i in e = null == e ? null : e + "", a)(n = a[i]).name === e ? (r = n.state > Or && n.state < Dr, n.state = Fr, n.timer.stop(), r && n.on.call("interrupt", t, t.__data__, n.index, n.group), delete a[i]) : f = !1;
                        f && delete t.__transition } },
                Hr = function(t) { return this.each(function() { qr(this, t) }) };

            function Xr(t, e) { var n, r; return function() { var i = Ir(this, t),
                        a = i.tween; if (a !== n) { r = n = a; for (var f = 0, o = r.length; f < o; ++f)
                            if (r[f].name === e) { r = r.slice(), r.splice(f, 1); break } }
                    i.tween = r } }

            function $r(t, e, n) { var r, i; if ("function" !== typeof n) throw new Error; return function() { var a = Ir(this, t),
                        f = a.tween; if (f !== r) { i = (r = f).slice(); for (var o = { name: e, value: n }, c = 0, u = i.length; c < u; ++c)
                            if (i[c].name === e) { i[c] = o; break }
                        c === u && i.push(o) }
                    a.tween = i } } var Vr = function(t, e) { var n = this._id; if (t += "", arguments.length < 2) { for (var r, i = zr(this.node(), n).tween, a = 0, f = i.length; a < f; ++a)
                        if ((r = i[a]).name === t) return r.value;
                    return null } return this.each((null == e ? Xr : $r)(n, t, e)) };

            function Wr(t, e, n) { var r = t._id; return t.each(function() { var t = Ir(this, r);
                        (t.value || (t.value = {}))[e] = n.apply(this, arguments) }),
                    function(t) { return zr(t, r).value[e] } } var Br = function(t, e) { var n; return ("number" === typeof e ? In : e instanceof Le ? Fn : (n = Le(e)) ? (e = n, Fn) : Bn)(t, e) };

            function Zr(t) { return function() { this.removeAttribute(t) } }

            function Jr(t) { return function() { this.removeAttributeNS(t.space, t.local) } }

            function Qr(t, e, n) { var r, i; return function() { var a = this.getAttribute(t); return a === n ? null : a === r ? i : i = e(r = a, n) } }

            function Gr(t, e, n) { var r, i; return function() { var a = this.getAttributeNS(t.space, t.local); return a === n ? null : a === r ? i : i = e(r = a, n) } }

            function Kr(t, e, n) { var r, i, a; return function() { var f, o = n(this); if (null != o) return f = this.getAttribute(t), f === o ? null : f === r && o === i ? a : a = e(r = f, i = o);
                    this.removeAttribute(t) } }

            function ti(t, e, n) { var r, i, a; return function() { var f, o = n(this); if (null != o) return f = this.getAttributeNS(t.space, t.local), f === o ? null : f === r && o === i ? a : a = e(r = f, i = o);
                    this.removeAttributeNS(t.space, t.local) } } var ei = function(t, e) { var n = N(t),
                    r = "transform" === n ? nr : Br; return this.attrTween(t, "function" === typeof e ? (n.local ? ti : Kr)(n, r, Wr(this, "attr." + t, e)) : null == e ? (n.local ? Jr : Zr)(n) : (n.local ? Gr : Qr)(n, r, e + "")) };

            function ni(t, e) {
                function n() { var n = this,
                        r = e.apply(n, arguments); return r && function(e) { n.setAttributeNS(t.space, t.local, r(e)) } } return n._value = e, n }

            function ri(t, e) {
                function n() { var n = this,
                        r = e.apply(n, arguments); return r && function(e) { n.setAttribute(t, r(e)) } } return n._value = e, n } var ii = function(t, e) { var n = "attr." + t; if (arguments.length < 2) return (n = this.tween(n)) && n._value; if (null == e) return this.tween(n, null); if ("function" !== typeof e) throw new Error; var r = N(t); return this.tween(n, (r.local ? ni : ri)(r, e)) };

            function ai(t, e) { return function() { Rr(this, t).delay = +e.apply(this, arguments) } }

            function fi(t, e) { return e = +e,
                    function() { Rr(this, t).delay = e } } var oi = function(t) { var e = this._id; return arguments.length ? this.each(("function" === typeof t ? ai : fi)(e, t)) : zr(this.node(), e).delay };

            function ci(t, e) { return function() { Ir(this, t).duration = +e.apply(this, arguments) } }

            function ui(t, e) { return e = +e,
                    function() { Ir(this, t).duration = e } } var si = function(t) { var e = this._id; return arguments.length ? this.each(("function" === typeof t ? ci : ui)(e, t)) : zr(this.node(), e).duration };

            function hi(t, e) { if ("function" !== typeof e) throw new Error; return function() { Ir(this, t).ease = e } } var li = function(t) { var e = this._id; return arguments.length ? this.each(hi(e, t)) : zr(this.node(), e).ease },
                di = function(t) { "function" !== typeof t && (t = R(t)); for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
                        for (var a, f = e[i], o = f.length, c = r[i] = [], u = 0; u < o; ++u)(a = f[u]) && t.call(a, a.__data__, u, f) && c.push(a); return new Fi(r, this._parents, this._name, this._id) },
                pi = function(t) { if (t._id !== this._id) throw new Error; for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), f = new Array(r), o = 0; o < a; ++o)
                        for (var c, u = e[o], s = n[o], h = u.length, l = f[o] = new Array(h), d = 0; d < h; ++d)(c = u[d] || s[d]) && (l[d] = c); for (; o < r; ++o) f[o] = e[o]; return new Fi(f, this._parents, this._name, this._id) };

            function bi(t) { return (t + "").trim().split(/^|\s+/).every(function(t) { var e = t.indexOf("."); return e >= 0 && (t = t.slice(0, e)), !t || "start" === t }) }

            function _i(t, e, n) { var r, i, a = bi(e) ? Rr : Ir; return function() { var f = a(this, t),
                        o = f.on;
                    o !== r && (i = (r = o).copy()).on(e, n), f.on = i } } var yi = function(t, e) { var n = this._id; return arguments.length < 2 ? zr(this.node(), n).on.on(t) : this.each(_i(n, t, e)) };

            function vi(t) { return function() { var e = this.parentNode; for (var n in this.__transition)
                        if (+n !== t) return;
                    e && e.removeChild(this) } } var gi = function() { return this.on("end.remove", vi(this._id)) },
                xi = function(t) { var e = this._name,
                        n = this._id; "function" !== typeof t && (t = E(t)); for (var r = this._groups, i = r.length, a = new Array(i), f = 0; f < i; ++f)
                        for (var o, c, u = r[f], s = u.length, h = a[f] = new Array(s), l = 0; l < s; ++l)(o = u[l]) && (c = t.call(o, o.__data__, l, u)) && ("__data__" in o && (c.__data__ = o.__data__), h[l] = c, Lr(h[l], e, n, l, h, zr(o, n))); return new Fi(a, this._parents, e, n) },
                wi = function(t) { var e = this._name,
                        n = this._id; "function" !== typeof t && (t = j(t)); for (var r = this._groups, i = r.length, a = [], f = [], o = 0; o < i; ++o)
                        for (var c, u = r[o], s = u.length, h = 0; h < s; ++h)
                            if (c = u[h]) { for (var l, d = t.call(c, c.__data__, h, u), p = zr(c, n), b = 0, _ = d.length; b < _; ++b)(l = d[b]) && Lr(l, e, n, b, d, p);
                                a.push(d), f.push(c) }
                    return new Fi(a, f, e, n) },
                mi = pe.prototype.constructor,
                Mi = function() { return new mi(this._groups, this._parents) };

            function Si(t, e) { var n, r, i; return function() { var a = yt(this, t),
                        f = (this.style.removeProperty(t), yt(this, t)); return a === f ? null : a === n && f === r ? i : i = e(n = a, r = f) } }

            function Ni(t) { return function() { this.style.removeProperty(t) } }

            function Ti(t, e, n) { var r, i; return function() { var a = yt(this, t); return a === n ? null : a === r ? i : i = e(r = a, n) } }

            function ki(t, e, n) { var r, i, a; return function() { var f = yt(this, t),
                        o = n(this); return null == o && (this.style.removeProperty(t), o = yt(this, t)), f === o ? null : f === r && o === i ? a : a = e(r = f, i = o) } } var Ci = function(t, e, n) { var r = "transform" === (t += "") ? er : Br; return null == e ? this.styleTween(t, Si(t, r)).on("end.style." + t, Ni(t)) : this.styleTween(t, "function" === typeof e ? ki(t, r, Wr(this, "style." + t, e)) : Ti(t, r, e + ""), n) };

            function Ai(t, e, n) {
                function r() { var r = this,
                        i = e.apply(r, arguments); return i && function(e) { r.style.setProperty(t, i(e), n) } } return r._value = e, r } var Ei = function(t, e, n) { var r = "style." + (t += ""); if (arguments.length < 2) return (r = this.tween(r)) && r._value; if (null == e) return this.tween(r, null); if ("function" !== typeof e) throw new Error; return this.tween(r, Ai(t, e, null == n ? "" : n)) };

            function Pi(t) { return function() { this.textContent = t } }

            function Oi(t) { return function() { var e = t(this);
                    this.textContent = null == e ? "" : e } } var ji = function(t) { return this.tween("text", "function" === typeof t ? Oi(Wr(this, "text", t)) : Pi(null == t ? "" : t + "")) },
                Ui = function() { for (var t = this._name, e = this._id, n = Ri(), r = this._groups, i = r.length, a = 0; a < i; ++a)
                        for (var f, o = r[a], c = o.length, u = 0; u < c; ++u)
                            if (f = o[u]) { var s = zr(f, e);
                                Lr(f, t, n, u, o, { time: s.time + s.delay + s.duration, delay: 0, duration: s.duration, ease: s.ease }) }
                    return new Fi(r, this._parents, t, n) },
                Di = 0;

            function Fi(t, e, n, r) { this._groups = t, this._parents = e, this._name = n, this._id = r }

            function Li(t) { return pe().transition(t) }

            function Ri() { return ++Di } var Ii = pe.prototype;

            function zi(t) { return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2 }
            Fi.prototype = Li.prototype = { constructor: Fi, select: xi, selectAll: wi, filter: di, merge: pi, selection: Mi, transition: Ui, call: Ii.call, nodes: Ii.nodes, node: Ii.node, size: Ii.size, empty: Ii.empty, each: Ii.each, on: yi, attr: ei, attrTween: ii, style: Ci, styleTween: Ei, text: ji, remove: gi, tween: Vr, delay: oi, duration: si, ease: li }; var Yi = 3;
            (function t(e) {
                function n(t) { return Math.pow(t, e) } return e = +e, n.exponent = t, n })(Yi),
            function t(e) {
                function n(t) { return 1 - Math.pow(1 - t, e) } return e = +e, n.exponent = t, n }(Yi),
            function t(e) {
                function n(t) { return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2 } return e = +e, n.exponent = t, n }(Yi), Math.PI; var qi = 1.70158,
                Hi = (function t(e) {
                    function n(t) { return t * t * ((e + 1) * t - e) } return e = +e, n.overshoot = t, n }(qi), function t(e) {
                    function n(t) { return --t * t * ((e + 1) * t + e) + 1 } return e = +e, n.overshoot = t, n }(qi), function t(e) {
                    function n(t) { return ((t *= 2) < 1 ? t * t * ((e + 1) * t - e) : (t -= 2) * t * ((e + 1) * t + e) + 2) / 2 } return e = +e, n.overshoot = t, n }(qi), 2 * Math.PI),
                Xi = 1,
                $i = .3,
                Vi = (function t(e, n) { var r = Math.asin(1 / (e = Math.max(1, e))) * (n /= Hi);

                    function i(t) { return e * Math.pow(2, 10 * --t) * Math.sin((r - t) / n) } return i.amplitude = function(e) { return t(e, n * Hi) }, i.period = function(n) { return t(e, n) }, i }(Xi, $i), function t(e, n) { var r = Math.asin(1 / (e = Math.max(1, e))) * (n /= Hi);

                    function i(t) { return 1 - e * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / n) } return i.amplitude = function(e) { return t(e, n * Hi) }, i.period = function(n) { return t(e, n) }, i }(Xi, $i), function t(e, n) { var r = Math.asin(1 / (e = Math.max(1, e))) * (n /= Hi);

                    function i(t) { return ((t = 2 * t - 1) < 0 ? e * Math.pow(2, 10 * t) * Math.sin((r - t) / n) : 2 - e * Math.pow(2, -10 * t) * Math.sin((r + t) / n)) / 2 } return i.amplitude = function(e) { return t(e, n * Hi) }, i.period = function(n) { return t(e, n) }, i }(Xi, $i), { time: null, delay: 0, duration: 250, ease: zi });

            function Wi(t, e) { var n; while (!(n = t.__transition) || !(n = n[e]))
                    if (!(t = t.parentNode)) return Vi.time = vr(), Vi;
                return n } var Bi = function(t) { var e, n;
                t instanceof Fi ? (e = t._id, t = t._name) : (e = Ri(), (n = Vi).time = vr(), t = null == t ? null : t + ""); for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
                    for (var f, o = r[a], c = o.length, u = 0; u < c; ++u)(f = o[u]) && Lr(f, t, e, u, o, n || Wi(f, e)); return new Fi(r, this._parents, t, e) };
            pe.prototype.interrupt = Hr, pe.prototype.transition = Bi;
            ["e", "w"].map(Zi), ["n", "s"].map(Zi), ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(Zi);

            function Zi(t) { return { type: t } }
            Math.cos, Math.sin, Math.PI, Math.max;
            Array.prototype.slice; var Ji = Math.PI,
                Qi = 2 * Ji,
                Gi = 1e-6,
                Ki = Qi - Gi;

            function ta() { this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "" }

            function ea() { return new ta }
            ta.prototype = ea.prototype = { constructor: ta, moveTo: function(t, e) { this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e) }, closePath: function() { null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z") }, lineTo: function(t, e) { this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +e) }, quadraticCurveTo: function(t, e, n, r) { this._ += "Q" + +t + "," + +e + "," + (this._x1 = +n) + "," + (this._y1 = +r) }, bezierCurveTo: function(t, e, n, r, i, a) { this._ += "C" + +t + "," + +e + "," + +n + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +a) }, arcTo: function(t, e, n, r, i) { t = +t, e = +e, n = +n, r = +r, i = +i; var a = this._x1,
                        f = this._y1,
                        o = n - t,
                        c = r - e,
                        u = a - t,
                        s = f - e,
                        h = u * u + s * s; if (i < 0) throw new Error("negative radius: " + i); if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = e);
                    else if (h > Gi)
                        if (Math.abs(s * o - c * u) > Gi && i) { var l = n - a,
                                d = r - f,
                                p = o * o + c * c,
                                b = l * l + d * d,
                                _ = Math.sqrt(p),
                                y = Math.sqrt(h),
                                v = i * Math.tan((Ji - Math.acos((p + h - b) / (2 * _ * y))) / 2),
                                g = v / y,
                                x = v / _;
                            Math.abs(g - 1) > Gi && (this._ += "L" + (t + g * u) + "," + (e + g * s)), this._ += "A" + i + "," + i + ",0,0," + +(s * l > u * d) + "," + (this._x1 = t + x * o) + "," + (this._y1 = e + x * c) } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = e);
                    else; }, arc: function(t, e, n, r, i, a) { t = +t, e = +e, n = +n; var f = n * Math.cos(r),
                        o = n * Math.sin(r),
                        c = t + f,
                        u = e + o,
                        s = 1 ^ a,
                        h = a ? r - i : i - r; if (n < 0) throw new Error("negative radius: " + n);
                    null === this._x1 ? this._ += "M" + c + "," + u : (Math.abs(this._x1 - c) > Gi || Math.abs(this._y1 - u) > Gi) && (this._ += "L" + c + "," + u), n && (h < 0 && (h = h % Qi + Qi), h > Ki ? this._ += "A" + n + "," + n + ",0,1," + s + "," + (t - f) + "," + (e - o) + "A" + n + "," + n + ",0,1," + s + "," + (this._x1 = c) + "," + (this._y1 = u) : h > Gi && (this._ += "A" + n + "," + n + ",0," + +(h >= Ji) + "," + s + "," + (this._x1 = t + n * Math.cos(i)) + "," + (this._y1 = e + n * Math.sin(i)))) }, rect: function(t, e, n, r) { this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e) + "h" + +n + "v" + +r + "h" + -n + "Z" }, toString: function() { return this._ } }; var na = "$";

            function ra() {}

            function ia(t, e) { var n = new ra; if (t instanceof ra) t.each(function(t, e) { n.set(e, t) });
                else if (Array.isArray(t)) { var r, i = -1,
                        a = t.length; if (null == e)
                        while (++i < a) n.set(i, t[i]);
                    else
                        while (++i < a) n.set(e(r = t[i], i, t), r) } else if (t)
                    for (var f in t) n.set(f, t[f]); return n }
            ra.prototype = ia.prototype = { constructor: ra, has: function(t) { return na + t in this }, get: function(t) { return this[na + t] }, set: function(t, e) { return this[na + t] = e, this }, remove: function(t) { var e = na + t; return e in this && delete this[e] }, clear: function() { for (var t in this) t[0] === na && delete this[t] }, keys: function() { var t = []; for (var e in this) e[0] === na && t.push(e.slice(1)); return t }, values: function() { var t = []; for (var e in this) e[0] === na && t.push(this[e]); return t }, entries: function() { var t = []; for (var e in this) e[0] === na && t.push({ key: e.slice(1), value: this[e] }); return t }, size: function() { var t = 0; for (var e in this) e[0] === na && ++t; return t }, empty: function() { for (var t in this)
                        if (t[0] === na) return !1;
                    return !0 }, each: function(t) { for (var e in this) e[0] === na && t(this[e], e.slice(1), this) } }; var aa = ia;

            function fa() {} var oa = aa.prototype;

            function ca(t, e) { var n = new fa; if (t instanceof fa) t.each(function(t) { n.add(t) });
                else if (t) { var r = -1,
                        i = t.length; if (null == e)
                        while (++r < i) n.add(t[r]);
                    else
                        while (++r < i) n.add(e(t[r], r, t)) } return n }
            fa.prototype = ca.prototype = { constructor: fa, has: oa.has, add: function(t) { return t += "", this[na + t] = t, this }, remove: oa.remove, clear: oa.clear, values: oa.keys, size: oa.size, empty: oa.empty, each: oa.each }; var ua = Array.prototype;
            ua.slice; var sa = {},
                ha = {},
                la = 34,
                da = 10,
                pa = 13;

            function ba(t) { return new Function("d", "return {" + t.map(function(t, e) { return JSON.stringify(t) + ": d[" + e + "]" }).join(",") + "}") }

            function _a(t, e) { var n = ba(t); return function(r, i) { return e(n(r), i, t) } }

            function ya(t) { var e = Object.create(null),
                    n = []; return t.forEach(function(t) { for (var r in t) r in e || n.push(e[r] = r) }), n } var va = function(t) { var e = new RegExp('["' + t + "\n\r]"),
                        n = t.charCodeAt(0);

                    function r(t, e) { var n, r, a = i(t, function(t, i) { if (n) return n(t, i - 1);
                            r = t, n = e ? _a(t, e) : ba(t) }); return a.columns = r || [], a }

                    function i(t, e) { var r, i = [],
                            a = t.length,
                            f = 0,
                            o = 0,
                            c = a <= 0,
                            u = !1;

                        function s() { if (c) return ha; if (u) return u = !1, sa; var e, r, i = f; if (t.charCodeAt(i) === la) { while (f++ < a && t.charCodeAt(f) !== la || t.charCodeAt(++f) === la); return (e = f) >= a ? c = !0 : (r = t.charCodeAt(f++)) === da ? u = !0 : r === pa && (u = !0, t.charCodeAt(f) === da && ++f), t.slice(i + 1, e - 1).replace(/""/g, '"') } while (f < a) { if ((r = t.charCodeAt(e = f++)) === da) u = !0;
                                else if (r === pa) u = !0, t.charCodeAt(f) === da && ++f;
                                else if (r !== n) continue; return t.slice(i, e) } return c = !0, t.slice(i, a) }
                        t.charCodeAt(a - 1) === da && --a, t.charCodeAt(a - 1) === pa && --a; while ((r = s()) !== ha) { var h = []; while (r !== sa && r !== ha) h.push(r), r = s();
                            e && null == (h = e(h, o++)) || i.push(h) } return i }

                    function a(e, n) { return null == n && (n = ya(e)), [n.map(c).join(t)].concat(e.map(function(e) { return n.map(function(t) { return c(e[t]) }).join(t) })).join("\n") }

                    function f(t) { return t.map(o).join("\n") }

                    function o(e) { return e.map(c).join(t) }

                    function c(t) { return null == t ? "" : e.test(t += "") ? '"' + t.replace(/"/g, '""') + '"' : t } return { parse: r, parseRows: i, format: a, formatRows: f } },
                ga = va(","),
                xa = ga.parse,
                wa = (ga.parseRows, ga.format, ga.formatRows, va("\t")),
                ma = wa.parse;
            wa.parseRows, wa.format, wa.formatRows;

            function Ma(t) { if (!t.ok) throw new Error(t.status + " " + t.statusText); return t.text() } var Sa = function(t, e) { return fetch(t, e).then(Ma) };

            function Na(t) { return function(e, n, r) { return 2 === arguments.length && "function" === typeof n && (r = n, n = void 0), Sa(e, n).then(function(e) { return t(e, r) }) } }
            Na(xa), Na(ma);

            function Ta(t) { return function(e, n) { return Sa(e, n).then(function(e) { return (new DOMParser).parseFromString(e, t) }) } }
            Ta("application/xml"), Ta("text/html"), Ta("image/svg+xml"); var ka = function(t) { var e = +this._x.call(null, t),
                    n = +this._y.call(null, t); return Ca(this.cover(e, n), e, n, t) };

            function Ca(t, e, n, r) { if (isNaN(e) || isNaN(n)) return t; var i, a, f, o, c, u, s, h, l, d = t._root,
                    p = { data: r },
                    b = t._x0,
                    _ = t._y0,
                    y = t._x1,
                    v = t._y1; if (!d) return t._root = p, t; while (d.length)
                    if ((u = e >= (a = (b + y) / 2)) ? b = a : y = a, (s = n >= (f = (_ + v) / 2)) ? _ = f : v = f, i = d, !(d = d[h = s << 1 | u])) return i[h] = p, t;
                if (o = +t._x.call(null, d.data), c = +t._y.call(null, d.data), e === o && n === c) return p.next = d, i ? i[h] = p : t._root = p, t;
                do { i = i ? i[h] = new Array(4) : t._root = new Array(4), (u = e >= (a = (b + y) / 2)) ? b = a : y = a, (s = n >= (f = (_ + v) / 2)) ? _ = f : v = f } while ((h = s << 1 | u) === (l = (c >= f) << 1 | o >= a)); return i[l] = d, i[h] = p, t }

            function Aa(t) { var e, n, r, i, a = t.length,
                    f = new Array(a),
                    o = new Array(a),
                    c = 1 / 0,
                    u = 1 / 0,
                    s = -1 / 0,
                    h = -1 / 0; for (n = 0; n < a; ++n) isNaN(r = +this._x.call(null, e = t[n])) || isNaN(i = +this._y.call(null, e)) || (f[n] = r, o[n] = i, r < c && (c = r), r > s && (s = r), i < u && (u = i), i > h && (h = i)); for (s < c && (c = this._x0, s = this._x1), h < u && (u = this._y0, h = this._y1), this.cover(c, u).cover(s, h), n = 0; n < a; ++n) Ca(this, f[n], o[n], t[n]); return this } var Ea = function(t, e) { if (isNaN(t = +t) || isNaN(e = +e)) return this; var n = this._x0,
                        r = this._y0,
                        i = this._x1,
                        a = this._y1; if (isNaN(n)) i = (n = Math.floor(t)) + 1, a = (r = Math.floor(e)) + 1;
                    else { if (!(n > t || t > i || r > e || e > a)) return this; var f, o, c = i - n,
                            u = this._root; switch (o = (e < (r + a) / 2) << 1 | t < (n + i) / 2) {
                            case 0:
                                do { f = new Array(4), f[o] = u, u = f } while (c *= 2, i = n + c, a = r + c, t > i || e > a); break;
                            case 1:
                                do { f = new Array(4), f[o] = u, u = f } while (c *= 2, n = i - c, a = r + c, n > t || e > a); break;
                            case 2:
                                do { f = new Array(4), f[o] = u, u = f } while (c *= 2, i = n + c, r = a - c, t > i || r > e); break;
                            case 3:
                                do { f = new Array(4), f[o] = u, u = f } while (c *= 2, n = i - c, r = a - c, n > t || r > e); break }
                        this._root && this._root.length && (this._root = u) } return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this },
                Pa = function() { var t = []; return this.visit(function(e) { if (!e.length)
                            do { t.push(e.data) } while (e = e.next) }), t },
                Oa = function(t) { return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [
                        [this._x0, this._y0],
                        [this._x1, this._y1]
                    ] },
                ja = function(t, e, n, r, i) { this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i },
                Ua = function(t, e, n) { var r, i, a, f, o, c, u, s = this._x0,
                        h = this._y0,
                        l = this._x1,
                        d = this._y1,
                        p = [],
                        b = this._root;
                    b && p.push(new ja(b, s, h, l, d)), null == n ? n = 1 / 0 : (s = t - n, h = e - n, l = t + n, d = e + n, n *= n); while (c = p.pop())
                        if (!(!(b = c.node) || (i = c.x0) > l || (a = c.y0) > d || (f = c.x1) < s || (o = c.y1) < h))
                            if (b.length) { var _ = (i + f) / 2,
                                    y = (a + o) / 2;
                                p.push(new ja(b[3], _, y, f, o), new ja(b[2], i, y, _, o), new ja(b[1], _, a, f, y), new ja(b[0], i, a, _, y)), (u = (e >= y) << 1 | t >= _) && (c = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - u], p[p.length - 1 - u] = c) } else { var v = t - +this._x.call(null, b.data),
                                    g = e - +this._y.call(null, b.data),
                                    x = v * v + g * g; if (x < n) { var w = Math.sqrt(n = x);
                                    s = t - w, h = e - w, l = t + w, d = e + w, r = b.data } }
                    return r },
                Da = function(t) { if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this; var e, n, r, i, a, f, o, c, u, s, h, l, d = this._root,
                        p = this._x0,
                        b = this._y0,
                        _ = this._x1,
                        y = this._y1; if (!d) return this; if (d.length)
                        while (1) { if ((u = a >= (o = (p + _) / 2)) ? p = o : _ = o, (s = f >= (c = (b + y) / 2)) ? b = c : y = c, e = d, !(d = d[h = s << 1 | u])) return this; if (!d.length) break;
                            (e[h + 1 & 3] || e[h + 2 & 3] || e[h + 3 & 3]) && (n = e, l = h) }
                    while (d.data !== t)
                        if (r = d, !(d = d.next)) return this;
                    return (i = d.next) && delete d.next, r ? (i ? r.next = i : delete r.next, this) : e ? (i ? e[h] = i : delete e[h], (d = e[0] || e[1] || e[2] || e[3]) && d === (e[3] || e[2] || e[1] || e[0]) && !d.length && (n ? n[l] = d : this._root = d), this) : (this._root = i, this) };

            function Fa(t) { for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]); return this } var La = function() { return this._root },
                Ra = function() { var t = 0; return this.visit(function(e) { if (!e.length)
                            do {++t } while (e = e.next) }), t },
                Ia = function(t) { var e, n, r, i, a, f, o = [],
                        c = this._root;
                    c && o.push(new ja(c, this._x0, this._y0, this._x1, this._y1)); while (e = o.pop())
                        if (!t(c = e.node, r = e.x0, i = e.y0, a = e.x1, f = e.y1) && c.length) { var u = (r + a) / 2,
                                s = (i + f) / 2;
                            (n = c[3]) && o.push(new ja(n, u, s, a, f)), (n = c[2]) && o.push(new ja(n, r, s, u, f)), (n = c[1]) && o.push(new ja(n, u, i, a, s)), (n = c[0]) && o.push(new ja(n, r, i, u, s)) }
                    return this },
                za = function(t) { var e, n = [],
                        r = [];
                    this._root && n.push(new ja(this._root, this._x0, this._y0, this._x1, this._y1)); while (e = n.pop()) { var i = e.node; if (i.length) { var a, f = e.x0,
                                o = e.y0,
                                c = e.x1,
                                u = e.y1,
                                s = (f + c) / 2,
                                h = (o + u) / 2;
                            (a = i[0]) && n.push(new ja(a, f, o, s, h)), (a = i[1]) && n.push(new ja(a, s, o, c, h)), (a = i[2]) && n.push(new ja(a, f, h, s, u)), (a = i[3]) && n.push(new ja(a, s, h, c, u)) }
                        r.push(e) } while (e = r.pop()) t(e.node, e.x0, e.y0, e.x1, e.y1); return this };

            function Ya(t) { return t[0] } var qa = function(t) { return arguments.length ? (this._x = t, this) : this._x };

            function Ha(t) { return t[1] } var Xa = function(t) { return arguments.length ? (this._y = t, this) : this._y };

            function $a(t, e, n) { var r = new Va(null == e ? Ya : e, null == n ? Ha : n, NaN, NaN, NaN, NaN); return null == t ? r : r.addAll(t) }

            function Va(t, e, n, r, i, a) { this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this._root = void 0 }

            function Wa(t) { var e = { data: t.data },
                    n = e; while (t = t.next) n = n.next = { data: t.data }; return e } var Ba = $a.prototype = Va.prototype;
            Ba.copy = function() { var t, e, n = new Va(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
                    r = this._root; if (!r) return n; if (!r.length) return n._root = Wa(r), n;
                t = [{ source: r, target: n._root = new Array(4) }]; while (r = t.pop())
                    for (var i = 0; i < 4; ++i)(e = r.source[i]) && (e.length ? t.push({ source: e, target: r.target[i] = new Array(4) }) : r.target[i] = Wa(e)); return n }, Ba.add = ka, Ba.addAll = Aa, Ba.cover = Ea, Ba.data = Pa, Ba.extent = Oa, Ba.find = Ua, Ba.remove = Da, Ba.removeAll = Fa, Ba.root = La, Ba.size = Ra, Ba.visit = Ia, Ba.visitAfter = za, Ba.x = qa, Ba.y = Xa;
            Math.PI, Math.sqrt(5); var Za = function(t, e) { if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null; var n, r = t.slice(0, n); return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(n + 1)] },
                Ja = function(t) { return t = Za(Math.abs(t)), t ? t[1] : NaN },
                Qa = function(t, e) { return function(n, r) { var i = n.length,
                            a = [],
                            f = 0,
                            o = t[0],
                            c = 0; while (i > 0 && o > 0) { if (c + o + 1 > r && (o = Math.max(1, r - c)), a.push(n.substring(i -= o, i + o)), (c += o + 1) > r) break;
                            o = t[f = (f + 1) % t.length] } return a.reverse().join(e) } },
                Ga = function(t) { return function(e) { return e.replace(/[0-9]/g, function(e) { return t[+e] }) } },
                Ka = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

            function tf(t) { return new ef(t) }

            function ef(t) { if (!(e = Ka.exec(t))) throw new Error("invalid format: " + t); var e;
                this.fill = e[1] || " ", this.align = e[2] || ">", this.sign = e[3] || "-", this.symbol = e[4] || "", this.zero = !!e[5], this.width = e[6] && +e[6], this.comma = !!e[7], this.precision = e[8] && +e[8].slice(1), this.trim = !!e[9], this.type = e[10] || "" }
            tf.prototype = ef.prototype, ef.prototype.toString = function() { return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type }; var nf, rf, af = function(t) { t: for (var e, n = t.length, r = 1, i = -1; r < n; ++r) switch (t[r]) {
                        case ".":
                            i = e = r; break;
                        case "0":
                            0 === i && (i = r), e = r; break;
                        default:
                            if (i > 0) { if (!+t[r]) break t;
                                i = 0 } break }
                    return i > 0 ? t.slice(0, i) + t.slice(e + 1) : t },
                ff = function(t, e) { var n = Za(t, e); if (!n) return t + ""; var r = n[0],
                        i = n[1],
                        a = i - (nf = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                        f = r.length; return a === f ? r : a > f ? r + new Array(a - f + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Za(t, Math.max(0, e + a - 1))[0] },
                of = function(t, e) { var n = Za(t, e); if (!n) return t + ""; var r = n[0],
                        i = n[1]; return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0") },
                cf = { "%": function(t, e) { return (100 * t).toFixed(e) }, b: function(t) { return Math.round(t).toString(2) }, c: function(t) { return t + "" }, d: function(t) { return Math.round(t).toString(10) }, e: function(t, e) { return t.toExponential(e) }, f: function(t, e) { return t.toFixed(e) }, g: function(t, e) { return t.toPrecision(e) }, o: function(t) { return Math.round(t).toString(8) }, p: function(t, e) { return of(100 * t, e) }, r: of, s: ff, X: function(t) { return Math.round(t).toString(16).toUpperCase() }, x: function(t) { return Math.round(t).toString(16) } },
                uf = function(t) { return t },
                sf = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
                hf = function(t) { var e = t.grouping && t.thousands ? Qa(t.grouping, t.thousands) : uf,
                        n = t.currency,
                        r = t.decimal,
                        i = t.numerals ? Ga(t.numerals) : uf,
                        a = t.percent || "%";

                    function f(t) { t = tf(t); var f = t.fill,
                            o = t.align,
                            c = t.sign,
                            u = t.symbol,
                            s = t.zero,
                            h = t.width,
                            l = t.comma,
                            d = t.precision,
                            p = t.trim,
                            b = t.type; "n" === b ? (l = !0, b = "g") : cf[b] || (null == d && (d = 12), p = !0, b = "g"), (s || "0" === f && "=" === o) && (s = !0, f = "0", o = "="); var _ = "$" === u ? n[0] : "#" === u && /[boxX]/.test(b) ? "0" + b.toLowerCase() : "",
                            y = "$" === u ? n[1] : /[%p]/.test(b) ? a : "",
                            v = cf[b],
                            g = /[defgprs%]/.test(b);

                        function x(t) { var n, a, u, x = _,
                                w = y; if ("c" === b) w = v(t) + w, t = "";
                            else { t = +t; var m = t < 0; if (t = v(Math.abs(t), d), p && (t = af(t)), m && 0 === +t && (m = !1), x = (m ? "(" === c ? c : "-" : "-" === c || "(" === c ? "" : c) + x, w = ("s" === b ? sf[8 + nf / 3] : "") + w + (m && "(" === c ? ")" : ""), g) { n = -1, a = t.length; while (++n < a)
                                        if (u = t.charCodeAt(n), 48 > u || u > 57) { w = (46 === u ? r + t.slice(n + 1) : t.slice(n)) + w, t = t.slice(0, n); break } } }
                            l && !s && (t = e(t, 1 / 0)); var M = x.length + t.length + w.length,
                                S = M < h ? new Array(h - M + 1).join(f) : ""; switch (l && s && (t = e(S + t, S.length ? h - w.length : 1 / 0), S = ""), o) {
                                case "<":
                                    t = x + t + w + S; break;
                                case "=":
                                    t = x + S + t + w; break;
                                case "^":
                                    t = S.slice(0, M = S.length >> 1) + x + t + w + S.slice(M); break;
                                default:
                                    t = S + x + t + w; break } return i(t) } return d = null == d ? 6 : /[gprs]/.test(b) ? Math.max(1, Math.min(21, d)) : Math.max(0, Math.min(20, d)), x.toString = function() { return t + "" }, x }

                    function o(t, e) { var n = f((t = tf(t), t.type = "f", t)),
                            r = 3 * Math.max(-8, Math.min(8, Math.floor(Ja(e) / 3))),
                            i = Math.pow(10, -r),
                            a = sf[8 + r / 3]; return function(t) { return n(i * t) + a } } return { format: f, formatPrefix: o } };

            function lf(t) { return rf = hf(t), rf.format, rf.formatPrefix, rf }
            lf({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""] }); var df = function() { return new pf };

            function pf() { this.reset() }
            pf.prototype = { constructor: pf, reset: function() { this.s = this.t = 0 }, add: function(t) { _f(bf, t, this.t), _f(this, bf.s, this.s), this.s ? this.t += bf.t : this.s = bf.t }, valueOf: function() { return this.s } }; var bf = new pf;

            function _f(t, e, n) { var r = t.s = e + n,
                    i = r - e,
                    a = r - i;
                t.t = e - a + (n - i) } var yf = 1e-6,
                vf = 1e-12,
                gf = Math.PI,
                xf = gf / 2,
                wf = gf / 4,
                mf = 2 * gf,
                Mf = gf / 180,
                Sf = Math.abs,
                Nf = Math.atan,
                Tf = Math.atan2,
                kf = Math.cos,
                Cf = (Math.ceil, Math.exp),
                Af = (Math.floor, Math.log),
                Ef = (Math.pow, Math.sin),
                Pf = (Math.sign, Math.sqrt),
                Of = Math.tan;

            function jf(t) { return t > 1 ? 0 : t < -1 ? gf : Math.acos(t) }

            function Uf(t) { return t > 1 ? xf : t < -1 ? -xf : Math.asin(t) }

            function Df() {}
            df(), df();

            function Ff(t) { var e = t[0],
                    n = t[1],
                    r = kf(n); return [r * kf(e), r * Ef(e), Ef(n)] }

            function Lf(t, e) { return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]] }

            function Rf(t) { var e = Pf(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
                t[0] /= e, t[1] /= e, t[2] /= e }
            df();

            function If(t, e) { return [t > gf ? t - mf : t < -gf ? t + mf : t, e] }
            If.invert = If; var zf = function() { var t, e = []; return { point: function(e, n) { t.push([e, n]) }, lineStart: function() { e.push(t = []) }, lineEnd: Df, rejoin: function() { e.length > 1 && e.push(e.pop().concat(e.shift())) }, result: function() { var n = e; return e = [], t = null, n } } },
                Yf = function(t, e) { return Sf(t[0] - e[0]) < yf && Sf(t[1] - e[1]) < yf };

            function qf(t, e, n, r) { this.x = t, this.z = e, this.o = n, this.e = r, this.v = !1, this.n = this.p = null } var Hf = function(t, e, n, r, i) { var a, f, o = [],
                    c = []; if (t.forEach(function(t) { if (!((e = t.length - 1) <= 0)) { var e, n, r = t[0],
                                f = t[e]; if (Yf(r, f)) { for (i.lineStart(), a = 0; a < e; ++a) i.point((r = t[a])[0], r[1]);
                                i.lineEnd() } else o.push(n = new qf(r, t, null, !0)), c.push(n.o = new qf(r, null, n, !1)), o.push(n = new qf(f, t, null, !1)), c.push(n.o = new qf(f, null, n, !0)) } }), o.length) { for (c.sort(e), Xf(o), Xf(c), a = 0, f = c.length; a < f; ++a) c[a].e = n = !n; var u, s, h = o[0]; while (1) { var l = h,
                            d = !0; while (l.v)
                            if ((l = l.n) === h) return;
                        u = l.z, i.lineStart();
                        do { if (l.v = l.o.v = !0, l.e) { if (d)
                                    for (a = 0, f = u.length; a < f; ++a) i.point((s = u[a])[0], s[1]);
                                else r(l.x, l.n.x, 1, i);
                                l = l.n } else { if (d)
                                    for (u = l.p.z, a = u.length - 1; a >= 0; --a) i.point((s = u[a])[0], s[1]);
                                else r(l.x, l.p.x, -1, i);
                                l = l.p }
                            l = l.o, u = l.z, d = !d } while (!l.v);
                        i.lineEnd() } } };

            function Xf(t) { if (e = t.length) { var e, n, r = 0,
                        i = t[0]; while (++r < e) i.n = n = t[r], n.p = i, i = n;
                    i.n = n = t[0], n.p = i } } var $f = df(),
                Vf = function(t, e) { var n = e[0],
                        r = e[1],
                        i = Ef(r),
                        a = [Ef(n), -kf(n), 0],
                        f = 0,
                        o = 0;
                    $f.reset(), 1 === i ? r = xf + yf : -1 === i && (r = -xf - yf); for (var c = 0, u = t.length; c < u; ++c)
                        if (h = (s = t[c]).length)
                            for (var s, h, l = s[h - 1], d = l[0], p = l[1] / 2 + wf, b = Ef(p), _ = kf(p), y = 0; y < h; ++y, d = g, b = w, _ = m, l = v) { var v = s[y],
                                    g = v[0],
                                    x = v[1] / 2 + wf,
                                    w = Ef(x),
                                    m = kf(x),
                                    M = g - d,
                                    S = M >= 0 ? 1 : -1,
                                    N = S * M,
                                    T = N > gf,
                                    k = b * w; if ($f.add(Tf(k * S * Ef(N), _ * m + k * kf(N))), f += T ? M + S * mf : M, T ^ d >= n ^ g >= n) { var C = Lf(Ff(l), Ff(v));
                                    Rf(C); var A = Lf(a, C);
                                    Rf(A); var E = (T ^ M >= 0 ? -1 : 1) * Uf(A[2]);
                                    (r > E || r === E && (C[0] || C[1])) && (o += T ^ M >= 0 ? 1 : -1) } }
                        return (f < -yf || f < yf && $f < -yf) ^ 1 & o },
                Wf = function(t, e, n, r) { return function(i) { var a, f, o, c = e(i),
                            u = zf(),
                            s = e(u),
                            h = !1,
                            l = { point: d, lineStart: b, lineEnd: _, polygonStart: function() { l.point = y, l.lineStart = v, l.lineEnd = g, f = [], a = [] }, polygonEnd: function() { l.point = d, l.lineStart = b, l.lineEnd = _, f = w(f); var t = Vf(a, r);
                                    f.length ? (h || (i.polygonStart(), h = !0), Hf(f, Zf, t, n, i)) : t && (h || (i.polygonStart(), h = !0), i.lineStart(), n(null, null, 1, i), i.lineEnd()), h && (i.polygonEnd(), h = !1), f = a = null }, sphere: function() { i.polygonStart(), i.lineStart(), n(null, null, 1, i), i.lineEnd(), i.polygonEnd() } };

                        function d(e, n) { t(e, n) && i.point(e, n) }

                        function p(t, e) { c.point(t, e) }

                        function b() { l.point = p, c.lineStart() }

                        function _() { l.point = d, c.lineEnd() }

                        function y(t, e) { o.push([t, e]), s.point(t, e) }

                        function v() { s.lineStart(), o = [] }

                        function g() { y(o[0][0], o[0][1]), s.lineEnd(); var t, e, n, r, c = s.clean(),
                                l = u.result(),
                                d = l.length; if (o.pop(), a.push(o), o = null, d)
                                if (1 & c) { if (n = l[0], (e = n.length - 1) > 0) { for (h || (i.polygonStart(), h = !0), i.lineStart(), t = 0; t < e; ++t) i.point((r = n[t])[0], r[1]);
                                        i.lineEnd() } } else d > 1 && 2 & c && l.push(l.pop().concat(l.shift())), f.push(l.filter(Bf)) } return l } };

            function Bf(t) { return t.length > 1 }

            function Zf(t, e) { return ((t = t.x)[0] < 0 ? t[1] - xf - yf : xf - t[1]) - ((e = e.x)[0] < 0 ? e[1] - xf - yf : xf - e[1]) }
            Wf(function() { return !0 }, Jf, Gf, [-gf, -xf]);

            function Jf(t) { var e, n = NaN,
                    r = NaN,
                    i = NaN; return { lineStart: function() { t.lineStart(), e = 1 }, point: function(a, f) { var o = a > 0 ? gf : -gf,
                            c = Sf(a - n);
                        Sf(c - gf) < yf ? (t.point(n, r = (r + f) / 2 > 0 ? xf : -xf), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(o, r), t.point(a, r), e = 0) : i !== o && c >= gf && (Sf(n - i) < yf && (n -= i * yf), Sf(a - o) < yf && (a -= o * yf), r = Qf(n, r, a, f), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(o, r), e = 0), t.point(n = a, r = f), i = o }, lineEnd: function() { t.lineEnd(), n = r = NaN }, clean: function() { return 2 - e } } }

            function Qf(t, e, n, r) { var i, a, f = Ef(t - n); return Sf(f) > yf ? Nf((Ef(e) * (a = kf(r)) * Ef(n) - Ef(r) * (i = kf(e)) * Ef(t)) / (i * a * f)) : (e + r) / 2 }

            function Gf(t, e, n, r) { var i; if (null == t) i = n * xf, r.point(-gf, i), r.point(0, i), r.point(gf, i), r.point(gf, 0), r.point(gf, -i), r.point(0, -i), r.point(-gf, -i), r.point(-gf, 0), r.point(-gf, i);
                else if (Sf(t[0] - e[0]) > yf) { var a = t[0] < e[0] ? gf : -gf;
                    i = n * a / 2, r.point(-a, i), r.point(0, i), r.point(a, i) } else r.point(e[0], e[1]) }
            df();
            df(), df();

            function Kf(t) { this._context = t }
            Kf.prototype = { _radius: 4.5, pointRadius: function(t) { return this._radius = t, this }, polygonStart: function() { this._line = 0 }, polygonEnd: function() { this._line = NaN }, lineStart: function() { this._point = 0 }, lineEnd: function() { 0 === this._line && this._context.closePath(), this._point = NaN }, point: function(t, e) { switch (this._point) {
                        case 0:
                            this._context.moveTo(t, e), this._point = 1; break;
                        case 1:
                            this._context.lineTo(t, e); break;
                        default:
                            this._context.moveTo(t + this._radius, e), this._context.arc(t, e, this._radius, 0, mf); break } }, result: Df };
            df();

            function to() { this._string = [] }

            function eo(t) { return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z" }
            to.prototype = { _radius: 4.5, _circle: eo(4.5), pointRadius: function(t) { return (t = +t) !== this._radius && (this._radius = t, this._circle = null), this }, polygonStart: function() { this._line = 0 }, polygonEnd: function() { this._line = NaN }, lineStart: function() { this._point = 0 }, lineEnd: function() { 0 === this._line && this._string.push("Z"), this._point = NaN }, point: function(t, e) { switch (this._point) {
                        case 0:
                            this._string.push("M", t, ",", e), this._point = 1; break;
                        case 1:
                            this._string.push("L", t, ",", e); break;
                        default:
                            null == this._circle && (this._circle = eo(this._radius)), this._string.push("M", t, ",", e, this._circle); break } }, result: function() { if (this._string.length) { var t = this._string.join(""); return this._string = [], t } return null } };

            function no(t) { return function(e) { var n = new ro; for (var r in t) n[r] = t[r]; return n.stream = e, n } }

            function ro() {}
            ro.prototype = { constructor: ro, point: function(t, e) { this.stream.point(t, e) }, sphere: function() { this.stream.sphere() }, lineStart: function() { this.stream.lineStart() }, lineEnd: function() { this.stream.lineEnd() }, polygonStart: function() { this.stream.polygonStart() }, polygonEnd: function() { this.stream.polygonEnd() } };
            kf(30 * Mf);
            no({ point: function(t, e) { this.stream.point(t * Mf, e * Mf) } });

            function io(t) { return function(e, n) { var r = kf(e),
                        i = kf(n),
                        a = t(r * i); return [a * i * Ef(e), a * Ef(n)] } }

            function ao(t) { return function(e, n) { var r = Pf(e * e + n * n),
                        i = t(r),
                        a = Ef(i),
                        f = kf(i); return [Tf(e * a, r * f), Uf(r && n * a / r)] } } var fo = io(function(t) { return Pf(2 / (1 + t)) });
            fo.invert = ao(function(t) { return 2 * Uf(t / 2) }); var oo = io(function(t) { return (t = jf(t)) && t / Ef(t) });
            oo.invert = ao(function(t) { return t });

            function co(t, e) { return [t, Af(Of((xf + e) / 2))] }
            co.invert = function(t, e) { return [t, 2 * Nf(Cf(e)) - xf] };

            function uo(t, e) { return [t, e] }
            uo.invert = uo; var so = 1.340264,
                ho = -.081106,
                lo = 893e-6,
                po = .003796,
                bo = Pf(3) / 2,
                _o = 12;

            function yo(t, e) { var n = Uf(bo * Ef(e)),
                    r = n * n,
                    i = r * r * r; return [t * kf(n) / (bo * (so + 3 * ho * r + i * (7 * lo + 9 * po * r))), n * (so + ho * r + i * (lo + po * r))] }
            yo.invert = function(t, e) { for (var n, r, i, a = e, f = a * a, o = f * f * f, c = 0; c < _o; ++c)
                    if (r = a * (so + ho * f + o * (lo + po * f)) - e, i = so + 3 * ho * f + o * (7 * lo + 9 * po * f), a -= n = r / i, f = a * a, o = f * f * f, Sf(n) < vf) break;
                return [bo * t * (so + 3 * ho * f + o * (7 * lo + 9 * po * f)) / kf(a), Uf(Ef(a) / bo)] };

            function vo(t, e) { var n = kf(e),
                    r = kf(t) * n; return [n * Ef(t) / r, Ef(e) / r] }
            vo.invert = ao(Nf);

            function go(t, e) { var n = e * e,
                    r = n * n; return [t * (.8707 - .131979 * n + r * (r * (.003971 * n - .001529 * r) - .013791)), e * (1.007226 + n * (.015085 + r * (.028874 * n - .044475 - .005916 * r)))] }
            go.invert = function(t, e) { var n, r = e,
                    i = 25;
                do { var a = r * r,
                        f = a * a;
                    r -= n = (r * (1.007226 + a * (.015085 + f * (.028874 * a - .044475 - .005916 * f))) - e) / (1.007226 + a * (.045255 + f * (.259866 * a - .311325 - .005916 * 11 * f))) } while (Sf(n) > yf && --i > 0); return [t / (.8707 + (a = r * r) * (a * (a * a * a * (.003971 - .001529 * a) - .013791) - .131979)), r] };

            function xo(t, e) { return [kf(e) * Ef(t), Ef(e)] }
            xo.invert = ao(Uf);

            function wo(t, e) { var n = kf(e),
                    r = 1 + kf(t) * n; return [n * Ef(t) / r, Ef(e) / r] }
            wo.invert = ao(function(t) { return 2 * Nf(t) });

            function mo(t, e) { return [Af(Of((xf + e) / 2)), -t] }
            mo.invert = function(t, e) { return [-e, 2 * Nf(Cf(t)) - xf] };

            function Mo(t) { var e = 0,
                    n = t.children,
                    r = n && n.length; if (r)
                    while (--r >= 0) e += n[r].value;
                else e = 1;
                t.value = e } var So = function() { return this.eachAfter(Mo) },
                No = function(t) { var e, n, r, i, a = this,
                        f = [a];
                    do { e = f.reverse(), f = []; while (a = e.pop())
                            if (t(a), n = a.children, n)
                                for (r = 0, i = n.length; r < i; ++r) f.push(n[r]) } while (f.length); return this },
                To = function(t) { var e, n, r = this,
                        i = [r]; while (r = i.pop())
                        if (t(r), e = r.children, e)
                            for (n = e.length - 1; n >= 0; --n) i.push(e[n]);
                    return this },
                ko = function(t) { var e, n, r, i = this,
                        a = [i],
                        f = []; while (i = a.pop())
                        if (f.push(i), e = i.children, e)
                            for (n = 0, r = e.length; n < r; ++n) a.push(e[n]);
                    while (i = f.pop()) t(i); return this },
                Co = function(t) { return this.eachAfter(function(e) { var n = +t(e.data) || 0,
                            r = e.children,
                            i = r && r.length; while (--i >= 0) n += r[i].value;
                        e.value = n }) },
                Ao = function(t) { return this.eachBefore(function(e) { e.children && e.children.sort(t) }) },
                Eo = function(t) { var e = this,
                        n = Po(e, t),
                        r = [e]; while (e !== n) e = e.parent, r.push(e); var i = r.length; while (t !== n) r.splice(i, 0, t), t = t.parent; return r };

            function Po(t, e) { if (t === e) return t; var n = t.ancestors(),
                    r = e.ancestors(),
                    i = null;
                t = n.pop(), e = r.pop(); while (t === e) i = t, t = n.pop(), e = r.pop(); return i } var Oo = function() { var t = this,
                        e = [t]; while (t = t.parent) e.push(t); return e },
                jo = function() { var t = []; return this.each(function(e) { t.push(e) }), t },
                Uo = function() { var t = []; return this.eachBefore(function(e) { e.children || t.push(e) }), t },
                Do = function() { var t = this,
                        e = []; return t.each(function(n) { n !== t && e.push({ source: n.parent, target: n }) }), e };

            function Fo(t, e) { var n, r, i, a, f, o = new Yo(t),
                    c = +t.value && (o.value = t.value),
                    u = [o];
                null == e && (e = Ro); while (n = u.pop())
                    if (c && (n.value = +n.data.value), (i = e(n.data)) && (f = i.length))
                        for (n.children = new Array(f), a = f - 1; a >= 0; --a) u.push(r = n.children[a] = new Yo(i[a])), r.parent = n, r.depth = n.depth + 1;
                return o.eachBefore(zo) }

            function Lo() { return Fo(this).eachBefore(Io) }

            function Ro(t) { return t.children }

            function Io(t) { t.data = t.data.data }

            function zo(t) { var e = 0;
                do { t.height = e } while ((t = t.parent) && t.height < ++e) }

            function Yo(t) { this.data = t, this.depth = this.height = 0, this.parent = null }
            Yo.prototype = Fo.prototype = { constructor: Yo, count: So, each: No, eachAfter: ko, eachBefore: To, sum: Co, sort: Ao, path: Eo, ancestors: Oo, descendants: jo, leaves: Uo, links: Do, copy: Lo };
            Array.prototype.slice; var qo = function(t, e, n, r, i) { var a, f = t.children,
                    o = -1,
                    c = f.length,
                    u = t.value && (r - e) / t.value; while (++o < c) a = f[o], a.y0 = n, a.y1 = i, a.x0 = e, a.x1 = e += a.value * u };

            function Ho(t, e) { this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e }
            Ho.prototype = Object.create(Yo.prototype); var Xo = function(t, e, n, r, i) { var a, f = t.children,
                        o = -1,
                        c = f.length,
                        u = t.value && (i - n) / t.value; while (++o < c) a = f[o], a.x0 = e, a.x1 = r, a.y0 = n, a.y1 = n += a.value * u },
                $o = (1 + Math.sqrt(5)) / 2;

            function Vo(t, e, n, r, i, a) { var f, o, c, u, s, h, l, d, p, b, _, y = [],
                    v = e.children,
                    g = 0,
                    x = 0,
                    w = v.length,
                    m = e.value; while (g < w) { c = i - n, u = a - r;
                    do { s = v[x++].value } while (!s && x < w); for (h = l = s, b = Math.max(u / c, c / u) / (m * t), _ = s * s * b, p = Math.max(l / _, _ / h); x < w; ++x) { if (s += o = v[x].value, o < h && (h = o), o > l && (l = o), _ = s * s * b, d = Math.max(l / _, _ / h), d > p) { s -= o; break }
                        p = d }
                    y.push(f = { value: s, dice: c < u, children: v.slice(g, x) }), f.dice ? qo(f, n, r, i, m ? r += u * s / m : a) : Xo(f, n, r, m ? n += c * s / m : i, a), m -= s, g = x } return y }(function t(e) {
                function n(t, n, r, i, a) { Vo(e, t, n, r, i, a) } return n.ratio = function(e) { return t((e = +e) > 1 ? e : 1) }, n })($o),
            function t(e) {
                function n(t, n, r, i, a) { if ((f = t._squarify) && f.ratio === e) { var f, o, c, u, s, h = -1,
                            l = f.length,
                            d = t.value; while (++h < l) { for (o = f[h], c = o.children, u = o.value = 0, s = c.length; u < s; ++u) o.value += c[u].value;
                            o.dice ? qo(o, n, r, i, r += (a - r) * o.value / d) : Xo(o, n, r, n += (i - n) * o.value / d, a), d -= o.value } } else t._squarify = f = Vo(e, t, n, r, i, a), f.ratio = e } return n.ratio = function(e) { return t((e = +e) > 1 ? e : 1) }, n }($o); var Wo = function() { return Math.random() },
                Bo = (function t(e) {
                    function n(t, n) { return t = null == t ? 0 : +t, n = null == n ? 1 : +n, 1 === arguments.length ? (n = t, t = 0) : n -= t,
                            function() { return e() * n + t } } return n.source = t, n }(Wo), function t(e) {
                    function n(t, n) { var r, i; return t = null == t ? 0 : +t, n = null == n ? 1 : +n,
                            function() { var a; if (null != r) a = r, r = null;
                                else
                                    do { r = 2 * e() - 1, a = 2 * e() - 1, i = r * r + a * a } while (!i || i > 1); return t + n * a * Math.sqrt(-2 * Math.log(i) / i) } } return n.source = t, n }(Wo)),
                Zo = (function t(e) {
                    function n() { var t = Bo.source(e).apply(this, arguments); return function() { return Math.exp(t()) } } return n.source = t, n }(Wo), function t(e) {
                    function n(t) { return function() { for (var n = 0, r = 0; r < t; ++r) n += e(); return n } } return n.source = t, n }(Wo)),
                Jo = (function t(e) {
                    function n(t) { var n = Zo.source(e)(t); return function() { return n() / t } } return n.source = t, n }(Wo), function t(e) {
                    function n(t) { return function() { return -Math.log(1 - e()) / t } } return n.source = t, n }(Wo), Array.prototype),
                Qo = (Jo.map, Jo.slice),
                Go = { name: "implicit" };

            function Ko(t) { var e = aa(),
                    n = [],
                    r = Go;

                function i(i) { var a = i + "",
                        f = e.get(a); if (!f) { if (r !== Go) return r;
                        e.set(a, f = n.push(i)) } return t[(f - 1) % t.length] } return t = null == t ? [] : Qo.call(t), i.domain = function(t) { if (!arguments.length) return n.slice();
                    n = [], e = aa(); var r, a, f = -1,
                        o = t.length; while (++f < o) e.has(a = (r = t[f]) + "") || e.set(a, n.push(r)); return i }, i.range = function(e) { return arguments.length ? (t = Qo.call(e), i) : t.slice() }, i.unknown = function(t) { return arguments.length ? (r = t, i) : r }, i.copy = function() { return Ko().domain(n).range(t).unknown(r) }, i } var tc = new Date,
                ec = new Date;

            function nc(t, e, n, r) {
                function i(e) { return t(e = new Date(+e)), e } return i.floor = i, i.ceil = function(n) { return t(n = new Date(n - 1)), e(n, 1), t(n), n }, i.round = function(t) { var e = i(t),
                        n = i.ceil(t); return t - e < n - t ? e : n }, i.offset = function(t, n) { return e(t = new Date(+t), null == n ? 1 : Math.floor(n)), t }, i.range = function(n, r, a) { var f, o = []; if (n = i.ceil(n), a = null == a ? 1 : Math.floor(a), !(n < r) || !(a > 0)) return o;
                    do { o.push(f = new Date(+n)), e(n, a), t(n) } while (f < n && n < r); return o }, i.filter = function(n) { return nc(function(e) { if (e >= e)
                            while (t(e), !n(e)) e.setTime(e - 1) }, function(t, r) { if (t >= t)
                            if (r < 0)
                                while (++r <= 0)
                                    while (e(t, -1), !n(t));
                            else
                                while (--r >= 0)
                                    while (e(t, 1), !n(t)); }) }, n && (i.count = function(e, r) { return tc.setTime(+e), ec.setTime(+r), t(tc), t(ec), Math.floor(n(tc, ec)) }, i.every = function(t) { return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function(e) { return r(e) % t === 0 } : function(e) { return i.count(0, e) % t === 0 }) : i : null }), i } var rc = nc(function() {}, function(t, e) { t.setTime(+t + e) }, function(t, e) { return e - t });
            rc.every = function(t) { return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? nc(function(e) { e.setTime(Math.floor(e / t) * t) }, function(e, n) { e.setTime(+e + n * t) }, function(e, n) { return (n - e) / t }) : rc : null };
            rc.range; var ic = 1e3,
                ac = 6e4,
                fc = 36e5,
                oc = 864e5,
                cc = 6048e5,
                uc = nc(function(t) { t.setTime(Math.floor(t / ic) * ic) }, function(t, e) { t.setTime(+t + e * ic) }, function(t, e) { return (e - t) / ic }, function(t) { return t.getUTCSeconds() }),
                sc = (uc.range, nc(function(t) { t.setTime(Math.floor(t / ac) * ac) }, function(t, e) { t.setTime(+t + e * ac) }, function(t, e) { return (e - t) / ac }, function(t) { return t.getMinutes() })),
                hc = (sc.range, nc(function(t) { var e = t.getTimezoneOffset() * ac % fc;
                    e < 0 && (e += fc), t.setTime(Math.floor((+t - e) / fc) * fc + e) }, function(t, e) { t.setTime(+t + e * fc) }, function(t, e) { return (e - t) / fc }, function(t) { return t.getHours() })),
                lc = (hc.range, nc(function(t) { t.setHours(0, 0, 0, 0) }, function(t, e) { t.setDate(t.getDate() + e) }, function(t, e) { return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ac) / oc }, function(t) { return t.getDate() - 1 })),
                dc = lc;
            lc.range;

            function pc(t) { return nc(function(e) { e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0) }, function(t, e) { t.setDate(t.getDate() + 7 * e) }, function(t, e) { return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ac) / cc }) } var bc = pc(0),
                _c = pc(1),
                yc = pc(2),
                vc = pc(3),
                gc = pc(4),
                xc = pc(5),
                wc = pc(6),
                mc = (bc.range, _c.range, yc.range, vc.range, gc.range, xc.range, wc.range, nc(function(t) { t.setDate(1), t.setHours(0, 0, 0, 0) }, function(t, e) { t.setMonth(t.getMonth() + e) }, function(t, e) { return e.getMonth() - t.getMonth() + 12 * (e.getFullYear() - t.getFullYear()) }, function(t) { return t.getMonth() })),
                Mc = (mc.range, nc(function(t) { t.setMonth(0, 1), t.setHours(0, 0, 0, 0) }, function(t, e) { t.setFullYear(t.getFullYear() + e) }, function(t, e) { return e.getFullYear() - t.getFullYear() }, function(t) { return t.getFullYear() }));
            Mc.every = function(t) { return isFinite(t = Math.floor(t)) && t > 0 ? nc(function(e) { e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0) }, function(e, n) { e.setFullYear(e.getFullYear() + n * t) }) : null }; var Sc = Mc,
                Nc = (Mc.range, nc(function(t) { t.setUTCSeconds(0, 0) }, function(t, e) { t.setTime(+t + e * ac) }, function(t, e) { return (e - t) / ac }, function(t) { return t.getUTCMinutes() })),
                Tc = (Nc.range, nc(function(t) { t.setUTCMinutes(0, 0, 0) }, function(t, e) { t.setTime(+t + e * fc) }, function(t, e) { return (e - t) / fc }, function(t) { return t.getUTCHours() })),
                kc = (Tc.range, nc(function(t) { t.setUTCHours(0, 0, 0, 0) }, function(t, e) { t.setUTCDate(t.getUTCDate() + e) }, function(t, e) { return (e - t) / oc }, function(t) { return t.getUTCDate() - 1 })),
                Cc = kc;
            kc.range;

            function Ac(t) { return nc(function(e) { e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0) }, function(t, e) { t.setUTCDate(t.getUTCDate() + 7 * e) }, function(t, e) { return (e - t) / cc }) } var Ec = Ac(0),
                Pc = Ac(1),
                Oc = Ac(2),
                jc = Ac(3),
                Uc = Ac(4),
                Dc = Ac(5),
                Fc = Ac(6),
                Lc = (Ec.range, Pc.range, Oc.range, jc.range, Uc.range, Dc.range, Fc.range, nc(function(t) { t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0) }, function(t, e) { t.setUTCMonth(t.getUTCMonth() + e) }, function(t, e) { return e.getUTCMonth() - t.getUTCMonth() + 12 * (e.getUTCFullYear() - t.getUTCFullYear()) }, function(t) { return t.getUTCMonth() })),
                Rc = (Lc.range, nc(function(t) { t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0) }, function(t, e) { t.setUTCFullYear(t.getUTCFullYear() + e) }, function(t, e) { return e.getUTCFullYear() - t.getUTCFullYear() }, function(t) { return t.getUTCFullYear() }));
            Rc.every = function(t) { return isFinite(t = Math.floor(t)) && t > 0 ? nc(function(e) { e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0) }, function(e, n) { e.setUTCFullYear(e.getUTCFullYear() + n * t) }) : null }; var Ic = Rc;
            Rc.range;

            function zc(t) { if (0 <= t.y && t.y < 100) { var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L); return e.setFullYear(t.y), e } return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L) }

            function Yc(t) { if (0 <= t.y && t.y < 100) { var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L)); return e.setUTCFullYear(t.y), e } return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L)) }

            function qc(t) { return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 } }

            function Hc(t) { var e = t.dateTime,
                    n = t.date,
                    r = t.time,
                    i = t.periods,
                    a = t.days,
                    f = t.shortDays,
                    o = t.months,
                    c = t.shortMonths,
                    u = Kc(i),
                    s = tu(i),
                    h = Kc(a),
                    l = tu(a),
                    d = Kc(f),
                    p = tu(f),
                    b = Kc(o),
                    _ = tu(o),
                    y = Kc(c),
                    v = tu(c),
                    g = { a: j, A: U, b: D, B: F, c: null, d: xu, e: xu, f: Nu, H: wu, I: mu, j: Mu, L: Su, m: Tu, M: ku, p: L, Q: es, s: ns, S: Cu, u: Au, U: Eu, V: Pu, w: Ou, W: ju, x: null, X: null, y: Uu, Y: Du, Z: Fu, "%": ts },
                    x = { a: R, A: I, b: z, B: Y, c: null, d: Lu, e: Lu, f: qu, H: Ru, I: Iu, j: zu, L: Yu, m: Hu, M: Xu, p: q, Q: es, s: ns, S: $u, u: Vu, U: Wu, V: Bu, w: Zu, W: Ju, x: null, X: null, y: Qu, Y: Gu, Z: Ku, "%": ts },
                    w = { a: T, A: k, b: C, B: A, c: E, d: su, e: su, f: _u, H: lu, I: lu, j: hu, L: bu, m: uu, M: du, p: N, Q: vu, s: gu, S: pu, u: nu, U: ru, V: iu, w: eu, W: au, x: P, X: O, y: ou, Y: fu, Z: cu, "%": yu };

                function m(t, e) { return function(n) { var r, i, a, f = [],
                            o = -1,
                            c = 0,
                            u = t.length;
                        n instanceof Date || (n = new Date(+n)); while (++o < u) 37 === t.charCodeAt(o) && (f.push(t.slice(c, o)), null != (i = Wc[r = t.charAt(++o)]) ? r = t.charAt(++o) : i = "e" === r ? " " : "0", (a = e[r]) && (r = a(n, i)), f.push(r), c = o + 1); return f.push(t.slice(c, o)), f.join("") } }

                function M(t, e) { return function(n) { var r, i, a = qc(1900),
                            f = S(a, t, n += "", 0); if (f != n.length) return null; if ("Q" in a) return new Date(a.Q); if ("p" in a && (a.H = a.H % 12 + 12 * a.p), "V" in a) { if (a.V < 1 || a.V > 53) return null; "w" in a || (a.w = 1), "Z" in a ? (r = Yc(qc(a.y)), i = r.getUTCDay(), r = i > 4 || 0 === i ? Pc.ceil(r) : Pc(r), r = Cc.offset(r, 7 * (a.V - 1)), a.y = r.getUTCFullYear(), a.m = r.getUTCMonth(), a.d = r.getUTCDate() + (a.w + 6) % 7) : (r = e(qc(a.y)), i = r.getDay(), r = i > 4 || 0 === i ? _c.ceil(r) : _c(r), r = dc.offset(r, 7 * (a.V - 1)), a.y = r.getFullYear(), a.m = r.getMonth(), a.d = r.getDate() + (a.w + 6) % 7) } else("W" in a || "U" in a) && ("w" in a || (a.w = "u" in a ? a.u % 7 : "W" in a ? 1 : 0), i = "Z" in a ? Yc(qc(a.y)).getUTCDay() : e(qc(a.y)).getDay(), a.m = 0, a.d = "W" in a ? (a.w + 6) % 7 + 7 * a.W - (i + 5) % 7 : a.w + 7 * a.U - (i + 6) % 7); return "Z" in a ? (a.H += a.Z / 100 | 0, a.M += a.Z % 100, Yc(a)) : e(a) } }

                function S(t, e, n, r) { var i, a, f = 0,
                        o = e.length,
                        c = n.length; while (f < o) { if (r >= c) return -1; if (i = e.charCodeAt(f++), 37 === i) { if (i = e.charAt(f++), a = w[i in Wc ? e.charAt(f++) : i], !a || (r = a(t, n, r)) < 0) return -1 } else if (i != n.charCodeAt(r++)) return -1 } return r }

                function N(t, e, n) { var r = u.exec(e.slice(n)); return r ? (t.p = s[r[0].toLowerCase()], n + r[0].length) : -1 }

                function T(t, e, n) { var r = d.exec(e.slice(n)); return r ? (t.w = p[r[0].toLowerCase()], n + r[0].length) : -1 }

                function k(t, e, n) { var r = h.exec(e.slice(n)); return r ? (t.w = l[r[0].toLowerCase()], n + r[0].length) : -1 }

                function C(t, e, n) { var r = y.exec(e.slice(n)); return r ? (t.m = v[r[0].toLowerCase()], n + r[0].length) : -1 }

                function A(t, e, n) { var r = b.exec(e.slice(n)); return r ? (t.m = _[r[0].toLowerCase()], n + r[0].length) : -1 }

                function E(t, n, r) { return S(t, e, n, r) }

                function P(t, e, r) { return S(t, n, e, r) }

                function O(t, e, n) { return S(t, r, e, n) }

                function j(t) { return f[t.getDay()] }

                function U(t) { return a[t.getDay()] }

                function D(t) { return c[t.getMonth()] }

                function F(t) { return o[t.getMonth()] }

                function L(t) { return i[+(t.getHours() >= 12)] }

                function R(t) { return f[t.getUTCDay()] }

                function I(t) { return a[t.getUTCDay()] }

                function z(t) { return c[t.getUTCMonth()] }

                function Y(t) { return o[t.getUTCMonth()] }

                function q(t) { return i[+(t.getUTCHours() >= 12)] } return g.x = m(n, g), g.X = m(r, g), g.c = m(e, g), x.x = m(n, x), x.X = m(r, x), x.c = m(e, x), { format: function(t) { var e = m(t += "", g); return e.toString = function() { return t }, e }, parse: function(t) { var e = M(t += "", zc); return e.toString = function() { return t }, e }, utcFormat: function(t) { var e = m(t += "", x); return e.toString = function() { return t }, e }, utcParse: function(t) { var e = M(t, Yc); return e.toString = function() { return t }, e } } } var Xc, $c, Vc, Wc = { "-": "", _: " ", 0: "0" },
                Bc = /^\s*\d+/,
                Zc = /^%/,
                Jc = /[\\^$*+?|[\]().{}]/g;

            function Qc(t, e, n) { var r = t < 0 ? "-" : "",
                    i = (r ? -t : t) + "",
                    a = i.length; return r + (a < n ? new Array(n - a + 1).join(e) + i : i) }

            function Gc(t) { return t.replace(Jc, "\\$&") }

            function Kc(t) { return new RegExp("^(?:" + t.map(Gc).join("|") + ")", "i") }

            function tu(t) { var e = {},
                    n = -1,
                    r = t.length; while (++n < r) e[t[n].toLowerCase()] = n; return e }

            function eu(t, e, n) { var r = Bc.exec(e.slice(n, n + 1)); return r ? (t.w = +r[0], n + r[0].length) : -1 }

            function nu(t, e, n) { var r = Bc.exec(e.slice(n, n + 1)); return r ? (t.u = +r[0], n + r[0].length) : -1 }

            function ru(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.U = +r[0], n + r[0].length) : -1 }

            function iu(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.V = +r[0], n + r[0].length) : -1 }

            function au(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.W = +r[0], n + r[0].length) : -1 }

            function fu(t, e, n) { var r = Bc.exec(e.slice(n, n + 4)); return r ? (t.y = +r[0], n + r[0].length) : -1 }

            function ou(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1 }

            function cu(t, e, n) { var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6)); return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1 }

            function uu(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.m = r[0] - 1, n + r[0].length) : -1 }

            function su(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.d = +r[0], n + r[0].length) : -1 }

            function hu(t, e, n) { var r = Bc.exec(e.slice(n, n + 3)); return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1 }

            function lu(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.H = +r[0], n + r[0].length) : -1 }

            function du(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.M = +r[0], n + r[0].length) : -1 }

            function pu(t, e, n) { var r = Bc.exec(e.slice(n, n + 2)); return r ? (t.S = +r[0], n + r[0].length) : -1 }

            function bu(t, e, n) { var r = Bc.exec(e.slice(n, n + 3)); return r ? (t.L = +r[0], n + r[0].length) : -1 }

            function _u(t, e, n) { var r = Bc.exec(e.slice(n, n + 6)); return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1 }

            function yu(t, e, n) { var r = Zc.exec(e.slice(n, n + 1)); return r ? n + r[0].length : -1 }

            function vu(t, e, n) { var r = Bc.exec(e.slice(n)); return r ? (t.Q = +r[0], n + r[0].length) : -1 }

            function gu(t, e, n) { var r = Bc.exec(e.slice(n)); return r ? (t.Q = 1e3 * +r[0], n + r[0].length) : -1 }

            function xu(t, e) { return Qc(t.getDate(), e, 2) }

            function wu(t, e) { return Qc(t.getHours(), e, 2) }

            function mu(t, e) { return Qc(t.getHours() % 12 || 12, e, 2) }

            function Mu(t, e) { return Qc(1 + dc.count(Sc(t), t), e, 3) }

            function Su(t, e) { return Qc(t.getMilliseconds(), e, 3) }

            function Nu(t, e) { return Su(t, e) + "000" }

            function Tu(t, e) { return Qc(t.getMonth() + 1, e, 2) }

            function ku(t, e) { return Qc(t.getMinutes(), e, 2) }

            function Cu(t, e) { return Qc(t.getSeconds(), e, 2) }

            function Au(t) { var e = t.getDay(); return 0 === e ? 7 : e }

            function Eu(t, e) { return Qc(bc.count(Sc(t), t), e, 2) }

            function Pu(t, e) { var n = t.getDay(); return t = n >= 4 || 0 === n ? gc(t) : gc.ceil(t), Qc(gc.count(Sc(t), t) + (4 === Sc(t).getDay()), e, 2) }

            function Ou(t) { return t.getDay() }

            function ju(t, e) { return Qc(_c.count(Sc(t), t), e, 2) }

            function Uu(t, e) { return Qc(t.getFullYear() % 100, e, 2) }

            function Du(t, e) { return Qc(t.getFullYear() % 1e4, e, 4) }

            function Fu(t) { var e = t.getTimezoneOffset(); return (e > 0 ? "-" : (e *= -1, "+")) + Qc(e / 60 | 0, "0", 2) + Qc(e % 60, "0", 2) }

            function Lu(t, e) { return Qc(t.getUTCDate(), e, 2) }

            function Ru(t, e) { return Qc(t.getUTCHours(), e, 2) }

            function Iu(t, e) { return Qc(t.getUTCHours() % 12 || 12, e, 2) }

            function zu(t, e) { return Qc(1 + Cc.count(Ic(t), t), e, 3) }

            function Yu(t, e) { return Qc(t.getUTCMilliseconds(), e, 3) }

            function qu(t, e) { return Yu(t, e) + "000" }

            function Hu(t, e) { return Qc(t.getUTCMonth() + 1, e, 2) }

            function Xu(t, e) { return Qc(t.getUTCMinutes(), e, 2) }

            function $u(t, e) { return Qc(t.getUTCSeconds(), e, 2) }

            function Vu(t) { var e = t.getUTCDay(); return 0 === e ? 7 : e }

            function Wu(t, e) { return Qc(Ec.count(Ic(t), t), e, 2) }

            function Bu(t, e) { var n = t.getUTCDay(); return t = n >= 4 || 0 === n ? Uc(t) : Uc.ceil(t), Qc(Uc.count(Ic(t), t) + (4 === Ic(t).getUTCDay()), e, 2) }

            function Zu(t) { return t.getUTCDay() }

            function Ju(t, e) { return Qc(Pc.count(Ic(t), t), e, 2) }

            function Qu(t, e) { return Qc(t.getUTCFullYear() % 100, e, 2) }

            function Gu(t, e) { return Qc(t.getUTCFullYear() % 1e4, e, 4) }

            function Ku() { return "+0000" }

            function ts() { return "%" }

            function es(t) { return +t }

            function ns(t) { return Math.floor(+t / 1e3) }

            function rs(t) { return Xc = Hc(t), Xc.format, Xc.parse, $c = Xc.utcFormat, Vc = Xc.utcParse, Xc }
            rs({ dateTime: "%x, %X", date: "%-m/%-d/%Y", time: "%-I:%M:%S %p", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] }); var is = "%Y-%m-%dT%H:%M:%S.%LZ";

            function as(t) { return t.toISOString() }
            Date.prototype.toISOString || $c(is);

            function fs(t) { var e = new Date(t); return isNaN(e) ? null : e } + new Date("2000-01-01T00:00:00.000Z") || Vc(is); var os = function(t) { var e = t.length / 6 | 0,
                        n = new Array(e),
                        r = 0; while (r < e) n[r] = "#" + t.slice(6 * r, 6 * ++r); return n },
                cs = os("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
                us = (os("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"), os("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), os("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), os("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), os("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), os("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), os("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), os("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"), function(t) { return Rn(t[t.length - 1]) }),
                ss = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(os),
                hs = (us(ss), new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(os)),
                ls = (us(hs), new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(os)),
                ds = (us(ls), new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(os)),
                ps = (us(ds), new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(os)),
                bs = (us(ps), new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(os)),
                _s = (us(bs), new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(os)),
                ys = (us(_s), new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(os)),
                vs = (us(ys), new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(os)),
                gs = (us(vs), new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(os)),
                xs = (us(gs), new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(os)),
                ws = (us(xs), new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(os)),
                ms = (us(ws), new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(os)),
                Ms = (us(ms), new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(os)),
                Ss = (us(Ms), new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(os)),
                Ns = (us(Ss), new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(os)),
                Ts = (us(Ns), new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(os)),
                ks = (us(Ts), new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(os)),
                Cs = (us(ks), new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(os)),
                As = (us(Cs), new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(os)),
                Es = (us(As), new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(os)),
                Ps = (us(Es), new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(os)),
                Os = (us(Ps), new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(os)),
                js = (us(Os), new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(os)),
                Us = (us(js), new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(os)),
                Ds = (us(Us), new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(os)),
                Fs = (us(Ds), new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(os));
            us(Fs), fr(Nn(300, .5, 0), Nn(-240, .5, 1)), fr(Nn(-100, .75, .35), Nn(80, 1.5, .8)), fr(Nn(260, .75, .35), Nn(80, 1.5, .8)), Nn(), Ye(), Math.PI, Math.PI;

            function Ls(t) { var e = t.length; return function(n) { return t[Math.max(0, Math.min(e - 1, Math.floor(n * e)))] } }
            Ls(os("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")), Ls(os("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), Ls(os("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), Ls(os("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")), Math.abs, Math.atan2, Math.cos, Math.max, Math.min, Math.sin, Math.sqrt; var Rs = 1e-12,
                Is = Math.PI,
                zs = 2 * Is;

            function Ys(t) { this._context = t }
            Ys.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._point = 0 }, lineEnd: function() {
                    (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e); break;
                        case 1:
                            this._point = 2;
                        default:
                            this._context.lineTo(t, e); break } } }; var qs = function(t) { return new Ys(t) };
            Xs(qs);

            function Hs(t) { this._curve = t }

            function Xs(t) {
                function e(e) { return new Hs(t(e)) } return e._curve = t, e }
            Hs.prototype = { areaStart: function() { this._curve.areaStart() }, areaEnd: function() { this._curve.areaEnd() }, lineStart: function() { this._curve.lineStart() }, lineEnd: function() { this._curve.lineEnd() }, point: function(t, e) { this._curve.point(e * Math.sin(t), e * -Math.cos(t)) } };
            Array.prototype.slice;
            Math.sqrt(1 / 3); var $s = Math.sin(Is / 10) / Math.sin(7 * Is / 10),
                Vs = (Math.sin(zs / 10), Math.cos(zs / 10), Math.sqrt(3), Math.sqrt(3), Math.sqrt(12), function() {});

            function Ws(t, e, n) { t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + e) / 6, (t._y0 + 4 * t._y1 + n) / 6) }

            function Bs(t) { this._context = t }
            Bs.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0 }, lineEnd: function() { switch (this._point) {
                        case 3:
                            Ws(this, this._x1, this._y1);
                        case 2:
                            this._context.lineTo(this._x1, this._y1); break }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e); break;
                        case 1:
                            this._point = 2; break;
                        case 2:
                            this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
                        default:
                            Ws(this, t, e); break }
                    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e } };

            function Zs(t) { this._context = t }
            Zs.prototype = { areaStart: Vs, areaEnd: Vs, lineStart: function() { this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0 }, lineEnd: function() { switch (this._point) {
                        case 1:
                            this._context.moveTo(this._x2, this._y2), this._context.closePath(); break;
                        case 2:
                            this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath(); break;
                        case 3:
                            this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4); break } }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1, this._x2 = t, this._y2 = e; break;
                        case 1:
                            this._point = 2, this._x3 = t, this._y3 = e; break;
                        case 2:
                            this._point = 3, this._x4 = t, this._y4 = e, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + e) / 6); break;
                        default:
                            Ws(this, t, e); break }
                    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e } };

            function Js(t) { this._context = t }
            Js.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0 }, lineEnd: function() {
                    (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1; break;
                        case 1:
                            this._point = 2; break;
                        case 2:
                            this._point = 3; var n = (this._x0 + 4 * this._x1 + t) / 6,
                                r = (this._y0 + 4 * this._y1 + e) / 6;
                            this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r); break;
                        case 3:
                            this._point = 4;
                        default:
                            Ws(this, t, e); break }
                    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e } };

            function Qs(t, e) { this._basis = new Bs(t), this._beta = e }
            Qs.prototype = { lineStart: function() { this._x = [], this._y = [], this._basis.lineStart() }, lineEnd: function() { var t = this._x,
                        e = this._y,
                        n = t.length - 1; if (n > 0) { var r, i = t[0],
                            a = e[0],
                            f = t[n] - i,
                            o = e[n] - a,
                            c = -1; while (++c <= n) r = c / n, this._basis.point(this._beta * t[c] + (1 - this._beta) * (i + r * f), this._beta * e[c] + (1 - this._beta) * (a + r * o)) }
                    this._x = this._y = null, this._basis.lineEnd() }, point: function(t, e) { this._x.push(+t), this._y.push(+e) } };
            (function t(e) {
                function n(t) { return 1 === e ? new Bs(t) : new Qs(t, e) } return n.beta = function(e) { return t(+e) }, n })(.85);

            function Gs(t, e, n) { t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - e), t._y2 + t._k * (t._y1 - n), t._x2, t._y2) }

            function Ks(t, e) { this._context = t, this._k = (1 - e) / 6 }
            Ks.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0 }, lineEnd: function() { switch (this._point) {
                        case 2:
                            this._context.lineTo(this._x2, this._y2); break;
                        case 3:
                            Gs(this, this._x1, this._y1); break }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e); break;
                        case 1:
                            this._point = 2, this._x1 = t, this._y1 = e; break;
                        case 2:
                            this._point = 3;
                        default:
                            Gs(this, t, e); break }
                    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e } };
            (function t(e) {
                function n(t) { return new Ks(t, e) } return n.tension = function(e) { return t(+e) }, n })(0);

            function th(t, e) { this._context = t, this._k = (1 - e) / 6 }
            th.prototype = { areaStart: Vs, areaEnd: Vs, lineStart: function() { this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0 }, lineEnd: function() { switch (this._point) {
                        case 1:
                            this._context.moveTo(this._x3, this._y3), this._context.closePath(); break;
                        case 2:
                            this._context.lineTo(this._x3, this._y3), this._context.closePath(); break;
                        case 3:
                            this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5); break } }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1, this._x3 = t, this._y3 = e; break;
                        case 1:
                            this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e); break;
                        case 2:
                            this._point = 3, this._x5 = t, this._y5 = e; break;
                        default:
                            Gs(this, t, e); break }
                    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e } };
            (function t(e) {
                function n(t) { return new th(t, e) } return n.tension = function(e) { return t(+e) }, n })(0);

            function eh(t, e) { this._context = t, this._k = (1 - e) / 6 }
            eh.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0 }, lineEnd: function() {
                    (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1; break;
                        case 1:
                            this._point = 2; break;
                        case 2:
                            this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
                        case 3:
                            this._point = 4;
                        default:
                            Gs(this, t, e); break }
                    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e } };
            (function t(e) {
                function n(t) { return new eh(t, e) } return n.tension = function(e) { return t(+e) }, n })(0);

            function nh(t, e, n) { var r = t._x1,
                    i = t._y1,
                    a = t._x2,
                    f = t._y2; if (t._l01_a > Rs) { var o = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
                        c = 3 * t._l01_a * (t._l01_a + t._l12_a);
                    r = (r * o - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c, i = (i * o - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c } if (t._l23_a > Rs) { var u = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
                        s = 3 * t._l23_a * (t._l23_a + t._l12_a);
                    a = (a * u + t._x1 * t._l23_2a - e * t._l12_2a) / s, f = (f * u + t._y1 * t._l23_2a - n * t._l12_2a) / s }
                t._context.bezierCurveTo(r, i, a, f, t._x2, t._y2) }

            function rh(t, e) { this._context = t, this._alpha = e }
            rh.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0 }, lineEnd: function() { switch (this._point) {
                        case 2:
                            this._context.lineTo(this._x2, this._y2); break;
                        case 3:
                            this.point(this._x2, this._y2); break }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { if (t = +t, e = +e, this._point) { var n = this._x2 - t,
                            r = this._y2 - e;
                        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha)) } switch (this._point) {
                        case 0:
                            this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e); break;
                        case 1:
                            this._point = 2; break;
                        case 2:
                            this._point = 3;
                        default:
                            nh(this, t, e); break }
                    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e } };
            (function t(e) {
                function n(t) { return e ? new rh(t, e) : new Ks(t, 0) } return n.alpha = function(e) { return t(+e) }, n })(.5);

            function ih(t, e) { this._context = t, this._alpha = e }
            ih.prototype = { areaStart: Vs, areaEnd: Vs, lineStart: function() { this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0 }, lineEnd: function() { switch (this._point) {
                        case 1:
                            this._context.moveTo(this._x3, this._y3), this._context.closePath(); break;
                        case 2:
                            this._context.lineTo(this._x3, this._y3), this._context.closePath(); break;
                        case 3:
                            this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5); break } }, point: function(t, e) { if (t = +t, e = +e, this._point) { var n = this._x2 - t,
                            r = this._y2 - e;
                        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha)) } switch (this._point) {
                        case 0:
                            this._point = 1, this._x3 = t, this._y3 = e; break;
                        case 1:
                            this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e); break;
                        case 2:
                            this._point = 3, this._x5 = t, this._y5 = e; break;
                        default:
                            nh(this, t, e); break }
                    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e } };
            (function t(e) {
                function n(t) { return e ? new ih(t, e) : new th(t, 0) } return n.alpha = function(e) { return t(+e) }, n })(.5);

            function ah(t, e) { this._context = t, this._alpha = e }
            ah.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0 }, lineEnd: function() {
                    (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { if (t = +t, e = +e, this._point) { var n = this._x2 - t,
                            r = this._y2 - e;
                        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha)) } switch (this._point) {
                        case 0:
                            this._point = 1; break;
                        case 1:
                            this._point = 2; break;
                        case 2:
                            this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
                        case 3:
                            this._point = 4;
                        default:
                            nh(this, t, e); break }
                    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e } };
            (function t(e) {
                function n(t) { return e ? new ah(t, e) : new eh(t, 0) } return n.alpha = function(e) { return t(+e) }, n })(.5);

            function fh(t) { this._context = t }
            fh.prototype = { areaStart: Vs, areaEnd: Vs, lineStart: function() { this._point = 0 }, lineEnd: function() { this._point && this._context.closePath() }, point: function(t, e) { t = +t, e = +e, this._point ? this._context.lineTo(t, e) : (this._point = 1, this._context.moveTo(t, e)) } };

            function oh(t) { return t < 0 ? -1 : 1 }

            function ch(t, e, n) { var r = t._x1 - t._x0,
                    i = e - t._x1,
                    a = (t._y1 - t._y0) / (r || i < 0 && -0),
                    f = (n - t._y1) / (i || r < 0 && -0),
                    o = (a * i + f * r) / (r + i); return (oh(a) + oh(f)) * Math.min(Math.abs(a), Math.abs(f), .5 * Math.abs(o)) || 0 }

            function uh(t, e) { var n = t._x1 - t._x0; return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e }

            function sh(t, e, n) { var r = t._x0,
                    i = t._y0,
                    a = t._x1,
                    f = t._y1,
                    o = (a - r) / 3;
                t._context.bezierCurveTo(r + o, i + o * e, a - o, f - o * n, a, f) }

            function hh(t) { this._context = t }

            function lh(t) { this._context = new dh(t) }

            function dh(t) { this._context = t }

            function ph(t) { this._context = t }

            function bh(t) { var e, n, r = t.length - 1,
                    i = new Array(r),
                    a = new Array(r),
                    f = new Array(r); for (i[0] = 0, a[0] = 2, f[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e) i[e] = 1, a[e] = 4, f[e] = 4 * t[e] + 2 * t[e + 1]; for (i[r - 1] = 2, a[r - 1] = 7, f[r - 1] = 8 * t[r - 1] + t[r], e = 1; e < r; ++e) n = i[e] / a[e - 1], a[e] -= n, f[e] -= n * f[e - 1]; for (i[r - 1] = f[r - 1] / a[r - 1], e = r - 2; e >= 0; --e) i[e] = (f[e] - i[e + 1]) / a[e]; for (a[r - 1] = (t[r] + i[r - 1]) / 2, e = 0; e < r - 1; ++e) a[e] = 2 * t[e + 1] - i[e + 1]; return [i, a] }
            hh.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0 }, lineEnd: function() { switch (this._point) {
                        case 2:
                            this._context.lineTo(this._x1, this._y1); break;
                        case 3:
                            sh(this, this._t0, uh(this, this._t0)); break }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line }, point: function(t, e) { var n = NaN; if (t = +t, e = +e, t !== this._x1 || e !== this._y1) { switch (this._point) {
                            case 0:
                                this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e); break;
                            case 1:
                                this._point = 2; break;
                            case 2:
                                this._point = 3, sh(this, uh(this, n = ch(this, t, e)), n); break;
                            default:
                                sh(this, this._t0, n = ch(this, t, e)); break }
                        this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n } } }, (lh.prototype = Object.create(hh.prototype)).point = function(t, e) { hh.prototype.point.call(this, e, t) }, dh.prototype = { moveTo: function(t, e) { this._context.moveTo(e, t) }, closePath: function() { this._context.closePath() }, lineTo: function(t, e) { this._context.lineTo(e, t) }, bezierCurveTo: function(t, e, n, r, i, a) { this._context.bezierCurveTo(e, t, r, n, a, i) } }, ph.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x = [], this._y = [] }, lineEnd: function() { var t = this._x,
                        e = this._y,
                        n = t.length; if (n)
                        if (this._line ? this._context.lineTo(t[0], e[0]) : this._context.moveTo(t[0], e[0]), 2 === n) this._context.lineTo(t[1], e[1]);
                        else
                            for (var r = bh(t), i = bh(e), a = 0, f = 1; f < n; ++a, ++f) this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], t[f], e[f]);
                        (this._line || 0 !== this._line && 1 === n) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null }, point: function(t, e) { this._x.push(+t), this._y.push(+e) } };

            function _h(t, e) { this._context = t, this._t = e }
            _h.prototype = { areaStart: function() { this._line = 0 }, areaEnd: function() { this._line = NaN }, lineStart: function() { this._x = this._y = NaN, this._point = 0 }, lineEnd: function() { 0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line) }, point: function(t, e) { switch (t = +t, e = +e, this._point) {
                        case 0:
                            this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e); break;
                        case 1:
                            this._point = 2;
                        default:
                            if (this._t <= 0) this._context.lineTo(this._x, e), this._context.lineTo(t, e);
                            else { var n = this._x * (1 - this._t) + t * this._t;
                                this._context.lineTo(n, this._y), this._context.lineTo(n, e) } break }
                    this._x = t, this._y = e } };

            function yh() { this._ = null }

            function vh(t) { t.U = t.C = t.L = t.R = t.P = t.N = null }

            function gh(t, e) { var n = e,
                    r = e.R,
                    i = n.U;
                i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.R = r.L, n.R && (n.R.U = n), r.L = n }

            function xh(t, e) { var n = e,
                    r = e.L,
                    i = n.U;
                i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.L = r.R, n.L && (n.L.U = n), r.R = n }

            function wh(t) { while (t.L) t = t.L; return t }
            yh.prototype = { constructor: yh, insert: function(t, e) { var n, r, i; if (t) { if (e.P = t, e.N = t.N, t.N && (t.N.P = e), t.N = e, t.R) { t = t.R; while (t.L) t = t.L;
                            t.L = e } else t.R = e;
                        n = t } else this._ ? (t = wh(this._), e.P = null, e.N = t, t.P = t.L = e, n = t) : (e.P = e.N = null, this._ = e, n = null);
                    e.L = e.R = null, e.U = n, e.C = !0, t = e; while (n && n.C) r = n.U, n === r.L ? (i = r.R, i && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.R && (gh(this, n), t = n, n = t.U), n.C = !1, r.C = !0, xh(this, r))) : (i = r.L, i && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.L && (xh(this, n), t = n, n = t.U), n.C = !1, r.C = !0, gh(this, r))), n = t.U;
                    this._.C = !1 }, remove: function(t) { t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null; var e, n, r, i = t.U,
                        a = t.L,
                        f = t.R; if (n = a ? f ? wh(f) : a : f, i ? i.L === t ? i.L = n : i.R = n : this._ = n, a && f ? (r = n.C, n.C = t.C, n.L = a, a.U = n, n !== f ? (i = n.U, n.U = t.U, t = n.R, i.L = t, n.R = f, f.U = n) : (n.U = i, i = n, t = n.R)) : (r = t.C, t = n), t && (t.U = i), !r)
                        if (t && t.C) t.C = !1;
                        else { do { if (t === this._) break; if (t === i.L) { if (e = i.R, e.C && (e.C = !1, i.C = !0, gh(this, i), e = i.R), e.L && e.L.C || e.R && e.R.C) { e.R && e.R.C || (e.L.C = !1, e.C = !0, xh(this, e), e = i.R), e.C = i.C, i.C = e.R.C = !1, gh(this, i), t = this._; break } } else if (e = i.L, e.C && (e.C = !1, i.C = !0, xh(this, i), e = i.L), e.L && e.L.C || e.R && e.R.C) { e.L && e.L.C || (e.R.C = !1, e.C = !0, gh(this, e), e = i.L), e.C = i.C, i.C = e.L.C = !1, xh(this, i), t = this._; break }
                                e.C = !0, t = i, i = i.U } while (!t.C);
                            t && (t.C = !1) } } }; var mh = yh;

            function Mh(t, e, n, r) { var i = [null, null],
                    a = Qh.push(i) - 1; return i.left = t, i.right = e, n && Nh(i, t, e, n), r && Nh(i, e, t, r), Zh[t.index].halfedges.push(a), Zh[e.index].halfedges.push(a), i }

            function Sh(t, e, n) { var r = [e, n]; return r.left = t, r }

            function Nh(t, e, n, r) { t[0] || t[1] ? t.left === n ? t[1] = r : t[0] = r : (t[0] = r, t.left = e, t.right = n) }

            function Th(t, e, n, r, i) { var a, f = t[0],
                    o = t[1],
                    c = f[0],
                    u = f[1],
                    s = o[0],
                    h = o[1],
                    l = 0,
                    d = 1,
                    p = s - c,
                    b = h - u; if (a = e - c, p || !(a > 0)) { if (a /= p, p < 0) { if (a < l) return;
                        a < d && (d = a) } else if (p > 0) { if (a > d) return;
                        a > l && (l = a) } if (a = r - c, p || !(a < 0)) { if (a /= p, p < 0) { if (a > d) return;
                            a > l && (l = a) } else if (p > 0) { if (a < l) return;
                            a < d && (d = a) } if (a = n - u, b || !(a > 0)) { if (a /= b, b < 0) { if (a < l) return;
                                a < d && (d = a) } else if (b > 0) { if (a > d) return;
                                a > l && (l = a) } if (a = i - u, b || !(a < 0)) { if (a /= b, b < 0) { if (a > d) return;
                                    a > l && (l = a) } else if (b > 0) { if (a < l) return;
                                    a < d && (d = a) } return !(l > 0 || d < 1) || (l > 0 && (t[0] = [c + l * p, u + l * b]), d < 1 && (t[1] = [c + d * p, u + d * b]), !0) } } } } }

            function kh(t, e, n, r, i) { var a = t[1]; if (a) return !0; var f, o, c = t[0],
                    u = t.left,
                    s = t.right,
                    h = u[0],
                    l = u[1],
                    d = s[0],
                    p = s[1],
                    b = (h + d) / 2,
                    _ = (l + p) / 2; if (p === l) { if (b < e || b >= r) return; if (h > d) { if (c) { if (c[1] >= i) return } else c = [b, n];
                        a = [b, i] } else { if (c) { if (c[1] < n) return } else c = [b, i];
                        a = [b, n] } } else if (f = (h - d) / (p - l), o = _ - f * b, f < -1 || f > 1)
                    if (h > d) { if (c) { if (c[1] >= i) return } else c = [(n - o) / f, n];
                        a = [(i - o) / f, i] } else { if (c) { if (c[1] < n) return } else c = [(i - o) / f, i];
                        a = [(n - o) / f, n] }
                else if (l < p) { if (c) { if (c[0] >= r) return } else c = [e, f * e + o];
                    a = [r, f * r + o] } else { if (c) { if (c[0] < e) return } else c = [r, f * r + o];
                    a = [e, f * e + o] } return t[0] = c, t[1] = a, !0 }

            function Ch(t, e, n, r) { var i, a = Qh.length; while (a--) kh(i = Qh[a], t, e, n, r) && Th(i, t, e, n, r) && (Math.abs(i[0][0] - i[1][0]) > Gh || Math.abs(i[0][1] - i[1][1]) > Gh) || delete Qh[a] }

            function Ah(t) { return Zh[t.index] = { site: t, halfedges: [] } }

            function Eh(t, e) { var n = t.site,
                    r = e.left,
                    i = e.right; return n === i && (i = r, r = n), i ? Math.atan2(i[1] - r[1], i[0] - r[0]) : (n === r ? (r = e[1], i = e[0]) : (r = e[0], i = e[1]), Math.atan2(r[0] - i[0], i[1] - r[1])) }

            function Ph(t, e) { return e[+(e.left !== t.site)] }

            function Oh(t, e) { return e[+(e.left === t.site)] }

            function jh() { for (var t, e, n, r, i = 0, a = Zh.length; i < a; ++i)
                    if ((t = Zh[i]) && (r = (e = t.halfedges).length)) { var f = new Array(r),
                            o = new Array(r); for (n = 0; n < r; ++n) f[n] = n, o[n] = Eh(t, Qh[e[n]]); for (f.sort(function(t, e) { return o[e] - o[t] }), n = 0; n < r; ++n) o[n] = e[f[n]]; for (n = 0; n < r; ++n) e[n] = o[n] } }

            function Uh(t, e, n, r) { var i, a, f, o, c, u, s, h, l, d, p, b, _ = Zh.length,
                    y = !0; for (i = 0; i < _; ++i)
                    if (a = Zh[i]) { f = a.site, c = a.halfedges, o = c.length; while (o--) Qh[c[o]] || c.splice(o, 1);
                        o = 0, u = c.length; while (o < u) d = Oh(a, Qh[c[o]]), p = d[0], b = d[1], s = Ph(a, Qh[c[++o % u]]), h = s[0], l = s[1], (Math.abs(p - h) > Gh || Math.abs(b - l) > Gh) && (c.splice(o, 0, Qh.push(Sh(f, d, Math.abs(p - t) < Gh && r - b > Gh ? [t, Math.abs(h - t) < Gh ? l : r] : Math.abs(b - r) < Gh && n - p > Gh ? [Math.abs(l - r) < Gh ? h : n, r] : Math.abs(p - n) < Gh && b - e > Gh ? [n, Math.abs(h - n) < Gh ? l : e] : Math.abs(b - e) < Gh && p - t > Gh ? [Math.abs(l - e) < Gh ? h : t, e] : null)) - 1), ++u);
                        u && (y = !1) }
                if (y) { var v, g, x, w = 1 / 0; for (i = 0, y = null; i < _; ++i)(a = Zh[i]) && (f = a.site, v = f[0] - t, g = f[1] - e, x = v * v + g * g, x < w && (w = x, y = a)); if (y) { var m = [t, e],
                            M = [t, r],
                            S = [n, r],
                            N = [n, e];
                        y.halfedges.push(Qh.push(Sh(f = y.site, m, M)) - 1, Qh.push(Sh(f, M, S)) - 1, Qh.push(Sh(f, S, N)) - 1, Qh.push(Sh(f, N, m)) - 1) } } for (i = 0; i < _; ++i)(a = Zh[i]) && (a.halfedges.length || delete Zh[i]) } var Dh, Fh = [];

            function Lh() { vh(this), this.x = this.y = this.arc = this.site = this.cy = null }

            function Rh(t) { var e = t.P,
                    n = t.N; if (e && n) { var r = e.site,
                        i = t.site,
                        a = n.site; if (r !== a) { var f = i[0],
                            o = i[1],
                            c = r[0] - f,
                            u = r[1] - o,
                            s = a[0] - f,
                            h = a[1] - o,
                            l = 2 * (c * h - u * s); if (!(l >= -Kh)) { var d = c * c + u * u,
                                p = s * s + h * h,
                                b = (h * d - u * p) / l,
                                _ = (c * p - s * d) / l,
                                y = Fh.pop() || new Lh;
                            y.arc = t, y.site = i, y.x = b + f, y.y = (y.cy = _ + o) + Math.sqrt(b * b + _ * _), t.circle = y; var v = null,
                                g = Jh._; while (g)
                                if (y.y < g.y || y.y === g.y && y.x <= g.x) { if (!g.L) { v = g.P; break }
                                    g = g.L } else { if (!g.R) { v = g; break }
                                    g = g.R }
                            Jh.insert(v, y), v || (Dh = y) } } } }

            function Ih(t) { var e = t.circle;
                e && (e.P || (Dh = e.N), Jh.remove(e), Fh.push(e), vh(e), t.circle = null) } var zh = [];

            function Yh() { vh(this), this.edge = this.site = this.circle = null }

            function qh(t) { var e = zh.pop() || new Yh; return e.site = t, e }

            function Hh(t) { Ih(t), Bh.remove(t), zh.push(t), vh(t) }

            function Xh(t) { var e = t.circle,
                    n = e.x,
                    r = e.cy,
                    i = [n, r],
                    a = t.P,
                    f = t.N,
                    o = [t];
                Hh(t); var c = a; while (c.circle && Math.abs(n - c.circle.x) < Gh && Math.abs(r - c.circle.cy) < Gh) a = c.P, o.unshift(c), Hh(c), c = a;
                o.unshift(c), Ih(c); var u = f; while (u.circle && Math.abs(n - u.circle.x) < Gh && Math.abs(r - u.circle.cy) < Gh) f = u.N, o.push(u), Hh(u), u = f;
                o.push(u), Ih(u); var s, h = o.length; for (s = 1; s < h; ++s) u = o[s], c = o[s - 1], Nh(u.edge, c.site, u.site, i);
                c = o[0], u = o[h - 1], u.edge = Mh(c.site, u.site, null, i), Rh(c), Rh(u) }

            function $h(t) { var e, n, r, i, a = t[0],
                    f = t[1],
                    o = Bh._; while (o)
                    if (r = Vh(o, f) - a, r > Gh) o = o.L;
                    else { if (i = a - Wh(o, f), !(i > Gh)) { r > -Gh ? (e = o.P, n = o) : i > -Gh ? (e = o, n = o.N) : e = n = o; break } if (!o.R) { e = o; break }
                        o = o.R }
                Ah(t); var c = qh(t); if (Bh.insert(e, c), e || n) { if (e === n) return Ih(e), n = qh(e.site), Bh.insert(c, n), c.edge = n.edge = Mh(e.site, c.site), Rh(e), void Rh(n); if (n) { Ih(e), Ih(n); var u = e.site,
                            s = u[0],
                            h = u[1],
                            l = t[0] - s,
                            d = t[1] - h,
                            p = n.site,
                            b = p[0] - s,
                            _ = p[1] - h,
                            y = 2 * (l * _ - d * b),
                            v = l * l + d * d,
                            g = b * b + _ * _,
                            x = [(_ * v - d * g) / y + s, (l * g - b * v) / y + h];
                        Nh(n.edge, u, p, x), c.edge = Mh(u, t, null, x), n.edge = Mh(t, p, null, x), Rh(e), Rh(n) } else c.edge = Mh(e.site, c.site) } }

            function Vh(t, e) { var n = t.site,
                    r = n[0],
                    i = n[1],
                    a = i - e; if (!a) return r; var f = t.P; if (!f) return -1 / 0;
                n = f.site; var o = n[0],
                    c = n[1],
                    u = c - e; if (!u) return o; var s = o - r,
                    h = 1 / a - 1 / u,
                    l = s / u; return h ? (-l + Math.sqrt(l * l - 2 * h * (s * s / (-2 * u) - c + u / 2 + i - a / 2))) / h + r : (r + o) / 2 }

            function Wh(t, e) { var n = t.N; if (n) return Vh(n, e); var r = t.site; return r[1] === e ? r[0] : 1 / 0 } var Bh, Zh, Jh, Qh, Gh = 1e-6,
                Kh = 1e-12;

            function tl(t, e, n) { return (t[0] - n[0]) * (e[1] - t[1]) - (t[0] - e[0]) * (n[1] - t[1]) }

            function el(t, e) { return e[1] - t[1] || e[0] - t[0] }

            function nl(t, e) { var n, r, i, a = t.sort(el).pop();
                Qh = [], Zh = new Array(t.length), Bh = new mh, Jh = new mh; while (1)
                    if (i = Dh, a && (!i || a[1] < i.y || a[1] === i.y && a[0] < i.x)) a[0] === n && a[1] === r || ($h(a), n = a[0], r = a[1]), a = t.pop();
                    else { if (!i) break;
                        Xh(i.arc) }
                if (jh(), e) { var f = +e[0][0],
                        o = +e[0][1],
                        c = +e[1][0],
                        u = +e[1][1];
                    Ch(f, o, c, u), Uh(f, o, c, u) }
                this.edges = Qh, this.cells = Zh, Bh = Jh = Qh = Zh = null }
            nl.prototype = { constructor: nl, polygons: function() { var t = this.edges; return this.cells.map(function(e) { var n = e.halfedges.map(function(n) { return Ph(e, t[n]) }); return n.data = e.site.data, n }) }, triangles: function() { var t = [],
                        e = this.edges; return this.cells.forEach(function(n, r) { if (a = (i = n.halfedges).length) { var i, a, f, o = n.site,
                                c = -1,
                                u = e[i[a - 1]],
                                s = u.left === o ? u.right : u.left; while (++c < a) f = s, u = e[i[c]], s = u.left === o ? u.right : u.left, f && s && r < f.index && r < s.index && tl(o, f, s) < 0 && t.push([o.data, f.data, s.data]) } }), t }, links: function() { return this.edges.filter(function(t) { return t.right }).map(function(t) { return { source: t.left.data, target: t.right.data } }) }, find: function(t, e, n) { var r, i, a = this,
                        f = a._found || 0,
                        o = a.cells.length; while (!(i = a.cells[f]))
                        if (++f >= o) return null;
                    var c = t - i.site[0],
                        u = e - i.site[1],
                        s = c * c + u * u;
                    do { i = a.cells[r = f], f = null, i.halfedges.forEach(function(n) { var r = a.edges[n],
                                o = r.left; if (o !== i.site && o || (o = r.right)) { var c = t - o[0],
                                    u = e - o[1],
                                    h = c * c + u * u;
                                h < s && (s = h, f = o.index) } }) } while (null !== f); return a._found = r, null == n || s <= n * n ? i.site : null } };

            function rl(t, e, n) { this.k = t, this.x = e, this.y = n }
            rl.prototype = { constructor: rl, scale: function(t) { return 1 === t ? this : new rl(this.k * t, this.x, this.y) }, translate: function(t, e) { return 0 === t & 0 === e ? this : new rl(this.k, this.x + this.k * t, this.y + this.k * e) }, apply: function(t) { return [t[0] * this.k + this.x, t[1] * this.k + this.y] }, applyX: function(t) { return t * this.k + this.x }, applyY: function(t) { return t * this.k + this.y }, invert: function(t) { return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k] }, invertX: function(t) { return (t - this.x) / this.k }, invertY: function(t) { return (t - this.y) / this.k }, rescaleX: function(t) { return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t)) }, rescaleY: function(t) { return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t)) }, toString: function() { return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")" } }; var il = new rl(1, 0, 0);

            function al(t) { return t.__zoom || il }
            al.prototype = rl.prototype; var fl = n("4a83"),
                ol = { data: function() { return { layout: {}, chart: {}, fill: null } }, props: { data: { type: Array, required: !0 }, fontSizeMapper: { type: Function, required: !0 }, onWordClick: { type: Function, default: function(t) { window.alert("You clicked ".concat(t.text)) } }, rotate: { type: [Function, String, Number], default: 0 }, font: { type: [String, Function], default: "Serif" }, width: { type: [Number, String], default: 960 }, height: { type: [Number, String], default: 500 }, padding: { type: [Number, String], default: 0 }, spiral: { type: String, default: "archimedean" }, coloring: { type: String, default: "random" }, colors: { type: Array } }, mounted: function() { this.createCanvas() }, watch: { data: function() { this.createCanvas() }, rotate: function() { this.createCanvas() }, font: function() { this.createCanvas() }, padding: function() { this.createCanvas() }, spiral: function() { this.createCanvas() }, colors: function() { this.createCanvas() }, coloring: function() { this.createCanvas() } }, methods: { createCanvas: function() { var t = this.data.map(function(t) { return b({}, t) });
                            be(this.$el).selectAll("*").remove(); var e = fl().size([this.width, this.height]).words(t).padding(this.padding).spiral(this.spiral).rotate(this.rotate).font(this.font).fontSize(this.fontSizeMapper).on("end", this.end);
                            this.colors ? this.fill = Ko().range(this.colors) : this.fill = Ko(cs), e.start() }, end: function(t) { var e, n = this; switch (this.coloring) {
                                case "random":
                                    e = function(t, e) { return n.fill(e) }; break;
                                case "size":
                                    e = function(t) { return n.fill(t.size) }; break;
                                default:
                                    e = function(t, e) { return n.fill(e) } }
                            be(this.$el).append("svg").attr("width", this.width).attr("height", this.height).append("g").attr("transform", "translate(".concat(this.width / 2, ",").concat(this.height / 2, ")")).selectAll("text").data(t).enter().append("text").style("font-family", function(t) { return t.font }).style("font-size", function(t) { return "".concat(t.size, "px") }).style("fill", e).attr("text-anchor", "middle").attr("transform", function(t) { return "translate(".concat([t.x, t.y], ")rotate(").concat(t.rotate, ")") }).text(function(t) { return t.text }).on("click", function(t) { return n.onWordClick(t) }) } } },
                cl = ol;

            function ul(t, e, n, r, i, a, f, o) { var c, u = "function" === typeof t ? t.options : t; if (e && (u.render = e, u.staticRenderFns = n, u._compiled = !0), r && (u.functional = !0), a && (u._scopeId = "data-v-" + a), f ? (c = function(t) { t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" === typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(f) }, u._ssrRegister = c) : i && (c = o ? function() { i.call(this, this.$root.$options.shadowRoot) } : i), c)
                    if (u.functional) { u._injectStyles = c; var s = u.render;
                        u.render = function(t, e) { return c.call(e), s(t, e) } } else { var h = u.beforeCreate;
                        u.beforeCreate = h ? [].concat(h, c) : [c] }
                return { exports: t, options: u } } var sl = ul(cl, i, a, !1, null, null, null),
                hl = sl.exports,
                ll = hl;
            n.d(e, "Cloud", function() { return hl });
            e["default"] = ll }, fde4: function(t, e, n) { n("bf90"); var r = n("584a").Object;
            t.exports = function(t, e) { return r.getOwnPropertyDescriptor(t, e) } }, fdef: function(t, e) { t.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff" } }) });
//# sourceMappingURL=vueD3Cloud.umd.min.js.map