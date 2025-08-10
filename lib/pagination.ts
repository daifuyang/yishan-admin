export function getPaginationRange(
  current: number,
  total: number,
  siblingCount = 1
) {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= total) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const shouldShowLeftDots = leftSibling > 2;
  const shouldShowRightDots = rightSibling < total - 2;

  const firstPageIndex = 1;
  const lastPageIndex = total;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', lastPageIndex];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => total - rightItemCount + i + 1
    );
    return [firstPageIndex, '...', ...rightRange];
  }

  return [
    firstPageIndex,
    '...',
    ...Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, i) => leftSibling + i
    ),
    '...',
    lastPageIndex,
  ];
}