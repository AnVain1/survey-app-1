const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema survey-vastauksia varten
const answerSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

// Schema contact formia varten
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: String,
});

// Models Schemojen pohjalta
const Answer = mongoose.model('Answer', answerSchema, 'answers');
const Contact = mongoose.model('Contact', contactSchema, 'contact-form');

// MongoDB connection options
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB connection string 
const mongoURI = process.env.MONGO_URI;

// Yhdistä MongoDB
mongoose.connect(mongoURI, dbOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

module.exports = { Answer, Contact };
