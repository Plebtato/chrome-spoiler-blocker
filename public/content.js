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
          return element.textContent
            .toLowerCase()
            .includes(keyword.toLowerCase());
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

const createSpoilerInfoBox = (element, spoilerInfo) => {
  const node = document.createElement("span");
  node.className = "spoiler-info-box";
  const textnode = document.createTextNode(spoilerInfo);

  node.style.visibility = "hidden";
  node.style.width = "20vw";
  node.style.backgroundColor = "black";
  node.style.color = "#fff";
  node.style.textAlign = "center";
  node.style.padding = "5px 0";
  node.style.borderRadius = "6px";
  node.style.fontSize = "15px";
  node.style.whiteSpace = "pre-line";
  node.style.zIndex = "99999";
  node.style.position = "fixed";

  element.onmousemove = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    node.style.top = y + 10 + "px";
    node.style.left = x + 10 + "px";
  };

  node.appendChild(textnode);
  element.appendChild(node);
  return node;
};

const showSpoilerInfoBox = (element) => {
  element.style.visibility = "visible";
};

const hideSpoilerInfoBox = (element) => {
  element.style.visibility = "hidden";
};

const hideSpoiler = (element) => {
  element.style.backgroundColor = "#000000";
  element.style.color = "#000000";

  const childElements = element.children;
  for (const child of childElements) {
    if (child.className !== "spoiler-info-box") {
      child.style.visibility = "hidden";
    }
  }
};

const showSpoiler = (element, bg, color) => {
  element.style.backgroundColor = bg;
  element.style.color = color;

  const childElements = element.children;
  for (const child of childElements) {
    child.style.visibility = "initial";
  }
};

const filterSpoilers = (seriesList) => {
  const spoilerElements = getElements(seriesList);

  spoilerElements.forEach((spoiler) => {
    let spoilerInfo = "";
    spoiler.series.forEach((series) => {
      if (spoilerInfo) {
        spoilerInfo += "\n\n";
      }
      spoilerInfo +=
        "Potential spoilers for " +
        series.title +
        " detected.\n" +
        "Keyword(s): " +
        series.keywords.join(", ");
    });

    const infoBox = createSpoilerInfoBox(spoiler.element, spoilerInfo);

    const originalBG = spoiler.element.style.backgroundColor;
    const originalColor = spoiler.element.style.color;
    hideSpoiler(spoiler.element);

    spoiler.element.addEventListener("click", () =>
      showSpoiler(spoiler.element, originalBG, originalColor)
    );

    spoiler.element.addEventListener("mouseenter", () =>
      showSpoilerInfoBox(infoBox)
    );
    spoiler.element.addEventListener("mouseleave", () =>
      hideSpoilerInfoBox(infoBox)
    );
  });
};

let seriesList;
chrome.storage.local.get(["seriesList"], (res) => {
  seriesList = res.seriesList || [];
  filterSpoilers(seriesList);
});

// add message trigger when new keyword or series is added
// chrome.runtime.onMessage.addListener(() => {
//   let seriesList;
//   chrome.storage.local.get(["seriesList"], (res) => {
//     seriesList = res.seriesList || [];
//   });
//   spoilerFilter(seriesList);
//   console.log('message received')
// });
