import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductStatistic, getProductStatistic } from "./service/home";

import { Outlet } from "react-router-dom";
import Logo from "@/assets/logo.jpg";

import { Layout, Image, Space, Button, Typography, Divider } from "antd";

import "./layout.scss";

const { Header, Content } = Layout;
const PageLayout: React.FC = () => {
  const navigate = useNavigate();
  const [updatedTime, setUpdatedTime] = useState("");

  useEffect(() => {
    getProductStatistic().then((res) => {
      const productStatistics: ProductStatistic = res.data;
      setUpdatedTime(productStatistics.dataUpdateTime);
    });
  }, []);

  return (
    <Layout className="layout">
      <Header className="header">
        <Space>
          <Image src={Logo} width={45} preview={false} />
          <span>中兴生产导航系统</span>
        </Space>
        <Space>
          <Button size="small" onClick={() => navigate("/")}>
            绿波图
          </Button>
          <Divider type="vertical" />
          <Typography.Text strong>
            {"数据更新时间：" + updatedTime}
          </Typography.Text>
        </Space>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PageLayout;
