import { useState, useEffect } from "react";
import "./App.css";
import dateFormat from "dateformat";

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  function handleDeletePost(id) {
    fetch("http://localhost:3000/posts/" + id, { method: "DELETE" }).then(
      (res) => {
        if (res.status >= 200 && res.status <= 299) {
          alert("Post has been successfully deleted.");
          window.location.href = "/";
        }
      }
    );
  }

  return (
    <div className=" w-full justify-start p-3 font-mono ">
      <div id="pageTitle" className="text-6xl font-bold mb-8 ">
        This is a blog
      </div>
      <p>This website is a project from The Odin Project.</p>
      <p>
        For this project, two different front-ends were created, one for
        read-only and the other for editing posts, and they are both connected
        to same back-end server.
      </p>
      <p className="mb-3">
        This is editable website. Click <a href="">here</a> to go to read-only
        website.
      </p>
      <a href="posts/new" className="text-black">
        <button> Create New Post</button>
      </a>
      <div id="blogCards" className="mt-3">
        {posts?.map((post: any) => (
          <div className="my-5">
            <div className="flex flex-row items-end">
              <a
                href={"posts/" + post._id}
                className="font-bold mr-3 text-xl text-black"
              >
                {post.title}
              </a>
              <div className="flex flex-col text-sm  justify-end">
                {dateFormat(post.dateUpdated, "yyyy.m.d")}
              </div>
              <a
                className="flex flex-row text-black items-end"
                href={"posts/" + post._id}
              >
                <button className="ml-3 py-0 px-2 text-xs">Edit</button>
              </a>
              <button
                onClick={() => {
                  handleDeletePost(post._id);
                }}
                className="ml-2 h-fit py-0 px-2 text-xs "
              >
                Delete
              </button>
            </div>
            <div className="max-h-32  overflow-hidden">{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
