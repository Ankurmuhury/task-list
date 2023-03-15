import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

//getting the value of localstorage
const getDataFromLs = () => {
  let data = localStorage.getItem("details");
  if (data) {
    console.log(data, "data");
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Add = ({ handleClose, onSubmit }) => {
  //array of objects
  const [details, setDetails] = useState(getDataFromLs());
  console.log("details", details);
  //input field state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState("Low");
  const [Id, setId] = useState("");
  const [error, setError] = useState({});
  console.log("lisasdasdfwfegdft", error);

  const validation = () => {
    let error = {};
    if (!name) {
      error.name = "Name is required";
    }
    if (!description) {
      error.description = "Description is required";
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let ErrorList = validation();
    setError(validation());
    if (Object.keys(ErrorList).length !== 0) {
    } else {
      let detail = {
        name: name,
        description: description,
        list: list,
        Id: new Date().getTime().toString(),
      };
      // onSubmit(details);
      setDetails([...details, detail]);
      setId("");
      setName("");
      setDescription("");
      setList("Low");
      handleClose();
      getDataFromLs();
      alert("Task has been added successfully");
    }
  };

  useEffect(() => {
    if (details?.length > 0) {
      onSubmit(details);
    }
  }, [details]);

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(details));
  }, [details]);
  return (
    <div className="container1">
      <div>
        <label>Name</label>
        <br />
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="error">{error.name}</div>
        <br />
        <label>Description</label>
        <br />
        <textarea
          type="text"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="error">{error.description}</div>
        <br />
        <label>Priority</label>
        <br />
        <select
          name="list"
          value={list}
          onChange={(e) => setList(e.target.value)}
        >
          <option value={list.low}>Low</option>
          <option value={list.high}>High</option>
          <option value={list.medium}>Medium</option>
        </select>
        <br />
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        &nbsp;
        <button onClick={handleSubmit} className="btn btn-success">
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
