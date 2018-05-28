<template>
    <div class="warp">
        <addForm btn-text="添加环境" my-title="添加环境" :items="items" :url="url" @onsuccess="loadList"></addForm>
        <mytable :table-data="tableData" part="环境管理" api="/recon/check/console/rancher/environment" :show-action="false"></mytable>
    </div>
</template>

<script>
	import mytable from "../../area/componets/talbels";
	import addForm from "../../common/add_form";

	export default {
		name: "evnset",
		components: {mytable, addForm},
		data() {
			return {
				tableData: [],
				items: [
					{key: 'name', label: '名称', required:true},
					{key: 'description', label: '描述', required:true},
				],
                url:'/recon/check/console/rancher/environment'
			}
		},
		methods: {
			loadList() {
				let _this = this;
				this.$root.ax("/recon/check/console/rancher/environment", "get", null).then(function (r) {
					console.log(r)
					_this.tableData = r.data;
				}, function (e) {
					this.$message.error(e.message)
				})
			}
		},
		mounted() {
			this.loadList()
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .warp {
        padding: 10px;
    }

</style>
