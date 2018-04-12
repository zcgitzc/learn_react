//React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//logo
import logo from '../../images/logo.svg';
//css
import './App.css';
//element-ui
import { Button, Collapse, Tag, Notification } from 'element-react';
import 'element-theme-default';
//app-component
import MyLi from '../MyLi/MyLi';
//immutable
import { Map, OrderedMap } from 'immutable';
//db
import DB from "../../app/app_db";
console.log(DB);
let startTime;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liList: ['A', 'B', 'C', 'D', 'E', 'F'],
      count: 1,
      data: Map({ index: 0 })
    };
  }

  componentWillMount() {
    const me = this;
    console.log("componentWillMount");
  }

  componentDidMount() {
    const me = this;
    console.log("componentDidMount");


    DB.app.testNattyDb({
      //params
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.error(error);
      let liList = ['A-ERROR', 'B-ERROR', 'C-ERROR', 'D-ERROR', 'E-ERROR', 'F-ERROR']
      me.setState({
        liList
      });
    });

  }

  componentWillReceiveProps(nextProps) {
    const me = this;
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps, nextState) {
    const me = this;
    console.log("shouldComponentUpdate");
    startTime = new Date().getTime();
    return true;
  }

  componentWillUpdate() {
    const me = this;
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    const me = this;
    console.log("componentDidUpdate");
    console.log("li删除没有设置key,耗时：" + (new Date().getTime() - startTime) + " ms");
  }

  componentWillUnmount() {
    const me = this;
    console.log("componentWillUnmount");
  }

  deleteLi(index) {
    const me = this;
    let liList = me.state.liList;
    liList.splice(index, 1)
    me.setState(liList);
  }

  unmountComponent() {
    const me = this;
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))

  }

  changeProps() {
    const me = this;
    //me.props.a = 'a';
    Notification({
      title: '警告',
      message: 'props属性值本身是不能修改的，但是可以在父组件里面修改，导致子组件变化。这里我们修改MyLi的属性',
      type: 'warning'
    });
    me.setState({ propsFlag: true });
  }

  incrementCount() {
    const me = this;
    me.setState((prevState) => {
      return { count: prevState.count + 1 }
    });
    //ERROR
    // me.setState({
    //   count : me.state.count + 1
    // });
  }

  incrementTwo() {
    const me = this;
    me.incrementCount();
    me.incrementCount();
  }

  focus() {
    const me = this;
    // 直接使用原生 API 使 text 输入框获得焦点
    me.textInput.focus();
  }

  learnImmutable() {
    const me = this;
    me.setState({ data: me.state.data.update("index", index => index + 1) },
      () => console.log(me.state.data.get("index")));
    console.log(me.state.data.get("index"));
  }

  render() {
    console.log("render");
    const me = this;
    const activeName = "1";
    return (
      <div className="App">

        <div style={{ border: 1 }}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Collapse value={activeName}>
            <Collapse.Item name="1" title="JSX简介 一种 JavaScript 的语法扩展，推荐在 React 中使用 JSX 来描述用户界面" >
              <div>1.JSX中可以使用表达式用{}包裹</div>
              <div>2.属性值名称遵循驼峰命名法 eg:class -> className,tabindex -> taxIndex</div>
              <div>3.React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击</div>
            </Collapse.Item>
            <Collapse.Item name="2" title="Keys React支持了一个key属性。当子节点有key时，React使用key来匹配原本树的子节点和新树的子节点。从而提高渲染效率">
              <div>key的使用场景:<a href="https://doc.react-china.org/docs/reconciliation.html">官方讲解1</a> &nbsp; <a href="https://doc.react-china.org/docs/lists-and-keys.html">官方讲解2</a></div>
              <div>
                <ul>
                  <div>
                    {me.state.liList.map((item, index) => {
                      return <li key={item} onClick={me.deleteLi.bind(me, index)}>{item}</li>
                    })}
                  </div>
                </ul>
              </div>
            </Collapse.Item>

            <Collapse.Item title="unmountComponentAtNode" name="3">
              <div>ReactDOM.unmountComponentAtNode(container)</div>
              <div><MyLi value='1'></MyLi></div>
              <div><Button type="primary" onClick={me.unmountComponent.bind(me)}>点击删除</Button></div>
            </Collapse.Item>
            <Collapse.Item title="props改变之后，是否重新render,这个点待定" name="4">
              <div>props改变之后，是否重新render</div>
              <div><Button type="primary" onClick={me.changeProps.bind(me)}>点击改变props</Button></div>
            </Collapse.Item>
            <Collapse.Item title="state异步问题解决" name="5">
              <div>state异步问题解决</div>
              <div><Button type="primary" onClick={me.incrementTwo.bind(me)}>点击count加两次{me.state.count}</Button></div>
            </Collapse.Item>
            <Collapse.Item title="ref使用" name="6">
              <input
                type="text"
                ref={(input) => {
                  this.textInput = input;
                }} />
              <Button type="primary" onClick={me.focus.bind(me)}>点击获取焦点</Button>
            </Collapse.Item>
            <Collapse.Item title="Immutable使用" name="7">
              <Button type="primary" onClick={me.learnImmutable.bind(me)}>点击测试Immutable{me.state.data.get("index")}</Button>
            </Collapse.Item>
          </Collapse>
        </div>

      </div>
    );
  }
}

export default App;
