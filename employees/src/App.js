import { isMobile } from 'react-device-detect';
import BarChart from './components/BarChart'
import AgGrid from "./components/AgGrid";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
   /* eslint-disable */
if(isMobile){
  return (
    
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<AgGrid/>}/>
          <Route exact path="/barchart" element={<BarChart/>}/>
        </Routes>
      </div>
    </Router>
  )
  }
  return (
    
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<AgGrid/>}/>
          <Route exact path="/barchart" element={<BarChart/>}/>
        </Routes>
      </div>
    </Router>
  )

}

export default App
