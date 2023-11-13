import ReactDOM from 'react-dom/client'
import { configure } from "@testing-library/react"
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: reducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)