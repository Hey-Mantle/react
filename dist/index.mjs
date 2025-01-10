import Ae, { createContext as lr, useState as je, useEffect as cr, useContext as fr } from "react";
import { MantleClient as dr } from "@heymantle/client";
var ae = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function vr() {
  if (ke)
    return $;
  ke = 1;
  var d = Ae, m = Symbol.for("react.element"), A = Symbol.for("react.fragment"), w = Object.prototype.hasOwnProperty, x = d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, j = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(p, o, P) {
    var b, h = {}, E = null, k = null;
    P !== void 0 && (E = "" + P), o.key !== void 0 && (E = "" + o.key), o.ref !== void 0 && (k = o.ref);
    for (b in o)
      w.call(o, b) && !j.hasOwnProperty(b) && (h[b] = o[b]);
    if (p && p.defaultProps)
      for (b in o = p.defaultProps, o)
        h[b] === void 0 && (h[b] = o[b]);
    return { $$typeof: m, type: p, key: E, ref: k, props: h, _owner: x.current };
  }
  return $.Fragment = A, $.jsx = S, $.jsxs = S, $;
}
var U = {};
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
function pr() {
  return Fe || (Fe = 1, process.env.NODE_ENV !== "production" && function() {
    var d = Ae, m = Symbol.for("react.element"), A = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), p = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), W = Symbol.iterator, J = "@@iterator";
    function G(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = W && e[W] || e[J];
      return typeof r == "function" ? r : null;
    }
    var C = d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        z("error", e, t);
      }
    }
    function z(e, r, t) {
      {
        var n = C.ReactDebugCurrentFrame, u = n.getStackAddendum();
        u !== "" && (r += "%s", t = t.concat([u]));
        var l = t.map(function(i) {
          return String(i);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var H = !1, s = !1, T = !1, ie = !1, L = !1, oe;
    oe = Symbol.for("react.module.reference");
    function Ie(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === w || e === j || L || e === x || e === P || e === b || ie || e === k || H || s || T || typeof e == "object" && e !== null && (e.$$typeof === E || e.$$typeof === h || e.$$typeof === S || e.$$typeof === p || e.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === oe || e.getModuleId !== void 0));
    }
    function $e(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var u = r.displayName || r.name || "";
      return u !== "" ? t + "(" + u + ")" : t;
    }
    function ue(e) {
      return e.displayName || "Context";
    }
    function R(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case w:
          return "Fragment";
        case A:
          return "Portal";
        case j:
          return "Profiler";
        case x:
          return "StrictMode";
        case P:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case p:
            var r = e;
            return ue(r) + ".Consumer";
          case S:
            var t = e;
            return ue(t._context) + ".Provider";
          case o:
            return $e(e, e.render, "ForwardRef");
          case h:
            var n = e.displayName || null;
            return n !== null ? n : R(e.type) || "Memo";
          case E: {
            var u = e, l = u._payload, i = u._init;
            try {
              return R(i(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var O = Object.assign, M = 0, se, le, ce, fe, de, ve, pe;
    function be() {
    }
    be.__reactDisabledLog = !0;
    function Ue() {
      {
        if (M === 0) {
          se = console.log, le = console.info, ce = console.warn, fe = console.error, de = console.group, ve = console.groupCollapsed, pe = console.groupEnd;
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
        M++;
      }
    }
    function We() {
      {
        if (M--, M === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: O({}, e, {
              value: se
            }),
            info: O({}, e, {
              value: le
            }),
            warn: O({}, e, {
              value: ce
            }),
            error: O({}, e, {
              value: fe
            }),
            group: O({}, e, {
              value: de
            }),
            groupCollapsed: O({}, e, {
              value: ve
            }),
            groupEnd: O({}, e, {
              value: pe
            })
          });
        }
        M < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var X = C.ReactCurrentDispatcher, K;
    function N(e, r, t) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (u) {
            var n = u.stack.trim().match(/\n( *(at )?)/);
            K = n && n[1] || "";
          }
        return `
` + K + e;
      }
    }
    var Z = !1, Y;
    {
      var Le = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new Le();
    }
    function ge(e, r) {
      if (!e || Z)
        return "";
      {
        var t = Y.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      Z = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = X.current, X.current = null, Ue();
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
            } catch (_) {
              n = _;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (_) {
              n = _;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (_) {
            n = _;
          }
          e();
        }
      } catch (_) {
        if (_ && n && typeof _.stack == "string") {
          for (var a = _.stack.split(`
`), g = n.stack.split(`
`), c = a.length - 1, f = g.length - 1; c >= 1 && f >= 0 && a[c] !== g[f]; )
            f--;
          for (; c >= 1 && f >= 0; c--, f--)
            if (a[c] !== g[f]) {
              if (c !== 1 || f !== 1)
                do
                  if (c--, f--, f < 0 || a[c] !== g[f]) {
                    var y = `
` + a[c].replace(" at new ", " at ");
                    return e.displayName && y.includes("<anonymous>") && (y = y.replace("<anonymous>", e.displayName)), typeof e == "function" && Y.set(e, y), y;
                  }
                while (c >= 1 && f >= 0);
              break;
            }
        }
      } finally {
        Z = !1, X.current = l, We(), Error.prepareStackTrace = u;
      }
      var D = e ? e.displayName || e.name : "", xe = D ? N(D) : "";
      return typeof e == "function" && Y.set(e, xe), xe;
    }
    function Ne(e, r, t) {
      return ge(e, !1);
    }
    function Ye(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function V(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, Ye(e));
      if (typeof e == "string")
        return N(e);
      switch (e) {
        case P:
          return N("Suspense");
        case b:
          return N("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case o:
            return Ne(e.render);
          case h:
            return V(e.type, r, t);
          case E: {
            var n = e, u = n._payload, l = n._init;
            try {
              return V(l(u), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var q = Object.prototype.hasOwnProperty, he = {}, ye = C.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = V(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(t);
      } else
        ye.setExtraStackFrame(null);
    }
    function Ve(e, r, t, n, u) {
      {
        var l = Function.call.bind(q);
        for (var i in e)
          if (l(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var g = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw g.name = "Invariant Violation", g;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (c) {
              a = c;
            }
            a && !(a instanceof Error) && (B(u), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), B(null)), a instanceof Error && !(a.message in he) && (he[a.message] = !0, B(u), v("Failed %s type: %s", t, a.message), B(null));
          }
      }
    }
    var qe = Array.isArray;
    function Q(e) {
      return qe(e);
    }
    function Be(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Je(e) {
      try {
        return me(e), !1;
      } catch {
        return !0;
      }
    }
    function me(e) {
      return "" + e;
    }
    function Ee(e) {
      if (Je(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), me(e);
    }
    var I = C.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Re, _e, ee;
    ee = {};
    function ze(e) {
      if (q.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function He(e) {
      if (q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Xe(e, r) {
      if (typeof e.ref == "string" && I.current && r && I.current.stateNode !== r) {
        var t = R(I.current.type);
        ee[t] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', R(I.current.type), e.ref), ee[t] = !0);
      }
    }
    function Ke(e, r) {
      {
        var t = function() {
          Re || (Re = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Ze(e, r) {
      {
        var t = function() {
          _e || (_e = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var Qe = function(e, r, t, n, u, l, i) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: m,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: l
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function er(e, r, t, n, u) {
      {
        var l, i = {}, a = null, g = null;
        t !== void 0 && (Ee(t), a = "" + t), He(r) && (Ee(r.key), a = "" + r.key), ze(r) && (g = r.ref, Xe(r, u));
        for (l in r)
          q.call(r, l) && !Ge.hasOwnProperty(l) && (i[l] = r[l]);
        if (e && e.defaultProps) {
          var c = e.defaultProps;
          for (l in c)
            i[l] === void 0 && (i[l] = c[l]);
        }
        if (a || g) {
          var f = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Ke(i, f), g && Ze(i, f);
        }
        return Qe(e, a, g, u, n, I.current, i);
      }
    }
    var re = C.ReactCurrentOwner, we = C.ReactDebugCurrentFrame;
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
      return typeof e == "object" && e !== null && e.$$typeof === m;
    }
    function Pe() {
      {
        if (re.current) {
          var e = R(re.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function rr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var Ce = {};
    function tr(e) {
      {
        var r = Pe();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Se(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = tr(r);
        if (Ce[t])
          return;
        Ce[t] = !0;
        var n = "";
        e && e._owner && e._owner !== re.current && (n = " It was passed a child from " + R(e._owner.type) + "."), F(e), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), F(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Q(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            ne(n) && Se(n, r);
          }
        else if (ne(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var u = G(e);
          if (typeof u == "function" && u !== e.entries)
            for (var l = u.call(e), i; !(i = l.next()).done; )
              ne(i.value) && Se(i.value, r);
        }
      }
    }
    function nr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === h))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = R(r);
          Ve(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !te) {
          te = !0;
          var u = R(r);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", u || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ar(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            F(e), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), F(null);
            break;
          }
        }
        e.ref !== null && (F(e), v("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    function Oe(e, r, t, n, u, l) {
      {
        var i = Ie(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var g = rr(u);
          g ? a += g : a += Pe();
          var c;
          e === null ? c = "null" : Q(e) ? c = "array" : e !== void 0 && e.$$typeof === m ? (c = "<" + (R(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : c = typeof e, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", c, a);
        }
        var f = er(e, r, t, u, l);
        if (f == null)
          return f;
        if (i) {
          var y = r.children;
          if (y !== void 0)
            if (n)
              if (Q(y)) {
                for (var D = 0; D < y.length; D++)
                  Te(y[D], e);
                Object.freeze && Object.freeze(y);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(y, e);
        }
        return e === w ? ar(f) : nr(f), f;
      }
    }
    function ir(e, r, t) {
      return Oe(e, r, t, !0);
    }
    function or(e, r, t) {
      return Oe(e, r, t, !1);
    }
    var ur = or, sr = ir;
    U.Fragment = w, U.jsx = ur, U.jsxs = sr;
  }()), U;
}
process.env.NODE_ENV === "production" ? ae.exports = vr() : ae.exports = pr();
var br = ae.exports;
const De = {
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
}, Me = lr(void 0), gr = ({ feature: d, count: m = 0 }) => (d == null ? void 0 : d.type) === "boolean" ? d.value : (d == null ? void 0 : d.type) === "limit" ? m < d.value || d.value === -1 : !1, mr = ({
  appId: d,
  customerApiToken: m,
  apiUrl: A = "https://appapi.heymantle.com/v1",
  children: w,
  i18n: x = De,
  waitForCustomer: j = !1,
  loadingComponent: S = null
}) => {
  const p = new dr({ appId: d, customerApiToken: m, apiUrl: A }), [o, P] = je(null), [b, h] = je(!0), E = async () => {
    try {
      h(!0);
      const s = await p.getCustomer();
      P(s);
    } catch (s) {
      console.error("[MantleProvider] Error fetching customer: ", s);
    } finally {
      h(!1);
    }
  }, k = async (s) => {
    await p.sendUsageEvent(s);
  }, W = async ({ usageId: s, period: T }) => await p.getUsageMetricReport({ id: s, period: T }), J = async (s) => await p.subscribe(s), G = async ({ cancelReason: s } = {}) => await p.cancelSubscription({
    ...s && { cancelReason: s }
  }), C = async ({ returnUrl: s }) => {
    if (!s)
      throw new Error("returnUrl is required");
    return await p.addPaymentMethod({ returnUrl: s });
  }, v = async ({ type: s, config: T }) => {
    if (!s)
      throw new Error("type is required");
    const L = new URL(document.location.toString()).searchParams.get("locale");
    return await p.createHostedSession({
      type: s,
      config: {
        ...L ? { locale: L } : {},
        ...T || {}
      }
    });
  };
  cr(() => {
    m && E();
  }, [m]);
  const z = (o == null ? void 0 : o.plans) || [], H = (o == null ? void 0 : o.subscription) || null;
  return j && b ? S || null : /* @__PURE__ */ br.jsx(
    Me.Provider,
    {
      value: {
        client: p,
        customer: o,
        subscription: H,
        plans: z,
        loading: b,
        i18n: { ...De, ...x },
        sendUsageEvent: k,
        getUsageReport: W,
        subscribe: J,
        cancelSubscription: G,
        addPaymentMethod: C,
        createHostedSession: v,
        isFeatureEnabled: ({ featureKey: s, count: T = 0 }) => o != null && o.features[s] ? gr({
          feature: o.features[s],
          count: T
        }) : !1,
        limitForFeature: ({ featureKey: s }) => o != null && o.features[s] && o.features[s].type === "limit" ? o.features[s].value : -1,
        refetch: async () => {
          await E();
        }
      },
      children: w
    }
  );
}, Er = () => {
  const d = fr(Me);
  if (d === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return d;
};
export {
  De as Labels,
  mr as MantleProvider,
  Er as useMantle
};
//# sourceMappingURL=index.mjs.map
