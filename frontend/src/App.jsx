import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import NewThreadPage from './pages/NewThreadPage';
import { ThreadProvider } from './context/ThreadContext2';

function App() {
  return (
    <ThreadProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<ThreadDetailPage />} />
              <Route path="/new-thread" element={<NewThreadPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThreadProvider>
  );
}

export default App;
