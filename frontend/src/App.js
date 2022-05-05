import './App.css';
import {GoogleLogin} from 'react-google-login'
import axios, { Axios } from 'axios'
import {useState} from 'react' 

function App() {
  const responseGoogle = response => {
    console.log(response)
    const {code} = response
    axios
    .post('/api/create-tokens ',{code})
    .then(response => {
      console.log(response.data)
      setSignedIn(true)
    })
    .catch(error => console.log(error.message))
    
  }

  const responseError = error => {
    console.log(error)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(summary, description, location, startDateTime, endDateTime)
    axios.post('/api/create-event',{
      summary, description, location, startDateTime, endDateTime
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.log(error.message))
  }

  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [signedIn, setSignedIn] = useState(false)

  return (
    <div>
      <div className="App">
      <h1>Exam Calendar</h1>
    </div>
    {
      !signedIn ? (  <div>
        <GoogleLogin clientId='516046819320-3v1rofob6ofv1rna0m5fvnntibfauc9s.apps.googleusercontent.com'
        buttonText='sign in & Authorize calendar'
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
        responseType='code'
        accessType='offline'
        scope='openid email profile https://www.googleapis.com/auth/calendar'/>
      </div>): (<div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='summary'>Summary</label>
        <br/>
        <input type="text" id='summary' value={summary } onChange={e => setSummary(e.target.value) }/>
        <br/>

        <label htmlFor='description'>Description</label>
        <br/>
        <textarea type='text' id='description' value={description } onChange={e => setDescription(e.target.value) }/>
        <br/>

        <label htmlFor='location'>Location</label>
        <br/>
        <input type='text' id='location' value={location } onChange={e => setLocation(e.target.value) }/>
        <br/>
        <label htmlFor='startDateTime'>Start Date Time</label>
        <br/>
        <input type='datetime-local' id='startDateTime' value={startDateTime } onChange={e => setStartDateTime(e.target.value) }/>
        <br/>

        <label htmlFor='endDateTime'>End Date Time</label>
        <br/>
        <input type='datetime-local' id='endDateTime' value={endDateTime } onChange={e => setEndDateTime(e.target.value) }/>
        <br/>
        <button type='submit'>Create event</button>
      </form>
    </div>
    )}
  </div> 
  )
}

export default App;
