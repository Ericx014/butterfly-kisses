import {useState, useEffect} from "react";
import sessionService from "../Services/sessions";
import SingleTable from "./SingleTable";

const Table = () => {
  const [sessions, setSessions] = useState([]);
  const [uniqueDays, setUniqueDays] = useState([]);

  useEffect(() => {
    sessionService.getAll().then((allSessions) => {
      setSessions(allSessions);
      console.log("Sessions", allSessions);
    });
  }, []);

  useEffect(() => {
    const days = [
      ...new Set(sessions.map((singleSession) => singleSession.day)),
    ];
    setUniqueDays(days);
  }, [sessions]);

  return (
    <div className="table-container">
      {uniqueDays.map((day,index) => {
        const matchingSession = sessions.filter(
          (singleSession) => singleSession.day === day
        );

        return (
          <SingleTable key={index} uniqueDay={day} sessionToDisplay={matchingSession} />
        );
      })}
    </div>
  );
};

export default Table;
