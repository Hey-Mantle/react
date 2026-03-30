import { jsx as z } from "react/jsx-runtime";
import { MantleClient as K } from "@heymantle/client";
import { createContext as O, useState as y, useEffect as ee, useContext as re } from "react";
const ue = {
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
}, b = O(void 0), te = ({
  feature: t,
  count: i = 0
}) => (t == null ? void 0 : t.type) === "boolean" ? t.value : (t == null ? void 0 : t.type) === "limit" ? i < t.value || t.value === -1 : !1, fe = ({
  appId: t,
  customerApiToken: i,
  apiUrl: c = "https://appapi.heymantle.com/v1",
  children: l,
  i18n: C = m,
  waitForCustomer: S = !1,
  loadingComponent: A = null,
  throwOnError: s = !1
}) => {
  const n = new K({ appId: t, customerApiToken: i, apiUrl: c }), [a, P] = y(null), [w, p] = y(!0), g = async () => {
    try {
      p(!0);
      const r = await n.getCustomer();
      if (r && "error" in r)
        throw new Error(r.error);
      P(r);
    } catch (r) {
      if (s)
        throw r;
      console.error("[MantleProvider] Error fetching customer: ", r);
    } finally {
      p(!1);
    }
  }, v = async (r) => {
    const e = await n.sendUsageEvent(r);
    if ("error" in e) {
      if (s)
        throw new Error(e.error);
      return {
        success: !1
      };
    }
    return e;
  }, N = async ({
    usageId: r,
    period: e
  }) => {
    const o = await n.getUsageMetricReport({
      id: r,
      period: e
    });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, E = async (r) => {
    const e = await n.subscribe(r);
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, R = async ({
    cancelReason: r
  } = {}) => {
    const e = await n.cancelSubscription({
      ...r && { cancelReason: r }
    });
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, M = async ({
    amount: r,
    name: e,
    currencyCode: o,
    returnUrl: u,
    test: f
  }) => {
    const d = await n.createOneTimeCharge({
      amount: r,
      name: e,
      currencyCode: o,
      returnUrl: u,
      test: f
    });
    if ("error" in d && s)
      throw new Error(d.error);
    return d;
  }, x = async ({
    returnUrl: r,
    updateExistingPaymentMethods: e
  }) => {
    if (!r)
      throw new Error("returnUrl is required");
    const o = await n.addPaymentMethod({
      returnUrl: r,
      updateExistingPaymentMethods: e
    });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, U = async ({
    type: r,
    config: e
  }) => {
    if (!r)
      throw new Error("type is required");
    const u = new URL(document.location.toString()).searchParams.get("locale"), f = await n.createHostedSession({
      type: r,
      config: {
        ...u ? { locale: u } : {},
        ...e || {}
      }
    });
    if ("error" in f && s)
      throw new Error(f.error);
    return f;
  }, Y = async (r) => {
    const e = await n.listNotifications(r);
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, k = async ({
    id: r
  }) => {
    const e = await n.triggerNotificationCta({ id: r });
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, D = async ({ id: r, type: e }) => {
    const o = await n.trackNotificationCta({ id: r, type: e });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, L = async ({
    id: r,
    readAt: e,
    dismissedAt: o
  }) => {
    const u = await n.updateNotification({
      id: r,
      readAt: e,
      dismissedAt: o
    });
    if ("error" in u && s)
      throw new Error(u.error);
    return u;
  }, _ = async (r) => {
    const e = await n.getChecklist(r);
    if (e && "error" in e && s)
      throw new Error(e.error);
    return e;
  }, F = async (r) => {
    const e = await n.getChecklists(r);
    if (e && "error" in e && s)
      throw new Error(e.error);
    return e;
  }, q = async ({ idOrHandle: r }) => {
    const e = await n.showChecklist({ idOrHandle: r });
    if (e && "error" in e && s)
      throw new Error(e.error);
    return e;
  }, T = async ({
    idOrHandle: r,
    stepIdOrHandle: e
  }) => {
    const o = await n.skipChecklistStep({
      idOrHandle: r,
      stepIdOrHandle: e
    });
    if (o && "error" in o && s)
      throw new Error(o.error);
    return o;
  }, V = async ({
    idOrHandle: r,
    stepIdOrHandle: e
  }) => {
    const o = await n.completeChecklistStep({
      idOrHandle: r,
      stepIdOrHandle: e
    });
    if ("error" in o && s)
      throw new Error(o.error);
    return o;
  }, B = async ({ invoiceId: r }) => {
    const e = await n.getInvoiceUrl(r);
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, I = async ({
    customerId: r
  } = {}) => {
    const e = await n.getAppInstallations({
      ...r && { customerId: r }
    });
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, H = async () => {
    const r = await n.getAffiliateProgram();
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  }, j = async () => {
    const r = await n.getAffiliate();
    if (r && "error" in r && s)
      throw new Error(r.error);
    return r;
  }, $ = async (r) => {
    const e = await n.enrollAffiliate(r);
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, G = async (r) => {
    const e = await n.submitReferralRequest(r);
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, J = async (r) => {
    const e = await n.getAffiliateReferrals(r);
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, Q = async (r) => {
    const e = await n.getAffiliateReferralRequests(r);
    if ("error" in e && s)
      throw new Error(e.error);
    return e;
  }, W = async () => {
    const r = await n.getAffiliateMetrics();
    if ("error" in r && s)
      throw new Error(r.error);
    return r;
  };
  ee(() => {
    i && g();
  }, [i]);
  const X = (a == null ? void 0 : a.plans) || [], Z = (a == null ? void 0 : a.subscription) || null;
  return S && w ? A || null : /* @__PURE__ */ z(
    b.Provider,
    {
      value: {
        client: n,
        customer: a,
        subscription: Z,
        plans: X,
        loading: w,
        i18n: { ...m, ...C },
        sendUsageEvent: v,
        getUsageReport: N,
        subscribe: E,
        cancelSubscription: R,
        createOneTimeCharge: M,
        addPaymentMethod: x,
        createHostedSession: U,
        listNotifications: Y,
        triggerNotificationCta: k,
        trackNotificationCta: D,
        updateNotification: L,
        getChecklist: _,
        getChecklists: F,
        completeChecklistStep: V,
        showChecklist: q,
        skipChecklistStep: T,
        getInvoiceUrl: B,
        getAppInstallations: I,
        getAffiliateProgram: H,
        getAffiliate: j,
        enrollAffiliate: $,
        submitReferralRequest: G,
        getAffiliateReferrals: J,
        getAffiliateReferralRequests: Q,
        getAffiliateMetrics: W,
        isFeatureEnabled: ({ featureKey: r, count: e = 0 }) => a != null && a.features[r] ? te({
          feature: a.features[r],
          count: e
        }) : !1,
        limitForFeature: ({ featureKey: r }) => a != null && a.features[r] && a.features[r].type === "limit" ? a.features[r].value : -1,
        refetch: async () => {
          await g();
        }
      },
      children: l
    }
  );
}, de = () => {
  const t = re(b);
  if (t === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return t;
}, h = (t) => t.type === "boolean" && t.value === !0 || t.type === "limit" && t.value !== 0, me = (t, i) => Number(h(i)) - Number(h(t)) || t.name.localeCompare(i.name), ne = (t = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  notation: "standard"
}), we = (t, i = "USD", c = !0) => {
  let l = ne(i).format(t);
  return c && (l = l.replace(/\.00$/, "")), l;
};
var se = /* @__PURE__ */ ((t) => (t.Annual = "ANNUAL", t.Every30Days = "EVERY_30_DAYS", t))(se || {});
const oe = (t = "EVERY_30_DAYS") => {
  switch (t) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, ie = (t = "EVERY_30_DAYS") => {
  switch (t) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, pe = ({
  interval: t = "EVERY_30_DAYS",
  useShortFormPlanIntervals: i = !0
}) => i ? ie(t) : oe(t), ge = ({
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
}, he = ({
  plan: t
}) => t.discounts && t.discounts.length > 0 ? t.discounts.reduce(
  (i, c) => i.discountedAmount < c.discountedAmount ? i : c
) : void 0, be = (t = 4) => t % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : t % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : t % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : t === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, Ce = (t = 4) => t % 4 === 0 ? 4 : t % 3 === 0 ? 3 : t % 2 === 0 ? 2 : t === 1 ? 1 : 4;
export {
  m as Labels,
  fe as MantleProvider,
  ue as PlanAvailability,
  se as PlanInterval,
  Ce as columnCount,
  be as columnSpan,
  ye as customButtonLabel,
  h as featureEnabled,
  me as featureSort,
  he as highestDiscount,
  pe as intervalLabel,
  oe as intervalLabelLong,
  ie as intervalLabelShort,
  ge as isRecommendedPlan,
  we as money,
  de as useMantle
};
//# sourceMappingURL=index.mjs.map
