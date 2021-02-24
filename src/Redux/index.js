import createStore from './createStore'
import rootSaga from '../Sagas/'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import PostUserDetailsReducer, { key as PostUserDetailsKey } from './postUserRedux'
import PostLoginDetailsReducer, { key as PostLoginDetailsKey } from './postLoginDetailsRedux'

import StartupReducer, { key as StartupKey } from './StartupRedux'

export default () => {
  const appReducer = combineReducers({
    routing: routerReducer,
    [StartupKey]: StartupReducer,
    [PostUserDetailsKey]: PostUserDetailsReducer,
    [PostLoginDetailsKey]: PostLoginDetailsReducer
  })

  return createStore(appReducer, rootSaga)
}