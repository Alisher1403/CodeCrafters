import React, { useEffect, useRef, useState } from "react";
import classes from "./Navigation.module.scss";

import {
  NavLink,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";

import bellPng from "../../assets/icons/notification.png";
import userPng from "../../assets/icons/user.png";
import firePng from "../../assets/icons/fire.png";
import Code from "../../assets/images/code.png";

import { motion } from "framer-motion";

const Navigation = () => {
  const data = {
    links: [
      { title: "Explore", linkTo: "/" },
      { title: "Problem", linkTo: "/problem" },
      { title: "Interview", linkTo: "/p" },
      { title: "Contest", linkTo: "/p" },
      { title: "Discuss", linkTo: "/p" },
    ],
  };

  const navlink = useRef([]);

  const indicator = useRef();
  const navigate = useNavigate();

  const setNavlink = (e) => {
    e && !navlink.current.includes(e) ? navlink.current.push(e) : null;
  };

  const indicateLink = (index) => {
    indicator.current.style.transform = `translateX(${navlink.current[index].offsetLeft}px)`;
    indicator.current.style.width = `${
      navlink.current[index].getBoundingClientRect().width
    }px`;
    indicator.current.style.transition = "0.3s";
  };

  useEffect(() => {
    navlink.current.forEach((elem, index) => {
      elem.classList.contains("active") ? indicateLink(index) : null;
    });
  }, []);

  return (
    <nav className={classes.nav}>
      <div className="container">
        <div className={classes.navContent}>
          {/*  */}
          <div className={classes.navLeft}>
            <NavLink
              to="/"
              className={`${classes.navLogo} font-Lexend flex gap-3 items-center`}
            >
              CodeCrafters
              <svg
                className="h-8"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <path
                    className="fill-orange-600"
                    d="M406.069,512H105.931C47.431,512,0,464.569,0,406.069V105.931C0,47.431,47.431,0,105.931,0h300.138
		C464.569,0,512,47.431,512,105.931v300.138C512,464.569,464.569,512,406.069,512"
                  />
                  <g>
                    <path
                      className="fill-white"
                      d="M220.69,361.935c-0.998,0-2.022-0.177-3.019-0.539c-4.573-1.668-6.947-6.727-5.27-11.308
			l70.621-194.207c1.66-4.582,6.709-6.939,11.308-5.279c4.573,1.668,6.947,6.727,5.27,11.308l-70.621,194.207
			C227.681,359.711,224.291,361.935,220.69,361.935"
                    />
                    <path
                      className="fill-white"
                      d="M176.552,361.931c-19.474,0-35.31-15.837-35.31-35.31v-40.483l-23.896-23.896
			c-3.452-3.452-3.452-9.031,0-12.482l23.896-23.896v-40.483c0-19.474,15.837-35.31,35.31-35.31c4.882,0,8.828,3.955,8.828,8.828
			c0,4.873-3.946,8.828-8.828,8.828c-9.737,0-17.655,7.918-17.655,17.655v44.138c0,2.339-0.927,4.59-2.586,6.241L136.068,256
			l20.242,20.242c1.66,1.651,2.586,3.902,2.586,6.241v44.138c0,9.737,7.918,17.655,17.655,17.655c4.882,0,8.828,3.955,8.828,8.828
			C185.379,357.976,181.433,361.931,176.552,361.931"
                    />
                    <path
                      className="fill-white"
                      d="M335.448,361.931c-4.882,0-8.828-3.955-8.828-8.828c0-4.873,3.946-8.828,8.828-8.828
			c9.737,0,17.655-7.918,17.655-17.655v-44.138c0-2.348,0.927-4.599,2.595-6.25L375.985,256l-20.286-20.233
			c-1.668-1.651-2.595-3.902-2.595-6.25v-44.138c0-9.737-7.918-17.655-17.655-17.655c-4.882,0-8.828-3.955-8.828-8.828
			c0-4.873,3.946-8.828,8.828-8.828c19.474,0,35.31,15.837,35.31,35.31v40.474l23.958,23.896c1.66,1.651,2.595,3.902,2.595,6.25
			s-0.936,4.599-2.595,6.25l-23.958,23.896v40.474C370.759,346.094,354.922,361.931,335.448,361.931"
                    />
                  </g>
                </g>
              </svg>
            </NavLink>
            <ul className={classes.navList}>
              {data.links.map((elem, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={elem.linkTo}
                      className={classes.navLink}
                      draggable="false"
                      ref={setNavlink}
                      onClick={() => indicateLink(index)}
                    >
                      {elem.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <div className={classes.indicator} ref={indicator}></div>
          </div>

          <div className={classes.navRight}>
            <motion.button
              whileTap={{ scale: 0.8 }}
              className={classes.navIcon}
            >
              <img src={firePng} alt="" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.8 }}
              className={classes.navIcon}
            >
              <img src={bellPng} alt="" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.8 }}
              className={classes.navIcon}
              onClick={() => navigate("/login")}
            >
              <img src={userPng} alt="" />
            </motion.button>
          </div>
          {/*  */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
