import { jsx as _ } from "react/jsx-runtime";
import { MantleClient as F } from "@heymantle/client";
import { createContext as V, useState as b, useEffect as k, useContext as B } from "react";
const O = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden"
}, c = {
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
}, h = V(void 0), q = ({
  feature: e,
  count: n = 0
}) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? n < e.value || e.value === -1 : !1, Q = ({
  appId: e,
  customerApiToken: n,
  apiUrl: s = "https://appapi.heymantle.com/v1",
  children: i,
  i18n: g = c,
  waitForCustomer: S = !1,
  loadingComponent: f = null
}) => {
  const a = new F({ appId: e, customerApiToken: n, apiUrl: s }), [r, C] = b(null), [l, u] = b(!0), d = async () => {
    try {
      u(!0);
      const t = await a.getCustomer();
      C(t);
    } catch (t) {
      console.error("[MantleProvider] Error fetching customer: ", t);
    } finally {
      u(!1);
    }
  }, P = async (t) => {
    await a.sendUsageEvent(t);
  }, w = async ({
    usageId: t,
    period: o
  }) => await a.getUsageMetricReport({ id: t, period: o }), v = async (t) => await a.subscribe(t), E = async ({
    cancelReason: t
  } = {}) => await a.cancelSubscription({
    ...t && { cancelReason: t }
  }), N = async ({ returnUrl: t }) => {
    if (!t)
      throw new Error("returnUrl is required");
    return await a.addPaymentMethod({ returnUrl: t });
  }, A = async ({
    type: t,
    config: o
  }) => {
    if (!t)
      throw new Error("type is required");
    const p = new URL(document.location.toString()).searchParams.get("locale");
    return await a.createHostedSession({
      type: t,
      config: {
        ...p ? { locale: p } : {},
        ...o || {}
      }
    });
  }, M = async (t) => await a.listNotifications(t), x = async ({
    id: t
  }) => await a.triggerNotificationCta({ id: t }), Y = async ({
    id: t,
    readAt: o,
    dismissedAt: m
  }) => await a.updateNotification({ id: t, readAt: o, dismissedAt: m }), U = async () => await a.getChecklist(), D = async ({
    checklistId: t,
    checklistStepId: o
  }) => await a.completeChecklistStep({ checklistId: t, checklistStepId: o });
  k(() => {
    n && d();
  }, [n]);
  const L = (r == null ? void 0 : r.plans) || [], R = (r == null ? void 0 : r.subscription) || null;
  return S && l ? f || null : /* @__PURE__ */ _(
    h.Provider,
    {
      value: {
        client: a,
        customer: r,
        subscription: R,
        plans: L,
        loading: l,
        i18n: { ...c, ...g },
        sendUsageEvent: P,
        getUsageReport: w,
        subscribe: v,
        cancelSubscription: E,
        addPaymentMethod: N,
        createHostedSession: A,
        listNotifications: M,
        triggerNotificationCta: x,
        updateNotification: Y,
        getChecklist: U,
        completeChecklistStep: D,
        isFeatureEnabled: ({ featureKey: t, count: o = 0 }) => r != null && r.features[t] ? q({
          feature: r.features[t],
          count: o
        }) : !1,
        limitForFeature: ({ featureKey: t }) => r != null && r.features[t] && r.features[t].type === "limit" ? r.features[t].value : -1,
        refetch: async () => {
          await d();
        }
      },
      children: i
    }
  );
}, W = () => {
  const e = B(h);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, y = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, X = (e, n) => Number(y(n)) - Number(y(e)) || e.name.localeCompare(n.name), T = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), Z = (e, n = "USD", s = !0) => {
  let i = T(n).format(e);
  return s && (i = i.replace(/\.00$/, "")), i;
};
var H = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(H || {});
const j = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, I = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, z = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: n = !0
}) => n ? I(e) : j(e), K = ({
  plan: e,
  customFieldKey: n = "recommended"
}) => {
  var s;
  return !!((s = e.customFields) != null && s[n]);
}, ee = ({
  plan: e,
  customFieldKey: n = "buttonLabel"
}) => {
  var s;
  return ((s = e.customFields) == null ? void 0 : s[n]) || c.subscribe;
}, te = ({ plan: e }) => {
  var n;
  return ((n = e.discounts) == null ? void 0 : n.length) > 0 ? e.discounts.reduce(
    (s, i) => s.discountedAmount < i.discountedAmount ? s : i
  ) : void 0;
}, ne = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, re = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  c as Labels,
  Q as MantleProvider,
  O as PlanAvailability,
  H as PlanInterval,
  re as columnCount,
  ne as columnSpan,
  ee as customButtonLabel,
  y as featureEnabled,
  X as featureSort,
  te as highestDiscount,
  z as intervalLabel,
  j as intervalLabelLong,
  I as intervalLabelShort,
  K as isRecommendedPlan,
  Z as money,
  W as useMantle
};
//# sourceMappingURL=index.mjs.map
