import './App.css';
import ResponsiveAppBar from "./components/AppBar";
import EmployeesMenu from "./components/Employes/EmployeesMenu";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
        <EmployeesMenu/>
    </div>
  );
}

export default App;
