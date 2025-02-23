# DN42 实验网络 —— 内网搭建


&lt;!--more--&gt;

# 前言

DN42 全称 Decentralized Network 42（42 号去中心网络），是一个大型、去中心化的 VPN 网络。但是与其它传统 VPN 不同的是，DN42 本身不提供 VPN 出口服务（也就是说你不能用他来绕墙）但它使用了大量在目前互联网骨干上应用的技术（例如 BGP 和递归 DNS），可以很好地模拟一个真实的网络环境。

# 开始搭建

### 系统设置

​	首先，需要打开 Linux 内核的数据包转发功能（```ip_forwarding```）

```
echo &#34;net.ipv4.ip_forward=1&#34; &gt;&gt; /etc/sysctl.conf
echo &#34;net.ipv6.conf.default.forwarding=1&#34; &gt;&gt; /etc/sysctl.conf
echo &#34;net.ipv6.conf.all.forwarding=1&#34; &gt;&gt; /etc/sysctl.conf
sysctl -p
```

​	其次，关闭 Linux 内核 `rp_filter` 的严格模式

```
echo &#34;net.ipv4.conf.default.rp_filter=0&#34; &gt;&gt; /etc/sysctl.conf
echo &#34;net.ipv4.conf.all.rp_filter=0&#34; &gt;&gt; /etc/sysctl.conf
sysctl -p
```

&gt; [!WARNING]
&gt;
&gt; 以下内容引用自 [DN42 实验网络介绍及注册教程（2022-12 更新） - Lan Tian @ Blog](https://lantian.pub/article/modify-website/dn42-experimental-network-2020.lantian/)

- ```rp_filter```是 Linux 内核针对网络的一项网络安全保护功能，对于数据包的来源地址和来源网络界面（网卡）进行检查：
  
  - 如果设置为 0（即禁用），放行所有数据包。
    - 但是有些无法正常回复（路由表内没有对应项目）的数据包也会被发给应用程序处理，消耗额外的系统资源。
    - 不过额外消耗应该很小，因此上述两项设置为 0 也没问题。
  
  - 如果设置为 1（严格模式），如果数据包来源网卡不是发送这个数据包的最优网卡（也就是如果你本机要回复这个地址的话，会选择一张不同的网卡），就把这个数据包丢掉。
    - 来源和回复在不同网卡是 DN42 内**非常常见的情况**，因此 **千万 一定 绝对** 不能把 `rp_filter` 设置成 1！
  
  - 如果设置为 2（宽松模式），从理论上来说，如果数据包来源地址不在路由表内（也就是本机不知道要怎么回复这个地址），就把这个数据包丢掉。
    - 但是理论归理论，在新版本（5.0&#43;）的内核中，实际使用中依然会有大量来源地址正确的正常数据包被丢弃。因此不要使用这个模式，请统一使用0。

​	最后，关闭 UFW 等防火墙工具。如果你需要配置Firewall的话，我建议你手动配置 iptables。

### 内网搭建

​	自建 Zerotier-planet 服务器，按官方文档来就行，本文不再叙述。

​	安装完成后，点击导航栏 &#34;Add Network&#34;，名称随意，进入到网络配置页面，如下图所示，进入Easy Setup配置你在 DN42 分到的 ip信息。

![image-20250121163709260](https://imgcdn.unifyz.5k.work/image-20250121163709260.png)

​	然后打开 Routes，将 ip 的网关设置好

![image-20250121163826805](https://imgcdn.unifyz.5k.work/image-20250121163826805.png)

### ZeroTier-One 配置

​	安装

​	```curl -s https://install.zerotier.com | sudo bash```

​	如果装了 GPG 可以用

​	```curl -s &#39;https://raw.githubusercontent.com/zerotier/ZeroTierOne/main/doc/contact%40zerotier.com.gpg&#39; | gpg --import &amp;&amp; \   if z=$(curl -s &#39;https://install.zerotier.com/&#39; | gpg); then echo &#34;$z&#34; | sudo bash; fi```

​	安装完成后，进入 planet安装目录/data/zerotier/dist 把里面的 planet 文件替换到 /var/lib/zerotier-one 后重启服务 ```zerotier-cli join``` 加入网络管理员后台同意后，这时候连上你的服务器，ping 一下 web 上分配给其他服务器的 ip，应该可以 ping 通了。

## IBGP 相关配置

​	现在你的服务器只是互联了，但是你并没有宣告外部这个服务器能互联到你 AS 内的其他服务器，所以你需要创建 IBGP 来宣告一下。以下是 bird 配置示例，如果您需要更高级 / 更方便的方式，可前往 [DN42 实验网络介绍及注册教程（2022-12 更新） - Lan Tian @ Blog](https://lantian.pub/article/modify-website/dn42-experimental-network-2020.lantian/#%E6%90%AD%E5%BB%BA%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E5%86%85%E7%BD%91)

```
template bgp milu_internal {
  local as OWNAS;
  path metric 1;
  direct;
  enable extended messages on;
  ipv4 {
    next hop self yes;
    import all;
    export all;
  };
  ipv6 {
    next hop self yes;
    import all;
    export all;
  };
};

protocol bgp mlnet_other_server from milu_internal {
  NEIGHBOR_IP 其他互联服务器的ip
  neighbor NEIGHBOR_IP as OWNAS;
};

protocol bgp mlnet_other_server from milu_internal {
  NEIGHBOR_IP 其他互联服务器的ip
  neighbor NEIGHBOR_IP as OWNAS;
};

// 以此类推
```

将此配置文件添加到**每个服务器**上，重载 bird 配置后，等待几分钟应该就可以在外部 ping 到你内部了

## 参考文章

[萌新入坑 DN42 之 —— 多服务器互联](https://milu.ink/313.html)

[DN42 实验网络介绍及注册教程（2022-12 更新） - Lan Tian @ Blog](https://lantian.pub/article/modify-website/dn42-experimental-network-2020.lantian/#%E6%90%AD%E5%BB%BA%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E5%86%85%E7%BD%91)



---

> 作者: [unify-z](https://blog.ifeng.asia/)  
> URL: https://blog.ifeng.asia/posts/05fcb59/  

