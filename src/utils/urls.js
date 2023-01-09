import {
  BACKEND_URL
} from '../config';

// auth
export const LOGIN_URL = `${BACKEND_URL}/auth/login`;
export const REGISTER_URL = `${BACKEND_URL}/auth/register`;
export const LOGOUT_URL = `${BACKEND_URL}/auth/logout`;
export const USER_URL = `${BACKEND_URL}/auth/user`;
export const LOCATION_SEARCH_URL = `${BACKEND_URL}/globalfence/search`;
export const CLIMATE_URL = `${BACKEND_URL}/climate/getClimate`;
