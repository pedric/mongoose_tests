const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true })
  .then(() => console.log('connected to mongo-exercises'))
  .catch((err) => console.log(err));

const courseShema = new mongoose.Schema({
  tags: [String],
  date: {type: Date, default: Date.now},
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseShema);

async function getCourses(){
  const courses = await Course
    .find({isPublished:true, tags: 'backend'})
    .sort({name:1})
    .select({name:1,author:1});
  return courses;
}


getCourses().then(result => console.log('Results: ', result));
