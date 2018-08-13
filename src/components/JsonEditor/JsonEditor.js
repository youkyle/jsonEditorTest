import React,{Component} from 'react';
import './JsonEditor.css';
import ObjectAttribute from '../ObjectAttribute/ObjectAttribute';
import { connect } from 'react-redux';

class JsonEditor extends Component {

	render(){
		return (
			<div className="JsonEditor">
              <pre>{ JSON.stringify( this.props.json, null, '  ')}</pre>
			<ObjectAttribute value={ this.props.json } /* original={ this.props.json } *//>
				
			</div>
		);
	}

}

const mapStateToProps = (state) => {
    return {
        json : state.json
    }
}



export default connect(mapStateToProps)(JsonEditor);