import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList"

const UserPlaces = (props) => { 

    const DUMMY_PLACES = [
      {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
          "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address: "20 W 34th  St, New York, NY 1001",
        location: {
          lat: 40.7484405,
          lng: -73.9878584,
        },
        creator: "u1",
      },
      {
        id: "p2",
        title: "Empire State Building 2",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
          "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address: "20 W 34th  St, New York, NY 1001",
        location: {
          lat: 40.7484405,
          lng: -73.9878584,
        },
        creator: "u2",
      },
    ];
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces}/>

 };

 export default UserPlaces