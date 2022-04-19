import { PartnerRegisterForm as PartnerRegisterFormComponent } from './components/PartnerRegisterForm';
import { PartnerLoginForm as PartnerLoginFormComponent } from './components/PartnerLoginForm';
import { UserRegisterForm as UserRegisterFormComponent } from './components/UserRegisterForm';
import { UserLoginForm as UserLoginFormComponent } from './components/UserLoginForm';


export default {
  title: 'Components/Register and Login Forms',
  component: {PartnerRegisterFormComponent, PartnerLoginFormComponent, UserRegisterFormComponent, UserLoginFormComponent},
};

export const PartnerRegisterForm = PartnerRegisterFormComponent.bind({});
export const PartnerLoginForm = PartnerLoginFormComponent.bind({});
export const UserRegisterForm = UserRegisterFormComponent.bind({});
export const UserLoginForm = UserLoginFormComponent.bind({});
