import { jsx as L } from "react/jsx-runtime";
import { MantleClient as R } from "@heymantle/client";
import { createContext as _, useState as p, useEffect as F, useContext as V } from "react";
const G = {
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
}, g = _(void 0), B = ({
  feature: e,
  count: n = 0
}) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? n < e.value || e.value === -1 : !1, J = ({
  appId: e,
  customerApiToken: n,
  apiUrl: a = "https://appapi.heymantle.com/v1",
  children: s,
  i18n: h = c,
  waitForCustomer: f = !1,
  loadingComponent: S = null
}) => {
  const o = new R({ appId: e, customerApiToken: n, apiUrl: a }), [r, C] = p(null), [u, l] = p(!0), d = async () => {
    try {
      l(!0);
      const t = await o.getCustomer();
      C(t);
    } catch (t) {
      console.error("[MantleProvider] Error fetching customer: ", t);
    } finally {
      l(!1);
    }
  }, P = async (t) => {
    await o.sendUsageEvent(t);
  }, w = async ({
    usageId: t,
    period: i
  }) => await o.getUsageMetricReport({ id: t, period: i }), v = async (t) => await o.subscribe(t), E = async ({
    cancelReason: t
  } = {}) => await o.cancelSubscription({
    ...t && { cancelReason: t }
  }), N = async ({ returnUrl: t }) => {
    if (!t)
      throw new Error("returnUrl is required");
    return await o.addPaymentMethod({ returnUrl: t });
  }, A = async ({
    type: t,
    config: i
  }) => {
    if (!t)
      throw new Error("type is required");
    const b = new URL(document.location.toString()).searchParams.get("locale");
    return await o.createHostedSession({
      type: t,
      config: {
        ...b ? { locale: b } : {},
        ...i || {}
      }
    });
  }, M = async () => await o.listNotifications(), x = async ({
    id: t
  }) => await o.triggerNotificationCta({ id: t }), Y = async ({
    id: t,
    readAt: i,
    dismissedAt: m
  }) => await o.updateNotification({ id: t, readAt: i, dismissedAt: m });
  F(() => {
    n && d();
  }, [n]);
  const U = (r == null ? void 0 : r.plans) || [], D = (r == null ? void 0 : r.subscription) || null;
  return f && u ? S || null : /* @__PURE__ */ L(
    g.Provider,
    {
      value: {
        client: o,
        customer: r,
        subscription: D,
        plans: U,
        loading: u,
        i18n: { ...c, ...h },
        sendUsageEvent: P,
        getUsageReport: w,
        subscribe: v,
        cancelSubscription: E,
        addPaymentMethod: N,
        createHostedSession: A,
        listNotifications: M,
        triggerNotificationCta: x,
        updateNotification: Y,
        isFeatureEnabled: ({ featureKey: t, count: i = 0 }) => r != null && r.features[t] ? B({
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
}, O = () => {
  const e = V(g);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, y = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, Q = (e, n) => Number(y(n)) - Number(y(e)) || e.name.localeCompare(n.name), q = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), W = (e, n = "USD", a = !0) => {
  let s = q(n).format(e);
  return a && (s = s.replace(/\.00$/, "")), s;
};
var T = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(T || {});
const H = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, j = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, X = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: n = !0
}) => n ? j(e) : H(e), Z = ({
  plan: e,
  customFieldKey: n = "recommended"
}) => {
  var a;
  return !!((a = e.customFields) != null && a[n]);
}, z = ({
  plan: e,
  customFieldKey: n = "buttonLabel"
}) => {
  var a;
  return ((a = e.customFields) == null ? void 0 : a[n]) || c.subscribe;
}, K = ({ plan: e }) => {
  var n;
  return ((n = e.discounts) == null ? void 0 : n.length) > 0 ? e.discounts.reduce(
    (a, s) => a.discountedAmount < s.discountedAmount ? a : s
  ) : void 0;
}, ee = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, te = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  c as Labels,
  J as MantleProvider,
  G as PlanAvailability,
  T as PlanInterval,
  te as columnCount,
  ee as columnSpan,
  z as customButtonLabel,
  y as featureEnabled,
  Q as featureSort,
  K as highestDiscount,
  X as intervalLabel,
  H as intervalLabelLong,
  j as intervalLabelShort,
  Z as isRecommendedPlan,
  W as money,
  O as useMantle
};
//# sourceMappingURL=index.mjs.map
