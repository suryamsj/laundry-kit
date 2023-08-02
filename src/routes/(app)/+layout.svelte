<script>
    import Nav from "$lib/components/nav";

    export let data;

    $: ({ user } = data);
</script>

<main class="relative">
    <Nav {user} />
    <div class="container mx-auto my-6 max-sm:px-3">
        <slot />
    </div>
</main>
