import T, { createContext as R, useState as d, useEffect as x, useContext as A } from "react";
class U {
  /**
   * Creates a new MantleClient. If being used in the browser, or any frontend code, never use the apiKey parameter,
   * always use the customerApiToken for the customer that is currently authenticated on the frontend.
   * @param {Object} params
   * @param {string} params.appId - The Mantle App ID set up on your app in your Mantle account.
   * @param {string} params.apiKey - The Mantle App API key set up on your app in your Mantle account. This should never be used in the browser.
   * @param {string} params.customerApiToken - The Mantle Customer API Token returned by the /identify endpoint. This should be used in the browser.
   * @param {string} [params.apiUrl] - The Mantle API URL to use
   */
  constructor({ appId: e, apiKey: n, customerApiToken: s, apiUrl: a = "https://appapi.heymantle.com/v1" }) {
    if (!e)
      throw new Error("MantleClient appId is required");
    if (typeof window < "u" && n)
      throw new Error("MantleClient apiKey should never be used in the browser");
    this.appId = e, this.apiKey = n, this.customerApiToken = s, this.apiUrl = a;
  }
  /**
   * Makes a request to the Mantle API
   * @param {Object} params
   * @param {"customer"|"usage_events"|"subscriptions"|"payment_methods"|"identify"} params.path - The path to the API endpoint
   * @param {"GET"|"POST"|"PUT"|"DELETE"} params.method - The HTTP method to use. Defaults to GET
   * @param {JSON} [params.body] - The request body
   * @returns {Promise<JSON>} a promise that resolves to the response body
   */
  async mantleRequest({ path: e, method: n = "GET", body: s }) {
    try {
      const a = `${this.apiUrl}${e.startsWith("/") ? "" : "/"}${e}${s && n === "GET" ? `?${new URLSearchParams(s)}` : ""}`;
      return await (await fetch(a, {
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
    } catch (a) {
      throw console.error(`[mantleRequest] ${e} error: ${a.message}`), a;
    }
  }
  /**
   * Identify the customer with Mantle. One of `platformId` or `myshopifyDomain` are required.
   * @param {Object} params
   * @param {string} params.platformId - The unique ID of the customer on the app platform, for Shopify this should be the Shop ID
   * @param {string} params.myshopifyDomain - The myshopify.com domain of the Shopify store
   * @param {string} [params.platform] - The platform the customer is on, defaults to shopify
   * @param {string} params.accessToken - The access token for the platform API, for Shopify apps, this should be the Shop access token
   * @param {string} params.name - The name of the customer
   * @param {string} params.email - The email of the customer
   * @param {Object.<string, Object>} [params.customFields] - Custom fields to store on the customer, must be a JSON object
   * @param {Date} [params.createdAt] - The date the customer was created, defaults to now if not provided
   * @returns {Promise<Object.<string, string>} a promise that resolves to an object with the customer API token, `apiToken`
   */
  async identify({
    platformId: e,
    myshopifyDomain: n,
    platform: s = "shopify",
    accessToken: a,
    name: r,
    email: u,
    customFields: m,
    createdAt: c
  }) {
    return await this.mantleRequest({
      path: "identify",
      method: "POST",
      body: {
        platformId: e,
        myshopifyDomain: n,
        platform: s,
        accessToken: a,
        name: r,
        email: u,
        customFields: m,
        createdAt: c
      }
    });
  }
  /**
   * Get the customer associated with the current customer API token
   * @param {string} [id] - The ID of the customer to get. Only required if using the API key for authentication instead of the customer API token
   * @returns {Promise<Customer>} a promise that resolves to the current customer
   */
  async getCustomer(e) {
    return (await this.mantleRequest({
      path: "customer",
      ...e ? { body: { id: e } } : {}
    })).customer;
  }
  /**
   * Subscribe to a plan, or list of plans. Must provide either `planId` or `planIds`
   * @param {Object} params - The subscription options
   * @param {string} params.planId - The ID of the plan to subscribe to
   * @param {string[]} params.planIds - List of plan IDs to subscribe to
   * @param {string} params.discountId - The ID of the discount to apply to the subscription
   * @param {string} params.returnUrl - The URL to redirect to after the subscription is complete
   * @param {string} [params.billingProvider] - The name of the billing provider to use, if none is provided, use sensible default
   * @returns {Promise<Subscription>} a promise that resolves to the created subscription
   */
  async subscribe({ planId: e, planIds: n, discountId: s, returnUrl: a, billingProvider: r }) {
    return await this.mantleRequest({
      path: "subscriptions",
      method: "POST",
      body: { planId: e, planIds: n, discountId: s, returnUrl: a, billingProvider: r }
    });
  }
  /**
   * Cancel the current subscription
   * @param {Object} params - The subscription options
   * @param {string} [params.cancelReason] - The reason for cancelling the subscription
   * @returns {Promise<Subscription>} a promise that resolves to the cancelled subscription
   */
  async cancelSubscription({ cancelReason: e } = {}) {
    return await this.mantleRequest({
      path: "subscriptions",
      method: "DELETE",
      ...e && {
        body: { cancelReason: e }
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
  async updateSubscription({ id: e, cappedAmount: n }) {
    return await this.mantleRequest({
      path: "subscriptions",
      method: "PUT",
      body: { id: e, cappedAmount: n }
    });
  }
  /**
   * Send a usage event
   * @param {Object} params - The usage event options
   * @param {string} [params.eventId] - The ID of the event
   * @param {string} params.eventName - The name of the event which can be tracked by usage metrics
   * @param {string} params.customerId - Required if customerApiToken is not used for authentication. One of either the customer token, Mantle customer ID, platform ID / Shopify Shop ID, Shopify myshopify.com domain
   * @param {Object.<string, any>} params.properties - The event properties
   * @returns {Promise<boolean>} true if the event was sent successfully
   */
  async sendUsageEvent({ eventId: e, eventName: n, customerId: s, properties: a = {} }) {
    return await this.mantleRequest({
      path: "usage_events",
      method: "POST",
      body: {
        eventId: e,
        eventName: n,
        ...s ? { customerId: s } : {},
        properties: a
      }
    });
  }
  /**
   * Send multiple usage events of the same type in bulk, for example, when tracking page views
   * @param {Object} params - The usage event options
   * @param {UsageEvent[]} params.events - The events to send
   * @returns {Promise<boolean>} true if the events were sent successfully
   */
  async sendUsageEvents({ events: e }) {
    return await this.mantleRequest({
      path: "usage_events",
      method: "POST",
      body: {
        events: e
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
   * @param {string} [params.returnUrl] - The URL to redirect to after a checkout has completed
   * @returns {Promise<SetupIntent>} a promise that resolves to the created `SetupIntent` with `clientSecret`
   */
  async addPaymentMethod({ returnUrl: e }) {
    return await this.mantleRequest({
      path: "payment_methods",
      method: "POST",
      ...e && {
        body: { returnUrl: e }
      }
    });
  }
  /**
   * Get report of a usage metric over time intervals
   * @param {Object} id - The usage metric id
   * @param {string} period - The interval to get the report for, one of "daily", "weekly", "monthly"
   * @returns {Promise<Object>} a promise that resolves to the usage metric report
   */
  async getUsageMetricReport({ id: e, period: n }) {
    return await this.mantleRequest({
      path: `usage_events/${e}/report`,
      ...n && { body: { period: n } }
    });
  }
}
var D = {
  MantleClient: U
};
const h = R(), q = ({ feature: t, count: e = 0 }) => (t == null ? void 0 : t.type) === "boolean" ? t.value : (t == null ? void 0 : t.type) === "limit" ? e < t.value || t.value === -1 : !1, _ = ({
  appId: t,
  customerApiToken: e,
  apiUrl: n = "https://appapi.heymantle.com/v1",
  children: s
}) => {
  const a = new D.MantleClient({ appId: t, customerApiToken: e, apiUrl: n }), [r, u] = d(null), [m, c] = d(!0), p = async () => {
    try {
      c(!0);
      const o = await a.getCustomer();
      u(o);
    } catch (o) {
      console.error("[MantleProvider] Error fetching customer: ", o);
    } finally {
      c(!1);
    }
  }, b = async (o) => {
    await a.sendUsageEvent(o);
  }, v = async ({ usageId: o, period: l }) => await a.getUsageMetricReport({ id: o, period: l }), w = async ({ planId: o, planIds: l, discountId: E, billingProvider: M, returnUrl: C }) => await a.subscribe({
    planId: o,
    planIds: l,
    discountId: E,
    billingProvider: M,
    returnUrl: C
  }), f = async () => await a.cancelSubscription(), g = async ({ returnUrl: o }) => await a.addPaymentMethod({ returnUrl: o });
  x(() => {
    e && p();
  }, [e]);
  const P = (r == null ? void 0 : r.plans) || [], S = r == null ? void 0 : r.subscription;
  return /* @__PURE__ */ T.createElement(
    h.Provider,
    {
      value: {
        customer: r,
        subscription: S,
        plans: P,
        loading: m,
        sendUsageEvent: b,
        getUsageReport: v,
        subscribe: w,
        cancelSubscription: f,
        addPaymentMethod: g,
        isFeatureEnabled: ({ featureKey: o, count: l = 0 }) => r != null && r.features[o] ? q({ feature: r.features[o], count: l }) : !1,
        limitForFeature: ({ featureKey: o }) => r != null && r.features[o] && currentPlan.features[o].type === "limit" ? r.features[o].value : -1,
        refetch: async () => {
          await p();
        }
      }
    },
    s
  );
}, k = () => {
  const t = A(h);
  if (t === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return t;
}, y = (t) => t.type === "boolean" && t.value == !0 || t.type === "limit" && t.value !== 0, B = (t, e) => y(e) - y(t) || t.name.localeCompare(e.name), L = (t = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  notation: "standard"
}), I = (t, e = "USD", n = !0) => {
  let s = L(e).format(t);
  return n && (s = s.replace(/\.00$/, "")), s;
}, i = {
  Annual: "ANNUAL",
  Every30Days: "EVERY_30_DAYS"
}, N = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden"
}, F = {
  Back: "Back",
  CurrentPlan: "Current plan",
  CustomPlans: "Custom plans",
  CustomPlansDescription: "Plans tailored to your specific needs",
  FreeTrialLength: "{{ trialDays }}-day free trial",
  Features: "Features",
  Month: "month",
  MonthShort: "mo",
  Monthly: "Monthly",
  Year: "year",
  YearShort: "yr",
  Yearly: "Yearly",
  MostPopular: "Most popular",
  Per: "/",
  Plans: "Plans",
  SelectPlan: "Select plan",
  SubscribeSuccessTitle: "Subscription successful",
  SubscribeSuccessBody: "Thanks for subscribing to our app!"
}, $ = (t = i.Every30Days) => {
  switch (t) {
    case i.Annual:
      return "year";
    case i.Every30Days:
    default:
      return "month";
  }
}, O = (t = i.Every30Days) => {
  switch (t) {
    case i.Annual:
      return "yr";
    case i.Every30Days:
    default:
      return "mo";
  }
}, j = ({
  interval: t = i.Every30Days,
  useShortFormPlanIntervals: e = !0
}) => e ? O(t) : $(t), G = ({ plan: t, customFieldKey: e = "recommended" }) => {
  var n;
  return !!((n = t.customFields) != null && n[e]);
}, X = ({ plan: t, customFieldKey: e = "buttonLabel" }) => {
  var n;
  return ((n = t.customFields) == null ? void 0 : n[e]) || F.SelectPlan;
}, H = ({ plan: t }) => {
  var e;
  return ((e = t.discounts) == null ? void 0 : e.length) > 0 ? t.discounts.reduce(
    (n, s) => n.discountedAmount < s.discountedAmount ? n : s
  ) : void 0;
}, J = (t = 4) => t % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : t % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : t % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : t === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, K = (t = 4) => t % 4 === 0 ? 4 : t % 3 === 0 ? 3 : t % 2 === 0 ? 2 : t === 1 ? 1 : 4;
export {
  F as Labels,
  _ as MantleProvider,
  N as PlanAvailability,
  i as PlanInterval,
  K as columnCount,
  J as columnSpan,
  X as customButtonLabel,
  y as featureEnabled,
  B as featureSort,
  H as highestDiscount,
  j as intervalLabel,
  $ as intervalLabelLong,
  O as intervalLabelShort,
  G as isRecommendedPlan,
  I as money,
  k as useMantle
};
