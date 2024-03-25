/// <reference types="@heymantle/client" />

import React, { createContext, useContext, useState, useEffect } from "react";
import { MantleClient } from "@heymantle/client";

/** @type {React.Context<TMantleContext>} */
const MantleContext = createContext();

/**
 * @param {Object} params
 * @param {Feature} params.feature - The feature to evaluate
 * @param {number} [params.count] - The count to evaluate the feature with if it is a limit
 * @returns {boolean} whether the feature is considered enabled
 */
const evaluateFeature = ({ feature, count = 0 }) => {
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
 * @param {Object} params
 * @param {string} params.appId - The Mantle App ID provided by Mantle
 * @param {string} params.customerApiToken - The Mantle Customer API Token returned by the `identify` endpoint
 * @param {string} [params.apiUrl] - The Mantle API URL to use
 * @param {React.ReactNode} params.children - The children to render
 */
export const MantleProvider = ({
  appId,
  customerApiToken,
  apiUrl = "https://appapi.heymantle.com/v1",
  children,
}) => {
  /**
   * @type {MantleClient}
   */
  const mantleClient = new MantleClient({ appId, customerApiToken, apiUrl });

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const sendUsageEvent = async (usageEvent) => {
    await mantleClient.sendUsageEvent(usageEvent);
  };

  /**
   * @type {SubscribeCallback}
  */
  const subscribe = async ({ planId, planIds, discountId, billingProvider, returnUrl }) => {
    return await mantleClient.subscribe({
      planId,
      planIds,
      discountId,
      billingProvider,
      returnUrl,
    });
  };


  /**
   * @type {CancelSubscriptionCallback}
   */
  const cancelSubscription = async () => {
    return await mantleClient.cancelSubscription();
  };

  useEffect(() => {
    if (customerApiToken) {
      fetchCustomer();
    }
  }, [customerApiToken]);

  const plans = customer?.plans || [];
  const subscription = customer?.subscription;

  return (
    <MantleContext.Provider
      value={{
        customer,
        subscription,
        plans,
        loading,
        sendUsageEvent,
        subscribe,
        cancelSubscription,
        isFeatureEnabled: ({ featureKey, count = 0 }) => {
          if (!!customer?.features[featureKey]) {
            return evaluateFeature({ feature: customer.features[featureKey], count });
          }
          return false;
        },
        limitForFeature: ({ featureKey }) => {
          if (customer?.features[featureKey] && currentPlan.features[featureKey].type === "limit") {
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
 * useMantle is a React hook that returns the current MantleContext
 * @returns {TMantleContext} the MantleContext
 */
export const useMantle = () => {
  const context = useContext(MantleContext);

  if (context === undefined) {
    throw new Error("useMantle must be used within a MantleProvider");
  }

  return context;
};

/**
 * @typedef {import('@heymantle/client').Feature} Feature
 * @typedef {import('@heymantle/client').Customer} Customer
 * @typedef {import('@heymantle/client').Subscription} Subscription
 * @typedef {import('@heymantle/client').Plan} Plan
 * @typedef {import('@heymantle/client').UsageEvent} UsageEvent
 */

/**
 * @typedef TMantleContext
 * @property {Customer} customer - The current customer
 * @property {Subscription} subscription - The current subscription
 * @property {Array.<Plan>} plans - The available plans
 * @property {boolean} loading - Whether the current customer is loading
 * @property {RefetchCallback} refetch - Refetch the current customer
 * @property {SendUsageEventCallback} sendUsageEvent - Send a new usage event to Mantle
 * @property {SubscribeCallback} subscribe - Subscribe to a new plan
 * @property {CancelSubscriptionCallback} cancelSubscription - Cancel the current subscription
 * @property {FeatureEnabledCallback} isFeatureEnabled - Check if a feature is enabled
 * @property {FeatureLimitCallback} limitForFeature - Get the limit for a feature
 */

/**
 * @callback RefetchCallback
 * @returns {Promise<void>} a promise that resolves when the customer is refetched
 */

/**
 * @callback SendUsageEventCallback
 * @param {UsageEvent} usageEvent - The usage event to send to Mantle
 * @returns {Promise<void>} a promise that resolves when the event is pushed
 */

/**
 * @callback SubscribeCallback
 * @param {Object} params
 * @param {string} params.planId - The ID of the plan to subscribe to
 * @param {Array.<string>} [params.planIds] - The IDs of the plans to subscribe to
 * @param {string} [params.discountId] - The ID of the discount to apply
 * @param {string} [params.billingProvider] - The billing provider to use
 * @param {string} [params.returnUrl] - The URL to return to after subscribing
 * @returns {Promise<Subscription>} a promise that resolves to the created subscription
 */

/**
 * @callback CancelSubscriptionCallback
 * @returns {Promise<Subscription>} a promise that resolves to the canceled subscription
 */

/**
 * @callback FeatureEnabledCallback
 * @param {Object} params
 * @param {string} params.featureKey - The key of the feature to evaluate
 * @param {number} [params.count] - The count to evaluate against the feature limit if there is one
 * @returns {boolean} whether the feature is enabled for this customer
 */

/**
 * @callback FeatureLimitCallback
 * @param {Object} params
 * @param {string} params.featureKey - The key of the feature to evaluate
 * @returns {number} the max limit for this feature, returns -1 if there is no limit
 */
