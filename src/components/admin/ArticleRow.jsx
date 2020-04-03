import React, { useState, useEffect } from "react";
import { Table, Checkbox, Icon, Confirm } from "semantic-ui-react";

const ArticleRow = ({ article, publishHandler, deleteHandler, pubStatus, freeStatus, freeHandler }) => {
  let [showConfirm, setShowConfirm] = useState(false);
  let [showBody, setShowBody] = useState(false);

  const handleConfirm = () => {
    deleteHandler(article.id);
    setShowConfirm(false);
  };

  const renderBody = () => {
    if (showBody) {
      return (
        <Table.Row>
          <Table.Cell colSpan="6">
            <div id="image" style={{ maxHeight: "384px" }}>
              <img src={article.image} alt="image" />
            </div>
            {article.body}
          </Table.Cell>
        </Table.Row>
      );
    } else {
      return null;
    }
  };

  const toggleBody = () => {
    showBody == false ? setShowBody(true) : setShowBody(false);
  };

  useEffect(() => {
    renderBody();
  }, [showBody]);

  return (
    <>
      <Table.Row>
        <Table.Cell
          id={`review-article-${article.id}`}
          onClick={() => toggleBody()}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {article.title}
        </Table.Cell>
        <Table.Cell>{article.category}</Table.Cell>
        <Table.Cell>
          {article.location ? `${article.location}` : "Global"}
        </Table.Cell>
        <Table.Cell>{article.journalist}</Table.Cell>
        {pubStatus === true && (
          <Table.Cell
            id={`${article.id}`}
            textAlign="left"
          >
            <Checkbox
              toggle
              checked={freeStatus}
              onClick={() => freeHandler(article.id, freeStatus)}
            />
          </Table.Cell>
        )}
        <Table.Cell
          id={`publish-article-toggle-${article.id}`}
          textAlign="left"
        >
          <Checkbox
            toggle
            checked={pubStatus}
            onClick={() => publishHandler(article.id)}
          />
        </Table.Cell>
        <Table.Cell textAlign="left">
          <Icon
            name="delete"
            color="red"
            size="large"
            onClick={() => setShowConfirm(true)}
            style={{ cursor: "pointer" }}
          />
        </Table.Cell>
        <Confirm
          open={showConfirm}
          content={`Are you sure you want to delete ${article.title}?`}
          confirmButton="Delete"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => handleConfirm()}
        />
      </Table.Row>
      {renderBody()}
    </>
  );
};

export default ArticleRow;
