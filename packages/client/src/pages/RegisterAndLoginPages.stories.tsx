import { PartnerLoginPage } from './PartnerLoginPage';
import { PartnerRegisterPage } from './PartnerRegisterPage';
import { UserLoginPage } from './UserLoginPage';
import { UserRegisterPage } from './UserRegisterPage';

export default {
  title: 'Pages/Register and Login Pages',
  Page: { PartnerRegisterPage, PartnerLoginPage, UserRegisterPage, UserLoginPage },
};

export const PartnerRegister = PartnerRegisterPage.bind({});
export const PartnerLogin = PartnerLoginPage.bind({});
export const UserRegister = UserRegisterPage.bind({});
export const UserLogin = UserLoginPage.bind({});
