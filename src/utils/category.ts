export function getCategoryName(category: string) {
  if (category === "iphone" || category === "ipad") {
    return category.charAt(0) + category.charAt(1).toUpperCase() + category.slice(2);
  }
  return category.split("-").join(" ");
}
