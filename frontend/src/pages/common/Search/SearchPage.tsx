import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import { SearchProfile } from "../../../models/SearchProfile";
import axios from "axios";
import BrowseUser from "../../../components/common/BrowseUser/BrowseUser";
import useAuth from "../../../hooks/useAuth";
import { axiosToken } from "../../../hooks/useAxiosToken";

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = ({}) => {
  const { user, setUser } = useAuth();
  const [url, setUrl] = useState<string>("");
  const [profile, setProfiles] = useState<SearchProfile[]>([]);

  const [searchParams] = useSearchParams();
  // /api/profiles/search?search=(string)

  useEffect(() => {
    let theUrl = searchParams.get("search");
    theUrl = theUrl!.replaceAll(" ", ",");
    const fetchData = async () => {
      try {
        const response = await axiosToken
          .get(
            `${process.env.REACT_APP_HOST_URL}/profile/search?search=${theUrl}`
          )
          .then((response: any) => {
            const dataArray = response.data;
            setProfiles(dataArray);

            //   dataArray.forEach((item: any, index: number) => {
            //     console.log(`Object ${index + 1}:`, item);
            //   });
          });
      } catch (error: any) {
        console.error("Error during login:", error.message);
        alert("An error occurred during login. Please try again.");
      }
    };
    fetchData();
  }, [searchParams]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-9 mx-auto">
          <div className="card my-5">
            {profile &&
              profile.length > 0 &&
              profile.map((userProfile, index) => (
                <BrowseUser key={index} profile={userProfile} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
//http://localhost:3000/search?search=alex
