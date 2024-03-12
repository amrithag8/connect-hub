const mongoose=require("mongoose");


const connectDb=async()=>{
    console.log("process.env.MONGO_URI", process.env.MONGO_LOCAL_URI);
    try {
        const connection=await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database connected");
        
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
    
}

module.exports=connectDb;
