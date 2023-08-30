import {
  ImageComponent,
  ApiStrapiCollection,
  AttributeSchema,
  AllWorkTypes,
  ApiStrapiType,
} from "./";

export type ApiProduct = ApiStrapiCollection<ProductType>;

export type ApiOrder = ApiStrapiCollection<OrderType>;

export type Cart = ApiStrapiCollection<CartType>;

interface ProductType extends AttributeSchema {
  available: boolean;
  images: ImageComponent[];
  name: string;
  description: string;
  pricePerSize: PricePerSize[];
  relatedWork: ApiStrapiType<AllWorkTypes>;
}

interface PricePerSize {
  id: number;
  size: string;
  price: number;
}

interface OrderType extends AttributeSchema {
  fullName: string;
  email: string;
  address: string;
  price: number;
  items: CartItem[];
  fulfilled: boolean;
  confirmationNumber: string;
}

interface CartType extends AttributeSchema {
  token: string;
  items: CartItem[];
}

interface CartItem {
  product: ApiStrapiType<ProductType>;
  qty: number;
}
