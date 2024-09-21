import React from 'react';
import './Card.css';

const Card = ({ id, title, tag, status, priority }) => {
  // Define the icon path based on status
  const getStatusIcon = (status) => {
    return `/${status}.svg`; // Assuming the icons are named 'open.svg', 'in-progress.svg', 'closed.svg', etc.
  };

  const getPriorityIcon = (priority) => {
    return `/${priority}.svg`; // Assuming the icons are named 'low.svg', 'medium.svg', 'high.svg', etc.
  };

  return (
    <div className="cardContainer">
      <div className="cardHeading">
        <span className="color-grey" style={{ textTransform: "uppercase" }}>{id}</span>
      </div>
      <div className="imageContainer">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          alt="UserImage"
          className="userImage"
        />
        <div className="showStatus"></div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>
      <img src={getStatusIcon(status)} style={{ width: '16px', height: '16px' }} />
        <p>{title}</p>
      </div>
      <div className="cardTags">
        <div className="tags color-grey">
          <img src={getPriorityIcon(priority)} className="priorityIcon" />
        </div>
        {tag?.map((elem, index) => (
          <div key={index} className="tags color-grey">
            <span>•</span> {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
