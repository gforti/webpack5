if (!window.customElements.get('core-header')) {
  window.customElements.define('core-header', class extends window.HTMLElement {
    constructor() {
      super('')
      this.attachShadow({ mode: 'open' })
        .appendChild(this._generateTemplate().content.cloneNode(true))
    }

    _generateTemplate() {
      const template = document.createElement('template')
      template.innerHTML = `
      <div part="divider">
        <h1 part="title">
          <slot></slot>
        </h1>
      </div>
    `.trim()
    return template
    }

  })
}
