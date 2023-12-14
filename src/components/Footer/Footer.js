import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Footer.module.css";
import Logo from "../../images/logo.jpg";
import { Link } from "react-scroll";
import insta from "../../assets/Icon/instagram.png";
import twitter from "../../assets/Icon/twitter.png";
import fb from "../../assets/Icon/facebook.png";

const Footer = () => {
  //Structure & layout of the footer
  return (
    <div className={classes.footer_bg}>
      <Container>
        <Row className={classes.row}>
          <Col lg={6}>
            <div className={classes.info}>
              <div className={classes.image_div}>
                <Link
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  <img
                 className={classes.navbar_brand}
                 src={Logo}
                alt="logo"
                style={{ width: '100px', height: 'auto' }} // This sets the image width to 50px and scales the height automatically
               />
                </Link>
              </div>
              <div className={classes.content_div}>
                <p>
                Created with culinary quintessence, kneaded with more than 20 years of experience. We Rose Petal are happy to serve and always listen to your contributions.
                </p>
                <p>
                  &copy;2022 Made with <i className="bi bi-heart-fill"></i>{" "}
                  by&nbsp;
                  <a
                    href="https://github.com/Phamty2002"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.ty_codes}
                  >
                    Rose Petal Bistro
                  </a>
                </p>
              </div>
            </div>
          </Col>

          <Col lg={3}>
            <div className={classes.about}>
              <h3>About</h3>
              <p>Our Company</p>
              <p>Career</p>
              <p>Investors Relations</p>
              <p>Social Impact</p>
            </div>
          </Col>

          <Col lg={3}>
            <div className={classes.social}>
              <h3>Social</h3>
              <a
                href="https://www.instagram.com/ngw.yhtie/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
                target="_blank"
                rel="noreferrer"
              >
                <p>
                  <img
                    src={insta}
                    alt="instagram"
                    className={classes.social_icon}
                  ></img>
                </p>
              </a>
              <a
                href="https://twitter.com/typham2002"
                target="_blank"
                rel="noreferrer"
              >
                <p>
                  <img
                    src={twitter}
                    alt="twitter"
                    className={classes.social_icon}
                  ></img>
                </p>
              </a>
              <a
                href="https://www.facebook.com/ddanthiee/"
                target="_blank"
                rel="noreferrer"
              >
                <p>
                  <img
                    src={fb}
                    alt="facebook"
                    className={classes.social_icon}
          
                  ></img>
                </p>
              </a>
            </div>
          </Col>

          <p className={classes.mobile_copy}>
            &copy;2022 Made with <i className="bi bi-heart-fill"></i> by&nbsp;
            <a
              href="https://github.com/Eniola-Codes"
              target="_blank"
              rel="noreferrer"
              className={classes.ty_codes}
            >
              Rose Petal Pistro
            </a>
          </p>
        </Row>
      </Container>
    </div>
  );
  //END
};

export default Footer;
