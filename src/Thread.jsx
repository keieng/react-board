import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Record from "./components/Record";

function Thread() {
  // スレッドデータ
  const [thread, setThread] = useState({
    title: "",
    posts: [],
  });
  // 投稿メッセージのテキスト
  const [postText, setPostText] = useState("");
  // URLパラメータを取得
  const { threadId } = useParams();
  // API
  const apiUrl = `https://railway-react-bulletin-board.herokuapp.com/threads/${threadId}/posts`;
  // スレッドデータを取得する関数
  // const getPosts = () =>
  //   fetch(apiUrl, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setThread(data);
  //     });

  // スレッドデータを取得する関数
  const getPostsAsync = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });
      if (!response.ok)
        throw `サーバーエラー　${response.status}：${response.statusText}`;
      const data = await response.json();
      setThread(data);
    } catch (error) {
      alert("error： " + error);
    }
  };

  // スレッドデータの取得
  useEffect(() => {
    getPostsAsync();
  }, []);

  // メッセージの投稿処理
  // const createPost = () => {
  //   if (!postText) return;
  //   const data = {
  //     post: postText,
  //   };
  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         console.error("サーバーエラー");
  //       } else {
  //         setPostText("");
  //         // getPosts();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("通信に失敗しました", error);
  //     });
  // };

  // メッセージの投稿処理
  const createPostAsync = async () => {
    if (!postText) return;
    const data = {
      post: postText,
    };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok)
        throw `サーバーエラー　${response.status}：${response.statusText}`;
      setPostText("");
      getPostsAsync();
    } catch (error) {
      alert("error： " + error);
    }
  };

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
                  setPostText(e.target.value);
                }}
              />
              <button onClick={createPostAsync} className="btn btn-primary">
                投稿
              </button>
            </div>
            <table className="table w-full">
              <tbody>
                {thread.posts.map((data, index) => {
                  return (
                    <Record
                      key={index}
                      id={data.id}
                      detail={data.post}
                      link={false}
                    />
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

export default Thread;
