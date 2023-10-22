import { useState } from "react";
import { useParams } from "react-router-dom";

function NewPost() {
  const [newPost, setNewPost] = useState({
    title: " ",
    content: " ",
  });
  const { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const tempJSON = JSON.stringify({
      title: form.title.value,
      content: form.content.value,
    });
    console.log(tempJSON);
    fetch("http://localhost:3000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: tempJSON,
    })
      .then((res) => {
        console.log(res);
        alert("New post successfully created!");

        window.location.href = "/";
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleCancelButton() {
    window.location.href = "/";
  }

  return (
    <>
      <div className=" w-full justify-start p-3 font-mono">
        <form action="post" onSubmit={handleSubmit}>
          <div className="flex flex-col  mb-8">
            <label className="mb-3">
              Title:
              <input
                className="border-gray-900 border p-1 rounded-md min-w-fit w-1/2"
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
              Post
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

export default NewPost;
