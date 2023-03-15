import './App.css';
import Task_List from './components/Task_List';
import {BrowserRouter ,Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
        <Route exact path ="/" element={<Task_List/>}/>
        {/* <Route exact path ="/add" element={<Add/>}/> */}
      </Routes>
     
      </BrowserRouter >
     
    </div>
  );
}

export default App;
