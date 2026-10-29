export function getTimelineStep(
  progress: number,
  markerPositions: readonly number[],
  height: number,
) {
  const reachedHeight = progress * height;
  return markerPositions.findLastIndex((position) => position <= reachedHeight);
}
