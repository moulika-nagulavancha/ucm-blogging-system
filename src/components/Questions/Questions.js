import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./questions.css";
import "../Header/header.css";
import Posts from "./Posts";
import Pagination from "./Pagination";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [postPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(1);

  const fetchAllQuestions = async () => {
    await fetch("http://localhost:5000/api/question/fetchquestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setQuestions(data));
  };

  const sortByVotes = async () => {
    await fetch("http://localhost:5000/api/question/fetchQueByHigherVotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setQuestions(data));
  };

  const answeredQuestions = async () => {
    await fetch("http://localhost:5000/api/question/answeredQue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setQuestions(data));
  };

  const unansweredQuestions = async () => {
    await fetch("http://localhost:5000/api/question/unansweredQue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setQuestions(data));
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => setcurrentPage(pageNum);

  return (
    <>
      <div Style="height:100%; margin-top:13vh; z-index:1; background-color:white">
        <div class="">
          <div className="stack-index">
            <div className="stack-index-content">
              <Sidebar />

              <div className="main">
                <div className="main-container">
                  <div className="main-top">
                    <h2>All Questions</h2>
                    {localStorage.getItem("username") != null ? (
                      <NavLink to="/editor">
                        <button>Ask Question</button>
                      </NavLink>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="main-desc">
                    <p>{questions.length} Questions</p>
                    <div className="main-filter">
                      <div className="main-tabs">
                        <div className="main-tab">
                          <NavLink className="tab" onClick={answeredQuestions}>
                            Answered
                          </NavLink>
                        </div>
                        <div className="main-tab">
                          <NavLink onClick={sortByVotes}>Votes</NavLink>
                        </div>
                        <div className="main-tab">
                          <NavLink onClick={unansweredQuestions}>
                            Unanswered
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="questions">
                    <div className="question">
                      <Posts posts={currentPosts} />
                    </div>
                  </div>
                  <div className="container">
                    <Pagination
                      postsPerPage={postPerPage}
                      totalPosts={questions.length}
                      paginate={paginate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
