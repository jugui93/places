const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user')

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
          "Something went wrong, could not find a place.",
          500
        );
        return next(error);
    }
    

    if (!place) {
        const error = new HttpError(
          "Could not find a place for the provided id ",
          404
        );
        return next(error);
    }

    res.json({place: place.toObject( {getters:true})});
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    // let places
    try {
        // places = await Place.find({ creator: userId });
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        const error = new HttpError(
          "Fetching place failes, please try again later",
          500
        );
        return next(error);
    }
    

    if (
      !userWithPlaces ||
      userWithPlaces.places.length === 0
      /* !places || places.length === 0 */
    ) {
      return next(
        new HttpError("Could not find places for the provided id ", 404)
      );
    }

    res.json({
      /* places: places.map((place) => place.toObject({ getters: true })),*/
      places: userWithPlaces.places.map((place) => place.toObject({ getters: true }))
    });
}

const createPlace = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.log(errors); 
        next(new HttpError('Invalid inputs passed, please check your data.', 422 ));
    }
    const { title, description, address, creator } = req.body;

    let coordinates;
    
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return  next(error);
    }
    

    const createdPlace = new Place({
        title,
        description,
        location: coordinates,
        address,
        image:"https://tse1.mm.bing.net/th?id=OIP.VZzwhmZhXKvBXjZvVhie5QHaEg",
        creator
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError(
          "Creating place failed, please try again",
          500
        );
        return next(error);
    }

    if (!user){
        const error = new HttpError(
            "Could not find user for provided id",
            500
          );
          return next(error); 
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session: sess});
        user.places.push(createdPlace);
        await user.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
          "Creating place failed, please try again",
          500
        );
        return next(error);
    }

    

    res.status(201).json({place: createdPlace.toObject({ getters: true})})
}

const updatePlaceById = async (req, res, next) => {   
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.log(errors); 
        throw new HttpError('Invalid inputs passed, please check your data.', 422 )
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place; 
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError(
          "Something went wrong, could not update place",
          500
        );
        return next(error);
    }
    place.title = title;
    place.description = description;

    try {
      await place.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update place",
        500
      );
      return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });

 }

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;

    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError(
          "Something went wrong, could no delete place.1",
          500
        );
        return next(error);
    }

    if (!place) {
        const error = new HttpError("Could not find place for this id", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.deleteOne({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Something went wrong, could no delete place.2",
            500
          );
          return next(error);
    }
    res.status(200).json({message: 'Deleted place.'})
  }

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;