import './App.css';
import { Col, Row ,Layout} from 'antd';
import {dataList} from './data';
import {useEffect,useCallback} from 'react'
import $ from 'jquery'
//import './jquery.shuffleLetters'
require('jquery.easing')
require('./jquery.shuffleLetters')
const {Header, Footer, Content} = Layout;
function App() {
  const sliceNum = 4
  const list = []
  for(let i = 0;i<dataList.length;i+=sliceNum){
    list.push(dataList.slice(i,i+sliceNum))
  }
  const contentMouseenterHandle =  useCallback((e)=>{
    const label =$(e.currentTarget).children(".label")
    label.each((i,ele)=>{
     const currentEle = $(ele)
     console.log(ele)
     currentEle.textshuffle({
       "str":currentEle.attr('data-text')
     });
    })
    },[])

    const searchMouseEnterHandler = useCallback( (e)=>{
      const $search = $(e.currentTarget).parent()
      const $input = $(e.currentTarget).prev()
     $search.css({
          "z-index": 10000
      })
    $input
          .stop()
          .animate({
              width: "100%",
              opacity: 1
          }, 300, "easeOutCubic");
  },[])
  const searchMouseLeaveHandler = useCallback((e)=>
  {   const search = e.currentTarget
      const $input = $(search).find('input')
      if ($input.val().length < 1 && !search.isFocus)
      {
        $(search).css({
          "z-index": 0
      })
      
      $input
          .stop()
          .animate({
              width: "0%",
              opacity: 0
          }, 300, "easeOutCubic");
      }
  },[])
  const focusinHandler = useCallback((e)=>{
    e.currentTarget.isFocus = true
  },[])
  const focusoutHandler = useCallback((e)=>{
    e.currentTarget.isFocus = false
    searchMouseLeaveHandler(e)
  },[searchMouseLeaveHandler])
  useEffect(()=>{
    const elements = $('.item')
    const $search = $("#search");
    const $button = $("#search .button");
        $button.on("mouseenter", searchMouseEnterHandler);
        $button.on("click", searchMouseEnterHandler);
        $search.on("mouseleave", searchMouseLeaveHandler);
        $search.on("focusin", focusinHandler);
        $search.on("focusout", focusoutHandler);
        elements.on('mouseenter',contentMouseenterHandle)
     return ()=>{
      elements.off()
      $button.off()
      $search.off()
     }
  },[focusoutHandler,focusinHandler,searchMouseLeaveHandler,contentMouseenterHandle,searchMouseEnterHandler])
 

  return (
    <Layout className='app'>
    <Header className='headerBox'>
    <div className="left border-effect" >
      <a  href="/" className='item'>
        <span className="name label" data-text='KASHIWA SATO' style={{visibility: 'visible'}}>KASHIWA SATO</span>
        <span className="title label" data-text='SAMURAI INC. TOKYO' style={{visibility: 'visible'}}>SAMURAI INC. TOKYO</span>
      </a>
   </div>
   <div className="right">
   <div className="side-menu" >
   <ul >
    <li className="current all" >
      <a className="item" href="/" >
        <span className="label" data-text='PROJECT' style={{visibility:'visible'}}>PROJECT</span>
        <div className="effect"></div>
      </a>
      </li>
    <li className="line"></li>
    <li className=" profile" >
        <a className="item" href="/">
          <span className="label" data-text='PROFILE' style={{visibility:'visible'}}>PROFILE</span>
          <div className="effect"></div>
        </a>
    </li>
    <li className="line"></li>
    <li className=" contact">
          <a className="item" href="/">
            <span className="label" data-text='CONTACT'  style={{visibility:'visible'}}>CONTACT</span>
            <div className="effect" ></div>
          </a>
    </li>
  </ul>
  <div className="lang-switch"><div >
    <ul >
      <li >
        <a href="/" className="item en" >
          <span className="label" data-text='ENGLISH'  style={{visibility:'visible'}}>ENGLISH</span>
          <div className="effect" ></div>
        </a>
      </li>
      <li className="line"></li>
      <li>
        <a href="/" className="item ja" >
          <span className="label" data-text='JAPANESE'  style={{visibility:'visible'}}>JAPANESE</span>
          <div className="effect" ></div>
        </a>
      </li>
      <li className="line"></li>
      <li >
        <a href="/" className="item current cs">
          <span className="label" data-text='CHINESE'  style={{visibility:'visible'}} >CHINESE</span>
          <div className="effect"></div>
        </a>
      </li>
    </ul>
  </div>
  </div></div>
  <div id="search"  style={{zIndex: 0}}>
      <input type="text" placeholder="PLEASE INPUT KEYWORD" style={{width:'0%', opacity: 0}}/>
        <div className="button" ></div>
  </div>
  </div>
    </Header>
    <Content className='content'>
      {list.map((item,index)=>(
     <Row  className="container" key={index} gutter={[40,40]}>
         {
           item.map((item1,subIndex)=>(
            <Col span={6} key={`${index}-${subIndex}`}>
            <div className='item'>
               <p className='imgBox'>
                <img src={require(`./${item1.imgUrl}`)} alt={item1.title} style={{width:'100%',mixBlendMode: 'multiply' }}/>
               </p>
                <p className='label' data-text={item1.title}>{item1.title}</p>
                <ul className='context'>
                  <li>{item1.context.credit1}</li>
                  <li>{item1.context.credit2}</li>
                  <li>{item1.context.credit3}</li>
                  <li>{item1.context.credit4}</li>
                  </ul> 
                  <p className='more'>
                    <span>READ MORE +</span>
                  </p>
              </div>
          </Col>
          
          )) 
         }
        </Row>
      ))}
    
    </Content>
    <Footer>Footer</Footer>
  </Layout>
    
  );
}

export default App;
