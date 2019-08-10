import React from "react";
import {
  Spin,
  Dropdown,
  Menu,
  Icon,
  Layout,
  Switch,
  Checkbox,
  Select,
  Card,
  Row,
  Descriptions,
  Rate
} from "antd";
import "./App.css";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

class VLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      componentLoading: true,
      enableFilter: false,
      filterOptions: {
        available: {
          status: false
        },
        category: {
          status: false,
          value: ""
        }
      },
      listOfCategories: this.props.categories,
      booksData: this.props.data
    };
  }
  componentDidMount = () => {
    this.setState({
      componentLoading: false
    });
  };

  renderBookItem = data => {
    let item = data.data;
    return (
      <Row key={item.id}>
        <Descriptions title={"#" + item.id + " " + item.title}>
          <Descriptions.Item label="Author">{item.author}</Descriptions.Item>
          <Descriptions.Item label="Category">
            {item.category}
          </Descriptions.Item>
          <Descriptions.Item label="Rating">
            <Rate disabled defaultValue={item.rating} allowHalf />
          </Descriptions.Item>
          <Descriptions.Item label="Available">
            {item.available ? "Yes" : "No"}
          </Descriptions.Item>
        </Descriptions>
      </Row>
    );
  };

  filerBooks = book => {
    const { enableFilter, filterOptions } = this.state;

    if (enableFilter) {
      if (filterOptions.available.status) {
        if (!book.available) return false;
      }
      if (filterOptions.category.status) {
        if (book.category !== filterOptions.category.value) return false;
      }
    }
    return true;
  };
  render = () => {
    const { componentLoading } = this.state;
    if (componentLoading) {
      return <Spin tip="Setting Up Things ..."> </Spin>;
    }
    var { booksData, listOfCategories } = this.state;
    const { title } = this.props;

    booksData = booksData.filter(this.filerBooks);

    return (
      <Layout>
        <Header>
          <h2 className="title">{title} </h2>
        </Header>
        <Layout>
          <Sider style={styles.sider}>
            <h4>
              Enable Filter
              <Switch
                onChange={() => {
                  this.setState({
                    enableFilter: !this.state.enableFilter
                  });
                }}
                size="small"
              />
            </h4>
            <Menu>
              <Menu.Item>
                <Checkbox
                  onChange={value => {
                    let { filterOptions } = this.state;

                    filterOptions.available.status = value;

                    this.setState({
                      filterOptions: filterOptions
                    });
                  }}
                >
                  Is Available
                </Checkbox>
              </Menu.Item>
              <Menu.Item>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select Category"
                  optionFilterProp="children"
                  onChange={value => {
                    let { filterOptions } = this.state;
                    filterOptions.category.status = true;
                    filterOptions.category.value = value;

                    this.setState({
                      filterOptions: filterOptions
                    });
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listOfCategories.map((item, i) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
                ,
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={styles.content}>
            <Card title="List Of Books">
              {booksData.map((item, i) => (
                <this.renderBookItem key={item.id} data={item} />
              ))}
            </Card>
          </Content>
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
    padding: 10,
    backgroundColor: "#fff",
    minWidth: 250,
    width: "30%"
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
