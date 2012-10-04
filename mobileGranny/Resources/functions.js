/*
 * Functions used in mobile Granny
 * 
 * @jfreeman
 */
 var Constants = require('constants');



/*
 *  createBaseUI() is a function to create the basic UI for Granny
 * 
 */

exports.createBaseUI = function (){
    //TODO create function that puts up the main window
    var baseWin = Ti.UI.createWindow({
        backgroundColor:'#fff'
    });
    var headerView = Ti.UI.createView({
        height:'48dp',
        top:0,
        backgroundColor:'#00bfff'
    });
    var headerLabel = Ti.UI.createLabel({
        text:'Granny\'s Address Book',
        left:'48dp',
        font: {
            fontSize: '18dp',
            fontWeight: 'bold'
        },
        color: 'black'
    });
    var newContactButton = Ti.UI.createButton({
        title: '+',
        height:'32dp',
        width:'32dp',
        right:'48dp',
        backgroundColor: 'white',
        color: 'black',
        font: {
            fontWeight: 'bold',
            fontSize: '24dp'
        }
    });
    
    // make the table list
    var tableList = Ti.UI.createTableView({
        top:'48dp',
        width:'100%'
    });
    // initial call to populate data
    getAddresses(tableList);
    
    Ti.App.addEventListener('changesSaved', function(){
        getAddresses(tableList);
    });
    
    tableList.addEventListener('click', function(e){
        var singleWin = Ti.UI.createWindow({
            backgroundColor:'#fff',
            url:'/sub/singleview.js',
            singleId: e.rowData.id
        });
        singleWin.open({modal:true});
    });
    
    newContactButton.addEventListener('click', function(){
        var addWin = Ti.UI.createWindow({
            backgroundColor:'#fff',
            url:'/sub/singleview.js',
            singleId: 'new'
        });
        addWin.open({modal:true});
    });
    
    headerView.add(headerLabel);
    headerView.add(newContactButton);
    
    baseWin.add(headerView);
    baseWin.add(tableList);
    baseWin.open({navBarHidden:true});
};

var getAddresses = function (tableList){

    var xhr = Ti.Network.createHTTPClient({
        onload: function(){
            var data = [];
            try {
            	Ti.API.log("got data responseText is "+this.responseText);
                var responseObj = JSON.parse(this.responseText).data;
                Ti.API.log("data is "+responseObj);
                for( var i = 0, len = responseObj.length; i < len; i++) { 
                    var row = {height: '48dp', color: 'black'};
                    row.id = responseObj[i]._id;
                    row.title = responseObj[i].name;
                    Ti.API.log('title is '+responseObj[i].name);
                    data.push(row);
                }
                // data has been built, add it to the table list
                tableList.setData(data);
            }
            catch(e){ Ti.API.log( ' error ' + e ) }
        }
    });
    xhr.open("GET", Constants.serverAddr + "addresses");
    xhr.send();
};

exports.getAddress = function (personId, callback){
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
        	Ti.API.log("onload");
        	var data = [];
            try {
                var responseObj = JSON.parse(this.responseText).data;
                Ti.API.log("data is "+responseObj);
                 
                callback(responseObj);
            }
            catch(e){ Ti.API.log('error ' +e);}
        }
    });
    xhr.open("GET", Constants.serverAddr + "address"+"/"+personId);
    xhr.send();
};

exports.setAddress = function (personId,updatedPerson){
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            alert('Saved');
            Ti.App.fireEvent('changesSaved');
        }
    });
    xhr.open("POST", Constants.serverAddr + "address");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(updatedPerson);
};

/*
 * From a view, create and object that adheres to:
 * {firstName:'Joe',lastName:'Blow',physAdd:'123 Main St.',phone:'555-123-4567',email:'jblow@gmail.com'}
 */

exports.makeUpdatedPerson = function(view){
    var updatedPerson = {};
    updatedPerson.name = view.children[4].value;
    updatedPerson.address = view.children[6].value;
    updatedPerson.phone = view.children[5].value;
    updatedPerson.email = view.children[7].value;
    return updatedPerson;
};

exports.makeEditable = function(view, id){
    view.children[4].visible = true;
    view.children[5].visible = true;
    view.children[6].visible = true;
    view.children[7].visible = true;
    
    view.children[0].visible = false;
    view.children[1].visible = false;
    view.children[2].visible = false;
    view.children[3].visible = false;

    view.children[9].visible = true;    

    if (id == 'new'){
        view.children[8].title = 'Cancel Add';
        view.children[9].title = 'Add New';
    }
    else{
        view.children[8].title = 'Cancel Edits';
    }
};

exports.resetEdits = function(view,singleInfo){
    var name = singleInfo.name;
    var phone = singleInfo.phone;
    var address = singleInfo.physAdd;
    var email = singleInfo.email;
    
    view.children[4].value = name;
    view.children[4].visible = false;
    view.children[5].value = address;
    view.children[5].visible = false;
    view.children[6].value = phone;
    view.children[6].visible = false;
    view.children[7].value = email;
    view.children[7].visible = false;
    
    view.children[0].visible = true;
    view.children[1].visible = true;
    view.children[2].visible = true;
    view.children[3].visible = true;

    view.children[8].title = 'Edit Entry';
    view.children[9].visible = false;
};
