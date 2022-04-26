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
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [requireReload, setRequireReload] = useState(false);
  const [enableAutofill, setEnableAutofill] = useState(false);
  const apiKey = process.env.REACT_APP_IMDB_API_KEY;

  useEffect(() => {
    chrome.storage.local.get(["seriesList"], (res) => {
      const storedList = res.seriesList || [];
      setSeriesList(storedList);
      setInitialLoad(false);
    });
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      chrome.storage.local.set({ seriesList: seriesList });
    }
  }, [seriesList, initialLoad]);

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
      let newSeriesInfo = {
        title: newSeries,
        keywords: [newSeries],
      };

      if (enableAutofill) {
        fetch(`https://imdb-api.com/en/API/SearchTitle/${apiKey}/${newSeries}`)
          .then((response) => {
            return response.json();
          })
          .then((responseData) => {
            console.log(responseData);
            if (responseData.length > 0) {
              newSeriesInfo.title = responseData[0].title;
              const id = responseData[0].id;
            }
            setSeriesList((listData) => [...listData, newSeriesInfo]);
            setRequireReload(true);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setSeriesList((listData) => [...listData, newSeriesInfo]);
        setRequireReload(true);
      }
    }
    setNewSeries("");
  };

  const deleteListItem = (itemToDelete) => {
    setSeriesList((listData) =>
      listData.filter((item) => item.title !== itemToDelete)
    );
    setRequireReload(true);
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
    };

    let newKeywordArr = keywordsToAdd.split(",");
    newKeywordArr = newKeywordArr
      .map((keyword) => keyword.trim())
      .filter(unique);

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
        setRequireReload(true);
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
    setRequireReload(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="title">No Spoilers!</Navbar.Brand>
          {requireReload && (
            <Navbar.Text>Refresh to apply changes.</Navbar.Text>
          )}
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
          <InputGroup className="mb-2">
            <FormControl
              placeholder="Enter a show"
              aria-label="Enter a show"
              aria-describedby="basic-addon2"
              type="search"
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
          <Form.Check className="autofill-toggle-button" type="checkbox" label="Automatically fill keywords with IMDB data" checked={enableAutofill} onChange={(e) => setEnableAutofill(prev => !prev)}/>
        </Form>
      </Navbar>
    </>
  );
}

export default App;
