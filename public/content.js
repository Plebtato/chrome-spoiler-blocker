/*global chrome*/

// change to specific elements? https://www.w3schools.com/jsref/met_document_queryselectorall.asp
const getElements = (seriesList) => {
  let spoilerElements = [];

  // nodelist to array?
  for (const element of document.querySelectorAll("*")) {
    const matchingSeries = seriesList.map((series) => {
      const matchingKeywords = series.keywords.filter((keyword) => {
        element.textContent.toLowerCase().includes(keyword.toLowerCase());
      });

      if (matchingKeywords.length) {
        const matchingSeriesInfo = {
          title: series,
          keywords: matchingKeywords,
        };
        return matchingSeriesInfo;
      }
    });

    if (matchingSeries.length) {
      const elementInfo = {
        element: element,
        series: matchingSeries,
      };
      spoilerElements.push(elementInfo);
    }
  }
  return spoilerElements;
};

const spoilerFilter = (seriesList) => {
  const spoilerElements = getElements(seriesList);
};

chrome.runtime.onStartup.addListener(() => {
  let seriesList;
  chrome.storage.local.get(["seriesList"], (res) => {
    seriesList = res.seriesList || [];
  });
  //   spoilerFilter(seriesList);
});

spoilerFilter(seriesList);

// change to on page load?
// https://developer.chrome.com/docs/extensions/reference/runtime/#method-reload
// handled by content script declarative injection
// not sure where spoilerFilter should be called
// add message event when list is updated? both

// content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
// how to inject scripts
// check to make sure manifest is correct
