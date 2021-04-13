import {
  ContactsOutlined,
  // ApartmentOutlined,
  HomeOutlined,
  LogoutOutlined,
  // SecurityScanOutlined,
  SettingOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { logoutAsync, appServices } from '@core';
import useTranslation from 'next-translate/useTranslation';
// import { PermissionToMenuItem } from '../../../utils/helpers/permission-to-menu-item';

const Sider: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('sider');

  const { replace, asPath, pathname } = useRouter();

  const manageMenu_arr: { title: string; href: string }[] = [
    {
      title: t`categories`,
      href: '/manage/category-parents',
    },
    {
      title: t`varieties`,
      href: '/manage/category-classes',
    },
    {
      title: t`strains`,
      href: '/manage/category-breeds',
    },

    {
      title: t`animals`,
      href: '/manage/animals',
    },

    {
      title: t`farms`,
      href: '/manage/farms',
    },
    {
      title: t`packages`,
      href: '/manage/features',
    },
    {
      title: t`users_packages`,
      href: '/relationship-breaking/users-features',
    },
    {
      title: t`properties`,
      href: '/manage/attributes',
    },
    {
      title: t`animals_properties`,
      href: '/relationship-breaking/animals-attributes',
    },
    {
      title: t`colors`,
      href: '/manage/colors',
    },
    {
      title: t`countries`,
      href: '/manage/countries',
    },
    {
      title: t`offers`,
      href: '/manage/display-categories',
    },
    {
      title: t`notifi`,
      href: '/manage/notifications',
    },
    {
      title: t`pollination`,
      href: '/manage/pollinations',
    },
    {
      title: t`vaccines`,
      href: '/manage/vaccinates',
    },
    {
      title: t`treatments`,
      href: '/manage/vitamins',
    },
    {
      title: t`weights`,
      href: '/manage/weights',
    },
    {
      title: t`certificates`,
      href: '/manage/certificates',
    },
    {
      title: t`users`,
      href: '/manage/users',
    },

    {
      title: t`ratings`,
      href: '/manage/rates',
    },
  ];

  // const approvementMenu_arr: { title: string; href: string }[] = [
  //   {
  //     title: t`animals`,
  //     href: '/approvement/animals',
  //   },
  //   {
  //     title: t`packages`,
  //     href: '/approvement/features',
  //   },
  // ];

  return (
    <Menu theme='dark' selectedKeys={[pathname]} mode='vertical'>
      <Menu.Item key='/' icon={<HomeOutlined />}>
        <Link href='/'>{t`home`}</Link>
      </Menu.Item>

      <Menu.SubMenu key='sub1' title={t`manage`} icon={<SettingOutlined />}>
        {manageMenu_arr.map((el) => (
          <Menu.Item key={el.href}>
            <Link href={el.href}>{el.title}</Link>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      {/* 
      <Menu.SubMenu key='sub3' title={t`approvment`} icon={<SecurityScanOutlined />}>
        {approvementMenu_arr.map((el) => (
          <Menu.Item key={el.href}>
            <Link href={el.href}>{el.title}</Link>
          </Menu.Item>
        ))}
      </Menu.SubMenu> */}

      <Menu.Item icon={<ContactsOutlined />} key='/contact-us-requests'>
        <Link href='/contact-us-requests'>{t`contact_requests`}</Link>
      </Menu.Item>

      <Menu.SubMenu title={t`lang`} icon={<TranslationOutlined />}>
        <Menu.Item
          key='arabic'
          title='عربي'
          onClick={async () => {
            await appServices.changeLang({ lang: 'ar' });
            replace(asPath, undefined, { locale: 'ar' });
          }}
        >
          عربي
        </Menu.Item>
        <Menu.Item
          key='english'
          title='English'
          onClick={async () => {
            await appServices.changeLang({ lang: 'en' });
            replace(asPath, undefined, { locale: 'en' });
          }}
        >
          English
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        icon={<LogoutOutlined />}
        key='LogOut'
        onClick={() => {
          dispatch(logoutAsync());
          replace('/login');
        }}
      >
        {t`logout`}
      </Menu.Item>
    </Menu>
  );
};
export default Sider;
