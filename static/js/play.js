/*! Socket.IO.js build:0.9.6, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */ (function (a, b) {
    var c = a;
    c.version = "0.9.6", c.protocol = 1, c.transports = [], c.j = [], c.sockets = {}, c.connect = function (a, d) {
        var e = c.util.parseUri(a),
            f, g;
 e.host = "play.codestre.am";
        b && b.location && (e.protocol = e.protocol || b.location.protocol.slice(0, -1), e.host = e.host || (b.document ? b.document.domain : b.location.hostname), e.port = e.port || b.location.port), f = c.util.uniqueUri(e);
        var h = {
            host: e.host,
            secure: "https" == e.protocol,
            port: e.port || ("https" == e.protocol ? 443 : 80),
            query: e.query || ""
        };
        c.util.merge(h, d);
        if (h["force new connection"] || !c.sockets[f]) g = new c.Socket(h);
        return !h["force new connection"] && g && (c.sockets[f] = g), g = g || c.sockets[f], g.of(e.path.length > 1 ? e.path : "")
    }
})("object" == typeof module ? module.exports : this.io = {}, this), function (a, b) {
    var c = a.util = {},
        d = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        e = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    c.parseUri = function (a) {
        var b = d.exec(a || ""),
            c = {},
            f = 14;
        while (f--) c[e[f]] = b[f] || "";
        return c
    }, c.uniqueUri = function (a) {
        var c = a.protocol,
            d = a.host,
            e = a.port;
        return "document" in b ? (d = d || document.domain, e = e || (c == "https" && document.location.protocol !== "https:" ? 443 : document.location.port)) : (d = d || "localhost", !e && c == "https" && (e = 443)), (c || "http") + "://" + d + ":" + (e || 80)
    }, c.query = function (a, b) {
        var d = c.chunkQuery(a || ""),
            e = [];
        c.merge(d, c.chunkQuery(b || ""));
        for (var f in d) d.hasOwnProperty(f) && e.push(f + "=" + d[f]);
        return e.length ? "?" + e.join("&") : ""
    }, c.chunkQuery = function (a) {
        var b = {},
            c = a.split("&"),
            d = 0,
            e = c.length,
            f;
        for (; d < e; ++d) f = c[d].split("="), f[0] && (b[f[0]] = f[1]);
        return b
    };
    var f = !1;
    c.load = function (a) {
        if ("document" in b && document.readyState === "complete" || f) return a();
        c.on(b, "load", a, !1)
    }, c.on = function (a, b, c, d) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, d)
    }, c.request = function (a) {
        if (a && "undefined" != typeof XDomainRequest) return new XDomainRequest;
        if ("undefined" != typeof XMLHttpRequest && (!a || c.ua.hasCORS)) return new XMLHttpRequest;
        if (!a) try {
            return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
        } catch (b) {}
        return null
    }, "undefined" != typeof window && c.load(function () {
        f = !0
    }), c.defer = function (a) {
        if (!c.ua.webkit || "undefined" != typeof importScripts) return a();
        c.load(function () {
            setTimeout(a, 100)
        })
    }, c.merge = function (b, d, e, f) {
        var g = f || [],
            h = typeof e == "undefined" ? 2 : e,
            i;
        for (i in d) d.hasOwnProperty(i) && c.indexOf(g, i) < 0 && (typeof b[i] != "object" || !h ? (b[i] = d[i], g.push(d[i])) : c.merge(b[i], d[i], h - 1, g));
        return b
    }, c.mixin = function (a, b) {
        c.merge(a.prototype, b.prototype)
    }, c.inherit = function (a, b) {
        function c() {}
        c.prototype = b.prototype, a.prototype = new c
    }, c.isArray = Array.isArray ||
    function (a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }, c.intersect = function (a, b) {
        var d = [],
            e = a.length > b.length ? a : b,
            f = a.length > b.length ? b : a;
        for (var g = 0, h = f.length; g < h; g++)~c.indexOf(e, f[g]) && d.push(f[g]);
        return d
    }, c.indexOf = function (a, b, c) {
        for (var d = a.length, c = c < 0 ? c + d < 0 ? 0 : c + d : c || 0; c < d && a[c] !== b; c++);
        return d <= c ? -1 : c
    }, c.toArray = function (a) {
        var b = [];
        for (var c = 0, d = a.length; c < d; c++) b.push(a[c]);
        return b
    }, c.ua = {}, c.ua.hasCORS = "undefined" != typeof XMLHttpRequest &&
    function () {
        try {
            var a = new XMLHttpRequest
        } catch (b) {
            return !1
        }
        return a.withCredentials != undefined
    }(), c.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent)
}("undefined" != typeof io ? io : module.exports, this), function (a, b) {
    function c() {}
    a.EventEmitter = c, c.prototype.on = function (a, c) {
        return this.$events || (this.$events = {}), this.$events[a] ? b.util.isArray(this.$events[a]) ? this.$events[a].push(c) : this.$events[a] = [this.$events[a], c] : this.$events[a] = c, this
    }, c.prototype.addListener = c.prototype.on, c.prototype.once = function (a, b) {
        function d() {
            c.removeListener(a, d), b.apply(this, arguments)
        }
        var c = this;
        return d.listener = b, this.on(a, d), this
    }, c.prototype.removeListener = function (a, c) {
        if (this.$events && this.$events[a]) {
            var d = this.$events[a];
            if (b.util.isArray(d)) {
                var e = -1;
                for (var f = 0, g = d.length; f < g; f++) if (d[f] === c || d[f].listener && d[f].listener === c) {
                    e = f;
                    break
                }
                if (e < 0) return this;
                d.splice(e, 1), d.length || delete this.$events[a]
            } else(d === c || d.listener && d.listener === c) && delete this.$events[a]
        }
        return this
    }, c.prototype.removeAllListeners = function (a) {
        return this.$events && this.$events[a] && (this.$events[a] = null), this
    }, c.prototype.listeners = function (a) {
        return this.$events || (this.$events = {}), this.$events[a] || (this.$events[a] = []), b.util.isArray(this.$events[a]) || (this.$events[a] = [this.$events[a]]), this.$events[a]
    }, c.prototype.emit = function (a) {
        if (!this.$events) return !1;
        var c = this.$events[a];
        if (!c) return !1;
        var d = Array.prototype.slice.call(arguments, 1);
        if ("function" == typeof c) c.apply(this, d);
        else {
            if (!b.util.isArray(c)) return !1;
            var e = c.slice();
            for (var f = 0, g = e.length; f < g; f++) e[f].apply(this, d)
        }
        return !0
    }
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (exports, nativeJSON) {
    function f(a) {
        return a < 10 ? "0" + a : a
    }
    function date(a, b) {
        return isFinite(a.valueOf()) ? a.getUTCFullYear() + "-" + f(a.getUTCMonth() + 1) + "-" + f(a.getUTCDate()) + "T" + f(a.getUTCHours()) + ":" + f(a.getUTCMinutes()) + ":" + f(a.getUTCSeconds()) + "Z" : null
    }
    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
            var b = meta[a];
            return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function str(a, b) {
        var c, d, e, f, g = gap,
            h, i = b[a];
        i instanceof Date && (i = date(a)), typeof rep == "function" && (i = rep.call(b, a, i));
        switch (typeof i) {
        case "string":
            return quote(i);
        case "number":
            return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
            return String(i);
        case "object":
            if (!i) return "null";
            gap += indent, h = [];
            if (Object.prototype.toString.apply(i) === "[object Array]") {
                f = i.length;
                for (c = 0; c < f; c += 1) h[c] = str(c, i) || "null";
                return e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e
            }
            if (rep && typeof rep == "object") {
                f = rep.length;
                for (c = 0; c < f; c += 1) typeof rep[c] == "string" && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
            } else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
            return e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e
        }
    }
    "use strict";
    if (nativeJSON && nativeJSON.parse) return exports.JSON = {
        parse: nativeJSON.parse,
        stringify: nativeJSON.stringify
    };
    var JSON = exports.JSON = {},
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;
    JSON.stringify = function (a, b, c) {
        var d;
        gap = "", indent = "";
        if (typeof c == "number") for (d = 0; d < c; d += 1) indent += " ";
        else typeof c == "string" && (indent = c);
        rep = b;
        if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number") return str("", {
            "": a
        });
        throw new Error("JSON.stringify")
    }, JSON.parse = function (text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && typeof e == "object") for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
            "": j
        }, "") : j;
        throw new SyntaxError("JSON.parse")
    }
}("undefined" != typeof io ? io : module.exports, typeof JSON != "undefined" ? JSON : undefined), function (a, b) {
    var c = a.parser = {},
        d = c.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
        e = c.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
        f = c.advice = ["reconnect"],
        g = b.JSON,
        h = b.util.indexOf;
    c.encodePacket = function (a) {
        var b = h(d, a.type),
            c = a.id || "",
            i = a.endpoint || "",
            j = a.ack,
            k = null;
        switch (a.type) {
        case "error":
            var l = a.reason ? h(e, a.reason) : "",
                m = a.advice ? h(f, a.advice) : "";
            if (l !== "" || m !== "") k = l + (m !== "" ? "+" + m : "");
            break;
        case "message":
            a.data !== "" && (k = a.data);
            break;
        case "event":
            var n = {
                name: a.name
            };
            a.args && a.args.length && (n.args = a.args), k = g.stringify(n);
            break;
        case "json":
            k = g.stringify(a.data);
            break;
        case "connect":
            a.qs && (k = a.qs);
            break;
        case "ack":
            k = a.ackId + (a.args && a.args.length ? "+" + g.stringify(a.args) : "")
        }
        var o = [b, c + (j == "data" ? "+" : ""), i];
        return k !== null && k !== undefined && o.push(k), o.join(":")
    }, c.encodePayload = function (a) {
        var b = "";
        if (a.length == 1) return a[0];
        for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c];
            b += "�" + e.length + "�" + a[c]
        }
        return b
    };
    var i = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
    c.decodePacket = function (a) {
        var b = a.match(i);
        if (!b) return {};
        var c = b[2] || "",
            a = b[5] || "",
            h = {
                type: d[b[1]],
                endpoint: b[4] || ""
            };
        c && (h.id = c, b[3] ? h.ack = "data" : h.ack = !0);
        switch (h.type) {
        case "error":
            var b = a.split("+");
            h.reason = e[b[0]] || "", h.advice = f[b[1]] || "";
            break;
        case "message":
            h.data = a || "";
            break;
        case "event":
            try {
                var j = g.parse(a);
                h.name = j.name, h.args = j.args
            } catch (k) {}
            h.args = h.args || [];
            break;
        case "json":
            try {
                h.data = g.parse(a)
            } catch (k) {}
            break;
        case "connect":
            h.qs = a || "";
            break;
        case "ack":
            var b = a.match(/^([0-9]+)(\+)?(.*)/);
            if (b) {
                h.ackId = b[1], h.args = [];
                if (b[3]) try {
                    h.args = b[3] ? g.parse(b[3]) : []
                } catch (k) {}
            }
            break;
        case "disconnect":
        case "heartbeat":
        }
        return h
    }, c.decodePayload = function (a) {
        if (a.charAt(0) == "�") {
            var b = [];
            for (var d = 1, e = ""; d < a.length; d++) a.charAt(d) == "�" ? (b.push(c.decodePacket(a.substr(d + 1).substr(0, e))), d += Number(e) + 1, e = "") : e += a.charAt(d);
            return b
        }
        return [c.decodePacket(a)]
    }
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (a, b) {
    function c(a, b) {
        this.socket = a, this.sessid = b
    }
    a.Transport = c, b.util.mixin(c, b.EventEmitter), c.prototype.onData = function (a) {
        this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout();
        if (a !== "") {
            var c = b.parser.decodePayload(a);
            if (c && c.length) for (var d = 0, e = c.length; d < e; d++) this.onPacket(c[d])
        }
        return this
    }, c.prototype.onPacket = function (a) {
        return this.socket.setHeartbeatTimeout(), a.type == "heartbeat" ? this.onHeartbeat() : (a.type == "connect" && a.endpoint == "" && this.onConnect(), a.type == "error" && a.advice == "reconnect" && (this.open = !1), this.socket.onPacket(a), this)
    }, c.prototype.setCloseTimeout = function () {
        if (!this.closeTimeout) {
            var a = this;
            this.closeTimeout = setTimeout(function () {
                a.onDisconnect()
            }, this.socket.closeTimeout)
        }
    }, c.prototype.onDisconnect = function () {
        return this.close && this.open && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
    }, c.prototype.onConnect = function () {
        return this.socket.onConnect(), this
    }, c.prototype.clearCloseTimeout = function () {
        this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
    }, c.prototype.clearTimeouts = function () {
        this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
    }, c.prototype.packet = function (a) {
        this.send(b.parser.encodePacket(a))
    }, c.prototype.onHeartbeat = function (a) {
        this.packet({
            type: "heartbeat"
        })
    }, c.prototype.onOpen = function () {
        this.open = !0, this.clearCloseTimeout(), this.socket.onOpen()
    }, c.prototype.onClose = function () {
        var a = this;
        this.open = !1, this.socket.onClose(), this.onDisconnect()
    }, c.prototype.prepareUrl = function () {
        var a = this.socket.options;
        return this.scheme() + "://" + a.host + ":" + a.port + "/" + a.resource + "/" + b.protocol + "/" + this.name + "/" + this.sessid
    }, c.prototype.ready = function (a, b) {
        b.call(this)
    }
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (a, b, c) {
    function d(a) {
        this.options = {
            port: 80,
            secure: !1,
            document: "document" in c ? document : !1,
            resource: "socket.io",
            transports: b.transports,
            "connect timeout": 1e4,
            "try multiple transports": !0,
            reconnect: !0,
            "reconnection delay": 500,
            "reconnection limit": Infinity,
            "reopen delay": 3e3,
            "max reconnection attempts": 10,
            "sync disconnect on unload": !0,
            "auto connect": !0,
            "flash policy port": 10843
        }, b.util.merge(this.options, a), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1;
        if (this.options["sync disconnect on unload"] && (!this.isXDomain() || b.util.ua.hasCORS)) {
            var d = this;
            b.util.on(c, "unload", function () {
                d.disconnectSync()
            }, !1)
        }
        this.options["auto connect"] && this.connect()
    }
    function e() {}
    a.Socket = d, b.util.mixin(d, b.EventEmitter), d.prototype.of = function (a) {
        return this.namespaces[a] || (this.namespaces[a] = new b.SocketNamespace(this, a), a !== "" && this.namespaces[a].packet({
            type: "connect"
        })), this.namespaces[a]
    }, d.prototype.publish = function () {
        this.emit.apply(this, arguments);
        var a;
        for (var b in this.namespaces) this.namespaces.hasOwnProperty(b) && (a = this.of(b), a.$emit.apply(a, arguments))
    }, d.prototype.handshake = function (a) {
        function f(b) {
            b instanceof Error ? c.onError(b.message) : a.apply(null, b.split(":"))
        }
        var c = this,
            d = this.options,
            g = ["http" + (d.secure ? "s" : "") + ":/", d.host + ":" + d.port, d.resource, b.protocol, b.util.query(this.options.query, "t=" + +(new Date))].join("/");
        if (this.isXDomain() && !b.util.ua.hasCORS) {
            var h = document.getElementsByTagName("script")[0],
                i = document.createElement("script");
            i.src = g + "&jsonp=" + b.j.length, h.parentNode.insertBefore(i, h), b.j.push(function (a) {
                f(a), i.parentNode.removeChild(i)
            })
        } else {
            var j = b.util.request();
            j.open("GET", g, !0), j.withCredentials = !0, j.onreadystatechange = function () {
                j.readyState == 4 && (j.onreadystatechange = e, j.status == 200 ? f(j.responseText) : !c.reconnecting && c.onError(j.responseText))
            }, j.send(null)
        }
    }, d.prototype.getTransport = function (a) {
        var c = a || this.transports,
            d;
        for (var e = 0, f; f = c[e]; e++) if (b.Transport[f] && b.Transport[f].check(this) && (!this.isXDomain() || b.Transport[f].xdomainCheck())) return new b.Transport[f](this, this.sessionid);
        return null
    }, d.prototype.connect = function (a) {
        if (this.connecting) return this;
        var c = this;
        return this.handshake(function (d, e, f, g) {
            function h(a) {
                c.transport && c.transport.clearTimeouts(), c.transport = c.getTransport(a);
                if (!c.transport) return c.publish("connect_failed");
                c.transport.ready(c, function () {
                    c.connecting = !0, c.publish("connecting", c.transport.name), c.transport.open(), c.options["connect timeout"] && (c.connectTimeoutTimer = setTimeout(function () {
                        if (!c.connected) {
                            c.connecting = !1;
                            if (c.options["try multiple transports"]) {
                                c.remainingTransports || (c.remainingTransports = c.transports.slice(0));
                                var a = c.remainingTransports;
                                while (a.length > 0 && a.splice(0, 1)[0] != c.transport.name);
                                a.length ? h(a) : c.publish("connect_failed")
                            }
                        }
                    }, c.options["connect timeout"]))
                })
            }
            c.sessionid = d, c.closeTimeout = f * 1e3, c.heartbeatTimeout = e * 1e3, c.transports = g ? b.util.intersect(g.split(","), c.options.transports) : c.options.transports, c.setHeartbeatTimeout(), h(c.transports), c.once("connect", function () {
                clearTimeout(c.connectTimeoutTimer), a && typeof a == "function" && a()
            })
        }), this
    }, d.prototype.setHeartbeatTimeout = function () {
        clearTimeout(this.heartbeatTimeoutTimer);
        var a = this;
        this.heartbeatTimeoutTimer = setTimeout(function () {
            a.transport.onClose()
        }, this.heartbeatTimeout)
    }, d.prototype.packet = function (a) {
        return this.connected && !this.doBuffer ? this.transport.packet(a) : this.buffer.push(a), this
    }, d.prototype.setBuffer = function (a) {
        this.doBuffer = a, !a && this.connected && this.buffer.length && (this.transport.payload(this.buffer), this.buffer = [])
    }, d.prototype.disconnect = function () {
        if (this.connected || this.connecting) this.open && this.of("").packet({
            type: "disconnect"
        }), this.onDisconnect("booted");
        return this
    }, d.prototype.disconnectSync = function () {
        var a = b.util.request(),
            c = this.resource + "/" + b.protocol + "/" + this.sessionid;
        a.open("GET", c, !0), this.onDisconnect("booted")
    }, d.prototype.isXDomain = function () {
        var a = c.location.port || ("https:" == c.location.protocol ? 443 : 80);
        return this.options.host !== c.location.hostname || this.options.port != a
    }, d.prototype.onConnect = function () {
        this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
    }, d.prototype.onOpen = function () {
        this.open = !0
    }, d.prototype.onClose = function () {
        this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
    }, d.prototype.onPacket = function (a) {
        this.of(a.endpoint).onPacket(a)
    }, d.prototype.onError = function (a) {
        a && a.advice && a.advice === "reconnect" && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", a && a.reason ? a.reason : a)
    }, d.prototype.onDisconnect = function (a) {
        var b = this.connected,
            c = this.connecting;
        this.connected = !1, this.connecting = !1, this.open = !1;
        if (b || c) this.transport.close(), this.transport.clearTimeouts(), b && (this.publish("disconnect", a), "booted" != a && this.options.reconnect && !this.reconnecting && this.reconnect())
    }, d.prototype.reconnect = function () {
        function e() {
            if (a.connected) {
                for (var b in a.namespaces) a.namespaces.hasOwnProperty(b) && "" !== b && a.namespaces[b].packet({
                    type: "connect"
                });
                a.publish("reconnect", a.transport.name, a.reconnectionAttempts)
            }
            clearTimeout(a.reconnectionTimer), a.removeListener("connect_failed", f), a.removeListener("connect", f), a.reconnecting = !1, delete a.reconnectionAttempts, delete a.reconnectionDelay, delete a.reconnectionTimer, delete a.redoTransports, a.options["try multiple transports"] = c
        }
        function f() {
            if (!a.reconnecting) return;
            if (a.connected) return e();
            if (a.connecting && a.reconnecting) return a.reconnectionTimer = setTimeout(f, 1e3);
            a.reconnectionAttempts++ >= b ? a.redoTransports ? (a.publish("reconnect_failed"), e()) : (a.on("connect_failed", f), a.options["try multiple transports"] = !0, a.transport = a.getTransport(), a.redoTransports = !0, a.connect()) : (a.reconnectionDelay < d && (a.reconnectionDelay *= 2), a.connect(), a.publish("reconnecting", a.reconnectionDelay, a.reconnectionAttempts), a.reconnectionTimer = setTimeout(f, a.reconnectionDelay))
        }
        this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
        var a = this,
            b = this.options["max reconnection attempts"],
            c = this.options["try multiple transports"],
            d = this.options["reconnection limit"];
        this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(f, this.reconnectionDelay), this.on("connect", f)
    }
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (a, b) {
    function c(a, b) {
        this.socket = a, this.name = b || "", this.flags = {}, this.json = new d(this, "json"), this.ackPackets = 0, this.acks = {}
    }
    function d(a, b) {
        this.namespace = a, this.name = b
    }
    a.SocketNamespace = c, b.util.mixin(c, b.EventEmitter), c.prototype.$emit = b.EventEmitter.prototype.emit, c.prototype.of = function () {
        return this.socket.of.apply(this.socket, arguments)
    }, c.prototype.packet = function (a) {
        return a.endpoint = this.name, this.socket.packet(a), this.flags = {}, this
    }, c.prototype.send = function (a, b) {
        var c = {
            type: this.flags.json ? "json" : "message",
            data: a
        };
        return "function" == typeof b && (c.id = ++this.ackPackets, c.ack = !0, this.acks[c.id] = b), this.packet(c)
    }, c.prototype.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1),
            c = b[b.length - 1],
            d = {
                type: "event",
                name: a
            };
        return "function" == typeof c && (d.id = ++this.ackPackets, d.ack = "data", this.acks[d.id] = c, b = b.slice(0, b.length - 1)), d.args = b, this.packet(d)
    }, c.prototype.disconnect = function () {
        return this.name === "" ? this.socket.disconnect() : (this.packet({
            type: "disconnect"
        }), this.$emit("disconnect")), this
    }, c.prototype.onPacket = function (a) {
        function d() {
            c.packet({
                type: "ack",
                args: b.util.toArray(arguments),
                ackId: a.id
            })
        }
        var c = this;
        switch (a.type) {
        case "connect":
            this.$emit("connect");
            break;
        case "disconnect":
            this.name === "" ? this.socket.onDisconnect(a.reason || "booted") : this.$emit("disconnect", a.reason);
            break;
        case "message":
        case "json":
            var e = ["message", a.data];
            a.ack == "data" ? e.push(d) : a.ack && this.packet({
                type: "ack",
                ackId: a.id
            }), this.$emit.apply(this, e);
            break;
        case "event":
            var e = [a.name].concat(a.args);
            a.ack == "data" && e.push(d), this.$emit.apply(this, e);
            break;
        case "ack":
            this.acks[a.ackId] && (this.acks[a.ackId].apply(this, a.args), delete this.acks[a.ackId]);
            break;
        case "error":
            a.advice ? this.socket.onError(a) : a.reason == "unauthorized" ? this.$emit("connect_failed", a.reason) : this.$emit("error", a.reason)
        }
    }, d.prototype.send = function () {
        this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
    }, d.prototype.emit = function () {
        this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
    }
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (a, b, c) {
    function d(a) {
        b.Transport.apply(this, arguments)
    }
    a.websocket = d, b.util.inherit(d, b.Transport), d.prototype.name = "websocket", d.prototype.open = function () {
        var a = b.util.query(this.socket.options.query),
            d = this,
            e;
        return e || (e = c.MozWebSocket || c.WebSocket), this.websocket = new e(this.prepareUrl() + a), this.websocket.onopen = function () {
            d.onOpen(), d.socket.setBuffer(!1)
        }, this.websocket.onmessage = function (a) {
            d.onData(a.data)
        }, this.websocket.onclose = function () {
            d.onClose(), d.socket.setBuffer(!0)
        }, this.websocket.onerror = function (a) {
            d.onError(a)
        }, this
    }, d.prototype.send = function (a) {
        return this.websocket.send(a), this
    }, d.prototype.payload = function (a) {
        for (var b = 0, c = a.length; b < c; b++) this.packet(a[b]);
        return this
    }, d.prototype.close = function () {
        return this.websocket.close(), this
    }, d.prototype.onError = function (a) {
        this.socket.onError(a)
    }, d.prototype.scheme = function () {
        return this.socket.options.secure ? "wss" : "ws"
    }, d.check = function () {
        return "WebSocket" in c && !("__addTask" in WebSocket) || "MozWebSocket" in c
    }, d.xdomainCheck = function () {
        return !0
    }, b.transports.push("websocket")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (a, b) {
    function c() {
        b.Transport.websocket.apply(this, arguments)
    }
    a.flashsocket = c, b.util.inherit(c, b.Transport.websocket), c.prototype.name = "flashsocket", c.prototype.open = function () {
        var a = this,
            c = arguments;
        return WebSocket.__addTask(function () {
            b.Transport.websocket.prototype.open.apply(a, c)
        }), this
    }, c.prototype.send = function () {
        var a = this,
            c = arguments;
        return WebSocket.__addTask(function () {
            b.Transport.websocket.prototype.send.apply(a, c)
        }), this
    }, c.prototype.close = function () {
        return WebSocket.__tasks.length = 0, b.Transport.websocket.prototype.close.call(this), this
    }, c.prototype.ready = function (a, d) {
        function e() {
            var b = a.options,
                e = b["flash policy port"],
                g = ["http" + (b.secure ? "s" : "") + ":/", b.host + ":" + b.port, b.resource, "static/flashsocket", "WebSocketMain" + (a.isXDomain() ? "Insecure" : "") + ".swf"];
            c.loaded || (typeof WEB_SOCKET_SWF_LOCATION == "undefined" && (WEB_SOCKET_SWF_LOCATION = g.join("/")), e !== 843 && WebSocket.loadFlashPolicyFile("xmlsocket://" + b.host + ":" + e), WebSocket.__initialize(), c.loaded = !0), d.call(f)
        }
        var f = this;
        if (document.body) return e();
        b.util.load(e)
    }, c.check = function () {
        return typeof WebSocket != "undefined" && "__initialize" in WebSocket && !! swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
    }, c.xdomainCheck = function () {
        return !0
    }, typeof window != "undefined" && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), b.transports.push("flashsocket")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
if ("undefined" != typeof window) var swfobject = function () {
        function A() {
            if (t) return;
            try {
                var a = i.getElementsByTagName("body")[0].appendChild(Q("span"));
                a.parentNode.removeChild(a)
            } catch (b) {
                return
            }
            t = !0;
            var c = l.length;
            for (var d = 0; d < c; d++) l[d]()
        }
        function B(a) {
            t ? a() : l[l.length] = a
        }
        function C(b) {
            if (typeof h.addEventListener != a) h.addEventListener("load", b, !1);
            else if (typeof i.addEventListener != a) i.addEventListener("load", b, !1);
            else if (typeof h.attachEvent != a) R(h, "onload", b);
            else if (typeof h.onload == "function") {
                var c = h.onload;
                h.onload = function () {
                    c(), b()
                }
            } else h.onload = b
        }
        function D() {
            k ? E() : F()
        }
        function E() {
            var c = i.getElementsByTagName("body")[0],
                d = Q(b);
            d.setAttribute("type", e);
            var f = c.appendChild(d);
            if (f) {
                var g = 0;
                (function () {
                    if (typeof f.GetVariable != a) {
                        var b = f.GetVariable("$version");
                        b && (b = b.split(" ")[1].split(","), y.pv = [parseInt(b[0], 10), parseInt(b[1], 10), parseInt(b[2], 10)])
                    } else if (g < 10) {
                        g++, setTimeout(arguments.callee, 10);
                        return
                    }
                    c.removeChild(d), f = null, F()
                })()
            } else F()
        }
        function F() {
            var b = m.length;
            if (b > 0) for (var c = 0; c < b; c++) {
                var d = m[c].id,
                    e = m[c].callbackFn,
                    f = {
                        success: !1,
                        id: d
                    };
                if (y.pv[0] > 0) {
                    var g = P(d);
                    if (g) if (S(m[c].swfVersion) && !(y.wk && y.wk < 312)) U(d, !0), e && (f.success = !0, f.ref = G(d), e(f));
                    else if (m[c].expressInstall && H()) {
                        var h = {};
                        h.data = m[c].expressInstall, h.width = g.getAttribute("width") || "0", h.height = g.getAttribute("height") || "0", g.getAttribute("class") && (h.styleclass = g.getAttribute("class")), g.getAttribute("align") && (h.align = g.getAttribute("align"));
                        var i = {},
                            j = g.getElementsByTagName("param"),
                            k = j.length;
                        for (var l = 0; l < k; l++) j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
                        I(h, i, d, e)
                    } else J(g), e && e(f)
                } else {
                    U(d, !0);
                    if (e) {
                        var n = G(d);
                        n && typeof n.SetVariable != a && (f.success = !0, f.ref = n), e(f)
                    }
                }
            }
        }
        function G(c) {
            var d = null,
                e = P(c);
            if (e && e.nodeName == "OBJECT") if (typeof e.SetVariable != a) d = e;
            else {
                var f = e.getElementsByTagName(b)[0];
                f && (d = f)
            }
            return d
        }
        function H() {
            return !u && S("6.0.65") && (y.win || y.mac) && !(y.wk && y.wk < 312)
        }
        function I(b, c, d, e) {
            u = !0, r = e || null, s = {
                success: !1,
                id: d
            };
            var g = P(d);
            if (g) {
                g.nodeName == "OBJECT" ? (p = K(g), q = null) : (p = g, q = d), b.id = f;
                if (typeof b.width == a || !/%$/.test(b.width) && parseInt(b.width, 10) < 310) b.width = "310";
                if (typeof b.height == a || !/%$/.test(b.height) && parseInt(b.height, 10) < 137) b.height = "137";
                i.title = i.title.slice(0, 47) + " - Flash Player Installation";
                var j = y.ie && y.win ? ["Active"].concat("").join("X") : "PlugIn",
                    k = "MMredirectURL=" + h.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + j + "&MMdoctitle=" + i.title;
                typeof c.flashvars != a ? c.flashvars += "&" + k : c.flashvars = k;
                if (y.ie && y.win && g.readyState != 4) {
                    var l = Q("div");
                    d += "SWFObjectNew", l.setAttribute("id", d), g.parentNode.insertBefore(l, g), g.style.display = "none", function () {
                        g.readyState == 4 ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
                    }()
                }
                L(b, c, d)
            }
        }
        function J(a) {
            if (y.ie && y.win && a.readyState != 4) {
                var b = Q("div");
                a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(K(a), b), a.style.display = "none", function () {
                    a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                }()
            } else a.parentNode.replaceChild(K(a), a)
        }
        function K(a) {
            var c = Q("div");
            if (y.win && y.ie) c.innerHTML = a.innerHTML;
            else {
                var d = a.getElementsByTagName(b)[0];
                if (d) {
                    var e = d.childNodes;
                    if (e) {
                        var f = e.length;
                        for (var g = 0; g < f; g++)(e[g].nodeType != 1 || e[g].nodeName != "PARAM") && e[g].nodeType != 8 && c.appendChild(e[g].cloneNode(!0))
                    }
                }
            }
            return c
        }
        function L(c, d, f) {
            var g, h = P(f);
            if (y.wk && y.wk < 312) return g;
            if (h) {
                typeof c.id == a && (c.id = f);
                if (y.ie && y.win) {
                    var i = "";
                    for (var j in c) c[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? d.movie = c[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + c[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + c[j] + '"'));
                    var k = "";
                    for (var l in d) d[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + d[l] + '" />');
                    h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>", n[n.length] = c.id, g = P(c.id)
                } else {
                    var m = Q(b);
                    m.setAttribute("type", e);
                    for (var o in c) c[o] != Object.prototype[o] && (o.toLowerCase() == "styleclass" ? m.setAttribute("class", c[o]) : o.toLowerCase() != "classid" && m.setAttribute(o, c[o]));
                    for (var p in d) d[p] != Object.prototype[p] && p.toLowerCase() != "movie" && M(m, p, d[p]);
                    h.parentNode.replaceChild(m, h), g = m
                }
            }
            return g
        }
        function M(a, b, c) {
            var d = Q("param");
            d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
        }
        function N(a) {
            var b = P(a);
            b && b.nodeName == "OBJECT" && (y.ie && y.win ? (b.style.display = "none", function () {
                b.readyState == 4 ? O(a) : setTimeout(arguments.callee, 10)
            }()) : b.parentNode.removeChild(b))
        }
        function O(a) {
            var b = P(a);
            if (b) {
                for (var c in b) typeof b[c] == "function" && (b[c] = null);
                b.parentNode.removeChild(b)
            }
        }
        function P(a) {
            var b = null;
            try {
                b = i.getElementById(a)
            } catch (c) {}
            return b
        }
        function Q(a) {
            return i.createElement(a)
        }
        function R(a, b, c) {
            a.attachEvent(b, c), o[o.length] = [a, b, c]
        }
        function S(a) {
            var b = y.pv,
                c = a.split(".");
            return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
        }
        function T(c, d, e, f) {
            if (y.ie && y.mac) return;
            var g = i.getElementsByTagName("head")[0];
            if (!g) return;
            var h = e && typeof e == "string" ? e : "screen";
            f && (v = null, w = null);
            if (!v || w != h) {
                var j = Q("style");
                j.setAttribute("type", "text/css"), j.setAttribute("media", h), v = g.appendChild(j), y.ie && y.win && typeof i.styleSheets != a && i.styleSheets.length > 0 && (v = i.styleSheets[i.styleSheets.length - 1]), w = h
            }
            y.ie && y.win ? v && typeof v.addRule == b && v.addRule(c, d) : v && typeof i.createTextNode != a && v.appendChild(i.createTextNode(c + " {" + d + "}"))
        }
        function U(a, b) {
            if (!x) return;
            var c = b ? "visible" : "hidden";
            t && P(a) ? P(a).style.visibility = c : T("#" + a, "visibility:" + c)
        }
        function V(b) {
            var c = /[\\\"<>\.;]/,
                d = c.exec(b) != null;
            return d && typeof encodeURIComponent != a ? encodeURIComponent(b) : b
        }
        var a = "undefined",
            b = "object",
            c = "Shockwave Flash",
            d = "ShockwaveFlash.ShockwaveFlash",
            e = "application/x-shockwave-flash",
            f = "SWFObjectExprInst",
            g = "onreadystatechange",
            h = window,
            i = document,
            j = navigator,
            k = !1,
            l = [D],
            m = [],
            n = [],
            o = [],
            p, q, r, s, t = !1,
            u = !1,
            v, w, x = !0,
            y = function () {
                var f = typeof i.getElementById != a && typeof i.getElementsByTagName != a && typeof i.createElement != a,
                    g = j.userAgent.toLowerCase(),
                    l = j.platform.toLowerCase(),
                    m = l ? /win/.test(l) : /win/.test(g),
                    n = l ? /mac/.test(l) : /mac/.test(g),
                    o = /webkit/.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                    p = !1,
                    q = [0, 0, 0],
                    r = null;
                if (typeof j.plugins != a && typeof j.plugins[c] == b) r = j.plugins[c].description, r && (typeof j.mimeTypes == a || !j.mimeTypes[e] || !! j.mimeTypes[e].enabledPlugin) && (k = !0, p = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                else if (typeof h[["Active"].concat("Object").join("X")] != a) try {
                    var s = new(window[["Active"].concat("Object").join("X")])(d);
                    s && (r = s.GetVariable("$version"), r && (p = !0, r = r.split(" ")[1].split(","), q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]))
                } catch (t) {}
                return {
                    w3: f,
                    pv: q,
                    wk: o,
                    ie: p,
                    win: m,
                    mac: n
                }
            }(),
            z = function () {
                if (!y.w3) return;
                (typeof i.readyState != a && i.readyState == "complete" || typeof i.readyState == a && (i.getElementsByTagName("body")[0] || i.body)) && A(), t || (typeof i.addEventListener != a && i.addEventListener("DOMContentLoaded", A, !1), y.ie && y.win && (i.attachEvent(g, function () {
                    i.readyState == "complete" && (i.detachEvent(g, arguments.callee), A())
                }), h == top &&
                function () {
                    if (t) return;
                    try {
                        i.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    A()
                }()), y.wk &&
                function () {
                    if (t) return;
                    if (!/loaded|complete/.test(i.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    A()
                }(), C(A))
            }(),
            W = function () {
                y.ie && y.win && window.attachEvent("onunload", function () {
                    var a = o.length;
                    for (var b = 0; b < a; b++) o[b][0].detachEvent(o[b][1], o[b][2]);
                    var c = n.length;
                    for (var d = 0; d < c; d++) N(n[d]);
                    for (var e in y) y[e] = null;
                    y = null;
                    for (var f in swfobject) swfobject[f] = null;
                    swfobject = null
                })
            }();
        return {
            registerObject: function (a, b, c, d) {
                if (y.w3 && a && b) {
                    var e = {};
                    e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, m[m.length] = e, U(a, !1)
                } else d && d({
                    success: !1,
                    id: a
                })
            },
            getObjectById: function (a) {
                if (y.w3) return G(a)
            },
            embedSWF: function (c, d, e, f, g, h, i, j, k, l) {
                var m = {
                    success: !1,
                    id: d
                };
                y.w3 && !(y.wk && y.wk < 312) && c && d && e && f && g ? (U(d, !1), B(function () {
                    e += "", f += "";
                    var n = {};
                    if (k && typeof k === b) for (var o in k) n[o] = k[o];
                    n.data = c, n.width = e, n.height = f;
                    var p = {};
                    if (j && typeof j === b) for (var q in j) p[q] = j[q];
                    if (i && typeof i === b) for (var r in i) typeof p.flashvars != a ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
                    if (S(g)) {
                        var s = L(n, p, d);
                        n.id == d && U(d, !0), m.success = !0, m.ref = s
                    } else {
                        if (h && H()) {
                            n.data = h, I(n, p, d, l);
                            return
                        }
                        U(d, !0)
                    }
                    l && l(m)
                })) : l && l(m)
            },
            switchOffAutoHideShow: function () {
                x = !1
            },
            ua: y,
            getFlashPlayerVersion: function () {
                return {
                    major: y.pv[0],
                    minor: y.pv[1],
                    release: y.pv[2]
                }
            },
            hasFlashPlayerVersion: S,
            createSWF: function (a, b, c) {
                return y.w3 ? L(a, b, c) : undefined
            },
            showExpressInstall: function (a, b, c, d) {
                y.w3 && H() && I(a, b, c, d)
            },
            removeSWF: function (a) {
                y.w3 && N(a)
            },
            createCSS: function (a, b, c, d) {
                y.w3 && T(a, b, c, d)
            },
            addDomLoadEvent: B,
            addLoadEvent: C,
            getQueryParamValue: function (a) {
                var b = i.location.search || i.location.hash;
                if (b) {
                    /\?/.test(b) && (b = b.split("?")[1]);
                    if (a == null) return V(b);
                    var c = b.split("&");
                    for (var d = 0; d < c.length; d++) if (c[d].substring(0, c[d].indexOf("=")) == a) return V(c[d].substring(c[d].indexOf("=") + 1))
                }
                return ""
            },
            expressInstallCallback: function () {
                if (u) {
                    var a = P(f);
                    a && p && (a.parentNode.replaceChild(p, a), q && (U(q, !0), y.ie && y.win && (p.style.display = "block")), r && r(s)), u = !1
                }
            }
        }
    }();
(function () {
    if ("undefined" == typeof window || window.WebSocket) return;
    var a = window.console;
    if (!a || !a.log || !a.error) a = {
        log: function () {},
        error: function () {}
    };
    if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
        a.error("Flash Player >= 10.0.0 is required.");
        return
    }
    location.protocol == "file:" && a.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function (a, b, c, d, e) {
        var f = this;
        f.__id = WebSocket.__nextId++, WebSocket.__instances[f.__id] = f, f.readyState = WebSocket.CONNECTING, f.bufferedAmount = 0, f.__events = {}, b ? typeof b == "string" && (b = [b]) : b = [], setTimeout(function () {
            WebSocket.__addTask(function () {
                WebSocket.__flash.create(f.__id, a, b, c || null, d || 0, e || null)
            })
        }, 0)
    }, WebSocket.prototype.send = function (a) {
        if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
        var b = WebSocket.__flash.send(this.__id, encodeURIComponent(a));
        return b < 0 ? !0 : (this.bufferedAmount += b, !1)
    }, WebSocket.prototype.close = function () {
        if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) return;
        this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id)
    }, WebSocket.prototype.addEventListener = function (a, b, c) {
        a in this.__events || (this.__events[a] = []), this.__events[a].push(b)
    }, WebSocket.prototype.removeEventListener = function (a, b, c) {
        if (!(a in this.__events)) return;
        var d = this.__events[a];
        for (var e = d.length - 1; e >= 0; --e) if (d[e] === b) {
            d.splice(e, 1);
            break
        }
    }, WebSocket.prototype.dispatchEvent = function (a) {
        var b = this.__events[a.type] || [];
        for (var c = 0; c < b.length; ++c) b[c](a);
        var d = this["on" + a.type];
        d && d(a)
    }, WebSocket.prototype.__handleEvent = function (a) {
        "readyState" in a && (this.readyState = a.readyState), "protocol" in a && (this.protocol = a.protocol);
        var b;
        if (a.type == "open" || a.type == "error") b = this.__createSimpleEvent(a.type);
        else if (a.type == "close") b = this.__createSimpleEvent("close");
        else {
            if (a.type != "message") throw "unknown event type: " + a.type;
            var c = decodeURIComponent(a.message);
            b = this.__createMessageEvent("message", c)
        }
        this.dispatchEvent(b)
    }, WebSocket.prototype.__createSimpleEvent = function (a) {
        if (document.createEvent && window.Event) {
            var b = document.createEvent("Event");
            return b.initEvent(a, !1, !1), b
        }
        return {
            type: a,
            bubbles: !1,
            cancelable: !1
        }
    }, WebSocket.prototype.__createMessageEvent = function (a, b) {
        if (document.createEvent && window.MessageEvent && !window.opera) {
            var c = document.createEvent("MessageEvent");
            return c.initMessageEvent("message", !1, !1, b, null, null, window, null), c
        }
        return {
            type: a,
            data: b,
            bubbles: !1,
            cancelable: !1
        }
    }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function (a) {
        WebSocket.__addTask(function () {
            WebSocket.__flash.loadManualPolicyFile(a)
        })
    }, WebSocket.__initialize = function () {
        if (WebSocket.__flash) return;
        WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation);
        if (!window.WEB_SOCKET_SWF_LOCATION) {
            a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
            return
        }
        var b = document.createElement("div");
        b.id = "webSocketContainer", b.style.position = "absolute", WebSocket.__isFlashLite() ? (b.style.left = "0px", b.style.top = "0px") : (b.style.left = "-100px", b.style.top = "-100px");
        var c = document.createElement("div");
        c.id = "webSocketFlash", b.appendChild(c), document.body.appendChild(b), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
            hasPriority: !0,
            swliveconnect: !0,
            allowScriptAccess: "always"
        }, null, function (b) {
            b.success || a.error("[WebSocket] swfobject.embedSWF failed")
        })
    }, WebSocket.__onFlashInitialized = function () {
        setTimeout(function () {
            WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug( !! window.WEB_SOCKET_DEBUG);
            for (var a = 0; a < WebSocket.__tasks.length; ++a) WebSocket.__tasks[a]();
            WebSocket.__tasks = []
        }, 0)
    }, WebSocket.__onFlashEvent = function () {
        return setTimeout(function () {
            try {
                var b = WebSocket.__flash.receiveEvents();
                for (var c = 0; c < b.length; ++c) WebSocket.__instances[b[c].webSocketId].__handleEvent(b[c])
            } catch (d) {
                a.error(d)
            }
        }, 0), !0
    }, WebSocket.__log = function (b) {
        a.log(decodeURIComponent(b))
    }, WebSocket.__error = function (b) {
        a.error(decodeURIComponent(b))
    }, WebSocket.__addTask = function (a) {
        WebSocket.__flash ? a() : WebSocket.__tasks.push(a)
    }, WebSocket.__isFlashLite = function () {
        if (!window.navigator || !window.navigator.mimeTypes) return !1;
        var a = window.navigator.mimeTypes["application/x-shockwave-flash"];
        return !a || !a.enabledPlugin || !a.enabledPlugin.filename ? !1 : a.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
    }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function () {
        WebSocket.__initialize()
    }, !1) : window.attachEvent("onload", function () {
        WebSocket.__initialize()
    }))
})(), function (a, b, c) {
    function d(a) {
        if (!a) return;
        b.Transport.apply(this, arguments), this.sendBuffer = []
    }
    function e() {}
    a.XHR = d, b.util.inherit(d, b.Transport), d.prototype.open = function () {
        return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
    }, d.prototype.payload = function (a) {
        var c = [];
        for (var d = 0, e = a.length; d < e; d++) c.push(b.parser.encodePacket(a[d]));
        this.send(b.parser.encodePayload(c))
    }, d.prototype.send = function (a) {
        return this.post(a), this
    }, d.prototype.post = function (a) {
        function d() {
            this.readyState == 4 && (this.onreadystatechange = e, b.posting = !1, this.status == 200 ? b.socket.setBuffer(!1) : b.onClose())
        }
        function f() {
            this.onload = e, b.socket.setBuffer(!1)
        }
        var b = this;
        this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), c.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = f : this.sendXHR.onreadystatechange = d, this.sendXHR.send(a)
    }, d.prototype.close = function () {
        return this.onClose(), this
    }, d.prototype.request = function (a) {
        var c = b.util.request(this.socket.isXDomain()),
            d = b.util.query(this.socket.options.query, "t=" + +(new Date));
        c.open(a || "GET", this.prepareUrl() + d, !0);
        if (a == "POST") try {
            c.setRequestHeader ? c.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : c.contentType = "text/plain"
        } catch (e) {}
        return c
    }, d.prototype.scheme = function () {
        return this.socket.options.secure ? "https" : "http"
    }, d.check = function (a, d) {
        try {
            var e = b.util.request(d),
                f = c.XDomainRequest && e instanceof XDomainRequest,
                g = a && a.options && a.options.secure ? "https:" : "http:",
                h = g != c.location.protocol;
            if (e && (!f || !h)) return !0
        } catch (i) {}
        return !1
    }, d.xdomainCheck = function () {
        return d.check(null, !0)
    }
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (a, b) {
    function c(a) {
        b.Transport.XHR.apply(this, arguments)
    }
    a.htmlfile = c, b.util.inherit(c, b.Transport.XHR), c.prototype.name = "htmlfile", c.prototype.get = function () {
        this.doc = new(window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
        var a = this.doc.createElement("div");
        a.className = "socketio", this.doc.body.appendChild(a), this.iframe = this.doc.createElement("iframe"), a.appendChild(this.iframe);
        var c = this,
            d = b.util.query(this.socket.options.query, "t=" + +(new Date));
        this.iframe.src = this.prepareUrl() + d, b.util.on(window, "unload", function () {
            c.destroy()
        })
    }, c.prototype._ = function (a, b) {
        this.onData(a);
        try {
            var c = b.getElementsByTagName("script")[0];
            c.parentNode.removeChild(c)
        } catch (d) {}
    }, c.prototype.destroy = function () {
        if (this.iframe) {
            try {
                this.iframe.src = "about:blank"
            } catch (a) {}
            this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
        }
    }, c.prototype.close = function () {
        return this.destroy(), b.Transport.XHR.prototype.close.call(this)
    }, c.check = function () {
        if (typeof window != "undefined" && ["Active"].concat("Object").join("X") in window) try {
            var a = new(window[["Active"].concat("Object").join("X")])("htmlfile");
            return a && b.Transport.XHR.check()
        } catch (c) {}
        return !1
    }, c.xdomainCheck = function () {
        return !1
    }, b.transports.push("htmlfile")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (a, b, c) {
    function d() {
        b.Transport.XHR.apply(this, arguments)
    }
    function e() {}
    a["xhr-polling"] = d, b.util.inherit(d, b.Transport.XHR), b.util.merge(d, b.Transport.XHR), d.prototype.name = "xhr-polling", d.prototype.open = function () {
        var a = this;
        return b.Transport.XHR.prototype.open.call(a), !1
    }, d.prototype.get = function () {
        function b() {
            this.readyState == 4 && (this.onreadystatechange = e, this.status == 200 ? (a.onData(this.responseText), a.get()) : a.onClose())
        }
        function d() {
            this.onload = e, this.onerror = e, a.onData(this.responseText), a.get()
        }
        function f() {
            a.onClose()
        }
        if (!this.open) return;
        var a = this;
        this.xhr = this.request(), c.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = d, this.xhr.onerror = f) : this.xhr.onreadystatechange = b, this.xhr.send(null)
    }, d.prototype.onClose = function () {
        b.Transport.XHR.prototype.onClose.call(this);
        if (this.xhr) {
            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = e;
            try {
                this.xhr.abort()
            } catch (a) {}
            this.xhr = null
        }
    }, d.prototype.ready = function (a, c) {
        var d = this;
        b.util.defer(function () {
            c.call(d)
        })
    }, b.transports.push("xhr-polling")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (a, b, c) {
    function e(a) {
        b.Transport["xhr-polling"].apply(this, arguments), this.index = b.j.length;
        var c = this;
        b.j.push(function (a) {
            c._(a)
        })
    }
    var d = c.document && "MozAppearance" in c.document.documentElement.style;
    a["jsonp-polling"] = e, b.util.inherit(e, b.Transport["xhr-polling"]), e.prototype.name = "jsonp-polling", e.prototype.post = function (a) {
        function i() {
            j(), c.socket.setBuffer(!1)
        }
        function j() {
            c.iframe && c.form.removeChild(c.iframe);
            try {
                h = document.createElement('<iframe name="' + c.iframeId + '">')
            } catch (a) {
                h = document.createElement("iframe"), h.name = c.iframeId
            }
            h.id = c.iframeId, c.form.appendChild(h), c.iframe = h
        }
        var c = this,
            d = b.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
        if (!this.form) {
            var e = document.createElement("form"),
                f = document.createElement("textarea"),
                g = this.iframeId = "socketio_iframe_" + this.index,
                h;
            e.className = "socketio", e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", e.style.display = "none", e.target = g, e.method = "POST", e.setAttribute("accept-charset", "utf-8"), f.name = "d", e.appendChild(f), document.body.appendChild(e), this.form = e, this.area = f
        }
        this.form.action = this.prepareUrl() + d, j(), this.area.value = b.JSON.stringify(a);
        try {
            this.form.submit()
        } catch (k) {}
        this.iframe.attachEvent ? h.onreadystatechange = function () {
            c.iframe.readyState == "complete" && i()
        } : this.iframe.onload = i, this.socket.setBuffer(!0)
    }, e.prototype.get = function () {
        var a = this,
            c = document.createElement("script"),
            e = b.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), c.async = !0, c.src = this.prepareUrl() + e, c.onerror = function () {
            a.onClose()
        };
        var f = document.getElementsByTagName("script")[0];
        f.parentNode.insertBefore(c, f), this.script = c, d && setTimeout(function () {
            var a = document.createElement("iframe");
            document.body.appendChild(a), document.body.removeChild(a)
        }, 100)
    }, e.prototype._ = function (a) {
        return this.onData(a), this.open && this.get(), this
    }, e.prototype.ready = function (a, c) {
        var e = this;
        if (!d) return c.call(this);
        b.util.load(function () {
            c.call(e)
        })
    }, e.check = function () {
        return "document" in c
    }, e.xdomainCheck = function () {
        return !0
    }, b.transports.push("jsonp-polling")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (a, b) {
    function h(a) {
        var b = g[a] = {},
            c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }
    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {}
                f.data(a, c, d)
            } else d = b
        }
        return d
    }
    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }
    function n(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            g = b + "mark",
            h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }
    function J() {
        return !1
    }
    function K() {
        return !0
    }
    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }
    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !! b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }
    function U(a) {
        var b = V.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c
    }
    function ib(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function jb(a, b) {
        if (b.nodeType !== 1 || !f.hasData(a)) return;
        var c, d, e, g = f._data(a),
            h = f._data(b, g),
            i = g.events;
        if (i) {
            delete h.handle, h.events = {};
            for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
        }
        h.data && (h.data = f.extend({}, h.data))
    }
    function kb(a, b) {
        var c;
        if (b.nodeType !== 1) return;
        b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
        if (c === "object") b.outerHTML = a.outerHTML;
        else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
            if (c === "option") b.selected = a.defaultSelected;
            else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
        } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
        b.removeAttribute(f.expando)
    }
    function lb(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }
    function mb(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }
    function nb(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? mb(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), mb)
    }
    function ob(a) {
        var b = c.createElement("div");
        return hb.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild
    }
    function pb(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(fb, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }
    function Cb(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight,
            e = b === "width" ? xb : yb,
            g = 0,
            h = e.length;
        if (d > 0) {
            if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px"
        }
        d = zb(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px"
    }
    function Zb(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(Pb),
                    e = 0,
                    g = d.length,
                    h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }
    function $b(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === Tb,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = $b(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = $b(a, c, d, e, "*", g)), l
    }
    function _b(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }
    function ac(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || Eb.test(a) ? d(a, e) : ac(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
        });
        else if (!c && b != null && typeof b == "object") for (var e in b) ac(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }
    function bc(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) return j !== f[0] && f.unshift(j), d[j]
    }
    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes,
            e = {},
            g, h, i = d.length,
            j, k = d[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }
    function ic() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function jc() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    function sc() {
        return setTimeout(tc, 0), rc = f.now()
    }
    function tc() {
        rc = b
    }
    function uc(a, b) {
        var c = {};
        return f.each(qc.concat.apply([], qc.slice(0, b)), function () {
            c[this] = a
        }), c
    }
    function vc(a) {
        if (!kc[a]) {
            var b = c.body,
                d = f("<" + a + ">").appendTo(b),
                e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                lc || (lc = c.createElement("iframe"), lc.frameBorder = lc.width = lc.height = 0), b.appendChild(lc);
                if (!mc || !lc.createElement) mc = (lc.contentWindow || lc.contentDocument).document, mc.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), mc.close();
                d = mc.createElement(a), mc.body.appendChild(d), e = f.css(d, "display"), b.removeChild(lc)
            }
            kc[a] = e
        }
        return kc[a]
    }
    function yc(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }
    var c = a.document,
        d = a.navigator,
        e = a.location,
        f = function () {
            function J() {
                if (e.isReady) return;
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
            var e = function (a, b) {
                    return new e.fn.init(a, b, h)
                },
                f = a.jQuery,
                g = a.$,
                h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                j = /\S/,
                k = /^\s+/,
                l = /\s+$/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/ig,
                w = /^-ms-/,
                x = function (a, b) {
                    return (b + "").toUpperCase()
                },
                y = d.userAgent,
                z, A, B, C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                G = String.prototype.trim,
                H = Array.prototype.indexOf,
                I = {};
            return e.fn = e.prototype = {
                constructor: e,
                init: function (a, d, f) {
                    var g, h, j, k;
                    if (!a) return this;
                    if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                    if (a === "body" && !d && c.body) return this.context = c, this[0] = c.body, this.selector = a, this.length = 1, this;
                    if (typeof a == "string") {
                        a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? g = [null, a, null] : g = i.exec(a);
                        if (g && (g[1] || !d)) {
                            if (g[1]) return d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes), e.merge(this, a);
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = h
                            }
                            return this.context = c, this.selector = a, this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    return e.isFunction(a) ? f.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), e.makeArray(a, this))
                },
                selector: "",
                jquery: "1.7.1",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return F.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var d = this.constructor();
                    return e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
                },
                each: function (a, b) {
                    return e.each(this, a, b)
                },
                ready: function (a) {
                    return e.bindReady(), A.add(a), this
                },
                eq: function (a) {
                    return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(e.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
                var a, c, d, f, g, h, i = arguments[0] || {},
                    j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                    d = i[c], f = a[c];
                    if (i === f) continue;
                    l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                }
                return i
            }, e.extend({
                noConflict: function (b) {
                    return a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f), e
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function (a) {
                    a ? e.readyWait++ : e.ready(!0)
                },
                ready: function (a) {
                    if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                        if (!c.body) return setTimeout(e.ready, 1);
                        e.isReady = !0;
                        if (a !== !0 && --e.readyWait > 0) return;
                        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                    }
                },
                bindReady: function () {
                    if (A) return;
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete") return setTimeout(e.ready, 1);
                    if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
                    else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null
                        } catch (d) {}
                        c.documentElement.doScroll && b && J()
                    }
                },
                isFunction: function (a) {
                    return e.type(a) === "function"
                },
                isArray: Array.isArray ||
                function (a) {
                    return e.type(a) === "array"
                },
                isWindow: function (a) {
                    return a && typeof a == "object" && "setInterval" in a
                },
                isNumeric: function (a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function (a) {
                    return a == null ? String(a) : I[C.call(a)] || "object"
                },
                isPlainObject: function (a) {
                    if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    var d;
                    for (d in a);
                    return d === b || D.call(a, d)
                },
                isEmptyObject: function (a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function (a) {
                    throw new Error(a)
                },
                parseJSON: function (b) {
                    if (typeof b != "string" || !b) return null;
                    b = e.trim(b);
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                    e.error("Invalid JSON: " + b)
                },
                parseXML: function (c) {
                    var d, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    } catch (g) {
                        d = b
                    }
                    return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c), d
                },
                noop: function () {},
                globalEval: function (b) {
                    b && j.test(b) && (a.execScript ||
                    function (b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function (a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function (a, c, d) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || e.isFunction(a);
                    if (d) {
                        if (i) {
                            for (f in a) if (c.apply(a[f], d) === !1) break
                        } else for (; g < h;) if (c.apply(a[g++], d) === !1) break
                    } else if (i) {
                        for (f in a) if (c.call(a[f], f, a[f]) === !1) break
                    } else for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
                    return a
                },
                trim: G ?
                function (a) {
                    return a == null ? "" : G.call(a)
                } : function (a) {
                    return a == null ? "" : a.toString().replace(k, "").replace(l, "")
                },
                makeArray: function (a, b) {
                    var c = b || [];
                    if (a != null) {
                        var d = e.type(a);
                        a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                    }
                    return c
                },
                inArray: function (a, b, c) {
                    var d;
                    if (b) {
                        if (H) return H.call(b, a, c);
                        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                        for (; c < d; c++) if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function (a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else while (c[e] !== b) a[d++] = c[e++];
                    return a.length = d, a
                },
                grep: function (a, b, c) {
                    var d = [],
                        e;
                    c = !! c;
                    for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function (a, c, d) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                    if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
                    else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function (a, c) {
                    if (typeof c == "string") {
                        var d = a[c];
                        c = a, a = d
                    }
                    if (!e.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function () {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    return g.guid = a.guid = a.guid || g.guid || e.guid++, g
                },
                access: function (a, c, d, f, g, h) {
                    var i = a.length;
                    if (typeof c == "object") {
                        for (var j in c) e.access(a, j, c[j], f, g, d);
                        return a
                    }
                    if (d !== b) {
                        f = !h && f && e.isFunction(d);
                        for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                        return a
                    }
                    return i ? g(a[0], c) : b
                },
                now: function () {
                    return (new Date).getTime()
                },
                uaMatch: function (a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function () {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                        return f && f instanceof e && !(f instanceof a) && (f = a(f)), e.fn.init.call(this, d, f, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(c);
                    return a
                },
                browser: {}
            }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
                c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
            } : c.attachEvent && (B = function () {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
            }), e
        }(),
        g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [],
            d = [],
            e, i, j, k, l, m = function (b) {
                var d, e, g, h, i;
                for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
            },
            n = function (b, f) {
                f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
                for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                    e = !0;
                    break
                }
                i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
            },
            o = {
                add: function () {
                    if (c) {
                        var a = c.length;
                        m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
                    }
                    return this
                },
                remove: function () {
                    if (c) {
                        var b = arguments,
                            d = 0,
                            e = b.length;
                        for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
                            i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                            if (a.unique) break
                        }
                    }
                    return this
                },
                has: function (a) {
                    if (c) {
                        var b = 0,
                            d = c.length;
                        for (; b < d; b++) if (a === c[b]) return !0
                    }
                    return !1
                },
                empty: function () {
                    return c = [], this
                },
                disable: function () {
                    return c = d = e = b, this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    return d = b, (!e || e === !0) && o.disable(), this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (b, c) {
                    return d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c)), this
                },
                fire: function () {
                    return o.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!e
                }
            };
        return o
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"),
                c = f.Callbacks("once memory"),
                d = f.Callbacks("memory"),
                e = "pending",
                g = {
                    resolve: b,
                    reject: c,
                    notify: d
                },
                h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function () {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function (a, b, c) {
                        return i.done(a).fail(b).progress(c), this
                    },
                    always: function () {
                        return i.done.apply(i, arguments).fail.apply(i, arguments), this
                    },
                    pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0],
                                    e = b[1],
                                    g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function (a) {
                        if (a == null) a = h;
                        else for (var b in h) a[b] = h[b];
                        return a
                    }
                },
                i = h.promise({}),
                j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            return i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i), i
        },
        when: function (a) {
            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }
            var b = i.call(arguments, 0),
                c = 0,
                d = b.length,
                e = new Array(d),
                g = d,
                h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
                k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"),
            r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !! q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !! e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !! c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test
        } catch (s) {
            b.deleteExpando = !1
        }!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (q.attachEvent) for (o in {
            submit: 1,
            change: 1,
            focusin: 1
        }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        return k.removeChild(q), k = g = h = j = q = i = null, f(function () {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            if (!r) return;
            j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i)
        }), b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/,
        k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (a) {
            return a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando], !! a && !m(a)
        },
        data: function (a, c, d, e) {
            if (!f.acceptData(a)) return;
            var g, h, i, j = f.expando,
                k = typeof c == "string",
                l = a.nodeType,
                m = l ? f.cache : a,
                n = l ? a[j] : a[j] && j,
                o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            return g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d), o && !h[c] ? g.events : (k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h, i)
        },
        removeData: function (a, b, c) {
            if (!f.acceptData(a)) return;
            var d, e, g, h = f.expando,
                i = a.nodeType,
                j = i ? f.cache : a,
                k = i ? a[h] : h;
            if (!j[k]) return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d)) return
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k])) return
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0)
                    }
                }
                return h
            }
            return typeof a == "object" ? this.each(function () {
                f.data(this, a)
            }) : (d = a.split("."), d[1] = d[1] ? "." + d[1] : "", c === b ? (h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h)), h === b && d[1] ? this.data(d[0]) : h) : this.each(function () {
                var b = f(this),
                    e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            }))
        },
        removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        },
        queue: function (a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c)), d || []
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b),
                d = c.shift(),
                e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            return typeof a != "string" && (c = a, a = "fx"), c === b ? f.queue(this[0], a) : this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            return a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(),
                e = this,
                g = e.length,
                h = 1,
                i = a + "defer",
                j = a + "queue",
                k = a + "mark",
                l;
            while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            return m(), d.promise()
        }
    });
    var o = /[\n\t\r]/g,
        p = /\s+/,
        q = /\r/g,
        r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i,
        t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute,
        w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, a, b, !0, f.attr)
        },
        removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        },
        prop: function (a, b) {
            return f.access(this, a, b, !0, f.prop)
        },
        removeProp: function (a) {
            return a = f.propFix[a] || a, this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a;
                    else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g)
                    }
                }
            }
            return this
        },
        removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h)
                    } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                d = typeof b == "boolean";
            return f.isFunction(a) ? this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function () {
                if (c === "string") {
                    var e, g = 0,
                        h = f(this),
                        i = b,
                        j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function (a) {
            var b = " " + a + " ",
                c = 0,
                d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function (a) {
            var c, d, e, g = this[0];
            if (!arguments.length) {
                if (g) return c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, typeof d == "string" ? d.replace(q, "") : d == null ? "" : d);
                return
            }
            return e = f.isFunction(a), this.each(function (d) {
                var g = f(this),
                    h;
                if (this.nodeType !== 1) return;
                e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                    return a == null ? "" : a + ""
                })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
            })
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex,
                        h = [],
                        i = a.options,
                        j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    return j && !h.length && i.length ? f(i[g]).val() : h
                },
                set: function (a, b) {
                    var c = f.makeArray(b);
                    return f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1), c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!a || j === 3 || j === 8 || j === 2) return;
            if (e && c in f.attrFn) return f(a)[c](d);
            if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return
                }
                return h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d)
            }
            return h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g)
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            },
            value: {
                get: function (a, b) {
                    return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null
                },
                set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) return;
            return h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function (a, b, c) {
            var d;
            return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
        }
    }, v || (y = {
        name: !0,
        id: !0
    }, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") return a.setAttribute(b, "auto"), c
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i,
        A = /^([^\.]*)?(?:\.(.+))?$/,
        B = /\bhover(\.\S+)?\b/,
        C = /^key/,
        D = /^(?:mouse|contextmenu)|click/,
        E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        G = function (a) {
            var b = F.exec(a);
            return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b
        },
        H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        },
        I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a))) return;
            d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                return typeof f == "undefined" || !! a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments)
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                    type: m,
                    origType: l[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: g,
                    quick: G(g),
                    namespace: n.join(".")
                }, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
            }
            a = null
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a),
                h, i, j, k, l, m, n, o, p, q, r, s;
            if (!g || !(o = g.events)) return;
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                    continue
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c,
                    i = [],
                    j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [
                    [e, p.bindType || h]
                ];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                return c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n)), c.result
            }
            return
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [],
                e = d.delegateCount,
                g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace,
                i = [],
                j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                    q.length && i.push({
                        elem: l,
                        matches: q
                    })
                }
            }
            d.length > e && i.push({
                elem: this,
                matches: d.slice(e)
            });
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button,
                    i = d.fromElement;
                return a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a
            }
        },
        fix: function (a) {
            if (a[f.expando]) return a;
            var d, e, g = a,
                h = f.event.fixHooks[a.type] || {},
                i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            return a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ?
    function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            if (!a) return;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            if (!a) return;
            a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c = this,
                    d = a.relatedTarget,
                    e = a.handleObj,
                    g = e.selector,
                    h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target,
                    d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                }), d._submit_attached = !0)
            })
        },
        teardown: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        },
        handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            return f.event.remove(this, "._change"), z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        var d = 0,
            e = function (a) {
                f.event.simulate(b, a.target, f.event.fix(a), !0)
            };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            },
            teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J;
            else if (!e) return this;
            return g === 1 && (h = e, e = function (a) {
                return f().off(a), h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++)), this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        },
        one: function (a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        },
        off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                return f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler), this
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            return d === !1 && (d = J), this.each(function () {
                f.event.remove(this, a, d, c)
            })
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function (a, b) {
            return this.off(a, null, b)
        },
        live: function (a, b, c) {
            return f(this.context).on(a, this.selector, b, c), this
        },
        die: function (a, b) {
            return f(this.context).off(a, this.selector || "**", b), this
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0)
        },
        toggle: function (a) {
            var b = arguments,
                c = a.guid || f.guid++,
                d = 0,
                e = function (c) {
                    var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                    return f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
                };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        },
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            d = "sizcache" + (Math.random() + "").replace(".", ""),
            e = 0,
            g = Object.prototype.toString,
            h = !1,
            i = !0,
            j = /\\/g,
            k = /\r\n/g,
            l = /\W/;
        [0, 0].sort(function () {
            return i = !1, 0
        });
        var m = function (b, d, e, f) {
                e = e || [], d = d || c;
                var h = d;
                if (d.nodeType !== 1 && d.nodeType !== 9) return [];
                if (!b || typeof b != "string") return e;
                var i, j, k, l, n, q, r, t, u = !0,
                    v = m.isXML(d),
                    w = [],
                    x = b;
                do {
                    a.exec(""), i = a.exec(x);
                    if (i) {
                        x = i[3], w.push(i[1]);
                        if (i[2]) {
                            l = i[3];
                            break
                        }
                    }
                } while (i);
                if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
                else {
                    j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                    while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                } else {
                    !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                    if (d) {
                        n = f ? {
                            expr: w.pop(),
                            set: s(f)
                        } : m.find(w.pop(), w.length !== 1 || w[0] !== "~" && w[0] !== "+" || !d.parentNode ? d : d.parentNode, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                        while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                    } else k = w = []
                }
                k || (k = j), k || m.error(q || b);
                if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k);
                else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
                else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
                else s(k, e);
                return l && (m(l, h, e, f), m.uniqueSort(e)), e
            };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            }
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a,
                r = [],
                s = c,
                t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0;
                        else if (f === !0) continue
                    }
                    if (f) for (n = 0;
                    (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break
                    }
                }
                if (a === q) {
                    if (g != null) break;
                    m.error(a)
                }
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
                var b, c, d = a.nodeType,
                    e = "";
                if (d) {
                    if (d === 1 || d === 9) {
                        if (typeof a.textContent == "string") return a.textContent;
                        if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                        for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                    } else if (d === 3 || d === 4) return a.nodeValue
                } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
                return e
            },
            o = m.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function (a) {
                        return a.getAttribute("href")
                    },
                    type: function (a) {
                        return a.getAttribute("type")
                    }
                },
                relative: {
                    "+": function (a, b) {
                        var c = typeof b == "string",
                            d = c && !l.test(b),
                            e = c && !d;
                        d && (b = b.toLowerCase());
                        for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                            while ((h = h.previousSibling) && h.nodeType !== 1);
                            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                        }
                        e && m.filter(b, a, !0)
                    },
                    ">": function (a, b) {
                        var c, d = typeof b == "string",
                            e = 0,
                            f = a.length;
                        if (d && !l.test(b)) {
                            b = b.toLowerCase();
                            for (; e < f; e++) {
                                c = a[e];
                                if (c) {
                                    var g = c.parentNode;
                                    a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                }
                            }
                        } else {
                            for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                            d && m.filter(b, a, !0)
                        }
                    },
                    "": function (a, b, c) {
                        var d, f = e++,
                            g = x;
                        typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                    },
                    "~": function (a, b, c) {
                        var d, f = e++,
                            g = x;
                        typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                    }
                },
                find: {
                    ID: function (a, b, c) {
                        if (typeof b.getElementById != "undefined" && !c) {
                            var d = b.getElementById(a[1]);
                            return d && d.parentNode ? [d] : []
                        }
                    },
                    NAME: function (a, b) {
                        if (typeof b.getElementsByName != "undefined") {
                            var c = [],
                                d = b.getElementsByName(a[1]);
                            for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                            return c.length === 0 ? null : c
                        }
                    },
                    TAG: function (a, b) {
                        if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                    }
                },
                preFilter: {
                    CLASS: function (a, b, c, d, e, f) {
                        a = " " + a[1].replace(j, "") + " ";
                        if (f) return a;
                        for (var g = 0, h;
                        (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                        return !1
                    },
                    ID: function (a) {
                        return a[1].replace(j, "")
                    },
                    TAG: function (a, b) {
                        return a[1].replace(j, "").toLowerCase()
                    },
                    CHILD: function (a) {
                        if (a[1] === "nth") {
                            a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                            var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                            a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                        } else a[2] && m.error(a[0]);
                        return a[0] = e++, a
                    },
                    ATTR: function (a, b, c, d, e, f) {
                        var g = a[1] = a[1].replace(j, "");
                        return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a
                    },
                    PSEUDO: function (b, c, d, e, f) {
                        if (b[1] === "not") {
                            if (!((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))) {
                                var g = m.filter(b[3], c, d, !0 ^ f);
                                return d || e.push.apply(e, g), !1
                            }
                            b[3] = m(b[3], null, null, c)
                        } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                        return b
                    },
                    POS: function (a) {
                        return a.unshift(!0), a
                    }
                },
                filters: {
                    enabled: function (a) {
                        return a.disabled === !1 && a.type !== "hidden"
                    },
                    disabled: function (a) {
                        return a.disabled === !0
                    },
                    checked: function (a) {
                        return a.checked === !0
                    },
                    selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    parent: function (a) {
                        return !!a.firstChild
                    },
                    empty: function (a) {
                        return !a.firstChild
                    },
                    has: function (a, b, c) {
                        return !!m(c[3], a).length
                    },
                    header: function (a) {
                        return /h\d/i.test(a.nodeName)
                    },
                    text: function (a) {
                        var b = a.getAttribute("type"),
                            c = a.type;
                        return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                    },
                    radio: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                    },
                    checkbox: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                    },
                    file: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "file" === a.type
                    },
                    password: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "password" === a.type
                    },
                    submit: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "submit" === a.type
                    },
                    image: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "image" === a.type
                    },
                    reset: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "reset" === a.type
                    },
                    button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && "button" === a.type || b === "button"
                    },
                    input: function (a) {
                        return /input|select|textarea|button/i.test(a.nodeName)
                    },
                    focus: function (a) {
                        return a === a.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function (a, b) {
                        return b === 0
                    },
                    last: function (a, b, c, d) {
                        return b === d.length - 1
                    },
                    even: function (a, b) {
                        return b % 2 === 0
                    },
                    odd: function (a, b) {
                        return b % 2 === 1
                    },
                    lt: function (a, b, c) {
                        return b < c[3] - 0
                    },
                    gt: function (a, b, c) {
                        return b > c[3] - 0
                    },
                    nth: function (a, b, c) {
                        return c[3] - 0 === b
                    },
                    eq: function (a, b, c) {
                        return c[3] - 0 === b
                    }
                },
                filter: {
                    PSEUDO: function (a, b, c, d) {
                        var e = b[1],
                            f = o.filters[e];
                        if (f) return f(a, c, b, d);
                        if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                        if (e === "not") {
                            var g = b[3];
                            for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                            return !0
                        }
                        m.error(e)
                    },
                    CHILD: function (a, b) {
                        var c, e, f, g, h, i, j, k = b[1],
                            l = a;
                        switch (k) {
                        case "only":
                        case "first":
                            while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                            if (k === "first") return !0;
                            l = a;
                        case "last":
                            while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                            return !0;
                        case "nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0) return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[d] = f
                            }
                            return j = a.nodeIndex - e, c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                        }
                    },
                    ID: function (a, b) {
                        return a.nodeType === 1 && a.getAttribute("id") === b
                    },
                    TAG: function (a, b) {
                        return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
                    },
                    CLASS: function (a, b) {
                        return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                    },
                    ATTR: function (a, b) {
                        var c = b[1],
                            d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                            e = d + "",
                            f = b[2],
                            g = b[4];
                        return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                    },
                    POS: function (a, b, c, d) {
                        var e = b[2],
                            f = o.setFilters[e];
                        if (f) return f(a, c, b, d)
                    }
                }
            },
            p = o.match.POS,
            q = function (a, b) {
                return "\\" + (b - 0 + 1)
            };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function (a, b) {
                return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
            };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0,
                    d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]);
                else for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) return h = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [],
                f = [],
                g = a.parentNode,
                i = b.parentNode,
                j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"),
                d = "script" + (new Date).getTime(),
                e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll &&
        function () {
            var a = m,
                b = c.createElement("div"),
                d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (b.querySelectorAll && b.querySelectorAll(".TEST").length === 0) return;
            m = function (b, e, f, g) {
                e = e || c;
                if (!g && !m.isXML(e)) {
                    var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                    if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                        if (h[1]) return s(e.getElementsByTagName(b), f);
                        if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                    }
                    if (e.nodeType === 9) {
                        if (b === "body" && e.body) return s([e.body], f);
                        if (h && h[3]) {
                            var i = e.getElementById(h[3]);
                            if (!i || !i.parentNode) return s([], f);
                            if (i.id === h[3]) return s([i], f)
                        }
                        try {
                            return s(e.querySelectorAll(b), f)
                        } catch (j) {}
                    } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                        var k = e,
                            l = e.getAttribute("id"),
                            n = l || d,
                            p = e.parentNode,
                            q = /^\s*[+~]/.test(b);
                        l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                        try {
                            if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                        } catch (r) {} finally {
                            l || k.removeAttribute("id")
                        }
                    }
                }
                return a(b, e, f, g)
            };
            for (var e in a) m[e] = a[e];
            b = null
        }(), function () {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"),
                    e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f
                        }
                    } catch (g) {}
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return;
            a.lastChild.className = "e";
            if (a.getElementsByClassName("e").length === 1) return;
            o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
            }, a = null
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
                var d, e = [],
                    f = "",
                    g = b.nodeType ? [b] : b;
                while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
                a = o.relative[a] ? a + "*" : a;
                for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
                return m.filter(f, e)
            };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/,
        M = /^(?:parents|prevUntil|prevAll)/,
        N = /,/,
        O = /^.[^:#\[\.,]*$/,
        P = Array.prototype.slice,
        Q = f.expr.match.POS,
        R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function (a) {
            var b = this,
                c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a),
                g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break
                }
            }
            return e
        },
        has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0
            })
        },
        not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function (a, b) {
            var c = [],
                d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a)
        },
        index: function (a) {
            return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function (a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function (a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function (a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return f.sibling(a.parentNode.firstChild, a)
        },
        children: function (a) {
            return f.sibling(a.firstChild)
        },
        contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            return L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function (a, c, d) {
            var e = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        },
        nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g,
        X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Z = /<([\w:]+)/,
        $ = /<tbody/i,
        _ = /<|&#?\w+;/,
        ab = /<(?:script|style)/i,
        bb = /<(?:script|object|embed|option|style)/i,
        cb = new RegExp("<(?:" + V + ")", "i"),
        db = /checked\s*(?:[^=]|=\s*.checked.)/i,
        eb = /\/(java|ecma)script/i,
        fb = /^\s*<!(?:\[CDATA\[|\-\-)/,
        gb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        hb = U(c);
    gb.optgroup = gb.option, gb.tbody = gb.tfoot = gb.colgroup = gb.caption = gb.thead, gb.th = gb.td, f.support.htmlSerialize || (gb._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            return f.isFunction(a) ? this.each(function (b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()))
            }) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a)) : f.text(this)
        },
        wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            return f.isFunction(a) ? this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            }) : this.each(function () {
                var b = f(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, f.clean(arguments)), a
            }
        },
        remove: function (a, b) {
            for (var c = 0, d;
            (d = this[c]) != null; c++) if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function () {
            for (var a = 0, b;
            (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function (a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () {
                return f.clone(this, a, b)
            })
        },
        html: function (a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ab.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !gb[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            } else f.isFunction(a) ? this.each(function (b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function (a) {
            return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function (b) {
                var c = f(this),
                    d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : (typeof a != "string" && (a = f(a).detach()), this.each(function () {
                var b = this.nextSibling,
                    c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a)
            })) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, c, d) {
            var e, g, h, i, j = a[0],
                k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && db.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? ib(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, pb)
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !db.test(j)) && (f.support.html5Clone || !cb.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
            fragment: e,
            cacheable: g
        }
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [],
                e = f(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || !cb.test("<" + a.nodeName) ? a.cloneNode(!0) : ob(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                kb(a, h), d = lb(a), e = lb(h);
                for (g = 0; d[g]; ++g) e[g] && kb(d[g], e[g])
            }
            if (b) {
                jb(a, h);
                if (c) {
                    d = lb(a), e = lb(h);
                    for (g = 0; d[g]; ++g) jb(d[g], e[g])
                }
            }
            return d = e = null, h
        },
        clean: function (a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [],
                i;
            for (var j = 0, k;
            (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k);
                else {
                    k = k.replace(Y, "<$1></$2>");
                    var l = (Z.exec(k) || ["", ""])[1].toLowerCase(),
                        m = gb[l] || gb._default,
                        n = m[0],
                        o = b.createElement("div");
                    b === c ? hb.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                    while (n--) o = o.lastChild;
                    if (!f.support.tbody) {
                        var p = $.test(k),
                            q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                        for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                    }!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
                }
                var r;
                if (!f.support.appendChecked) if (k[0] && typeof (r = k.length) == "number") for (i = 0; i < r; i++) nb(k[i]);
                else nb(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k)
            }
            if (d) {
                g = function (a) {
                    return !a.type || eb.test(a.type)
                };
                for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
                else {
                    if (h[j].nodeType === 1) {
                        var s = f.grep(h[j].getElementsByTagName("script"), g);
                        h.splice.apply(h, [j + 1, 0].concat(s))
                    }
                    d.appendChild(h[j])
                }
            }
            return h
        },
        cleanData: function (a) {
            var b, c, d = f.cache,
                e = f.event.special,
                g = f.support.deleteExpando;
            for (var h = 0, i;
            (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var qb = /alpha\([^)]*\)/i,
        rb = /opacity=([^)]*)/,
        sb = /([A-Z]|^ms)/g,
        tb = /^-?\d+(?:px)?$/i,
        ub = /^-?\d/,
        vb = /^([\-+])=([\-+.\de]+)/,
        wb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        xb = ["Left", "Right"],
        yb = ["Top", "Bottom"],
        zb, Ab, Bb;
    f.fn.css = function (a, c) {
        return arguments.length === 2 && c === b ? this : f.access(this, a, c, !0, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        })
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = zb(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
            var g, h, i = f.camelCase(c),
                j = a.style,
                k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
            h = typeof d, h === "string" && (g = vb.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d)) return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                j[c] = d
            } catch (l) {}
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (zb) return zb(a, c)
        },
        swap: function (a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        }
    }), f.curCSS = f.css, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                var e;
                if (c) return a.offsetWidth !== 0 ? Cb(a, b, d) : (f.swap(a, wb, function () {
                    e = Cb(a, b, d)
                }), e)
            },
            set: function (a, b) {
                if (!tb.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return rb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function (a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(qb, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = qb.test(g) ? g.replace(qb, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                var c;
                return f.swap(a, {
                    display: "inline-block"
                }, function () {
                    b ? c = zb(a, "margin-right", "marginRight") : c = a.style.marginRight
                }), c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (Ab = function (a, b) {
        var c, d, e;
        return b = b.replace(sb, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), c
    }), c.documentElement.currentStyle && (Bb = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        return f === null && g && (e = g[b]) && (f = e), !tb.test(f) && ub.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f
    }), zb = Ab || Bb, f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    });
    var Db = /%20/g,
        Eb = /\[\]$/,
        Fb = /\r?\n/g,
        Gb = /#.*$/,
        Hb = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Ib = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Jb = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Kb = /^(?:GET|HEAD)$/,
        Lb = /^\/\//,
        Mb = /\?/,
        Nb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Ob = /^(?:select|textarea)/i,
        Pb = /\s+/,
        Qb = /([?&])_=[^&]*/,
        Rb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        Sb = f.fn.load,
        Tb = {},
        Ub = {},
        Vb, Wb, Xb = ["*/"] + ["*"];
    try {
        Vb = e.href
    } catch (Yb) {
        Vb = c.createElement("a"), Vb.href = "", Vb = Vb.href
    }
    Wb = Rb.exec(Vb.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && Sb) return Sb.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            return f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(Nb, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            }), this
        },
        serialize: function () {
            return f.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || Ob.test(this.nodeName) || Ib.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {
                        name: b.name,
                        value: a.replace(Fb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Fb, "\r\n")
                }
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            return f.isFunction(d) && (g = g || e, e = d, d = b), f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            return b ? _b(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), _b(a, b), a
        },
        ajaxSettings: {
            url: Vb,
            isLocal: Jb.test(Wb[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Xb
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Zb(Tb),
        ajaxTransport: Zb(Ub),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s === 2) return;
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c,
                    x = l ? bc(d, v, l) : b,
                    y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                    }
                    if (a === 304) w = "notmodified", o = !0;
                    else try {
                        r = cc(d, x), w = "success", o = !0
                    } catch (A) {
                        w = "parsererror", u = A
                    }
                } else {
                    u = w;
                    if (!w || a) w = "error", a < 0 && (a = 0)
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c),
                e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                h = f.Deferred(),
                i = f.Callbacks("once memory"),
                j = d.statusCode || {},
                k, l = {},
                m = {},
                n, o, p, q, r, s = 0,
                t, u, v = {
                    readyState: 0,
                    setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    },
                    getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = Hb.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function (a) {
                        return s || (d.mimeType = a), this
                    },
                    abort: function (a) {
                        return a = a || "abort", p && p.abort(a), w(0, a), this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2) for (b in a) j[b] = [j[b], a[b]];
                    else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(Gb, "").replace(Lb, Wb[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(Pb), d.crossDomain == null && (r = Rb.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == Wb[1] && r[2] == Wb[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (Wb[3] || (Wb[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), $b(Tb, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !Kb.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (Mb.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(),
                        y = d.url.replace(Qb, "$1_=" + x);
                    d.url = y + (y === d.url ? (Mb.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + Xb + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (!d.beforeSend || d.beforeSend.call(e, v, d) !== !1 && s !== 2) {
                for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](d[u]);
                p = $b(Ub, d, c, v);
                if (!p) w(-1, "No Transport");
                else {
                    v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                        v.abort("timeout")
                    }, d.timeout));
                    try {
                        s = 1, p.send(l, w)
                    } catch (z) {
                        if (!(s < 2)) throw z;
                        w(-1, z)
                    }
                }
                return v
            }
            return v.abort(), !1
        },
        param: function (a, c) {
            var d = [],
                e = function (a, b) {
                    b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value)
            });
            else for (var g in a) ac(g, a[g], c, e);
            return d.join("&").replace(Db, "+")
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var dc = f.now(),
        ec = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return f.expando + "_" + dc++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ec.test(b.url) || e && ec.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2";
            return b.jsonp !== !1 && (j = j.replace(ec, l), b.url === j && (e && (k = k.replace(ec, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                return g || f.error(h + " was not called"), g[0]
            }, b.dataTypes[0] = "json", "script"
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (a) {
                return f.globalEval(a), a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var fc = a.ActiveXObject ?
    function () {
        for (var a in hc) hc[a](0, 1)
    } : !1, gc = 0, hc;
    f.ajaxSettings.xhr = a.ActiveXObject ?
    function () {
        return !this.isLocal && ic() || jc()
    } : ic, function (a) {
        f.extend(f.support, {
            ajax: !! a,
            cors: !! a && "withCredentials" in a
        })
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(),
                        i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j])
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, fc && delete hc[i]);
                                if (e) h.readyState !== 4 && h.abort();
                                else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++gc, fc && (hc || (hc = {}, f(a).unload(fc)), hc[i] = d), h.onreadystatechange = d)
                },
                abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var kc = {},
        lc, mc, nc = /^(?:toggle|show|hide)$/,
        oc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        pc, qc = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        rc;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(uc("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", vc(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function (a, b, c) {
            if (a || a === 0) return this.animate(uc("hide", 3), a, b, c);
            var d, e, g = 0,
                h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            return f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(uc("toggle", 3), a, b, c), this
        },
        fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e),
                    c = this.nodeType === 1,
                    d = c && f(this).is(":hidden"),
                    g, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || vc(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], nc.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = oc.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            return f.isEmptyObject(a) ? this.each(e.complete, [!1]) : (a = f.extend({}, a), e.queue === !1 ? this.each(g) : this.queue(e.queue, g))
        },
        stop: function (a, c, d) {
            return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }
                var b, c = !1,
                    e = f.timers,
                    g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: uc("show", 1),
        slideUp: uc("hide", 1),
        slideToggle: uc("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            }, d
        },
        easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            },
            swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] == null || !! this.elem.style && this.elem.style[this.prop] != null) {
                var a, b = f.css(this.elem, this.prop);
                return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
            }
            return this.elem[this.prop]
        },
        custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this,
                g = f.fx;
            this.startTime = rc || sc(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
            }, h() && f.timers.push(h) && !pc && (pc = setInterval(g.tick, g.interval))
        },
        show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function (a) {
            var b, c, d, e = rc || sc(),
                g = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers,
                c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(pc), pc = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(["width", "height"], function (a, b) {
        f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var wc = /^t(?:able|d|h)$/i,
        xc = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
        var b = this[0],
            c;
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (d) {}
        var e = b.ownerDocument,
            g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = e.body,
            i = yc(e),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
            n = c.top + l - j,
            o = c.left + m - k;
        return {
            top: n,
            left: o
        }
    } : f.fn.offset = function (a) {
        var b = this[0];
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent,
            e = b,
            g = b.ownerDocument,
            h = g.documentElement,
            i = g.body,
            j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle,
            l = b.offsetTop,
            m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !wc.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        return f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft)), {
            top: l,
            left: m
        }
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            }
        },
        setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a),
                g = e.offset(),
                h = f.css(a, "top"),
                i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
                k = {},
                l = {},
                m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = xc.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !xc.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + c;
        f.fn[d] = function (c) {
            var e, g;
            return c === b ? (e = this[0], e ? (g = yc(e), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]) : null) : this.each(function () {
                g = yc(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
            })
        }
    }), f.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
        }, f.fn["outer" + c] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, f.fn[d] = function (a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function (b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c],
                    h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d),
                    j = parseFloat(i);
                return f.isNumeric(j) ? j : i
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
}(window), function () {
    function f(a, b) {
        b || (b = {});
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }
    function h(a, b) {
        return a.bold === b.bold && a.italic === b.italic && a.underline === b.underline && a.inverse === b.inverse && a.fg256 === b.fg256 && a.bg256 === b.bg256 && a.fg === b.fg && a.bg === b.bg && a.cursor === b.cursor
    }
    "use strict";
    var a = 0,
        b = 1,
        c = 2,
        d = 3,
        e = 4,
        g = function (a, b, c) {
            this.cols = a, this.rows = b, this.handler = c, this.currentHeight = this.rows, this.totalHeight = 1e3, this.ybase = 0, this.ydisp = 0, this.x = 0, this.y = 0, this.cursorState = 0, this.cursorHidden = !1, this.convertEol = !1, this.state = 0, this.outputQueue = "", this.scrollTop = 0, this.scrollBottom = this.rows - 1, this.applicationKeypad = !1, this.originMode = !1, this.insertMode = !1, this.wraparoundMode = !1, this.mouseEvents, this.tabs = [], this.charset = null, this.normal = null, this.bgColors = ["#2e3436", "#cc0000", "#4e9a06", "#c4a000", "#3465a4", "#75507b", "#06989a", "#d3d7cf"], this.fgColors = ["#555753", "#ef2929", "#8ae234", "#fce94f", "#729fcf", "#ad7fa8", "#34e2e2", "#eeeeec"], this.defAttr = {
                ch: 32,
                fg: -1,
                bg: -1,
                fg256: !1,
                bg256: !1,
                bold: !1,
                italic: !1,
                underline: !1,
                inverse: !1
            }, this.curAttr = f(this.defAttr), this.isMac = ~navigator.userAgent.indexOf("Mac"), this.keyState = 0, this.keyStr = "", this.params = [], this.currentParam = 0;
            var d = this.rows - 1;
            this.lines = [this.blankLine()];
            while (d--) this.lines.push(this.blankLine())
        };
    g.focus = null, g.prototype.focus = function () {
        g.focus && (g.focus.cursorHidden = !0), this.cursorHidden = !1, g.focus = this
    }, g.bindKeys = function () {
        if (g.focus) return;
        document.addEventListener("keydown", function (a) {
            return g.focus.keyDownHandler(a)
        }, !0), document.addEventListener("keypress", function (a) {
            return g.focus.keyPressHandler(a)
        }, !0)
    }, g.prototype.open = function (a) {
        var b = 0,
            c;
        this.element = a, this.children = [];
        for (; b < this.rows; b++) c = document.createElement("div"), c.className = "term", this.element.appendChild(c), this.children.push(c);
        this.refresh(0, this.rows - 1), g.focus = this
    }, g.prototype.startCursorBlink = function () {
        var a = this;
        this._blinkInterval && this.stopCursorBlink(), this._blinkInterval = setInterval(function () {
            a.cursorBlink()
        }, 500)
    }, g.prototype.stopCursorBlink = function () {
        this._blinkInterval && (clearInterval(this._blinkInterval), this._blinkInterval = null)
    }, g.prototype.bindMouse = function () {
        function d(a) {
            if (!b.mouseEvents) return;
            var d = a.target,
                e, i;
            e = g(a), i = h(a);
            if (!i) return;
            f(e, i), c = a.type === "mousedown" ? e : !1, a.preventDefault && a.preventDefault(), a.returnValue = !1, a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
        }
        function e(a) {
            if (!b.mouseEvents) return;
            if (!c) return;
            var d = c,
                e;
            e = h(a);
            if (!e) return;
            d += 32, f(d, e)
        }
        function f(a, c) {
            b.queueChars("[M" + String.fromCharCode(a, c.x, c.y))
        }
        function g(a) {
            var b, c, d, e, f;
            switch (a.type) {
            case "mousedown":
                b = a.button != null ? +a.button : a.which != null ? a.which - 1 : null, ~navigator.userAgent.indexOf("MSIE") && (b = b === 1 ? 0 : b === 4 ? 1 : b);
                break;
            case "mouseup":
                b = 3;
                break;
            case "DOMMouseScroll":
                b = a.detail < 0 ? 64 : 65;
                break;
            case "mousewheel":
                b = a.wheelDeltaY > 0 ? 64 : 65
            }
            return c = a.shiftKey ? 4 : 0, d = a.metaKey ? 8 : 0, e = a.ctrlKey ? 16 : 0, f = c | d | e, b = 32 + (f << 2) + b, b
        }
        function h(a) {
            var c, d, e, f, g;
            if (a.pageX == null) return;
            c = a.pageX, d = a.pageY, g = b.element;
            while (g !== document.body) c -= g.offsetLeft, d -= g.offsetTop, g = g.parentNode;
            e = b.element.clientWidth, f = b.element.clientHeight, c = c / e * b.cols | 0, d = d / f * b.rows | 0;
            if (c < 0 || c > b.cols) return;
            if (d < 0 || d > b.rows) return;
            return c += 32, d += 32, {
                x: c,
                y: d
            }
        }
        function i(a) {
            if (b.mouseEvents) return;
            if (b.applicationKeypad) return;
            a.type === "DOMMouseScroll" ? b.scrollDisp(a.detail < 0 ? -5 : 5) : b.scrollDisp(a.wheelDeltaY > 0 ? -5 : 5)
        }
        var a = this.element,
            b = this,
            c;
        a.addEventListener("mousedown", d, !0), a.addEventListener("mouseup", d, !0), "onmousewheel" in window ? a.addEventListener("mousewheel", d, !0) : a.addEventListener("DOMMouseScroll", d, !0), a.addEventListener("mousemove", e, !0), "onmousewheel" in window ? a.addEventListener("mousewheel", i, !0) : a.addEventListener("DOMMouseScroll", i, !0)
    };
    var i = function () {
            var a = [
                [0, 0, 0],
                [205, 0, 0],
                [0, 205, 0],
                [205, 205, 0],
                [0, 0, 238],
                [205, 0, 205],
                [0, 205, 205],
                [229, 229, 229],
                [127, 127, 127],
                [255, 0, 0],
                [0, 255, 0],
                [255, 255, 0],
                [92, 92, 255],
                [255, 0, 255],
                [0, 255, 255],
                [255, 255, 255]
            ],
                b = [0, 95, 135, 175, 215, 255];
            for (var c = 0; c < 217; c++) a.push([b[c / 36 % 6 | 0], b[c / 6 % 6 | 0], b[c % 6]]);
            for (c = 0; c < 23; c++) b = 8 + c * 10, a.push([b, b, b]);
            for (c = 0; c < 256; c++) {
                var d = a[c];
                d[0] = d[0].toString(16), d[1] = d[1].toString(16), d[2] = d[2].toString(16), d[0].length < 2 && (d[0] = "0" + d[0]), d[1].length < 2 && (d[1] = "0" + d[1]), d[2].length < 2 && (d[2] = "0" + d[2]), a[c] = "#" + d.join("")
            }
            return a
        }();
    g.prototype.refresh = function (a, b) {
        var c, d, e, g, j, k, l, m, n, o, p, q, r;
        for (e = a; e <= b; e++) {
            r = e + this.ydisp, r >= this.currentHeight && (r -= this.currentHeight), j = this.lines[r], k = "", o = this.cols, e === this.y && this.cursorState && this.ydisp === this.ybase && !this.cursorHidden ? d = this.x : d = -1, q = this.defAttr;
            for (g = 0; g < o; g++) {
                p = j[g], l = p.ch, g === d && (p = f(p), p.cursor = !0), h(p, q) || (h(q, this.defAttr) || (k += "</span>"), h(p, this.defAttr) || (p.cursor ? k += '<span class="termReverse">' : (k += '<span style="', m = p.inverse ? p.bg : p.fg, n = p.inverse ? p.fg : p.bg, m !== -1 && (k += "color:" + (p.fg256 ? i[m] : this.fgColors[m]) + ";", ~k.indexOf("undefined") && console.log("fg: got undefined with: " + JSON.stringify(p) + "\n  " + k)), n !== -1 && (k += "background-color:" + (p.bg256 ? i[n] : this.bgColors[n]) + ";", ~k.indexOf("undefined") && console.log("bg: got undefined with: " + JSON.stringify(p) + "\n  " + k)), p.bold && (k += "font-weight:bold;"), p.underline && (k += "text-decoration:underline;"), p.italic && (k += "font-style:italic;"), k += '">')));
                switch (l) {
                case 32:
                    k += "&nbsp;";
                    break;
                case 38:
                    k += "&amp;";
                    break;
                case 60:
                    k += "&lt;";
                    break;
                case 62:
                    k += "&gt;";
                    break;
                default:
                    l < 32 ? k += "&nbsp;" : k += String.fromCharCode(l)
                }
                q = p
            }
            h(q, this.defAttr) || (k += "</span>"), c = this.children[e], c.innerHTML = k
        }
    }, g.prototype.cursorBlink = function () {
        this.cursorState ^= 1, this.refresh(this.y, this.y)
    }, g.prototype.showCursor = function () {
        this.cursorState || (this.cursorState = 1, this.refresh(this.y, this.y))
    }, g.prototype.scroll = function () {
        var a, b, c, d;
        this.currentHeight < this.totalHeight && this.currentHeight++, ++this.ybase === this.currentHeight && (this.ybase = 0), this.ydisp = this.ybase;
        var e = f(this.defAttr);
        e.ch = 32, a = [];
        for (b = 0; b < this.cols; b++) a[b] = f(e);
        d = this.ybase + this.rows - 1, d >= this.currentHeight && (d -= this.currentHeight);
        var g = this.scrollBottom + this.ybase;
        if (d > g) {
            var h = this.rows - 1 - this.scrollBottom;
            this.lines.splice(this.rows - 1 + this.ybase - h, 0, a)
        } else this.lines[d] = a;
        this.scrollTop !== 0 && (this.ybase !== 0 && (this.ybase--, this.ydisp = this.ybase), this.lines.splice(this.ybase + this.scrollTop, 1))
    }, g.prototype.scrollDisp = function (a) {
        var b, c;
        if (a >= 0) for (b = 0; b < a; b++) {
            if (this.ydisp === this.ybase) break;
            ++this.ydisp === this.currentHeight && (this.ydisp = 0)
        } else {
            a = -a, c = this.ybase + this.rows, c >= this.currentHeight && (c -= this.currentHeight);
            for (b = 0; b < a; b++) {
                if (this.ydisp === c) break;
                --this.ydisp < 0 && (this.ydisp = this.currentHeight - 1)
            }
        }
        this.refresh(0, this.rows - 1)
    }, g.prototype.write = function (g) {
        var h = g.length,
            i = 0,
            k, l, m;
        this.refreshStart = this.rows, this.refreshEnd = -1, this.getRows(this.y), this.ybase !== this.ydisp && (this.ydisp = this.ybase, this.refreshStart = 0, this.refreshEnd = this.rows - 1);
        for (; i < h; i++) {
            k = g.charCodeAt(i);
            switch (this.state) {
            case a:
                switch (k) {
                case 0:
                    break;
                case 7:
                    this.bell();
                    break;
                case 10:
                case 11:
                case 12:
                    this.convertEol && (this.x = 0), this.y++, this.y >= this.scrollBottom + 1 && (this.y--, this.scroll(), this.refreshStart = 0, this.refreshEnd = this.rows - 1);
                    break;
                case 13:
                    this.x = 0;
                    break;
                case 8:
                    this.x > 0 && this.x--;
                    break;
                case 9:
                    l = this.x + 8 & -8, l <= this.cols && (this.x = l);
                    break;
                case 27:
                    this.state = b;
                    break;
                default:
                    if (k >= 32) {
                        this.charset && this.charset[k] && (k = this.charset[k]), this.x >= this.cols && (this.x = 0, this.y++, this.y >= this.scrollBottom + 1 && (this.y--, this.scroll(), this.refreshStart = 0, this.refreshEnd = this.rows - 1)), m = this.y + this.ybase, m >= this.currentHeight && (m -= this.currentHeight);
                        var n = f(this.curAttr);
                        n.ch = k, this.lines[m][this.x] = n, this.x++, this.getRows(this.y)
                    }
                }
                break;
            case b:
                switch (g[i]) {
                case "[":
                    this.params = [], this.currentParam = 0, this.state = c;
                    break;
                case "]":
                    this.params = [], this.currentParam = 0, this.state = d;
                    break;
                case "P":
                    this.state = d;
                    break;
                case "_":
                    this.state = d;
                    break;
                case "^":
                    this.state = d;
                    break;
                case "c":
                    this.reset();
                    break;
                case "E":
                    this.x = 0;
                case "D":
                    this.index();
                    break;
                case "M":
                    this.reverseIndex();
                    break;
                case "%":
                    this.charset = null, this.state = a, i++;
                    break;
                case "(":
                case ")":
                case "*":
                case "+":
                case "-":
                case ".":
                    this.state = e;
                    break;
                case "/":
                    this.charset = null, this.state = a, i++;
                    break;
                case "7":
                    this.saveCursor(), this.state = a;
                    break;
                case "8":
                    this.restoreCursor(), this.state = a;
                    break;
                case "#":
                    this.state = a, i++;
                    break;
                case "H":
                    this.state = a;
                    break;
                case "=":
                    this.applicationKeypad = !0, this.state = a;
                    break;
                case ">":
                    this.applicationKeypad = !1, this.state = a;
                    break;
                default:
                    this.state = a
                }
                break;
            case e:
                switch (g[i]) {
                case "0":
                    this.charset = j;
                    break;
                case "B":
                default:
                    this.charset = null
                }
                this.state = a;
                break;
            case d:
                if (k !== 27 && k !== 7) break;
                this.state = a, k === 27 && i++;
                break;
            case c:
                if (k === 63 || k === 62 || k === 33) {
                    this.prefix = g[i];
                    break
                }
                if (k >= 48 && k <= 57) this.currentParam = this.currentParam * 10 + k - 48;
                else {
                    if (k === 36 || k === 34 || k === 32 || k === 39) {
                        this.postfix = g[i];
                        break
                    }
                    this.params[this.params.length] = this.currentParam, this.currentParam = 0;
                    if (k === 59) break;
                    this.state = a;
                    switch (k) {
                    case 65:
                        this.cursorUp(this.params);
                        break;
                    case 66:
                        this.cursorDown(this.params);
                        break;
                    case 67:
                        this.cursorForward(this.params);
                        break;
                    case 68:
                        this.cursorBackward(this.params);
                        break;
                    case 72:
                        this.cursorPos(this.params);
                        break;
                    case 74:
                        this.eraseInDisplay(this.params);
                        break;
                    case 75:
                        this.eraseInLine(this.params);
                        break;
                    case 109:
                        this.charAttributes(this.params);
                        break;
                    case 110:
                        this.deviceStatus(this.params);
                        break;
                    case 64:
                        this.insertChars(this.params);
                        break;
                    case 69:
                        this.cursorNextLine(this.params);
                        break;
                    case 70:
                        this.cursorPrecedingLine(this.params);
                        break;
                    case 71:
                        this.cursorCharAbsolute(this.params);
                        break;
                    case 76:
                        this.insertLines(this.params);
                        break;
                    case 77:
                        this.deleteLines(this.params);
                        break;
                    case 80:
                        this.deleteChars(this.params);
                        break;
                    case 88:
                        this.eraseChars(this.params);
                        break;
                    case 96:
                        this.charPosAbsolute(this.params);
                        break;
                    case 97:
                        this.HPositionRelative(this.params);
                        break;
                    case 99:
                        this.sendDeviceAttributes(this.params);
                        break;
                    case 100:
                        this.linePosAbsolute(this.params);
                        break;
                    case 101:
                        this.VPositionRelative(this.params);
                        break;
                    case 102:
                        this.HVPosition(this.params);
                        break;
                    case 104:
                        this.setMode(this.params);
                        break;
                    case 108:
                        this.resetMode(this.params);
                        break;
                    case 114:
                        this.setScrollRegion(this.params);
                        break;
                    case 115:
                        this.saveCursor(this.params);
                        break;
                    case 117:
                        this.restoreCursor(this.params);
                        break;
                    case 73:
                        this.cursorForwardTab(this.params);
                        break;
                    case 83:
                        this.scrollUp(this.params);
                        break;
                    case 84:
                        this.scrollDown(this.params);
                        break;
                    case 90:
                        this.cursorBackwardTab(this.params);
                        break;
                    case 98:
                        this.repeatPrecedingCharacter(this.params);
                        break;
                    case 112:
                        switch (this.prefix) {
                        case "!":
                            this.softReset(this.params)
                        }
                        break;
                    default:
                    }
                    this.prefix = "", this.postfix = ""
                }
            }
        }
        this.getRows(this.y), this.refreshEnd >= this.refreshStart && this.refresh(this.refreshStart, this.refreshEnd)
    }, g.prototype.writeln = function (a) {
        this.write(a + "\r\n")
    }, g.prototype.keyDownHandler = function (a) {
        var b = "";
        switch (a.keyCode) {
        case 8:
            b = "";
            break;
        case 9:
            b = "	";
            break;
        case 13:
            b = "\r";
            break;
        case 27:
            b = "";
            break;
        case 37:
            if (this.applicationKeypad) {
                b = "OD";
                break
            }
            b = "[D";
            break;
        case 39:
            if (this.applicationKeypad) {
                b = "OC";
                break
            }
            b = "[C";
            break;
        case 38:
            if (this.applicationKeypad) {
                b = "OA";
                break
            }
            a.ctrlKey ? this.scrollDisp(-1) : b = "[A";
            break;
        case 40:
            if (this.applicationKeypad) {
                b = "OB";
                break
            }
            a.ctrlKey ? this.scrollDisp(1) : b = "[B";
            break;
        case 46:
            b = "[3~";
            break;
        case 45:
            b = "[2~";
            break;
        case 36:
            if (this.applicationKeypad) {
                b = "OH";
                break
            }
            b = "OH";
            break;
        case 35:
            if (this.applicationKeypad) {
                b = "OF";
                break
            }
            b = "OF";
            break;
        case 33:
            a.ctrlKey ? this.scrollDisp(-(this.rows - 1)) : b = "[5~";
            break;
        case 34:
            a.ctrlKey ? this.scrollDisp(this.rows - 1) : b = "[6~";
            break;
        case 112:
            b = "OP";
            break;
        case 113:
            b = "OQ";
            break;
        case 114:
            b = "OR";
            break;
        case 115:
            b = "OS";
            break;
        case 116:
            b = "[15~";
            break;
        case 117:
            b = "[17~";
            break;
        case 118:
            b = "[18~";
            break;
        case 119:
            b = "[19~";
            break;
        case 120:
            b = "[20~";
            break;
        case 121:
            b = "[21~";
            break;
        case 122:
            b = "[23~";
            break;
        case 123:
            b = "[24~";
            break;
        default:
            a.ctrlKey ? a.keyCode >= 65 && a.keyCode <= 90 ? b = String.fromCharCode(a.keyCode - 64) : a.keyCode === 32 ? b = String.fromCharCode(0) : a.keyCode >= 51 && a.keyCode <= 55 ? b = String.fromCharCode(a.keyCode - 51 + 27) : a.keyCode === 56 && (b = String.fromCharCode(127)) : (!this.isMac && a.altKey || this.isMac && a.metaKey) && a.keyCode >= 65 && a.keyCode <= 90 && (b = "" + String.fromCharCode(a.keyCode + 32))
        }
        return b ? (a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), this.showCursor(), this.keyState = 1, this.keyStr = b, this.handler(b), !1) : (this.keyState = 0, !0)
    }, g.prototype.keyPressHandler = function (a) {
        var b = "",
            c;
        a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault();
        if ("charCode" in a) c = a.charCode;
        else {
            c = a.keyCode;
            if (this.keyState === 1) return this.keyState = 2, !1;
            if (this.keyState === 2) return this.showCursor(), this.handler(this.keyStr), !1
        }
        return c !== 0 && !a.ctrlKey && (!this.isMac && !a.altKey || this.isMac && !a.metaKey) && (b = String.fromCharCode(c)), b ? (this.showCursor(), this.handler(b), !1) : !0
    }, g.prototype.queueChars = function (a) {
        var b = this;
        this.outputQueue += a, this.outputQueue && setTimeout(function () {
            b.outputHandler()
        }, 1)
    }, g.prototype.outputHandler = function () {
        this.outputQueue && (this.handler(this.outputQueue), this.outputQueue = "")
    }, g.prototype.bell = function () {
        if (!this.useBell) return;
        var a = this;
        this.element.style.borderColor = "white", setTimeout(function () {
            a.element.style.borderColor = ""
        }, 10)
    }, g.prototype.getRows = function (a) {
        this.refreshStart = Math.min(this.refreshStart, a), this.refreshEnd = Math.max(this.refreshEnd, a)
    }, g.prototype.eraseLine = function (a, b) {
        var c, d, e, g;
        g = this.ybase + b, g >= this.currentHeight && (g -= this.currentHeight), c = this.lines[g], e = f(this.curAttr), e.ch = 32;
        for (d = a; d < this.cols; d++) c[d] = f(e);
        this.getRows(b)
    }, g.prototype.blankLine = function (a) {
        var b = a ? this.curAttr : this.defAttr,
            c = f(b),
            d = [],
            e = 0;
        c.ch = 32;
        for (; e < this.cols; e++) d[e] = f(c);
        return d
    }, g.prototype.index = function () {
        this.y++, this.y >= this.scrollBottom + 1 && (this.y--, this.scroll(), this.refreshStart = 0, this.refreshEnd = this.rows - 1), this.state = a
    }, g.prototype.reverseIndex = function () {
        var b;
        this.y--, this.y < this.scrollTop && (this.y++, this.lines.splice(this.y + this.ybase, 0, this.blankLine(!0)), b = this.rows - 1 - this.scrollBottom, this.lines.splice(this.rows - 1 + this.ybase - b + 1, 1)), this.state = a
    }, g.prototype.reset = function () {
        g.call(this, this.cols, this.rows, this.handler)
    }, g.prototype.cursorUp = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.y -= b, this.y < 0 && (this.y = 0)
    }, g.prototype.cursorDown = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.y += b, this.y >= this.rows && (this.y = this.rows - 1)
    }, g.prototype.cursorForward = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.x += b, this.x >= this.cols - 1 && (this.x = this.cols - 1)
    }, g.prototype.cursorBackward = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.x -= b, this.x < 0 && (this.x = 0)
    }, g.prototype.cursorPos = function (a) {
        var b, c, d;
        c = this.params[0] - 1, this.params.length >= 2 ? d = this.params[1] - 1 : d = 0, c < 0 ? c = 0 : c >= this.rows && (c = this.rows - 1), d < 0 ? d = 0 : d >= this.cols && (d = this.cols - 1), this.x = d, this.y = c
    }, g.prototype.eraseInDisplay = function (a) {
        var b, c, d;
        switch (a[0] || 0) {
        case 0:
            this.eraseLine(this.x, this.y);
            for (d = this.y + 1; d < this.rows; d++) this.eraseLine(0, d);
            break;
        case 1:
            this.eraseInLine([1]), d = this.y;
            while (d--) this.eraseLine(0, d);
            break;
        case 2:
            this.eraseInDisplay([0]), this.eraseInDisplay([1]);
            break;
        case 3:
        }
    }, g.prototype.eraseInLine = function (a) {
        switch (a[0] || 0) {
        case 0:
            this.eraseLine(this.x, this.y);
            break;
        case 1:
            var b = this.x + 1,
                c = this.lines[this.ybase + this.y],
                d = f(this.curAttr);
            d.ch = 32;
            while (b--) c[b] = f(d);
            break;
        case 2:
            var b = this.cols,
                c = this.lines[this.ybase + this.y],
                d = f(this.curAttr);
            d.ch = 32;
            while (b--) c[b] = f(d)
        }
    }, g.prototype.charAttributes = function (a) {
        var b, c;
        if (a.length === 0) this.curAttr = f(this.defAttr);
        else for (b = 0; b < a.length; b++) {
            c = a[b];
            if (c >= 30 && c <= 37) this.curAttr.fg = c - 30, this.curAttr.fg256 = !1;
            else if (c >= 40 && c <= 47) this.curAttr.bg = c - 40, this.curAttr.bg256 = !1;
            else if (c >= 90 && c <= 97) this.curAttr.fg = c - 90, this.curAttr.fg256 = !1;
            else if (c >= 100 && c <= 107) this.curAttr.bg = c - 100, this.curAttr.bg256 = !1;
            else if (c === 0) this.curAttr = f(this.defAttr);
            else if (c === 1) this.curAttr.bold = !0;
            else if (c === 3) this.curAttr.italic = !0;
            else if (c === 4) this.curAttr.underline = !0;
            else {
                if (c === 38) {
                    this.curAttr.fg256 = !0, this.curAttr.fg = a[b + 2];
                    break
                }
                if (c === 48) {
                    this.curAttr.bg256 = !0, this.curAttr.bg = a[b + 2];
                    break
                }
                c === 39 ? (this.curAttr.fg = -1, this.curAttr.fg256 = !1) : c === 49 ? (this.curAttr.bg = -1, this.curAttr.bg256 = !1) : c === 7 ? this.curAttr.inverse = !0 : c === 22 ? this.curAttr.bold = !1 : c === 23 ? this.curAttr.italic = !1 : c === 24 ? this.curAttr.underline = !1 : c === 27 && (this.curAttr.inverse = !1)
            }
        }
    }, g.prototype.deviceStatus = function (a) {
        if (this.prefix === "?") {
            switch (a[0]) {
            case 6:
                this.queueChars("[" + (this.y + 1) + ";" + (this.x + 1) + "R");
                break;
            case 15:
                break;
            case 25:
                break;
            case 26:
                break;
            case 53:
            }
            return
        }
        switch (this.params[0]) {
        case 5:
            this.queueChars("[0n");
            break;
        case 6:
            this.queueChars("[" + (this.y + 1) + ";" + (this.x + 1) + "R")
        }
    }, g.prototype.insertChars = function (a) {
        var b, c, d;
        b = this.params[0], b < 1 && (b = 1), c = this.y + this.ybase, d = this.x;
        while (b-- && d < this.cols) {
            var e = f(this.curAttr);
            e.ch = 32, this.lines[c].splice(d++, 0, f(e)), this.lines[c].pop()
        }
    }, g.prototype.cursorNextLine = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.y += b, this.y >= this.rows && (this.y = this.rows - 1), this.x = 0
    }, g.prototype.cursorPrecedingLine = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.y -= b, this.y < 0 && (this.y = 0), this.x = 0
    }, g.prototype.cursorCharAbsolute = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.x = b - 1
    }, g.prototype.insertLines = function (a) {
        var b, c, d;
        b = this.params[0], b < 1 && (b = 1), c = this.y + this.ybase, d = this.rows - 1 - this.scrollBottom, d = this.rows - 1 + this.ybase - d + 1;
        while (b--) this.lines.splice(c, 0, this.blankLine(!0)), this.lines.splice(d, 1);
        this.refreshStart = 0, this.refreshEnd = this.rows - 1
    }, g.prototype.deleteLines = function (a) {
        var b, c, d;
        b = this.params[0], b < 1 && (b = 1), c = this.y + this.ybase, d = this.rows - 1 - this.scrollBottom, d = this.rows - 1 + this.ybase - d;
        while (b--) this.lines.splice(d + 1, 0, this.blankLine(!0)), this.lines.splice(c, 1);
        this.refreshStart = 0, this.refreshEnd = this.rows - 1
    }, g.prototype.deleteChars = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), c = this.y + this.ybase;
        while (b--) {
            this.lines[c].splice(this.x, 1);
            var d = f(this.curAttr);
            d.ch = 32, this.lines[c].push(d)
        }
    }, g.prototype.eraseChars = function (a) {
        var b, c, d;
        b = this.params[0], b < 1 && (b = 1), c = this.y + this.ybase, d = this.x;
        while (b-- && d < this.cols) {
            var e = f(this.curAttr);
            e.ch = 32, this.lines[c][d++] = e
        }
    }, g.prototype.charPosAbsolute = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.x = b - 1, this.x >= this.cols && (this.x = this.cols - 1)
    }, g.prototype.HPositionRelative = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.x += b, this.x >= this.cols - 1 && (this.x = this.cols - 1)
    }, g.prototype.sendDeviceAttributes = function (a) {
        return
    }, g.prototype.linePosAbsolute = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.y = b - 1, this.y >= this.rows && (this.y = this.rows - 1)
    }, g.prototype.VPositionRelative = function (a) {
        var b, c;
        b = this.params[0], b < 1 && (b = 1), this.y += b, this.y >= this.rows && (this.y = this.rows - 1)
    }, g.prototype.HVPosition = function (a) {
        this.params[0] < 1 && (this.params[0] = 1), this.params[1] < 1 && (this.params[1] = 1), this.y = this.params[0] - 1, this.y >= this.rows && (this.y = this.rows - 1), this.x = this.params[1] - 1, this.x >= this.cols && (this.x = this.cols - 1)
    }, g.prototype.setMode = function (a) {
        if (typeof a == "object") {
            while (a.length) this.setMode(a.shift());
            return
        }
        if (this.prefix !== "?") switch (a) {
        case 4:
            this.insertMode = !0;
            break;
        case 20:
        } else switch (a) {
        case 1:
            this.applicationKeypad = !0;
            break;
        case 6:
            this.originMode = !0;
            break;
        case 7:
            this.wraparoundMode = !0;
            break;
        case 9:
            break;
        case 1e3:
            break;
        case 1001:
            break;
        case 1002:
        case 1003:
            console.log("binding to mouse events - warning: experimental!"), this.mouseEvents = !0, this.element.style.cursor = "default";
            break;
        case 1004:
            break;
        case 1005:
            break;
        case 1006:
            break;
        case 1015:
            break;
        case 25:
            this.cursorHidden = !1;
            break;
        case 1049:
        case 47:
        case 1047:
            if (!this.normal) {
                var b = {
                    lines: this.lines,
                    currentHeight: this.currentHeight,
                    ybase: this.ybase,
                    ydisp: this.ydisp,
                    x: this.x,
                    y: this.y,
                    scrollTop: this.scrollTop,
                    scrollBottom: this.scrollBottom
                };
                this.reset(), this.normal = b
            }
        }
    }, g.prototype.resetMode = function (a) {
        if (typeof a == "object") {
            while (a.length) this.resetMode(a.shift());
            return
        }
        if (this.prefix !== "?") switch (a) {
        case 4:
            this.insertMode = !1;
            break;
        case 20:
        } else switch (a) {
        case 1:
            this.applicationKeypad = !1;
            break;
        case 6:
            this.originMode = !1;
            break;
        case 7:
            this.wraparoundMode = !1;
            break;
        case 9:
        case 1e3:
        case 1001:
        case 1002:
        case 1003:
        case 1004:
        case 1005:
            this.mouseEvents = !1, this.element.style.cursor = "";
            break;
        case 25:
            this.cursorHidden = !0;
            break;
        case 1049:
        case 47:
        case 1047:
            this.normal && (this.lines = this.normal.lines, this.currentHeight = this.normal.currentHeight, this.ybase = this.normal.ybase, this.ydisp = this.normal.ydisp, this.x = this.normal.x, this.y = this.normal.y, this.scrollTop = this.normal.scrollTop, this.scrollBottom = this.normal.scrollBottom, this.normal = null, this.refresh(0, this.rows - 1))
        }
    }, g.prototype.setScrollRegion = function (a) {
        if (this.prefix === "?") return;
        this.scrollTop = (this.params[0] || 1) - 1, this.scrollBottom = (this.params[1] || this.rows) - 1, this.x = 0, this.y = 0
    }, g.prototype.saveCursor = function (a) {
        this.savedX = this.x, this.savedY = this.y
    }, g.prototype.restoreCursor = function (a) {
        this.x = this.savedX || 0, this.y = this.savedY || 0
    }, g.prototype.cursorForwardTab = function (a) {
        var b, c, d, e;
        c = a[0] || 1, c *= 8, b = this.y + this.ybase, d = this.lines[b];
        var g = f(this.defAttr);
        g.ch = 32;
        while (c--) {
            d.splice(this.x++, 0, f(data)), d.pop();
            if (this.x === this.cols) {
                this.x--;
                break
            }
        }
    }, g.prototype.scrollUp = function (a) {
        var b = a[0] || 1;
        while (b--) this.lines.splice(this.ybase + this.scrollTop, 1), this.lines.splice(this.ybase + this.scrollBottom, 0, this.blankLine());
        this.refreshStart = 0, this.refreshEnd = this.rows - 1
    }, g.prototype.scrollDown = function (a) {
        var b = a[0] || 1;
        while (b--) this.lines.splice(this.ybase + this.scrollBottom, 1), this.lines.splice(this.ybase + this.scrollTop, 0, this.blankLine());
        this.refreshStart = 0, this.refreshEnd = this.rows - 1
    }, g.prototype.initMouseTracking = function (a) {
        console.log("mouse tracking")
    }, g.prototype.resetTitleModes = function (a) {}, g.prototype.cursorBackwardTab = function (a) {
        var b, c, d, e;
        c = a[0] || 1, c *= 8, b = this.y + this.ybase, d = this.lines[b];
        var g = f(this.defAttr);
        g.ch = 32;
        while (c--) {
            d.splice(--this.x, 1), d.push(f(g));
            if (this.x === 0) break
        }
    }, g.prototype.repeatPrecedingCharacter = function (a) {
        var b = this.params[0] || 1,
            c = this.lines[this.ybase + this.y],
            d = c[this.x - 1];
        d || (d = f(this.defAttr), d.ch = 32);
        while (b--) c[this.x++] = f(d)
    }, g.prototype.tabClear = function (a) {}, g.prototype.mediaCopy = function (a) {}, g.prototype.setResources = function (a) {}, g.prototype.disableModifiers = function (a) {}, g.prototype.setPointerMode = function (a) {}, g.prototype.softReset = function (a) {
        this.reset()
    }, g.prototype.requestAnsiMode = function (a) {}, g.prototype.requestPrivateMode = function (a) {}, g.prototype.setConformanceLevel = function (a) {}, g.prototype.loadLEDs = function (a) {}, g.prototype.setCursorStyle = function (a) {}, g.prototype.setCharProtectionAttr = function (a) {}, g.prototype.restorePrivateValues = function (a) {}, g.prototype.setAttrInRectangle = function (a) {
        var b = a[0],
            c = a[1],
            d = a[2],
            e = a[3],
            f = a[4],
            g, h;
        for (; b < d + 1; b++) {
            g = this.lines[this.ybase + b];
            for (h = c; h < e; h++) g[h] = f << 16 | g[h] & 65535
        }
    }, g.prototype.savePrivateValues = function (a) {}, g.prototype.manipulateWindow = function (a) {}, g.prototype.reverseAttrInRectangle = function (a) {}, g.prototype.setTitleModeFeature = function (a) {}, g.prototype.setWarningBellVolume = function (a) {}, g.prototype.setMarginBellVolume = function (a) {}, g.prototype.copyRectangle = function (a) {}, g.prototype.enableFilterRectangle = function (a) {}, g.prototype.requestParameters = function (a) {}, g.prototype.__ = function (a) {}, g.prototype.fillRectangle = function (a) {
        var b = a[0],
            c = a[1],
            d = a[2],
            e = a[3],
            f = a[4],
            g, h;
        for (; c < e + 1; c++) {
            g = this.lines[this.ybase + c];
            for (h = d; h < f; h++) g[h] = g[h] >> 16 << 16 | b
        }
    }, g.prototype.enableLocatorReporting = function (a) {}, g.prototype.eraseRectangle = function (a) {
        var b = a[0],
            c = a[1],
            d = a[2],
            e = a[3],
            g, h;
        for (; b < d + 1; b++) {
            g = this.lines[this.ybase + b];
            for (h = c; h < e; h++) {
                var i = f(this.curAttr);
                i.ch = 32, g[h] = i
            }
        }
    }, g.prototype.setLocatorEvents = function (a) {}, g.prototype.selectiveEraseRectangle = function (a) {}, g.prototype.requestLocatorPosition = function (a) {}, g.prototype.insertColumns = function () {
        param = params[0];
        var a = this.ybase + this.rows,
            b;
        while (param--) for (b = this.ybase; b < a; b++) {
            var c = f(this.defAttr);
            c.ch = 32, this.lines[b].splice(this.x + 1, 0, c), this.lines[b].pop()
        }
    }, g.prototype.deleteColumns = function () {
        param = params[0];
        var a = this.ybase + this.rows,
            b;
        while (param--) for (b = this.ybase; b < a; b++) {
            this.lines[b].splice(this.x, 1);
            var c = f(this.defAttr);
            c.ch = 32, this.lines[b].push(c)
        }
    }, g.prototype.resize = function (a, b) {
        var c, d, e, g;
        a < 1 && (a = 1), b < 1 && (b = 1), this.y >= b && (this.y = b - 1), this.x >= a && (this.x = a - 1);
        if (this.cols < a) {
            e = this.lines.length;
            while (e--) while (this.lines[e].length < a) {
                var h = f(this.defAttr);
                h.ch = 32, this.lines[e].push(h)
            }
        } else if (this.cols > a) {
            e = this.lines.length;
            while (e--) while (this.lines[e].length > a) this.lines[e].pop()
        }
        g = this.rows;
        if (g < b) {
            d = this.element;
            while (g++ < b) this.lines.length < b + this.ybase && this.lines.push(this.blankLine()), this.children.length < b && (c = document.createElement("div"), c.className = "term", d.appendChild(c), this.children.push(c))
        } else if (g > b) while (g-- > b) {
            this.lines.length > b + this.ybase && this.lines.shift();
            if (this.children.length > b) {
                d = this.children.pop();
                if (!d) continue;
                d.parentNode.removeChild(d)
            }
        }
        this.cols = a, this.rows = b, this.scrollTop = 0, this.scrollBottom = b - 1, this.refreshStart = 0, this.refreshEnd = b - 1, this.currentHeight = this.lines.length, this.currentHeight < this.rows && (this.currentHeight = this.rows), this.refresh(0, this.rows - 1), this.normal = null
    };
    var j = {
        95: 95,
        96: 9670,
        97: 9618,
        98: 98,
        99: 99,
        100: 100,
        101: 101,
        102: 176,
        103: 177,
        104: 9618,
        105: 9731,
        106: 9496,
        107: 9488,
        108: 9484,
        109: 9492,
        110: 9532,
        111: 9146,
        112: 9147,
        113: 9472,
        114: 9148,
        115: 9149,
        116: 9500,
        117: 9508,
        118: 9524,
        119: 9516,
        120: 9474,
        121: 8804,
        122: 8805,
        123: 960,
        124: 8800,
        125: 163,
        126: 183
    };
    this.Term = g
}.call(this), function () {
    function c(a, b, c) {
        this.init(a, b, c || {}), this.setup()
    }
    var a = {
        x: 0,
        y: 0,
        init: function () {
            this.setEvent("mouse"), this.setEvent("touch")
        },
        setEvent: function (b) {
            var c = document["on" + b + "move"] ||
            function () {};
            document["on" + b + "move"] = function (b) {
                c(b), a.refresh(b)
            }
        },
        refresh: function (a) {
            a || (a = window.event), a.type == "mousemove" ? this.set(a) : a.touches && this.set(a.touches[0])
        },
        set: function (a) {
            if (a.pageX || a.pageY) this.x = a.pageX, this.y = a.pageY;
            else if (a.clientX || a.clientY) this.x = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, this.y = a.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
    };
    a.init();
    var b = {
        get: function (a) {
            var b = curtop = 0;
            if (a.offsetParent) do b += a.offsetLeft, curtop += a.offsetTop;
            while (a = a.offsetParent);
            return [b, curtop]
        }
    };
    window.Dragdealer = c, c.prototype = {
        init: function (a, b, c) {
            this.wrapper = a, this.handle = b, this.options = c, this.disabled = this.getOption("disabled", !1), this.horizontal = this.getOption("horizontal", !0), this.vertical = this.getOption("vertical", !1), this.slide = this.getOption("slide", !0), this.steps = this.getOption("steps", 0), this.snap = this.getOption("snap", !1), this.loose = this.getOption("loose", !1), this.speed = this.getOption("speed", 10) / 100, this.xPrecision = this.getOption("xPrecision", 0), this.yPrecision = this.getOption("yPrecision", 0), this.callback = c.callback || null, this.animationCallback = c.animationCallback || null, this.onDragStart = c.dragCallback || null, this.bounds = {
                left: c.left || 0,
                right: -(c.right || 0),
                top: c.top || 0,
                bottom: -(c.bottom || 0),
                x0: 0,
                x1: 0,
                xRange: 0,
                y0: 0,
                y1: 0,
                yRange: 0
            }, this.value = {
                prev: [-1, -1],
                current: [c.x || 0, c.y || 0],
                target: [c.x || 0, c.y || 0]
            }, this.offset = {
                wrapper: [0, 0],
                mouse: [0, 0],
                prev: [-999999, -999999],
                current: [0, 0],
                target: [0, 0]
            }, this.change = [0, 0], this.activity = !1, this.dragging = !1, this.tapping = !1
        },
        getOption: function (a, b) {
            return this.options[a] !== undefined ? this.options[a] : b
        },
        setup: function () {
            this.setWrapperOffset(), this.setBoundsPadding(), this.setBounds(), this.setSteps(), this.addListeners()
        },
        setWrapperOffset: function () {
            this.offset.wrapper = b.get(this.wrapper)
        },
        setBoundsPadding: function () {
            !this.bounds.left && !this.bounds.right && (this.bounds.left = b.get(this.handle)[0] - this.offset.wrapper[0], this.bounds.right = -this.bounds.left), !this.bounds.top && !this.bounds.bottom && (this.bounds.top = b.get(this.handle)[1] - this.offset.wrapper[1], this.bounds.bottom = -this.bounds.top)
        },
        setBounds: function () {
            this.bounds.x0 = this.bounds.left, this.bounds.x1 = this.wrapper.offsetWidth + this.bounds.right, this.bounds.xRange = this.bounds.x1 - this.bounds.x0 - this.handle.offsetWidth, this.bounds.y0 = this.bounds.top, this.bounds.y1 = this.wrapper.offsetHeight + this.bounds.bottom, this.bounds.yRange = this.bounds.y1 - this.bounds.y0 - this.handle.offsetHeight, this.bounds.xStep = 1 / (this.xPrecision || Math.max(this.wrapper.offsetWidth, this.handle.offsetWidth)), this.bounds.yStep = 1 / (this.yPrecision || Math.max(this.wrapper.offsetHeight, this.handle.offsetHeight))
        },
        setSteps: function () {
            if (this.steps > 1) {
                this.stepRatios = [];
                for (var a = 0; a <= this.steps - 1; a++) this.stepRatios[a] = a / (this.steps - 1)
            }
        },
        addListeners: function () {
            var a = this;
            this.wrapper.onselectstart = function () {
                return !1
            }, this.handle.onmousedown = this.handle.ontouchstart = function (b) {
                a.handleDownHandler(b)
            }, this.wrapper.onmousedown = this.wrapper.ontouchstart = function (b) {
                a.wrapperDownHandler(b)
            };
            var b = document.onmouseup ||
            function () {};
            document.onmouseup = function (c) {
                b(c), a.documentUpHandler(c)
            };
            var c = document.ontouchend ||
            function () {};
            document.ontouchend = function (b) {
                c(b), a.documentUpHandler(b)
            };
            var d = window.onresize ||
            function () {};
            window.onresize = function (b) {
                d(b), a.documentResizeHandler(b)
            }, this.wrapper.onmousemove = function (b) {
                a.activity = !0
            }, this.wrapper.onclick = function (b) {
                return !a.activity
            }, this.interval = setInterval(function () {
                a.animate()
            }, 25), a.animate(!1, !0)
        },
        handleDownHandler: function (b) {
            this.activity = !1, a.refresh(b), this.preventDefaults(b, !0), this.startDrag(), this.cancelEvent(b)
        },
        wrapperDownHandler: function (b) {
            a.refresh(b), this.preventDefaults(b, !0), this.startTap()
        },
        documentUpHandler: function (a) {
            this.stopDrag(), this.stopTap()
        },
        documentResizeHandler: function (a) {
            this.setWrapperOffset(), this.setBounds(), this.update()
        },
        enable: function () {
            this.disabled = !1, this.handle.className = this.handle.className.replace(/\s?disabled/g, "")
        },
        disable: function () {
            this.disabled = !0, this.handle.className += " disabled"
        },
        setStep: function (a, b, c) {
            this.setValue(this.steps && a > 1 ? (a - 1) / (this.steps - 1) : 0, this.steps && b > 1 ? (b - 1) / (this.steps - 1) : 0, c)
        },
        setValue: function (a, b, c) {
            this.setTargetValue([a, b || 0]), c && this.groupCopy(this.value.current, this.value.target)
        },
        startTap: function (b) {
            if (this.disabled) return;
            this.tapping = !0, b === undefined && (b = [a.x - this.offset.wrapper[0] - this.handle.offsetWidth / 2, a.y - this.offset.wrapper[1] - this.handle.offsetHeight / 2]), this.setTargetOffset(b)
        },
        stopTap: function () {
            if (this.disabled || !this.tapping) return;
            this.tapping = !1, this.setTargetValue(this.value.current), this.result()
        },
        startDrag: function () {
            if (this.disabled) return;
            this.offset.mouse = [a.x - b.get(this.handle)[0], a.y - b.get(this.handle)[1]], this.onDragStart && this.onDragStart(), this.dragging = !0
        },
        stopDrag: function () {
            if (this.disabled || !this.dragging) return;
            this.dragging = !1;
            var a = this.groupClone(this.value.current);
            if (this.slide) {
                var b = this.change;
                a[0] += b[0] * 4, a[1] += b[1] * 4
            }
            this.setTargetValue(a), this.result()
        },
        feedback: function () {
            var a = this.value.current;
            this.snap && this.steps > 1 && (a = this.getClosestSteps(a)), this.groupCompare(a, this.value.prev) || (typeof this.animationCallback == "function" && this.animationCallback(a[0], a[1]), this.groupCopy(this.value.prev, a))
        },
        result: function () {
            typeof this.callback == "function" && this.callback(this.value.target[0], this.value.target[1])
        },
        animate: function (b, c) {
            if (b && !this.dragging) return;
            if (this.dragging) {
                var d = this.groupClone(this.value.target),
                    e = [a.x - this.offset.wrapper[0] - this.offset.mouse[0], a.y - this.offset.wrapper[1] - this.offset.mouse[1]];
                this.setTargetOffset(e, this.loose), this.change = [this.value.target[0] - d[0], this.value.target[1] - d[1]]
            }(this.dragging || c) && this.groupCopy(this.value.current, this.value.target);
            if (this.dragging || this.glide() || c) this.update(), this.feedback()
        },
        glide: function () {
            var a = [this.value.target[0] - this.value.current[0], this.value.target[1] - this.value.current[1]];
            return !a[0] && !a[1] ? !1 : (Math.abs(a[0]) > this.bounds.xStep || Math.abs(a[1]) > this.bounds.yStep ? (this.value.current[0] += a[0] * this.speed, this.value.current[1] += a[1] * this.speed) : this.groupCopy(this.value.current, this.value.target), !0)
        },
        update: function () {
            this.snap ? this.offset.current = this.getOffsetsByRatios(this.getClosestSteps(this.value.current)) : this.offset.current = this.getOffsetsByRatios(this.value.current), this.show()
        },
        show: function () {
            this.groupCompare(this.offset.current, this.offset.prev) || (this.horizontal && (this.handle.style.left = String(this.offset.current[0]) + "px"), this.vertical && (this.handle.style.top = String(this.offset.current[1]) + "px"), this.groupCopy(this.offset.prev, this.offset.current))
        },
        setTargetValue: function (a, b) {
            var c = b ? this.getLooseValue(a) : this.getProperValue(a);
            this.groupCopy(this.value.target, c), this.offset.target = this.getOffsetsByRatios(c)
        },
        setTargetOffset: function (a, b) {
            var c = this.getRatiosByOffsets(a),
                d = b ? this.getLooseValue(c) : this.getProperValue(c);
            this.groupCopy(this.value.target, d), this.offset.target = this.getOffsetsByRatios(d)
        },
        getLooseValue: function (a) {
            var b = this.getProperValue(a);
            return [b[0] + (a[0] - b[0]) / 4, b[1] + (a[1] - b[1]) / 4]
        },
        getProperValue: function (a) {
            var b = this.groupClone(a);
            return b[0] = Math.max(b[0], 0), b[1] = Math.max(b[1], 0), b[0] = Math.min(b[0], 1), b[1] = Math.min(b[1], 1), (!this.dragging && !this.tapping || this.snap) && this.steps > 1 && (b = this.getClosestSteps(b)), b
        },
        getRatiosByOffsets: function (a) {
            return [this.getRatioByOffset(a[0], this.bounds.xRange, this.bounds.x0), this.getRatioByOffset(a[1], this.bounds.yRange, this.bounds.y0)]
        },
        getRatioByOffset: function (a, b, c) {
            return b ? (a - c) / b : 0
        },
        getOffsetsByRatios: function (a) {
            return [this.getOffsetByRatio(a[0], this.bounds.xRange, this.bounds.x0), this.getOffsetByRatio(a[1], this.bounds.yRange, this.bounds.y0)]
        },
        getOffsetByRatio: function (a, b, c) {
            return Math.round(a * b) + c
        },
        getClosestSteps: function (a) {
            return [this.getClosestStep(a[0]), this.getClosestStep(a[1])]
        },
        getClosestStep: function (a) {
            var b = 0,
                c = 1;
            for (var d = 0; d <= this.steps - 1; d++) Math.abs(this.stepRatios[d] - a) < c && (c = Math.abs(this.stepRatios[d] - a), b = d);
            return this.stepRatios[b]
        },
        groupCompare: function (a, b) {
            return a[0] == b[0] && a[1] == b[1]
        },
        groupCopy: function (a, b) {
            a[0] = b[0], a[1] = b[1]
        },
        groupClone: function (a) {
            return [a[0], a[1]]
        },
        preventDefaults: function (a, b) {
            a || (a = window.event), a.preventDefault && a.preventDefault(), a.returnValue = !1, b && document.selection && document.selection.empty()
        },
        cancelEvent: function (a) {
            a || (a = window.event), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
        }
    }
}(), function () {
    function a() {
        var a = this;
        setTimeout(function () {
            $(a).select()
        }, 13)
    }
    function b() {
        if ($(".terminal").length) return;
        var a = $('<div class="terminal">').appendTo(".video-term-wrap");
        term = new Term(term_cols, term_rows), term.open(a.get(0)), k === "live" && term.startCursorBlink()
    }
    function c() {
        $(".terminal").remove(), b()
    }
    function d(a, b, c, d) {
        var e = $("<p>").append($("<strong>").text(a + ":")).append(document.createTextNode(" " + b)).appendTo(".chat-main");
        c && e.append('<span class="at">' + Math.round(c / 1e3) + "s</span>"), "hidden" == A && !d && ($(".chat-icon").highlight(), B || g()), $(".chat-main").get(0).scrollTop = 1e13
    }
    function e() {
        $(".chat-icon").length || $(".watchers").parent("td").before('<td><div class="chat-icon">&nbsp;</div></td>'), $(".chat-icon").click(function () {
            $(".chat").toggleClass("chat-shown"), $(".chat-icon").toggleClass("active"), f()
        })
    }
    function f() {
        $(".chat").is(".chat-shown") ? (A = "shown", $(".chat input").focus(), $(".chat-main").get(0).scrollTop = 1e13) : (B = !0, A = "hidden")
    }
    function g() {
        $(".chat").toggleClass("chat-shown"), $(".chat-icon").toggleClass("active"), f()
    }
    function h(a) {
        a = a.reverse(), "waiting" == k && !$(".td-pad").length && $("tr").prepend('<td class="td-pad"><div></div></td>'), e(), $(".chat-nickname").submit(function (a) {
            a.preventDefault(), $(".chat-nickname .error").remove(), i.emit("set nickname", $(".chat-nickname input").val(), function (a) {
                a ? $(".chat-nickname").append($('<span class="error">').text(a)) : ($(".chat-nickname").remove(), $(".chat-input").css("display", "block"), $(".chat-input input").focus())
            })
        }), $(".chat-input").submit(function (a) {
            a.preventDefault();
            var b = $(".chat-input input").val();
            d("me", b), i.emit("chat message", b), $(".chat-input input").val("")
        });
        for (var b = 0, c = a.length; b < c; b++) d(a[b].from, a[b].msg, null, !0);
        i.on("chat message", d)
    }
    function m() {
        $("tr").empty().append('<td class="td-pad"><div></div></td>', '<td><div class="watchers">' + j + "</div></td>", '<td><div class="offline">OFF&nbsp;AIR</div></td>')
    }
    function C() {
        function a() {
            o[t] ? u = setTimeout(function () {
                r = o[t].at, G(t + 1), a()
            }, o[t].at - r) : F()
        }
        $("#message .play").remove(), l = "playing", $("tr .play").text("Pause"), term.startCursorBlink(), v = setInterval(function () {
            r += 25, p[y + 1] && r > p[y + 1].at && (y++, d(p[y].from, p[y].msg, p[y].at)), z = !0, x.setStep(r / q * sliderWidth), z = !1
        }, 25), a(), w++
    }
    function D() {
        $(".chat-main").empty(), y = -1;
        for (var a = 0, b = p.length; a < b; a++) r > p[a].at && (y = a, d(p[a].from, p[a].msg, p[a].at))
    }
    function E(a) {
        var b = 0;
        if (!a) return 1;
        for (var c = o.length; b < c; b++) if (o[b].at > a) return b + 1;
        return b + 1
    }
    function F() {
        l = "paused", $("tr .play").text("Play"), clearTimeout(u), clearInterval(v), typeof term != "undefined" && term.stopCursorBlink()
    }
    function G(a) {
        $(".video").addClass("video-wait");
        var b;
        a && a > t ? b = t : (b = 0, c());
        for (b; b < a; b++) term.write(o[b].data);
        t = a, $(".video-term").get(0).scrollTop += 1e16, $(".video").removeClass("video-wait")
    }
    $.fn.highlight = function (a) {
        var a = a || 500,
            b = a + "ms background-color ease-out",
            c = $(this).css({
                webkitTransition: b,
                mozTransition: b,
                transition: b
            }).addClass("highlight");
        return setTimeout(function () {
            c.removeClass("highlight")
        }, a), c
    }, $(".cmd input").live("mousedown", a), $(".cmd input").live("focus", a);
    var i = io.connect("/?id=" + tid, {
        "connect timeout": 25e3
    }),
        j = 0,
        k = "waiting",
        l;
    i.on("chat payload", h), i.on("connect", function () {
        $(".wait").text("Please wait…")
    }), i.on("wait", function () {
        k = "waiting", m(), $("#message").empty().append($('<div class="notice">Waiting for a live stream.</div>'))
    }), i.on("complete check", function () {
    }), i.on("wait stream", function () {
    }), $.browser.safari && !/chrome/i.test(navigator.userAgent) && $(window).focus(function () {
        $("body").append(document.createTextNode(" "))
    }), i.on("live", function () {
        $(".td-wait").empty();
        if ($(".live").length) return;
        $(".notice").remove(), $(".offline").length ? $(".offline").addClass("live").removeClass("offline").text("LIVE") : $("tr").append('<td><div class="live">LIVE</div></td>'), k = "live", typeof term != "undefined" && term.startCursorBlink()
    }), i.on("offline", function () {
        $(".td-wait").remove();
        if ($(".offline").length) return;
        $("tr").append('<td><div class="offline">OFF&nbsp;AIR</div></td>'), typeof term != "undefined" && term.stopCursorBlink()
    }), i.on("live end", function () {
        $(".live").addClass("offline").removeClass("live").html("OFF&nbsp;AIR"), typeof term != "undefined" && term.stopCursorBlink()
    });
    var n = 0;
    i.on("watchers", function (a) {
        j = a, "waiting" == k && !$(".td-wait").length && $("tr").prepend('<td class="td-pad"><div></div></td>');
        if (!$(".watchers").length) {
            var b = '<td><div class="watchers">' + a + "</div></td>";
            $(".live").length ? $(".live").parent("td").before(b) : $("tr").append(b)
        }
        //$(".watchers").html(a), n && $(".watchers").highlight(), n++
    });
    var o = [],
        p = [],
        q = 0,
        r = 0,
        s, t, l = "paused",
        u, v, w = 0,
        x, y = -1,
        z = !1,
        A = "hidden",
        B = !1;
    i.on("frames", function (a, c) {
        function i(a) {
            return 1 == String(a).length ? "0" + a : a
        }
        $("#message").empty().append('<div class="play">►</div>'), $("#message .play").click(C), $(".td-wait").remove(), o = a, c.length && (e(), $(".chat-nickname, .chat-input").remove(), p = c);
        for (var d = 0, f = o.length; d < f; d++) q += o[d].delta || 0, o[d].at = q;
        b();
        var g = Math.round(q / 1e3),
            h = i(Math.floor(g / 60)),
            g = i(g - h * 60);
        $(".td-pad").remove(), $("tr .play").parents("td").remove(), $(".time").parents("td").remove(), $(".td-slider").remove(), $("tr").prepend('<td><div class="play">Play</div></td>', '<td><div class="time">' + h + ":" + g + "</div></td>", '<td class="td-slider"><div class="slider"><div class="bar"></div><div class="slider-control"><div class="knob"></div></div></div></td>'), sliderWidth = $(".slider").width(), x = new Dragdealer($(".slider-control").get(0), $(".slider-control .knob").get(0), {
            dragCallback: function () {
                if (z) return;
                F()
            },
            callback: function (a) {
                if (z) return;
                1 == a ? r = q : r = Math.round(a * q), D(), G(E(r))
            },
            steps: sliderWidth,
            speed: 100
        }), $("tr .play").click(function () {
            "paused" == l ? C() : F()
        }), k = "complete", G(0)
    }), i.on("frame", function (a) {
        b(), term.write(a)
    })
}();
