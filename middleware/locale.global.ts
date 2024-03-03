export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path === '/fr' || to.path === '/fr-fr') {
    return navigateTo('/')
  }
})
