import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, TextArea } from "semantic-ui-react";
import { createComment, getComments } from "../modules/comment"

const Comments = props => {
  const [body, setBody] = useState("")
  const [message, setMessage] = useState("")
  const [comments, setComments] = useState(null)

  const submitCommentHandler = async e => {
    e.preventDefault();
    let response = await createComment(body, props.currentArticleId);
    if (response.status === 200) {
      setMessage("Comment submitted")
      setBody("")
      loadComments(props.currentArticleId)
    } else {
      setMessage(response.data.error[0])
    }
  }

  const loadComments = async (id) => {
    let response = await getComments(id);
    if (response.status === 200) {
      setComments(response.data)
    }
  }

  let commentsList;

  if (comments !== null && comments.length > 0) {
    debugger
    commentsList = comments.map(comment => {
      return (
        <div className="comment">
          <h5>{comment.email} <span id="comment-role">{comment.role}</span></h5>
          <p>{comment.body}</p>
          <p><span id="comment-date">{comment.created_at}</span></p>
        </div>
      )
    })
  }

  useEffect(() => {
    loadComments(props.currentArticleId)
  }, []);

  return (
    <div className="comments-div">
      <h2>DISCUSSION</h2>
      <Form onSubmit={submitCommentHandler}>
        <Form.Group>
          <Form.Input
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