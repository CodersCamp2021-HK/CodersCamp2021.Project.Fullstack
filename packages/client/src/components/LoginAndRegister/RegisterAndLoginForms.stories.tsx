import { PartnerLoginForm as PartnerLoginFormComponent } from './PartnerLoginForm';
import { PartnerRegisterForm as PartnerRegisterFormComponent } from './PartnerRegisterForm';
import { UserLoginForm as UserLoginFormComponent } from './UserLoginForm';
import { UserRegisterForm as UserRegisterFormComponent } from './UserRegisterForm';

export default {
  title: 'Components/Register and Login Forms',
  component: {
    PartnerRegisterFormComponent,
    PartnerLoginFormComponent,
    UserRegisterFormComponent,
    UserLoginFormComponent,
  },
};

export const PartnerRegisterForm = PartnerRegisterFormComponent.bind({});
export const PartnerLoginForm = PartnerLoginFormComponent.bind({});
export const UserRegisterForm = UserRegisterFormComponent.bind({});
export const UserLoginForm = UserLoginFormComponent.bind({});
