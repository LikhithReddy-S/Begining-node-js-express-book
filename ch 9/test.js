const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

async function main() {
    var id = '681594fa852e5e5d21cdc78d'
    try {
        await mongoose.connect('mongodb://127.0.0.1/my_database');
        const blogpost = await BlogPost.findById(id);
        console.log("Blog : ",blogpost);
    }   catch(error){
        console.log("Error: ",error);
    } finally {
        mongoose.connection.close();
    }
}
main();
