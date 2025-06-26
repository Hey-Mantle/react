import type {
  Customer,
  Feature,
  HostedSession,
  Notify,
  Plan,
  RequirePaymentMethodOptions,
  SetupIntent,
  Subscription,
  UsageEvent,
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
  /** Update a notification */
  updateNotification: UpdateNotificationCallback;
  /** Get the checklist */
  getChecklist: GetChecklistCallback;
  /** Complete a checklist step */
  completeChecklistStep: CompleteChecklistStepCallback;
}

/** Callback to send a new usage event to Mantle */
export type SendUsageEventCallback = (usageEvent: UsageEvent) => Promise<void>;

/** Callback to get a usage report for a usage metric */
export type GetUsageReportCallback = (params: {
  /** The ID of the usage metric to get a report for */
  usageId: string;
  /** The period to get the usage report for */
  period: string;
}) => Promise<any>;

/** Callback to get the checklist */
export type GetChecklistCallback = () => Promise<any>;

/** Callback to complete a checklist step */
export type CompleteChecklistStepCallback = (params: {
  /** The ID of the checklist */
  checklistId: string;
  /** The ID of the checklist step to complete */
  checklistStepId: string;
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
) => Promise<Subscription>;

/** Callback to cancel the current subscription */
export type CancelSubscriptionCallback = (params?: {
  /** The reason for canceling the subscription */
  cancelReason?: string;
}) => Promise<Subscription>;

/** Callback to start the process of adding a new payment method */
export type AddPaymentMethodCallback = (params: {
  /** The URL to return to after connecting a new PaymentMethod */
  returnUrl: string;
}) => Promise<SetupIntent>;

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
}) => Promise<HostedSession>;

/** Callback to list notifications */
export type ListNotificationsCallback = () => Promise<{
  notifies: Notify[];
  hasMore: boolean;
}>;

/** Callback to trigger a notification CTA */
export type TriggerNotificationCtaCallback = (params: {
  id: string;
}) => Promise<{ success: boolean }>;

/** Callback to update a notification */
export type UpdateNotificationCallback = (params: {
  id: string;
  readAt?: Date;
  dismissedAt?: Date;
}) => Promise<{ success: boolean }>;

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
      const customer = await mantleClient.getCustomer();
      setCustomer(customer);
    } catch (error) {
      console.error("[MantleProvider] Error fetching customer: ", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sends a usage event to Mantle
   * @param usageEvent - The usage event to send
   */
  const sendUsageEvent: SendUsageEventCallback = async (usageEvent) => {
    await mantleClient.sendUsageEvent(usageEvent);
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
    return await mantleClient.getUsageMetricReport({ id: usageId, period });
  };

  /**
   * Subscribes to one or more plans
   * @param params - Either SinglePlanSubscribe or MultiPlanSubscribe parameters
   * @returns The created subscription
   */
  const subscribe: SubscribeCallback = async (params) => {
    return await mantleClient.subscribe(params);
  };

  /**
   * Cancels the current subscription
   * @param params.cancelReason - Optional reason for cancellation
   * @returns The cancelled subscription
   */
  const cancelSubscription: CancelSubscriptionCallback = async ({
    cancelReason,
  } = {}) => {
    return await mantleClient.cancelSubscription({
      ...(cancelReason && { cancelReason }),
    });
  };

  /**
   * Initiates the process of adding a new payment method
   * @param params.returnUrl - The URL to return to after adding the payment method
   * @returns A SetupIntent for completing the payment method addition
   * @throws Error if returnUrl is not provided
   */
  const addPaymentMethod: AddPaymentMethodCallback = async ({ returnUrl }) => {
    if (!returnUrl) {
      throw new Error("returnUrl is required");
    }
    return await mantleClient.addPaymentMethod({ returnUrl });
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
    return await mantleClient.createHostedSession({
      type,
      config: {
        ...(locale ? { locale } : {}),
        ...(config || {}),
      },
    });
  };

  const listNotifications: ListNotificationsCallback = async () => {
    return await mantleClient.listNotifications();
  };

  const triggerNotificationCta: TriggerNotificationCtaCallback = async ({
    id,
  }) => {
    return await mantleClient.triggerNotificationCta({ id });
  };

  const updateNotification: UpdateNotificationCallback = async ({
    id,
    readAt,
    dismissedAt,
  }) => {
    return await mantleClient.updateNotification({ id, readAt, dismissedAt });
  };

  /**
   * Gets the checklist for the current customer
   * @returns The checklist data
   */
  const getChecklist: GetChecklistCallback = async () => {
    return await mantleClient.getChecklist();
  };

  /**
   * Completes a specific checklist step
   * @param params.checklistId - The ID of the checklist
   * @param params.checklistStepId - The ID of the checklist step to complete
   * @returns The completion result
   */
  const completeChecklistStep: CompleteChecklistStepCallback = async ({
    checklistId,
    checklistStepId,
  }) => {
    return await mantleClient.completeChecklistStep({ checklistId, checklistStepId });
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
        addPaymentMethod,
        createHostedSession,
        listNotifications,
        triggerNotificationCta,
        updateNotification,
        getChecklist,
        completeChecklistStep,
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
