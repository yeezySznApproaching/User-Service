const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
const UserSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

app.use(express.json());

app.post('/users', async(req, res)=>{
    try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/users/:id', async(req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found'});
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(PORT, ()=>{
    console.log(`User Service is running on port ${PORT}`);
});