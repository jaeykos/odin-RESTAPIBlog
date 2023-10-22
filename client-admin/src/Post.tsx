import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const [post, setPost] = useState({
    title: " ",
    content: " ",
  });
  const [newPost, setNewPost] = useState({
    title: " ",
    content: " ",
  });
  const { id } = useParams();

  useEffect(() => {
    console.log("http://localhost:3000/posts/" + id);
    fetch("http://localhost:3000/posts/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPost(data);
        setNewPost(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    console.log("this is form title:");
    console.log(form.title.value);
    console.log(post?.content);

    const tempJSON = JSON.stringify({
      title: form.title.value,
      content: form.content.value,
    });

    fetch("http://localhost:3000/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: tempJSON,
    }).then((res) => {
      if (res.status >= 200 && res.status <= 299) {
        alert("Post has been successfully updated.");
        window.location.href = "/";
      }
    });
  }

  function handleResetButton() {
    setNewPost({
      title: post.title,
      content: post.content,
    });
  }

  function handleCancelButton() {
    window.location.href = "/";
  }

  return (
    <>
      <div className=" w-full justify-start p-3 font-mono">
        <form action="post" onSubmit={handleSubmit}>
          <div className="flex flex-col  mb-8 ">
            <label className="mb-3">
              Title:
              <input
                className="ml-3 border-gray-900 border p-1 rounded-md min-w-fit w-1/2"
                type="text"
                value={newPost?.title}
                onChange={(e) =>
                  setNewPost({
                    title: e.target.value,
                    content: newPost.content,
                  })
                }
                name="title"
              />
            </label>
            <label className="flex flex-col ">
              Content:
              <textarea
                className="border-gray-900 border p-1 rounded-md  resize mt-2"
                value={newPost?.content}
                onChange={(e) =>
                  setNewPost({
                    title: newPost.title,
                    content: e.target.value,
                  })
                }
                name="content"
              />
            </label>
          </div>
          <div>
            <button
              className=" mr-3 border border-gray-900  rounded-md "
              type="submit"
            >
              Update
            </button>
            <button
              className=" mr-3  border border-gray-900  rounded-md bg-white"
              onClick={handleResetButton}
            >
              Reset
            </button>
            <button
              className="border border-gray-900  rounded-md bg-white"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Post;
