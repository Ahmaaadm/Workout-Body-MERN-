const mongoose = require('mongoose')
const Workout  = require('../models/workoutModule')

//get all
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get one
const getWorkout = async (req, res) => {
    try{
    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
    }
    catch(error){
    res.status(404).json({error: error.message})
    }
}


//create one
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body 

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('loads')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the field',emptyFields})
    }

    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
} 

// delete one 
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error:'something happend wrong'})
    }

    res.status(200).json(workout)

}

//update one 
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id : id}, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error:'cannot update right now'})
    }
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}