// From https://github.com/mozilla/pdf.js/tree/master/examples

function testFromEntries() {
  function probe() {
    try {
      let result = Object.fromEntries([["foo", "47"]]);
      if (typeof result !== "object") {
        return false;
      }
      if (result.foo === 47) {
        return false;
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  console.log(probe() ? "Object.fromEntries() seems to be OK" : "Object.fromEntries() is broken (this might be expected if the polyfill was removed)");
}

// Test that it is not broken before PDF.js loaded
testFromEntries();

console.log("Will probe Object.fromEntries() in 10s (after PDF.js loaded) ...");

setTimeout(function () {
  testFromEntries();
}, 10000);


/**
 * Async load a script.
 */
function loadScript(src, done) {
  const script = document.createElement("script");
  script.onload = done;
  script.src = src;
  document.body.appendChild(script);
}

loadScript("pdf.js", function() {

const pdfPath = "./helloworld.pdf";

// Setting worker path to worker bundle.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "./pdf.worker.bundle.js";

// Loading a document.
const loadingTask = pdfjsLib.getDocument(pdfPath);
loadingTask.promise
  .then(function (pdfDocument) {
    // Request a first page
    return pdfDocument.getPage(1).then(function (pdfPage) {
      // Display page on the existing canvas with 100% scale.
      const viewport = pdfPage.getViewport({ scale: 1.0 });
      const canvas = document.getElementById("theCanvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      const renderTask = pdfPage.render({
        canvasContext: ctx,
        viewport,
      });
      return renderTask.promise;
    });
  })
  .catch(function (reason) {
    console.error("Error: " + reason);
  });


});
