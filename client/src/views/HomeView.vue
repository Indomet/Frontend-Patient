<script setup>

    import Navigation from '../components/Navigation.vue'
    import Homepage from '../components/Homepage.vue'
    import Ourservice from '../components/Ourservice.vue'
    import Aboutus from '../components/Aboutus.vue'
    import MapHomePage from '../components/MapHomePage.vue'
</script>

<template>
    <div>
        <Navigation></Navigation>
        <main>
            <Homepage/>
            <Ourservice/>
            <MapHomePage/>
            <Aboutus/>
        </main>
    </div>
</template>
