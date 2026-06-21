// Adey World marketing — shared behaviors
(function(){
  function init(){
    // scroll reveal
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el,i){
      el.style.transitionDelay = (Math.min(i,6)*0.06)+'s';
      io.observe(el);
    });
    // category accordion (product page) + any [data-toggle]
    document.querySelectorAll('[data-acc]').forEach(function(head){
      head.addEventListener('click', function(){
        var body = head.nextElementSibling;
        var open = head.parentElement.classList.toggle('open');
        if(body) body.style.maxHeight = open ? body.scrollHeight+'px' : '0px';
      });
    });
    // pricing toggle
    var pt = document.getElementById('pricetoggle');
    if(pt){
      pt.addEventListener('click', function(){
        var yearly = pt.classList.toggle('yearly');
        document.querySelectorAll('[data-price]').forEach(function(el){
          el.textContent = yearly ? el.getAttribute('data-year') : el.getAttribute('data-month');
        });
        document.querySelectorAll('[data-per]').forEach(function(el){
          el.textContent = yearly ? '/year' : '/month';
        });
        pt.setAttribute('aria-checked', yearly);
      });
    }
  }
  if(document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
