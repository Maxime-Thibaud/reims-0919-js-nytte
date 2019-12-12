import React from 'react';
import axios from 'axios'
import './App.css';
import DisplayAdmin from './component/DisplayAdmin.js'
import FormPlace from './component/FormPlace'
import FormAdmin from './component/FormAdmin.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campings : null,
      currentCamping: 0
    };
    this.nextCamping = this.nextCamping.bind(this);
  }

  nextCamping(){
    this.setState((prevState) => {
      return {
        currentCamping: (prevState.currentCamping + 1) % prevState.campings.length
      };
    });
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/admins')
    .then(response => response.data)
    .then(data =>{
      this.setState({
        campings: data,
      });
    });
  }


  render() {
    return (
      <div>
        {this.state.campings && <DisplayAdmin camping={this.state.campings[this.state.currentCamping]}/>}
        <button  type="button" onClick={this.nextCamping}>Suivant</button>
        <FormAdmin />
      </div>
      <div>
        <DisplayAdmin camping={this.state.camping}/>
        <FormPlace />
      </div>
    );
  }
}


export default App;
