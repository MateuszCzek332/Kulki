(()=>{"use strict";var l=function(l,t){this.html=document.createElement("div"),this.html.className="field",this.html.id=l+"-"+t},t=function(){function l(){this.html=document.createElement("div"),this.html.className="ball",this.color=Math.floor(Math.random()*l.collors.length),this.html.style.backgroundColor=l.collors[this.color]}return l.collors=["red","orange","yellow","green","blue","black","white"],l}();new function(){var e=this;this.qBalls=[],this.init=function(){e.createBoard(),e.createBallsQ()},this.createBoard=function(){e.html=document.createElement("div"),e.html.className="board";for(var t=0;t<e.height;t++){e.fields[t]=[];for(var a=0;a<e.width;a++){var i=new l(t,a);e.fields[t][a]=i,e.html.appendChild(i.html)}}document.body.appendChild(e.html),console.log(e.fields[0][0])},this.createBallsQ=function(){e.ballsDiv=document.createElement("div"),document.body.appendChild(e.ballsDiv),e.ballsToQ(),e.spawnBalls()},this.ballsToQ=function(){for(var l=0;l<3;l++){var a=new t;e.qBalls[l]=a,e.ballsDiv.appendChild(a.html)}},this.spawnBalls=function(){for(var l=0;l<e.qBalls.length;){var t=Math.floor(Math.random()*e.width),a=Math.floor(Math.random()*e.height);e.fields[t][a].html.appendChild(e.qBalls[l].html),l++}e.ballsToQ()},this.fields=[],this.width=9,this.height=9,this.init()}})();