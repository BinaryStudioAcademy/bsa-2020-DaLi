export const getButtonClasses = (type, currentContentView) => {
  return type === currentContentView
    ? 'view-visualization__switcher-item view-visualization__switcher-item--active'
    : 'view-visualization__switcher-item';
};
