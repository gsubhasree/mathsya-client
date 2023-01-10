import {
  BACKEND_URL
} from '../config';

// auth
export const LOGIN_URL = `${BACKEND_URL}/auth/login`;
export const REGISTER_URL = `${BACKEND_URL}/auth/register`;
export const LOGOUT_URL = `${BACKEND_URL}/auth/logout`;
export const USER_URL = `${BACKEND_URL}/auth/user`;

// Location
export const LOCATION_SEARCH_URL = `${BACKEND_URL}/globalfence/search`;
export const CLIMATE_URL = `${BACKEND_URL}/climate/getClimate`;
export const CLIMATE_WITH_COORDINATES_URL = `${BACKEND_URL}/climate/getCoordinateClimate`;

// Products
export const PRODUCTS_URL = `${BACKEND_URL}/product`;
export const GET_ALL_OWNED_PRODUCTS_URL = `${PRODUCTS_URL}/owned`;
export const GET_ALL_PRODUCTS_URL_IN_HISTORY = `${PRODUCTS_URL}/history`;
export const SELL_PRODUCT_URL = `${PRODUCTS_URL}/sell`;

// Auctions
export const AUCTIONS_URL = `${BACKEND_URL}/auction`;
export const BID_URL = `${AUCTIONS_URL}/bid`;

// Fish Prediction
export const PREDICT_FISH_URL = `${BACKEND_URL}/predictFish/predict`;
