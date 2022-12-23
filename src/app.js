import Login from "./login";
import TripsList from "./tripsList";
import React, {useState} from 'react';

export default function App() {
    const [userInfo, setUserInfo] = useState(null)

    return (
        <div className="App">
            <main>
                {userInfo == null
                    ? <Login onLogin={setUserInfo}/>
                    : <TripsList userInfo={userInfo} logout={() => setUserInfo(null)}/>
                }
            </main>
        </div>
    );
}