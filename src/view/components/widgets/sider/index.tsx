import {
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { logoutAsync, appServices } from '@core';
// import { PermissionToMenuItem } from '../../../utils/helpers/permission-to-menu-item';

const manageMenu_arr: { title: string, href: string }[] = [
  {
    title: 'Animals',
    href: '/manage/animals'
  },
  // don't needed
  // {
  //   title: 'Attachments',
  //   href: '/manage/attachments'
  // },
  {
    title: 'Attributes',
    href: '/manage/attributes'
  },
  {
    title: 'Category Parents',
    href: '/manage/category-parents'
  },
  {
    title: 'Category Classes',
    href: '/manage/category-classes'
  },
  {
    title: 'Category Breeds',
    href: '/manage/category-breeds'
  },
  {
    title: 'Colors',
    href: '/manage/colors'
  },
  {
    title: 'Countries',
    href: '/manage/countries'
  },
  {
    title: 'Display Categories',
    href: '/manage/display-categories'
  },
  {
    title: 'Farms',
    href: '/manage/farms'
  },
  {
    title: 'Notifications',
    href: '/manage/notifications'
  },
  {
    title: 'Pollinations',
    href: '/manage/pollinations'
  },
  {
    title: 'Rates',
    href: '/manage/rates'
  },
  {
    title: 'Users',
    href: '/manage/users'
  },
  {
    title: 'Vaccinates',
    href: '/manage/vaccinates'
  },
  {
    title: 'Vitamins',
    href: '/manage/vitamins'
  },
  {
    title: 'Weights',
    href: '/manage/weights'
  },
]

const Sider: FC = () => {
  const dispatch = useDispatch();

  const { replace, asPath, pathname } = useRouter();


  return (
    <Menu theme='dark' selectedKeys={[pathname]} mode='vertical'>
      <Menu.Item key='/' icon={<HomeOutlined />}>
        <Link href='/'>الرئيسية</Link>
      </Menu.Item>

      {/* {user?.permissions.findIndex(el => el.name === 'manage users') !== -1 && < Menu.Item key='/dashboard/manage/roles' icon={< UserOutlined />}>
        <Link href='/dashboard/manage/roles'>Roles</Link>
      </Menu.Item>} */}

      <Menu.SubMenu key='sub1' title='تنظيم' icon={<EditOutlined />}>
        {manageMenu_arr.map(el => <Menu.Item key={el.href}>
          <Link href={el.href}>{el.title}</Link>
        </Menu.Item>
        )}
      </Menu.SubMenu>

      <Menu.SubMenu title='اللغة' icon={<TranslationOutlined />}>
        <Menu.Item
          key='arabic'
          title='عربي'
          onClick={async () => {
            await appServices.changeLang({ lang: 'ar' })
            replace(asPath, undefined, { locale: 'ar' })
          }}>
          عربي
        </Menu.Item>
        <Menu.Item
          key='english'
          title='English'
          onClick={async () => {
            await appServices.changeLang({ lang: 'en' })
            replace(asPath, undefined, { locale: 'en' })
          }}>
          English
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        icon={<LogoutOutlined />}
        key='LogOut'
        onClick={() => {
          dispatch(logoutAsync());
          replace('/login')
        }}>
        تسجيل الخروج
      </Menu.Item>
    </Menu >
  );
};
export default Sider;
