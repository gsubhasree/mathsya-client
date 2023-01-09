import axios from 'axios';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  LOCATION_SEARCH_URL,
  CLIMATE_URL,
  PRODUCTS_URL,
  GET_ALL_OWNED_PRODUCTS_URL,
  GET_ALL_PRODUCTS_URL_IN_HISTORY,
  AUCTIONS_URL,
  BID_URL,
  SELL_PRODUCT_URL
} from './urls';

// withCredentials
const withCredentials = {
  withCredentials: true
};

// auth requests
export const loginRequest = ({ email, password }) => axios.post(
  LOGIN_URL,
  {
    email,
    password
  },
  withCredentials
);

export const registerRequest = ({
  email, name, password, role
}) => axios.post(
  REGISTER_URL,
  {
    email,
    password,
    name,
    role
  },
  withCredentials
);

export const logoutRequest = () => axios.get(LOGOUT_URL, withCredentials);

export const userRequest = () => axios.get(USER_URL, withCredentials);

export const locationRequest = (search) => axios.post(LOCATION_SEARCH_URL, {
  search
}, withCredentials);

export const climateRequest = (location) => axios.post(CLIMATE_URL, {
  location
}, withCredentials);
// products requests
export const createProduct = ({
  name, location, cost, quantity
}) => axios.post(
  PRODUCTS_URL,
  {
    name,
    location,
    cost,
    quantity
  },
  withCredentials
);

export const getAllOwnedProducts = () => axios.get(GET_ALL_OWNED_PRODUCTS_URL, withCredentials);

export const getAllProductsInHistory = () => axios.get(
  GET_ALL_PRODUCTS_URL_IN_HISTORY,
  withCredentials
);

export const getProductRequest = (id) => axios.get(`${PRODUCTS_URL}/${id}`, withCredentials);

export const sellProduct = ({ id, location, cost }) => axios.post(
  `${SELL_PRODUCT_URL}/${id}`,
  {
    location,
    cost
  },
  withCredentials
);

// Auctions requests
export const getAllProductsInAuction = () => axios.get(AUCTIONS_URL, withCredentials);
export const bidInAuction = ({ id, bidAmount, location }) => axios.post(
  `${BID_URL}/${id}`,
  {
    bidAmount,
    location
  },
  withCredentials
);

export const createAuction = ({ id, minPrice }) => axios.post(
  `${AUCTIONS_URL}/${id}`,
  {
    minPrice
  },
  withCredentials
);

export const closeAuction = (id) => axios.post(`${AUCTIONS_URL}/close/${id}`, withCredentials);
