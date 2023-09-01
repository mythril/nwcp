<script lang="ts">
  import { Role } from '$lib/engines/all';
  import { role } from '../+layout.svelte';

  $role = Role.VaultDweller;
</script>

{$role}
