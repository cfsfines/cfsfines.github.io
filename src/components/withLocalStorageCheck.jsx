import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SpotifyBodyContainer } from "./SharedStyles";

const TOKEN_KEY = "whos-who-access-token";
const client_id = "ae61067ae0e34694b49600ad8daa1b6d";
const client_secret = "738b8372e9aa40b887d68f84fe42cd7a";

/*
    This higher order function will be called every time the user navigates to SearchPlaylist
    to check the validity of the token. If the token is not present or expired, it will fetch 
    a new, valid one
*/

const withLocalStorageCheck = (WrappedComponent) => {
  return (props) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const fetchToken = async () => {
        try {
          const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
              grant_type: "client_credentials",
            }),
            {
              headers: {
                Authorization: "Basic " + btoa(client_id + ":" + client_secret),
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          const newToken = {
            value: response.data.access_token,
            expiration: Date.now() + (response.data.expires_in - 20) * 1000,
          };
          localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
          setToken(newToken.value);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setAuthLoading(false);
        }
      };

      setAuthLoading(true);
      const storedTokenString = localStorage.getItem(TOKEN_KEY);
      if (storedTokenString) {
        const storedToken = JSON.parse(storedTokenString);
        if (storedToken.expiration > Date.now()) {
          console.log("Token found in localstorage");
          setAuthLoading(false);
          setToken(storedToken.value);
          return;
        } else {
          console.log("Token is expired, fetching new one");
          fetchToken();
        }
      } else {
        console.log("No token found in local storage, fetching new one");
        fetchToken();
      }
    }, [navigate]);

    if (authLoading) {
      return (
        <SpotifyBodyContainer>
          <p>Fetching token...</p>
        </SpotifyBodyContainer>
      );
    }

    return <WrappedComponent {...props} token={token} />;
  };
};

export default withLocalStorageCheck;
