import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Thread() {
  // スレッドデータ
  const [thread, setThread] = useState({
    title: '',
    posts: []
  })
  // 投稿メッセージのテキスト
  const [postText, setPostText] = useState('')
  // URLパラメータを取得
  const { threadId } = useParams()
  // API
  const apiUrl = `https://railway-react-bulletin-board.herokuapp.com/threads/${threadId}/posts`
  // スレッドデータを取得する関数
  const getPostsData = () =>
    fetch(apiUrl, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setThread(data)
      })

  // スレッドデータの取得
  useEffect(() => {
    getPostsData()
  }, [])

  // メッセージの投稿処理
  const postCreatePost = () => {
    if (!postText) return
    const data = {
      post: postText
    }
    fetch(apiUrl, {
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
          setPostText('')
          getPostsData()
        }
      })
      .catch((error) => {
        console.error('通信に失敗しました', error)
      })
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="card mx-auto">
          <div className="card-body">
            <h1 className="card-title">{thread.title}</h1>
            <div className="flex justify-beetween">
              <input
                type="text"
                placeholder="投稿しよう！"
                className="input w-full"
                value={postText}
                onChange={(e) => {
                  setPostText(e.target.value)
                }}
              />
              <button onClick={postCreatePost} className="btn btn-primary">
                投稿
              </button>
            </div>
            <table className="table w-full">
              {/* <thead>
                <tr>
                  <th>ID</th>
                  <th>Post</th>
                </tr>
              </thead> */}
              <tbody>
                {thread.posts.map((data, index) => {
                  return (
                    <tr key={index} className="hover">
                      <th> {data.id}</th>
                      <td>{data.post}</td>
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

export default Thread
