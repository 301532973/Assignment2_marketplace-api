const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to DressStore application." });
  });
  
// Connect to MongoDB
const uri = 'mongodb+srv://Harpreet_Kaur:U1br5WDgEkhjIxCK@assignment2.e7yuf.mongodb.net/?retryWrites=true&w=majority&appName=Assignment2'; // Replace with your connection string
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use('/api', productRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
