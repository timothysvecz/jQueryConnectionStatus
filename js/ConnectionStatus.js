/**
 * @author Timothy Svecz
 *
 *
 * Use under MIT-License
 * This is the only file neededed. Simply include the file and change the options below
 */

/**
 * OPTIONS/SETTINGS
 */
var frequency = 10;
//Frequency to check connection in seconds
var remotepole = true;
// Change to true to send the AJAX request to the address you specify. This is helpful if you dont want to make the request to the clients current page.
var remoteaddress = "http://www.yahoo.com";
// Only needed if remotepole is true
var errormessage = "Connection to the server has been interupted. Please Try Again.";
// This is the message the user will see.
var usenativediv = false;
//Falsewill call show()/hide() on a div you specify by id. This is a usefel way to use this plugin with your sites existing features.
var foreigndivid = "myDIVid";
//Only needed if you dont want to use my div. Make sure you hide it in document ready or it will be there for a few seconds and confuse the client.
var disableinputsubmit = true;
//This will disable input buttons of type submit when connections are not available.
var disableinputbutton = true;
//This will disable input buttons of type button when connections are not available.
var disableinputtext = true;
//This will disable input of type text when connections are not available.
//TIP: you can use any type http://www.w3schools.com/tags/att_input_type.asp   $('input[type=submit]').attr('disabled', true);

/**
 * The code below uses setinterval to send an ajax request at specified intervals and then do stuff based on the status
 */

var currentstatus = 0;
//So we can keep track of the prior connection status

var connectionaddress = "";
function connectioncheck() {
	if (!remotepole) {
		connectionaddress = document.URL;
	} else {
		connectionaddress = remoteaddress;
	}
	//check how the user wants to check the status
	setInterval(function() {
		var activeRequest = false;
		//So there are not duplicate requests
		if (!activeRequest) {
			activeRequest = true;
			var request = $.ajax({
				url : connectionaddress,
				type : "HEAD",
				cache : !1,
				success : function(result) {
					activeRequest = false;
					handleStatus(1);
				},
				error : function(textStatus) {
					activeRequest = false;
					handleStatus(0);
				}
			});
			return request;
		}
	}, frequency * 1000);
};
function handleStatus(status) {
	if (status === 1) {

		if (currentstatus === 0) {
			if (disableinputsubmit == true) {
				$('input[type=submit]').attr('disabled', false);
			}
			if (disableinputbutton == true) {
				$('input[type=button]').attr('disabled', false);
			}
			if (disableinputtext == true) {
				$('input[type=text]').attr('disabled', false);
			}
			if (usenativediv == true) {
				$('#alertdiv').remove();
			} else {
					$('#' + foreigndivid).hide();
			}
		}
		//only mess with the DOM if the prior status was opposite this one
		currentstatus = 1;
	} else {

		if (currentstatus === 1) {
			if (disableinputsubmit == true) {
				$('input[type=submit]').attr('disabled', true);
			}
			if (disableinputbutton == true) {
				$('input[type=button]').attr('disabled', true);
			}
			if (disableinputtext == true) {
				$('input[type=text]').attr('disabled', true);
			}
			if (usenativediv == true) {
				var thediv = "<div style='position:fixed;bottom:0;left:0px;text-align:center;font-size:25px;background-color:#EACBCB;color:#BF6566;width:100%;' id='alertdiv' >" + errormessage + "</div>";
				$('body').append($(thediv));
			} else {
				$('#' + foreigndivid).show();
			}
		}
		currentstatus = 0;
	}
}