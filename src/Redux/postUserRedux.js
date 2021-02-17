// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  request: ['params'],
  success: ['params','data'],
  failure: ['params', 'error']
}, { prefix: "POST_USER_DETAILS_"})

export const INITIAL_STATE = Immutable({
  fetching:false,
  data: false,
  error: null
})

export const request = (state: Object) => {
  return state.merge({ fetching: true, error: null })
}

export const success = (state: Object, { data }: Object) => {
  return state.merge({ fetching: false, data, error: null })
}

export const failure = (state: Object, {error} : Object) => {
  return state.merge({ fetching: false, data: false, error })
}

export { Types, Creators }

export const key = "postUserDetail"

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
})
