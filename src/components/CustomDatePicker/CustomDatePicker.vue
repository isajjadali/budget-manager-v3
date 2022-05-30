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
          :disabled="isAllSelected"
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
          :disabled="isAllSelected"
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
          v-if="activeTab === TAB_NAMES.year"
          ref="yearPickerRef"
          :selected-year="selectedRange[0]"
          @yearSelect="onYearSelect"
        />
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import {format, getYear, getMonth, differenceInDays} from 'date-fns';
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
  PERSIST_DATA_PREFIX_KEY,
  KEYS_TO_PERSIST,
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
    },
    persistData: {
      type: Boolean,
      default: true,
    },
    persistDataKey: {
      type: String,
      default: 'custom_date_picker',
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
    },
    rangeDiffInDays() {
      return differenceInDays(
        new Date(this.selectedRange[1]),
        new Date(this.selectedRange[0]),
      );
    },
    localStorageKeyName() {
      return `${PERSIST_DATA_PREFIX_KEY}${this.persistDataKey}`;
    },
    isAllSelected() {
      return this.activeTab === TAB_NAMES.customRange && this.selectedRangeOption === RANGE_VALUE_MAP.all;
    }
  },
  watch: {
    selectedRange(value) {
      if (value && value.length >= 2) {
        this.setLabelToShow();
        this.persistDataIfEnabled();
      }
    }
  },
  mounted() {
    this.initRanges();
    this.setLabelToShow();
  },
  methods: {
    initRanges() {
      if (this.range && this.range.length >= 2) {
        this.selectedRangeOption = RANGE_VALUE_MAP.customRange;
        this.activeTab = TAB_NAMES.customRange;
        this.persistDataIfEnabled('activeTab', this.activeTab);
        this.selectedRange = this.range;
        return;
      }
      const savedData = this.getPersistedData();

      if (this.persistData && savedData) {
        this.activeTab = savedData.activeTab;
        this.selectedRangeOption = savedData.selectedRangeOption;
      }
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].current(new Date(), this.selectedRangeOption);
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

      if (isStartInCurrentYear && isEndInCurrentYear) {
        if (isInSameMonth) {
          this.labelToShow = `${format(startRangeDate, 'MMM dd')} - ${format(endRangeDate, 'dd')}`;
          return;
        }
        this.labelToShow = `${format(startRangeDate, 'MMM dd')} ~ ${format(endRangeDate, 'MMM dd')}`;
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
          this.labelToShow = `${format(startRangeDate, 'MMM dd')} - ${format(endRangeDate, 'dd, yyyy')}`;
        } else {
          this.labelToShow = `${format(startRangeDate, 'MMM dd')} ~ ${format(endRangeDate, 'MMM dd, yyyy')}`;
        }
      }

    },

    onTabChange(value) {
      this.activeTab = value;
    },
    onYearSelect(date) {
      this.updateSelectedRangeAndEmit(`${date}-01`);
    },
    onMonthSelect(date) {
      this.updateSelectedRangeAndEmit(`${date}-01`);
    },
    onRangeOptionChange(value) {
      this.selectedRangeOption = value;
      if (value !== RANGE_VALUE_MAP.customRange) {
        this.updateSelectedRangeAndEmit(new Date());
      }
    },
    onCustomRangeInput(value) {
      this.selectedRange = value;
    },
    onCustomRangeChange() {
      this.menu = false;
      this.$emit('change', {type: this.selectedRangeOption, range: this.selectedRange});
    },

    onNext() {
      if (this.activeTab === TAB_NAMES.customRange) {
        this.selectedRangeOption = RANGE_VALUE_MAP.customRange;
      }
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].next(
        this.selectedRange[0],
        this.rangeDiffInDays
      );
      this.$emit('change', {type: this.selectedRangeOption, range: this.selectedRange});
    },
    onPrevious() {
      if (this.activeTab === TAB_NAMES.customRange) {
        this.selectedRangeOption = RANGE_VALUE_MAP.customRange;
      }
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].previous(
        this.selectedRange[0],
        this.rangeDiffInDays
      );
      this.$emit('change', {type: this.selectedRangeOption, range: this.selectedRange});
    },
    persistDataIfEnabled() {
      if (!this.persistData) {
        return;
      }
      let savedData = this.getPersistedData() || {};
      savedData = KEYS_TO_PERSIST.reduce((acc, key) => {
        // TODO: NEED TO IMPROVE THIS CHECK
        if (this[key] === RANGE_VALUE_MAP.customRange) {
          return acc;
        }

        acc[key] = this[key];
        return acc;
      }, savedData);
      localStorage.setItem(this.localStorageKeyName, JSON.stringify(savedData));
    },
    getPersistedData() {
      return JSON.parse(
        localStorage.getItem(this.localStorageKeyName) || 'null'
      );
    },
    updateSelectedRangeAndEmit(value) {
      this.selectedRange = CALCULATE_RANGE_METHODS[this.activeTab].current(value, this.selectedRangeOption);
      this.menu = false;
      this.$emit('change', {type: this.selectedRangeOption, range: this.selectedRange});
    }
  },
};
</script>
<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>