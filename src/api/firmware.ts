import axios from 'axios';

export interface FirmwareFile {
  filename: string;
  created: number;
  size: number;
}

export const getFirmwares = async (): Promise<FirmwareFile[]> => {
  const res = await axios.get('/api/firmware/');
  return res.data;
};

export const getFirmware = async (filename: string): Promise<FirmwareFile> => {
  const res = await axios.get('/api/firmware/' + encodeURIComponent(filename));
  return res.data;
};

export const deleteFirmware = async (filename: string) => {
  const res = await axios.delete(
    '/api/firmware/' + encodeURIComponent(filename)
  );
  return res.data;
};
