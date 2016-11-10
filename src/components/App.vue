<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <Sidebar></Sidebar>
        <main class="mdl-layout__content">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
    components: {
        Sidebar
    }
}
</script>