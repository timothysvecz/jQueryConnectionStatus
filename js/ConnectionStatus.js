/**
 * @author Timothy Svecz
 *
 *
 * Use under MIT-License
 * This is the only file neededed.
 */
/**
 * The code below uses setinterval to send an ajax request at specified intervals and then do stuff based on the status
 */
var currentstatus = 0;
var frequency = 10;
var remotepole = false;
var remoteaddress = "http://www.yahoo.com";
var errormessage = "Connection to the server has been interupted. Please Try Again.";
var usenativediv = true;
var foreigndivid = "myDIVid";
var inputstodisable = "";
var connectionaddress = "";
function connectioncheck(options) {
	var options = options || {};
	frequency = options.frequency || 10;
	remotepole = options.remotepole || false;
	remoteaddress = options.remoteaddress || "http://www.yahoo.com";
	errormessage = options.errormessage || "Connection to the server has been interupted. Please Try Again.";
	usenativediv = options.usenativediv || true;
	foreigndivid = options.foreigndivid || "myDIVid";
	inputstodisable = options.inputstodisable;
	if (usenativediv == false) {
		$('#' + foreigndivid).hide();
	}
	if (!remotepole) {
		connectionaddress = document.URL;
	} else {
		connectionaddress = remoteaddress;
	}
	setInterval(function() {
		var activeRequest = false;
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
		
			if (inputstodisable != null && inputstodisable.length > 0) {
				$.each(inputstodisable, function(index, value) {
					$('input[type=' + value + ']').attr('disabled', false);
				});
			}
			if (usenativediv == true) {
				$('#alertdiv').remove();
			} else {
				$('#' + foreigndivid).hide();
			}
		
		currentstatus = 1;
	} else {
		if ( inputstodisable != null && inputstodisable.length > 0) {
			$.each(inputstodisable, function(index, value) {
				$('input[type=' + value + ']').attr('disabled', true);
			});
		}
		if (usenativediv == true) {
			var thediv = "<div style='position:fixed;bottom:0;left:0px;text-align:center;font-size:25px;background-color:#EACBCB;color:#BF6566;z-index:9999;width:100%;' id='alertdiv' >" + errormessage + "</div>";
			$('body').append($(thediv));
		} else {
			$('#' + foreigndivid).show();
		}
		currentstatus = 0;
	}
}