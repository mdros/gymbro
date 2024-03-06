const OPEN_FOOD_API_URL = process.env.EXPO_PUBLIC_OPENFOODS_API_URL;

type ProductInfo = {
  name: string;
};

const getProductInfo = async (
  productCode: string
): Promise<ProductInfo | null> => {
  const url = OPEN_FOOD_API_URL + `/product/${productCode}?fields=product_name`;
  const response = await fetch(url);

  if (response.status !== 200) {
    return null;
  }

  const productData = await response.json();
  return {
    name: productData.product.product_name,
  };
};

export { getProductInfo };
