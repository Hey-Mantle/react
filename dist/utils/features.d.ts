import { Feature } from '@heymantle/client';

/**
 * Determines if a feature is enabled based on its type and value
 * @param feature - The feature to check
 * @returns true if the feature is enabled
 */
export declare const featureEnabled: (feature: Feature) => boolean;
/**
 * Sorts features by enabled status (enabled first) and then by name
 * @param a - First feature to compare
 * @param b - Second feature to compare
 * @returns Sort order (-1, 0, or 1)
 */
export declare const featureSort: (a: Feature, b: Feature) => number;
