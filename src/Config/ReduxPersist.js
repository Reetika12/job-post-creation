import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { asyncLocalStorage } from 'redux-persist/storages'

// alias: { 'react-dom': '@hot-loader/react-dom'  }
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    storage: asyncLocalStorage,
    blacklist: ['startup'], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['users'],
    // persistence. An empty array means 'don't store any reducers'
    transforms: [
      immutablePersistenceTransform
   ]
  }
}

export default REDUX_PERSIST