import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:3000/students";
  const courseCode_List = [
    {value: 'ENG101', name: 'English Basics', label:'ENG101: English Basics'},
      {value: 'BS101', name: 'Business Basics', label:'BS101: Business Basics'},
      {value: 'CS229', name: 'Web Development', label:'CS229: Web Development'},
      {value: 'CS253', name: 'Game Development', label:'CS253: Game Development'},
      {value: 'CS202', name: 'Introduction to Data Sceince', label:'CS202: Introduction to Data Sceince'},
      {value: 'CS223', name: 'Topics in Software engineering', label:'CS223: Topics in Software engineering'},
];

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (courseCode) => {
    props.history.push({
      pathname: '/StudentsEnrolledInCourse/' + courseCode
    });
  }

  return (
    <div>
        
      { data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <div class="header">
        <div class="mask">
        <div class="d-flex justify-content-center align-items-center h-200">
          <div class="text-white margin-class">List Of all courses</div></div></div></div>
          <Container>
          <ListGroup className="text-center wrapperList">
          {courseCode_List.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item.value) }}>{item.label}</ListGroup.Item>
            ))}
          </ListGroup>
        
          </Container>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(List);
