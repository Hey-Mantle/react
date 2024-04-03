export function MantleProvider({ appId, customerApiToken, apiUrl, children, }: {
    appId: string;
    customerApiToken: string;
    apiUrl?: string;
    children: React.ReactNode;
}): React.JSX.Element;
export function useMantle(): TMantleContext;
export type Feature = import('@heymantle/client').Feature;
export type Customer = import('@heymantle/client').Customer;
export type Subscription = import('@heymantle/client').Subscription;
export type Plan = import('@heymantle/client').Plan;
export type UsageEvent = import('@heymantle/client').UsageEvent;
export type PaymentMethod = import('@heymantle/client').PaymentMethod;
export type SetupIntent = import('@heymantle/client').SetupIntent;
/**
 * - The MantleContext object, which encapsulates functionality exposed by `MantleProvider`
 */
export type TMantleContext = {
    /**
     * - The current customer
     */
    customer: Customer;
    /**
     * - The current subscription
     */
    subscription: Subscription;
    /**
     * - The available plans
     */
    plans: Array<Plan>;
    /**
     * - Whether the current customer is loading
     */
    loading: boolean;
    /**
     * - Refetch the current customer
     */
    refetch: RefetchCallback;
    /**
     * - Send a new usage event to Mantle
     */
    sendUsageEvent: SendUsageEventCallback;
    /**
     * - Get a usage report for a usage metric
     */
    getUsageReport: GetUsageReportCallback;
    /**
     * - Subscribe to a new plan
     */
    subscribe: SubscribeCallback;
    /**
     * - Cancel the current subscription
     */
    cancelSubscription: CancelSubscriptionCallback;
    /**
     * - Start the process of adding a new payment method using an external billing provider
     */
    addPaymentMethod: AddPaymentMethodCallback;
    /**
     * - Check if a feature is enabled
     */
    isFeatureEnabled: FeatureEnabledCallback;
    /**
     * - Get the limit for a feature
     */
    limitForFeature: FeatureLimitCallback;
};
/**
 * - Refetch the current customer, useful for updating the customer after a mutation
 */
export type RefetchCallback = () => Promise<void>;
/**
 * - Send a new usage event to Mantle
 */
export type SendUsageEventCallback = (usageEvent?: UsageEvent, usageEvents?: Array<UsageEvent>) => Promise<void>;
/**
 * - Get a usage report for a usage metric
 */
export type GetUsageReportCallback = (params: {
    usageId: string;
    period: string;
}) => Promise<any>;
/**
 * - Subscribes to a new plan
 */
export type SubscribeCallback = (params: {
    planId: string;
    planIds?: Array<string>;
    discountId?: string;
    billingProvider?: string;
    returnUrl?: string;
}) => Promise<Subscription>;
/**
 * - Cancels the current subscription for the authorized customer
 */
export type CancelSubscriptionCallback = () => Promise<Subscription>;
/**
 * Initial step to start the process of connecting a new payment method from an external billing provider.
 * For Stripe billing, this creates a `SetupIntent` which contains a `clientSecret`, which can be used to initialize
 * Stripe Elements or Stripe Checkout, which is necessary to collect payment method details to save for later use,
 * or complete checkout without an active `PaymentIntent`. Do not store this `clientSecret` or share it with anyone,
 * except for as part of the client-side payment method collection process.
 */
export type AddPaymentMethodCallback = (params: {
    returnUrl: string;
}) => Promise<SetupIntent>;
/**
 * - Check if a feature is enabled for the current customer
 */
export type FeatureEnabledCallback = (params: {
    featureKey: string;
    count?: number;
}) => boolean;
/**
 * - Get the limit for a feature for the current customer
 */
export type FeatureLimitCallback = (params: {
    featureKey: string;
}) => number;
import React from "react";
//# sourceMappingURL=MantleProvider.d.ts.map