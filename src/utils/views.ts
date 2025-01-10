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
export const columnSpan = (count: number = 4): ColumnSpans => {
  if (count % 4 === 0) return { xs: 6, sm: 6, md: 2, lg: 3, xl: 3 };
  if (count % 3 === 0) return { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 };
  if (count % 2 === 0) return { xs: 6, sm: 6, md: 3, lg: 6, xl: 6 };
  if (count === 1) return { xs: 6, sm: 6, md: 6, lg: 12, xl: 12 };
  return { xs: 6, sm: 6, md: 2, lg: 4, xl: 4 };
};

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
export const columnCount = (size: number = 4): number => {
  if (size % 4 === 0) return 4;
  if (size % 3 === 0) return 3;
  if (size % 2 === 0) return 2;
  if (size === 1) return 1;
  return 4;
}; 