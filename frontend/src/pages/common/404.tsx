import { Button } from "../../components/common";
import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();
    return (
        <div className="col-10 offset-1">
            <div className="row mt-5">
                <div className="card">
                    <div className="row mt-5">
                    </div>
                    <div className="card-title text-start">
                        <div className="row m-3 mt-5">

                            <div className="col-10 offset-1 display-1">
                                Oops!
                            </div>
                        </div>
                    </div>
                    <div className="row m-3 mb-5">
                        <div className="card-subtitle text-start">
                            <div className="col-10 offset-1 display-6">
                                Not found.
                            </div>
                        </div>
                    </div>
                    <div className="row m-5 justify-content-center">
                        <div className="col-3">
                            <Button
                                variant="blue"
                                label="Back to Home"
                                onClick={() => navigate("/")}
                            ></Button>
                        </div>
                    </div>
                    <div className="row mt-5">
                    </div>
                </div>

            </div>
        </div>

    );
}

export default NotFound;