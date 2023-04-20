import { render } from "@testing-library/angular";
import { ProductCardComponent } from "./product-card.component";
import { Product } from "../../services/product.service";

const dummyProduct: Product = {
  title: 'Shirt',
  image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  price: 22.3,
  id: 2,
  description: 'Lorem ipsum dolor sit amet',
  rating: {
    rate: 4.5,
    count: 22
  }
}

describe('product-card', () => {
  it('should render product-card', async () => {
    const productCard = await render(ProductCardComponent, {componentProperties: {product: dummyProduct}})
    expect(productCard).toBeTruthy();
  }),
  it('should render price as currency', async () => {
    const productCard = await render(ProductCardComponent, { componentProperties: { product: dummyProduct } })
    const priceText = productCard.queryByText('$22.30')
    expect(priceText).not.toBeNull()
  })
})