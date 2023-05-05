import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList"
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = (props) => { 
    const [loadedPlaces, setLoadedPlaces] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
          setLoadedPlaces(responseData.places)
        } catch (err) {
          
        };        
      }
      fetchPlaces();
    },[sendRequest, userId])

    return (
      <>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
      </>
    );

 };

 export default UserPlaces