import React, { useState, useEffect } from "react";
import { Form, TextArea, Icon, Button } from "semantic-ui-react";
import { createComment, getComments, commentDelete, updateComment } from "../modules/comment"
import { sendVote } from "../modules/article"

const Comments = ({articleId, articleData, article}) => {
  const [body, setBody] = useState("")
  const [message, setMessage] = useState("")
  const [comments, setComments] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [commentMenuId, setCommentMenuId] = useState(false)
  const [user, setUser] = useState("")
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [likes, setLikes] = useState(null)
  const [voted, setVoted] = useState(false)

  const submitCommentHandler = async e => {
    e.preventDefault();
    let response = await createComment(body, articleId);
    if (response.status === 200) {
      setMessage("Comment submitted")
      setBody("")
      loadComments(articleId)
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
      loadComments(articleId)
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
      loadComments(articleId)
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
      if (article.likes.includes(headers.uid)) {
        setVoted(true)
      }
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

  const upvote = async () => {
    let response = await sendVote(articleId, user);
    if (response.status === 200) {
      articleData(articleId)
      setLikes(response.data.likes.length)
      response.data.likes.includes(user) ? setVoted(true) : setVoted(false)
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
    loadComments(articleId)
    setLikes(article.likes.length)
    userInfo()
    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, []);

  useEffect(() => {
    
  }, [articleId])

  return (
    <div className="comments-div">
      <div className="inline">
        <h2>DISCUSSION</h2> 
        <Icon.Group onClick={() => upvote()} className="upvote">
        {voted === true ? (
          <Icon color='blue' id="heart-active" name='like'/>
          ) : (
            <Icon color='grey' id="heart" name='like'/>
          )} 
          <Icon id="plus" corner name='add' />
        </Icon.Group>
        {likes !== null && (
          likes > 1 ? <p>{likes} Likes</p> : <p>{likes} Like</p> 
        )}
      </div>
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

export default Comments;