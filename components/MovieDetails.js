import { Container, Row, Col } from 'react-bootstrap';

export default function MovieDetails({ movie }) {
  const { poster, directors, fullplot, cast, awards, imdb } = movie;

  return (
    <Container>
      <Row>
        {poster && (
          <Col md>
            <img src={poster} alt="poster" className="w-100" />
            <br />
            <br />
          </Col>
        )}
        <Col md>
          <strong>Directed By:</strong> {directors.join(', ')}
          <br />
          <br />
          <p>{fullplot}</p>
          <strong>Cast:</strong> {cast.length ? cast.join(', ') : 'N/A'}
          <br />
          <br />
          <strong>Awards:</strong> {awards.text}
          <br />
          <strong>IMDB Rating:</strong> {imdb.rating} ({imdb.votes} votes)
        </Col>
      </Row>
    </Container>
  );
}
