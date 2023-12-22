import React from "react";
import { NavLink } from "react-router-dom";
import './TeacherClassTile.css'

const TeacherClassTile = ({ cls }) => {

    return (
        <>
            <NavLink
                className="classTile"
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
            </NavLink>
            <div className="className">
                <h4>Name: </h4> {cls.name}
            </div>
            <div className="classDescription">
                <h4>Description: </h4> {cls.description}
            </div>
            <div className="studentCount">
                <h4>Class Roster: </h4> {cls.studentCount}
            </div>
        </>
    )

};

export default TeacherClassTile;
