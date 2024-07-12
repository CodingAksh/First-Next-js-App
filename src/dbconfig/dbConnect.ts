import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connected = mongoose.connection;

        connected.on('connection', () => {
            console.log("connected to MongoDB");
        });

        connected.on('error', (err) => {
            console.log("there is some error while connecting: " + err.message);
            process.exit();
        });
    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
};

export default connection;