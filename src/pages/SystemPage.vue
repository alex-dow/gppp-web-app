<template>
  <q-card>
    <q-card-section>
      <h5>System Actions</h5>
      <p>Perform various OS-level actions</p>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-btn color="negative" @click="requestReboot">Reboot</q-btn>
      <q-btn color="primary">Update System</q-btn>
    </q-card-actions>
  </q-card>
  <q-dialog v-model="showRebootDialog">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="dangerous" color="negative" />
        <span>Are you sure you want to reboot?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="No" color="primary" v-close-popup />
        <q-btn
          label="Reboot"
          color="negative"
          v-close-popup
          @click="doReboot"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showRebootingDialog">
    <q-card>
      <q-card-section> Rebooting </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import {
  QAvatar,
  QDialog,
  QCard,
  QCardActions,
  QSeparator,
  QCardSection,
} from 'quasar';
import { ref } from 'vue';

const showRebootDialog = ref(false);
const showRebootingDialog = ref(false);

const requestReboot = () => {
  showRebootDialog.value = true;
};

const doReboot = () => {
  showRebootingDialog.value = true;
};
</script>
