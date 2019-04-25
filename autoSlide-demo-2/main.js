let n

init()
autoSlide()





/**函数**/
function autoSlide(){
    window.setInterval(()=>{
        changeStatus(targrtSelector(imgIndex(n)),'enter current','leave')
        .one('transitionend',(e)=>{
            changeStatus($(e.currentTarget),'leave current','enter')
        })
        changeStatus(targrtSelector(imgIndex(n+1)),'leave enter','current')
    
        n += 1
    },3000)
}

function imgIndex(n){
    var i = $('.images > img').length
    if(n > i){
        n= n % i
        if(n === 0){
            n = i
        }
    }
    return n
}

function changeStatus($targetNode,a,b){
    return $targetNode.removeClass(a).addClass(b)
}

function init(){
    n = 1
    $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function targrtSelector($targetNode){
    return $(`.images >img:nth-child(${$targetNode}`) 
}