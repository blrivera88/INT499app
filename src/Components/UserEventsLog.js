import React from "react";
import "./UserEventsLog.css"; // Add styling if needed

function UserEventsLog({ events }) {
  return (
    <div className="user-events-log">
      <h2>User Events Log</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.eventType}</strong> at {new Date(event.timestamp).toLocaleString()}:
            <br />
            {typeof event.details === "string" 
              ? event.details 
              : JSON.stringify(event.details)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserEventsLog;

