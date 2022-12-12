<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-card style="max-width: 50%">
        <q-card-section>
          <h5 class="text-h6 q-ma-none">GPIO Configuration</h5>
          <q-list>
            <q-item-label header>GPIO Configuration</q-item-label>

            <q-item tag="label">
              <q-item-section> Pitch MCU - SWCLK </q-item-section>
              <q-item-section>
                <q-input
                  v-model="gpioConfig.gpio_pitch_mcu_swclk"
                  type="number"
                  filled
                  dense
                />
              </q-item-section>
            </q-item>
          </q-list>

          <div class="row items-center">
            <strong>Pitch MCU - SWCLK GPIO</strong>
            <q-input
              v-model="gpioConfig.gpio_pitch_mcu_swclk"
              type="number"
              dense
            />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { QForm, QInput } from 'quasar';
import { ref, reactive } from 'vue';

interface SettingsSection {
  label: string;
  settings: SettingsItem[];
}

interface SettingsItem {
  label: string;
  hint?: string;
  rules?: any[];
  type?: string;
}

const settings: SettingsSection[] = [
  {
    label: 'GPIO Configuration',
    settings: [
      {
        label: 'Pitch MCU - SWCLK',
        type: 'number',
      },
      {
        label: 'Pitch MCU - SWDIO',
        type: 'number',
      },
      {
        label: 'Roll MCU - SWCLK',
        type: 'number',
      },
      {
        label: 'Roll MCU - SWDIO',
        type: 'number',
      },
      {
        label: 'Yaw MCU - SWCLK',
        type: 'number',
      },
      {
        label: 'Yaw MCU - SWDIO',
        type: 'number',
      },
    ],
  },
];

const gpioConfig = ref<{
  gpio_pitch_mcu_swclk: number;
  gpio_pitch_mcu_swdio: number;
  gpio_roll_mcu_swclk: number;
  gpio_roll_mcu_swdio: number;
  gpio_yaw_mcu_swclk: number;
  gpio_yaw_mcu_swdio: number;
  gpio_status_led: number;
}>({
  gpio_pitch_mcu_swclk: 0,
  gpio_pitch_mcu_swdio: 0,
  gpio_roll_mcu_swclk: 0,
  gpio_roll_mcu_swdio: 0,
  gpio_status_led: 0,
  gpio_yaw_mcu_swclk: 0,
  gpio_yaw_mcu_swdio: 0,
});

const loading = ref(false);

const onSubmit = () => {
  console.log('submit');
};

const onReset = () => {
  console.log('reset');
};
</script>
