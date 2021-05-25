export class EffPromise {
  constructor(fn) {
    this.staus = 'pending';
    this.result = null
    this.resolveArr = []
    this.resolve = (params)=> {
      //为了等待then()的完成,所以resolve要异步进行
      setTimeout(()=>{
        for(let i of this.resolveArr){
          i(params)
        }
      })
    }
    this.then= (fn)=>{
      if(this.staus === 'pending'){
        this.resolveArr.push(function (value){
          fn(value)
        })
      }
    }
    /*
      1.执行实例化时，传过来的函数
      2.并有两个可以执行参数，这两个参数分别是resolve,reject
    */
    try{
      fn(this.resolve)
    }catch(err){
      console.log(err)
    }
  }
}