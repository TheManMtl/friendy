import "./PhotoPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dropdown } from 'flowbite-react';


function CustomDropdownButton() {
    return (

        <button className="text-gray-900 focus:outline-none">
            {/* Customize the icon as needed (e.g., three dots) */}
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
            >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
        </button>
    );
}

function PhotoPage() {
    

    return (

        <div>

            <div className="container-nav">
                <ul className="d-flex nav align-items-center">

                    <li className="nav-item">
                        <a className="nav-link" href="/photos">
                            Your Photos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/photo/albums">
                            Album
                        </a>
                    </li>
                </ul>

            </div>


            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                        <div className="relative">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                                className="w-100 shadow-1-strong rounded mb-4"
                                alt="Boat on Calm Water"

                            />
                            <div className="absolute top-0 right-0 m-4 z-10">
                                <Dropdown dismissOnClick={false} renderTrigger={CustomDropdownButton} label={undefined} className="w-60">
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                    <Dropdown.Item>Move to Album</Dropdown.Item>
                                    <Dropdown.Item>Make profile picture</Dropdown.Item>
                                    <Dropdown.Item>Make cover photo</Dropdown.Item>
                                </Dropdown>
                            </div>


                        </div>

                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Wintry Mountain Landscape"
                        />
                    </div>

                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Mountains in the Clouds"
                        />

                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Boat on Calm Water"
                        />
                    </div>

                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Waves at Sea"
                        />

                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Yosemite National Park"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default PhotoPage;