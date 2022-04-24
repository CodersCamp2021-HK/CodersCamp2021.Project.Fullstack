import cardImg from '../../assets/default.png';
import { SideCartItem as SideCartItemComponent } from './SideCartItem';

export default {
  title: 'SideCartItem',
  component: SideCartItemComponent,
};

export const SideCartItem = () => (
  <SideCartItemComponent
    dish={{
      name: 'Bowl japoński',
      photo: cardImg,
      price: 32,
      calories: { perPortion: 550, per100g: 0 },
      fats: { perPortion: 250, per100g: 0 },
      proteins: { perPortion: 20, per100g: 0 },
      carbohydrates: { perPortion: 20, per100g: 0 },
    }}
  />
);
