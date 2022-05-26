<template>
  <v-menu
    ref="menuRef"
    v-model="menu"
    :close-on-content-click="false"
    offset-y
    max-width="380px"
    nudge-bottom="5"
  >
    <template #activator="{ on, attrs }">
      <div
        style="width: 100%"
        class="d-flex align-center"
      >
        <v-btn
          dark
          small
          icon
          color="secondary"
          @click="onPrevious"
        >
          <v-icon dark>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-text-field
          v-bind="attrs"
          :value="labelToShow"
          solo
          readonly
          class="centered-input"
          hide-details
          append-icon="mdi-menu-down"
          @click:append="menu = !menu"
          v-on="on"
        />
        <v-btn
          dark
          small
          icon
          color="secondary"
          @click="onNext"
        >
          <v-icon dark>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </div>
    </template>
    <v-card class="mx-auto pa-4">
      <div
        style="width: 100%;"
        class="d-flex justify-center"
      >
        <CustomDatePickerTabs
          :active-tab="activeTab"
          @change="onTabChange"
        />
      </div>
      <div
        class="mt-5"
        :class="{'d-flex justify-center': activeTab !== TAB_NAMES.customRange}"
      >
        <CustomDatePickerRange
          v-if="activeTab === TAB_NAMES.customRange"
          :selected-range-option="selectedRangeOption"
          :range="selectedRange"
          @rangeOptionChange="onRangeOptionChange"
          @customRangeInput="onCustomRangeInput"
          @customRangeChange="onCustomRangeChange"
        />
        <CustomDatePickerMonth
          v-if="activeTab === TAB_NAMES.month"
          :selected-month="selectedMonth"
          @monthSelect="onMonthSelect"
        />
        <CustomDatePickerYear
          v-show="activeTab === TAB_NAMES.year"
          ref="yearPickerRef"
          :selected-year="selectedRange[0]"
          @yearSelect="onYearSelect"
        />
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import {format, getYear, getMonth} from 'date-fns';
import CustomDatePickerMonth from './CustomDatePickerMonth';
import CustomDatePickerYear from './CustomDatePickerYear';
import CustomDatePickerRange from './CustomDatePickerRange';
import CustomDatePickerTabs from './CustomDatePickerTabs';
import {
  RANGE_LABEL_MAP,
  DEFAULT_ACTIVE_TAB,
  DEFAULT_SELECTED_RANGE_OPTION,
  DEFAULT_RANGE,
  TAB_NAMES,
  RANGE_VALUE_MAP,
  CALCULATE_RANGE_METHODS,
} from './date-picker-config';

export default {
  name: 'CustomDatePicker',
  components: {
    CustomDatePickerMonth,
    CustomDatePickerYear,
    CustomDatePickerRange,
    CustomDatePickerTabs,
  },
  props: {
    range: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data: () => ({
    activeTab: DEFAULT_ACTIVE_TAB,
    selectedRangeOption: DEFAULT_SELECTED_RANGE_OPTION,
    selectedRange: DEFAULT_RANGE,
    TAB_NAMES,
    menu: false,
    labelToShow: ''
  }),
  computed: {
    selectedMonth() {
      const [year, month] = this.selectedRange[0].split('-');
      return `${year}-${month}`;
    }
  },
  watch: {
    menu(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.yearPickerRef.$refs.picker.internalActivePicker = 'YEAR';
        }, 0);

      }
    },
    selectedRange(value) {
      if (value && value.length >= 2) {
        this.setLabelToShow();
      }
    }
  },
  mounted() {
    this.initRanges();
    this.setLabelToShow();
  },
  methods: {
    onTabChange(value) {
      this.activeTab = value;
    },
    onYearSelect(date) {
      this.$refs.menuRef.save(`${date}-01`);
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].current(`${date}-01`);
      this.menu = false;
    },
    onMonthSelect(date) {
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].current(`${date}-01`);
      this.menu = false;
    },
    onRangeOptionChange(value) {
      this.selectedRangeOption = value;
      if (value !== RANGE_VALUE_MAP.customRange) {
        this.menu = false;
        this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].current(new Date(), value);
      }
    },
    onCustomRangeInput(value) {
      this.selectedRange = value;
    },
    onCustomRangeChange() {
      this.menu = false;
    },
    setLabelToShow() {
      const currentDate = new Date();
      const startRangeDate = new Date(this.selectedRange[0]);
      if (this.activeTab === TAB_NAMES.year) {
        this.labelToShow = format(startRangeDate, 'yyyy');
        return;
      }
      if (this.activeTab === TAB_NAMES.month) {
        let monthLabel = 'MMM';
        if (getYear(currentDate) !== getYear(startRangeDate)) {
          monthLabel = 'MMM, yyyy';
        }
        this.labelToShow = format(startRangeDate, monthLabel);
        return;
      }
      if (RANGE_LABEL_MAP[this.selectedRangeOption]) {
        this.labelToShow = RANGE_LABEL_MAP[this.selectedRangeOption];
        return;
      }

      const endRangeDate = new Date(this.selectedRange[1]);
      const isStartInCurrentYear = getYear(currentDate) === getYear(startRangeDate);
      const isEndInCurrentYear = getYear(currentDate) === getYear(endRangeDate);
      const isInSameYear = getYear(startRangeDate) === getYear(endRangeDate);
      const isInSameMonth = getMonth(startRangeDate) === getMonth(endRangeDate);
      if (isStartInCurrentYear && isEndInCurrentYear && isInSameYear && isInSameMonth) {
        this.labelToShow = `${format(startRangeDate, 'MMM dd')} - ${format(endRangeDate, 'dd')}`;
        return;
      }
      if (isStartInCurrentYear && !isEndInCurrentYear) {
        this.labelToShow = `${format(startRangeDate, 'MMM dd')} ~ ${format(endRangeDate, 'MMM dd, yyyy')}`;
        return;
      }

      if (!isStartInCurrentYear && isEndInCurrentYear) {
        this.labelToShow = `${format(startRangeDate, 'MMM dd, yyyy')} ~ ${format(endRangeDate, 'MMM dd')}`;
        return;
      }

      if (!isInSameYear) {
        this.labelToShow = `${format(startRangeDate, 'MMM dd, yyyy')} ~ ${format(endRangeDate, 'MMM dd, yyyy')}`;
        return;
      }
      
      if (isInSameYear) {
        if (isInSameMonth) {
          this.labelToShow = `${format(startRangeDate, 'MMM dd')} - ${format(endRangeDate, ' dd, yyyy')}`;
        } else {
          this.labelToShow = `${format(startRangeDate, 'MMM dd')} ~ ${format(endRangeDate, 'MMM dd, yyyy')}`;
        }
      }

    },
    onNext() {
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].next(
        this.selectedRange[0],
        this.selectedRangeOption
      );
    },
    onPrevious() {
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].previous(
        this.selectedRange[0],
        this.selectedRangeOption
      );
    },
    initRanges() {
      if (this.range && this.range.length >= 2) {
        this.selectedRangeOption = RANGE_VALUE_MAP.customRange;
        this.activeTab = TAB_NAMES.customRange;
        this.selectedRange = this.range;
        return;
      }
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].current(new Date(), this.selectedRangeOption);
    }
  },
};
</script>
