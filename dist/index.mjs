import { jsx as I } from "react/jsx-runtime";
import { MantleClient as j } from "@heymantle/client";
import { createContext as $, useState as y, useEffect as G, useContext as J } from "react";
const re = {
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
}, g = $(void 0), Q = ({
  feature: e,
  count: s = 0
}) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? s < e.value || e.value === -1 : !1, te = ({
  appId: e,
  customerApiToken: s,
  apiUrl: c = "https://appapi.heymantle.com/v1",
  children: l,
  i18n: C = p,
  waitForCustomer: S = !1,
  loadingComponent: P = null,
  throwOnError: i = !1
}) => {
  const o = new j({ appId: e, customerApiToken: s, apiUrl: c }), [a, v] = y(null), [f, h] = y(!0), b = async () => {
    try {
      h(!0);
      const t = await o.getCustomer();
      if (t && "error" in t)
        throw new Error(t.error);
      v(t);
    } catch (t) {
      if (i)
        throw t;
      console.error("[MantleProvider] Error fetching customer: ", t);
    } finally {
      h(!1);
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
  }, A = async ({
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
  }, N = async (t) => {
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
  }, B = async ({
    customerId: t
  } = {}) => {
    const r = await o.getAppInstallations({
      ...t && { customerId: t }
    });
    if ("error" in r && i)
      throw new Error(r.error);
    return r;
  };
  G(() => {
    s && b();
  }, [s]);
  const q = (a == null ? void 0 : a.plans) || [], H = (a == null ? void 0 : a.subscription) || null;
  return S && f ? P || null : /* @__PURE__ */ I(
    g.Provider,
    {
      value: {
        client: o,
        customer: a,
        subscription: H,
        plans: q,
        loading: f,
        i18n: { ...p, ...C },
        sendUsageEvent: E,
        getUsageReport: A,
        subscribe: N,
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
        getAppInstallations: B,
        isFeatureEnabled: ({ featureKey: t, count: r = 0 }) => a != null && a.features[t] ? Q({
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
}, ne = () => {
  const e = J(g);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, w = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, se = (e, s) => Number(w(s)) - Number(w(e)) || e.name.localeCompare(s.name), W = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), oe = (e, s = "USD", c = !0) => {
  let l = W(s).format(e);
  return c && (l = l.replace(/\.00$/, "")), l;
};
var X = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(X || {});
const Z = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, z = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, ie = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: s = !0
}) => s ? z(e) : Z(e), ae = ({
  plan: e,
  customFieldKey: s = "recommended"
}) => {
  var c;
  return !!((c = e.customFields) != null && c[s]);
}, ce = ({
  plan: e,
  customFieldKey: s = "buttonLabel",
  defaultLabel: c = p.subscribe
}) => {
  var l;
  return ((l = e.customFields) == null ? void 0 : l[s]) || c;
}, le = ({
  plan: e
}) => e.discounts && e.discounts.length > 0 ? e.discounts.reduce(
  (s, c) => s.discountedAmount < c.discountedAmount ? s : c
) : void 0, ue = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, de = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  p as Labels,
  te as MantleProvider,
  re as PlanAvailability,
  X as PlanInterval,
  de as columnCount,
  ue as columnSpan,
  ce as customButtonLabel,
  w as featureEnabled,
  se as featureSort,
  le as highestDiscount,
  ie as intervalLabel,
  Z as intervalLabelLong,
  z as intervalLabelShort,
  ae as isRecommendedPlan,
  oe as money,
  ne as useMantle
};
//# sourceMappingURL=index.mjs.map
