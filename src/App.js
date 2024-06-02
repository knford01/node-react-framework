import "./index.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Employee from "./components/Employee";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [role, setRole] = useState("Not Assigned");
  const [employees, setEmployees] = useState([
    {
      name: "Icabod",
      role: "Dingleberry",
      img: "/demo_images/avatars/male smiling.jpg",
    },
    {
      name: "Jezabel",
      role: "Trouble Maker",
      img: "/demo_images/avatars/curlyfemale.png",
    },
    {
      name: "Liclomas",
      role: "King of Poopies",
      img: "/demo_images/avatars/male clean.jpg",
    },
    {
      name: "Fruggzie",
      role: "Stone Cold Killer",
      img: "/demo_images/avatars/male bearded.jpg",
    },
    {
      name: "Margomadison",
      role: "SCAB",
      img: "/demo_images/avatars/female fancy.jpg",
    },
    {
      name: "Baby Jesus",
      role: "Just a Baby",
      img: "/demo_images/avatars/Minniecat.png",
    },
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
            setRole(e.target.value);
          }}
        />
        <div className="flex flex-wrap justify-center">
          {employees.map((employee) => {
            return (
              <Employee
                key={uuidv4()}
                name={employee.name}
                role={employee.role}
                img={employee.img}
              />
            );
          })}
        </div>
      </header>
    </div>
  );
}
