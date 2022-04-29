<template>
    <v-container>
        <ModalEmployeeCreate />
        <v-row>
            <v-col cols='12'>
                <EmployeeList />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ModalEmployeeCreate from '../../components/ModalEmployeeCreate.vue';
import EmployeeList from '../../components/EmployeeList.vue'

export default {
    name: "EmployeesListPage",
    components: {
        ModalEmployeeCreate,
        EmployeeList,
    },
};
</script>