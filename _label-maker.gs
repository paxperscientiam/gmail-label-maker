// adopted from script by robby1066 @ Github
// https://gist.github.com/robby1066/5274713
function _getLabel(myLabel) {
 // Replace hyphens with spaces.
  //var myLabel = myLabel.split('-').join(' ');
  
  var label = GmailApp.getUserLabelByName(myLabel);

  if (label == null) {
    var label = GmailApp.createLabel(myLabel);
  }
  return label;
}

function _addLabel(myLabel, myQuery) {
  var label = _getLabel(myLabel);
  
  var threads = GmailApp.search(myQuery);
  
  for (var i = 0; i < threads.length; i++) {
    label.addToThread(threads[i]);
  }
}

function _removeLabel(myLabel) { 
  var label = _getLabel(myLabel);
 
  // Replace spaces with hyphens.
 // var myLabel = myLabel.split(' ').join('-');
  var threads = GmailApp.search('label:'+ myLabel);
  
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].isInInbox() == false || threads[i].hasStarredMessages() == false) {      
      label.removeFromThread(threads[i]);
    }
  }
}

function manageLabel(myLabel, myQuery) {
  _removeLabel(myLabel);
  _addLabel(myLabel, myQuery);
}

