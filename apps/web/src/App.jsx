import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import './index.css';

function App() {
const basename = import.meta.env.BASE_URL;  
return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;