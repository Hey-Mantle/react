import { jsx as H } from "react/jsx-runtime";
import { MantleClient as j } from "@heymantle/client";
import { createContext as I, useState as y, useEffect as $, useContext as G } from "react";
const ee = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden"
}, p = {
  AmountPerInterval: "{{ amount }} per {{ interval }}",
  Back: "Back",
  Cancel: "Cancel",
  CancelConfirmation: "Are you sure you want to cancel your subscription?",
  CancelPlan: "Cancel plan",
  ChangePlan: "Change plan",
  CurrentPlan: "Current plan",
  CustomPlans: "Custom plans",
  CustomPlansDescription: "Plans tailored to your specific needs",
  DiscountAmount: "{{ amount }} discount",
  DiscountAmountExpired: "{{ amount }} discount expired",
  FreeTrialLength: "{{ trialDays }}-day free trial",
  Features: "Features",
  Month: "month",
  MonthShort: "mo",
  Monthly: "Monthly",
  NextBillingDate: "Next billing date",
  NotSubscribed: "You're not subscribed to a plan yet.",
  Year: "year",
  YearShort: "yr",
  Yearly: "Yearly",
  MostPopular: "Most popular",
  Per: "/",
  Plans: "Plans",
  Price: "Price",
  SelectPlan: "Select plan",
  SubscribeSuccessTitle: "Subscription successful",
  SubscribeSuccessBody: "Thanks for subscribing to our app!",
  Subscription: "Subscription",
  SubscriptionCancelled: "Subscription cancelled",
  UsageCharges: "Usage charges",
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
}, g = I(void 0), J = ({
  feature: e,
  count: s = 0
}) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? s < e.value || e.value === -1 : !1, re = ({
  appId: e,
  customerApiToken: s,
  apiUrl: c = "https://appapi.heymantle.com/v1",
  children: l,
  i18n: C = p,
  waitForCustomer: S = !1,
  loadingComponent: P = null,
  throwOnError: i = !1
}) => {
  const o = new j({ appId: e, customerApiToken: s, apiUrl: c }), [a, v] = y(null), [h, f] = y(!0), b = async () => {
    try {
      f(!0);
      const t = await o.getCustomer();
      if (t && "error" in t)
        throw new Error(t.error);
      v(t);
    } catch (t) {
      if (i)
        throw t;
      console.error("[MantleProvider] Error fetching customer: ", t);
    } finally {
      f(!1);
    }
  }, E = async (t) => {
    const r = await o.sendUsageEvent(t);
    if ("error" in r) {
      if (i)
        throw new Error(r.error);
      return {
        success: !1
      };
    }
    return r;
  }, N = async ({
    usageId: t,
    period: r
  }) => {
    const n = await o.getUsageMetricReport({
      id: t,
      period: r
    });
    if ("error" in n && i)
      throw new Error(n.error);
    return n;
  }, A = async (t) => {
    const r = await o.subscribe(t);
    if ("error" in r && i)
      throw new Error(r.error);
    return r;
  }, M = async ({
    cancelReason: t
  } = {}) => {
    const r = await o.cancelSubscription({
      ...t && { cancelReason: t }
    });
    if ("error" in r && i)
      throw new Error(r.error);
    return r;
  }, x = async ({
    amount: t,
    name: r,
    currencyCode: n,
    returnUrl: u,
    test: d
  }) => {
    const m = await o.createOneTimeCharge({
      amount: t,
      name: r,
      currencyCode: n,
      returnUrl: u,
      test: d
    });
    if ("error" in m && i)
      throw new Error(m.error);
    return m;
  }, Y = async ({
    returnUrl: t,
    updateExistingPaymentMethods: r
  }) => {
    if (!t)
      throw new Error("returnUrl is required");
    const n = await o.addPaymentMethod({
      returnUrl: t,
      updateExistingPaymentMethods: r
    });
    if ("error" in n && i)
      throw new Error(n.error);
    return n;
  }, U = async ({
    type: t,
    config: r
  }) => {
    if (!t)
      throw new Error("type is required");
    const u = new URL(document.location.toString()).searchParams.get("locale"), d = await o.createHostedSession({
      type: t,
      config: {
        ...u ? { locale: u } : {},
        ...r || {}
      }
    });
    if ("error" in d && i)
      throw new Error(d.error);
    return d;
  }, D = async (t) => {
    const r = await o.listNotifications(t);
    if ("error" in r && i)
      throw new Error(r.error);
    return r;
  }, L = async ({
    id: t
  }) => {
    const r = await o.triggerNotificationCta({ id: t });
    if ("error" in r && i)
      throw new Error(r.error);
    return r;
  }, R = async ({
    id: t,
    readAt: r,
    dismissedAt: n
  }) => {
    const u = await o.updateNotification({
      id: t,
      readAt: r,
      dismissedAt: n
    });
    if ("error" in u && i)
      throw new Error(u.error);
    return u;
  }, k = async (t) => {
    const r = await o.getChecklist(t);
    if (r && "error" in r && i)
      throw new Error(r.error);
    return r;
  }, _ = async (t) => {
    const r = await o.getChecklists(t);
    if (r && "error" in r && i)
      throw new Error(r.error);
    return r;
  }, F = async ({ idOrHandle: t }) => {
    const r = await o.showChecklist({ idOrHandle: t });
    if (r && "error" in r && i)
      throw new Error(r.error);
    return r;
  }, T = async ({
    idOrHandle: t,
    stepIdOrHandle: r
  }) => {
    const n = await o.skipChecklistStep({
      idOrHandle: t,
      stepIdOrHandle: r
    });
    if (n && "error" in n && i)
      throw new Error(n.error);
    return n;
  }, V = async ({
    idOrHandle: t,
    stepIdOrHandle: r
  }) => {
    const n = await o.completeChecklistStep({
      idOrHandle: t,
      stepIdOrHandle: r
    });
    if ("error" in n && i)
      throw new Error(n.error);
    return n;
  };
  $(() => {
    s && b();
  }, [s]);
  const B = (a == null ? void 0 : a.plans) || [], q = (a == null ? void 0 : a.subscription) || null;
  return S && h ? P || null : /* @__PURE__ */ H(
    g.Provider,
    {
      value: {
        client: o,
        customer: a,
        subscription: q,
        plans: B,
        loading: h,
        i18n: { ...p, ...C },
        sendUsageEvent: E,
        getUsageReport: N,
        subscribe: A,
        cancelSubscription: M,
        createOneTimeCharge: x,
        addPaymentMethod: Y,
        createHostedSession: U,
        listNotifications: D,
        triggerNotificationCta: L,
        updateNotification: R,
        getChecklist: k,
        getChecklists: _,
        completeChecklistStep: V,
        showChecklist: F,
        skipChecklistStep: T,
        isFeatureEnabled: ({ featureKey: t, count: r = 0 }) => a != null && a.features[t] ? J({
          feature: a.features[t],
          count: r
        }) : !1,
        limitForFeature: ({ featureKey: t }) => a != null && a.features[t] && a.features[t].type === "limit" ? a.features[t].value : -1,
        refetch: async () => {
          await b();
        }
      },
      children: l
    }
  );
}, te = () => {
  const e = G(g);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, w = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, ne = (e, s) => Number(w(s)) - Number(w(e)) || e.name.localeCompare(s.name), Q = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), se = (e, s = "USD", c = !0) => {
  let l = Q(s).format(e);
  return c && (l = l.replace(/\.00$/, "")), l;
};
var W = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(W || {});
const X = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, Z = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, oe = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: s = !0
}) => s ? Z(e) : X(e), ie = ({
  plan: e,
  customFieldKey: s = "recommended"
}) => {
  var c;
  return !!((c = e.customFields) != null && c[s]);
}, ae = ({
  plan: e,
  customFieldKey: s = "buttonLabel"
}) => {
  var c;
  return ((c = e.customFields) == null ? void 0 : c[s]) || p.subscribe;
}, ce = ({ plan: e }) => {
  var s;
  return ((s = e.discounts) == null ? void 0 : s.length) > 0 ? e.discounts.reduce(
    (c, l) => c.discountedAmount < l.discountedAmount ? c : l
  ) : void 0;
}, le = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, ue = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  p as Labels,
  re as MantleProvider,
  ee as PlanAvailability,
  W as PlanInterval,
  ue as columnCount,
  le as columnSpan,
  ae as customButtonLabel,
  w as featureEnabled,
  ne as featureSort,
  ce as highestDiscount,
  oe as intervalLabel,
  X as intervalLabelLong,
  Z as intervalLabelShort,
  ie as isRecommendedPlan,
  se as money,
  te as useMantle
};
//# sourceMappingURL=index.mjs.map
