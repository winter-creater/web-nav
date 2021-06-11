// console.log($)
// console.log(jQuery)

const $siteList=$('.siteList')
const $lastLi=$siteList.find('li.last')
// 读取localStorage的x
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)////字符串转换成对象
const hashMap=xObject || [
    {logo:'G',url:'https://github.com'},
    {logo:'D',url:'https://developer.mozilla.org/zh-CN'}
]
const simplifyUrl=(url)=>{
  return url.replace('https://','')
           .replace('http://','')
           .replace('www.','')
           .replace(/\/.*/,'')
}
// 遍历hashMap
const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
      console.log(index)
        const $li=$(`<li>    
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-baseline-close-px"></use>
             </svg>     
            </div>
          </div> 
      </li>`).insertBefore($lastLi)

      $li.on('click',()=>{
        window.open(node.url)//替代 <a href="${node.url}"></a>
      })
      $li.on('click','.close',(e)=>{
        e.stopPropagation()//阻止冒泡,阻止点击x的时候跳转页面
        console.log(hashMap)
        hashMap.splice(index,deleteCount=1)//删除数组，删除网站；老师：hashMap.splice(index,deleteCount：1)
        render()//删除后再次渲染
      })
    })
}
render()
$('.add')
 .on('click',()=>{
    let url= window.prompt('新增网址')
    if(url.indexOf('http')!==0){
        url="https://"+url
    }
    console.log(url)
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        logoType:'text',
        url:url
    }) 
    render()
 })

//  存hashMap
window.onbeforeunload=()=>{
    console.log('页面要关闭了')
    // localStorage只能存字符串，不能存对象
    const string=JSON.stringify(hashMap)//对象转换成字符串
    // console.log(typeof hashMap)
    // console.log(hashMap)
    // console.log(typeof string)
    // console.log(string)
    localStorage.setItem('x',string)//在本地存储里设置x，值为string
} 
// 键盘按下事件,大小写兼容
$(document).on('keypress',(e)=>{
  // const key=e.key;
  const {key}=e;
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo===key){
      window.open(hashMap[i].url)
    }else if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url)
    }
  }
})



