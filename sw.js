// file cache
const file = [
    "/",    

    "./src/img/008-salary.png",
    "./src/img/011-salary.png",
    "./src/img/014-name.png",
    "./src/img/017-user.png",
    "./src/img/027-calendar.png",
    "./src/img/035-calendar.png",
    "./src/img/BANNER_IDBYTE_2.jpg",
    "./src/img/code.png",
    "./src/img/JOOX-VIP-Gojek-T1-Banner.jpg",
    "./src/img/man.png",
    "./src/img/suitcase-2.png",
    "./src/img/undraw_add_notes_8cfw.png",
    "./src/img/undraw_discount_d4bd.png",
    "./src/img/undraw_joyride_hnno.png",
    "./src/img/undraw_learning_2q1h.png",
    "./src/img/undraw_mobile_login_ikmv.png",
    "./src/img/undraw_noted_pc9f.png",
    "./src/img/undraw_printing_invoices_5r4r.png",
    "./src/img/undraw_product_teardown_elol.png",
    "./src/img/undraw_Savings_dwkw.png",
    "./src/img/undraw_updated_rr85.png",
    "./src/img/undraw_super_thank_you_obwk.png",
    "./src/img/undraw_my_documents_ym8x.png",
    "./src/img/user.png",
    "./src/img/53916.jpg",
    "./src/img/2787856.jpg",
    "./src/img/2473674.jpg",

    "./pages/main.html",
    "./pages/absensi.html",
    "./pages/cekPoint.html",
    "./pages/cekTugas.html",
    "./pages/cekVoucher.html",
    "./pages/cuti.html",
    "./pages/home.html",
    "./pages/ijin.html",
    "./pages/info.html",
    "./pages/pengajuanIjin.html",
    "./pages/pengajuanCuti.html",
    "./pages/register.html",
    "./pages/slipGaji.html",
    "./pages/useVoucher.html",
    "./pages/login.html",    
    "./pages/tanggapan.html",    
    
    "./material/camera.html",
    "./material/camera2.html",
    "./material/footer.html",
    "./material/header.html",    

    "./src/css/app.css",
    "./src/css/bootstrap.css",    
    
    "./src/js/main.js",
    "./src/js/sweetalert.min.js",  
    "./src/js/w3.js",      
    "./src/js/jquery.min.js",      
    "./src/js/bootstrap.min.js",        
    "./src/js/popper.min.js",         
    "./src/js/login.js",
    "./src/js/register.js",

    "./sw.js",
    "./manifest.json",
]

const cacheStaticName = "siabsen-mainapp";


self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(cacheStaticName)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(file);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {          
            if (response) {
                return response;
            }          
            var fetchRequest = event.request.clone();
    
            return fetch(fetchRequest).then(
                function(response) {                
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                var responseToCache = response.clone();

                caches.open(cacheStaticName)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                return response;
                }
            );
        })
    );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// self.addEventListener('install',function(event){
//     console.log("service worker intalled")
//     event.waitUntil(
//         caches.open(cacheStaticName)
//         .then(function(cache){
//             return cache.addAll(file);
//         })        
//     );
// })

// self.addEventListener('fetch', function(event) {
//     console.log("fetch url : " , event.request.url)
//     event.respondWith(
//         caches.match(event.request)
//         .then(function(response){
//             console.log("found in cache")
//             if(response){
//                 console.log(response);
//                 return response;
//             }
//             return fetch(event.request)
//             .then(function(response){
//                 if(response.status == 404){
//                     return caches.match("404.html");
//                 }

//                 return caches.open(cacheStaticName)
//                 .then(function(chace){
//                     cache.put(event.request.url , response.clone());
//                     return response;
//                 })

//             })
//             .catch(function(error){
//                 return caches.match("offline.html");
//             })
//         })
//     )
// });

// self.addEventListener('activate',function(event){
//     const allChace = [cacheStaticName]
//     event.waitUntil(
//         caches.keys()
//         .then(function(cachesNames){
//             return Promise.all(
//                 cacheNames.map(cacheName => {
//                     if (cacheWhiteList.indexOf(cacheName) === -1) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             )
//         })
//     )
// })


