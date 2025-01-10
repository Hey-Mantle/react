import { Labels } from "./constants";
import type { Plan, Discount } from "@heymantle/client";

export enum PlanInterval {
  Annual = "ANNUAL",
  Every30Days = "EVERY_30_DAYS",
}

type IntervalLabelType = "year" | "month";
type IntervalLabelShortType = "yr" | "mo";

/**
 * Generate a long label for the given interval
 * @param interval - The interval to generate a label for
 * @returns The long label for the interval
 */
export const intervalLabelLong = (interval: PlanInterval = PlanInterval.Every30Days): IntervalLabelType => {
  switch (interval) {
    case PlanInterval.Annual:
      return "year";
    case PlanInterval.Every30Days:
    default:
      return "month";
  }
};

/**
 * Generate a short label for the given interval
 * @param interval - The interval to generate a label for
 * @returns The short label for the interval
 */
export const intervalLabelShort = (interval: PlanInterval = PlanInterval.Every30Days): IntervalLabelShortType => {
  switch (interval) {
    case PlanInterval.Annual:
      return "yr";
    case PlanInterval.Every30Days:
    default:
      return "mo";
  }
};

interface IntervalLabelParams {
  interval?: PlanInterval;
  useShortFormPlanIntervals?: boolean;
}

/**
 * Generate a label for the given interval and format
 * @param params.interval - The interval to generate a label for
 * @param params.useShortFormPlanIntervals - Whether to use short form plan intervals
 * @returns The label for the interval
 */
export const intervalLabel = ({
  interval = PlanInterval.Every30Days,
  useShortFormPlanIntervals = true,
}: IntervalLabelParams): IntervalLabelType | IntervalLabelShortType => {
  return useShortFormPlanIntervals ? intervalLabelShort(interval) : intervalLabelLong(interval);
};

interface PlanParams {
  plan: Plan;
  customFieldKey?: string;
}

/**
 * Check if the plan is recommended by using custom fields
 * @param params.plan - The Mantle plan to check
 * @param params.customFieldKey - The key to check for the recommended status
 * @returns Whether the plan is recommended
 */
export const isRecommendedPlan = ({ 
  plan, 
  customFieldKey = "recommended" 
}: PlanParams): boolean => {
  return !!plan.customFields?.[customFieldKey];
};

/**
 * Get the custom button label for the plan, or the default label
 * @param params.plan - The Mantle plan to check
 * @param params.customFieldKey - The key to check for the button label
 * @returns The custom button label or the default label
 */
export const customButtonLabel = ({ 
  plan, 
  customFieldKey = "buttonLabel" 
}: PlanParams): string => {
  return plan.customFields?.[customFieldKey] || Labels.subscribe;
};

/**
 * Get the best discount for the plan
 * @param params.plan - The Mantle plan to check for a discount
 * @returns The highest discount for the plan, or undefined if none found
 */
export const highestDiscount = ({ plan }: { plan: Plan }): Discount | undefined => {
  return plan.discounts?.length > 0
    ? plan.discounts.reduce((prev, current) =>
        prev.discountedAmount < current.discountedAmount ? prev : current
      )
    : undefined;
}; 