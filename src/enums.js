
export const CURRENCY_SYMBOL = '£';
export const ActivityType = {
  labour: 'LABOUR',
  material: 'MATERIAL',
  payin: 'PAYINS'
}

export const ActivityTypeMap = {
  [ActivityType.labour] : {
    label: 'Labour', 
    value: ActivityType.labour, 
    icon: 'mdi-check-all'
  },
  [ActivityType.material]  : {
    label: 'Material', 
    value: ActivityType.material, 
    icon: 'mdi-cart-plus'
  },
  [ActivityType.payin] : {
    label: 'Payins', 
    value: ActivityType.payin, 
    icon: 'mdi-cash'
  },
};
export const ActivityTypeList = Object.values(ActivityTypeMap); 
export const ProjectStatus = {
  draft: 'DRAFT',
  pendingReview: 'PENDINGREVIEW',
  onGoing: 'ONGOING',
  completed: 'COMPLETED',
};

export default {
  CURRENCY_SYMBOL,
  ActivityType,
  ActivityTypeList,
  ActivityTypeMap,
  ProjectStatus,
};
