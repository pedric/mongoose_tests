const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('connected to MongoDB.') )
  .catch(err => console.log('unable to connect ',err) );

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean
});

// Classes, Objects
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Html Course',
  author: 'pedric',
  tags: ['html', 'frontend'],
  isPublished: true
});

// course.save()
//   .then(result => console.log(result))
//   .catch(err => console.log(err))

// function getCourses(){
//   return new Promise((resolve,reject) => {
//     const courses = Course
//       .find({author:'pedric', isPublished: true})
//       .limit(2)
//       .sort({name:1})
//       .select({name:1, tags:1});
//
//       resolve(courses);
//   });
// }

async function getCourses(){
    const courses = await Course
      // .find({author:'pedric', isPublished: true})
      .find({ author: /.*pe.*/i })
      .limit(2)
      .sort({name:1})
      .select({name:1, tags:1});
      return(courses);
}

getCourses().then(result => console.log('then on a async function',result));
