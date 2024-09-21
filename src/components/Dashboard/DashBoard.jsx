import React, { useEffect, useState, useCallback } from "react";
import Card from "../Card/Card";
import "./DashBoard.css";

const Dashboard = ({ grouping, ordering }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketDetails, setticketDetails] = useState([]);
  const [users, setUsers] = useState({});

  const priorityLabels = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
  };

  // Priority Icons Array
  const priorityIcons = {
    "No Priority": "/0.svg",
    Low: "/1.svg",
    Medium: "/2.svg",
    High: "/3.svg",
    Urgent: "/5.svg"
  };

  // Status Icons Array
  const statusIcons = {
    "Todo": "/Todo.svg",
    "In progress": "/In progress.svg",
    "Done": "/Done.svg",
    "Backlog": "/Backlog.svg"
  };

  // Fetch and refactor data
  const fetchData = useCallback(async () => {
    const storedData = localStorage.getItem("ticketsData");
    if (storedData) {
      const { tickets, users } = JSON.parse(storedData);
      refactorData({ tickets, users });
      console.log('Loaded from localStorage:', { tickets, users });
    } else {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json();
        refactorData(data);
        localStorage.setItem("ticketsData", JSON.stringify({ tickets: data.tickets, users: data.users }));
        console.log('Fetched tickets:', data.tickets);
        console.log('Fetched users:', data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, []);

  const refactorData = async (data) => {
    const userMap = data.users.reduce((acc, user) => {
      acc[user.id] = user; // Map users by their id for easier lookup
      return acc;
    }, {});

    const ticketArray = data.tickets.map((ticket) => {
      const user = userMap[ticket.userId];
      return { ...ticket, userObj: user }; // Add user object to ticket
    });

    setUsers(userMap);
    setTickets(ticketArray);
    setticketDetails(ticketArray);
  };

  // Grouping logic
  const groupTickets = () => {
    if (grouping === "status") {
      return tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    }
    if (grouping === "user") {
      return tickets.reduce((acc, ticket) => {
        const userName = ticket.userObj?.name || "Unknown User";
        acc[userName] = acc[userName] || { tickets: [], count: 0 };
        acc[userName].tickets.push(ticket);
        acc[userName].count += 1;
        return acc;
      }, {});
    }
    if (grouping === "priority") {
      return tickets.reduce((acc, ticket) => {
        const priorityName = priorityLabels[ticket.priority];
        acc[priorityName] = acc[priorityName] || [];
        acc[priorityName].push(ticket);
        return acc;
      }, {});
    }
  };

  // Sorting logic
  const sortTickets = (groupedTickets) => {
    for (const key in groupedTickets) {
      if (grouping === "user") {
        groupedTickets[key].tickets = groupedTickets[key].tickets.sort((a, b) => {
          if (ordering === "priority") {
            return b.priority - a.priority; // Descending order
          }
          if (ordering === "title") {
            return a.title.localeCompare(b.title); // Ascending order
          }
          return 0;
        });
      } else {
        groupedTickets[key] = groupedTickets[key].sort((a, b) => {
          if (ordering === "priority") {
            return b.priority - a.priority; // Descending order
          }
          if (ordering === "title") {
            return a.title.localeCompare(b.title); // Ascending order
          }
          return 0;
        });
      }
    }
    return groupedTickets;
  };

  const groupedTickets = sortTickets(groupTickets());

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="dashboard">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="group">
          <h2>
            {grouping === "priority" && (
              <img
                src={priorityIcons[group] || "/default-priority.svg"} // Fallback if priority not found
                className="priority-icon"
                alt={group}
              />
            )}
            {grouping === "status" && (
              <img
                src={statusIcons[group] || "/default-status.svg"} // Fallback if status not found
                className="status-icon"
              />
            )}
            {grouping === "user"
              ? `${group} ${groupedTickets[group].count}` // Display the user name with the number of tickets
              : group}
            <div className="heading-icons">
              <img src="/add.svg" className="icon plus-icon" alt="Add" />
              <img src="/3 dot menu.svg" className="icon three-dots-icon" alt="Menu" />
            </div>
          </h2>
          {grouping === "user"
            ? groupedTickets[group].tickets.map((ticket) => (
                <Card key={ticket.id} {...ticket} priority={ticket.priority} />
              ))
            : groupedTickets[group].map((ticket) => (
                <Card key={ticket.id} {...ticket} priority={ticket.priority} />
              ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
