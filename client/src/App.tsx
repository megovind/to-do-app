import { Outlet, useNavigate } from '@tanstack/react-router'
import Footer from './components/Footer'
import Header from './components/Header'
import { clearAllLocalStorage, getLocalStorageItem } from './config/local-storage'
import { useEffect, useState } from 'react'


function App() {
  const accessToken = getLocalStorageItem('accessToken');
  const navigate =  useNavigate();
  const [isAuthenticated, setIsAuthentication] = useState<boolean>(false)
  useEffect(() => {
    if (accessToken) setIsAuthentication(true)
  }, [accessToken])

  const onLogout = () => {
    clearAllLocalStorage();
    setIsAuthentication(false);
    navigate({to: '/login'});
  }
  return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}

export default App
