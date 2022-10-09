import { useEffect, useState } from "react";
import { Header } from "./Header";

function App() {
  // 掲示板スレッド
  const [threads, setThreads] = useState([]);

  // 掲示板スレッドの取得
  useEffect(() => {
    fetch("https://railway-react-bulletin-board.herokuapp.com/threads", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setThreads(data));
  }, []);

  return (
    <>
      <Header />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Thread Name</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((data, index) => {
              return (
                <tr key={index} className="hover">
                  <th> {data.id}</th>
                  <td>{data.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
