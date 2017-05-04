export const firebaseConfig = {
  apiKey: 'AIzaSyCqFAEfZg0xdweDTU5bOjh_UwteCiuQnls',
  authDomain: 'housewarrantytracker.firebaseapp.com',
  databaseURL: 'https://housewarrantytracker.firebaseio.com',
  storageBucket: '',
};

export function getUserRoot(owner) {
  return 'users/' + owner;
}
