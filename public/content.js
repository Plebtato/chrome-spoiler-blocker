/*global chrome*/

const getElements = (seriesList) => {
  let spoilerElements = [];
  const elements = document.querySelectorAll(
    "h1:not(.spoiler-filter-blocked), h2:not(.spoiler-filter-blocked), h3:not(.spoiler-filter-blocked), h4:not(.spoiler-filter-blocked), h5:not(.spoiler-filter-blocked), p:not(.spoiler-filter-blocked), td:not(.spoiler-filter-blocked), caption:not(.spoiler-filter-blocked), span:not(.spoiler-filter-blocked)"
  );
  // include a? li? div?

  for (const element of elements) {
    const matchingSeries = seriesList
      .map((series) => {
        const matchingKeywords = series.keywords.filter((keyword) => {
          const re = new RegExp("\\b" + keyword.toLowerCase() + "\\b");
          return re.test(element.textContent.toLowerCase());
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
      element.classList.add("spoiler-filter-blocked");
      spoilerElements.push(elementInfo);
    }
  }
  return spoilerElements;
};

const createSpoilerInfoBox = (element, spoilerInfo) => {
  const node = document.createElement("span");
  node.classList.add("spoiler-blocker-info-box");
  node.classList.add("spoiler-filter-blocked");
  const textnode = document.createTextNode(spoilerInfo);

  node.style.visibility = "hidden";
  node.style.width = "20vw";
  node.style.backgroundColor = "black";
  node.style.color = "#fff";
  node.style.textAlign = "center";
  node.style.padding = "5px 0";
  node.style.borderRadius = "6px";
  node.style.fontSize = "15px";
  node.style.fontFamily = "Arial, sans-serif";
  node.style.fontWeight = "normal";
  node.style.fontStyle = "normal";
  node.style.whiteSpace = "pre-line";
  node.style.zIndex = "99999";
  node.style.position = "fixed";
  node.style.transform = "none";
  node.style.filter = "none";
  node.style.perspective  = "none";

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
  if (!element.classList.contains("spoiler-blocker-info-box-disabled")) {
    document.body.appendChild(element);
    element.style.visibility = "visible";
  }
};

const hideSpoilerInfoBox = (element, parent) => {
  if (!element.classList.contains("spoiler-blocker-info-box-disabled")) {
    parent.appendChild(element);
    element.style.visibility = "hidden";
  }
};

const hideSpoiler = (element) => {
  element.style.backgroundColor = "#000000";
  element.style.color = "#000000";
  // only hide if parent is not already hidden?
  const childElements = element.children;
  for (const child of childElements) {
    if (!child.classList.contains("spoiler-blocker-info-box")) {
      child.style.visibility = "hidden";
    }
  }
};

const showSpoiler = (element, bg, color) => {
  element.style.backgroundColor = bg;
  element.style.color = color;

  const childElements = element.children;
  for (const child of childElements) {
    if (child.classList.contains("spoiler-blocker-info-box")) {
      child.style.visibility = "hidden";
      child.classList.add("spoiler-blocker-info-box-disabled");
    } else {
      child.style.visibility = "initial";
    }
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
    let hidden = true;

    spoiler.element.addEventListener("click", (e) => {
      if (hidden) {
        e.preventDefault();
        showSpoiler(spoiler.element, originalBG, originalColor);
        hidden = false;
      } else {
        infoBox.style.visibility = "hidden";
      }
    });

    spoiler.element.addEventListener("mouseenter", () =>
      showSpoilerInfoBox(infoBox)
    );
    spoiler.element.addEventListener("mouseleave", () =>
      hideSpoilerInfoBox(infoBox, spoiler.element)
    );
  });
};
// add better handling for nested spoilers

let seriesList;
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations, observer) {
  observer.disconnect();
  filterSpoilers(seriesList);
  observer.observe(document, {
    subtree: true,
    childList: true,
  });
});

chrome.storage.local.get(["seriesList"], (res) => {
  seriesList = res.seriesList || [];
  observer.observe(document, {
    subtree: true,
    childList: true,
  });
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
