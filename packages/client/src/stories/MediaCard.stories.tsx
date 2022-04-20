import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MediaCard } from './MediaCard';

export default {
  title: 'MediaCard',
  component: MediaCard,
} as ComponentMeta<typeof MediaCard>;

const Template: ComponentStory<typeof MediaCard> = () => <MediaCard />;
