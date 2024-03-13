'use client'
import { Layout, theme } from 'antd';

const { Content } = Layout;

export default function LayoutHome({children}) {

    const {
        token: {borderRadiusLG },
      } = theme.useToken();

    return (
        <Layout>
            <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background:'black',
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>

        </Layout>
    )
}