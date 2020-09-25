<template>
  <div>
    <h1>普通读取文件</h1>
    <input type="file" @change="inputChangeA" />
    <h1>脚本读取文件</h1>
    <input type="file" @change="inputChangeB" />
  </div>
</template>

<script>
import CryptoJS  from 'crypto-js'
  export default {
    data() {
      return {
        fileDigestResult:null,
        filesA:null,
        filesB:null,
      }
    },
    created(){
      console.log(CryptoJS)
    },
    computed:{
      // 浏览器是否内置crypto
      hasCrypto(){
        return window.crypto && window.crypto.subtle && window.crypto.subtle.digest
      },
      sliceUnable(){
        return !window.File || !window.FileReader || !window.FileList || !window.Blob || !File.prototype.slice
      }
    },
    methods:{
      inputChangeA(e){
        let files = e.target.files[0];
    	  //生成实例
        let fileReads = new FileReader();
    	  //开始读取文件
        fileReads.readAsArrayBuffer(files);
        //读取回调
        fileReads.onload=function(){
          console.log('读取结果(文件数据类型：ArrayBuffer):',fileReads.result)
          var wordArray = CryptoJS.lib.WordArray.create(fileReads.result);
          console.log('ArrayBuffer转为WordArray格式:',wordArray)
          var hash = CryptoJS.SHA256(wordArray).toString();
          console.log('SHA256:',hash)
        }
        //切片读取
        function sliceFile(){
          
        }
      },
      inputChangeB(e){
        console.log(e.target.files[0])
        this.handleReadFile(e.target.files[0])
      },
      // 读取文件 暂时仅支持md5 sha256
      handleReadFile(file) {
        let i, workers, worker;
        let files = []
        if(!Array.isArray(file)){
          files.push(file)
        }else{
          files = file
        }
        // 支持上传多文件
        for (i = 0; i < files.length; i += 1) {
          let currentFile = files[i];
          workers = [];
          // 开启多线程
          worker = new Worker( '../toolkit/sha256.js', { type: 'module' });
          // 监听多线程
          worker.addEventListener('message', this.handleWorkerEvent(currentFile));
          console.log('worker',worker)
          workers.push(worker);
          //执行计算
          this.hashFile(currentFile, workers);
        }
      },
      // worker计算
      hashFile(file, workers){
        let i, reader, blob, handleHashBlock, handleLoadBlock;
        // 块大小默认 1M
        let bufferSize = 64 * 16 * 1024;
        let block = {
          'file_size' : file.size,
          'start' : 0
        };
        // 源文件大小和块的单位大小对比 取小者
        block.end = bufferSize > file.size ? file.size : bufferSize; 
        // 线程数
        let threads = 0; 
        //给每一个文件设置监听Work线程的message，如果读取完成就继续分块读取
        for (i = 0; i < workers.length; i += 1) {
          workers[i].addEventListener('message', handleHashBlock);
        }
        reader = new FileReader();
        //第一次文件分块
        blob = file.slice(block.start, block.end);
        // 开始读取分块
        reader.readAsArrayBuffer(blob);
        //文件读取成功都会调用这个方法
        reader.onload = function(event){
          for( i = 0; i < workers.length; i += 1) {
            threads += 1;// 线程数+1
            //跟new Worker()通讯，worker收到消息后执行继续分块的方法
            workers[i].postMessage({
              'message' : event.target.result,
              'block' : block
            });
          }
        };
        // 文件继续分块
        handleHashBlock = (event)=> {
          threads -= 1;
          if(threads === 0) {
            if(block.end !== file.size) {
              block.start += bufferSize;
              block.end += bufferSize;
              if(block.end > file.size) {
                block.end = file.size;
              }
              reader = new FileReader();
              reader.onload = handleLoadBlock;
              blob = file.slice(block.start, block.end);
              reader.readAsArrayBuffer(blob);
            }
          }
        };
      },
      // worker 计算结果和进度
      handleWorkerEvent(item) {
        return (event)=> {
          if (event.data.result) {
            this.fileDigestResult = event.data.result;
            localStorage.setItem('fileHashList',JSON.stringify(this.fileHashList));
            console.log('计算结果为---------------:'+this.fileDigestResult)
          } else {
            console.log('当前进度-----:',(event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%')
          }
        };
      }
    }
  }
</script>

<style lang="less" scoped>
  
</style>