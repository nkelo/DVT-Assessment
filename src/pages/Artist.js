import * as React from "react";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { useParams } from 'react-router-dom';
const Artist = ()=>{
  const { id } = useParams();
  const [artist, setArtist] = React.useState({name:'', nb_fan:0});
  const [songs, setSongs] = React.useState([]);
  const getArtist = React.useCallback(() => {
      fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}`).then(v => v.json()).then((res) => {
        setArtist(res);
      });
  }, [id]);

  const getSongs = React.useCallback(() => {
      fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/top?limit=5`).then(v => v.json()).then((res) => {
        setSongs(res.data);
      });
  }, [id]);

  React.useEffect(() => {
      getArtist();
      getSongs();
  }, [getArtist, getSongs]);

  const padTo2Digits= (num) => {
    return num.toString().padStart(2, '0');
  };

  const secToMin= (totalSeconds) => {
    // 👇️ get number of full minutes
    const minutes = Math.floor(Number(totalSeconds) / 60);

    // 👇️ get remainder of seconds
    const seconds = Number(totalSeconds) % 60;

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col sm={8} style={{backgroundColor:'#ccc'}} className="mt-4">
              <h3>{artist.name}</h3>
              <p><b>{artist.nb_fan}</b> Fans</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
          </Col>
          <Col sm={4} className="mt-4">
            <h4>Top Tracks</h4>
            {songs.length > 0 && <ListGroup as="ol" numbered>
              {songs.map((song,si)=><ListGroup.Item key={si} as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">{song.title}</div>
                  <Badge bg="primary" pill>{secToMin(song.duration)}</Badge>
                </ListGroup.Item>)}
            </ListGroup>}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Artist;