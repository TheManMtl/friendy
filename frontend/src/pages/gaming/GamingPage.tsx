import React from "react";
import "./GamingPage.css";

const GamingPage = () => {
  return (
    <div className="container-fluid px-0 mx-0">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-md-10 row d-flex justify-content-center mb-4">
          {/* Memory Game */}
          <a
            href="https://memorygame-11e4d4e65900.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-md-2 card py-2 px-2 mx-3 "
          >
            <div className="image-container">
              <img
                src="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/418731128_2433203690184360_5606602523860876661_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a73e89&_nc_ohc=M97xk_3dATYAX_gqz00&_nc_ht=scontent-lga3-2.xx&oh=00_AfB6VTCK6JtrtpLO56_ZkP8bKAC5R4EbgpQPSXdl-bX3gw&oe=65A3D21F"
                alt="memory game "
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              ></img>
            </div>
            <div className="d-flex mt-2">
              <h4>Memory</h4>
            </div>
          </a>
          {/* Hangman Game */}
          <a
            href="https://ts-hangman-ptvt.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-md-2 card py-2 px-2 mx-3 "
          >
            <div className="image-container">
              <img
                src="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/418734765_2433203806851015_4684489740892116279_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a73e89&_nc_ohc=Q9K178oV4MgAX8-XD2o&_nc_ht=scontent-lga3-2.xx&oh=00_AfARmjd5C8Y6oM4AFFH1Ll-mIfZ3YeWSXzCHNzAnA0VBNQ&oe=65A4600F"
                alt="hangman game1 "
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              ></img>
            </div>
            <div className="d-flex mt-2">
              <h4>HangMan 1</h4>
            </div>
          </a>
          {/* Blackjack Game */}
          <a
            href="https://mer-w.github.io/UI_Project/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-md-2 card py-2 px-2 mx-3 "
          >
            <div className="image-container">
              <img
                src="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/418732522_2433203833517679_6816576426309705858_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a73e89&_nc_ohc=CdDC0u60JKEAX-V3f_u&_nc_ht=scontent-lga3-2.xx&oh=00_AfCZ1RhKmmSUYqmVrTOcz3GWZOcXLpmGbXNO-8RVeW92eQ&oe=65A4B761"
                alt="balckjack game "
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              ></img>
            </div>
            <div className="d-flex mt-2">
              <h4>Blackjack</h4>
            </div>
          </a>
          {/* Hangman 2 */}
          <a
            href="https://hangman-game-online-48166923c0d6.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-md-2 card py-2 px-2 mx-3 "
          >
            <div className="image-container">
              <img
                src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/418731419_2433203820184347_2295089717306647399_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a73e89&_nc_ohc=n_v67gAN7_8AX9ZMRtp&_nc_ht=scontent-lga3-1.xx&oh=00_AfB5CdHYy4yVptsDKXPEYdq_610OQeImTQTWHrzr3X4ClQ&oe=65A38FFC"
                alt="hangman game2 "
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              ></img>
            </div>
            <div className="d-flex mt-2">
              <h4>Hangman 2</h4>
            </div>
          </a>
        </div>
        <div style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default GamingPage;
