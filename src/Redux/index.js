import createStore from './createStore'
import rootSaga from '../Sagas/'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import StartupReducer, { key as StartupKey } from './StartupRedux'
// import UserReducer, { key as UserKey } from './UserRedux'
// export default
let reduxList = () => {
  const appReducer = combineReducers({
    routing: routerReducer,
    [StartupKey]: StartupReducer,
    // [UserKey]: UserReducer
  })

  return createStore(appReducer, rootSaga)
}
export default reduxList;