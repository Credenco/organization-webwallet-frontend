import { Outlet } from 'react-router-dom';

import React from 'react';
import { Header } from '../organisms/Header';
import styled from 'styled-components';
import { SideMenu } from '../organisms';

export const MainMenuLayout = () => {
    return (
        <Root>
            <MenuContainer>
                <SideMenu/>
            </MenuContainer>
            <ContentContainer>
                <Header/>
                <BodyContainer>
                    <Outlet/>
                </BodyContainer>
            </ContentContainer>
        </Root>
    );
};


const Root = styled.div`
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    width: 100%;
`;
const BodyContainer = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
`;
const MenuContainer = styled.div`
    min-width: 250px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
`;
const ContentContainer = styled.div`
    width: 100%;
`;
