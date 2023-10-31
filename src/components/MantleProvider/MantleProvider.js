/**
 * @typedef {import('./types').Feature} Feature
 * @typedef {import('./types').Customer} Customer
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { MantleClient } from "./MantleClient";

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
  const mantleClient = new MantleClient({ appId, customerApiToken, apiUrl });

  /**
   * @type {[Customer, React.Dispatch<React.SetStateAction<Customer>>, boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const customer = await mantleClient.getCustomer();
      setCustomer(customer);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const plans = customer?.plans || [];
  const subscription = customer?.subscription;
  const currentPlan = subscription?.plan || plans.find((plan) => plan.amount === 0 && plan.public);

  const ctx = {
    customer,
    subscription,
    currentPlan,
    plans,
    loading,
    subscribe: async ({ planId, returnUrl }) => {
      console.log(`[MantleProvider] subscribe: `, { planId, returnUrl });
      const result = await mantleClient.subscribe({ planId, returnUrl });
      console.log(`[MantleProvider] subscribe result: `, result);
      return result;
    },
    cancelSubscription: async () => {
      const result = await mantleClient.cancelSubscription();
      console.log(`[MantleProvider] cancel subscription result: `, result);
      return result;
    },
    sendUsageEvent: async ({ eventId = uuidv4(), eventName, properties }) => {
      const result = await mantleClient.sendUsageEvent({ eventId, eventName, properties });
      console.log(`[MantleProvider] send usage event result: `, result);
      return result;
    },
    hasFeature: ({ feature, count = 0 }) => {
      if (currentPlan?.features[feature]) {
        return evaluateFeature(currentPlan.features[feature], count);
      }
      return false;
    },
    featureLimit: ({ feature }) => {
      if (currentPlan?.features[feature] && currentPlan.features[feature].type === "limit") {
        return currentPlan.features[feature].value;
      }
      return -1;
    },
    requiredPlan: ({ feature, count = 0 }) => {
      return plans
        .sort((a, b) => a.amount - b.amount)
        .find((plan) => evaluateFeature(plan.features[feature], count));
    },
    refetch: async () => {
      await fetchCurrentCustomer();
    },
  };

  return <MantleContext.Provider value={ctx}>{children}</MantleContext.Provider>;
};

export const useMantle = () => {
  const context = useContext(MantleContext);

  if (context === undefined) {
    throw new Error("useMantle must be used within a MantleProvider");
  }

  return {
    subscription: context.subscription,
    currentPlan: context.currentPlan,
    plans: context.plans,
    customer: context.customer,
    isLoading: context.isLoading,
    subscribe: context.subscribe,
    cancelSubscription: context.cancelSubscription,
    sendUsageEvent: context.sendUsageEvent,
    hasFeature: context.hasFeature,
    featureLimit: context.featureLimit,
    requiredPlan: context.requiredPlan,
    refetch: context.refetch,
  };
};
