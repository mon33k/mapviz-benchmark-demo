import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NodeInfo from './components/NodeInfo';
import Home from './routes/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased flex items-center justify-center">
      <div className="w-full max-w-screen-xl h-[95vh] flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <NodeInfo />
      </div>
    </div>
  );
}
