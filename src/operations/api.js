const baseAPI = 'http://localhost:4000/api/'

export const AUTH_API = {
    register_api:baseAPI+'register',
    login:baseAPI+'login',
    logout:baseAPI+'logout',
    changePassword:baseAPI+'change-password',
}

export const PROFILE_APIS = {
    PROFILE_DETAILS:baseAPI+'profile-details',
    PROFILE_UPDATE:baseAPI+'update-profile'
}
