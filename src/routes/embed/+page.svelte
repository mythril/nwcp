<script lang="ts">
  import { errorMessage } from '$lib/components/ErrorMessageStore';
  import { detectRoleBase64 } from '$lib/engines/BitPacking';
  import { RoleRoutes } from '$lib/engines/all';

  try {
    const base64 = window.location.hash.slice(1);
    const role = detectRoleBase64(base64);
    window.location.replace(RoleRoutes[role] + '#' + base64);
  } catch (err) {
    if (err instanceof Error) {
      $errorMessage = err.message;
    }
  }
</script>
