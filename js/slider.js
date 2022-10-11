const FlexSlider = {
  // total no of items
  num_items: document.querySelectorAll(".slider-item").length,

  // position of current item in view
  current: 1,

  init: function() {
    // set CSS order of each item initially
    document.querySelectorAll(".slider-item").forEach(function(element, index) {
      element.style.order = index+1;
    });

    this.addEvents();
  },

  addEvents: function() {
    var that = this;

    // click on forward button
    document.querySelector("#forward-button").addEventListener('click', () => {
      this.gotoNext();
    });

    // click on backward button
    document.querySelector("#backward-button").addEventListener('click', () => {
      this.gotoPrevious();
    });

    // after each item slides in, slider container fires transitionend event
    document.querySelector("#slider").addEventListener('transitionend', () => {
      this.changeOrder();
    });
  },

  changeOrder: function() {
    // change current position
    if(this.current == this.num_items)
      this.current = 1;
    else
      this.current++;

    let order = 1;

    // change order from current position till last
    for(let i=this.current; i<=this.num_items; i++) {
      document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
      order++;
    }

    // change order from first position till current
    for(let i=1; i<this.current; i++) {
      document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
      order++;
    }

    // translate back to 0 from -100%
    // we don't need transitionend to fire for this translation, so remove transition CSS
    document.querySelector("#slider").classList.remove('slider-transition');
    document.querySelector("#slider").style.transform = 'translateX(0)';
  },

  gotoNext: function() {
    // translate from 0 to -100%
    // we need transitionend to fire for this translation, so add transition CSS
    document.querySelector("#slider").classList.add('slider-transition');
    document.querySelector("#slider").style.transform = 'translateX(-100%)';
  },

  gotoPrevious: function() {
    // translate from 0 to 100%
    // we need transitionend to fire for this translation, so add transition CSS
    document.querySelector("#slider").classList.add('slider-transition');
    document.querySelector("#slider").style.transform = 'translateX(100%)';
  }
};

FlexSlider.init();