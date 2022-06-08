<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="5" >
        <v-card width="100%">
          <v-card-title>
            Details
          </v-card-title>
          <v-divider></v-divider>
          <v-row class="pa-4">
          <v-col cols="12" sm="" md="6">
            <span> Project Name </span>  <h2 class="pt-0"> Project Building </h2>
          </v-col>
          <v-col cols="12" sm="" md="6">
            <span> Client Email </span>  <h2 class="pt-0">client@mail.com </h2>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <span> Address </span>  <h2 class="pt-0"> G-99 Model Town </h2>
          </v-col>
        </v-row>
        
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="5">
        <v-card width="100%" >
          <v-card-title> Duration</v-card-title>
          <v-divider></v-divider>
          <v-row class="pa-4">
          <v-col cols="12" sm="6" md="6">
            <span> Start Date </span>  <h2 class="pt-0"> 2022-06-12 </h2>
          </v-col>
          <v-col cols="8" sm="6" md="6">
            <span> Expected End Date </span>  <h2 class="pt-0"> 2022-06-20 </h2>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <span> Days Left </span>  <h2 class="pt-0"> 20 Days </h2>
          </v-col>
        </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-row>
          
          <v-col cols="12" sm="3" md="5">
            <v-card width="100%" class="h-amount">

              <v-row class="pa-2 pt-0">
                <v-col cols="12" md="6">
                  <span class="head"> Total Cost </span>
                </v-col>
                <v-col cols="12" md="6" class="d-flex justify-end">
                  <h2> 100000</h2>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="px-2 pt-3">
                <v-col cols="12" md="7">
                  <span class="subHeading"> Total Material Cost </span>
                </v-col>
                <v-col cols="12" md="5" class="d-flex justify-end">
                  <h3> {{ CURRENCY_SYMBOL }} 3443</h3>
                </v-col>
              </v-row>
              <v-row class="px-2 my-0">
                <v-col cols="12" md="7">
                  <span class="subHeading"> Total Labour Cost </span>
                </v-col>
                <v-col cols="12" md="5" class="d-flex justify-end">
                  <h3> {{ CURRENCY_SYMBOL }} 3443</h3>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {CURRENCY_SYMBOL} from '@/enums';

export default {
  data: () => {
    return {
      CURRENCY_SYMBOL,
    };
  },
}
</script>

<style lang='scss'>
.amount-font {
  b {
    font-size: 18px;
  }
}
.head{
    font-size: 23px;
}
.subHeading {
  font-size: 15px;
}
.h-amount {
  border: 1px solid;
  // margin: 2%;
  // height: 70px;
  border-radius: 10px;
  color: white;
  background: linear-gradient(286deg, #00aeff, #0095ff 46%, #0076ff);
}

.ps {
  font-size: 12px;
  margin-bottom: unset !important;
}
</style>