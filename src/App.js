import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
// import SeriesList from "./components/SeriesList";
// import Searchbar from "./components/Searchbar";
import SeriesCard from "./components/SeriesCard";
import {
  Navbar,
  Container,
  InputGroup,
  Form,
  FormControl,
  Button,
  ListGroup,
} from "react-bootstrap";

function App() {
  const [seriesList, setSeriesList] = useState([]);
  const [newSeries, setNewSeries] = useState("");

  useEffect(() => {
    // chrome.storage.local.get(['seriesList'], (res)=>{
    //   const storedList = res.seriesList || [];
    //   setSeriesList(storedList);
    // });
  }, []);

  const addListItem = (e) => {
    e.preventDefault();

    const alreadyAdded = (title) => {
      let found = false;
      seriesList.map((item) => {
        if (item.title == title) {
          found = true;
        }
      });
      return found;
    };

    if (newSeries && !alreadyAdded(newSeries)) {
      const newSeriesInfo = {
        title: newSeries,
        keywords: [],
      };
      setSeriesList((listData) => [...listData, newSeriesInfo]);
    };
    setNewSeries("");
  };

  const editListItem = (itemToEdit) => {
    console.log("WIP");
  };

  const deleteListItem = (itemToDelete) => {
    setSeriesList((listData) =>
      listData.filter((item) => item.title !== itemToDelete)
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="title">Spoiler Blocker</Navbar.Brand>
        </Container>
      </Navbar>
      <ListGroup variant="flush" className="series-list">
        {seriesList.map((item) => (
          <SeriesCard
            item={item}
            edit={editListItem}
            remove={deleteListItem}
            key={item.title}
          />
        ))}
      </ListGroup>
      <div className="bottom-bar"/>
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Form onSubmit={addListItem} className='add-form'>
          <InputGroup>
            <FormControl
              placeholder="Enter a show"
              aria-label="Enter a show"
              aria-describedby="basic-addon2"
              type="text"
              required
              value={newSeries}
              onChange={(e) => setNewSeries(e.target.value)}
            />
            <Button
              variant="secondary"
              id="button-addon2"
              type="submit"
              disabled={!newSeries}
            >
              Add
            </Button>
          </InputGroup>
        </Form>
      </Navbar>
    </>
  );
}

export default App;
