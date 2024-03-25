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
     * - The current plan
     */
    currentPlan: Plan;
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
     * - Check if a feature is enabled
     */
    isFeatureEnabled: FeatureEnabledCallback;
    /**
     * - Get the limit for a feature
     */
    limitForFeature: FeatureLimitCallback;
    /**
     * - The Mantle client instance
     */
    mantleClient: MantleClient;
};
export type RefetchCallback = () => Promise<void>;
export type SendUsageEventCallback = (usageEvent: UsageEvent) => Promise<void>;
export type SubscribeCallback = (params: {
    planId: string;
    planIds?: Array<string>;
    discountId?: string;
    billingProvider?: string;
    returnUrl?: string;
}) => Promise<Subscription>;
export type CancelSubscriptionCallback = () => Promise<Subscription>;
export type FeatureEnabledCallback = (params: {
    featureKey: string;
    count?: number;
}) => boolean;
export type FeatureLimitCallback = (params: {
    featureKey: string;
}) => number;
import React from "react";
import { MantleClient } from "@heymantle/client";
//# sourceMappingURL=MantleProvider.d.ts.map