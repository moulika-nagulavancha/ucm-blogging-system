import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUsers(data);
    setFilteredUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredData = users.filter((user) => {
      return user.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredUsers(filteredData);
  };

  const deleteUser = async (id) => {
    const response = axios
      .delete(`http://localhost:5000/api/admin/deleteUser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        fetchUsers();
        window.location.reload();
        return ;
      });
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/status/${id}`, {
        status: status === "Y" ? "N" : "Y",
      });
      fetchUsers();
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      alert("Error!");
    }
  };

  return (
    <div
      className="container"
      Style="background-color:#f8f9f9; height:100%; margin-top:20vh; z-index:1;"
    >
      <AdminSidebar />
      <div Style="display:block">
        <div class="input-group">
          <div class="form-outline">
            <input
              type="text"
              className="form-control"
              placeholder="Search From UserName"
              name="search"
              onChange={handleSearch}
            />
          </div>
          <button id="search-button" type="button" class="btn btn-primary">
            <i class="fa fa-search"></i>
          </button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th
                style={{ width: "250px", textAlign: "center", height: "40px" }}
                scope="col"
              >
                User Name{" "}
              </th>
              <th
                style={{ width: "250px", textAlign: "center", height: "40px" }}
                scope="col"
              >
                User Email
              </th>
              <th
                style={{ width: "250px", textAlign: "center", height: "40px" }}
                scope="col"
              >
                Delete
              </th>
              <th
                style={{ width: "250px", textAlign: "center", height: "40px" }}
                scope="col"
              >
                Status
              </th>
            </tr>
          </thead>
        </table>

        <div>
          {filteredUsers.map((user) => {
            return (
              <div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: "250px",
                          textAlign: "center",
                          height: "40px",
                        }}
                      >
                        {user.username}
                      </td>
                      <td
                        style={{
                          width: "250px",
                          textAlign: "center",
                          height: "40px",
                        }}
                      >
                        {user.email}
                      </td>
                      <td
                        style={{
                          width: "250px",
                          textAlign: "center",
                          height: "40px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          aria-hidden="true"
                          onClick={() => deleteUser(user._id)}
                        >
                          {" "}
                          delete
                        </Button>
                      </td>
                      <td
                        style={{
                          width: "250px",
                          textAlign: "center",
                          height: "40px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<BlockIcon />}
                          aria-hidden="true"
                          onClick={() => handleStatusUpdate(user._id, user.status)}
                        >
                          {" "}
                          {user.status == 'Y' ? "Block" : "UnBlock"}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
