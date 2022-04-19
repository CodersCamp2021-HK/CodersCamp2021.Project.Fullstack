import { PartnerLoginPage } from './pages/PartnerLoginPage';
import { PartnerRegisterPage } from './pages/PartnerRegisterPage';
import { UserLoginPage } from './pages/UserLoginPage';
import { UserRegisterPage } from './pages/UserRegisterPage';

export default {
  title: 'Pages/Register and Login Pages',
  Page: { PartnerRegisterPage, PartnerLoginPage, UserRegisterPage, UserLoginPage },
};

export const PartnerRegister = PartnerRegisterPage.bind({});
export const PartnerLogin = PartnerLoginPage.bind({});
export const UserRegister = UserRegisterPage.bind({});
export const UserLogin = UserLoginPage.bind({});
