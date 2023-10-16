import React, { useState } from "react";

// Context Provider
import AppProvider from "./state/AppProvider";

// Styles
import styles from "./App.module.css";

// Ant UI
import { Layout } from "antd";

// Amplify API
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Custom Components
import SidePanel from "./pages/SidePanel/SidePanel";
import Main from "./pages/Main/Main";

const { Sider, Content } = Layout;

const App = () => {
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  const handleCollapse = (value) => {
    setCollapsed(value);
  };

  return (
    <AppProvider>
      <Layout className={styles.container}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          theme="light"
        >
          <SidePanel
            setCollapsed={setCollapsed}
            collapsed={collapsed}
            setShowNewThreadModal={setShowNewThreadModal}
          />
        </Sider>
        <Layout>
          <Content className={styles.content}>
            <Main
              setShowTopBar={setShowTopBar}
              showTopBar={showTopBar}
              setShowNewThreadModal={setShowNewThreadModal}
              showNewThreadModal={showNewThreadModal}
            />
          </Content>
        </Layout>
      </Layout>
    </AppProvider>
  );
};
export default withAuthenticator(App);
