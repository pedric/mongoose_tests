const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: {type: Date, default: Date.now},
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course',courseSchema);

async function getCoursesDesc(){
  const courses = await Course
    .find({ isPublished: true, tags:{ $in: ['frontend','backend'] } })
    .select({name:1, author:1, price: 1})
    .sort({price:-1})

    return courses;
}

// async function run(){
//   let courses = await getCoursesDesc();
//   console.log(courses);
// }
//
// run();

getCoursesDesc().then(result => console.log(result));
