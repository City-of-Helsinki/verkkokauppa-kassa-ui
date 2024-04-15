import authService from "../auth/authService";

const redirectToRouteWithAuthCheck = (history: any, orderId: string, pageRoute: string, language: string, queryParams: URLSearchParams = new URLSearchParams()) => {

  const queryString = queryParams.toString();

  if (authService.isAuthenticated()) {
    // Directly append the queryString to the existing query parameters, using '&' if queryString is not empty
    history.push(`/profile/${orderId}${pageRoute}?lang=${language}${queryString ? '&' + queryString : ''}`);
  } else {
    // For non-authenticated users, do not include profile in the path
    history.push(`/${orderId}${pageRoute}?lang=${language}${queryString ? '&' + queryString : ''}`);
  }
};

export const redirectToSummaryPage = (history: any, orderId: string, language: string) => {
  const pageRoute = `/summary`;
  redirectToRouteWithAuthCheck(history, orderId, pageRoute, language);
};

export const redirectToInvoicePage = (history: any, orderId: string, language: string, businessId: string) => {
  const pageRoute = `/invoice`;
  // Create an instance of URLSearchParams
  const queryParams = new URLSearchParams();
  // Append businessId as a query parameter
  queryParams.append('businessId', businessId);

  // Now pass this URLSearchParams instance as the queryParams argument to the redirectToRouteWithAuthCheck function
  redirectToRouteWithAuthCheck(history, orderId, pageRoute, language, queryParams);
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
