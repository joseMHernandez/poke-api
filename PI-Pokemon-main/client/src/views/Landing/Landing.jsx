import React from "react";
import style from "./Landing.module.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Landing() {
  return (
    <div className={style.landing}>
      <Link to="/home">
        <button className={style.button}>Home</button>
      </Link>
    </div>
  );
}