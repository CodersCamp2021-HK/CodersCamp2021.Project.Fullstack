import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MediaCard } from '../components/MediaCard';

export default {
  title: 'MediaCard',
  component: MediaCard,
} as ComponentMeta<typeof MediaCard>;

const Template: ComponentStory<typeof MediaCard> = (args) => <MediaCard {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
