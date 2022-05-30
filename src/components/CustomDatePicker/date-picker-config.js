import {
  format,
  addDays,
  subDays,
  addMonths,
  subMonths,
  endOfMonth,
  startOfMonth,
  startOfYear,
  endOfYear,
  addYears,
  subYears,
} from 'date-fns';

export const DEFAULT_RANGE = [
  format(startOfMonth(new Date()), 'yyyy-MM-dd'),
  format(endOfMonth(new Date()), 'yyyy-MM-dd'),
];

export const TAB_NAMES = {
  customRange: 'range',
  year: 'year',
  month: 'month',
};
export const DEFAULT_ACTIVE_TAB = TAB_NAMES.year;
export const AVAILABLE_TABS = [
  {
    id: TAB_NAMES.customRange,
    value: TAB_NAMES.customRange,
    label: 'Range',
  },
  {
    id: TAB_NAMES.month,
    value: TAB_NAMES.month,
    label: 'Month',
  },
  {
    id: TAB_NAMES.year,
    value: TAB_NAMES.year,
    label: 'Year',
  },
];

export const RANGE_VALUE_MAP = {
  sevenDays: 7,
  thirtyOneDays: 31,
  ninetyDays: 90,
  aYear: 365,
  all: 'all',
  customRange: 'custom-range'
};
export const DEFAULT_SELECTED_RANGE_OPTION = RANGE_VALUE_MAP.sevenDays;
export const RANGE_LABEL_MAP = {
  [RANGE_VALUE_MAP.thirtyOneDays]: 'Last 31 days',
  [RANGE_VALUE_MAP.sevenDays]: 'Last 7 days',
  [RANGE_VALUE_MAP.ninetyDays]: 'Last 90 days',
  [RANGE_VALUE_MAP.aYear]: '12 months',
  [RANGE_VALUE_MAP.all]: 'All',
};
export const RANGE_OPTIONS = [
  {
    id: RANGE_VALUE_MAP.sevenDays,
    value: RANGE_VALUE_MAP.sevenDays,
    label: RANGE_LABEL_MAP[RANGE_VALUE_MAP.sevenDays],
  },
  {
    id: RANGE_VALUE_MAP.thirtyOneDays,
    value: RANGE_VALUE_MAP.thirtyOneDays,
    label: RANGE_LABEL_MAP[RANGE_VALUE_MAP.thirtyOneDays],
  },
  {
    id: RANGE_VALUE_MAP.ninetyDays,
    value: RANGE_VALUE_MAP.ninetyDays,
    label: RANGE_LABEL_MAP[RANGE_VALUE_MAP.ninetyDays],
  },
  {
    id: RANGE_VALUE_MAP.aYear,
    value: RANGE_VALUE_MAP.aYear,
    label: RANGE_LABEL_MAP[RANGE_VALUE_MAP.aYear],
  },
  {
    id: RANGE_VALUE_MAP.all,
    value: RANGE_VALUE_MAP.all,
    label: RANGE_LABEL_MAP[RANGE_VALUE_MAP.all],
  },
  {
    id: RANGE_VALUE_MAP.customRange,
    value: RANGE_VALUE_MAP.customRange,
    label: 'Custom Range',
  },
];

export const PERSIST_DATA_PREFIX_KEY = 'custom_date_picker:';
export const KEYS_TO_PERSIST = ['selectedRangeOption', 'activeTab'];

function calculateMonthRange(date) {
  const monthDate = startOfMonth(new Date(date));
  return [
    format(monthDate, 'yyyy-MM-dd'),
    format(endOfMonth(monthDate), 'yyyy-MM-dd')
  ];
}

function calculateNextMonthRange(date) {
  const nextMonthDate = addMonths(new Date(date), 1);
  return calculateMonthRange(nextMonthDate);
}

function calculatePreviousMonthRange(date) {
  const previousMonthDate = subMonths(new Date(date), 1);
  return calculateMonthRange(previousMonthDate);
}

function calculateYearRange(date) {
  const yearDate = startOfYear(new Date(date));
  return [
    format(yearDate, 'yyyy-MM-dd'),
    format(endOfYear(yearDate), 'yyyy-MM-dd')
  ];
}

function calculateNextYearRange(date) {
  const nextYearDate = addYears(new Date(date), 1);
  return calculateYearRange(nextYearDate);
}

function calculatePreviousYearRange(date) {
  const previousYearDate = subYears(new Date(date), 1);
  return calculateYearRange(previousYearDate);
}

function calculateCustomRange(date = new Date(), days) {
  const customDate = new Date(date);
  return [
    format(customDate, 'yyyy-MM-dd'),
    format(addDays(customDate, days), 'yyyy-MM-dd')
  ];
}

function calculateCurrentCustomRange(date = new Date(), daysOrType) {
  if (daysOrType === RANGE_VALUE_MAP.all) {
    return [
      format(startOfYear(subYears(new Date(), 10)), 'yyyy-MM-dd'),
      format(endOfYear(addYears(new Date(), 100)), 'yyyy-MM-dd')
    ];
  }
  const startCustomDate = subDays(new Date(date), daysOrType);
  return calculateCustomRange(startCustomDate, daysOrType);
}

function calculateNextCustomRange(date = new Date(), days) {
  const customDate = new Date(date);
  return calculateCustomRange(addDays(customDate, days + 1), days);
}

function calculatePreviousPreviousRange(date = new Date(), days) {
  const customDate = new Date(date);
  return calculateCustomRange(subDays(customDate, days + 1), days);
}

export const CALCULATE_RANGE_METHODS = {
  [TAB_NAMES.month]: {
    next: calculateNextMonthRange,
    previous: calculatePreviousMonthRange,
    current: calculateMonthRange
  },
  [TAB_NAMES.year]: {
    next: calculateNextYearRange,
    previous: calculatePreviousYearRange,
    current: calculateYearRange
  },
  [TAB_NAMES.customRange]: {
    next: calculateNextCustomRange,
    previous: calculatePreviousPreviousRange,
    current: calculateCurrentCustomRange,
  }
};


