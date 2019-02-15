function Installer() {

}
Installer.install=function (Vue) {
  Vue.component('test',{
    template:`<h1> as</h1>`
  });
  let log=function(){
    console.log("mine log function");
  };
  Object.defineProperty(Vue.prototype,'$log',{
    set:function(newV){
      console.log("no");
    },
    get:function () {
      return log;
    }
  })
};

export default Installer;
