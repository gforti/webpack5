import '@johnsonandjohnson/mettle-components'
import 'components'
import './css/index.css'

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = `<span id="id-44629472-5691-4c53-b7f0-c5488854761b">
  Hover or tap me for tip
</span>
<mettle-tool-tip
  data-for="id-44629472-5691-4c53-b7f0-c5488854761b">
    <p>Slot HTML/Text</p>
</mettle-tool-tip>`

  return element;
}

document.body.appendChild(component());
