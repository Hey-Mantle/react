import { Discount, Plan } from '@heymantle/client';

export declare enum PlanInterval {
    Annual = "ANNUAL",
    Every30Days = "EVERY_30_DAYS"
}
type IntervalLabelType = "year" | "month";
type IntervalLabelShortType = "yr" | "mo";
/**
 * Generate a long label for the given interval
 * @param interval - The interval to generate a label for
 * @returns The long label for the interval
 */
export declare const intervalLabelLong: (interval?: PlanInterval) => IntervalLabelType;
/**
 * Generate a short label for the given interval
 * @param interval - The interval to generate a label for
 * @returns The short label for the interval
 */
export declare const intervalLabelShort: (interval?: PlanInterval) => IntervalLabelShortType;
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
export declare const intervalLabel: ({ interval, useShortFormPlanIntervals, }: IntervalLabelParams) => IntervalLabelType | IntervalLabelShortType;
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
export declare const isRecommendedPlan: ({ plan, customFieldKey }: PlanParams) => boolean;
/**
 * Get the custom button label for the plan, or the default label
 * @param params.plan - The Mantle plan to check
 * @param params.customFieldKey - The key to check for the button label
 * @returns The custom button label or the default label
 */
export declare const customButtonLabel: ({ plan, customFieldKey }: PlanParams) => string;
/**
 * Get the best discount for the plan
 * @param params.plan - The Mantle plan to check for a discount
 * @returns The highest discount for the plan, or undefined if none found
 */
export declare const highestDiscount: ({ plan }: {
    plan: Plan;
}) => Discount | undefined;
export {};
