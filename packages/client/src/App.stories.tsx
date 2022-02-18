import { ComponentMeta, Story } from '@storybook/react';

import { App } from './App';

export default {
  title: 'App',
  component: App,
} as ComponentMeta<typeof App>;

const Template: Story<void> = () => <App />;

export const Playground = Template.bind({});
Playground.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FTTr77tXuZd1MeQ90wl4VEk%2FProject.React%3Fnode-id%3D72%253A1090',
  },
};
