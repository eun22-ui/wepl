import logo from './logo.svg';
import './App.css';
import ImportComponent from './ImportComponent';
import LifecycleTest from './LifecycleTest';

function App() {
  return (
    <div className="App">

      {/* <div>
        <ImportComponent></ImportComponent>
        <LifecycleTest>
          prop_val = 'from data';
        </LifecycleTest>
      </div> */}
      
      <HousingFinder />


    </div>
  );
}

export default App;
