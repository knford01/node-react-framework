import "../index.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Employee from "../components/Employee";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";

function Employees() {
    const [employees, setEmployees] = useState([
        {
            id: uuidv4(),
            name: "Icabod",
            role: "Dingleberry",
            img: "/demo_images/avatars/male smiling.jpg",
        },
        {
            id: uuidv4(),
            name: "Jezabel",
            role: "Trouble Maker",
            img: "/demo_images/avatars/curlyfemale.png",
        },
        {
            id: uuidv4(),
            name: "Liclomas",
            role: "King of Poopies",
            img: "/demo_images/avatars/male clean.jpg",
        },
        {
            id: uuidv4(),
            name: "Fruggzie",
            role: "Stone Cold Killer",
            img: "/demo_images/avatars/male bearded.jpg",
        },
        {
            id: uuidv4(),
            name: "Margomadison",
            role: "SCAB",
            img: "/demo_images/avatars/female fancy.jpg",
        },
        {
            id: uuidv4(),
            name: "Baby Jesus",
            role: "Just a Baby",
            img: "/demo_images/avatars/Minniecat.png",
        },
    ]);

    function updateEmployee(id, newName, newRole) {
        const updatedEmployees = employees.map((employee) => {
            if (id === employee.id) {
                return { ...employee, name: newName, role: newRole }
            }
            return employee;
        });
        setEmployees(updatedEmployees);
    }

    function addEmployee(name, role, img) {
        const newEmployee = {
            id: uuidv4(),
            name: name,
            role: role,
            img: img
        };
        setEmployees([...employees, newEmployee]);
    }

    return (
        <div className="">
            {/* <SidebarWithContentSeparator /> */}
            <div className="flex flex-wrap justify-center my-2">
                {employees.map((employee) => {
                    const editEmployee = (
                        <EditEmployee
                            id={employee.id}
                            name={employee.name}
                            role={employee.role}
                            updateEmployee={updateEmployee}
                        />
                    );
                    return (
                        <Employee
                            key={employee.id}
                            id={employee.id}
                            name={employee.name}
                            role={employee.role}
                            img={employee.img}
                            editEmployee={editEmployee}
                        />
                    );
                })}
            </div>
            <AddEmployee addEmployee={addEmployee} />
        </div >
    );
}

export default Employees;
