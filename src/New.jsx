import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function New() {
  // 追加するスレッドの名前
  const [threadName, setThreadName] = useState('')

  const navigate = useNavigate()

  // スレッドを新規作成
  const postCreateThread = () => {
    if (!threadName) return
    const data = {
      title: threadName
    }
    fetch('https://railway-react-bulletin-board.herokuapp.com/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          console.error('サーバーエラー')
        } else {
          navigate('/')
        }
      })
      .catch((error) => {
        console.error('通信に失敗しました', error)
      })
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="card w-96 mx-auto">
          <div className="card-body">
            <h1 className="card-title">スレッド新規作成</h1>
            <input
              type="text"
              placeholder="スレッドタイトル"
              className="input w-full"
              value={threadName}
              onChange={(e) => {
                setThreadName(e.target.value)
              }}
            />
            <div className="card-actions flex justify-between">
              <Link to={`/`} className="link link-primary">
                Topに戻る
              </Link>
              <button onClick={postCreateThread} className="btn btn-primary">
                作成
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default New
