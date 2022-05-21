const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  delivery: '/delivery',
  partnerLogin: '/partner/login',
  partnerRegister: '/partner/register',
  userLogin: '/user/login',
  userRegister: '/user/register',
  shoppingCart: '/shopping-cart/order-summary',
  shoppingCartData: '/shopping-cart/data-completion',
  shoppingCartPayment: '/shopping-cart/payment',
  order: '/order',
  main: '/main',
  registrationSuccess: '/registration-success',
  restaurantProfile: (id: string) => `/restaurants/${id}`,
} as const;

export { routes };
