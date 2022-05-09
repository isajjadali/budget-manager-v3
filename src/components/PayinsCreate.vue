<template>
  <div>
    <v-row>
      <v-card width="100%">
        <v-card-title>
          <span class="text-h5 pa-3"><b> Create Payins </b></span>
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
                  v-model="newPayin.amount"
                  label="Amount"
                  :rules="[rules.required]"
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
                      v-model="newPayin.date"
                      label="Enter Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="newPayin.date"
                    @input="menu2 = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="newPayin.projectId"
                  :items="projects"
                  item-text="name"
                  item-value="id"
                  label="Select Project"
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
  name: 'PayinsCreate',
  props: ['projects'],
  data: () => ({
    newPayin: {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    rules: {
      required: (value) => !!value || 'Required.',
    },
    dateMenu: false,
  }),
  methods: {
    onSave() {
      console.log(this.newPayin);
      this.$emit('save', this.newPayin);
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
