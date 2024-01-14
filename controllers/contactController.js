const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModels")

//@desc Get all contacts
//@route Get /api/contacts
//@access private

const getContacts = asyncHandler(async (req,res) =>{
    const contacts = await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})

//@desc Create New contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req,res) =>{
    console.log("The request body is:",req.body)
    const{name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All Fields are mandatory")
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contacts)
})

//@desc Get contacts
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req,res) =>{
    const contacts = await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contacts)
})

//@desc update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req,res) =>{
    const contacts = await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contacts.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update the contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )

    res.status(200).json(updatedContact)
})

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req,res) =>{

    const contacts = await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contacts.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to delete the contact")
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(contacts)
})

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact}