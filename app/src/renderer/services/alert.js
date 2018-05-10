import Vue from 'vue'
import Dialog from '@/components/Dialog'

const defaultOptions = {
  title: '',
  text: ''
}

let dialogCmp = null

function createDialogCmp () {
  const cmp = new Vue(Dialog)

  document.body.appendChild(cmp.$mount().$el)

  return cmp
}

function getDialogCmp () {
  if (!dialogCmp) {
    dialogCmp = createDialogCmp()
  }

  return dialogCmp
}

function show(options = {}) {
  getDialogCmp().show({ ...defaultOptions, ...options})
}