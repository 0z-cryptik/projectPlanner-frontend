export const dueDateHandler = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffMilliseconds = dateObj.getTime() - now.getTime();

  if (diffMilliseconds <= 0) {
    return "past due";
  }

  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 2) {
    return `Due in ${diffDays} days`;
  } else if (diffDays === 1) {
    return "Due in a day";
  } else if (diffHours === 1) {
    return `Due in ${diffHours} hour`;
  } else if (diffHours > 1) {
    return `Due in ${diffHours} hours`;
  } else {
    return `Due in ${diffMinutes} minutes`;
  }
};
