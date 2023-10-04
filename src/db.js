import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://aryarramteke:asuka@takashi.t8rzi8e.mongodb.net/message?retryWrites=true&w=majority';

// Create a reusable function for connecting to MongoDB
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Export the Mongoose instance for use in other parts of your application
export const db = mongoose.connection;
