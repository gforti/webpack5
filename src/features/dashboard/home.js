import HTML from './home.html'

import {
  Router
} from 'services'

const HomeCtrl = async (req, next) => {
  const routeDisplay = document.querySelector('.route-display')
  routeDisplay.innerHTML = HTML

  next()
}

Router
  .setPath('/home', HomeCtrl)
