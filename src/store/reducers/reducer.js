import * as actionTypes from '../actions/actionTypes';

const initialState = {
    json : {
        first_name: 'youssef',
        last_name:'allali',
        address: { addr: 'bvd rehal meskini', postal_code: '12030' },
        languages: ['arabic', 'french','english', 'spanish']
      }
};


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CREATE_ATTRIBUTE:

        const type = action.attrInfos.type;
        const attrKey = action.attrInfos.attrKey;
        //console.log('reducer attrKey : ',attrKey);
        const typeDefaultValues = {
            string: '',
            object: {},
            array: []
        }
       var value = typeDefaultValues[ type ];
       var newJson = {...state.json};
       //get the parent object key
       var key = Object.keys(newJson).filter(i => (newJson[i]===action.parent));
       if(typeof key[0] !== 'undefined'){
            if(action.parent.constructor === Array){
                newParent = [...action.parent];
                newParent[attrKey] = value;
            return {
                ...state,
                json : {...newJson ,
                [key] : newParent    
                }
            }
            }else{
                return {
                    ...state,
                    json : {...newJson ,
                    [key] : {...action.parent, [attrKey] : value}    
                    }
                }
            }
       }else {
            return {
                ...state,
                json : {...newJson ,[attrKey] : value}    
                
            }
       }

        case actionTypes.EDIT_ATTRIBUTE :
        
        var attrkey = action.attrInfos.attrkey,value = action.attrInfos.value,parent = action.parent;
        //console.log('parent : ',action.parent);
        var newJson = {...state.json};
       var key = Object.keys(newJson).filter(i => (newJson[i]===action.parent));
       //console.log('key : ',key[0]);
       if(typeof key[0] !== 'undefined'){
           if(parent.constructor === Array ){
            newParent = [...parent];
            newParent[attrkey] = value;
            return {
                ...state,
                json : {...newJson ,
                [key] : newParent    
                }
            }
           }else{
            return {
                ...state,
                json : {...newJson ,
                [key] : {...parent, [attrkey] : value}    
                }
            }
           }
            
       }else {
        return {
            ...state,
            json : {...newJson ,[attrkey] : value}    
            
        }
       }

        case actionTypes.REMOVE_ATTRIBUTE :
        var newParent ;
        var newJson = {...state.json};
        var key = Object.keys(newJson).filter(i => (newJson[i]===action.parent));
        if( action.parent.constructor === Array ){ 
            newParent = [...action.parent];
            newParent.splice(action.attrKey, 1);
            //console.log('is array');
        }else {
            //console.log('is object');
            newParent = {...action.parent};
            delete newParent[action.attrKey];
            
        } 
        //console.log('newparent : ',newParent);
        if(typeof key[0] !== 'undefined'){
                return {
                    ...state,
                    json : {...newJson, [key] : newParent}
                }           
        }else{
            return {
                ...state,
                json : {...newParent}
            }
        }
        
        default : 
        return {
            ...state
        }
    }

}

export default reducer;
