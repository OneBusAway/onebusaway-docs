export function enableDocSearch(containerID) {
  docsearch({
    appId: "RDM4DTADEP",
    apiKey: "c0fb830900a6cd24677d8f3d791ed567",
    indexName: "onebusaway-onrender",
    insights: true, // Optional, automatically send insights when user interacts with search results
    container: containerID,
    debug: false // Set debug to true if you want to inspect the modal
  });
}