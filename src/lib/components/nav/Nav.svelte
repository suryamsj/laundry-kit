<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
    Modal,
    Button,
  } from "flowbite-svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let popupModal = false;
  export let user;
</script>

<Modal bind:open={popupModal} size="sm" autoclose outsideclose>
  <div class="text-center">
    <svg
      aria-hidden="true"
      class="mx-auto mb-4 w-14 h-14 text-yellow-300 dark:text-yellow-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Yakin ingin keluar?
    </h3>
    <Button on:click={() => goto("/logout")} color="red" class="mr-2"
      >Ya, yakin!</Button
    >
    <Button color="alternative">Tidak</Button>
  </div>
</Modal>
<Navbar let:hidden let:toggle>
  <NavBrand href="/home">
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Laundry Kit</span
    >
  </NavBrand>
  <div class="flex items-center md:order-2 gap-4">
    <Avatar id="avatar-menu" src="/images/profile.png" class="cursor-pointer" />
    <NavHamburger
      on:click={toggle}
      class1="w-full md:flex md:w-auto md:order-1"
    />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">{user.name}</span>
    </DropdownHeader>
    <DropdownItem href="/profile">Profile</DropdownItem>
    <DropdownDivider />
    <DropdownItem on:click={() => (popupModal = true)}>Keluar</DropdownItem>
  </Dropdown>
  <NavUl {hidden}>
    <NavLi
      href="/package"
      active={$page.url.pathname.startsWith("/package") ? true : false}
      >Paket</NavLi
    >
    <NavLi
      href="/costumer"
      active={$page.url.pathname.startsWith("/costumer") ? true : false}
      >Pelanggan</NavLi
    >
    <NavLi
      href="/transaction"
      active={$page.url.pathname.startsWith("/transaction") ? true : false}
      >Transaksi</NavLi
    >
  </NavUl>
</Navbar>
