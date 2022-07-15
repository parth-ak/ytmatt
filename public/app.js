
// {"namespace":"youtubeview","key":"download","value":0}

const countEl = document.getElementById("count");
countvisits();

function countvisits() {
  fetch('https://api.countapi.xyz/update/youtubeview/download/?amount=1')
    .then((res) => res.json())
    .then((res) => {
      countEl.innerHTML = res.value;
    });
}
function save_url(){
    let url=document.getElementById('u').value
    var fs=require('fs');
    fs.writeFileSync("fileName.json", url);
    alert(url);
}

// let urls = [];
// function save_url(){
//     let url_s = {
//         id: Date.now(),
//         UrlName: document.getElementById("u").value
//     }
//     urls.push(url_s);
//     let urll="hi"
//     var fs = require('fs');
//     fs.writeFileSync("fileName.json", urll);
    
    
// }