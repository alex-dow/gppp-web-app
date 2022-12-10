<template>
  <q-btn @click="refreshFirmwares" :loading="loading" icon="sync">
    Refresh
    <template v-slot:loading>
      <q-spinner-hourglass />
    </template>
  </q-btn>
  <q-btn @click="showUploadFirmware = true">Upload Firmware</q-btn>
  <q-linear-progress query v-if="loading" />
  <firmware-card
    v-for="firmware in firmwares"
    :key="firmware.filename"
    :firmware="firmware"
    @deleted="removeFirmware(firmware)"
  />
  <q-dialog v-model="showUploadFirmware">
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Upload Firmware</q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        Select the firmware file (a .hex file) to upload
        <q-uploader url="/api/firmware/" accept=".hex" @uploaded="onUploaded" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { FirmwareFile, getFirmwares } from 'src/api/firmware';
import { ref } from 'vue';
import { QBtn, QLinearProgress, QDialog, QCard } from 'quasar';
import FirmwareCard from 'src/components/FirmwareCard.vue';

const showUploadFirmware = ref(false);
const firmwares = ref<FirmwareFile[]>([]);

const firmwareToUpload = ref();

const totalFirmwares = computed(() => {
  return firmwares.value.length;
});

const loading = ref(false);

const removeFirmware = (firmware: FirmwareFile) => {
  const idx = firmwares.value.findIndex(
    (f) => f.filename === firmware.filename
  );
  if (idx === -1) return;

  firmwares.value.splice(idx, 1);
};

const refreshFirmwares = async () => {
  loading.value = true;
  try {
    firmwares.value = await getFirmwares();
  } catch (err) {
    console.error(err);
  }
  loading.value = false;
};

const onUploaded = () => {
  showUploadFirmware.value = false;
  refreshFirmwares();
};

onBeforeMount(() => {
  refreshFirmwares();
});
</script>
