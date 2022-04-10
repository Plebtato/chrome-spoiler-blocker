/*global chrome*/

import React from "react";
import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['seriesList'], (res) => {
      const storedList = res.seriesList || [];
      setSeriesList(storedList);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      chrome.storage.local.set({seriesList:seriesList});
    }
  }, [seriesList])

  const addListItem = (e) => {
    e.preventDefault();

    const alreadyAdded = (title) => {
      let found = false;
      seriesList.forEach((item) => {
        if (item.title === title) {
          found = true;
        }
      });
      return found;
    };

    if (newSeries && !alreadyAdded(newSeries)) {
      const newSeriesInfo = {
        title: newSeries,
        keywords: [newSeries],
      };
      setSeriesList((listData) => [...listData, newSeriesInfo]);
    }
    setNewSeries("");
  };

  const deleteListItem = (itemToDelete) => {
    setSeriesList((listData) =>
      listData.filter((item) => item.title !== itemToDelete)
    );
  };

  const addKeyword = (itemToEdit, keywordsToAdd) => {
    const alreadyAdded = (keywordToAdd) => {
      let found = false;
      seriesList.forEach((item) => {
        if (item.title === itemToEdit) {
          item.keywords.forEach((keyword) => {
            if (keyword === keywordToAdd) {
              found = true;
            }
          });
        }
      });
      return found;
    };

    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    }

    let newKeywordArr = keywordsToAdd.split(",");
    newKeywordArr = newKeywordArr.map((keyword) => keyword.trim()).filter(unique);

    newKeywordArr.forEach((keywordToAdd) => {
      if (keywordToAdd && !alreadyAdded(keywordToAdd)) {
        setSeriesList((listData) =>
          listData.map((item) => {
            if (item.title === itemToEdit) {
              return {
                title: item.title,
                keywords: [...item.keywords, keywordToAdd],
              };
            } else {
              return item;
            }
          })
        );
      }
    });
  };

  const deleteKeyword = (itemToEdit, keywordToDelete) => {
    setSeriesList((listData) =>
      listData.map((item) => {
        if (item.title === itemToEdit) {
          const newKeywords = item.keywords.filter(
            (keyword) => keyword !== keywordToDelete
          );
          return {
            title: item.title,
            keywords: newKeywords,
          };
        } else {
          return item;
        }
      })
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
            addKeyword={addKeyword}
            deleteKeyword={deleteKeyword}
            deleteItem={deleteListItem}
            key={item.title}
          />
        ))}
      </ListGroup>
      <div className="bottom-bar" />
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Form onSubmit={addListItem} className="add-form">
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
