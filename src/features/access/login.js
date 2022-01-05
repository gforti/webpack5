import {
  Router
} from 'services'

import login from './login.html'

const LoginCtrl = async (req, next) => {
  const routeDisplay = document.querySelector('.route-display')
  routeDisplay.innerHTML = login

  next()
}

Router
  .setPath('/login', LoginCtrl)
