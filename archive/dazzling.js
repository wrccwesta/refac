/*! For license information please see LICENSES */
(window.webpackJsonp = window.webpackJsonp || []).push([
    [0], {
        1042: function(t, e, r) {
            "use strict";
            var n = r(1043),
                o = r(1044);

            function h() {
                this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
            }
            e.parse = A, e.resolve = function(source, t) {
                return A(source, !1, !0).resolve(t)
            }, e.resolveObject = function(source, t) {
                return source ? A(source, !1, !0).resolveObject(t) : t
            }, e.format = function(t) {
                o.isString(t) && (t = A(t));
                return t instanceof h ? t.format() : h.prototype.format.call(t)
            }, e.Url = h;
            var c = /^([a-z0-9.+-]+:)/i,
                f = /:[0-9]*$/,
                l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                d = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
                _ = ["'"].concat(d),
                v = ["%", "/", "?", ";", "#"].concat(_),
                m = ["/", "?", "#"],
                y = /^[+a-z0-9A-Z_-]{0,63}$/,
                E = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                T = {
                    javascript: !0,
                    "javascript:": !0
                },
                x = {
                    javascript: !0,
                    "javascript:": !0
                },
                R = {
                    http: !0,
                    https: !0,
                    ftp: !0,
                    gopher: !0,
                    file: !0,
                    "http:": !0,
                    "https:": !0,
                    "ftp:": !0,
                    "gopher:": !0,
                    "file:": !0
                },
                I = r(1045);

            function A(t, e, r) {
                if (t && o.isObject(t) && t instanceof h) return t;
                var u = new h;
                return u.parse(t, e, r), u
            }
            h.prototype.parse = function(t, e, r) {
                if (!o.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                var h = t.indexOf("?"),
                    f = -1 !== h && h < t.indexOf("#") ? "?" : "#",
                    d = t.split(f);
                d[0] = d[0].replace(/\\/g, "/");
                var A = t = d.join(f);
                if (A = A.trim(), !r && 1 === t.split("#").length) {
                    var N = l.exec(A);
                    if (N) return this.path = A, this.href = A, this.pathname = N[1], N[2] ? (this.search = N[2], this.query = e ? I.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this
                }
                var S = c.exec(A);
                if (S) {
                    var O = (S = S[0]).toLowerCase();
                    this.protocol = O, A = A.substr(S.length)
                }
                if (r || S || A.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var w = "//" === A.substr(0, 2);
                    !w || S && x[S] || (A = A.substr(2), this.slashes = !0)
                }
                if (!x[S] && (w || S && !R[S])) {
                    for (var C, P, L = -1, i = 0; i < m.length; i++) {
                        -1 !== (M = A.indexOf(m[i])) && (-1 === L || M < L) && (L = M)
                    } - 1 !== (P = -1 === L ? A.lastIndexOf("@") : A.lastIndexOf("@", L)) && (C = A.slice(0, P), A = A.slice(P + 1), this.auth = decodeURIComponent(C)), L = -1;
                    for (i = 0; i < v.length; i++) {
                        var M; - 1 !== (M = A.indexOf(v[i])) && (-1 === L || M < L) && (L = M)
                    } - 1 === L && (L = A.length), this.host = A.slice(0, L), A = A.slice(L), this.parseHost(), this.hostname = this.hostname || "";
                    var U = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!U)
                        for (var F = this.hostname.split(/\./), D = (i = 0, F.length); i < D; i++) {
                            var B = F[i];
                            if (B && !B.match(y)) {
                                for (var G = "", k = 0, H = B.length; k < H; k++) B.charCodeAt(k) > 127 ? G += "x" : G += B[k];
                                if (!G.match(y)) {
                                    var j = F.slice(0, i),
                                        V = F.slice(i + 1),
                                        X = B.match(E);
                                    X && (j.push(X[1]), V.unshift(X[2])), V.length && (A = "/" + V.join(".") + A), this.hostname = j.join(".");
                                    break
                                }
                            }
                        }
                    this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), U || (this.hostname = n.toASCII(this.hostname));
                    var p = this.port ? ":" + this.port : "",
                        z = this.hostname || "";
                    this.host = z + p, this.href += this.host, U && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== A[0] && (A = "/" + A))
                }
                if (!T[O])
                    for (i = 0, D = _.length; i < D; i++) {
                        var Y = _[i];
                        if (-1 !== A.indexOf(Y)) {
                            var W = encodeURIComponent(Y);
                            W === Y && (W = escape(Y)), A = A.split(Y).join(W)
                        }
                    }
                var Z = A.indexOf("#"); - 1 !== Z && (this.hash = A.substr(Z), A = A.slice(0, Z));
                var K = A.indexOf("?");
                if (-1 !== K ? (this.search = A.substr(K), this.query = A.substr(K + 1), e && (this.query = I.parse(this.query)), A = A.slice(0, K)) : e && (this.search = "", this.query = {}), A && (this.pathname = A), R[O] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                    p = this.pathname || "";
                    var s = this.search || "";
                    this.path = p + s
                }
                return this.href = this.format(), this
            }, h.prototype.format = function() {
                var t = this.auth || "";
                t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
                var e = this.protocol || "",
                    r = this.pathname || "",
                    n = this.hash || "",
                    h = !1,
                    c = "";
                this.host ? h = t + this.host : this.hostname && (h = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (h += ":" + this.port)), this.query && o.isObject(this.query) && Object.keys(this.query).length && (c = I.stringify(this.query));
                var f = this.search || c && "?" + c || "";
                return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || R[e]) && !1 !== h ? (h = "//" + (h || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : h || (h = ""), n && "#" !== n.charAt(0) && (n = "#" + n), f && "?" !== f.charAt(0) && (f = "?" + f), e + h + (r = r.replace(/[?#]/g, (function(t) {
                    return encodeURIComponent(t)
                }))) + (f = f.replace("#", "%23")) + n
            }, h.prototype.resolve = function(t) {
                return this.resolveObject(A(t, !1, !0)).format()
            }, h.prototype.resolveObject = function(t) {
                if (o.isString(t)) {
                    var e = new h;
                    e.parse(t, !1, !0), t = e
                }
                for (var r = new h, n = Object.keys(this), c = 0; c < n.length; c++) {
                    var f = n[c];
                    r[f] = this[f]
                }
                if (r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
                if (t.slashes && !t.protocol) {
                    for (var l = Object.keys(t), d = 0; d < l.length; d++) {
                        var _ = l[d];
                        "protocol" !== _ && (r[_] = t[_])
                    }
                    return R[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r
                }
                if (t.protocol && t.protocol !== r.protocol) {
                    if (!R[t.protocol]) {
                        for (var v = Object.keys(t), m = 0; m < v.length; m++) {
                            var y = v[m];
                            r[y] = t[y]
                        }
                        return r.href = r.format(), r
                    }
                    if (r.protocol = t.protocol, t.host || x[t.protocol]) r.pathname = t.pathname;
                    else {
                        for (var E = (t.pathname || "").split("/"); E.length && !(t.host = E.shift()););
                        t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== E[0] && E.unshift(""), E.length < 2 && E.unshift(""), r.pathname = E.join("/")
                    }
                    if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
                        var p = r.pathname || "",
                            s = r.search || "";
                        r.path = p + s
                    }
                    return r.slashes = r.slashes || t.slashes, r.href = r.format(), r
                }
                var T = r.pathname && "/" === r.pathname.charAt(0),
                    I = t.host || t.pathname && "/" === t.pathname.charAt(0),
                    A = I || T || r.host && t.pathname,
                    N = A,
                    S = r.pathname && r.pathname.split("/") || [],
                    O = (E = t.pathname && t.pathname.split("/") || [], r.protocol && !R[r.protocol]);
                if (O && (r.hostname = "", r.port = null, r.host && ("" === S[0] ? S[0] = r.host : S.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === E[0] ? E[0] = t.host : E.unshift(t.host)), t.host = null), A = A && ("" === E[0] || "" === S[0])), I) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, S = E;
                else if (E.length) S || (S = []), S.pop(), S = S.concat(E), r.search = t.search, r.query = t.query;
                else if (!o.isNullOrUndefined(t.search)) {
                    if (O) r.hostname = r.host = S.shift(), (L = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = L.shift(), r.host = r.hostname = L.shift());
                    return r.search = t.search, r.query = t.query, o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r
                }
                if (!S.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
                for (var w = S.slice(-1)[0], C = (r.host || t.host || S.length > 1) && ("." === w || ".." === w) || "" === w, P = 0, i = S.length; i >= 0; i--) "." === (w = S[i]) ? S.splice(i, 1) : ".." === w ? (S.splice(i, 1), P++) : P && (S.splice(i, 1), P--);
                if (!A && !N)
                    for (; P--; P) S.unshift("..");
                !A || "" === S[0] || S[0] && "/" === S[0].charAt(0) || S.unshift(""), C && "/" !== S.join("/").substr(-1) && S.push("");
                var L, M = "" === S[0] || S[0] && "/" === S[0].charAt(0);
                O && (r.hostname = r.host = M ? "" : S.length ? S.shift() : "", (L = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = L.shift(), r.host = r.hostname = L.shift()));
                return (A = A || r.host && S.length) && !M && S.unshift(""), S.length ? r.pathname = S.join("/") : (r.pathname = null, r.path = null), o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
            }, h.prototype.parseHost = function() {
                var t = this.host,
                    e = f.exec(t);
                e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
            }
        },
        1043: function(t, e, r) {
            (function(t, n) {
                var o;
                ! function(h) {
                    e && e.nodeType, t && t.nodeType;
                    var c = "object" == typeof n && n;
                    c.global !== c && c.window !== c && c.self;
                    var f, l = 2147483647,
                        base = 36,
                        d = /^xn--/,
                        _ = /[^\x20-\x7E]/,
                        v = /[\x2E\u3002\uFF0E\uFF61]/g,
                        m = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                            "invalid-input": "Invalid input"
                        },
                        y = Math.floor,
                        E = String.fromCharCode;

                    function T(t) {
                        throw new RangeError(m[t])
                    }

                    function map(t, e) {
                        for (var r = t.length, n = []; r--;) n[r] = e(t[r]);
                        return n
                    }

                    function x(t, e) {
                        var r = t.split("@"),
                            n = "";
                        return r.length > 1 && (n = r[0] + "@", t = r[1]), n + map((t = t.replace(v, ".")).split("."), e).join(".")
                    }

                    function R(t) {
                        for (var e, r, output = [], n = 0, o = t.length; n < o;)(e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < o ? 56320 == (64512 & (r = t.charCodeAt(n++))) ? output.push(((1023 & e) << 10) + (1023 & r) + 65536) : (output.push(e), n--) : output.push(e);
                        return output
                    }

                    function I(t) {
                        return map(t, (function(t) {
                            var output = "";
                            return t > 65535 && (output += E((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), output += E(t)
                        })).join("")
                    }

                    function A(t, e) {
                        return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
                    }

                    function N(t, e, r) {
                        var n = 0;
                        for (t = r ? y(t / 700) : t >> 1, t += y(t / e); t > 455; n += base) t = y(t / 35);
                        return y(n + 36 * t / (t + 38))
                    }

                    function S(input) {
                        var t, e, r, n, o, h, c, f, d, _, v, output = [],
                            m = input.length,
                            i = 0,
                            E = 128,
                            x = 72;
                        for ((e = input.lastIndexOf("-")) < 0 && (e = 0), r = 0; r < e; ++r) input.charCodeAt(r) >= 128 && T("not-basic"), output.push(input.charCodeAt(r));
                        for (n = e > 0 ? e + 1 : 0; n < m;) {
                            for (o = i, h = 1, c = base; n >= m && T("invalid-input"), ((f = (v = input.charCodeAt(n++)) - 48 < 10 ? v - 22 : v - 65 < 26 ? v - 65 : v - 97 < 26 ? v - 97 : base) >= base || f > y((l - i) / h)) && T("overflow"), i += f * h, !(f < (d = c <= x ? 1 : c >= x + 26 ? 26 : c - x)); c += base) h > y(l / (_ = base - d)) && T("overflow"), h *= _;
                            x = N(i - o, t = output.length + 1, 0 == o), y(i / t) > l - E && T("overflow"), E += y(i / t), i %= t, output.splice(i++, 0, E)
                        }
                        return I(output)
                    }

                    function O(input) {
                        var t, e, r, n, o, h, c, q, f, d, _, v, m, x, I, output = [];
                        for (v = (input = R(input)).length, t = 128, e = 0, o = 72, h = 0; h < v; ++h)(_ = input[h]) < 128 && output.push(E(_));
                        for (r = n = output.length, n && output.push("-"); r < v;) {
                            for (c = l, h = 0; h < v; ++h)(_ = input[h]) >= t && _ < c && (c = _);
                            for (c - t > y((l - e) / (m = r + 1)) && T("overflow"), e += (c - t) * m, t = c, h = 0; h < v; ++h)
                                if ((_ = input[h]) < t && ++e > l && T("overflow"), _ == t) {
                                    for (q = e, f = base; !(q < (d = f <= o ? 1 : f >= o + 26 ? 26 : f - o)); f += base) I = q - d, x = base - d, output.push(E(A(d + I % x, 0))), q = y(I / x);
                                    output.push(E(A(q, 0))), o = N(e, m, r == n), e = 0, ++r
                                }++ e, ++t
                        }
                        return output.join("")
                    }
                    f = {
                        version: "1.4.1",
                        ucs2: {
                            decode: R,
                            encode: I
                        },
                        decode: S,
                        encode: O,
                        toASCII: function(input) {
                            return x(input, (function(t) {
                                return _.test(t) ? "xn--" + O(t) : t
                            }))
                        },
                        toUnicode: function(input) {
                            return x(input, (function(t) {
                                return d.test(t) ? S(t.slice(4).toLowerCase()) : t
                            }))
                        }
                    }, void 0 === (o = function() {
                        return f
                    }.call(e, r, e, t)) || (t.exports = o)
                }()
            }).call(this, r(368)(t), r(54))
        },
        1044: function(t, e, r) {
            "use strict";
            t.exports = {
                isString: function(t) {
                    return "string" == typeof t
                },
                isObject: function(t) {
                    return "object" == typeof t && null !== t
                },
                isNull: function(t) {
                    return null === t
                },
                isNullOrUndefined: function(t) {
                    return null == t
                }
            }
        },
        1045: function(t, e, r) {
            "use strict";
            e.decode = e.parse = r(1046), e.encode = e.stringify = r(1047)
        },
        1046: function(t, e, r) {
            "use strict";

            function n(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            t.exports = function(t, e, r, h) {
                e = e || "&", r = r || "=";
                var c = {};
                if ("string" != typeof t || 0 === t.length) return c;
                var f = /\+/g;
                t = t.split(e);
                var l = 1e3;
                h && "number" == typeof h.maxKeys && (l = h.maxKeys);
                var d = t.length;
                l > 0 && d > l && (d = l);
                for (var i = 0; i < d; ++i) {
                    var _, v, m, y, E = t[i].replace(f, "%20"),
                        T = E.indexOf(r);
                    T >= 0 ? (_ = E.substr(0, T), v = E.substr(T + 1)) : (_ = E, v = ""), m = decodeURIComponent(_), y = decodeURIComponent(v), n(c, m) ? o(c[m]) ? c[m].push(y) : c[m] = [c[m], y] : c[m] = y
                }
                return c
            };
            var o = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
        },
        1047: function(t, e, r) {
            "use strict";
            var n = function(t) {
                switch (typeof t) {
                    case "string":
                        return t;
                    case "boolean":
                        return t ? "true" : "false";
                    case "number":
                        return isFinite(t) ? t : "";
                    default:
                        return ""
                }
            };
            t.exports = function(t, e, r, c) {
                return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? map(h(t), (function(h) {
                    var c = encodeURIComponent(n(h)) + r;
                    return o(t[h]) ? map(t[h], (function(t) {
                        return c + encodeURIComponent(n(t))
                    })).join(e) : c + encodeURIComponent(n(t[h]))
                })).join(e) : c ? encodeURIComponent(n(c)) + r + encodeURIComponent(n(t)) : ""
            };
            var o = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            };

            function map(t, e) {
                if (t.map) return t.map(e);
                for (var r = [], i = 0; i < t.length; i++) r.push(e(t[i], i));
                return r
            }
            var h = Object.keys || function(t) {
                var e = [];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
                return e
            }
        },
        740: function(t, e, r) {
            "use strict";
            r.d(e, "a", (function() {
                return Pe
            })), r.d(e, "b", (function() {
                return I
            })), r.d(e, "c", (function() {
                return Te
            })), r.d(e, "d", (function() {
                return A
            })), r.d(e, "e", (function() {
                return X
            })), r.d(e, "f", (function() {
                return N
            })), r.d(e, "g", (function() {
                return D
            })), r.d(e, "h", (function() {
                return R
            })), r.d(e, "i", (function() {
                return Oe
            })), r.d(e, "j", (function() {
                return Me
            })), r.d(e, "k", (function() {
                return De
            })), r.d(e, "l", (function() {
                return Be
            })), r.d(e, "m", (function() {
                return Le
            })), r.d(e, "n", (function() {
                return ut
            })), r.d(e, "o", (function() {
                return we
            })), r.d(e, "p", (function() {
                return Y
            })), r.d(e, "q", (function() {
                return T
            })), r.d(e, "r", (function() {
                return S
            })), r.d(e, "s", (function() {
                return ct
            })), r.d(e, "t", (function() {
                return O
            })), r.d(e, "u", (function() {
                return Xt
            })), r.d(e, "v", (function() {
                return it
            })), r.d(e, "w", (function() {
                return st
            })), r.d(e, "x", (function() {
                return F
            })), r.d(e, "y", (function() {
                return pt
            })), r.d(e, "z", (function() {
                return ft
            })), r.d(e, "A", (function() {
                return ce
            })), r.d(e, "B", (function() {
                return me
            })), r.d(e, "C", (function() {
                return J
            })), r.d(e, "D", (function() {
                return vt
            })), r.d(e, "E", (function() {
                return he
            })), r.d(e, "F", (function() {
                return d
            })), r.d(e, "G", (function() {
                return L
            })), r.d(e, "H", (function() {
                return w
            })), r.d(e, "I", (function() {
                return mt
            })), r.d(e, "J", (function() {
                return qt
            })), r.d(e, "K", (function() {
                return at
            })), r.d(e, "L", (function() {
                return Ht
            })), r.d(e, "M", (function() {
                return Qt
            })), r.d(e, "N", (function() {
                return $
            })), r.d(e, "O", (function() {
                return Q
            })), r.d(e, "P", (function() {
                return j
            })), r.d(e, "Q", (function() {
                return V
            })), r.d(e, "R", (function() {
                return re
            })), r.d(e, "S", (function() {
                return Re
            })), r.d(e, "T", (function() {
                return E
            })), r.d(e, "U", (function() {
                return C
            })), r.d(e, "V", (function() {
                return Jt
            })), r.d(e, "W", (function() {
                return jt
            })), r.d(e, "X", (function() {
                return pe
            })), r.d(e, "Y", (function() {
                return Wt
            })), r.d(e, "Z", (function() {
                return Vt
            })), r.d(e, "ab", (function() {
                return _e
            })), r.d(e, "bb", (function() {
                return $t
            })), r.d(e, "cb", (function() {
                return Se
            })), r.d(e, "db", (function() {
                return k
            })), r.d(e, "eb", (function() {
                return ve
            })), r.d(e, "fb", (function() {
                return Yt
            })), r.d(e, "gb", (function() {
                return ye
            })), r.d(e, "hb", (function() {
                return B
            })), r.d(e, "ib", (function() {
                return et
            })), r.d(e, "jb", (function() {
                return P
            })), r.d(e, "kb", (function() {
                return Ce
            })), r.d(e, "lb", (function() {
                return Ie
            })), r.d(e, "mb", (function() {
                return _
            })), r.d(e, "nb", (function() {
                return Bt
            })), r.d(e, "ob", (function() {
                return se
            })), r.d(e, "pb", (function() {
                return Ne
            })), r.d(e, "qb", (function() {
                return Ae
            })), r.d(e, "rb", (function() {
                return fe
            })), r.d(e, "sb", (function() {
                return ue
            })), r.d(e, "tb", (function() {
                return It
            })), r.d(e, "ub", (function() {
                return ae
            })), r.d(e, "vb", (function() {
                return Ge
            })), r.d(e, "wb", (function() {
                return je
            })), r.d(e, "xb", (function() {
                return Pt
            }));
            var n = r(752),
                o = r(756),
                h = r(748),
                c = r(810),
                f = r(759),
                l = r(747);
            n.b.PREFER_ENV = h.isMobile.any ? o.g.WEBGL : o.g.WEBGL2, n.b.STRICT_TEXTURE_CACHE = !1;
            var d = [];

            function _(source, t) {
                if (!source) return null;
                var e = "";
                if ("string" == typeof source) {
                    var r = /\.(\w{3,4})(?:$|\?|#)/i.exec(source);
                    r && (e = r[1].toLowerCase())
                }
                for (var i = d.length - 1; i >= 0; --i) {
                    var n = d[i];
                    if (n.test && n.test(source, e)) return new n(source, t)
                }
                throw new Error("Unrecognized source type to auto-detect Resource")
            }
            var v = function(t, b) {
                return v = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, b) {
                    t.__proto__ = b
                } || function(t, b) {
                    for (var p in b) b.hasOwnProperty(p) && (t[p] = b[p])
                }, v(t, b)
            };

            function m(t, b) {
                function e() {
                    this.constructor = t
                }
                v(t, b), t.prototype = null === b ? Object.create(b) : (e.prototype = b.prototype, new e)
            }
            var y = function() {
                return y = Object.assign || function(t) {
                    for (var s, e = arguments, i = 1, r = arguments.length; i < r; i++)
                        for (var p in s = e[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
                    return t
                }, y.apply(this, arguments)
            };
            var E = function() {
                    function t(t, e) {
                        void 0 === t && (t = 0), void 0 === e && (e = 0), this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new c.a("setRealSize"), this.onUpdate = new c.a("update"), this.onError = new c.a("onError")
                    }
                    return t.prototype.bind = function(t) {
                        this.onResize.add(t), this.onUpdate.add(t), this.onError.add(t), (this._width || this._height) && this.onResize.emit(this._width, this._height)
                    }, t.prototype.unbind = function(t) {
                        this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t)
                    }, t.prototype.resize = function(t, e) {
                        t === this._width && e === this._height || (this._width = t, this._height = e, this.onResize.emit(t, e))
                    }, Object.defineProperty(t.prototype, "valid", {
                        get: function() {
                            return !!this._width && !!this._height
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.update = function() {
                        this.destroyed || this.onUpdate.emit()
                    }, t.prototype.load = function() {
                        return Promise.resolve(this)
                    }, Object.defineProperty(t.prototype, "width", {
                        get: function() {
                            return this._width
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "height", {
                        get: function() {
                            return this._height
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.style = function(t, e, r) {
                        return !1
                    }, t.prototype.dispose = function() {}, t.prototype.destroy = function() {
                        this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null)
                    }, t.test = function(t, e) {
                        return !1
                    }, t
                }(),
                T = function(t) {
                    function e(source, e) {
                        var r = this,
                            n = e || {},
                            o = n.width,
                            h = n.height;
                        if (!o || !h) throw new Error("BufferResource width or height invalid");
                        return (r = t.call(this, o, h) || this).data = source, r
                    }
                    return m(e, t), e.prototype.upload = function(t, e, r) {
                        var n = t.gl;
                        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === o.a.UNPACK);
                        var h = e.realWidth,
                            c = e.realHeight;
                        return r.width === h && r.height === c ? n.texSubImage2D(e.target, 0, 0, 0, h, c, e.format, r.type, this.data) : (r.width = h, r.height = c, n.texImage2D(e.target, 0, r.internalFormat, h, c, 0, e.format, r.type, this.data)), !0
                    }, e.prototype.dispose = function() {
                        this.data = null
                    }, e.test = function(source) {
                        return source instanceof Float32Array || source instanceof Uint8Array || source instanceof Uint32Array
                    }, e
                }(E),
                x = {
                    scaleMode: o.p.NEAREST,
                    format: o.h.RGBA,
                    alphaMode: o.a.NPM
                },
                R = function(t) {
                    function e(e, r) {
                        void 0 === e && (e = null), void 0 === r && (r = null);
                        var c = t.call(this) || this,
                            f = (r = r || {}).alphaMode,
                            l = r.mipmap,
                            d = r.anisotropicLevel,
                            v = r.scaleMode,
                            m = r.width,
                            y = r.height,
                            T = r.wrapMode,
                            x = r.format,
                            R = r.type,
                            I = r.target,
                            A = r.resolution,
                            N = r.resourceOptions;
                        return !e || e instanceof E || ((e = _(e, N)).internal = !0), c.resolution = A || n.b.RESOLUTION, c.width = Math.round((m || 0) * c.resolution) / c.resolution, c.height = Math.round((y || 0) * c.resolution) / c.resolution, c._mipmap = void 0 !== l ? l : n.b.MIPMAP_TEXTURES, c.anisotropicLevel = void 0 !== d ? d : n.b.ANISOTROPIC_LEVEL, c._wrapMode = T || n.b.WRAP_MODE, c._scaleMode = void 0 !== v ? v : n.b.SCALE_MODE, c.format = x || o.h.RGBA, c.type = R || o.r.UNSIGNED_BYTE, c.target = I || o.q.TEXTURE_2D, c.alphaMode = void 0 !== f ? f : o.a.UNPACK, c.uid = Object(h.uid)(), c.touched = 0, c.isPowerOfTwo = !1, c._refreshPOT(), c._glTextures = {}, c.dirtyId = 0, c.dirtyStyleId = 0, c.cacheId = null, c.valid = m > 0 && y > 0, c.textureCacheIds = [], c.destroyed = !1, c.resource = null, c._batchEnabled = 0, c._batchLocation = 0, c.parentTextureArray = null, c.setResource(e), c
                    }
                    return m(e, t), Object.defineProperty(e.prototype, "realWidth", {
                        get: function() {
                            return Math.round(this.width * this.resolution)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "realHeight", {
                        get: function() {
                            return Math.round(this.height * this.resolution)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "mipmap", {
                        get: function() {
                            return this._mipmap
                        },
                        set: function(t) {
                            this._mipmap !== t && (this._mipmap = t, this.dirtyStyleId++)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "scaleMode", {
                        get: function() {
                            return this._scaleMode
                        },
                        set: function(t) {
                            this._scaleMode !== t && (this._scaleMode = t, this.dirtyStyleId++)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "wrapMode", {
                        get: function() {
                            return this._wrapMode
                        },
                        set: function(t) {
                            this._wrapMode !== t && (this._wrapMode = t, this.dirtyStyleId++)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.setStyle = function(t, e) {
                        var r;
                        return void 0 !== t && t !== this.scaleMode && (this.scaleMode = t, r = !0), void 0 !== e && e !== this.mipmap && (this.mipmap = e, r = !0), r && this.dirtyStyleId++, this
                    }, e.prototype.setSize = function(t, e, r) {
                        return r = r || this.resolution, this.setRealSize(t * r, e * r, r)
                    }, e.prototype.setRealSize = function(t, e, r) {
                        return this.resolution = r || this.resolution, this.width = Math.round(t) / this.resolution, this.height = Math.round(e) / this.resolution, this._refreshPOT(), this.update(), this
                    }, e.prototype._refreshPOT = function() {
                        this.isPowerOfTwo = Object(h.isPow2)(this.realWidth) && Object(h.isPow2)(this.realHeight)
                    }, e.prototype.setResolution = function(t) {
                        var e = this.resolution;
                        return e === t || (this.resolution = t, this.valid && (this.width = Math.round(this.width * e) / t, this.height = Math.round(this.height * e) / t, this.emit("update", this)), this._refreshPOT()), this
                    }, e.prototype.setResource = function(t) {
                        if (this.resource === t) return this;
                        if (this.resource) throw new Error("Resource can be set only once");
                        return t.bind(this), this.resource = t, this
                    }, e.prototype.update = function() {
                        this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this))
                    }, e.prototype.onError = function(t) {
                        this.emit("error", this, t)
                    }, e.prototype.destroy = function() {
                        this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete h.BaseTextureCache[this.cacheId], delete h.TextureCache[this.cacheId], this.cacheId = null), this.dispose(), e.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0
                    }, e.prototype.dispose = function() {
                        this.emit("dispose", this)
                    }, e.prototype.castToBaseTexture = function() {
                        return this
                    }, e.from = function(source, t, r) {
                        void 0 === r && (r = n.b.STRICT_TEXTURE_CACHE);
                        var o = "string" == typeof source,
                            c = null;
                        if (o) c = source;
                        else {
                            if (!source._pixiId) {
                                var f = t && t.pixiIdPrefix || "pixiid";
                                source._pixiId = f + "_" + Object(h.uid)()
                            }
                            c = source._pixiId
                        }
                        var l = h.BaseTextureCache[c];
                        if (o && r && !l) throw new Error('The cacheId "' + c + '" does not exist in BaseTextureCache.');
                        return l || ((l = new e(source, t)).cacheId = c, e.addToCache(l, c)), l
                    }, e.fromBuffer = function(t, r, n, h) {
                        t = t || new Float32Array(r * n * 4);
                        var c = new T(t, {
                                width: r,
                                height: n
                            }),
                            f = t instanceof Float32Array ? o.r.FLOAT : o.r.UNSIGNED_BYTE;
                        return new e(c, Object.assign(x, h || {
                            width: r,
                            height: n,
                            type: f
                        }))
                    }, e.addToCache = function(t, e) {
                        e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), h.BaseTextureCache[e] && console.warn("BaseTexture added to the cache with an id [" + e + "] that already had an entry"), h.BaseTextureCache[e] = t)
                    }, e.removeFromCache = function(t) {
                        if ("string" == typeof t) {
                            var e = h.BaseTextureCache[t];
                            if (e) {
                                var r = e.textureCacheIds.indexOf(t);
                                return r > -1 && e.textureCacheIds.splice(r, 1), delete h.BaseTextureCache[t], e
                            }
                        } else if (t && t.textureCacheIds) {
                            for (var i = 0; i < t.textureCacheIds.length; ++i) delete h.BaseTextureCache[t.textureCacheIds[i]];
                            return t.textureCacheIds.length = 0, t
                        }
                        return null
                    }, e._globalBatch = 0, e
                }(h.EventEmitter),
                I = function(t) {
                    function e(e, r) {
                        var n = this,
                            o = r || {},
                            h = o.width,
                            c = o.height;
                        (n = t.call(this, h, c) || this).items = [], n.itemDirtyIds = [];
                        for (var i = 0; i < e; i++) {
                            var f = new R;
                            n.items.push(f), n.itemDirtyIds.push(-2)
                        }
                        return n.length = e, n._load = null, n.baseTexture = null, n
                    }
                    return m(e, t), e.prototype.initFromArray = function(t, e) {
                        for (var i = 0; i < this.length; i++) t[i] && (t[i].castToBaseTexture ? this.addBaseTextureAt(t[i].castToBaseTexture(), i) : t[i] instanceof E ? this.addResourceAt(t[i], i) : this.addResourceAt(_(t[i], e), i))
                    }, e.prototype.dispose = function() {
                        for (var i = 0, t = this.length; i < t; i++) this.items[i].destroy();
                        this.items = null, this.itemDirtyIds = null, this._load = null
                    }, e.prototype.addResourceAt = function(t, e) {
                        if (!this.items[e]) throw new Error("Index " + e + " is out of bounds");
                        return t.valid && !this.valid && this.resize(t.width, t.height), this.items[e].setResource(t), this
                    }, e.prototype.bind = function(e) {
                        if (null !== this.baseTexture) throw new Error("Only one base texture per TextureArray is allowed");
                        t.prototype.bind.call(this, e);
                        for (var i = 0; i < this.length; i++) this.items[i].parentTextureArray = e, this.items[i].on("update", e.update, e)
                    }, e.prototype.unbind = function(e) {
                        t.prototype.unbind.call(this, e);
                        for (var i = 0; i < this.length; i++) this.items[i].parentTextureArray = null, this.items[i].off("update", e.update, e)
                    }, e.prototype.load = function() {
                        var t = this;
                        if (this._load) return this._load;
                        var e = this.items.map((function(t) {
                            return t.resource
                        })).filter((function(t) {
                            return t
                        })).map((function(t) {
                            return t.load()
                        }));
                        return this._load = Promise.all(e).then((function() {
                            var e = t.items[0],
                                r = e.realWidth,
                                n = e.realHeight;
                            return t.resize(r, n), Promise.resolve(t)
                        })), this._load
                    }, e
                }(E),
                A = function(t) {
                    function e(source, e) {
                        var r, n, o = this,
                            h = e || {},
                            c = h.width,
                            f = h.height;
                        return Array.isArray(source) ? (r = source, n = source.length) : n = source, o = t.call(this, n, {
                            width: c,
                            height: f
                        }) || this, r && o.initFromArray(r, e), o
                    }
                    return m(e, t), e.prototype.addBaseTextureAt = function(t, e) {
                        if (!t.resource) throw new Error("ArrayResource does not support RenderTexture");
                        return this.addResourceAt(t.resource, e), this
                    }, e.prototype.bind = function(e) {
                        t.prototype.bind.call(this, e), e.target = o.q.TEXTURE_2D_ARRAY
                    }, e.prototype.upload = function(t, e, r) {
                        var n = this,
                            o = n.length,
                            h = n.itemDirtyIds,
                            c = n.items,
                            f = t.gl;
                        r.dirtyId < 0 && f.texImage3D(f.TEXTURE_2D_ARRAY, 0, r.internalFormat, this._width, this._height, o, 0, e.format, r.type, null);
                        for (var i = 0; i < o; i++) {
                            var l = c[i];
                            h[i] < l.dirtyId && (h[i] = l.dirtyId, l.valid && f.texSubImage3D(f.TEXTURE_2D_ARRAY, 0, 0, 0, i, l.resource.width, l.resource.height, 1, e.format, r.type, l.resource.source))
                        }
                        return !0
                    }, e
                }(I),
                N = function(t) {
                    function e(source) {
                        var e = this,
                            r = source,
                            n = r.naturalWidth || r.videoWidth || r.width,
                            o = r.naturalHeight || r.videoHeight || r.height;
                        return (e = t.call(this, n, o) || this).source = source, e.noSubImage = !1, e
                    }
                    return m(e, t), e.crossOrigin = function(element, t, e) {
                        void 0 === e && 0 !== t.indexOf("data:") ? element.crossOrigin = Object(h.determineCrossOrigin)(t) : !1 !== e && (element.crossOrigin = "string" == typeof e ? e : "anonymous")
                    }, e.prototype.upload = function(t, e, r, source) {
                        var n = t.gl,
                            h = e.realWidth,
                            c = e.realHeight;
                        return source = source || this.source, n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === o.a.UNPACK), this.noSubImage || e.target !== n.TEXTURE_2D || r.width !== h || r.height !== c ? (r.width = h, r.height = c, n.texImage2D(e.target, 0, r.internalFormat, e.format, r.type, source)) : n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, e.format, r.type, source), !0
                    }, e.prototype.update = function() {
                        if (!this.destroyed) {
                            var source = this.source,
                                e = source.naturalWidth || source.videoWidth || source.width,
                                r = source.naturalHeight || source.videoHeight || source.height;
                            this.resize(e, r), t.prototype.update.call(this)
                        }
                    }, e.prototype.dispose = function() {
                        this.source = null
                    }, e
                }(E),
                S = function(t) {
                    function e(source) {
                        return t.call(this, source) || this
                    }
                    return m(e, t), e.test = function(source) {
                        var t = self.OffscreenCanvas;
                        return !!(t && source instanceof t) || self.HTMLCanvasElement && source instanceof HTMLCanvasElement
                    }, e
                }(N),
                O = function(t) {
                    function e(source, r) {
                        var n = this,
                            h = r || {},
                            c = h.width,
                            f = h.height,
                            l = h.autoLoad,
                            d = h.linkBaseTexture;
                        if (source && source.length !== e.SIDES) throw new Error("Invalid length. Got " + source.length + ", expected 6");
                        n = t.call(this, 6, {
                            width: c,
                            height: f
                        }) || this;
                        for (var i = 0; i < e.SIDES; i++) n.items[i].target = o.q.TEXTURE_CUBE_MAP_POSITIVE_X + i;
                        return n.linkBaseTexture = !1 !== d, source && n.initFromArray(source, r), !1 !== l && n.load(), n
                    }
                    return m(e, t), e.prototype.bind = function(e) {
                        t.prototype.bind.call(this, e), e.target = o.q.TEXTURE_CUBE_MAP
                    }, e.prototype.addBaseTextureAt = function(t, e, r) {
                        if (void 0 === r && (r = this.linkBaseTexture), !this.items[e]) throw new Error("Index " + e + " is out of bounds");
                        if (!this.linkBaseTexture || t.parentTextureArray || Object.keys(t._glTextures).length > 0) {
                            if (!t.resource) throw new Error("CubeResource does not support copying of renderTexture.");
                            this.addResourceAt(t.resource, e)
                        } else t.target = o.q.TEXTURE_CUBE_MAP_POSITIVE_X + e, t.parentTextureArray = this.baseTexture, this.items[e] = t;
                        return t.valid && !this.valid && this.resize(t.realWidth, t.realHeight), this.items[e] = t, this
                    }, e.prototype.upload = function(t, r, n) {
                        for (var o = this.itemDirtyIds, i = 0; i < e.SIDES; i++) {
                            var h = this.items[i];
                            o[i] < h.dirtyId && (h.valid && h.resource ? (h.resource.upload(t, h, n), o[i] = h.dirtyId) : o[i] < -1 && (t.gl.texImage2D(h.target, 0, n.internalFormat, r.realWidth, r.realHeight, 0, r.format, n.type, null), o[i] = -1))
                        }
                        return !0
                    }, e.test = function(source) {
                        return Array.isArray(source) && source.length === e.SIDES
                    }, e.SIDES = 6, e
                }(I),
                w = function(t) {
                    function e(source, e) {
                        var r = this;
                        if (e = e || {}, !(source instanceof HTMLImageElement)) {
                            var o = new Image;
                            N.crossOrigin(o, source, e.crossorigin), o.src = source, source = o
                        }
                        return r = t.call(this, source) || this, !source.complete && r._width && r._height && (r._width = 0, r._height = 0), r.url = source.src, r._process = null, r.preserveBitmap = !1, r.createBitmap = (void 0 !== e.createBitmap ? e.createBitmap : n.b.CREATE_IMAGE_BITMAP) && !!self.createImageBitmap, r.alphaMode = "number" == typeof e.alphaMode ? e.alphaMode : null, r.bitmap = null, r._load = null, !1 !== e.autoLoad && r.load(), r
                    }
                    return m(e, t), e.prototype.load = function(t) {
                        var e = this;
                        return this._load || (void 0 !== t && (this.createBitmap = t), this._load = new Promise((function(t, r) {
                            var source = e.source;
                            e.url = source.src;
                            var n = function() {
                                e.destroyed || (source.onload = null, source.onerror = null, e.resize(source.width, source.height), e._load = null, e.createBitmap ? t(e.process()) : t(e))
                            };
                            source.complete && source.src ? n() : (source.onload = n, source.onerror = function(t) {
                                r(t), e.onError.emit(t)
                            })
                        }))), this._load
                    }, e.prototype.process = function() {
                        var t = this,
                            source = this.source;
                        if (null !== this._process) return this._process;
                        if (null !== this.bitmap || !self.createImageBitmap) return Promise.resolve(this);
                        var e = self.createImageBitmap,
                            r = !source.crossOrigin || "anonymous" === source.crossOrigin;
                        return this._process = fetch(source.src, {
                            mode: r ? "cors" : "no-cors"
                        }).then((function(t) {
                            return t.blob()
                        })).then((function(r) {
                            return e(r, 0, 0, source.width, source.height, {
                                premultiplyAlpha: t.alphaMode === o.a.UNPACK ? "premultiply" : "none"
                            })
                        })).then((function(e) {
                            return t.destroyed ? Promise.reject() : (t.bitmap = e, t.update(), t._process = null, Promise.resolve(t))
                        })), this._process
                    }, e.prototype.upload = function(e, r, n) {
                        if ("number" == typeof this.alphaMode && (r.alphaMode = this.alphaMode), !this.createBitmap) return t.prototype.upload.call(this, e, r, n);
                        if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
                        if (t.prototype.upload.call(this, e, r, n, this.bitmap), !this.preserveBitmap) {
                            var o = !0,
                                h = r._glTextures;
                            for (var c in h) {
                                var f = h[c];
                                if (f !== n && f.dirtyId !== r.dirtyId) {
                                    o = !1;
                                    break
                                }
                            }
                            o && (this.bitmap.close && this.bitmap.close(), this.bitmap = null)
                        }
                        return !0
                    }, e.prototype.dispose = function() {
                        this.source.onload = null, this.source.onerror = null, t.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null
                    }, e.test = function(source) {
                        return "string" == typeof source || source instanceof HTMLImageElement
                    }, e
                }(N),
                C = function(t) {
                    function e(e, r) {
                        var n = this;
                        return r = r || {}, (n = t.call(this, document.createElement("canvas")) || this)._width = 0, n._height = 0, n.svg = e, n.scale = r.scale || 1, n._overrideWidth = r.width, n._overrideHeight = r.height, n._resolve = null, n._crossorigin = r.crossorigin, n._load = null, !1 !== r.autoLoad && n.load(), n
                    }
                    return m(e, t), e.prototype.load = function() {
                        var t = this;
                        return this._load || (this._load = new Promise((function(r) {
                            if (t._resolve = function() {
                                    t.resize(t.source.width, t.source.height), r(t)
                                }, e.SVG_XML.test(t.svg.trim())) {
                                if (!btoa) throw new Error("Your browser doesn't support base64 conversions.");
                                t.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(t.svg)))
                            }
                            t._loadSvg()
                        }))), this._load
                    }, e.prototype._loadSvg = function() {
                        var t = this,
                            e = new Image;
                        N.crossOrigin(e, this.svg, this._crossorigin), e.src = this.svg, e.onerror = function(r) {
                            t._resolve && (e.onerror = null, t.onError.emit(r))
                        }, e.onload = function() {
                            if (t._resolve) {
                                var r = e.width,
                                    n = e.height;
                                if (!r || !n) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                                var o = r * t.scale,
                                    c = n * t.scale;
                                (t._overrideWidth || t._overrideHeight) && (o = t._overrideWidth || t._overrideHeight / n * r, c = t._overrideHeight || t._overrideWidth / r * n), o = Math.round(o), c = Math.round(c);
                                var canvas = t.source;
                                canvas.width = o, canvas.height = c, canvas._pixiId = "canvas_" + Object(h.uid)(), canvas.getContext("2d").drawImage(e, 0, 0, r, n, 0, 0, o, c), t._resolve(), t._resolve = null
                            }
                        }
                    }, e.getSize = function(t) {
                        var r = e.SVG_SIZE.exec(t),
                            n = {};
                        return r && (n[r[1]] = Math.round(parseFloat(r[3])), n[r[5]] = Math.round(parseFloat(r[7]))), n
                    }, e.prototype.dispose = function() {
                        t.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null
                    }, e.test = function(source, t) {
                        return "svg" === t || "string" == typeof source && /^data:image\/svg\+xml(;(charset=utf8|utf8))?;base64/.test(source) || "string" == typeof source && e.SVG_XML.test(source)
                    }, e.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, e.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, e
                }(N),
                P = function(t) {
                    function e(source, r) {
                        var n = this;
                        if (r = r || {}, !(source instanceof HTMLVideoElement)) {
                            var o = document.createElement("video");
                            o.setAttribute("preload", "auto"), o.setAttribute("webkit-playsinline", ""), o.setAttribute("playsinline", ""), "string" == typeof source && (source = [source]);
                            var h = source[0].src || source[0];
                            N.crossOrigin(o, h, r.crossorigin);
                            for (var i = 0; i < source.length; ++i) {
                                var c = document.createElement("source"),
                                    f = source[i],
                                    l = f.src,
                                    d = f.mime,
                                    _ = (l = l || source[i]).split("?").shift().toLowerCase(),
                                    v = _.substr(_.lastIndexOf(".") + 1);
                                d = d || e.MIME_TYPES[v] || "video/" + v, c.src = l, c.type = d, o.appendChild(c)
                            }
                            source = o
                        }
                        return (n = t.call(this, source) || this).noSubImage = !0, n._autoUpdate = !0, n._isConnectedToTicker = !1, n._updateFPS = r.updateFPS || 0, n._msToNextUpdate = 0, n.autoPlay = !1 !== r.autoPlay, n._load = null, n._resolve = null, n._onCanPlay = n._onCanPlay.bind(n), n._onError = n._onError.bind(n), !1 !== r.autoLoad && n.load(), n
                    }
                    return m(e, t), e.prototype.update = function(e) {
                        if (!this.destroyed) {
                            var r = f.a.shared.elapsedMS * this.source.playbackRate;
                            this._msToNextUpdate = Math.floor(this._msToNextUpdate - r), (!this._updateFPS || this._msToNextUpdate <= 0) && (t.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0)
                        }
                    }, e.prototype.load = function() {
                        var t = this;
                        if (this._load) return this._load;
                        var source = this.source;
                        return (source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height && (source.complete = !0), source.addEventListener("play", this._onPlayStart.bind(this)), source.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (source.addEventListener("canplay", this._onCanPlay), source.addEventListener("canplaythrough", this._onCanPlay), source.addEventListener("error", this._onError, !0)), this._load = new Promise((function(e) {
                            t.valid ? e(t) : (t._resolve = e, source.load())
                        })), this._load
                    }, e.prototype._onError = function(t) {
                        this.source.removeEventListener("error", this._onError, !0), this.onError.emit(t)
                    }, e.prototype._isSourcePlaying = function() {
                        var source = this.source;
                        return source.currentTime > 0 && !1 === source.paused && !1 === source.ended && source.readyState > 2
                    }, e.prototype._isSourceReady = function() {
                        var source = this.source;
                        return 3 === source.readyState || 4 === source.readyState
                    }, e.prototype._onPlayStart = function() {
                        this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (f.a.shared.add(this.update, this), this._isConnectedToTicker = !0)
                    }, e.prototype._onPlayStop = function() {
                        this._isConnectedToTicker && (f.a.shared.remove(this.update, this), this._isConnectedToTicker = !1)
                    }, e.prototype._onCanPlay = function() {
                        var source = this.source;
                        source.removeEventListener("canplay", this._onCanPlay), source.removeEventListener("canplaythrough", this._onCanPlay);
                        var t = this.valid;
                        this.resize(source.videoWidth, source.videoHeight), !t && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && source.play()
                    }, e.prototype.dispose = function() {
                        this._isConnectedToTicker && (f.a.shared.remove(this.update, this), this._isConnectedToTicker = !1);
                        var source = this.source;
                        source && (source.removeEventListener("error", this._onError, !0), source.pause(), source.src = "", source.load()), t.prototype.dispose.call(this)
                    }, Object.defineProperty(e.prototype, "autoUpdate", {
                        get: function() {
                            return this._autoUpdate
                        },
                        set: function(t) {
                            t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isConnectedToTicker ? (f.a.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (f.a.shared.add(this.update, this), this._isConnectedToTicker = !0))
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "updateFPS", {
                        get: function() {
                            return this._updateFPS
                        },
                        set: function(t) {
                            t !== this._updateFPS && (this._updateFPS = t)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.test = function(source, t) {
                        return self.HTMLVideoElement && source instanceof HTMLVideoElement || e.TYPES.indexOf(t) > -1
                    }, e.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], e.MIME_TYPES = {
                        ogv: "video/ogg",
                        mov: "video/quicktime",
                        m4v: "video/mp4"
                    }, e
                }(N),
                L = function(t) {
                    function e(source) {
                        return t.call(this, source) || this
                    }
                    return m(e, t), e.test = function(source) {
                        return !!self.createImageBitmap && source instanceof ImageBitmap
                    }, e
                }(N);
            d.push(w, L, S, P, C, T, O, A);
            var M = {
                    __proto__: null,
                    Resource: E,
                    BaseImageResource: N,
                    INSTALLED: d,
                    autoDetectResource: _,
                    AbstractMultiResource: I,
                    ArrayResource: A,
                    BufferResource: T,
                    CanvasResource: S,
                    CubeResource: O,
                    ImageResource: w,
                    SVGResource: C,
                    VideoResource: P,
                    ImageBitmapResource: L
                },
                U = function(t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this
                    }
                    return m(e, t), e.prototype.upload = function(t, e, r) {
                        var n = t.gl;
                        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === o.a.UNPACK);
                        var h = e.realWidth,
                            c = e.realHeight;
                        return r.width === h && r.height === c ? n.texSubImage2D(e.target, 0, 0, 0, h, c, e.format, r.type, this.data) : (r.width = h, r.height = c, n.texImage2D(e.target, 0, r.internalFormat, h, c, 0, e.format, r.type, this.data)), !0
                    }, e
                }(T),
                F = function() {
                    function t(t, e) {
                        this.width = Math.round(t || 100), this.height = Math.round(e || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new c.a("disposeFramebuffer"), this.multisample = o.l.NONE
                    }
                    return Object.defineProperty(t.prototype, "colorTexture", {
                        get: function() {
                            return this.colorTextures[0]
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.addColorTexture = function(t, e) {
                        return void 0 === t && (t = 0), this.colorTextures[t] = e || new R(null, {
                            scaleMode: o.p.NEAREST,
                            resolution: 1,
                            mipmap: o.k.OFF,
                            width: this.width,
                            height: this.height
                        }), this.dirtyId++, this.dirtyFormat++, this
                    }, t.prototype.addDepthTexture = function(t) {
                        return this.depthTexture = t || new R(new U(null, {
                            width: this.width,
                            height: this.height
                        }), {
                            scaleMode: o.p.NEAREST,
                            resolution: 1,
                            width: this.width,
                            height: this.height,
                            mipmap: o.k.OFF,
                            format: o.h.DEPTH_COMPONENT,
                            type: o.r.UNSIGNED_SHORT
                        }), this.dirtyId++, this.dirtyFormat++, this
                    }, t.prototype.enableDepth = function() {
                        return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this
                    }, t.prototype.enableStencil = function() {
                        return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this
                    }, t.prototype.resize = function(t, e) {
                        if (t = Math.round(t), e = Math.round(e), t !== this.width || e !== this.height) {
                            this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
                            for (var i = 0; i < this.colorTextures.length; i++) {
                                var r = this.colorTextures[i],
                                    n = r.resolution;
                                r.setSize(t / n, e / n)
                            }
                            if (this.depthTexture) {
                                n = this.depthTexture.resolution;
                                this.depthTexture.setSize(t / n, e / n)
                            }
                        }
                    }, t.prototype.dispose = function() {
                        this.disposeRunner.emit(this, !1)
                    }, t.prototype.destroyDepthTexture = function() {
                        this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat)
                    }, t
                }(),
                D = function(t) {
                    function e(e) {
                        var r = this;
                        if ("number" == typeof e) {
                            var n = arguments[0],
                                h = arguments[1],
                                c = arguments[2],
                                f = arguments[3];
                            e = {
                                width: n,
                                height: h,
                                scaleMode: c,
                                resolution: f
                            }
                        }
                        return e.width = e.width || 100, e.height = e.height || 100, e.multisample = void 0 !== e.multisample ? e.multisample : o.l.NONE, (r = t.call(this, null, e) || this).mipmap = o.k.OFF, r.valid = !0, r.clearColor = [0, 0, 0, 0], r.framebuffer = new F(r.realWidth, r.realHeight).addColorTexture(0, r), r.framebuffer.multisample = e.multisample, r.maskStack = [], r.filterStack = [{}], r
                    }
                    return m(e, t), e.prototype.resize = function(t, e) {
                        this.framebuffer.resize(t * this.resolution, e * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height)
                    }, e.prototype.dispose = function() {
                        this.framebuffer.dispose(), t.prototype.dispose.call(this)
                    }, e.prototype.destroy = function() {
                        t.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null
                    }, e
                }(R),
                B = function() {
                    function t() {
                        this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8)
                    }
                    return t.prototype.set = function(t, e, r) {
                        var n = e.width,
                            th = e.height;
                        if (r) {
                            var o = t.width / 2 / n,
                                h2 = t.height / 2 / th,
                                h = t.x / n + o,
                                c = t.y / th + h2;
                            r = l.n.add(r, l.n.NW), this.x0 = h + o * l.n.uX(r), this.y0 = c + h2 * l.n.uY(r), r = l.n.add(r, 2), this.x1 = h + o * l.n.uX(r), this.y1 = c + h2 * l.n.uY(r), r = l.n.add(r, 2), this.x2 = h + o * l.n.uX(r), this.y2 = c + h2 * l.n.uY(r), r = l.n.add(r, 2), this.x3 = h + o * l.n.uX(r), this.y3 = c + h2 * l.n.uY(r)
                        } else this.x0 = t.x / n, this.y0 = t.y / th, this.x1 = (t.x + t.width) / n, this.y1 = t.y / th, this.x2 = (t.x + t.width) / n, this.y2 = (t.y + t.height) / th, this.x3 = t.x / n, this.y3 = (t.y + t.height) / th;
                        this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3
                    }, t.prototype.toString = function() {
                        return "[@pixi/core:TextureUvs x0=" + this.x0 + " y0=" + this.y0 + " x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3 + "]"
                    }, t
                }(),
                G = new B,
                k = function(t) {
                    function e(r, n, o, h, c, f) {
                        var d = t.call(this) || this;
                        if (d.noFrame = !1, n || (d.noFrame = !0, n = new l.j(0, 0, 1, 1)), r instanceof e && (r = r.baseTexture), d.baseTexture = r, d._frame = n, d.trim = h, d.valid = !1, d._uvs = G, d.uvMatrix = null, d.orig = o || n, d._rotate = Number(c || 0), !0 === c) d._rotate = 2;
                        else if (d._rotate % 2 != 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
                        return d.defaultAnchor = f ? new l.g(f.x, f.y) : new l.g(0, 0), d._updateID = 0, d.textureCacheIds = [], r.valid ? d.noFrame ? r.valid && d.onBaseTextureUpdated(r) : d.frame = n : r.once("loaded", d.onBaseTextureUpdated, d), d.noFrame && r.on("update", d.onBaseTextureUpdated, d), d
                    }
                    return m(e, t), e.prototype.update = function() {
                        this.baseTexture.resource && this.baseTexture.resource.update()
                    }, e.prototype.onBaseTextureUpdated = function(t) {
                        if (this.noFrame) {
                            if (!this.baseTexture.valid) return;
                            this._frame.width = t.width, this._frame.height = t.height, this.valid = !0, this.updateUvs()
                        } else this.frame = this._frame;
                        this.emit("update", this)
                    }, e.prototype.destroy = function(t) {
                        if (this.baseTexture) {
                            if (t) {
                                var r = this.baseTexture.resource;
                                r && r.url && h.TextureCache[r.url] && e.removeFromCache(r.url), this.baseTexture.destroy()
                            }
                            this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null
                        }
                        this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, e.removeFromCache(this), this.textureCacheIds = null
                    }, e.prototype.clone = function() {
                        var t = this._frame.clone(),
                            r = this._frame === this.orig ? t : this.orig.clone(),
                            n = new e(this.baseTexture, !this.noFrame && t, r, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
                        return this.noFrame && (n._frame = t), n
                    }, e.prototype.updateUvs = function() {
                        this._uvs === G && (this._uvs = new B), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++
                    }, e.from = function(source, t, r) {
                        void 0 === t && (t = {}), void 0 === r && (r = n.b.STRICT_TEXTURE_CACHE);
                        var o = "string" == typeof source,
                            c = null;
                        if (o) c = source;
                        else if (source instanceof R) {
                            if (!source.cacheId) {
                                var f = t && t.pixiIdPrefix || "pixiid";
                                source.cacheId = f + "-" + Object(h.uid)(), R.addToCache(source, source.cacheId)
                            }
                            c = source.cacheId
                        } else {
                            if (!source._pixiId) {
                                f = t && t.pixiIdPrefix || "pixiid";
                                source._pixiId = f + "_" + Object(h.uid)()
                            }
                            c = source._pixiId
                        }
                        var l = h.TextureCache[c];
                        if (o && r && !l) throw new Error('The cacheId "' + c + '" does not exist in TextureCache.');
                        return l || source instanceof R ? !l && source instanceof R && (l = new e(source), e.addToCache(l, c)) : (t.resolution || (t.resolution = Object(h.getResolutionOfUrl)(source)), (l = new e(new R(source, t))).baseTexture.cacheId = c, R.addToCache(l.baseTexture, c), e.addToCache(l, c)), l
                    }, e.fromURL = function(t, r) {
                        var n = Object.assign({
                                autoLoad: !1
                            }, null == r ? void 0 : r.resourceOptions),
                            o = e.from(t, Object.assign({
                                resourceOptions: n
                            }, r), !1),
                            h = o.baseTexture.resource;
                        return o.baseTexture.valid ? Promise.resolve(o) : h.load().then((function() {
                            return Promise.resolve(o)
                        }))
                    }, e.fromBuffer = function(t, r, n, o) {
                        return new e(R.fromBuffer(t, r, n, o))
                    }, e.fromLoader = function(source, t, r, o) {
                        var c = new R(source, Object.assign({
                                scaleMode: n.b.SCALE_MODE,
                                resolution: Object(h.getResolutionOfUrl)(t)
                            }, o)),
                            f = c.resource;
                        f instanceof w && (f.url = t);
                        var l = new e(c);
                        return r || (r = t), R.addToCache(l.baseTexture, r), e.addToCache(l, r), r !== t && (R.addToCache(l.baseTexture, t), e.addToCache(l, t)), l.baseTexture.valid ? Promise.resolve(l) : new Promise((function(t) {
                            l.baseTexture.once("loaded", (function() {
                                return t(l)
                            }))
                        }))
                    }, e.addToCache = function(t, e) {
                        e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), h.TextureCache[e] && console.warn("Texture added to the cache with an id [" + e + "] that already had an entry"), h.TextureCache[e] = t)
                    }, e.removeFromCache = function(t) {
                        if ("string" == typeof t) {
                            var e = h.TextureCache[t];
                            if (e) {
                                var r = e.textureCacheIds.indexOf(t);
                                return r > -1 && e.textureCacheIds.splice(r, 1), delete h.TextureCache[t], e
                            }
                        } else if (t && t.textureCacheIds) {
                            for (var i = 0; i < t.textureCacheIds.length; ++i) h.TextureCache[t.textureCacheIds[i]] === t && delete h.TextureCache[t.textureCacheIds[i]];
                            return t.textureCacheIds.length = 0, t
                        }
                        return null
                    }, Object.defineProperty(e.prototype, "resolution", {
                        get: function() {
                            return this.baseTexture.resolution
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "frame", {
                        get: function() {
                            return this._frame
                        },
                        set: function(t) {
                            this._frame = t, this.noFrame = !1;
                            var e = t.x,
                                r = t.y,
                                n = t.width,
                                o = t.height,
                                h = e + n > this.baseTexture.width,
                                c = r + o > this.baseTexture.height;
                            if (h || c) {
                                var f = h && c ? "and" : "or",
                                    l = "X: " + e + " + " + n + " = " + (e + n) + " > " + this.baseTexture.width,
                                    d = "Y: " + r + " + " + o + " = " + (r + o) + " > " + this.baseTexture.height;
                                throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + l + " " + f + " " + d)
                            }
                            this.valid = n && o && this.baseTexture.valid, this.trim || this.rotate || (this.orig = t), this.valid && this.updateUvs()
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "rotate", {
                        get: function() {
                            return this._rotate
                        },
                        set: function(t) {
                            this._rotate = t, this.valid && this.updateUvs()
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "width", {
                        get: function() {
                            return this.orig.width
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "height", {
                        get: function() {
                            return this.orig.height
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.castToBaseTexture = function() {
                        return this.baseTexture
                    }, e
                }(h.EventEmitter);

            function H(t) {
                t.destroy = function() {}, t.on = function() {}, t.once = function() {}, t.emit = function() {}
            }
            k.EMPTY = new k(new R), H(k.EMPTY), H(k.EMPTY.baseTexture), k.WHITE = function() {
                var canvas = document.createElement("canvas");
                canvas.width = 16, canvas.height = 16;
                var t = canvas.getContext("2d");
                return t.fillStyle = "white", t.fillRect(0, 0, 16, 16), new k(new R(new S(canvas)))
            }(), H(k.WHITE), H(k.WHITE.baseTexture);
            var j = function(t) {
                    function e(e, r) {
                        var n = t.call(this, e, r) || this;
                        return n.valid = !0, n.filterFrame = null, n.filterPoolKey = null, n.updateUvs(), n
                    }
                    return m(e, t), Object.defineProperty(e.prototype, "framebuffer", {
                        get: function() {
                            return this.baseTexture.framebuffer
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "multisample", {
                        get: function() {
                            return this.framebuffer.multisample
                        },
                        set: function(t) {
                            this.framebuffer.multisample = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.resize = function(t, e, r) {
                        void 0 === r && (r = !0);
                        var n = this.baseTexture.resolution,
                            o = Math.round(t * n) / n,
                            h = Math.round(e * n) / n;
                        this.valid = o > 0 && h > 0, this._frame.width = this.orig.width = o, this._frame.height = this.orig.height = h, r && this.baseTexture.resize(o, h), this.updateUvs()
                    }, e.prototype.setResolution = function(t) {
                        var e = this.baseTexture;
                        e.resolution !== t && (e.setResolution(t), this.resize(e.width, e.height, !1))
                    }, e.create = function(t) {
                        for (var r = arguments, n = [], o = 1; o < arguments.length; o++) n[o - 1] = r[o];
                        return "number" == typeof t && (Object(h.deprecation)("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."), t = {
                            width: t,
                            height: n[0],
                            scaleMode: n[1],
                            resolution: n[2]
                        }), new e(new D(t))
                    }, e
                }(k),
                V = function() {
                    function t(t) {
                        this.texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0
                    }
                    return t.prototype.createTexture = function(t, e, r) {
                        void 0 === r && (r = o.l.NONE);
                        var n = new D(Object.assign({
                            width: t,
                            height: e,
                            resolution: 1,
                            multisample: r
                        }, this.textureOptions));
                        return new j(n)
                    }, t.prototype.getOptimalTexture = function(t, e, r, n) {
                        var c;
                        void 0 === r && (r = 1), void 0 === n && (n = o.l.NONE), t = Math.ceil(t * r), e = Math.ceil(e * r), this.enableFullScreen && t === this._pixelsWidth && e === this._pixelsHeight ? c = n > 1 ? -n : -1 : (c = ((65535 & (t = Object(h.nextPow2)(t))) << 16 | 65535 & (e = Object(h.nextPow2)(e))) >>> 0, n > 1 && (c += 4294967296 * n)), this.texturePool[c] || (this.texturePool[c] = []);
                        var f = this.texturePool[c].pop();
                        return f || (f = this.createTexture(t, e, n)), f.filterPoolKey = c, f.setResolution(r), f
                    }, t.prototype.getFilterTexture = function(input, t, e) {
                        var r = this.getOptimalTexture(input.width, input.height, t || input.resolution, e || o.l.NONE);
                        return r.filterFrame = input.filterFrame, r
                    }, t.prototype.returnTexture = function(t) {
                        var e = t.filterPoolKey;
                        t.filterFrame = null, this.texturePool[e].push(t)
                    }, t.prototype.returnFilterTexture = function(t) {
                        this.returnTexture(t)
                    }, t.prototype.clear = function(t) {
                        if (t = !1 !== t)
                            for (var i in this.texturePool) {
                                var e = this.texturePool[i];
                                if (e)
                                    for (var r = 0; r < e.length; r++) e[r].destroy(!0)
                            }
                        this.texturePool = {}
                    }, t.prototype.setScreenSize = function(t) {
                        if (t.width !== this._pixelsWidth || t.height !== this._pixelsHeight) {
                            for (var i in this.enableFullScreen = t.width > 0 && t.height > 0, this.texturePool)
                                if (Number(i) < 0) {
                                    var e = this.texturePool[i];
                                    if (e)
                                        for (var r = 0; r < e.length; r++) e[r].destroy(!0);
                                    this.texturePool[i] = []
                                } this._pixelsWidth = t.width, this._pixelsHeight = t.height
                        }
                    }, t.SCREEN_KEY = -1, t
                }(),
                X = function() {
                    function t(t, e, r, n, h, c, f) {
                        void 0 === e && (e = 0), void 0 === r && (r = !1), void 0 === n && (n = o.r.FLOAT), this.buffer = t, this.size = e, this.normalized = r, this.type = n, this.stride = h, this.start = c, this.instance = f
                    }
                    return t.prototype.destroy = function() {
                        this.buffer = null
                    }, t.from = function(e, r, n, o, h) {
                        return new t(e, r, n, o, h)
                    }, t
                }(),
                z = 0,
                Y = function() {
                    function t(data, t, e) {
                        void 0 === t && (t = !0), void 0 === e && (e = !1), this.data = data || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = e, this.static = t, this.id = z++, this.disposeRunner = new c.a("disposeBuffer")
                    }
                    return t.prototype.update = function(data) {
                        data instanceof Array && (data = new Float32Array(data)), this.data = data || this.data, this._updateID++
                    }, t.prototype.dispose = function() {
                        this.disposeRunner.emit(this, !1)
                    }, t.prototype.destroy = function() {
                        this.dispose(), this.data = null
                    }, Object.defineProperty(t.prototype, "index", {
                        get: function() {
                            return this.type === o.d.ELEMENT_ARRAY_BUFFER
                        },
                        set: function(t) {
                            this.type = t ? o.d.ELEMENT_ARRAY_BUFFER : o.d.ARRAY_BUFFER
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.from = function(data) {
                        return data instanceof Array && (data = new Float32Array(data)), new t(data)
                    }, t
                }(),
                map = {
                    Float32Array: Float32Array,
                    Uint32Array: Uint32Array,
                    Int32Array: Int32Array,
                    Uint8Array: Uint8Array
                };
            var W = {
                    5126: 4,
                    5123: 2,
                    5121: 1
                },
                Z = 0,
                K = {
                    Float32Array: Float32Array,
                    Uint32Array: Uint32Array,
                    Int32Array: Int32Array,
                    Uint8Array: Uint8Array,
                    Uint16Array: Uint16Array
                },
                J = function() {
                    function t(t, e) {
                        void 0 === t && (t = []), void 0 === e && (e = {}), this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = Z++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new c.a("disposeGeometry"), this.refCount = 0
                    }
                    return t.prototype.addAttribute = function(t, e, r, n, o, h, c, f) {
                        if (void 0 === r && (r = 0), void 0 === n && (n = !1), void 0 === f && (f = !1), !e) throw new Error("You must pass a buffer when creating an attribute");
                        e instanceof Y || (e instanceof Array && (e = new Float32Array(e)), e = new Y(e));
                        var l = t.split("|");
                        if (l.length > 1) {
                            for (var i = 0; i < l.length; i++) this.addAttribute(l[i], e, r, n, o);
                            return this
                        }
                        var d = this.buffers.indexOf(e);
                        return -1 === d && (this.buffers.push(e), d = this.buffers.length - 1), this.attributes[t] = new X(d, r, n, o, h, c, f), this.instanced = this.instanced || f, this
                    }, t.prototype.getAttribute = function(t) {
                        return this.attributes[t]
                    }, t.prototype.getBuffer = function(t) {
                        return this.buffers[this.getAttribute(t).buffer]
                    }, t.prototype.addIndex = function(t) {
                        return t instanceof Y || (t instanceof Array && (t = new Uint16Array(t)), t = new Y(t)), t.type = o.d.ELEMENT_ARRAY_BUFFER, this.indexBuffer = t, -1 === this.buffers.indexOf(t) && this.buffers.push(t), this
                    }, t.prototype.getIndex = function() {
                        return this.indexBuffer
                    }, t.prototype.interleave = function() {
                        if (1 === this.buffers.length || 2 === this.buffers.length && this.indexBuffer) return this;
                        var i, t = [],
                            e = [],
                            r = new Y;
                        for (i in this.attributes) {
                            var n = this.attributes[i],
                                o = this.buffers[n.buffer];
                            t.push(o.data), e.push(n.size * W[n.type] / 4), n.buffer = 0
                        }
                        for (r.data = function(t, e) {
                                for (var r = 0, n = 0, o = {}, i = 0; i < t.length; i++) n += e[i], r += t[i].length;
                                var c = new ArrayBuffer(4 * r),
                                    f = null,
                                    l = 0;
                                for (i = 0; i < t.length; i++) {
                                    var d = e[i],
                                        _ = t[i],
                                        v = Object(h.getBufferType)(_);
                                    o[v] || (o[v] = new map[v](c)), f = o[v];
                                    for (var m = 0; m < _.length; m++) f[(m / d | 0) * n + l + m % d] = _[m];
                                    l += d
                                }
                                return new Float32Array(c)
                            }(t, e), i = 0; i < this.buffers.length; i++) this.buffers[i] !== this.indexBuffer && this.buffers[i].destroy();
                        return this.buffers = [r], this.indexBuffer && this.buffers.push(this.indexBuffer), this
                    }, t.prototype.getSize = function() {
                        for (var i in this.attributes) {
                            var t = this.attributes[i];
                            return this.buffers[t.buffer].data.length / (t.stride / 4 || t.size)
                        }
                        return 0
                    }, t.prototype.dispose = function() {
                        this.disposeRunner.emit(this, !1)
                    }, t.prototype.destroy = function() {
                        this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null
                    }, t.prototype.clone = function() {
                        for (var e = new t, i = 0; i < this.buffers.length; i++) e.buffers[i] = new Y(this.buffers[i].data.slice(0));
                        for (var i in this.attributes) {
                            var r = this.attributes[i];
                            e.attributes[i] = new X(r.buffer, r.size, r.normalized, r.type, r.stride, r.start, r.instance)
                        }
                        return this.indexBuffer && (e.indexBuffer = e.buffers[this.buffers.indexOf(this.indexBuffer)], e.indexBuffer.type = o.d.ELEMENT_ARRAY_BUFFER), e
                    }, t.merge = function(e) {
                        for (var r, n = new t, c = [], f = [], l = [], i = 0; i < e.length; i++) {
                            r = e[i];
                            for (var d = 0; d < r.buffers.length; d++) f[d] = f[d] || 0, f[d] += r.buffers[d].data.length, l[d] = 0
                        }
                        for (i = 0; i < r.buffers.length; i++) c[i] = new(K[Object(h.getBufferType)(r.buffers[i].data)])(f[i]), n.buffers[i] = new Y(c[i]);
                        for (i = 0; i < e.length; i++) {
                            r = e[i];
                            for (d = 0; d < r.buffers.length; d++) c[d].set(r.buffers[d].data, l[d]), l[d] += r.buffers[d].data.length
                        }
                        if (n.attributes = r.attributes, r.indexBuffer) {
                            n.indexBuffer = n.buffers[r.buffers.indexOf(r.indexBuffer)], n.indexBuffer.type = o.d.ELEMENT_ARRAY_BUFFER;
                            var _ = 0,
                                v = 0,
                                m = 0,
                                y = 0;
                            for (i = 0; i < r.buffers.length; i++)
                                if (r.buffers[i] !== r.indexBuffer) {
                                    y = i;
                                    break
                                } for (var i in r.attributes) {
                                var E = r.attributes[i];
                                (0 | E.buffer) === y && (v += E.size * W[E.type] / 4)
                            }
                            for (i = 0; i < e.length; i++) {
                                var T = e[i].indexBuffer.data;
                                for (d = 0; d < T.length; d++) n.indexBuffer.data[d + m] += _;
                                _ += e[i].buffers[y].data.length / v, m += T.length
                            }
                        }
                        return n
                    }, t
                }(),
                $ = function(t) {
                    function e() {
                        var e = t.call(this) || this;
                        return e.addAttribute("aVertexPosition", new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).addIndex([0, 1, 3, 2]), e
                    }
                    return m(e, t), e
                }(J),
                Q = function(t) {
                    function e() {
                        var e = t.call(this) || this;
                        return e.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), e.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), e.vertexBuffer = new Y(e.vertices), e.uvBuffer = new Y(e.uvs), e.addAttribute("aVertexPosition", e.vertexBuffer).addAttribute("aTextureCoord", e.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]), e
                    }
                    return m(e, t), e.prototype.map = function(t, e) {
                        var r = 0,
                            n = 0;
                        return this.uvs[0] = r, this.uvs[1] = n, this.uvs[2] = r + e.width / t.width, this.uvs[3] = n, this.uvs[4] = r + e.width / t.width, this.uvs[5] = n + e.height / t.height, this.uvs[6] = r, this.uvs[7] = n + e.height / t.height, r = e.x, n = e.y, this.vertices[0] = r, this.vertices[1] = n, this.vertices[2] = r + e.width, this.vertices[3] = n, this.vertices[4] = r + e.width, this.vertices[5] = n + e.height, this.vertices[6] = r, this.vertices[7] = n + e.height, this.invalidate(), this
                    }, e.prototype.invalidate = function() {
                        return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this
                    }, e
                }(J),
                tt = 0,
                et = function() {
                    function t(t, e, r) {
                        this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = tt++, this.static = !!e, this.ubo = !!r, t instanceof Y ? (this.buffer = t, this.buffer.type = o.d.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = t, this.ubo && (this.buffer = new Y(new Float32Array(1)), this.buffer.type = o.d.UNIFORM_BUFFER, this.autoManage = !0))
                    }
                    return t.prototype.update = function() {
                        this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update()
                    }, t.prototype.add = function(e, r, n) {
                        if (this.ubo) throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
                        this.uniforms[e] = new t(r, n)
                    }, t.from = function(e, r, n) {
                        return new t(e, r, n)
                    }, t.uboFrom = function(e, r) {
                        return new t(e, null == r || r, !0)
                    }, t
                }(),
                it = function() {
                    function t() {
                        this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = o.l.NONE, this.sourceFrame = new l.j, this.destinationFrame = new l.j, this.bindingSourceFrame = new l.j, this.bindingDestinationFrame = new l.j, this.filters = [], this.transform = null
                    }
                    return t.prototype.clear = function() {
                        this.target = null, this.filters = null, this.renderTexture = null
                    }, t
                }(),
                nt = [new l.g, new l.g, new l.g, new l.g],
                ot = new l.d,
                st = function() {
                    function t(t) {
                        this.renderer = t, this.defaultFilterStack = [{}], this.texturePool = new V, this.texturePool.setScreenSize(t.view), this.statePool = [], this.quad = new $, this.quadUv = new Q, this.tempRect = new l.j, this.activeState = {}, this.globalUniforms = new et({
                            outputFrame: new l.j,
                            inputSize: new Float32Array(4),
                            inputPixel: new Float32Array(4),
                            inputClamp: new Float32Array(4),
                            resolution: 1,
                            filterArea: new Float32Array(4),
                            filterClamp: new Float32Array(4)
                        }, !0), this.forceClear = !1, this.useMaxPadding = !1
                    }
                    return t.prototype.push = function(t, e) {
                        for (var r, n, o = this.renderer, h = this.defaultFilterStack, c = this.statePool.pop() || new it, f = this.renderer.renderTexture, l = e[0].resolution, d = e[0].multisample, _ = e[0].padding, v = e[0].autoFit, m = null === (r = e[0].legacy) || void 0 === r || r, i = 1; i < e.length; i++) {
                            var filter = e[i];
                            l = Math.min(l, filter.resolution), d = Math.min(d, filter.multisample), _ = this.useMaxPadding ? Math.max(_, filter.padding) : _ + filter.padding, v = v && filter.autoFit, m = m || null === (n = filter.legacy) || void 0 === n || n
                        }
                        if (1 === h.length && (this.defaultFilterStack[0].renderTexture = f.current), h.push(c), c.resolution = l, c.multisample = d, c.legacy = m, c.target = t, c.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), c.sourceFrame.pad(_), v) {
                            var y = this.tempRect.copyFrom(f.sourceFrame);
                            o.projection.transform && this.transformAABB(ot.copyFrom(o.projection.transform).invert(), y), c.sourceFrame.fit(y)
                        }
                        this.roundFrame(c.sourceFrame, f.current ? f.current.resolution : o.resolution, f.sourceFrame, f.destinationFrame, o.projection.transform), c.renderTexture = this.getOptimalFilterTexture(c.sourceFrame.width, c.sourceFrame.height, l, d), c.filters = e, c.destinationFrame.width = c.renderTexture.width, c.destinationFrame.height = c.renderTexture.height;
                        var E = this.tempRect;
                        E.x = 0, E.y = 0, E.width = c.sourceFrame.width, E.height = c.sourceFrame.height, c.renderTexture.filterFrame = c.sourceFrame, c.bindingSourceFrame.copyFrom(f.sourceFrame), c.bindingDestinationFrame.copyFrom(f.destinationFrame), c.transform = o.projection.transform, o.projection.transform = null, f.bind(c.renderTexture, c.sourceFrame, E), o.framebuffer.clear(0, 0, 0, 0)
                    }, t.prototype.pop = function() {
                        var t = this.defaultFilterStack,
                            e = t.pop(),
                            r = e.filters;
                        this.activeState = e;
                        var n = this.globalUniforms.uniforms;
                        n.outputFrame = e.sourceFrame, n.resolution = e.resolution;
                        var h = n.inputSize,
                            c = n.inputPixel,
                            f = n.inputClamp;
                        if (h[0] = e.destinationFrame.width, h[1] = e.destinationFrame.height, h[2] = 1 / h[0], h[3] = 1 / h[1], c[0] = Math.round(h[0] * e.resolution), c[1] = Math.round(h[1] * e.resolution), c[2] = 1 / c[0], c[3] = 1 / c[1], f[0] = .5 * c[2], f[1] = .5 * c[3], f[2] = e.sourceFrame.width * h[2] - .5 * c[2], f[3] = e.sourceFrame.height * h[3] - .5 * c[3], e.legacy) {
                            var l = n.filterArea;
                            l[0] = e.destinationFrame.width, l[1] = e.destinationFrame.height, l[2] = e.sourceFrame.x, l[3] = e.sourceFrame.y, n.filterClamp = n.inputClamp
                        }
                        this.globalUniforms.update();
                        var d = t[t.length - 1];
                        if (this.renderer.framebuffer.blit(), 1 === r.length) r[0].apply(this, e.renderTexture, d.renderTexture, o.e.BLEND, e), this.returnFilterTexture(e.renderTexture);
                        else {
                            var _ = e.renderTexture,
                                v = this.getOptimalFilterTexture(_.width, _.height, e.resolution);
                            v.filterFrame = _.filterFrame;
                            var i = 0;
                            for (i = 0; i < r.length - 1; ++i) {
                                1 === i && e.multisample > 1 && ((v = this.getOptimalFilterTexture(_.width, _.height, e.resolution)).filterFrame = _.filterFrame), r[i].apply(this, _, v, o.e.CLEAR, e);
                                var m = _;
                                _ = v, v = m
                            }
                            r[i].apply(this, _, d.renderTexture, o.e.BLEND, e), i > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture), this.returnFilterTexture(_), this.returnFilterTexture(v)
                        }
                        e.clear(), this.statePool.push(e)
                    }, t.prototype.bindAndClear = function(t, e) {
                        void 0 === e && (e = o.e.CLEAR);
                        var r = this.renderer,
                            n = r.renderTexture,
                            h = r.state;
                        if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, t && t.filterFrame) {
                            var c = this.tempRect;
                            c.x = 0, c.y = 0, c.width = t.filterFrame.width, c.height = t.filterFrame.height, n.bind(t, t.filterFrame, c)
                        } else t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? n.bind(t) : this.renderer.renderTexture.bind(t, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
                        var f = 1 & h.stateId || this.forceClear;
                        (e === o.e.CLEAR || e === o.e.BLIT && f) && this.renderer.framebuffer.clear(0, 0, 0, 0)
                    }, t.prototype.applyFilter = function(filter, input, output, t) {
                        var e = this.renderer;
                        e.state.set(filter.state), this.bindAndClear(output, t), filter.uniforms.uSampler = input, filter.uniforms.filterGlobals = this.globalUniforms, e.shader.bind(filter), filter.legacy = !!filter.program.attributeData.aTextureCoord, filter.legacy ? (this.quadUv.map(input._frame, input.filterFrame), e.geometry.bind(this.quadUv), e.geometry.draw(o.f.TRIANGLES)) : (e.geometry.bind(this.quad), e.geometry.draw(o.f.TRIANGLE_STRIP))
                    }, t.prototype.calculateSpriteMatrix = function(t, e) {
                        var r = this.activeState,
                            n = r.sourceFrame,
                            o = r.destinationFrame,
                            h = e._texture.orig,
                            c = t.set(o.width, 0, 0, o.height, n.x, n.y),
                            f = e.worldTransform.copyTo(l.d.TEMP_MATRIX);
                        return f.invert(), c.prepend(f), c.scale(1 / h.width, 1 / h.height), c.translate(e.anchor.x, e.anchor.y), c
                    }, t.prototype.destroy = function() {
                        this.renderer = null, this.texturePool.clear(!1)
                    }, t.prototype.getOptimalFilterTexture = function(t, e, r, n) {
                        return void 0 === r && (r = 1), void 0 === n && (n = o.l.NONE), this.texturePool.getOptimalTexture(t, e, r, n)
                    }, t.prototype.getFilterTexture = function(input, t, e) {
                        if ("number" == typeof input) {
                            var r = input;
                            input = t, t = r
                        }
                        input = input || this.activeState.renderTexture;
                        var n = this.texturePool.getOptimalTexture(input.width, input.height, t || input.resolution, e || o.l.NONE);
                        return n.filterFrame = input.filterFrame, n
                    }, t.prototype.returnFilterTexture = function(t) {
                        this.texturePool.returnTexture(t)
                    }, t.prototype.emptyPool = function() {
                        this.texturePool.clear(!0)
                    }, t.prototype.resize = function() {
                        this.texturePool.setScreenSize(this.renderer.view)
                    }, t.prototype.transformAABB = function(t, rect) {
                        var e = nt[0],
                            r = nt[1],
                            rt = nt[2],
                            n = nt[3];
                        e.set(rect.left, rect.top), r.set(rect.left, rect.bottom), rt.set(rect.right, rect.top), n.set(rect.right, rect.bottom), t.apply(e, e), t.apply(r, r), t.apply(rt, rt), t.apply(n, n);
                        var o = Math.min(e.x, r.x, rt.x, n.x),
                            h = Math.min(e.y, r.y, rt.y, n.y),
                            c = Math.max(e.x, r.x, rt.x, n.x),
                            f = Math.max(e.y, r.y, rt.y, n.y);
                        rect.x = o, rect.y = h, rect.width = c - o, rect.height = f - h
                    }, t.prototype.roundFrame = function(t, e, r, n, o) {
                        if (!(t.width <= 0 || t.height <= 0 || r.width <= 0 || r.height <= 0)) {
                            if (o) {
                                var a = o.a,
                                    b = o.b,
                                    h = o.c,
                                    c = o.d;
                                if ((Math.abs(b) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(c) > 1e-4)) return
                            }(o = o ? ot.copyFrom(o) : ot.identity()).translate(-r.x, -r.y).scale(n.width / r.width, n.height / r.height).translate(n.x, n.y), this.transformAABB(o, t), t.ceil(e), this.transformAABB(o.invert(), t)
                        }
                    }, t
                }(),
                at = function() {
                    function t(t) {
                        this.renderer = t
                    }
                    return t.prototype.flush = function() {}, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t.prototype.start = function() {}, t.prototype.stop = function() {
                        this.flush()
                    }, t.prototype.render = function(t) {}, t
                }(),
                ut = function() {
                    function t(t) {
                        this.renderer = t, this.emptyRenderer = new at(t), this.currentRenderer = this.emptyRenderer
                    }
                    return t.prototype.setObjectRenderer = function(t) {
                        this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start())
                    }, t.prototype.flush = function() {
                        this.setObjectRenderer(this.emptyRenderer)
                    }, t.prototype.reset = function() {
                        this.setObjectRenderer(this.emptyRenderer)
                    }, t.prototype.copyBoundTextures = function(t, e) {
                        for (var r = this.renderer.texture.boundTextures, i = e - 1; i >= 0; --i) t[i] = r[i] || null, t[i] && (t[i]._batchLocation = i)
                    }, t.prototype.boundArray = function(t, e, r, n) {
                        for (var o = t.elements, h = t.ids, c = t.count, f = 0, i = 0; i < c; i++) {
                            var l = o[i],
                                d = l._batchLocation;
                            if (d >= 0 && d < n && e[d] === l) h[i] = d;
                            else
                                for (; f < n;) {
                                    var _ = e[f];
                                    if (!_ || _._batchEnabled !== r || _._batchLocation !== f) {
                                        h[i] = f, l._batchLocation = f, e[f] = l;
                                        break
                                    }
                                    f++
                                }
                        }
                    }, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }(),
                ht = 0,
                ct = function() {
                    function t(t) {
                        this.renderer = t, this.webGLVersion = 1, this.extensions = {}, this.supports = {
                            uint32Indices: !1
                        }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), t.view.addEventListener("webglcontextlost", this.handleContextLost, !1), t.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1)
                    }
                    return Object.defineProperty(t.prototype, "isLost", {
                        get: function() {
                            return !this.gl || this.gl.isContextLost()
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.contextChange = function(t) {
                        this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = ht++, t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext()
                    }, t.prototype.initFromContext = function(t) {
                        this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = ht++, this.renderer.runners.contextChange.emit(t)
                    }, t.prototype.initFromOptions = function(t) {
                        var e = this.createContext(this.renderer.view, t);
                        this.initFromContext(e)
                    }, t.prototype.createContext = function(canvas, t) {
                        var e;
                        if (n.b.PREFER_ENV >= o.g.WEBGL2 && (e = canvas.getContext("webgl2", t)), e) this.webGLVersion = 2;
                        else if (this.webGLVersion = 1, !(e = canvas.getContext("webgl", t) || canvas.getContext("experimental-webgl", t))) throw new Error("This browser does not support WebGL. Try using the canvas renderer");
                        return this.gl = e, this.getExtensions(), this.gl
                    }, t.prototype.getExtensions = function() {
                        var t = this.gl,
                            e = {
                                anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
                                floatTextureLinear: t.getExtension("OES_texture_float_linear"),
                                s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
                                s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
                                etc: t.getExtension("WEBGL_compressed_texture_etc"),
                                etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
                                pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
                                atc: t.getExtension("WEBGL_compressed_texture_atc"),
                                astc: t.getExtension("WEBGL_compressed_texture_astc")
                            };
                        1 === this.webGLVersion ? Object.assign(this.extensions, e, {
                            drawBuffers: t.getExtension("WEBGL_draw_buffers"),
                            depthTexture: t.getExtension("WEBGL_depth_texture"),
                            loseContext: t.getExtension("WEBGL_lose_context"),
                            vertexArrayObject: t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"),
                            uint32ElementIndex: t.getExtension("OES_element_index_uint"),
                            floatTexture: t.getExtension("OES_texture_float"),
                            floatTextureLinear: t.getExtension("OES_texture_float_linear"),
                            textureHalfFloat: t.getExtension("OES_texture_half_float"),
                            textureHalfFloatLinear: t.getExtension("OES_texture_half_float_linear")
                        }) : 2 === this.webGLVersion && Object.assign(this.extensions, e, {
                            colorBufferFloat: t.getExtension("EXT_color_buffer_float")
                        })
                    }, t.prototype.handleContextLost = function(t) {
                        t.preventDefault()
                    }, t.prototype.handleContextRestored = function() {
                        this.renderer.runners.contextChange.emit(this.gl)
                    }, t.prototype.destroy = function() {
                        var view = this.renderer.view;
                        this.renderer = null, view.removeEventListener("webglcontextlost", this.handleContextLost), view.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext()
                    }, t.prototype.postrender = function() {
                        this.renderer.renderingToScreen && this.gl.flush()
                    }, t.prototype.validateContext = function(t) {
                        var e = t.getContextAttributes(),
                            r = "WebGL2RenderingContext" in self && t instanceof self.WebGL2RenderingContext;
                        r && (this.webGLVersion = 2), e.stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
                        var n = r || !!t.getExtension("OES_element_index_uint");
                        this.supports.uint32Indices = n, n || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")
                    }, t
                }(),
                ft = function(t) {
                    this.framebuffer = t, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = o.l.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0
                },
                lt = new l.j,
                pt = function() {
                    function t(t) {
                        this.renderer = t, this.managedFramebuffers = [], this.unknownFramebuffer = new F(10, 10), this.msaaSamples = null
                    }
                    return t.prototype.contextChange = function() {
                        var t = this.gl = this.renderer.gl;
                        if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new l.j, this.hasMRT = !0, this.writeDepthTexture = !0, this.disposeAll(!0), 1 === this.renderer.context.webGLVersion) {
                            var e = this.renderer.context.extensions.drawBuffers,
                                r = this.renderer.context.extensions.depthTexture;
                            n.b.PREFER_ENV === o.g.WEBGL_LEGACY && (e = null, r = null), e ? t.drawBuffers = function(t) {
                                return e.drawBuffersWEBGL(t)
                            } : (this.hasMRT = !1, t.drawBuffers = function() {}), r || (this.writeDepthTexture = !1)
                        } else this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES)
                    }, t.prototype.bind = function(t, e, r) {
                        void 0 === r && (r = 0);
                        var n = this.gl;
                        if (t) {
                            var o = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
                            this.current !== t && (this.current = t, n.bindFramebuffer(n.FRAMEBUFFER, o.framebuffer)), o.mipLevel !== r && (t.dirtyId++, t.dirtyFormat++, o.mipLevel = r), o.dirtyId !== t.dirtyId && (o.dirtyId = t.dirtyId, o.dirtyFormat !== t.dirtyFormat ? (o.dirtyFormat = t.dirtyFormat, o.dirtySize = t.dirtySize, this.updateFramebuffer(t, r)) : o.dirtySize !== t.dirtySize && (o.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
                            for (var i = 0; i < t.colorTextures.length; i++) {
                                var h = t.colorTextures[i];
                                this.renderer.texture.unbind(h.parentTextureArray || h)
                            }
                            if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e) {
                                var c = e.width >> r,
                                    f = e.height >> r,
                                    l = c / e.width;
                                this.setViewport(e.x * l, e.y * l, c, f)
                            } else {
                                c = t.width >> r, f = t.height >> r;
                                this.setViewport(0, 0, c, f)
                            }
                        } else this.current && (this.current = null, n.bindFramebuffer(n.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height)
                    }, t.prototype.setViewport = function(t, e, r, n) {
                        var o = this.viewport;
                        t = Math.round(t), e = Math.round(e), r = Math.round(r), n = Math.round(n), o.width === r && o.height === n && o.x === t && o.y === e || (o.x = t, o.y = e, o.width = r, o.height = n, this.gl.viewport(t, e, r, n))
                    }, Object.defineProperty(t.prototype, "size", {
                        get: function() {
                            return this.current ? {
                                x: 0,
                                y: 0,
                                width: this.current.width,
                                height: this.current.height
                            } : {
                                x: 0,
                                y: 0,
                                width: this.renderer.width,
                                height: this.renderer.height
                            }
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.clear = function(t, g, b, a, mask) {
                        void 0 === mask && (mask = o.c.COLOR | o.c.DEPTH);
                        var e = this.gl;
                        e.clearColor(t, g, b, a), e.clear(mask)
                    }, t.prototype.initFramebuffer = function(t) {
                        var e = this.gl,
                            r = new ft(e.createFramebuffer());
                        return r.multisample = this.detectSamples(t.multisample), t.glFramebuffers[this.CONTEXT_UID] = r, this.managedFramebuffers.push(t), t.disposeRunner.add(this), r
                    }, t.prototype.resizeFramebuffer = function(t) {
                        var e = this.gl,
                            r = t.glFramebuffers[this.CONTEXT_UID];
                        r.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, r.msaaBuffer), e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.RGBA8, t.width, t.height)), r.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil), r.msaaBuffer ? e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.DEPTH24_STENCIL8, t.width, t.height) : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
                        var n = t.colorTextures,
                            o = n.length;
                        e.drawBuffers || (o = Math.min(o, 1));
                        for (var i = 0; i < o; i++) {
                            var h = n[i],
                                c = h.parentTextureArray || h;
                            this.renderer.texture.bind(c, 0)
                        }
                        t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0)
                    }, t.prototype.updateFramebuffer = function(t, e) {
                        var r = this.gl,
                            n = t.glFramebuffers[this.CONTEXT_UID],
                            o = t.colorTextures,
                            h = o.length;
                        r.drawBuffers || (h = Math.min(h, 1)), n.multisample > 1 && this.canMultisampleFramebuffer(t) ? (n.msaaBuffer = n.msaaBuffer || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, n.msaaBuffer), r.renderbufferStorageMultisample(r.RENDERBUFFER, n.multisample, r.RGBA8, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, n.msaaBuffer)) : n.msaaBuffer && (r.deleteRenderbuffer(n.msaaBuffer), n.msaaBuffer = null, n.blitFramebuffer && (n.blitFramebuffer.dispose(), n.blitFramebuffer = null));
                        for (var c = [], i = 0; i < h; i++) {
                            var f = o[i],
                                l = f.parentTextureArray || f;
                            this.renderer.texture.bind(l, 0), 0 === i && n.msaaBuffer || (r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + i, f.target, l._glTextures[this.CONTEXT_UID].texture, e), c.push(r.COLOR_ATTACHMENT0 + i))
                        }
                        if ((c.length > 1 && r.drawBuffers(c), t.depthTexture) && this.writeDepthTexture) {
                            var d = t.depthTexture;
                            this.renderer.texture.bind(d, 0), r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, d._glTextures[this.CONTEXT_UID].texture, e)
                        }!t.stencil && !t.depth || t.depthTexture && this.writeDepthTexture ? n.stencil && (r.deleteRenderbuffer(n.stencil), n.stencil = null) : (n.stencil = n.stencil || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, n.stencil), n.msaaBuffer ? r.renderbufferStorageMultisample(r.RENDERBUFFER, n.multisample, r.DEPTH24_STENCIL8, t.width, t.height) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, n.stencil))
                    }, t.prototype.canMultisampleFramebuffer = function(t) {
                        return 1 !== this.renderer.context.webGLVersion && t.colorTextures.length <= 1 && !t.depthTexture
                    }, t.prototype.detectSamples = function(t) {
                        var e = this.msaaSamples,
                            r = o.l.NONE;
                        if (t <= 1 || null === e) return r;
                        for (var i = 0; i < e.length; i++)
                            if (e[i] <= t) {
                                r = e[i];
                                break
                            } return 1 === r && (r = o.l.NONE), r
                    }, t.prototype.blit = function(t, e, r) {
                        var n = this,
                            o = n.current,
                            h = n.renderer,
                            c = n.gl,
                            f = n.CONTEXT_UID;
                        if (2 === h.context.webGLVersion && o) {
                            var l = o.glFramebuffers[f];
                            if (l) {
                                if (!t) {
                                    if (!l.msaaBuffer) return;
                                    var d = o.colorTextures[0];
                                    if (!d) return;
                                    l.blitFramebuffer || (l.blitFramebuffer = new F(o.width, o.height), l.blitFramebuffer.addColorTexture(0, d)), (t = l.blitFramebuffer).colorTextures[0] !== d && (t.colorTextures[0] = d, t.dirtyId++, t.dirtyFormat++), t.width === o.width && t.height === o.height || (t.width = o.width, t.height = o.height, t.dirtyId++, t.dirtySize++)
                                }
                                e || ((e = lt).width = o.width, e.height = o.height), r || (r = e);
                                var _ = e.width === r.width && e.height === r.height;
                                this.bind(t), c.bindFramebuffer(c.READ_FRAMEBUFFER, l.framebuffer), c.blitFramebuffer(e.x, e.y, e.width, e.height, r.x, r.y, r.width, r.height, c.COLOR_BUFFER_BIT, _ ? c.NEAREST : c.LINEAR)
                            }
                        }
                    }, t.prototype.disposeFramebuffer = function(t, e) {
                        var r = t.glFramebuffers[this.CONTEXT_UID],
                            n = this.gl;
                        if (r) {
                            delete t.glFramebuffers[this.CONTEXT_UID];
                            var o = this.managedFramebuffers.indexOf(t);
                            o >= 0 && this.managedFramebuffers.splice(o, 1), t.disposeRunner.remove(this), e || (n.deleteFramebuffer(r.framebuffer), r.msaaBuffer && n.deleteRenderbuffer(r.msaaBuffer), r.stencil && n.deleteRenderbuffer(r.stencil)), r.blitFramebuffer && r.blitFramebuffer.dispose()
                        }
                    }, t.prototype.disposeAll = function(t) {
                        var e = this.managedFramebuffers;
                        this.managedFramebuffers = [];
                        for (var i = 0; i < e.length; i++) this.disposeFramebuffer(e[i], t)
                    }, t.prototype.forceStencil = function() {
                        var t = this.current;
                        if (t) {
                            var e = t.glFramebuffers[this.CONTEXT_UID];
                            if (e && !e.stencil) {
                                t.stencil = !0;
                                var r = t.width,
                                    n = t.height,
                                    o = this.gl,
                                    h = o.createRenderbuffer();
                                o.bindRenderbuffer(o.RENDERBUFFER, h), e.msaaBuffer ? o.renderbufferStorageMultisample(o.RENDERBUFFER, e.multisample, o.DEPTH24_STENCIL8, r, n) : o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_STENCIL, r, n), e.stencil = h, o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.RENDERBUFFER, h)
                            }
                        }
                    }, t.prototype.reset = function() {
                        this.current = this.unknownFramebuffer, this.viewport = new l.j
                    }, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }(),
                _t = {
                    5126: 4,
                    5123: 2,
                    5121: 1
                },
                vt = function() {
                    function t(t) {
                        this.renderer = t, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {}
                    }
                    return t.prototype.contextChange = function() {
                        this.disposeAll(!0);
                        var t = this.gl = this.renderer.gl,
                            e = this.renderer.context;
                        if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, 2 !== e.webGLVersion) {
                            var r = this.renderer.context.extensions.vertexArrayObject;
                            n.b.PREFER_ENV === o.g.WEBGL_LEGACY && (r = null), r ? (t.createVertexArray = function() {
                                return r.createVertexArrayOES()
                            }, t.bindVertexArray = function(t) {
                                return r.bindVertexArrayOES(t)
                            }, t.deleteVertexArray = function(t) {
                                return r.deleteVertexArrayOES(t)
                            }) : (this.hasVao = !1, t.createVertexArray = function() {
                                return null
                            }, t.bindVertexArray = function() {
                                return null
                            }, t.deleteVertexArray = function() {
                                return null
                            })
                        }
                        if (2 !== e.webGLVersion) {
                            var h = t.getExtension("ANGLE_instanced_arrays");
                            h ? (t.vertexAttribDivisor = function(a, b) {
                                return h.vertexAttribDivisorANGLE(a, b)
                            }, t.drawElementsInstanced = function(a, b, t, e, r) {
                                return h.drawElementsInstancedANGLE(a, b, t, e, r)
                            }, t.drawArraysInstanced = function(a, b, t, e) {
                                return h.drawArraysInstancedANGLE(a, b, t, e)
                            }) : this.hasInstance = !1
                        }
                        this.canUseUInt32ElementIndex = 2 === e.webGLVersion || !!e.extensions.uint32ElementIndex
                    }, t.prototype.bind = function(t, e) {
                        e = e || this.renderer.shader.shader;
                        var r = this.gl,
                            n = t.glVertexArrayObjects[this.CONTEXT_UID],
                            o = !1;
                        n || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = n = {}, o = !0);
                        var h = n[e.program.id] || this.initGeometryVao(t, e, o);
                        this._activeGeometry = t, this._activeVao !== h && (this._activeVao = h, this.hasVao ? r.bindVertexArray(h) : this.activateVao(t, e.program)), this.updateBuffers()
                    }, t.prototype.reset = function() {
                        this.unbind()
                    }, t.prototype.updateBuffers = function() {
                        for (var t = this._activeGeometry, e = this.renderer.buffer, i = 0; i < t.buffers.length; i++) {
                            var r = t.buffers[i];
                            e.update(r)
                        }
                    }, t.prototype.checkCompatibility = function(t, e) {
                        var r = t.attributes,
                            n = e.attributeData;
                        for (var o in n)
                            if (!r[o]) throw new Error('shader and geometry incompatible, geometry missing the "' + o + '" attribute')
                    }, t.prototype.getSignature = function(t, e) {
                        var r = t.attributes,
                            n = e.attributeData,
                            o = ["g", t.id];
                        for (var i in r) n[i] && o.push(i, n[i].location);
                        return o.join("-")
                    }, t.prototype.initGeometryVao = function(t, e, r) {
                        void 0 === r && (r = !0);
                        var n = this.gl,
                            o = this.CONTEXT_UID,
                            h = this.renderer.buffer,
                            c = e.program;
                        c.glPrograms[o] || this.renderer.shader.generateProgram(e), this.checkCompatibility(t, c);
                        var f = this.getSignature(t, c),
                            l = t.glVertexArrayObjects[this.CONTEXT_UID],
                            d = l[f];
                        if (d) return l[c.id] = d, d;
                        var _ = t.buffers,
                            v = t.attributes,
                            m = {},
                            y = {};
                        for (var E in _) m[E] = 0, y[E] = 0;
                        for (var E in v) !v[E].size && c.attributeData[E] ? v[E].size = c.attributeData[E].size : v[E].size || console.warn("PIXI Geometry attribute '" + E + "' size cannot be determined (likely the bound shader does not have the attribute)"), m[v[E].buffer] += v[E].size * _t[v[E].type];
                        for (var E in v) {
                            var T = v[E],
                                x = T.size;
                            void 0 === T.stride && (m[T.buffer] === x * _t[T.type] ? T.stride = 0 : T.stride = m[T.buffer]), void 0 === T.start && (T.start = y[T.buffer], y[T.buffer] += x * _t[T.type])
                        }
                        d = n.createVertexArray(), n.bindVertexArray(d);
                        for (var i = 0; i < _.length; i++) {
                            var R = _[i];
                            h.bind(R), r && R._glBuffers[o].refCount++
                        }
                        return this.activateVao(t, c), this._activeVao = d, l[c.id] = d, l[f] = d, d
                    }, t.prototype.disposeGeometry = function(t, e) {
                        var r;
                        if (this.managedGeometries[t.id]) {
                            delete this.managedGeometries[t.id];
                            var n = t.glVertexArrayObjects[this.CONTEXT_UID],
                                o = this.gl,
                                h = t.buffers,
                                c = null === (r = this.renderer) || void 0 === r ? void 0 : r.buffer;
                            if (t.disposeRunner.remove(this), n) {
                                if (c)
                                    for (var i = 0; i < h.length; i++) {
                                        var f = h[i]._glBuffers[this.CONTEXT_UID];
                                        f && (f.refCount--, 0 !== f.refCount || e || c.dispose(h[i], e))
                                    }
                                if (!e)
                                    for (var l in n)
                                        if ("g" === l[0]) {
                                            var d = n[l];
                                            this._activeVao === d && this.unbind(), o.deleteVertexArray(d)
                                        } delete t.glVertexArrayObjects[this.CONTEXT_UID]
                            }
                        }
                    }, t.prototype.disposeAll = function(t) {
                        for (var e = Object.keys(this.managedGeometries), i = 0; i < e.length; i++) this.disposeGeometry(this.managedGeometries[e[i]], t)
                    }, t.prototype.activateVao = function(t, e) {
                        var r = this.gl,
                            n = this.CONTEXT_UID,
                            o = this.renderer.buffer,
                            h = t.buffers,
                            c = t.attributes;
                        t.indexBuffer && o.bind(t.indexBuffer);
                        var f = null;
                        for (var l in c) {
                            var d = c[l],
                                _ = h[d.buffer],
                                v = _._glBuffers[n];
                            if (e.attributeData[l]) {
                                f !== v && (o.bind(_), f = v);
                                var m = e.attributeData[l].location;
                                if (r.enableVertexAttribArray(m), r.vertexAttribPointer(m, d.size, d.type || r.FLOAT, d.normalized, d.stride, d.start), d.instance) {
                                    if (!this.hasInstance) throw new Error("geometry error, GPU Instancing is not supported on this device");
                                    r.vertexAttribDivisor(m, 1)
                                }
                            }
                        }
                    }, t.prototype.draw = function(t, e, r, n) {
                        var o = this.gl,
                            h = this._activeGeometry;
                        if (h.indexBuffer) {
                            var c = h.indexBuffer.data.BYTES_PER_ELEMENT,
                                f = 2 === c ? o.UNSIGNED_SHORT : o.UNSIGNED_INT;
                            2 === c || 4 === c && this.canUseUInt32ElementIndex ? h.instanced ? o.drawElementsInstanced(t, e || h.indexBuffer.data.length, f, (r || 0) * c, n || 1) : o.drawElements(t, e || h.indexBuffer.data.length, f, (r || 0) * c) : console.warn("unsupported index buffer type: uint32")
                        } else h.instanced ? o.drawArraysInstanced(t, r, e || h.getSize(), n || 1) : o.drawArrays(t, r, e || h.getSize());
                        return this
                    }, t.prototype.unbind = function() {
                        this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null
                    }, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }(),
                mt = function() {
                    function t(t) {
                        void 0 === t && (t = null), this.type = o.j.NONE, this.autoDetect = !0, this.maskObject = t || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = n.b.FILTER_MULTISAMPLE, this.enabled = !0, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._target = null
                    }
                    return Object.defineProperty(t.prototype, "filter", {
                        get: function() {
                            return this._filters ? this._filters[0] : null
                        },
                        set: function(t) {
                            t ? this._filters ? this._filters[0] = t : this._filters = [t] : this._filters = null
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.reset = function() {
                        this.pooled && (this.maskObject = null, this.type = o.j.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null
                    }, t.prototype.copyCountersOrReset = function(t) {
                        t ? (this._stencilCounter = t._stencilCounter, this._scissorCounter = t._scissorCounter, this._scissorRect = t._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null)
                    }, t
                }();

            function yt(t, e, r) {
                var n = t.createShader(e);
                return t.shaderSource(n, r), t.compileShader(n), n
            }

            function Et(t, e) {
                var r = t.getShaderSource(e).split("\n").map((function(line, t) {
                        return t + ": " + line
                    })),
                    n = t.getShaderInfoLog(e),
                    o = n.split("\n"),
                    h = {},
                    c = o.map((function(line) {
                        return parseFloat(line.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))
                    })).filter((function(t) {
                        return !(!t || h[t]) && (h[t] = !0, !0)
                    })),
                    f = [""];
                c.forEach((function(t) {
                    r[t - 1] = "%c" + r[t - 1] + "%c", f.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px")
                }));
                var l = r.join("\n");
                f[0] = l, console.error(n), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, f), console.groupEnd()
            }

            function gt(t) {
                for (var e = new Array(t), i = 0; i < e.length; i++) e[i] = !1;
                return e
            }

            function Tt(t, e) {
                switch (t) {
                    case "float":
                    case "int":
                    case "uint":
                    case "sampler2D":
                    case "sampler2DArray":
                        return 0;
                    case "vec2":
                        return new Float32Array(2 * e);
                    case "vec3":
                        return new Float32Array(3 * e);
                    case "vec4":
                        return new Float32Array(4 * e);
                    case "ivec2":
                        return new Int32Array(2 * e);
                    case "ivec3":
                        return new Int32Array(3 * e);
                    case "ivec4":
                        return new Int32Array(4 * e);
                    case "uvec2":
                        return new Uint32Array(2 * e);
                    case "uvec3":
                        return new Uint32Array(3 * e);
                    case "uvec4":
                        return new Uint32Array(4 * e);
                    case "bool":
                        return !1;
                    case "bvec2":
                        return gt(2 * e);
                    case "bvec3":
                        return gt(3 * e);
                    case "bvec4":
                        return gt(4 * e);
                    case "mat2":
                        return new Float32Array([1, 0, 0, 1]);
                    case "mat3":
                        return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                    case "mat4":
                        return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
                return null
            }
            var bt, xt = {},
                Rt = xt;

            function It() {
                if (Rt === xt || Rt && Rt.isContextLost()) {
                    var canvas = document.createElement("canvas"),
                        t = void 0;
                    n.b.PREFER_ENV >= o.g.WEBGL2 && (t = canvas.getContext("webgl2", {})), t || ((t = canvas.getContext("webgl", {}) || canvas.getContext("experimental-webgl", {})) ? t.getExtension("WEBGL_draw_buffers") : t = null), Rt = t
                }
                return Rt
            }

            function At(t, e, r) {
                if ("precision" !== t.substring(0, 9)) {
                    var n = e;
                    return e === o.m.HIGH && r !== o.m.HIGH && (n = o.m.MEDIUM), "precision " + n + " float;\n" + t
                }
                return r !== o.m.HIGH && "precision highp" === t.substring(0, 15) ? t.replace("precision highp", "precision mediump") : t
            }
            var Nt = {
                float: 1,
                vec2: 2,
                vec3: 3,
                vec4: 4,
                int: 1,
                ivec2: 2,
                ivec3: 3,
                ivec4: 4,
                uint: 1,
                uvec2: 2,
                uvec3: 3,
                uvec4: 4,
                bool: 1,
                bvec2: 2,
                bvec3: 3,
                bvec4: 4,
                mat2: 4,
                mat3: 9,
                mat4: 16,
                sampler2D: 1
            };

            function St(t) {
                return Nt[t]
            }
            var Ot = null,
                wt = {
                    FLOAT: "float",
                    FLOAT_VEC2: "vec2",
                    FLOAT_VEC3: "vec3",
                    FLOAT_VEC4: "vec4",
                    INT: "int",
                    INT_VEC2: "ivec2",
                    INT_VEC3: "ivec3",
                    INT_VEC4: "ivec4",
                    UNSIGNED_INT: "uint",
                    UNSIGNED_INT_VEC2: "uvec2",
                    UNSIGNED_INT_VEC3: "uvec3",
                    UNSIGNED_INT_VEC4: "uvec4",
                    BOOL: "bool",
                    BOOL_VEC2: "bvec2",
                    BOOL_VEC3: "bvec3",
                    BOOL_VEC4: "bvec4",
                    FLOAT_MAT2: "mat2",
                    FLOAT_MAT3: "mat3",
                    FLOAT_MAT4: "mat4",
                    SAMPLER_2D: "sampler2D",
                    INT_SAMPLER_2D: "sampler2D",
                    UNSIGNED_INT_SAMPLER_2D: "sampler2D",
                    SAMPLER_CUBE: "samplerCube",
                    INT_SAMPLER_CUBE: "samplerCube",
                    UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
                    SAMPLER_2D_ARRAY: "sampler2DArray",
                    INT_SAMPLER_2D_ARRAY: "sampler2DArray",
                    UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
                };

            function Ct(t, e) {
                if (!Ot) {
                    var r = Object.keys(wt);
                    Ot = {};
                    for (var i = 0; i < r.length; ++i) {
                        var n = r[i];
                        Ot[t[n]] = wt[n]
                    }
                }
                return Ot[e]
            }
            var Pt = [{
                    test: function(data) {
                        return "float" === data.type && 1 === data.size
                    },
                    code: function(t) {
                        return '\n            if(uv["' + t + '"] !== ud["' + t + '"].value)\n            {\n                ud["' + t + '"].value = uv["' + t + '"]\n                gl.uniform1f(ud["' + t + '"].location, uv["' + t + '"])\n            }\n            '
                    }
                }, {
                    test: function(data) {
                        return ("sampler2D" === data.type || "samplerCube" === data.type || "sampler2DArray" === data.type) && 1 === data.size && !data.isArray
                    },
                    code: function(t) {
                        return 't = syncData.textureCount++;\n\n            renderer.texture.bind(uv["' + t + '"], t);\n\n            if(ud["' + t + '"].value !== t)\n            {\n                ud["' + t + '"].value = t;\n                gl.uniform1i(ud["' + t + '"].location, t);\n; // eslint-disable-line max-len\n            }'
                    }
                }, {
                    test: function(data, t) {
                        return "mat3" === data.type && 1 === data.size && void 0 !== t.a
                    },
                    code: function(t) {
                        return '\n            gl.uniformMatrix3fv(ud["' + t + '"].location, false, uv["' + t + '"].toArray(true));\n            '
                    },
                    codeUbo: function(t) {
                        return "\n                var " + t + "_matrix = uv." + t + ".toArray(true);\n\n                data[offset] = " + t + "_matrix[0];\n                data[offset+1] = " + t + "_matrix[1];\n                data[offset+2] = " + t + "_matrix[2];\n        \n                data[offset + 4] = " + t + "_matrix[3];\n                data[offset + 5] = " + t + "_matrix[4];\n                data[offset + 6] = " + t + "_matrix[5];\n        \n                data[offset + 8] = " + t + "_matrix[6];\n                data[offset + 9] = " + t + "_matrix[7];\n                data[offset + 10] = " + t + "_matrix[8];\n            "
                    }
                }, {
                    test: function(data, t) {
                        return "vec2" === data.type && 1 === data.size && void 0 !== t.x
                    },
                    code: function(t) {
                        return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud["' + t + '"].location, v.x, v.y);\n                }'
                    },
                    codeUbo: function(t) {
                        return "\n                v = uv." + t + ";\n\n                data[offset] = v.x;\n                data[offset+1] = v.y;\n            "
                    }
                }, {
                    test: function(data) {
                        return "vec2" === data.type && 1 === data.size
                    },
                    code: function(t) {
                        return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud["' + t + '"].location, v[0], v[1]);\n                }\n            '
                    }
                }, {
                    test: function(data, t) {
                        return "vec4" === data.type && 1 === data.size && void 0 !== t.width
                    },
                    code: function(t) {
                        return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud["' + t + '"].location, v.x, v.y, v.width, v.height)\n                }'
                    },
                    codeUbo: function(t) {
                        return "\n                    v = uv." + t + ";\n\n                    data[offset] = v.x;\n                    data[offset+1] = v.y;\n                    data[offset+2] = v.width;\n                    data[offset+3] = v.height;\n                "
                    }
                }, {
                    test: function(data) {
                        return "vec4" === data.type && 1 === data.size
                    },
                    code: function(t) {
                        return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud["' + t + '"].location, v[0], v[1], v[2], v[3])\n                }'
                    }
                }],
                Lt = {
                    float: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1f(location, v);\n    }",
                    vec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2f(location, v[0], v[1])\n    }",
                    vec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
                    vec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4f(location, v[0], v[1], v[2], v[3]);\n    }",
                    int: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
                    ivec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
                    ivec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
                    ivec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
                    uint: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1ui(location, v);\n    }",
                    uvec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2ui(location, v[0], v[1]);\n    }",
                    uvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3ui(location, v[0], v[1], v[2]);\n    }",
                    uvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);\n    }",
                    bool: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1i(location, v);\n    }",
                    bvec2: "\n    if (cv[0] != v[0] || cv[1] != v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
                    bvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
                    bvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
                    mat2: "gl.uniformMatrix2fv(location, false, v)",
                    mat3: "gl.uniformMatrix3fv(location, false, v)",
                    mat4: "gl.uniformMatrix4fv(location, false, v)",
                    sampler2D: "gl.uniform1i(location, v)",
                    samplerCube: "gl.uniform1i(location, v)",
                    sampler2DArray: "gl.uniform1i(location, v)"
                },
                Mt = {
                    float: "gl.uniform1fv(location, v)",
                    vec2: "gl.uniform2fv(location, v)",
                    vec3: "gl.uniform3fv(location, v)",
                    vec4: "gl.uniform4fv(location, v)",
                    mat4: "gl.uniformMatrix4fv(location, false, v)",
                    mat3: "gl.uniformMatrix3fv(location, false, v)",
                    mat2: "gl.uniformMatrix2fv(location, false, v)",
                    int: "gl.uniform1iv(location, v)",
                    ivec2: "gl.uniform2iv(location, v)",
                    ivec3: "gl.uniform3iv(location, v)",
                    ivec4: "gl.uniform4iv(location, v)",
                    uint: "gl.uniform1uiv(location, v)",
                    uvec2: "gl.uniform2uiv(location, v)",
                    uvec3: "gl.uniform3uiv(location, v)",
                    uvec4: "gl.uniform4uiv(location, v)",
                    bool: "gl.uniform1iv(location, v)",
                    bvec2: "gl.uniform2iv(location, v)",
                    bvec3: "gl.uniform3iv(location, v)",
                    bvec4: "gl.uniform4iv(location, v)",
                    sampler2D: "gl.uniform1iv(location, v)",
                    samplerCube: "gl.uniform1iv(location, v)",
                    sampler2DArray: "gl.uniform1iv(location, v)"
                };
            var Ut, Ft = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");

            function Dt(t) {
                for (var e = "", i = 0; i < t; ++i) i > 0 && (e += "\nelse "), i < t - 1 && (e += "if(test == " + i + ".0){}");
                return e
            }

            function Bt(t, e) {
                if (0 === t) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
                for (var r = e.createShader(e.FRAGMENT_SHADER);;) {
                    var n = Ft.replace(/%forloop%/gi, Dt(t));
                    if (e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS)) break;
                    t = t / 2 | 0
                }
                return t
            }
            var Gt = 0,
                kt = {},
                Ht = function() {
                    function t(e, r, h) {
                        void 0 === h && (h = "pixi-shader"), this.id = Gt++, this.vertexSrc = e || t.defaultVertexSrc, this.fragmentSrc = r || t.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), "#version" !== this.vertexSrc.substring(0, 8) && (h = h.replace(/\s+/g, "-"), kt[h] ? (kt[h]++, h += "-" + kt[h]) : kt[h] = 1, this.vertexSrc = "#define SHADER_NAME " + h + "\n" + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + h + "\n" + this.fragmentSrc, this.vertexSrc = At(this.vertexSrc, n.b.PRECISION_VERTEX, o.m.HIGH), this.fragmentSrc = At(this.fragmentSrc, n.b.PRECISION_FRAGMENT, function() {
                            if (!bt) {
                                bt = o.m.MEDIUM;
                                var t = It();
                                if (t && t.getShaderPrecisionFormat) {
                                    var e = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT);
                                    bt = e.precision ? o.m.HIGH : o.m.MEDIUM
                                }
                            }
                            return bt
                        }())), this.glPrograms = {}, this.syncUniforms = null
                    }
                    return Object.defineProperty(t, "defaultVertexSrc", {
                        get: function() {
                            return "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n"
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t, "defaultFragmentSrc", {
                        get: function() {
                            return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}"
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.from = function(e, r, n) {
                        var o = e + r,
                            c = h.ProgramCache[o];
                        return c || (h.ProgramCache[o] = c = new t(e, r, n)), c
                    }, t
                }(),
                jt = function() {
                    function t(t, e) {
                        this.uniformBindCount = 0, this.program = t, this.uniformGroup = e ? e instanceof et ? e : new et(e) : new et({})
                    }
                    return t.prototype.checkUniformExists = function(t, e) {
                        if (e.uniforms[t]) return !0;
                        for (var i in e.uniforms) {
                            var r = e.uniforms[i];
                            if (r.group && this.checkUniformExists(t, r)) return !0
                        }
                        return !1
                    }, t.prototype.destroy = function() {
                        this.uniformGroup = null
                    }, Object.defineProperty(t.prototype, "uniforms", {
                        get: function() {
                            return this.uniformGroup.uniforms
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.from = function(e, r, n) {
                        return new t(Ht.from(e, r), n)
                    }, t
                }(),
                Vt = function() {
                    function t() {
                        this.data = 0, this.blendMode = o.b.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0
                    }
                    return Object.defineProperty(t.prototype, "blend", {
                        get: function() {
                            return !!(1 & this.data)
                        },
                        set: function(t) {
                            !!(1 & this.data) !== t && (this.data ^= 1)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "offsets", {
                        get: function() {
                            return !!(2 & this.data)
                        },
                        set: function(t) {
                            !!(2 & this.data) !== t && (this.data ^= 2)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "culling", {
                        get: function() {
                            return !!(4 & this.data)
                        },
                        set: function(t) {
                            !!(4 & this.data) !== t && (this.data ^= 4)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "depthTest", {
                        get: function() {
                            return !!(8 & this.data)
                        },
                        set: function(t) {
                            !!(8 & this.data) !== t && (this.data ^= 8)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "depthMask", {
                        get: function() {
                            return !!(32 & this.data)
                        },
                        set: function(t) {
                            !!(32 & this.data) !== t && (this.data ^= 32)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "clockwiseFrontFace", {
                        get: function() {
                            return !!(16 & this.data)
                        },
                        set: function(t) {
                            !!(16 & this.data) !== t && (this.data ^= 16)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "blendMode", {
                        get: function() {
                            return this._blendMode
                        },
                        set: function(t) {
                            this.blend = t !== o.b.NONE, this._blendMode = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "polygonOffset", {
                        get: function() {
                            return this._polygonOffset
                        },
                        set: function(t) {
                            this.offsets = !!t, this._polygonOffset = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.toString = function() {
                        return "[@pixi/core:State blendMode=" + this.blendMode + " clockwiseFrontFace=" + this.clockwiseFrontFace + " culling=" + this.culling + " depthMask=" + this.depthMask + " polygonOffset=" + this.polygonOffset + "]"
                    }, t.for2d = function() {
                        var e = new t;
                        return e.depthTest = !1, e.blend = !0, e
                    }, t
                }(),
                Xt = function(t) {
                    function e(r, o, h) {
                        var c = this,
                            f = Ht.from(r || e.defaultVertexSrc, o || e.defaultFragmentSrc);
                        return (c = t.call(this, f, h) || this).padding = 0, c.resolution = n.b.FILTER_RESOLUTION, c.multisample = n.b.FILTER_MULTISAMPLE, c.enabled = !0, c.autoFit = !0, c.state = new Vt, c
                    }
                    return m(e, t), e.prototype.apply = function(t, input, output, e, r) {
                        t.applyFilter(this, input, output, e)
                    }, Object.defineProperty(e.prototype, "blendMode", {
                        get: function() {
                            return this.state.blendMode
                        },
                        set: function(t) {
                            this.state.blendMode = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "resolution", {
                        get: function() {
                            return this._resolution
                        },
                        set: function(t) {
                            this._resolution = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e, "defaultVertexSrc", {
                        get: function() {
                            return "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n"
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e, "defaultFragmentSrc", {
                        get: function() {
                            return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e
                }(jt),
                zt = new l.d,
                Yt = function() {
                    function t(t, e) {
                        this._texture = t, this.mapCoord = new l.d, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = void 0 === e ? .5 : e, this.isSimple = !1
                    }
                    return Object.defineProperty(t.prototype, "texture", {
                        get: function() {
                            return this._texture
                        },
                        set: function(t) {
                            this._texture = t, this._textureID = -1
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.multiplyUvs = function(t, e) {
                        void 0 === e && (e = t);
                        for (var r = this.mapCoord, i = 0; i < t.length; i += 2) {
                            var n = t[i],
                                o = t[i + 1];
                            e[i] = n * r.a + o * r.c + r.tx, e[i + 1] = n * r.b + o * r.d + r.ty
                        }
                        return e
                    }, t.prototype.update = function(t) {
                        var e = this._texture;
                        if (!e || !e.valid) return !1;
                        if (!t && this._textureID === e._updateID) return !1;
                        this._textureID = e._updateID, this._updateID++;
                        var r = e._uvs;
                        this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
                        var n = e.orig,
                            o = e.trim;
                        o && (zt.set(n.width / o.width, 0, 0, n.height / o.height, -o.x / o.width, -o.y / o.height), this.mapCoord.append(zt));
                        var h = e.baseTexture,
                            c = this.uClampFrame,
                            f = this.clampMargin / h.resolution,
                            l = this.clampOffset;
                        return c[0] = (e._frame.x + f + l) / h.width, c[1] = (e._frame.y + f + l) / h.height, c[2] = (e._frame.x + e._frame.width - f + l) / h.width, c[3] = (e._frame.y + e._frame.height - f + l) / h.height, this.uClampOffset[0] = l / h.realWidth, this.uClampOffset[1] = l / h.realHeight, this.isSimple = e._frame.width === h.width && e._frame.height === h.height && 0 === e.rotate, !0
                    }, t
                }(),
                Wt = function(t) {
                    function e(e, r, n) {
                        var o = this,
                            h = null;
                        return "string" != typeof e && void 0 === r && void 0 === n && (h = e, e = void 0, r = void 0, n = void 0), (o = t.call(this, e || "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", r || "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n", n) || this).maskSprite = h, o.maskMatrix = new l.d, o
                    }
                    return m(e, t), Object.defineProperty(e.prototype, "maskSprite", {
                        get: function() {
                            return this._maskSprite
                        },
                        set: function(t) {
                            this._maskSprite = t, this._maskSprite && (this._maskSprite.renderable = !1)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.apply = function(t, input, output, e) {
                        var r = this._maskSprite,
                            n = r._texture;
                        n.valid && (n.uvMatrix || (n.uvMatrix = new Yt(n, 0)), n.uvMatrix.update(), this.uniforms.npmAlpha = n.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = n, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, r).prepend(n.uvMatrix.mapCoord), this.uniforms.alpha = r.worldAlpha, this.uniforms.maskClamp = n.uvMatrix.uClampFrame, t.applyFilter(this, input, output, e))
                    }, e
                }(Xt),
                qt = function() {
                    function t(t) {
                        this.renderer = t, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0
                    }
                    return t.prototype.setMaskStack = function(t) {
                        this.maskStack = t, this.renderer.scissor.setMaskStack(t), this.renderer.stencil.setMaskStack(t)
                    }, t.prototype.push = function(t, e) {
                        var r = e;
                        if (!r.isMaskData) {
                            var n = this.maskDataPool.pop() || new mt;
                            n.pooled = !0, n.maskObject = e, r = n
                        }
                        var h = 0 !== this.maskStack.length ? this.maskStack[this.maskStack.length - 1] : null;
                        if (r.copyCountersOrReset(h), r.autoDetect && this.detect(r), r._target = t, r.type !== o.j.SPRITE && this.maskStack.push(r), r.enabled) switch (r.type) {
                            case o.j.SCISSOR:
                                this.renderer.scissor.push(r);
                                break;
                            case o.j.STENCIL:
                                this.renderer.stencil.push(r);
                                break;
                            case o.j.SPRITE:
                                r.copyCountersOrReset(null), this.pushSpriteMask(r)
                        }
                        r.type === o.j.SPRITE && this.maskStack.push(r)
                    }, t.prototype.pop = function(t) {
                        var e = this.maskStack.pop();
                        if (e && e._target === t) {
                            if (e.enabled) switch (e.type) {
                                case o.j.SCISSOR:
                                    this.renderer.scissor.pop();
                                    break;
                                case o.j.STENCIL:
                                    this.renderer.stencil.pop(e.maskObject);
                                    break;
                                case o.j.SPRITE:
                                    this.popSpriteMask(e)
                            }
                            if (e.reset(), e.pooled && this.maskDataPool.push(e), 0 !== this.maskStack.length) {
                                var r = this.maskStack[this.maskStack.length - 1];
                                r.type === o.j.SPRITE && r._filters && (r._filters[0].maskSprite = r.maskObject)
                            }
                        }
                    }, t.prototype.detect = function(t) {
                        t.maskObject.isSprite ? t.type = o.j.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(t) ? t.type = o.j.SCISSOR : t.type = o.j.STENCIL
                    }, t.prototype.pushSpriteMask = function(t) {
                        var e, r, n = t.maskObject,
                            o = t._target,
                            h = t._filters;
                        h || (h = this.alphaMaskPool[this.alphaMaskIndex]) || (h = this.alphaMaskPool[this.alphaMaskIndex] = [new Wt]);
                        var c, f, l = this.renderer,
                            d = l.renderTexture;
                        if (d.current) {
                            var _ = d.current;
                            c = t.resolution || _.resolution, f = null !== (e = t.multisample) && void 0 !== e ? e : _.multisample
                        } else c = t.resolution || l.resolution, f = null !== (r = t.multisample) && void 0 !== r ? r : l.multisample;
                        h[0].resolution = c, h[0].multisample = f, h[0].maskSprite = n;
                        var v = o.filterArea;
                        o.filterArea = n.getBounds(!0), l.filter.push(o, h), o.filterArea = v, t._filters || this.alphaMaskIndex++
                    }, t.prototype.popSpriteMask = function(t) {
                        this.renderer.filter.pop(), t._filters ? t._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null)
                    }, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }(),
                Zt = function() {
                    function t(t) {
                        this.renderer = t, this.maskStack = [], this.glConst = 0
                    }
                    return t.prototype.getStackLength = function() {
                        return this.maskStack.length
                    }, t.prototype.setMaskStack = function(t) {
                        var e = this.renderer.gl,
                            r = this.getStackLength();
                        this.maskStack = t;
                        var n = this.getStackLength();
                        n !== r && (0 === n ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()))
                    }, t.prototype._useCurrent = function() {}, t.prototype.destroy = function() {
                        this.renderer = null, this.maskStack = null
                    }, t
                }(),
                Kt = new l.d,
                Jt = function(t) {
                    function e(e) {
                        var r = t.call(this, e) || this;
                        return r.glConst = WebGLRenderingContext.SCISSOR_TEST, r
                    }
                    return m(e, t), e.prototype.getStackLength = function() {
                        var t = this.maskStack[this.maskStack.length - 1];
                        return t ? t._scissorCounter : 0
                    }, e.prototype.calcScissorRect = function(t) {
                        if (!t._scissorRectLocal) {
                            var e = t._scissorRect,
                                r = t.maskObject,
                                n = this.renderer,
                                o = n.renderTexture;
                            r.renderable = !0;
                            var rect = r.getBounds();
                            this.roundFrameToPixels(rect, o.current ? o.current.resolution : n.resolution, o.sourceFrame, o.destinationFrame, n.projection.transform), r.renderable = !1, e && rect.fit(e), t._scissorRectLocal = rect
                        }
                    }, e.isMatrixRotated = function(t) {
                        if (!t) return !1;
                        var a = t.a,
                            b = t.b,
                            e = t.c,
                            r = t.d;
                        return (Math.abs(b) > 1e-4 || Math.abs(e) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(r) > 1e-4)
                    }, e.prototype.testScissor = function(t) {
                        var r = t.maskObject;
                        if (!r.isFastRect || !r.isFastRect()) return !1;
                        if (e.isMatrixRotated(r.worldTransform)) return !1;
                        if (e.isMatrixRotated(this.renderer.projection.transform)) return !1;
                        this.calcScissorRect(t);
                        var rect = t._scissorRectLocal;
                        return rect.width > 0 && rect.height > 0
                    }, e.prototype.roundFrameToPixels = function(t, r, n, o, h) {
                        e.isMatrixRotated(h) || ((h = h ? Kt.copyFrom(h) : Kt.identity()).translate(-n.x, -n.y).scale(o.width / n.width, o.height / n.height).translate(o.x, o.y), this.renderer.filter.transformAABB(h, t), t.fit(o), t.x = Math.round(t.x * r), t.y = Math.round(t.y * r), t.width = Math.round(t.width * r), t.height = Math.round(t.height * r))
                    }, e.prototype.push = function(t) {
                        t._scissorRectLocal || this.calcScissorRect(t);
                        var e = this.renderer.gl;
                        t._scissorRect || e.enable(e.SCISSOR_TEST), t._scissorCounter++, t._scissorRect = t._scissorRectLocal, this._useCurrent()
                    }, e.prototype.pop = function() {
                        var t = this.renderer.gl;
                        this.getStackLength() > 0 ? this._useCurrent() : t.disable(t.SCISSOR_TEST)
                    }, e.prototype._useCurrent = function() {
                        var t, rect = this.maskStack[this.maskStack.length - 1]._scissorRect;
                        t = this.renderer.renderTexture.current ? rect.y : this.renderer.height - rect.height - rect.y, this.renderer.gl.scissor(rect.x, t, rect.width, rect.height)
                    }, e
                }(Zt),
                $t = function(t) {
                    function e(e) {
                        var r = t.call(this, e) || this;
                        return r.glConst = WebGLRenderingContext.STENCIL_TEST, r
                    }
                    return m(e, t), e.prototype.getStackLength = function() {
                        var t = this.maskStack[this.maskStack.length - 1];
                        return t ? t._stencilCounter : 0
                    }, e.prototype.push = function(t) {
                        var e = t.maskObject,
                            r = this.renderer.gl,
                            n = t._stencilCounter;
                        0 === n && (this.renderer.framebuffer.forceStencil(), r.clearStencil(0), r.clear(r.STENCIL_BUFFER_BIT), r.enable(r.STENCIL_TEST)), t._stencilCounter++, r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.EQUAL, n, 4294967295), r.stencilOp(r.KEEP, r.KEEP, r.INCR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, this._useCurrent()
                    }, e.prototype.pop = function(t) {
                        var e = this.renderer.gl;
                        0 === this.getStackLength() ? e.disable(e.STENCIL_TEST) : (e.colorMask(!1, !1, !1, !1), e.stencilOp(e.KEEP, e.KEEP, e.DECR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, this._useCurrent())
                    }, e.prototype._useCurrent = function() {
                        var t = this.renderer.gl;
                        t.colorMask(!0, !0, !0, !0), t.stencilFunc(t.EQUAL, this.getStackLength(), 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.KEEP)
                    }, e
                }(Zt),
                Qt = function() {
                    function t(t) {
                        this.renderer = t, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new l.d, this.transform = null
                    }
                    return t.prototype.update = function(t, e, r, n) {
                        this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t, this.calculateProjection(this.destinationFrame, this.sourceFrame, r, n), this.transform && this.projectionMatrix.append(this.transform);
                        var o = this.renderer;
                        o.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, o.globalUniforms.update(), o.shader.shader && o.shader.syncUniformGroup(o.shader.shader.uniforms.globals)
                    }, t.prototype.calculateProjection = function(t, e, r, n) {
                        var o = this.projectionMatrix,
                            h = n ? -1 : 1;
                        o.identity(), o.a = 1 / e.width * 2, o.d = h * (1 / e.height * 2), o.tx = -1 - e.x * o.a, o.ty = -h - e.y * o.d
                    }, t.prototype.setTransform = function(t) {}, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }(),
                te = new l.j,
                ee = new l.j,
                re = function() {
                    function t(t) {
                        this.renderer = t, this.clearColor = t._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new l.j, this.destinationFrame = new l.j, this.viewportFrame = new l.j
                    }
                    return t.prototype.bind = function(t, e, r) {
                        void 0 === t && (t = null);
                        var n, o, h, c = this.renderer;
                        this.current = t, t ? (h = (n = t.baseTexture).resolution, e || (te.width = t.frame.width, te.height = t.frame.height, e = te), r || (ee.x = t.frame.x, ee.y = t.frame.y, ee.width = e.width, ee.height = e.height, r = ee), o = n.framebuffer) : (h = c.resolution, e || (te.width = c.screen.width, te.height = c.screen.height, e = te), r || ((r = te).width = e.width, r.height = e.height));
                        var f = this.viewportFrame;
                        f.x = r.x * h, f.y = r.y * h, f.width = r.width * h, f.height = r.height * h, t || (f.y = c.view.height - (f.y + f.height)), f.ceil(), this.renderer.framebuffer.bind(o, f), this.renderer.projection.update(r, e, h, !o), t ? this.renderer.mask.setMaskStack(n.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(r)
                    }, t.prototype.clear = function(t, mask) {
                        t = this.current ? t || this.current.baseTexture.clearColor : t || this.clearColor;
                        var e = this.destinationFrame,
                            r = this.current ? this.current.baseTexture : this.renderer.screen,
                            n = e.width !== r.width || e.height !== r.height;
                        if (n) {
                            var o = this.viewportFrame,
                                h = o.x,
                                c = o.y,
                                f = o.width,
                                l = o.height;
                            h = Math.round(h), c = Math.round(c), f = Math.round(f), l = Math.round(l), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(h, c, f, l)
                        }
                        this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], mask), n && this.renderer.scissor.pop()
                    }, t.prototype.resize = function() {
                        this.bind(null)
                    }, t.prototype.reset = function() {
                        this.bind(null)
                    }, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }();

            function ie(t, e, r, n, o) {
                r.buffer.update(o)
            }
            var ne = {
                    float: "\n        data[offset] = v;\n    ",
                    vec2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n    ",
                    vec3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n    ",
                    vec4: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n        data[offset+3] = v[3];\n    ",
                    mat2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n\n        data[offset+4] = v[2];\n        data[offset+5] = v[3];\n    ",
                    mat3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n        data[offset + 4] = v[3];\n        data[offset + 5] = v[4];\n        data[offset + 6] = v[5];\n\n        data[offset + 8] = v[6];\n        data[offset + 9] = v[7];\n        data[offset + 10] = v[8];\n    ",
                    mat4: "\n        for(var i = 0; i < 16; i++)\n        {\n            data[offset + i] = v[i];\n        }\n    "
                },
                oe = {
                    float: 4,
                    vec2: 8,
                    vec3: 12,
                    vec4: 16,
                    int: 4,
                    ivec2: 8,
                    ivec3: 12,
                    ivec4: 16,
                    uint: 4,
                    uvec2: 8,
                    uvec3: 12,
                    uvec4: 16,
                    bool: 4,
                    bvec2: 8,
                    bvec3: 12,
                    bvec4: 16,
                    mat2: 32,
                    mat3: 48,
                    mat4: 64
                };

            function se(t) {
                for (var e = t.map((function(data) {
                        return {
                            data: data,
                            offset: 0,
                            dataLen: 0,
                            dirty: 0
                        }
                    })), r = 0, n = 0, o = 0, i = 0; i < e.length; i++) {
                    var h = e[i];
                    if (r = oe[h.data.type], h.data.size > 1 && (r = Math.max(r, 16) * h.data.size), h.dataLen = r, n % r != 0 && n < 16) {
                        var c = n % r % 16;
                        n += c, o += c
                    }
                    n + r > 16 ? (o = 16 * Math.ceil(o / 16), h.offset = o, o += r, n = r) : (h.offset = o, n += r, o += r)
                }
                return {
                    uboElements: e,
                    size: o = 16 * Math.ceil(o / 16)
                }
            }

            function ae(t, e) {
                var r = [];
                for (var i in t) e[i] && r.push(e[i]);
                return r.sort((function(a, b) {
                    return a.index - b.index
                })), r
            }

            function ue(t, e) {
                if (!t.autoManage) return {
                    size: 0,
                    syncFunc: ie
                };
                for (var r = se(ae(t.uniforms, e)), n = r.uboElements, o = r.size, h = ["\n    var v = null;\n    var v2 = null;\n    var cv = null;\n    var t = 0;\n    var gl = renderer.gl\n    var index = 0;\n    var data = buffer.data;\n    "], i = 0; i < n.length; i++) {
                    for (var c = n[i], f = t.uniforms[c.data.name], l = c.data.name, d = !1, _ = 0; _ < Pt.length; _++) {
                        var v = Pt[_];
                        if (v.codeUbo && v.test(c.data, f)) {
                            h.push("offset = " + c.offset / 4 + ";", Pt[_].codeUbo(c.data.name, f)), d = !0;
                            break
                        }
                    }
                    if (!d)
                        if (c.data.size > 1) {
                            var m = St(c.data.type),
                                y = Math.max(oe[c.data.type] / 16, 1),
                                E = m / y,
                                T = (4 - E % 4) % 4;
                            h.push("\n                cv = ud." + l + ".value;\n                v = uv." + l + ";\n                offset = " + c.offset / 4 + ";\n\n                t = 0;\n\n                for(var i=0; i < " + c.data.size * y + "; i++)\n                {\n                    for(var j = 0; j < " + E + "; j++)\n                    {\n                        data[offset++] = v[t++];\n                    }\n                    offset += " + T + ";\n                }\n\n                ")
                        } else {
                            var template = ne[c.data.type];
                            h.push("\n                cv = ud." + l + ".value;\n                v = uv." + l + ";\n                offset = " + c.offset / 4 + ";\n                " + template + ";\n                ")
                        }
                }
                return h.push("\n       renderer.buffer.update(buffer);\n    "), {
                    size: o,
                    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", h.join("\n"))
                }
            }
            var he = function() {},
                ce = function() {
                    function t(t, e) {
                        this.program = t, this.uniformData = e, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {}
                    }
                    return t.prototype.destroy = function() {
                        this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null
                    }, t
                }();

            function fe(t, e) {
                var r = yt(t, t.VERTEX_SHADER, e.vertexSrc),
                    n = yt(t, t.FRAGMENT_SHADER, e.fragmentSrc),
                    o = t.createProgram();
                if (t.attachShader(o, r), t.attachShader(o, n), t.linkProgram(o), t.getProgramParameter(o, t.LINK_STATUS) || function(t, e, r, n) {
                        t.getProgramParameter(e, t.LINK_STATUS) || (t.getShaderParameter(r, t.COMPILE_STATUS) || Et(t, r), t.getShaderParameter(n, t.COMPILE_STATUS) || Et(t, n), console.error("PixiJS Error: Could not initialize shader."), "" !== t.getProgramInfoLog(e) && console.warn("PixiJS Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(e)))
                    }(t, o, r, n), e.attributeData = function(t, e) {
                        for (var r = {}, n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < n; i++) {
                            var o = e.getActiveAttrib(t, i);
                            if (0 !== o.name.indexOf("gl_")) {
                                var h = Ct(e, o.type),
                                    data = {
                                        type: h,
                                        name: o.name,
                                        size: St(h),
                                        location: e.getAttribLocation(t, o.name)
                                    };
                                r[o.name] = data
                            }
                        }
                        return r
                    }(o, t), e.uniformData = function(t, e) {
                        for (var r = {}, n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), i = 0; i < n; i++) {
                            var o = e.getActiveUniform(t, i),
                                h = o.name.replace(/\[.*?\]$/, ""),
                                c = !!o.name.match(/\[.*?\]$/),
                                f = Ct(e, o.type);
                            r[h] = {
                                name: h,
                                index: i,
                                type: f,
                                size: o.size,
                                isArray: c,
                                value: Tt(f, o.size)
                            }
                        }
                        return r
                    }(o, t), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertexSrc)) {
                    var h = Object.keys(e.attributeData);
                    h.sort((function(a, b) {
                        return a > b ? 1 : -1
                    }));
                    for (var i = 0; i < h.length; i++) e.attributeData[h[i]].location = i, t.bindAttribLocation(o, i, h[i]);
                    t.linkProgram(o)
                }
                t.deleteShader(r), t.deleteShader(n);
                var c = {};
                for (var i in e.uniformData) {
                    var data = e.uniformData[i];
                    c[i] = {
                        location: t.getUniformLocation(o, i),
                        value: Tt(data.type, data.size)
                    }
                }
                return new ce(o, c)
            }
            var le = 0,
                de = {
                    textureCount: 0,
                    uboCount: 0
                },
                pe = function() {
                    function t(t) {
                        this.destroyed = !1, this.renderer = t, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = le++
                    }
                    return t.prototype.systemCheck = function() {
                        if (! function() {
                                if ("boolean" == typeof Ut) return Ut;
                                try {
                                    var t = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
                                    Ut = !0 === t({
                                        a: "b"
                                    }, "a", "b")
                                } catch (t) {
                                    Ut = !1
                                }
                                return Ut
                            }()) throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")
                    }, t.prototype.contextChange = function(t) {
                        this.gl = t, this.reset()
                    }, t.prototype.bind = function(t, e) {
                        t.uniforms.globals = this.renderer.globalUniforms;
                        var r = t.program,
                            n = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(t);
                        return this.shader = t, this.program !== r && (this.program = r, this.gl.useProgram(n.program)), e || (de.textureCount = 0, de.uboCount = 0, this.syncUniformGroup(t.uniformGroup, de)), n
                    }, t.prototype.setUniforms = function(t) {
                        var e = this.shader.program,
                            r = e.glPrograms[this.renderer.CONTEXT_UID];
                        e.syncUniforms(r.uniformData, t, this.renderer)
                    }, t.prototype.syncUniformGroup = function(t, e) {
                        var r = this.getGlProgram();
                        t.static && t.dirtyId === r.uniformDirtyGroups[t.id] || (r.uniformDirtyGroups[t.id] = t.dirtyId, this.syncUniforms(t, r, e))
                    }, t.prototype.syncUniforms = function(t, e, r) {
                        (t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t))(e.uniformData, t.uniforms, this.renderer, r)
                    }, t.prototype.createSyncGroups = function(t) {
                        var e = this.getSignature(t, this.shader.program.uniformData, "u");
                        return this.cache[e] || (this.cache[e] = function(t, e) {
                            var r, n = ["\n        var v = null;\n        var cv = null;\n        var cu = null;\n        var t = 0;\n        var gl = renderer.gl;\n    "];
                            for (var i in t.uniforms) {
                                var data = e[i];
                                if (data) {
                                    for (var o = t.uniforms[i], h = !1, c = 0; c < Pt.length; c++)
                                        if (Pt[c].test(data, o)) {
                                            n.push(Pt[c].code(i, o)), h = !0;
                                            break
                                        } if (!h) {
                                        var template = (1 === data.size ? Lt : Mt)[data.type].replace("location", 'ud["' + i + '"].location');
                                        n.push('\n            cu = ud["' + i + '"];\n            cv = cu.value;\n            v = uv["' + i + '"];\n            ' + template + ";")
                                    }
                                } else(null === (r = t.uniforms[i]) || void 0 === r ? void 0 : r.group) && (t.uniforms[i].ubo ? n.push("\n                        renderer.shader.syncUniformBufferGroup(uv." + i + ", '" + i + "');\n                    ") : n.push("\n                        renderer.shader.syncUniformGroup(uv." + i + ", syncData);\n                    "))
                            }
                            return new Function("ud", "uv", "renderer", "syncData", n.join("\n"))
                        }(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id]
                    }, t.prototype.syncUniformBufferGroup = function(t, e) {
                        var r = this.getGlProgram();
                        if (!t.static || 0 !== t.dirtyId || !r.uniformGroups[t.id]) {
                            t.dirtyId = 0;
                            var n = r.uniformGroups[t.id] || this.createSyncBufferGroup(t, r, e);
                            t.buffer.update(), n(r.uniformData, t.uniforms, this.renderer, de, t.buffer)
                        }
                        this.renderer.buffer.bindBufferBase(t.buffer, r.uniformBufferBindings[e])
                    }, t.prototype.createSyncBufferGroup = function(t, e, r) {
                        var n = this.renderer.gl;
                        this.renderer.buffer.bind(t.buffer);
                        var o = this.gl.getUniformBlockIndex(e.program, r);
                        e.uniformBufferBindings[r] = this.shader.uniformBindCount, n.uniformBlockBinding(e.program, o, this.shader.uniformBindCount), this.shader.uniformBindCount++;
                        var h = this.getSignature(t, this.shader.program.uniformData, "ubo"),
                            c = this._uboCache[h];
                        if (c || (c = this._uboCache[h] = ue(t, this.shader.program.uniformData)), t.autoManage) {
                            var data = new Float32Array(c.size / 4);
                            t.buffer.update(data)
                        }
                        return e.uniformGroups[t.id] = c.syncFunc, e.uniformGroups[t.id]
                    }, t.prototype.getSignature = function(t, e, r) {
                        var n = t.uniforms,
                            o = [r + "-"];
                        for (var i in n) o.push(i), e[i] && o.push(e[i].type);
                        return o.join("-")
                    }, t.prototype.getGlProgram = function() {
                        return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null
                    }, t.prototype.generateProgram = function(t) {
                        var e = this.gl,
                            r = t.program,
                            n = fe(e, r);
                        return r.glPrograms[this.renderer.CONTEXT_UID] = n, n
                    }, t.prototype.reset = function() {
                        this.program = null, this.shader = null
                    }, t.prototype.destroy = function() {
                        this.renderer = null, this.destroyed = !0
                    }, t
                }();
            var _e = function() {
                    function t() {
                        this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = o.b.NONE, this._blendEq = !1, this.map = [], this.map[0] = this.setBlend, this.map[1] = this.setOffset, this.map[2] = this.setCullFace, this.map[3] = this.setDepthTest, this.map[4] = this.setFrontFace, this.map[5] = this.setDepthMask, this.checks = [], this.defaultState = new Vt, this.defaultState.blend = !0
                    }
                    return t.prototype.contextChange = function(t) {
                        this.gl = t, this.blendModes = function(t, e) {
                            return void 0 === e && (e = []), e[o.b.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.ADD] = [t.ONE, t.ONE], e[o.b.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.NONE] = [0, 0], e[o.b.NORMAL_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.ADD_NPM] = [t.SRC_ALPHA, t.ONE, t.ONE, t.ONE], e[o.b.SCREEN_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[o.b.SRC_IN] = [t.DST_ALPHA, t.ZERO], e[o.b.SRC_OUT] = [t.ONE_MINUS_DST_ALPHA, t.ZERO], e[o.b.SRC_ATOP] = [t.DST_ALPHA, t.ONE_MINUS_SRC_ALPHA], e[o.b.DST_OVER] = [t.ONE_MINUS_DST_ALPHA, t.ONE], e[o.b.DST_IN] = [t.ZERO, t.SRC_ALPHA], e[o.b.DST_OUT] = [t.ZERO, t.ONE_MINUS_SRC_ALPHA], e[o.b.DST_ATOP] = [t.ONE_MINUS_DST_ALPHA, t.SRC_ALPHA], e[o.b.XOR] = [t.ONE_MINUS_DST_ALPHA, t.ONE_MINUS_SRC_ALPHA], e[o.b.SUBTRACT] = [t.ONE, t.ONE, t.ONE, t.ONE, t.FUNC_REVERSE_SUBTRACT, t.FUNC_ADD], e
                        }(t), this.set(this.defaultState), this.reset()
                    }, t.prototype.set = function(t) {
                        if (t = t || this.defaultState, this.stateId !== t.data) {
                            for (var e = this.stateId ^ t.data, i = 0; e;) 1 & e && this.map[i].call(this, !!(t.data & 1 << i)), e >>= 1, i++;
                            this.stateId = t.data
                        }
                        for (i = 0; i < this.checks.length; i++) this.checks[i](this, t)
                    }, t.prototype.forceState = function(t) {
                        t = t || this.defaultState;
                        for (var i = 0; i < this.map.length; i++) this.map[i].call(this, !!(t.data & 1 << i));
                        for (i = 0; i < this.checks.length; i++) this.checks[i](this, t);
                        this.stateId = t.data
                    }, t.prototype.setBlend = function(e) {
                        this.updateCheck(t.checkBlendMode, e), this.gl[e ? "enable" : "disable"](this.gl.BLEND)
                    }, t.prototype.setOffset = function(e) {
                        this.updateCheck(t.checkPolygonOffset, e), this.gl[e ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL)
                    }, t.prototype.setDepthTest = function(t) {
                        this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST)
                    }, t.prototype.setDepthMask = function(t) {
                        this.gl.depthMask(t)
                    }, t.prototype.setCullFace = function(t) {
                        this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE)
                    }, t.prototype.setFrontFace = function(t) {
                        this.gl.frontFace(this.gl[t ? "CW" : "CCW"])
                    }, t.prototype.setBlendMode = function(t) {
                        if (t !== this.blendMode) {
                            this.blendMode = t;
                            var e = this.blendModes[t],
                                r = this.gl;
                            2 === e.length ? r.blendFunc(e[0], e[1]) : r.blendFuncSeparate(e[0], e[1], e[2], e[3]), 6 === e.length ? (this._blendEq = !0, r.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD))
                        }
                    }, t.prototype.setPolygonOffset = function(t, e) {
                        this.gl.polygonOffset(t, e)
                    }, t.prototype.reset = function() {
                        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0)
                    }, t.prototype.updateCheck = function(t, e) {
                        var r = this.checks.indexOf(t);
                        e && -1 === r ? this.checks.push(t) : e || -1 === r || this.checks.splice(r, 1)
                    }, t.checkBlendMode = function(t, e) {
                        t.setBlendMode(e.blendMode)
                    }, t.checkPolygonOffset = function(t, e) {
                        t.setPolygonOffset(1, e.polygonOffset)
                    }, t.prototype.destroy = function() {
                        this.gl = null
                    }, t
                }(),
                ve = function() {
                    function t(t) {
                        this.renderer = t, this.count = 0, this.checkCount = 0, this.maxIdle = n.b.GC_MAX_IDLE, this.checkCountMax = n.b.GC_MAX_CHECK_COUNT, this.mode = n.b.GC_MODE
                    }
                    return t.prototype.postrender = function() {
                        this.renderer.renderingToScreen && (this.count++, this.mode !== o.i.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())))
                    }, t.prototype.run = function() {
                        for (var t = this.renderer.texture, e = t.managedTextures, r = !1, i = 0; i < e.length; i++) {
                            var n = e[i];
                            !n.framebuffer && this.count - n.touched > this.maxIdle && (t.destroyTexture(n, !0), e[i] = null, r = !0)
                        }
                        if (r) {
                            var o = 0;
                            for (i = 0; i < e.length; i++) null !== e[i] && (e[o++] = e[i]);
                            e.length = o
                        }
                    }, t.prototype.unload = function(t) {
                        var e = this.renderer.texture,
                            r = t._texture;
                        r && !r.framebuffer && e.destroyTexture(r);
                        for (var i = t.children.length - 1; i >= 0; i--) this.unload(t.children[i])
                    }, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }();
            var me = function(t) {
                    this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = o.r.UNSIGNED_BYTE, this.internalFormat = o.h.RGBA, this.samplerType = 0
                },
                ye = function() {
                    function t(t) {
                        this.renderer = t, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new R, this.hasIntegerTextures = !1
                    }
                    return t.prototype.contextChange = function() {
                        var t = this.gl = this.renderer.gl;
                        this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = function(t) {
                            var e, r, n, h, c, f, l, d, _, v, m, y, E, T, x, R, I, A, N, S, O, w, table;
                            return "WebGL2RenderingContext" in self && t instanceof self.WebGL2RenderingContext ? ((e = {})[o.r.UNSIGNED_BYTE] = ((r = {})[o.h.RGBA] = t.RGBA8, r[o.h.RGB] = t.RGB8, r[o.h.RG] = t.RG8, r[o.h.RED] = t.R8, r[o.h.RGBA_INTEGER] = t.RGBA8UI, r[o.h.RGB_INTEGER] = t.RGB8UI, r[o.h.RG_INTEGER] = t.RG8UI, r[o.h.RED_INTEGER] = t.R8UI, r[o.h.ALPHA] = t.ALPHA, r[o.h.LUMINANCE] = t.LUMINANCE, r[o.h.LUMINANCE_ALPHA] = t.LUMINANCE_ALPHA, r), e[o.r.BYTE] = ((n = {})[o.h.RGBA] = t.RGBA8_SNORM, n[o.h.RGB] = t.RGB8_SNORM, n[o.h.RG] = t.RG8_SNORM, n[o.h.RED] = t.R8_SNORM, n[o.h.RGBA_INTEGER] = t.RGBA8I, n[o.h.RGB_INTEGER] = t.RGB8I, n[o.h.RG_INTEGER] = t.RG8I, n[o.h.RED_INTEGER] = t.R8I, n), e[o.r.UNSIGNED_SHORT] = ((h = {})[o.h.RGBA_INTEGER] = t.RGBA16UI, h[o.h.RGB_INTEGER] = t.RGB16UI, h[o.h.RG_INTEGER] = t.RG16UI, h[o.h.RED_INTEGER] = t.R16UI, h[o.h.DEPTH_COMPONENT] = t.DEPTH_COMPONENT16, h), e[o.r.SHORT] = ((c = {})[o.h.RGBA_INTEGER] = t.RGBA16I, c[o.h.RGB_INTEGER] = t.RGB16I, c[o.h.RG_INTEGER] = t.RG16I, c[o.h.RED_INTEGER] = t.R16I, c), e[o.r.UNSIGNED_INT] = ((f = {})[o.h.RGBA_INTEGER] = t.RGBA32UI, f[o.h.RGB_INTEGER] = t.RGB32UI, f[o.h.RG_INTEGER] = t.RG32UI, f[o.h.RED_INTEGER] = t.R32UI, f[o.h.DEPTH_COMPONENT] = t.DEPTH_COMPONENT24, f), e[o.r.INT] = ((l = {})[o.h.RGBA_INTEGER] = t.RGBA32I, l[o.h.RGB_INTEGER] = t.RGB32I, l[o.h.RG_INTEGER] = t.RG32I, l[o.h.RED_INTEGER] = t.R32I, l), e[o.r.FLOAT] = ((d = {})[o.h.RGBA] = t.RGBA32F, d[o.h.RGB] = t.RGB32F, d[o.h.RG] = t.RG32F, d[o.h.RED] = t.R32F, d[o.h.DEPTH_COMPONENT] = t.DEPTH_COMPONENT32F, d), e[o.r.HALF_FLOAT] = ((_ = {})[o.h.RGBA] = t.RGBA16F, _[o.h.RGB] = t.RGB16F, _[o.h.RG] = t.RG16F, _[o.h.RED] = t.R16F, _), e[o.r.UNSIGNED_SHORT_5_6_5] = ((v = {})[o.h.RGB] = t.RGB565, v), e[o.r.UNSIGNED_SHORT_4_4_4_4] = ((m = {})[o.h.RGBA] = t.RGBA4, m), e[o.r.UNSIGNED_SHORT_5_5_5_1] = ((y = {})[o.h.RGBA] = t.RGB5_A1, y), e[o.r.UNSIGNED_INT_2_10_10_10_REV] = ((E = {})[o.h.RGBA] = t.RGB10_A2, E[o.h.RGBA_INTEGER] = t.RGB10_A2UI, E), e[o.r.UNSIGNED_INT_10F_11F_11F_REV] = ((T = {})[o.h.RGB] = t.R11F_G11F_B10F, T), e[o.r.UNSIGNED_INT_5_9_9_9_REV] = ((x = {})[o.h.RGB] = t.RGB9_E5, x), e[o.r.UNSIGNED_INT_24_8] = ((R = {})[o.h.DEPTH_STENCIL] = t.DEPTH24_STENCIL8, R), e[o.r.FLOAT_32_UNSIGNED_INT_24_8_REV] = ((I = {})[o.h.DEPTH_STENCIL] = t.DEPTH32F_STENCIL8, I), table = e) : ((A = {})[o.r.UNSIGNED_BYTE] = ((N = {})[o.h.RGBA] = t.RGBA, N[o.h.RGB] = t.RGB, N[o.h.ALPHA] = t.ALPHA, N[o.h.LUMINANCE] = t.LUMINANCE, N[o.h.LUMINANCE_ALPHA] = t.LUMINANCE_ALPHA, N), A[o.r.UNSIGNED_SHORT_5_6_5] = ((S = {})[o.h.RGB] = t.RGB, S), A[o.r.UNSIGNED_SHORT_4_4_4_4] = ((O = {})[o.h.RGBA] = t.RGBA, O), A[o.r.UNSIGNED_SHORT_5_5_5_1] = ((w = {})[o.h.RGBA] = t.RGBA, w), table = A), table
                        }(t);
                        var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
                        this.boundTextures.length = e;
                        for (var i = 0; i < e; i++) this.boundTextures[i] = null;
                        this.emptyTextures = {};
                        var r = new me(t.createTexture());
                        t.bindTexture(t.TEXTURE_2D, r.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t.TEXTURE_2D] = r, this.emptyTextures[t.TEXTURE_CUBE_MAP] = new me(t.createTexture()), t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
                        for (i = 0; i < 6; i++) t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
                        t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR);
                        for (i = 0; i < this.boundTextures.length; i++) this.bind(null, i)
                    }, t.prototype.bind = function(t, e) {
                        void 0 === e && (e = 0);
                        var r = this.gl;
                        if ((t = null == t ? void 0 : t.castToBaseTexture()) && t.valid && !t.parentTextureArray) {
                            t.touched = this.renderer.textureGC.count;
                            var n = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
                            this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(t.target, n.texture)), n.dirtyId !== t.dirtyId && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), this.updateTexture(t)), this.boundTextures[e] = t
                        } else this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[e] = null
                    }, t.prototype.reset = function() {
                        this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
                        for (var i = 0; i < this.boundTextures.length; i++) this.boundTextures[i] = this.unknownTexture
                    }, t.prototype.unbind = function(t) {
                        var e = this.gl,
                            r = this.boundTextures;
                        if (this._unknownBoundTextures) {
                            this._unknownBoundTextures = !1;
                            for (var i = 0; i < r.length; i++) r[i] === this.unknownTexture && this.bind(null, i)
                        }
                        for (i = 0; i < r.length; i++) r[i] === t && (this.currentLocation !== i && (e.activeTexture(e.TEXTURE0 + i), this.currentLocation = i), e.bindTexture(t.target, this.emptyTextures[t.target].texture), r[i] = null)
                    }, t.prototype.ensureSamplerType = function(t) {
                        var e = this,
                            r = e.boundTextures,
                            n = e.hasIntegerTextures,
                            h = e.CONTEXT_UID;
                        if (n)
                            for (var i = t - 1; i >= 0; --i) {
                                var c = r[i];
                                if (c) c._glTextures[h].samplerType !== o.o.FLOAT && this.renderer.texture.unbind(c)
                            }
                    }, t.prototype.initTexture = function(t) {
                        var e = new me(this.gl.createTexture());
                        return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e
                    }, t.prototype.initTextureType = function(t, e) {
                        var r, n;
                        e.internalFormat = null !== (n = null === (r = this.internalFormats[t.type]) || void 0 === r ? void 0 : r[t.format]) && void 0 !== n ? n : t.format, 2 === this.webGLVersion && t.type === o.r.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = t.type
                    }, t.prototype.updateTexture = function(t) {
                        var e = t._glTextures[this.CONTEXT_UID];
                        if (e) {
                            var r = this.renderer;
                            if (this.initTextureType(t, e), t.resource && t.resource.upload(r, t, e)) e.samplerType !== o.o.FLOAT && (this.hasIntegerTextures = !0);
                            else {
                                var n = t.realWidth,
                                    h = t.realHeight,
                                    c = r.gl;
                                (e.width !== n || e.height !== h || e.dirtyId < 0) && (e.width = n, e.height = h, c.texImage2D(t.target, 0, e.internalFormat, n, h, 0, t.format, e.type, null))
                            }
                            t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), e.dirtyId = t.dirtyId
                        }
                    }, t.prototype.destroyTexture = function(t, e) {
                        var r = this.gl;
                        if ((t = t.castToBaseTexture())._glTextures[this.CONTEXT_UID] && (this.unbind(t), r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.CONTEXT_UID], !e)) {
                            var i = this.managedTextures.indexOf(t); - 1 !== i && Object(h.removeItems)(this.managedTextures, i, 1)
                        }
                    }, t.prototype.updateTextureStyle = function(t) {
                        var e = t._glTextures[this.CONTEXT_UID];
                        e && (t.mipmap !== o.k.POW2 && 2 === this.webGLVersion || t.isPowerOfTwo ? e.mipmap = t.mipmap >= 1 : e.mipmap = !1, 2 === this.webGLVersion || t.isPowerOfTwo ? e.wrapMode = t.wrapMode : e.wrapMode = o.s.CLAMP, t.resource && t.resource.style(this.renderer, t, e) || this.setStyle(t, e), e.dirtyStyleId = t.dirtyStyleId)
                    }, t.prototype.setStyle = function(t, e) {
                        var r = this.gl;
                        if (e.mipmap && t.mipmap !== o.k.ON_MANUAL && r.generateMipmap(t.target), r.texParameteri(t.target, r.TEXTURE_WRAP_S, e.wrapMode), r.texParameteri(t.target, r.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
                            r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === o.p.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
                            var n = this.renderer.context.extensions.anisotropicFiltering;
                            if (n && t.anisotropicLevel > 0 && t.scaleMode === o.p.LINEAR) {
                                var h = Math.min(t.anisotropicLevel, r.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
                                r.texParameterf(t.target, n.TEXTURE_MAX_ANISOTROPY_EXT, h)
                            }
                        } else r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === o.p.LINEAR ? r.LINEAR : r.NEAREST);
                        r.texParameteri(t.target, r.TEXTURE_MAG_FILTER, t.scaleMode === o.p.LINEAR ? r.LINEAR : r.NEAREST)
                    }, t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }(),
                Ee = {
                    __proto__: null,
                    FilterSystem: st,
                    BatchSystem: ut,
                    ContextSystem: ct,
                    FramebufferSystem: pt,
                    GeometrySystem: vt,
                    MaskSystem: qt,
                    ScissorSystem: Jt,
                    StencilSystem: $t,
                    ProjectionSystem: Qt,
                    RenderTextureSystem: re,
                    ShaderSystem: pe,
                    StateSystem: _e,
                    TextureGCSystem: ve,
                    TextureSystem: ye
                },
                ge = new l.d,
                Te = function(t) {
                    function e(e, r) {
                        void 0 === e && (e = o.n.UNKNOWN);
                        var c = t.call(this) || this;
                        return r = Object.assign({}, n.b.RENDER_OPTIONS, r), c.options = r, c.type = e, c.screen = new l.j(0, 0, r.width, r.height), c.view = r.view || document.createElement("canvas"), c.resolution = r.resolution || n.b.RESOLUTION, c.useContextAlpha = r.useContextAlpha, c.autoDensity = !!r.autoDensity, c.preserveDrawingBuffer = r.preserveDrawingBuffer, c.clearBeforeRender = r.clearBeforeRender, c._backgroundColor = 0, c._backgroundColorRgba = [0, 0, 0, 1], c._backgroundColorString = "#000000", c.backgroundColor = r.backgroundColor || c._backgroundColor, c.backgroundAlpha = r.backgroundAlpha, void 0 !== r.transparent && (Object(h.deprecation)("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."), c.useContextAlpha = r.transparent, c.backgroundAlpha = r.transparent ? 0 : 1), c._lastObjectRendered = null, c.plugins = {}, c
                    }
                    return m(e, t), e.prototype.initPlugins = function(t) {
                        for (var e in t) this.plugins[e] = new t[e](this)
                    }, Object.defineProperty(e.prototype, "width", {
                        get: function() {
                            return this.view.width
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "height", {
                        get: function() {
                            return this.view.height
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.resize = function(t, e) {
                        this.view.width = Math.round(t * this.resolution), this.view.height = Math.round(e * this.resolution);
                        var r = this.view.width / this.resolution,
                            n = this.view.height / this.resolution;
                        this.screen.width = r, this.screen.height = n, this.autoDensity && (this.view.style.width = r + "px", this.view.style.height = n + "px"), this.emit("resize", r, n)
                    }, e.prototype.generateTexture = function(t, e, r, n) {
                        void 0 === e && (e = {}), "number" == typeof e && (Object(h.deprecation)("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."), e = {
                            scaleMode: e,
                            resolution: r,
                            region: n
                        });
                        var o = e.region,
                            c = function(s, t) {
                                var e = {};
                                for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && t.indexOf(p) < 0 && (e[p] = s[p]);
                                if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
                                    var i = 0;
                                    for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) t.indexOf(p[i]) < 0 && (e[p[i]] = s[p[i]])
                                }
                                return e
                            }(e, ["region"]);
                        0 === (n = o || t.getLocalBounds(null, !0)).width && (n.width = 1), 0 === n.height && (n.height = 1);
                        var f = j.create(y({
                            width: n.width,
                            height: n.height
                        }, c));
                        return ge.tx = -n.x, ge.ty = -n.y, this.render(t, {
                            renderTexture: f,
                            clear: !1,
                            transform: ge,
                            skipUpdateTransform: !!t.parent
                        }), f
                    }, e.prototype.destroy = function(t) {
                        for (var e in this.plugins) this.plugins[e].destroy(), this.plugins[e] = null;
                        t && this.view.parentNode && this.view.parentNode.removeChild(this.view);
                        var r = this;
                        r.plugins = null, r.type = o.n.UNKNOWN, r.view = null, r.screen = null, r._tempDisplayObjectParent = null, r.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null
                    }, Object.defineProperty(e.prototype, "backgroundColor", {
                        get: function() {
                            return this._backgroundColor
                        },
                        set: function(t) {
                            this._backgroundColor = t, this._backgroundColorString = Object(h.hex2string)(t), Object(h.hex2rgb)(t, this._backgroundColorRgba)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "backgroundAlpha", {
                        get: function() {
                            return this._backgroundColorRgba[3]
                        },
                        set: function(t) {
                            this._backgroundColorRgba[3] = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e
                }(h.EventEmitter),
                be = function(t) {
                    this.buffer = t || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0
                },
                xe = function() {
                    function t(t) {
                        this.renderer = t, this.managedBuffers = {}, this.boundBufferBases = {}
                    }
                    return t.prototype.destroy = function() {
                        this.renderer = null
                    }, t.prototype.contextChange = function() {
                        this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID
                    }, t.prototype.bind = function(t) {
                        var e = this.gl,
                            r = this.CONTEXT_UID,
                            n = t._glBuffers[r] || this.createGLBuffer(t);
                        e.bindBuffer(t.type, n.buffer)
                    }, t.prototype.bindBufferBase = function(t, e) {
                        var r = this.gl,
                            n = this.CONTEXT_UID;
                        if (this.boundBufferBases[e] !== t) {
                            var o = t._glBuffers[n] || this.createGLBuffer(t);
                            this.boundBufferBases[e] = t, r.bindBufferBase(r.UNIFORM_BUFFER, e, o.buffer)
                        }
                    }, t.prototype.bindBufferRange = function(t, e, r) {
                        var n = this.gl,
                            o = this.CONTEXT_UID;
                        r = r || 0;
                        var h = t._glBuffers[o] || this.createGLBuffer(t);
                        n.bindBufferRange(n.UNIFORM_BUFFER, e || 0, h.buffer, 256 * r, 256)
                    }, t.prototype.update = function(t) {
                        var e = this.gl,
                            r = this.CONTEXT_UID,
                            n = t._glBuffers[r];
                        if (t._updateID !== n.updateID)
                            if (n.updateID = t._updateID, e.bindBuffer(t.type, n.buffer), n.byteLength >= t.data.byteLength) e.bufferSubData(t.type, 0, t.data);
                            else {
                                var o = t.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
                                n.byteLength = t.data.byteLength, e.bufferData(t.type, t.data, o)
                            }
                    }, t.prototype.dispose = function(t, e) {
                        if (this.managedBuffers[t.id]) {
                            delete this.managedBuffers[t.id];
                            var r = t._glBuffers[this.CONTEXT_UID],
                                n = this.gl;
                            t.disposeRunner.remove(this), r && (e || n.deleteBuffer(r.buffer), delete t._glBuffers[this.CONTEXT_UID])
                        }
                    }, t.prototype.disposeAll = function(t) {
                        for (var e = Object.keys(this.managedBuffers), i = 0; i < e.length; i++) this.dispose(this.managedBuffers[e[i]], t)
                    }, t.prototype.createGLBuffer = function(t) {
                        var e = this.CONTEXT_UID,
                            r = this.gl;
                        return t._glBuffers[e] = new be(r.createBuffer()), this.managedBuffers[t.id] = t, t.disposeRunner.add(this), t._glBuffers[e]
                    }, t
                }(),
                Re = function(t) {
                    function e(r) {
                        var n = t.call(this, o.n.WEBGL, r) || this;
                        return r = n.options, n.gl = null, n.CONTEXT_UID = 0, n.runners = {
                            destroy: new c.a("destroy"),
                            contextChange: new c.a("contextChange"),
                            reset: new c.a("reset"),
                            update: new c.a("update"),
                            postrender: new c.a("postrender"),
                            prerender: new c.a("prerender"),
                            resize: new c.a("resize")
                        }, n.runners.contextChange.add(n), n.globalUniforms = new et({
                            projectionMatrix: new l.d
                        }, !0), n.addSystem(qt, "mask").addSystem(ct, "context").addSystem(_e, "state").addSystem(pe, "shader").addSystem(ye, "texture").addSystem(xe, "buffer").addSystem(vt, "geometry").addSystem(pt, "framebuffer").addSystem(Jt, "scissor").addSystem($t, "stencil").addSystem(Qt, "projection").addSystem(ve, "textureGC").addSystem(st, "filter").addSystem(re, "renderTexture").addSystem(ut, "batch"), n.initPlugins(e.__plugins), n.multisample = void 0, r.context ? n.context.initFromContext(r.context) : n.context.initFromOptions({
                            alpha: !!n.useContextAlpha,
                            antialias: r.antialias,
                            premultipliedAlpha: n.useContextAlpha && "notMultiplied" !== n.useContextAlpha,
                            stencil: !0,
                            preserveDrawingBuffer: r.preserveDrawingBuffer,
                            powerPreference: n.options.powerPreference
                        }), n.renderingToScreen = !0, Object(h.sayHello)(2 === n.context.webGLVersion ? "WebGL 2" : "WebGL 1"), n.resize(n.options.width, n.options.height), n
                    }
                    return m(e, t), e.create = function(t) {
                        if (Object(h.isWebGLSupported)()) return new e(t);
                        throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.')
                    }, e.prototype.contextChange = function() {
                        var t, e = this.gl;
                        if (1 === this.context.webGLVersion) {
                            var r = e.getParameter(e.FRAMEBUFFER_BINDING);
                            e.bindFramebuffer(e.FRAMEBUFFER, null), t = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.FRAMEBUFFER, r)
                        } else {
                            r = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
                            e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), t = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, r)
                        }
                        t >= o.l.HIGH ? this.multisample = o.l.HIGH : t >= o.l.MEDIUM ? this.multisample = o.l.MEDIUM : t >= o.l.LOW ? this.multisample = o.l.LOW : this.multisample = o.l.NONE
                    }, e.prototype.addSystem = function(t, e) {
                        var r = new t(this);
                        if (this[e]) throw new Error('Whoops! The name "' + e + '" is already in use');
                        for (var i in this[e] = r, this.runners) this.runners[i].add(r);
                        return this
                    }, e.prototype.render = function(t, e) {
                        var r, n, o, c;
                        if (e && (e instanceof j ? (Object(h.deprecation)("6.0.0", "Renderer#render arguments changed, use options instead."), r = e, n = arguments[2], o = arguments[3], c = arguments[4]) : (r = e.renderTexture, n = e.clear, o = e.transform, c = e.skipUpdateTransform)), this.renderingToScreen = !r, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = o, !this.context.isLost) {
                            if (r || (this._lastObjectRendered = t), !c) {
                                var f = t.enableTempParent();
                                t.updateTransform(), t.disableTempParent(f)
                            }
                            this.renderTexture.bind(r), this.batch.currentRenderer.start(), (void 0 !== n ? n : this.clearBeforeRender) && this.renderTexture.clear(), t.render(this), this.batch.currentRenderer.flush(), r && r.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender")
                        }
                    }, e.prototype.generateTexture = function(e, r, n, o) {
                        void 0 === r && (r = {});
                        var h = t.prototype.generateTexture.call(this, e, r, n, o);
                        return this.framebuffer.blit(), h
                    }, e.prototype.resize = function(e, r) {
                        t.prototype.resize.call(this, e, r), this.runners.resize.emit(this.screen.height, this.screen.width)
                    }, e.prototype.reset = function() {
                        return this.runners.reset.emit(), this
                    }, e.prototype.clear = function() {
                        this.renderTexture.bind(), this.renderTexture.clear()
                    }, e.prototype.destroy = function(e) {
                        for (var r in this.runners.destroy.emit(), this.runners) this.runners[r].destroy();
                        t.prototype.destroy.call(this, e), this.gl = null
                    }, Object.defineProperty(e.prototype, "extract", {
                        get: function() {
                            return Object(h.deprecation)("6.0.0", "Renderer#extract has been deprecated, please use Renderer#plugins.extract instead."), this.plugins.extract
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.registerPlugin = function(t, r) {
                        e.__plugins = e.__plugins || {}, e.__plugins[t] = r
                    }, e
                }(Te);

            function Ie(t) {
                return Re.create(t)
            }
            var Ae = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
                Ne = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n",
                Se = function() {
                    function t(t) {
                        Object(h.deprecation)("6.1.0", "System class is deprecated, implemement ISystem interface instead."), this.renderer = t
                    }
                    return t.prototype.destroy = function() {
                        this.renderer = null
                    }, t
                }(),
                Oe = function() {
                    this.texArray = null, this.blend = 0, this.type = o.f.TRIANGLES, this.start = 0, this.size = 0, this.data = null
                },
                we = function() {
                    function t() {
                        this.elements = [], this.ids = [], this.count = 0
                    }
                    return t.prototype.clear = function() {
                        for (var i = 0; i < this.count; i++) this.elements[i] = null;
                        this.count = 0
                    }, t
                }(),
                Ce = function() {
                    function t(t) {
                        "number" == typeof t ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData)
                    }
                    return Object.defineProperty(t.prototype, "int8View", {
                        get: function() {
                            return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "uint8View", {
                        get: function() {
                            return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "int16View", {
                        get: function() {
                            return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "uint16View", {
                        get: function() {
                            return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "int32View", {
                        get: function() {
                            return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.view = function(t) {
                        return this[t + "View"]
                    }, t.prototype.destroy = function() {
                        this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null
                    }, t.sizeOf = function(t) {
                        switch (t) {
                            case "int8":
                            case "uint8":
                                return 1;
                            case "int16":
                            case "uint16":
                                return 2;
                            case "int32":
                            case "uint32":
                            case "float32":
                                return 4;
                            default:
                                throw new Error(t + " isn't a valid view type")
                        }
                    }, t
                }(),
                Pe = function(t) {
                    function e(e) {
                        var r = t.call(this, e) || this;
                        return r.shaderGenerator = null, r.geometryClass = null, r.vertexSize = null, r.state = Vt.for2d(), r.size = 4 * n.b.SPRITE_BATCH_SIZE, r._vertexCount = 0, r._indexCount = 0, r._bufferedElements = [], r._bufferedTextures = [], r._bufferSize = 0, r._shader = null, r._packedGeometries = [], r._packedGeometryPoolSize = 2, r._flushId = 0, r._aBuffers = {}, r._iBuffers = {}, r.MAX_TEXTURES = 1, r.renderer.on("prerender", r.onPrerender, r), e.runners.contextChange.add(r), r._dcIndex = 0, r._aIndex = 0, r._iIndex = 0, r._attributeBuffer = null, r._indexBuffer = null, r._tempBoundTextures = [], r
                    }
                    return m(e, t), e.prototype.contextChange = function() {
                        var t = this.renderer.gl;
                        n.b.PREFER_ENV === o.g.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), n.b.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = Bt(this.MAX_TEXTURES, t)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
                        for (var i = 0; i < this._packedGeometryPoolSize; i++) this._packedGeometries[i] = new this.geometryClass;
                        this.initFlushBuffers()
                    }, e.prototype.initFlushBuffers = function() {
                        for (var t = e._drawCallPool, r = e._textureArrayPool, n = this.size / 4, o = Math.floor(n / this.MAX_TEXTURES) + 1; t.length < n;) t.push(new Oe);
                        for (; r.length < o;) r.push(new we);
                        for (var i = 0; i < this.MAX_TEXTURES; i++) this._tempBoundTextures[i] = null
                    }, e.prototype.onPrerender = function() {
                        this._flushId = 0
                    }, e.prototype.render = function(element) {
                        element._texture.valid && (this._vertexCount + element.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += element.vertexData.length / 2, this._indexCount += element.indices.length, this._bufferedTextures[this._bufferSize] = element._texture.baseTexture, this._bufferedElements[this._bufferSize++] = element)
                    }, e.prototype.buildTexturesAndDrawCalls = function() {
                        var t = this._bufferedTextures,
                            r = this.MAX_TEXTURES,
                            n = e._textureArrayPool,
                            o = this.renderer.batch,
                            h = this._tempBoundTextures,
                            c = this.renderer.textureGC.count,
                            f = ++R._globalBatch,
                            l = 0,
                            d = n[0],
                            _ = 0;
                        o.copyBoundTextures(h, r);
                        for (var i = 0; i < this._bufferSize; ++i) {
                            var v = t[i];
                            t[i] = null, v._batchEnabled !== f && (d.count >= r && (o.boundArray(d, h, f, r), this.buildDrawCalls(d, _, i), _ = i, d = n[++l], ++f), v._batchEnabled = f, v.touched = c, d.elements[d.count++] = v)
                        }
                        d.count > 0 && (o.boundArray(d, h, f, r), this.buildDrawCalls(d, _, this._bufferSize), ++l, ++f);
                        for (i = 0; i < h.length; i++) h[i] = null;
                        R._globalBatch = f
                    }, e.prototype.buildDrawCalls = function(t, r, n) {
                        var o = this,
                            c = o._bufferedElements,
                            f = o._attributeBuffer,
                            l = o._indexBuffer,
                            d = o.vertexSize,
                            _ = e._drawCallPool,
                            v = this._dcIndex,
                            m = this._aIndex,
                            y = this._iIndex,
                            E = _[v];
                        E.start = this._iIndex, E.texArray = t;
                        for (var i = r; i < n; ++i) {
                            var T = c[i],
                                x = T._texture.baseTexture,
                                R = h.premultiplyBlendMode[x.alphaMode ? 1 : 0][T.blendMode];
                            c[i] = null, r < i && E.blend !== R && (E.size = y - E.start, r = i, (E = _[++v]).texArray = t, E.start = y), this.packInterleavedGeometry(T, f, l, m, y), m += T.vertexData.length / 2 * d, y += T.indices.length, E.blend = R
                        }
                        r < n && (E.size = y - E.start, ++v), this._dcIndex = v, this._aIndex = m, this._iIndex = y
                    }, e.prototype.bindAndClearTexArray = function(t) {
                        for (var e = this.renderer.texture, r = 0; r < t.count; r++) e.bind(t.elements[r], t.ids[r]), t.elements[r] = null;
                        t.count = 0
                    }, e.prototype.updateGeometry = function() {
                        var t = this,
                            e = t._packedGeometries,
                            r = t._attributeBuffer,
                            o = t._indexBuffer;
                        n.b.CAN_UPLOAD_SAME_BUFFER ? (e[this._flushId]._buffer.update(r.rawBinaryData), e[this._flushId]._indexBuffer.update(o), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, e[this._flushId] = new this.geometryClass), e[this._flushId]._buffer.update(r.rawBinaryData), e[this._flushId]._indexBuffer.update(o), this.renderer.geometry.bind(e[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++)
                    }, e.prototype.drawBatches = function() {
                        for (var t = this._dcIndex, r = this.renderer, n = r.gl, o = r.state, h = e._drawCallPool, c = null, i = 0; i < t; i++) {
                            var f = h[i],
                                l = f.texArray,
                                d = f.type,
                                _ = f.size,
                                v = f.start,
                                m = f.blend;
                            c !== l && (c = l, this.bindAndClearTexArray(l)), this.state.blendMode = m, o.set(this.state), n.drawElements(d, _, n.UNSIGNED_SHORT, 2 * v)
                        }
                    }, e.prototype.flush = function() {
                        0 !== this._vertexCount && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0)
                    }, e.prototype.start = function() {
                        this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES), this.renderer.shader.bind(this._shader), n.b.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId])
                    }, e.prototype.stop = function() {
                        this.flush()
                    }, e.prototype.destroy = function() {
                        for (var i = 0; i < this._packedGeometryPoolSize; i++) this._packedGeometries[i] && this._packedGeometries[i].destroy();
                        this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), t.prototype.destroy.call(this)
                    }, e.prototype.getAttributeBuffer = function(t) {
                        var e = Object(h.nextPow2)(Math.ceil(t / 8)),
                            r = Object(h.log2)(e),
                            n = 8 * e;
                        this._aBuffers.length <= r && (this._iBuffers.length = r + 1);
                        var o = this._aBuffers[n];
                        return o || (this._aBuffers[n] = o = new Ce(n * this.vertexSize * 4)), o
                    }, e.prototype.getIndexBuffer = function(t) {
                        var e = Object(h.nextPow2)(Math.ceil(t / 12)),
                            r = Object(h.log2)(e),
                            n = 12 * e;
                        this._iBuffers.length <= r && (this._iBuffers.length = r + 1);
                        var o = this._iBuffers[r];
                        return o || (this._iBuffers[r] = o = new Uint16Array(n)), o
                    }, e.prototype.packInterleavedGeometry = function(element, t, e, r, n) {
                        for (var o = t.uint32View, c = t.float32View, f = r / this.vertexSize, l = element.uvs, d = element.indices, _ = element.vertexData, v = element._texture.baseTexture._batchLocation, m = Math.min(element.worldAlpha, 1), y = m < 1 && element._texture.baseTexture.alphaMode ? Object(h.premultiplyTint)(element._tintRGB, m) : element._tintRGB + (255 * m << 24), i = 0; i < _.length; i += 2) c[r++] = _[i], c[r++] = _[i + 1], c[r++] = l[i], c[r++] = l[i + 1], o[r++] = y, c[r++] = v;
                        for (i = 0; i < d.length; i++) e[n++] = f + d[i]
                    }, e._drawCallPool = [], e._textureArrayPool = [], e
                }(at),
                Le = function() {
                    function t(t, e) {
                        if (this.vertexSrc = t, this.fragTemplate = e, this.programCache = {}, this.defaultGroupCache = {}, e.indexOf("%count%") < 0) throw new Error('Fragment template must contain "%count%".');
                        if (e.indexOf("%forloop%") < 0) throw new Error('Fragment template must contain "%forloop%".')
                    }
                    return t.prototype.generateShader = function(t) {
                        if (!this.programCache[t]) {
                            for (var e = new Int32Array(t), i = 0; i < t; i++) e[i] = i;
                            this.defaultGroupCache[t] = et.from({
                                uSamplers: e
                            }, !0);
                            var r = this.fragTemplate;
                            r = (r = r.replace(/%count%/gi, "" + t)).replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new Ht(this.vertexSrc, r)
                        }
                        var n = {
                            tint: new Float32Array([1, 1, 1, 1]),
                            translationMatrix: new l.d,
                            default: this.defaultGroupCache[t]
                        };
                        return new jt(this.programCache[t], n)
                    }, t.prototype.generateSampleSrc = function(t) {
                        var e = "";
                        e += "\n", e += "\n";
                        for (var i = 0; i < t; i++) i > 0 && (e += "\nelse "), i < t - 1 && (e += "if(vTextureId < " + i + ".5)"), e += "\n{", e += "\n\tcolor = texture2D(uSamplers[" + i + "], vTextureCoord);", e += "\n}";
                        return e += "\n", e += "\n"
                    }, t
                }(),
                Me = function(t) {
                    function e(e) {
                        void 0 === e && (e = !1);
                        var r = t.call(this) || this;
                        return r._buffer = new Y(null, e, !1), r._indexBuffer = new Y(null, e, !0), r.addAttribute("aVertexPosition", r._buffer, 2, !1, o.r.FLOAT).addAttribute("aTextureCoord", r._buffer, 2, !1, o.r.FLOAT).addAttribute("aColor", r._buffer, 4, !0, o.r.UNSIGNED_BYTE).addAttribute("aTextureId", r._buffer, 1, !0, o.r.FLOAT).addIndex(r._indexBuffer), r
                    }
                    return m(e, t), e
                }(J),
                Ue = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n",
                Fe = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n",
                De = function() {
                    function t() {}
                    return t.create = function(t) {
                        var e = Object.assign({
                                vertex: Ue,
                                fragment: Fe,
                                geometryClass: Me,
                                vertexSize: 6
                            }, t),
                            r = e.vertex,
                            n = e.fragment,
                            o = e.vertexSize,
                            h = e.geometryClass;
                        return function(t) {
                            function e(e) {
                                var c = t.call(this, e) || this;
                                return c.shaderGenerator = new Le(r, n), c.geometryClass = h, c.vertexSize = o, c
                            }
                            return m(e, t), e
                        }(Pe)
                    }, Object.defineProperty(t, "defaultVertexSrc", {
                        get: function() {
                            return Ue
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t, "defaultFragmentTemplate", {
                        get: function() {
                            return Fe
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t
                }(),
                Be = De.create(),
                Ge = {},
                ke = function(t) {
                    Object.defineProperty(Ge, t, {
                        get: function() {
                            return Object(h.deprecation)("6.0.0", "PIXI.systems." + t + " has moved to PIXI." + t), M[t]
                        }
                    })
                };
            for (var He in M) ke(He);
            var je = {},
                Ve = function(t) {
                    Object.defineProperty(je, t, {
                        get: function() {
                            return Object(h.deprecation)("6.0.0", "PIXI.resources." + t + " has moved to PIXI." + t), Ee[t]
                        }
                    })
                };
            for (var He in Ee) Ve(He)
        },
        747: function(t, e, r) {
            "use strict";
            r.d(e, "a", (function() {
                return l
            })), r.d(e, "b", (function() {
                return c
            })), r.d(e, "c", (function() {
                return d
            })), r.d(e, "d", (function() {
                return E
            })), r.d(e, "e", (function() {
                return y
            })), r.d(e, "f", (function() {
                return o
            })), r.d(e, "g", (function() {
                return m
            })), r.d(e, "h", (function() {
                return _
            })), r.d(e, "i", (function() {
                return h
            })), r.d(e, "j", (function() {
                return f
            })), r.d(e, "k", (function() {
                return v
            })), r.d(e, "l", (function() {
                return n
            })), r.d(e, "m", (function() {
                return w
            })), r.d(e, "n", (function() {
                return O
            }));
            var n, o = 2 * Math.PI,
                h = 180 / Math.PI,
                c = Math.PI / 180;
            ! function(t) {
                t[t.POLY = 0] = "POLY", t[t.RECT = 1] = "RECT", t[t.CIRC = 2] = "CIRC", t[t.ELIP = 3] = "ELIP", t[t.RREC = 4] = "RREC"
            }(n || (n = {}));
            var f = function() {
                    function t(t, e, r, o) {
                        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === o && (o = 0), this.x = Number(t), this.y = Number(e), this.width = Number(r), this.height = Number(o), this.type = n.RECT
                    }
                    return Object.defineProperty(t.prototype, "left", {
                        get: function() {
                            return this.x
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "right", {
                        get: function() {
                            return this.x + this.width
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "top", {
                        get: function() {
                            return this.y
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "bottom", {
                        get: function() {
                            return this.y + this.height
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t, "EMPTY", {
                        get: function() {
                            return new t(0, 0, 0, 0)
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.clone = function() {
                        return new t(this.x, this.y, this.width, this.height)
                    }, t.prototype.copyFrom = function(t) {
                        return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
                    }, t.prototype.copyTo = function(t) {
                        return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t
                    }, t.prototype.contains = function(t, e) {
                        return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height)
                    }, t.prototype.pad = function(t, e) {
                        return void 0 === t && (t = 0), void 0 === e && (e = t), this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e, this
                    }, t.prototype.fit = function(t) {
                        var e = Math.max(this.x, t.x),
                            r = Math.min(this.x + this.width, t.x + t.width),
                            n = Math.max(this.y, t.y),
                            o = Math.min(this.y + this.height, t.y + t.height);
                        return this.x = e, this.width = Math.max(r - e, 0), this.y = n, this.height = Math.max(o - n, 0), this
                    }, t.prototype.ceil = function(t, e) {
                        void 0 === t && (t = 1), void 0 === e && (e = .001);
                        var r = Math.ceil((this.x + this.width - e) * t) / t,
                            n = Math.ceil((this.y + this.height - e) * t) / t;
                        return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = r - this.x, this.height = n - this.y, this
                    }, t.prototype.enlarge = function(t) {
                        var e = Math.min(this.x, t.x),
                            r = Math.max(this.x + this.width, t.x + t.width),
                            n = Math.min(this.y, t.y),
                            o = Math.max(this.y + this.height, t.y + t.height);
                        return this.x = e, this.width = r - e, this.y = n, this.height = o - n, this
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]"
                    }, t
                }(),
                l = function() {
                    function t(t, e, r) {
                        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), this.x = t, this.y = e, this.radius = r, this.type = n.CIRC
                    }
                    return t.prototype.clone = function() {
                        return new t(this.x, this.y, this.radius)
                    }, t.prototype.contains = function(t, e) {
                        if (this.radius <= 0) return !1;
                        var r = this.radius * this.radius,
                            n = this.x - t,
                            o = this.y - e;
                        return (n *= n) + (o *= o) <= r
                    }, t.prototype.getBounds = function() {
                        return new f(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]"
                    }, t
                }(),
                d = function() {
                    function t(t, e, r, o) {
                        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === o && (o = 0), this.x = t, this.y = e, this.width = r, this.height = o, this.type = n.ELIP
                    }
                    return t.prototype.clone = function() {
                        return new t(this.x, this.y, this.width, this.height)
                    }, t.prototype.contains = function(t, e) {
                        if (this.width <= 0 || this.height <= 0) return !1;
                        var r = (t - this.x) / this.width,
                            n = (e - this.y) / this.height;
                        return (r *= r) + (n *= n) <= 1
                    }, t.prototype.getBounds = function() {
                        return new f(this.x - this.width, this.y - this.height, this.width, this.height)
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]"
                    }, t
                }(),
                _ = function() {
                    function t() {
                        for (var t = arguments, e = [], r = 0; r < arguments.length; r++) e[r] = t[r];
                        var o = Array.isArray(e[0]) ? e[0] : e;
                        if ("number" != typeof o[0]) {
                            for (var p = [], i = 0, h = o.length; i < h; i++) p.push(o[i].x, o[i].y);
                            o = p
                        }
                        this.points = o, this.type = n.POLY, this.closeStroke = !0
                    }
                    return t.prototype.clone = function() {
                        var polygon = new t(this.points.slice());
                        return polygon.closeStroke = this.closeStroke, polygon
                    }, t.prototype.contains = function(t, e) {
                        for (var r = !1, n = this.points.length / 2, i = 0, o = n - 1; i < n; o = i++) {
                            var h = this.points[2 * i],
                                c = this.points[2 * i + 1],
                                f = this.points[2 * o],
                                l = this.points[2 * o + 1];
                            c > e != l > e && t < (e - c) / (l - c) * (f - h) + h && (r = !r)
                        }
                        return r
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:PolygoncloseStroke=" + this.closeStroke + "points=" + this.points.reduce((function(t, e) {
                            return t + ", " + e
                        }), "") + "]"
                    }, t
                }(),
                v = function() {
                    function t(t, e, r, o, h) {
                        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === o && (o = 0), void 0 === h && (h = 20), this.x = t, this.y = e, this.width = r, this.height = o, this.radius = h, this.type = n.RREC
                    }
                    return t.prototype.clone = function() {
                        return new t(this.x, this.y, this.width, this.height, this.radius)
                    }, t.prototype.contains = function(t, e) {
                        if (this.width <= 0 || this.height <= 0) return !1;
                        if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
                            var r = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
                            if (e >= this.y + r && e <= this.y + this.height - r || t >= this.x + r && t <= this.x + this.width - r) return !0;
                            var n = t - (this.x + r),
                                o = e - (this.y + r),
                                h = r * r;
                            if (n * n + o * o <= h) return !0;
                            if ((n = t - (this.x + this.width - r)) * n + o * o <= h) return !0;
                            if (n * n + (o = e - (this.y + this.height - r)) * o <= h) return !0;
                            if ((n = t - (this.x + r)) * n + o * o <= h) return !0
                        }
                        return !1
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y + "width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]"
                    }, t
                }(),
                m = function() {
                    function t(t, e) {
                        void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = 0, this.y = 0, this.x = t, this.y = e
                    }
                    return t.prototype.clone = function() {
                        return new t(this.x, this.y)
                    }, t.prototype.copyFrom = function(p) {
                        return this.set(p.x, p.y), this
                    }, t.prototype.copyTo = function(p) {
                        return p.set(this.x, this.y), p
                    }, t.prototype.equals = function(p) {
                        return p.x === this.x && p.y === this.y
                    }, t.prototype.set = function(t, e) {
                        return void 0 === t && (t = 0), void 0 === e && (e = t), this.x = t, this.y = e, this
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]"
                    }, t
                }(),
                y = function() {
                    function t(t, e, r, n) {
                        void 0 === r && (r = 0), void 0 === n && (n = 0), this._x = r, this._y = n, this.cb = t, this.scope = e
                    }
                    return t.prototype.clone = function(e, r) {
                        return void 0 === e && (e = this.cb), void 0 === r && (r = this.scope), new t(e, r, this._x, this._y)
                    }, t.prototype.set = function(t, e) {
                        return void 0 === t && (t = 0), void 0 === e && (e = t), this._x === t && this._y === e || (this._x = t, this._y = e, this.cb.call(this.scope)), this
                    }, t.prototype.copyFrom = function(p) {
                        return this._x === p.x && this._y === p.y || (this._x = p.x, this._y = p.y, this.cb.call(this.scope)), this
                    }, t.prototype.copyTo = function(p) {
                        return p.set(this._x, this._y), p
                    }, t.prototype.equals = function(p) {
                        return p.x === this._x && p.y === this._y
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:ObservablePoint x=0 y=0 scope=" + this.scope + "]"
                    }, Object.defineProperty(t.prototype, "x", {
                        get: function() {
                            return this._x
                        },
                        set: function(t) {
                            this._x !== t && (this._x = t, this.cb.call(this.scope))
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "y", {
                        get: function() {
                            return this._y
                        },
                        set: function(t) {
                            this._y !== t && (this._y = t, this.cb.call(this.scope))
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t
                }(),
                E = function() {
                    function t(a, b, t, e, r, n) {
                        void 0 === a && (a = 1), void 0 === b && (b = 0), void 0 === t && (t = 0), void 0 === e && (e = 1), void 0 === r && (r = 0), void 0 === n && (n = 0), this.array = null, this.a = a, this.b = b, this.c = t, this.d = e, this.tx = r, this.ty = n
                    }
                    return t.prototype.fromArray = function(t) {
                        this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5]
                    }, t.prototype.set = function(a, b, t, e, r, n) {
                        return this.a = a, this.b = b, this.c = t, this.d = e, this.tx = r, this.ty = n, this
                    }, t.prototype.toArray = function(t, e) {
                        this.array || (this.array = new Float32Array(9));
                        var r = e || this.array;
                        return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r
                    }, t.prototype.apply = function(t, e) {
                        e = e || new m;
                        var r = t.x,
                            n = t.y;
                        return e.x = this.a * r + this.c * n + this.tx, e.y = this.b * r + this.d * n + this.ty, e
                    }, t.prototype.applyInverse = function(t, e) {
                        e = e || new m;
                        var r = 1 / (this.a * this.d + this.c * -this.b),
                            n = t.x,
                            o = t.y;
                        return e.x = this.d * r * n + -this.c * r * o + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * o + -this.b * r * n + (-this.ty * this.a + this.tx * this.b) * r, e
                    }, t.prototype.translate = function(t, e) {
                        return this.tx += t, this.ty += e, this
                    }, t.prototype.scale = function(t, e) {
                        return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this
                    }, t.prototype.rotate = function(t) {
                        var e = Math.cos(t),
                            r = Math.sin(t),
                            n = this.a,
                            o = this.c,
                            h = this.tx;
                        return this.a = n * e - this.b * r, this.b = n * r + this.b * e, this.c = o * e - this.d * r, this.d = o * r + this.d * e, this.tx = h * e - this.ty * r, this.ty = h * r + this.ty * e, this
                    }, t.prototype.append = function(t) {
                        var e = this.a,
                            r = this.b,
                            n = this.c,
                            o = this.d;
                        return this.a = t.a * e + t.b * n, this.b = t.a * r + t.b * o, this.c = t.c * e + t.d * n, this.d = t.c * r + t.d * o, this.tx = t.tx * e + t.ty * n + this.tx, this.ty = t.tx * r + t.ty * o + this.ty, this
                    }, t.prototype.setTransform = function(t, e, r, n, o, h, c, f, l) {
                        return this.a = Math.cos(c + l) * o, this.b = Math.sin(c + l) * o, this.c = -Math.sin(c - f) * h, this.d = Math.cos(c - f) * h, this.tx = t - (r * this.a + n * this.c), this.ty = e - (r * this.b + n * this.d), this
                    }, t.prototype.prepend = function(t) {
                        var e = this.tx;
                        if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                            var r = this.a,
                                n = this.c;
                            this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = n * t.a + this.d * t.c, this.d = n * t.b + this.d * t.d
                        }
                        return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this
                    }, t.prototype.decompose = function(t) {
                        var a = this.a,
                            b = this.b,
                            e = this.c,
                            r = this.d,
                            n = t.pivot,
                            h = -Math.atan2(-e, r),
                            c = Math.atan2(b, a),
                            f = Math.abs(h + c);
                        return f < 1e-5 || Math.abs(o - f) < 1e-5 ? (t.rotation = c, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = h, t.skew.y = c), t.scale.x = Math.sqrt(a * a + b * b), t.scale.y = Math.sqrt(e * e + r * r), t.position.x = this.tx + (n.x * a + n.y * e), t.position.y = this.ty + (n.x * b + n.y * r), t
                    }, t.prototype.invert = function() {
                        var t = this.a,
                            e = this.b,
                            r = this.c,
                            n = this.d,
                            o = this.tx,
                            h = t * n - e * r;
                        return this.a = n / h, this.b = -e / h, this.c = -r / h, this.d = t / h, this.tx = (r * this.ty - n * o) / h, this.ty = -(t * this.ty - e * o) / h, this
                    }, t.prototype.identity = function() {
                        return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
                    }, t.prototype.clone = function() {
                        var e = new t;
                        return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e
                    }, t.prototype.copyTo = function(t) {
                        return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
                    }, t.prototype.copyFrom = function(t) {
                        return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]"
                    }, Object.defineProperty(t, "IDENTITY", {
                        get: function() {
                            return new t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t, "TEMP_MATRIX", {
                        get: function() {
                            return new t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t
                }(),
                T = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
                x = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
                R = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
                I = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
                A = [],
                N = [],
                S = Math.sign;
            ! function() {
                for (var i = 0; i < 16; i++) {
                    var t = [];
                    A.push(t);
                    for (var e = 0; e < 16; e++)
                        for (var r = S(T[i] * T[e] + R[i] * x[e]), n = S(x[i] * T[e] + I[i] * x[e]), o = S(T[i] * R[e] + R[i] * I[e]), h = S(x[i] * R[e] + I[i] * I[e]), c = 0; c < 16; c++)
                            if (T[c] === r && x[c] === n && R[c] === o && I[c] === h) {
                                t.push(c);
                                break
                            }
                }
                for (i = 0; i < 16; i++) {
                    var f = new E;
                    f.set(T[i], x[i], R[i], I[i], 0, 0), N.push(f)
                }
            }();
            var O = {
                    E: 0,
                    SE: 1,
                    S: 2,
                    SW: 3,
                    W: 4,
                    NW: 5,
                    N: 6,
                    NE: 7,
                    MIRROR_VERTICAL: 8,
                    MAIN_DIAGONAL: 10,
                    MIRROR_HORIZONTAL: 12,
                    REVERSE_DIAGONAL: 14,
                    uX: function(t) {
                        return T[t]
                    },
                    uY: function(t) {
                        return x[t]
                    },
                    vX: function(t) {
                        return R[t]
                    },
                    vY: function(t) {
                        return I[t]
                    },
                    inv: function(t) {
                        return 8 & t ? 15 & t : 7 & -t
                    },
                    add: function(t, e) {
                        return A[t][e]
                    },
                    sub: function(t, e) {
                        return A[t][O.inv(e)]
                    },
                    rotate180: function(t) {
                        return 4 ^ t
                    },
                    isVertical: function(t) {
                        return 2 == (3 & t)
                    },
                    byDirection: function(t, e) {
                        return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? O.S : O.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? O.E : O.W : e > 0 ? t > 0 ? O.SE : O.SW : t > 0 ? O.NE : O.NW
                    },
                    matrixAppendRotationInv: function(t, e, r, n) {
                        void 0 === r && (r = 0), void 0 === n && (n = 0);
                        var o = N[O.inv(e)];
                        o.tx = r, o.ty = n, t.append(o)
                    }
                },
                w = function() {
                    function t() {
                        this.worldTransform = new E, this.localTransform = new E, this.position = new y(this.onChange, this, 0, 0), this.scale = new y(this.onChange, this, 1, 1), this.pivot = new y(this.onChange, this, 0, 0), this.skew = new y(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0
                    }
                    return t.prototype.onChange = function() {
                        this._localID++
                    }, t.prototype.updateSkew = function() {
                        this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++
                    }, t.prototype.toString = function() {
                        return "[@pixi/math:Transform position=(" + this.position.x + ", " + this.position.y + ") rotation=" + this.rotation + " scale=(" + this.scale.x + ", " + this.scale.y + ") skew=(" + this.skew.x + ", " + this.skew.y + ") ]"
                    }, t.prototype.updateLocalTransform = function() {
                        var t = this.localTransform;
                        this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1)
                    }, t.prototype.updateTransform = function(t) {
                        var e = this.localTransform;
                        if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== t._worldID) {
                            var r = t.worldTransform,
                                n = this.worldTransform;
                            n.a = e.a * r.a + e.b * r.c, n.b = e.a * r.b + e.b * r.d, n.c = e.c * r.a + e.d * r.c, n.d = e.c * r.b + e.d * r.d, n.tx = e.tx * r.a + e.ty * r.c + r.tx, n.ty = e.tx * r.b + e.ty * r.d + r.ty, this._parentID = t._worldID, this._worldID++
                        }
                    }, t.prototype.setFromMatrix = function(t) {
                        t.decompose(this), this._localID++
                    }, Object.defineProperty(t.prototype, "rotation", {
                        get: function() {
                            return this._rotation
                        },
                        set: function(t) {
                            this._rotation !== t && (this._rotation = t, this.updateSkew())
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.IDENTITY = new t, t
                }()
        },
        748: function(t, e, r) {
            "use strict";
            r.r(e), r.d(e, "BaseTextureCache", (function() {
                return W
            })), r.d(e, "CanvasRenderTarget", (function() {
                return J
            })), r.d(e, "DATA_URI", (function() {
                return tt
            })), r.d(e, "ProgramCache", (function() {
                return z
            })), r.d(e, "TextureCache", (function() {
                return Y
            })), r.d(e, "clearTextureCache", (function() {
                return K
            })), r.d(e, "correctBlendMode", (function() {
                return O
            })), r.d(e, "createIndicesForQuads", (function() {
                return L
            })), r.d(e, "decomposeDataUri", (function() {
                return et
            })), r.d(e, "deprecation", (function() {
                return X
            })), r.d(e, "destroyTextureCache", (function() {
                return Z
            })), r.d(e, "determineCrossOrigin", (function() {
                return it
            })), r.d(e, "getBufferType", (function() {
                return M
            })), r.d(e, "getResolutionOfUrl", (function() {
                return nt
            })), r.d(e, "hex2rgb", (function() {
                return R
            })), r.d(e, "hex2string", (function() {
                return I
            })), r.d(e, "interleaveTypedArrays", (function() {
                return U
            })), r.d(e, "isPow2", (function() {
                return D
            })), r.d(e, "isWebGLSupported", (function() {
                return T
            })), r.d(e, "log2", (function() {
                return B
            })), r.d(e, "nextPow2", (function() {
                return F
            })), r.d(e, "premultiplyBlendMode", (function() {
                return S
            })), r.d(e, "premultiplyRgba", (function() {
                return w
            })), r.d(e, "premultiplyTint", (function() {
                return C
            })), r.d(e, "premultiplyTintToRgba", (function() {
                return P
            })), r.d(e, "removeItems", (function() {
                return G
            })), r.d(e, "rgb2hex", (function() {
                return N
            })), r.d(e, "sayHello", (function() {
                return E
            })), r.d(e, "sign", (function() {
                return k
            })), r.d(e, "skipHello", (function() {
                return y
            })), r.d(e, "string2hex", (function() {
                return A
            })), r.d(e, "trimCanvas", (function() {
                return $
            })), r.d(e, "uid", (function() {
                return j
            })), r.d(e, "url", (function() {
                return _
            }));
            var n = r(752);
            r.d(e, "isMobile", (function() {
                return n.a
            }));
            var o = r(889),
                h = r.n(o);
            r.d(e, "EventEmitter", (function() {
                return h.a
            }));
            var c = r(890),
                f = r.n(c);
            r.d(e, "earcut", (function() {
                return f.a
            }));
            var l = r(1042),
                d = r(756),
                _ = {
                    parse: l.parse,
                    format: l.format,
                    resolve: l.resolve
                };
            n.b.RETINA_PREFIX = /@([0-9\.]+)x/, n.b.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
            var v, m = !1;

            function y() {
                m = !0
            }

            function E(t) {
                var e;
                if (!m) {
                    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                        var r = ["\n %c %c %c PixiJS 6.2.2 - ✰ " + t + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                        (e = self.console).log.apply(e, r)
                    } else self.console && self.console.log("PixiJS 6.2.2 - " + t + " - http://www.pixijs.com/");
                    m = !0
                }
            }

            function T() {
                return void 0 === v && (v = function() {
                    var t = {
                        stencil: !0,
                        failIfMajorPerformanceCaveat: n.b.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
                    };
                    try {
                        if (!self.WebGLRenderingContext) return !1;
                        var canvas = document.createElement("canvas"),
                            e = canvas.getContext("webgl", t) || canvas.getContext("experimental-webgl", t),
                            r = !(!e || !e.getContextAttributes().stencil);
                        if (e) {
                            var o = e.getExtension("WEBGL_lose_context");
                            o && o.loseContext()
                        }
                        return e = null, r
                    } catch (t) {
                        return !1
                    }
                }()), v
            }
            var x = {
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                black: "#000000",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgreen: "#006400",
                darkgrey: "#a9a9a9",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkslategrey: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1e90ff",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                goldenrod: "#daa520",
                gold: "#ffd700",
                gray: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                grey: "#808080",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavenderblush: "#fff0f5",
                lavender: "#e6e6fa",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgray: "#d3d3d3",
                lightgreen: "#90ee90",
                lightgrey: "#d3d3d3",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370db",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#db7093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                rebeccapurple: "#663399",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                wheat: "#f5deb3",
                white: "#ffffff",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32"
            };

            function R(t, e) {
                return void 0 === e && (e = []), e[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e
            }

            function I(t) {
                var e = t.toString(16);
                return "#" + (e = "000000".substr(0, 6 - e.length) + e)
            }

            function A(t) {
                return "string" == typeof t && "#" === (t = x[t.toLowerCase()] || t)[0] && (t = t.substr(1)), parseInt(t, 16)
            }

            function N(t) {
                return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0)
            }
            var S = function() {
                for (var t = [], e = [], i = 0; i < 32; i++) t[i] = i, e[i] = i;
                t[d.b.NORMAL_NPM] = d.b.NORMAL, t[d.b.ADD_NPM] = d.b.ADD, t[d.b.SCREEN_NPM] = d.b.SCREEN, e[d.b.NORMAL] = d.b.NORMAL_NPM, e[d.b.ADD] = d.b.ADD_NPM, e[d.b.SCREEN] = d.b.SCREEN_NPM;
                var r = [];
                return r.push(e), r.push(t), r
            }();

            function O(t, e) {
                return S[e ? 1 : 0][t]
            }

            function w(t, e, r, n) {
                return r = r || new Float32Array(4), n || void 0 === n ? (r[0] = t[0] * e, r[1] = t[1] * e, r[2] = t[2] * e) : (r[0] = t[0], r[1] = t[1], r[2] = t[2]), r[3] = e, r
            }

            function C(t, e) {
                if (1 === e) return (255 * e << 24) + t;
                if (0 === e) return 0;
                var r = t >> 16 & 255,
                    n = t >> 8 & 255,
                    o = 255 & t;
                return (255 * e << 24) + ((r = r * e + .5 | 0) << 16) + ((n = n * e + .5 | 0) << 8) + (o = o * e + .5 | 0)
            }

            function P(t, e, r, n) {
                return (r = r || new Float32Array(4))[0] = (t >> 16 & 255) / 255, r[1] = (t >> 8 & 255) / 255, r[2] = (255 & t) / 255, (n || void 0 === n) && (r[0] *= e, r[1] *= e, r[2] *= e), r[3] = e, r
            }

            function L(t, e) {
                void 0 === e && (e = null);
                var r = 6 * t;
                if ((e = e || new Uint16Array(r)).length !== r) throw new Error("Out buffer length is incorrect, got " + e.length + " and expected " + r);
                for (var i = 0, n = 0; i < r; i += 6, n += 4) e[i + 0] = n + 0, e[i + 1] = n + 1, e[i + 2] = n + 2, e[i + 3] = n + 0, e[i + 4] = n + 2, e[i + 5] = n + 3;
                return e
            }

            function M(t) {
                if (4 === t.BYTES_PER_ELEMENT) return t instanceof Float32Array ? "Float32Array" : t instanceof Uint32Array ? "Uint32Array" : "Int32Array";
                if (2 === t.BYTES_PER_ELEMENT) {
                    if (t instanceof Uint16Array) return "Uint16Array"
                } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array) return "Uint8Array";
                return null
            }
            var map = {
                Float32Array: Float32Array,
                Uint32Array: Uint32Array,
                Int32Array: Int32Array,
                Uint8Array: Uint8Array
            };

            function U(t, e) {
                for (var r = 0, n = 0, o = {}, i = 0; i < t.length; i++) n += e[i], r += t[i].length;
                var h = new ArrayBuffer(4 * r),
                    c = null,
                    f = 0;
                for (i = 0; i < t.length; i++) {
                    var l = e[i],
                        d = t[i],
                        _ = M(d);
                    o[_] || (o[_] = new map[_](h)), c = o[_];
                    for (var v = 0; v < d.length; v++) {
                        c[(v / l | 0) * n + f + v % l] = d[v]
                    }
                    f += l
                }
                return new Float32Array(h)
            }

            function F(t) {
                return t += 0 === t ? 1 : 0, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, (t |= t >>> 16) + 1
            }

            function D(t) {
                return !(t & t - 1 || !t)
            }

            function B(t) {
                var e = (t > 65535 ? 1 : 0) << 4,
                    r = ((t >>>= e) > 255 ? 1 : 0) << 3;
                return e |= r, e |= r = ((t >>>= r) > 15 ? 1 : 0) << 2, (e |= r = ((t >>>= r) > 3 ? 1 : 0) << 1) | (t >>>= r) >> 1
            }

            function G(t, e, r) {
                var i, n = t.length;
                if (!(e >= n || 0 === r)) {
                    var o = n - (r = e + r > n ? n - e : r);
                    for (i = e; i < o; ++i) t[i] = t[i + r];
                    t.length = o
                }
            }

            function k(t) {
                return 0 === t ? 0 : t < 0 ? -1 : 1
            }
            var H = 0;

            function j() {
                return ++H
            }
            var V = {};

            function X(t, e, r) {
                if (void 0 === r && (r = 3), !V[e]) {
                    var n = (new Error).stack;
                    void 0 === n ? console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t) : (n = n.split("\n").splice(r).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e + "\nDeprecated since v" + t), console.warn(n), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t), console.warn(n))), V[e] = !0
                }
            }
            var z = {},
                Y = Object.create(null),
                W = Object.create(null);

            function Z() {
                var t;
                for (t in Y) Y[t].destroy();
                for (t in W) W[t].destroy()
            }

            function K() {
                var t;
                for (t in Y) delete Y[t];
                for (t in W) delete W[t]
            }
            var J = function() {
                function t(t, e, r) {
                    this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = r || n.b.RESOLUTION, this.resize(t, e)
                }
                return t.prototype.clear = function() {
                    this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                }, t.prototype.resize = function(t, e) {
                    this.canvas.width = Math.round(t * this.resolution), this.canvas.height = Math.round(e * this.resolution)
                }, t.prototype.destroy = function() {
                    this.context = null, this.canvas = null
                }, Object.defineProperty(t.prototype, "width", {
                    get: function() {
                        return this.canvas.width
                    },
                    set: function(t) {
                        this.canvas.width = Math.round(t)
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "height", {
                    get: function() {
                        return this.canvas.height
                    },
                    set: function(t) {
                        this.canvas.height = Math.round(t)
                    },
                    enumerable: !1,
                    configurable: !0
                }), t
            }();

            function $(canvas) {
                var i, t, e, r = canvas.width,
                    n = canvas.height,
                    o = canvas.getContext("2d"),
                    h = o.getImageData(0, 0, r, n).data,
                    c = h.length,
                    f = {
                        top: null,
                        left: null,
                        right: null,
                        bottom: null
                    },
                    data = null;
                for (i = 0; i < c; i += 4) 0 !== h[i + 3] && (t = i / 4 % r, e = ~~(i / 4 / r), null === f.top && (f.top = e), (null === f.left || t < f.left) && (f.left = t), (null === f.right || f.right < t) && (f.right = t + 1), (null === f.bottom || f.bottom < e) && (f.bottom = e));
                return null !== f.top && (r = f.right - f.left, n = f.bottom - f.top + 1, data = o.getImageData(f.left, f.top, r, n)), {
                    height: n,
                    width: r,
                    data: data
                }
            }
            var Q, tt = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;

            function et(t) {
                var e = tt.exec(t);
                if (e) return {
                    mediaType: e[1] ? e[1].toLowerCase() : void 0,
                    subType: e[2] ? e[2].toLowerCase() : void 0,
                    charset: e[3] ? e[3].toLowerCase() : void 0,
                    encoding: e[4] ? e[4].toLowerCase() : void 0,
                    data: e[5]
                }
            }

            function it(t, e) {
                if (void 0 === e && (e = self.location), 0 === t.indexOf("data:")) return "";
                e = e || self.location, Q || (Q = document.createElement("a")), Q.href = t;
                var r = _.parse(Q.href),
                    n = !r.port && "" === e.port || r.port === e.port;
                return r.hostname === e.hostname && n && r.protocol === e.protocol ? "" : "anonymous"
            }

            function nt(t, e) {
                var r = n.b.RETINA_PREFIX.exec(t);
                return r ? parseFloat(r[1]) : void 0 !== e ? e : 1
            }
        },
        752: function(t, e, r) {
            "use strict";
            r.d(e, "a", (function() {
                return z
            })), r.d(e, "b", (function() {
                return Y
            }));
            var n = /iPhone/i,
                o = /iPod/i,
                h = /iPad/i,
                c = /\biOS-universal(?:.+)Mac\b/i,
                f = /\bAndroid(?:.+)Mobile\b/i,
                l = /Android/i,
                d = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
                _ = /Silk/i,
                v = /Windows Phone/i,
                m = /\bWindows(?:.+)ARM\b/i,
                y = /BlackBerry/i,
                E = /BB10/i,
                T = /Opera Mini/i,
                x = /\b(CriOS|Chrome)(?:.+)Mobile/i,
                R = /Mobile(?:.+)Firefox\b/i,
                I = function(t) {
                    return void 0 !== t && "MacIntel" === t.platform && "number" == typeof t.maxTouchPoints && t.maxTouchPoints > 1 && "undefined" == typeof MSStream
                };
            var A, N, S, O, w, C, P, L, M, U, F, D, B, G, k, H, j, V, X, z = function(param) {
                var nav = {
                    userAgent: "",
                    platform: "",
                    maxTouchPoints: 0
                };
                param || "undefined" == typeof navigator ? "string" == typeof param ? nav.userAgent = param : param && param.userAgent && (nav = {
                    userAgent: param.userAgent,
                    platform: param.platform,
                    maxTouchPoints: param.maxTouchPoints || 0
                }) : nav = {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    maxTouchPoints: navigator.maxTouchPoints || 0
                };
                var t = nav.userAgent,
                    e = t.split("[FBAN");
                void 0 !== e[1] && (t = e[0]), void 0 !== (e = t.split("Twitter"))[1] && (t = e[0]);
                var r = function(t) {
                        return function(e) {
                            return e.test(t)
                        }
                    }(t),
                    A = {
                        apple: {
                            phone: r(n) && !r(v),
                            ipod: r(o),
                            tablet: !r(n) && (r(h) || I(nav)) && !r(v),
                            universal: r(c),
                            device: (r(n) || r(o) || r(h) || r(c) || I(nav)) && !r(v)
                        },
                        amazon: {
                            phone: r(d),
                            tablet: !r(d) && r(_),
                            device: r(d) || r(_)
                        },
                        android: {
                            phone: !r(v) && r(d) || !r(v) && r(f),
                            tablet: !r(v) && !r(d) && !r(f) && (r(_) || r(l)),
                            device: !r(v) && (r(d) || r(_) || r(f) || r(l)) || r(/\bokhttp\b/i)
                        },
                        windows: {
                            phone: r(v),
                            tablet: r(m),
                            device: r(v) || r(m)
                        },
                        other: {
                            blackberry: r(y),
                            blackberry10: r(E),
                            opera: r(T),
                            firefox: r(R),
                            chrome: r(x),
                            device: r(y) || r(E) || r(T) || r(R) || r(x)
                        },
                        any: !1,
                        phone: !1,
                        tablet: !1
                    };
                return A.any = A.apple.device || A.android.device || A.windows.device || A.other.device, A.phone = A.apple.phone || A.android.phone || A.windows.phone, A.tablet = A.apple.tablet || A.android.tablet || A.windows.tablet, A
            }(self.navigator);
            ! function(t) {
                t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2"
            }(A || (A = {})),
            function(t) {
                t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS"
            }(N || (N = {})),
            function(t) {
                t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL"
            }(S || (S = {})),
            function(t) {
                t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR"
            }(O || (O = {})),
            function(t) {
                t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
            }(w || (w = {})),
            function(t) {
                t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
            }(C || (C = {})),
            function(t) {
                t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
            }(P || (P = {})),
            function(t) {
                t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT"
            }(L || (L = {})),
            function(t) {
                t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT"
            }(M || (M = {})),
            function(t) {
                t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR"
            }(U || (U = {})),
            function(t) {
                t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
            }(F || (F = {})),
            function(t) {
                t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL"
            }(D || (D = {})),
            function(t) {
                t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA"
            }(B || (B = {})),
            function(t) {
                t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT"
            }(G || (G = {})),
            function(t) {
                t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL"
            }(k || (k = {})),
            function(t) {
                t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp"
            }(H || (H = {})),
            function(t) {
                t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE"
            }(j || (j = {})),
            function(t) {
                t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH"
            }(V || (V = {})),
            function(t) {
                t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER"
            }(X || (X = {}));
            var Y = {
                MIPMAP_TEXTURES: D.POW2,
                ANISOTROPIC_LEVEL: 0,
                RESOLUTION: 1,
                FILTER_RESOLUTION: 1,
                FILTER_MULTISAMPLE: V.NONE,
                SPRITE_MAX_TEXTURES: function(t) {
                    var e = !0;
                    if (z.tablet || z.phone) {
                        var r;
                        if (z.apple.device)
                            if (r = navigator.userAgent.match(/OS (\d+)_(\d+)?/)) parseInt(r[1], 10) < 11 && (e = !1);
                        if (z.android.device)
                            if (r = navigator.userAgent.match(/Android\s([0-9.]*)/)) parseInt(r[1], 10) < 7 && (e = !1)
                    }
                    return e ? t : 4
                }(32),
                SPRITE_BATCH_SIZE: 4096,
                RENDER_OPTIONS: {
                    view: null,
                    antialias: !1,
                    autoDensity: !1,
                    backgroundColor: 0,
                    backgroundAlpha: 1,
                    useContextAlpha: !0,
                    clearBeforeRender: !0,
                    preserveDrawingBuffer: !1,
                    width: 800,
                    height: 600,
                    legacy: !1
                },
                GC_MODE: k.AUTO,
                GC_MAX_IDLE: 3600,
                GC_MAX_CHECK_COUNT: 600,
                WRAP_MODE: F.CLAMP,
                SCALE_MODE: U.LINEAR,
                PRECISION_VERTEX: H.HIGH,
                PRECISION_FRAGMENT: z.apple.device ? H.HIGH : H.MEDIUM,
                CAN_UPLOAD_SAME_BUFFER: !z.apple.device,
                CREATE_IMAGE_BITMAP: !1,
                ROUND_PIXELS: !1
            }
        },
        756: function(t, e, r) {
            "use strict";
            var n, o, h, c, f, l, d, _, v, m, y, E, T, x, R, I, A, N, S;
            r.d(e, "a", (function() {
                    return T
                })), r.d(e, "b", (function() {
                    return c
                })), r.d(e, "c", (function() {
                    return h
                })), r.d(e, "d", (function() {
                    return S
                })), r.d(e, "e", (function() {
                    return x
                })), r.d(e, "f", (function() {
                    return f
                })), r.d(e, "g", (function() {
                    return n
                })), r.d(e, "h", (function() {
                    return l
                })), r.d(e, "i", (function() {
                    return R
                })), r.d(e, "j", (function() {
                    return A
                })), r.d(e, "k", (function() {
                    return E
                })), r.d(e, "l", (function() {
                    return N
                })), r.d(e, "m", (function() {
                    return I
                })), r.d(e, "n", (function() {
                    return o
                })), r.d(e, "o", (function() {
                    return v
                })), r.d(e, "p", (function() {
                    return m
                })), r.d(e, "q", (function() {
                    return d
                })), r.d(e, "r", (function() {
                    return _
                })), r.d(e, "s", (function() {
                    return y
                })),
                function(t) {
                    t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2"
                }(n || (n = {})),
                function(t) {
                    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS"
                }(o || (o = {})),
                function(t) {
                    t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL"
                }(h || (h = {})),
                function(t) {
                    t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR"
                }(c || (c = {})),
                function(t) {
                    t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
                }(f || (f = {})),
                function(t) {
                    t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
                }(l || (l = {})),
                function(t) {
                    t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
                }(d || (d = {})),
                function(t) {
                    t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT"
                }(_ || (_ = {})),
                function(t) {
                    t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT"
                }(v || (v = {})),
                function(t) {
                    t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR"
                }(m || (m = {})),
                function(t) {
                    t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
                }(y || (y = {})),
                function(t) {
                    t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL"
                }(E || (E = {})),
                function(t) {
                    t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA"
                }(T || (T = {})),
                function(t) {
                    t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT"
                }(x || (x = {})),
                function(t) {
                    t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL"
                }(R || (R = {})),
                function(t) {
                    t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp"
                }(I || (I = {})),
                function(t) {
                    t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE"
                }(A || (A = {})),
                function(t) {
                    t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH"
                }(N || (N = {})),
                function(t) {
                    t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER"
                }(S || (S = {}))
        },
        759: function(t, e, r) {
            "use strict";
            r.d(e, "a", (function() {
                return c
            })), r.d(e, "b", (function() {
                return f
            })), r.d(e, "c", (function() {
                return n
            }));
            var n, o = r(752);
            o.b.TARGET_FPMS = .06,
                function(t) {
                    t[t.INTERACTION = 50] = "INTERACTION", t[t.HIGH = 25] = "HIGH", t[t.NORMAL = 0] = "NORMAL", t[t.LOW = -25] = "LOW", t[t.UTILITY = -50] = "UTILITY"
                }(n || (n = {}));
            var h = function() {
                    function t(t, e, r, n) {
                        void 0 === e && (e = null), void 0 === r && (r = 0), void 0 === n && (n = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = t, this.context = e, this.priority = r, this.once = n
                    }
                    return t.prototype.match = function(t, e) {
                        return void 0 === e && (e = null), this.fn === t && this.context === e
                    }, t.prototype.emit = function(t) {
                        this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
                        var e = this.next;
                        return this.once && this.destroy(!0), this._destroyed && (this.next = null), e
                    }, t.prototype.connect = function(t) {
                        this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this
                    }, t.prototype.destroy = function(t) {
                        void 0 === t && (t = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
                        var e = this.next;
                        return this.next = t ? null : e, this.previous = null, e
                    }, t
                }(),
                c = function() {
                    function t() {
                        var t = this;
                        this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new h(null, null, 1 / 0), this.deltaMS = 1 / o.b.TARGET_FPMS, this.elapsedMS = 1 / o.b.TARGET_FPMS, this._tick = function(time) {
                            t._requestId = null, t.started && (t.update(time), t.started && null === t._requestId && t._head.next && (t._requestId = requestAnimationFrame(t._tick)))
                        }
                    }
                    return t.prototype._requestIfNeeded = function() {
                        null === this._requestId && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick))
                    }, t.prototype._cancelIfNeeded = function() {
                        null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
                    }, t.prototype._startIfPossible = function() {
                        this.started ? this._requestIfNeeded() : this.autoStart && this.start()
                    }, t.prototype.add = function(t, e, r) {
                        return void 0 === r && (r = n.NORMAL), this._addListener(new h(t, e, r))
                    }, t.prototype.addOnce = function(t, e, r) {
                        return void 0 === r && (r = n.NORMAL), this._addListener(new h(t, e, r, !0))
                    }, t.prototype._addListener = function(t) {
                        var e = this._head.next,
                            r = this._head;
                        if (e) {
                            for (; e;) {
                                if (t.priority > e.priority) {
                                    t.connect(r);
                                    break
                                }
                                r = e, e = e.next
                            }
                            t.previous || t.connect(r)
                        } else t.connect(r);
                        return this._startIfPossible(), this
                    }, t.prototype.remove = function(t, e) {
                        for (var r = this._head.next; r;) r = r.match(t, e) ? r.destroy() : r.next;
                        return this._head.next || this._cancelIfNeeded(), this
                    }, Object.defineProperty(t.prototype, "count", {
                        get: function() {
                            if (!this._head) return 0;
                            for (var t = 0, e = this._head; e = e.next;) t++;
                            return t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.prototype.start = function() {
                        this.started || (this.started = !0, this._requestIfNeeded())
                    }, t.prototype.stop = function() {
                        this.started && (this.started = !1, this._cancelIfNeeded())
                    }, t.prototype.destroy = function() {
                        if (!this._protected) {
                            this.stop();
                            for (var t = this._head.next; t;) t = t.destroy(!0);
                            this._head.destroy(), this._head = null
                        }
                    }, t.prototype.update = function(t) {
                        var e;
                        if (void 0 === t && (t = performance.now()), t > this.lastTime) {
                            if ((e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
                                var r = t - this._lastFrame | 0;
                                if (r < this._minElapsedMS) return;
                                this._lastFrame = t - r % this._minElapsedMS
                            }
                            this.deltaMS = e, this.deltaTime = this.deltaMS * o.b.TARGET_FPMS;
                            for (var head = this._head, n = head.next; n;) n = n.emit(this.deltaTime);
                            head.next || this._cancelIfNeeded()
                        } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
                        this.lastTime = t
                    }, Object.defineProperty(t.prototype, "FPS", {
                        get: function() {
                            return 1e3 / this.elapsedMS
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "minFPS", {
                        get: function() {
                            return 1e3 / this._maxElapsedMS
                        },
                        set: function(t) {
                            var e = Math.min(this.maxFPS, t),
                                r = Math.min(Math.max(0, e) / 1e3, o.b.TARGET_FPMS);
                            this._maxElapsedMS = 1 / r
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "maxFPS", {
                        get: function() {
                            return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0
                        },
                        set: function(t) {
                            if (0 === t) this._minElapsedMS = 0;
                            else {
                                var e = Math.max(this.minFPS, t);
                                this._minElapsedMS = 1 / (e / 1e3)
                            }
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t, "shared", {
                        get: function() {
                            if (!t._shared) {
                                var e = t._shared = new t;
                                e.autoStart = !0, e._protected = !0
                            }
                            return t._shared
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(t, "system", {
                        get: function() {
                            if (!t._system) {
                                var e = t._system = new t;
                                e.autoStart = !0, e._protected = !0
                            }
                            return t._system
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t
                }(),
                f = function() {
                    function t() {}
                    return t.init = function(t) {
                        var e = this;
                        t = Object.assign({
                            autoStart: !0,
                            sharedTicker: !1
                        }, t), Object.defineProperty(this, "ticker", {
                            set: function(t) {
                                this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, n.LOW)
                            },
                            get: function() {
                                return this._ticker
                            }
                        }), this.stop = function() {
                            e._ticker.stop()
                        }, this.start = function() {
                            e._ticker.start()
                        }, this._ticker = null, this.ticker = t.sharedTicker ? c.shared : new c, t.autoStart && this.start()
                    }, t.destroy = function() {
                        if (this._ticker) {
                            var t = this._ticker;
                            this.ticker = null, t.destroy()
                        }
                    }, t
                }()
        },
        810: function(t, e, r) {
            "use strict";
            r.d(e, "a", (function() {
                return n
            }));
            var n = function() {
                function t(t) {
                    this.items = [], this._name = t, this._aliasCount = 0
                }
                return t.prototype.emit = function(t, e, r, n, o, h, c, f) {
                    if (arguments.length > 8) throw new Error("max arguments reached");
                    var l = this,
                        d = l.name,
                        _ = l.items;
                    this._aliasCount++;
                    for (var i = 0, v = _.length; i < v; i++) _[i][d](t, e, r, n, o, h, c, f);
                    return _ === this.items && this._aliasCount--, this
                }, t.prototype.ensureNonAliasedItems = function() {
                    this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0))
                }, t.prototype.add = function(t) {
                    return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this
                }, t.prototype.remove = function(t) {
                    var e = this.items.indexOf(t);
                    return -1 !== e && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this
                }, t.prototype.contains = function(t) {
                    return -1 !== this.items.indexOf(t)
                }, t.prototype.removeAll = function() {
                    return this.ensureNonAliasedItems(), this.items.length = 0, this
                }, t.prototype.destroy = function() {
                    this.removeAll(), this.items = null, this._name = null
                }, Object.defineProperty(t.prototype, "empty", {
                    get: function() {
                        return 0 === this.items.length
                    },
                    enumerable: !1,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "name", {
                    get: function() {
                        return this._name
                    },
                    enumerable: !1,
                    configurable: !0
                }), t
            }();
            Object.defineProperties(n.prototype, {
                dispatch: {
                    value: n.prototype.emit
                },
                run: {
                    value: n.prototype.emit
                }
            })
        },
        889: function(t, e, r) {
            "use strict";
            var n = Object.prototype.hasOwnProperty,
                o = "~";

            function h() {}

            function c(t, e, r) {
                this.fn = t, this.context = e, this.once = r || !1
            }

            function f(t, e, r, n, h) {
                if ("function" != typeof r) throw new TypeError("The listener must be a function");
                var f = new c(r, n || t, h),
                    l = o ? o + e : e;
                return t._events[l] ? t._events[l].fn ? t._events[l] = [t._events[l], f] : t._events[l].push(f) : (t._events[l] = f, t._eventsCount++), t
            }

            function l(t, e) {
                0 == --t._eventsCount ? t._events = new h : delete t._events[e]
            }

            function d() {
                this._events = new h, this._eventsCount = 0
            }
            Object.create && (h.prototype = Object.create(null), (new h).__proto__ || (o = !1)), d.prototype.eventNames = function() {
                var t, e, r = [];
                if (0 === this._eventsCount) return r;
                for (e in t = this._events) n.call(t, e) && r.push(o ? e.slice(1) : e);
                return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(t)) : r
            }, d.prototype.listeners = function(t) {
                var e = o ? o + t : t,
                    r = this._events[e];
                if (!r) return [];
                if (r.fn) return [r.fn];
                for (var i = 0, n = r.length, h = new Array(n); i < n; i++) h[i] = r[i].fn;
                return h
            }, d.prototype.listenerCount = function(t) {
                var e = o ? o + t : t,
                    r = this._events[e];
                return r ? r.fn ? 1 : r.length : 0
            }, d.prototype.emit = function(t, e, r, n, h, c) {
                var f = o ? o + t : t;
                if (!this._events[f]) return !1;
                var l, i, d = this._events[f],
                    _ = arguments.length;
                if (d.fn) {
                    switch (d.once && this.removeListener(t, d.fn, void 0, !0), _) {
                        case 1:
                            return d.fn.call(d.context), !0;
                        case 2:
                            return d.fn.call(d.context, e), !0;
                        case 3:
                            return d.fn.call(d.context, e, r), !0;
                        case 4:
                            return d.fn.call(d.context, e, r, n), !0;
                        case 5:
                            return d.fn.call(d.context, e, r, n, h), !0;
                        case 6:
                            return d.fn.call(d.context, e, r, n, h, c), !0
                    }
                    for (i = 1, l = new Array(_ - 1); i < _; i++) l[i - 1] = arguments[i];
                    d.fn.apply(d.context, l)
                } else {
                    var v, m = d.length;
                    for (i = 0; i < m; i++) switch (d[i].once && this.removeListener(t, d[i].fn, void 0, !0), _) {
                        case 1:
                            d[i].fn.call(d[i].context);
                            break;
                        case 2:
                            d[i].fn.call(d[i].context, e);
                            break;
                        case 3:
                            d[i].fn.call(d[i].context, e, r);
                            break;
                        case 4:
                            d[i].fn.call(d[i].context, e, r, n);
                            break;
                        default:
                            if (!l)
                                for (v = 1, l = new Array(_ - 1); v < _; v++) l[v - 1] = arguments[v];
                            d[i].fn.apply(d[i].context, l)
                    }
                }
                return !0
            }, d.prototype.on = function(t, e, r) {
                return f(this, t, e, r, !1)
            }, d.prototype.once = function(t, e, r) {
                return f(this, t, e, r, !0)
            }, d.prototype.removeListener = function(t, e, r, n) {
                var h = o ? o + t : t;
                if (!this._events[h]) return this;
                if (!e) return l(this, h), this;
                var c = this._events[h];
                if (c.fn) c.fn !== e || n && !c.once || r && c.context !== r || l(this, h);
                else {
                    for (var i = 0, f = [], d = c.length; i < d; i++)(c[i].fn !== e || n && !c[i].once || r && c[i].context !== r) && f.push(c[i]);
                    f.length ? this._events[h] = 1 === f.length ? f[0] : f : l(this, h)
                }
                return this
            }, d.prototype.removeAllListeners = function(t) {
                var e;
                return t ? (e = o ? o + t : t, this._events[e] && l(this, e)) : (this._events = new h, this._eventsCount = 0), this
            }, d.prototype.off = d.prototype.removeListener, d.prototype.addListener = d.prototype.on, d.prefixed = o, d.EventEmitter = d, t.exports = d
        },
        890: function(t, e, r) {
            "use strict";

            function n(data, t, e) {
                e = e || 2;
                var r, n, f, l, d, _, y, E = t && t.length,
                    x = E ? t[0] * e : data.length,
                    R = o(data, 0, x, e, !0),
                    I = [];
                if (!R || R.next === R.prev) return I;
                if (E && (R = function(data, t, e, r) {
                        var i, n, c, f = [];
                        for (i = 0, n = t.length; i < n; i++)(c = o(data, t[i] * r, i < n - 1 ? t[i + 1] * r : data.length, r, !1)) === c.next && (c.steiner = !0), f.push(T(c));
                        for (f.sort(v), i = 0; i < f.length; i++) e = h(e = m(f[i], e), e.next);
                        return e
                    }(data, t, R, e)), data.length > 80 * e) {
                    r = f = data[0], n = l = data[1];
                    for (var i = e; i < x; i += e)(d = data[i]) < r && (r = d), (_ = data[i + 1]) < n && (n = _), d > f && (f = d), _ > l && (l = _);
                    y = 0 !== (y = Math.max(f - r, l - n)) ? 1 / y : 0
                }
                return c(R, I, e, r, n, y), I
            }

            function o(data, t, e, r, n) {
                var i, o;
                if (n === M(data, t, e, r) > 0)
                    for (i = t; i < e; i += r) o = C(i, data[i], data[i + 1], o);
                else
                    for (i = e - r; i >= t; i -= r) o = C(i, data[i], data[i + 1], o);
                return o && I(o, o.next) && (P(o), o = o.next), o
            }

            function h(t, e) {
                if (!t) return t;
                e || (e = t);
                var r, p = t;
                do {
                    if (r = !1, p.steiner || !I(p, p.next) && 0 !== area(p.prev, p, p.next)) p = p.next;
                    else {
                        if (P(p), (p = e = p.prev) === p.next) break;
                        r = !0
                    }
                } while (r || p !== e);
                return e
            }

            function c(t, e, r, n, o, v, m) {
                if (t) {
                    !m && v && function(t, e, r, n) {
                        var p = t;
                        do {
                            null === p.z && (p.z = E(p.x, p.y, e, r, n)), p.prevZ = p.prev, p.nextZ = p.next, p = p.next
                        } while (p !== t);
                        p.prevZ.nextZ = null, p.prevZ = null,
                            function(t) {
                                var i, p, q, e, r, n, o, h, c = 1;
                                do {
                                    for (p = t, t = null, r = null, n = 0; p;) {
                                        for (n++, q = p, o = 0, i = 0; i < c && (o++, q = q.nextZ); i++);
                                        for (h = c; o > 0 || h > 0 && q;) 0 !== o && (0 === h || !q || p.z <= q.z) ? (e = p, p = p.nextZ, o--) : (e = q, q = q.nextZ, h--), r ? r.nextZ = e : t = e, e.prevZ = r, r = e;
                                        p = q
                                    }
                                    r.nextZ = null, c *= 2
                                } while (n > 1)
                            }(p)
                    }(t, n, o, v);
                    for (var y, T, x = t; t.prev !== t.next;)
                        if (y = t.prev, T = t.next, v ? l(t, n, o, v) : f(t)) e.push(y.i / r), e.push(t.i / r), e.push(T.i / r), P(t), t = T.next, x = T.next;
                        else if ((t = T) === x) {
                        m ? 1 === m ? c(t = d(h(t), e, r), e, r, n, o, v, 2) : 2 === m && _(t, e, r, n, o, v) : c(h(t), e, r, n, o, v, 1);
                        break
                    }
                }
            }

            function f(t) {
                var a = t.prev,
                    b = t,
                    e = t.next;
                if (area(a, b, e) >= 0) return !1;
                for (var p = t.next.next; p !== t.prev;) {
                    if (x(a.x, a.y, b.x, b.y, e.x, e.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
                    p = p.next
                }
                return !0
            }

            function l(t, e, r, n) {
                var a = t.prev,
                    b = t,
                    o = t.next;
                if (area(a, b, o) >= 0) return !1;
                for (var h = a.x < b.x ? a.x < o.x ? a.x : o.x : b.x < o.x ? b.x : o.x, c = a.y < b.y ? a.y < o.y ? a.y : o.y : b.y < o.y ? b.y : o.y, f = a.x > b.x ? a.x > o.x ? a.x : o.x : b.x > o.x ? b.x : o.x, l = a.y > b.y ? a.y > o.y ? a.y : o.y : b.y > o.y ? b.y : o.y, d = E(h, c, e, r, n), _ = E(f, l, e, r, n), p = t.prevZ, v = t.nextZ; p && p.z >= d && v && v.z <= _;) {
                    if (p !== t.prev && p !== t.next && x(a.x, a.y, b.x, b.y, o.x, o.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
                    if (p = p.prevZ, v !== t.prev && v !== t.next && x(a.x, a.y, b.x, b.y, o.x, o.y, v.x, v.y) && area(v.prev, v, v.next) >= 0) return !1;
                    v = v.nextZ
                }
                for (; p && p.z >= d;) {
                    if (p !== t.prev && p !== t.next && x(a.x, a.y, b.x, b.y, o.x, o.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
                    p = p.prevZ
                }
                for (; v && v.z <= _;) {
                    if (v !== t.prev && v !== t.next && x(a.x, a.y, b.x, b.y, o.x, o.y, v.x, v.y) && area(v.prev, v, v.next) >= 0) return !1;
                    v = v.nextZ
                }
                return !0
            }

            function d(t, e, r) {
                var p = t;
                do {
                    var a = p.prev,
                        b = p.next.next;
                    !I(a, b) && A(a, p, p.next, b) && O(a, b) && O(b, a) && (e.push(a.i / r), e.push(p.i / r), e.push(b.i / r), P(p), P(p.next), p = t = b), p = p.next
                } while (p !== t);
                return h(p)
            }

            function _(t, e, r, n, o, f) {
                var a = t;
                do {
                    for (var b = a.next.next; b !== a.prev;) {
                        if (a.i !== b.i && R(a, b)) {
                            var l = w(a, b);
                            return a = h(a, a.next), l = h(l, l.next), c(a, e, r, n, o, f), void c(l, e, r, n, o, f)
                        }
                        b = b.next
                    }
                    a = a.next
                } while (a !== t)
            }

            function v(a, b) {
                return a.x - b.x
            }

            function m(t, e) {
                var r = function(t, e) {
                    var r, p = e,
                        n = t.x,
                        o = t.y,
                        h = -1 / 0;
                    do {
                        if (o <= p.y && o >= p.next.y && p.next.y !== p.y) {
                            var c = p.x + (o - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
                            if (c <= n && c > h) {
                                if (h = c, c === n) {
                                    if (o === p.y) return p;
                                    if (o === p.next.y) return p.next
                                }
                                r = p.x < p.next.x ? p : p.next
                            }
                        }
                        p = p.next
                    } while (p !== e);
                    if (!r) return null;
                    if (n === h) return r;
                    var f, l = r,
                        d = r.x,
                        _ = r.y,
                        v = 1 / 0;
                    p = r;
                    do {
                        n >= p.x && p.x >= d && n !== p.x && x(o < _ ? n : h, o, d, _, o < _ ? h : n, o, p.x, p.y) && (f = Math.abs(o - p.y) / (n - p.x), O(p, t) && (f < v || f === v && (p.x > r.x || p.x === r.x && y(r, p))) && (r = p, v = f)), p = p.next
                    } while (p !== l);
                    return r
                }(t, e);
                if (!r) return e;
                var n = w(r, t),
                    o = h(r, r.next);
                return h(n, n.next), e === r ? o : e
            }

            function y(t, p) {
                return area(t.prev, t, p.prev) < 0 && area(p.next, t, t.next) < 0
            }

            function E(t, e, r, n, o) {
                return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * o) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) * o) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
            }

            function T(t) {
                var p = t,
                    e = t;
                do {
                    (p.x < e.x || p.x === e.x && p.y < e.y) && (e = p), p = p.next
                } while (p !== t);
                return e
            }

            function x(t, e, r, n, o, h, c, f) {
                return (o - c) * (e - f) - (t - c) * (h - f) >= 0 && (t - c) * (n - f) - (r - c) * (e - f) >= 0 && (r - c) * (h - f) - (o - c) * (n - f) >= 0
            }

            function R(a, b) {
                return a.next.i !== b.i && a.prev.i !== b.i && ! function(a, b) {
                    var p = a;
                    do {
                        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && A(p, p.next, a, b)) return !0;
                        p = p.next
                    } while (p !== a);
                    return !1
                }(a, b) && (O(a, b) && O(b, a) && function(a, b) {
                    var p = a,
                        t = !1,
                        e = (a.x + b.x) / 2,
                        r = (a.y + b.y) / 2;
                    do {
                        p.y > r != p.next.y > r && p.next.y !== p.y && e < (p.next.x - p.x) * (r - p.y) / (p.next.y - p.y) + p.x && (t = !t), p = p.next
                    } while (p !== a);
                    return t
                }(a, b) && (area(a.prev, a, b.prev) || area(a, b.prev, b)) || I(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0)
            }

            function area(p, q, t) {
                return (q.y - p.y) * (t.x - q.x) - (q.x - p.x) * (t.y - q.y)
            }

            function I(t, e) {
                return t.x === e.x && t.y === e.y
            }

            function A(t, e, r, n) {
                var o = S(area(t, e, r)),
                    h = S(area(t, e, n)),
                    c = S(area(r, n, t)),
                    f = S(area(r, n, e));
                return o !== h && c !== f || (!(0 !== o || !N(t, r, e)) || (!(0 !== h || !N(t, n, e)) || (!(0 !== c || !N(r, t, n)) || !(0 !== f || !N(r, e, n)))))
            }

            function N(p, q, t) {
                return q.x <= Math.max(p.x, t.x) && q.x >= Math.min(p.x, t.x) && q.y <= Math.max(p.y, t.y) && q.y >= Math.min(p.y, t.y)
            }

            function S(t) {
                return t > 0 ? 1 : t < 0 ? -1 : 0
            }

            function O(a, b) {
                return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0
            }

            function w(a, b) {
                var t = new L(a.i, a.x, a.y),
                    e = new L(b.i, b.x, b.y),
                    r = a.next,
                    n = b.prev;
                return a.next = b, b.prev = a, t.next = r, r.prev = t, e.next = t, t.prev = e, n.next = e, e.prev = n, e
            }

            function C(i, t, e, r) {
                var p = new L(i, t, e);
                return r ? (p.next = r.next, p.prev = r, r.next.prev = p, r.next = p) : (p.prev = p, p.next = p), p
            }

            function P(p) {
                p.next.prev = p.prev, p.prev.next = p.next, p.prevZ && (p.prevZ.nextZ = p.nextZ), p.nextZ && (p.nextZ.prevZ = p.prevZ)
            }

            function L(i, t, e) {
                this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
            }

            function M(data, t, e, r) {
                for (var n = 0, i = t, o = e - r; i < e; i += r) n += (data[o] - data[i]) * (data[i + 1] + data[o + 1]), o = i;
                return n
            }
            t.exports = n, t.exports.default = n, n.deviation = function(data, t, e, r) {
                var n = t && t.length,
                    o = n ? t[0] * e : data.length,
                    h = Math.abs(M(data, 0, o, e));
                if (n)
                    for (var i = 0, c = t.length; i < c; i++) {
                        var f = t[i] * e,
                            l = i < c - 1 ? t[i + 1] * e : data.length;
                        h -= Math.abs(M(data, f, l, e))
                    }
                var d = 0;
                for (i = 0; i < r.length; i += 3) {
                    var a = r[i] * e,
                        b = r[i + 1] * e,
                        _ = r[i + 2] * e;
                    d += Math.abs((data[a] - data[_]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[_ + 1] - data[a + 1]))
                }
                return 0 === h && 0 === d ? 0 : Math.abs((d - h) / h)
            }, n.flatten = function(data) {
                for (var t = data[0][0].length, e = {
                        vertices: [],
                        holes: [],
                        dimensions: t
                    }, r = 0, i = 0; i < data.length; i++) {
                    for (var n = 0; n < data[i].length; n++)
                        for (var o = 0; o < t; o++) e.vertices.push(data[i][n][o]);
                    i > 0 && (r += data[i - 1].length, e.holes.push(r))
                }
                return e
            }
        },
        891: function(t, e, r) {
            "use strict";
            r.d(e, "a", (function() {
                return h
            }));
            var n = r(740),
                o = function(t, b) {
                    return o = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, b) {
                        t.__proto__ = b
                    } || function(t, b) {
                        for (var p in b) b.hasOwnProperty(p) && (t[p] = b[p])
                    }, o(t, b)
                };
            var h = function(t) {
                function e(e) {
                    void 0 === e && (e = 1);
                    var r = t.call(this, n.qb, "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n", {
                        uAlpha: 1
                    }) || this;
                    return r.alpha = e, r
                }
                return function(t, b) {
                    function e() {
                        this.constructor = t
                    }
                    o(t, b), t.prototype = null === b ? Object.create(b) : (e.prototype = b.prototype, new e)
                }(e, t), Object.defineProperty(e.prototype, "alpha", {
                    get: function() {
                        return this.uniforms.uAlpha
                    },
                    set: function(t) {
                        this.uniforms.uAlpha = t
                    },
                    enumerable: !1,
                    configurable: !0
                }), e
            }(n.u)
        },
        892: function(t, e, r) {
            "use strict";
            r.d(e, "a", (function() {
                return F
            })), r.d(e, "b", (function() {
                return U
            }));
            var n = r(740),
                o = r(752),
                h = function(t, b) {
                    return h = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, b) {
                        t.__proto__ = b
                    } || function(t, b) {
                        for (var p in b) b.hasOwnProperty(p) && (t[p] = b[p])
                    }, h(t, b)
                };

            function c(t, b) {
                function e() {
                    this.constructor = t
                }
                h(t, b), t.prototype = null === b ? Object.create(b) : (e.prototype = b.prototype, new e)
            }
            var f, l, d, _, v, m, y, E, T, x, R, I, A, N, S, O, w, C, P, L = {
                    5: [.153388, .221461, .250301],
                    7: [.071303, .131514, .189879, .214607],
                    9: [.028532, .067234, .124009, .179044, .20236],
                    11: [.0093, .028002, .065984, .121703, .175713, .198596],
                    13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641],
                    15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
                },
                M = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}"].join("\n");
            ! function(t) {
                t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2"
            }(f || (f = {})),
            function(t) {
                t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS"
            }(l || (l = {})),
            function(t) {
                t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL"
            }(d || (d = {})),
            function(t) {
                t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR"
            }(_ || (_ = {})),
            function(t) {
                t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
            }(v || (v = {})),
            function(t) {
                t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.RG = 33319] = "RG", t[t.RED = 6403] = "RED", t[t.RGBA_INTEGER = 36249] = "RGBA_INTEGER", t[t.RGB_INTEGER = 36248] = "RGB_INTEGER", t[t.RG_INTEGER = 33320] = "RG_INTEGER", t[t.RED_INTEGER = 36244] = "RED_INTEGER", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
            }(m || (m = {})),
            function(t) {
                t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
            }(y || (y = {})),
            function(t) {
                t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.UNSIGNED_INT = 5125] = "UNSIGNED_INT", t[t.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", t[t.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", t[t.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", t[t.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", t[t.BYTE = 5120] = "BYTE", t[t.SHORT = 5122] = "SHORT", t[t.INT = 5124] = "INT", t[t.FLOAT = 5126] = "FLOAT", t[t.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT"
            }(E || (E = {})),
            function(t) {
                t[t.FLOAT = 0] = "FLOAT", t[t.INT = 1] = "INT", t[t.UINT = 2] = "UINT"
            }(T || (T = {})),
            function(t) {
                t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR"
            }(x || (x = {})),
            function(t) {
                t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
            }(R || (R = {})),
            function(t) {
                t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL"
            }(I || (I = {})),
            function(t) {
                t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", t[t.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA"
            }(A || (A = {})),
            function(t) {
                t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT"
            }(N || (N = {})),
            function(t) {
                t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL"
            }(S || (S = {})),
            function(t) {
                t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp"
            }(O || (O = {})),
            function(t) {
                t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE"
            }(w || (w = {})),
            function(t) {
                t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH"
            }(C || (C = {})),
            function(t) {
                t[t.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", t[t.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", t[t.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER"
            }(P || (P = {}));
            var U = function(t) {
                    function e(e, r, n, h, c) {
                        void 0 === r && (r = 8), void 0 === n && (n = 4), void 0 === h && (h = o.b.FILTER_RESOLUTION), void 0 === c && (c = 5);
                        var f = this,
                            l = function(t, e) {
                                var template, r = Math.ceil(t / 2),
                                    n = "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    uniform float strength;\n\n    varying vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n\n    vec4 filterVertexPosition( void )\n    {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n\n    vec2 filterTextureCoord( void )\n    {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }",
                                    o = "";
                                template = e ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
                                for (var i = 0; i < t; i++) {
                                    var h = template.replace("%index%", i.toString());
                                    o += h = h.replace("%sampleIndex%", i - (r - 1) + ".0"), o += "\n"
                                }
                                return (n = n.replace("%blur%", o)).replace("%size%", t.toString())
                            }(c, e),
                            d = function(t) {
                                for (var e, r = L[t], n = r.length, o = M, h = "", i = 0; i < t; i++) {
                                    var c = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%", i.toString());
                                    e = i, i >= n && (e = t - i - 1), h += c = c.replace("%value%", r[e].toString()), h += "\n"
                                }
                                return (o = o.replace("%blur%", h)).replace("%size%", t.toString())
                            }(c);
                        return (f = t.call(this, l, d) || this).horizontal = e, f.resolution = h, f._quality = 0, f.quality = n, f.blur = r, f
                    }
                    return c(e, t), e.prototype.apply = function(t, input, output, e) {
                        if (output ? this.horizontal ? this.uniforms.strength = 1 / output.width * (output.width / input.width) : this.uniforms.strength = 1 / output.height * (output.height / input.height) : this.horizontal ? this.uniforms.strength = 1 / t.renderer.width * (t.renderer.width / input.width) : this.uniforms.strength = 1 / t.renderer.height * (t.renderer.height / input.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) t.applyFilter(this, input, output, e);
                        else {
                            var r = t.getFilterTexture(),
                                n = t.renderer,
                                o = input,
                                h = r;
                            this.state.blend = !1, t.applyFilter(this, o, h, N.CLEAR);
                            for (var i = 1; i < this.passes - 1; i++) {
                                t.bindAndClear(o, N.BLIT), this.uniforms.uSampler = h;
                                var c = h;
                                h = o, o = c, n.shader.bind(this), n.geometry.draw(5)
                            }
                            this.state.blend = !0, t.applyFilter(this, h, output, e), t.returnFilterTexture(r)
                        }
                    }, Object.defineProperty(e.prototype, "blur", {
                        get: function() {
                            return this.strength
                        },
                        set: function(t) {
                            this.padding = 1 + 2 * Math.abs(t), this.strength = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "quality", {
                        get: function() {
                            return this._quality
                        },
                        set: function(t) {
                            this._quality = t, this.passes = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e
                }(n.u),
                F = function(t) {
                    function e(e, r, n, h) {
                        void 0 === e && (e = 8), void 0 === r && (r = 4), void 0 === n && (n = o.b.FILTER_RESOLUTION), void 0 === h && (h = 5);
                        var c = t.call(this) || this;
                        return c.blurXFilter = new U(!0, e, r, n, h), c.blurYFilter = new U(!1, e, r, n, h), c.resolution = n, c.quality = r, c.blur = e, c.repeatEdgePixels = !1, c
                    }
                    return c(e, t), e.prototype.apply = function(t, input, output, e) {
                        var r = Math.abs(this.blurXFilter.strength),
                            n = Math.abs(this.blurYFilter.strength);
                        if (r && n) {
                            var o = t.getFilterTexture();
                            this.blurXFilter.apply(t, input, o, N.CLEAR), this.blurYFilter.apply(t, o, output, e), t.returnFilterTexture(o)
                        } else n ? this.blurYFilter.apply(t, input, output, e) : this.blurXFilter.apply(t, input, output, e)
                    }, e.prototype.updatePadding = function() {
                        this._repeatEdgePixels ? this.padding = 0 : this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
                    }, Object.defineProperty(e.prototype, "blur", {
                        get: function() {
                            return this.blurXFilter.blur
                        },
                        set: function(t) {
                            this.blurXFilter.blur = this.blurYFilter.blur = t, this.updatePadding()
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "quality", {
                        get: function() {
                            return this.blurXFilter.quality
                        },
                        set: function(t) {
                            this.blurXFilter.quality = this.blurYFilter.quality = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "blurX", {
                        get: function() {
                            return this.blurXFilter.blur
                        },
                        set: function(t) {
                            this.blurXFilter.blur = t, this.updatePadding()
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "blurY", {
                        get: function() {
                            return this.blurYFilter.blur
                        },
                        set: function(t) {
                            this.blurYFilter.blur = t, this.updatePadding()
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "blendMode", {
                        get: function() {
                            return this.blurYFilter.blendMode
                        },
                        set: function(t) {
                            this.blurYFilter.blendMode = t
                        },
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "repeatEdgePixels", {
                        get: function() {
                            return this._repeatEdgePixels
                        },
                        set: function(t) {
                            this._repeatEdgePixels = t, this.updatePadding()
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e
                }(n.u)
        }
    }
]);