import { jsx as Z } from "react/jsx-runtime";
import { MantleClient as z } from "@heymantle/client";
import { createContext as K, useState as g, useEffect as O, useContext as ee } from "react";
const le = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden"
}, m = {
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
}, b = K(void 0), re = ({
  feature: t,
  count: i = 0
}) => (t == null ? void 0 : t.type) === "boolean" ? t.value : (t == null ? void 0 : t.type) === "limit" ? i < t.value || t.value === -1 : !1, ue = ({
  appId: t,
  customerApiToken: i,
  apiUrl: c = "https://appapi.heymantle.com/v1",
  children: l,
  i18n: C = m,
  waitForCustomer: S = !1,
  loadingComponent: A = null,
  throwOnError: s = !1
}) => {
  const n = new z({ appId: t, customerApiToken: i, apiUrl: c }), [a, P] = g(null), [w, p] = g(!0), y = async () => {
    try {
      p(!0);
      const e = await n.getCustomer();
      if (e && "error" in e)
        throw new Error(e.error);
      P(e);
    } catch (e) {
      if (s)
        throw e;
      console.error("[MantleProvider] Error fetching customer: ", e);
    } finally {
      p(!1);
    }
  }, v = async (e) => {
    const r = await n.sendUsageEvent(e);
    if ("error" in r) {
      if (s)
        throw new Error(r.error);
      return {
        success: !1
      };
    }
    return r;
  }, N = async ({
    usageId: e,
    period: r
  }) => {
    const o = await n.getUsageMetricReport({
      id: e,
      period: r
    });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, E = async (e) => {
    const r = await n.subscribe(e);
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, R = async ({
    cancelReason: e
  } = {}) => {
    const r = await n.cancelSubscription({
      ...e && { cancelReason: e }
    });
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, M = async ({
    amount: e,
    name: r,
    currencyCode: o,
    returnUrl: u,
    test: f
  }) => {
    const d = await n.createOneTimeCharge({
      amount: e,
      name: r,
      currencyCode: o,
      returnUrl: u,
      test: f
    });
    if ("error" in d && s)
      throw new Error(d.error);
    return d;
  }, x = async ({
    returnUrl: e,
    updateExistingPaymentMethods: r
  }) => {
    if (!e)
      throw new Error("returnUrl is required");
    const o = await n.addPaymentMethod({
      returnUrl: e,
      updateExistingPaymentMethods: r
    });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, Y = async ({
    type: e,
    config: r
  }) => {
    if (!e)
      throw new Error("type is required");
    const u = new URL(document.location.toString()).searchParams.get("locale"), f = await n.createHostedSession({
      type: e,
      config: {
        ...u ? { locale: u } : {},
        ...r || {}
      }
    });
    if ("error" in f && s)
      throw new Error(f.error);
    return f;
  }, U = async (e) => {
    const r = await n.listNotifications(e);
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, k = async ({
    id: e
  }) => {
    const r = await n.triggerNotificationCta({ id: e });
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, D = async ({ id: e, type: r }) => {
    const o = await n.trackNotificationCta({ id: e, type: r });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, L = async ({
    id: e,
    readAt: r,
    dismissedAt: o
  }) => {
    const u = await n.updateNotification({
      id: e,
      readAt: r,
      dismissedAt: o
    });
    if ("error" in u && s)
      throw new Error(u.error);
    return u;
  }, _ = async (e) => {
    const r = await n.getChecklist(e);
    if (r && "error" in r && s)
      throw new Error(r.error);
    return r;
  }, F = async (e) => {
    const r = await n.getChecklists(e);
    if (r && "error" in r && s)
      throw new Error(r.error);
    return r;
  }, q = async ({ idOrHandle: e }) => {
    const r = await n.showChecklist({ idOrHandle: e });
    if (r && "error" in r && s)
      throw new Error(r.error);
    return r;
  }, T = async ({
    idOrHandle: e,
    stepIdOrHandle: r
  }) => {
    const o = await n.skipChecklistStep({
      idOrHandle: e,
      stepIdOrHandle: r
    });
    if (o && "error" in o && s)
      throw new Error(o.error);
    return o;
  }, V = async ({
    idOrHandle: e,
    stepIdOrHandle: r
  }) => {
    const o = await n.completeChecklistStep({
      idOrHandle: e,
      stepIdOrHandle: r
    });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, B = async ({
    customerId: e
  } = {}) => {
    const r = await n.getAppInstallations({
      ...e && { customerId: e }
    });
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, H = async () => {
    const e = await n.getAffiliateProgram();
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, I = async () => {
    const e = await n.getAffiliate();
    if (e && "error" in e && s)
      throw new Error(e.error);
    return e;
  }, j = async (e) => {
    const r = await n.enrollAffiliate(e);
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, $ = async (e) => {
    const r = await n.submitReferralRequest(e);
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, G = async (e) => {
    const r = await n.getAffiliateReferrals(e);
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, J = async (e) => {
    const r = await n.getAffiliateReferralRequests(e);
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, Q = async () => {
    const e = await n.getAffiliateMetrics();
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  };
  O(() => {
    i && y();
  }, [i]);
  const W = (a == null ? void 0 : a.plans) || [], X = (a == null ? void 0 : a.subscription) || null;
  return S && w ? A || null : /* @__PURE__ */ Z(
    b.Provider,
    {
      value: {
        client: n,
        customer: a,
        subscription: X,
        plans: W,
        loading: w,
        i18n: { ...m, ...C },
        sendUsageEvent: v,
        getUsageReport: N,
        subscribe: E,
        cancelSubscription: R,
        createOneTimeCharge: M,
        addPaymentMethod: x,
        createHostedSession: Y,
        listNotifications: U,
        triggerNotificationCta: k,
        trackNotificationCta: D,
        updateNotification: L,
        getChecklist: _,
        getChecklists: F,
        completeChecklistStep: V,
        showChecklist: q,
        skipChecklistStep: T,
        getAppInstallations: B,
        getAffiliateProgram: H,
        getAffiliate: I,
        enrollAffiliate: j,
        submitReferralRequest: $,
        getAffiliateReferrals: G,
        getAffiliateReferralRequests: J,
        getAffiliateMetrics: Q,
        isFeatureEnabled: ({ featureKey: e, count: r = 0 }) => a != null && a.features[e] ? re({
          feature: a.features[e],
          count: r
        }) : !1,
        limitForFeature: ({ featureKey: e }) => a != null && a.features[e] && a.features[e].type === "limit" ? a.features[e].value : -1,
        refetch: async () => {
          await y();
        }
      },
      children: l
    }
  );
}, fe = () => {
  const t = ee(b);
  if (t === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return t;
}, h = (t) => t.type === "boolean" && t.value === !0 || t.type === "limit" && t.value !== 0, de = (t, i) => Number(h(i)) - Number(h(t)) || t.name.localeCompare(i.name), te = (t = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  notation: "standard"
}), me = (t, i = "USD", c = !0) => {
  let l = te(i).format(t);
  return c && (l = l.replace(/\.00$/, "")), l;
};
var ne = /* @__PURE__ */ ((t) => (t.Annual = "ANNUAL", t.Every30Days = "EVERY_30_DAYS", t))(ne || {});
const se = (t = "EVERY_30_DAYS") => {
  switch (t) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, oe = (t = "EVERY_30_DAYS") => {
  switch (t) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, we = ({
  interval: t = "EVERY_30_DAYS",
  useShortFormPlanIntervals: i = !0
}) => i ? oe(t) : se(t), pe = ({
  plan: t,
  customFieldKey: i = "recommended"
}) => {
  var c;
  return !!((c = t.customFields) != null && c[i]);
}, ye = ({
  plan: t,
  customFieldKey: i = "buttonLabel",
  defaultLabel: c = m.subscribe
}) => {
  var l;
  return ((l = t.customFields) == null ? void 0 : l[i]) || c;
}, ge = ({
  plan: t
}) => t.discounts && t.discounts.length > 0 ? t.discounts.reduce(
  (i, c) => i.discountedAmount < c.discountedAmount ? i : c
) : void 0, he = (t = 4) => t % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : t % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : t % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : t === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, be = (t = 4) => t % 4 === 0 ? 4 : t % 3 === 0 ? 3 : t % 2 === 0 ? 2 : t === 1 ? 1 : 4;
export {
  m as Labels,
  ue as MantleProvider,
  le as PlanAvailability,
  ne as PlanInterval,
  be as columnCount,
  he as columnSpan,
  ye as customButtonLabel,
  h as featureEnabled,
  de as featureSort,
  ge as highestDiscount,
  we as intervalLabel,
  se as intervalLabelLong,
  oe as intervalLabelShort,
  pe as isRecommendedPlan,
  me as money,
  fe as useMantle
};
//# sourceMappingURL=index.mjs.map
