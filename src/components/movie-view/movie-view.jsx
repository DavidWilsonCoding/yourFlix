import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import "./movie-view.scss"


export class MovieView extends React.Component {

  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card id="movie-view-card">
              <Card.Body>
                <Card.Img id="movie-view-card-image" variant="top" src={movieData.ImagePath} />
                <Card.Title id="movie-view-card-title" className="movie-title">{movieData.Title}</Card.Title>
                <Card.Text id="movie-view-card-description" className="movie-description">{movieData.Description}</Card.Text>
                <Card.Text id="movie-view-card-director" className="movie-director">Director: {movieData.Director.Name}</Card.Text>
                <Card.Text id="movie-view-card-genre" className="movie-gerne">Genre: {movieData.Genre.Name}</Card.Text>
              </Card.Body>
            </Card>
          <Button id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
          <Button id="movie-view-button" onClick={() => {}}>Add to favorites</Button>
        </Col>
      </Row>
    </Container>
  );
}
}

MovieView.propTypes = {
movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }),
    Actors: PropTypes.array,
    ImagePath: PropTypes.string.isRequired
}).isRequired
};