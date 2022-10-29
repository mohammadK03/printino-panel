

export const state = () => ({

  acceptorInfo: {},
  acceptorUsername: null,
  acceptorphoneNumber: null,
  uid: null,
  userInfo: null,
  shopInfo:null,

})

export const mutations = {
 
  setacceptorInfo(state, value) {
    state.acceptorInfo = value

  },
  setAcceptorUsername(state, value) {
    state.acceptorUsername = value

  },
  setUserUid(state, value) {
    state.uid = value
  },
  setacceptorphoneNumber(state, value){
    state.acceptorphoneNumber=value
  },
  setUserInfo(state, value) {
    state.userInfo = value
  },
 
  setshop(state, value) {
    state.shopInfo = value
  },

}