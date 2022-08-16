import './App.css';
import { Route, Routes} from 'react-router-dom';
import {LandingPage} from './pages';
import Layout from './Layout';

function App() {
  return (
    <Routes >
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
