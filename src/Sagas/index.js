import { takeLatest, all } from 'redux-saga/effects'
import CMSAPI from '../Services/Api'

import { Types as StartupTypes, Creators as StartupCreators } from '../Redux/StartupRedux'
import { Types as ActionPostUserDetailTypes, Creators as ActionPostUserDetailsCreators } from '../Redux/postUserRedux'
import { Types as ActionPostLoginDetailTypes, Creators as ActionPostLoginDetailCreators } from '../Redux/postLoginDetailsRedux'
import { Types as ActionPostJobDetailTypes, Creators as ActionPostJobDetailsCreators } from '../Redux/PostJobRedux'
import { Types as ActionGetJobDetailTypes, Creators as ActionGetJobDetailsCreators } from '../Redux/getJobDetailsRedux'

import { startupSaga } from './StartupSaga'

import { entitiesSaga } from './EntitiesSaga'

const api = CMSAPI.create()

export default function * root () {
    yield all([
        takeLatest(StartupTypes.STARTUP, startupSaga, StartupCreators, api),
        takeLatest(ActionPostUserDetailTypes.REQUEST, entitiesSaga, ActionPostUserDetailsCreators, api.postUserDetails),
        takeLatest(ActionPostLoginDetailTypes.REQUEST, entitiesSaga, ActionPostLoginDetailCreators, api.postLoginDetails),
        takeLatest(ActionGetJobDetailTypes.REQUEST, entitiesSaga, ActionGetJobDetailsCreators, api.getJobDetails),
        takeLatest(ActionPostJobDetailTypes.REQUEST, entitiesSaga, ActionPostJobDetailsCreators, api.postJobDetails)
    ])
}