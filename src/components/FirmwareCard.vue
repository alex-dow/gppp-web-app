<template>
  <q-card bordered class="q-ma-md">
    <q-card-section>
      <strong>Filename: </strong>{{ firmware.filename }}
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="negative">Flash Firmware</q-btn>
      <q-btn color="amber" @click="onDeleteFirmware(firmware.filename)">
        Delete
      </q-btn>
    </q-card-actions>
    <q-inner-loading :showing="processing">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>
<script lang="ts" setup>
import { deleteFirmware, FirmwareFile } from 'src/api/firmware';
import { ref } from 'vue';

const props = defineProps<{
  firmware: FirmwareFile;
}>();

const emit = defineEmits<{
  (e: 'deleted'): void;
}>();

const processing = ref(false);

const onDeleteFirmware = async (filename: string) => {
  try {
    processing.value = true;
    await deleteFirmware(filename);
    emit('deleted');
  } catch (err) {
    console.error(err);
  }
  processing.value = false;
};
</script>
