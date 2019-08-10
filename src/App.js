import React from "react";
import { Spin, Dropdown, Menu, Icon, Layout } from "antd";
import "./App.css";

const { Header, Footer, Sider, Content } = Layout;

class VLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentLoading: true,
      listOfCategories: [],
      booksData: [
        {
          name: "Rich Dad Poor Dad",
          category: "business",
          author: "Robert Kiyosaki",
          available: true,
          rating: 4.5
        }
      ]
    };
  }
  componentDidMount = () => {
    this.setState({
      componentLoading: false
    });
  };
  menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  render = () => {
    const { componentLoading } = this.state;
    if (componentLoading) {
      return <Spin tip="Setting Up Things ..."> </Spin>;
    }
    const { booksData } = this.state;
    const { title } = this.props;

    return (
      <Layout>
        <Header>
          <h2 className="title">{title} </h2>
        </Header>
        <Layout>
          <Sider style={styles.sider}>
            <Dropdown overlay={this.menu}>
              <a className="ant-dropdown-link" href="#">
                Hover me <Icon type="down" />
              </a>
            </Dropdown>
          </Sider>
          <Content style={styles.content}>Content</Content>
        </Layout>
        <Footer>
          Developed By
          <a href="//vinit.site" rel="noopener noreferrer" target="_blank">
            {" Vinit Patil "}
          </a>
          for Interview an Test at
          <a href="//sleepycat.in" rel="noopener noreferrer" target="_blank">
            {" SleepyCat "}
          </a>
        </Footer>
      </Layout>
    );
  };
}

const styles = {
  sider: {
    padding: 20
  },
  content: {
    padding: 30
  }
};

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "cener"
      }}
    >
      <VLibrary title="Vinit's Interview Library" />
    </div>
  );
}

export default App;
