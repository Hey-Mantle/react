import G, { createContext as X, useState as S, useEffect as V, useContext as J } from "react";
var K = Object.defineProperty, w = Object.getOwnPropertySymbols, W = Object.prototype.hasOwnProperty, Q = Object.prototype.propertyIsEnumerable, C = (e, t, n) => t in e ? K(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, l = (e, t) => {
  for (var n in t || (t = {}))
    W.call(t, n) && C(e, n, t[n]);
  if (w)
    for (var n of w(t))
      Q.call(t, n) && C(e, n, t[n]);
  return e;
}, i = (e, t, n) => new Promise((o, u) => {
  var h = (r) => {
    try {
      a(n.next(r));
    } catch (p) {
      u(p);
    }
  }, m = (r) => {
    try {
      a(n.throw(r));
    } catch (p) {
      u(p);
    }
  }, a = (r) => r.done ? o(r.value) : Promise.resolve(r.value).then(h, m);
  a((n = n.apply(e, t)).next());
}), Z = class {
  /**
   * Creates a new MantleClient. If being used in the browser, or any frontend code, never use the apiKey parameter,
   * always use the customerApiToken for the customer that is currently authenticated on the frontend.
   */
  constructor({ appId: e, apiKey: t, customerApiToken: n, apiUrl: o = "https://appapi.heymantle.com/v1" }) {
    if (!e)
      throw new Error("MantleClient appId is required");
    if (typeof window < "u" && t)
      throw new Error("MantleClient apiKey should never be used in the browser");
    this.appId = e, this.apiKey = t, this.customerApiToken = n, this.apiUrl = o;
  }
  /**
   * Makes a request to the Mantle API
   * @private
   */
  mantleRequest(e) {
    return i(this, arguments, function* ({ path: t, method: n = "GET", body: o }) {
      try {
        const u = `${this.apiUrl}${t.startsWith("/") ? "" : "/"}${t}${o && n === "GET" ? `?${new URLSearchParams(o)}` : ""}`;
        return yield (yield fetch(u, l({
          method: n,
          headers: l(l({
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Mantle-App-Id": this.appId
          }, this.apiKey ? { "X-Mantle-App-Api-Key": this.apiKey } : {}), this.customerApiToken ? { "X-Mantle-Customer-Api-Token": this.customerApiToken } : {})
        }, o && n !== "GET" && {
          body: JSON.stringify(o)
        }))).json();
      } catch (u) {
        throw console.error(`[mantleRequest] ${t} error: ${u.message}`), u;
      }
    });
  }
  /**
   * Identify the customer with Mantle. One of `platformId` or `myshopifyDomain` are required.
   * @param params.platform - The platform the customer is on, defaults to shopify
   * @param params.platformId - The unique ID of the customer on the app platform, for Shopify this should be the Shop ID
   * @param params.myshopifyDomain - The myshopify.com domain of the Shopify store
   * @param params.accessToken - The access token for the platform API, for Shopify apps, this should be the Shop access token
   * @param params.name - The name of the customer
   * @param params.email - The email of the customer
   * @param params.platformPlanName - The name of the plan on the platform (Shopify plan name)
   * @param params.customFields - Custom fields to store on the customer, must be a JSON object
   * @param params.features - Key-value pairs of features to override on the customer
   * @param params.createdAt - The date the customer was created, defaults to now if not provided
   * @param params.rotateApiToken - True to rotate the customer API token and return the new value
   * @param params.tags - The tags to apply to the customer. Default operator is "replace"
   * @param params.operators - The map of fields to operators to use for the query
   * @param params.address - The address of the customer
   * @param params.contacts - The contacts of the customer
   * @param params.defaultBillingProvider - The default billing provider to use for the customer
   * @param params.stripeId - The Stripe ID of the customer
   * @returns A promise that resolves to an object with the customer API token
   */
  identify(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest({
        path: "identify",
        method: "POST",
        body: e
      });
    });
  }
  /**
   * Get the customer associated with the current customer API token
   * @param id - The ID of the customer to get. Only required if using the API key for authentication instead of the customer API token
   * @returns A promise that resolves to the current customer
   */
  getCustomer(e) {
    return i(this, null, function* () {
      return (yield this.mantleRequest(l({
        path: "customer"
      }, e ? { body: { id: e } } : {}))).customer;
    });
  }
  /**
   * Subscribe to a plan, or list of plans. Must provide either `planId` or `planIds`
   * @param params.planId - The ID of the plan to subscribe to
   * @param params.planIds - List of plan IDs to subscribe to
   * @param params.discountId - The ID of the discount to apply to the subscription
   * @param params.returnUrl - The URL to redirect to after the subscription is complete
   * @param params.billingProvider - The name of the billing provider to use
   * @param params.trialDays - The number of days to trial the subscription for
   * @param params.hosted - Whether to use Stripe checkout for the subscription
   * @param params.useSavedPaymentMethod - Whether to use the saved payment method
   * @param params.collectionMethod - The collection method to use for the subscription
   * @param params.daysUntilDue - The number of days until the subscription is due
   * @param params.paymentMethodTypes - The payment method types to use for the subscription
   * @param params.automaticTax - Whether to automatically calculate tax for the subscription
   * @param params.requireBillingAddress - Tell the Stripe Checkout Session to require a billing address
   * @param params.email - Prefill the Stripe customer's email address
   * @param params.metadata - The metadata to attach to the subscription
   * @returns A promise that resolves to the created subscription
   */
  subscribe(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest({
        path: "subscriptions",
        method: "POST",
        body: e
      });
    });
  }
  /**
   * Cancel the current subscription
   * @param params.cancelReason - The reason for cancelling the subscription
   * @returns A promise that resolves to the cancelled subscription
   */
  cancelSubscription(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest(l({
        path: "subscriptions",
        method: "DELETE"
      }, (e == null ? void 0 : e.cancelReason) && {
        body: { cancelReason: e.cancelReason }
      }));
    });
  }
  /**
   * Update the subscription
   * @param params.id - The ID of the subscription to update
   * @param params.cappedAmount - The capped amount of the usage charge
   * @returns A promise that resolves to the updated subscription
   */
  updateSubscription(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest({
        path: "subscriptions",
        method: "PUT",
        body: e
      });
    });
  }
  /**
   * Send a usage event
   * @param params.eventId - The ID of the event
   * @param params.eventName - The name of the event which can be tracked by usage metrics
   * @param params.timestamp - The timestamp of the event, leave blank to use the current time
   * @param params.customerId - Required if customerApiToken is not used for authentication
   * @param params.properties - The event properties
   * @returns A promise that resolves to true if the event was sent successfully
   */
  sendUsageEvent(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest({
        path: "usage_events",
        method: "POST",
        body: e
      });
    });
  }
  /**
   * Send multiple usage events of the same type in bulk
   * @param params.events - The events to send
   * @returns A promise that resolves to true if the events were sent successfully
   */
  sendUsageEvents(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest({
        path: "usage_events",
        method: "POST",
        body: e
      });
    });
  }
  /**
   * Initial step to start the process of connecting a new payment method from an external billing provider
   * @param params.returnUrl - The URL to redirect to after a checkout has completed
   * @returns A promise that resolves to the created SetupIntent with clientSecret
   */
  addPaymentMethod(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest(l({
        path: "payment_methods",
        method: "POST"
      }, e.returnUrl && {
        body: { returnUrl: e.returnUrl }
      }));
    });
  }
  /**
   * Get report of a usage metric over time intervals
   * @param params.id - The usage metric id
   * @param params.period - The interval to get the report for
   * @param params.customerId - The customer ID to get the report for
   * @returns A promise that resolves to the usage metric report
   */
  getUsageMetricReport(e) {
    return i(this, null, function* () {
      return yield this.mantleRequest({
        path: `usage_events/${e.id}/report`,
        body: l(l({}, e.period ? { period: e.period } : {}), e.customerId ? { customerId: e.customerId } : {})
      });
    });
  }
  /**
   * Get a list of invoices for the current customer
   * @param params.page - The page number to get, defaults to 0
   * @param params.limit - The number of invoices to get per page, defaults to 10
   * @returns A promise that resolves to the list of invoices
   */
  listInvoices() {
    return i(this, arguments, function* (e = {}) {
      var t, n;
      return yield this.mantleRequest({
        path: "invoices",
        body: {
          page: (t = e.page) != null ? t : 0,
          limit: (n = e.limit) != null ? n : 10
        }
      });
    });
  }
  /**
   * Create a hosted session that can be used to send the customer to a hosted page to manage their subscription
   * @param params.type - The type of hosted session to create
   * @param params.config - The configuration for the hosted session
   * @returns A promise that resolves to the hosted session with a url property
   */
  createHostedSession(e) {
    return i(this, null, function* () {
      const t = yield this.mantleRequest({
        path: "hosted_sessions",
        method: "POST",
        body: e
      });
      return l(l({}, (t == null ? void 0 : t.session) || {}), (t == null ? void 0 : t.error) || { error: t.error });
    });
  }
};
const d = {
  Annual: "ANNUAL",
  Every30Days: "EVERY_30_DAYS"
}, se = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden"
}, f = {
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
}, _ = X(), z = ({ feature: e, count: t = 0 }) => (e == null ? void 0 : e.type) === "boolean" ? e.value : (e == null ? void 0 : e.type) === "limit" ? t < e.value || e.value === -1 : !1, oe = ({
  appId: e,
  customerApiToken: t,
  apiUrl: n = "https://appapi.heymantle.com/v1",
  children: o,
  i18n: u = f,
  waitForCustomer: h = !1,
  loadingComponent: m = null
}) => {
  const a = new Z({ appId: e, customerApiToken: t, apiUrl: n }), [r, p] = S(null), [b, v] = S(!0), g = async () => {
    try {
      v(!0);
      const s = await a.getCustomer();
      p(s);
    } catch (s) {
      console.error("[MantleProvider] Error fetching customer: ", s);
    } finally {
      v(!1);
    }
  }, M = async (s) => {
    await a.sendUsageEvent(s);
  }, R = async ({ usageId: s, period: c }) => await a.getUsageMetricReport({ id: s, period: c }), U = async ({
    planId: s,
    planIds: c,
    discountId: P,
    billingProvider: y,
    returnUrl: q,
    useSavedPaymentMethod: L = !1,
    trialDays: I,
    hosted: F = !0,
    collectionMethod: $ = "charge_automatically",
    daysUntilDue: N,
    paymentMethodTypes: Y = ["card"],
    automaticTax: j = !0,
    requireBillingAddress: B = !1,
    email: H,
    metadata: k
  }) => await a.subscribe({
    planId: s,
    planIds: c,
    discountId: P,
    billingProvider: y,
    returnUrl: q,
    useSavedPaymentMethod: L,
    trialDays: I,
    hosted: F,
    collectionMethod: $,
    daysUntilDue: N,
    paymentMethodTypes: Y,
    automaticTax: j,
    requireBillingAddress: B,
    email: H,
    metadata: k
  }), x = async ({ cancelReason: s } = {}) => await a.cancelSubscription({
    ...s && { cancelReason: s }
  }), A = async ({ returnUrl: s }) => await a.addPaymentMethod({ returnUrl: s }), T = async ({ type: s, config: c }) => {
    const y = new URL(document.location.toString()).searchParams.get("locale");
    return await a.createHostedSession({
      type: s,
      config: {
        ...y ? { locale: y } : {},
        ...c || {}
      }
    });
  };
  V(() => {
    t && g();
  }, [t]);
  const D = (r == null ? void 0 : r.plans) || [], O = r == null ? void 0 : r.subscription;
  return h && b ? m || "" : /* @__PURE__ */ G.createElement(
    _.Provider,
    {
      value: {
        client: a,
        customer: r,
        subscription: O,
        plans: D,
        loading: b,
        i18n: { ...f, ...u },
        sendUsageEvent: M,
        getUsageReport: R,
        subscribe: U,
        cancelSubscription: x,
        addPaymentMethod: A,
        createHostedSession: T,
        isFeatureEnabled: ({ featureKey: s, count: c = 0 }) => r != null && r.features[s] ? z({
          feature: r.features[s],
          count: c
        }) : !1,
        limitForFeature: ({ featureKey: s }) => r != null && r.features[s] && r.features[s].type === "limit" ? r.features[s].value : -1,
        refetch: async () => {
          await g();
        }
      }
    },
    o
  );
}, ae = () => {
  const e = J(_);
  if (e === void 0)
    throw new Error("useMantle must be used within a MantleProvider");
  return e;
}, E = (e) => e.type === "boolean" && e.value == !0 || e.type === "limit" && e.value !== 0, ie = (e, t) => E(t) - E(e) || e.name.localeCompare(t.name), ee = (e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e,
  notation: "standard"
}), le = (e, t = "USD", n = !0) => {
  let o = ee(t).format(e);
  return n && (o = o.replace(/\.00$/, "")), o;
}, te = (e = d.Every30Days) => {
  switch (e) {
    case d.Annual:
      return "year";
    case d.Every30Days:
    default:
      return "month";
  }
}, ne = (e = d.Every30Days) => {
  switch (e) {
    case d.Annual:
      return "yr";
    case d.Every30Days:
    default:
      return "mo";
  }
}, ue = ({
  interval: e = d.Every30Days,
  useShortFormPlanIntervals: t = !0
}) => t ? ne(e) : te(e), ce = ({ plan: e, customFieldKey: t = "recommended" }) => {
  var n;
  return !!((n = e.customFields) != null && n[t]);
}, de = ({ plan: e, customFieldKey: t = "buttonLabel" }) => {
  var n;
  return ((n = e.customFields) == null ? void 0 : n[t]) || f.SelectPlan;
}, pe = ({ plan: e }) => {
  var t;
  return ((t = e.discounts) == null ? void 0 : t.length) > 0 ? e.discounts.reduce(
    (n, o) => n.discountedAmount < o.discountedAmount ? n : o
  ) : void 0;
}, he = (e = 4) => e % 4 === 0 ? { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 } : e % 3 === 0 ? { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 } : e % 2 === 0 ? { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 } : e === 1 ? { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 } : { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }, me = (e = 4) => e % 4 === 0 ? 4 : e % 3 === 0 ? 3 : e % 2 === 0 ? 2 : e === 1 ? 1 : 4;
export {
  f as Labels,
  oe as MantleProvider,
  se as PlanAvailability,
  d as PlanInterval,
  me as columnCount,
  he as columnSpan,
  de as customButtonLabel,
  E as featureEnabled,
  ie as featureSort,
  pe as highestDiscount,
  ue as intervalLabel,
  te as intervalLabelLong,
  ne as intervalLabelShort,
  ce as isRecommendedPlan,
  le as money,
  ae as useMantle
};
