import * as actionTypes from './actionTypes';

export const createAttribute = (parent,attrInfos) => {
    return {
        type : actionTypes.CREATE_ATTRIBUTE,
        parent : parent,
        attrInfos : attrInfos
    }
}

export const editAttribute = (parent,attrInfos) => {
    return {
        type : actionTypes.EDIT_ATTRIBUTE,
        parent : parent,
        attrInfos : attrInfos
    }
}

export const removeAttribute = (parent,attrKey) => {
    return {
        type: actionTypes.REMOVE_ATTRIBUTE,
        parent: parent,
        attrKey: attrKey
    }
}