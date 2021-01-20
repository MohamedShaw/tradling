import { AppNavigation } from '../navigation';
import { rootStore } from '../store';
import { tabs } from 'components/bottomTabs/BottomTabs';
import { Linking } from 'react-native';
// import { checkUpdate } from 'utils/dev';

export const onAppLaunch = () => {

  deebLink();

  const { user } = rootStore.getState().auth;
  if (user) {
    // authenticated
    AppNavigation.setRootScreen('home');
  } else {
    //noAuth
    AppNavigation.setRootBottomTabs(tabs);
  }

  // if (__DEV__) checkUpdate();
};

const deebLink = () => {
  const handleOpenURL = (event) => {
    const route = event.url.replace(/.*?:\/\//g, '');
    const productId = route.split('/');
    if (productId[0] === 'www.task.com') {
      const id = typeof +productId[2] === 'number' ? +productId[2] : 1
      AppNavigation.push('productDetails', {
        id: id,
        deepLink: true,
      });
    }
  };

  Linking.addEventListener('url', handleOpenURL);
};
