/*global chrome*/

// change to specific elements? https://www.w3schools.com/jsref/met_document_queryselectorall.asp
const getElements = (seriesList) => {
  let spoilerElements = [];
  const elements = document.querySelectorAll("h1, h2, h3, h4, h5, p, li, td, caption, span, a");
  // nodelist to array?

  for (const element of elements) {
    const matchingSeries = seriesList.map((series) => {
      const matchingKeywords = series.keywords.filter((keyword) => {
        return element.innerText.toLowerCase().includes(keyword.toLowerCase());
        // check textContent vs innerText vs innerHTML
      });
      if (matchingKeywords.length > 0) {
        const matchingSeriesInfo = {
          title: series,
          keywords: matchingKeywords,
        };
        return matchingSeriesInfo;
      }
    });

    if (matchingSeries[0] !== undefined) {
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
  // const spoilerElements = getElements(seriesList);
  console.log(getElements([{ title: "test", keywords: ["otherwise"] }]));
};

// chrome.runtime.onStartup.addListener(() => {
//   let seriesList;
//   chrome.storage.local.get(["seriesList"], (res) => {
//     seriesList = res.seriesList || [];
//   });
//   spoilerFilter(seriesList);
//   console.log('message received')
// });

let seriesList;
chrome.storage.local.get(["seriesList"], (res) => {
  seriesList = res.seriesList || [];
  // console.log(seriesList);
  spoilerFilter(seriesList);
});

// change to on page load?
// https://developer.chrome.com/docs/extensions/reference/runtime/#method-reload
// handled by content script declarative injection
// not sure where spoilerFilter should be called
// add message event when list is updated

// content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
// how to inject scripts
// check to make sure manifest is correct
