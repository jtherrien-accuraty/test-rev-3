import React, { useState, Component } from 'react';
import './scss/App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import ButtonToolBar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Logo from './assets/Logos/CC-logo-white-text.png';
import HeaderBackgroundImage from './assets/images/Online-Scheduling-backgroud-w3244.jpg'; 
// import fetcher from './utils/fetcher';
// import jsonSearch from './utils/jsonSearch';


class Scheduler extends Component{
  constructor(props){
    super(props);
    this.state = {
      jsn: [],
      deptSelection: '',
      patientType: '',
      currentStep: 1,
      id: `94788,89909,90962,102348,69877,91798,100961,`,
      dept: `3001043,3001108,3001114,3001005,3001181,3001037,`,
      vt: `2759`
    }
    this.mounted = false;
  }
  componentWillUnmount(){
    this.mounted = false;
  }
  componentDidMount(){
    this.mounted = true;
    try{
      // fetch('https://chrc-app2020.accuraty.ws/api/2sxc/app/chrcv01/api/public/tips', {mode: 'no-cors'})
      // fetch('https://jsonplaceholder.typicode.com/todos/1') // <= works
      fetch('http://www.culawncare.com/wp-content/uploads/2021/01/test.json')
      // fetch('http://www.culawncare.com/wp-content/uploads/2021/01/CHRC-Dept-List.json')
      .then( (resp) => {
        console.log(resp);
        return(resp.json());
      })
      .then( (jsn) => {
        console.log(JSON.stringify(jsn));
        if(this.mounted){
          this.setState({jsn: jsn});
        }
      });
      console.log('END');
    }
    catch(err){
      console.log('error:' + err);
    }
    try{
      fetch("https://www.mychristie.com/Christie/openscheduling/SignupAndSchedule/EmbeddedSchedule?id=94788,89909,90962,102348,69877,91798,100961,&amp;dept=3001043,3001108,3001114,3001005,3001181,3001037,&amp;vt=2759")
      .then( (resp) => {
        resp.text();
      })
      .then( (res) => {
        this.setState({html: res});
        console.log(res);
      })
      
    }
    catch(err){
      console.log(err);
    }
  }

  deptButtons(){
    let deptButtons = [];
    let idx = 0;
    let rowIdx = 1;
    for(let x of this.state.jsn){
      deptButtons.push(
        <Col sm={true} className='p-3' key={'deptButton-col-' + x.Title}>
          <Button style={{height: '100%'}} block variant='primary' key={'deptButton-' + x.Title} onClick={() => {this.setState({currentStep: 2, deptSelection: x.Title})}}>{x.Title}</Button>
        </Col>
      );
      // idx++;
      if(idx === 2){
        idx = 0;
        deptButtons.push(
          <Col sm={12} key={'deptButton-placeholder-col-' + rowIdx++}/>
        );
      }
    }
    return(
      <Container key='dept-buttons-container' className='dept-buttons-container p-0' fluid>
        <Row  className='px-0' key='dept-buttons-row' sm={2}>
          {deptButtons}
        </Row>
      </Container>
    );
  }

  DEMOrender(){
    return(
      <Container fluid>
        <Row>
          <Col md={4}>
            <p>{JSON.stringify(this.state.jsn)}</p>
          </Col>
          <Col md={4}>
            <p>Test2</p>
          </Col>
        </Row>
      </Container>
    );
  }

  render(){
    if(this.state.currentStep === 1){
      return(
        <Container fluid style={{ backgroundColor: 'white', height: '100%', width: '100%', display: 'flex', flexFlow: 'column'}} className='py-5 px-0'>
          
            <Row className='pb-5 px-0'>
              <Col className='mb-0'>
                <span className='text-secondary h2'><strong>STEP 1: </strong></span><span className='ml-2 text-primary h3'><strong>Choose a department</strong></span>
              </Col>
            </Row>
          
            <Row className='p-3' style={{flex: '1 1 auto', backgroundColor: 'lightgray'}}>
              {this.deptButtons()} 
            </Row>
          
        </Container>
      );
    }
    else if(this.state.currentStep === 2){
      return(
        <Container fluid style={{backgroundColor: 'white', height: '100%', width: '100%',  display: 'flex', flexFlow: 'column'}} className='py-5 px-0'>
         
          
            <Row className='pb-5 px-0'>
              <Col className='mb-0'>
                <span className='text-secondary h2'><strong>STEP 2: </strong></span><span className='ml-2 text-primary h3'><strong>Are you a new or existing patient?</strong></span>
              </Col>
            </Row>
          
            <Row className='p-3' style={{backgroundColor: 'lightgray'}}>
              <Container key='dept-buttons-container' className='dept-buttons-container p-0' fluid>
                <Row className='px-0' key='dept-buttons-row' sm={2}>
                  <Col className='p-3' sm={true}>
                    <Button block variant='primary' key='patientButton-new' onClick={() => {this.setState({currentStep: 3, patientType: 'NEW PATIENT'})}}>NEW PATIENT</Button>
                  </Col>
                  <Col className='p-3' sm={true}>
                    <Button block variant='primary' key='patientButton-established' onClick={() => {this.setState({currentStep: 3, patientType: 'ESTABLISHED PATIENT'})}}>ESTABLISHED PATIENT</Button>
                  </Col>
                  <Col className='p-3' sm={12}>
                    <Button block variant='secondary' key='patientButton-startOver' onClick={() => {this.setState({currentStep: 1, patientType: '', deptSelection: ''})}}>START OVER</Button>
                  </Col>
                </Row>
              </Container>
            </Row>
          
        </Container>
          
      );
    }
    else if(this.state.currentStep === 3){
      return(
        <Container fluid style={{backgroundColor: 'white', height: '100%', width: '100%', display: 'flex', flexFlow: 'column'}} className='py-5 px-0'>
            <Row className='pb-5 px-0'>
              <Col className='mb-0'>
                <span className='text-secondary h2'><strong>STEP 3: </strong></span><span className='ml-2 text-primary h3'><strong>Pick a Provider, Date, and Time</strong></span>
              </Col>
            </Row>
          
            <Row className='p-0' style={{ flex: '1 1 auto'}}>
              <Container key='dept-buttons-container' style={{display: 'flex', flexFlow: 'column'}} className='dept-buttons-container p-0' fluid>
                <Row key='dept-buttons-row' className='p-3 mb-3' style={{backgroundColor: 'lightGrey'}}>
                <Col className='p-3' sm={6}>
                    <Button disabled block variant='primary' key='patientButton-new' onClick={() => {this.setState({currentStep: 4, patientType: 'new'})}}>{this.state.patientType}</Button>
                  </Col>
                  <Col className='p-3' sm={6}>
                    <Button block variant='secondary' key='patientButton-startOver' onClick={() => {this.setState({currentStep: 1, patientType: '', deptSelection: ''})}}>START OVER</Button>
                  </Col>
                </Row>
                <Row className='mt-3 px-0' style={{flex: '1 1 auto', justifyContent: 'center'}}>
                  {/* <iframe src='http://culawncare.com' height='100%' width='100%' className='p-3'/> */}
                  <iframe id="openSchedulingFrame" className="widgetframe p-3" scrolling="no" src={`https://www.mychristie.com/Christie/openscheduling/SignupAndSchedule/EmbeddedSchedule?id=${this.state.id}&dept=${this.state.dept}&vt=${this.state.vt}`} style={{width:'100%', height: '100%', border: 'none', minHeight: '530px', maxWidth: '732px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'lightGrey'}}></iframe>
                  {/* <p>{this.state.html}</p> */}
                </Row>
              </Container>
            </Row>
          
        </Container>
      );
    }
    else{
      return(<Button block variant='secondary' key='patientButton-startOver' onClick={() => {this.setState({currentStep: 1, patientType: '', deptSelection: ''})}}>START OVER</Button>);
    }
  }
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Container className='container-main px-0' style={{height: '100%', display: 'flex', flexFlow: 'column'}} fluid>
        <Container className='px-0' fluid>
          <Row className='py-0 m-0' id='test' style={{ justifyContent: 'left', paddingLeft: '4.16%', paddingRight: '4.16%',  backgroundImage: 'url(' + HeaderBackgroundImage + ')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} >
            <Col className='p-0'  style={{alignSelf: 'center'}}>
              <Image src={Logo} alt='Christie Clinic Logo' style={{maxHeight: '100px'}} fluid />
            </Col>
            <Col className='px-0 py-3'>
              <Container className='py-3 px-0' style={{justifyContent: 'right', width: '100%'}} fluid>
                <Row className='p-0' style={{justifyContent: 'center'}}>
                  <h1 style={{color: 'white', width: '100%', textAlign: 'right'}}>ONLINE SCHEDULING</h1>
                </Row>
                <Row className='p-0' style={{justifyContent: 'center'}}>
                  <h2 style={{color: 'white', width: '100%', textAlign: 'right'}}>Follow the steps below.</h2>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>  
        <Container className=' body' style={{ flex: '1 1 auto', display: 'flex', backgroundColor: 'white', paddingLeft: '4.16%', paddingRight: '4.16%'}} fluid>
          <Row className='px-0' style={{minHeight: '100%', minWidth: '100%'}}>
            <Scheduler />
          </Row>
        </Container>
        <Container className='px-0 footer' fluid>
          <Row className='p-3 m-0' >
            <Col sm={8}>
              <p className='textSmall m-0' style={{color: 'white'}}>Copyright Christie Clinic. All rights reserved.</p>
            </Col>
            <Col sm={4}>
              <p className='textSmall m-0' style={{color: 'white', textAlign: 'right'}}>Privacy Policy</p>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  Schedulerrender(){
    return(
      
            <Scheduler />
          
    );
  }
}

export default App;

