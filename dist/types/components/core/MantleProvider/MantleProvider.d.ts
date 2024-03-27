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
     * - Subscribe to a new plan
     */
    subscribe: SubscribeCallback;
    /**
     * - Cancel the current subscription
     */
    cancelSubscription: CancelSubscriptionCallback;
    /**
     * - Generate a new client secret for customer's billing platform
     */
    requestClientSecret: RequestClientSecretCallback;
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
 * - Generates a new client secret for the customer's billing platform. Currently only used for Stripe Elements and Stripe Checkout.
 */
export type RequestClientSecretCallback = (params: {
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