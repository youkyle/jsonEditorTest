import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';


class StringAttribute extends Component{
	
		state =  {
			editing: !this.props.value,
			value: this.props.value,
			modified: false
		};
	

	render(){
		var className = 'stringAttr';
		if( this.state.modified )
			className = ' modified';

		if( !this.state.editing )
			return <span onClick={ this.setEditMode } className={ className }>{ this.props.value }</span>;

		return <input value={ this.state.value } onChange={ this.updateValue } onBlur={ this.setValue } ref="input" onKeyDown={this.handleKeyDown} />;
    }

	componentDidUpdate( prevProps, prevState ){
		if( this.state.editing && ! prevState.editing ){
            this.setState({
                value : prevProps.value
            });
			var node = this.refs.input;
			node.focus();
		}
	}

	componentDidMount(){
		if( this.state.editing ){
			var node = this.refs.input;
			node.focus();
		}
	}

	setEditMode = () => {
		this.setState({editing: true});
	}

	setValue = () => {
		if( this.state.modified ){
          const val =   this.state.value;
          const attributeKey = this.props.attrkey;
          const attrInfos = {value : val, attrkey : attributeKey};
          this.props.onEditValue(this.props.parent,attrInfos);
        }
		
		this.setState({editing: false});
	}

	updateValue = ( e ) => {
		this.setState({value: e.target.value, modified: e.target.value != this.props.value });
	}

	handleKeyDown = ( e ) => {
		if( e.which == 13 )
			this.setValue();
	}
	toggleEditing = () => {
		this.setState({ editing: !this.state.editing });
	}
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditValue : (parent,attrInfos) => dispatch(actionCreators.editAttribute(parent,attrInfos))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StringAttribute);