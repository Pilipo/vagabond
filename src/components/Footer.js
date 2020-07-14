import React from 'react';

function Footer(props) {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>{process.env.REACT_APP_NAME}<span className="text-gray-500"> {process.env.REACT_APP_VERSION}</span></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
