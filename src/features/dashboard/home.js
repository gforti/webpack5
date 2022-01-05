import {
  Router
} from 'services'

import HTML from './home.html'

const HomeCtrl = async (req, next) => {
  const routeDisplay = document.querySelector('.route-display')
  routeDisplay.innerHTML = HTML

  next()
}

Router
  .setPath('/home', HomeCtrl)
