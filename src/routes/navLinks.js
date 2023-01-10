import {
  IconHome,
  IconMapPin,
  IconFish,
  IconCloudRain,
  IconSquarePlus,
  IconBuildingFactory2,
  IconHistoryToggle,
  IconTags,
  IconFence
  // IconForms,
  // IconFileReport,
  // IconFileUpload,
  // IconJumpRope,
  // IconAdjustments,
  // IconDevicesPc
} from '@tabler/icons';

export const navLinks = [
  { link: '/home', label: 'home', icon: IconHome },
  { link: '/geofence', label: 'geofence', icon: IconFence },
  { link: '/globalfence', label: 'globalfence', icon: IconMapPin },
  { link: '/climate', label: 'climate', icon: IconCloudRain },
  { link: '/create-new-product', label: 'create-new-product', icon: IconSquarePlus },
  { link: '/products-owned', label: 'products-owned', icon: IconBuildingFactory2 },
  { link: '/historical-products', label: 'historical-products', icon: IconHistoryToggle },
  { link: '/products-in-auction', label: 'products-in-auction', icon: IconTags },
  { link: '/predictFish', label: 'predictFish', icon: IconFish }
];
