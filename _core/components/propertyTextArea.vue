<template>
	<component
		:is="tag"
		:ice-prop-bind="pid"
		ice-prop-type="text"
		v-html="text"
	>
	</component>
</template>

<script>
export default {
	props: {
		tag: {
			type: String,
			default: 'div',
		},
		pid: {
			type: String,
		},

		text: {
			type: String,
		},
	},
}
</script>
