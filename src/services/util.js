import Debounce from './debounce.js'

class Util {

  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    if (bytes === 0) {
      return 'N/A'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }

  download({ filename, text, type = 'text/plain' }) {
    const dataForDownload = new Blob([text], { type })
    this.downloadBlob({
      blob: dataForDownload,
      filename
    })
  }

  downloadBlob({ filename, blob }) {
    const element = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    element.setAttribute('href', url)
    element.setAttribute('download', filename)
    element.setAttribute('hidden', 'hidden')
    element.click()
    window.URL.revokeObjectURL(url)
  }

  filterArrObjByKeys(keys, arr) {
    return arr.map(obj =>
      [...Object.entries(obj)].reduce((acc, [key, val]) =>
        keys.includes(key) ?
          { ...acc, [key]: val } : acc, {})
    )
  }

  getRandomNumberBetween(min = 0, max = 10) {
    return Math.floor(Math.random() * max) + min
  }

  hashCode(str = '') {
    return Array.from(str)
      .reduce((acc, cv) => Math.imul(31, acc) + cv.charCodeAt(0) | 0, 0)
  }

  /**
    * Adding a dom element(s) might not always be ready right away
    * checking the mutation of the parent node will ensure
    * you can select the element when it is registered by the browser
    */
  insertedDomReady(targetNode) {
    return new Promise(resolve => {
      const observerConfig = { attributes: false, characterData: false, characterDataOldValue: false, childList: true, subtree: false }
      const observer = new MutationObserver(Debounce(() => {
        observer.disconnect()
        resolve()
      }))
      observer.observe(targetNode, observerConfig)
    })
  }

  interpolate(template, params = {}) {
    const keys = Object.keys(params)
    const keyVals = Object.values(params).map(this.safeInnerHTML)
    return new Function(...keys, `return \`${template}\``)(...keyVals)
  }

  isFunction(f) {
    return typeof f === 'function'
  }

  parseJSON(string) {
    return new Promise((resolve, reject) => {
      try {
        const result = JSON.parse(string)
        resolve(result)
      } catch (jsonParseError) {
        reject(jsonParseError)
      }
    })
  }

  safeInnerHTML(html = '') {
    return String(html)
      .replace(/&(?=[^amp;|lt;|gt;|quot;|#])/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
  }

  stringToHTML(html = '') {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.innerHTML.toString()
  }

  stringifyJSON(string, indentation = 2) {
    return new Promise((resolve, reject) => {
      try {
        const stringified = JSON.stringify(string, undefined, indentation)
        resolve(stringified)
      } catch (error) {
        reject(error)
      }
    })
  }

  truncate(str, max = 30, suffix = '.') {
    return str.length > max ? str.slice(0, max).padEnd(max + 3, suffix) : str
  }

  uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, b =>
      (b ^ crypto.getRandomValues(new Uint16Array(1))[0] & 15 >> b / 4).toString(16))
  }

}

export default new Util()
