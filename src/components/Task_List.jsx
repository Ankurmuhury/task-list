import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Add from "./Add";

const getDataLs = () => {
  let dataList = localStorage.getItem("details");
  if (dataList) {
    console.log(dataList, "data");
    return JSON.parse(dataList);
  } else {
    return [];
  }
};

const Task_List = () => {
  // const [details, setDetails] = useState(getDataFromLs());
  const [addList, setAddList] = useState(getDataLs());
  console.log(addList, "addlist");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checkedData, setCheckedData] = useState({
    id: [],
  });

  console.log("checkedData", checkedData);

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { id } = checkedData;

    // console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setCheckedData({
        id: [...id, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setCheckedData({
        id: id.filter((e) => e !== value),
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(addList));
  }, [addList]);

  //delete items
  const delete_func = (id) => {
    console.log(id, "id");
    const Updateditems = addList.filter((list) => {
      console.log(list.Id, "iddd");
      return list.Id !== id;
    });
    alert("Task has been deleted successfully");

    console.log("Updateditems", Updateditems);
    // console.log(Updateditems)
    setAddList(Updateditems);
  };

  const multi_delete_func = (id) => {
    //console.log(id)
    const Updateditem = addList.filter((list) => {
      // return id?.filter((_list) => {
      // console.log("asdasdasdasasfdvd", _list);
      return list.Id != id;
      // });
    });
    alert("Task has been deleted successfully");

    console.log("Updateditem", Updateditem);
    // console.log(Updateditems)
    setAddList(Updateditem);
    setCheckedData({ id: [] });
  };

  // useEffect(() => {
  //   if (addList?.length > 0) {
  //     setCheckedData(addList?.length);
  //   }
  // }, [addList]);

  const getData = (data) => {
    if (data?.length > 0) {
      setAddList(data);
    } else {
      setAddList(addList);
    }
  };
  return (
    <div style={{ marginTop: "20px" }}>
      {/* <h1>Create a task list CRUD app in react js</h1> */}
      <div className="container">
        <div className="heading">
          <div className="text">
            <h1>Task List</h1>
          </div>
          <div className="button">
            <button
              className="btn btn-danger"
              onClick={() => multi_delete_func(checkedData?.id)}
              disabled={checkedData?.id?.length > 0 ? false : true}
            >
              {checkedData?.id?.length > 0
                ? `Delete(${checkedData?.id?.length})`
                : "Delete"}
            </button>
            &nbsp;
            <button className="btn btn-primary" onClick={() => handleShow()}>
              Add New
            </button>
          </div>
        </div>
        <br />
        <div className="body">
          <div className="row">
            {addList.length > 0 ? (
              addList.map((listing) => {
                console.log(listing, "listing");
                return (
                  <div
                    className="col-md-4"
                    style={{ width: "18rem" }}
                    key={listing.Id}
                  >
                    <div
                      class="card-body"
                      style={{
                        border: "1px solid black",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ position: "relative", float: "right" }}>
                        <input
                          name="id"
                          onChange={handleChange}
                          class="form-check-input"
                          type="checkbox"
                          value={listing?.Id}
                          id="flexCheckDefault"
                        />
                      </div>
                      <h5 class="card-title" style={{ textAlign: "left" }}>
                        {listing.name}
                      </h5>
                      <button
                        type="button"
                        className={
                          listing?.list == "Low"
                            ? "low"
                            : listing?.list == "High"
                            ? "high"
                            : "medium"
                        }
                        style={{ display: "Flex", alignItems: "flex-start" }}
                      >
                        {listing.list}
                      </button>
                      <p class="card-text" style={{ textAlign: "left" }}>
                        {listing.description}
                      </p>
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ display: "Flex", alignItems: "flex-start" }}
                        onClick={() => delete_func(listing.Id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No data found</h1>
            )}
          </div>
        </div>
        <br />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Add handleClose={handleClose} onSubmit={getData} />
      </Modal>
    </div>
  );
};

export default Task_List;
