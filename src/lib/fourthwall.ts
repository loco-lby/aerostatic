const FOURTHWALL_API_BASE = 'https://storefront-api.fourthwall.com';

function getFourthwallToken(): string {
  const token = process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN;
  if (!token) {
    throw new Error('Fourthwall storefront token not configured');
  }
  return token;
}

export interface FourthwallProduct {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  images: Array<{ url: string }>;
  variants: Array<{
    id: string;
    name: string;
    price: number; // in cents
    available: boolean;
  }>;
}

export interface FourthwallCollection {
  id: string;
  name: string;
  description?: string;
}

export interface CartItem {
  variantId: string;
  quantity: number;
}

export async function getCollections(): Promise<{ data: FourthwallCollection[] }> {
  try {
    const token = getFourthwallToken();
    const response = await fetch(`${FOURTHWALL_API_BASE}/v1/collections?storefront_token=${token}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
}

export async function getCollectionProducts(collectionId: string): Promise<{ data: FourthwallProduct[] }> {
  try {
    const token = getFourthwallToken();
    const response = await fetch(`${FOURTHWALL_API_BASE}/v1/collections/${collectionId}/products?storefront_token=${token}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching collection products:', error);
    throw error;
  }
}

export async function createCart(items: CartItem[]) {
  try {
    const token = getFourthwallToken();
    const response = await fetch(`${FOURTHWALL_API_BASE}/v1/carts?storefront_token=${token}&currency=USD`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cart creation failed:', response.status, errorText);
      throw new Error(`Failed to create cart: ${response.status} ${response.statusText}`);
    }

    const cart = await response.json();
    return cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function getCart(cartId: string) {
  try {
    const token = getFourthwallToken();
    const response = await fetch(`${FOURTHWALL_API_BASE}/v1/carts/${cartId}?storefront_token=${token}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

export async function getFourthwallProducts(): Promise<FourthwallProduct[]> {
  const storefrontToken = getFourthwallToken();
  
  if (!storefrontToken) {
    throw new Error('Fourthwall storefront token not configured');
  }

  try {
    // Use the "all" collection slug to fetch products
    const response = await fetch(
      `${FOURTHWALL_API_BASE}/v1/collections/all/products?storefront_token=${storefrontToken}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fourthwall products fetch failed:', errorText);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fourthwall products response:', data);
    
    // Return the products array from the results
    return data.results || [];
  } catch (error) {
    console.error('Error fetching Fourthwall products:', error);
    throw error;
  }
} 