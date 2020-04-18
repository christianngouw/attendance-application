var ls = JSON.parse(localStorage.getItem("userdata"));
var user_id = ls.user_id;
var myImage = "";

var tgl = new Date();
var dd = String(tgl.getDate()).padStart(2, '0');
var mm = String(tgl.getMonth() + 1).padStart(2, '0'); 
var yyyy = tgl.getFullYear();
var todaydate = yyyy+"-"+mm+"-"+dd;

var h = String(tgl.getHours()).padStart(2, '0');
var m = String(tgl.getMinutes()).padStart(2, '0');
var s = String(tgl.getSeconds()).padStart(2, '0');

var ajax = new XMLHttpRequest();
var form = new FormData();

function getPage(page) {    
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("mainPage").innerHTML = ajax.responseText;                 
        }                
    }
    ajax.send();
}

function getGajiPage(page){    
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("main").innerHTML = ajax.responseText;     
            showGaji(user_id);
        }                
    }
    ajax.send();
}

function getPageCuti(page){    
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("switch").innerHTML = ajax.responseText;     
            showCuti(user_id);
            document.getElementById("formbutton").innerHTML = 
            `
                <button class="btn btn-primary col-12" onclick="getPage('pengajuanCuti.html')" style="margin-bottom:100px">PENGAJUAN CUTI</button>                
            `;
        }                
    }
    ajax.send();
}

function getPageIjin(page){    
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("main").innerHTML = ajax.responseText;     
            showIjin(user_id);
            document.getElementById("formbutton").innerHTML = 
            `
                <button class="btn btn-primary col-12" onclick="getPage('pengajuanIjin.html')" style="margin-bottom:100px">PENGAJUAN IJIN</button>                
            `;
        }                
    }
    ajax.send();
}

function getPageTugas(page){    
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("main").innerHTML = ajax.responseText;     
            showTugas(user_id);
        }                
    }
    ajax.send();
}

function showTugas(user_id){
    fetch("http://localhost:8000/api/tugas/"+user_id+"")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        data.forEach(item => {
            document.getElementById("tugas").innerHTML +=
            `
            <div class="row my-3 ">
                <div class="col-1 mt-1">
                    <input type="checkbox"></input>
                </div>
                <div class="col-11">
                    <b>${item.judul}</b>
                    <div class="text-muted">
                        ${item.detail}
                    </div>                    
                    <div class="text-danger">
                        Deadline ${item.deadline}
                    </div>
                    <div class="text-muted">
                        Diberikan Tgl ${item.tgl_diberikan_tugas}
                    </div>                            
                </div>                                
            </div>
            `;            
        });
    })
}

function showGaji(user_id){
    fetch("http://localhost:8000/api/gaji/"+user_id+"")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        data.forEach(item => {
            document.getElementById("gaji").innerHTML += 
            `
            <div class="row">
                <div class="col-2 mt-2">
                    <img src="./../src/img/011-salary.png" class="img-fluid icon-small"></img>
                </div>
                <div class="col-6 mt-2">
                    <b>${item.bulan}</b>
                </div>
                <div class="col-3 mt-4 text-muted">
                    Rp.${item.subtotal}
                </div>
            </div>
            `;
        });
    })
}

function showIjin(user_id){
    fetch("http://localhost:8000/api/ijin/"+user_id+"")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        var username = ls.username;
        data.forEach(item => {                        
            document.getElementById("switch").innerHTML +=        
            `
            <div class="costum-border rounded mt-3">
                <div class="row">
                    <div class="col-2 mt-2">
                        <img src="./../src/img/man.png" class="img-fluid icon-small" id="profileImage"></img>
                    </div>
                    <div class="col-4 mt-2">
                        <b>${username}</b>
                        <div class="text-muted">${item.alasan_ijin}</div>
                    </div>
                    <div class="col-6 mt-2 text-muted">
                        ${item.tgl_mulai}
                    </div>
                </div>
            </div>        
            `;
        });
    })
}

function showCuti(user_id){    
    fetch("http://localhost:8000/api/cuti/"+user_id+"")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
    
        var username = ls.username;
        data.forEach(item => {
            document.getElementById("cuti").innerHTML +=
            `
            <div class="row">
                <div class="col-2 mt-2">
                    <img src="./../src/img/man.png" class="img-fluid icon-small"></img>
                </div>
                <div class="col-4 mt-2">
                    <b>${username}</b>                            
                    <div class="text-muted">Cuti ${item.lama_cuti} hari</div>
                </div>
                <div class="col-6 mt-2 text-muted">
                    <div>${item.mulai_cuti}</div>
                </div>
            </div>    
            `
        });
    })
}

// absen masuk

function reedem(){
    Swal.fire({
        icon : "success",
        titlle : "Kupon Sudah Ditambahkan !",
        html : 
        "<b>Kupon berhasil ditambahka</b>"+
        "<div class='text-muted font-size-small mt-3'>Selamat anda sudah berhasil menukarkan point anda , cek kupon anda sekarang</div>",
        showCloseButton : true,
        confirmButtonText : "CEK KUPON"
    }).then((result)=>{
        if(result.value){
            getPage('cekVoucher.html');
        }
    })
}


function dataterkirim(){
    Swal.fire({
        icon : "success",
        title : "Data Terkirim",        
        confirmButtonText :"Ok"
    })
    .then(()=>{
        location.href = "./../pages/main.html";
    })    
}

// get page

function getPage(page){        
    ajax.open("get",page,true);
    ajax.onreadystatechange = function(){
        if(ajax.status == 200 && ajax.readyState==4){
            document.getElementById("main").innerHTML = ajax.responseText;
        }
    }
    ajax.send();
}

// end get page

// include tamplate

function includeHTML() {
    var z, i, elmnt, file, xhttp;    
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];      
        file = elmnt.getAttribute("w3-include-html");
        if (file) {        
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}            
                elmnt.removeAttribute("w3-include-html");
                includeHTML();
            }
        }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

includeHTML();

// end include tamplate

function absen(page){
    location.href = page;   
}

// open camera

function camera(){
    
    const player = document.getElementById("player");
    const captureButton = document.getElementById("capture-button");
    const outputCanvas = document.getElementById("output");
    const context = outputCanvas.getContext("2d");

    captureButton.style = "block";

    navigator.mediaDevices
    .getUserMedia({video:true})
        .then((stream)=>{
            player.srcObject = stream;
        }).catch(error=>{
            console.log("error")
        })

    captureButton.addEventListener('click',function(){
        const imageHeight = player.offsetHeight;
        const imageWidth = player.offsetWidth;

        outputCanvas.width = imageWidth;
        outputCanvas.height = imageHeight;

        context.drawImage(player,0,0,imageWidth,imageHeight);

        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('download','filename.png');

        captureButton.style.display="none";
        player.style.display="none";

        outputCanvas.toBlob((blob)=>{

            myImage = new File([blob], "absen.jpg", {lastModified: new Date()})

        });

        //show save and cancle button
        document.getElementById('save').style.display = "block";
        document.getElementById('cancle').style.display = "block";

    });
}

// end open camera

//change absen pict

function changeAbsenPict(){
    //reload page when cancle pict
    window.location.reload(false);
}

//end absen pict

//kirim absen

function dataabsen(type){
    var status = "";
    var point;    
    
    var id_user = ls.user_id;    
    var type = type;
    var timestamp = yyyy+"-"+mm+"-"+dd+" "+ h+":"+m+":"+s ;    
    var today = todaydate+" "+ "07"+":"+"00"+":"+"00" ;

    if(timestamp == today ){
        status = "Tepat Waktu";
        point = 10;
    }else{
        status = "Telat";
        point = 0;
    }

    form.set("photo",myImage);
    form.set("timestamp",timestamp);
    form.set("id_user",id_user);
    form.set("type",type);
    form.set("point",point);
    form.set("status",status);

    return form;
}

function sendabsen(type){
    fetch("http://localhost:8000/api/absen/"+user_id+"",{
        method : "post",
        body : dataabsen(type)
    })    
    dataterkirim();
}

function ijinData(){

    var alasan = document.getElementById("alasanIjin").value;
    var lamahari = document.getElementById("lamaHari").value;
    var tglmulai = tgl = yyyy + '-' + mm + '-' + dd;
    var detail = document.getElementById("detail").value;
    var id_user = ls.user_id;    

    var form = new FormData()
    form.set("alasan_ijin",alasan);
    form.set("lama_hari",lamahari);
    form.set("tgl_mulai",tglmulai)
    form.set("desc",detail)
    form.set("id_user",id_user)

    return form;
}

function cutiData(){

    var namacuti = document.getElementById("namaCuti").value;
    var lamacuti = document.getElementById("lamaCuti").value;
    var mulaicuti = document.getElementById("mulaiCuti").value;
    var detail = document.getElementById("detail").value;
    var tglmulai = tgl = yyyy + '-' + mm + '-' + dd;
    var id_user = ls.user_id;    

    form.set("nama_cuti",namacuti);
    form.set("lama_cuti",lamacuti);
    form.set("mulai_cuti",mulaicuti);
    form.set("alasan",detail);
    form.set("id_user",id_user);
    form.set("tgl_ajukan",tglmulai);    

    return form;
}


function sendijin(){
    var id_user = ls.user_id;    
    fetch("http://localhost:8000/api/ijin/"+id_user+"",{
        method : "post",
        body : ijinData(),
    })
    dataterkirim();
}

function sendcuti(){
    var id_user = ls.user_id;    
    fetch("http://localhost:8000/api/cuti/"+id_user+"",{
        method : "post",
        body : cutiData(),
    })
    dataterkirim();
}