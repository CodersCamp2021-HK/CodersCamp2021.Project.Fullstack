import { DishDto } from '@fullstack/sdk/src';
import { Story } from '@storybook/react';

import cardImg from '../../assets/placeholder.png';
import { MediaCard as MediaCardComponent } from './MediaCard';

export default {
  title: 'Components/Media Card',
  component: MediaCardComponent,
  argTypes: {
    dish: { table: { disable: true } },
  },
};

const Template: Story<DishDto> = (args) => <MediaCardComponent dish={args} orderingEnabled />;

export const MediaCard = Template.bind({});
MediaCard.args = {
  name: 'Bowl japoński',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  photo: cardImg,
  price: 32,
  calories: { perPortion: 550, per100g: 0 },
  fats: { perPortion: 250, per100g: 0 },
  proteins: { perPortion: 20, per100g: 0 },
  carbohydrates: { perPortion: 20, per100g: 0 },
};
MediaCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Cwxh4WHHLxBhhyxJQIgsI9/Project.Fullstack?node-id=310%3A5136',
  },
};
