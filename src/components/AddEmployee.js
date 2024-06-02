import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function AddEmployee(props) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [img, setImg] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                onClick={handleShow}
                className="block mx-auto m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                + Add Employee
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // console.log('hello from add Employee');
                            // console.log(name, role, img);
                            props.addEmployee(name, role, img);
                            setName('');
                            setRole('');
                            setImg('');
                        }}
                        id="editmodal" className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                                    Full Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="name" type="text" value={name} placeholder="Enter Name"
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="role">
                                    Role
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="role" type="text" value={role} placeholder="Enter Role"
                                    onChange={(e) => { setRole(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="img">
                                    Image URL
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="img" type="text" value={img} placeholder="Enter Image URL"
                                    onChange={(e) => { setImg(e.target.value) }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose} form="editmodal">Add</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddEmployee;
