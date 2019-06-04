/********************************************************************************* 
 * * WEB422 – Assignment 1 
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * * No part of this assignment has been copied manually or electronically from any other source
 * * (including web sites) or distributed to other students. 
 * *
 * * * Name: Mehulkumar Desai       Student ID: 110288172    Date: January 13, 2019 
 * * * ********************************************************************************/

const urllink = "https://intense-escarpment-52895.herokuapp.com/";

let employeesModel = [];

function initializeEmployeesModel() {
    $.ajax({
        url: urllink + "employees",
        type: "GET",
        contentType: "application/json"
    }).done(function (employeesData) {
        employeesModel = employeesData;
        refreshEmployeeRows(employeesModel);
    }).fail(function (err) {
        showGenericModal('Error', 'Unable to get Employees');
    });

}


function showGenericModal(title, errorMessage) {
    $(".modal-title").empty().append(title);
    $(".modal-body").empty().append(errorMessage);
    $("#genericModal").modal('show');
}

function refreshEmployeeRows(employees) {
    // create Lodash.js template
    let employeeTemplate = _.template(
        // loop through data
        "<% _.forEach(employees, function(employee) {" +
        // get the id
        "%> <div class='row body-row' data-id='" +
        "<%- employee._id %>" +
        "'>" +
        // get the first name
        "<div class='col-xs-4 body-column'>" +
        "<%- employee.FirstName %>" +
        "</div>" +
        // get the last name
        "<div class='col-xs-4 body-column'>" +
        "<%- employee.LastName %>" +
        "</div>" +
        // get the position
        "<div class='col-xs-4 body-column'>" +
        "<%- employee.Position.PositionName %>" +
        "</div>" +
        "</div>" + // close div #_id
        "<% }); %>" // close forEach
    )

    $("#employees-table").empty().append(
        employeeTemplate({ 'employees': employees })
    );
}


function getFilteredEmployeesModel(filterString) {
    let filterData = _.filter(employeesModel, function (employee) {
        if (employee.FirstName.toLowerCase().includes(filterString.toLowerCase())
            || employee.LastName.toLowerCase().includes(filterString.toLowerCase())
            || employee.Position.PositionName.toLowerCase().includes(filterString.toLowerCase()))
            return employee;
    });

    return filterData;
}

function getEmployeeModelById(id) {
    return _.find(employeesModel, { '_id': id });
}


$(function () {
    // populate data
    initializeEmployeesModel();
    // react to search-bar entry
    $( "#employee-search" ).keyup(function() {
        // refresh area with filtered result
        refreshEmployeeRows( getFilteredEmployeesModel( $(this).val() ) );
    });
    // react to content clicks
    $("#employees-table").on("click", '.row.body-row', function(){
        let emp = getEmployeeModelById($(this).attr('data-id'));
        // convert hire date using Moment.js
        let hireDate = emp.HireDate;
        let mDate = moment(hireDate);
        mDate = mDate.format('MMMM Do, YYYY');
        // create Lodash.js template
        let empTemplate = _.template(
            '<strong> Address: </strong>' +
            '<%- emp.AddressStreet %>' + ' <%- emp.AddressCity %>,' + ' <%- emp.AddressState %>' + ' <%- emp.AddressZip %>' +
            '<br> <strong> Phone Number: </strong>' +
            '<%- emp.PhoneNum %>' +  ' ext: <%- emp.Extension %>' +
            '<br> <strong> Hire Date: </strong>' +
            '<%- mDate %>'
        )
        // populate modal window
        showGenericModal(emp.FirstName + " " + emp.LastName, empTemplate({ 'emp' : emp, mDate }));
    });
    $('.modal').on('hidden.bs.modal', function (e) {
        $('.modal-title').empty();
        $('.modal-body').empty();
      })
}); 