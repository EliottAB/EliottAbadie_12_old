import { Profile } from "./pages/Profile";
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Profile/>}/>
        <Route path="/:id" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
