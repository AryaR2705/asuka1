import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

mongoose.connect('mongodb+srv://aryarramteke:asuka@takashi.t8rzi8e.mongodb.net/message?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(bodyParser.json());

// Create a model for the message schema with a default collection name
const Message = mongoose.model('Message', new mongoose.Schema({
  username: String,
  text: String,
  bot: String,
  timestamp: Date,
  isPhoto: Boolean,
}, { collection: 'messages' }));

app.post('/api/messages/:collectionName', async (req, res) => {
  try {
    const { username, text, bot, isPhoto } = req.body;
    const collectionName = req.params.collectionName;

    // Use the username as the collection name
    const messageCollection = mongoose.connection.db.collection(collectionName);

    const newMessage = new Message({
      username,
      text,
      bot,
      timestamp: new Date(),
      isPhoto,
    });

    // Save the message to the user's collection
    await messageCollection.insertOne(newMessage);

    res.status(201).json({ message: 'Message sent and stored successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
