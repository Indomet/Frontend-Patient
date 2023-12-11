<script setup>

    import Navigation from '../components/Navigation.vue'
    import Homepage from '../components/Homepage.vue'
    import Ourservice from '../components/Ourservice.vue'
    import Aboutus from '../components/Aboutus.vue'
    import Openstreetmap from '../components/Openstreetmap.vue'
</script>

<template>
    <div>
        <Navigation></Navigation>
        <main>
            <Homepage/>
            <Ourservice/>
            <Openstreetmap/>
            <Aboutus/>
        </main>
    </div>
</template>
