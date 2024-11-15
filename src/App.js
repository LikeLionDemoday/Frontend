import {BrowserRouter,Routes,Route} from "react-router-dom";
import { DayCost } from "./Components/DayCost";
import { DummyData } from "./Components/DummyData";
import { TravelDetail } from "./travelSpecific/TravelDetail";
import { TravelDetailEdit } from "./travelSpecific/TravelDetailEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/travel/detail' element={<TravelDetail />} />
        <Route path='/travel/detail/edit' element={<TravelDetailEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
