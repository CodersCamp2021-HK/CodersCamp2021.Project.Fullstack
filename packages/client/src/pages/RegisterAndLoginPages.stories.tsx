import { PartnerLogin as PartnerLoginComponent } from './PartnerLogin/PartnerLogin';
import { PartnerRegister as PartnerRegisterComponent } from './PartnerRegister/PartnerRegister';
import { UserLogin as UserLoginComponent } from './UserLogin/UserLogin';
import { UserRegister as UserRegisterComponent } from './UserRegister/UserRegister';

export default {
  title: 'Pages/Register and Login Pages',
  Page: { PartnerRegisterComponent, PartnerLoginComponent, UserRegisterComponent, UserLoginComponent },
};

export const PartnerRegister = PartnerRegisterComponent.bind({});
export const PartnerLogin = PartnerLoginComponent.bind({});
export const UserRegister = UserRegisterComponent.bind({});
export const UserLogin = UserLoginComponent.bind({});
