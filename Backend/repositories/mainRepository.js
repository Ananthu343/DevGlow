import mongoose from "mongoose";

class Database {
   constructor(connectionString) {
      this.connectionString = connectionString;
   }

   async connect() {
      try {
         await mongoose.connect(this.connectionString);
         console.log('Database connected successfully');
      } catch (error) {
         console.error('Error connecting to the database:', error);
      }
   }

}

export default Database