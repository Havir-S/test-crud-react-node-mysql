import {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("")
  const [movieReview, setReview] = useState("")
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieReviewList(response.data)
    })
  }, [])

  const submitReview = () => { 
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: movieReview
    })
    setMovieReviewList([...movieReviewList, {movieName: movieName, movieReview: movieReview}])
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put(`http://localhost:3001/api/update`, {
      movieName: movie,
      movieReview: newReview
    })
    setNewReview("");
  }

  return (
    <div className="App">
    <h1>CRUD APPLICATION</h1>

    <div className='form'>
    <label>Movie Name:</label>
      <input type='text' name='movieName' onChange={
          (e) => {setMovieName(e.target.value)}
        }/>
      <label>Review</label>
      <input type='text' name='review' onChange={
         (e) => {setReview(e.target.value)}
        } />

      <button onClick={submitReview}>Submit</button>

      {movieReviewList && movieReviewList.map((val, index) => {
        return (
          <div key={index} className='card'>
            <h1>Movie Name: {val.movieName}</h1>
            <p>Movie Review: {val.movieReview}</p>

            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
            <input type='text' onChange={(e) => {
              setNewReview(e.target.value)
              }}/>
            <button onClick={() => {updateReview(val.movieName)}}>Update</button>
          </div>
          )
      })}
    </div>
    </div>
  );
}

export default App;
