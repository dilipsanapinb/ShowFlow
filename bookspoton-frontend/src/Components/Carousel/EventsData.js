import React, { useState } from 'react'
import './events.css'
const eventsData = [
  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NjUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/workshop-and-more-web-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/kids-zone-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/comedy-shows-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/music-shows-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NCBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/esports-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTAgRXZlbnRz,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/upskill-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-OSBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/arts-crafts-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/theatre-shows-collection-202211140440.png",

  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NiBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/dance-classes-collection-202211140440.png",
];

const EventsData = () => {
  const eventsPerPage = 4;
  const totalEvents = 8;
  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextpage = () => {
    setCurrentPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
  };

  const handlePrevpage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const eventsToShow = eventsData.slice(startIndex, endIndex);
    return (
      <div className="events-container">
        <div className="events-carousel">
          <div
            className="events-carousel-content"
            style={{
              transform: `translateX(-${
                (currentPage - 1) * (100 / eventsPerPage)
              }%)`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {eventsToShow.map((event, index) => (
              <div key={index} className="event-card">
                <div
                  className="event-image"
                  style={{ backgroundImage: `url(${event})` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <button onClick={handlePrevpage}>&#8249; Prev</button>
          <span>{/* Page{currPage} of {totalPages} */}</span>
          <button onClick={handleNextpage}>Next &#8250;</button>
        </div>
      </div>
    );
}

export default EventsData