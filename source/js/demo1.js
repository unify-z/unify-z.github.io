function loadCss() {  
  var currentUrl = window.location.href;  
  if (currentUrl===('/link/')) {  
    var link = document.createElement('link');  
    link.rel = 'stylesheet';  
    link.type = 'text/css';  
    link.href = '/css/demo1.css';  
    document.head.appendChild(link);  
  } 
  else {  
    var link = document.createElement('link');  
    link.rel = 'stylesheet';  
    link.type = 'text/css';  
    link.href = '/css/tinyst.css';  
    document.head.appendChild(link);  
  }  
}





