import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {SaveButton} from '../../Components/'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function GemPaper(props) {
  const { classes } = props;
  const { name, authors, info } = props;
  return (
    <div className="mt-3">
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h4" component="h3">
          {name}
        </Typography>
        <Typography component="p">{info}</Typography>
        <Typography component="p">{authors}</Typography>
          <SaveButton props={props}/>
      </Paper>

    </div>
  );
}

export default withStyles(styles)(GemPaper);
