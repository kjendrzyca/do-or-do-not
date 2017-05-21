const apiKey = '/api/todos'

const logErrors = error => console.log(error)

const wrappedFetch = async (method, payload, id) => {
  let request = {
    'Content-Type': 'application/json',
    method,
  }

  request = payload ? {
    ...request,
    payload
  } : request

  const requestPath = id ? `${apiKey}/${id}` : apiKey

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
