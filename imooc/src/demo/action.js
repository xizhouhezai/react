import * as Type from './common'

export function addGun() {
  return {type: Type.ADD_GUN}
}

export function removeGun() {
  return {type: Type.REMOVE_GUN}
}

export function login() {
  return {type: Type.LOGNIN}
}
export function logout() {
  return {type: Type.LOGNOUT}
}

export function userData(data) {
  return {type: Type.USER_DATA, payload: data}
}