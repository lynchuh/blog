let $imgs = $('#slideWrapper > img')
let $slides = $('#slideWrapper')
let $indexButtons = $('#buttonWrapper > span')
let $fristCopy=$imgs.eq(0).clone(true)
let $lastCopy=$imgs.eq($imgs.length-1).clone(true)
let current = 0
createFakeImg()
$indexButtons.eq(current).addClass('active')
autoSlide()


//下面是事件监听
$(preOrNextButton).on('click','SVG',(e)=>{
    let previousOrNext = $(e.currentTarget).index()
    if (previousOrNext === 0){//向左滑动一张
        goToSlide(current-1)
        activeButton(current)
    }else{//向右滑动一张
        goToSlide(current+1)
        activeButton(current)
    }
})

$('#buttonWrapper').on('click','span',(e)=>{
    let index = $(e.currentTarget).index()
    let correctPosition = index * -400
    let fakePosition = (current+1)* -400
    $indexButtons.eq(index).addClass('active').siblings().removeClass('active')
    goToSlide(index)
})

$('#window').on('mouseenter',()=>{
    window.clearInterval(timeId)
})

$('#window').on('mouseleave',autoSlide)








//下面是函数
function autoSlide(){
    timeId = window.setInterval(()=>{
        goToSlide(current+1)
        activeButton(current)
    },2000)
}

function activeButton(index){
    $indexButtons.eq(index).addClass('active').siblings().removeClass('active')
}

function createFakeImg(){
    $fristCopy.appendTo($('#window')).addClass('fristFakeImg')
    $lastCopy.appendTo($('#window')).addClass('lastFakeImg')
}

function goToSlide(index){
    if(index === $imgs.length){
        index = 0
      }else if(index ===-1){
        index = $imgs.length - 1
      }
    if(current-index<0 && Math.abs(current-index)===$imgs.length-1){
        makeFakeSlide($lastCopy,index * -400,(current+1)* -400)
    }else if(current-index>0 && Math.abs(current-index)===$imgs.length-1){
        makeFakeSlide($fristCopy,index * -400,(current+1)* -400)
    }else{
        $slides.css({
            transform:`translateX(${index * -400}px)`
        })
    }
    current = index
}

function makeFakeSlide($targetImg,fakePosition,correctPosition){
    $targetImg.removeClass('hide').addClass('active').one('transitionend',function(){
        $slides.css({
            transform:`translateX(${fakePosition}px)`
        })
    })
    $slides.css({
    transform:`translateX(${correctPosition}px)`
    })
    window.setTimeout(()=>{
        $targetImg.addClass('hide').removeClass('active')
    },1000)
}






























