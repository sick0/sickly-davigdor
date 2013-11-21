// cbddm.js
// V 2.a
// 06/05/2005
// (c) Andrew Holt
// http://www.webdevtips.co.uk
// http://www.dropmenu.co.uk
// http://www.andysonestop.co.uk
//Opera 8 Fix
//14/08 konqueror workaround
//works in chimera
//03/02/2005
//fix to line 301-302 added px to ensure script works with strict and loose doctype
//You are free to use this script providing you leave all the comments intact
//Scripts can end up all over the net and by removing comments you are stopping people from getting proper updates from the author. 
//End of preaching :)
//http://www.dropmenu.co.uk

//Enjoy

//Andy

var toggleswitch=0;
var Mac  =  (navigator.userAgent.indexOf("mac")!=-1)  || (navigator.userAgent.indexOf("Mac")!=-1);
var opnew = (navigator.userAgent.indexOf('Opera 7')!=-1)||(navigator.userAgent.indexOf('Opera 8')!=-1) || (navigator.userAgent.indexOf('Opera/9')!=-1);

var opold = (navigator.userAgent.indexOf('Opera')!=-1);
var msie  =  (navigator.userAgent.indexOf('MSIE')!=-1);
var moz  =  (navigator.userAgent.indexOf('Gecko')!=-1);
var NS6  =  (navigator.userAgent.indexOf('Netscape')!=-1 && navigator.userAgent.indexOf('Gecko')!=-1);
var Nav4  = (document.layers); 
var konq = (navigator.userAgent.indexOf('Konqueror')!=-1); 
if (opold && msie || opold){var opold=1; msie=0;} 
if (msie && !opold){msie=1;}
if(opnew && opold){opold=0;}
if(msie || moz || opnew){var dom = 1;}
var stopshow=0;
var noway=0;



if(konq){noway=1}

var timerID=null
var timerID2=null
var stopclose=1;
var whatsopen = "none";
var newsonoff=0;
var operaload=0;
var isform="no";
var menutop=0;
var menuleft=0;
var nsmenutop=0;
var nsmenuleft=0;

if (Nav4) {
    window.captureEvents(Event.MOUSEMOVE);
    window.onmousemove=move;
}
function move(e) {
nsmenuleft=e.pageX;
nsmenutop=e.pageY;
nsmenuleft1-=0;
nsmenutop-=0;
}

if(noway==0){
//document.write("<link rel=\"stylesheet\" href=\""+path_to_stylesheet+"\">");
}
//###################################################
function startMenu(){
if(noway){return;}
if (msie && !Mac)
        {       
for(var i = 0 ; i <= howmanymenus ; i++){
toggle2(menunames[i]);}
        }
 else
       {return false;}
}
//End Startup function
//###################################################


//###################################################
function toggle_menu(whatmenu,isMain){
if(noway){return;}
getpositions(); 
if(newsonoff==1){return false;}
if (isMain==1){

	if(timerID){clearTimeout(timerID);}
	
	if (whatsopen == "none"){
	toggle2(whatmenu);
	
	isMain=0;
	}

	if(whatsopen == whatmenu){
	isMain=0;
	}

	if(whatsopen != whatmenu && whatsopen != "none"){
	toggle2(whatsopen);
	toggle2(whatmenu);
	isMain=0;
	}
if(timerID2){clearTimeout(timerID2)}
timerID2=setTimeout("toggle2('"+whatmenu+"');",3000);
return;
}
if(isMain==0){
	if(whatsopen != "none" && isMain!=1){
	toggle2(whatmenu);
	}
}
}
//###################################################


//###################################################

function toggle2(whatmenu)
{
if(noway){return;}

//================================================
        if (msie)
        {       
                if(effectopen != -1 && effectclose != -1){      
                eval(whatmenu+".filters(0).Apply();");
                }
				
                if (eval(whatmenu+".style.visibility") == 'hidden')
                {
			   if(isform=="yes"){document.getElementById('formhide').style.visibility='hidden';}
         	               eval(whatmenu+".style.visibility='visible';");                        
                        eval(whatmenu+".filters[0].transition=effectopen");                        
                        whatsopen=whatmenu;                     
                }
                else
                {
				
				if(isform=="yes"){document.getElementById('formhide').style.visibility='visible';}
                        eval(whatmenu+".style.visibility = 'hidden';");
                        
                        eval(whatmenu+".filters[0].transition=effectclose");
                        
                        whatsopen="none";
                }       
            if(effectopen != -1 && effectclose != -1){    
            eval(whatmenu+".filters(0).Play();");
       		 }
        }
//================================================


//================================================      
if (opold)
{
if(newsonoff !=1){   
	menuheight = buttonheight;
	winx = event.x;
	menuleft=winx;
	x1=buttonwidth/2;
		if(operaload==0 && menudir=="hor"){
		operatop = event.y+buttonheight;;
		operaload=1;
		}	
		if(operaload!=0 && menudir=="hor"){
		menutop=operatop;
		}	
	widtot = winx + x1;
		if (widtot > docwidth && menudir=="hor"){       
		menuleft = winx - buttonwidth;
		}
		else
		{
		var menuleft = winx -x1;
		}	 
		if (menudir=="ver"){
		menuleft = winx+30;
		menutop = event.y;
		}		  
	eval("document.getElementById('"+whatmenu+"').style.left="+menuleft);
	eval("document.getElementById('"+whatmenu+"').style.top="+menutop); 
}                 
			    if (toggleswitch==0)
                {
				if(isform=="yes"){document.getElementById('formhide').style.visibility='hidden';}
                        eval(whatmenu+".style.visibility='visible';");
                        toggleswitch=1;
                        whatsopen=whatmenu;
                        return;
                }
                if (toggleswitch==1)
                {
				if(isform=="yes"){document.getElementById('formhide').style.visibility='visible';}
                        eval(whatmenu+".style.visibility = 'hidden';");
                toggleswitch=0;
                whatsopen="none";
                return;
                }               
        
}
//================================================


//================================================
if(Nav4){

if (toggleswitch==0 && isform=='yes'){document.layers["formhide"].visibility = 'hidden';}
if (toggleswitch==1 && isform=='yes'){document.layers["formhide"].visibility = 'visible';}
if (toggleswitch==0 && whatmenu=="newsitem"){document['newsitem'].visibility='visible';toggleswitch=1;return; }
if (toggleswitch==1 && whatmenu=="newsitem"){document['newsitem'].visibility='hidden';toggleswitch=0;return; }
if (toggleswitch==0){
		if(menudir =="hor"){
 		x1=buttonwidth/2;		
 		nsmenuleft-=x1; 		
		eval("document['"+whatmenu+"'].top="+nsmenutop+"+"+buttonheight);
		eval("document['"+whatmenu+"'].left="+nsmenuleft+"+10");
		}
		if(menudir =="ver"){
		eval("document['"+whatmenu+"'].top="+nsmenutop);
		eval("document['"+whatmenu+"'].left="+nsmenuleft+"+20");
		}
document.layers[whatmenu].visibility='visible';           
toggleswitch=1;
whatsopen=whatmenu;
return;
}
		if (toggleswitch==1){
		document.layers[whatmenu].visibility='hidden';              
		toggleswitch=0;
		whatsopen="none";
		return;
		}
}
//================================================


//================================================
if (moz || opnew)
        {
        if(toggleswitch == 0){
		if(isform=="yes"){document.getElementById('formhide').style.visibility='hidden';}
        eval("document.getElementById('"+whatmenu+"').style.visibility = 'visible';");
toggleswitch=1;
whatsopen=whatmenu;
;return;}
    if(toggleswitch == 1){
	if(isform=="yes"){document.getElementById('formhide').style.visibility='visible';}
	eval("document.getElementById('"+whatmenu+"').style.visibility = 'hidden';");toggleswitch=0;whatsopen="none";return;}
        }


//================================================
}



//###################################################
function goSub(where,what,tgt)
{
stopshow=-1;
clearTimeout(timerID);
clearTimeout(timerID2);
if(tgt==''){var wintgt="self";}
else
{var wintgt=tgt;}    
//if(effectopen!=-1 || effectclose!=-1){toggle2(what);}      
toggle2(what);  
        if(tgt == ''){whereto= "location.href='"+where+"'";}    
        if(tgt == 'new'){whereto= "window.open('"+where+"','"+tgt+"');";}       
        if(tgt != 'new' && tgt != ''){whereto= "parent."+tgt+".location.href='"+where+"'";}
        setTimeout("eval(whereto)",550);
}

//###################################################



//###################################################
function getpositions(){
if(noway){return;}
if (Nav4 || NS6){
docwidth = window.innerWidth;docwidth-=0; }
if(msie || (moz && !NS6) || konq || opold || opnew ){
docwidth = document.body.clientWidth;
docwidth-=0;
}

//================================================      
if (dom){
var menutop = document.getElementById('navbar').offsetTop;
var menuleft = document.getElementById('navbar').offsetLeft;
var menuheight = document.getElementById('navbar').offsetHeight;

if(menudir=="hor"){menutop += menuheight+2;}
if(menudir=="ver"){ menuleft += navwidth[0]+5;menutop += cellpad;}
for(var i = 0 ; i <= howmanymenus ; i++){
if(menudir == "hor"){menuleft+=cellpad;}
eval("document.getElementById('"+menunames[i]+"').style.left='"+menuleft+"px'");
eval("document.getElementById('"+menunames[i]+"').style.top='"+menutop+"px'");
//fix for firefox using full doctype
//eval("document.getElementById('"+menunames[i]+"').style.left="+menuleft);
//eval("document.getElementById('"+menunames[i]+"').style.top="+menutop);  
              
	if(menudir=="hor"){
	tot=menuleft+navwidth[i]+buttonwidth;
		if( tot >= docwidth ){
		menuleft += navwidth[i]+navwidth[i+1];
		menuleft -= buttonwidth;  
		}
		else
		{                        
		menuleft += navwidth[i]+cellpad;
		if(NS6){menuleft += cellpad;}
		}
}

	if(menudir=="ver"){
	menutop += buttonheight+cellpad+cellpad;
		if(moz){menutop += cellpad;}
	}
}
//================================================

//###################################################
}
}

function donewsitem(onoff){
if(noway){return;}
newsonoff=onoff;
	if (window.innerWidth){
		docwidth = window.innerWidth;
		docheight = window.innerHeight;
		}
	else
	{
		docwidth = document.body.clientWidth;
		docheight = document.body.clientHeight;
	}
	
newsleft = docwidth-newswide;
newsleft=newsleft/2;
newstop = docheight-newshigh;
newstop=newstop/2;
timer=newstimer*1000;
effectopenbak=effectopen;
effectclosebak=effectclose;

if(newsonoff != 1){return false;}

toggleswitch = 1;
if(dom || konq || opold || opnew){
	effectopen=newseffect;
	effectclose=newseffect;
	document.getElementById("newsitem").style.left=newsleft;
	document.getElementById("newsitem").style.top=newstop;
	toggle2('newsitem');
	}
	
if (Nav4) { 
toggleswitch = 0;  
       document['newsitem'].top=newstop;
	   document['newsitem'].left=newsleft; 	  
		}
toggle2('newsitem');
setTimeout("toggle2('newsitem');newsonoff=0;effectopen=effectopenbak;effectclose=effectclosebak",timer);

}
function killMenu(whatwait){
if(noway){return;}
if(stopshow==-1){return;}
if(timerID){clearTimeout(timerID)}
if(timerID2){clearTimeout(timerID2)}
timerID=setTimeout("toggle2('"+whatwait+"');",350);
}
function checkMenu(){
if(noway){return;}
if(stopshow==-1){return;}
if(timerID){clearTimeout(timerID)}
if(timerID2){clearTimeout(timerID2)}
}

//End of Script
// Get updates and fixes @ http://www.dropmenu.co.uk
//Please leave these comments intact
