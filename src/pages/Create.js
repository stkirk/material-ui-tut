import React, { useState } from "react";
import { Typography, Button, ButtonGroup, Container } from "@material-ui/core/";
import { AcUnitOutlined, Send, KeyboardArrowRight } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/";
//default imports are more performant
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router";

// CUSTOM styles for classes - use as a value for className, the component the class is applied to will still inherit all the base styles from MUI but changed the ones specified in the class
const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "violet",
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  title: {
    textDecoration: "underline",
    marginBottom: 20,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  //form state
  const [formValues, setFormValues] = useState({
    title: "",
    details: "",
    category: "todos",
  });
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const changeHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    //do some vaildation here with the error prop and error states conditional value
    setTitleError(false);
    setDetailsError(false);

    if (formValues.title === "") {
      setTitleError(true);
    }
    if (formValues.details === "") {
      setDetailsError(true);
    } else {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formValues),
      }).then((res) => history.push("/"));
    }
  };

  //save our makeStyles class as a variable to be applied to a button below
  const classes = useStyles();

  return (
    <Container>
      {/* use typography for headings paragraphs etc */}
      <Typography
        variant="h6"
        // variant is what it looks like
        component="h2"
        //component is what the output is in html
        color="textSecondary"
        // align="center"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={changeHandler}
          value={formValues.title}
          name="title"
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={changeHandler}
          value={formValues.details}
          name="details"
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            name="category"
            value={formValues.category}
            onChange={changeHandler}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          // disableElevation
          startIcon={<Send />}
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>

      {/* Using classes */}
      {/* <Typography
        variant="h6"
        color="textPrimary"
        gutterBottom
        className={classes.title}
      >
        Typography with class
      </Typography> */}
      {/* Button with class */}
      {/* <Button className={classes.btn}>Class Button</Button> */}
      {/* <Button type="submit" color="primary">
        Submit
      </Button>
      <Button type="submit" color="secondary" variant="outlined">
        Submit
      </Button>

      Apply styles for all buttons in the group to the ButtonGroup
      <ButtonGroup color="secondary" variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>{" "} */}

      {/* ICONS */}
      {/* <br /> */}
      {/* <AcUnitOutlined />
      <AcUnitOutlined color="secondary" fontSize="large" />
      <AcUnitOutlined color="action" fontSize="small" />
      <AcUnitOutlined color="error" fontSize="small" />
      <AcUnitOutlined color="disabled" fontSize="small" /> */}
    </Container>
  );
}
