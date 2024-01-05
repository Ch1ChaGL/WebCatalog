const BASE_URL = '/post';

export enum PostEndPoint {
  GET_POST_BY_ID = `${BASE_URL}/`,
  GET_ALL_POSTS = `${BASE_URL}/`,
  CREATE = `${BASE_URL}/create`,
  TOGGLE_BAN = `${BASE_URL}/toggleBan/`,
  UPDATE = `${BASE_URL}/update/`,
  DELETE = `${BASE_URL}/delete/`,
}
