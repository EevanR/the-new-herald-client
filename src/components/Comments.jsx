import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Form, TextArea, Icon, Button } from "semantic-ui-react";
import { createComment, getComments, commentDelete, updateComment } from "../modules/comment"

const Comments = props => {
  const [body, setBody] = useState("")
  const [message, setMessage] = useState("")
  const [comments, setComments] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [commentMenuId, setCommentMenuId] = useState(false)
  const [user, setUser] = useState("")
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const node = useRef()

  const submitCommentHandler = async e => {
    e.preventDefault();
    let response = await createComment(body, props.currentArticleId);
    if (response.status === 200) {
      setMessage("Comment submitted")
      setBody("")
      loadComments(props.currentArticleId)
    } else {
      setMessage(response.data.error)
    }
  }

  const submitEditHandler = async e => {
    e.preventDefault();
    let response = await updateComment(editId, body);
    if (response.status === 200) {
      setMessage("Comment submitted")
      setBody("")
      loadComments(props.currentArticleId)
    } else {
      setMessage(response.data.error)
    }
  }

  const loadComments = async id => {
    let response = await getComments(id);
    if (response.status === 200 && response.data.length > 0 ) {
      let array = response.data
      setComments(array.reverse())
    } else if (response.status === 200) {
      setComments(response.data)
    }
  }

  const openCommentMenu = id => {
    showMenu == false ? setShowMenu(true) : setShowMenu(false);
    setCommentMenuId(id)
  }

  const deleteComment = async id => {
    let response = await commentDelete(id);
    if (response.status === 200) {
      alert(response.data.message)
      setShowMenu(false)
      loadComments(props.currentArticleId)
    } else {
      alert(response.data.error)
    }
  }

  const editComment = async (id, body) => {
    setEdit(true)
    setEditId(id)
    setBody(body)
  }

  const userInfo = () => {
    if (localStorage.getItem("J-tockAuth-Storage")) {
      let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      setUser(headers.uid)
    }
  }

  const cancel = () => {
    setEdit(false)
    setBody("")
  }

  const handleClick = (e) => {
    if (e.target.id !== "comment-elipse") {
      setShowMenu(false)
    }
  }

  let commentsList;

  if (comments !== null && comments.length > 0) {
    commentsList = comments.map(comment => {
      let date = comment.created_at.replace('T', ' ').slice(0, -5)
      return (
        <div key={comment.id} className="comment">
          <h5>{comment.email}
            <span id="comment-role">{comment.role}</span>
            { user === comment.email && (
              <div onClick={() => openCommentMenu(comment.id) } className="elipse"><Icon id="comment-elipse" name='ellipsis vertical' /></div>
            )}
          </h5>
          <p>{comment.body}
            { showMenu === true && commentMenuId === comment.id && (
              <div className="comment-menu">
                <span id="comment-edit" onClick={() => editComment(comment.id, comment.body)}><Icon name='edit' />Edit</span>
                <span id="comment-delete" onClick={() => deleteComment(comment.id)}><Icon color='red' name='trash alternate outline' />Delete</span>
              </div>
            )}
          </p>
          <p><span id="comment-date">{date}</span></p>
        </div>
      )
    })
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    loadComments(props.currentArticleId)
    userInfo()
    return () => {
      debugger
      document.removeEventListener("click", handleClick);
    }
  }, []);

  return (
    <div className="comments-div">
      <h2>DISCUSSION</h2>
      { edit === false ? (
        <Form onSubmit={submitCommentHandler}>
          <Form.Group>
            <Form.Input
              required
              className="comment-text"
              control={TextArea}
              placeholder='Comment'
              name='comment'
              value={body}
              onChange={e => setBody(e.target.value)}
            />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
      ) : (
        <Form onSubmit={submitEditHandler}>
          <Form.Group>
            <Form.Input
              required
              className="comment-text"
              control={TextArea}
              placeholder='Comment'
              name='comment'
              value={body}
              onChange={e => setBody(e.target.value)}
            />
            <Form.Button content='Edit' />
            <Button className="cancle" onClick={() =>  cancel()} > Cancel</Button>
          </Form.Group>
        </Form>
      )}
      {commentsList}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentArticle: state.currentArticle,
    currentArticleId: state.currentArticleId,
    authenticated: state.authenticated,
    userAttrs: state.userAttrs,
    language: state.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: message => {
      dispatch({ type: "CHANGE_MESSAGE", payload: message });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);