import React from "react";
import "../styles/FooterStyle.css";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="position-absolute bottom-0  main ">
          <div className="f-info">
            <div className="f-info-socials">
              <a
                href="https://www.facebook.com/profile.php?id=100010234428520"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook" href=""></i>
              </a>
              <a
                href="https://www.instagram.com/sanjeev_kr_prasad11/"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fa-brands fa-square-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/sanjeev-kumar-537555249/"
                target="_blank" rel="noopener noreferrer"
              >
                {" "}
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
            <div className="f-info-company"> &copy; BLOGAPP Private Limited</div>

            <div className="f-info-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
