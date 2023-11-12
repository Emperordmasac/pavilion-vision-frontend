import * as React from 'react';

import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import { useGetUserQuery } from 'state/api';

const Layout = () => {
  const isDesktopScreen = useMediaQuery('(min-width: 600px)');
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);

  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box
      display={isDesktopScreen ? 'flex' : 'block'}
      width='100%'
      height='100%'
    >
      <SideBar
        user={data?.user || {}}
        isDesktopScreen={isDesktopScreen}
        drawerWidth='250px'
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1}>
        <NavBar
          user={data?.user || {}}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
