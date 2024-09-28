import React from "react";

const Footer = () => {
  const date = new Date();

  return (
    <footer>
      <div className="container max-lg padding-a-xsm">
        <div className="col-12">
          <div className="text-center date">Copyright {date.getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
