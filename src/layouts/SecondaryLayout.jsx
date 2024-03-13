'use client'
import { Layout, theme} from 'antd';

const { Content } = Layout;

export default function SecondaryLayout({children}) {
    
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
              background: '#F2F2F2',
              borderRadius: borderRadiusLG,
            }}
          >
                {children}
            
            </Content>
        </Layout>
    )
}