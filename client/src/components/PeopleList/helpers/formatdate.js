export const formatDate = (dateStr) => {
  const MS_IN_MINUTE = 60000;
  const MIN_IN_HOUR = 60;
  const now = new Date();

  if (!dateStr) {
    return 'Never';
  }
  const date = new Date(dateStr);
  const diffMinutes = Math.round((now - date) / MS_IN_MINUTE);
  if (diffMinutes < MIN_IN_HOUR) {
    return `${diffMinutes} min. ago`;
  }
  const diffHours = Math.round(diffMinutes / MIN_IN_HOUR);
  return `${diffHours} hrs. ago`;
};
