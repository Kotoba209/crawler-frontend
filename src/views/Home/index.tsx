import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'
import { Button, message, Table, Avatar  } from 'antd';
// import ReactEcharts from 'echarts-for-react';
import request from '../../utils/request'
import './index.css';

interface RecordItem {
  title: string;
  content: string;
  authorName: string;
  date: string;
  imgUrl: string;
  url: string;

}

class Home extends Component {
  state = {
    loaded: false,
    isLogin: true,
    dataSource: []
  };

  componentDidMount() {
    request.get('/api/isLogin').then(res => {
      const data: boolean = res.data
      if (!data) {
        this.setState({
          isLogin: false,
          loaded: true,
        });
      } else {
        this.setState({
          loaded: true
        })
        this.handleGetList()
      }
    });
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_: unknown, __: unknown, index: number) => (<>{index}</>)
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '作者',
      dataIndex: 'authorName',
      key: 'authorName',
    },
    {
      title: '发布时间',
      dataIndex: 'date',
      key: 'date',
      width: 100
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (_: unknown, record: RecordItem) => {
        return (
          <Avatar alt='img' src={record.imgUrl} />
        )
      }
    },
    {
      title: '操作',
      key: 'url',
      render: (_: unknown, record: RecordItem) => {
        return (
          <Button type='primary' href={record.url} size='large'>详情</Button>
        )
      }
    }
  ]

  handleLogoutClick = () => {
    request.get('/api/logout').then(res => {
      const data: boolean = res.data
      if (data) {
        this.setState({
          isLogin: false
        });
      } else {
        message.error('退出失败');
      }
    });
  };

  handleCrowllerClick = () => {
    request.get('/api/getData').then(res => {
      const data: boolean = res.data
      if (data) {
        message.success('爬取成功');
        this.handleGetList()
      } else {
        message.error('退出失败');
      }
    });
  };

  handleGetList = () => {
    request.get('/api/showData')
    .then(res => {
      const data = res.data
      if (!data) return
      this.handleFormatList(data)
    })
  }

  handleFormatList = (list: RecordItem[]) => {
    const data: RecordItem[] = []
    list.forEach(item => {
      if (data.filter(item2 => item2.title === item.title).length < 1) {
        data.push(item)
      }
    })
    this.setState({
      dataSource: data
    })
  }

  // getOption: () => echarts.EChartsOption = () => {
  //   return {
  //     title: {
  //       text: '折线图堆叠'
  //     },
  //     tooltip: {
  //       trigger: 'axis'
  //     },
  //     legend: {
  //       data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  //     },
  //     grid: {
  //       left: '3%',
  //       right: '4%',
  //       bottom: '3%',
  //       containLabel: true
  //     },
  //     toolbox: {
  //       feature: {
  //         saveAsImage: {}
  //       }
  //     },
  //     xAxis: {
  //       type: 'category',
  //       boundaryGap: false,
  //       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  //     },
  //     yAxis: {
  //       type: 'value'
  //     },
  //     series: [
  //       {
  //         name: '邮件营销',
  //         type: 'line',
  //         stack: '总量',
  //         data: [120, 132, 101, 134, 90, 230, 210]
  //       },
  //       {
  //         name: '联盟广告',
  //         type: 'line',
  //         stack: '总量',
  //         data: [220, 182, 191, 234, 290, 330, 310]
  //       },
  //       {
  //         name: '视频广告',
  //         type: 'line',
  //         stack: '总量',
  //         data: [150, 232, 201, 154, 190, 330, 410]
  //       },
  //       {
  //         name: '直接访问',
  //         type: 'line',
  //         stack: '总量',
  //         data: [320, 332, 301, 334, 390, 330, 320]
  //       },
  //       {
  //         name: '搜索引擎',
  //         type: 'line',
  //         stack: '总量',
  //         data: [820, 932, 901, 934, 1290, 1330, 1320]
  //       }
  //     ]
  //   };
  // };

  render() {
    const { isLogin, loaded } = this.state;
    console.log('isLogin, loaded', isLogin, loaded)
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className='buttons'>
              <Button type="primary" style={{ marginRight: '25px' }} onClick={this.handleCrowllerClick}>
                爬取
              </Button>
              <Button type="primary" onClick={this.handleLogoutClick}>退出</Button>
            </div>
            <Table dataSource={this.state.dataSource} columns={this.columns} rowKey="title" />;
          </div>
        );
      }
      return null;
    }
    return (<Navigate to='/login' replace/>);
  }
}

export default Home;
