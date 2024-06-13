import React from "react";
import { Ticket } from "../Ticket/Ticket";
import classes from "./TicketList.module.scss";

export const TicketList = ({ tickets }) => {
  return (
    <ul className={classes.TicketList}>
      {tickets.map((item, i) => (
        <li key={`ticketKey-${i}`}>
          <Ticket ticket={item} />
        </li>
      ))}
    </ul>
  );
};
