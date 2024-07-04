import q, { createContext as L, useState as S, useEffect as F, useContext as $ } from "react";
class N {
  /**
   * Creates a new MantleClient. If being used in the browser, or any frontend code, never use the apiKey parameter,
   * always use the customerApiToken for the customer that is currently authenticated on the frontend.
   * @param {Object} params
   * @param {string} params.appId - The Mantle App ID set up on your app in your Mantle account.
   * @param {string} [params.apiKey] - The Mantle App API key set up on your app in your Mantle account. This should never be used in the browser.
   * @param {string} [params.customerApiToken] - The Mantle Customer API Token returned by the /identify endpoint. This should be used in the browser.
   * @param {string} [params.apiUrl] - The Mantle API URL to use
   */
  constructor({ appId: t, apiKey: n, customerApiToken: s, apiUrl: o = "https://appapi.heymantle.com/v1" }) {
    if (!t)
      throw new Error("MantleClient appId is required");
    if (typeof window < "u" && n)
      throw new Error("MantleClient apiKey should never be used in the browser");
    this.appId = t, this.apiKey = n, this.customerApiToken = s, this.apiUrl = o;
  }
  /**
   * Makes a request to the Mantle API
   * @param {Object} params
   * @param {"customer"|"usage_events"|"subscriptions"|"payment_methods"|"identify"} params.path - The path to the API endpoint
   * @param {"GET"|"POST"|"PUT"|"DELETE"} [params.method] - The HTTP method to use. Defaults to GET
   * @param {JSON} [params.body] - The request body
   * @returns {Promise<JSON>} a promise that resolves to the response body
   */
  async mantleRequest({ path: t, method: n = "GET", body: s }) {
    try {
      const o = `${this.apiUrl}${t.startsWith("/") ? "" : "/"}${t}${s && n === "GET" ? `?${new URLSearchParams(s)}` : ""}`;
      return await (await fetch(o, {
        method: n,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Mantle-App-Id": this.appId,
          ...this.apiKey ? { "X-Mantle-App-Api-Key": this.apiKey } : {},
          ...this.customerApiToken ? { "X-Mantle-Customer-Api-Token": this.customerApiToken } : {}
        },
        ...s && n !== "GET" && {
          body: JSON.stringify(s)
        }
      })).json();
    } catch (o) {
      throw console.error(`[mantleRequest] ${t} error: ${o.message}`), o;
    }
  }
  /**
   * Identify the customer with Mantle. One of `platformId` or `myshopifyDomain` are required.
   * @param {Object} params
   * @param {string} [params.platformId] - The unique ID of the customer on the app platform, for Shopify this should be the Shop ID
   * @param {string} [params.myshopifyDomain] - The myshopify.com domain of the Shopify store
   * @param {string} [params.platform] - The platform the customer is on, defaults to shopify
   * @param {string} [params.accessToken] - The access token for the platform API, for Shopify apps, this should be the Shop access token
   * @param {string} [params.name] - The name of the customer
   * @param {string} [params.email] - The email of the customer
   * @param {Object.<string, Object>} [params.customFields] - Custom fields to store on the customer, must be a JSON object
   * @param {Date} [params.createdAt] - The date the customer was created, defaults to now if not provided
   * @param {boolean} [params.rotateApiToken] - True to rotate the customer API token and return the new value
   * @param {string[]} [params.tags] - The tags to apply to the customer. Default operator is "replace"
   * @param {Object.<string, string>} [params.operators] - The map of fields to operators to use for the query, such as { tags: "append" }. Possibly values are "append", "remove", "replace"
   * @param {Address} [params.address] - The address of the customer
   * @returns {Promise<Object.<string, string>} a promise that resolves to an object with the customer API token, `apiToken`
   */
  async identify({
    platformId: t,
    myshopifyDomain: n,
    platform: s = "shopify",
    accessToken: o,
    name: c,
    email: p,
    customFields: i,
    createdAt: r,
    rotateApiToken: b,
    tags: d,
    operators: m,
    address: h
  }) {
    return await this.mantleRequest({
      path: "identify",
      method: "POST",
      body: {
        platformId: t,
        myshopifyDomain: n,
        platform: s,
        accessToken: o,
        name: c,
        email: p,
        customFields: i,
        createdAt: r,
        rotateApiToken: b,
        tags: d,
        operators: m,
        address: h
      }
    });
  }
  /**
   * Get the customer associated with the current customer API token
   * @param {string} [id] - The ID of the customer to get. Only required if using the API key for authentication instead of the customer API token
   * @returns {Promise<Customer>} a promise that resolves to the current customer
   */
  async getCustomer(t) {
    return (await this.mantleRequest({
      path: "customer",
      ...t ? { body: { id: t } } : {}
    })).customer;
  }
  /**
   * Subscribe to a plan, or list of plans. Must provide either `planId` or `planIds`
   * @param {Object} params - The subscription options
   * @param {string} [params.planId] - The ID of the plan to subscribe to
   * @param {string[]} [params.planIds] - List of plan IDs to subscribe to
   * @param {string} [params.discountId] - The ID of the discount to apply to the subscription
   * @param {string} params.returnUrl - The URL to redirect to after the subscription is complete
   * @param {string} [params.billingProvider] - The name of the billing provider to use, if none is provided, use sensible default
   * @param {boolean} [params.useSavedPaymentMethod] - Whether to use the saved payment method for the subscription if available
   * @returns {Promise<Subscription>} a promise that resolves to the created subscription
   */
  async subscribe({
    planId: t,
    planIds: n,
    discountId: s,
    returnUrl: o,
    billingProvider: c,
    useSavedPaymentMethod: p = !1
  }) {
    return await this.mantleRequest({
      path: "subscriptions",
      method: "POST",
      body: { planId: t, planIds: n, discountId: s, returnUrl: o, billingProvider: c, useSavedPaymentMethod: p }
    });
  }
  /**
   * Cancel the current subscription
   * @param {Object} params - The subscription options
   * @param {string} [params.cancelReason] - The reason for cancelling the subscription
   * @returns {Promise<Subscription>} a promise that resolves to the cancelled subscription
   */
  async cancelSubscription({ cancelReason: t } = {}) {
    return await this.mantleRequest({
      path: "subscriptions",
      method: "DELETE",
      ...t && {
        body: { cancelReason: t }
      }
    });
  }
  /**
   * Update the subscription
   * @param {Object} params - The subscription options
   * @param {string} params.id - The ID of the subscription to update
   * @param {number} params.cappedAmount - The capped amount of the usage charge
   * @returns {Promise<Subscription>} a promise that resolves to the updated subscription
   */
  async updateSubscription({ id: t, cappedAmount: n }) {
    return await this.mantleRequest({
      path: "subscriptions",
      method: "PUT",
      body: { id: t, cappedAmount: n }
    });
  }
  /**
   * Send a usage event
   * @param {Object} params - The usage event options
   * @param {string} [params.eventId] - The ID of the event
   * @param {string} params.eventName - The name of the event which can be tracked by usage metrics
   * @param {Date} params.timestamp - The timestamp of the event, leave blank to use the current time
   * @param {string} [params.customerId] - Required if customerApiToken is not used for authentication. One of either the customer token, Mantle customer ID, platform ID / Shopify Shop ID, Shopify myshopify.com domain
   * @param {Object.<string, any>} [params.properties] - The event properties
   * @returns {Promise<boolean>} true if the event was sent successfully
   */
  async sendUsageEvent({ eventId: t, eventName: n, timestamp: s, customerId: o, properties: c = {} }) {
    return await this.mantleRequest({
      path: "usage_events",
      method: "POST",
      body: {
        eventId: t,
        eventName: n,
        timestamp: s,
        ...o ? { customerId: o } : {},
        properties: c
      }
    });
  }
  /**
   * Send multiple usage events of the same type in bulk, for example, when tracking page views
   * @param {Object} params - The usage event options
   * @param {UsageEvent[]} params.events - The events to send
   * @returns {Promise<boolean>} true if the events were sent successfully
   */
  async sendUsageEvents({ events: t }) {
    return await this.mantleRequest({
      path: "usage_events",
      method: "POST",
      body: {
        events: t
      }
    });
  }
  /**
   * Initial step to start the process of connecting a new payment method from an external billing provider.
   * For Stripe billing, this creates a `SetupIntent` which contains a `clientSecret`, which can be used to initialize
   * Stripe Elements or Stripe Checkout, which is necessary to collect payment method details to save for later use,
   * or complete checkout without an active `PaymentIntent`. Do not store this `clientSecret` or share it with anyone,
   * except for as part of the client-side payment method collection process.
   * @param {Object} params
   * @param {string} params.returnUrl - The URL to redirect to after a checkout has completed
   * @returns {Promise<SetupIntent>} a promise that resolves to the created `SetupIntent` with `clientSecret`
   */
  async addPaymentMethod({ returnUrl: t }) {
    return await this.mantleRequest({
      path: "payment_methods",
      method: "POST",
      ...t && {
        body: { returnUrl: t }
      }
    });
  }
  /**
   * Get report of a usage metric over time intervals
   * @param {Object} id - The usage metric id
   * @param {string} [period] - The interval to get the report for, one of "daily", "weekly", "monthly"
   * @returns {Promise<Object>} a promise that resolves to the usage metric report
   */
  async getUsageMetricReport({ id: t, period: n, customerId: s }) {
    return await this.mantleRequest({
      path: `usage_events/${t}/report`,
      body: {
        ...n ? { period: n } : {},
        ...s ? { customerId: s } : {}
      }
    });
  }
  /**
   * Create a hosted session that can be used to send the customer to a hosted page to manage their subscription
   * @param {Object} params - The hosted session options
   * @param {string} params.type - The type of hosted session to create, one of "plans" or "account"
   * @param {Object} params.config - The configuration for the hosted session
   * @returns {Promise<HostedSession>} a promise that resolves to the hosted session with a url property
   */
  async createHostedSession(t) {
    const { type: n, config: s } = t;
    return (await this.mantleRequest({
      path: "hosted_sessions",
      method: "POST",
      body: {
        type: n,
        config: s
      }
    })).session;
  }
}
const O = {
  /**
   * The subscription was created and one of two things will happen:
   * 1. If the subscription has a trial, the first invoice will be paid after the trial ends
   * 2. If the subscription does not have a trial, the first invoice will be paid immediately
   * In both cases, the consumer should redirect to the `returnUrl` provided with the subscription to activate the subscription
   * @type {string}
   */
  finalize: "finalize",
  /**
   * The subscription was created with a trial. The consumer should pass the returned `clientSecret` to Stripe Elements in order
   * to collect payment method details and complete the subscription. The consumer should pass the `returnUrl` to the
   * `Stripe#confirmSetup` method to activate the subscription and vault the card. The first invoice will be paid after the trial ends.
   * @type {string}
   */
  setup: "setup",
  /**
   * The subscription was created without a trial. The consumer should pass the returned `clientSecret` to Stripe Elements in order
   * to collect payment method details and complete the subscription. The consumer should pass the `returnUrl` to the
   * `Stripe#confirmPayment` method to activate the subscription and vault the card. The first invoice will be paid immediately.
   */
  subscribe: "subscribe"
};
var Y = {
  MantleClient: N,
  SubscriptionConfirmType: O
};
const u = {
  Annual: "ANNUAL",
  Every30Days: "EVERY_30_DAYS"
}, j = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden"
}, g = {
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
  UsageCharges: "Usage charges"
}, w = L(), _ = ({ feature: e, count: t = 0 }) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? t < e.value || e.value === -1 : !1, G = ({
  appId: e,
  customerApiToken: t,
  apiUrl: n = "https://appapi.heymantle.com/v1",
  children: s,
  i18n: o = g,
  waitForCustomer: c = !1,
  loadingComponent: p = null
}) => {
  const i = new Y.MantleClient({ appId: e, customerApiToken: t, apiUrl: n }), [r, b] = S(null), [d, m] = S(!0), h = async () => {
    try {
      m(!0);
      const a = await i.getCustomer();
      b(a);
    } catch (a) {
      console.error("[MantleProvider] Error fetching customer: ", a);
    } finally {
      m(!1);
    }
  }, v = async (a) => {
    await i.sendUsageEvent(a);
  }, C = async ({ usageId: a, period: l }) => await i.getUsageMetricReport({ id: a, period: l }), E = async ({
    planId: a,
    planIds: l,
    discountId: f,
    billingProvider: y,
    returnUrl: U,
    useSavedPaymentMethod: D = !1
  }) => await i.subscribe({
    planId: a,
    planIds: l,
    discountId: f,
    billingProvider: y,
    returnUrl: U,
    useSavedPaymentMethod: D
  }), M = async ({ cancelReason: a } = {}) => await i.cancelSubscription({
    ...a && { cancelReason: a }
  }), T = async ({ returnUrl: a }) => await i.addPaymentMethod({ returnUrl: a }), x = async ({ type: a, config: l }) => {
    const y = new URL(document.location.toString()).searchParams.get("locale");
    return await i.createHostedSession({
      type: a,
      config: {
        ...y ? { locale: y } : {},
        ...l || {}
      }
    });
  };
  F(() => {
    t && h();
  }, [t]);
  const A = (r == null ? void 0 : r.plans) || [], R = r == null ? void 0 : r.subscription;
  return c && d ? p || "" : /* @__PURE__ */ q.createElement(
    w.Provider,
    {
      value: {
        customer: r,
        subscription: R,
        plans: A,
        loading: d,
        i18n: { ...g, ...o },
        sendUsageEvent: v,
        getUsageReport: C,
        subscribe: E,
        cancelSubscription: M,
        addPaymentMethod: T,
        createHostedSession: x,
        isFeatureEnabled: ({ featureKey: a, count: l = 0 }) => r != null && r.features[a] ? _({ feature: r.features[a], count: l }) : !1,
        limitForFeature: ({ featureKey: a }) => r != null && r.features[a] && currentPlan.features[a].type === "limit" ? r.features[a].value : -1,
        refetch: async () => {
          await h();
        }
      }
    },
    s
  );
}, X = () => {
  const e = $(w);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, P = (e) => e.type === "boolean" && e.value == !0 || e.type === "limit" && e.value !== 0, J = (e, t) => P(t) - P(e) || e.name.localeCompare(t.name), k = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), K = (e, t = "USD", n = !0) => {
  let s = k(t).format(e);
  return n && (s = s.replace(/\.00$/, "")), s;
}, B = (e = u.Every30Days) => {
  switch (e) {
    case u.Annual:
      return "year";
    case u.Every30Days:
    default:
      return "month";
  }
}, H = (e = u.Every30Days) => {
  switch (e) {
    case u.Annual:
      return "yr";
    case u.Every30Days:
    default:
      return "mo";
  }
}, V = ({
  interval: e = u.Every30Days,
  useShortFormPlanIntervals: t = !0
}) => t ? H(e) : B(e), W = ({ plan: e, customFieldKey: t = "recommended" }) => {
  var n;
  return !!((n = e.customFields) != null && n[t]);
}, Q = ({ plan: e, customFieldKey: t = "buttonLabel" }) => {
  var n;
  return ((n = e.customFields) == null ? void 0 : n[t]) || g.SelectPlan;
}, Z = ({ plan: e }) => {
  var t;
  return ((t = e.discounts) == null ? void 0 : t.length) > 0 ? e.discounts.reduce(
    (n, s) => n.discountedAmount < s.discountedAmount ? n : s
  ) : void 0;
}, z = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, ee = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  g as Labels,
  G as MantleProvider,
  j as PlanAvailability,
  u as PlanInterval,
  ee as columnCount,
  z as columnSpan,
  Q as customButtonLabel,
  P as featureEnabled,
  J as featureSort,
  Z as highestDiscount,
  V as intervalLabel,
  B as intervalLabelLong,
  H as intervalLabelShort,
  W as isRecommendedPlan,
  K as money,
  X as useMantle
};
