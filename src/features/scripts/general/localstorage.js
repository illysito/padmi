function localstorage() {
  const STORAGE_KEY = 'formState'

  function saveFormState(key, value) {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    state[key] = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  function getFormState(key) {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    return state[key]
  }

  function clearFormState(key) {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    delete state[key]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  const checkbox = document.querySelector('#myCheckbox')
  const isChecked = getFormState('checkboxAccepted')
  if (isChecked) {
    checkbox.checked = true
  }
}

export default localstorage
