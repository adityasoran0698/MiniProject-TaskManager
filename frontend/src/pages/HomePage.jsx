import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Cookies from "js-cookie";

const HomePage = () => {
  const [allTask, setAllTask] = useState([]);
  const [username, setUsername] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchAlltask = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/task/viewtasks",
          {
            withCredentials: true,
          }
        );
        setAllTask(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/me", {
          withCredentials: true,
        });
        console.log("Username fetched:", response.data);
        setUsername(response.data.fullname);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
    fetchAlltask();
  }, []);

  const handleEdit = async (task) => {
    Navigate("/addtask", {
      state: { title: task.title, content: task.content, id: task._id },
    });
  };
  const handleDelete = async (task) => {
    const response = await axios.delete(
      `http://localhost:8000/task/deleteTask/${task._id}`,
      {
        withCredentials: true,
      }
    );
    setAllTask((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
  };
  const handleStatus = async (task) => {
    const response = await axios.put(
      `http://localhost:8000/task/mark-complete/${task._id}`,
      { withCredentials: true }
    );
    const updatedTask = await axios.get(
      `http://localhost:8000/task/viewtasks`,
      { withCredentials: true }
    );

    setAllTask(updatedTask.data);
  };
  useEffect(() => {
    console.log("Updated tasks:", allTask);
  }, [allTask]);
  return (
    <div className="home-container">
      <h1>Welcome {username}</h1>
      <button
        onClick={() => {
          Cookies.remove("token");
          Navigate("/login");
        }}
        className="logout-button"
      >
        Logout
      </button>
      <button
        onClick={() => {
          Navigate("/addtask");
        }}
      >
        Add Tasks
      </button>
      <h3 className="main-heading">All Tasks</h3>

      {allTask.length > 0 ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {allTask.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.content}</td>
                <td>{task.status}</td>
                <td>
                  {" "}
                  {task.status !== "Completed ✅" ? (
                    <button onClick={() => handleEdit(task)}>Edit</button>
                  ) : (
                    ""
                  )}{" "}
                  <button
                    onClick={() => {
                      handleDelete(task);
                    }}
                  >
                    Delete
                  </button>{" "}
                  {task.status !== "Completed ✅" ? (
                    <button onClick={() => handleStatus(task)}>
                      Mark as Complete
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="no-task">No Tasks Found 😕</h2>
      )}
    </div>
  );
};

export default HomePage;
