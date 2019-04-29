!function(){
    var view ={
        key:{
            0:{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p','length':10},
            1:{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l','length':9},
            2:{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m','length':7},
            'length':3
        },
        viewWrapper: document.querySelector('#main'),
    }
    var module = {
        keyboard:{
            'q':'qq.com','w':'weibo.com','e':'ele.me','r':'renren.com','t':'tianya.com','y':'youtube.com','u':'uc.com',
            'i':'iciba.com','o':'opera.com','p':undefined,'a':'acfun.cn','b':'bilibili.com','s':'sohu.com','d':undefined,
            'z':'zhihu.com','m':'developer.mozilla.org/'},
        hashInLocalStorage :JSON.parse(localStorage.getItem('newWebsite') || 'null'),
        init(){
            this.keyboard  = this.hashInLocalStorage?this.hashInLocalStorage:this.keyboard
        },
    }
    var controller={ 
        view: null,
        module: null,
        website: null,
        init(view,module){
            this.view = view
            this.module = module
            this.module.init()
            this.createElement()
            this.bindEvent()
        },
        bindEvent(){
            document.onkeypress = (keyboard)=>{
                // console.log(keyboard)
                this.key = keyboard.key
                console.log(this.key)
                console.log(this.module.keyboard)
                this.website = this.module.keyboard[this.key]
                console.log(this.website)
                window.open(`http://${this.website}`,'_blank')
            } 
        },
        createElement(){
            for(let i=0;i<this.view.key.length;i++){
                let div = document.createElement('div')
				div.className = 'keyRow'
				this.view.viewWrapper.appendChild(div)
                let row=this.view.key[i]
                for(let i=0;i<row.length;i++){
                    let span = document.createElement('span')
					span.textContent = row[i]
					span.className = 'keyword'
					let button = document.createElement('button')
					button.textContent = 'E'
					button.className = 'edit'
					let img = document.createElement('img')
					if(this.module.keyboard[row[i]]){
						img.src = 'http://'+ this.module.keyboard[row[i]] + '/favicon.ico'
					}else{
						img.src = './img/null-1.png'
					}
					img.onerror = function(iconTest){
						iconTest.target.src = './img/null-1.png'
					}		
					let kbd = document.createElement('kbd')
					kbd.appendChild(img)	
					kbd.appendChild(span)
					kbd.appendChild(button)
                    div.appendChild(kbd)
                    button.id = row[i]
					button.onclick =(hashA)=>{
						userSet = prompt('给我一个网址')
                        keyWord = hashA['target']['id']
                        console.log(keyWord)
						this.module.keyboard[keyWord] = userSet
						localStorage.setItem('newWebsite',JSON.stringify(this.module.keyboard))
					}
                }
            }
        }
    }
    controller.init(view,module)
}.call()