const apiKey = '/api/todos'
const logErrors = error => console.log(error)

const pass = process.env.REACT_APP_PASS

const wrappedFetch = async (method, payload, id) => {
  let request = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(pass)}`
    },
    method,
  }

  request = payload ? {
    ...request,
    body: JSON.stringify(payload)
  } : request

  const requestPath = id ? `${apiKey}/${id}` : apiKey

  console.log('sending request', request)

  try {
    const response = await fetch(requestPath, request)
    return response.json()
  } catch (error) {
    logErrors(error)
  }
}
export default {
  getAll: async () => await wrappedFetch('GET'),
  create: async payload => await wrappedFetch('POST', payload),
  update: async payload => await wrappedFetch('PUT', payload),
  delete: async id => await wrappedFetch('DELETE', null, id)
}
