export function intervalLabelLong(interval?: "ANNUAL" | "EVERY_30_DAYS"): string;
export function intervalLabelShort(interval?: "ANNUAL" | "EVERY_30_DAYS"): string;
export function intervalLabel({ interval, useShortFormPlanIntervals, }: {
    interval: "ANNUAL" | "EVERY_30_DAYS";
    useShortFormPlanIntervals: boolean;
}): string;
export function isRecommendedPlan({ plan, customFieldKey }: {
    plan: import('@heymantle/client').Plan;
    customFieldKey: string;
}): boolean;
export function customButtonLabel({ plan, customFieldKey }: {
    plan: import('@heymantle/client').Plan;
    customFieldKey: string;
}): string;
export function highestDiscount({ plan }: {
    plan: import('@heymantle/client').Plan;
}): import('@heymantle/client').Discount;
//# sourceMappingURL=plans.d.ts.map