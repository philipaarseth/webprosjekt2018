function toggleTab(t,e,o){var n,i,a;if("main-tab"==o){for(i=document.getElementsByClassName("main-tab-content"),n=0;n<i.length;n++)i[n].style.display="none";for(a=document.getElementsByClassName("tablinks"),n=0;n<a.length;n++)a[n].className=a[n].className.replace(" active","")}else if("dir-tab"==o)for(i=document.getElementsByClassName("dir-tab-content"),n=0;n<i.length;n++)i[n].style.display="none";document.getElementById(e).style.display="block",t.currentTarget.className+=" active"}function changeDirectionsSettings(t,e){ds[t]=e,console.log(t,e)}function alertAllVariables(){console.log("----- ALL VARIABLES: -----"),console.log("TimeMargin: "+ds.timeMargin),console.log("googleMapsInput: "+ds.googleMapsInput),console.log("timeEditUser: "+ds.timeEditUser),console.log("destinationLoc: "+ds.destinationLoc),console.log("departureLoc: "+ds.departureLoc)}function toggleSidebar(t,e){"button"==e?($this=t,$("#slide-container").children().addClass("hidden"),$("."+$this).removeClass("hidden")):"directions"==e&&($("#slide-container").children().addClass("hidden"),$(".direction-emphasis").removeClass("hidden"))}function poiVoteIncrement(t,e){$.ajax({type:"POST",url:wppath+"/poi-vote.php",data:{postValue:t,postPlaceId:e},success:function(t){$("#poi-vote-points-"+t.assocPlaceId).text(t.newValue)}})}var timeMargin,googleMapsInput,timeEditUser,destinationLoc,departureLoc,ds={timeMargin:10,googleMapsInput:"timeEdit",timeEditUser:"Jon",destinationLoc:"four",departureLoc:"five"};$(document).ready(function(){$(".button, .button-third, .button-half").click(function(){$(this).siblings().removeClass("highlight"),$(this).addClass("highlight")})}),$(document).ready(function(){$(".sidebar-toggle").click(function(){$this=$(this).val(),toggleSidebar($this,"button")})}),$(document).ready(function(){$(".go-button").click(function(){$(".tab-left").removeClass("tab-left").addClass("tab-left-collapsed"),$(".tab-right").removeClass("tab-right").addClass("tab-right-collapsed"),$(".main-tab-content").hide()})}),$(document).ready(function(){$(".tablinks").click(function(){$(".tab-left-collapsed").removeClass("tab-left-collapsed").addClass("tab-left"),$(".tab-right-collapsed").removeClass("tab-right-collapsed").addClass("tab-right")})}),$(document).ready(function(){$(".poi-vote-up").click(function(){poiVoteIncrement(1,$(this).attr("value"))}),$(".poi-vote-down").click(function(){poiVoteIncrement(-1,$(this).attr("value"))})}),$(document).ready(function(){$("#dump-sql").click(function(){$.ajax({type:"POST",url:wppath+"/mysql-dump.php",success:function(t){console.log("Return: "+t)}})}),$("#import-sql").click(function(){$.ajax({type:"POST",url:wppath+"/mysql-import.php",success:function(t){console.log("Return: "+t)}})})});