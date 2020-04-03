var date; 
var description;
var category;
var account;
var transAccount;
var amount;
				
$(document).ready(function(){		  

	   	  $("#description")
		  .focus()
		  .autocomplete({
              source: "searchDescriptions.php",
		      minLength: 0,
			  select: function (e, ui) {
              CopyToClipboard(ui.item.label);
			  GetCategory(ui.item.label);
            }
          });
		  
		  $("#category")
		  .autocomplete({
              source: "searchCategories.php",
		      minLength: 0,			  
          })
		  .focus(function(){
             if (this.value == ""){
               $(this).autocomplete("search");
             }
		  });
		  
		  $("#account")
		  .autocomplete({
              source: "searchAccounts.php",
		      minLength: 0,			  
          })
		  .focus(function(){
             if (this.value == ""){
               $(this).autocomplete("search");
             }
		  });
		  
		  $("#transAccount")
		  .autocomplete({
              source: "searchAccounts.php",
		      minLength: 0,			  
          })
		  .focus(function(){
             if (this.value == ""){
               $(this).autocomplete("search");
             }
		  });
		  
		  $("#reset").click(function(){
			  ClearAll();   
		  });
		  
		  $("#submit").click(function(){
			   	 date = $('#date').val(); 
				 description = $('#description').val();
				 category = $('#category').val();
				 account = $('#account').val();
				 transAccount = $('#transAccount').val();
	             amount = $('#amount').val();
			   /*
			   var varData = 'data=' + description;
			   $.ajax({
	              type: "POST",
		          url: "checkDuplicate.php",
		          data: varData,
		          success: function(data){
				     var phpResponse = data;					 
		          }
	           });
			   if(phpResponse = 0)
			   {
				   alert("this description is already exits.Cant submit duplicate");
				   return;
			   }
			   else{
			       $('#myModal').css('display','block');
				   $('#password').val('');
                   $('#password').focus();
			   }		   
			   */
			   if((description !="" && category !="") || category !="" || account !=""){
				   $('#myModal').css('display','block');
				   $('#password').val('');
                   $('#password').focus();
			   }
           }); 
		   
		   $("#check").click(function(){
			   $('#password').focus();
		      var type = $('#password').attr("type");
			  if(type === "password")
		       {$('#password').attr('type','text');}
			  else
			   {$('#password').attr('type','password');}
		   });
		   
		   $(".close").click(function(){
		       $('#myModal').css('display','none');
			   $('#description').focus();
		   });			   
		   
		   $('#ok').click(function(){
		       var password = $('#password').val();
		       var varData = 'password=' + password;
			   $.ajax({
	              type: "POST",
		          url: "VerifyPassword.php",
		          data: varData,
		          success: function(data){
		              VerifyPassword(data);
		          }
	           });
		   });
		   
		   $('#description').keypress(function(e){
		        var key = e.which;
				if(key == 13){
					$("#submit").click();
				}
		   });
		   
		   $('#password').keypress(function(e){
		        var key = e.which;
				if(key == 13){
					$("#ok").click();
				}
		   });
		   
		   $("#clearDate").click(function() {
			   document.getElementById("date").value="";
           });
		   
		   $("#clearDescription").click(function() {
			   document.getElementById("description").value="";
	           $("#clearCategory").click();
           });
	
	       $("#clearCategory").click(function() {			   
	           document.getElementById("category").value="";
           });
		   
		   $("#clearAccount").click(function() {
			   document.getElementById("account").value="";
           });
		   
		   $("#clearTransAccount").click(function() {
			   document.getElementById("transAccount").value="";
           });
	
	       $("#clearAmount").click(function() {			   
	           document.getElementById("amount").value="";
           });
	
           document.getElementById("clearPassword").onclick = function() {
	            document.getElementById("password").value="";
	            document.getElementById("password").focus();
           };
		   
	 });	 
	 
	 function ClearAll(){    
	     $("#clearDate").click();
		 $("#clearDescription").click();
		 $("#clearAccount").click();
		 $("#clearTransAccount").click();
		 $("#clearAmount").click();
    }
    
    function VerifyPassword(data){
        var phpResponse = data;
        if(phpResponse === "0")
        {
	            alert("invalid password");
			    $('#password').focus();
        } 
		else
		{
		    SubmitDetails();
		}
    }

     function SubmitDetails(){
	      var varData = 'date=' + date + '&description=' + description + '&category=' + category + '&account=' + account+ '&transAccount=' + transAccount+ '&amount=' + amount;
		  $.ajax({
	         type: "POST",
		     url: "submit.php",
		     data: varData,
		     success: function(){
				CopyToClipboard(description);
				$('#myModal').css('display','none');				
		        ////setTimeout(function(){alert("Description submitted successfully..");},1000);
				ClearAll();   
		     }
	      });	
	 }
	 
	 function CopyToClipboard(description){
	      var tempElement = $('<input>').val(description).appendTo('body').select();
		  document.execCommand('copy');
		  tempElement.remove();
	 }
	 
	 function GetCategory(description){
		 var varData = 'data=' + description;
	      $.ajax({
			      type: "POST",
		          url: "GetCategory.php",
		          data: varData,
		          success: function(data){
		              SetCategory(data);
		          }
		  });  
	 }
	 
	 function SetCategory(category){
		 category = jQuery.parseJSON(category); // to unescape delimiters
		 $('#category').val(category); 
	 }