import { AppContainer } from "react-hot-loader";
import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux'
import createStore from './Redux'
import createHistory from 'history/createBrowserHistory'
import Routes from './Routes'
const history = createHistory()
const store = createStore()


const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </AppContainer>
    </Provider >
  )
}

export default App
