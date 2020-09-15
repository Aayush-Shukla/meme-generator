let canvas=document.getElementById('canvas')
let ctx=canvas.getContext('2d');
var memeData;
var meme=new Image()


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

    ctx.font = '30pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    
    ctx.fillText(e.originalTarget.value, canvas.width / 2, 40);
    console.log(e)
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
    
        ctx.font = '30pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'white';
        
        ctx.fillText(e.originalTarget.value, canvas.width / 2, 340);
        console.log(e)
    }
    
    
    }