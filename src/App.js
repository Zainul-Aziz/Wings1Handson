import "./App.css";
import { useState } from "react";
import checkEmptyField from "./checkEmptyField";
let index = 3;
function App() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [topic, settopic] = useState("");
  const [topicAdded, settopicAdded] = useState(false);
  const [topicsArray, settopicsArray] = useState([]);
  const [agendaArray, setagendaArray] = useState([
    {
      id: 1,
      title: "Angular",
      description: "Some description about the angular",
      agenda: [
        "Introduction",
        "Typescript",
        "Why Angular?",
        "Understanding Versions",
        "Fundamentals",
      ],
    },
    {
      id: 2,
      title: "Vue",
      description: "Some description about the vue",
      agenda: [
        "Introduction",
        "Javascript",
        "why Vue?",
        "Vue Bindings",
        "Component Interaction",
      ],
    },
  ]);
  const [showTopicblock, setshowTopicblock] = useState(false);
  const [viewAgenda, setviewAgenda] = useState(true);
  return (
    <div className="App">
      <h2 className="text-center">Agenda Maker</h2>
      <div className="container mb-3">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setviewAgenda(!viewAgenda)}
          disabled={agendaArray.length === 0}
        >
          Click To {viewAgenda ? "View" : "Add"} Agenda
        </button>
      </div>
      {viewAgenda && (
        <form className="container">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            {title.trim().length === 0 && (
              <small className="form-text text-danger">Title is required</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            {description.trim().length === 0 && (
              <small className="form-text text-danger">
                Description is required
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="topic">Enter topic</label>
            <input
              type="text"
              className="form-control mb-2"
              id="topic"
              placeholder="Enter the topic"
              value={topic}
              onChange={(e) => settopic(e.target.value)}
            />
            {topic.trim().length === 0 && topicsArray.length === 0 && (
              <small className="form-text text-danger">Topic is required</small>
            )}
            <button
              type="button"
              className="btn btn-success btn-sm"
              disabled={checkEmptyField(topic)}
              onClick={() => {
                if (topic.trim().length !== 0) {
                  settopicsArray([...topicsArray, topic]);
                  setshowTopicblock(true);
                  settopicAdded(true);
                  settopic("");
                }
              }}
            >
              + Add Topic
            </button>
          </div>
          <button
            type="button"
            className="btn btn-success btn-sm"
            disabled={
              checkEmptyField(title) ||
              checkEmptyField(description) ||
              !topicAdded
            }
            onClick={() => {
              if (
                title.trim().length !== 0 &&
                description.trim().length !== 0 &&
                topicAdded
              ) {
                setagendaArray([
                  ...agendaArray,
                  {
                    id: index++,
                    title: title,
                    description: description,
                    agenda: topicsArray,
                  },
                ]);
                settopicsArray([]);
                settitle("");
                settopic("");
                setdescription("");
                setshowTopicblock(false);
                settopicAdded(false);
              }
            }}
          >
            Submit Agenda
          </button>

          {!topicAdded && (
            <small className="form-text text-danger">No Topics Added</small>
          )}
        </form>
      )}
      {showTopicblock && viewAgenda && (
        <div className="container mt-3">
          <div className="card">
            <div className="card-header">Added Topics</div>
            <ul className="list-group list-group-flush">
              {topicsArray.map((topics, i) => (
                <li className="list-group-item" key={i}>
                  {topics}
                </li>
              ))}
            </ul>
            <div className="card-header">Refer the topics you added</div>
          </div>
        </div>
      )}
      {!viewAgenda && (
        <div className="container">
          {agendaArray.map((res) => (
            <div className="container mt-3" key={res.id}>
              <div className="card">
                <div className="card-header">{res.title}</div>
                <ul className="list-group list-group-flush">
                  {res.agenda.map((item, i) => (
                    <li className="list-group-item" key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="card-header">{res.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
