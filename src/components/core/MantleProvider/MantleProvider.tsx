import type {
  Affiliate,
  AffiliateMetrics,
  AffiliateProgram,
  AffiliateReferralRequest,
  Customer,
  Feature,
  HostedSession,
  InvoiceUrlResponse,
  ListAffiliateReferralRequestsResponse,
  ListAffiliateReferralsResponse,
  MantleError,
  Notify,
  Plan,
  ProrationBehaviorOptions,
  RequirePaymentMethodOptions,
  SetupIntent,
  Subscription,
  OneTimeCharge,
  SuccessResponse,
  UsageEvent,
  UsageMetricReport,
  GetAppInstallationsResponse,
} from "@heymantle/client";
import { MantleClient } from "@heymantle/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Labels } from "../../../utils/constants";

/** The main context interface that encapsulates functionality exposed by MantleProvider */
export interface TMantleContext {
  /** The MantleClient instance */
  client: MantleClient;
  /** The current customer */
  customer: Customer | null;
  /** The current subscription */
  subscription: Subscription | null;
  /** The available plans */
  plans: Plan[];
  /** Whether the current customer is loading */
  loading: boolean;
  /** Internationalization labels */
  i18n: typeof Labels;
  /** Refetch the current customer */
  refetch: () => Promise<void>;
  /** Send a new usage event to Mantle */
  sendUsageEvent: SendUsageEventCallback;
  /** Get a usage report for a usage metric */
  getUsageReport: GetUsageReportCallback;
  /** Subscribe to a new plan */
  subscribe: SubscribeCallback;
  /** Cancel the current subscription */
  cancelSubscription: CancelSubscriptionCallback;
  /** Create a one-time charge */
  createOneTimeCharge: CreateOneTimeChargeCallback;
  /** Start the process of adding a new payment method */
  addPaymentMethod: AddPaymentMethodCallback;
  /** Check if a feature is enabled */
  isFeatureEnabled: FeatureEnabledCallback;
  /** Get the limit for a feature */
  limitForFeature: FeatureLimitCallback;
  /** Create a hosted session */
  createHostedSession: HostedSessionCallback;
  /** Get a notifications */
  listNotifications: ListNotificationsCallback;
  /** Trigger a notification CTA */
  triggerNotificationCta: TriggerNotificationCtaCallback;
  /** Track a notification CTA */
  trackNotificationCta: TrackNotificationCtaCallback;
  /** Update a notification */
  updateNotification: UpdateNotificationCallback;
  /** Get the active checklist */
  getChecklist: GetChecklistCallback;
  /** Get all checklists */
  getChecklists: GetChecklistsCallback;
  /** Complete a checklist step */
  completeChecklistStep: CompleteChecklistStepCallback;
  /** Skip a checklist step */
  skipChecklistStep: SkipChecklistStepCallback;
  /** Mark a checklist as shown */
  showChecklist: ShowChecklistCallback;
  /** Get the hosted invoice URL for a specific invoice */
  getInvoiceUrl: GetInvoiceUrlCallback;
  /** Get app installations */
  getAppInstallations: GetAppInstallationsCallback;
  /** Get the affiliate program for the current app */
  getAffiliateProgram: GetAffiliateProgramCallback;
  /** Get the current customer's affiliate status */
  getAffiliate: GetAffiliateCallback;
  /** Enroll the current customer as an affiliate */
  enrollAffiliate: EnrollAffiliateCallback;
  /** Submit a referral attribution request */
  submitReferralRequest: SubmitReferralRequestCallback;
  /** Get the affiliate's confirmed referrals */
  getAffiliateReferrals: GetAffiliateReferralsCallback;
  /** Get the affiliate's referral attribution requests */
  getAffiliateReferralRequests: GetAffiliateReferralRequestsCallback;
  /** Get the affiliate's performance metrics */
  getAffiliateMetrics: GetAffiliateMetricsCallback;
}

/** Callback to send a new usage event to Mantle */
export type SendUsageEventCallback = (
  usageEvent: UsageEvent
) => Promise<SuccessResponse>;

/** Callback to get a usage report for a usage metric */
export type GetUsageReportCallback = (params: {
  /** The ID of the usage metric to get a report for */
  usageId: string;
  /** The period to get the usage report for */
  period: string;
}) => Promise<{ report: UsageMetricReport } | MantleError>;

/** Callback to get the checklist */
export type GetChecklistCallback = (handle: string) => Promise<any>;

/** Callback to show a checklist */
export type ShowChecklistCallback = (params: {
  /** The ID of the checklist to show */
  idOrHandle: string;
}) => Promise<any>;

/** Callback to get app installations */
export type GetAppInstallationsCallback = (params?: {
  /** The customer ID / Shopify domain, api token. Only required if using the API key for authentication instead of the customer API token */
  customerId?: string;
}) => Promise<GetAppInstallationsResponse | MantleError>;

/** Callback to get all checklists */
export type GetChecklistsCallback = (
  handles?: string[]
) => Promise<any[] | MantleError>;

/** Callback to complete a checklist step */
export type CompleteChecklistStepCallback = (params: {
  /** The ID of the checklist */
  idOrHandle: string;
  /** The ID of the checklist step to complete */
  stepIdOrHandle: string;
}) => Promise<any>;

/** Callback to skip a checklist step */
export type SkipChecklistStepCallback = (params: {
  idOrHandle: string;
  stepIdOrHandle: string;
}) => Promise<any>;

/** Common subscription parameters without the plan selection */
export type BaseSubscribeParams = {
  /** The ID of the discount to apply */
  discountId?: string;
  /** The billing provider to use */
  billingProvider?: string;
  /** The URL to return to after subscribing */
  returnUrl?: string;
  /** Whether to use the saved payment method for the customer. Defaults to true. */
  useSavedPaymentMethod?: boolean;
  /** The number of trial days to offer */
  trialDays?: number;
  /** (Stripe only) Whether to use Stripe checkout for the subscription. Not applicable for Shopify subscriptions as they are always hosted */
  hosted?: boolean;
  /** (Stripe only) The collection method to use for the subscription */
  collectionMethod?: string;
  /** (Stripe only) The number of days until the subscription is due */
  daysUntilDue?: number;
  /** (Stripe only) The payment method types to use for the subscription */
  paymentMethodTypes?: string[];
  /** (Stripe only) When to require a payment method for the subscription */
  requirePaymentMethod?: RequirePaymentMethodOptions;
  /** (Stripe only) Whether to automatically calculate tax for the subscription. Defaults to false. */
  automaticTax?: boolean;
  /** (Stripe only) The `proration_behavior` to use for the subscription */
  prorationBehavior?: ProrationBehaviorOptions;
  /** (Stripe checkout only) Tell the Stripe Checkout Session to require a billing address */
  requireBillingAddress?: boolean;
  /** (Stripe checkout only) Prefill the Stripe customer's email address */
  email?: string;
  /** (Stripe checkout only) Key-value pairs of metadata to attach to the subscription */
  metadata?: Record<string, string>;
};

/** Parameters for subscribing to a single plan */
export type SinglePlanSubscribe = BaseSubscribeParams & {
  /** The ID of the plan to subscribe to */
  planId: string;
  /** Not allowed when using planId */
  planIds?: never;
};

/** Parameters for subscribing to multiple plans */
export type MultiPlanSubscribe = BaseSubscribeParams & {
  /** Not allowed when using planIds */
  planId?: never;
  /** The IDs of the plans to subscribe to */
  planIds: string[];
};

/** Callback to subscribe to a new plan or plans */
export type SubscribeCallback = (
  params: SinglePlanSubscribe | MultiPlanSubscribe
) => Promise<Subscription | MantleError>;

/** Callback to cancel the current subscription */
export type CancelSubscriptionCallback = (params?: {
  /** The reason for canceling the subscription */
  cancelReason?: string;
}) => Promise<Subscription | MantleError>;

/** Callback to create a one-time charge */
export type CreateOneTimeChargeCallback = (params: {
  /** The amount to charge */
  amount: number;
  /** The name of the charge */
  name: string;
  /** The currency to charge in, defaults to USD */
  currencyCode?: string;
  /** The URL to return to after the charge, defaults to app root */
  returnUrl?: string;
  /** Whether to test the charge, defaults to false */
  test?: boolean;
}) => Promise<OneTimeCharge | MantleError>;

/** Callback to start the process of adding a new payment method */
export type AddPaymentMethodCallback = (params: {
  /** The URL to return to after connecting a new PaymentMethod */
  returnUrl: string;
  /** Whether to update payment methods that are already attached to existing subscriptions */
  updateExistingPaymentMethods?: boolean;
}) => Promise<SetupIntent | MantleError>;

/** Callback to check if a feature is enabled */
export type FeatureEnabledCallback = (params: {
  /** The key of the feature to evaluate */
  featureKey: string;
  /** The count to evaluate against the feature limit if there is one */
  count?: number;
}) => boolean;

/** Callback to get the limit for a feature */
export type FeatureLimitCallback = (params: {
  /** The key of the feature to evaluate */
  featureKey: string;
}) => number;

/** Callback to create a hosted session */
export type HostedSessionCallback = (params: {
  /** The type of hosted session to create */
  type: string;
  /** The configuration for the hosted session */
  config: Record<string, any>;
}) => Promise<HostedSession | MantleError>;

/** Callback to list notifications */
export type ListNotificationsCallback = (params?: {
  email?: string;
}) => Promise<
  | {
      notifies: Notify[];
      hasMore: boolean;
    }
  | MantleError
>;

/** Callback to trigger a notification CTA */
export type TriggerNotificationCtaCallback = (params: {
  id: string;
}) => Promise<SuccessResponse | MantleError>;

/** Callback to track a notification CTA */
export type TrackNotificationCtaCallback = (params: {
  /** The ID of the notification (Notify record) */
  id: string;
  /** The type of CTA interaction. Defaults to "trigger" */
  type?: "trigger" | "click";
}) => Promise<SuccessResponse | MantleError>;

/** Callback to update a notification */
export type UpdateNotificationCallback = (params: {
  id: string;
  readAt?: Date;
  dismissedAt?: Date;
}) => Promise<SuccessResponse | MantleError>;

/** Callback to get the affiliate program for the current app */
export type GetAffiliateProgramCallback = () => Promise<
  AffiliateProgram | MantleError
>;

/** Callback to get the current customer's affiliate status */
export type GetAffiliateCallback = () => Promise<
  Affiliate | null | MantleError
>;

/** Callback to enroll the current customer as an affiliate */
export type EnrollAffiliateCallback = (params?: {
  /** The name of the affiliate, defaults to the customer's name */
  name?: string;
  /** The email of the affiliate, defaults to the customer's email */
  email?: string;
  /** Whether the affiliate has agreed to the program terms */
  agreedToTerms?: boolean;
}) => Promise<Affiliate | MantleError>;

/** Callback to submit a referral attribution request */
export type SubmitReferralRequestCallback = (params: {
  /** The Shopify domain of the referred shop */
  shopDomain?: string;
  /** The name of the referred customer */
  customerName?: string;
  /** Notes about the referral */
  notes?: string;
  /** The date of the referral (ISO date string) */
  date?: string;
}) => Promise<AffiliateReferralRequest | MantleError>;

/** Callback to get the affiliate's confirmed referrals */
export type GetAffiliateReferralsCallback = (params?: {
  /** The page number, defaults to 0 */
  page?: number;
  /** The number of referrals per page, defaults to 25 */
  limit?: number;
  /** Sort field */
  sort?: "createdAt" | "date";
  /** Sort direction */
  sortDirection?: "asc" | "desc";
}) => Promise<ListAffiliateReferralsResponse | MantleError>;

/** Callback to get the affiliate's referral attribution requests */
export type GetAffiliateReferralRequestsCallback = (params?: {
  /** The page number, defaults to 0 */
  page?: number;
  /** The number of requests per page, defaults to 25 */
  limit?: number;
}) => Promise<ListAffiliateReferralRequestsResponse | MantleError>;

/** Callback to get the hosted invoice URL for a specific invoice */
export type GetInvoiceUrlCallback = (params: {
  /** The ID of the invoice */
  invoiceId: string;
}) => Promise<InvoiceUrlResponse | MantleError>;

/** Callback to get the affiliate's performance metrics */
export type GetAffiliateMetricsCallback = () => Promise<
  AffiliateMetrics | MantleError
>;

/** Props for the MantleProvider component */
export interface MantleProviderProps {
  /** The Mantle App ID provided by Mantle */
  appId: string;
  /** The Mantle Customer API Token returned by the identify endpoint */
  customerApiToken: string;
  /** The Mantle API URL to use */
  apiUrl?: string;
  /** The children to render */
  children: React.ReactNode;
  /** The i18n object to use for labels */
  i18n?: typeof Labels;
  /** Whether to wait for the customer to be fetched */
  waitForCustomer?: boolean;
  /** The component to render while waiting for the customer to be fetched */
  loadingComponent?: React.ReactNode;
  /** Whether to throw an error if an error occurs */
  throwOnError?: boolean;
}

/** React Context for providing Mantle functionality throughout the app */
const MantleContext = createContext<TMantleContext | undefined>(undefined);

/**
 * Evaluates whether a feature is enabled based on its type and value
 * @param feature - The feature to evaluate
 * @param count - The count to evaluate against if the feature is a limit type
 * @returns Whether the feature is considered enabled
 */
const evaluateFeature = ({
  feature,
  count = 0,
}: {
  feature: Feature;
  count?: number;
}): boolean => {
  if (feature?.type === "boolean") {
    return feature.value;
  } else if (feature?.type === "limit") {
    return count < feature.value || feature.value === -1;
  }
  return false;
};

/**
 * MantleProvider uses the React Context API to provide a MantleClient instance and
 * the current customer to its children, which can be accessed using the useMantle hook.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <MantleProvider
 *       appId="your-app-id"
 *       customerApiToken="customer-token"
 *     >
 *       <YourApp />
 *     </MantleProvider>
 *   );
 * }
 * ```
 */
export const MantleProvider: React.FC<MantleProviderProps> = ({
  appId,
  customerApiToken,
  apiUrl = "https://appapi.heymantle.com/v1",
  children,
  i18n = Labels,
  waitForCustomer = false,
  loadingComponent = null,
  throwOnError = false,
}) => {
  const mantleClient = new MantleClient({ appId, customerApiToken, apiUrl });

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the current customer from Mantle's API
   * Updates the customer state and handles loading states
   */
  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const result = await mantleClient.getCustomer();
      if (result && "error" in result) {
        throw new Error(result.error);
      }
      setCustomer(result as Customer);
    } catch (error) {
      if (throwOnError) {
        throw error;
      } else {
        console.error("[MantleProvider] Error fetching customer: ", error);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sends a usage event to Mantle
   * @param usageEvent - The usage event to send
   */
  const sendUsageEvent: SendUsageEventCallback = async (usageEvent) => {
    const result = await mantleClient.sendUsageEvent(usageEvent);
    if ("error" in result) {
      if (throwOnError) {
        throw new Error(result.error);
      }
      return {
        success: false,
      };
    }
    return result;
  };

  /**
   * Gets a usage report for a specific metric and period
   * @param params.usageId - The ID of the usage metric
   * @param params.period - The period to get the report for
   * @returns The usage report data
   */
  const getUsageReport: GetUsageReportCallback = async ({
    usageId,
    period,
  }) => {
    const result = await mantleClient.getUsageMetricReport({
      id: usageId,
      period,
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Subscribes to one or more plans
   * @param params - Either SinglePlanSubscribe or MultiPlanSubscribe parameters
   * @returns The created subscription
   */
  const subscribe: SubscribeCallback = async (params) => {
    const result = await mantleClient.subscribe(params);
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result as Subscription;
  };

  /**
   * Cancels the current subscription
   * @param params.cancelReason - Optional reason for cancellation
   * @returns The cancelled subscription
   */
  const cancelSubscription: CancelSubscriptionCallback = async ({
    cancelReason,
  } = {}) => {
    const result = await mantleClient.cancelSubscription({
      ...(cancelReason && { cancelReason }),
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Create a one-time charge
   * @param params.amount - The amount to charge
   * @param params.name - The name of the charge
   * @param params.currency - The currency to charge in
   * @returns The created charge
   */
  const createOneTimeCharge: CreateOneTimeChargeCallback = async ({
    amount,
    name,
    currencyCode,
    returnUrl,
    test,
  }) => {
    const result = await mantleClient.createOneTimeCharge({
      amount,
      name,
      currencyCode,
      returnUrl,
      test,
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Initiates the process of adding a new payment method
   * @param params.returnUrl - The URL to return to after adding the payment method
   * @param params.updateExistingPaymentMethods - Whether to update payment methods that are already attached to existing subscriptions
   * @returns A SetupIntent for completing the payment method addition
   * @throws Error if returnUrl is not provided
   */
  const addPaymentMethod: AddPaymentMethodCallback = async ({
    returnUrl,
    updateExistingPaymentMethods,
  }) => {
    if (!returnUrl) {
      throw new Error("returnUrl is required");
    }
    const result = await mantleClient.addPaymentMethod({
      returnUrl,
      updateExistingPaymentMethods,
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Creates a hosted session for various checkout flows
   * @param params.type - The type of hosted session to create
   * @param params.config - Configuration options for the hosted session
   * @returns The created hosted session
   * @throws Error if type is not provided
   */
  const createHostedSession: HostedSessionCallback = async ({
    type,
    config,
  }) => {
    if (!type) {
      throw new Error("type is required");
    }
    const searchParams = new URL(document.location.toString()).searchParams;
    const locale = searchParams.get("locale");
    const result = await mantleClient.createHostedSession({
      type,
      config: {
        ...(locale ? { locale } : {}),
        ...(config || {}),
      },
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  const listNotifications: ListNotificationsCallback = async (params) => {
    const result = await mantleClient.listNotifications(params);
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  const triggerNotificationCta: TriggerNotificationCtaCallback = async ({
    id,
  }) => {
    const result = await mantleClient.triggerNotificationCta({ id });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  const trackNotificationCta: TrackNotificationCtaCallback = async ({ id, type }) => {
    const result = await mantleClient.trackNotificationCta({ id, type });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  const updateNotification: UpdateNotificationCallback = async ({
    id,
    readAt,
    dismissedAt,
  }) => {
    const result = await mantleClient.updateNotification({
      id,
      readAt,
      dismissedAt,
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets the checklist for the current customer
   * @returns The checklist data
   */
  const getChecklist: GetChecklistCallback = async (handle) => {
    const result = await mantleClient.getChecklist(handle);
    if (result && "error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets all checklists for the current customer
   * @param handle - An optional handle filter for checklist(s) to get, can be a CSV list of handles.
   * @returns The checklist data
   */
  const getChecklists: GetChecklistsCallback = async (handle) => {
    const result = await mantleClient.getChecklists(handle);
    if (result && "error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Shows a checklist for the current customer
   * @param params.checklistId - The ID of the checklist to mark as shown
   * @returns The show result
   */
  const showChecklist: ShowChecklistCallback = async ({ idOrHandle }) => {
    const result = await mantleClient.showChecklist({ idOrHandle });
    if (result && "error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Skips a checklist step for the current customer
   * @param params.idOrHandle - The ID of the checklist
   * @param params.stepIdOrHandle - The ID of the checklist step to skip
   * @returns The skip result
   */
  const skipChecklistStep: SkipChecklistStepCallback = async ({
    idOrHandle,
    stepIdOrHandle,
  }) => {
    const result = await mantleClient.skipChecklistStep({
      idOrHandle,
      stepIdOrHandle,
    });
    if (result && "error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Completes a specific checklist step
   * @param params.idOrHandle - The ID of the checklist
   * @param params.stepIdOrHandle - The ID of the checklist step to complete
   * @returns The completion result
   */
  const completeChecklistStep: CompleteChecklistStepCallback = async ({
    idOrHandle,
    stepIdOrHandle,
  }) => {
    const result = await mantleClient.completeChecklistStep({
      idOrHandle,
      stepIdOrHandle,
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets the hosted invoice URL for a specific invoice
   * @param params.invoiceId - The ID of the invoice
   * @returns The invoice URL
   */
  const getInvoiceUrl: GetInvoiceUrlCallback = async ({ invoiceId }) => {
    const result = await mantleClient.getInvoiceUrl(invoiceId);
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Get the list of app installations for the customer
   * @param params.customerId - The customer ID / Shopify domain, api token. Only required if using the API key for authentication instead of the customer API token
   * @returns The list of app installations
   */
  const getAppInstallations: GetAppInstallationsCallback = async ({
    customerId,
  } = {}) => {
    const result = await mantleClient.getAppInstallations({
      ...(customerId && { customerId }),
    });
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets the affiliate program for the current app
   * @returns The affiliate program details
   */
  const getAffiliateProgram: GetAffiliateProgramCallback = async () => {
    const result = await mantleClient.getAffiliateProgram();
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets the current customer's affiliate status and enrollment
   * @returns The affiliate or null if not enrolled
   */
  const getAffiliate: GetAffiliateCallback = async () => {
    const result = await mantleClient.getAffiliate();
    if (result && "error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Enrolls the current customer as an affiliate in the program
   * @param params.name - The name of the affiliate
   * @param params.email - The email of the affiliate
   * @param params.agreedToTerms - Whether the affiliate has agreed to the program terms
   * @returns The enrolled affiliate
   */
  const enrollAffiliate: EnrollAffiliateCallback = async (params) => {
    const result = await mantleClient.enrollAffiliate(params);
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Submits a referral attribution request for approval
   * @param params.shopDomain - The Shopify domain of the referred shop
   * @param params.customerName - The name of the referred customer
   * @param params.notes - Notes about the referral
   * @param params.date - The date of the referral
   * @returns The created referral request
   */
  const submitReferralRequest: SubmitReferralRequestCallback = async (params) => {
    const result = await mantleClient.submitReferralRequest(params);
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets the affiliate's confirmed referrals
   * @param params.page - The page number
   * @param params.limit - The number of referrals per page
   * @param params.sort - Sort field
   * @param params.sortDirection - Sort direction
   * @returns The list of referrals
   */
  const getAffiliateReferrals: GetAffiliateReferralsCallback = async (params) => {
    const result = await mantleClient.getAffiliateReferrals(params);
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets the affiliate's referral attribution requests
   * @param params.page - The page number
   * @param params.limit - The number of requests per page
   * @returns The list of referral requests
   */
  const getAffiliateReferralRequests: GetAffiliateReferralRequestsCallback = async (params) => {
    const result = await mantleClient.getAffiliateReferralRequests(params);
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  /**
   * Gets the affiliate's performance metrics
   * @returns The affiliate's metrics
   */
  const getAffiliateMetrics: GetAffiliateMetricsCallback = async () => {
    const result = await mantleClient.getAffiliateMetrics();
    if ("error" in result && throwOnError) {
      throw new Error(result.error);
    }
    return result;
  };

  // Fetch customer when the token changes
  useEffect(() => {
    if (customerApiToken) {
      fetchCustomer();
    }
  }, [customerApiToken]);

  const plans = customer?.plans || [];
  const subscription = customer?.subscription || null;

  if (waitForCustomer && loading) {
    return loadingComponent || null;
  }

  return (
    <MantleContext.Provider
      value={{
        client: mantleClient,
        customer,
        subscription,
        plans,
        loading,
        i18n: { ...Labels, ...i18n },
        sendUsageEvent,
        getUsageReport,
        subscribe,
        cancelSubscription,
        createOneTimeCharge,
        addPaymentMethod,
        createHostedSession,
        listNotifications,
        triggerNotificationCta,
        trackNotificationCta,
        updateNotification,
        getChecklist,
        getChecklists,
        completeChecklistStep,
        showChecklist,
        skipChecklistStep,
        getInvoiceUrl,
        getAppInstallations,
        getAffiliateProgram,
        getAffiliate,
        enrollAffiliate,
        submitReferralRequest,
        getAffiliateReferrals,
        getAffiliateReferralRequests,
        getAffiliateMetrics,
        isFeatureEnabled: ({ featureKey, count = 0 }) => {
          if (customer?.features[featureKey]) {
            return evaluateFeature({
              feature: customer.features[featureKey],
              count,
            });
          }
          return false;
        },
        limitForFeature: ({ featureKey }) => {
          if (
            customer?.features[featureKey] &&
            customer.features[featureKey].type === "limit"
          ) {
            return customer.features[featureKey].value;
          }
          return -1;
        },
        refetch: async () => {
          await fetchCustomer();
        },
      }}
    >
      {children}
    </MantleContext.Provider>
  );
};

/**
 * React hook to access the Mantle context
 * Must be used within a MantleProvider component
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { customer, subscription } = useMantle();
 *   return <div>Hello {customer?.name}</div>;
 * }
 * ```
 *
 * @returns The Mantle context containing all Mantle functionality
 * @throws Error if used outside of a MantleProvider
 */
export const useMantle = (): TMantleContext => {
  const context = useContext(MantleContext);

  if (context === undefined) {
    throw new Error("useMantle must be used within a MantleProvider");
  }

  return context;
};
