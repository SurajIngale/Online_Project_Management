import mongoose from "mongoose";

const connectDb = async () => {
    try {
        let connection = await mongoose.connect("mongodb+srv://svingale2001:le8NPyDaE70h1KCi@cluster0.edgjkpx.mongodb.net/Projects_Management");
        console.log("MongoDb Connected");
        
    } catch (error) {
        console.log("Error connecting Database", error);
        
    }
};

export default connectDb;