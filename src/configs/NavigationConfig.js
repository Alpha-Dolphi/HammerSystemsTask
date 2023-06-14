import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  PictureOutlined,
  GiftOutlined,
  TeamOutlined,
  ShopOutlined,
  MailOutlined,
  TableOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Основные',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'home-planner',
      path: `${APP_PREFIX_PATH}/home/planner`,
      title: 'Планировщик',
      icon: TableOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'home-dashboard',
      path: `${APP_PREFIX_PATH}/home/dashboard`,
      title: 'Дэшборд',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'home-catalog',
      path: `${APP_PREFIX_PATH}/home/catalog`,
      title: 'Каталог',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'home-catalog-goods',
          path: `${APP_PREFIX_PATH}/home/catalog/goods`,
          title: 'Товары',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'home-catalog-category',
          path: `${APP_PREFIX_PATH}/home/catalog/category`,
          title: 'Категории',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'home-catalog-collections',
          path: `${APP_PREFIX_PATH}/home/catalog/collections`,
          title: 'Коллекции',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'home-catalog-combo',
          path: `${APP_PREFIX_PATH}/home/catalog/combo`,
          title: 'Комбо',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'home-orders',
      path: `${APP_PREFIX_PATH}/home/orders`,
      title: 'Заказы',
      icon: ShoppingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'home-clients',
      path: `${APP_PREFIX_PATH}/home/clients`,
      title: 'Клиенты',
      icon: UserOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'home-clients-list',
          path: `${APP_PREFIX_PATH}/home/clients/list`,
          title: 'Список клиентов',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'home-clients-groups',
          path: `${APP_PREFIX_PATH}/home/clients/groups`,
          title: 'Группы клиентов',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'home-banners',
      path: `${APP_PREFIX_PATH}/home/banners`,
      title: 'Баннеры',
      icon: PictureOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'home-promo-codes',
      path: `${APP_PREFIX_PATH}/home/promo-codes`,
      title: 'Промокоды',
      icon: GiftOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'home-offline-spots',
      path: `${APP_PREFIX_PATH}/home/offline-spots`,
      title: 'Офлайн точки',
      icon: ShopOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'home-offline-spots-address',
          path: `${APP_PREFIX_PATH}/home/offline-spots/address`,
          title: 'Адреса',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'home-offline-spots-geo',
          path: `${APP_PREFIX_PATH}/home/offline-spots/geo`,
          title: 'Геозоны',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'home-employees',
      path: `${APP_PREFIX_PATH}/home/employees`,
      title: 'Сотрудники',
      icon: TeamOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'home-newsLetters',
      path: `${APP_PREFIX_PATH}/home/newsLetters`,
      title: 'Рассылки',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}]
const systemicNavTree = [{
  key: 'systemic',
  path: `${APP_PREFIX_PATH}/systemic`,
  title: 'Системные',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'systemic-settings',
      path: `${APP_PREFIX_PATH}/systemic/settings`,
      title: 'Настройки',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'systemic-mobile',
      path: `${APP_PREFIX_PATH}/systemic/mobile`,
      title: 'Мобильное приложение',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'systemic-logs',
      path: `${APP_PREFIX_PATH}/systemic/logs`,
      title: 'Логи',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}]


const navigationConfig = [
  ...dashBoardNavTree,
  ...systemicNavTree
]

export default navigationConfig;
