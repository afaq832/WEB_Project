const mongoose = require('mongoose');
const Student = mongoose.model('Student'); // Assuming 'Student' model is defined

// Create an instance of the 'Student' model with data
const newStudent = new Student({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  studentNumber: 123456,
  password: 'securepassword',
  program: 'Computer Science',
  city: 'New York',
  address: '123 Main St',
  phone: '555-1234'
});

// Save the instance to the database
newStudent.save((err, savedStudent) => {
  if (err) {
    console.error('Error saving student:', err);
  } else {
    console.log('Student saved successfully:', savedStudent);
  }
});
