const User = require('../models/User');
const { encryptPassword }  = require('../utils/encrypt_decrpyt');
const { logger } = require('../utils/logger');

async function getUsers(req, res) {
    try {

        const users = await User.find();

        if(!users){
            return res.status(404).send({message : "No Users found."});
        }
        res.status(200).render('layout',{users : users, content : './users/index', title : 'User'});
       
    } catch (error) {
        logger(0, error.message, 'getUsers'); 
        throw new Error('Error while geting the all users : ' + error.message);
    }
}

async function getUser(req, res) {
    try {

        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).send({message : "No Users found."});
        }
        res.status(200).render('./users/edit',{user : user});

    } catch (error) {
        logger(0, error.message, 'getUser');
        throw new Error('Error while geting the user : ' + error.message);
    }
}

async function updateUser(req,res) {
    try {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

         if(!user){
            return res.status(404).send({message : "No User found to update "});
        }
        res.status(200).send({message : "User updated successfully "});    

    } catch (error) {
        logger(0, error.message, 'updateUser');
        throw new Error('Error while updating the user : ' + error.message);
    }
}

async function deleteUser(req, res) {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).send({message : "No User found to delete "});
        }
        res.status(200).send({message : "User delete successfully."});

    } catch (error) {
        logger(0, error.message, 'deleteUser');
        throw new Error('Error while deleting the user : ' + error.message);
    }
}

async function createUser(req, res) {
    try {

        const { first_name,last_name,email,password } = req.body;

        const { salt, hashedPassword } = await encryptPassword(password);

        const user = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            salt: salt
        });

        const createduser = await user.save();

        if(createduser){
            return res.status(201).send({message : "User created successfully."});
        }
        else        
            return res.status(404).send({message : "No User created."});

    } catch (error) {
        logger(0, error.message, 'createUser');
        throw new Error('Error while creating the user : ' + error.message);
    }
}

module.exports = { getUsers, getUser, updateUser, deleteUser, createUser };