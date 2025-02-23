# 缤纷云&#43;PicGo搭建图床


&lt;!--more--&gt;
## 为什么要选择PicGo&#43;缤纷云

​		最近陆陆续续的把博客搭建完了，后来发现在插入图片时不可避免的会碰到关于图床选择的问题，在参考了网上十几篇关于图床的文章后，我总结出了以下内容，同时网上也没有关于缤纷云建图床的方案，本篇文章既作为笔记，也作为文章发布，供大家参考~



## 缤纷云免费额度

​		如下，50GiB和10GB的流量已经够我们用了（如果用cdn的话还能有20gb），详细见下

免费额度[](https://www.dogecast.com/docs/prices/basic#免费额度)

前置条件 - [**实名账户**](https://console.bitiful.net/users):

- 前 50 GiB 存储
- 每月前 10*3 GB HTTP/HTTPS 流量（每日每项限 5 GB）
  - S4 出口流量 10GB/月
  - 内置 CDN 回源 S4 流量 10GB/月
  - 内置 CDN 出口流量 10GB/月
- 每月前 10*3 万次 请求（每日每项限 1 万次）
  - S4 请求数 10万次/月
  - 内置 CDN 回源 S4 请求数 10万次/月
  - 内置 CDN 请求数 10万次/月

## 相关工具

PicGo:https://github.com/Molunerfinn/PicGo

Node.js:https://nodejs.org

缤纷云:https://www.dogecast.com/

## 正文

### 		具体步骤

#### 		第一步：准备步骤

​			1.首先将PicGo、Nodejs等工具安装好，并注册缤纷云账号，国内平台注册不在叙述（如果出现超时等网络错误，请自行解决）

​			2.之后在picgo中搜索插件&#34;s3&#34;，下载第一个即可。后面那个也会介绍具体配置内容，可能略有不同。

![6729ee5bc42bc1b2e0b362cdd5938ab5](https://cdn.unifyz.5k.work/2023/07/6729ee5bc42bc1b2e0b362cdd5938ab5.png)

#### 第二步：创建储存桶

​			进入控制台后，点击“创建”，然后如图设置，注意这边权限一定要选公开桶，否则他人访问不了你的图片！

![{61ACE84F-04F0-44c3-B5D2-1E5888727C42}](https://cdn.unifyz.5k.work/2023/07/ed5e0ad6ed54bbf68e7a63451f1ccfed.png)

​		创建完后，回到控制台，进入&#34;AccessKey&#34;页面，然后点击右上角&#34;创建子用户&#34;，名称随意。不出意外的话你将会看到Access Key和Secret Key。先找个东西记录下来，等下要用。![{6EA4A23A-CFA3-4495-8158-238469BE6A56}](https://cdn.unifyz.5k.work/2023/07/2479d493c3702ca1ef00f56ddc18cc39.png)

![{F12C5CEE-FC33-439b-8F94-C3F0C5C53516}](https://cdn.unifyz.5k.work/2023/07/263047613a2a07ca1117bd693ae8c863.png)

​			然后设定权限，务必四个全勾（都有用）	 ![{BFB71FBD-5785-4762-9E39-E4BE9549C252}](https://cdn.unifyz.5k.work/2023/07/f56463c08d9aa61793eb004af016eb18.png)

​			随后回到PicGo，在图床设置里点击&#34;Amazon S3&#34;，照下图设置

部分参数：

​			文件路径（推荐，你也可以填其他的）：/{year}/{month}/{md5}.{extName}

​			地区：cn-east-1

​			自定义节点：https://s3.bitiful.net

​			自定义域名：https://{buckets-name}.s3.bitiful.net/

​	·				   ![{EB9F3C99-1261-4be5-A25D-0F14F0BD9C12}](https://cdn.unifyz.5k.work/2023/07/eaa6eaca38052cb33317fc2301f384c3.png)

#### 			测试上传

​			不出意外的话现在就已经设置完了，这时候返回主页测试图片能不能上传成功

​			![b7719ad4d6e14706203a1c49138e867c](https://cdn.unifyz.5k.work/2023/07/b7719ad4d6e14706203a1c49138e867c.png)

​			验证在缤纷云里是否上传成功

​	![2ad1b60e3ac94d36e45c6bda66c8c9e6](http://cdn.unifyz.5k.work/2023/07/2ad1b60e3ac94d36e45c6bda66c8c9e6.png)

​		 


---

> 作者: [unify-z](https://blog.ifeng.asia/)  
> URL: https://blog.ifeng.asia/posts/220ffe6/  

