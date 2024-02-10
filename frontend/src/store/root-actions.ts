import * as userActions from './user/user.action';
import { setPage, setLimit, setQuery } from './search/search.slice';

export const rootActions = {
  ...userActions,
  setPage,
  setLimit,
  setQuery,
};
