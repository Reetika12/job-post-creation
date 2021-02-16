import R from 'ramda'
import { createStore, applyMiddleware, compose } from 'redux'

import { createLogger } from 'redux-logger'
// import Config from '../Config/AppConfig'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { autoRehydrate } from 'redux-persist'
import Persistor from '../Services/PersistentService'
import ReduxPersist from '../Config/ReduxPersist'

// creates the store
// export default (rootReducer, rootSaga)
let reducerList = (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */

    const middleware = []
    const enhancers = []

    /* ------------- Saga Middleware ------------- */

    const sagaMonitor = null
    const sagaMiddleware = createSagaMiddleware({
        sagaMonitor, onError: function (error) {
            console.log('Error:', error)
            //window.Raven && window.Raven.captureException(error)
        }
    })
    middleware.push(sagaMiddleware)

    /* ------------- Logger Middleware ------------- */
    if (true) {
        // the logger master switch
        const USE_LOGGING = true
        const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']
        // silence these saga-based messages
        // create the logger
        const logger = createLogger({
            predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
        })
        if (logger) {
            middleware.push(logger)
        }
    }
    const history = createHistory()
    const routerReduxMiddleware = routerMiddleware(history)
    middleware.push(routerReduxMiddleware)
    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware))

    /* ------------- AutoRehydrate Enhancer ------------- */
    // add the autoRehydrate enhancer
    if (ReduxPersist.active) {
        enhancers.push(autoRehydrate())
    }

    // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
    const store = createStore(rootReducer, compose(...enhancers))

    // configure persistStore and check reducer version number
    if (ReduxPersist.active) {
        Persistor.updateReducers(store)
    }
    // kick off root saga
    sagaMiddleware.run(rootSaga)

    return store
}
 export default reducerList;

