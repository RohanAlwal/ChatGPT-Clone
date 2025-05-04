const express = require('express')
const dotenv = require('dotenv');
const app = express()
const cors = require('cors')
const connectDB = require('./config/db');
const port = 3000
dotenv.config();
const authRoutes = require('./routes/authRoutes');

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
