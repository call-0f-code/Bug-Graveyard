const asyncHandler = require('express-async-handler');
const Bug = require('../Models/bug');

//@desc Get all Bugs..
//@route Get /api/bugs
//@access public

const getBugs = asyncHandler(async (req,res) =>
{
    const bugs = await Bug.find();
    res.status(200).json(bugs);
});

//@desc Create new Bug..
//@route POST /api/bugs
//@access public

const createBug = asyncHandler(async (req, res) => 
{
    console.log('The request body is: ',req.body);
    const {title,description,deadline,reward} = req.body;
    if(!title || !description || !deadline || !reward)
    {
        res.status(400);
        throw new Error('All fields are mandatory')
    }
    const bug = await Bug.create({
        title,
        description,
        deadline,
        reward
    });
    res.status(201).json(bug);
});

//@desc Get Bug by id..
//@route Get /api/bugs/:id
//@access public

const getBug = asyncHandler(async (req, res) => 
{
        const bug = await Bug.findById(req.params.id);
        if(!bug)
        {
           res.status(404);
           throw new Error('Bug not found');
        }
        res.status(200).json(bug);
});

//@desc Update Bug by id..
//@route PUT /api/bugs/:id
//@access public

const updateBug = asyncHandler(async(req, res) => 
{
    const bug = await Bug.findById(req.params.id);
    if(!bug)
    {
        res.status(404);
        throw new Error('Bug not found');
    }
    const updatedBug = await Bug.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedBug);
});

//@desc Delete Bug..
//@route DELETE /api/bugs/:id
//@access public

const deleteBugs = asyncHandler(async (req, res) => 
{
    const bug = await Bug.findById(req.params.id);
    if(!bug)
    {
        res.status(404);
        throw new Error('Bug not found');
    }
    
    await bug.deleteOne();
    res.status(200).json(bug);
});

module.exports = 
{
    getBugs,
    createBug,
    getBug,
    updateBug,
    deleteBugs
};