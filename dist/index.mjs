import { jsx as B } from "react/jsx-runtime";
import { MantleClient as q } from "@heymantle/client";
import { createContext as T, useState as h, useEffect as H, useContext as j } from "react";
const z = {
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
}, w = T(void 0), I = ({
  feature: e,
  count: n = 0
}) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? n < e.value || e.value === -1 : !1, K = ({
  appId: e,
  customerApiToken: n,
  apiUrl: i = "https://appapi.heymantle.com/v1",
  children: l,
  i18n: g = m,
  waitForCustomer: S = !1,
  loadingComponent: C = null,
  throwOnError: a = !1
}) => {
  const s = new q({ appId: e, customerApiToken: n, apiUrl: i }), [o, P] = h(null), [p, b] = h(!0), f = async () => {
    try {
      b(!0);
      const r = await s.getCustomer();
      if (r && "error" in r)
        throw new Error(r.error);
      P(r);
    } catch (r) {
      if (a)
        throw r;
      console.error("[MantleProvider] Error fetching customer: ", r);
    } finally {
      b(!1);
    }
  }, v = async (r) => {
    const t = await s.sendUsageEvent(r);
    if ("error" in t) {
      if (a)
        throw new Error(t.error);
      return {
        success: !1
      };
    }
    return t;
  }, E = async ({
    usageId: r,
    period: t
  }) => {
    const c = await s.getUsageMetricReport({
      id: r,
      period: t
    });
    if ("error" in c && a)
      throw new Error(c.error);
    return c;
  }, N = async (r) => {
    const t = await s.subscribe(r);
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, A = async ({
    cancelReason: r
  } = {}) => {
    const t = await s.cancelSubscription({
      ...r && { cancelReason: r }
    });
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, M = async ({ returnUrl: r }) => {
    if (!r)
      throw new Error("returnUrl is required");
    const t = await s.addPaymentMethod({ returnUrl: r });
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, x = async ({
    type: r,
    config: t
  }) => {
    if (!r)
      throw new Error("type is required");
    const u = new URL(document.location.toString()).searchParams.get("locale"), d = await s.createHostedSession({
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
    const t = await s.listNotifications(r);
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, U = async ({
    id: r
  }) => {
    const t = await s.triggerNotificationCta({ id: r });
    if ("error" in t && a)
      throw new Error(t.error);
    return t;
  }, D = async ({
    id: r,
    readAt: t,
    dismissedAt: c
  }) => {
    const u = await s.updateNotification({
      id: r,
      readAt: t,
      dismissedAt: c
    });
    if ("error" in u && a)
      throw new Error(u.error);
    return u;
  }, L = async () => {
    const r = await s.getChecklist();
    if (r && "error" in r && a)
      throw new Error(r.error);
    return r;
  }, R = async (r) => {
    const t = await s.getChecklists(r);
    if (t && "error" in t && a)
      throw new Error(t.error);
    return t;
  }, _ = async ({ checklistId: r }) => {
    const t = await s.showChecklist({ checklistId: r });
    if (t && "error" in t && a)
      throw new Error(t.error);
    return t;
  }, F = async ({
    checklistId: r,
    checklistStepId: t
  }) => {
    const c = await s.completeChecklistStep({
      checklistId: r,
      checklistStepId: t
    });
    if ("error" in c && a)
      throw new Error(c.error);
    return c;
  };
  H(() => {
    n && f();
  }, [n]);
  const k = (o == null ? void 0 : o.plans) || [], V = (o == null ? void 0 : o.subscription) || null;
  return S && p ? C || null : /* @__PURE__ */ B(
    w.Provider,
    {
      value: {
        client: s,
        customer: o,
        subscription: V,
        plans: k,
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
        showChecklist: _,
        isFeatureEnabled: ({ featureKey: r, count: t = 0 }) => o != null && o.features[r] ? I({
          feature: o.features[r],
          count: t
        }) : !1,
        limitForFeature: ({ featureKey: r }) => o != null && o.features[r] && o.features[r].type === "limit" ? o.features[r].value : -1,
        refetch: async () => {
          await f();
        }
      },
      children: l
    }
  );
}, O = () => {
  const e = j(w);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, y = (e) => e.type === "boolean" && e.value === !0 || e.type === "limit" && e.value !== 0, ee = (e, n) => Number(y(n)) - Number(y(e)) || e.name.localeCompare(n.name), $ = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), re = (e, n = "USD", i = !0) => {
  let l = $(n).format(e);
  return i && (l = l.replace(/\.00$/, "")), l;
};
var G = /* @__PURE__ */ ((e) => (e.Annual = "ANNUAL", e.Every30Days = "EVERY_30_DAYS", e))(G || {});
const J = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "year";
    case "EVERY_30_DAYS":
    default:
      return "month";
  }
}, Q = (e = "EVERY_30_DAYS") => {
  switch (e) {
    case "ANNUAL":
      return "yr";
    case "EVERY_30_DAYS":
    default:
      return "mo";
  }
}, te = ({
  interval: e = "EVERY_30_DAYS",
  useShortFormPlanIntervals: n = !0
}) => n ? Q(e) : J(e), ne = ({
  plan: e,
  customFieldKey: n = "recommended"
}) => {
  var i;
  return !!((i = e.customFields) != null && i[n]);
}, oe = ({
  plan: e,
  customFieldKey: n = "buttonLabel"
}) => {
  var i;
  return ((i = e.customFields) == null ? void 0 : i[n]) || m.subscribe;
}, se = ({ plan: e }) => {
  var n;
  return ((n = e.discounts) == null ? void 0 : n.length) > 0 ? e.discounts.reduce(
    (i, l) => i.discountedAmount < l.discountedAmount ? i : l
  ) : void 0;
}, ae = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, ie = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  m as Labels,
  K as MantleProvider,
  z as PlanAvailability,
  G as PlanInterval,
  ie as columnCount,
  ae as columnSpan,
  oe as customButtonLabel,
  y as featureEnabled,
  ee as featureSort,
  se as highestDiscount,
  te as intervalLabel,
  J as intervalLabelLong,
  Q as intervalLabelShort,
  ne as isRecommendedPlan,
  re as money,
  O as useMantle
};
//# sourceMappingURL=index.mjs.map
