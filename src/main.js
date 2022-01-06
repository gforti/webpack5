import '@johnsonandjohnson/mettle-components'
import 'components'
import 'features'
import './css/index.css'

import {
  Router
} from  'services'

Router.defaultPath('login/')

const $elems = Array.from(document.querySelectorAll('nav a[rel]'))
$elems.map(a => {
  a.addEventListener('click', evt => {
    evt.preventDefault()
    Router.goto(a.getAttribute('rel'), a.getAttribute('title'))
  })
})

function component() {
  const element = document.createElement('div')

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = `<span id="id-44629472-5691-4c53-b7f0-c5488854761b">
  Hover or tap me for tip
</span>
<mettle-tool-tip
  data-for="id-44629472-5691-4c53-b7f0-c5488854761b">
    <p>Slot HTML/Text</p>
</mettle-tool-tip>`

  return element
}

document.body.appendChild(component())
