import './App.css';
import { Col, Row ,Layout} from 'antd';
import {$} from './jquery.shuffleLetters'
import {dataList} from './data';
import {useEffect} from 'react'
const {Header, Footer, Content} = Layout;
function App() {
  const sliceNum = 4
  const list = []
  const contentMouseenterHandle = (e)=>{
    const label =$(e.currentTarget).children(".label")
    label.each((i,ele)=>{
     const currentEle = $(ele)
     currentEle.textshuffle({
       "str":currentEle.text()
     });
    })
    }
    const searchMouseEnterHandler = (e,$search,$input)=>{
      console.log($search,$input)
     $search.css({
          "z-index": 10000
      })
    $input
          .stop()
          .animate({
              width: "100%",
              opacity: 1
          }, 300, "easeOutCubic");
  }
  useEffect(()=>{
    const elements = $('.item')
    const $search = $("#search");
    const $input = $('#search input')
    $search.on('mouseenter',(e)=>searchMouseEnterHandler(e,$search,$input))
    elements.on('mouseenter',contentMouseenterHandle)
     return ()=>{
      elements.off()
     }
  },[])
  for(let i = 0;i<dataList.length;i+=sliceNum){
  list.push(dataList.slice(i,i+sliceNum))
  }

  return (
    <Layout className='app'>
    <Header className='headerBox'>
    <div className="left border-effect" >
      <a  href="/" className='item'>
        <span className="name label"style={{visibility: 'visible'}}>KASHIWA SATO</span>
        <span className="title label"  style={{visibility: 'visible'}}>SAMURAI INC. TOKYO</span>
      </a>
   </div>
   <div className="right">
   <div className="side-menu" >
   <ul >
    <li className="current all" >
      <a className="item" href="/" >
        <span className="label" style={{visibility:'visible'}}>PROJECT</span>
        <div className="effect"></div>
      </a>
      </li>
    <li className="line"></li>
    <li className=" profile" >
        <a className="item" href="/">
          <span className="label" style={{visibility:'visible'}}>PROFILE</span>
          <div className="effect"></div>
        </a>
    </li>
    <li className="line"></li>
    <li className=" contact">
          <a className="item" href="/">
            <span className="label" style={{visibility:'visible'}}>CONTACT</span>
            <div className="effect" ></div>
          </a>
    </li>
  </ul>
  <div className="lang-switch"><div >
    <ul >
      <li >
        <a href="/" className="item en" >
          <span className="label" style={{visibility:'visible'}}>ENGLISH</span>
          <div className="effect" ></div>
        </a>
      </li>
      <li className="line"></li>
      <li>
        <a href="/" className="item ja" >
          <span className="label" style={{visibility:'visible'}}>JAPANESE</span>
          <div className="effect" ></div>
        </a>
      </li>
      <li className="line"></li>
      <li >
        <a href="/" className="item current cs">
          <span className="label" style={{visibility:'visible'}} >CHINESE</span>
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
                <p className='label'>{item1.title}</p>
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
