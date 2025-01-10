/**
 * Formats the given amount of money based on the specified currency code
 * @param amount - The amount of money to format
 * @param currencyCode - The currency code to use for formatting
 * @param removeCents - Whether to remove the cents from the formatted result
 * @returns The formatted money string
 *
 * @example
 * ```ts
 * money(1234.56) // "$1,234.56"
 * money(1234.56, "USD", true) // "$1,234"
 * money(1234.56, "EUR") // "€1,234.56"
 * ```
 */
export declare const money: (amount: number, currencyCode?: string, removeCents?: boolean) => string;
