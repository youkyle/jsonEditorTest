import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

class AttributeCreator extends Component {
	
    state = {
        creating: false,
        attrkey: this.props.attrkey,
        type: 'string'
    };
	

	render(){
		if( !this.state.creating )
			return <a href="#" onClick={this.handleCreate}>+ Add {this.props.type}</a>;

		var attrName;
		if( typeof this.props.attrkey != 'undefined' )
			attrName =  <span className="attrName">{this.props.attrkey}:</span>;
		else {
			attrName = [
				<input ref="keyInput" type="text" value={this.state.value} onChange={this.changeKey}/>,
				<span>:</span>
			];
		}

		return (<div className="hashAttribute">
				{ attrName }
				<select value={this.state.type} onChange={ this.changeType } ref="typeSelector">
					<option value="string">String</option>
					<option value="array">List</option>
					<option value="object">Map</option>
				</select>
				<button onClick={this.createAttribute}>OK</button>,
				<a href="#" className="cancelAttr" onClick={ this.handleCancel }>Cancel</a>
		</div>);
	}

	componentDidUpdate( prevProps, prevState){
		if( !prevState.creating && this.state.creating ){
			if( this.refs.keyInput )
				this.refs.keyInput.focus();
			else
				this.refs.typeSelector.focus();
		}
	}

	componentWillReceiveProps( newProps ){
		this.setState({attrkey: newProps.attrkey});
	}

	handleCreate = ( e ) => {
		e.preventDefault();
		this.setState({creating: true});
	}

	handleCancel = ( e ) => {
		e.preventDefault();
		this.setState({creating: false});
	}

	changeType = ( e ) => {
		this.setState({type: e.target.value});
	}

	changeKey = ( e ) => {
		this.setState({attrkey: e.target.value});
    }
    

    createAttribute = () => {
        console.log('attrkey : ',this.state.attrkey );
        this.setState({creating: false});
        const infosAttr = {type : this.state.type, attrKey : this.state.attrkey};
        this.props.onCreateAttribute(this.props.parent,infosAttr);
    }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateAttribute : (parent,infosAttr) => dispatch(actionCreators.createAttribute(parent,infosAttr))
    }
  
}


export default connect(mapStateToProps,mapDispatchToProps)(AttributeCreator);