import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

function App() {
  return (
    <MainLayout>
      <div className="ticks"></div>
      <section id="spacer"></section>
      <Home />
    </MainLayout>
  )
}

export default App