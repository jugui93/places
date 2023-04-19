
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css'



const NewPlace = () => { 

    const [formState, inputHandler] = useForm({
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid:false
      },
      address: {
        value: '',
        isValid:false
      },

    }, false);

    

    const placeSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs);
    }

    return (
      <form action="" className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id = "title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id = "description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Input
          id = "address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
      </form>
    );
 }

 export default NewPlace;