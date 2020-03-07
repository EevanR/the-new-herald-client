import axios from "axios";

const getCurrentArticle = async (id, language) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    const response = await axios({
      url: `/articles/${id}`,
      params: { locale: language },
      headers: headers
    });
    return response.data.article;
  } catch (error) {
    if (error.message === "Network Error") {
      return { error: error.message };
    } else {
      return error.response.data;
    }
  }
};

const getArticles = async (language, page, category) => {
  const response = await axios({
    url: "/articles",
    method: "GET",
    params: { locale: language, page: page, category: category }
  });
  return response.data;
};

const createArticle = async (title_en, body_en, title_sv, body_sv, category, image) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    const response = await axios.post(
      "/admin/articles",
      {
        article: {
          title_en: title_en,
          title_sv: title_sv,
          body_en: body_en,
          body_sv: body_sv,
          category: category,
          image: image
        }
      },
      {
        headers: headers
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const getAdminArticles = async (publishStatus) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios.get(`/admin/articles`, {
      params: { published: publishStatus },
      headers: headers
    });
    return response.data.articles;
  } catch (error) {
    return error.message;
  }
};

const publishArticle = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios({
      url: `/admin/articles/${id}`,
      headers: headers,
      method: "PUT",
      params: {
        "[article][published]": true
      }
    });
    return response.statusText;
  } catch (error) {
    return error.message;
  }
};

const undoPublishArticle = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios({
      url: `/admin/articles/${id}`,
      headers: headers,
      method: "PUT",
      params: {
        "[article][published]": false
      }
    });
    return response.statusText;
  } catch (error) {
    return error.message;
  }
};

const deleteArticle = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios({
      url: `/admin/articles/${id}`,
      headers: headers,
      method: "DELETE",
    });
    return response.statusText;
  } catch (error) {
    return error.message;
  }
};

export {
  getCurrentArticle,
  getArticles,
  createArticle,
  getAdminArticles,
  publishArticle,
  undoPublishArticle,
  deleteArticle
};
