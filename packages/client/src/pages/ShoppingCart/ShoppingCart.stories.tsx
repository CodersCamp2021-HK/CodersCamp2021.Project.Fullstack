import { ShoppingCart as ShoppingCartComponent } from './ShoppingCart';

export default {
  title: 'Pages/Shopping Cart',
  component: ShoppingCartComponent,
};

export const ShoppingCart = () => <ShoppingCartComponent />;
ShoppingCart.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Cwxh4WHHLxBhhyxJQIgsI9/Project.Fullstack?node-id=247%3A1691',
  },
};
