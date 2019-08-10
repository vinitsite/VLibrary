import React from "react";
import {
  Spin,
  Menu,
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
  let SampleBooksData = [
    {
      id: 1,
      title: "Rich Dad Poor Dad",
      category: "business",
      author: "Robert Kiyosaki",
      available: true,
      rating: 4.5
    },
    {
      id: 2,
      title: "The Great Gatsby",
      category: "business",
      author: "F. Scott Fitzgerald",
      available: false,
      rating: 4.8
    },
    {
      id: 3,
      title: "Some Cooking Book",
      category: "cooking",
      author: "Harper Lee",
      available: true,
      rating: 3
    },
    {
      id: 4,
      title: "Some LifeStyle Book",
      category: "lifestyle",
      author: "J.K. Rowling",
      available: true,
      rating: 4.5
    },
    {
      id: 5,
      title: "1984",
      category: "business",
      author: "George Orwell",
      available: true,
      rating: 4.5
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      category: "business",
      author: "J.D. Salinger",
      available: true,
      rating: 4.5
    },
    {
      id: 7,
      title: "The Hobbit",
      category: "business",
      author: "J.R.R. Tolkien",
      available: true,
      rating: 4.5
    },
    {
      id: 8,
      title: "Fahrenheit 451",
      category: "business",
      author: "Ray Bradbury",
      available: true,
      rating: 4.5
    }
  ];

  let SampleCategories = ["business", "lifestyle", "cooking"];

  let SampleTitle = "Vinit's Interview Library";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "cener"
      }}
    >
      <VLibrary
        title={SampleTitle}
        data={SampleBooksData}
        categories={SampleCategories}
      />
    </div>
  );
}

export default App;
