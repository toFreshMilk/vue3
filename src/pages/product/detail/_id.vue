<template>
    <div id="wrapper">
    ID {{ $route.params.id }} 상세임
    </div>
</template>

<script>
export default {
    data() {
        return {
            contentBody: "",
        };
    },
    mounted() {
        console.log(this.$route.params.id);
    },
};
</script>
<style scoped>
</style>