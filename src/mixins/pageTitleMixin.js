import {startCase} from 'lodash';

const APP_PREFIX = 'Budget Manager';

function getTitle(vm) {
  const {title} = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }

  if (!vm.$route) {
    return null;
  }

  if (vm.$route.meta?.pageTitle) {
    return vm.$route.meta.pageTitle;
  }

  return startCase(vm.$route.name);
}


export default {
  created() {
    const title = getTitle(this);
    if (title) {
      document.title = `${title} - ${APP_PREFIX}`;
    }
  },
};