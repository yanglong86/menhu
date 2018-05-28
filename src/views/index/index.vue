<template>
    <div>
        <sider-bar></sider-bar>
        <el-row>
            <el-col :xs="24" :sm="6" :md="6" :lg="4" :xl="4" style="padding: 15px;">
                <nav-sidebar></nav-sidebar>
            </el-col>
            <el-col :xs="24" :sm="18" :md="18" :lg="20" :xl="20" style="padding: 15px">
                <router-view></router-view>
            </el-col>
        </el-row>

    </div>
</template>

<script>
	import siderBar from "./common/sider_bar"
	import navSidebar from "./common/nav_sidebar"

	export default {
		name: "index",
		components: {siderBar,navSidebar},
		data() {
			return {}
		},
		methods: {},
		mounted() {
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>

</style>
