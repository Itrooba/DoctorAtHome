const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require('./routes/auth');
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

dotenv.config();
mongoose.connect( process.env.DATABASE_ACCESS, ()=> {console.log("DATABASE CONNECTED")} );

// middleware
//if morgan give error install minimist
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);


io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

const port = process.env.PORT || 5000;

//app.listen(port, () => console.log(`Listening on port ${port}`));
server.listen(port, () => console.log(`Server is running on port ${port}`));

