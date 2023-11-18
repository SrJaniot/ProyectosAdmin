function iniciarMenuLateral() {
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {

    });
  });
}

function botonempuja(){
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {

    });
  });


}

function inicializarmenu(){
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {

    });
  });
}

iniciarMenuLateral();
botonempuja( );
inicializarmenu();
