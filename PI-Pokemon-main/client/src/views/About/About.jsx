import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.about}>
      <Link to="/home">
        <button className={style.buttonAbout}>Home</button>
      </Link>

   
      <h1>Estudiante</h1>
      <h1>Full Stack Developer</h1>
      <h1>Henry</h1>
    </div>
  );
};

export default About;