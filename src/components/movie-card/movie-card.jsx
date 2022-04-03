import React from 'react';
import { CardGroup, Container, Button, Card } from "react-bootstrap";
import "./movie-card.scss"

export class MovieCard extends React.Component {
  render () {
    const { movieData, onMovieClick } = this.props;
      
    return (
      <Container>
        <CardGroup>
          <Card id="movie-card">
            <a><Card.Img variant="top" src={movieData.ImagePath} /></a>
            <Card.Body>
              <Card.Title id="card-title">{movieData.Title}</Card.Title>
              <Button id="card-button" onClick={() => onMovieClick(movieData)} variant="link">Show more</Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    )
  };
}