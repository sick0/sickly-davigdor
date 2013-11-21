var expanderArray = new Array()

function doProfileExpandCollapse(branchID,path)
{
var divElement=document.getElementById("div"+branchID);
var imgElement=document.getElementById("img"+branchID);

if (divElement.style.display=="none")
	{
		divElement.style.display="block";
		imgElement.src=path+"global/minus.gif";
		maintainExpandedArray(branchID,1)
		
	}
else if (divElement.style.display=="block")
	{
		divElement.style.display="none";
		imgElement.src=path+"global/plus.gif";
		maintainExpandedArray(branchID,0)
	}
}

function checkPartnerSchools(partnerschoolids)
{
	var iOnOff
	var apartnerschoolids=partnerschoolids.split(",")
	for (i = 0; i < apartnerschoolids.length; i++)
	{
		var profileidselect=document.getElementById('profileSetId'+ apartnerschoolids[i])
		if (i==0) iOnOff = profileidselect.checked==false;
		if (profileidselect) profileidselect.checked=iOnOff;
	}
}

function checkAllProfileSets(sProfileSetIDs)
{
	var iOnOff = ''
	var oElements = document.forms[0].elements;
	for (i = 0; i < oElements.length; i++)
	{
		if (oElements[i].type == "checkbox" && oElements[i].name == "ProfileSetIDs")
			{
			if (iOnOff=='') iOnOff = oElements[i].checked==false;
			oElements[i].checked=iOnOff;
			}
	}
}

function movePage(page)
{
	document.profileSetSearch.page.value=page;document.profileSetSearch.submit();
}


function checkSelected(fHiddenID,fID,bWindowed,bReadOnly)
{
	if(bWindowed){
		if (window.opener.document.getElementById(fHiddenID)){
			var checkSelectedElement=window.opener.document.getElementById(fHiddenID).value;
		}
	}
	else {
		if (document.getElementById(fHiddenID)){
			var checkSelectedElement=document.getElementById(fHiddenID).value;
		}
	}
	
	if (checkSelectedElement)
	{
		var aCheckSelectedArray=checkSelectedElement.split(",");
		for(var i=0;i<aCheckSelectedArray.length;i++)
		{
			if(document.getElementById(fID+aCheckSelectedArray[i])!=null && typeof(document.getElementById(fID+aCheckSelectedArray[i]))!="undefined")
			{
				if(bReadOnly)
				{
					document.getElementById(fID+aCheckSelectedArray[i]).checked=true;
					document.getElementById(fID+aCheckSelectedArray[i]).disabled=true;
				}
				else
					{document.getElementById(fID+aCheckSelectedArray[i]).checked=true;}
			}
		}
		checkSelectedElement=""
	}
	
}



function maintainList(hHiddenID,fID,fn)
{	
	var iFoundItem=-1
	var sList=document.getElementById(hHiddenID).value
	var aArray=sList.split(",")
	for(var i=0;i<aArray.length;i++)
	{
		if(aArray[i]==fID){iFoundItem=i}
	}
	if (fn==false && iFoundItem>=0){aArray.splice(iFoundItem,1)}
	if (fn==true && iFoundItem==-1){aArray[i]=fID}	
	document.getElementById(hHiddenID).value=aArray.toString();
}


function maintainExpandedArray(branchID,fn)
{
	if (document.getElementById("expandedProfileSetIDs"))
	{
		var iFoundItem=-1
		var profilSetElement=document.getElementById("expandedProfileSetIDs").value
		var aExpanderArray=profilSetElement.split(",")
		for(var i=0;i<aExpanderArray.length;i++)
		{
			if(aExpanderArray[i]==branchID){iFoundItem=i}
		}
		if (fn==0 && iFoundItem>=0){aExpanderArray.splice(iFoundItem,1)}
		if (fn==1 && iFoundItem==-1){aExpanderArray[i]=branchID}
		document.getElementById("expandedProfileSetIDs").value=aExpanderArray.toString();
	}
}

function expandProfileSets(path)
{
	var profilSetElement=document.getElementById("expandedProfileSetIDs").value;
	var aProfileSetArray=profilSetElement.split(",");
	for(var i=0;i<aProfileSetArray.length;i++)
	{
		if(aProfileSetArray[i]!="" && typeof(aProfileSetArray[i])!="undefined")
		{
			doProfileExpandCollapse(aProfileSetArray[i],path)
		}
	}
}


function adminPageFunctions(fn,profileSetID)
{
document.profilesets.pagefunction.value=fn;document.profilesets.profilesetid.value=profileSetID;document.profilesets.submit();
}

