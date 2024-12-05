import axios from 'axios';

const BASE_URL = 'https://ediotapi.reviewdevelopment.net/api/';

const constructApiRequest = (path, method, body) => ({
  url: path,
  method: method,
  data: body,
});

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

const request = {
  get: path => Axios(constructApiRequest(path, 'get')),
  post: (path, params) => Axios(constructApiRequest(path, 'post', params)),
  put: (path, params) => Axios(constructApiRequest(path, 'put', params)),
  delete: path => Axios(constructApiRequest(path, 'delete')),
};

const requestPath = {
  //Post
  userLogin: 'login',
  userSignup: 'signUp',
  forgotPassword: 'forgotpassword',
  // Post Profile
  profileEdit: 'profileEdit',
  //Post Review
  postReview: 'store',
  checkout: 'checkout',

  //OrderListing
  orderListing: 'myOrderListing',

  //Get Products
  banner: 'banner',
  allProdudts: 'allProducts',
  allCategories: 'getCategories',
  categoriesWiseProducts: 'subcategories',
  featureProduct: 'featuredProducts',
  bestSeller: 'BestSellers',
  trending: 'trendingproducts',
  dealsoftheday: 'deals-of-the-day',
  // Get User
  userData: 'getUser',
  // Get Product Review
  productReviews: 'index',

  similarProducts: 'getSimilarProducts',
};

const ApiManager = {
  // Post API
  userLogin: params => {
    return request.post(requestPath.userLogin, params);
  },

  userSignUp: params => {
    return request.post(requestPath.userSignup, params);
  },

  forgotPassword: params => {
    return request.post(requestPath.forgotPassword, params);
  },

  userData: params => {
    return request.post(requestPath.userData, params);
  },

  profileEdit: params => {
    return request.post(requestPath.profileEdit, params);
  },

  postProductReview: params => {
    return request.post(requestPath.postReview, params);
  },

  checkout: params => {
    return request.post(requestPath.checkout, params);
  },

  orderListing: params => {
    return request.post(requestPath.orderListing, params);
  },

  // Get API
  banner: () => {
    return request.get(requestPath.banner);
  },

  allProducts: () => {
    return request.get(requestPath.allProdudts);
  },

  allCategories: () => {
    return request.get(requestPath.allCategories);
  },

  featureProduct: () => {
    return request.get(requestPath.featureProduct);
  },

  bestSellerProducts: () => {
    return request.get(requestPath.bestSeller);
  },

  trendingProducts: () => {
    return request.get(requestPath.trending);
  },

  dealsofthedayProducts: () => {
    return request.get(requestPath.dealsoftheday);
  },

  getCategoriesWiseProducts: catID => {
    return request.get(`${requestPath.categoriesWiseProducts}/${catID}`);
  },

  getProductReviews: prodID => {
    return request.get(`${requestPath.productReviews}/${prodID}`);
  },

  getSimilarProducts: prodID => {
    return request.get(`${requestPath.similarProducts}/${prodID}`);
  },
};

export default ApiManager;
