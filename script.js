let canvas=document.getElementById('canvas')
let ctx=canvas.getContext('2d');
var memeData;
var meme=new Image()
var text=[]
offsetX=300
var selected=-1

offsetY=50


// let response= await fetch('https://api.imgflip.com/get_memes')


async function getTemp (){
let commit= await fetch('https://api.imgflip.com/get_memes')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    // keepIt(data.memes)
    console.log(data)
    keepIt(data)

    // console.log(memeData)
  })
  .catch((err) => {
    // Do something for an error here
  })
}

getTemp()

function keepIt(memelist){

    memeData=JSON.parse(JSON.stringify(memelist))
    console.log(memeData)

    init()



}


function init(){
// console.log("in")
// ctx.clearRect(0,0,320,320)
    
meme.src=memeData.data.memes[3].url
console.log(meme)
meme.onload=function(){
heightmeme=(memeData.data.memes[3].height/memeData.data.memes[3].width)* canvas.width
console.log(canvas.width,heightmeme)
ctx.drawImage(meme,0,0,canvas.width,heightmeme)
}

temptext1=new MemeText('',120,40,'black')
    text.push(temptext1)
    temptext2=new MemeText('',120,80,'black')
    text.push(temptext2)
    

}
// console.log(memeData)

const firstText=document.getElementById("text1")

firstText.addEventListener('input', text1);

const secondText=document.getElementById("text2")

secondText.addEventListener('input', text2);



function text1(e){

ctx.clearRect(0,0,canvas.width,canvas.height)
meme.src=memeData.data.memes[3].url
console.log(meme)
meme.onload=function(){
heightmeme=(memeData.data.memes[3].height/memeData.data.memes[3].width)* canvas.width
console.log(canvas.width,heightmeme)
ctx.drawImage(meme,0,0,canvas.width,heightmeme)

console.log("in")

    // ctx.font = '30pt Impact';
    // ctx.textAlign = 'center';
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 3;
    // ctx.fillStyle = 'white';
    
    // ctx.fillText(e.originalTarget.value, canvas.width / 2, 40);
    // console.log(e)
    // temptext=new MemeText(e.originalTarget.value,20,20,'black')
    // text.push(temptext)
    text[0].updateText(e.originalTarget.value)
    text[0].draw()
    console.log(text)
}


}




function text2(e){

    ctx.clearRect(0,0,canvas.width,canvas.height)
    meme.src=memeData.data.memes[3].url
    console.log(meme)
    meme.onload=function(){
    heightmeme=(memeData.data.memes[3].height/memeData.data.memes[3].width)* canvas.width
    console.log(canvas.width,heightmeme)
    ctx.drawImage(meme,0,0,canvas.width,heightmeme)
    
    console.log("in")
    
        // ctx.font = '30pt Impact';
        // ctx.textAlign = 'center';
        // ctx.strokeStyle = 'black';
        // ctx.lineWidth = 3;
        // ctx.fillStyle = 'white';


        text[1].updateText(e.originalTarget.value)
    text[1].draw()
        
        // ctx.fillText(e.originalTarget.value, canvas.width / 2, 340);
        // console.log(e)
    }
    
    
    }





    function MemeText(text, x, y, color) {                                                         /*constructor function with 4 paramenter*/
        this.text = text
        this.x=x
        this.y = y
        
        this.color = color

        this.draw=()=>{

        ctx.font = '30pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'white';
        
        ctx.fillText(this.text, this.x,this.y);
        // console.log(e)

            
        }

        this.updateText=(txt)=>{
            this.text=txt

        }
        
    }



    canvas.onmousedown=handleMouseDown
    canvas.onmousemove=handleMouseMove


    function handleMouseDown(e){
        e.preventDefault();
        startX=parseInt(e.clientX-offsetX);
        startY=parseInt(e.clientY-offsetY);

        // Put your mousedown stuff here
        
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

        text[0].draw()



    }



    function distance(x1, y1, x2, y2) {                                                         /*function to calculate distance b/w two points*/
        const xDist = x2 - x1
        const yDist = y2 - y1
    
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
    }