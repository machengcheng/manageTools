<template>
    <section class="network-list-default-section">
        <div class="box-title">网域列表</div>
    </section>
</template>

<script>
	export default {
		name: "network-list-default",
		components: {},
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss">
    .network-list-default-section {
        padding: 18px 15px;
        margin: 15px 0;
        background-color: #fff;
        .box-title {
            height: 48px;
            line-height: 48px;
            padding-left: 15px;
            color: #606266;
            border: 1px solid #e4e7ed;
            background-color: #f5f7fa;
        }
        .box-operate {
            padding: 10px 0 10px 15px;
        }
        .box-content {
            padding: 0 0 20px 15px;
        }
    }
</style>
