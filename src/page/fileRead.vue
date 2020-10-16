<template>
  <div>
    <h1>计算文件SHA256</h1>
    <input type="file" @change="inputChangeA" />
    <h1>脚本读取文件</h1>
    <input type="file" @change="inputChangeB" />
    <h1>pbs文件预览</h1>
    <button @click="inputChangeX" style="width:50px;height:50px"></button>
  </div>
</template>

<script>
import CryptoJS  from 'crypto-js';
import ObsClient from '../toolkit/esdk-obs-browserjs-without-polyfill-3.19.9.min.js'
  export default {
    data() {
      return {
        fileDigestResult:null,
        filesA:null,
        filesB:null,
        worker:null,
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
      inputChangeX(){
          const obsClient = new ObsClient({
            access_key_id: "KEYCR8EAOKDERNDWC5UL",
            secret_access_key: "LvwEbZ0DpXrV6HIwLYi8gfKAEqxOA0nXFpp4TAU6",
            server: "https://obs.cn-south-1.myhuaweicloud.com",
          });
          // console.log(obsClient)
          function downloadObsFile(fileKey) {
            var res = obsClient.createSignedUrlSync({
              Method : 'GET',
              Bucket : 'prod-ubq',
              Key : fileKey,
              Expires : 3600,
            });
            return res.SignedUrl // 返回的是文件地址
          }

          let url = 'obs_641582d280129c15c85819f0933adbd0CAM08+7_00026.png';
          let res = downloadObsFile(url);
          console.log(res);
      },
      inputChangeA(e){
        //获取文件实例
        let files = e.target.files;
        let i, workers, worker, cryptoFiles, cryptoAlgos;
        // 支持上传多文件
        for (i = 0; i < files.length; i += 1) {
          let currentFile = files[i];
          workers = [];
          cryptoAlgos = []; // 内置加密 集合
          worker = new Worker('../toolkit/sha256.js', { type: 'module' });
          worker.addEventListener('message', this.handleWorkerEvent(currentFile));
          workers.push(worker);
          this.hashFile(currentFile, workers);
        }
      },
      inputChangeB(e){
        console.log(e.target.files[0])
        // this.handleReadFile(e.target.files[0])
        let res = new FileReader();
        res.readAsArrayBuffer(e.target.files[0])
        res.onload = (e)=>{
          console.log(e)
        }
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
      // worker加密
      hashFile(file, workers){
        let i, bufferSize, block, threads, reader, blob, handleHashBlock, handleLoadBlock;

        // 加载分块
        handleLoadBlock = (event)=> {
          for( i = 0; i < workers.length; i += 1) {
            threads += 1;
            console.log(workers[i])
            workers[i].postMessage({
              'message' : event.target.result,
              'block' : block
            });
          }
        };

        // 文件分块
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
        bufferSize = 64 * 16 * 1024; // 块大小默认 1M
        block = {
          'file_size' : file.size,
          'start' : 0
        };
        block.end = bufferSize > file.size ? file.size : bufferSize; // 源文件大小和块的单位大小对比 取小者
        threads = 0; // 线程数
        for (i = 0; i < workers.length; i += 1) {
          workers[i].addEventListener('message', handleHashBlock);
        }
        reader = new FileReader();
        reader.onload = handleLoadBlock;
        blob = file.slice(block.start, block.end);

        reader.readAsArrayBuffer(blob);
      },
      // worker 计算结果和进度
      handleWorkerEvent(item) {
        return (event)=> {
          if (event.data.result) {
            this.fileDigestResult = event.data.result;
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