import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ContactPage from './pages/contact/ContactPage';
import AdminPage from './pages/admin/AdminPage'
function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contacts' element={<ContactPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
