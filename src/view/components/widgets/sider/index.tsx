import {
  ContactsOutlined,
  // ApartmentOutlined,
  HomeOutlined,
  LogoutOutlined,
  // SecurityScanOutlined,
  SettingOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logoutAsync, appServices, RootState } from '@core';
import useTranslation from 'next-translate/useTranslation';
import {
  FetchunReadRequestQrsAsync,
  FetchunReadAnimalsAsync,
  FetchunReadFeaturesAsync,
} from 'src/core/data-management/redux/statistics';
// import { PermissionToMenuItem } from '../../../utils/helpers/permission-to-menu-item';

const Sider: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('sider');

  const { replace, asPath, pathname } = useRouter();

  const { unreadRequestQrs, unreadFeatures, unreadAnimals } = useSelector((state: RootState) => state.Statistics);

  //get unprinted requestqrs
  useEffect(() => {
    dispatch(FetchunReadRequestQrsAsync());
    dispatch(FetchunReadAnimalsAsync());
    dispatch(FetchunReadFeaturesAsync());
  }, []);

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
    {
      title: t`qr_requests`,
      href: '/manage/qr_requests',
    },
  ];

  return (
    <Menu theme='dark' selectedKeys={[pathname]} mode='vertical'>
      <Menu.Item key='/' icon={<HomeOutlined />}>
        <Link href='/'>{t`home`}</Link>
      </Menu.Item>

      <Menu.SubMenu key='sub1' title={t`manage`} icon={<SettingOutlined />}>
        {manageMenu_arr.map((el) => (
          <Menu.Item key={el.href}>
            {el.href.includes('qr_requests') ? (
              <Badge count={unreadRequestQrs ?? 0} size='small'>
                <Link href={el.href}>{el.title}</Link>
              </Badge>
            ) : el.href.includes('users-features') ? (
              <Badge count={unreadFeatures ?? 0} size='small'>
                <Link href={el.href}>{el.title}</Link>
              </Badge>
            ) : el.href === '/manage/animals' ? (
              <Badge count={unreadAnimals ?? 0} size='small'>
                <Link href={el.href}>{el.title}</Link>
              </Badge>
            ) : (
              <Link href={el.href}>{el.title}</Link>
            )}
          </Menu.Item>
        ))}
      </Menu.SubMenu>

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
