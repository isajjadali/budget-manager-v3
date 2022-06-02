<template>
  <v-container>
    <v-row>
      <v-card 
        width="100%" 
        @click="cardClicked"
      >
        <v-row class="ma-0 pa-0">
          <v-col cols="12" sm="5" md="2">
            <v-avatar 
              color="grey lighten-2" 
              size="48"
            >
              <v-icon> 
                mdi-account-circle 
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col class="pt-3" cols="12" sm="6" md="8">
            <h3>
              {{ employee.fullName }}
            </h3>
            <caption>
              {{ employee.email }}
            </caption>
          </v-col>
          <v-col 
            class="d-flex justify-end" 
            cols="12" 
            sm="1" 
            md="2"
          >
            <DropDownMenu 
              @onActionSelected="onActionSelected" 
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="px-5">
          <v-col cols="12" md="5" class="py-5">
            <v-row>
              <v-col cols="12" class="d-flex justify-start pb-0">Balance</v-col>
              <v-col cols="12" class="d-flex justify-start pt-0">
                <p class="amount-font ma-0">
              <b> 
                {{ CURRENCY_SYMBOL }} 
              </b> 
              <span>{{ employee.balance }}</span>
            </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-center justify-center">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col cols="12" md="5" class="py-5">
            <v-row>
              <v-col cols="12" class="d-flex justify-end pb-0">Rate</v-col>
              <v-col cols="12" class="d-flex justify-end pt-0">
                <p class="amount-font ma-0">
                  <b> 
                    {{ CURRENCY_SYMBOL }} 
                  </b> 
                  <span>{{ employee.rate }}</span>
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mx-1" v-show="false">
          <v-col cols="12" sm="5" md="5">
            <span> 
              Balance 
            </span>
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-center justify-center pb-0">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col 
            class="d-flex justify-end" 
            cols="12" 
            sm="5" 
            md="5"
          >
            <span> 
              Rate 
            </span>
          </v-col>
        </v-row>
        <v-row class="mx-1 mt-0" v-show="false">
          <v-col cols="12" sm="5" md="5">
            <p class="amount-font">
              <b> 
                {{ CURRENCY_SYMBOL }} 
              </b> 
              <span>{{ employee.balance }}</span>
            </p>
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-center justify-center pt-0">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col class="d-flex justify-end" cols="12" sm="6" md="5">
            <p class="amount-font">
              <b> 
                {{ CURRENCY_SYMBOL }} 
              </b> 
              <span> {{ employee.rate }} </span>
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0">
          <v-col class="d-flex justify-center">
            <v-btn
              text
              color="light-blue"
              @click="activityButtonClick(); reveal = true;"
            >
              Activities
            </v-btn>
          </v-col>
        </v-row>
        <ConfirmationModal
          :toggleDialog="toggleConfirmationModal"
          @cancel="onCancel"
          @delete="onDelete"
        />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import DropDownMenu from "./DropDownMenu.vue";
import ConfirmationModal from "./ConfirmationModal.vue";
import { CURRENCY_SYMBOL } from "@/enums";

export default {
  name: "EmployeeCard",
  props: {
    employee: {
      type: Object,
    },
  },
  data: () => {
    return {
      toggleConfirmationModal: false,
      CURRENCY_SYMBOL,
    };
  },
  methods: {
    onActionSelected(action) {
      if (action == "Edit") {
        this.$emit("editEmployee", this.employee);
      } else {
        this.toggleConfirmationModal = true;
        this.$emit("deleteEmployee", this.employee);
      }
    },
    activityButtonClick() {
      this.$emit("activityLink", this.employee);
    },
    cardClicked() {
      this.$emit("editEmployee", this.employee);
    },
    onCancel() {
      this.toggleConfirmationModal = false;
    },
    onDelete() {
      this.toggleConfirmationModal = false;
      this.$emit("delete", this.employee);
    },
  },
  components: {
    DropDownMenu,
    ConfirmationModal,
  },
};
</script>

<style lang='scss'>
.amount-font {
  b {
    font-size: 18px;
  }
  span{
    font-size: 24px;
  }
}
</style>