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
})

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

  //Get
  banner: 'banner',
  allProdudts: 'allProducts',
  allCategories: 'allcategories',
  featureProduct: 'featuredProducts',
  bestSeller: 'BestSellers',
  trending: 'trendingproducts',
  dealsoftheday: 'deals-of-the-day',
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
};

export default ApiManager;
