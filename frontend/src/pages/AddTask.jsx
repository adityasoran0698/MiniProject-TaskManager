import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./AddTask.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("All fields are required!");
      return;
    }
    try {
      if (location.state?.id) {
        await axios.put(
          `https://miniproject-taskmanager.onrender.com/task/addtask/${location.state.id}`,
          { title, content },
          { withCredentials: true }
        );
      } else {
        const response = await axios.post(
          "https://miniproject-taskmanager.onrender.com/task/addtask",
          { title, content },
          { withCredentials: true }
        );
        console.log("Task added successfully", response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.state) {
      setTitle(location.state.title || "");
      setContent(location.state.content || "");
    }
  }, [location]);

  return (
    <div className="add-task-container">
      {error && <div className="error">{error}</div>}
      <form className="task-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">📝 Add a New Task</h2>

        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />

        <label className="form-label">Body</label>
        <textarea
          className="form-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter task description"
        />

        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
