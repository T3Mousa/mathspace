import React from "react";
import { NavLink } from "react-router-dom";
import './StudentClassTile.css'

const StudentClassTile = ({ cls }) => {

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
            <div className="lessonCount">
                <h4>Lessons: </h4> {cls.numLessons}
            </div>
            <div className="assignmentCount">
                <h4>Assignments: </h4> {cls.numAssignments}
            </div>
        </>
    )

};

export default StudentClassTile;
