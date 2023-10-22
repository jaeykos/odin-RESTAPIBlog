import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";

function Post() {
  const [post, setPost] = useState(null);
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
      });
  }, []);

  function DateCreated({ dateUpdated, dateCreated }) {
    if (
      dateFormat(dateUpdated, "yyyy.m.d") != dateFormat(dateCreated, "yyyy.m.d")
    ) {
      return <div> ({dateFormat(dateCreated, "yyyy.m.d")}) </div>;
    }
  }

  return (
    <>
      <div className=" w-full justify-start p-3 font-mono ">
        <div className="flex flex-row items-end mb-8">
          <div className="text-6xl font-bold  ">{post?.title}</div>
          <div className="ml-5">
            {dateFormat(post?.dateUpdated, "yyyy.m.d")}
          </div>
          <DateCreated
            dateUpdated={post?.dateUpdated}
            dateCreated={post?.dateCreated}
          />
        </div>
        <div>{post?.content}</div>
      </div>
    </>
  );
}

export default Post;
