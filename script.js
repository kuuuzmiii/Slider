"use strict";
const slides = [
	{
		img:'./img/food-12.jpg',
		text:'Caption Text 1'
	},
	{
		img:'./img/olive-oil.jpg',
		text:'Caption Text 2'
	},
	{
		img:'./img/paprika.jpg',
		text:'Caption Text 3'
	},
	{
		img:'./img/pepper.jpg',
		text:'Caption Text 4'
	}
    
];
class Slider{
    constructor(content,htmlBlock,loop,navs,pags,auto,delay){
        this.content = content;
        this.htmlBlock = document.querySelector(htmlBlock);
        this.loop = loop; // возможность листать по кругу
        this.navs = navs; // вывод стрелочек или их отключение
        this.pags = pags; // при клике на точку переключается нужный класс
        this.auto = auto; // если авто то слайды по кругу
        this.delay = delay; // время слайдов по кругу
    }
    startSlider(){
        // try{
           const loop = this.loop;
           this.htmlBlock.classList.add('offer_slider'); 
           this.htmlBlock.style.cssText = ` 
              position: relative; 
              width: 650px;
              margin-top:50px;
              display:flex;
              flex-direction:column;
              align-items:flex-end;              
           `; //position: relative;  что все элементы помещенные туда с абсолютным позиционирование накладывались сверху
           const divWrapperBlock = document.createElement('div'); // задаем блоки для слайдера
           divWrapperBlock.classList.add('offer_slider_wrapper');
           divWrapperBlock.style.cssText = `
                           width:100%;
           `;
           this.htmlBlock.append(divWrapperBlock);
           const divInnerSliderBlock = document.createElement('div');
           divInnerSliderBlock.classList.add('slider_inner');
           divInnerSliderBlock.style.cssText = `
                          width: 80%;
           `;
           divWrapperBlock.append(divInnerSliderBlock);

           function pastElemnt(block){
                	  block.forEach(elements => { // вставка элементов в блок
                		const divElemSlide = document.createElement('div');
                		divElemSlide.classList.add('slider_offer');
                        divElemSlide.style.cssText = `
                                    width:100%;
                                    height: 390px;
                                    position: relative;
                        `;
                		divInnerSliderBlock.append(divElemSlide);
                		 			for(let key in elements){
                						if(key === 'img'){
                		 					const img = document.createElement('img');
                                            img.classList.add('slider_offer_img');
                                            img.style.cssText = `
                                                    width:100%;
                                                    height: 100%;
                                                    object-fit: cover;
                                            `;
                		 					img.src = elements[key];
                							 divElemSlide.append(img); 
                                            
                		 				}
                		 				else if(key === 'text'){
                		 					const heading = document.createElement('p');
                		 					heading.textContent= `${elements[key]}`;
                                            heading.classList.add('heading');
                                            heading.style.cssText = `
                                                position: absolute;
                                                text-align:center;
                                                bottom: 5%;
                                                margin: auto auto auto 46%;
                                                color: #FFFFFF;
                                                opacity: 0.4;
                                            `;
                		 					divElemSlide.append(heading);
                                            
                		 				}
                		 			}
                		 		})
            	  }	
            pastElemnt(this.content);  

            function sliderCode(loop,navs,pags,auto,delay){
                let index = 1;
                let offset = 0; 
                const width = window.getComputedStyle(divWrapperBlock).width; // определили ширину всех слайдеров
                const sliderBlock = document.querySelectorAll('.slider_offer');
                sliderBlock.forEach(slide =>{
                    slide.style.width = width;
                })
                divInnerSliderBlock.style.width = 100 * sliderBlock.length +'%';		// задали ширину всех блоков
                divInnerSliderBlock.style.display = 'flex';
                divInnerSliderBlock.style.trasition = '0.5s all';
                divWrapperBlock.style.overflow = 'hidden';

                // кнопки далее

                const nextSlide = document.createElement('div');
                nextSlide.classList.add('next-slide');
                nextSlide.style.cssText = `
                                height: 88%;
                                width:5%;
                                position:absolute;
                                right: 0;
                                opacity:0.2;
                                background-color: #000000;
                                cursor: pointer;
                                top:0%;
                                margin: auto 0;			
                `;
                // divWrapperBlock.append(nextSlide);

               const prevSlide = document.createElement('div');
                prevSlide.classList.add('prev-slide');
                prevSlide.style.cssText = `
                                height: 88%;
                                width:5%;
                                position:absolute;
                                left: 0;
                                opacity:0.2;
                                background-color: #000000;
                                cursor: pointer;
                                top:0%;
                                margin: auto auto auto 0;
                `;
                // divWrapperBlock.append(prevSlide);

                function navsShow(){
                    if(navs){
                        divWrapperBlock.append(nextSlide);
                        divWrapperBlock.append(prevSlide);  
                    }
                }
                navsShow();

                function circleSlideNext (){
                    const widthLastSlide = (+width.slice(0,width.length - 2) * (sliderBlock.length-1)),
                          widthNextSlide = +width.slice(0,width.length - 2);
                    if(loop){
                        if(offset == widthLastSlide){
                            offset = 0;
                            index = 1;
                        } else{
                            offset += widthNextSlide;
                            index++;
                        } 
                    } else {
                        if(offset == widthLastSlide){
                            offset = widthLastSlide;
                            index = sliderBlock.length;
                        } else {
                            offset += widthNextSlide;
                            index++;
                        }
                    }
                    divInnerSliderBlock.style.transform = `translateX(-${offset}px)`;
                }
                function circleSlidePrev(){
                    const widthLastSlide = (+width.slice(0,width.length - 2) * (sliderBlock.length-1)),
                    widthPrevSlide = +width.slice(0,width.length - 2);
                   if(loop){
                       if(offset == 0){
                           offset = widthLastSlide;
                           index = sliderBlock.length;
                       }else{
                           offset -=  widthPrevSlide;
                           index--;
                       }
                   }else{
                       if(offset == 0){
                        offset = 0;
                        index = 1;
                       }else{
                          offset -=  widthPrevSlide;
                          index--; 
                       }
                   }
                   divInnerSliderBlock.style.transform = `translateX(-${offset}px)`;
                }

                function time(){
                    circleSlideNext();
                    dotsActiv();
                    counter();
                }

                if(auto === true){
                    let interval = setInterval(time,delay);
                    nextSlide.addEventListener('click',(e)=>{
                        if(e.target){           
                            clearInterval(interval);
                            interval = setInterval(time,delay);
                            time();
                         }
                    })
                    prevSlide.addEventListener('click',(e)=>{
                        if(e.target){
                            clearInterval(interval);
                            interval = setInterval(time,delay);
                            circleSlidePrev();
                            dotsActiv();
                            counter();
                        }
                    })
                }else{
                    nextSlide.addEventListener('click',(e)=>{
                        if(e.target){           
                            time();
                         }
                    })
                    prevSlide.addEventListener('click',(e)=>{
                        if(e.target){
                            circleSlidePrev();
                            dotsActiv();
                            counter();
                        }
                    })
                }

                const indicators = document.createElement('ol');
                const dots = [];  // добавление точек
                indicators.classList.add('carousel-slide');
                indicators.style.cssText = `
                        right: 0;
                        bottom: 50%;
                        left: 0;
                        z-index: 15;
                        display: flex;
                        justify-content: center;
                        margin-right: 15%;
                        margin-left: 15%;
                        list-style: none;
                `; //position:absolute;
                
                for(let i=0; i< sliderBlock.length;i++){
                    const dot = document.createElement('li');
                    dot.setAttribute('data-slide-to',i+1);
                    dot.classList.add('dot');
                    dot.style.cssText=`
                            box-sizing: content-box;
                            flex: 0 1 auto;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            margin-left: 3px;
                            margin-right: 3px;
                            cursor: pointer;
                            background-color: #000000;
                            background-clip: padding-box;
                            opacity: .5;
                            transition: opacity .6s ease;
                    `;
                    indicators.append(dot);
                    dots.push(dot);
                }

                dots[0].style.opacity = '1';
                divWrapperBlock.append(indicators);

                function dotsActiv(){  // связывание точек со слайдом
                    dots.forEach(dot => dot.style.opacity = '0.5');
                    dots[index-1].style.opacity = '1';
                }
            // пагинация    
            function pagination(){
                if(pags){
                    dots.forEach(dot => {
                        dot.addEventListener('click',(e) => {
                         const slideTo = e.target.getAttribute('data-slide-to');
                         offset = +width.slice(0,width.length - 2) * (slideTo-1);
                         divInnerSliderBlock.style.transform = `translateX(-${offset}px)`;
                         index = slideTo;
                         dotsActiv();
                         counter(); 
                        })
                    })
                }
            }    
            pagination();
        // нумерация
        const divCounter = document.createElement('div'),
	          current = document.createElement('span'),
	          total = document.createElement('span');

        divCounter.classList.add('couner-block');
        divCounter.style.cssText = `
                height:2%;
                width:2%;
                position:absolute;
                fontsize:20px;
                opacity:0.4;
                color: #FFFFFF;
                top:3%;
                margin: auto auto auto 50%;
        `;
        divWrapperBlock.append(divCounter);
        function counter () {
            if(index < 10){
                current.textContent = `0${index}`;
            }else {
                current.textContent = `${index}`;
            }
            if(sliderBlock.length < 10 ){
                total.textContent = `0${sliderBlock.length}`;
            }else{
                total.textContent = `${sliderBlock.length}`;
            }
            divCounter.textContent = `${current.textContent}/${total.textContent}`;
        }
        counter();
        }
            sliderCode(this.loop,this.navs,this.pags,this.auto,this.delay);
    }
}
        
const sliderOne = new Slider(slides,'.slides',true,true,true,false,2000);

sliderOne.startSlider();


