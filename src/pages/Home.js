import * as React from "react";
import { Container, Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Home = ()=>{
  const [songs, setSongs] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const getSongs = React.useCallback(() => {
      fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=eminem&limit=12').then(v => v.json()).then((res) => {
        setSongs(res.data);
      });
  }, []);

  React.useEffect(() => {
      getSongs();
  }, [getSongs]);

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

  const searchSong = () => {
    let s = 'eminem';
    if(search){
      s = search;
    }
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${s}&limit=12`).then(v => v.json()).then((res) => {
      setSongs(res.data);
    });
  };

  return (
    <React.Fragment>
      <Container>
        <Row className="my-2">
          <Col sm="3" xxs="3"><Button>LOGO</Button></Col>
          <Col sm="9" xxs="9">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search tracks"
                aria-label="Search tracks"
                aria-describedby="Search-tracks"
                value={search}
                onChange={(e) =>setSearch(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() =>searchSong()} id="Search-tracks">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
        {songs.length > 0 && <Row>
          {songs.map((song,si)=><Col key={si} sm={4} xs={12}>
            <Card style={{ width: '100%', marginBottom:10 }}>
              <Card.Img variant="top" src={song.album.cover_medium} />
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>{song.title}</Card.Title>
                  </Col>
                  <Col className="text-right">
                    {secToMin(song.duration)}
                  </Col>
                </Row>
                <Card.Text>By <Link to={`/artist/${song.artist.id}`}>{song.artist.name}</Link></Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{song.album.title}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>)}
        </Row>}
      </Container>
    </React.Fragment>
  );
};

export default Home;