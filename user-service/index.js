const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

app.use(express.json());

app.post('/users', async(req, res)=>{
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

app.get('/users/:id', async(req,res) =>{
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
});

app.listen(PORT, ()=>{
    console.log(`User Service is running on port ${PORT}`);
});