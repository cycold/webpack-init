#### 开发
`npm run dev`

#### 开发编译打包(没有合并css)
`npm run dev-build`     
`npm run dev-build-details`(打印编译详情)
 
#### 模拟产品环境(使用webpack-dev-server)
`npm run pro` (没有合并css,禁用部分插件) 

`NODE_ENV=production npm run pro` 完全的产品坏境模拟运行

#### 产品打包编译
`npm run pro-build `(没有合并css)       
`npm run pro-build-details `(没有合并css)   

`NODE_ENV=production npm run pro-build `(完全产品环境打包)      
`NODE_ENV=production npm run pro-build-details `(完全产品环境打包,打印详情,便于分析优化)
