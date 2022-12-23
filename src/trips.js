import React from 'react';


export default function Trips({ userInfo, logout }) {


    return (
        <div className={"header"}>
            <h1>Hi, {userInfo.name}</h1>
            <h2>List of trips</h2>
            <button onClick={logout}>logout</button>
        </div>
    )
}
