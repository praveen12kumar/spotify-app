
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import store from "./redux/store/store.jsx";
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';



createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <Router>
      <App />
      <Toaster/>
    </Router>
    </Provider>

)
