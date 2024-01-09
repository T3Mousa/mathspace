// import React from "react";
import { NavLink } from "react-router-dom";
import './TeacherClassTile.css'

const TeacherClassTile = ({ cls }) => {

    return (
        <div>
            <NavLink
                className="classNameTile"
                to={`/classes/${cls.id}`}
                key={cls.id}
            >
                <div className="classImage">
                    <img
                        src={cls.classImg}
                        alt={cls.name}
                        className="clsImg"
                    />
                </div>
                <div className="className">
                    <p>Class Name: {cls.name}</p>
                </div>
            </NavLink>
            <div className="studentCount">
                <p>Class Roster: {cls.studentCount} students</p>
            </div>
        </div>
    )

};

export default TeacherClassTile;
