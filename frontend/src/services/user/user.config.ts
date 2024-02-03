const BASE_URL = '/users';

export enum UserEndPoint {
  GET_USERS = `${BASE_URL}/`,
  GET_USER_BY_ID = `${BASE_URL}/`,
  DELETE_USER_BY_ID = `${BASE_URL}/`,
  BUN_USER_TOGGLE = `${BASE_URL}/toggleBan/`,
  UPDATE_USER_PATCH = `${BASE_URL}/`,
}
