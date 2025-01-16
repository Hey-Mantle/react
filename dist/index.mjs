import Ye, { createContext as cr, useState as Ae, useEffect as fr, useContext as dr } from "react";
import { MantleClient as vr } from "@heymantle/client";
var ae = { exports: {} }, N = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var De;
function pr() {
  if (De)
    return N;
  De = 1;
  var n = Ye, f = Symbol.for("react.element"), m = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, j = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, A = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(b, u, C) {
    var g, E = {}, _ = null, D = null;
    C !== void 0 && (_ = "" + C), u.key !== void 0 && (_ = "" + u.key), u.ref !== void 0 && (D = u.ref);
    for (g in u)
      h.call(u, g) && !A.hasOwnProperty(g) && (E[g] = u[g]);
    if (b && b.defaultProps)
      for (g in u = b.defaultProps, u)
        E[g] === void 0 && (E[g] = u[g]);
    return { $$typeof: f, type: b, key: _, ref: D, props: E, _owner: j.current };
  }
  return N.Fragment = m, N.jsx = T, N.jsxs = T, N;
}
var M = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function mr() {
  return Fe || (Fe = 1, process.env.NODE_ENV !== "production" && function() {
    var n = Ye, f = Symbol.for("react.element"), m = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), b = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), D = Symbol.for("react.offscreen"), U = Symbol.iterator, J = "@@iterator";
    function G(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = U && e[U] || e[J];
      return typeof r == "function" ? r : null;
    }
    var P = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function p(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        H("error", e, t);
      }
    }
    function H(e, r, t) {
      {
        var a = P.ReactDebugCurrentFrame, s = a.getStackAddendum();
        s !== "" && (r += "%s", t = t.concat([s]));
        var c = t.map(function(i) {
          return String(i);
        });
        c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
      }
    }
    var X = !1, l = !1, x = !1, ie = !1, I = !1, ue;
    ue = Symbol.for("react.module.reference");
    function Ne(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === A || I || e === j || e === C || e === g || ie || e === D || X || l || x || typeof e == "object" && e !== null && (e.$$typeof === _ || e.$$typeof === E || e.$$typeof === T || e.$$typeof === b || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ue || e.getModuleId !== void 0));
    }
    function Me(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var s = r.displayName || r.name || "";
      return s !== "" ? t + "(" + s + ")" : t;
    }
    function se(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case m:
          return "Portal";
        case A:
          return "Profiler";
        case j:
          return "StrictMode";
        case C:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case b:
            var r = e;
            return se(r) + ".Consumer";
          case T:
            var t = e;
            return se(t._context) + ".Provider";
          case u:
            return Me(e, e.render, "ForwardRef");
          case E:
            var a = e.displayName || null;
            return a !== null ? a : S(e.type) || "Memo";
          case _: {
            var s = e, c = s._payload, i = s._init;
            try {
              return S(i(c));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var O = Object.assign, Y = 0, le, ce, fe, de, ve, pe, me;
    function be() {
    }
    be.__reactDisabledLog = !0;
    function Ue() {
      {
        if (Y === 0) {
          le = console.log, ce = console.info, fe = console.warn, de = console.error, ve = console.group, pe = console.groupCollapsed, me = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: be,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Y++;
      }
    }
    function Ie() {
      {
        if (Y--, Y === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: O({}, e, {
              value: le
            }),
            info: O({}, e, {
              value: ce
            }),
            warn: O({}, e, {
              value: fe
            }),
            error: O({}, e, {
              value: de
            }),
            group: O({}, e, {
              value: ve
            }),
            groupCollapsed: O({}, e, {
              value: pe
            }),
            groupEnd: O({}, e, {
              value: me
            })
          });
        }
        Y < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var z = P.ReactCurrentDispatcher, K;
    function $(e, r, t) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (s) {
            var a = s.stack.trim().match(/\n( *(at )?)/);
            K = a && a[1] || "";
          }
        return `
` + K + e;
      }
    }
    var Z = !1, W;
    {
      var $e = typeof WeakMap == "function" ? WeakMap : Map;
      W = new $e();
    }
    function ge(e, r) {
      if (!e || Z)
        return "";
      {
        var t = W.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      Z = !0;
      var s = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var c;
      c = z.current, z.current = null, Ue();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (w) {
              a = w;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (w) {
              a = w;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (w) {
            a = w;
          }
          e();
        }
      } catch (w) {
        if (w && a && typeof w.stack == "string") {
          for (var o = w.stack.split(`
`), y = a.stack.split(`
`), d = o.length - 1, v = y.length - 1; d >= 1 && v >= 0 && o[d] !== y[v]; )
            v--;
          for (; d >= 1 && v >= 0; d--, v--)
            if (o[d] !== y[v]) {
              if (d !== 1 || v !== 1)
                do
                  if (d--, v--, v < 0 || o[d] !== y[v]) {
                    var R = `
` + o[d].replace(" at new ", " at ");
                    return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), typeof e == "function" && W.set(e, R), R;
                  }
                while (d >= 1 && v >= 0);
              break;
            }
        }
      } finally {
        Z = !1, z.current = c, Ie(), Error.prepareStackTrace = s;
      }
      var k = e ? e.displayName || e.name : "", je = k ? $(k) : "";
      return typeof e == "function" && W.set(e, je), je;
    }
    function We(e, r, t) {
      return ge(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function V(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, Ve(e));
      if (typeof e == "string")
        return $(e);
      switch (e) {
        case C:
          return $("Suspense");
        case g:
          return $("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return We(e.render);
          case E:
            return V(e.type, r, t);
          case _: {
            var a = e, s = a._payload, c = a._init;
            try {
              return V(c(s), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var q = Object.prototype.hasOwnProperty, he = {}, ye = P.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = V(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(t);
      } else
        ye.setExtraStackFrame(null);
    }
    function qe(e, r, t, a, s) {
      {
        var c = Function.call.bind(q);
        for (var i in e)
          if (c(e, i)) {
            var o = void 0;
            try {
              if (typeof e[i] != "function") {
                var y = Error((a || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              o = e[i](r, i, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (d) {
              o = d;
            }
            o && !(o instanceof Error) && (B(s), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, i, typeof o), B(null)), o instanceof Error && !(o.message in he) && (he[o.message] = !0, B(s), p("Failed %s type: %s", t, o.message), B(null));
          }
      }
    }
    var Be = Array.isArray;
    function Q(e) {
      return Be(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ge(e) {
      try {
        return Ee(e), !1;
      } catch {
        return !0;
      }
    }
    function Ee(e) {
      return "" + e;
    }
    function Re(e) {
      if (Ge(e))
        return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), Ee(e);
    }
    var L = P.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, _e, Se, ee;
    ee = {};
    function Xe(e) {
      if (q.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ze(e) {
      if (q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ke(e, r) {
      if (typeof e.ref == "string" && L.current && r && L.current.stateNode !== r) {
        var t = S(L.current.type);
        ee[t] || (p('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', S(L.current.type), e.ref), ee[t] = !0);
      }
    }
    function Ze(e, r) {
      {
        var t = function() {
          _e || (_e = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          Se || (Se = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var er = function(e, r, t, a, s, c, i) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: c
      };
      return o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(o, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(o, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function rr(e, r, t, a, s) {
      {
        var c, i = {}, o = null, y = null;
        t !== void 0 && (Re(t), o = "" + t), ze(r) && (Re(r.key), o = "" + r.key), Xe(r) && (y = r.ref, Ke(r, s));
        for (c in r)
          q.call(r, c) && !He.hasOwnProperty(c) && (i[c] = r[c]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (c in d)
            i[c] === void 0 && (i[c] = d[c]);
        }
        if (o || y) {
          var v = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && Ze(i, v), y && Qe(i, v);
        }
        return er(e, o, y, s, a, L.current, i);
      }
    }
    var re = P.ReactCurrentOwner, we = P.ReactDebugCurrentFrame;
    function F(e) {
      if (e) {
        var r = e._owner, t = V(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    var te;
    te = !1;
    function ne(e) {
      return typeof e == "object" && e !== null && e.$$typeof === f;
    }
    function Ce() {
      {
        if (re.current) {
          var e = S(re.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var Pe = {};
    function nr(e) {
      {
        var r = Ce();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Te(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (Pe[t])
          return;
        Pe[t] = !0;
        var a = "";
        e && e._owner && e._owner !== re.current && (a = " It was passed a child from " + S(e._owner.type) + "."), F(e), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), F(null);
      }
    }
    function xe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Q(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            ne(a) && Te(a, r);
          }
        else if (ne(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var s = G(e);
          if (typeof s == "function" && s !== e.entries)
            for (var c = s.call(e), i; !(i = c.next()).done; )
              ne(i.value) && Te(i.value, r);
        }
      }
    }
    function ar(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === E))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = S(r);
          qe(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !te) {
          te = !0;
          var s = S(r);
          p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", s || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function or(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            F(e), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), F(null);
            break;
          }
        }
        e.ref !== null && (F(e), p("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    function Oe(e, r, t, a, s, c) {
      {
        var i = Ne(e);
        if (!i) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var y = tr(s);
          y ? o += y : o += Ce();
          var d;
          e === null ? d = "null" : Q(e) ? d = "array" : e !== void 0 && e.$$typeof === f ? (d = "<" + (S(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, p("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, o);
        }
        var v = rr(e, r, t, s, c);
        if (v == null)
          return v;
        if (i) {
          var R = r.children;
          if (R !== void 0)
            if (a)
              if (Q(R)) {
                for (var k = 0; k < R.length; k++)
                  xe(R[k], e);
                Object.freeze && Object.freeze(R);
              } else
                p("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              xe(R, e);
        }
        return e === h ? or(v) : ar(v), v;
      }
    }
    function ir(e, r, t) {
      return Oe(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Oe(e, r, t, !1);
    }
    var sr = ur, lr = ir;
    M.Fragment = h, M.jsx = sr, M.jsxs = lr;
  }()), M;
}
process.env.NODE_ENV === "production" ? ae.exports = pr() : ae.exports = mr();
var br = ae.exports;
const oe = {
  // Common
  loading: "Loading...",
  error: "An error occurred",
  retry: "Retry",
  cancel: "Cancel",
  continue: "Continue",
  // Subscription
  subscribe: "Subscribe",
  subscribeNow: "Subscribe Now",
  upgradeNow: "Upgrade Now",
  manageSubscription: "Manage Subscription",
  cancelSubscription: "Cancel Subscription",
  // Payment
  addPaymentMethod: "Add Payment Method",
  updatePaymentMethod: "Update Payment Method",
  // Features
  featureNotAvailable: "This feature is not available on your current plan",
  upgradeRequired: "Upgrade Required",
  limitReached: "Limit Reached"
}, Le = cr(void 0), gr = ({ feature: n, count: f = 0 }) => (n == null ? void 0 : n.type) === "boolean" ? n.value : (n == null ? void 0 : n.type) === "limit" ? f < n.value || n.value === -1 : !1, wr = ({
  appId: n,
  customerApiToken: f,
  apiUrl: m = "https://appapi.heymantle.com/v1",
  children: h,
  i18n: j = oe,
  waitForCustomer: A = !1,
  loadingComponent: T = null
}) => {
  const b = new vr({ appId: n, customerApiToken: f, apiUrl: m }), [u, C] = Ae(null), [g, E] = Ae(!0), _ = async () => {
    try {
      E(!0);
      const l = await b.getCustomer();
      C(l);
    } catch (l) {
      console.error("[MantleProvider] Error fetching customer: ", l);
    } finally {
      E(!1);
    }
  }, D = async (l) => {
    await b.sendUsageEvent(l);
  }, U = async ({ usageId: l, period: x }) => await b.getUsageMetricReport({ id: l, period: x }), J = async (l) => await b.subscribe(l), G = async ({ cancelReason: l } = {}) => await b.cancelSubscription({
    ...l && { cancelReason: l }
  }), P = async ({ returnUrl: l }) => {
    if (!l)
      throw new Error("returnUrl is required");
    return await b.addPaymentMethod({ returnUrl: l });
  }, p = async ({ type: l, config: x }) => {
    if (!l)
      throw new Error("type is required");
    const I = new URL(document.location.toString()).searchParams.get("locale");
    return await b.createHostedSession({
      type: l,
      config: {
        ...I ? { locale: I } : {},
        ...x || {}
      }
    });
  };
  fr(() => {
    f && _();
  }, [f]);
  const H = (u == null ? void 0 : u.plans) || [], X = (u == null ? void 0 : u.subscription) || null;
  return A && g ? T || null : /* @__PURE__ */ br.jsx(
    Le.Provider,
    {
      value: {
        client: b,
        customer: u,
        subscription: X,
        plans: H,
        loading: g,
        i18n: { ...oe, ...j },
        sendUsageEvent: D,
        getUsageReport: U,
        subscribe: J,
        cancelSubscription: G,
        addPaymentMethod: P,
        createHostedSession: p,
        isFeatureEnabled: ({ featureKey: l, count: x = 0 }) => u != null && u.features[l] ? gr({
          feature: u.features[l],
          count: x
        }) : !1,
        limitForFeature: ({ featureKey: l }) => u != null && u.features[l] && u.features[l].type === "limit" ? u.features[l].value : -1,
        refetch: async () => {
          await _();
        }
      },
      children: h
    }
  );
}, Cr = () => {
  const n = dr(Le);
  if (n === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return n;
}, ke = (n) => n.type === "boolean" && n.value === !0 || n.type === "limit" && n.value !== 0, Pr = (n, f) => Number(ke(f)) - Number(ke(n)) || n.name.localeCompare(f.name), hr = (n = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: n,
  notation: "standard"
}), Tr = (n, f = "USD", m = !0) => {
  let h = hr(f).format(n);
  return m && (h = h.replace(/\.00$/, "")), h;
};
var yr = /* @__PURE__ */ ((n) => (n.Annual = "ANNUAL", n.Every30Days = "EVERY_30_DAYS", n))(yr || {});
const Er = (n = "EVERY_30_DAYS") => {
  switch (n) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, Rr = (n = "EVERY_30_DAYS") => {
  switch (n) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, xr = ({
  interval: n = "EVERY_30_DAYS",
  useShortFormPlanIntervals: f = !0
}) => f ? Rr(n) : Er(n), Or = ({
  plan: n,
  customFieldKey: f = "recommended"
}) => {
  var m;
  return !!((m = n.customFields) != null && m[f]);
}, jr = ({
  plan: n,
  customFieldKey: f = "buttonLabel"
}) => {
  var m;
  return ((m = n.customFields) == null ? void 0 : m[f]) || oe.subscribe;
}, Ar = ({ plan: n }) => {
  var f;
  return ((f = n.discounts) == null ? void 0 : f.length) > 0 ? n.discounts.reduce(
    (m, h) => m.discountedAmount < h.discountedAmount ? m : h
  ) : void 0;
}, Dr = (n = 4) => n % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : n % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : n % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : n === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, Fr = (n = 4) => n % 4 === 0 ? 4 : n % 3 === 0 ? 3 : n % 2 === 0 ? 2 : n === 1 ? 1 : 4;
export {
  oe as Labels,
  wr as MantleProvider,
  yr as PlanInterval,
  Fr as columnCount,
  Dr as columnSpan,
  jr as customButtonLabel,
  ke as featureEnabled,
  Pr as featureSort,
  Ar as highestDiscount,
  xr as intervalLabel,
  Er as intervalLabelLong,
  Rr as intervalLabelShort,
  Or as isRecommendedPlan,
  Tr as money,
  Cr as useMantle
};
//# sourceMappingURL=index.mjs.map
