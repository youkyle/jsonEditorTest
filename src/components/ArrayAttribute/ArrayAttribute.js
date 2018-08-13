import React, {Component} from 'react';
import Attribute from '../Attribute/Attribute';
import AttributeCreator from '../AttributeCreator/AttributeCreator';


export default class ArrayAttribute extends Component {
	
		state = { editing: false };
    
    
    toggleEditing = () => {
		this.setState({editing: !this.state.editing});
	}

	render(){
		var keys = Object.keys( this.props.value ),
			className = this.state.editing ? 'open arrayAttr compoundAttr' : 'arrayAttr compoundAttr',
			openArray = ''
		;

		var attrs = [];
		for (var i = 0; i < this.props.value.length; i++) {
			attrs.push(
				<Attribute
					parent={ this.props.value }
					value={this.props.value[i]}
					key={ i }
					attrkey={ i }
				/>
			);
		}

		openArray = (<div className="attrChildren">
			{ attrs }
			<AttributeCreator type="element" parent={ this.props.value } attrkey={ keys.length }/>
			</div>
		);

		return (<span className={ className }>
				<span onClick={this.toggleEditing} className="hashToggle">Array [{keys.length}]</span>
				{openArray}
			</span>)
		;
	}
	
}