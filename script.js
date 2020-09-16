let canvas=document.getElementById('canvas')
let ctx=canvas.getContext('2d');
var memeData;
var meme=new Image()
var text=[]
offsetX=320
var selected=-1
index=0
var colors=['white','black']

offsetY=130
canvas.style = "position:absolute; left: 50% ;top:130px; margin-left: -320px;";


let url='https://api.imgflip.com/get_memes'


async function getImages (){
let commit= await fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
   
    console.log(data)
    copyJson(data)

    
  })
  .catch((err) => {
    console.log(err)
  })
}

getImages()

function copyJson(memelist){

    memeData=JSON.parse(JSON.stringify(memelist))
    console.log(memeData)

    init()



}


function init(){


temptext1=new MemeText('',320,40,colors[0])
    text.push(temptext1)
    temptext2=new MemeText('',320,500,colors[0])
    text.push(temptext2)
    DrawMeme()
    

}


const firstText=document.getElementById("text1")

firstText.addEventListener('input', text1);

const secondText=document.getElementById("text2")

secondText.addEventListener('input', text2);



function text1(e){


    text[0].updateText(e.originalTarget.value)
    DrawMeme()
    console.log(text)
}




function text2(e){

        text[1].updateText(e.originalTarget.value)
        DrawMeme()
        
 
}
    



                                                            //constructor

    function MemeText(text, x, y, color) {                                                         
        this.text = text
        this.x=x
        this.y = y
        
        this.color = color

        this.draw=()=>{

        ctx.font = '30pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = this.color;
        
        ctx.fillText(this.text, this.x,this.y);
                    
        }

        this.updateText=(txt)=>{
            this.text=txt

        }
        
    }

                                                                                // functions for dragging texts

    canvas.onmousedown=handleMouseDown
    canvas.onmousemove=handleMouseMove
    canvas.onmouseup=handleMouseUp


    function handleMouseDown(e){
        e.preventDefault();
        startX=parseInt(e.clientX-offsetX);
        startY=parseInt(e.clientY-offsetY);

        
        if( distance(startX,startY,text[0].x,text[0].y) < distance(startX,startY,text[1].x,text[1].y))
        {
            selected=0
        }
        else {
            selected=1
        }


        console.log(startX,startY,selected)
        console.log(distance(startX,startY,text[0].x,text[0].y),distance(startX,startY,text[1].x,text[1].y))
    }




    function handleMouseMove(e){
        if(selected<0){return;}
  
        e.preventDefault();
        startX=parseInt(e.clientX-offsetX);
        startY=parseInt(e.clientY-offsetY);
        text[selected].x=startX
        text[selected].y=startY

        console.log(text[selected].x,text[selected].y,startX,startY)

        DrawMeme()



    }

    function handleMouseUp(e){
        e.preventDefault();
        selected=-1;
      }


                                                                    // draw func
    function DrawMeme(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    meme.src=memeData.data.memes[index].url
    console.log(meme)
    meme.onload=function(){


    if(memeData.data.memes[index].height<=memeData.data.memes[index].width){
    heightmeme=(memeData.data.memes[index].height/memeData.data.memes[index].width)* canvas.width
    console.log(canvas.width,heightmeme)
    ctx.drawImage(meme,0,0,canvas.width,heightmeme)
    }
    else{

        widthmeme=(memeData.data.memes[index].width/memeData.data.memes[index].height)* canvas.height
        
    ctx.drawImage(meme,0,0,widthmeme,canvas.height)

    }
    
    for(var i=0;i<text.length;i++){
        text[i].draw()
    }


    }
}
                                                                // options
function prev(){
    if (index>0)
    {
    index--}
    DrawMeme()
}


function next(){
    if (index<99)
    {
    index++}
    console.log(index)
    DrawMeme()
}
function toggle(){
    for(var i=0;i<text.length;i++){
        if (text[i].color==colors[0]){
            text[i].color=colors[1]
        }
        else{
            text[i].color=colors[0]
        }
    }
    DrawMeme()
}
function distance(x1, y1, x2, y2) {                                                         
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
