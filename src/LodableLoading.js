import Loading from './Loading'
import React from 'react'

const LoadableLoading = (props) => {
  if (props.error) {
    return <div>Error! Sorry, there was a problem loading the page. Try refreshing?</div>
  } else if (props.pastDelay) {
    return <Loading center/>
  } else {
    return null
  }
}

export default LoadableLoading
