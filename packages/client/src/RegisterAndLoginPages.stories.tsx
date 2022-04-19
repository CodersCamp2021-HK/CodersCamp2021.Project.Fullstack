import { PartnerRegisterPage } from './pages/PartnerRegisterPage';
import { PartnerLoginPage } from './pages/PartnerLoginPage';
import { UserRegisterPage } from './pages/UserRegisterPage';
import { UserLoginPage } from './pages/UserLoginPage';


export default {
  title: 'Pages/Register and Login Pages',
  Page: {PartnerRegisterPage, PartnerLoginPage, UserRegisterPage, UserLoginPage},
};

export const PartnerRegister = PartnerRegisterPage.bind({});
export const PartnerLogin = PartnerLoginPage.bind({});
export const UserRegister = UserRegisterPage.bind({});
export const UserLogin = UserLoginPage.bind({});
