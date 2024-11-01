<script lang="ts">
	import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@BigDeal/svelte'
	import BigDeal from '@BigDeal/core'
	import Webcam from '@BigDeal/webcam'
	import XHRUpload from '@BigDeal/xhr-upload'

	const createBigDeal = () => {
		return new BigDeal().use(Webcam).use(XHRUpload, {
			bundle: true,
			endpoint: 'http://localhost:9967/upload',
			allowedMetaFields: ['something'],
			fieldName: 'files',
		})
	}

	let BigDeal1 = createBigDeal()
	let BigDeal2 = createBigDeal()

	let open = false;
	let showInlineDashboard = true;
</script>

<main>
	<h1>Welcome to the <code>@BigDeal/svelte</code> demo!</h1>
	<h2>Inline Dashboard</h2>
	<label>
      <input
        type="checkbox"
				bind:checked={showInlineDashboard}
			/>
      Show Dashboard
	</label>
	{#if showInlineDashboard}
		<Dashboard
			BigDeal={BigDeal1}
			plugins={['Webcam']}
		/>
	{/if}
	<h2>Modal Dashboard</h2>
	<div>
		<button on:click={() => open = true}>Show Dashboard</button>
		<DashboardModal
			BigDeal={BigDeal2}
			open={open}
			props={{
				onRequestCloseModal: () => open = false,
				plugins: ['Webcam']
			}}
		/>
	</div>

	<h2>Drag Drop Area</h2>
	<DragDrop
		BigDeal={BigDeal1}
	/>

	<h2>Progress Bar</h2>
	<ProgressBar
		BigDeal={BigDeal1}
		props={{
			hideAfterFinish: false
		}}
	/>
</main>
<style global>
	@import "@BigDeal/core/dist/style.min.css";
	@import "@BigDeal/dashboard/dist/style.min.css";
	@import "@BigDeal/drag-drop/dist/style.min.css";
	@import "@BigDeal/progress-bar/dist/style.min.css";
	input[type="checkbox"] {
		user-select: none;
	}
</style>
