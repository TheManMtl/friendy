import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./PostCard.css";

const PostCard: React.FC = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row card-title">
            <div className="col-1">
              <ProfileImage
                src="https://picsum.photos/200"
                alt="profile"
                size="small"
              />
            </div>
            <div className="col-11 ">
              <div className="d-flex justify-content-start">
                <h5>User name in City</h5>
              </div>
              <div className="d-flex justify-content-start">
                <p className="smallText">Time</p>
              </div>
            </div>
          </div>
          <div className="card-content container">
            <p className="text-left-custom">
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus id quod
              maxime placeat facere possimus, omnis voluptas assumenda est,
              omnis dolor repellendus. Temporibus autem quibusdam et aut
              officiis debitis aut rerum necessitatibus saepe eveniet ut et
              voluptates repudiandae sint et molestiae non recusandae. Itaque
              earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
              voluptatibus maiores alias consequatur aut perferendis doloribus
              asperiores repellat."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
