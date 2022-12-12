<template>
  <q-card bordered class="q-ma-md">
    <q-card-section>
      <h5 class="text-h5 q-ma-none q-pa-none">{{ firmware.filename }}</h5>
      <p>Uploaded on {{ uploadDate }}</p>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="negative" @click="confirmFlashMcu('yaw', firmware.filename)"
        >Flash Yaw MCU</q-btn
      >
      <q-btn
        color="negative"
        @click="confirmFlashMcu('roll', firmware.filename)"
        >Flash Roll MCU</q-btn
      >
      <q-btn
        color="negative"
        @click="confirmFlashMcu('pitch', firmware.filename)"
        >Flash Pitch MCU</q-btn
      >
      <q-btn color="amber" @click="onDeleteFirmware(firmware.filename)">
        Delete
      </q-btn>
    </q-card-actions>
    <q-inner-loading :showing="processing">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
  <q-dialog v-model="showConfirmFlash">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Flash <strong>{{ flashingMcuName }}</strong> MCU
        </div>
      </q-card-section>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" />
        <span class="q-ml-sm">Are you sure you want to flash this MCU?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" v-close-popup />
        <q-btn
          label="Flash"
          color="negative"
          v-close-popup
          @click="flashMcu(flashingMcuName, flashingFirmware)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showWorkingDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Flashing</div>
      </q-card-section>
      <q-card-section class="row items-center">
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="lime"
          class="q-ma-md"
        />
        <span
          >Flashing {{ flashingMcuName }}. This process could take some
          time.</span
        >
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { computed, onBeforeUnmount } from 'vue';
import {
  deleteFirmware,
  FirmwareFile,
  getFlashStatus,
  flashFirmware,
} from 'src/api/firmware';
import { ref } from 'vue';

const props = defineProps<{
  firmware: FirmwareFile;
}>();

const emit = defineEmits<{
  (e: 'deleted'): void;
}>();

const processing = ref(false);
const showConfirmFlash = ref(false);
const showWorkingDialog = ref(false);

const flashingMcuName = ref('');
const flashingFirmware = ref('');

const confirmFlashMcu = (mcu: string, firmware: string) => {
  flashingMcuName.value = mcu;
  flashingFirmware.value = firmware;
  showConfirmFlash.value = true;
};

const flashMcu = async (mcu: string, firmware: string) => {
  showWorkingDialog.value = true;
  await flashFirmware(mcu, firmware);
  flashTaskPollTimer = window.setTimeout(pollFlashTaskStatus, 1000);
};

const uploadDate = computed(() => {
  const d = new Date(props.firmware.created * 1000);
  return d.toLocaleString();
});

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

let flashTaskPollTimer: number | null = null;

const pollFlashTaskStatus = async () => {
  const flashStatus = await getFlashStatus();
  if (flashStatus.finished) {
    showWorkingDialog.value = false;
    return;
  } else {
    flashTaskPollTimer = window.setTimeout(pollFlashTaskStatus, 1000);
  }
};

onBeforeUnmount(() => {
  if (flashTaskPollTimer !== null) {
    window.clearTimeout(flashTaskPollTimer);
    flashTaskPollTimer = null;
  }
});
</script>
