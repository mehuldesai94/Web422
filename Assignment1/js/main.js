/********************************************************************************* 
 * * WEB422 – Assignment 1 
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * * No part of this assignment has been copied manually or electronically from any other source
 * * (including web sites) or distributed to other students. 
 * *
 * * * Name: Mehulkumar Desai       Student ID: 110288172    Date: January 13, 2019 
 * * * ********************************************************************************/

const urllink = "https://intense-escarpment-52895.herokuapp.com/";

$(function () {
    console.log("Mehulkumare, your JQuery is working prefectly !!!");

    //1. Teams
    $("#teams-menu").on("click", function (event) {

        event.preventDefault();
        console.log("Click event dispatched!!!");
        $.ajax({
            url: urllink + "teams",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (teamsData) {
                $("#data").empty().append("<h3>Teams</h3>").append(JSON.stringify(teamsData));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });

    });

    //2. Employees
    $("#employees-menu").on("click", function (event) {
        
        event.preventDefault();
        $.ajax({
            url: urllink + "employees",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (EmployeesData) {
                $("#data").empty().append("<h3>Employees</h3>").append(JSON.stringify(EmployeesData));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });

    });


    // 3. Projects

    $("#projects-menu").on("click", function (event) {
        
        event.preventDefault();

        $.ajax({
            url: urllink + "projects",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (projectsData) {
                $("#data").empty().append("<h3>Projects</h3>").append(JSON.stringify(projectsData));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });

    });



    // 4. Positions 
    $("#positions-menu").on("click", function (event) {
        
        event.preventDefault();

        $.ajax({
            url: urllink + "positions",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (positionsData) {
                $("#data").empty().append("<h3>Positions</h3>").append(JSON.stringify(positionsData));
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
            });
    });


})