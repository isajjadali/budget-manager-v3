<template>
  <div>
    <v-row
      class="ma-6 pa-3"
      justify="center"
    >
      <v-card width="960px">
        <v-card-title>
          <span class="text-h5 pa-3"><b> Update Payins </b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                class="ma-3"
              >
                <v-text-field
                  v-model="payin.amount"
                  label="Amount"
                  :rules="[rules.required]"
                  value=""
                  prefix="$"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                class="ma-3"
              >
                <v-menu
                  v-model="dateMenu"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="payin.date"
                      label="Enter Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="payin.date"
                    @input="menu2 = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="payin.projectId"
                  :items="projects"
                  item-text="name"
                  item-value="id"
                  label="Select Projects"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="onCancel"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="onSave"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PayinsUpdate',
  props: {
    payin: {
      type: Object,
      required: true,
      endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    projects: [],
  },
  data: () => ({
    dateMenu: false,
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  methods: {
    onSave() {
      this.$emit('save', this.payin);
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
