<template>
    <p v-if="!currentProject"> <b>Invalid ID </b></p>
    <ProjectEdit @project-save="onProjectSave" v-else :project="currentProject" />
</template>

<script>
import { mapState } from "vuex";
import ProjectEdit from '../../components/ProjectEdit.vue';

export default {
    name: "UpdatePage",
    components: {
        ProjectEdit
    },
    computed: {
        ...mapState('global', ['projects']),
        currentProject() {
            const id = this.$route.params.id;
            if (id) {
                const project = this.projects.find((project) => project.id === +id) 
                return project
            }
            return null;
        }
    },
    methods: {
        onProjectSave(project) {
        },
    },
};
</script>
