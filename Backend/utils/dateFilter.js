export function dateFilter(filter, dataSet) {
  // Combine all filter logic into a single switch statement
  switch (filter) {
    case "day":
      return calculateData(dataSet, (element) => {
        const date = new Date(element.createdAt);
        return date.getDate() + '/' + (date.getMonth() + 1); // Month index starts at 0, adjust for user-friendliness
      });
    case "month":
      return calculateData(dataSet, (element) => {
        const date = new Date(element.createdAt);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[date.getMonth()];
      });
    case "year":
      return calculateData(dataSet, (element) => new Date(element.createdAt).getFullYear());
    default:
      // Handle invalid filter (optional)
      console.error("Invalid filter:", filter);
      return { labels: [], data: [] }; // Or throw an error
  }
}

// Reusable function to calculate data based on filter logic
function calculateData(dataSet, getDatePart) {
  const map = new Map();
  const labels = [];
  const data = [];

  dataSet.forEach((element) => {
    const key = getDatePart(element);
    map.set(key, (map.get(key) || 0) + 1); // Use short-circuiting for default value
  });

  // Generate labels and data based on map entries
  map.forEach((value, key) => {
    labels.push(key);
    data.push(value);
  });

  return { labels, data };
}
