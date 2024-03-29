const BASE_URL = '/favorites';

export enum FavoritesEndPoint {
  ADD_FAVORITES = `${BASE_URL}/add`,
  DELETE_FAVORITES = `${BASE_URL}/delete`,
  GET_FAVORITES_USER_POST = `${BASE_URL}/`,
  TOGGLE_FAVORITES = `${BASE_URL}/toggleFavorite`,
  IS_FAVORITES = `${BASE_URL}/isFavorites`,
}
