"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const x=require("react"),sr=require("@heymantle/client");var ie={exports:{}},L={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fe;function lr(){if(Fe)return L;Fe=1;var d=x,m=Symbol.for("react.element"),M=Symbol.for("react.fragment"),w=Object.prototype.hasOwnProperty,j=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,k={key:!0,ref:!0,__self:!0,__source:!0};function C(p,o,P){var b,h={},E=null,F=null;P!==void 0&&(E=""+P),o.key!==void 0&&(E=""+o.key),o.ref!==void 0&&(F=o.ref);for(b in o)w.call(o,b)&&!k.hasOwnProperty(b)&&(h[b]=o[b]);if(p&&p.defaultProps)for(b in o=p.defaultProps,o)h[b]===void 0&&(h[b]=o[b]);return{$$typeof:m,type:p,key:E,ref:F,props:h,_owner:j.current}}return L.Fragment=M,L.jsx=C,L.jsxs=C,L}var U={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var De;function cr(){return De||(De=1,process.env.NODE_ENV!=="production"&&function(){var d=x,m=Symbol.for("react.element"),M=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),p=Symbol.for("react.context"),o=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),b=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),F=Symbol.for("react.offscreen"),W=Symbol.iterator,G="@@iterator";function z(e){if(e===null||typeof e!="object")return null;var r=W&&e[W]||e[G];return typeof r=="function"?r:null}var S=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function v(e){{for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];H("error",e,t)}}function H(e,r,t){{var n=S.ReactDebugCurrentFrame,u=n.getStackAddendum();u!==""&&(r+="%s",t=t.concat([u]));var l=t.map(function(i){return String(i)});l.unshift("Warning: "+r),Function.prototype.apply.call(console[e],console,l)}}var X=!1,s=!1,T=!1,ue=!1,N=!1,se;se=Symbol.for("react.module.reference");function Me(e){return!!(typeof e=="string"||typeof e=="function"||e===w||e===k||N||e===j||e===P||e===b||ue||e===F||X||s||T||typeof e=="object"&&e!==null&&(e.$$typeof===E||e.$$typeof===h||e.$$typeof===C||e.$$typeof===p||e.$$typeof===o||e.$$typeof===se||e.getModuleId!==void 0))}function Ie(e,r,t){var n=e.displayName;if(n)return n;var u=r.displayName||r.name||"";return u!==""?t+"("+u+")":t}function le(e){return e.displayName||"Context"}function R(e){if(e==null)return null;if(typeof e.tag=="number"&&v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case M:return"Portal";case k:return"Profiler";case j:return"StrictMode";case P:return"Suspense";case b:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case p:var r=e;return le(r)+".Consumer";case C:var t=e;return le(t._context)+".Provider";case o:return Ie(e,e.render,"ForwardRef");case h:var n=e.displayName||null;return n!==null?n:R(e.type)||"Memo";case E:{var u=e,l=u._payload,i=u._init;try{return R(i(l))}catch{return null}}}return null}var O=Object.assign,I=0,ce,fe,de,ve,pe,be,ge;function he(){}he.__reactDisabledLog=!0;function $e(){{if(I===0){ce=console.log,fe=console.info,de=console.warn,ve=console.error,pe=console.group,be=console.groupCollapsed,ge=console.groupEnd;var e={configurable:!0,enumerable:!0,value:he,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}I++}}function Le(){{if(I--,I===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:O({},e,{value:ce}),info:O({},e,{value:fe}),warn:O({},e,{value:de}),error:O({},e,{value:ve}),group:O({},e,{value:pe}),groupCollapsed:O({},e,{value:be}),groupEnd:O({},e,{value:ge})})}I<0&&v("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var K=S.ReactCurrentDispatcher,Z;function Y(e,r,t){{if(Z===void 0)try{throw Error()}catch(u){var n=u.stack.trim().match(/\n( *(at )?)/);Z=n&&n[1]||""}return`
`+Z+e}}var Q=!1,V;{var Ue=typeof WeakMap=="function"?WeakMap:Map;V=new Ue}function ye(e,r){if(!e||Q)return"";{var t=V.get(e);if(t!==void 0)return t}var n;Q=!0;var u=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var l;l=K.current,K.current=null,$e();try{if(r){var i=function(){throw Error()};if(Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(_){n=_}Reflect.construct(e,[],i)}else{try{i.call()}catch(_){n=_}e.call(i.prototype)}}else{try{throw Error()}catch(_){n=_}e()}}catch(_){if(_&&n&&typeof _.stack=="string"){for(var a=_.stack.split(`
`),g=n.stack.split(`
`),c=a.length-1,f=g.length-1;c>=1&&f>=0&&a[c]!==g[f];)f--;for(;c>=1&&f>=0;c--,f--)if(a[c]!==g[f]){if(c!==1||f!==1)do if(c--,f--,f<0||a[c]!==g[f]){var y=`
`+a[c].replace(" at new "," at ");return e.displayName&&y.includes("<anonymous>")&&(y=y.replace("<anonymous>",e.displayName)),typeof e=="function"&&V.set(e,y),y}while(c>=1&&f>=0);break}}}finally{Q=!1,K.current=l,Le(),Error.prepareStackTrace=u}var A=e?e.displayName||e.name:"",ke=A?Y(A):"";return typeof e=="function"&&V.set(e,ke),ke}function We(e,r,t){return ye(e,!1)}function Ne(e){var r=e.prototype;return!!(r&&r.isReactComponent)}function q(e,r,t){if(e==null)return"";if(typeof e=="function")return ye(e,Ne(e));if(typeof e=="string")return Y(e);switch(e){case P:return Y("Suspense");case b:return Y("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case o:return We(e.render);case h:return q(e.type,r,t);case E:{var n=e,u=n._payload,l=n._init;try{return q(l(u),r,t)}catch{}}}return""}var B=Object.prototype.hasOwnProperty,me={},Ee=S.ReactDebugCurrentFrame;function J(e){if(e){var r=e._owner,t=q(e.type,e._source,r?r.type:null);Ee.setExtraStackFrame(t)}else Ee.setExtraStackFrame(null)}function Ye(e,r,t,n,u){{var l=Function.call.bind(B);for(var i in e)if(l(e,i)){var a=void 0;try{if(typeof e[i]!="function"){var g=Error((n||"React class")+": "+t+" type `"+i+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[i]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}a=e[i](r,i,n,t,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(c){a=c}a&&!(a instanceof Error)&&(J(u),v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",n||"React class",t,i,typeof a),J(null)),a instanceof Error&&!(a.message in me)&&(me[a.message]=!0,J(u),v("Failed %s type: %s",t,a.message),J(null))}}}var Ve=Array.isArray;function ee(e){return Ve(e)}function qe(e){{var r=typeof Symbol=="function"&&Symbol.toStringTag,t=r&&e[Symbol.toStringTag]||e.constructor.name||"Object";return t}}function Be(e){try{return Re(e),!1}catch{return!0}}function Re(e){return""+e}function _e(e){if(Be(e))return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",qe(e)),Re(e)}var $=S.ReactCurrentOwner,Je={key:!0,ref:!0,__self:!0,__source:!0},we,Pe,re;re={};function Ge(e){if(B.call(e,"ref")){var r=Object.getOwnPropertyDescriptor(e,"ref").get;if(r&&r.isReactWarning)return!1}return e.ref!==void 0}function ze(e){if(B.call(e,"key")){var r=Object.getOwnPropertyDescriptor(e,"key").get;if(r&&r.isReactWarning)return!1}return e.key!==void 0}function He(e,r){if(typeof e.ref=="string"&&$.current&&r&&$.current.stateNode!==r){var t=R($.current.type);re[t]||(v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',R($.current.type),e.ref),re[t]=!0)}}function Xe(e,r){{var t=function(){we||(we=!0,v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"key",{get:t,configurable:!0})}}function Ke(e,r){{var t=function(){Pe||(Pe=!0,v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"ref",{get:t,configurable:!0})}}var Ze=function(e,r,t,n,u,l,i){var a={$$typeof:m,type:e,key:r,ref:t,props:i,_owner:l};return a._store={},Object.defineProperty(a._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(a,"_self",{configurable:!1,enumerable:!1,writable:!1,value:n}),Object.defineProperty(a,"_source",{configurable:!1,enumerable:!1,writable:!1,value:u}),Object.freeze&&(Object.freeze(a.props),Object.freeze(a)),a};function Qe(e,r,t,n,u){{var l,i={},a=null,g=null;t!==void 0&&(_e(t),a=""+t),ze(r)&&(_e(r.key),a=""+r.key),Ge(r)&&(g=r.ref,He(r,u));for(l in r)B.call(r,l)&&!Je.hasOwnProperty(l)&&(i[l]=r[l]);if(e&&e.defaultProps){var c=e.defaultProps;for(l in c)i[l]===void 0&&(i[l]=c[l])}if(a||g){var f=typeof e=="function"?e.displayName||e.name||"Unknown":e;a&&Xe(i,f),g&&Ke(i,f)}return Ze(e,a,g,u,n,$.current,i)}}var te=S.ReactCurrentOwner,Se=S.ReactDebugCurrentFrame;function D(e){if(e){var r=e._owner,t=q(e.type,e._source,r?r.type:null);Se.setExtraStackFrame(t)}else Se.setExtraStackFrame(null)}var ne;ne=!1;function ae(e){return typeof e=="object"&&e!==null&&e.$$typeof===m}function Ce(){{if(te.current){var e=R(te.current.type);if(e)return`

Check the render method of \``+e+"`."}return""}}function er(e){{if(e!==void 0){var r=e.fileName.replace(/^.*[\\\/]/,""),t=e.lineNumber;return`

Check your code at `+r+":"+t+"."}return""}}var Te={};function rr(e){{var r=Ce();if(!r){var t=typeof e=="string"?e:e.displayName||e.name;t&&(r=`

Check the top-level render call using <`+t+">.")}return r}}function Oe(e,r){{if(!e._store||e._store.validated||e.key!=null)return;e._store.validated=!0;var t=rr(r);if(Te[t])return;Te[t]=!0;var n="";e&&e._owner&&e._owner!==te.current&&(n=" It was passed a child from "+R(e._owner.type)+"."),D(e),v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',t,n),D(null)}}function xe(e,r){{if(typeof e!="object")return;if(ee(e))for(var t=0;t<e.length;t++){var n=e[t];ae(n)&&Oe(n,r)}else if(ae(e))e._store&&(e._store.validated=!0);else if(e){var u=z(e);if(typeof u=="function"&&u!==e.entries)for(var l=u.call(e),i;!(i=l.next()).done;)ae(i.value)&&Oe(i.value,r)}}}function tr(e){{var r=e.type;if(r==null||typeof r=="string")return;var t;if(typeof r=="function")t=r.propTypes;else if(typeof r=="object"&&(r.$$typeof===o||r.$$typeof===h))t=r.propTypes;else return;if(t){var n=R(r);Ye(t,e.props,"prop",n,e)}else if(r.PropTypes!==void 0&&!ne){ne=!0;var u=R(r);v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",u||"Unknown")}typeof r.getDefaultProps=="function"&&!r.getDefaultProps.isReactClassApproved&&v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function nr(e){{for(var r=Object.keys(e.props),t=0;t<r.length;t++){var n=r[t];if(n!=="children"&&n!=="key"){D(e),v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",n),D(null);break}}e.ref!==null&&(D(e),v("Invalid attribute `ref` supplied to `React.Fragment`."),D(null))}}function je(e,r,t,n,u,l){{var i=Me(e);if(!i){var a="";(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(a+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var g=er(u);g?a+=g:a+=Ce();var c;e===null?c="null":ee(e)?c="array":e!==void 0&&e.$$typeof===m?(c="<"+(R(e.type)||"Unknown")+" />",a=" Did you accidentally export a JSX literal instead of a component?"):c=typeof e,v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",c,a)}var f=Qe(e,r,t,u,l);if(f==null)return f;if(i){var y=r.children;if(y!==void 0)if(n)if(ee(y)){for(var A=0;A<y.length;A++)xe(y[A],e);Object.freeze&&Object.freeze(y)}else v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else xe(y,e)}return e===w?nr(f):tr(f),f}}function ar(e,r,t){return je(e,r,t,!0)}function ir(e,r,t){return je(e,r,t,!1)}var or=ir,ur=ar;U.Fragment=w,U.jsx=or,U.jsxs=ur}()),U}process.env.NODE_ENV==="production"?ie.exports=lr():ie.exports=cr();var fr=ie.exports;const oe={loading:"Loading...",error:"An error occurred",retry:"Retry",cancel:"Cancel",continue:"Continue",subscribe:"Subscribe",subscribeNow:"Subscribe Now",upgradeNow:"Upgrade Now",manageSubscription:"Manage Subscription",cancelSubscription:"Cancel Subscription",addPaymentMethod:"Add Payment Method",updatePaymentMethod:"Update Payment Method",featureNotAvailable:"This feature is not available on your current plan",upgradeRequired:"Upgrade Required",limitReached:"Limit Reached"},Ae=x.createContext(void 0),dr=({feature:d,count:m=0})=>(d==null?void 0:d.type)==="boolean"?d.value:(d==null?void 0:d.type)==="limit"?m<d.value||d.value===-1:!1,vr=({appId:d,customerApiToken:m,apiUrl:M="https://appapi.heymantle.com/v1",children:w,i18n:j=oe,waitForCustomer:k=!1,loadingComponent:C=null})=>{const p=new sr.MantleClient({appId:d,customerApiToken:m,apiUrl:M}),[o,P]=x.useState(null),[b,h]=x.useState(!0),E=async()=>{try{h(!0);const s=await p.getCustomer();P(s)}catch(s){console.error("[MantleProvider] Error fetching customer: ",s)}finally{h(!1)}},F=async s=>{await p.sendUsageEvent(s)},W=async({usageId:s,period:T})=>await p.getUsageMetricReport({id:s,period:T}),G=async s=>await p.subscribe(s),z=async({cancelReason:s}={})=>await p.cancelSubscription({...s&&{cancelReason:s}}),S=async({returnUrl:s})=>{if(!s)throw new Error("returnUrl is required");return await p.addPaymentMethod({returnUrl:s})},v=async({type:s,config:T})=>{if(!s)throw new Error("type is required");const N=new URL(document.location.toString()).searchParams.get("locale");return await p.createHostedSession({type:s,config:{...N?{locale:N}:{},...T||{}}})};x.useEffect(()=>{m&&E()},[m]);const H=(o==null?void 0:o.plans)||[],X=(o==null?void 0:o.subscription)||null;return k&&b?C||null:fr.jsx(Ae.Provider,{value:{client:p,customer:o,subscription:X,plans:H,loading:b,i18n:{...oe,...j},sendUsageEvent:F,getUsageReport:W,subscribe:G,cancelSubscription:z,addPaymentMethod:S,createHostedSession:v,isFeatureEnabled:({featureKey:s,count:T=0})=>o!=null&&o.features[s]?dr({feature:o.features[s],count:T}):!1,limitForFeature:({featureKey:s})=>o!=null&&o.features[s]&&o.features[s].type==="limit"?o.features[s].value:-1,refetch:async()=>{await E()}},children:w})},pr=()=>{const d=x.useContext(Ae);if(d===void 0)throw new Error("useMantle must be used within a MantleProvider");return d};exports.Labels=oe;exports.MantleProvider=vr;exports.useMantle=pr;
//# sourceMappingURL=index.js.map
