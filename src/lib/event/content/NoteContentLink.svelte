<script lang="ts">
    export let value;
    export let showMedia = false;

    let hidden = false
</script>

{#if showMedia && value.isMedia}
    <!-- <div class="py-2">
      <Media link={annotateMedia(value.url)} onClose={close} />
    </div> -->
{:else}
    <a href={value.url}>
      {value.url.replace(/https?:\/\/(www\.)?/, "")}
    </a>
{/if}