import A, { createContext as T, useState as m, useEffect as D, useContext as q } from "react";
class F {
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
    if (!n && !s)
      throw new Error("MantleClient one of apiKey or customerApiToken is required");
    this.appId = e, this.apiKey = n, this.customerApiToken = s, this.apiUrl = a;
  }
  /**
   * Makes a request to the Mantle API
   * @param {Object} params
   * @param {"customer"|"usage_events"|"subscriptions"} params.path - The path to request
   * @param {"GET"|"POST"|"PUT"|"DELETE"} params.method - The HTTP method to use. Defaults to GET
   * @param {JSON} [params.body] - The request body
   * @returns {Promise<JSON>} a promise that resolves to the response body
   */
  async mantleRequest({ path: e, method: n = "GET", body: s }) {
    try {
      return await (await fetch(`${this.apiUrl}${e.startsWith("/") ? "" : "/"}${e}`, {
        method: n,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Mantle-App-Id": this.appId,
          ...this.apiKey ? { "X-Mantle-App-Api-Key": this.apiKey } : {},
          ...this.customerApiToken ? { "X-Mantle-Customer-Api-Token": this.customerApiToken } : {}
        },
        ...s && {
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
   * @returns {Promise<Object.<string, string>} a promise that resolves to an object with the customer API token, `apiToken`
   */
  async identify({
    platformId: e,
    myshopifyDomain: n,
    platform: s = "shopify",
    accessToken: a,
    name: r,
    email: u,
    customFields: c
  }) {
    return await this.mantleRequest({
      path: "identify",
      method: "POST",
      body: { platformId: e, myshopifyDomain: n, platform: s, accessToken: a, name: r, email: u, customFields: c }
    });
  }
  /**
   * Get the customer associated with the current customer API token
   * @returns {Promise<Customer>} a promise that resolves to the current customer
   */
  async getCustomer() {
    return (await this.mantleRequest({ path: "customer" })).customer;
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
}
var L = {
  MantleClient: F
};
const b = T(), R = ({ feature: t, count: e = 0 }) => (t == null ? void 0 : t.type) === "boolean" ? t.value : (t == null ? void 0 : t.type) === "limit" ? e < t.value || t.value === -1 : !1, B = ({
  appId: t,
  customerApiToken: e,
  apiUrl: n = "https://appapi.heymantle.com/v1",
  children: s
}) => {
  const a = new L.MantleClient({ appId: t, customerApiToken: e, apiUrl: n }), [r, u] = m(null), [c, d] = m(!0), [f, v] = m(null), y = async () => {
    try {
      d(!0);
      const o = await a.getCustomer();
      u(o);
    } catch (o) {
      v(o);
    } finally {
      d(!1);
    }
  }, w = async (o) => {
    await a.sendUsageEvent(o);
  }, S = async ({ planId: o, planIds: p, discountId: C, billingProvider: M, returnUrl: x }) => await a.subscribe({
    planId: o,
    planIds: p,
    discountId: C,
    billingProvider: M,
    returnUrl: x
  }), E = async () => await a.cancelSubscription();
  D(() => {
    e && y();
  }, [e]);
  const P = (r == null ? void 0 : r.plans) || [], l = r == null ? void 0 : r.subscription, g = l == null ? void 0 : l.plan;
  return /* @__PURE__ */ A.createElement(
    b.Provider,
    {
      value: {
        customer: r,
        subscription: l,
        plans: P,
        loading: c,
        error: f,
        mantleClient: a,
        sendUsageEvent: w,
        subscribe: S,
        cancelSubscription: E,
        isFeatureEnabled: ({ featureKey: o, count: p = 0 }) => r != null && r.features[o] ? R({ feature: r.features[o], count: p }) : !1,
        limitForFeature: ({ featureKey: o }) => r != null && r.features[o] && g.features[o].type === "limit" ? r.features[o].value : -1,
        refetch: async () => {
          await y();
        }
      }
    },
    s
  );
}, I = () => {
  const t = q(b);
  if (t === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return t;
}, h = (t) => t.type === "boolean" && t.value == !0 || t.type === "limit" && t.value !== 0, N = (t, e) => h(e) - h(t) || t.name.localeCompare(e.name), U = (t = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  notation: "standard"
}), _ = (t, e = "USD", n = !0) => {
  let s = U(e).format(t);
  return n && (s = s.replace(/\.00$/, "")), s;
}, i = {
  Annual: "ANNUAL",
  Every30Days: "EVERY_30_DAYS"
}, j = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden"
}, Y = {
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
}, k = (t = i.Every30Days) => {
  switch (t) {
    case i.Annual:
      return "yr";
    case i.Every30Days:
    default:
      return "mo";
  }
}, X = ({
  interval: t = i.Every30Days,
  useShortFormPlanIntervals: e = !0
}) => e ? k(t) : $(t), G = ({ plan: t, customFieldKey: e = "recommended" }) => {
  var n;
  return !!((n = t.customFields) != null && n[e]);
}, H = ({ plan: t, customFieldKey: e = "buttonLabel" }) => {
  var n;
  return ((n = t.customFields) == null ? void 0 : n[e]) || Y.SelectPlan;
}, J = ({ plan: t }) => {
  var e;
  return ((e = t.discounts) == null ? void 0 : e.length) > 0 ? t.discounts.reduce(
    (n, s) => n.discountedAmount < s.discountedAmount ? n : s
  ) : void 0;
}, K = (t = 4) => t % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : t % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : t % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : t === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, V = (t = 4) => t % 4 === 0 ? 4 : t % 3 === 0 ? 3 : t % 2 === 0 ? 2 : t === 1 ? 1 : 4;
export {
  Y as Labels,
  B as MantleProvider,
  j as PlanAvailability,
  i as PlanInterval,
  V as columnCount,
  K as columnSpan,
  H as customButtonLabel,
  h as featureEnabled,
  N as featureSort,
  J as highestDiscount,
  X as intervalLabel,
  $ as intervalLabelLong,
  k as intervalLabelShort,
  G as isRecommendedPlan,
  _ as money,
  I as useMantle
};
