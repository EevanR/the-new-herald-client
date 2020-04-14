import React, { useState, useEffect } from "react";
import { createArticle } from "../../modules/article";
import {
  Header,
  Input,
  TextArea,
  Form,
  Select,
  Tab,
  Menu,
  Icon,
  Image, 
  Dimmer, 
  Loader
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const CreateArticle = () => {
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [category, setCategory] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [titleSv, setTitleSv] = useState("");
  const [bodySv, setBodySv] = useState("");
  const [engFormFilled, setEngFormFilled] = useState(false);
  const [sweFormFilled, setSweFormFilled] = useState(false);
  const [loader, setLoader] = useState(false);

  const { t } = useTranslation();
  let submitMessage;

  const submitArticleHandler = async e => {
    setLoader(true)
    e.preventDefault();
    const response = await createArticle(
      titleEn,
      bodyEn,
      titleSv,
      bodySv,
      category,
      imageBase64
    );
    if (response.status === 200) {
      setLoader(false)
      setSubmitSuccess(true);
    } else if (response.status === 422) {
      setLoader(false)
      setSubmitSuccess(false);
    }
  };

  if (submitSuccess) {
    submitMessage = (
      <div id="create-article-message" style={{ color: "green" }}>
        Your article was successfully submitted for review.
      </div>
    );
  } else if (submitSuccess === false) {
    submitMessage = (
      <div id="create-article-message" style={{ color: "red" }}>
        Your article must have title, content, category and image.
      </div>
    );
  }

  const imageUploadHandler = async e => {
    const image = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(image);
  };

  const categories = [
    { key: "nw", value: "news", text: "News" },
    { key: "fd", value: "food", text: "Food" },
    { key: "th", value: "tech", text: "Tech" },
    { key: "cu", value: "culture", text: "Culture" },
    { key: "sp", value: "sports", text: "Sports" },
    { key: "mi", value: "misc", text: "Misc" }
  ];

  useEffect(() => {
    titleEn !== "" && bodyEn !== ""
      ? setEngFormFilled(true)
      : setEngFormFilled(false);
  }, [titleEn, bodyEn]);

  useEffect(() => {
    titleSv !== "" && bodySv !== ""
      ? setSweFormFilled(true)
      : setSweFormFilled(false);
  }, [titleSv, bodySv]);

  const panes = [
    {
      menuItem: (
        <Menu.Item key="english">
          English&nbsp;
          {engFormFilled ? (
            <Icon name="circle" size="tiny" color="green" />
          ) : (
            <Icon name="circle" size="tiny" color="red" />
          )}
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <Form.Field
            key="title_en"
            maxLength={55}
            placeholder="55 character max length"
            control={Input}
            label="Title"
            id="title_en"
            value={titleEn}
            onChange={e => setTitleEn(e.target.value)}
          />
          <Form.Field
            key="body_en"
            control={TextArea}
            label="Body"
            id="body_en"
            value={bodyEn}
            onChange={e => setBodyEn(e.target.value)}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: (
        <Menu.Item key="swedish">
          Svenska&nbsp;
          {sweFormFilled ? (
            <Icon name="circle" size="tiny" color="green" />
          ) : (
            <Icon name="circle" size="tiny" color="red" />
          )}
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <Form.Field
            key="title_sv"
            maxLength={55}
            placeholder="55 character max length"
            control={Input}
            label="Titel"
            id="title_sv"
            value={titleSv}
            onChange={e => setTitleSv(e.target.value)}
          />
          <Form.Field
            key="body_sv"
            control={TextArea}
            label="Innehåll"
            id="body_sv"
            value={bodySv}
            onChange={e => setBodySv(e.target.value)}
          />
        </Tab.Pane>
      )
    }
  ];

  return (
    <>
      <Header className="create-header" as="h1">{t("admin.createArticle")}</Header>
      <Form id="article-form" onSubmit={submitArticleHandler}>
        <Tab panes={panes} style={{ paddingBottom: "10px" }} />
        <Form.Field
          required
          control={Select}
          id="selector"
          label="Category"
          placeholder="Select category"
          onChange={(e, data) => setCategory(data.value)}
          options={categories}
          width={4}
        />
        <div id="image-preview">
          {imageBase64 ? (
            <Image
              bordered
              src={imageBase64}
              style={{ maxWidth: "384px" }}
              alt="preview"
            ></Image>
          ) : null}
        </div>
        <Form.Field
          className="ui icon right labeled button"
          as="label"
          htmlFor="image-upload"
        >
          {t("admin.addImage")}&nbsp;
          <Icon name="image outline" />
        </Form.Field>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          onChange={e => imageUploadHandler(e)}
        />
        {submitMessage}
        <Form.Button positive type="submit" id="submit">
          {t("login.submit")}
        </Form.Button>
        {loader === true && (
          <Dimmer active inverted>
            <Loader size='large'>Writing...</Loader>
          </Dimmer>
        )}
      </Form>
    </>
  );
};

export default CreateArticle;
