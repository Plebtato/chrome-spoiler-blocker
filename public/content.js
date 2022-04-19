/*global chrome*/

const getElements = (seriesList) => {
  let spoilerElements = [];
  const elements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, p, li, td, caption, span, a"
  );

  for (const element of elements) {
    const matchingSeries = seriesList
      .map((series) => {
        const matchingKeywords = series.keywords.filter((keyword) => {
          return element.innerText
            .toLowerCase()
            .includes(keyword.toLowerCase());
          // check textContent vs innerText vs innerHTML
        });
        if (matchingKeywords.length > 0) {
          const matchingSeriesInfo = {
            title: series.title,
            keywords: matchingKeywords,
          };
          return matchingSeriesInfo;
        }
      })
      .filter((series) => series !== undefined);

    if (matchingSeries.length > 0) {
      const elementInfo = {
        element: element,
        series: matchingSeries,
      };
      spoilerElements.push(elementInfo);
    }
  }
  return spoilerElements;
};

const filterSpoilers = (seriesList) => {
  const spoilerElements = getElements(seriesList);

  spoilerElements.forEach((spoiler) => {
    let spoilerInfo = "";
    spoiler.series.forEach((series) => {
      spoilerInfo += "Potential spoilers for " + series.title + " detected.\n" + "Keyword(s): " + series.keywords.join(", ") + "\n\n";
    });
    console.log(spoilerInfo);
    spoiler.element.style.backgroundColor = "#000000";
    spoiler.element.style.color = "#000000";
    // add interactivity
    // spoiler.element.addEventListener("click", showSpoiler);
    // spoiler.element.addEventListener("mouseover", showInfo);
  });
};

let seriesList;
chrome.storage.local.get(["seriesList"], (res) => {
  seriesList = res.seriesList || [];
  filterSpoilers(seriesList);
});

// add message trigger when new keyword or series is added
// chrome.runtime.onStartup.addListener(() => {
//   let seriesList;
//   chrome.storage.local.get(["seriesList"], (res) => {
//     seriesList = res.seriesList || [];
//   });
//   spoilerFilter(seriesList);
//   console.log('message received')
// });

// change to on page load?
// https://developer.chrome.com/docs/extensions/reference/runtime/#method-reload
// handled by content script declarative injection
// not sure where spoilerFilter should be called
// add message event when list is updated

// content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
// how to inject scripts
// check to make sure manifest is correct
