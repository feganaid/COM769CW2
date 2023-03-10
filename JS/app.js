//The URIs of the REST endpoint
IUPS = "https://prod-14.centralus.logic.azure.com:443/workflows/e17d038128c747aea4d089cd4568488a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=giJknAqAnRazuYWKFUvXIDuaM2HRO6yolZpKX6p2gvQ";
RAI = "https://prod-08.centralus.logic.azure.com:443/workflows/5209be09b0b247118255ea4aca3cb235/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4xmpZ2w19wouJZZI1oW41hjt8QbZQY0N6PlOMlTkgMw";

BLOB_ACCOUNT = "https://blobstoragecom682af.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
//Create a form data object
submitData = new FormData();

//Get form variables and append them to the form data object
submitData.append('Title', $('#Title').val());
submitData.append('Publisher', $('#Publisher').val());
submitData.append('Producer', $('#Producer').val());
submitData.append('Genre', $('#Genre').val());
submitData.append('Age', $('#Age').val());
submitData.append('userID', $('#userID').val());
submitData.append('userName', $('#userName').val());
submitData.append('File', $("#UpFile")[0].files[0]);

//Post the form data to the endpoint, note the need to set the content type header
$.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){

  }
});

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

//Replace the current HTML in that div with a loading message
$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

$.getJSON(RAI, function( data ) {
//Create an array to hold all the retrieved assets
var items = [];

//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$.each( data, function( key, val ) {
items.push( "<hr />");
items.push("<video src='"+BLOB_ACCOUNT + val["file_Path"] +"' type='video/mp4' width='400' height='500' controls> </video> <br />");
items.push( "Title : " + val["Title"] + "<br />");
items.push( "Publisher : " + val["Publisher"] + "<br />");
items.push( "Producer : " + val["Producer"] + "<br />");
items.push( "Genre : " + val["Genre"] + "<br />");
items.push( "Age : " + val["Age"] + "<br />");
items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
items.push( "<hr />");
});
//Clear the assetlist div 
$('#ImageList').empty();
//Append the contents of the items array to the ImageList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#ImageList" );
});

}
