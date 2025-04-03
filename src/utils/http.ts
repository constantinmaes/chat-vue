import axios from 'axios'
import { useRouter } from 'vue-router'

const $http = axios.create()

$http.defaults.baseURL = import.meta.env.VITE_API_URL

$http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  // Si token, on le rajoute comme header Authorization
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  } else {
    // Si pas de token, on redirige l'utilisateur vers la page de login
    const router = useRouter()
    router.push({ name: 'login' })
    return Promise.reject(new Error('No token found'))
  }
  return config
})

$http.interceptors.response.use((response) => {
  if (response.status === 401) {
    const router = useRouter()
    router.push({ name: 'login' })
    return Promise.reject(new Error('No token found'))
  }
  return response
})

export { $http }

// import { $http } from '@/utils/http'
