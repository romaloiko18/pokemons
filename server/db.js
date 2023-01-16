const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb+srv://romaloiko:VbQyl9uYjTWvbtjn@spinstr.ilxu9mq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((data) => console.log('connected'));
