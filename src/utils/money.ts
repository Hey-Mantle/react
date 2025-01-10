/**
 * Creates a number formatter for the specified currency
 * @param currencyCode - The currency code to format for
 * @returns An Intl.NumberFormat instance configured for the currency
 */
const moneyFormatter = (currencyCode: string = "USD"): Intl.NumberFormat =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    notation: "standard",
  });

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
export const money = (
  amount: number,
  currencyCode: string = "USD",
  removeCents: boolean = true
): string => {
  let result = moneyFormatter(currencyCode).format(amount);
  if (removeCents) {
    result = result.replace(/\.00$/, '');
  }
  return result;
}; 