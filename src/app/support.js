/**
 * Automatic generated by "support.build.js"
 * */
~~~function(){
// 环境检测
window['PXER_SUPPORT']  =true;
window['PXER_LOAD_APP'] =false;
const supportType =['bookmark_works','member_works','search','works_medium'];
const URLData =parseURL(document.URL);
if(URLData.domain ==='www.pixiv.net'){
    if(supportType.indexOf(getPageType())!==-1){
        window['PXER_SUPPORT']=true;
        window['PXER_LOAD_APP']=true;
    }else{
        window['PXER_SUPPORT']=true;
        window['PXER_LOAD_APP']=false;
    }
}else if(URLData.domain==='127.0.0.1'||URLData.domain==='localhost'){
    window['PXER_SUPPORT']=true;
    window['PXER_LOAD_APP']=true;
}else{
    window['PXER_SUPPORT']=false;
    window['PXER_LOAD_APP']=false;
    return;//退出整个程序
};

// 要加载的文件
const appClass      =/**/[
    [
        "src/app/class/PxerData.-1.js",
        "src/app/class/PxerEvent.-1.class.js"
    ],
    [
        "src/app/class/PxerFilter.class.js",
        "src/app/class/PxerHtmlParser.class.js",
        "src/app/class/PxerPrinter.class.js"
    ],
    [
        "src/app/class/PxerSaver.1.class.js",
        "src/app/class/PxerThread.1.class.js"
    ],
    [
        "src/app/class/PxerThreadManager.2.class.js"
    ],
    [
        "src/app/class/PxerApp.3.class.js"
    ]
];//*/[];
const viewTpl       =/**/"src/view/template.html";//*/'';
const viewStyles    =/**/"src/view/style.css";//*/[];
const viewScripts   =/**/[
    "src/view/vue.dev.js",
    "src/view/vm.js"
];//*/[];
const afterRun      =/**/[
    "src/run/pxer-cli.js"
];//*/[];
const linkResource  =/**/[
    "src/public/favicon.ico"
];//*/[];

    // 捕获载入过程的错误
    var errorCatcher = function(error){
        if(error.filename && error.filename.indexOf(window['PXER_URL']) !== -1){
            if(window['PXER_MODE'] === 'dev'){
                alert('Pxer开发版载入出错，请尝试使用稳定版');
            }else{
                prompt(
                    'Pxer载入出错，请在这个地址中汇报Bug' ,
                    'https://github.com/pea3nut/Pxer/issues/5'
                );
            }
        }
        ;
    };
    var cancelErrorCatcher = function(){
        window.removeEventListener('error' ,errorCatcher);
    };
    window.addEventListener('error' ,errorCatcher);
    window.addEventListener('error' ,cancelErrorCatcher);


    // 过程化载入文件
    var Flow =Promise.resolve();


    // 加载pxer-app
    if(window['PXER_LOAD_APP']){
        // 加载无关紧要的资源
        Flow =Flow.then(()=>execPromise(linkResource,createResource));
        // 加载pxer-app class
        Flow =Flow.then(()=>execPromise(appClass,createScript));
        // 加载UI
        Flow =Flow.then(()=>new Promise(function(resolve,reject){
            if(window['PXER_MODE']==='dev')console.log('load pxer UI');
            // CSS
            Flow =Flow.then(()=>execPromise(viewStyles,createResource));
            // HTML模板
            var xhr =new XMLHttpRequest();
            xhr.open('GET',window['PXER_URL']+viewTpl);
            xhr.onload=function(){
                window['PXER_TEMPLATE']=xhr.responseText;
                resolve();
            };
            xhr.onerror=reject;
            xhr.ontimeout=reject;
            xhr.send();
        }));
        // 加载UI JavaScript
        Flow =Flow.then(()=>execPromise(viewScripts,createScript));
    };
    // 最后才会运行的JavaScript文件
    Flow =Flow.then(()=>execPromise(afterRun,createScript));


    // 一些收尾工作
    Flow =Flow.then(()=>console.log('Pxer loaded'));
    Flow =Flow.then(cancelErrorCatcher);
    Flow =Flow.catch(console.error);






}();