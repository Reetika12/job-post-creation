import { takeLatest, all } from 'redux-saga/effects'
import CMSAPI from '../Services/Api'

import { Types as StartupTypes, Creators as StartupCreators } from '../Redux/StartupRedux'
import { startupSaga } from './StartupSaga'

// import { entitiesSaga } from './EntitiesSaga'

const api = CMSAPI.create()

export default function * root () {
    yield all([
        takeLatest(StartupTypes.STARTUP, startupSaga, StartupCreators, api),

        //User - fetch Booking Details

 
    ])
}