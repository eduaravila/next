import React, { Component } from "react";
import moment from "moment";

export const DateTag = ({ dateToFormat }) => {
  console.log(dateToFormat);

  return (
    <div>
      <h3>{moment(dateToFormat).format("MMMM d, YYYY")}</h3>
    </div>
  );
};
