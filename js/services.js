let isUpdate = false;
employeePayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    //validateName();
    salaryRange();
    checkForUpdate();
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
    // output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
}

const save = () => {
    // alert("Saved...");
    let employeePayroll = createEmployeePayroll();
    //alert(JSON.stringify(employeePayroll));
    createAndUpdateLocalStorage(employeePayroll);
}

const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueId("#name");
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
    }
    // alert(employeePayroll);

    try {
        let date = getInputValueId('#day') + " " + getInputValueId('#month') + " " + getInputValueId('#year');
        employeePayroll.startDate = new Date(Date.parse(date));
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
    }
    //alert(JSON.stringify(employeePayroll));

    employeePayroll.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayroll.gender = getSelectedValue('[name=gender]').pop();
    employeePayroll.department = getSelectedValue('[name=department]');
    employeePayroll.salary = getInputValueId('#salary');
    employeePayroll.notes = getInputValueId('#notes');
    employeePayroll.id = new Date().getTime() + 1;
    return employeePayroll;
}

const getInputValueId = (id) => {
    return document.querySelector(id).value;
}

const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}

const getSelectedValue = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item => {
        if (item.checked == true) {
            setItem.push(item.value);
        }
    })
    return setItem;
}

const createAndUpdateLocalStorage = (empData) => {
    let dataList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (dataList != undefined) {
        dataList.push(empData);
    }
    else {
        dataList = [empData];
    }
    localStorage.setItem('EmployeePayrollList', JSON.stringify(dataList));
    alert("Data stored with name " + empData.name);
}

//Update row
const checkForUpdate = () => {
    let jsonData = localStorage.getItem('edit-emp');
    isUpdate = jsonData ? true : false;
    if (!isUpdate)
        return;
    employeePayrollObject = JSON.parse(jsonData);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObject._name);
    setSelectValue('[name=profile]', employeePayrollObject._profilePic);
    setSelectValue('[name=gender]', employeePayrollObject._gender);
    setSelectValue('[name=department]', employeePayrollObject._department);

    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary);

    let date = stringifyDate(employeePayrollObject._startDate).split(" ");
    //console.log(date);
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);

    setValue('#notes', employeePayrollObject._notes);
}

const setValue = (id, value) => {
    let element = document.querySelector(id);
    element.value = value;
}

const setSelectValue = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item => {
        if (Array.isArray(value)) {
            if(value.includes(item.value)){
                item.checked = true;
            }
        } else if (item.value == value) {
            item.checked = true;
        }
    });
}