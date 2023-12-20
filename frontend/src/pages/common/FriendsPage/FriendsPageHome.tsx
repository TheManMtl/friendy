import React from 'react'
import { Button } from '../../../components/common';
import "./FriendsPage.css";

function FriendsPageHome({ userId }: { userId: number | undefined }) {

    const dummyPanels = Array.from({ length: 50 }, (_, index) => (
        <div key={index} className="panel justify-content-center align-items-center" style={{ backgroundImage: `url('https://picsum.photos/200/200?random=${index}')` }}>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="friendName">
                <h5 className="mb-4">Friend {index + 1}</h5>
                <Button
                    label="Add Friend"
                    variant="blue"
                    onClick={() => console.log(`Add Friend ${index + 1}`)}
                />
            </div>
        </div>
    ));

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center p-2 m-2">
                <h4>...need to figure out what actually goes here...</h4>
            </div>
            <div className="panel-grid">
                {dummyPanels}
            </div>
        </div>
    )
}

export default FriendsPageHome
