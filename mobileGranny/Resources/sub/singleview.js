singleView = Ti.UI.currentWindow;
Functions = require('functions');
var editMode = false;

// function to assign values to the labels
var hydrate = function(data){
  //  singleInfo = Functions.getAddress(singleView.singleId);

    id = data._id;
    name = data.name;
    phone = data.phone;
    address = data.address;
    email = data.email;
    
    nameLabel.text = name;
    phoneLabel.text = phone;
    addressLabel.text = address;
    emailLabel.text = email;

    nameText.value= name;
    phoneText.value = phone;
    addressText.value = address;
    emailText.value = email;
};

    
var view = Ti.UI.createView({
    top: 0,
    bottom: 0
});

//viewView
var nameLabel = Ti.UI.createLabel({
font: {
    fontSize:'18dp',
    fontWeight:'bold'
},
top:'20dp'
});

var phoneLabel = Ti.UI.createLabel({
top: '68dp',
left: '48dp'
});

var addressLabel = Ti.UI.createLabel({
top: '112dp',
left: '48dp'
});

var emailLabel = Ti.UI.createLabel({
top: '160dp',
left: '48dp'
});

//editView
var nameText = Ti.UI.createTextField({
    hintText:'Full Name',
    keyboardType: Titanium.UI.KEYBOARD_URL,
    top:'20dp',
    left:'48dp',
    visible:false
});

var phoneText = Ti.UI.createTextField({
    hintText:'Phone Number',
    keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
    top: '68dp',
    left: '48dp',
    visible:false
});

var addressText = Ti.UI.createTextField({
    hintText:'Home Address',
    keyboardType: Titanium.UI.KEYBOARD_URL,
    top: '112dp',
    left: '48dp',
    visible:false
});

var emailText = Ti.UI.createTextField({
    hintText:'Email Address',
    keyboardType: Titanium.UI.KEYBOARD_URL,
    top: '160dp',
    left: '48dp',
    visible:false
});

//create buttons
var saveButton = Ti.UI.createButton({
    title: 'Save changes',
    top:'400dp',
    right:'48dp',
    width: '92dp',
    visible: false
});

var editCancel = Ti.UI.createButton({
    title: 'Edit Entry',
    top:'400dp',
    left:'48dp',
    width:'92dp'
});
var backButton = Ti.UI.createButton({
    title:'Close'
});
singleView.setLeftNavButton(backButton);

//add event listeners
editCancel.addEventListener('click', function(){
    if (editMode == false){
        editMode = true;
        Functions.makeEditable(view,id);
    }
    else{
        editMode = false;
        Functions.resetEdits(view,singleInfo);
    }
});

Ti.App.addEventListener('changesSaved', function(){
    singleInfo = Functions.getAddress(singleView.singleId);

    id = singleView.singleId;
    name = name;
    phone = singleInfo.phone;
    address = singleInfo.physAdd;
    email = singleInfo.email;
    
    nameLabel.text = name;
    phoneLabel.text = phone;
    addressLabel.text = address;
    emailLabel.text = email;
    
    editCancel.fireEvent('click');
    Ti.App.fireEvent('updateList');
});
saveButton.addEventListener('click', function(){
    var updatedPerson = Functions.makeUpdatedPerson(view);
    Functions.setAddress(id,updatedPerson);
});
view.addEventListener('click', function(){
    Ti.UI.Android.hideSoftKeyboard();
});

//add labels to view
view.add(nameLabel);
view.add(addressLabel);
view.add(phoneLabel);
view.add(emailLabel);

//add text fields to view
view.add(nameText);
view.add(addressText);
view.add(phoneText);
view.add(emailText);
 
// hydrate the fields
if (singleView.singleId == 'new'){
    var id = 'new';
    var name = '';
    var phone = '';
    var address = '';
    var email = '';
    // TODO don't know if things need to be reworked here
}
else{
    Functions.getAddress(singleView.singleId, hydrate);
}

//add buttons to view
view.add(editCancel);    
view.add(saveButton);

if (singleView.singleId == 'new'){
    editCancel.fireEvent('click');
}

//add views to scrollview
var contactView = Ti.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    showHorizontalScrollIndicator:false,
    showVerticalScrollIndicator:true
});
contactView.add(view);

//add views to window
singleView.add(contactView);

