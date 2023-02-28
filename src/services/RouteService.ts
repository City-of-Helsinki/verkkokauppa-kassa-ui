import authService from "../auth/authService";

const redirectToRouteWithAuthCheck = (history: any, orderId: string, pageRoute: string, language: string) => {
  if (authService.isAuthenticated()) {
    history.push(`/profile/${ orderId }${ pageRoute }?lang=${ language }`);
  } else {
    history.push(`/${ orderId }${ pageRoute }?lang=${ language }`);
  }
};

export const redirectToSummaryPage = (history: any, orderId: string, language: string) => {
  const pageRoute = `/summary`;
  redirectToRouteWithAuthCheck(history, orderId, pageRoute, language);
};

export const redirectToPaymentMethodPage = (history: any, orderId: string, language: string) => {
  const pageRoute = `/paymentmethod`;
  redirectToRouteWithAuthCheck(history, orderId, pageRoute, language);
};

export const redirectToReceiptPage = (history: any, orderId: string, language: string) => {
  const pageRoute = `/receipt`;
  redirectToRouteWithAuthCheck(history, orderId, pageRoute, language);
};

export const redirectToCustomerDetails = (history: any, orderId: string, language: string) => {
  const pageRoute = ``;
  redirectToRouteWithAuthCheck(history, orderId, pageRoute, language)
};

export const redirectToLoggedInSuccessPageIfAuthenticated = (history: any, orderId: string, language: string) => {

  if (authService.isAuthenticated()) {
    history.push(`/profile/${ orderId }/success`);
  }
};
