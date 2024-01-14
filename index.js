import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const modalInner = document.getElementById("meme-modal-inner")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener("change",highlightRadio)

function highlightRadio(e){
    const radios = document.getElementsByClassName("radio")
    for(let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}



getImageBtn.addEventListener("click",renderCat)

function renderCat(){
        const cat=getSingleCatObject()
        modalInner.innerHTML=`<img 
        class="cat-img" 
        src="./images/${cat.image}"
        alt="${cat.alt}"
        >
        `
        memeModal.style.display="flex"
    
}

function getSingleCatObject(){
    const catObject=getMatchingCat()

    const randomIndex=Math.floor(Math.random()*catObject.length)

        if(catObject.length===1){
            return catObject[0]

        }else{
            return catObject[randomIndex]
        }
}

function getMatchingCat(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedRadio = document.querySelector('input[type="radio"]:checked')

        const isGif=gifsOnlyOption.checked

        const matchingCat=catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedRadio.value) && cat.isGif===true
            }else{
                return cat.emotionTags.includes(selectedRadio.value)
            }
        })
        return matchingCat
} 
}

memeModalCloseBtn.addEventListener("click",closeMemeModal)

function closeMemeModal(){
    memeModal.style.display="none"
}

function getEmotionsArray(cats){
    const emotionsArray=[]

    for(let cat of cats){
        for(let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
return emotionsArray
}

function renderEmotionsRadio(cats){

let htmlDom=''
const emotions=getEmotionsArray(cats)

for(let emotion of emotions){
    htmlDom+=`
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input name="radios" id="${emotion}" value="${emotion}" type="radio">
            </div>`
}
emotionRadios.innerHTML=htmlDom
}

renderEmotionsRadio(catsData)