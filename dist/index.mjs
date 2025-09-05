import { jsx as q } from "react/jsx-runtime";
import { MantleClient as T } from "@heymantle/client";
import { createContext as H, useState as b, useEffect as j, useContext as I } from "react";
const K = {
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
}, w = H(void 0), $ = ({ feature: e, count: n = 0 }) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? n < e.value || e.value === -1 : !1, O = ({
  appId: e,
  customerApiToken: n,
  apiUrl: c = "https://appapi.heymantle.com/v1",
  children: l,
  i18n: g = m,
  waitForCustomer: S = !1,
  loadingComponent: C = null,
  throwOnError: a = !1
}) => {
  const o = new T({ appId: e, customerApiToken: n, apiUrl: c }), [i, P] = b(null), [p, f] = b(!0), h = async () => {
    try {
      f(!0);
      const r = await o.getCustomer();
      if (r && "error" in r)
        throw new Error(r.error);
      P(r);
    } catch (r) {
      if (a)
        throw r;
      console.error("[MantleProvider] Error fetching customer: ", r);
    } finally {
      f(!1);
    }
  }, v = async (r) => {
    const t = await o.sendUsageEvent(r);
    if ("error" in t) {
      if (a)
        throw new Error(t.error);
      return {
        success: !1
      };
    }
    return t;
  }, E = async ({ usageId: r, period: t }) => {
    const s = await o.getUsageMetricReport({
      id: r,
      period: t
    });
    if ("error" in s && a)
      throw new Error(s.error);
    return s;
  }, N = async (r) => {
    const t = await o.subscribe(r);
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, A = async ({ cancelReason: r } = {}) => {
    const t = await o.cancelSubscription({
      ...r && { cancelReason: r }
    });
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, M = async ({
    returnUrl: r,
    updateExistingPaymentMethods: t
  }) => {
    if (!r)
      throw new Error("returnUrl is required");
    const s = await o.addPaymentMethod({ returnUrl: r, updateExistingPaymentMethods: t });
    if ("error" in s && a)
      throw new Error(s.error);
    return s;
  }, x = async ({ type: r, config: t }) => {
    if (!r)
      throw new Error("type is required");
    const u = new URL(document.location.toString()).searchParams.get("locale"), d = await o.createHostedSession({
      type: r,
      config: {
        ...u ? { locale: u } : {},
        ...t || {}
      }
    });
    if ("error" in d && a)
      throw new Error(d.error);
    return d;
  }, Y = async (r) => {
    const t = await o.listNotifications(r);
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, U = async ({ id: r }) => {
    const t = await o.triggerNotificationCta({ id: r });
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, D = async ({ id: r, readAt: t, dismissedAt: s }) => {
    const u = await o.updateNotification({
      id: r,
      readAt: t,
      dismissedAt: s
    });
    if ("error" in u && a)
      throw new Error(u.error);
    return u;
  }, L = async () => {
    const r = await o.getChecklist();
    if (r && "error" in r && a)
      throw new Error(r.error);
    return r;
  }, R = async (r) => {
    const t = await o.getChecklists(r);
    if (t && "error" in t && a)
      throw new Error(t.error);
    return t;
  }, k = async ({ checklistId: r }) => {
    const t = await o.showChecklist({ checklistId: r });
    if (t && "error" in t && a)
      throw new Error(t.error);
    return t;
  }, _ = async ({ checklistId: r, checklistStepId: t }) => {
    const s = await o.skipChecklistStep({
      checklistId: r,
      checklistStepId: t
    });
    if (s && "error" in s && a)
      throw new Error(s.error);
    return s;
  }, F = async ({
    checklistId: r,
    checklistStepId: t
  }) => {
    const s = await o.completeChecklistStep({
      checklistId: r,
      checklistStepId: t
    });
    if ("error" in s && a)
      throw new Error(s.error);
    return s;
  };
  j(() => {
    n && h();
  }, [n]);
  const V = (i == null ? void 0 : i.plans) || [], B = (i == null ? void 0 : i.subscription) || null;
  return S && p ? C || null : /* @__PURE__ */ q(
    w.Provider,
    {
      value: {
        client: o,
        customer: i,
        subscription: B,
        plans: V,
        loading: p,
        i18n: { ...m, ...g },
        sendUsageEvent: v,
        getUsageReport: E,
        subscribe: N,
        cancelSubscription: A,
        addPaymentMethod: M,
        createHostedSession: x,
        listNotifications: Y,
        triggerNotificationCta: U,
        updateNotification: D,
        getChecklist: L,
        getChecklists: R,
        completeChecklistStep: F,
        showChecklist: k,
        skipChecklistStep: _,
        isFeatureEnabled: ({ featureKey: r, count: t = 0 }) => i != null && i.features[r] ? $({
          feature: i.features[r],
          count: t
        }) : !1,
        limitForFeature: ({ featureKey: r }) => i != null && i.features[r] && i.features[r].type === "limit" ? i.features[r].value : -1,
        refetch: async () => {
          await h();
        }
      },
      children: l
    }
  );
}, ee = () => {
  const e = I(w);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, y = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, re = (e, n) => Number(y(n)) - Number(y(e)) || e.name.localeCompare(n.name), G = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), te = (e, n = "USD", c = !0) => {
  let l = G(n).format(e);
  return c && (l = l.replace(/\.00$/, "")), l;
};
var J = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(J || {});
const Q = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, W = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, ne = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: n = !0
}) => n ? W(e) : Q(e), se = ({
  plan: e,
  customFieldKey: n = "recommended"
}) => {
  var c;
  return !!((c = e.customFields) != null && c[n]);
}, oe = ({
  plan: e,
  customFieldKey: n = "buttonLabel"
}) => {
  var c;
  return ((c = e.customFields) == null ? void 0 : c[n]) || m.subscribe;
}, ie = ({ plan: e }) => {
  var n;
  return ((n = e.discounts) == null ? void 0 : n.length) > 0 ? e.discounts.reduce(
    (c, l) => c.discountedAmount < l.discountedAmount ? c : l
  ) : void 0;
}, ae = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, ce = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  m as Labels,
  O as MantleProvider,
  K as PlanAvailability,
  J as PlanInterval,
  ce as columnCount,
  ae as columnSpan,
  oe as customButtonLabel,
  y as featureEnabled,
  re as featureSort,
  ie as highestDiscount,
  ne as intervalLabel,
  Q as intervalLabelLong,
  W as intervalLabelShort,
  se as isRecommendedPlan,
  te as money,
  ee as useMantle
};
//# sourceMappingURL=index.mjs.map
