jQueryConnectionStatus
======================

A connection status plugin for jQuery

======================
To use: Include the ConnectionStatus.js file in your page as appropriate. 
		Then insert the code below in the page. See index.html for example.

			$(document).ready(function() {
				connectioncheck();
			});
			
			
			
			
If you want to customize the implmentation, set the options:

			$(document).ready(function() {
				connectioncheck({ remoteaddress: "http://www.google.com", frequency: 3 });
			});



Available options:

frequency: Frequency to check connection in seconds

remotepole: Change to true to send the AJAX request to the address you specify. 
			This is helpful if you dont want to make the request to the clients current page.
			
remoteaddress: Only needed if remotepole is true. This will be the address the plugin will make the xhr request to.

errormessage: This is the message the client will see if using the native DIV

usenativediv: False will call show()/hide() on a DIV you specify by id. This is a usefull way to use this plugin with your sites existing features.
			
foreigndivid: Only needed if you dont want to use my div. Make sure you hide it in document ready or it will be there for a few seconds and confuse the client.

inputstodisable: An array of input types to disable when connectivity is not available. See http://www.w3schools.com/tags/att_input_type.asp for available types.

=======================
To congifure: Open the ConnectionStatus.js file. Settings are available at the top.


=======================
Requirements: jQuery

=======================

