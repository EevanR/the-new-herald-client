import axios from "axios";

const createComment = async (body, articleId) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    const response = await axios.post("/admin/comments", 
      {
        comment: {
          body: body,
          article_id: articleId
        }
      },
      {
        headers: headers
      }
    )
    return response;
  } catch (error) {
    return error.response;
  }
}

const getComments = async (id) => {
  try {
    const response = await axios({
      url: "/admin/comments",
      method: "GET",
      params: { article_id: id }
    })
    return response;
  } catch (error) {
    return error.response;
  }
}


export {createComment, getComments};