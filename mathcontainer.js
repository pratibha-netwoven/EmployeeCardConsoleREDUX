var redux = require("redux");

const reducer = (state,action) => {
    let newstate = state;
    switch(action.type)
    {
        case 'ADD':
            newstate = state + action.payload;
            break;
        case 'SUBTRACT':
            newstate = state - action.payload;
            break;
        default:
            break;
    }

    return newstate;
}

let store = redux.createStore(reducer,1);

store.subscribe(()=>
{
    console.log('store updated',store.getState());

});
 
store.dispatch({
    type:'ADD',
    payload:5
});

store.dispatch({
    type:'SUBTRACT',
    payload:5
});
