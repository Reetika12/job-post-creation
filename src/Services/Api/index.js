import apisauce from 'apisauce'

const create = (baseURL = "http://localhost:3001/") => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 300000
  })

  api.addResponseTransform(response => {
    response.data = response.data || {}

    if (!response.ok && response.problem &&
      (response.problem === apisauce.TIMEOUT_ERROR ||
        response.problem === apisauce.NETWORK_ERROR ||
        response.problem === apisauce.CONNECTION_ERROR)) {
      let message = ''
      switch (response.problem) {
        case apisauce.TIMEOUT_ERROR:
          message = 'Internet connectivity is bad. Try again later'
          break
        case apisauce.NETWORK_ERROR:
          message = 'Please connect to network and try again later.'
          break
        case apisauce.CONNECTION_ERROR:
          message = 'connectionErrorMessage'
          break
        default: break
      }
      response.data = {
        code: -1,
        message: message
      }
    }
  })

  const loginUser = ({ params }) => {
    return api.get(`/auth/google/callback`, params)
  }
  const postUserDetails = ({ params }) => {
    let path = `http://localhost:3000/api/v1/users`
    let user={
      ...params
    }
    console.log("params++",params)
    return api.post(path, user)
  }
  const postLoginDetails = ({ params }) => {
    let path = `http://localhost:3000/api/v1/login/validate`
    let user={
      ...params
    }
    return api.post(path, params)
  }
  const getJobDetails = () => {
    let path = `http://localhost:3000/api/v1/jobs`
    return api.get(path)
  }
  return {
    setHeader: api.setHeader,
    loginUser,
    postUserDetails,
    postLoginDetails,
    getJobDetails
  }
}

export default {
  create
}