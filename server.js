const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();



const connectDB = require("./db");

const contactRoutes = require("./routes/contactRoute");

const authRoutes = require("./routes/authRoute");

const orderRoutes = require("./routes/orderRoute");

const profileRoutes = require("./routes/profile");







const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/contact', contactRoutes);

app.use('/api/auth', authRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/profile", profileRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend is running.')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

