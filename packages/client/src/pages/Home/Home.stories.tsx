import { Home as HomeComponent } from './Home';

export default {
  title: 'Pages/Home',
  component: HomeComponent,
};

export const Home = () => <HomeComponent />;
Home.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Cwxh4WHHLxBhhyxJQIgsI9/Project.Fullstack?node-id=327%3A5463',
  },
};
