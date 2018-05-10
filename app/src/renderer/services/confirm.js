import Vue from 'vue'
import Dialog from '@/components/Dialog'

const defaultOptions = {
  text: '',
  title: '',
  persistent: false,
  maxWidth: '700px',
  type: 'confirm'
}

let dialogComp = null

function createDialogComp () {
  const comp = new Vue(Dialog)

  document.body.appendChild(comp.$mount().$el)

  return comp
}

function getDialogComp () {
  if (!dialogComp) {
    dialogComp = createDialogComp()
  }

  return dialogComp
}

function show (options = {}) {
  return new Promise((resolve, reject) => {
    let dialog = getDialogComp()
    dialog.show({
      ...defaultOptions,
      ...options
    })
    dialog.$on('canceled', function () {
      reject(new Error(true))
    })
    dialog.$on('accepted', function () {
      resolve(true)
    })
  })
}

function close () {
  getDialogComp().close()
}

export default {
  show,
  close,
  getDialogComp,
  defaultOptions
}
