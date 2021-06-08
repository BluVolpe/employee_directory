import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import Employee from "./components/Employee"

function App() {

  let [employees, setEmployees] = useState([]);
  let [nameFilter, setNameFilter] = useState("");
  let [regenerated, setRegenerated] = useState([]);

  useEffect(() => {
    let url = "https://randomuser.me/api/?results=50";

    fetch(url)
    .then(res => res.json())
    .then(data => {
      let results = data.results;

      let mapped = results.map((result) => {
        return {
          name: result.name.first+" "+result.name.last,
          email: result.email,
          phone: result.phone
        }
      });
      setRegenerated(mapped);
      setEmployees(results);
    })
  }, []);

  let regenerate = () => {
    setNameFilter("");
    let results = employees;

    let mapped = results.map((result) => {
      return {
        name: result.name.first+" "+result.name.last,
        email: result.email,
        phone: result.phone
      }
    });
    setRegenerated(mapped);
  }

  const filterByName = () => {
    regenerate();
    let filtered = regenerated.filter(result => result.name.toLowerCase().includes(nameFilter.toLowerCase()));
    setRegenerated(filtered);
  }

  const sortFunction = () => {
    regenerate();
    let x = regenerated.sort((a, b) => parseInt(a.phone) - parseInt(b.phone))
    setRegenerated(x);
  }

  return (
    <div className="App">
      <input type="text" onChange={e => setNameFilter(e.target.value)} />
      <button onClick={filterByName}>Filter by name</button>
      <button onClick={sortFunction}>Order by phone</button>
      <button onClick={regenerate}>Clear Filter</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {regenerated.length > 0 ? regenerated.map((employee) => {
            return (<Employee name={employee.name} email={employee.email} phone={employee.phone}/>)
          }) : <p>No employees!</p>}
        </tbody>
      </table>
    </div>
  );
}

export default App;
