var redux = require("redux");
const readline = require('readline');

var employeeArr = [];
var newEmpID = 0;
var addEmployeeobj = { ID: 0, who: "", phone: "", pic: "upload.jpg", designation: "", bloodgrp: "" }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const chooseOperation = () => {

    rl.question('Would you like to perform ADD / EDIT / DELETE an employee? ', (answer) => {
        // TODO: Log the answer in a database
        let optionChosen = answer;
        //console.log(`Thank you for your valuable answer: ${answer}`);

        switch (optionChosen) {
            case "ADD":
                {
                    rl.question('NAME of the Employee: ', (answer) => {
                        addEmployeeobj.who = answer
                        rl.question('PHONE No of the Employee: ', (answer) => {
                            addEmployeeobj.phone = answer
                            rl.question('DESIGNATION of the Employee: ', (answer) => {
                                addEmployeeobj.designation = answer
                                rl.question('BLOODGROUP of the Employee: ', (answer) => {
                                    addEmployeeobj.bloodgrp = answer
                                    store.dispatch({
                                        type: 'ADD',
                                        newEmpData: addEmployeeobj
                                    });
                                });
                            });
                        });
                    });
                    break;
                }
            case 'EDIT':
                {
                    rl.question('ID of the employee to edit ', (answer) => {
                        let currentEmployee = employeeArr.find(x => x.ID == answer);
                        addEmployeeobj = currentEmployee;
                        console.log('current values of Employee ID %s is: ', answer);
                        console.log(currentEmployee);
                        // store.dispatch({
                        //     type:'GETBYID',
                        //     newEmpData:addEmployeeobj
                        // });
                        rl.question('NAME of the Employee: ', (answer) => {
                            if (answer) {
                                addEmployeeobj.who = answer
                            }
                            rl.question('PHONE No of the Employee: ', (answer) => {
                                if (answer) {
                                    addEmployeeobj.phone = answer
                                }
                                rl.question('DESIGNATION of the Employee: ', (answer) => {
                                    if (answer) {
                                        addEmployeeobj.designation = answer
                                    }
                                    rl.question('BLOODGROUP of the Employee: ', (answer) => {
                                        if (answer) {
                                            addEmployeeobj.bloodgrp = answer
                                        }
                                        store.dispatch({
                                            type: 'EDIT',
                                            newEmpData: addEmployeeobj
                                        });
                                    });
                                });
                            });
                        });
                    });
                    break;
                }
            case "DELETE":
                {
                    
                    deleteEmployee();
                   
                    
                }
                break;
            default:
                rl.close();
                break;
        }
    });
}

const deleteEmployee = () => {
    rl.question('Please enter the ID of the employee to Delete ', (answer) => {
        let currentEmployee = employeeArr.find(x => x.ID == answer);
        if(currentEmployee == undefined)
        {
            deleteEmployee();
        }
        addEmployeeobj = currentEmployee;
        console.log('current values of Employee ID %s is: ', answer);
        console.log(currentEmployee);
        rl.question('Are you sure you want to delete the employee? YES/NO', (answer) => {
            if (answer == 'YES') {
                store.dispatch({
                    type:'DELETE',
                    newEmpData:addEmployeeobj
                });
            }
            else{
                chooseOperation();
            }
        });
    });
}
const getEmployees = () => {

    employeeArr = [{
        "ID": 1,
        "who": "Pratibha Krishnan",
        "phone": "8989343843",
        "pic": "Pratibha.jpg",
        "designation": "Consultant",
        "bloodgrp": "B+"
    },
    {
        "ID": 2,
        "who": "Debopoma",
        "phone": "9892814902",
        "pic": "Debo.jpg",
        "designation": "Senior Engg Consultant",
        "bloodgrp": "A+"
    },
    {
        "ID": 3,
        "who": "Anupam",
        "phone": "9029990111",
        "pic": "Anupam.jpg",
        "designation": "Senior Consultant",
        "bloodgrp": "B+"
    },
    {
        "ID": 4,
        "who": "Sushmita",
        "phone": "7900342221",
        "pic": "Sushi.jpg",
        "designation": "Principal Engg",
        "bloodgrp": "O+"
    }]

    return employeeArr;

}

const employeeContactReducer = (state, action) => {
    let newstate = state;
    //console.log(state);
    var array = newstate.employeeArr;
    switch (action.type) {
        case 'GETBYID':
            //do nothing
            // let array = newstate.employeeArr;
            // let currentEmployee = newstate.employeeArr.find(x => x.ID == array.ID);
            // newstate.updateEmployeeObj = currentEmployee;
            break;
        case 'ADD':
            var maxIndex = Math.max.apply(Math, array.map((o) => { return o.ID; }));
            action.newEmpData.ID = maxIndex + 1;
            array.push(action.newEmpData);
            break;
        case 'EDIT':
            let currIndex = newstate.employeeArr.findIndex(x => x.ID == action.newEmpData.ID);
            array.splice(currIndex, 1, action.newEmpData);
            break;
        case 'DELETE':
            {
                let currIndex = newstate.employeeArr.findIndex(x => x.ID == action.newEmpData.ID);
                array.splice(currIndex, 1);
            }
            break;
        default:
            break;
    }

    return newstate;
}

let store = redux.createStore(employeeContactReducer,
    {
        employeeArr: getEmployees(),
        updateEmployeeObj: { ID: 0, who: "", phone: "", pic: "upload.jpg", designation: "", bloodgrp: "" }
    });

store.subscribe(() => {
    console.log("updated state employees", store.getState().employeeArr);
    chooseOperation();
    // rl.question('Would you like to perform ADD / EDIT / DELETE an employee?', (answer) => {

    //     if (['ADD', 'EDIT', 'DELETE', 'GETBYID'].indexOf(answer) > 0)
    //         chooseOperation();
    //     else
    //         rl.close();
    // })
})

chooseOperation();

// store.dispatch({
//     type:'ADD',
//     newEmpData:{
//         "ID": 5,
//         "who": "Anup Kumar Ray",
//         "phone": "9903944115",
//         "pic": "Anupam.jpg",
//         "designation": "Consultant",
//         "bloodgrp": "B+"
//     }
// })


// store.dispatch({
//     type:'EDIT',
//     newEmpData:{
//         "ID": 1,
//         "who": "Pratibha Krishnan Ray",
//         "phone": "9903988115",
//         "pic": "Pratibha.jpg",
//         "designation": "Consultant",
//         "bloodgrp": "B+"
//     }
// })

// store.dispatch({
//     type:'DELETE',
//     newEmpData:{
//         "ID": 1,
//         "who": "Pratibha Krishnan Ray",
//         "phone": "9903988115",
//         "pic": "Pratibha.jpg",
//         "designation": "Consultant",
//         "bloodgrp": "B+"
//     }
// })

// // console.log(getEmployees());