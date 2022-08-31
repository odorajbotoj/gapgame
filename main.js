var originCards=[00, 00, 00, 00, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37, 42, 43, 44, 45, 46, 47];
var gameMap;
var nowStep;
var ifChoose=false;
var toMove;
var moveTo;
var mainStack=[];
function check()
{
  var forflag = true;
  for (var i = 1; i <= 4; i++)
    {
      if (!forflag) break;
      var toCheck = parseInt(document.getElementById((i*10+1).toString()).innerHTML);
      for (var j = 2; j <= 7; j++)
        {
          if (!forflag) break;
          var checking = parseInt(document.getElementById((i*10+j).toString()).innerHTML);
          if (toCheck+1!=checking)
            {
              forflag = false;
            }
          else
            {
              toCheck = checking;
            }
        }
	}
  if (!forflag)
    {
      var ctmp = 0;
      for (var i = 1; i <= 4; i++)
        {
          for (var j = 2; j <= 8; j++)
            { //存在bug
              if (((parseInt(document.getElementById((i*10+j).toString()).innerHTML)==0)&&(parseInt(document.getElementById((i*10+j-1).toString()).innerHTML)%10==7))||((parseInt(document.getElementById((i*10+j).toString()).innerHTML)==0)&&(parseInt(document.getElementById((i*10+j-1).toString()).innerHTML)==0)))
                {
                  ctmp++;
                }
            }
        }
      if (ctmp==4)
        {
          var ifNew2 = confirm("此程终矣! 似乎无路可走. \"确认\"开始新一局");
          if (ifNew2)
            {
              newGame(originCards);
            }
          return;
        }
      return;
    }
  var ifNew = confirm("您赢了! \"确认\"开始下一局");
  if (ifNew)
    {
      newGame(originCards);
    }
}
function reShow()
{
  document.getElementById("11").style.background='#FFCC99';
  document.getElementById("21").style.background='#99FF99';
  document.getElementById("31").style.background='#0099FF';
  document.getElementById("41").style.background='#FF00FF';
  var nowp = 0;
  for (var i = 1; i <= 4; i++)
    {
      for (var j = 2; j <= 8; j++)
        {
          nowc = gameMap[nowp++];
          var mp = i*10+j;
          if (nowc==0)
            {
              document.getElementById(mp.toString()).innerHTML="00";
              document.getElementById(mp.toString()).style.background='#FFFFFF';
            }
          else
            {
              document.getElementById(mp.toString()).innerHTML=nowc;
              switch((nowc-(nowc%10))/10)
                {
                  case 1:
                    document.getElementById(mp.toString()).style.background='#FFCC99';
                    break;
                  case 2:
                    document.getElementById(mp.toString()).style.background='#99FF99';
                    break;
                  case 3:
                    document.getElementById(mp.toString()).style.background='#0099FF';
                    break;
                  case 4:
                    document.getElementById(mp.toString()).style.background='#FF00FF';
                    break;
                }
            }
        }
    }
  document.getElementById("step").innerHTML=nowStep;
  check();
}
function newGame(cards)
{
  cards.sort(function(){return Math.random()>0.5?-1:1;});
  // var testGameMap=[12, 13, 14, 15, 16, 17, 00, 22, 23, 24, 25, 26, 27, 00, 32, 33, 34, 35, 36, 37, 00, 42, 43, 44, 45, 46, 00, 47];
  gameMap = cards;
  mainStack = [];
  mainStack.push([...gameMap]);
  nowStep = mainStack.length-1;
  reShow();
}
function move()
{
  var tme = document.getElementById(toMove).innerHTML;
  var mte = document.getElementById(moveTo).innerHTML;
  var bmte = document.getElementById((parseInt(moveTo)-1).toString()).innerHTML;
  if (tme!="00"&&mte=="00"&&parseInt(tme)==parseInt(bmte)+1)
    {
      var tm = parseInt(toMove);
      var tmap = ((((tm-(tm%10))/10)-1)*7) + (tm-(((tm-(tm%10))/10)*10)-2);
      var mt = parseInt(moveTo);
      var mtap = ((((mt-(mt%10))/10)-1)*7) + (mt-(((mt-(mt%10))/10)*10)-2);
      var aa = gameMap[tmap];
      gameMap[tmap] = gameMap[mtap];
      gameMap[mtap] = aa;
      mainStack.push([...gameMap]);
      nowStep = mainStack.length-1;
    }
  else
    {
      alert("不能将 "+toMove+" 位置的 "+tme+" 元素移动到 "+moveTo+" ( "+mte+" 元素, 前项为 "+bmte+" 元素 ) 位置上");
    }
  reShow();
}
function choose(pos)
{
  if (!ifChoose)
    {
      toMove = pos;
      ifChoose = true;
    }
  else
    {
      moveTo = pos;
      move();
      ifChoose = false;
    }
}
function save()
{
  document.getElementById("ta").innerHTML=JSON.stringify(mainStack);
}
function load()
{
  var s = "";
  s = prompt("请输入存档文本:");
  if (s!="")
    {
      mainStack = JSON.parse(s);
      gameMap = mainStack[mainStack.length-1];
      nowStep = mainStack.length-1;
    }
  reShow();
}
function back()
{
  if (mainStack.length <= 1)
    {
      alert("退无可退!");
    }
  else
    {
      mainStack.pop();
      gameMap = mainStack[mainStack.length-1];
      nowStep = mainStack.length-1;
      reShow();
    }
}