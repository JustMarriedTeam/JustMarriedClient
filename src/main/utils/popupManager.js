import extend from 'lodash/extend';
import pick from 'lodash/pick';
import get from 'lodash/get';
import map from 'lodash/map';
import keys from 'lodash/keys';
import store from '../core/store';


const defaultPopupSpec = {
  width: 300,
  height: 300,
  modal: 'yes',
  alwaysRaised: 'yes',
  status: 'no',
  resizable: 'yes',
  toolbar: 'no',
  menubar: 'no',
  scrollbars: 'no',
  location: 'no',
  directories: 'no',
};

function parseStaticConfig(popupSpec) {
  const staticProps = pick(popupSpec, 'modal', 'alwaysRaised', 'status', 'resizable',
    'toolbar', 'menubar', 'scrollbars', 'location', 'directories');
  return map(keys(staticProps), (name) => `${name}=${popupSpec[name]}`).join(',');
}

function openInPopup(url, customSpec) {
  const popupSpec = extend({}, defaultPopupSpec, customSpec);

  const leftPosition = (window.screen.width / 2) - ((popupSpec.width / 2) + 10);
  const topPosition = (window.screen.height / 2) - ((popupSpec.height / 2) + 50);

  function appendTokenIfPresent() {
    const token = get(store.getState(), 'account.token');
    return token ? `&token=${token}` : '';
  }

  return new Promise((resolve) => {
    window.open(`${url}?redirectTo=/redirect.html` + appendTokenIfPresent(), '_blank',
      `${parseStaticConfig(popupSpec)},left=${leftPosition},
        top=${topPosition},screenX=${leftPosition},screenY=${topPosition}`
    );
    window.retrieveAuthentication = (token) => {
      resolve(token);
      delete window.retrieveAuthentication;
    };
  });
}

export { openInPopup };
