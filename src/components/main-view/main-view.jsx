import React from 'react';
import axios from 'axios';
import { Col, Row, Container } from "react-bootstrap";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  //the first method to be executed in the component - creates the component in-memory
  constructor(){
    //used to allow access to the component's features (including state)
    super();
    this.state = {
      //initializes movies array and selectedMovie and assigns to component state
      movies: [],
      //selectedMovie is used to determine which view to display - when set to null, default main-view is displayed
      selectedMovie: null,
      //user is used to determine whether a user is logged in or not - when set to null, login-view is displayed
      user: null,
      //registered is used to determine whether a visitor is registered or not - when set to false, registration-view is displayed
      registered: true
    }
  }

  //initializas movies array after component mounted by calling api from axios middleware and changes component state
  componentDidMount(){
    axios.get('https://davidsmovieapp.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //called when selectedMovie changes (on click event) - changes value of selectedMovie property in component state
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //called whwn a user is logged in, changes value of user property in component state
  onLoggedIn(user) {
    this.setState({
      user
    });
  }
  
  render() {

    const { movies, selectedMovie, user, registered } = this.state;
    
    //if there is no user, the LoginView is rendered. If there is a user logged in, user details are passed  to LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if visitor is not registered, the registration view is rendered
    if (!registered) return <RegistrationView onLoggedIn={registered => this.onRegister(registerUser)} />;

    //return empty div if no movies are found
    if (movies.length === 0) return <div className="main-view" />;
  
    //return div with sub-components 
    //if a movie has been selected (available in this.state) call MovieView in movie-vie.jsx
    //else render movie cards (as constructed in render method of movie-card.jsx)
    return (
      <Container>
        <Row className="main-view justify-content-md-center">
          {selectedMovie 
            ? (
              <Col md={6}>
                <MovieView movieData={selectedMovie}
                  onBackClick={newSelectedMovie => { 
                    this.setSelectedMovie(newSelectedMovie);
                  }} 
                /> 
              </Col>
              )
            : (
              movies.map(movie => (
                <Col md={6} lg={4}>
                  <MovieCard key={movie._id}
                    movieData={movie}
                      onMovieClick={(newSelectedMovie) => { 
                        this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
                )
              )
            )
          }
          </Row>
      </Container>
  );
  }
}

export default MainView;