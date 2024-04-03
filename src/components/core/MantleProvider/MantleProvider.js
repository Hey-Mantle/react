/// <reference types="@heymantle/client" />

import { MantleClient } from "@heymantle/client";
import React, { createContext, useContext, useState, useEffect } from "react";

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

  /**
   * @type {SendUsageEventCallback}
   */
  const sendUsageEvent = async (usageEvent) => {
    await mantleClient.sendUsageEvent(usageEvent);
  };

  /**
   * @type {GetUsageReportCallback}
  */
  const getUsageReport = async ({ usageId, period }) => {
    return await mantleClient.getUsageMetricReport({ id: usageId, period });
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

  /**
   * @type {AddPaymentMethodCallback}
   */
  const addPaymentMethod = async ({ returnUrl }) => {
    return await mantleClient.addPaymentMethod({ returnUrl });
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
        getUsageReport,
        subscribe,
        cancelSubscription,
        addPaymentMethod,
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
 * @typedef {import('@heymantle/client').PaymentMethod} PaymentMethod
 * @typedef {import('@heymantle/client').SetupIntent} SetupIntent
 */

/**
 * @typedef TMantleContext - The MantleContext object, which encapsulates functionality exposed by `MantleProvider`
 * @property {Customer} customer - The current customer
 * @property {Subscription} subscription - The current subscription
 * @property {Array.<Plan>} plans - The available plans
 * @property {boolean} loading - Whether the current customer is loading
 * @property {RefetchCallback} refetch - Refetch the current customer
 * @property {SendUsageEventCallback} sendUsageEvent - Send a new usage event to Mantle
 * @property {GetUsageReportCallback} getUsageReport - Get a usage report for a usage metric
 * @property {SubscribeCallback} subscribe - Subscribe to a new plan
 * @property {CancelSubscriptionCallback} cancelSubscription - Cancel the current subscription
 * @property {AddPaymentMethodCallback} addPaymentMethod - Start the process of adding a new payment method using an external billing provider
 * @property {FeatureEnabledCallback} isFeatureEnabled - Check if a feature is enabled
 * @property {FeatureLimitCallback} limitForFeature - Get the limit for a feature
 */

/**
 * @callback RefetchCallback - Refetch the current customer, useful for updating the customer after a mutation
 * @returns {Promise<void>} a promise that resolves when the customer fetch has completed
 */

/**
 * @callback SendUsageEventCallback - Send a new usage event to Mantle
 * @param {UsageEvent} [usageEvent] - The usage event to send to Mantle
 * @param {Array.<UsageEvent>} [usageEvents] - An array of usage events to send to Mantle at once
 * @returns {Promise<void>} a promise that resolves when the event is successfully sent
 */

/**
 * @callback GetUsageReportCallback - Get a usage report for a usage metric
 * @param {Object} params
 * @param {string} params.usageId - The ID of the usage metric to get a report for
 * @param {string} params.period - The period to get the usage report for
 * @returns {Promise<Object>} a promise that resolves to the usage report
 */

/**
 * @callback SubscribeCallback - Subscribes to a new plan
 * @param {Object} params
 * @param {string} params.planId - The ID of the plan to subscribe to
 * @param {Array.<string>} [params.planIds] - The IDs of the plans to subscribe to
 * @param {string} [params.discountId] - The ID of the discount to apply
 * @param {string} [params.billingProvider] - The billing provider to use
 * @param {string} [params.returnUrl] - The URL to return to after subscribing
 * @returns {Promise<Subscription>} a promise that resolves to the created subscription
 */

/**
 * @callback CancelSubscriptionCallback - Cancels the current subscription for the authorized customer
 * @returns {Promise<Subscription>} a promise that resolves to the canceled subscription
 */

/**
 * @callback AddPaymentMethodCallback Initial step to start the process of connecting a new payment method from an external billing provider.
 * For Stripe billing, this creates a `SetupIntent` which contains a `clientSecret`, which can be used to initialize
 * Stripe Elements or Stripe Checkout, which is necessary to collect payment method details to save for later use,
 * or complete checkout without an active `PaymentIntent`. Do not store this `clientSecret` or share it with anyone,
 * except for as part of the client-side payment method collection process.
 * @param {Object} params
 * @param {string} params.returnUrl - The URL to return to after connecting a new `PaymentMethod` or completing the checkout process
 * @returns {Promise<SetupIntent>} a promise that resolves to a created SetupIntent with `clientSecret`
 */

/**
 * @callback FeatureEnabledCallback - Check if a feature is enabled for the current customer
 * @param {Object} params
 * @param {string} params.featureKey - The key of the feature to evaluate
 * @param {number} [params.count] - The count to evaluate against the feature limit if there is one
 * @returns {boolean} whether the feature is enabled for this customer
 */

/**
 * @callback FeatureLimitCallback - Get the limit for a feature for the current customer
 * @param {Object} params
 * @param {string} params.featureKey - The key of the feature to evaluate
 * @returns {number} the max limit for this feature, returns -1 if there is no limit
 */
