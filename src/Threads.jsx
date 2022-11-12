import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Threads() {
  // 掲示板スレッド
  const [threads, setThreads] = useState([])

  // 掲示板スレッドの取得
  useEffect(() => {
    fetch(
      'https://railway-react-bulletin-board.herokuapp.com/threads?offset=5475',
      {
        method: 'GET'
      }
    )
      .then((response) => response.json())
      .then((data) => setThreads(data))
  }, [])

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
                </tr>
              </thead>
              <tbody>
                {threads.map((data, index) => {
                  return (
                    <tr key={index} className="hover">
                      <th> {data.id}</th>
                      <td>
                        <Link
                          LinkclassName="btn underline"
                          to={`thread/${data.id}`}
                        >
                          {data.title}
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Threads
