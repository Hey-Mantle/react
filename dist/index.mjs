import { jsx as U } from "react/jsx-runtime";
import { MantleClient as D } from "@heymantle/client";
import { createContext as L, useState as b, useEffect as R, useContext as _ } from "react";
const $ = {
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
}, y = L(void 0), F = ({
  feature: e,
  count: n = 0
}) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? n < e.value || e.value === -1 : !1, G = ({
  appId: e,
  customerApiToken: n,
  apiUrl: a = "https://appapi.heymantle.com/v1",
  children: o,
  i18n: h = c,
  waitForCustomer: g = !1,
  loadingComponent: S = null
}) => {
  const s = new D({ appId: e, customerApiToken: n, apiUrl: a }), [r, f] = b(null), [l, u] = b(!0), d = async () => {
    try {
      u(!0);
      const t = await s.getCustomer();
      f(t);
    } catch (t) {
      console.error("[MantleProvider] Error fetching customer: ", t);
    } finally {
      u(!1);
    }
  }, P = async (t) => {
    await s.sendUsageEvent(t);
  }, C = async ({
    usageId: t,
    period: i
  }) => await s.getUsageMetricReport({ id: t, period: i }), w = async (t) => await s.subscribe(t), v = async ({
    cancelReason: t
  } = {}) => await s.cancelSubscription({
    ...t && { cancelReason: t }
  }), E = async ({ returnUrl: t }) => {
    if (!t)
      throw new Error("returnUrl is required");
    return await s.addPaymentMethod({ returnUrl: t });
  }, A = async ({
    type: t,
    config: i
  }) => {
    if (!t)
      throw new Error("type is required");
    const m = new URL(document.location.toString()).searchParams.get("locale");
    return await s.createHostedSession({
      type: t,
      config: {
        ...m ? { locale: m } : {},
        ...i || {}
      }
    });
  }, M = async ({ templateId: t }) => await s.notify({ templateId: t }), x = async () => await s.listNotifies();
  R(() => {
    n && d();
  }, [n]);
  const N = (r == null ? void 0 : r.plans) || [], Y = (r == null ? void 0 : r.subscription) || null;
  return g && l ? S || null : /* @__PURE__ */ U(
    y.Provider,
    {
      value: {
        client: s,
        customer: r,
        subscription: Y,
        plans: N,
        loading: l,
        i18n: { ...c, ...h },
        sendUsageEvent: P,
        getUsageReport: C,
        subscribe: w,
        cancelSubscription: v,
        addPaymentMethod: E,
        createHostedSession: A,
        notify: M,
        listNotifies: x,
        isFeatureEnabled: ({ featureKey: t, count: i = 0 }) => r != null && r.features[t] ? F({
          feature: r.features[t],
          count: i
        }) : !1,
        limitForFeature: ({ featureKey: t }) => r != null && r.features[t] && r.features[t].type === "limit" ? r.features[t].value : -1,
        refetch: async () => {
          await d();
        }
      },
      children: o
    }
  );
}, J = () => {
  const e = _(y);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, p = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, O = (e, n) => Number(p(n)) - Number(p(e)) || e.name.localeCompare(n.name), V = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), Q = (e, n = "USD", a = !0) => {
  let o = V(n).format(e);
  return a && (o = o.replace(/\.00$/, "")), o;
};
var B = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(B || {});
const q = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, T = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, W = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: n = !0
}) => n ? T(e) : q(e), X = ({
  plan: e,
  customFieldKey: n = "recommended"
}) => {
  var a;
  return !!((a = e.customFields) != null && a[n]);
}, Z = ({
  plan: e,
  customFieldKey: n = "buttonLabel"
}) => {
  var a;
  return ((a = e.customFields) == null ? void 0 : a[n]) || c.subscribe;
}, z = ({ plan: e }) => {
  var n;
  return ((n = e.discounts) == null ? void 0 : n.length) > 0 ? e.discounts.reduce(
    (a, o) => a.discountedAmount < o.discountedAmount ? a : o
  ) : void 0;
}, K = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, ee = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  c as Labels,
  G as MantleProvider,
  $ as PlanAvailability,
  B as PlanInterval,
  ee as columnCount,
  K as columnSpan,
  Z as customButtonLabel,
  p as featureEnabled,
  O as featureSort,
  z as highestDiscount,
  W as intervalLabel,
  q as intervalLabelLong,
  T as intervalLabelShort,
  X as isRecommendedPlan,
  Q as money,
  J as useMantle
};
//# sourceMappingURL=index.mjs.map
