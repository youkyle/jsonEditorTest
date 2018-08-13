import React ,{Component} from 'react';
import StringAttribute from '../StringAttribute/StringAttribute';
import ObjectAttribute from '../ObjectAttribute/ObjectAttribute';
import ArrayAttribute from '../ArrayAttribute/ArrayAttribute';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';


class Attribute extends Component{

    // 
   whichType ( value ){
	var type = typeof value;

	if( type != 'object' )
		return type;

	if( value instanceof Array )
		return 'array';

	return 'object';
    };

    createAttribute ( value , parent, key){

        var className = '';
        var type = this.whichType( value );
            className = StringAttribute;
    
        if( type == 'object' )
            className = ObjectAttribute;
        else if( type == 'array' )
            className = ArrayAttribute;
    
        return React.createElement( className, {
            value: value,
            attrkey: typeof key != 'undefined' ? key : '',
            parent: parent
        });
    };

	render(){
		var typeAttribute = this.createAttribute( this.props.value, this.props.parent, this.props.attrkey),
            className = 'hashAttribute';

		return (
			<div className={className}>
				<a href="#" className="attrRemove" onClick={ this.handleRemove }>[x]</a>
				<span className="attrName">{this.props.attrkey }:</span>
				<span className="attrValue">{ typeAttribute }</span>
			</div>
		);
	}

	handleRemove = ( e ) => {
        e.preventDefault();
        this.props.onRemoveAttribute(this.props.parent,this.props.attrkey);	
	}
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveAttribute : (parent,attrkey) => dispatch(actionCreators.removeAttribute(parent,attrkey))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Attribute);