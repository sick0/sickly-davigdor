function addEvent(obj, evType, fn){
 if (obj.addEventListener){
   obj.addEventListener(evType, fn, true);
   return true;
 } else if (obj.attachEvent){
   var r = obj.attachEvent("on"+evType, fn);
   return r;
 } else {
   return false;
 }
}

function Popup(URL,Name,w,h,s) {
        Console = window.open(URL,Name,"toolbar=0,location=0,status=0, resizable=1,menubar=0,scrollbars="+s+",width="+w+",height="+h+",left="+(screen.width-w)/2+",top="+(screen.height-h)/2);
        Console.focus();
}

function SetCookie(name, value, expires, path, domain) 
{ 
	document.cookie = name + "=" + escape(value) + 
  ((expires == null) ? "" : "; expires=" + expires.toGMTString()) +
  ((path == null)    ? "" : "; path=" + path) +
  ((domain == null)  ? "" : "; domain=" + domain);
}



function GetCookie(name)
{ 
var cname = name + "=";               
  var dc = document.cookie;             
  if (dc.length > 0) 
  { begin = dc.indexOf(cname);       
    if (begin != -1) 
    { begin += cname.length;       
      end = dc.indexOf(";", begin);
      if (end == -1) end = dc.length;
      return unescape(dc.substring(begin, end));
    } 
  }
  return null;
}

function manageExpander(ElementID,ImgID,ClosedImg,OpenImg)
{
var i=document.getElementById(ElementID);
var j=document.getElementById(ImgID);
if (i.style.display=="block")
	{
	i.style.display="none";
	j.src=ClosedImg;
	}
else
	{
	i.style.display="block";
	j.src=OpenImg;
	}
}

function processSecurityClick(frm,whatWasClicked){
	if (whatWasClicked=="allgroupmembers"){
		if (document.getElementById("security4").checked==true){
			if (document.getElementById("security2")){
				document.getElementById("security2").checked=true;
				document.getElementById("security2").disabled=true;
			}
			if (frm.memberstypes){
				if (typeof(frm.memberstypes.length)=="undefined"){
					frm.memberstypes.checked=true;
					frm.memberstypes.disabled=true;			
				}
				else{
					for(var i=0;i<frm.memberstypes.length;i++){
						frm.memberstypes[i].checked=true;
						frm.memberstypes[i].disabled=true;
					}
				}	
			}
		}
		else{
			if (document.getElementById("security2")){
				document.getElementById("security2").disabled=false;
			}
			if (frm.memberstypes){			
				if (typeof(frm.memberstypes.length)=="undefined"){
					frm.memberstypes.disabled=false;			
				}
				else{
					for(var i=0;i<frm.memberstypes.length;i++){
						frm.memberstypes[i].disabled=false;
					}
				}
			}	
		}
	}
	if (whatWasClicked=="public"){
		if (document.getElementById("security1").checked==true){
			if (frm.memberstypes){
				if (typeof(frm.memberstypes.length)=="undefined"){
					frm.memberstypes.checked=true;
					frm.memberstypes.disabled=true;
				}
				else{	
					for(var i=0;i<frm.memberstypes.length;i++){
						frm.memberstypes[i].checked=true;
						frm.memberstypes[i].disabled=true;
					}			
				}
			}
			for(var i=0;i<frm.security.length;i++){
				frm.security[i].checked=true;
				if (frm.security[i].id!="security1"){
					frm.security[i].disabled=true;
				}
			}
		}
		else{
			if (frm.memberstypes){
				if (typeof(frm.memberstypes.length)=="undefined"){
					frm.memberstypes.checked=false;
					frm.memberstypes.disabled=false;
				}
				else{	
					for(var i=0;i<frm.memberstypes.length;i++){
						frm.memberstypes[i].checked=false;
						frm.memberstypes[i].disabled=false;
					}			
				}
			}		
			for(var i=0;i<frm.security.length;i++){
				frm.security[i].checked=false;
				frm.security[i].disabled=false;
			
			}
		}
	}		
}

function processSecurityClick2(frm,whatWasClicked,sPrefix){
	if (whatWasClicked==sPrefix+"allgroupmembers"){
		if (document.getElementById(sPrefix+"security4").checked==true){
			if (document.getElementById(sPrefix+"security2")){
				document.getElementById(sPrefix+"security2").checked=true;
				document.getElementById(sPrefix+"security2").disabled=true;
			}
			if (eval('frm.'+sPrefix+'memberstypes')){
				if (typeof(eval('frm.'+sPrefix+'memberstypes').length)=="undefined"){
					eval('frm.'+sPrefix+'memberstypes').checked=true;
					eval('frm.'+sPrefix+'memberstypes').disabled=true;			
				}
				else{
					for(var i=0;i<eval('frm.'+sPrefix+'memberstypes').length;i++){
						eval('frm.'+sPrefix+'memberstypes')[i].checked=true;
						eval('frm.'+sPrefix+'memberstypes')[i].disabled=true;
					}
				}	
			}
		}
		else{
			if (document.getElementById(+sPrefix+"security2")){
				document.getElementById(+sPrefix+"security2").disabled=false;
			}
			if (eval('frm.'+sPrefix+'memberstypes')){			
				if (typeof(eval('frm.'+sPrefix+'memberstypes').length)=="undefined"){
					eval('frm.'+sPrefix+'memberstypes').disabled=false;			
				}
				else{
					for(var i=0;i<eval('frm.'+sPrefix+'memberstypes').length;i++){
						eval('frm.'+sPrefix+'memberstypes')[i].disabled=false;
					}
				}
			}	
		}
	}
	if (whatWasClicked==sPrefix+"public"){
		if (document.getElementById(sPrefix+"security1").checked==true){
			if (eval('frm.'+sPrefix+'memberstypes')){
				if (typeof(eval('frm.'+sPrefix+'memberstypes').length)=="undefined"){
					eval('frm.'+sPrefix+'memberstypes').checked=true;
					eval('frm.'+sPrefix+'memberstypes').disabled=true;
				}
				else{	
					for(var i=0;i<eval('frm.'+sPrefix+'memberstypes').length;i++){
						eval('frm.'+sPrefix+'memberstypes')[i].checked=true;
						eval('frm.'+sPrefix+'memberstypes')[i].disabled=true;
					}			
				}
			}
			for(var i=0;i<eval('frm.'+sPrefix+'security').length;i++){
				eval('frm.'+sPrefix+'security')[i].checked=true;
				if (eval('frm.'+sPrefix+'security')[i].id!=+sPrefix+"security1"){
					eval('frm.'+sPrefix+'security')[i].disabled=true;
				}
			}
		}
		else{
			if (eval('frm.'+sPrefix+'memberstypes')){
				if (typeof(eval('frm.'+sPrefix+'memberstypes').length)=="undefined"){
					eval('frm.'+sPrefix+'memberstypes').checked=false;
					eval('frm.'+sPrefix+'memberstypes').disabled=false;
				}
				else{	
					for(var i=0;i<eval('frm.'+sPrefix+'memberstypes').length;i++){
						eval('frm.'+sPrefix+'memberstypes')[i].checked=false;
						eval('frm.'+sPrefix+'memberstypes')[i].disabled=false;
					}			
				}
			}		
			for(var i=0;i<eval('frm.'+sPrefix+'security').length;i++){
				eval('frm.'+sPrefix+'security')[i].checked=false;
				eval('frm.'+sPrefix+'security')[i].disabled=false;
			
			}
		}
	}		
}

function doGroupSecurityStartUp()
{

	var frm=eval('document.' + document.getElementById("securityformname").value);
	if (document.getElementById("security4").checked==true){
		document.getElementById("security2").checked=true;
		document.getElementById("security2").disabled=true;
		if (frm.memberstypes){
			if (typeof(frm.memberstypes.length)=="undefined"){
				frm.memberstypes.checked=true;
				frm.memberstypes.disabled=true;
			}
			else{
				for(var i=0;i<frm.memberstypes.length;i++){
					frm.memberstypes[i].checked=true;
					frm.memberstypes[i].disabled=true;
				}
			}
		}
	}
	
	if (document.getElementById("security1").checked==true){
		if (frm.memberstypes){
			if (typeof(frm.memberstypes.length)=="undefined"){
				frm.memberstypes.checked=true;
				frm.memberstypes.disabled=true;
			}
			else{
				for(var i=0;i<frm.memberstypes.length;i++){
					frm.memberstypes[i].checked=true;
					frm.memberstypes[i].disabled=true;
				}			
			}
		}
		if (typeof(frm.security.length)=="undefined"){
			frm.security.checked=true;
			if (frm.security.id!="security1"){
				frm.security.disabled=true;
			}
		}
		else {		
			for(var i=0;i<frm.security.length;i++){
				frm.security[i].checked=true;
				if (frm.security[i].id!="security1"){
					frm.security[i].disabled=true;
				}
			}				
		}
	}	
}


function doResourceSecurityStartUp()
{
	var frm=eval('document.' + document.getElementById("securityformname").value);
	if (document.getElementById("security4").checked==true){
		if (frm.memberstypes){
			if (typeof(frm.memberstypes.length)=="undefined"){
				frm.memberstypes.checked=true;
				frm.memberstypes.disabled=true;
			}
			else {
				for(var i=0;i<frm.memberstypes.length;i++){
					frm.memberstypes[i].checked=true;
					frm.memberstypes[i].disabled=true;
				}
			}
		}	
	}
	if (frm.security1){
		if (document.getElementById("security1").checked==true){
			if (frm.memberstypes){
				if (typeof(frm.memberstypes.length)=="undefined"){
					frm.memberstypes.checked=true;
					frm.memberstypes.disabled=true;
				}
				else {				
					for(var i=0;i<frm.memberstypes.length;i++){
						frm.memberstypes[i].checked=true;
						frm.memberstypes[i].disabled=true;
					}
				}
			}
			if (typeof(frm.security.length)=="undefined"){
				frm.security.checked=true;
				if (frm.security.id!="security1"){
					frm.security.disabled=true;
				}
			}
			else{					
				for(var i=0;i<frm.security.length;i++){
					frm.security[i].checked=true;
					if (frm.security[i].id!="security1"){
						frm.security[i].disabled=true;
					}
				}				
			}
		}
	}
}

function doResourceSecurityStartUp2(sCheckBoxPrefix)
{
	var frm=eval('document.' + document.getElementById("securityformname").value);
	if (document.getElementById("<%=sCheckBoxPrefix%>security4").checked==true){
		if (eval('frm.'+sCheckBoxPrefix+'memberstypes')){
			if (typeof(eval('frm.'+sCheckBoxPrefix+'memberstypes').length)=="undefined"){
				eval('frm.'+sCheckBoxPrefix+'memberstypes').checked=true;
				eval('frm.'+sCheckBoxPrefix+'memberstypes').disabled=true;
			}
			else {
				for(var i=0;i<eval('frm.'+sCheckBoxPrefix+'memberstypes').length;i++){
					eval('frm.'+sCheckBoxPrefix+'memberstypes')[i].checked=true;
					eval('frm.'+sCheckBoxPrefix+'memberstypes')[i].disabled=true;
				}
			}
		}	
	}
	if (eval('frm.'+sCheckBoxPrefix+'security1')){
		if (document.getElementById(sCheckBoxPrefix + "security1").checked==true){
			if (eval('frm.'+sCheckBoxPrefix+'memberstypes')){
				if (typeof(eval('frm.'+sCheckBoxPrefix+'memberstypes').length)=="undefined"){
					eval('frm.'+sCheckBoxPrefix+'memberstypes').checked=true;
					eval('frm.'+sCheckBoxPrefix+'memberstypes').disabled=true;
				}
				else {				
					for(var i=0;i<eval('frm.'+sCheckBoxPrefix+'memberstypes').length;i++){
						eval('frm.'+sCheckBoxPrefix+'memberstypes')[i].checked=true;
						eval('frm.'+sCheckBoxPrefix+'memberstypes')[i].disabled=true;
					}
				}
			}
			if (typeof(eval('frm.'+sCheckBoxPrefix+'security').length)=="undefined"){
				eval('frm.'+sCheckBoxPrefix+'security').checked=true;
				if (eval('frm.'+sCheckBoxPrefix+'security').id!=sCheckBoxPrefix + "security1"){
					eval('frm.'+sCheckBoxPrefix+'security').disabled=true;
				}
			}
			else{					
				for(var i=0;i<eval('frm.'+sCheckBoxPrefix+'security').length;i++){
					eval('frm.'+sCheckBoxPrefix+'security')[i].checked=true;
					if (eval('frm.'+sCheckBoxPrefix+'security')[i].id!=sCheckBoxPrefix + "security1"){
						eval('frm.'+sCheckBoxPrefix+'security')[i].disabled=true;
					}
				}				
			}
		}
	}
}

function GetDate_RFC822(strDate) {
    return new Date(strDate).toUTCString().replace(/UTC/ig, "GMT");
}


