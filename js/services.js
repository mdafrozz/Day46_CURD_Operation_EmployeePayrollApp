window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    salaryRange();
})

function validateName() {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        try {
            let empData = new EmployeePayroll();
            empData.name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });
}

function salaryRange() {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
}

const save = () => {
    try {
    let employeePayroll = createEmployeePayroll();
    createAndUpdateLocalStorage(employeePayroll);
    } catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueId("#name");
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
    }
    

    try {
        let date = getInputValueId('#day') + " " + getInputValueId('#month') + " " + getInputValueId('#year');
        employeePayroll.startDate = Date.parse(date);
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
    }


    employeePayroll.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayroll.gender = getSelectedValue('[name=gender]').pop();
    employeePayroll.department = getSelectedValue('[name=department]');
    employeePayroll.salary = getInputValueId('#salary');
    employeePayroll.notes = getInputValueId('#notes');
    employeePayroll.id = new Date().getTime()+1;
    return employeePayroll;
}

const getInputValueId = (id) => {
    return document.querySelector(id).value;
}

const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}

const getSelectedValue = (propertyValue)=> {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item=>{
        if(item.checked == true){
            setItem.push(item.value);
        }
    })
    return setItem;
}

const createAndUpdateLocalStorage = (empData) => {
    let dataList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(dataList != undefined){
        dataList.push(empData);
    }
    else{
        dataList = [empData];
    }
    localStorage.setItem('EmployeePayrollList', JSON.stringify(dataList));
    alert("Data stored with name " + empData.name);
}