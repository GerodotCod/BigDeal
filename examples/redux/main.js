import { compose, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import BigDeal from '@BigDeal/core'
import ReduxStore from '@BigDeal/store-redux'
import * as BigDealReduxStore from '@BigDeal/store-redux'
import Dashboard from '@BigDeal/dashboard'
import Tus from '@BigDeal/tus'

import '@BigDeal/core/dist/style.css'
import '@BigDeal/dashboard/dist/style.css'

function counter (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({
  counter,
  // You don't have to use the `BigDeal` key. But if you don't,
  // you need to provide a custom `selector` to the `BigDealReduxStore` call below.
  BigDeal: BigDealReduxStore.reducer,
})

let enhancer = applyMiddleware(
  BigDealReduxStore.middleware(),
  logger,
)
if (typeof __REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
  // eslint-disable-next-line no-undef
  enhancer = compose(enhancer, __REDUX_DEVTOOLS_EXTENSION__())
}

const store = configureStore({
  reducer,
  enhancers: [enhancer],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [BigDealReduxStore.STATE_UPDATE],
      ignoreState: true,
    },
  }),
})

// Counter example from https://github.com/reactjs/redux/blob/master/examples/counter-vanilla/index.html
const valueEl = document.querySelector('#value')

function getCounter () { return store.getState().counter }
function render () {
  valueEl.innerHTML = getCounter().toString()
}
render()
store.subscribe(render)

document.querySelector('#increment').onclick = () => {
  store.dispatch({ type: 'INCREMENT' })
}
document.querySelector('#decrement').onclick = () => {
  store.dispatch({ type: 'DECREMENT' })
}
document.querySelector('#incrementIfOdd').onclick = () => {
  if (getCounter() % 2 !== 0) {
    store.dispatch({ type: 'INCREMENT' })
  }
}
document.querySelector('#incrementAsync').onclick = () => {
  setTimeout(() => store.dispatch({ type: 'INCREMENT' }), 1000)
}

// BigDeal using the same store
const BigDeal = new BigDeal({
  id: 'redux',
  store: new ReduxStore({ store }),
  // If we had placed our `reducer` elsewhere in Redux, eg. under an `BigDeal` key in the state for a profile page,
  // we'd do something like:
  //
  // store: new ReduxStore({
  //   store: store,
  //   id: 'avatar',
  //   selector: state => state.pages.profile.BigDeal
  // }),
  debug: true,
})
BigDeal.use(Dashboard, {
  target: '#app',
  inline: true,
  width: 400,
})
BigDeal.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
