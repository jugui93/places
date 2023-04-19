import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import './PlaceForm.css'
import { useEffect, useState } from "react";

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
const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;
    
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    useEffect(() => {
        if (identifiedPlace){
            setFormData(
              {
                title: {
                  value: identifiedPlace.title,
                  isValid: false,
                },
                description: {
                  value: identifiedPlace.description,
                  isValid: false,
                },
              },
              true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);
    

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    if (!identifiedPlace) {
        return (
          <div className="center">
            <Card>
              <h2>Could not find place!</h2>
            </Card>
          </div>
        );
    }

    if (isLoading) {
        return (
          <div className="center">
            <h2>Loading...</h2>
          </div>
        );
    }

    return (
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a validdesription(min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid} >UPDATE PLACE </Button>
      </form>
    );
 };

export default UpdatePlace;