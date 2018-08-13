import React, {Component} from 'react';
import Attribute from '../Attribute/Attribute';
import AttributeCreator from '../AttributeCreator/AttributeCreator';

export default class ObjectAttribute extends Component{
	state = {
		editing : false
    };
    
    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

	render(){
		var keys = Object.keys( this.props.value ),
			className = this.state.editing ? 'open objectAttr compoundAttr' : 'objectAttr compoundAttr',
			openHash = '';

		var attrs = [];
		for( var attr in this.props.value ){
			attrs.push(
				<Attribute
					parent={ this.props.value }
					value={this.props.value[attr]}
					key={ attr }
                    attrkey={ attr }
				/>
			);
		}

		openHash = (<div className="attrChildren">
			{ attrs }
			<AttributeCreator type="attribute" parent={ this.props.value } />
		</div>);

		return (<span className={ className }>
				<span onClick={ this.toggleEditing } className="hashToggle">Object [{ keys.length }]</span>
				{openHash}
			</span>)
		;
    }
    
	
}