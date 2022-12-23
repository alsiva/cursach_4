import Login from "./login";
import Trips from "./trips";
import React, {useState} from 'react';

export default function App() {
    const [userInfo, setUserInfo] = useState(null)

    return (
        <div className="App">
            <main>
                {userInfo == null
                    ? <Login onLogin={setUserInfo}/>
                    : <Trips userInfo={userInfo} logout={() => setUserInfo(null)}/>
                }
            </main>
        </div>
    );
}