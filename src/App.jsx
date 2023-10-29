import { useState, useEffect } from "react";
import Histology from "./modules/Histology/Histology";
import { fetchHistoryRecords } from "./services";
function App() {
  const [responseResult, setResponseResult] = useState({});

  useEffect(() => {
    fetchHistoryRecords().then((fetchedData) => {
      setResponseResult(fetchedData);
    });
  }, []);

  const fullFetchedData = [];
  for (const key in responseResult) {
    if (key === "histology") {
      fullFetchedData.push(responseResult[key][0]);
    }
  }
  const histologyData = fullFetchedData?.[0];

  return (
    <>
      <Histology histologyData={histologyData} />
    </>
  );
}

export default App;
