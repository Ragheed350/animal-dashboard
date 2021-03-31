import {
  ContactsOutlined,
  // ApartmentOutlined,
  HomeOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { logoutAsync, appServices } from '@core';
// import { PermissionToMenuItem } from '../../../utils/helpers/permission-to-menu-item';

const manageMenu_arr: { title: string; href: string }[] = [
  {
    title: 'الفئات',
    href: '/manage/category-parents',
  },
  {
    title: 'الأصناف',
    href: '/manage/category-classes',
  },
  {
    title: 'السلالات',
    href: '/manage/category-breeds',
  },

  {
    title: 'الحيوانات',
    href: '/manage/animals',
  },

  {
    title: 'المزارع',
    href: '/manage/farms',
  },

  // don't needed
  // {
  //   title: 'Attachments',
  //   href: '/manage/attachments'
  // },
  // {
  //   title: 'Animal Attributes',
  //   href: '/manage/animal-attributes',
  // },
  {
    title: 'الألوان',
    href: '/manage/colors',
  },
  {
    title: 'البلدان',
    href: '/manage/countries',
  },
  {
    title: 'العروض',
    href: '/manage/display-categories',
  },
  {
    title: 'الإشعارات',
    href: '/manage/notifications',
  },
  {
    title: 'التزاوج',
    href: '/manage/pollinations',
  },
  {
    title: 'اللقاحات',
    href: '/manage/vaccinates',
  },
  {
    title: 'الفيتامينات',
    href: '/manage/vitamins',
  },
  {
    title: 'الأوزان',
    href: '/manage/weights',
  },
  {
    title: 'الشهادات',
    href: '/manage/certificates',
  },
  {
    title: 'الباقات',
    href: '/manage/features',
  },
  {
    title: 'خصائص الحيوانات',
    href: '/relationship-breaking/animals-attributes'
  },
  {
    title: 'باقات المستخدمين',
    href: '/relationship-breaking/users-features'
  },
  {
    title: 'المستخدمون',
    href: '/manage/users',
  },
  {
    title: 'الخصائص',
    href: '/manage/attributes',
  },
  {
    title: 'التقييمات',
    href: '/manage/rates',
  },
];

const approvementMenu_arr: { title: string; href: string }[] = [
  {
    title: 'الحيوانات',
    href: '/approvement/animals'
  },
  {
    title: 'الباقات',
    href: '/approvement/features'
  },
]

// const breakingMenu_arr: { title: string; href: string }[] = [
// ]


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

      <Menu.SubMenu key='sub1' title='تنظيم' icon={<SettingOutlined />}>
        {manageMenu_arr.map((el) => (
          <Menu.Item key={el.href}>
            <Link href={el.href}>{el.title}</Link>
          </Menu.Item>
        ))}
      </Menu.SubMenu>

      {/* <Menu.SubMenu key='sub2' title='ربط العلاقات' icon={<ApartmentOutlined />}>
        {breakingMenu_arr.map((el) => (
          <Menu.Item key={el.href}>
            <Link href={el.href}>{el.title}</Link>
          </Menu.Item>
        ))}
      </Menu.SubMenu> */}

      <Menu.SubMenu key='sub3' title='الموافقة' icon={<SecurityScanOutlined />}>
        {approvementMenu_arr.map((el) => (
          <Menu.Item key={el.href}>
            <Link href={el.href}>{el.title}</Link>
          </Menu.Item>
        ))}
      </Menu.SubMenu>

      <Menu.Item icon={<ContactsOutlined />} key='/contact-us-requests'>
        <Link href='/contact-us-requests'>{'طلبات الإتصال'}</Link>
      </Menu.Item>

      <Menu.SubMenu title='اللغة' icon={<TranslationOutlined />}>
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
        تسجيل الخروج
      </Menu.Item>
    </Menu>
  );
};
export default Sider;
