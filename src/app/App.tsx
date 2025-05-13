import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../features/ui/Header';
// import NodeInfo from '../features/ui/NodeInfo';
import Home from '../common/components/Home';
import Tabs from '../features/ui/Tabs';
import { useAppDispatch } from './hooks';
import { fetchNodes } from '../features/nodes/nodeSlice';
import { fetchDevices } from '../features/devices/deviceSlice';
import { fetchLinks } from '../features/links/linkSlice';
import BenchmarkTable from '../features/benchmark/benchmarkTable'


export default function App() {
  const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(fetchLinks());
  dispatch(fetchDevices());
  dispatch(fetchNodes());
}, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased flex items-center justify-center">
      <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
        <Header />
        <Tabs/>
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        {/* <NodeInfo /> */}
        <BenchmarkTable />

      </div>
    </div>
  );
}
