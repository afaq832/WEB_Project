import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

//
function UpdateCourse(props) {
    //
    const [studentId,setStudentId] = useState('');
    const id = props.match.params.courseId;
    console.log('props.screen',props.match.params.courseId)
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section:'',semester:'', studentEntity: '' });
    const [showLoading, setShowLoading] = useState(false);

    const courseCode_List = [
      {value: 'ENG101', name: 'English Basics', label:'ENG101: English Basics'},
      {value: 'BS101', name: 'Business Basics', label:'BS101: Business Basics'},
      {value: 'CS229', name: 'Web Development', label:'CS229: Web Development'},
      {value: 'CS253', name: 'Game Development', label:'CS253: Game Development'},
      {value: 'CS202', name: 'Introduction to Data Sceince', label:'CS202: Introduction to Data Sceince'},
      {value: 'CS223', name: 'Topics in Software engineering', label:'Topics in Software engineering'},


  ];
    //
    const apiUrl = "http://localhost:3000/courses/"+ id;
  
    //
    //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      setStudentId(course.studentEntity);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

    const updateCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        console.log("section: "+course.section);
        const data = {
            section: course.section, 
            courseName : course.courseName, 
            courseCode : course.courseCode,
        };
        //
        axios.put(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save course:',result.data)
            props.history.push({
                pathname: '/showCourse/' + id            })

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setCourse({...course, [e.target.name]: e.target.value});
      }

      const onCourseChange=()=>{
        var cc = document.getElementById('courseCode');
        courseCode_List.forEach(element=>{
          if(cc.value===element.value){
            setCourse(course.courseName = element.name)
          }
        });
      };

      const onCourseChangeHandler = (e) => {
        onCourseChange();
        onChange(e);
      }
    
    return (
        <div>
        <div class="header">
        <div class="mask">
        <div class="d-flex justify-content-center align-items-center h-200">
          <div class="text-white margin-class"> Edit A Course </div></div></div></div>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={updateCourse}>
              <Form.Group>
                <Form.Label> Course Code cannot be changed</Form.Label>
                <Form.Control as="select" name="courseCode" id="courseCode" value={course.courseCode} onChange={onCourseChangeHandler} disabled>
                    <option disabled>Choose</option>
                    {
                      courseCode_List.map((opt,idx)=>{
                        return (
                          <option key={idx} value={opt.value}>{opt.label}</option>
                        )
                      })
                    }
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label> Semester cannot be changed</Form.Label>
                <Form.Control as="select" name="semester" id="semester"  value={course.semester} onChange={onChange} disabled>
                    <option value="2021 Summer">Spring 2023 (May 2021)</option>
                    <option value="2021 Fall">Fall 2023 (September 2021)</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Section can be changed:</Form.Label>
                <Form.Control as="select" name="section" id="section"  value={course.section} onChange={onChange}>
                  <option value="001">Section: 001</option>
                    <option value="002">Section: 002</option>
                    <option value="003">Section: 003</option>
                    <option value="004">Section: 004</option>
                    <option value="005">Section: 005</option>
                    <option value="006">Section: 006</option>
                    <option value="007">Section: 007</option>
                </Form.Control>
              </Form.Group>

              

              <Button variant="primary" type="submit">
                update
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(UpdateCourse);
