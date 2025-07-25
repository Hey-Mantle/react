import { Customer, HostedSession, MantleError, Notify, Plan, RequirePaymentMethodOptions, SetupIntent, Subscription, SuccessResponse, UsageEvent, UsageMetricReport, MantleClient } from '@heymantle/client';
import { default as React } from 'react';
import { Labels } from '../../../utils/constants';

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
export type SendUsageEventCallback = (usageEvent: UsageEvent) => Promise<SuccessResponse>;
/** Callback to get a usage report for a usage metric */
export type GetUsageReportCallback = (params: {
    /** The ID of the usage metric to get a report for */
    usageId: string;
    /** The period to get the usage report for */
    period: string;
}) => Promise<{
    report: UsageMetricReport;
} | MantleError>;
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
export type SubscribeCallback = (params: SinglePlanSubscribe | MultiPlanSubscribe) => Promise<Subscription | MantleError>;
/** Callback to cancel the current subscription */
export type CancelSubscriptionCallback = (params?: {
    /** The reason for canceling the subscription */
    cancelReason?: string;
}) => Promise<Subscription | MantleError>;
/** Callback to start the process of adding a new payment method */
export type AddPaymentMethodCallback = (params: {
    /** The URL to return to after connecting a new PaymentMethod */
    returnUrl: string;
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
}) => Promise<{
    notifies: Notify[];
    hasMore: boolean;
} | MantleError>;
/** Callback to trigger a notification CTA */
export type TriggerNotificationCtaCallback = (params: {
    id: string;
}) => Promise<SuccessResponse | MantleError>;
/** Callback to update a notification */
export type UpdateNotificationCallback = (params: {
    id: string;
    readAt?: Date;
    dismissedAt?: Date;
}) => Promise<SuccessResponse | MantleError>;
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
export declare const MantleProvider: React.FC<MantleProviderProps>;
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
export declare const useMantle: () => TMantleContext;
