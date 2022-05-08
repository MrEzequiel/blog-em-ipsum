import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'

import NotFound from './pages/404'
import Blog from './pages/Blog'
import Home from './pages/Home'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="bg-gray-800 text-gray-200 min-h-screen min-w-screen font-sans">
          <Header />

          <main className="container max-w-3xl mx-auto px-5 mt-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
