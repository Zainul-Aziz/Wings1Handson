import './App.css';
import {useState} from 'react';
import checkEmptyField from './checkEmptyField';
let key=1;
let index=1;
function App() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [topic, settopic] = useState("");
  const [topicAdded, settopicAdded] = useState(false);
  const [topicsArray,settopicsArray] = useState([]);
  const [agendaArray,setagendaArray] = useState([]);
  const [showTopicblock, setshowTopicblock] = useState(false);
  const [viewAgenda, setviewAgenda] = useState(true);
  const [noTitleMessage, setnoTitleMessage] = useState(true);
  const [noDescriptionMessage, setnoDescriptionMessage] = useState(true);
  const [noTopicMessage, setnoTopicMessage] = useState(true);
  const [viewAgendaEnabled,setviewAgendaEnabled] = useState(true);
  return (
    <div className="App">
      <h2 className='text-center'>Agenda Maker</h2>
      <div className="container mb-3">
        <button type="button" className="btn btn-primary btn-sm" onClick={()=>setviewAgenda(!viewAgenda)} disabled={viewAgendaEnabled}>Click To {viewAgenda?"View":"Add"} Agenda</button>
      </div>
      {viewAgenda && <form className="container">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" id="title" placeholder="Enter the title" value={title} onChange={(e)=>settitle(e.target.value)}/>
        {!noTitleMessage && <small className="form-text text-danger" >Title is required</small>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" className="form-control" id="description" placeholder="Enter the description" value={description} onChange={(e)=>setdescription(e.target.value)}/>
        {!noDescriptionMessage && <small className="form-text text-danger" >Description is required</small>}
      </div>
       
        <div className="form-group">
          <label htmlFor="topic">Enter topic</label>
          <input type="text" className="form-control mb-2" id="topic" placeholder="Enter the topic" value={topic} onChange={(e)=>settopic(e.target.value)}/>
          {!noTopicMessage && <small className="form-text text-danger" >Topic is required</small>}
          <button type="button" className="btn btn-success btn-sm" disabled={checkEmptyField(topic)} 
          onClick={()=> 
          {
            if(topic.trim().length!==0)
            {
              settopicsArray([...topicsArray, { id: key++, topic: topic }]);
              setshowTopicblock(true);
              settopicAdded(true);
              settopic("");
              setnoTopicMessage(true);
            }
            else
            {
              if(topic.trim().length===0)
              {
                setnoTopicMessage(false);
              }
            }
          }}>+ Add Topic</button>
        </div>
        {/* <button type="button" className="btn btn-success btn-sm" disabled={!title&&!description} */}
        <button type="button" className="btn btn-success btn-sm" disabled={(checkEmptyField(title))||(checkEmptyField(description))||(!topicAdded)}
          onClick={()=>
          { 
            if(title.trim().length!==0 && description.trim().length!==0 &&topicAdded)
            {
            setagendaArray([...agendaArray, { id: index++,title:title, description:description, agenda: topicsArray }]);
            settopicsArray([]);
            settitle("");
            settopic("");
            setdescription("");
            setshowTopicblock(false);
            setnoTitleMessage(true);
            setnoDescriptionMessage(true);
            setnoTopicMessage(true);
            settopicAdded(false);
            setviewAgendaEnabled(false);
            }
            else 
            {
              if(title.trim().length===0)
              {
                setnoTitleMessage(false);
              }
              if(title.trim().length!==0)
              {
                setnoTitleMessage(true);
              }
              if(description.trim().length===0)
              {
                setnoDescriptionMessage(false);
              }
              if(description.trim().length!==0)
              {
                setnoDescriptionMessage(true);
              }
              if(topicsArray.length===0)
              {
                setnoTopicMessage(true);
              }
            }
          }
          }>Submit Agenda
        </button>

        {!topicAdded && <small className="form-text text-danger" >No Topics Added</small>}
      </form>
      }
      {showTopicblock && viewAgenda && <div className='container mt-3'>
        <div className="card" >
          <div className="card-header">
            Added Topics
          </div>
          <ul className="list-group list-group-flush">
            {topicsArray.map(topics => (
              <li className="list-group-item" key={topics.id}> {topics.topic}</li>
            ))}
          </ul>
        <div className="card-header">Refer the topics you added</div>
      </div>
      </div>}      
      {!viewAgenda && <div className='container'>
      {agendaArray.map(res => (
        <div className='container mt-3' key={res.id}>
        <div className="card" >
          <div className="card-header">
            {res.title}
          </div>
          <ul className="list-group list-group-flush">
            {res.agenda.map(item => (
              <li className="list-group-item" key={item.id}> {item.topic}</li>
            ))}
          </ul>
        <div className="card-header">{res.description}</div>
      </div>
      </div>
            ))}
      </div>
      }
      
    </div>
  );
}

export default App;
