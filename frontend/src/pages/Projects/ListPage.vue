<template>
    <v-container>
        <ModalProjectCreate />
        <v-row>
            <v-col cols='12'>
                <ProjectList />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ModalProjectCreate from '../../components/ModalProjectCreate.vue';
import ProjectList from '../../components/ProjectList.vue'

export default {
    components: {
        ModalProjectCreate,
        ProjectList,
    },
    name: "ProjectsListPage",
};
</script>