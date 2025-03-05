import { jsx as N } from "react/jsx-runtime";
import { MantleClient as Y } from "@heymantle/client";
import { createContext as U, useState as b, useEffect as D, useContext as L } from "react";
const k = {
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
}, y = U(void 0), R = ({ feature: e, count: n = 0 }) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? n < e.value || e.value === -1 : !1, I = ({
  appId: e,
  customerApiToken: n,
  apiUrl: a = "https://appapi.heymantle.com/v1",
  children: s,
  i18n: h = c,
  waitForCustomer: g = !1,
  loadingComponent: S = null
}) => {
  const o = new Y({ appId: e, customerApiToken: n, apiUrl: a }), [r, f] = b(null), [l, u] = b(!0), d = async () => {
    try {
      u(!0);
      const t = await o.getCustomer();
      f(t);
    } catch (t) {
      console.error("[MantleProvider] Error fetching customer: ", t);
    } finally {
      u(!1);
    }
  }, P = async (t) => {
    await o.sendUsageEvent(t);
  }, C = async ({ usageId: t, period: i }) => await o.getUsageMetricReport({ id: t, period: i }), v = async (t) => await o.subscribe(t), w = async ({ cancelReason: t } = {}) => await o.cancelSubscription({
    ...t && { cancelReason: t }
  }), E = async ({ returnUrl: t }) => {
    if (!t)
      throw new Error("returnUrl is required");
    return await o.addPaymentMethod({ returnUrl: t });
  }, A = async ({ type: t, config: i }) => {
    if (!t)
      throw new Error("type is required");
    const m = new URL(document.location.toString()).searchParams.get("locale");
    return await o.createHostedSession({
      type: t,
      config: {
        ...m ? { locale: m } : {},
        ...i || {}
      }
    });
  };
  D(() => {
    n && d();
  }, [n]);
  const M = (r == null ? void 0 : r.plans) || [], x = (r == null ? void 0 : r.subscription) || null;
  return g && l ? S || null : /* @__PURE__ */ N(
    y.Provider,
    {
      value: {
        client: o,
        customer: r,
        subscription: x,
        plans: M,
        loading: l,
        i18n: { ...c, ...h },
        sendUsageEvent: P,
        getUsageReport: C,
        subscribe: v,
        cancelSubscription: w,
        addPaymentMethod: E,
        createHostedSession: A,
        isFeatureEnabled: ({ featureKey: t, count: i = 0 }) => r != null && r.features[t] ? R({
          feature: r.features[t],
          count: i
        }) : !1,
        limitForFeature: ({ featureKey: t }) => r != null && r.features[t] && r.features[t].type === "limit" ? r.features[t].value : -1,
        refetch: async () => {
          await d();
        }
      },
      children: s
    }
  );
}, $ = () => {
  const e = L(y);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, p = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, G = (e, n) => Number(p(n)) - Number(p(e)) || e.name.localeCompare(n.name), _ = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), J = (e, n = "USD", a = !0) => {
  let s = _(n).format(e);
  return a && (s = s.replace(/\.00$/, "")), s;
};
var F = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(F || {});
const V = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, B = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, O = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: n = !0
}) => n ? B(e) : V(e), Q = ({
  plan: e,
  customFieldKey: n = "recommended"
}) => {
  var a;
  return !!((a = e.customFields) != null && a[n]);
}, W = ({
  plan: e,
  customFieldKey: n = "buttonLabel"
}) => {
  var a;
  return ((a = e.customFields) == null ? void 0 : a[n]) || c.subscribe;
}, X = ({ plan: e }) => {
  var n;
  return ((n = e.discounts) == null ? void 0 : n.length) > 0 ? e.discounts.reduce(
    (a, s) => a.discountedAmount < s.discountedAmount ? a : s
  ) : void 0;
}, Z = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, z = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  c as Labels,
  I as MantleProvider,
  k as PlanAvailability,
  F as PlanInterval,
  z as columnCount,
  Z as columnSpan,
  W as customButtonLabel,
  p as featureEnabled,
  G as featureSort,
  X as highestDiscount,
  O as intervalLabel,
  V as intervalLabelLong,
  B as intervalLabelShort,
  Q as isRecommendedPlan,
  J as money,
  $ as useMantle
};
//# sourceMappingURL=index.mjs.map
