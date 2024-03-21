'use client'
import * as React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


// BIBLIOTECAS
import { MenuFoldOutlined, MenuUnfoldOutlined, BookOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, Button, theme, ConfigProvider } from 'antd';
import Main from '@/components/Main';


const { Header, Sider, Content, Footer } = Layout;

// FUNÇÃO DA PÁGINA

export default function Home({children}) {
  const [collapsed, setCollapsed] = useState(false);
  
  const [currentPage, setCurrentPage] = useState('');
  const [initialLoad, setInitialLoad] = useState(true); // Estado para carregar a pagina apenas uma vez 
  const router = useRouter();

  useEffect(() => {
    // Verifica se é a primeira renderização
    if (initialLoad) {
      router.push('/homePage'); // Redireciona para a homePage apenas na primeira renderização
      setInitialLoad(false); // Marca que o carregamento inicial já foi feito
    } else {
      const currentPath = router.pathname;
      setCurrentPage(currentPath);
    }
  }, []); 

  // Conf de estilo
  const {
    token: {borderRadiusLG },
  } = theme.useToken();


  return (
    <div className='h-scre'>
      <Layout style={{ minHeight: '100vh', overflowX:'hidden'}}>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor:'#121212'}}>
          <div className="demo-logo-vertical" />
          <ConfigProvider 
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: '#E914B7',
                  borderRadius: 2,

                  // Alias Token
                  colorBgContainer: '#121212',
                },
              }}
            >
              <Menu 
                mode="inline"
                inlineCollapsed={collapsed} // Add this prop for collapsible menu
                style={{marginTop:'50px'}}
              >
                <Menu.Item key="1" icon={<HomeOutlined />}  style={{color: '#E914B7', fontWeight:'bold', marginBottom:'50px'}}>
                  <Link href="/homePage" > Home </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />} style={{color: '#E914B7', fontWeight:'bold', marginBottom:'50px'}}>
                  <Link href="/userPage" > Buscar Usuários </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<BookOutlined />} style={{color: '#E914B7', fontWeight:'bold'}}>
                  <Link href="/repoPage" > Buscar Repositório </Link>
                   
                </Menu.Item>
              </Menu>
            </ConfigProvider>
         
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#121212' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color:'#E914B7'
              }}
            />
          </Header>
          {/* <Content>
            
          </Content> */}
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background:'black',
              borderRadius: borderRadiusLG,
            }}
          >
            <Main>{children}</Main>
          </Content>
          
            
          <Footer style={{backgroundColor:'#121212', color:'white'}}>
            <h3 className='text-center'>Criado por <a href='https://github.com/Julianagft'>Maria Juliana</a></h3>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
