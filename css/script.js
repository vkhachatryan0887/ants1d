let treadmill=document.getElementById("treadmill");
let blue=document.getElementById("blue");
let red=document.getElementById("red");
let ruler=document.getElementById("ruler");
let timer=document.getElementById("timer");
let startb=document.getElementById("startb");
let animationrange=document.getElementById("animationrange");
let timecheckbox=document.getElementById("timecheckbox");
let changeb=document.getElementById("changeb");
let blueform=document.getElementById("blueform");
let redform=document.getElementById("redform");
let vazquxiform=document.getElementById("vazquxiform");
let bvazquxichoise=document.querySelectorAll('input[name="bvazquxichoise"]');
let rvazquxichoise=document.querySelectorAll('input[name="rvazquxichoise"]');
let start=document.getElementById("start");
let relspeed=document.getElementById("relspeed");
let meettime=document.getElementById("meettime");
let meetplace=document.getElementById("meetplace");
let exersicesb=document.getElementById("exersicesb");
let exersicesrb=document.getElementById("exersicesrb");
let lines=document.getElementById("lines");
let blueinbox=document.getElementById("blueinbox");
let redinbox=document.getElementById("redinbox");
let vazquxiinbox=document.getElementById("vazquxiinbox");
let exersices=document.getElementById("exersices");
let answers=document.getElementById("answers");
let checkbutton=document.getElementById("checkbutton");
let exnumber=document.getElementById("exnumber");
let nextbutton=document.getElementById("nextbutton");
let answer=document.getElementById("answer");
let checkedform=document.getElementById("checkedform");
let anscount=document.getElementById("anscount");
let payman=document.getElementById("payman");
let bstart0=document.getElementById("bstart0");
let rstart0=document.getElementById("rstart0");
let bluevazquxichoise=document.getElementById("bluevazquxichoise");
let redvazquxichoise=document.getElementById("redvazquxichoise");
let bluespeed=document.getElementById("bluespeed");
let redspeed=document.getElementById("redspeed");
let vazquxispeed=document.getElementById("vazquxispeed");
let bchange=document.getElementById("bchange");
let rchange=document.getElementById("rchange");
let rlate=document.getElementById("rlate");
let rlatenum=document.getElementById("rlatenum");
let relspeedbox=document.getElementById("relspeedbox");

let checkedimg="url(/image/checked.png)";
let checkedyes="url(/image/checkedyes.png)";
let checkedno="url(/image/checkedno.png)";
let bleft="url('/image/blueleft.png')";
let bright="url('/image/blueright.png')";
let rleft="url('/image/redleft.png')";
let rright="url('/image/redright.png')";
let ex1="Անշարժ վազքուղու վրա բզեզները գտնվում են որոշակի սկզբնակետերի վրա իրար հանդիպակաց,վերցնել սկզբնակետերի կոորդինատը, կատարել փորձը, գրանցել հանդիպման կոորդինատը և ժամանակը։ Ինչի՞ է հավասար բզեզների հարաբերական արագությունը։";
let ex2="Մի բզեզը գտնվում է ճանապարհի վրա որոշակի կոորդինատում մյուսը վազքուղով շարժվում է նախ վազքուղու շարժման ուղղությամբ, այնուհետև հակառակ";

let xlength=parseInt(ruler.offsetWidth/2-blue.offsetWidth/2);
let problemobj;
let problems=[];
let inputs=new Array(3);
let bluem;
let redm;
let treadm;
let mintime;
let mettime;
let mettplace;
let ttime=0;
let mchecker="start";
let changevalue;
let ex2checker=0;
let timetemp=0;
let rlatetime=0;
let problemnumber=0;
let problemchecker=0;
let anschecker=0;
bstart.min=-1*xlength;
bstart.max=xlength;
rstart.min=-1*xlength;
rstart.max=xlength;


inputsinit();
drawinsects();
drawruler();

function animation() {
  let currentTime = 0;
  gsap.ticker.add(() => {
    currentTime = bluem.time() || redm.time() || treadm.time();
    let progress = currentTime / mintime;
    animationrange.value = progress * 100;
  });
}

animationrange.oninput=function(){
  let timerange=(animationrange.value/100)*mintime;
  treadm.progress(timerange/inputs[2].time);
  bluem.progress(timerange/inputs[0].time);
  redm.progress(timerange/inputs[1].time);
  mpause();
}

function mintimer(){
  if(inputs[0].relspeed==0 && inputs[1].relspeed==0){
    animationrange.style.display="none";
    timecheckbox.style.display="block"
    return 0;
  }
  
  else if(inputs[0].relspeed==0)
  return inputs[1].time;
  else if(inputs[1].relspeed==0)
  return inputs[0].time;
  else{
    if(inputs[1].time<inputs[0].time)
    return inputs[1].time;
  }
  return inputs[0].time;
}

function inputsinit(){
  inputs[0]={
    color: "blue",
    speed:"",
    relspeed: "",
    lengthx:xlength,
    time:0,
    start0:0,
    vchecker:1,
    x0temp:0,
    changecheck:0,
  };
  inputs[1]={
    color : "red",
    speed:"",
    relspeed: "",
    lengthx:xlength,
    time:0,
    start0:0,
    vchecker:1,
    changecheck:0,
    latecheck:1,
    x0temp:0,
  };
  
  inputs[2]={
    name: "tread",
    speed:0,
    lengthx:0,
    time:0,
  };
}

function problemsinitial(){
  problemsinit();
  problems[1].red.start0=parseInt(problems[1].blue.start0+Math.random()*(-1)*(xlength+problems[1].blue.start0));
  problems[1].red.speed=parseInt(Math.random()*50+problems[1].blue.speed*(xlength-problems[1].red.start0)/(xlength-problems[1].blue.start0));

  problems[2].blue.start0=parseInt(-1*problems[2].blue.speed+Math.random()*(xlength+problems[2].blue.speed));
  problems[2].red.speed=-1*problems[2].blue.speed;
  problems[2].red.start0=-1*problems[2].blue.start0;
  problems[2].payman+=problems[2].red.speed+"մմ/վ";

  problems[3].blue.start0=-1*parseInt(-1*problems[3].blue.speed+Math.random()*(xlength+problems[3].blue.speed));
  problems[3].red.start0=-1*problems[3].blue.start0;
  problems[3].pvspeed=-1*(problems[3].red.speed+problems[3].blue.speed)/2;
  problems[3].correctanswer=problems[3].pvspeed;
  problems[3].payman+=problems[3].blue.speed+" մմ/վ և "+problems[3].red.speed+ "մմ/վ";

  problems[4].red.start0=problems[4].blue.start0;
}
function correctanswerinit(){
  switch(problemnumber){
    case 0:
    case 1:
      problems[problemnumber].correctanswer=((inputs[1].start0-inputs[0].start0)/ttime).toFixed(2);
      break;
    case 2:
      problems[problemnumber].correctanswer=(2*(inputs[1].speed-inputs[0].start0/ttime)).toFixed(2);
      break;
    case 4:
      problems[problemnumber].correctanswer=(ttime/2).toFixed(2);
      break;
  }
}
function problemsinit()
{
  problems[0]={
    payman:"Անշարժ վազքուղու վրա բզեզները գտնվում են որոշակի սկզբնակետերի վրա, շարժվում են իրար հանդիպակաց:Գրանցել սկզբնակետերի կոորդինատները, կատարել փորձը, գրանցել հանդիպման կոորդինատը և ժամանակը։Հաշվել և գտնել բզեզների հարաբերական արագությունը։Պատասխանը նշել 00․00 ֆորմատով,ամբողջից հետո երկու թվի ճշտությամբ։",
    blue:{
        speed:parseInt(50+Math.random()*50),
        start0:parseInt(Math.random()*(-1)*xlength),
        vchecker:1,
        changecheck:0,
        },
    red:{ 
          speed:-1*parseInt(50+Math.random()*50),
          start0:parseInt(Math.random()*xlength),
          vchecker:1,
          changecheck:0,
          latecheck:1,
          latetime:0,
         },
    pvspeed:0,
    correctanswer:"",
  }
  problems[1]={
    payman:"Անշարժ վազքուղու վրա բզեզները գտնվում են որոշակի սկզբնակետերի վրա, շարժվում են նույն ուղղությամբ։Գրանցել սկզբնակետերի կոորդինատները, կատարել փորձը, գրանցել հանդիպման կոորդինատը և ժամանակը։Հաշվել և գտնել բզեզների հարաբերական արագությունը։Պատասխանը նշել 00․00 ֆորմատով,ամբողջից հետո երկու թվի ճշտությամբ։",
    blue:{
        speed:parseInt(50+Math.random()*50),
        start0:parseInt(Math.random()*(-1)*xlength),
        vchecker:1,
        changecheck:0,
        },
    red:{ 
          speed:"",
          start0:"",
          vchecker:1,
          changecheck:0,
          latecheck:1,
          latetime:0,
         },
    pvspeed:0,
    correctanswer:"",
  } 
  
  problems[2]={
    payman:"Զրոյից հավասարահեռ կետերից բզեզները սկսում են շարժվել իրար հանդիպակաց միևնույն սեփական արագությամբ,կապույտ բզեզը վազքուղու վրա, կարմիրը ճանապարհի։Գրանցել սկզբնակետերի կոորդինատները, կատարել փորձը, գրանցել հանդիպման կոորդինատը և ժամանակը։ Հաշվել և գտնել վազքուղղու արագությունը։Պատասխանը նշել 00․00 ֆորմատով,ամբողջից հետո երկու թվի ճշտությամբ։ Բզեզների սեփական արագությունը՝ ",
    blue:{
        speed:-1*parseInt(50+Math.random()*50),
        start0:"",
        vchecker:1,
        changecheck:0,
        },
    red:{ 
          speed:"",
          start0:"",
          vchecker:0,
          changecheck:0,
          latecheck:1,
          latetime:0,
         },
    pvspeed:parseInt(5+Math.random()*45),
    correctanswer:"",
  } 
  problems[3]={
    payman:"Զրոյից հավասարահեռ կետերից բզեզները սկսում են շարժվել վազքուղղու վրա, իրար հանդիպակաց։Գրանցել սկզբնակետերի կոորդինատները, կատարել փորձը, գրանցել հանդիպման կոորդինատը և ժամանակը։ Հաշվել և գտնել վազքուղղու արագությունը։Պատասխանը նշել 00․00 ֆորմատով,ամբողջից հետո երկու թվի ճշտությամբ։ Կապույտ և կարմիր բզեզների արագությունը համապատախանաբար՝ ",
    blue:{
        speed:parseInt(50+Math.random()*50),
        start0:"",
        vchecker:1,
        changecheck:0,
        },
    red:{ 
          speed:-1*parseInt(20+Math.random()*30),
          start0:"",
          vchecker:1,
          changecheck:0,
          latecheck:1,
          latetime:0,
         },
    pvspeed:"",
    correctanswer:"",
  }
  problems[4]={
    payman:"Որոշակի կետից սկսվում է շարժումը, վազքուղու և կարմիր բզեզի արագության ուղղությունները համընկնում են, իսկ կապույտ բզեզի արագությունը հավասար է զրոյի։Կատարել փորձը, գրանցել հանդիպման կոորդինատը և ժամանակը։ Հաշվել և գտնել կարմիր բզեզի մինչև պտտման կետ հասնելու ժամանակը։ Պատասխանը նշել 00․00 ֆորմատով,ամբողջից հետո երկու թվի ճշտությամբ։",
    blue:{
        speed:0,
        start0:parseInt(-xlength+Math.random()*xlength),
        vchecker:1,
        changecheck:0,
        },
    red:{ 
          speed:parseInt(100+Math.random()*50),
          start0:"",
          vchecker:1,
          changecheck:1,
          latecheck:1,
          latetime:0,
         },
    pvspeed:parseInt(5+Math.random()*45),
    correctanswer:2,
  }
}

function probleminit(){
  
inputs[0].speed=problems[problemnumber].blue.speed;
inputs[0].x0temp=inputs[0].start0=problems[problemnumber].blue.start0;
inputs[0].vchecker=problems[problemnumber].blue.vchecker;
inputs[0].changecheck=problems[problemnumber].blue.changecheck;

inputs[1].speed=problems[problemnumber].red.speed;
inputs[1].x0temp=inputs[1].start0=problems[problemnumber].red.start0;
inputs[1].vchecker=problems[problemnumber].red.vchecker;
inputs[1].changecheck=problems[problemnumber].red.changecheck;
inputs[1].latecheck=problems[problemnumber].red.latecheck;

inputs[2].speed=problems[problemnumber].pvspeed;
rlatetime=problems[problemnumber].red.latetime;

inputs[0].relspeed=inputs[0].speed+inputs[0].vchecker*inputs[2].speed;
inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed+inputs[1].vchecker*inputs[2].speed;
if(inputs[0].vchecker==0)
blue.style.top="50vh";
if(inputs[1].vchecker==0)
red.style.top="55vh";
if(inputs[0].vchecker==1)
blue.style.top="20vh";
if(inputs[1].vchecker==1)
red.style.top="25vh";
}



function exersicescheck(){
  correctanswerinit();
  if((answer.value)==problems[problemnumber].correctanswer)
  {
    checkedform.style.backgroundImage=checkedyes;
    problemobj.correctAnswers++;
    anscount.innerHTML=problemobj.correctAnswers;
    
  }
  else{
    if(anschecker==0)
    {
      checkbutton.disabled=false;
      checkbutton.innerHTML="Ուղղել Սխալը"
      anschecker=1;
    }
    else{
      checkbutton.disabled=true;
      alert(`Ճիշտ պատասխանն է ${problems[problemnumber].correctanswer}`)
    }
    checkedform.style.backgroundImage=checkedno;
    
  }
}
function timelengthcollect(){
  if(inputs[2].speed==0)
  {
    inputs[2].lengthx=ruler.offsetWidth;
    inputs[2].time=0;
  }
  else
  {
    inputs[2].lengthx=Math.sign(inputs[2].speed)*ruler.offsetWidth;
    inputs[2].time=inputs[2].lengthx/inputs[2].speed;
  }
    for(let i=0;i<2;i++)
  {  
    if (inputs[i].relspeed==0)
    {
      inputs[i].lengthx=0;
      inputs[i].time=-1;
    }
    else
    {
      inputs[i].lengthx=Math.sign(inputs[i].relspeed)*xlength-inputs[i].start0;
      inputs[i].time=inputs[i].lengthx/inputs[i].relspeed;
    }
  }
}
function drawruler(){
  let n= parseInt(ruler.offsetWidth/50);
  let rulerlinewidth=ruler.offsetWidth/2;
  for(let i=0;i<n+1;i++)
  {
    let innumber=i*25;
    const mylineleft=document.createElement("div")
    mylineleft.className="rulerlines";
    ruler.appendChild(mylineleft)
    let lleft=rulerlinewidth-innumber+"px"
    mylineleft.style.left=lleft;
    if(i%2==0){
      mylineleft.innerHTML=-1*innumber;
    }
    mylineleft.style.textAlign="left";
    const mylineright=document.createElement("div")
    mylineright.className="rulerlines";
    ruler.appendChild(mylineright)
    let lright=rulerlinewidth+innumber+"px"
    mylineright.style.left=lright;
    if(i%2==0){
      mylineright.innerHTML=innumber;
    }
    mylineright.style.textAlign="right";
  }
}
function drawinsects(){
  if (inputs[0].relspeed<0)
  blue.style.backgroundImage=bleft;
  else
  blue.style.backgroundImage=bright;
  if(inputs[1].relspeed<0)
  red.style.backgroundImage=rleft;
  else
  red.style.backgroundImage=rright;
  blue.style.left=parseInt(xlength+inputs[0].x0temp)+"px";
  red.style.left=parseInt(xlength+inputs[1].x0temp)+"px"; 
}
function timeprint(){
    setInterval(()=>{
  timecheckprint();
  animation();
  if(inputs[1].latecheck==0 && ttime>rlatetime)
      {
        inputs[1].latecheck=1;
        lating();
      }
  },1)

  
}
function timecheckprint() {
  let tt=((bluem.time() > 0) ? bluem.time() : 
  (redm.time() > 0) ? redm.time() : 
   treadm.time());
  ttime = (timetemp + tt).toFixed(2);
  let tsecond = parseInt(ttime);
  let tmilliseconds = parseInt((ttime - tsecond) * 100);
  if (tsecond < 10) {
    tsecond = "0" + tsecond;
  }
  if (tmilliseconds < 10) {
    tmilliseconds = "0" + tmilliseconds;
  }
  let formattedTime = tsecond + ":" + tmilliseconds;
  timer.innerHTML = formattedTime;
  if(mettime>0 && tt>mettime)
  {
    meettime.innerHTML=timer.innerHTML;
    meetplace.innerHTML=parseInt(mettplace);
    mettime=0;
    mpause();
    if(problemchecker==1)
    {
      startb.innerHTML="Կրկին";
      mchecker="restart";
      checkbutton.disabled=false;
      if (problemnumber==3)
      meetplace.innerHTML="0";
      if (problemnumber==2)
      meetplace.innerHTML="";
    }
    console.log(ttime);
  }
}
function motionrestart()
{ motionkill();
  treadm=gsap.to ("#treadmill", { 
    x: 0,
    duration: 0,
  });
  bluem= gsap.to("#blue",{
    x: 0,
    duration: 0,
   
  });
  redm=gsap.to("#red",{
    x: 0,
    duration: 0,
  });
  motionkill();
}
function problemrestart()
{ probleminit();
  bstart0.style.display="block";
  bstart0.innerHTML=inputs[0].start0;
  rstart0.style.display="block";
  rstart0.innerHTML=inputs[1].start0;
  motionrestart();
  drawinsects();
  starting();
  meettime.innerHTML="";
  meetplace.innerHTML="";
  checkbutton.disabled=true;
  if(problemnumber==4)
  rstart0.style.display="none";

}
function motionkill(){
  if(bluem)
  bluem.kill();
  if(redm)
  redm.kill();
  if(treadm)
  treadm.kill();
}
function startmotion(){
  freeze();
  treadm=gsap.to ("#treadmill", { 
    x: inputs[2].lengthx ,
    ease: "none",
    repeat: -1,
    duration: inputs[2].time,
  });
  bluem= gsap.to("#blue",{
    x: inputs[0].lengthx,
    duration: inputs[0].time,
    ease: "none",
    onComplete: ()=>{
      
      mettime=0;
      freeze();
        if(inputs[0].time!=-1){
        redm.pause();
        treadm.pause();
        startb.innerHTML="Կրկին";
        mchecker="restart";
        if(inputs[0].changecheck){
          changedirection(0);
          inputs[0].changecheck=0;
          mstart();
          meettingtime();
        }
        
    }}
  });
  redm=gsap.to("#red",{
    x: inputs[1].lengthx,
    duration: inputs[1].time,
    ease: "none",
    onComplete: ()=>{
      freeze();
      mettime=0;
      if (inputs[1].time!=-1){
      bluem.pause();
      treadm.pause();
      startb.innerHTML="Կրկին";
      mchecker="restart";
      if(inputs[1].changecheck){
        changedirection(1);
        inputs[1].changecheck=0;
        mstart();
        meettingtime();
      }
      
    }}
  });
  
}
function mstart()
{
  startmotion();
  mchecker="pause";
  startb.innerHTML="Կանգ";
  timeprint();
}
function mpause()
{
  treadm.pause();
  bluem.pause();
  redm.pause();
  mchecker="resume";
  startb.innerHTML="Շարունակել";
  timeprint();
}
function mresume()
{
  treadm.play();
  bluem.play();
  redm.play();
  timeprint();
  mchecker="pause";
  startb.innerHTML="Կանգ"
}
 function mrestart()
{ 
  if(problemchecker==1)
  {
      problemrestart();
      mchecker="start";
      startb.innerHTML="Սկսել Փորձը"
  }
  else{
  meettingtime()
  timeprint();
  redm.restart();
  bluem.restart();
  treadm.restart(); 
  mchecker="pause";
  startb.innerHTML="Կանգ"  
  }
  
}
function freeze(){
  let blueformelements=blueform.elements;
  let redformelements=redform.elements;
  let vazquxiformelements=vazquxiform.elements;
  for(let i=0;i<blueformelements.length;i++){
    blueformelements[i].disabled=!blueformelements[i].disabled;
  }
  for(let i=0;i<redformelements.length;i++){
    redformelements[i].disabled=!redformelements[i].disabled;
  }
  for(let i=0;i<vazquxiformelements.length;i++){
    vazquxiformelements[i].disabled=!vazquxiformelements[i].disabled;
  }

  bluevazquxichoise.style.display="none";
  redvazquxichoise.style.display="none";

}
function meettingtime()
{
  if(inputs[0].relspeed==inputs[1].relspeed)
  {
    mettime=0;
  }
  else{
  mettime=(inputs[0].start0-inputs[1].start0)/(inputs[1].relspeed-inputs[0].relspeed)
  mettplace=inputs[0].start0+mettime*inputs[0].relspeed;
  }
 
}
function starting(){
  start.style.display="none";
  startb.style.display="block";
  changeb.style.display="block";
  animationrange.style.display="block";
  exersicesb.style.display="none";
  exersicesrb.style.display="none";
  timelengthcollect();
  mintime=mintimer();
  relspeed.innerHTML=(Math.abs(inputs[0].relspeed-inputs[1].relspeed));
  freeze();  
  meettingtime();
}
function lating(){
  inputs[1].latecheck=1;
  let ttimetemp=((bluem.time() > 0) ? bluem.time() : 
  (redm.time() > 0) ? redm.time() : 
  treadm.time())
  timetemp+= ttimetemp;
  for (let i=0;i<2;i++){
    inputs[i].start0=parseInt( inputs[i].start0+ttimetemp*inputs[i].relspeed);
  }
  inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed+inputs[1].vchecker*inputs[2].speed;
  
  motionkill();
  timelengthcollect();
  inputs[1].lengthx+=inputs[1].vchecker*ttime*inputs[2].speed;
  inputs[0].lengthx+=ttime*inputs[0].relspeed;
  startmotion();
  mchecker="pause";
  startb.innerHTML="Կանգ";
  timeprint();
  meettingtime();
  relspeed.innerHTML=Math.abs(inputs[0].relspeed-inputs[1].relspeed);

}
function changedirection(dirvalue)
{ 
  freeze();  
  let ttimetemp=((bluem.time() > 0) ? bluem.time() : 
  (redm.time() > 0) ? redm.time() : 
  treadm.time())
  timetemp+= ttimetemp;
  inputs[dirvalue].start0=Math.sign(inputs[dirvalue].relspeed)*xlength;
  inputs[1-dirvalue].start0=parseInt( inputs[1-dirvalue].start0+ttimetemp*inputs[1-dirvalue].relspeed);
  inputs[dirvalue].speed*=(-1);
  inputs[dirvalue].relspeed=(inputs[dirvalue].speed+inputs[dirvalue].vchecker*inputs[2].speed);
  inputs[dirvalue].lengthx=Math.sign(inputs[dirvalue].relspeed)*xlength-inputs[dirvalue].x0temp;
  if(inputs[1-dirvalue].relspeed)
  inputs[1-dirvalue].time-=ttimetemp;
  else
  bluespeed.value=inputs[0].speed;
  redspeed.value=inputs[1].speed;
  vazquxispeed.value=inputs[2].speed;
  mpause();
  drawinsects();
  motionkill();
  inputs[dirvalue].time=2*xlength/Math.abs(inputs[dirvalue].relspeed);
  relspeed.innerHTML=Math.abs(inputs[0].relspeed-inputs[1].relspeed);
}
function exersicesupdate(){
  timetemp=0;
  if (problemnumber%4!=0)
  {
    motionrestart();
  }
  probleminit();
  checkbutton.disabled=true;
  exnumber.innerHTML=problemnumber%4+1;
  drawinsects();
  bstart0.style.display="block";
  bstart0.innerHTML=inputs[0].start0;
  rstart0.style.display="block";
  rstart0.innerHTML=inputs[1].start0;
  if(problemnumber==2)
    rstart0.style.top="-5vh";
  else
    rstart0.style.top="5vh";
  if(problemnumber==4)
  rstart0.style.display="none";
  payman.innerHTML=problems[problemnumber].payman;
  starting();
  problemchecker=1;
}

// event listeners start


bstart.oninput=()=>{
  inputs[0].x0temp=inputs[0].start0=parseInt(bstart.value);
  bstart0.innerHTML=parseInt(bstart.value);
  drawinsects();
}
rstart.oninput=()=>{
  inputs[1].x0temp=inputs[1].start0=parseInt(rstart.value);
  rstart0.innerHTML=parseInt(rstart.value);
  drawinsects();
}

bvazquxichoise.forEach(function(choise) {
  choise.addEventListener('change', function() {
      if (choise.checked) {
         if(choise.value=="bluevazquxi")
         {
          inputs[0].vchecker="1";
          blue.style.top="20vh";
          inputs[0].relspeed=inputs[0].speed+inputs[2].speed;
          drawinsects();
         }
         else
         {
          inputs[0].vchecker="0";
          blue.style.top="50vh";
          inputs[0].relspeed=inputs[0].speed;
          drawinsects();
         }
      }
  });
  
});

rvazquxichoise.forEach(function(choise) {
  choise.addEventListener('click', function() {
    if (choise.checked) {
      if(choise.value=="redvazquxi")
      {
       inputs[1].vchecker="1";
       red.style.top="25vh";
       inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed+inputs[2].speed;
       drawinsects();
      }
      else
      {
       inputs[1].vchecker="0";
       red.style.top="55vh";
       inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed;
       drawinsects();
      }
   }
  });
});

bluespeed.oninput=()=>{
  inputs[0].speed=parseInt(bluespeed.value);
  inputs[0].relspeed=inputs[0].speed+inputs[0].vchecker*inputs[2].speed;
  drawinsects();
}
redspeed.oninput=()=>{
  inputs[1].speed=parseInt(redspeed.value);
  inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed+inputs[1].vchecker*inputs[2].speed;
  drawinsects();
}
vazquxispeed.oninput=()=>{
  inputs[2].speed=parseInt(vazquxispeed.value);
  inputs[0].relspeed=inputs[0].speed+inputs[0].vchecker*inputs[2].speed;
  inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed+inputs[1].vchecker*inputs[2].speed;
  drawinsects();
}

start.addEventListener("click",()=>
{
    starting()
});

startb.addEventListener("click",()=>{
  bstart0.style.display="none";
  rstart0.style.display="none";
  
  if(mchecker=="start")
  mstart();
  else if(mchecker=="pause")
  mpause();
  else if(mchecker=="resume")
  mresume();
  else if(mchecker=="restart")
  mrestart(); 
});
changeb.addEventListener("click",()=>{
   location.reload();
  });
window.addEventListener("resize",()=>{
    location.reload();
  });
lines.addEventListener("click",()=>{
  let rulerlines=document.querySelectorAll(".rulerlines");
  
  if(lines.checked){
    rulerlines.forEach(function(element){
      element.style.borderWidth="1px";
    })
  }
  else{
    rulerlines.forEach(function(element){
      element.style.borderWidth="0px";
    })
  }

})

exersicesb.addEventListener("click",()=>{
  anscount.innerHTML=0;
  relspeedbox.style.display="none";
  blueinbox.style.display="none";
  redinbox.style.display="none";
  vazquxiinbox.style.display="none";
  exersices.style.display="flex";
  answers.style.display="flex";
  problemsinitial();
  exersicesupdate();
})
exersicesrb.addEventListener("click",()=>{
  anscount.innerHTML=0;
  relspeedbox.style.display="none";
  blueinbox.style.display="none";
  redinbox.style.display="none";
  vazquxiinbox.style.display="none";
  exersices.style.display="flex";
  answers.style.display="flex";
  problemsinitial();
  problemnumber=4;
  exersicesupdate()
})
checkbutton.addEventListener("click",()=>{
  if(checkbutton.innerHTML=="Ուղղել Սխալը")
  {
    checkbutton.innerHTML="Ստուգել";
    startb.disabled=false;
    checkedform.style.backgroundImage=checkedimg;
    answer.value="";
  }
  else{
    startb.disabled=true;
    exersicescheck();
  }
  
})
nextbutton.addEventListener("click",()=>{
  if(problemnumber>=3)
  location.reload();
  else{
    startb.innerHTML="Սկսել Փորձը";
  mchecker="start";
  problemnumber++
  exersicesupdate();
  starting();
  }
  anschecker=0;
  checkbutton.innerHTML="Ստուգել";
  meettime.innerHTML="";
  meetplace.innerHTML="";
  startb.disabled=false;
  checkedform.style.backgroundImage=checkedimg;

});
bchange.addEventListener("click",()=>{
  if(bchange.checked)
    inputs[0].changecheck=1;
  else
    inputs[0].changecheck=0;
})
rchange.addEventListener("click",()=>{
  if(rchange.checked)
    inputs[1].changecheck=1;
  else
    inputs[1].changecheck=0;
})
rlate.addEventListener("click",()=>{
  if(rlate.checked)
  {
    rlatenum.style.display="block";
    rlatenum.min=0;
    rlatenum.value=0;
    rlatetime=0;
    inputs[1].latecheck=0;
    inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed+inputs[1].vchecker*inputs[2].speed;
  }
  else
  {
    rlatenum.style.display="none";
    rlatetime=0
    inputs[1].latecheck=1;
    inputs[1].relspeed=inputs[1].latecheck*inputs[1].speed+inputs[1].vchecker*inputs[2].speed;
  }
});
rlatenum.oninput=function(){
  rlatetime=rlatenum.value;
}