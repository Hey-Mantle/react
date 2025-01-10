interface ColumnSpans {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}
/**
 * Get the column span for the grid layout
 * @param count - The number of columns
 * @returns The column span for each screen size
 *
 * @example
 * ```ts
 * columnSpan(4) // { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 }
 * columnSpan(3) // { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }
 * ```
 */
export declare const columnSpan: (count?: number) => ColumnSpans;
/**
 * Get the column count for the grid layout
 * @param size - The number of items
 * @returns The number of columns
 *
 * @example
 * ```ts
 * columnCount(4) // 4
 * columnCount(3) // 3
 * columnCount(2) // 2
 * ```
 */
export declare const columnCount: (size?: number) => number;
export {};
