import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Record from "./components/Record";

function Threads() {
  // 掲示板スレッド
  const [threads, setThreads] = useState([]);

  // 掲示板スレッドの取得
  useEffect(() => {
    fetch(
      "https://railway-react-bulletin-board.herokuapp.com/threads?offset=5500",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setThreads(data));
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="card w-96 mx-auto">
          <div className="card-body">
            <h1 className="card-title">新着スレッド</h1>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Thread Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {threads.map((data, index) => {
                  return (
                    <Record key={index} id={data.id} detail={data.title}>
                      <td>
                        <Link className="btn" to={`thread/${data.id}`}>
                          閲覧
                        </Link>
                      </td>
                    </Record>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Threads;
