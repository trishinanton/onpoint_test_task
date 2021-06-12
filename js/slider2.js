function Slider(){
    this.offset = 0; //offset from left side
    this.sliderLine = null;
    this.allSliders = null;
    this.oneSliders = null;
    this.onNextBtn = null;
    this.onPrevBtn = null;
    this.allSlidersArr = null;
    this.arrayWidth = null;
    this.summWidth = null;
    this.widthOneSlider = null;
    /* for events mouse */
    this.x1 = null;
    this.y1 = null;
    this.x2 = null;
    this.y2 = null;
    this.xDiff = null;
    this.yDiff = null;

    /* for events touch */
    this.x1_mobile = null;
    this.y1_mobile = null;
    this.x2_mobile = null;
    this.y2_mobile = null;
    this.x3_mobile = null;
    this.y3_mobile = null;
    this.xDiff_mobile = null;
    this.yDiff_mobile = null;
    this.xDiffEnd_mobile = null;
    this.yDiffEnd_mobile = null;
    
    /* optinal */
    this.btnWhatsNext = null;
    this.btnHome = null;
    this.btnPopup = null;
    this.popupWindow = null;
}
Slider.prototype.start = function(wrapperSliders, oneSlide, btnNext, btnPrev){
    let that = this;

    /* find elements in DOM */
    this.sliderLine=document.querySelector(wrapperSliders);
    this.allSliders=document.querySelectorAll(oneSlide);
    this.oneSliders=document.querySelector(oneSlide);
    this.onNextBtn=document.querySelector(btnNext);
    this.onPrevBtn=document.querySelector(btnPrev);
    this.btnWhatsNext=document.querySelector('.btn__js');
    this.btnHome=document.querySelectorAll('.head__house');
    this.btnPopup=document.querySelector('.btn-popup');
    this.popupWindow=document.querySelector('.main-four');
    /* Converting NodeList to array */
    this.allSlidersArr = Array.prototype.slice.call(this.allSliders);

    /* Find width each slide */
    this.arrayWidth = this.allSlidersArr.map((el)=>{
        let OneWidth = window.getComputedStyle(el).width;
        let numberWidth = OneWidth.split('px');
        return numberWidth[0];
    });

    /* Find sum all elements in arrayWidth  */
    this.summWidth = this.arrayWidth.reduce((accumulator,currentValue)=>+currentValue+accumulator,0)
    this.widthOneSlider = +window.getComputedStyle(this.oneSliders).width.split('px')[0]; //this change variable
    console.log(this.widthOneSlider)
    /* subscribe to events click */
    this.onNextBtn.addEventListener('click', function(e){
        that.onShowNextBtnClick(e);
    });
    this.onPrevBtn.addEventListener('click', function(e){
        that.onShowPrevBtnClick(e); 
    });
    this.btnWhatsNext.addEventListener('click', function(e){
        that.onShowWhatsNext(e); 
    });
    this.btnHome.forEach((el)=>{
        el.addEventListener ('click', function(e){
            that.onHome(e);
        });
    });
    this.btnPopup.addEventListener('click', function(e){
        that.onShowPopup(e); 
    });
    /* subscribe on events mouse */
    document.addEventListener('mousedown', function(e){
        that.handleMouseStart(e);
    });
    document.addEventListener('mousemove', function(e){
        that.handleMouseMove(e);
    });
    /* subscribe on events touch */
    document.addEventListener('touchstart', function(e){
        that.handleTouchStart(e);
    });
    document.addEventListener('touchmove', function(e){
        that.handleTouchMove(e);
    });
    document.addEventListener('touchend', function(e){
        that.handleTouchEnd(e);
    });
    /* description behavior button */
    this.onShowNextBtnClick = function(e){
        this.offset+=this.widthOneSlider;
        if (this.offset >= this.summWidth){
            this.offset = 0;
        }
        this.sliderLine.style.left = -this.offset + 'px';
    };
    this.onShowPrevBtnClick = function(e){
        this.offset-=this.widthOneSlider;
        if (this.offset < 0){
            this.offset = this.summWidth-this.widthOneSlider;
        }
        this.sliderLine.style.left = -this.offset + 'px';
    };
    /* description behavior mouse */
    this.handleMouseStart = function(e){
        this.x1 = e.screenX;
        this.y1 = e.screenY;
    };
    this.handleMouseMove = function(e){
        if (!this.x1 || !this.y1){
            return false;
        }
        this.x2=e.screenX;
        this.y2=e.screenY;
       

        this.xDiff=this.x2-this.x1;
        this.yDiff=this.y2-this.y1;

        if(Math.abs(this.xDiff)> Math.abs(this.yDiff)){
            if(this.xDiff>0){
                this.offset-=this.widthOneSlider;
                if (this.offset < 0){
                    this.offset=0;
                }
                this.sliderLine.style.left = -this.offset + 'px'; //right
            } else{
                this.offset+=this.widthOneSlider;
                if (this.offset >= this.summWidth){
                    this.offset = this.summWidth-this.widthOneSlider;
                }
                this.sliderLine.style.left = -this.offset + 'px'; //left
            }
        }else{
            //top-bottom
            if(this.yDiff>0) console.log('down');
            else console.log('top');
        }
        this.x1=null;
        this.y2=null;
    };

    /* description behavior touch */
    this.handleTouchStart = function(e){
        this.x1_mobile = e.touches[0].clientX;
        this.y1_mobile = e.touches[0].clientY;
    };
    this.handleTouchEnd = function(e){
        this.x3_mobile = e.changedTouches[0].clientX;
        this.y3_mobile = e.changedTouches[0].clientY;

        this.xDiffEnd_mobile=this.x3_mobile-this.x1_mobile;
        this.yDiffEnd_mobile=this.y3_mobile-this.y1_mobile;

        if(Math.abs(this.xDiffEnd_mobile)> Math.abs(this.yDiffEnd_mobile)){
            if(this.xDiffEnd_mobile>0){
                this.offset-=this.widthOneSlider;
                console.log(this.offset);
                if (this.offset < 0){
                    this.offset=0;
                }
                this.sliderLine.style.left = -this.offset + 'px'; //right
            }else{
                this.offset+=this.widthOneSlider;
                if (this.offset >= this.summWidth){
                    this.offset = this.summWidth-this.widthOneSlider;
                }
                this.sliderLine.style.left = -this.offset + 'px'; //left
            }
        }else{
            //top-bottom
            if(this.yDiff>0) console.log('down');
            else console.log('top');
        }
        this.x3_mobile=null;
        this.y3_mobile=null;
        
    };
    this.handleTouchMove = function(e){
        if (!this.x1_mobile || !this.y1_mobile){
            return false;
        }
        
        // /* for touchmove */
        this.x2_mobile=e.touches[0].clientX;
        this.y2_mobile=e.touches[0].clientY;
        
        
        this.xDiff_mobile=this.x2_mobile-this.x1_mobile;
        this.yDiff_mobile=this.y2_mobile-this.y1_mobile;
    
        if (Math.abs(this.xDiff_mobile)> Math.abs(this.yDiff_mobile)){
            //right-left
            if(this.xDiff_mobile>0){
                this.offset-=Math.abs(this.x1_mobile-this.x3_mobile);
                if (this.offset < 0){
                    this.offset=0;
                }
                this.sliderLine.style.left = -this.offset + 'px'; //right
            } 
            else {
                this.offset+=Math.abs(this.x1_mobile-this.x3_mobile);
                if (this.offset >= this.summWidth){
                    this.offset = this.summWidth-this.widthOneSlider;
                }
                this.sliderLine.style.left = -this.offset + 'px'; //left
            }
        }else{
            //top-bottom
            if(this.yDiff_mobile>0) console.log('down');
            else console.log('top');
        }
        this.x1_mobile=null;
        this.y2_mobile=null;
    }
    /* optional */
    this.onShowWhatsNext = function(e){
        this.offset+=this.widthOneSlider;
        this.sliderLine.style.left = -this.offset + 'px';
    };
    this.onHome = function(e){
        this.offset = 0;
        this.sliderLine.style.left = this.offset + 'px';
    };
    this.onShowPopup = function(e){
        this.popupWindow.style.display = 'block';
        this.popupWindow.style.left = this.offset + 'px';
    }

}


/* let slider1 = new Slider();
slider1.start('.advantages-slider1__wrapper', '.advantages-brend', '.advantages_show-next', '.advantages_show-prev' ); */

let slider2 = new Slider();
slider2.start('.slide__wrapper', '.slide', '.show-next', '.show-prev')