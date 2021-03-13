import React, { useState } from "react";
import history from "../utils/history";
import createIssue from "../functions/createIssue";
import TextField from "./TextField";
import TextArea from "./TextArea";
import config from '../config.json';
// import SelectField from "./components/SelectField";
const repo = process.env.REACT_APP_GITHUB_REPO;
// const configFile = yaml.load(yamlConfig);

const Form = () => {
  console.log(config);
  console.log('repo', config.repo);
  console.log('fields', config.fields);
  const [state, setState] = useState({
    title: "",
    body: "",
    status: "unsubmitted",
  });

  const handleChange = (e) => {
    const { target } = e;
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const formData = {
    title: state.title,
    body: state.body,
  };

  const handleSubmit = () => {
    createIssue(formData).then((result) => {
      if (!result.statusCode || result.statusCode === 200) {
        setState({
          ...state,
          status: "submitted",
        });
        return history.push("/success");
      } else {
        console.error(result.statusCode, result.message);
        history.push("/500");
        setState({
          ...state,
          status: "error",
        });
      }
    });
  };

  return (
    <div className={"form-" + state.status}>
      <h1>
        New <a href={"https://github.com/" + repo}>{repo}</a>{" "}
        issue
      </h1>
      <form>
        <TextField
          name="title"
          label="Title"
          value={state.title}
          onChange={handleChange}
          required
        />
        <TextArea
          name="body"
          label="Body"
          onChange={handleChange}
          value={state.body}
          required
        />
        <button type="button" onClick={handleSubmit}>
          Create issue
        </button>
      </form>
    </div>
  );
};

export default Form;
