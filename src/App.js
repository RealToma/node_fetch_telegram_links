import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const getData = async () => {
    var config = {
      method: "get",
      url: "http://localhost:8000",
      headers: {},
    };
    const totalLinks = await axios(config);
    setTotalLinks(totalLinks.data.data.split("\n"));
  };
  const getLatestLinkNum = async () => {
    var config = {
      method: "get",
      url: "http://localhost:8000/latestlink",
      headers: {},
    };
    const totalLinks = await axios(config);
    setCurrentLink(totalLinks.data.data * 1);
  };
  const saveLatestLinkNum = async () => {
    const totalLinks = await axios({
      method: "post",
      url: "http://localhost:8000/latestlink",
      headers: {},
      data: { next: currentLink + 1 },
    });
    if (totalLinks.data.state === "fail") {
      alert("save failed!");
    }
    setCurrentLink(currentLink + 1);
  };
  const [totalLinks, setTotalLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState(0);
  useEffect(() => {
    getData();
    getLatestLinkNum();
  }, []);
  return (
    <main>
      <div
        className="telegramlink"
        onClick={() => {
          navigator.clipboard.writeText(totalLinks[currentLink]);
          saveLatestLinkNum();
        }}
      >
        <div className="latestNumber">{currentLink}</div>
        {totalLinks[currentLink]}
      </div>
    </main>
  );
}

export default App;
