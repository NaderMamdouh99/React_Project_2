import { Container } from "react-bootstrap";
import NavbarDetails from "./components/NavbarDetails";
import MoviesLisst from "./components/MoviesLisst";
import axios from "axios";
import { useEffect, useState } from "react";
import CardDetails from "./components/CardDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // Api Key and language and http api Url Start
  const api_Key = 'api_key=55f0ce5afdfdc75ed61aabf0e1e613a7&';
  const language = 'language=ar';
  const apiMoviePopular = 'https://api.themoviedb.org/3/movie/popular?';
  const apiSearch = 'https://api.themoviedb.org/3/search/movie?';
  // Api Key and language and http api Url end


  // Use State to Management data from movies
  const [movies, setMovies] = useState([])
  // Use State to Management data from Page Count
  const [pageCount, setPageCount] = useState(0);

  // Function do Connect with api to get all movies 
  const getAllMovies = async () => {
    const res = await axios.get(`${apiMoviePopular}${api_Key}${language}`)
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  }

  // Function to get page for movies 
  const getPageMovies = async (page) => {
    const res = await axios.get(`${apiMoviePopular}${api_Key}${language}&page=${page}`)
    setMovies(res.data.results);
  }


  useEffect(() => {
    getAllMovies();
  }, []);

  // Function to Do Search from input Search 
  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(`${apiSearch}${api_Key}${language}&query=${word}`);
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  }

  return (
    <div className="font color-body">
      <NavbarDetails search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <MoviesLisst movies={movies} getPageMovies={getPageMovies} pageCount={pageCount} />
            } />
            <Route path="/movies/:id" element={<CardDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
