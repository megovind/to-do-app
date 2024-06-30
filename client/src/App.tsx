import Footer from './components/Footer'
import Header from './components/Header'
import CreateTaskPage from './pages/CreateTaskPage'
import Tasks from './pages/Taskss'

function App() {


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <CreateTaskPage />
        <Tasks />
      </main>
      <Footer />
    </div>
  )
}

export default App
