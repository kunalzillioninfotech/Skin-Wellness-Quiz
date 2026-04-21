export const getRecommendations = (products, userInput) => {
  const { skinType, concern, budget } = userInput;

  return products.filter((product) => {
    return (
      product.skin_type.toLowerCase() === skinType.toLowerCase() &&
      product.concern.toLowerCase() === concern.toLowerCase() &&
      product.budget === budget
    );
  });
};